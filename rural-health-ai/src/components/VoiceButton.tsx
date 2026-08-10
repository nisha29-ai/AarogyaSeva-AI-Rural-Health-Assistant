import React, { useState } from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { LanguageCode, TRANSLATIONS } from '../data/translations';
import { speechEngine } from '../utils/speech';

interface VoiceButtonProps {
  currentLang: LanguageCode;
  onVoiceInput: (transcript: string) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const VoiceButton: React.FC<VoiceButtonProps> = ({
  currentLang,
  onVoiceInput,
  className = '',
  size = 'md',
}) => {
  const [isListening, setIsListening] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.hi;

  const handleMicClick = () => {
    if (isListening) {
      speechEngine.stopListening();
      setIsListening(false);
      return;
    }

    setErrorMsg(null);
    const success = speechEngine.startListening(
      currentLang,
      (text) => {
        onVoiceInput(text);
        setIsListening(false);
      },
      (err) => {
        console.warn('Speech err:', err);
        setErrorMsg('माइक काम नहीं कर रहा या अनुमति नहीं मिली');
        setIsListening(false);
      },
      () => {
        setIsListening(false);
      }
    );

    if (success) {
      setIsListening(true);
      speechEngine.speak(t.speakNow, currentLang);
    }
  };

  const sizeClasses = {
    sm: 'w-12 h-12 text-base',
    md: 'w-16 h-16 text-xl',
    lg: 'w-20 h-20 text-2xl',
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={handleMicClick}
        type="button"
        title={t.tapToTalk}
        className={`relative flex items-center justify-center rounded-full transition-all duration-300 shadow-2xl focus:outline-none focus:ring-4 focus:ring-brand-500/50 ${
          sizeClasses[size]
        } ${
          isListening
            ? 'bg-gradient-to-r from-red-600 to-rose-500 text-white scale-110 shadow-red-500/50 animate-pulse'
            : 'bg-gradient-to-tr from-brand-600 via-brand-500 to-emerald-400 text-slate-950 shadow-brand-500/40 hover:scale-105 active:scale-95'
        } ${className}`}
      >
        {/* Pulsing Outer Soundwave Rings during speech input */}
        {isListening && (
          <>
            <span className="absolute inset-0 rounded-full bg-red-500/40 animate-ping" />
            <span className="absolute -inset-3 rounded-full border-2 border-red-400/50 animate-pulse" />
          </>
        )}

        {isListening ? (
          <MicOff className="w-8 h-8 animate-bounce" />
        ) : (
          <Mic className="w-8 h-8 font-black" />
        )}
      </button>

      {/* Voice Status Label */}
      <div className="flex items-center gap-1.5 text-xs font-bold tracking-wide">
        {isListening ? (
          <span className="text-red-400 animate-pulse flex items-center gap-1">
            <Volume2 className="w-4 h-4" /> {t.listening}
          </span>
        ) : (
          <span className="text-emerald-400">{t.tapToTalk}</span>
        )}
      </div>

      {errorMsg && (
        <span className="text-[11px] text-amber-400 font-medium bg-amber-950/60 px-2 py-0.5 rounded-md">
          {errorMsg}
        </span>
      )}
    </div>
  );
};
