import React, { useState } from 'react';
import { X, Phone, PhoneOff, Smartphone, CheckCircle } from 'lucide-react';
import { LanguageCode } from '../data/translations';
import { speechEngine } from '../utils/speech';

interface IvrSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: LanguageCode;
}

export const IvrSimulatorModal: React.FC<IvrSimulatorModalProps> = ({
  isOpen,
  onClose,
  currentLang,
}) => {
  const [callState, setCallState] = useState<'idle' | 'calling' | 'connected' | 'ended'>('idle');
  const [, setSelectedOption] = useState<string | null>(null);
  const [ivrLog, setIvrLog] = useState<string[]>([]);
  const [, setSmsReceiptSent] = useState(false);

  if (!isOpen) return null;

  const startCall = () => {
    setCallState('calling');
    setIvrLog(['Connecting to 1800-180-AAROGYA Toll-Free Helpline...']);
    
    setTimeout(() => {
      setCallState('connected');
      const intro = currentLang === 'en'
        ? "Welcome to AarogyaSeva IVR Helpline. Press 1 for Symptom Triage, Press 2 for Govt Health Scheme Eligibility, Press 3 for Nearest PHC Hospital, Press 4 for Emergency Ambulance 108."
        : "आरोग्यसेवा आईवीआर हेल्पलाइन में आपका स्वागत है। लक्षण जांच हेतु 1 दबाएं, सरकारी योजना पात्रता हेतु 2 दबाएं, नजदीकी PHC अस्पताल हेतु 3 दबाएं, आपातकालीन एम्बुलेंस हेतु 4 दबाएं।";
      
      setIvrLog((prev) => [...prev, `[IVR Voice]: ${intro}`]);
      speechEngine.speak(intro, currentLang);
    }, 2000);
  };

  const handleKeyPress = (num: string) => {
    if (callState !== 'connected') return;

    setSelectedOption(num);
    setIvrLog((prev) => [...prev, `[You Pressed]: Key ${num}`]);

    let response = '';
    if (num === '1') {
      response = currentLang === 'en'
        ? "Symptom Triage: If experiencing high fever or breathing difficulty, press * to reach PHC nurse. Drink ORS solution and rest."
        : "लक्षण जांच: यदि तेज बुखार या सांस लेने में तकलीफ है तो नर्स से जुड़ने के लिए * दबाएं। ओआरएस पिएं व विश्राम करें।";
    } else if (num === '2') {
      response = currentLang === 'en'
        ? "Govt Schemes: Under Ayushman Bharat PMJAY, eligible families get ₹5 Lakh free hospital cover per year. Check your Ration Card at PHC."
        : "सरकारी योजना: आयुष्मान भारत PMJAY के तहत प्रतिवर्ष ₹5 लाख का मुफ्त इलाज उपलब्ध है। अपना राशन कार्ड नजदीकी PHC ले जाएं।";
    } else if (num === '3') {
      response = currentLang === 'en'
        ? "Nearest PHC Facility: Rampur Primary Health Center is 4.2 km away. Doctor available 9 AM to 5 PM. Anti-Snake Venom (ASV) available."
        : "नजदीकी PHC केंद्र: रामपुर प्राथमिक स्वास्थ्य केंद्र 4.2 किमी दूर है। डॉक्टर सुबह 9 से शाम 5 बजे तक उपलब्ध हैं। सांप काटने का टीका उपलब्ध है।";
    } else if (num === '4') {
      response = currentLang === 'en'
        ? "EMERGENCY: Dispatching 108 Ambulance alert to your GPS location! Stay calm."
        : "आपातकाल: आपकी लोकेशन पर 108 एम्बुलेंस अलर्ट भेजा जा रहा है! कृपया शांत रहें।";
    } else {
      response = currentLang === 'en' ? "Invalid selection. Please press 1, 2, 3, or 4." : "अमान्य विकल्प। कृपया 1, 2, 3, या 4 दबाएं।";
    }

    setIvrLog((prev) => [...prev, `[IVR Voice]: ${response}`]);
    speechEngine.speak(response, currentLang);
  };

  const endCall = () => {
    setCallState('ended');
    speechEngine.speak(
      currentLang === 'en'
        ? "Thank you for calling. SMS details sent to your phone."
        : "कॉल करने के लिए धन्यवाद। आपके फोन पर एसएमएस भेज दिया गया है।",
      currentLang
    );
    setSmsReceiptSent(true);
    setTimeout(() => {
      setCallState('idle');
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-slate-900 border border-brand-500/40 rounded-3xl p-6 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base">IVR Call Simulator (2G/Feature Phone)</h3>
              <p className="text-[11px] text-slate-400">1800-180-AAROGYA (Toll-Free)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Feature Phone Screen Simulation */}
        <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 font-mono text-xs space-y-2 min-h-[160px] max-h-[220px] overflow-y-auto shadow-inner">
          <div className="flex items-center justify-between text-[10px] text-brand-400 border-b border-slate-900 pb-1">
            <span>📶 2G Network (No Data)</span>
            <span>1800-180-AAROGYA</span>
          </div>

          {callState === 'idle' && (
            <div className="text-center py-6 text-slate-400 space-y-2">
              <p className="text-slate-300 font-sans text-sm font-bold">फीचर फोन उपयोगकर्ता आईवीआर सिम्युलेटर</p>
              <p className="text-[11px]">Tap 'Call Hotline' to simulate a voice call on a basic button phone without internet.</p>
            </div>
          )}

          {callState === 'calling' && (
            <div className="text-center py-6 text-amber-400 font-bold animate-pulse">
              📞 Dialing 1800-180-AAROGYA...
            </div>
          )}

          {callState === 'connected' && (
            <div className="space-y-2 text-slate-200">
              {ivrLog.map((log, idx) => (
                <div key={idx} className={log.startsWith('[You') ? 'text-emerald-400 font-bold' : 'text-slate-300'}>
                  {log}
                </div>
              ))}
            </div>
          )}

          {callState === 'ended' && (
            <div className="text-center py-4 text-emerald-400 font-bold space-y-1">
              <CheckCircle className="w-6 h-6 mx-auto text-emerald-400" />
              <p>Call Ended • FREE Toll-Free Call</p>
              <p className="text-[10px] text-slate-400">SMS summary dispatched to caller mobile.</p>
            </div>
          )}
        </div>

        {/* Dialpad Keypad */}
        <div className="grid grid-cols-3 gap-2">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((key) => (
            <button
              key={key}
              disabled={callState !== 'connected'}
              onClick={() => handleKeyPress(key)}
              className="py-3 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-white font-black text-lg rounded-xl border border-slate-700 active:scale-95 transition"
            >
              {key}
            </button>
          ))}
        </div>

        {/* Call Action Bar */}
        <div className="flex items-center justify-between gap-4 pt-2">
          {callState === 'idle' ? (
            <button
              onClick={startCall}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              <Phone className="w-5 h-5 fill-current" />
              <span>Call Toll-Free Helpline (1800-180-AAROGYA)</span>
            </button>
          ) : (
            <button
              onClick={endCall}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-600/30"
            >
              <PhoneOff className="w-5 h-5" />
              <span>End Voice Call</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
