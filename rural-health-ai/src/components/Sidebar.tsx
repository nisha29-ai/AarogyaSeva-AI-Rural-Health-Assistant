import React from 'react';
import { 
  Home, 
  Bot, 
  FileText, 
  Hospital, 
  Users, 
  Bell, 
  BookOpen, 
  PhoneCall, 
  ShieldCheck, 
  X,
  ChevronLeft,
  ChevronRight,
  HeartPulse
} from 'lucide-react';
import { LanguageCode, TRANSLATIONS } from '../data/translations';

export type NavView = 'home' | 'ai' | 'schemes' | 'hospitals' | 'education' | 'about' | 'asha' | 'reminders';

interface SidebarProps {
  activeView: NavView;
  onNavigate: (view: NavView) => void;
  onOpenIvrModal: () => void;
  currentLang: LanguageCode;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  isCollapsedDesktop: boolean;
  onToggleCollapseDesktop: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  onNavigate,
  onOpenIvrModal,
  currentLang,
  isOpenMobile,
  onCloseMobile,
  isCollapsedDesktop,
  onToggleCollapseDesktop,
}) => {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  const navItems = [
    { id: 'home' as NavView, label: t.dashboard || (currentLang === 'hi' ? 'मुख्य पृष्ठ' : 'Home Dashboard'), icon: Home, color: 'text-brand-400' },
    { id: 'ai' as NavView, label: t.askAi || (currentLang === 'hi' ? 'AI डॉक्टर मित्र' : 'AI Doctor Triage'), icon: Bot, color: 'text-emerald-400' },
    { id: 'schemes' as NavView, label: t.findSchemes || (currentLang === 'hi' ? 'सरकारी योजनाएं' : 'Govt Schemes'), icon: FileText, color: 'text-amber-400' },
    { id: 'hospitals' as NavView, label: t.findHospitals || (currentLang === 'hi' ? 'अस्पताल व PHC' : 'Hospitals & PHCs'), icon: Hospital, color: 'text-cyan-400' },
    { id: 'asha' as NavView, label: t.ashaConsole || (currentLang === 'hi' ? 'आशा कार्यकर्ता पोर्टल' : 'ASHA Console'), icon: Users, color: 'text-emerald-300' },
    { id: 'reminders' as NavView, label: t.reminders || (currentLang === 'hi' ? 'स्वास्थ्य अलार्म' : 'Reminders'), icon: Bell, color: 'text-cyan-300' },
    { id: 'education' as NavView, label: t.healthEducation || (currentLang === 'hi' ? 'स्वास्थ्य शिक्षा' : 'Health Education'), icon: BookOpen, color: 'text-purple-400' },
    { id: 'about' as NavView, label: t.aboutTrust || (currentLang === 'hi' ? 'सरकारी स्रोत' : 'Trust & Sources'), icon: ShieldCheck, color: 'text-slate-300' },
  ];

  const handleItemClick = (id: NavView) => {
    onNavigate(id);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col justify-between glass-panel border-r border-brand-500/20 bg-slate-950/85 backdrop-blur-xl transition-all duration-300 ${
          isOpenMobile ? 'translate-x-0 w-72' : '-translate-x-full lg:translate-x-0'
        } ${
          isCollapsedDesktop ? 'lg:w-20' : 'lg:w-72'
        }`}
      >
        {/* Top Header / Branding */}
        <div className="p-4 flex items-center justify-between border-b border-slate-800/80">
          <button
            onClick={() => handleItemClick('home')}
            className="flex items-center gap-3 text-left focus:outline-none group overflow-hidden"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-emerald-300 p-0.5 shadow-lg shadow-brand-500/30 flex-shrink-0 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <HeartPulse className="w-6 h-6 text-brand-400 animate-pulse" />
              </div>
            </div>

            {(!isCollapsedDesktop || isOpenMobile) && (
              <div className="transition-opacity duration-200">
                <h1 className="text-lg font-black tracking-tight text-white leading-tight">
                  {t.appTitle || 'आरोग्यसेवा AI'}
                </h1>
                <p className="text-[10px] text-emerald-400 font-semibold truncate max-w-[170px]">
                  {t.tagline || '3D Rural Healthcare Hub'}
                </p>
              </div>
            )}
          </button>

          {/* Desktop Collapse Toggle */}
          <button
            onClick={onToggleCollapseDesktop}
            className="hidden lg:flex w-7 h-7 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white items-center justify-center border border-slate-700 transition"
            title={isCollapsedDesktop ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsedDesktop ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>

          {/* Mobile Close Button */}
          <button
            onClick={onCloseMobile}
            className="lg:hidden w-8 h-8 rounded-lg bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items List */}
        <div className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                title={isCollapsedDesktop && !isOpenMobile ? item.label : undefined}
                className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-2xl font-extrabold text-xs sm:text-sm transition-all duration-200 relative group ${
                  isActive
                    ? 'bg-gradient-to-r from-brand-600/90 to-emerald-500/90 text-slate-950 shadow-lg shadow-brand-500/30'
                    : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                }`}
              >
                {/* Active Indicator Bar */}
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 rounded-r-full bg-white shadow-glow" />
                )}

                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-slate-950' : item.color}`} />

                {(!isCollapsedDesktop || isOpenMobile) && (
                  <span className="truncate">{item.label}</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom Feature Phone IVR Quick Trigger */}
        <div className="p-3 border-t border-slate-800/80">
          <button
            onClick={() => {
              onOpenIvrModal();
              onCloseMobile();
            }}
            title={isCollapsedDesktop && !isOpenMobile ? 'IVR 1800 Hotline' : undefined}
            className="w-full flex items-center justify-center gap-2 px-3 py-3 rounded-2xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-extrabold text-xs border border-amber-500/40 transition shadow-inner"
          >
            <PhoneCall className="w-4 h-4 flex-shrink-0 animate-pulse text-amber-400" />
            {(!isCollapsedDesktop || isOpenMobile) && (
              <span className="truncate">IVR Hotline (1800-180-AAROGYA)</span>
            )}
          </button>
        </div>

      </aside>
    </>
  );
};
