import { useState } from 'react';
import { Background3D } from './components/Background3D';
import { Navbar } from './components/Navbar';
import { Sidebar, NavView } from './components/Sidebar';
import { LanguageModal } from './components/LanguageModal';
import { EmergencyModal } from './components/EmergencyModal';
import { IvrSimulatorModal } from './components/IvrSimulatorModal';
import { LandingView } from './pages/LandingView';
import { HomeView } from './pages/HomeView';
import { AIAssistantView } from './pages/AIAssistantView';
import { SchemeFinderView } from './pages/SchemeFinderView';
import { HospitalLocatorView } from './pages/HospitalLocatorView';
import { HealthEducationView } from './pages/HealthEducationView';
import { AboutTrustView } from './pages/AboutTrustView';
import { AshaConsoleView } from './pages/AshaConsoleView';
import { RemindersView } from './pages/RemindersView';
import { LanguageCode } from './data/translations';
import { ShieldAlert, Heart } from 'lucide-react';

export function App() {
  const [hasEnteredPortal, setHasEnteredPortal] = useState(false);
  const [activeView, setActiveView] = useState<NavView>('home');
  const [currentLang, setCurrentLang] = useState<LanguageCode>('hi');
  const [lowDataMode, setLowDataMode] = useState(false);

  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isIvrModalOpen, setIsIvrModalOpen] = useState(false);
  const [isOpenMobileSidebar, setIsOpenMobileSidebar] = useState(false);
  const [isCollapsedDesktop, setIsCollapsedDesktop] = useState(false);

  const enterPortal = (view?: NavView) => {
    setHasEnteredPortal(true);
    if (view) setActiveView(view);
  };

  const sharedModals = (
    <>
      <LanguageModal
        isOpen={isLangModalOpen}
        onClose={() => setIsLangModalOpen(false)}
        currentLang={currentLang}
        onSelectLang={(lang) => setCurrentLang(lang)}
      />
      <EmergencyModal
        isOpen={isEmergencyModalOpen}
        onClose={() => setIsEmergencyModalOpen(false)}
        currentLang={currentLang}
      />
      <IvrSimulatorModal
        isOpen={isIvrModalOpen}
        onClose={() => setIsIvrModalOpen(false)}
        currentLang={currentLang}
      />
    </>
  );

  if (!hasEnteredPortal) {
    return (
      <div className="relative min-h-screen selection:bg-brand-500 selection:text-slate-950">
        <Background3D lowDataMode={false} />
        <LandingView
          currentLang={currentLang}
          onEnterPortal={() => enterPortal()}
          onNavigateView={(view) => enterPortal(view)}
          onOpenLangModal={() => setIsLangModalOpen(true)}
          onOpenEmergencyModal={() => setIsEmergencyModalOpen(true)}
          onOpenIvrModal={() => setIsIvrModalOpen(true)}
        />
        <button
          onClick={() => setIsEmergencyModalOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-sm shadow-2xl shadow-red-600/50 border border-red-400/40 transition-transform hover:scale-110 active:scale-95"
          title="108 Emergency Ambulance"
        >
          <ShieldAlert className="w-5 h-5 animate-pulse" />
          <span className="hidden sm:inline">108 SOS</span>
        </button>
        {sharedModals}
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col justify-between selection:bg-brand-500 selection:text-slate-950">
      
      {/* Continuous Floating 3D WebGL Background Scene */}
      <Background3D lowDataMode={lowDataMode} />

      {/* Floating Glass Left Sidebar */}
      <Sidebar
        activeView={activeView}
        onNavigate={(view) => setActiveView(view)}
        onOpenIvrModal={() => setIsIvrModalOpen(true)}
        currentLang={currentLang}
        isOpenMobile={isOpenMobileSidebar}
        onCloseMobile={() => setIsOpenMobileSidebar(false)}
        isCollapsedDesktop={isCollapsedDesktop}
        onToggleCollapseDesktop={() => setIsCollapsedDesktop((prev) => !prev)}
      />

      {/* Main Content Area with Responsive Sidebar Margin */}
      <div className={`flex-1 flex flex-col justify-between transition-all duration-300 ${
        isCollapsedDesktop ? 'lg:pl-20' : 'lg:pl-72'
      }`}>
        
        {/* Floating Glass Top Navbar */}
        <Navbar
          currentLang={currentLang}
          onOpenLangModal={() => setIsLangModalOpen(true)}
          onOpenEmergencyModal={() => setIsEmergencyModalOpen(true)}
          onOpenIvrModal={() => setIsIvrModalOpen(true)}
          onOpenMobileSidebar={() => setIsOpenMobileSidebar(true)}
          lowDataMode={lowDataMode}
          onToggleLowData={() => setLowDataMode((prev) => !prev)}
          onNavigateHome={() => setActiveView('home')}
          onNavigateAsha={() => setActiveView('asha')}
          onNavigateReminders={() => setActiveView('reminders')}
        />

        {/* Main View Router */}
        <main className="relative z-10 flex-1 py-4">
          {activeView === 'home' && (
            <HomeView
              currentLang={currentLang}
              onNavigate={(view) => setActiveView(view)}
              onOpenEmergencyModal={() => setIsEmergencyModalOpen(true)}
              onOpenIvrModal={() => setIsIvrModalOpen(true)}
            />
          )}

          {activeView === 'ai' && (
            <AIAssistantView
              currentLang={currentLang}
              onBack={() => setActiveView('home')}
              onOpenEmergencyModal={() => setIsEmergencyModalOpen(true)}
            />
          )}

          {activeView === 'schemes' && (
            <SchemeFinderView
              currentLang={currentLang}
              onBack={() => setActiveView('home')}
            />
          )}

          {activeView === 'hospitals' && (
            <HospitalLocatorView
              currentLang={currentLang}
              onBack={() => setActiveView('home')}
            />
          )}

          {activeView === 'education' && (
            <HealthEducationView
              currentLang={currentLang}
              onBack={() => setActiveView('home')}
            />
          )}

          {activeView === 'about' && (
            <AboutTrustView
              currentLang={currentLang}
              onBack={() => setActiveView('home')}
            />
          )}

          {activeView === 'asha' && (
            <AshaConsoleView
              currentLang={currentLang}
              onBack={() => setActiveView('home')}
              onOpenEmergencyModal={() => setIsEmergencyModalOpen(true)}
            />
          )}

          {activeView === 'reminders' && (
            <RemindersView
              currentLang={currentLang}
              onBack={() => setActiveView('home')}
            />
          )}
        </main>

        {/* Minimal Footer */}
        <footer className="relative z-10 py-4 px-4 text-center text-xs text-slate-400 glass-panel border-t border-slate-800 mt-8">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1">
              <span>Built with</span>
              <Heart className="w-3.5 h-3.5 text-red-500 fill-current" />
              <span>for Rural & Semi-Urban India</span>
            </div>

            <div className="flex items-center gap-4 font-semibold">
              <button
                onClick={() => setActiveView('about')}
                className="hover:text-brand-300 transition"
              >
                Trust & Privacy
              </button>
              <span>•</span>
              <button
                onClick={() => setIsLangModalOpen(true)}
                className="hover:text-brand-300 transition"
              >
                9 Languages
              </button>
            </div>
          </div>
        </footer>

      </div>

      {/* Floating Sticky SOS FAB Button at Bottom-Right */}
      <button
        onClick={() => setIsEmergencyModalOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-sm shadow-2xl shadow-red-600/50 border border-red-400/40 transition-transform hover:scale-110 active:scale-95 animate-bounce-subtle"
        title="108 Emergency Ambulance"
      >
        <ShieldAlert className="w-5 h-5 animate-pulse" />
        <span className="hidden sm:inline">108 SOS</span>
      </button>

      {sharedModals}

    </div>
  );
}

export default App;
