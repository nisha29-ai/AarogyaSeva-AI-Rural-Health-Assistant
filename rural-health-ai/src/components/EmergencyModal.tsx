import React, { useState } from 'react';
import { X, PhoneCall, ShieldAlert, Navigation, MessageSquare, CheckCircle2 } from 'lucide-react';
import { LanguageCode, TRANSLATIONS } from '../data/translations';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: LanguageCode;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({
  isOpen,
  onClose,
  currentLang,
}) => {
  if (!isOpen) return null;

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.hi;
  const [gpsSent, setGpsSent] = useState(false);

  const handleShareGps = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude.toFixed(4);
          const lng = pos.coords.longitude.toFixed(4);
          const msg = encodeURIComponent(
            `🚨 EMERGENCY MEDICAL SOS! My live location: https://maps.google.com/?q=${lat},${lng}. Please send 108 ambulance!`
          );
          window.open(`https://wa.me/?text=${msg}`, '_blank');
          setGpsSent(true);
        },
        () => {
          // Fallback location
          const msg = encodeURIComponent(
            `🚨 EMERGENCY MEDICAL SOS! Please send 108 ambulance to my village!`
          );
          window.open(`https://wa.me/?text=${msg}`, '_blank');
          setGpsSent(true);
        }
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg animate-fade-in">
      <div className="glass-panel w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-red-500/40 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition"
        >
          <X className="w-6 h-6" />
        </button>

        {/* SOS Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-red-600/30 border-2 border-red-500 text-red-500 mx-auto flex items-center justify-center mb-3 animate-pulse">
            <ShieldAlert className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight">
            {t.emergencySos}
          </h2>
          <p className="text-sm text-red-300 font-medium mt-1">
            {t.emergencySub}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          
          {/* Primary 108 Ambulance Call */}
          <a
            href="tel:108"
            className="flex items-center justify-between p-5 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-500 text-white font-extrabold text-lg shadow-xl shadow-red-600/40 border border-red-400/40 transition-transform active:scale-95 group"
          >
            <div className="flex items-center gap-3">
              <PhoneCall className="w-7 h-7 animate-bounce" />
              <div className="text-left">
                <div className="text-xl font-black">{t.call108Now}</div>
                <div className="text-xs text-red-100 font-normal">24x7 Free Ambulance Hotline</div>
              </div>
            </div>
            <span className="text-2xl font-black bg-white/20 px-3 py-1 rounded-xl">108</span>
          </a>

          {/* 104 Medical Helpline */}
          <a
            href="tel:104"
            className="flex items-center justify-between p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-700/90 text-slate-100 font-bold border border-slate-700 transition"
          >
            <div className="flex items-center gap-3">
              <PhoneCall className="w-6 h-6 text-brand-400" />
              <span>{t.callHelpline}</span>
            </div>
            <span className="text-lg font-bold text-brand-400">104</span>
          </a>

          {/* 102 Pregnant Mother Ambulance */}
          <a
            href="tel:102"
            className="flex items-center justify-between p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-700/90 text-slate-100 font-bold border border-slate-700 transition"
          >
            <div className="flex items-center gap-3">
              <PhoneCall className="w-6 h-6 text-amber-400" />
              <span>102 मातृ एम्बुलेंस (Maternity Ambulance)</span>
            </div>
            <span className="text-lg font-bold text-amber-400">102</span>
          </a>

          {/* GPS Location Share via WhatsApp */}
          <button
            onClick={handleShareGps}
            className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl bg-emerald-700/60 hover:bg-emerald-600/70 text-white font-bold border border-emerald-500/40 transition"
          >
            {gpsSent ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                <span>GPS Location Opened!</span>
              </>
            ) : (
              <>
                <Navigation className="w-5 h-5 text-emerald-300" />
                <MessageSquare className="w-5 h-5 text-emerald-300" />
                <span>{t.shareLocationWhatsapp}</span>
              </>
            )}
          </button>

        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 text-center text-xs text-slate-400">
          <p>Government of India Emergency Medical Dispatch (EMRI) Services</p>
        </div>

      </div>
    </div>
  );
};
