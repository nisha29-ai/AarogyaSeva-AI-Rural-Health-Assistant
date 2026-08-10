import React, { useState } from 'react';
import { Volume2, X, Sparkles, MessageCircle } from 'lucide-react';
import { LanguageCode, TRANSLATIONS } from '../data/translations';
import { speechEngine } from '../utils/speech';

interface DoctorCompanionProps {
  currentLang: LanguageCode;
  onOpenChat: () => void;
  moodState?: 'happy' | 'listening' | 'meditating' | 'concerned';
}

export const DoctorCompanion: React.FC<DoctorCompanionProps> = ({
  currentLang,
  onOpenChat,
  moodState = 'happy',
}) => {
  const [showSpeechBubble, setShowSpeechBubble] = useState(true);
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.hi;

  const handleSpeakGreeting = (e: React.MouseEvent) => {
    e.stopPropagation();
    speechEngine.speak(t.doctorGreeting, currentLang);
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 flex items-end gap-3 pointer-events-auto">
      
      {/* Cute Floating Mascot Avatar */}
      <div className="relative group">
        
        {/* Speech Bubble Popup */}
        {showSpeechBubble && (
          <div className="absolute bottom-20 left-0 w-64 glass-panel rounded-2xl p-3.5 shadow-2xl border border-brand-500/40 text-xs text-slate-100 animate-float-slow transition-all">
            <button
              onClick={() => setShowSpeechBubble(false)}
              className="absolute top-1.5 right-1.5 p-1 rounded-full text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-start gap-2 pr-4">
              <Sparkles className="w-4 h-4 text-brand-400 flex-shrink-0 mt-0.5" />
              <p className="font-bold">{t.doctorGreeting}</p>
            </div>

            <div className="mt-2.5 pt-2 border-t border-slate-700/80 flex items-center justify-between">
              <button
                onClick={handleSpeakGreeting}
                className="flex items-center gap-1 text-[11px] text-brand-300 font-extrabold hover:text-white transition"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>सुनें (Listen)</span>
              </button>

              <button
                onClick={onOpenChat}
                className="px-2.5 py-1 rounded-lg bg-brand-500 text-slate-950 font-black text-[10px] hover:scale-105 transition"
              >
                बात करें (Chat)
              </button>
            </div>
          </div>
        )}

        {/* Cute Doctor Mascot SVG */}
        <button
          onClick={onOpenChat}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-tr from-brand-600 via-teal-500 to-cyan-300 p-0.5 shadow-2xl shadow-brand-500/40 hover:scale-110 active:scale-95 transition-all duration-300 relative animate-float-slow focus:outline-none focus:ring-4 focus:ring-brand-500/50"
          title="डॉक्टर मित्र से बात करें (Chat with Dr. Mitra)"
        >
          <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center relative overflow-hidden">
            
            {/* Cute Doctor Face SVG */}
            <svg className="w-12 h-12 sm:w-14 sm:h-14" viewBox="0 0 64 64" fill="none">
              {/* Doctor Cap / Hair */}
              <path d="M12 28C12 18 20 12 32 12C44 12 52 18 52 28V34H12V28Z" fill="#10B981" />
              <rect x="26" y="16" width="12" height="4" rx="2" fill="#FFFFFF" />
              <rect x="30" y="12" width="4" height="12" rx="2" fill="#FFFFFF" />

              {/* Cute Face */}
              <circle cx="32" cy="34" r="16" fill="#FDE68A" />
              
              {/* Eyes */}
              {moodState === 'happy' && (
                <>
                  <circle cx="26" cy="32" r="2.5" fill="#1E293B" />
                  <circle cx="38" cy="32" r="2.5" fill="#1E293B" />
                  <path d="M25 36C28 39 36 39 39 36" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
                </>
              )}
              {moodState === 'listening' && (
                <>
                  <ellipse cx="26" cy="32" rx="2" ry="3" fill="#1E293B" />
                  <ellipse cx="38" cy="32" rx="2" ry="3" fill="#1E293B" />
                  <circle cx="32" cy="38" r="2" fill="#1E293B" />
                </>
              )}
              {moodState === 'meditating' && (
                <>
                  <path d="M23 33C25 31 27 31 29 33" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
                  <path d="M35 33C37 31 39 31 41 33" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
                  <path d="M28 38C30 40 34 40 36 38" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
                </>
              )}

              {/* Stethoscope */}
              <path d="M18 42C18 50 46 50 46 42" stroke="#06B6D4" strokeWidth="3" strokeLinecap="round" />
              <circle cx="32" cy="49" r="3" fill="#F59E0B" />
            </svg>

            {/* Glowing Online Badge */}
            <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-slate-950 animate-ping" />
            <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-slate-950" />
          </div>
        </button>

        {/* Chat Prompt Badge */}
        {!showSpeechBubble && (
          <button
            onClick={() => setShowSpeechBubble(true)}
            className="absolute -top-2 -right-2 p-1.5 rounded-full bg-brand-500 text-slate-950 shadow-md hover:scale-110 transition"
          >
            <MessageCircle className="w-4 h-4" />
          </button>
        )}

      </div>

    </div>
  );
};
