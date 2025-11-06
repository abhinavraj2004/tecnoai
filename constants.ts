
import type { Language } from './types';

type LocaleStrings = {
  title: string;
  subtitle: string;
  uploadTitle: string;
  uploadSubtitle: string;
  uploadButton: string;
  changeImage: string;
  clearImage: string;
  generateQuiz: string;
  generateAudio: string;
  downloadPdf: string;
  loadingQuiz: string;
  loadingAudio: string;
  errorQuiz: string;
  errorAudio: string;
  errorGeneric: string;
  quizTitle: string;
  question: string;
  answer: string;
  footer: string;
};

export const locales: Record<Language, LocaleStrings> = {
  en: {
    title: "AI Teacher's Assistant",
    subtitle: "Instantly create quizzes or audio from any textbook page.",
    uploadTitle: "Upload a Textbook Page",
    uploadSubtitle: "Drag & drop an image or click to select a file",
    uploadButton: "Select Image",
    changeImage: "Change Image",
    clearImage: "Clear",
    generateQuiz: "Generate Quiz",
    generateAudio: "Read Aloud",
    downloadPdf: "Download PDF",
    loadingQuiz: "Generating your quiz, please wait...",
    loadingAudio: "Generating audio, this may take a moment...",
    errorQuiz: "Sorry, we couldn't generate a quiz from this image. Please try another one.",
    errorAudio: "Sorry, we couldn't generate audio for this image. Please try again.",
    errorGeneric: "An unexpected error occurred.",
    quizTitle: "Generated Quiz",
    question: "Question",
    answer: "Answer",
    footer: "Powered by Tecno"
    },
  ml: {
    title: "AI ടീച്ചേഴ്സ് അസിസ്റ്റന്റ്",
    subtitle: "ഏത് പാഠപുസ്തക പേജിൽ നിന്നും തൽക്ഷണം ക്വിസുകളോ ഓഡിയോയോ ഉണ്ടാക്കുക.",
    uploadTitle: "പാഠപുസ്തകത്തിന്റെ പേജ് അപ്‌ലോഡ് ചെയ്യുക",
    uploadSubtitle: "ഒരു ചിത്രം ഡ്രാഗ് & ഡ്രോപ്പ് ചെയ്യുക അല്ലെങ്കിൽ ഒരു ഫയൽ തിരഞ്ഞെടുക്കാൻ ക്ലിക്കുചെയ്യുക",
    uploadButton: "ചിത്രം തിരഞ്ഞെടുക്കുക",
    changeImage: "ചിത്രം മാറ്റുക",
    clearImage: "മായ്ക്കുക",
    generateQuiz: "ക്വിസ് ഉണ്ടാക്കുക",
    generateAudio: "ഉറക്കെ വായിക്കുക",
    downloadPdf: "PDF ഡൗൺലോഡ് ചെയ്യുക",
    loadingQuiz: "നിങ്ങളുടെ ക്വിസ് തയ്യാറാക്കുന്നു, ദയവായി കാത്തിരിക്കുക...",
    loadingAudio: "ഓഡിയോ തയ്യാറാക്കുന്നു, ഇതിന് കുറച്ച് സമയമെടുത്തേക്കാം...",
    errorQuiz: "ക്ഷമിക്കണം, ഈ ചിത്രത്തിൽ നിന്ന് ഒരു ക്വിസ് ഉണ്ടാക്കാൻ കഴിഞ്ഞില്ല. ദയവായി മറ്റൊന്ന് ശ്രമിക്കുക.",
    errorAudio: "ക്ഷമിക്കണം, ഈ ചിത്രത്തിനായി ഓഡിയോ ഉണ്ടാക്കാൻ കഴിഞ്ഞില്ല. ദയവായി വീണ്ടും ശ്രമിക്കുക.",
    errorGeneric: "അപ്രതീക്ഷിതമായ ഒരു പിശക് സംഭവിച്ചു.",
    quizTitle: "തയ്യാറാക്കിയ ക്വിസ്",
    question: "ചോദ്യം",
    answer: "ഉത്തരം",
    footer: "Powered by Tecno",
  },
};
