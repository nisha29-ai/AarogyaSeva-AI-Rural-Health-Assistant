import React from 'react';
import { ArrowLeft, ShieldCheck, Lock, Heart, ExternalLink } from 'lucide-react';
import { LanguageCode, TRANSLATIONS } from '../data/translations';

interface AboutTrustViewProps {
  currentLang: LanguageCode;
  onBack: () => void;
}

export const AboutTrustView: React.FC<AboutTrustViewProps> = ({
  currentLang,
  onBack,
}) => {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.hi;

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 space-y-6">
      
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
          <ShieldCheck className="w-6 h-6 text-brand-400" />
          <h2 className="text-xl font-extrabold text-white">{t.aboutTrust}</h2>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-brand-500/30 shadow-2xl space-y-8">
        
        <div>
          <h3 className="text-2xl font-black text-white">हमारा उद्देश्य (Our Mission)</h3>
          <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
            आरोग्यसेवा AI का उद्देश्य भारत के ग्रामीण एवं अर्ध-शहरी क्षेत्रों के नागरिकों को सरल भाषा एवं आवाज़ के माध्यम से स्वास्थ्य सलाह, सरकारी स्वास्थ्य योजनाओं की जानकारी और नजदीकी प्राथमिक स्वास्थ्य केंद्रों (PHC) से जोड़ना है।
          </p>
        </div>

        {/* Trust Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-700/80">
            <ShieldCheck className="w-8 h-8 text-brand-400 mb-3" />
            <h4 className="font-bold text-white mb-1">सत्यापित सरकारी स्रोत</h4>
            <p className="text-xs text-slate-400">सभी योजनाएं आयुष्मान भारत (PM-JAY), मातृ वंदना एवं जन औषधि आधिकारिक पोर्टलों से सत्यापित हैं।</p>
          </div>

          <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-700/80">
            <Lock className="w-8 h-8 text-cyan-400 mb-3" />
            <h4 className="font-bold text-white mb-1">100% गोपनीयता (Privacy)</h4>
            <p className="text-xs text-slate-400">आपका कोई भी व्यक्तिगत स्वास्थ्य डेटा सर्वर पर स्टोर नहीं किया जाता।</p>
          </div>

          <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-700/80">
            <Heart className="w-8 h-8 text-amber-400 mb-3" />
            <h4 className="font-bold text-white mb-1">आशा दीदी सहायता</h4>
            <p className="text-xs text-slate-400">स्थानीय ASHA एवं ANM स्वास्थ्य कार्यकर्ताओं के सहयोग हेतु सरल इंटरफ़ेस।</p>
          </div>
        </div>

        {/* Official Links List */}
        <div className="pt-4 border-t border-slate-800">
          <h4 className="font-bold text-white mb-3">आधिकारिक पोर्टल (Official Government Portals):</h4>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://pmjay.gov.in"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 rounded-xl bg-slate-800 text-xs font-bold text-slate-200 hover:text-white flex items-center gap-1.5"
            >
              <span>PMJAY (pmjay.gov.in)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href="https://janaushadhi.gov.in"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 rounded-xl bg-slate-800 text-xs font-bold text-slate-200 hover:text-white flex items-center gap-1.5"
            >
              <span>Janaushadhi (janaushadhi.gov.in)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href="https://pmmvy.wcd.gov.in"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 rounded-xl bg-slate-800 text-xs font-bold text-slate-200 hover:text-white flex items-center gap-1.5"
            >
              <span>PMMVY (pmmvy.wcd.gov.in)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>

    </div>
  );
};
