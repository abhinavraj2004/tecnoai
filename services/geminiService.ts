import { GoogleGenAI, Type, Modality } from '@google/genai';
import type { QuizItem, Language } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });
const model = ai.models;

function fileToGenerativePart(base64Data: string) {
  const data = base64Data.split(',')[1];
  const mimeType = base64Data.split(';')[0].split(':')[1];
  return {
    inlineData: {
      data,
      mimeType,
    },
  };
}

// Audio decoding utilities as per Gemini documentation
function decode(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

export const generateQuizFromImage = async (imageDataUrl: string, language: Language): Promise<QuizItem[]> => {
  const imagePart = fileToGenerativePart(imageDataUrl);
  const langName = language === 'ml' ? 'Malayalam' : 'English';

  const response = await model.generateContent({
    model: 'gemini-2.5-flash',
    contents: {
      parts: [
        imagePart,
        {
          text: `Analyze the provided image of a textbook page. The content may be in ${langName}. Your task is to create a quiz with questions and answers based *only* on the text visible in the image. Generate at least 5 questions. The questions and answers must be in ${langName}.`,
        },
      ],
    },
    config: {
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    question: { type: Type.STRING },
                    answer: { type: Type.STRING },
                },
                required: ["question", "answer"],
            },
        },
    },
  });

  const jsonText = response.text.trim();
  const quizData = JSON.parse(jsonText);
  return quizData;
};

export const generateSpeechFromImage = async (imageDataUrl: string, language: Language): Promise<string> => {
  const imagePart = fileToGenerativePart(imageDataUrl);
  const langName = language === 'ml' ? 'Malayalam' : 'English';

  // Step 1: Extract text from the image
  const textExtractionResponse = await model.generateContent({
    model: 'gemini-2.5-flash',
    contents: {
        parts: [
            imagePart,
            { text: `Extract all text content from this image. The language could be ${langName}. Return only the raw text, with no formatting, labels, or explanations.`}
        ]
    }
  });

  const extractedText = textExtractionResponse.text;
  if (!extractedText || extractedText.trim() === "") {
      throw new Error("Could not extract any text from the image.");
  }
  
  // Step 2: Generate speech from the extracted text
  // A simpler, more direct prompt is more reliable for the TTS model.
  const ttsPrompt = `Read the following text in ${langName}: ${extractedText}`;

  const ttsResponse = await model.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text: ttsPrompt }] }],
    config: {
        responseModalities: [Modality.AUDIO],
    },
  });
  
  const audioData = ttsResponse.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  if (!audioData) {
      console.error("TTS Response did not contain audio data:", ttsResponse);
      throw new Error("Failed to generate audio data.");
  }

  // Step 3: Decode and create a playable audio URL
  const audioContext = new (window.AudioContext)({ sampleRate: 24000 });
  const decodedBytes = decode(audioData);
  const audioBuffer = await decodeAudioData(decodedBytes, audioContext, 24000, 1);
  
  // Convert AudioBuffer to a WAV Blob URL
  const wavBlob = bufferToWave(audioBuffer, audioBuffer.length);
  return URL.createObjectURL(wavBlob);
};

// Helper to convert raw audio buffer to a WAV file Blob
function bufferToWave(abuffer: AudioBuffer, len: number) {
    let numOfChan = abuffer.numberOfChannels,
      length = len * numOfChan * 2 + 44,
      buffer = new ArrayBuffer(length),
      view = new DataView(buffer),
      channels = [],
      i,
      sample,
      offset = 0,
      pos = 0;
  
    setUint32(0x46464952); // "RIFF"
    setUint32(length - 8); // file length - 8
    setUint32(0x45564157); // "WAVE"
  
    setUint32(0x20746d66); // "fmt " chunk
    setUint32(16); // length = 16
    setUint16(1); // PCM (uncompressed)
    setUint16(numOfChan);
    setUint32(abuffer.sampleRate);
    setUint32(abuffer.sampleRate * 2 * numOfChan); // avg. bytes/sec
    setUint16(numOfChan * 2); // block-align
    setUint16(16); // 16-bit
  
    setUint32(0x61746164); // "data" - chunk
    setUint32(length - pos - 4); // chunk length
  
    for (i = 0; i < abuffer.numberOfChannels; i++)
      channels.push(abuffer.getChannelData(i));
  
    while (pos < length) {
      for (i = 0; i < numOfChan; i++) {
        sample = Math.max(-1, Math.min(1, channels[i][offset]));
        sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767) | 0;
        view.setInt16(pos, sample, true);
        pos += 2;
      }
      offset++;
    }
  
    return new Blob([buffer], { type: "audio/wav" });
  
    function setUint16(data: number) {
      view.setUint16(pos, data, true);
      pos += 2;
    }
  
    function setUint32(data: number) {
      view.setUint32(pos, data, true);
      pos += 4;
    }
  }