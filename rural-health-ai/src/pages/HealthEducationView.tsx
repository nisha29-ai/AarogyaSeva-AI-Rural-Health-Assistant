import React, { useState } from 'react';
import { ArrowLeft, Volume2, VolumeX, Baby, ShieldAlert, Droplets, HeartPulse, BookOpen, CheckCircle2 } from 'lucide-react';
import { LanguageCode, TRANSLATIONS } from '../data/translations';
import { EDUCATION_CARDS, EducationCard } from '../data/educationData';
import { speechEngine } from '../utils/speech';

interface HealthEducationViewProps {
  currentLang: LanguageCode;
  onBack: () => void;
}

export const HealthEducationView: React.FC<HealthEducationViewProps> = ({
  currentLang,
  onBack,
}) => {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.hi;
  const [playingId, setPlayingId] = useState<string | null>(null);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Baby': return <Baby className="w-8 h-8 text-emerald-400" />;
      case 'ShieldAlert': return <ShieldAlert className="w-8 h-8 text-red-400" />;
      case 'Droplets': return <Droplets className="w-8 h-8 text-cyan-400" />;
      case 'HeartPulse': return <HeartPulse className="w-8 h-8 text-amber-400" />;
      default: return <BookOpen className="w-8 h-8 text-brand-400" />;
    }
  };

  const handleToggleAudio = (card: EducationCard) => {
    if (playingId === card.id) {
      speechEngine.stopSpeaking();
      setPlayingId(null);
    } else {
      const audioText = card.audioScript[currentLang] || card.audioScript.hi;
      speechEngine.speak(audioText, currentLang, () => setPlayingId(null));
      setPlayingId(card.id);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-4 space-y-6">
      
      {/* Header Bar */}
      <div className="glass-panel rounded-2xl p-4 flex items-center justify-between border border-brand-500/30">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-300 hover:text-white font-bold text-sm bg-slate-800/80 px-3 py-2 rounded-xl border border-slate-700 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{t.backToHome}</span>
        </button>

        <div className="flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-brand-400" />
          <h2 className="text-xl font-extrabold text-white">{t.healthEducation}</h2>
        </div>

        <span className="text-xs text-brand-300 font-semibold hidden sm:inline">
          🔊 Audio Narrated
        </span>
      </div>

      {/* Grid of Swipeable Visual Health Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {EDUCATION_CARDS.map((card) => {
          const isPlaying = playingId === card.id;
          return (
            <div
              key={card.id}
              className={`glass-panel rounded-3xl p-6 sm:p-8 border border-slate-700/80 hover:border-brand-400/50 transition-all space-y-5 bg-gradient-to-br ${card.bgGradient} relative overflow-hidden shadow-2xl`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-slate-900/80 border border-slate-700 flex items-center justify-center shadow-lg">
                    {getIcon(card.iconName)}
                  </div>
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-900/80 text-amber-300 text-[11px] font-bold border border-amber-500/30">
                      {card.category[currentLang] || card.category.hi}
                    </span>
                    <h3 className="text-xl font-extrabold text-white mt-1">
                      {card.title[currentLang] || card.title.hi}
                    </h3>
                  </div>
                </div>

                {/* Audio Play/Pause Button */}
                <button
                  onClick={() => handleToggleAudio(card)}
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center transition shadow-lg ${
                    isPlaying
                      ? 'bg-red-600 text-white animate-pulse'
                      : 'bg-brand-500 text-slate-950 hover:scale-105'
                  }`}
                  title="बोलकर सुनें (Listen to audio)"
                >
                  {isPlaying ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                </button>
              </div>

              {/* Quick Tip Box */}
              <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-700/80 text-sm text-slate-200 font-medium leading-relaxed">
                💡 <span className="font-bold text-amber-300">मुख्य सुझाव: </span>
                {card.quickTip[currentLang] || card.quickTip.hi}
              </div>

              {/* Full Detailed Bullet Points */}
              <div className="space-y-2">
                <h4 className="text-xs font-black text-slate-300 uppercase tracking-wider">
                  जरूरी सावधानियां (Key Steps):
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
                  {(card.fullDetails[currentLang] || card.fullDetails.hi || []).map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
