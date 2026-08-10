import React, { useState } from 'react';
import { ArrowLeft, Bell, Clock, Calendar, Plus, Volume2, Send, ShieldCheck, Sparkles } from 'lucide-react';
import { LanguageCode } from '../data/translations';
import { speechEngine } from '../utils/speech';

interface RemindersViewProps {
  currentLang: LanguageCode;
  onBack: () => void;
}

interface HealthReminder {
  id: string;
  title: string;
  patientName: string;
  category: string;
  time: string;
  frequency: string;
  phone: string;
  status: 'Active' | 'Sent Today';
}

export const RemindersView: React.FC<RemindersViewProps> = ({
  currentLang,
  onBack,
}) => {
  const tRem = {
    en: {
      back: "Home Dashboard",
      title: "Health & Medication Reminders",
      newBtn: "Add New Reminder",
      formTitle: "Set New Medicine / Vaccine Alarm",
      medNameLabel: "Medicine / Checkup Name:",
      medNamePlaceholder: "e.g. Metformin 500mg or ANC Checkup",
      patientLabel: "Patient Name:",
      patientPlaceholder: "e.g. Suresh Kumar",
      categoryLabel: "Category:",
      catChronic: "Diabetes / BP (Chronic)",
      catMaternal: "Pregnancy ANC Checkup",
      catVaccine: "Child Vaccine",
      timeLabel: "Time / Date:",
      timePlaceholder: "e.g. Daily 8:00 AM",
      saveBtn: "Save Reminder Alarm",
      cancelBtn: "Cancel",
      smsAlertSent: "SMS Alert Dispatched (Simulated)",
      patientPrefix: "Patient:",
      testSmsBtn: "Send Test SMS",
    },
    hi: {
      back: "मुख्य पृष्ठ",
      title: "दवा व स्वास्थ्य अलार्म (Health Reminders)",
      newBtn: "नया अलार्म",
      formTitle: "नया दवा / टीका अलार्म सेट करें",
      medNameLabel: "दवा / जांच का नाम:",
      medNamePlaceholder: "उदा. डायबिटीज गोली Metformin 500mg",
      patientLabel: "मरीज का नाम:",
      patientPlaceholder: "उदा. सुरेश कुमार",
      categoryLabel: "श्रेणी:",
      catChronic: "बीपी / शुगर (दीर्घकालिक दवा)",
      catMaternal: "गर्भावस्था ANC जांच",
      catVaccine: "शिशु टीकाकरण",
      timeLabel: "समय / तिथि:",
      timePlaceholder: "उदा. रोज सुबह 8 बजे",
      saveBtn: "अलार्म सहेजें",
      cancelBtn: "रद्द करें",
      smsAlertSent: "एसएमएस अलर्ट भेजा गया (सिम्युलेटेड)",
      patientPrefix: "मरीज:",
      testSmsBtn: "एसएमएस टेस्ट भेजें",
    },
    bn: {
      back: "মূল পাতা",
      title: "স্বাস্থ্য ও ওষুধ অ্যালার্ম",
      newBtn: "নতুন অ্যালার্ম",
      formTitle: "নতুন ওষুধ లేదా টিকা অ্যালার্ম সেট করুন",
      medNameLabel: "ওষুধের নাম:",
      medNamePlaceholder: "যেমন: মেটফর্মিন ৫০০ মিগ্রা",
      patientLabel: "রোগীর নাম:",
      patientPlaceholder: "যেমন: সুরেশ কুমার",
      categoryLabel: "বিভাগ:",
      catChronic: "ডায়াবেটিস / বিপি",
      catMaternal: "গর্ভকালীন পরীক্ষা",
      catVaccine: "শিশুর টিকাদান",
      timeLabel: "সময় / তারিখ:",
      timePlaceholder: "যেমন: প্রতিদিন সকাল ৮টা",
      saveBtn: "অ্যালার্ম সেভ করুন",
      cancelBtn: "বাতিল",
      smsAlertSent: "এসএমএস পাঠানো হয়েছে",
      patientPrefix: "রোগী:",
      testSmsBtn: "এসএমএস টেস্ট পাঠান",
    },
    ta: {
      back: "முகப்பு",
      title: "மருந்து & தடுப்பூசி அலாரம்",
      newBtn: "புதிய அலாரம்",
      formTitle: "புதிய மருந்து அலாரத்தை அமைக்கவும்",
      medNameLabel: "மருந்தின் பெயர்:",
      medNamePlaceholder: "எ.கா. மெட்ஃபோர்மின் 500mg",
      patientLabel: "நோயாளி ಹೆಸರು:",
      patientPlaceholder: "எ.கா. சுரேஷ் குமார்",
      categoryLabel: "வகை:",
      catChronic: "நீரிழிவு / ரத்த அழுத்தம்",
      catMaternal: "கர்ப்பகால பரிசோதனை",
      catVaccine: "குழந்தை தடுப்பூசி",
      timeLabel: "நேரம் / தேதி:",
      timePlaceholder: "எ.கா. தினமும் காலை 8 மணி",
      saveBtn: "அலாரத்தை சேமிக்கவும்",
      cancelBtn: "ரத்து செய்",
      smsAlertSent: "எஸ்எம்எஸ் அனுப்பப்பட்டது",
      patientPrefix: "நோயாளி:",
      testSmsBtn: "தேர்வு SMS அனுப்பு",
    },
    te: {
      back: "హోమ్",
      title: "మందులు & టీకాల అలారం",
      newBtn: "కొత్త అలారం",
      formTitle: "కొత్త మందుల అలారం సెట్ చేయండి",
      medNameLabel: "మందు పేరు:",
      medNamePlaceholder: "ఉదా. మెట్‌ఫార్మిన్ 500mg",
      patientLabel: "రోగి పేరు:",
      patientPlaceholder: "ఉదా. సురేష్ కుమార్",
      categoryLabel: "వర్గం:",
      catChronic: "షుగర్ / బిపి మందులు",
      catMaternal: "గర్భధారణ పరీక్ష",
      catVaccine: "పిల్లల టీకాలు",
      timeLabel: "సమయం / తేదీ:",
      timePlaceholder: "ఉదా. ప్రతిరోజు ఉదయం 8 గంటలకు",
      saveBtn: "అలారం సేవ్ చేయండి",
      cancelBtn: "రద్దు చేయండి",
      smsAlertSent: "SMS హెచ్చరిక పంపబడింది",
      patientPrefix: "రోగి:",
      testSmsBtn: "SMS టెస్ట్ పంపండి",
    },
    mr: {
      back: "मुख्यपृष्ठ",
      title: "औषध व लस अलार्म",
      newBtn: "नवीन अलार्म",
      formTitle: "नवीन औषध / लस अलार्म सेट करा",
      medNameLabel: "औषधाचे नाव:",
      medNamePlaceholder: "उदा. मेटफॉर्मिन ५००mg",
      patientLabel: "रुग्णाचे नाव:",
      patientPlaceholder: "उदा. सुरेश कुमार",
      categoryLabel: "वर्ग:",
      catChronic: "डायबिटीज / बीपी",
      catMaternal: "गर्भवती तपासणी",
      catVaccine: "बाल लसीकरण",
      timeLabel: "वेळ / दिनांक:",
      timePlaceholder: "उदा. रोज सकाळी ८ वाजता",
      saveBtn: "अलार्म जतन करा",
      cancelBtn: "रद्द करा",
      smsAlertSent: "SMS अलर्ट पाठवला",
      patientPrefix: "रुग्ण:",
      testSmsBtn: "SMS चाचणी पाठवा",
    },
    gu: {
      back: "મુખ્ય પૃષ્ઠ",
      title: "દવા અને રસી એલાર્મ",
      newBtn: "નવું એલાર્મ",
      formTitle: "નવું દવા / રસી એલાર્મ સેટ કરો",
      medNameLabel: "દવાનું નામ:",
      medNamePlaceholder: "દા.ત. મેટફોર્મિન 500mg",
      patientLabel: "દર્દીનું નામ:",
      patientPlaceholder: "દા.ત. સુરેશ કુમાર",
      categoryLabel: "શ્રેણી:",
      catChronic: "ડાયાબિટીસ / બીપી",
      catMaternal: "સગર્ભા તપાસ",
      catVaccine: "બાળ રસીકરણ",
      timeLabel: "સમય / તારીખ:",
      timePlaceholder: "દા.ત. રોજ સવારે 8 વાગ્યે",
      saveBtn: "એલાર્મ સેવ કરો",
      cancelBtn: "રદ કરો",
      smsAlertSent: "SMS એલર્ટ મોકલ્યો",
      patientPrefix: "દર્દી:",
      testSmsBtn: "SMS ટેસ્ટ મોકલો",
    },
    kn: {
      back: "ಮುಖ್ಯ ಪುಟ",
      title: "ಔಷಧಿ & ಲಸಿಕೆ ಅಲಾರಾಂ",
      newBtn: "ಹೊಸ ಅಲಾರಾಂ",
      formTitle: "ಹೊಸ ಔಷಧಿ ಅಲಾರಾಂ ಹೊಂದಿಸಿ",
      medNameLabel: "ಔಷಧಿಯ ಹೆಸರು:",
      medNamePlaceholder: "ಉದಾ. ಮೆಟ್‌ಫಾರ್ಮಿನ್ 500mg",
      patientLabel: "ರೋಗಿಯ ಹೆಸರು:",
      patientPlaceholder: "ಉದಾ. ಸುರೇಶ್ ಕುಮಾರ್",
      categoryLabel: "ವರ್ಗ:",
      catChronic: "ಮಧುಮೇಹ / ಬಿಪಿ",
      catMaternal: "ಗರ್ಭಿಣಿ ತಪಾಸಣೆ",
      catVaccine: "ಮಕ್ಕಳ ಲಸಿಕೆ",
      timeLabel: "ಸಮಯ / ದಿನಾಂಕ:",
      timePlaceholder: "ಉದಾ. ಪ್ರತಿದಿನ ಬೆಳಿಗ್ಗೆ 8 ಗಂಟೆಗೆ",
      saveBtn: "ಅಲಾರಾಂ ಉಳಿಸಿ",
      cancelBtn: "ರದ್ದುಮಾಡಿ",
      smsAlertSent: "SMS ಅಲರ್ಟ್ ಕಳುಹಿಸಲಾಗಿದೆ",
      patientPrefix: "ರೋಗಿ:",
      testSmsBtn: "SMS ಪರೀಕ್ಷಿಸಿ",
    },
    pa: {
      back: "ਮੁੱਖ ਪੰਨਾ",
      title: "ਦਵਾਈ ਅਤੇ ਟੀਕਾ ਅਲਾਰਮ",
      newBtn: "ਨਵਾਂ ਅਲਾਰਮ",
      formTitle: "ਨਵਾਂ ਦਵਾਈ ਅਲਾਰਮ ਸੈੱਟ ਕਰੋ",
      medNameLabel: "ਦਵਾਈ ਦਾ ਨਾਮ:",
      medNamePlaceholder: "ਜਿਵੇਂ: ਮੈਟਫਾਰਮਿਨ 500mg",
      patientLabel: "ਮਰੀਜ਼ ਦਾ ਨਾਮ:",
      patientPlaceholder: "ਜਿਵੇਂ: ਸੁਰੇਸ਼ ਕੁਮਾਰ",
      categoryLabel: "ਸ਼੍ਰੇਣੀ:",
      catChronic: "ਸ਼ੂਗਰ / ਬੀਪੀ",
      catMaternal: "ਗਰਭਵਤੀ ਜਾਂਚ",
      catVaccine: "ਬੱਚਿਆਂ ਦਾ ਟੀਕਾਕਰਨ",
      timeLabel: "ਸਮਾਂ / ਮਿਤੀ:",
      timePlaceholder: "ਜਿਵੇਂ: ਰੋਜ਼ਾਨਾ ਸਵੇਰੇ 8 ਵਜੇ",
      saveBtn: "ਅਲਾਰਮ ਸੰਭਾਲੋ",
      cancelBtn: "ਰੱਦ ਕਰੋ",
      smsAlertSent: "SMS ਅਲਰਟ ਭੇਜਿਆ ਗਿਆ",
      patientPrefix: "ਮਰੀਜ਼:",
      testSmsBtn: "SMS ਟੈਸਟ ਭੇਜੋ",
    }
  };

  const t = tRem[currentLang] || tRem.en;

  const [reminders, setReminders] = useState<HealthReminder[]>([
    {
      id: 'REM-1',
      title: currentLang === 'en' ? 'Diabetes Medication (Metformin 500mg)' : 'डायबिटीज दवा (Metformin 500mg)',
      patientName: 'Suresh Kumar',
      category: t.catChronic,
      time: currentLang === 'en' ? '08:00 AM Daily' : '08:00 AM (सुबह)',
      frequency: currentLang === 'en' ? 'Daily Morning' : 'दैनिक',
      phone: '+91 98*** ***12',
      status: 'Active',
    },
    {
      id: 'REM-2',
      title: currentLang === 'en' ? 'Maternal Care ANC Checkup #3' : 'मातृ सुरक्षा ANC जांच #3',
      patientName: 'Radha Devi',
      category: t.catMaternal,
      time: currentLang === 'en' ? '14 August (Wed)' : '14 अगस्त (बुधवार)',
      frequency: currentLang === 'en' ? 'PHC Rampur Clinic' : 'PHC रामपुर clinic',
      phone: '+91 97*** ***89',
      status: 'Active',
    },
    {
      id: 'REM-3',
      title: currentLang === 'en' ? 'Polio + Pentavalent Vaccine (14 Wks)' : 'पोलियो + पेंटावेलेंट टीका (14 सप्ताह)',
      patientName: currentLang === 'en' ? 'Rahul (Child - 3 Months)' : 'राहुल (शिशु - 3 महीने)',
      category: t.catVaccine,
      time: currentLang === 'en' ? '20 August (Tue)' : '20 अगस्त (मंगलवार)',
      frequency: currentLang === 'en' ? 'Anganwadi Center' : 'आंगनवाड़ी केंद्र',
      phone: '+91 98*** ***12',
      status: 'Active',
    },
  ]);

  const [simulatedSms, setSimulatedSms] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newPatient, setNewPatient] = useState('');
  const [newCategory, setNewCategory] = useState<string>(t.catChronic);
  const [newTime, setNewTime] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const handleSendTestSms = (rem: HealthReminder) => {
    const text = currentLang === 'en'
      ? `[AarogyaSeva Reminder]: Hello ${rem.patientName}, reminder for ${rem.title} scheduled at ${rem.time}. Toll-free PHC Helpline: 1800-180-AAROGYA.`
      : `[आरोग्यसेवा रिमाइंडर]: नमस्ते ${rem.patientName}, ${rem.title} का समय हो गया है (${rem.time})। पीएचसी हेल्पलाइन: 1800-180-AAROGYA.`;

    setSimulatedSms(text);
    speechEngine.speak(text, currentLang);
  };

  const handleAddReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newPatient.trim()) return;

    const newRem: HealthReminder = {
      id: `REM-${Date.now()}`,
      title: newTitle.trim(),
      patientName: newPatient.trim(),
      category: newCategory,
      time: newTime || '09:00 AM',
      frequency: currentLang === 'en' ? 'Daily' : 'दैनिक',
      phone: '+91 98*** ***00',
      status: 'Active',
    };

    setReminders((prev) => [newRem, ...prev]);
    setNewTitle('');
    setNewPatient('');
    setNewTime('');
    setShowAddForm(false);
    speechEngine.speak(currentLang === 'en' ? "New health alarm saved successfully" : "नया स्वास्थ्य अलार्म सफलतापूर्वक जोड़ा गया", currentLang);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 space-y-6">
      
      {/* Top Header */}
      <div className="glass-panel rounded-2xl p-4 flex items-center justify-between border border-cyan-500/30">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-300 hover:text-white font-bold text-sm bg-slate-800/80 px-3 py-2 rounded-xl border border-slate-700 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{t.back}</span>
        </button>

        <div className="flex items-center gap-2">
          <Bell className="w-6 h-6 text-cyan-400" />
          <h2 className="text-xl font-extrabold text-white">{t.title}</h2>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-1 text-xs text-slate-950 font-black bg-cyan-400 hover:bg-cyan-300 px-3 py-2 rounded-xl transition shadow-lg shadow-cyan-400/20"
        >
          <Plus className="w-4 h-4" />
          <span>{t.newBtn}</span>
        </button>
      </div>

      {/* Add New Reminder Form */}
      {showAddForm && (
        <form
          onSubmit={handleAddReminder}
          className="glass-panel rounded-3xl p-6 border border-cyan-500/40 space-y-4 animate-fade-in"
        >
          <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <span>{t.formTitle}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-300 font-bold mb-1">{t.medNameLabel}</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder={t.medNamePlaceholder}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:border-cyan-400"
                required
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">{t.patientLabel}</label>
              <input
                type="text"
                value={newPatient}
                onChange={(e) => setNewPatient(e.target.value)}
                placeholder={t.patientPlaceholder}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:border-cyan-400"
                required
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">{t.categoryLabel}</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:border-cyan-400"
              >
                <option value={t.catChronic}>{t.catChronic}</option>
                <option value={t.catMaternal}>{t.catMaternal}</option>
                <option value={t.catVaccine}>{t.catVaccine}</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">{t.timeLabel}</label>
              <input
                type="text"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                placeholder={t.timePlaceholder}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs"
            >
              {t.cancelBtn}
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-cyan-400 text-slate-950 font-black text-xs hover:bg-cyan-300"
            >
              {t.saveBtn}
            </button>
          </div>
        </form>
      )}

      {/* Simulated SMS Toast Preview */}
      {simulatedSms && (
        <div className="glass-panel rounded-2xl p-4 bg-emerald-950/60 border border-emerald-500/40 space-y-2 text-emerald-200 animate-slide-up">
          <div className="flex items-center justify-between text-xs font-bold text-emerald-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" /> {t.smsAlertSent}
            </span>
            <button onClick={() => setSimulatedSms(null)} className="text-slate-400 hover:text-white">✕</button>
          </div>
          <p className="text-xs font-mono bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-slate-200">
            {simulatedSms}
          </p>
        </div>
      )}

      {/* Reminders List */}
      <div className="space-y-4">
        {reminders.map((rem) => (
          <div
            key={rem.id}
            className="glass-panel rounded-3xl p-5 border border-slate-800 hover:border-cyan-500/40 transition space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-extrabold text-xs border border-cyan-500/30">
                {rem.category}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                📱 {rem.phone}
              </span>
            </div>

            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-black text-white">{rem.title}</h3>
                <p className="text-sm font-bold text-amber-400 mt-1">
                  {t.patientPrefix} {rem.patientName}
                </p>
                <div className="flex items-center gap-3 text-xs text-slate-300 mt-2 font-medium">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <Clock className="w-4 h-4" /> {rem.time}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <Calendar className="w-4 h-4" /> {rem.frequency}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleSendTestSms(rem)}
                  className="px-3.5 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 font-bold text-xs hover:bg-cyan-500/30 border border-cyan-500/30 flex items-center gap-1.5 transition"
                >
                  <Send className="w-4 h-4" />
                  <span>{t.testSmsBtn}</span>
                </button>

                <button
                  onClick={() => speechEngine.speak(`${rem.patientName} - ${rem.title}`, currentLang)}
                  className="p-2.5 rounded-xl bg-slate-800 text-slate-200 hover:text-white border border-slate-700"
                  title="Listen Voice Alert"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
