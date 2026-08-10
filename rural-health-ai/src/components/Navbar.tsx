import React from 'react';
import { ShieldAlert, Globe, Wifi, WifiOff, HeartPulse, Menu } from 'lucide-react';
import { LanguageCode, LANGUAGES, TRANSLATIONS } from '../data/translations';

interface NavbarProps {
  currentLang: LanguageCode;
  onOpenLangModal: () => void;
  onOpenEmergencyModal: () => void;
  onOpenIvrModal?: () => void;
  onOpenMobileSidebar?: () => void;
  lowDataMode: boolean;
  onToggleLowData: () => void;
  onNavigateHome: () => void;
  onNavigateAsha?: () => void;
  onNavigateReminders?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onOpenLangModal,
  onOpenEmergencyModal,
  onOpenIvrModal,
  onOpenMobileSidebar,
  lowDataMode,
  onToggleLowData,
  onNavigateHome,
  onNavigateAsha,
  onNavigateReminders,
}) => {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.hi;
  const activeLangObj = LANGUAGES.find((l) => l.code === currentLang);

  return (
    <header className="sticky top-4 z-40 px-4 max-w-7xl mx-auto">
      <nav className="glass-panel rounded-2xl px-4 py-3 flex items-center justify-between shadow-2xl transition-all duration-300 border border-brand-500/20">
        
        {/* Mobile Hamburger & Brand Logo */}
        <div className="flex items-center gap-3">
          {onOpenMobileSidebar && (
            <button
              onClick={onOpenMobileSidebar}
              className="lg:hidden p-2 rounded-xl bg-slate-800/80 text-slate-200 hover:text-white border border-slate-700 focus:outline-none"
              title="Open Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <button
            onClick={onNavigateHome}
            className="flex items-center gap-3 group text-left focus:outline-none focus:ring-2 focus:ring-brand-500 rounded-lg p-1"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-emerald-300 p-0.5 shadow-lg shadow-brand-500/30 group-hover:scale-105 transition-transform flex-shrink-0">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <HeartPulse className="w-6 h-6 sm:w-7 sm:h-7 text-brand-400 animate-pulse" />
              </div>
            </div>
            <div>
              <h1 className="text-lg sm:text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-emerald-400">
                {t.appTitle}
              </h1>
              <p className="text-[11px] sm:text-xs text-emerald-400/90 font-medium hidden sm:block">
                {t.tagline}
              </p>
            </div>
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* ASHA Portal Link */}
          {onNavigateAsha && (
            <button
              onClick={onNavigateAsha}
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/30 text-xs font-bold transition"
            >
              <span>👩‍⚕️ आशा पोर्टल</span>
            </button>
          )}

          {/* Reminders Link */}
          {onNavigateReminders && (
            <button
              onClick={onNavigateReminders}
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/30 text-xs font-bold transition"
            >
              <span>🔔 अलार्म</span>
            </button>
          )}

          {/* IVR Helpline Button */}
          {onOpenIvrModal && (
            <button
              onClick={onOpenIvrModal}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/30 text-xs font-bold transition"
              title="2G / Feature Phone IVR Call"
            >
              <span>📞 IVR 1800</span>
            </button>
          )}

          {/* Low Data / Offline Toggle */}
          <button
            onClick={onToggleLowData}
            title={t.offlineMode}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              lowDataMode
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'bg-slate-800/60 text-slate-300 border border-slate-700 hover:border-slate-500'
            }`}
          >
            {lowDataMode ? <WifiOff className="w-4 h-4 text-amber-400" /> : <Wifi className="w-4 h-4 text-brand-400" />}
            <span className="hidden md:inline">{t.offlineMode}</span>
          </button>

          {/* Language Switcher Badge */}
          <button
            onClick={onOpenLangModal}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/90 border border-brand-500/30 text-slate-100 text-sm font-semibold shadow-md transition-all active:scale-95"
          >
            <Globe className="w-4 h-4 text-brand-400" />
            <span className="text-base">{activeLangObj?.flag}</span>
            <span className="font-bold">{activeLangObj?.nativeName}</span>
          </button>

          {/* Emergency SOS Button */}
          <button
            onClick={onOpenEmergencyModal}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-red-600/40 border border-red-400/30 transition-all hover:scale-105 active:scale-95 animate-bounce-subtle"
          >
            <ShieldAlert className="w-4 h-4 animate-pulse" />
            <span>108 SOS</span>
          </button>

        </div>
      </nav>
    </header>
  );
};
