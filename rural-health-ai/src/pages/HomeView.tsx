import React from 'react';
import { MessageSquareHeart, FileText, Hospital, ShieldAlert, Sparkles, Volume2, ArrowRight } from 'lucide-react';
import { FloatingCard } from '../components/FloatingCard';
import { VoiceButton } from '../components/VoiceButton';
import { LanguageCode, TRANSLATIONS } from '../data/translations';
import { speechEngine } from '../utils/speech';

interface HomeViewProps {
  currentLang: LanguageCode;
  onNavigate: (view: 'home' | 'ai' | 'schemes' | 'hospitals' | 'education' | 'about' | 'asha' | 'reminders') => void;
  onOpenEmergencyModal: () => void;
  onOpenIvrModal?: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  currentLang,
  onNavigate,
  onOpenEmergencyModal,
  onOpenIvrModal,
}) => {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.hi;

  const handleVoiceTrigger = (text: string) => {
    speechEngine.speak(`आपने कहा: ${text}. AI सहायक से सहायता ली जा रही है।`, currentLang);
    onNavigate('ai');
  };

  return (
    <div className="space-y-8 py-4 sm:py-8 max-w-7xl mx-auto px-4">
      
      {/* Cinematic Floating 3D Hero Panel */}
      <div className="relative glass-panel rounded-3xl p-6 sm:p-12 overflow-hidden border border-brand-500/30 text-center shadow-2xl">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-500/15 rounded-full blur-3xl" />
        
        {/* Floating Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs sm:text-sm font-extrabold mb-6 shadow-inner animate-float-slow">
          <Sparkles className="w-4 h-4 text-brand-400" />
          <span>AI-Powered Multilingual Rural Healthcare Access</span>
        </div>

        {/* Hero Title */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight max-w-4xl mx-auto leading-tight">
          {t.tagline}
        </h2>
        <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto mt-4 font-medium">
          अपनी मातृभाषा में बोलकर लक्षण जांचें, आयुष्मान भारत योजनाएं खोजें और 108 आपातकालीन सहायता पाएं।
        </p>

        {/* Big Central Hands-Free Voice Button */}
        <div className="mt-8 mb-4 flex flex-col items-center">
          <VoiceButton
            currentLang={currentLang}
            onVoiceInput={handleVoiceTrigger}
            size="lg"
          />
          <p className="text-xs text-slate-400 mt-2 font-semibold">
            {t.voiceHint}
          </p>
        </div>
      </div>

      {/* Primary Action Grid (6 Action Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Card 1: Ask AI */}
        <FloatingCard
          onClick={() => onNavigate('ai')}
          glowColor="emerald"
          className="flex flex-col justify-between h-full min-h-[220px]"
        >
          <div>
            <div className="w-14 h-14 rounded-2xl bg-brand-500/20 border border-brand-400/40 text-brand-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <MessageSquareHeart className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-white group-hover:text-brand-300 transition-colors">
              {t.askAi}
            </h3>
            <p className="text-sm text-slate-300 mt-2 font-medium">
              {t.askAiSub}
            </p>
          </div>
          <div className="mt-6 flex items-center justify-between text-brand-400 font-extrabold text-sm">
            <span>लक्षण जांच शुरू करें</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </div>
        </FloatingCard>

        {/* Card 2: Schemes Finder */}
        <FloatingCard
          onClick={() => onNavigate('schemes')}
          glowColor="amber"
          className="flex flex-col justify-between h-full min-h-[220px]"
        >
          <div>
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FileText className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-white group-hover:text-amber-300 transition-colors">
              {t.findSchemes}
            </h3>
            <p className="text-sm text-slate-300 mt-2 font-medium">
              {t.findSchemesSub}
            </p>
          </div>
          <div className="mt-6 flex items-center justify-between text-amber-400 font-extrabold text-sm">
            <span>पात्रता जांचें</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </div>
        </FloatingCard>

        {/* Card 3: Nearby Hospitals */}
        <FloatingCard
          onClick={() => onNavigate('hospitals')}
          glowColor="emerald"
          className="flex flex-col justify-between h-full min-h-[220px]"
        >
          <div>
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Hospital className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-white group-hover:text-cyan-300 transition-colors">
              {t.findHospitals}
            </h3>
            <p className="text-sm text-slate-300 mt-2 font-medium">
              {t.findHospitalsSub}
            </p>
          </div>
          <div className="mt-6 flex items-center justify-between text-cyan-400 font-extrabold text-sm">
            <span>मैप पर खोजें</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </div>
        </FloatingCard>

        {/* Card 4: ASHA Worker Console */}
        <FloatingCard
          onClick={() => onNavigate('asha')}
          glowColor="emerald"
          className="flex flex-col justify-between h-full min-h-[220px]"
        >
          <div>
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-2xl font-bold">
              👩‍⚕️
            </div>
            <h3 className="text-2xl font-black text-white group-hover:text-emerald-300 transition-colors">
              {t.ashaConsole}
            </h3>
            <p className="text-sm text-slate-300 mt-2 font-medium">
              {t.ashaConsoleSub}
            </p>
          </div>
          <div className="mt-6 flex items-center justify-between text-emerald-400 font-extrabold text-sm">
            <span>आशा पोर्टल खोलें</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </div>
        </FloatingCard>

        {/* Card 5: Health & Vaccine Reminders */}
        <FloatingCard
          onClick={() => onNavigate('reminders')}
          glowColor="amber"
          className="flex flex-col justify-between h-full min-h-[220px]"
        >
          <div>
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-2xl">
              🔔
            </div>
            <h3 className="text-2xl font-black text-white group-hover:text-cyan-300 transition-colors">
              {t.reminders}
            </h3>
            <p className="text-sm text-slate-300 mt-2 font-medium">
              {t.remindersSub}
            </p>
          </div>
          <div className="mt-6 flex items-center justify-between text-cyan-400 font-extrabold text-sm">
            <span>अलार्म देखें</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </div>
        </FloatingCard>

        {/* Card 6: Emergency SOS */}
        <FloatingCard
          onClick={onOpenEmergencyModal}
          glowColor="red"
          className="flex flex-col justify-between h-full min-h-[220px] bg-gradient-to-br from-red-950/40 via-slate-900/80 to-slate-900"
        >
          <div>
            <div className="w-14 h-14 rounded-2xl bg-red-600/30 border border-red-400/40 text-red-400 flex items-center justify-center mb-4 animate-pulse group-hover:scale-110 transition-transform">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-white group-hover:text-red-300 transition-colors">
              {t.emergencySos}
            </h3>
            <p className="text-sm text-slate-300 mt-2 font-medium">
              {t.emergencySub}
            </p>
          </div>
          <div className="mt-6 flex items-center justify-between text-red-400 font-extrabold text-sm">
            <span>108 एम्बुलेंस बुलाएं</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </div>
        </FloatingCard>

      </div>

      {/* Feature Phone / 2G IVR Hotline Call Banner */}
      {onOpenIvrModal && (
        <div className="glass-panel rounded-3xl p-6 bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/30 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-2xl font-bold flex-shrink-0">
              📞
            </div>
            <div>
              <h4 className="text-lg font-black text-white">{t.ivrHelpline}</h4>
              <p className="text-xs text-slate-300 mt-0.5">{t.ivrSub}</p>
            </div>
          </div>
          <button
            onClick={onOpenIvrModal}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition shadow-lg shadow-amber-500/20"
          >
            1800 आईवीआर कॉल टेस्ट (Feature Phone Call)
          </button>
        </div>
      )}

      {/* Quick Navigation Footer Banner */}
      <div className="glass-panel rounded-2xl p-4 sm:p-6 flex flex-wrap items-center justify-between gap-4 border border-slate-700/60">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center">
            <Volume2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-base font-bold text-white">स्वास्थ्य शिक्षा एवं सलाह</h4>
            <p className="text-xs text-slate-400">मातृ सुरक्षा, डेंगू एवं फर्स्ट एड जागरूकता कार्ड्स पढ़ें</p>
          </div>
        </div>
        <button
          onClick={() => onNavigate('education')}
          className="px-5 py-2.5 rounded-xl bg-brand-500/20 hover:bg-brand-500/30 text-brand-300 font-extrabold border border-brand-500/40 transition"
        >
          {t.healthEducation}
        </button>
      </div>

    </div>
  );
};
