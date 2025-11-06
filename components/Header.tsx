import React from 'react';
import logo from '../assets/logo.png'; // 👈 adjust the path as needed

type Language = 'en' | 'ml';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

const LanguageToggle: React.FC<HeaderProps> = ({ language, onLanguageChange }) => {
  const isMalayalam = language === 'ml';

  return (
    <div className="relative inline-flex items-center cursor-pointer">
      <span
        className={`mr-3 text-sm font-medium transition-colors ${
          !isMalayalam ? 'text-white' : 'text-slate-400'
        }`}
      >
        EN
      </span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={isMalayalam}
          onChange={() => onLanguageChange(isMalayalam ? 'en' : 'ml')}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
      </label>
      <span
        className={`ml-3 text-sm font-medium transition-colors ${
          isMalayalam ? 'text-white' : 'text-slate-400'
        }`}
      >
        മലയാളം
      </span>
    </div>
  );
};

export const Header: React.FC<HeaderProps> = ({ language, onLanguageChange }) => {
  return (
    <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 sticky top-0 z-10 shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center max-w-6xl">
        <div className="flex items-center gap-3">
          {/* 🔵 Logo (glow removed) */}
          <div className="relative">
            <img
              src={logo}
              alt="Tecno Logo"
              className="w-10 h-10 relative object-contain"
            />
          </div>

          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-white tracking-tight leading-none">
              Tecno
            </h1>
            <p className="text-xs text-blue-300 font-medium tracking-wide">
              Innovate the Next Horizon
            </p>
          </div>
        </div>
        <LanguageToggle language={language} onLanguageChange={onLanguageChange} />
      </div>
    </header>
  );
};

// Demo Component
export default function App() {
  const [language, setLanguage] = React.useState<Language>('en');

  return (
    <div className="min-h-screen bg-slate-50">
      <Header language={language} onLanguageChange={setLanguage} />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            {language === 'en'
              ? 'Welcome to Tecno'
              : 'ടെക്നോയിലേക്ക് സ്വാഗതം'}
          </h2>
          <p className="text-slate-600">
            {language === 'en'
              ? 'Experience the future of innovation with our cutting-edge AI assistant.'
              : 'ഞങ്ങളുടെ അത്യാധുനിക AI അസിസ്റ്റന്റിനൊപ്പം നവീകരണത്തിന്റെ ഭാവി അനുഭവിക്കൂ.'}
          </p>
        </div>
      </div>
    </div>
  );
}
