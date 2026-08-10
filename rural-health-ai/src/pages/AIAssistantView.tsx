import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, AlertTriangle, Volume2, Bot, User, Sparkles, PhoneCall } from 'lucide-react';
import { VoiceButton } from '../components/VoiceButton';
import { LanguageCode, TRANSLATIONS } from '../data/translations';
import { speechEngine } from '../utils/speech';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  isRedFlag?: boolean;
  triageRisk?: 'green' | 'yellow' | 'red';
  time: string;
}

interface AIAssistantViewProps {
  currentLang: LanguageCode;
  onBack: () => void;
  onOpenEmergencyModal: () => void;
}

export const AIAssistantView: React.FC<AIAssistantViewProps> = ({
  currentLang,
  onBack,
  onOpenEmergencyModal,
}) => {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.hi;
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: currentLang === 'en'
        ? "Hello! I am your AarogyaSeva Health Assistant. Describe your symptoms or ask a health question in your language."
        : currentLang === 'bn'
        ? "নমস্কার! আমি আপনার আরোগ্যসেবা স্বাস্থ্য সহকারী। আপনার লক্ষণ বর্ণনা করুন।"
        : currentLang === 'ta'
        ? "வணக்கம்! நான் உங்கள் ஆரோக்கியசேவா சுகாதார உதவியாளர். உங்கள் அறிகுறிகளைக் கூறவும்."
        : currentLang === 'te'
        ? "నమస్కారం! నేను మీ ఆరోగ్యసేవ ఆరోగ్య సహాయకుడిని. మీ లక్షణాలను వివరించండి."
        : currentLang === 'mr'
        ? "नमस्कार! मी आपला आरोग्यसेवा आरोग्य मित्र आहे. आपली लक्षणे सांगा."
        : currentLang === 'gu'
        ? "નમસ્તે! હું તમારો આરોગ્યસેવા સ્વાસ્થ્ય મિત્ર છું. તમારા લક્ષણો જણાવો."
        : currentLang === 'kn'
        ? "ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಆರೋಗ್ಯಸೇವಾ ಆರೋಗ್ಯ ಸಹಾಯಕ. ನಿಮ್ಮ ಲಕ್ಷಣಗಳನ್ನು ತಿಳಿಸಿ."
        : currentLang === 'pa'
        ? "ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ! ਮੈਂ ਤੁਹਾਡਾ ਆਰੋਗਿਆਸੇਵਾ ਸਿਹਤ ਸਹਾਇਕ ਹਾਂ। ਆਪਣੇ ਲੱਛਣ ਦੱਸੋ।"
        : "नमस्ते! मैं आपका आरोग्यसेवा स्वास्थ्य मित्र हूं। अपने लक्षण बताएं या स्वास्थ्य संबंधी सवाल पूछें।",
      triageRisk: 'green',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const quickPrompts = currentLang === 'en' ? [
    { label: 'Fever in Child', query: 'Child has fever and cold, what first aid to give?' },
    { label: 'Snake Bite Action', query: 'What to do immediately after snake bite?' },
    { label: 'Pregnancy Care', query: 'What food and checkups needed during pregnancy?' },
    { label: 'ORS Solution', query: 'How to prepare ORS solution for child diarrhea?' },
  ] : [
    { label: 'बच्चे को बुखार', query: 'बच्चे को तेज बुखार और सर्दी है, क्या प्राथमिक उपचार करें?' },
    { label: 'सांप का काटना', query: 'सांप काटने पर तुरंत क्या करें?' },
    { label: 'गर्भावस्था आहार', query: 'गर्भावस्था के दौरान क्या खाना चाहिए और कौन सी जांच करानी चाहिए?' },
    { label: 'दस्त में ओआरएस', query: 'बच्चे को दस्त लगने पर ओआरएस घोल कैसे बनाएं?' },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputQuery;
    if (!text.trim()) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: text.trim(),
      time: timeStr,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    // Simulate Smart Conversational AI Response Generation
    setTimeout(() => {
      let aiReply = '';
      let isRedFlag = false;
      let triageRisk: 'green' | 'yellow' | 'red' = 'green';

      const lower = text.toLowerCase();
      if (lower.includes('सांप') || lower.includes('snake') || lower.includes('विष')) {
        isRedFlag = true;
        triageRisk = 'red';
        aiReply = currentLang === 'en'
          ? "🚨 EMERGENCY TRIAGE: Snake bite detected! Keep patient completely still. Rush immediately to nearest PHC for free Anti-Snake Venom (ASV). Do NOT make cuts or suck venom."
          : "🚨 आपातकालीन ट्रियाज: सांप काटने पर मरीज को शांत रखें, अंग न हिलाएं और तुरंत 108 एम्बुलेंस बुलाएं या PHC जाएं जहां एंटी-वेनम (ASV) निःशुल्क उपलब्ध है।";
      } else if (lower.includes('छाती') || lower.includes('दर्द') || lower.includes('chest') || lower.includes('heart')) {
        isRedFlag = true;
        triageRisk = 'red';
        aiReply = currentLang === 'en'
          ? "🚨 HIGH PRIORITY EMERGENCY: Severe chest pain can be a cardiac emergency. Call 108 Ambulance immediately and loosen tight clothing."
          : "🚨 उच्च प्राथमिक आपातकाल: छाती में तेज दर्द या दबाव आपातकालीन स्थिति हो सकती है। तुरंत 108 एम्बुलेंस बुलाएं।";
      } else if (lower.includes('बुखार') || lower.includes('fever')) {
        triageRisk = 'yellow';
        aiReply = currentLang === 'en'
          ? "🟡 CLINIC VISIT RECOMMENDED: For fever persist > 2 days or >102°F: 1. Keep hydrated with ORS/boiled water. 2. Cold compresses on forehead. 3. Visit nearest PHC for free Malaria/Dengue test."
          : "🟡 PHC डॉक्टर सलाह: यदि बुखार 2 दिन से अधिक या 102°F से अधिक है: 1. ओआरएस व उबला पानी पिलाएं। 2. ठंडे पानी की पट्टी रखें। 3. नजदीकी PHC में निःशुल्क डेंगू/मलेरिया जांच कराएं।";
      } else if (lower.includes('गर्भवती') || lower.includes('pregnancy') || lower.includes('मातृ')) {
        triageRisk = 'green';
        aiReply = currentLang === 'en'
          ? "🟢 MATERNAL CARE: Take Iron-Folic Acid (IFA) daily from Anganwadi. Schedule 4 ANC checkups. Register for PM Matru Vandana Yojana for ₹6,000 assistance."
          : "🟢 मातृ सुरक्षा सलाह: आंगनवाड़ी से आयरन की गोलियां रोज लें। 4 बार ANC जांच कराएं और ₹6,000 सहायता हेतु प्रधानमंत्री मातृ वंदना योजना में पंजीकरण कराएं।";
      } else {
        triageRisk = 'green';
        aiReply = currentLang === 'en'
          ? "🟢 HOME CARE: Drink clean boiled water, maintain hygiene, and consult your local ASHA health worker or PHC doctor for detailed checkup."
          : "🟢 प्राथमिक परामर्श: उबला हुआ पानी पीएं, स्वच्छता रखें और सटीक जांच के लिए स्थानीय आशा कार्यकर्ता या PHC डॉक्टर से मिलें।";
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiReply,
        isRedFlag,
        triageRisk,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);

      // Auto TTS voice response
      speechEngine.speak(aiReply, currentLang);
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 space-y-4">
      
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
          <div className="w-8 h-8 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center">
            <Bot className="w-5 h-5" />
          </div>
          <span className="font-extrabold text-white">{t.askAi}</span>
        </div>

        <button
          onClick={onOpenEmergencyModal}
          className="px-3 py-1.5 rounded-xl bg-red-600/30 text-red-400 font-bold border border-red-500/40 text-xs flex items-center gap-1 hover:bg-red-600/40 transition"
        >
          <PhoneCall className="w-4 h-4" />
          <span>108 SOS</span>
        </button>
      </div>

      {/* Mandatory Clinical Disclaimer Banner */}
      <div className="glass-panel rounded-2xl p-3.5 bg-amber-950/40 border border-amber-500/40 flex items-start gap-3 text-xs text-amber-200">
        <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-extrabold text-amber-300 block">{t.disclaimerTitle}</span>
          <span>{t.disclaimerText}</span>
        </div>
      </div>

      {/* Floating Chat Container */}
      <div className="glass-panel rounded-3xl p-4 sm:p-6 min-h-[480px] max-h-[60vh] overflow-y-auto space-y-4 border border-brand-500/20 shadow-2xl flex flex-col justify-between">
        
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0 text-white font-bold shadow-md ${
                  msg.sender === 'user'
                    ? 'bg-slate-700 text-slate-200'
                    : msg.isRedFlag
                    ? 'bg-red-600 text-white'
                    : 'bg-gradient-to-tr from-brand-600 to-emerald-400'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-sm sm:text-base leading-relaxed shadow-lg relative ${
                  msg.sender === 'user'
                    ? 'bg-brand-600/90 text-white rounded-tr-none border border-brand-400/40'
                    : msg.isRedFlag
                    ? 'bg-red-950/80 text-white border-2 border-red-500 rounded-tl-none shadow-red-500/30'
                    : 'bg-slate-800/90 text-slate-100 border border-slate-700 rounded-tl-none'
                }`}
              >
                <p className="font-medium whitespace-pre-wrap">{msg.text}</p>

                {/* Speaker Playback button for AI messages */}
                {msg.sender === 'ai' && (
                  <div className="mt-2 pt-2 border-t border-slate-700/60 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400">{msg.time}</span>
                    <button
                      onClick={() => speechEngine.speak(msg.text, currentLang)}
                      className="flex items-center gap-1 text-xs text-brand-300 font-bold hover:text-white transition"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>सुनें (Listen)</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-brand-400 text-xs font-semibold p-2">
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>AI स्वास्थ्य मित्र उत्तर सोच रहा है...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Prompt Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {quickPrompts.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(chip.query)}
            className="px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-brand-500/20 text-slate-200 hover:text-brand-300 text-xs font-bold whitespace-nowrap border border-slate-700 hover:border-brand-500/40 transition flex-shrink-0"
          >
            💬 {chip.label}
          </button>
        ))}
      </div>

      {/* Floating Input Controls (Mic + Text) */}
      <div className="glass-panel rounded-2xl p-3 flex items-center gap-3 border border-brand-500/30 shadow-2xl">
        <VoiceButton
          currentLang={currentLang}
          onVoiceInput={(transcript) => handleSend(transcript)}
          size="sm"
        />

        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="यहां लक्षण या सवाल लिखें... (Type symptoms here)"
          className="flex-1 bg-slate-900/80 border border-slate-700 focus:border-brand-500 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/40"
        />

        <button
          onClick={() => handleSend()}
          className="w-11 h-11 rounded-xl bg-gradient-to-r from-brand-600 to-emerald-500 text-slate-950 font-black flex items-center justify-center hover:scale-105 active:scale-95 transition shadow-lg shadow-brand-500/30"
        >
          <Send className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>

    </div>
  );
};
