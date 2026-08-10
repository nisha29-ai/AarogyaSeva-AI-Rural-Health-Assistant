import React from 'react';
import { X, Check, Volume2 } from 'lucide-react';
import { LanguageCode, LANGUAGES, TRANSLATIONS } from '../data/translations';
import { speechEngine } from '../utils/speech';

interface LanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: LanguageCode;
  onSelectLang: (lang: LanguageCode) => void;
}

export const LanguageModal: React.FC<LanguageModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  onSelectLang,
}) => {
  if (!isOpen) return null;

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.hi;

  const handleChoose = (code: LanguageCode) => {
    onSelectLang(code);
    const chosenLangObj = LANGUAGES.find((l) => l.code === code);
    if (chosenLangObj) {
      speechEngine.speak(`भाषा चुनी गई ${chosenLangObj.nativeName}`, code);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="glass-panel w-full max-w-xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-brand-500/30 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 text-center">
          <span className="text-4xl mb-2 inline-block">🇮🇳</span>
          <h2 className="text-2xl font-black text-white">{t.selectLanguage}</h2>
          <p className="text-sm text-slate-300 mt-1">
            Choose your preferred regional language / अपनी भाषा चुनें
          </p>
        </div>

        {/* 9 Language Grid Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[60vh] overflow-y-auto p-1">
          {LANGUAGES.map((lang) => {
            const isSelected = currentLang === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => handleChoose(lang.code)}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all text-center min-h-[90px] relative ${
                  isSelected
                    ? 'bg-brand-500/20 border-brand-400 text-white shadow-lg shadow-brand-500/30 scale-[1.03]'
                    : 'bg-slate-800/60 border-slate-700/80 text-slate-200 hover:bg-slate-700/80 hover:border-brand-500/50'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-brand-500 text-slate-950 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}
                <span className="text-2xl mb-1">{lang.flag}</span>
                <span className="text-lg font-bold tracking-wide">{lang.nativeName}</span>
                <span className="text-xs text-slate-400 mt-0.5">{lang.name}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5 text-brand-400 font-semibold">
            <Volume2 className="w-4 h-4" />
            <span>Voice & Text included</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold hover:bg-slate-700"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
