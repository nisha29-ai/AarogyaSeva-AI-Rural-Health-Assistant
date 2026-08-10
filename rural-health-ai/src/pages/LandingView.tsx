import React from 'react';
import { Sparkles, ArrowRight, HeartPulse, Bot, FileText, Hospital, Users, Bell, PhoneCall, ShieldAlert, Globe } from 'lucide-react';
import { LanguageCode, LANGUAGES, getTranslation } from '../data/translations';

interface LandingViewProps {
  currentLang: LanguageCode;
  onEnterPortal: () => void;
  onNavigateView: (view: 'ai' | 'schemes' | 'hospitals' | 'asha' | 'reminders') => void;
  onOpenLangModal: () => void;
  onOpenEmergencyModal: () => void;
  onOpenIvrModal: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({
  currentLang,
  onEnterPortal,
  onNavigateView,
  onOpenLangModal,
  onOpenEmergencyModal,
  onOpenIvrModal,
}) => {
  const activeLang = LANGUAGES.find((l) => l.code === currentLang);

  const tLanding = {
    en: {
      badge: "AI-Powered Cosmic Rural Healthcare Platform",
      title: "AarogyaSeva AI",
      tagline: "Multilingual Voice Healthcare & Government Scheme Assistant",
      subText: "Empowering rural & semi-urban families with instant voice symptom triage, Ayushman Bharat scheme eligibility, hospital location, and ASHA health worker support in your native language.",
      enterBtn: "Enter Health Portal Dashboard",
      askAiBtn: "Talk to AI Doctor Friend",
      ivrBtn: "1800 IVR Feature Phone Hotline",
      emergencyBtn: "108 Ambulance SOS",
      feature1Title: "Voice Symptom Triage",
      feature1Sub: "Describe symptoms by speaking naturally in 9 Indian languages & dialects.",
      feature2Title: "Ayushman Scheme Finder",
      feature2Sub: "Instant 3-step eligibility check for PMJAY, PMMVY, and state health benefits.",
      feature3Title: "ASHA Worker Console",
      feature3Sub: "Frontline worker helper dashboard for household registers & red-flag alerts.",
      feature4Title: "2G IVR Phone Hotline",
      feature4Sub: "Toll-free voice hotline accessible on basic mobile feature button phones.",
      problemTitle: "Why Rural India Needs This",
      problems: [
        { icon: "🗣️", text: "Health info is mostly in English/Hindi — regional speakers are left out" },
        { icon: "📵", text: "Poor 2G connectivity and low literacy block text-heavy apps" },
        { icon: "🏥", text: "PHCs are far away — people can't tell if a visit is urgent" },
        { icon: "📋", text: "PMJAY & state schemes exist but enrollment feels impossible" },
      ],
      howTitle: "How It Works",
      steps: [
        { num: "1", title: "Speak in Your Language", desc: "Describe symptoms by voice or tap simple icons — no typing needed." },
        { num: "2", title: "Get Guided Triage", desc: "AI asks follow-up questions and classifies: self-care, clinic visit, or emergency." },
        { num: "3", title: "Access Schemes & Care", desc: "Check PMJAY eligibility, find nearest PHC, or call 108 instantly." },
      ],
      personasTitle: "Built For Real People",
      personas: [
        { emoji: "👩‍🌾", name: "Radha, 42", role: "Village mother", need: "Child fever triage & maternal scheme info in her dialect" },
        { emoji: "👨‍🌾", name: "Suresh, 55", role: "Farmer with diabetes", need: "PMJAY eligibility & medication reminders" },
        { emoji: "👩‍⚕️", name: "ASHA Worker", role: "Frontline health worker", need: "Quick household lookup & red-flag alerts" },
        { emoji: "👴", name: "Elderly User", role: "Low digital literacy", need: "Voice-only interaction on a shared family phone" },
      ],
      statsTitle: "Our Goals (Year 1)",
      stats: [
        { value: "500K+", label: "Monthly users" },
        { value: "12+", label: "Languages" },
        { value: "80%", label: "Triage completion" },
        { value: "25%", label: "Scheme enrollment" },
      ],
      footerNote: "Guidance only — not a medical diagnosis. Sources: MoHFW, WHO, ICMR.",
    },
    hi: {
      badge: "एआई-संचालित कॉस्मिक ग्रामीण स्वास्थ्य मंच",
      title: "आरोग्यसेवा AI",
      tagline: "बहुभाषी आवाज़ स्वास्थ्य एवं सरकारी योजना सहायक",
      subText: "आपकी मातृभाषा में बोलकर लक्षण जांच, आयुष्मान भारत पात्रता, नजदीकी अस्पताल खोज और आशा कार्यकर्ता सहायता का आधुनिक कॉस्मिक अनुभव।",
      enterBtn: "स्वास्थ्य पोर्टल डैशबोर्ड में प्रवेश करें",
      askAiBtn: "AI डॉक्टर मित्र से बात करें",
      ivrBtn: "1800 आईवीआर फीचर फोन हेल्पलाइन",
      emergencyBtn: "108 आपातकालीन एम्बुलेंस",
      feature1Title: "वाक् लक्षण ट्रियाज",
      feature1Sub: "9 भारतीय भाषाओं और बोलियों में अपनी आवाज़ से लक्षण बताएं।",
      feature2Title: "आयुष्मान योजना खोजक",
      feature2Sub: "पीएम-जय और मातृ वंदना योजना हेतु तुरंत 3-चरणीय पात्रता जांच।",
      feature3Title: "आशा कार्यकर्ता कंसोल",
      feature3Sub: "गांव के परिवारों की सूची व आपातकालीन रेड-फ्लैग अलर्ट्स।",
      feature4Title: "2G फीचर फोन आईवीआर",
      feature4Sub: "बिना इंटरनेट वाले साधारण कीपैड फोन हेतु निःशुल्क आवाज़ कॉल।",
      problemTitle: "ग्रामीण भारत को इसकी क्यों ज़रूरत है",
      problems: [
        { icon: "🗣️", text: "स्वास्थ्य जानकारी अंग्रेज़ी/हिंदी में — क्षेत्रीय भाषा बोलने वाले वंचित" },
        { icon: "📵", text: "2G इंटरनेट और कम साक्षरता — टेक्स्ट ऐप्स काम नहीं करते" },
        { icon: "🏥", text: "PHC दूर है — पता नहीं चलता कि जाना ज़रूरी है या नहीं" },
        { icon: "📋", text: "PMJAY योजनाएं हैं पर आवेदन प्रक्रिया बहुत कठिन" },
      ],
      howTitle: "यह कैसे काम करता है",
      steps: [
        { num: "1", title: "अपनी भाषा में बोलें", desc: "आवाज़ से लक्षण बताएं या आइकन दबाएं — टाइपिंग की ज़रूरत नहीं।" },
        { num: "2", title: "मार्गदर्शित ट्रियाज पाएं", desc: "AI अनुवर्ती प्रश्न पूछकर: घरेलू देखभाल, क्लिनिक, या आपातकाल बताता है।" },
        { num: "3", title: "योजना और देखभाल पाएं", desc: "PMJAY पात्रता जांचें, नज़दीकी PHC खोजें, या 108 पर तुरंत कॉल करें।" },
      ],
      personasTitle: "असली लोगों के लिए बनाया गया",
      personas: [
        { emoji: "👩‍🌾", name: "राधा, 42", role: "गाँव की माँ", need: "बच्चे के बुखार की जांच और मातृ योजना अपनी बोली में" },
        { emoji: "👨‍🌾", name: "सुरेश, 55", role: "मधुमेह वाले किसान", need: "PMJAY पात्रता और दवा अनुस्मारक" },
        { emoji: "👩‍⚕️", name: "आशा कार्यकर्ता", role: "सामने की स्वास्थ्य कर्मी", need: "परिवारों की त्वरित खोज और रेड-फ्लैग अलर्ट" },
        { emoji: "👴", name: "बुज़ुर्ग उपयोगकर्ता", role: "कम डिजिटल ज्ञान", need: "परिवार के फोन पर केवल आवाज़ से बात" },
      ],
      statsTitle: "हमारे लक्ष्य (वर्ष 1)",
      stats: [
        { value: "5 लाख+", label: "मासिक उपयोगकर्ता" },
        { value: "12+", label: "भाषाएं" },
        { value: "80%", label: "ट्रियाज पूर्णता" },
        { value: "25%", label: "योजना नामांकन" },
      ],
      footerNote: "केवल मार्गदर्शन — चिकित्सा निदान नहीं। स्रोत: MoHFW, WHO, ICMR।",
    },
    bn: {
      badge: "এআই চালিত গ্রামীণ স্বাস্থ্য প্ল্যাটফর্ম",
      title: "আরোগ্যসেবা AI",
      tagline: "বহুভাষিক ভয়েস স্বাস্থ্য ও সরকারি প্রকল্প সহকারী",
      subText: "আপনার নিজস্ব ভাষায় ভয়েস উপসর্গ পরীক্ষা, আয়ুষ্মান ভারত যোগ্যতা এবং হাসপাতাল সন্ধান।",
      enterBtn: "স্বাস্থ্য পোর্টালে প্রবেশ করুন",
      askAiBtn: "AI ডাক্তার বন্ধুর সাথে কথা বলুন",
      ivrBtn: "১৮০০ আইভিআর হেল্পলাইন",
      emergencyBtn: "১০৮ অ্যাম্বুলেন্স সেবা",
      feature1Title: "ভয়েস উপসর্গ পরীক্ষা",
      feature1Sub: "৯টি ভাষায় নিজের কণ্ঠে কথা বলে চিকিৎসা পরামর্শ পান।",
      feature2Title: "সরকারি প্রকল্প খুঁজুন",
      feature2Sub: "আয়ুষ্মান ভারতের যোগ্যতা পরীক্ষা করুন।",
      feature3Title: "আশা কর্মী পোর্টাল",
      feature3Sub: "পরিবার রেজিস্টার এবং জরুরী অ্যালার্ট।",
      feature4Title: "ফিচার ফোন ভয়েস কল",
      feature4Sub: "বাটন ফোনের জন্য ফ্রি ভয়েস কল।",
    },
    ta: {
      badge: "AI சுகாதார தளம்",
      title: "ஆரோக்யசேவா AI",
      tagline: "பன்மொழி குரல் வழிகாட்டி",
      subText: "உங்கள் தாய்மொழியில் அறிகுறிகளைப் பேசி அரசுத் திட்டங்களின் பலன்களைப் பெறுங்கள்.",
      enterBtn: "சுகாதார தளத்தில் நுழையவும்",
      askAiBtn: "AI மருத்துவருடன் பேசுங்கள்",
      ivrBtn: "1800 IVR அழைப்பு",
      emergencyBtn: "108 அவசர சேவை",
      feature1Title: "குரல் வழி சிகிச்சை",
      feature1Sub: "9 இந்திய மொழிகளில் குரல் மூலம் ஆலோசனை பெறுங்கள்.",
      feature2Title: "அரசு திட்டங்கள்",
      feature2Sub: "ஆயுஷ்மான் பாரத் தகுதி பரிசோதனை.",
      feature3Title: "ஆஷா போர்டல்",
      feature3Sub: "குடும்பங்கள் பதிவு & அவசர எச்சரிக்கை.",
      feature4Title: "சாதாரண போன் அழைப்பு",
      feature4Sub: "இணையமில்லாத போன்களுக்கான சேவை.",
    },
    te: {
      badge: "AI గ్రామీణ ఆరోగ్య పోర్టల్",
      title: "ఆరోగ్యసేవ AI",
      tagline: "బహుభాషా వాయిస్ ఆరోగ్య సహాయకుడు",
      subText: "మీ మాతృభాషలో లక్షణాలు చెప్పి ఆయుష్మాన్ భారత్ మరియు ఆసుపత్రుల వివరాలు పొందండి.",
      enterBtn: "ఆరోగ్య పోర్టల్‌లోకి ప్రవేశించండి",
      askAiBtn: "AI డాక్టర్‌తో మాట్లాడండి",
      ivrBtn: "1800 IVR కాల్ హెల్ప్‌లైన్",
      emergencyBtn: "108 అంబులెన్స్ సేవ",
      feature1Title: "వాయిస్ లక్షణాల తనిఖీ",
      feature1Sub: "9 భారతీయ భాషలలో వాయిస్ ద్వారా సలహాలు పొందండి.",
      feature2Title: "ప్రభుత్వ పథకాలు",
      feature2Sub: "ఆయుష్మాన్ భారత్ అర్హత తనిఖీ.",
      feature3Title: "ఆశా కార్యకర్త పోర్టల్",
      feature3Sub: "కుటుంబాల నమోదు మరియు హెచ్చరికలు.",
      feature4Title: "ఫీచర్ ఫోన్ వాయిస్ కాల్",
      feature4Sub: "బటన్ ఫోన్ల కోసం ఉచిత కాల్ సేవ.",
    },
    mr: {
      badge: "AI ग्रामीण आरोग्य पोर्टल",
      title: "आरोग्यसेवा AI",
      tagline: "बहुभाषिक व्हॉइस आरोग्य व योजना सहाय्यक",
      subText: "आपल्या मातृभाषेत बोलून लक्षणे तपासा, आयुष्मान भारत योजना व रुग्णालये शोधा.",
      enterBtn: "आरोग्य पोर्टलवर जा",
      askAiBtn: "AI डॉक्टर मित्राशी बोला",
      ivrBtn: "1800 IVR फोन हेल्पलाइन",
      emergencyBtn: "108 ॲम्ब्युलन्स",
      feature1Title: "व्हॉइस लक्षण तपासणी",
      feature1Sub: "९ भारतीय भाषांमध्ये बोला व वैद्यकीय सल्ला मिळवा.",
      feature2Title: "शासकीय योजना",
      feature2Sub: "आयुष्मान भारत पात्रता तपासणी.",
      feature3Title: "आशा सेविका पोर्टल",
      feature3Sub: "कुटुंब नोंदणी व तातडीचे अलर्ट्स.",
      feature4Title: "२G फीचर फोन कॉल्स",
      feature4Sub: "साध्या बटण फोनसाठी मोफत कॉल.",
    },
    gu: {
      badge: "AI ગ્રામીણ આરોગ્ય પોર્ટલ",
      title: "આરોગ્યસેવા AI",
      tagline: "બહુભાષી વોઇસ આરોગ્ય અને યોજના મદદનીશ",
      subText: "તમારી માતૃભાષામાં બોલીને લક્ષણો ચકાસો અને આયુષ્માન ભારત યોજનાઓની માહિતી મેળવો.",
      enterBtn: "આરોગ્ય પોર્ટલમાં પ્રવેશ કરો",
      askAiBtn: "AI ડૉક્ટર મિત્ર સાથે વાત કરો",
      ivrBtn: "1800 IVR હેલ્પલાઇન",
      emergencyBtn: "108 ઈમરજન્સી એમ્બ્યુલન્સ",
      feature1Title: "વોઇસ લક્ષણ ચકાસણી",
      feature1Sub: "9 ભારતીય ભાષાઓમાં બોલીને સલાહ મેળવો.",
      feature2Title: "સરકારી યોજનાઓ",
      feature2Sub: "આયુષ્માન ભારત પાત્રતા ચકાસો.",
      feature3Title: "આશા કાર્યકર પોર્ટલ",
      feature3Sub: "કુટુંબ રજિસ્ટર અને એલર્ટ્સ.",
      feature4Title: "બટન ફોન વોઇસ કોલ",
      feature4Sub: "ઇન્ટરનેટ વિનાના ફોન માટે કોલ.",
    },
    kn: {
      badge: "AI ಗ್ರಾಮೀಣ ಆರೋಗ್ಯ ಪೋರ್ಟಲ್",
      title: "ಆರೋಗ್ಯಸೇವಾ AI",
      tagline: "ಬಹುಭಾಷಾ ವಾಯ್ಸ್ ಆರೋಗ್ಯ ಸಹಾಯಕ",
      subText: "ನಿಮ್ಮ ಮಾತೃಭಾಷೆಯಲ್ಲಿ ಮಾತನಾಡಿ ಲಕ್ಷಣಗಳನ್ನು ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಸರ್ಕಾರಿ ಯೋಜನೆಗಳನ್ನು ಪಡೆಯಿರಿ.",
      enterBtn: "ಆರೋಗ್ಯ ಪೋರ್ಟಲ್‌ಗೆ ಪ್ರವೇಶಿಸಿ",
      askAiBtn: "AI ವೈದ್ಯರೊಂದಿಗೆ ಮಾತನಾಡಿ",
      ivrBtn: "1800 IVR ಕಾಲ್ ಹೆಲ್ಪ್‌ಲೈನ್",
      emergencyBtn: "108 ಅಂಬ್ಯುಲೆನ್ಸ್",
      feature1Title: "ವಾಯ್ಸ್ ಲಕ್ಷಣ ಪರಿಶೀಲನೆ",
      feature1Sub: "9 ಭಾರತೀಯ ಭಾಷೆಗಳಲ್ಲಿ ಮಾತನಾಡಿ ಸಲಹೆ ಪಡೆಯಿರಿ.",
      feature2Title: "ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು",
      feature2Sub: "ಆಯುಷ್ಮಾನ್ ಭಾರತ್ ಅರ್ಹತೆ ಪರಿಶೀಲನೆ.",
      feature3Title: "ಆಶಾ ಪೋರ್ಟಲ್",
      feature3Sub: "ಕುಟುಂಬಗಳ ನೋಂದಣಿ ಮತ್ತು ಅಲರ್ಟ್‌ಗಳು.",
      feature4Title: "ಫೀಚರ್ ಫೋನ್ ಕಾಲ್",
      feature4Sub: "ಬಟನ್ ಫೋನ್‌ಗಳಿಗಾಗಿ ಉಚಿತ ಕಾಲ್.",
    },
    pa: {
      badge: "AI ਗ੍ਰਾਮੀਣ ਸਿਹਤ ਪੋਰਟਲ",
      title: "ਆਰੋਗਿਆਸੇਵਾ AI",
      tagline: "ਬਹੁਭਾਸ਼ੀ ਵੌਇਸ ਸਿਹਤ ਅਤੇ ਯੋਜਨਾ ਸਹਾਇਕ",
      subText: "ਆਪਣੀ ਮਾਂ-ਬੋਲੀ ਵਿੱਚ ਬੋਲ ਕੇ ਲੱਛਣ ਜਾਂਚੋ ਅਤੇ ਆਯੁਸ਼ਮਾਨ ਭਾਰਤ ਯੋਜਨਾਵਾਂ ਲੱਭੋ।",
      enterBtn: "ਸਿਹਤ ਪੋਰਟਲ ਵਿੱਚ ਦਾਖਲ ਹੋਵੋ",
      askAiBtn: "AI ਡਾਕਟਰ ਨਾਲ ਗੱਲ ਕਰੋ",
      ivrBtn: "1800 IVR ਕਾਲ ਹੈਲਪਲਾਈਨ",
      emergencyBtn: "108 ਐਂਬੂਲੈਂਸ",
      feature1Title: "ਵੌਇਸ ਲੱਛਣ ਜਾਂਚ",
      feature1Sub: "9 ਭਾਰਤੀ ਭਾਸ਼ਾਵਾਂ ਵਿੱਚ ਬੋਲ ਕੇ ਸਲਾਹ ਲਓ।",
      feature2Title: "ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ",
      feature2Sub: "ਆਯੁਸ਼ਮਾਨ ਭਾਰਤ ਯੋਗਤਾ ਜਾਂਚੋ।",
      feature3Title: "ਆਸ਼ਾ ਵਰਕਰ ਪੋਰਟਲ",
      feature3Sub: "ਪਰਿਵਾਰ ਰਜਿਸਟਰ ਅਤੇ ਅਲਰਟ।",
      feature4Title: "ਬਟਨ ਫੋਨ ਵੌਇਸ ਕਾਲ",
      feature4Sub: "ਇੰਟਰਨੈੱਟ ਤੋਂ ਬਿਨਾਂ ਫੋਨਾਂ ਲਈ ਕਾਲ।",
    }
  };

  const t = { ...tLanding.en, ...(tLanding[currentLang] ?? {}) };

  return (
    <div className="min-h-screen flex flex-col max-w-6xl mx-auto px-4 py-8 relative z-10">
      
      {/* Floating Header Toolbar */}
      <div className="w-full flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-600 via-brand-500 to-emerald-300 p-0.5 shadow-xl shadow-brand-500/30">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <HeartPulse className="w-6 h-6 text-brand-400 animate-pulse" />
            </div>
          </div>
          <span className="text-xl font-black text-white tracking-tight">{t.title}</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenLangModal}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-brand-500/30 text-white font-bold text-xs shadow-lg transition"
          >
            <Globe className="w-4 h-4 text-brand-400" />
            <span>{activeLang?.flag}</span>
            <span>{activeLang?.nativeName}</span>
          </button>

          <button
            onClick={onOpenEmergencyModal}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 text-white font-black text-xs shadow-lg shadow-red-600/40 border border-red-400/40 transition hover:scale-105"
          >
            <ShieldAlert className="w-4 h-4 animate-pulse" />
            <span>108 SOS</span>
          </button>
        </div>
      </div>

      {/* Main Hero Glass Box */}
      <div className="w-full glass-panel rounded-3xl p-8 sm:p-14 border border-brand-500/40 text-center shadow-2xl space-y-8 relative overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brand-500/20 rounded-full blur-[120px] pointer-events-none" />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/15 border border-brand-400/40 text-brand-300 text-xs sm:text-sm font-black animate-float-slow shadow-inner">
          <Sparkles className="w-4 h-4 text-brand-400" />
          <span>{t.badge}</span>
        </div>

        {/* Hero Heading */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-emerald-300">
            {t.title}
          </h1>
          <p className="text-lg sm:text-2xl font-bold text-brand-300">
            {t.tagline}
          </p>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
            {t.subText}
          </p>
        </div>

        {/* Primary CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={onEnterPortal}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-500 via-emerald-500 to-teal-400 hover:from-brand-400 hover:to-teal-300 text-slate-950 font-black text-base sm:text-lg flex items-center gap-3 shadow-2xl shadow-brand-500/40 hover:scale-105 active:scale-95 transition"
          >
            <span>{t.enterBtn}</span>
            <ArrowRight className="w-6 h-6 stroke-[3]" />
          </button>

          <button
            onClick={() => onNavigateView('ai')}
            className="px-6 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-emerald-300 font-extrabold text-sm sm:text-base border border-emerald-500/40 flex items-center gap-2 transition"
          >
            <Bot className="w-5 h-5 text-emerald-400" />
            <span>{t.askAiBtn}</span>
          </button>

          <button
            onClick={onOpenIvrModal}
            className="px-6 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-amber-300 font-extrabold text-sm sm:text-base border border-amber-500/40 flex items-center gap-2 transition"
          >
            <PhoneCall className="w-5 h-5 text-amber-400" />
            <span>{t.ivrBtn}</span>
          </button>
        </div>

        {/* 4 Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-8 border-t border-slate-800/80">
          <div
            onClick={() => onNavigateView('ai')}
            className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-brand-500/40 text-left cursor-pointer transition"
          >
            <div className="w-10 h-10 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center font-bold mb-3">
              🎙️
            </div>
            <h4 className="font-extrabold text-white text-sm">{t.feature1Title}</h4>
            <p className="text-xs text-slate-400 mt-1">{t.feature1Sub}</p>
          </div>

          <div
            onClick={() => onNavigateView('schemes')}
            className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 text-left cursor-pointer transition"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold mb-3">
              📄
            </div>
            <h4 className="font-extrabold text-white text-sm">{t.feature2Title}</h4>
            <p className="text-xs text-slate-400 mt-1">{t.feature2Sub}</p>
          </div>

          <div
            onClick={() => onNavigateView('asha')}
            className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 text-left cursor-pointer transition"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold mb-3">
              👩‍⚕️
            </div>
            <h4 className="font-extrabold text-white text-sm">{t.feature3Title}</h4>
            <p className="text-xs text-slate-400 mt-1">{t.feature3Sub}</p>
          </div>

          <div
            onClick={onOpenIvrModal}
            className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 text-left cursor-pointer transition"
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold mb-3">
              📞
            </div>
            <h4 className="font-extrabold text-white text-sm">{t.feature4Title}</h4>
            <p className="text-xs text-slate-400 mt-1">{t.feature4Sub}</p>
          </div>
        </div>

      </div>

      {/* Problem Statement */}
      <section className="w-full mt-16 space-y-6">
        <h2 className="text-2xl sm:text-3xl font-black text-white text-center">{t.problemTitle}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {t.problems.map((p, i) => (
            <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
              <span className="text-2xl flex-shrink-0">{p.icon}</span>
              <p className="text-sm text-slate-300 font-medium leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="w-full mt-16 space-y-6">
        <h2 className="text-2xl sm:text-3xl font-black text-white text-center">{t.howTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.steps.map((step) => (
            <div key={step.num} className="glass-panel rounded-2xl p-6 text-center border border-brand-500/20">
              <div className="w-12 h-12 rounded-full bg-brand-500/20 text-brand-400 font-black text-xl flex items-center justify-center mx-auto mb-4">
                {step.num}
              </div>
              <h3 className="font-extrabold text-white text-lg mb-2">{step.title}</h3>
              <p className="text-sm text-slate-400">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Personas */}
      <section className="w-full mt-16 space-y-6">
        <h2 className="text-2xl sm:text-3xl font-black text-white text-center">{t.personasTitle}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {t.personas.map((p) => (
            <div key={p.name} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-brand-500/30 transition">
              <div className="text-3xl mb-3">{p.emoji}</div>
              <h3 className="font-extrabold text-white">{p.name}</h3>
              <p className="text-xs text-brand-400 font-bold mt-1">{p.role}</p>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">{p.need}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="w-full mt-16 glass-panel rounded-3xl p-8 border border-brand-500/30">
        <h2 className="text-xl font-black text-white text-center mb-6">{t.statsTitle}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {t.stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl sm:text-4xl font-black text-brand-400">{s.value}</div>
              <div className="text-xs text-slate-400 font-semibold mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="w-full mt-12 mb-8 text-center space-y-4">
        <button
          onClick={onEnterPortal}
          className="px-10 py-4 rounded-2xl bg-gradient-to-r from-brand-500 via-emerald-500 to-teal-400 hover:from-brand-400 hover:to-teal-300 text-slate-950 font-black text-lg flex items-center gap-3 shadow-2xl shadow-brand-500/40 hover:scale-105 active:scale-95 transition mx-auto"
        >
          <span>{t.enterBtn}</span>
          <ArrowRight className="w-6 h-6 stroke-[3]" />
        </button>
        <p className="text-xs text-slate-500 max-w-lg mx-auto">{t.footerNote}</p>
      </section>

    </div>
  );
};
