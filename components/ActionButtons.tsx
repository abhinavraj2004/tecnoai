
import React from 'react';
import type { Language } from '../types';
import { locales } from '../constants';

interface ActionButtonsProps {
  onGenerateQuiz: () => void;
  onGenerateAudio: () => void;
  onDownloadPdf: () => void;
  isQuizGenerated: boolean;
  isLoading: boolean;
  language: Language;
}

const ActionButton: React.FC<{
    onClick: () => void;
    disabled: boolean;
    children: React.ReactNode;
    className?: string;
}> = ({ onClick, disabled, children, className = '' }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-full sm:w-auto flex-1 text-center font-semibold py-3 px-6 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
  >
    {children}
  </button>
);

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onGenerateQuiz,
  onGenerateAudio,
  onDownloadPdf,
  isQuizGenerated,
  isLoading,
  language,
}) => {
  const currentLocale = locales[language];

  return (
    <div className="mt-6 flex flex-col sm:flex-row gap-4">
      <ActionButton
        onClick={onGenerateQuiz}
        disabled={isLoading}
        className="bg-slate-800 text-white hover:bg-slate-900 focus:ring-slate-500"
      >
        {currentLocale.generateQuiz}
      </ActionButton>
      <ActionButton
        onClick={onGenerateAudio}
        disabled={isLoading}
        className="bg-sky-500 text-white hover:bg-sky-600 focus:ring-sky-400"
      >
        {currentLocale.generateAudio}
      </ActionButton>
      <ActionButton
        onClick={onDownloadPdf}
        disabled={isLoading || !isQuizGenerated}
        className="bg-emerald-500 text-white hover:bg-emerald-600 focus:ring-emerald-400 disabled:bg-slate-200 disabled:text-slate-500"
      >
        {currentLocale.downloadPdf}
      </ActionButton>
    </div>
  );
};
