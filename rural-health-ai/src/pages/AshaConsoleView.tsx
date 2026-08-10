import React, { useState } from 'react';
import { ArrowLeft, Users, ShieldAlert, FileSearch, CheckCircle2, AlertTriangle, Search, RefreshCw, Send } from 'lucide-react';
import { LanguageCode } from '../data/translations';
import { speechEngine } from '../utils/speech';

interface AshaConsoleViewProps {
  currentLang: LanguageCode;
  onBack: () => void;
  onOpenEmergencyModal: () => void;
}

interface Household {
  id: string;
  headName: string;
  ward: string;
  members: number;
  category: string;
  pmjayStatus: 'Active' | 'Pending' | 'Not Registered';
  specialFlags: string[];
}

export const AshaConsoleView: React.FC<AshaConsoleViewProps> = ({
  currentLang,
  onBack,
  onOpenEmergencyModal,
}) => {
  const [activeTab, setActiveTab] = useState<'households' | 'screener' | 'redflags'>('households');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);

  const tAsha = {
    en: {
      back: "Home Dashboard",
      title: "ASHA Health Worker Portal",
      sub: "Rampur Gram Panchayat • Sub-Center Rampur #304",
      sync: "Sync Offline Data",
      syncing: "Syncing...",
      totalHouseholds: "Total Households",
      ayushmanHolders: "Ayushman Card Holders",
      pregnantMothers: "Pregnant Mothers (ANC)",
      redFlagsAlert: "Red-Flag Alerts 🚨",
      tabHouseholds: "Household Register",
      tabScreener: "Rapid Scheme Screener",
      tabRedFlags: "Village Emergency Queue",
      searchPlaceholder: "Search by name, household ID, or ward...",
      members: "Members",
      categoryLabel: "Category",
      checkEligibility: "Check Qualification →",
      screenerHeading: "ASHA Home Visit Scheme Screener",
      screenerDesc: "Enter household details during home visit to check qualification for 6 major central & state schemes.",
      headNameLabel: "Household Head Name:",
      headNamePlaceholder: "e.g. Sita Devi",
      incomeLabel: "Annual Income Bracket:",
      incomeBpl: "Under ₹2.5 Lakh (BPL / AAY)",
      incomeMid: "₹2.5 Lakh - ₹5 Lakh",
      incomeHigh: "Above ₹5 Lakh",
      screenerBtn: "Generate Home Visit Qualification",
      redFlagNotice: "2 active emergency red-flag cases flagged in Rampur village!",
      sendAmbulance: "Dispatch 108 Ambulance",
      notifyDoctor: "Notify PHC Doctor",
    },
    hi: {
      back: "मुख्य पृष्ठ",
      title: "आशा कार्यकर्ता सहायता पोर्टल",
      sub: "ग्राम पंचायत रामपुर • उप-केंद्र रामपुर #304",
      sync: "ऑफलाइन सिंक करें",
      syncing: "सिंक हो रहा है...",
      totalHouseholds: "कुल परिवार",
      ayushmanHolders: "आयुष्मान कार्ड धारक",
      pregnantMothers: "गर्भवती माताएं (ANC)",
      redFlagsAlert: "रेड-फ्लैग अलर्ट्स 🚨",
      tabHouseholds: "परिवार रजिस्टर",
      tabScreener: "त्वरित योजना जांचकर्ता",
      tabRedFlags: "गांव रेड-फ्लैग अलर्ट्स",
      searchPlaceholder: "नाम, परिवार आईडी या वार्ड द्वारा खोजें...",
      members: "कुल सदस्य",
      categoryLabel: "श्रेणी",
      checkEligibility: "पात्रता जांचें →",
      screenerHeading: "आशा कार्यकर्ता त्वरित गृह भ्रमण योजना जांच",
      screenerDesc: "गृह भ्रमण के दौरान परिवार की जानकारी दर्ज करें और तुरंत 6 प्रमुख केंद्रीय व राज्य योजनाओं की पात्रता जांचें।",
      headNameLabel: "परिवार के मुखिया का नाम:",
      headNamePlaceholder: "उदा. सीता देवी",
      incomeLabel: "वार्षिक आय श्रेणी:",
      incomeBpl: "₹2.5 लाख से कम (BPL / AAY)",
      incomeMid: "₹2.5 लाख - ₹5 लाख",
      incomeHigh: "₹5 लाख से अधिक",
      screenerBtn: "गृह भ्रमण योजना पात्रता उत्पन्न करें",
      redFlagNotice: "आपके गांव क्षेत्र रामपुर में 2 आपातकालीन रेड-फ्लैग मामले दर्ज हैं!",
      sendAmbulance: "108 एम्बुलेंस भेजें",
      notifyDoctor: "PHC डॉक्टर को सूचित करें",
    },
    bn: {
      back: "মূল পাতা",
      title: "আশা কর্মী পোর্টাল",
      sub: "রামপুর গ্রাম পঞ্চায়েত • সাব-সেন্টার রামপুর #৩০৪",
      sync: "সিঙ্ক করুন",
      syncing: "সিঙ্ক হচ্ছে...",
      totalHouseholds: "মোট পরিবার",
      ayushmanHolders: "আয়ুষ্মান কার্ডধারী",
      pregnantMothers: "গর্ভবতী মা (ANC)",
      redFlagsAlert: "জরুরী সতর্কবার্তা 🚨",
      tabHouseholds: "পরিবার রেজিস্টার",
      tabScreener: "প্রকল্প যোগ্যতা পরীক্ষা",
      tabRedFlags: "গ্রামের জরুরী তালিকা",
      searchPlaceholder: "নাম বা আইডি দিয়ে খুঁজুন...",
      members: "সদস্য",
      categoryLabel: "শ্রেণী",
      checkEligibility: "যোগ্যতা পরীক্ষা →",
      screenerHeading: "আশা কর্মী গৃহ পরিদর্শন প্রকল্প পরীক্ষা",
      screenerDesc: "গৃহ পরিদর্শনের সময় তথ্য পূরণ করে যোগ্যতা পরীক্ষা করুন।",
      headNameLabel: "পরিবারের প্রধানের নাম:",
      headNamePlaceholder: "যেমন: সীতা দেবী",
      incomeLabel: "বার্ষিক আয়:",
      incomeBpl: "২.৫ লক্ষ টাকার নিচে (BPL)",
      incomeMid: "২.৫ লক্ষ - ৫ লক্ষ টাকা",
      incomeHigh: "৫ লক্ষ টাকার উপরে",
      screenerBtn: "যোগ্যতা রিপোর্ট তৈরি করুন",
      redFlagNotice: "রামপুর গ্রামে ২টি জরুরী রেড-ফ্ল্যাগ অ্যালার্ট রয়েছে!",
      sendAmbulance: "১০৮ অ্যাম্বুলেন্স পাঠান",
      notifyDoctor: "ডাক্তারকে জানান",
    },
    ta: {
      back: "முகப்பு",
      title: "ஆஷா பணியாளர் போர்டல்",
      sub: "ராம்பூர் கிராம பஞ்சாயத்து • ஆரம்ப சுகாதார நிலையம் #304",
      sync: "ஆஃப்லைன் ஒத்திசைவு",
      syncing: "ஒத்திசைக்கப்படுகிறது...",
      totalHouseholds: "மொத்த குடும்பங்கள்",
      ayushmanHolders: "ஆயுஷ்மான் கார்டு வைத்திருப்பவர்கள்",
      pregnantMothers: "கர்ப்பிணித் தாய்கள்",
      redFlagsAlert: "அவசர எச்சரிக்கைகள் 🚨",
      tabHouseholds: "குடும்பப் பதிவேடு",
      tabScreener: "திட்ட தகுதி பரிசோதனை",
      tabRedFlags: "கிராம அவசரப் பட்டியல்",
      searchPlaceholder: "பெயர் அல்லது அடையாள எண் மூலம் தேடுக...",
      members: "உறுப்பினர்கள்",
      categoryLabel: "வகை",
      checkEligibility: "தகுதியைச் சரிபார் →",
      screenerHeading: "ஆஷா வீடு தேடி திட்டம் பரிசோதனை",
      screenerDesc: "வீட்டுப் பார்வையின் போது அரசுத் திட்டங்களின் தகுதியைச் சரிபார்க்கவும்.",
      headNameLabel: "குடும்பத் தலைவரின் பெயர்:",
      headNamePlaceholder: "எ.கா. சீதா தேவி",
      incomeLabel: "ஆண்டு வருமானம்:",
      incomeBpl: "₹2.5 லட்சத்திற்கு கீழ் (BPL)",
      incomeMid: "₹2.5 லட்சம் - ₹5 லட்சம்",
      incomeHigh: "₹5 லட்சத்திற்கு மேல்",
      screenerBtn: "தகுதி அறிக்கையை உருவாக்கவும்",
      redFlagNotice: "ராம்பூர் கிராமத்தில் 2 அவசர எச்சரிக்கைகள் உள்ளன!",
      sendAmbulance: "108 ஆம்புலன்ஸ் அனுப்பவும்",
      notifyDoctor: "மருத்துவருக்கு அறிவிக்கவும்",
    },
    te: {
      back: "హోమ్",
      title: "ఆశా కార్యకర్త పోర్టల్",
      sub: "రాంపూర్ గ్రామ పంచాయితీ • ఉప-కేంద్రం రాంపూర్ #304",
      sync: "ఆఫ్‌లైన్ సింక్",
      syncing: "సింక్ అవుతోంది...",
      totalHouseholds: "మొత్తం కుటుంబాలు",
      ayushmanHolders: "ఆయుష్మాన్ కార్డ్ దారులు",
      pregnantMothers: "గర్భిణీ స్త్రీలు",
      redFlagsAlert: "అత్యవసర హెచ్చరికలు 🚨",
      tabHouseholds: "కుటుంబాల రిజిస్టర్",
      tabScreener: "పథకాల అర్హత తనిఖీ",
      tabRedFlags: "గ్రామ అత్యవసర జాబితా",
      searchPlaceholder: "పేరు లేదా ఐడీ ద్వారా వెతకండి...",
      members: "సభ్యులు",
      categoryLabel: "వర్గం",
      checkEligibility: "అర్హత చూడండి →",
      screenerHeading: "ఆశా ఇంటి పర్యటన పథకాల తనిఖీ",
      screenerDesc: "ఇంటి పర్యటన సమయంలో పథకాల అర్హతను పరిశీలించండి.",
      headNameLabel: "కుటుంబ పెద్ద పేరు:",
      headNamePlaceholder: "ఉదా. సీతా దేవి",
      incomeLabel: "వార్షిక ఆదాయం:",
      incomeBpl: "₹2.5 లక్షల కంటే తక్కువ (BPL)",
      incomeMid: "₹2.5 లక్షలు - ₹5 లక్షలు",
      incomeHigh: "₹5 లక్షల కంటే ఎక్కువ",
      screenerBtn: "అర్హత నివేదికను సృష్టించండి",
      redFlagNotice: "రాంపూర్ గ్రామంలో 2 అత్యవసర కేసులు నమోదయ్యాయి!",
      sendAmbulance: "108 అంబులెన్స్ పంపండి",
      notifyDoctor: "డాక్టర్‌కి నివేదించండి",
    },
    mr: {
      back: "मुख्यपृष्ठ",
      title: "आशा सेविका पोर्टल",
      sub: "रामपूर ग्रामपंचायत • उपकेंद्र रामपूर #304",
      sync: "ऑफलाइन सिंक",
      syncing: "सिंक होत आहे...",
      totalHouseholds: "एकूण कुटुंबे",
      ayushmanHolders: "आयुष्मान कार्ड धारक",
      pregnantMothers: "गर्भवती माता",
      redFlagsAlert: "रेड-फ्लॅग अलर्ट्स 🚨",
      tabHouseholds: "कुटुंब नोंदवही",
      tabScreener: "योजना पात्रता तपासणी",
      tabRedFlags: "गाव तातडीची यादी",
      searchPlaceholder: "नाव किंवा आयडीने शोधा...",
      members: "सदस्य",
      categoryLabel: "वर्ग",
      checkEligibility: "पात्रता तपासा →",
      screenerHeading: "आशा गृह भेट योजना तपासणी",
      screenerDesc: "गृह भेटी दरम्यान कुटुंबाची माहिती भरून योजनांची पात्रता तपासा.",
      headNameLabel: "कुटुंब प्रमुखाचे नाव:",
      headNamePlaceholder: "उदा. सीता देवी",
      incomeLabel: "वार्षिक उत्पन्न:",
      incomeBpl: "₹२.५ लाखांपेक्षा कमी (BPL)",
      incomeMid: "₹२.५ लाख - ₹५ लाख",
      incomeHigh: "₹५ लाखांपेक्षा जास्त",
      screenerBtn: "पात्रता अहवाल तयार करा",
      redFlagNotice: "रामपूर गावात २ तातडीचे रेड-फ्लॅग अलर्ट्स आहेत!",
      sendAmbulance: "१०८ ॲम्ब्युलन्स पाठवा",
      notifyDoctor: "डॉक्टरांना कळवा",
    },
    gu: {
      back: "મુખ્ય પૃષ્ઠ",
      title: "આશા કાર્યકર પોર્ટલ",
      sub: "રામપુર ગ્રામ પંચાયત • સબ-સેન્ટર રામપુર #304",
      sync: "ઓફલાઇન સિંક",
      syncing: "સિંક થઈ રહ્યું છે...",
      totalHouseholds: "કુલ કુટુંબો",
      ayushmanHolders: "આયુષ્માન કાર્ડ ધારકો",
      pregnantMothers: "સગર્ભા માતાઓ",
      redFlagsAlert: "ઈમરજન્સી એલર્ટ્સ 🚨",
      tabHouseholds: "કુટુંબ રજિસ્ટર",
      tabScreener: "યોજના પાત્રતા ચકાસણી",
      tabRedFlags: "ગામ ઈમરજન્સી યાદી",
      searchPlaceholder: "નામ અથવા આઈડીથી શોધો...",
      members: "સભ્યો",
      categoryLabel: "શ્રેણી",
      checkEligibility: "પાત્રતા ચકાસો →",
      screenerHeading: "આશા ઘર મુલાકાત યોજના ચકાસણી",
      screenerDesc: "ઘર મુલાકાત દરમિયાન કુટુંબની વિગતો ભરીને યોજનાઓની પાત્રતા ચકાસો.",
      headNameLabel: "કુટુંબના વડાનું નામ:",
      headNamePlaceholder: "દા.ત. સીતા દેવી",
      incomeLabel: "વાર્ષિક આવક:",
      incomeBpl: "₹2.5 લાખથી ઓછી (BPL)",
      incomeMid: "₹2.5 લાખ - ₹5 લાખ",
      incomeHigh: "₹5 લાખથી વધુ",
      screenerBtn: "પાત્રતા રિપોર્ટ બનાવો",
      redFlagNotice: "રામપુર ગામમાં 2 ઈમરજન્સી એલર્ટ છે!",
      sendAmbulance: "108 એમ્બ્યુલન્સ મોકલો",
      notifyDoctor: "ડૉક્ટરને જાણ કરો",
    },
    kn: {
      back: "ಮುಖ್ಯ ಪುಟ",
      title: "ಆಶಾ ಕಾರ್ಯಕರ್ತರ ಪೋರ್ಟಲ್",
      sub: "ರಾಮಪುರ ಗ್ರಾಮ ಪಂಚಾಯಿತಿ • ಉಪ-ಕೇಂದ್ರ ರಾಮಪುರ #304",
      sync: "ಆಫ್‌ಲೈನ್ ಸಿಂಕ್",
      syncing: "ಸಿಂಕ್ ಆಗುತ್ತಿದೆ...",
      totalHouseholds: "ಒಟ್ಟು ಕುಟುಂಬಗಳು",
      ayushmanHolders: "ಆಯುಷ್ಮಾನ್ ಕಾರ್ಡ್ ಹೊಂದಿರುವವರು",
      pregnantMothers: "ಗರ್ಭಿಣಿಯರು",
      redFlagsAlert: "ತುರ್ತು ಅಲರ್ಟ್‌ಗಳು 🚨",
      tabHouseholds: "ಕುಟುಂಬಗಳ ನೋಂದಣಿ",
      tabScreener: "ಯೋಜನೆ ಅರ್ಹತೆ ಪರಿಶೀಲನೆ",
      tabRedFlags: "ಗ್ರಾಮ ತುರ್ತು ಪಟ್ಟಿ",
      searchPlaceholder: "ಹೆಸರು ಅಥವಾ ಐಡಿಯಿಂದ ಹುಡುಕಿ...",
      members: "ಸದಸ್ಯರು",
      categoryLabel: "ವರ್ಗ",
      checkEligibility: "ಅರ್ಹತೆ ಪರಿಶೀಲಿಸಿ →",
      screenerHeading: "ಆಶಾ ಮನೆ ಭೇಟಿ ಯೋಜನೆ ಪರಿಶೀಲನೆ",
      screenerDesc: "ಮನೆ ಭೇಟಿಯ ಸಮಯದಲ್ಲಿ ಯೋಜನೆಗಳ ಅರ್ಹತೆಯನ್ನು ಪರಿಶೀಲಿಸಿ.",
      headNameLabel: "ಕುಟುಂಬದ ಯಜಮಾನರ ಹೆಸರು:",
      headNamePlaceholder: "ಉದಾ. ಸೀತಾ ದೇವಿ",
      incomeLabel: "ವಾರ್ಷಿಕ ಆದಾಯ:",
      incomeBpl: "₹2.5 ಲಕ್ಷಕ್ಕಿಂತ ಕಡಿಮೆ (BPL)",
      incomeMid: "₹2.5 ಲಕ್ಷ - ₹5 ಲಕ್ಷ",
      incomeHigh: "₹5 ಲಕ್ಷಕ್ಕಿಂತ ಹೆಚ್ಚು",
      screenerBtn: "ಅರ್ಹತೆ ವರದಿ ರಚಿಸಿ",
      redFlagNotice: "ರಾಮಪುರ ಗ್ರಾಮದಲ್ಲಿ 2 ತುರ್ತು ಪ್ರಕರಣಗಳು ವರದಿಯಾಗಿವೆ!",
      sendAmbulance: "108 ಅಂಬ್ಯುಲೆನ್ಸ್ ಕಳುಹಿಸಿ",
      notifyDoctor: "ವೈದ್ಯರಿಗೆ ತಿಳಿಸಿ",
    },
    pa: {
      back: "ਮੁੱਖ ਪੰਨਾ",
      title: "ਆਸ਼ਾ ਵਰਕਰ ਪੋਰਟਲ",
      sub: "ਰਾਮਪੁਰ ਗ੍ਰਾਮ ਪੰਚਾਇਤ • ਸਬ-ਸੈਂਟਰ ਰਾਮਪੁਰ #304",
      sync: "ਆਫਲਾਈਨ ਸਿੰਕ",
      syncing: "ਸਿੰਕ ਹੋ ਰਿਹਾ ਹੈ...",
      totalHouseholds: "ਕੁੱਲ ਪਰਿਵਾਰ",
      ayushmanHolders: "ਆਯੁਸ਼ਮਾਨ ਕਾਰਡ ਧਾਰਕ",
      pregnantMothers: "ਗਰਭਵਤੀ ਮਾਵਾਂ",
      redFlagsAlert: "ਐਮਰਜੈਂਸੀ ਅਲਰਟ 🚨",
      tabHouseholds: "ਪਰਿਵਾਰ ਰਜਿਸਟਰ",
      tabScreener: "ਯੋਜਨਾ ਯੋਗਤਾ ਜਾਂਚ",
      tabRedFlags: "ਪਿੰਡ ਐਮਰਜੈਂਸੀ ਸੂਚੀ",
      searchPlaceholder: "ਨਾਮ ਜਾਂ ਆਈਡੀ ਨਾਲ ਲੱਭੋ...",
      members: "ਜੀਅ",
      categoryLabel: "ਸ਼੍ਰੇਣੀ",
      checkEligibility: "ਯੋਗਤਾ ਜਾਂਚੋ →",
      screenerHeading: "ਆਸ਼ਾ ਘਰ ਦੌਰਾ ਯੋਜਨਾ ਜਾਂਚ",
      screenerDesc: "ਘਰ ਦੇ ਦੌਰੇ ਦੌਰਾਨ ਪਰਿਵਾਰ ਦੇ ਵੇਰਵੇ ਭਰ ਕੇ ਯੋਜਨਾਵਾਂ ਦੀ ਯੋਗਤਾ ਜਾਂਚੋ।",
      headNameLabel: "ਪਰਿਵਾਰ ਦੇ ਮੁਖੀ ਦਾ ਨਾਮ:",
      headNamePlaceholder: "ਜਿਵੇਂ: ਸੀਤਾ ਦੇਵੀ",
      incomeLabel: "ਸਾਲਾਨਾ ਆਮਦਨ:",
      incomeBpl: "₹2.5 ਲੱਖ ਤੋਂ ਘੱਟ (BPL)",
      incomeMid: "₹2.5 ਲੱਖ - ₹5 ਲੱਖ",
      incomeHigh: "₹5 ਲੱਖ ਤੋਂ ਵੱਧ",
      screenerBtn: "ਯੋਗਤਾ ਰਿਪੋਰਟ ਬਣਾਓ",
      redFlagNotice: "ਰਾਮਪੁਰ ਪਿੰਡ ਵਿੱਚ 2 ਐਮਰਜੈਂਸੀ ਕੇਸ ਹਨ!",
      sendAmbulance: "108 ਐਂਬੂਲੈਂਸ ਭੇਜੋ",
      notifyDoctor: "ਡਾਕਟਰ ਨੂੰ ਸੂਚਿਤ ਕਰੋ",
    }
  };

  const t = tAsha[currentLang] || tAsha.en;

  // Mock household database for ASHA worker (Rampur Village)
  const [households] = useState<Household[]>([
    {
      id: 'HH-101',
      headName: 'Radha Devi',
      ward: 'Ward 2 (Purwa)',
      members: 5,
      category: currentLang === 'en' ? 'Maternal / BPL' : 'मातृ सुरक्षा / बीपीएल',
      pmjayStatus: 'Active',
      specialFlags: currentLang === 'en' ? ['Pregnant (7 Months)', 'PMMVY Eligible'] : ['गर्भवती (7 महीने)', 'मातृ वंदना पात्र'],
    },
    {
      id: 'HH-102',
      headName: 'Suresh Kumar',
      ward: 'Ward 4 (Kisan Basti)',
      members: 4,
      category: currentLang === 'en' ? 'Senior Citizen' : 'वरिष्ठ नागरिक',
      pmjayStatus: 'Pending',
      specialFlags: currentLang === 'en' ? ['Diabetes / Chronic', 'PMJAY Senior Eligible'] : ['मधुमेह / बीपी', 'आयुष्मान बुजुर्ग पात्र'],
    },
    {
      id: 'HH-103',
      headName: 'Ramesh Verma',
      ward: 'Ward 1 (Main Village)',
      members: 6,
      category: currentLang === 'en' ? 'Farmer / BPL' : 'किसान / बीपीएल',
      pmjayStatus: 'Not Registered',
      specialFlags: currentLang === 'en' ? ['Child (2 yrs) Vaccine Due'] : ['शिशु (2 वर्ष) टीकाकरण देय'],
    },
    {
      id: 'HH-104',
      headName: 'Sunita Devi',
      ward: 'Ward 3 (Nadi Paar)',
      members: 3,
      category: currentLang === 'en' ? 'Single Mother' : 'एकल माता',
      pmjayStatus: 'Active',
      specialFlags: currentLang === 'en' ? ['Anemia Flagged', 'POSHAN Abhiyaan'] : ['एनीमिया फ्लैग', 'पोषण अभियान'],
    },
  ]);

  // Red Flag Alerts Queue for ASHA's assigned area
  const redFlags = [
    {
      id: 'RF-1',
      patient: 'Sunita Devi (HH-104)',
      symptom: currentLang === 'en' ? 'High Fever + Severe Chills (Suspected Dengue)' : 'तेज बुखार + ठंड लगना (संभावित डेंगू)',
      time: currentLang === 'en' ? '15 mins ago' : '15 मिनट पहले',
      risk: 'HIGH',
      actionNeeded: currentLang === 'en' ? 'PHC Doctor Referral & Blood Test' : 'PHC डॉक्टर रेफरल व रक्त जांच',
    },
    {
      id: 'RF-2',
      patient: 'Ram Lal (Ward 3)',
      symptom: currentLang === 'en' ? 'Chest tightness & breathing labor' : 'छाती में जकड़न व सांस लेने में तकलीफ',
      time: currentLang === 'en' ? '1 hour ago' : '1 घंटा पहले',
      risk: 'CRITICAL (108 SOS)',
      actionNeeded: currentLang === 'en' ? 'Immediate Ambulance Dispatch' : 'तत्काल एम्बुलेंस प्रेषण',
    },
  ];

  const triggerSync = () => {
    setIsSyncing(true);
    speechEngine.speak(
      currentLang === 'en'
        ? "Syncing household records with MoHFW Health Portal..."
        : "स्वास्थ पोर्टल के साथ डेटा सिंक किया जा रहा है...",
      currentLang
    );
    setTimeout(() => {
      setIsSyncing(false);
    }, 1500);
  };

  const filteredHouseholds = households.filter(
    (h) =>
      h.headName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.ward.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-4 space-y-6">
      
      {/* Top Bar Navigation */}
      <div className="glass-panel rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 border border-emerald-500/30">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-300 hover:text-white font-bold text-sm bg-slate-800/80 px-3 py-2 rounded-xl border border-slate-700 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{t.back}</span>
        </button>

        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            👩‍⚕️
          </div>
          <div>
            <h2 className="text-lg font-black text-white">{t.title}</h2>
            <p className="text-[11px] text-slate-400">{t.sub}</p>
          </div>
        </div>

        <button
          onClick={triggerSync}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 text-emerald-400 border border-emerald-500/30 text-xs font-bold hover:bg-slate-700 transition"
        >
          <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>{isSyncing ? t.syncing : t.sync}</span>
        </button>
      </div>

      {/* ASHA Dashboard Metrics Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-panel rounded-2xl p-4 border border-emerald-500/30 text-center">
          <div className="text-2xl font-black text-emerald-400">42</div>
          <div className="text-xs text-slate-300 font-semibold mt-1">{t.totalHouseholds}</div>
        </div>
        <div className="glass-panel rounded-2xl p-4 border border-amber-500/30 text-center">
          <div className="text-2xl font-black text-amber-400">18</div>
          <div className="text-xs text-slate-300 font-semibold mt-1">{t.ayushmanHolders}</div>
        </div>
        <div className="glass-panel rounded-2xl p-4 border border-cyan-500/30 text-center">
          <div className="text-2xl font-black text-cyan-400">6</div>
          <div className="text-xs text-slate-300 font-semibold mt-1">{t.pregnantMothers}</div>
        </div>
        <div className="glass-panel rounded-2xl p-4 border border-red-500/30 text-center bg-red-950/20">
          <div className="text-2xl font-black text-red-400">2</div>
          <div className="text-xs text-slate-300 font-semibold mt-1">{t.redFlagsAlert}</div>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setActiveTab('households')}
          className={`px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition whitespace-nowrap ${
            activeTab === 'households'
              ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
              : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>{t.tabHouseholds} ({households.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('screener')}
          className={`px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition whitespace-nowrap ${
            activeTab === 'screener'
              ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
              : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
          }`}
        >
          <FileSearch className="w-4 h-4" />
          <span>{t.tabScreener}</span>
        </button>

        <button
          onClick={() => setActiveTab('redflags')}
          className={`px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition whitespace-nowrap ${
            activeTab === 'redflags'
              ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
              : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>{t.tabRedFlags} ({redFlags.length})</span>
        </button>
      </div>

      {/* TAB 1: Household Directory */}
      {activeTab === 'households' && (
        <div className="space-y-4">
          <div className="glass-panel rounded-2xl p-3 flex items-center gap-3 border border-slate-700">
            <Search className="w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="flex-1 bg-transparent text-white placeholder-slate-400 text-sm focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredHouseholds.map((hh) => (
              <div
                key={hh.id}
                className="glass-panel rounded-2xl p-5 border border-slate-800 hover:border-emerald-500/40 space-y-3 transition"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-extrabold">
                    {hh.id}
                  </span>
                  <span className="text-xs text-slate-400">{hh.ward}</span>
                </div>

                <div>
                  <h4 className="text-lg font-black text-white">{hh.headName}</h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    {t.members}: {hh.members} • {t.categoryLabel}: {hh.category}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {hh.specialFlags.map((flag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-[11px] font-semibold border border-amber-500/30"
                    >
                      🏷️ {flag}
                    </span>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">
                    PMJAY: <strong className={hh.pmjayStatus === 'Active' ? 'text-emerald-400' : 'text-amber-400'}>{hh.pmjayStatus}</strong>
                  </span>
                  <button
                    onClick={() => {
                      speechEngine.speak(
                        currentLang === 'en'
                          ? `Checking Ayushman Card & maternal benefits for ${hh.headName}`
                          : `${hh.headName} के लिए आयुष्मान कार्ड एवं मातृ सुरक्षा योजना जांच की जा रही है`,
                        currentLang
                      );
                    }}
                    className="text-emerald-400 font-extrabold hover:underline"
                  >
                    {t.checkEligibility}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: Rapid Screener */}
      {activeTab === 'screener' && (
        <div className="glass-panel rounded-3xl p-6 border border-emerald-500/30 space-y-6">
          <h3 className="text-xl font-black text-white flex items-center gap-2">
            <span>📋</span> {t.screenerHeading}
          </h3>
          <p className="text-xs text-slate-300">{t.screenerDesc}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-300 font-bold mb-1">{t.headNameLabel}</label>
              <input
                type="text"
                placeholder={t.headNamePlaceholder}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-bold mb-1">{t.incomeLabel}</label>
              <select className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white">
                <option>{t.incomeBpl}</option>
                <option>{t.incomeMid}</option>
                <option>{t.incomeHigh}</option>
              </select>
            </div>
          </div>

          <button
            onClick={() => {
              speechEngine.speak(
                currentLang === 'en'
                  ? "Ayushman Bharat, PM Matru Vandana, and POSHAN Abhiyaan schemes are qualified for this household."
                  : "इस परिवार हेतु आयुष्मान भारत, प्रधानमंत्री मातृ वंदना योजना एवं पोषण अभियान योजनाएं स्वीकृत हैं।",
                currentLang
              );
            }}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>{t.screenerBtn}</span>
          </button>
        </div>
      )}

      {/* TAB 3: Red Flags Emergency Queue */}
      {activeTab === 'redflags' && (
        <div className="space-y-4">
          <div className="glass-panel rounded-2xl p-4 bg-red-950/40 border border-red-500/40 text-red-200 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <span>{t.redFlagNotice}</span>
            </div>
          </div>

          {redFlags.map((rf) => (
            <div
              key={rf.id}
              className="glass-panel rounded-2xl p-5 border-2 border-red-500/40 bg-slate-900/90 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-red-600 text-white text-xs font-black">
                  {rf.risk}
                </span>
                <span className="text-xs text-slate-400">{rf.time}</span>
              </div>

              <div>
                <h4 className="text-lg font-black text-white">{rf.patient}</h4>
                <p className="text-xs text-red-300 font-bold mt-1">Symptom: {rf.symptom}</p>
                <p className="text-xs text-amber-300 mt-0.5">Action: {rf.actionNeeded}</p>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center gap-3">
                <button
                  onClick={onOpenEmergencyModal}
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs flex items-center gap-1 shadow-lg shadow-red-600/30"
                >
                  <Send className="w-4 h-4" />
                  <span>{t.sendAmbulance}</span>
                </button>

                <button
                  onClick={() => {
                    speechEngine.speak(
                      currentLang === 'en'
                        ? `PHC Rampur doctor alerted for ${rf.patient}`
                        : `${rf.patient} के लिए PHC रामपुर डॉक्टर को अलर्ट भेजा गया है`,
                      currentLang
                    );
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700"
                >
                  {t.notifyDoctor}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
