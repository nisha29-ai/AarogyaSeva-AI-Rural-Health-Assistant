import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, FileCheck, ExternalLink, PhoneCall, Volume2, Sparkles, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { LanguageCode, TRANSLATIONS } from '../data/translations';
import { GOVT_SCHEMES, GovtScheme } from '../data/schemesData';
import { speechEngine } from '../utils/speech';

interface SchemeFinderViewProps {
  currentLang: LanguageCode;
  onBack: () => void;
}

export const SchemeFinderView: React.FC<SchemeFinderViewProps> = ({
  currentLang,
  onBack,
}) => {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.hi;

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [q1Target, setQ1Target] = useState<string>('');
  const [q2Income, setQ2Income] = useState<string>('');
  const [q3Need, setQ3Need] = useState<string>('');

  const [matchedSchemes, setMatchedSchemes] = useState<GovtScheme[]>([]);

  const handleNextStep = (nextStep: 2 | 3 | 4, val: string, qNum: 1 | 2 | 3) => {
    if (qNum === 1) setQ1Target(val);
    if (qNum === 2) setQ2Income(val);
    if (qNum === 3) setQ3Need(val);

    if (nextStep === 4) {
      // Calculate Matches
      const results = GOVT_SCHEMES.filter((s) => {
        if (val === 'maternity' && s.id === 'pm-matru-vandana') return true;
        if (val === 'pharmacy' && s.id === 'janaushadhi') return true;
        if (s.id === 'pmjay') return true; // Ayushman covers all low-income / seniors
        return true;
      });

      setMatchedSchemes(results);
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      speechEngine.speak(`बधाई हो! आपके लिए ${results.length} सरकारी स्वास्थ्य योजनाएं मिली हैं।`, currentLang);
    }

    setStep(nextStep);
  };

  const handleReset = () => {
    setStep(1);
    setQ1Target('');
    setQ2Income('');
    setQ3Need('');
    setMatchedSchemes([]);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 space-y-6">
      
      {/* Top Header */}
      <div className="glass-panel rounded-2xl p-4 flex items-center justify-between border border-amber-500/30">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-300 hover:text-white font-bold text-sm bg-slate-800/80 px-3 py-2 rounded-xl border border-slate-700 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{t.backToHome}</span>
        </button>

        <div className="flex items-center gap-2">
          <FileCheck className="w-6 h-6 text-amber-400" />
          <h2 className="text-xl font-extrabold text-white">{t.findSchemes}</h2>
        </div>

        {step === 4 && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-xs text-amber-300 font-bold bg-amber-950/60 px-3 py-1.5 rounded-xl border border-amber-500/40"
          >
            <RotateCcw className="w-4 h-4" />
            <span>पुनः जांचें</span>
          </button>
        )}
      </div>

      {/* Progress Bar */}
      <div className="glass-panel rounded-xl p-3 border border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <span className="font-extrabold text-amber-400">
          {step <= 3 ? `चरण (Step) ${step} / 3` : 'परिणाम (Results)'}
        </span>
        <div className="flex-1 mx-4 bg-slate-800 h-2 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full transition-all duration-500"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
        <span className="font-bold text-slate-300">
          {step === 1 ? 'लाभार्थी' : step === 2 ? 'आय' : step === 3 ? 'आवश्यकता' : 'योजना कार्ड्स'}
        </span>
      </div>

      {/* QUESTION 1 */}
      {step === 1 && (
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-amber-500/30 shadow-2xl space-y-6">
          <h3 className="text-2xl font-black text-white">{t.schemeQuestion1}</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => handleNextStep(2, 'maternity', 1)}
              className="p-5 rounded-2xl bg-slate-800/80 hover:bg-amber-500/20 border border-slate-700 hover:border-amber-400 text-left transition hover:scale-[1.02] flex items-center gap-4"
            >
              <span className="text-4xl">🤰</span>
              <div>
                <div className="text-lg font-bold text-white">गर्भवती महिला / माता (Maternity)</div>
                <div className="text-xs text-slate-400 mt-1">गर्भावस्था, प्रसव एवं पोषण सहायता हेतु</div>
              </div>
            </button>

            <button
              onClick={() => handleNextStep(2, 'senior', 1)}
              className="p-5 rounded-2xl bg-slate-800/80 hover:bg-amber-500/20 border border-slate-700 hover:border-amber-400 text-left transition hover:scale-[1.02] flex items-center gap-4"
            >
              <span className="text-4xl">👴</span>
              <div>
                <div className="text-lg font-bold text-white">वरिष्ठ नागरिक (70+ Senior Citizen)</div>
                <div className="text-xs text-slate-400 mt-1">70 वर्ष या उससे अधिक आयु के बुजुर्ग</div>
              </div>
            </button>

            <button
              onClick={() => handleNextStep(2, 'farmer', 1)}
              className="p-5 rounded-2xl bg-slate-800/80 hover:bg-amber-500/20 border border-slate-700 hover:border-amber-400 text-left transition hover:scale-[1.02] flex items-center gap-4"
            >
              <span className="text-4xl">🌾</span>
              <div>
                <div className="text-lg font-bold text-white">किसान / मजदूर परिवार (Farmer/Laborer)</div>
                <div className="text-xs text-slate-400 mt-1">ग्रामीण एवं बीपीएल परिवार</div>
              </div>
            </button>

            <button
              onClick={() => handleNextStep(2, 'general', 1)}
              className="p-5 rounded-2xl bg-slate-800/80 hover:bg-amber-500/20 border border-slate-700 hover:border-amber-400 text-left transition hover:scale-[1.02] flex items-center gap-4"
            >
              <span className="text-4xl">👨‍👩‍👧‍👦</span>
              <div>
                <div className="text-lg font-bold text-white">सामान्य परिवार (General Family)</div>
                <div className="text-xs text-slate-400 mt-1">किसी भी अन्य नागरिक हेतु</div>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* QUESTION 2 */}
      {step === 2 && (
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-amber-500/30 shadow-2xl space-y-6">
          <h3 className="text-2xl font-black text-white">{t.schemeQuestion2}</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              onClick={() => handleNextStep(3, 'bpl', 2)}
              className="p-5 rounded-2xl bg-slate-800/80 hover:bg-amber-500/20 border border-slate-700 hover:border-amber-400 text-left transition hover:scale-[1.02]"
            >
              <span className="text-3xl block mb-2">📄</span>
              <div className="text-lg font-bold text-white">BPL / राशन कार्ड धारक</div>
              <div className="text-xs text-slate-400 mt-1">कच्चा मकान या बीपीएल कार्ड उपलब्ध</div>
            </button>

            <button
              onClick={() => handleNextStep(3, 'under25', 2)}
              className="p-5 rounded-2xl bg-slate-800/80 hover:bg-amber-500/20 border border-slate-700 hover:border-amber-400 text-left transition hover:scale-[1.02]"
            >
              <span className="text-3xl block mb-2">💰</span>
              <div className="text-lg font-bold text-white">वार्षिक आय ₹2.5 लाख से कम</div>
              <div className="text-xs text-slate-400 mt-1">कम आय वाले ग्रामीण परिवार</div>
            </button>

            <button
              onClick={() => handleNextStep(3, 'above25', 2)}
              className="p-5 rounded-2xl bg-slate-800/80 hover:bg-amber-500/20 border border-slate-700 hover:border-amber-400 text-left transition hover:scale-[1.02]"
            >
              <span className="text-3xl block mb-2">🏛️</span>
              <div className="text-lg font-bold text-white">वार्षिक आय ₹2.5 लाख से अधिक</div>
              <div className="text-xs text-slate-400 mt-1">सामान्य श्रेणी परिवार</div>
            </button>
          </div>
        </div>
      )}

      {/* QUESTION 3 */}
      {step === 3 && (
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-amber-500/30 shadow-2xl space-y-6">
          <h3 className="text-2xl font-black text-white">{t.schemeQuestion3}</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              onClick={() => handleNextStep(4, 'hospital', 3)}
              className="p-5 rounded-2xl bg-slate-800/80 hover:bg-amber-500/20 border border-slate-700 hover:border-amber-400 text-left transition hover:scale-[1.02]"
            >
              <span className="text-3xl block mb-2">🏥</span>
              <div className="text-lg font-bold text-white">अस्पताल में भर्ती व ऑपरेशन</div>
              <div className="text-xs text-slate-400 mt-1">गंभीर बीमारी या सर्जरी हेतु 5 लाख बीमा</div>
            </button>

            <button
              onClick={() => handleNextStep(4, 'pharmacy', 3)}
              className="p-5 rounded-2xl bg-slate-800/80 hover:bg-amber-500/20 border border-slate-700 hover:border-amber-400 text-left transition hover:scale-[1.02]"
            >
              <span className="text-3xl block mb-2">💊</span>
              <div className="text-lg font-bold text-white">सस्ती दवाएं (90% छूट)</div>
              <div className="text-xs text-slate-400 mt-1">बीपी, शुगर, कैंसर की जेनेरिक दवाएं</div>
            </button>

            <button
              onClick={() => handleNextStep(4, 'maternity', 3)}
              className="p-5 rounded-2xl bg-slate-800/80 hover:bg-amber-500/20 border border-slate-700 hover:border-amber-400 text-left transition hover:scale-[1.02]"
            >
              <span className="text-3xl block mb-2">👶</span>
              <div className="text-lg font-bold text-white">मातृत्व एवं शिशु सहायता</div>
              <div className="text-xs text-slate-400 mt-1">गर्भावस्था भत्ता ₹6,000 व पोषाहार</div>
            </button>
          </div>
        </div>
      )}

      {/* RESULTS DISPLAY CARDS */}
      {step === 4 && (
        <div className="space-y-6">
          <div className="glass-panel rounded-2xl p-4 bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-between text-emerald-300">
            <div className="flex items-center gap-2 font-black text-lg">
              <Sparkles className="w-6 h-6 text-emerald-400" />
              <span>आपके लिए {matchedSchemes.length} सरकारी योजनाएं पाई गईं!</span>
            </div>
          </div>

          <div className="space-y-6">
            {matchedSchemes.map((scheme) => (
              <div
                key={scheme.id}
                className="glass-panel rounded-3xl p-6 sm:p-8 border border-amber-500/30 space-y-6 relative overflow-hidden"
              >
                {/* Badge */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-4">
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-extrabold text-xs border border-amber-500/30">
                    {scheme.badge}
                  </span>
                  <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> {t.verifiedGovtScheme}
                  </span>
                </div>

                {/* Scheme Title & Coverage */}
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                    {scheme.title[currentLang] || scheme.title.hi}
                  </h3>
                  <p className="text-lg text-emerald-300 font-extrabold mt-1">
                    {scheme.coverage[currentLang] || scheme.coverage.hi}
                  </p>
                  <p className="text-sm text-slate-300 mt-2">
                    {scheme.summary[currentLang] || scheme.summary.hi}
                  </p>
                </div>

                {/* Eligibility & Docs grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                  <div>
                    <h4 className="text-sm font-bold text-amber-400 mb-2">पात्रता मापदंड (Eligibility):</h4>
                    <ul className="space-y-1 text-xs text-slate-300 list-disc list-inside">
                      {(scheme.eligibility[currentLang] || scheme.eligibility.hi || []).map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-cyan-400 mb-2">आवश्यक दस्तावेज (Documents):</h4>
                    <ul className="space-y-1 text-xs text-slate-300 list-disc list-inside">
                      {(scheme.documents[currentLang] || scheme.documents.hi || []).map((doc, i) => (
                        <li key={i}>{doc}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Step-by-step How to Apply */}
                <div>
                  <h4 className="text-sm font-extrabold text-white mb-2">आवेदन कैसे करें (How to apply):</h4>
                  <ol className="space-y-2 text-xs sm:text-sm text-slate-200">
                    {(scheme.howToApply[currentLang] || scheme.howToApply.hi || []).map((stepTxt, idx) => (
                      <li key={idx} className="flex items-start gap-2 bg-slate-800/60 p-2.5 rounded-xl">
                        <span className="w-5 h-5 rounded-full bg-brand-500 text-slate-950 font-black flex items-center justify-center text-xs flex-shrink-0">
                          {idx + 1}
                        </span>
                        <span>{stepTxt}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Audio Narration & Official Link Footer */}
                <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                  <button
                    onClick={() =>
                      speechEngine.speak(
                        `${scheme.title[currentLang] || scheme.title.hi}. ${scheme.summary[currentLang] || scheme.summary.hi}`,
                        currentLang
                      )
                    }
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-500/20 text-brand-300 font-extrabold text-xs hover:bg-brand-500/30 transition"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>आवाज़ में सुनें (Voiceover)</span>
                  </button>

                  <div className="flex items-center gap-3">
                    <a
                      href={`tel:${scheme.helpline}`}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 text-slate-200 font-bold text-xs hover:bg-slate-700"
                    >
                      <PhoneCall className="w-4 h-4 text-emerald-400" />
                      <span>{scheme.helpline}</span>
                    </a>

                    <a
                      href={scheme.officialLink}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500/20 text-amber-300 font-bold text-xs border border-amber-500/40 hover:bg-amber-500/30"
                    >
                      <span>सरकारी पोर्टल</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
