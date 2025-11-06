import React, { useState } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { ActionButtons } from './components/ActionButtons';
import { QuizDisplay } from './components/QuizDisplay';
import { AudioPlayer } from './components/AudioPlayer';
import { Loader } from './components/Loader';
import { generateQuizFromImage, generateSpeechFromImage } from './services/geminiService';
import { downloadQuizAsPdf } from './utils/pdfGenerator';
import type { Language, QuizItem } from './types';

// Define constants for locales right in the App
const locales = {
  en: {
    title: "AI Teacher's Assistant",
    subtitle: "Instantly create quizzes or audio from any textbook page.",
    loadingQuiz: "Generating your quiz... This might take a moment.",
    loadingAudio: "Generating audio... Please wait.",
    errorTitle: "An error occurred",
  },
  ml: {
    title: "AI ടീച്ചർ അസിസ്റ്റന്റ്",
    subtitle: "ഏത് പാഠപുസ്തക പേജിൽ നിന്നും തൽക്ഷണം ക്വിസുകളോ ഓഡിയോയോ നിർമ്മിക്കുക.",
    loadingQuiz: "നിങ്ങളുടെ ക്വിസ് തയ്യാറാക്കുന്നു... ദയവായി അല്പസമയം കാത്തിരിക്കുക.",
    loadingAudio: "ഓഡിയോ നിർമ്മിക്കുന്നു... ദയവായി കാത്തിരിക്കുക.",
    errorTitle: "ഒരു പിശക് സംഭവിച്ചു",
  }
};

export default function App() {
  // --- State Management ---

  // Set default loading to false to fix the blur
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  
  const [language, setLanguage] = useState<Language>('en');
  const [imageDataUrl, setImageDataUrl] = useState<string | undefined>(undefined);
  const [quiz, setQuiz] = useState<QuizItem[]>([]);
  const [audioUrl, setAudioUrl] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  const currentLocale = locales[language];

  // --- Event Handlers ---

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    // Clear previous results when language changes
    setQuiz([]);
    setAudioUrl(undefined);
    setError(undefined);
  };

  const handleImageUpload = (file: File, dataUrl: string) => {
    setImageDataUrl(dataUrl);
    // Clear old results when new image is uploaded
    setQuiz([]);
    setAudioUrl(undefined);
    setError(undefined);
  };

  const handleClear = () => {
    setImageDataUrl(undefined);
    setQuiz([]);
    setAudioUrl(undefined);
    setError(undefined);
  };

  const handleGenerateQuiz = async () => {
    if (!imageDataUrl) return;

    setIsLoading(true);
    setLoadingMessage(currentLocale.loadingQuiz);
    setError(undefined);
    setQuiz([]);
    setAudioUrl(undefined);

    try {
      const quizItems = await generateQuizFromImage(imageDataUrl, language);
      setQuiz(quizItems);
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateAudio = async () => {
    if (!imageDataUrl) return;

    setIsLoading(true);
    setLoadingMessage(currentLocale.loadingAudio);
    setError(undefined);
    setAudioUrl(undefined);

    try {
      const url = await generateSpeechFromImage(imageDataUrl, language);
      setAudioUrl(url);
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadPdf = () => {
    if (quiz.length === 0) return;
    downloadQuizAsPdf(quiz, "Quiz", language);
  };

  // --- Render ---

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <Header language={language} onLanguageChange={handleLanguageChange} />

      <main className="flex-1 w-full max-w-4xl mx-auto p-4 sm:p-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          
          {/* ----- Main Content Area ----- */}
          {/* This wrapper applies the blur only when isLoading is true */}
          <div 
            className={`transition-all duration-300 ${isLoading ? 'blur-md opacity-50 pointer-events-none' : 'blur-none opacity-100'}`}
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-900">{currentLocale.title}</h2>
              <p className="text-slate-500 mt-2">{currentLocale.subtitle}</p>
            </div>

            <ImageUploader
              onImageUpload={handleImageUpload}
              existingImage={imageDataUrl}
              onClear={handleClear}
              language={language}
            />

            {imageDataUrl && (
              <>
                <ActionButtons
                  onGenerateQuiz={handleGenerateQuiz}
                  onGenerateAudio={handleGenerateAudio}
                  onDownloadPdf={handleDownloadPdf}
                  isQuizGenerated={quiz.length > 0}
                  isLoading={isLoading}
                  language={language}
                />
              </>
            )}
          </div>

          {/* ----- Dynamic Output Area ----- */}
          <div className="mt-8">
            {/* Loading Indicator */}
            {isLoading && <Loader message={loadingMessage} />}

            {/* Error Display */}
            {error && (
              <div className="text-center p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg">
                <h3 className="font-bold">{currentLocale.errorTitle}</h3>
                <p>{error}</p>
              </div>
            )}

            {/* Audio Player Display */}
            {audioUrl && !isLoading && (
              <div className="mt-8">
                <AudioPlayer src={audioUrl} />
              </div>
            )}

            {/* Quiz Display */}
            {quiz.length > 0 && !isLoading && (
              <div className="mt-8">
                <QuizDisplay quiz={quiz} />
              </div>
            )}
          </div>

        </div>
      </main>
      
      {/* The "Powered by Tecno" footer has been removed 
        by not including it here in this file.
      */}
      
    </div>
  );
}