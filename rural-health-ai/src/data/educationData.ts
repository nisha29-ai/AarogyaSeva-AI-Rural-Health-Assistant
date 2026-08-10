export interface EducationCard {
  id: string;
  iconName: string;
  title: Record<string, string>;
  category: Record<string, string>;
  quickTip: Record<string, string>;
  fullDetails: Record<string, string[]>;
  audioScript: Record<string, string>;
  bgGradient: string;
}

export const EDUCATION_CARDS: EducationCard[] = [
  {
    id: 'maternal-care',
    iconName: 'Baby',
    title: {
      hi: 'मातृ एवं शिशु पोषण सुरक्षा',
      en: 'Maternal & Child Nutrition',
      bn: 'মাতৃ ও শিশু পুষ্টি রক্ষা',
      ta: 'தாய் சேய் ஊட்டச்சத்து பாதுகாப்பு',
      te: 'మాతా శిశు పోషకాహార భద్రత',
      mr: 'माता व बाल पोषण सुरक्षा',
      gu: 'માતા અને બાળ પોષણ સુરક્ષા',
      kn: 'ತಾಯಿ-ಮಗು ಪೋಷಕಾಂಶ ರಕ್ಷಣೆ',
      pa: 'ਮਾਂ ਅਤੇ ਬੱਚੇ ਦੀ ਖੁਰਾਕ ਸੁਰੱਖਿਆ',
    },
    category: {
      hi: 'मातृ स्वास्थ्य (Maternity)',
      en: 'Maternal Care'
    },
    quickTip: {
      hi: 'गर्भावस्था में रोजाना हरी पत्तेदार सब्जियां, दालें और आयरन-फॉलिक एसिड की गोलियां लें।',
      en: 'Consume green leafy vegetables, lentils, and daily Iron-Folic Acid tablets during pregnancy.'
    },
    fullDetails: {
      hi: [
        'गर्भावस्था के दौरान कम से कम 4 बार एएनसी (ANC) जांच जरूर कराएं।',
        'आंगनवाड़ी से निःशुल्क आयरन-फॉलिक एसिड एवं कैल्शियम की गोलियां प्राप्त करें।',
        'शिशु के जन्म के तुरंत 1 घंटे के भीतर पहला गाढ़ा दूध (कोलोस्ट्रम) पिलाएं।',
        '6 महीने तक शिशु को केवल मां का दूध दें (पानी भी न दें)।'
      ],
      en: [
        'Complete at least 4 Antenatal Care (ANC) checkups during pregnancy.',
        'Get free Iron-Folic Acid & Calcium tablets from your nearest Anganwadi.',
        'Breastfeed colostrum (first thick milk) within 1 hour of birth.',
        'Exclusive breastfeeding for first 6 months (no water required).'
      ]
    },
    audioScript: {
      hi: 'नमस्ते माता जी। गर्भावस्था में हरी सब्जियां और दालें खाएं। आशा दीदी से आयरन की गोलियां निःशुल्क लें और बच्चे को 6 महीने तक सिर्फ मां का दूध पिलाएं।',
      en: 'Hello Mother. Eat leafy greens and pulses during pregnancy. Get free iron tablets from ASHA worker and breastfeed exclusively for 6 months.'
    },
    bgGradient: 'from-emerald-900/60 to-teal-900/60'
  },
  {
    id: 'snake-bite',
    iconName: 'ShieldAlert',
    title: {
      hi: 'सांप काटने पर प्राथमिक उपचार',
      en: 'Snake Bite Emergency First Aid',
      bn: 'সাপ কাটলে প্রথম চিকিৎসা',
      ta: 'பாம்பு கடி முதல் உதவி',
      te: 'పాము కాటుకు ప్రథమ చికిత్స',
      mr: 'सर्पदंशावर प्राथमिक उपचार',
      gu: 'સાપ કરડવા પર પ્રાથમિક સારવાર',
      kn: 'ಹಾವು ಕಡಿದರೆ ಪ್ರಥಮ ಚಿಕಿತ್ಸೆ',
      pa: 'ਸੱਪ ਲੜਨ \'ਤੇ ਪਹਿਲਾ ਇਲਾਜ',
    },
    category: {
      hi: 'आपातकालीन प्राथमिक चिकित्सा',
      en: 'Emergency First Aid'
    },
    quickTip: {
      hi: 'रोगी को शांत रखें, काटे गए अंग को हिलाएं नहीं और तुरंत 108 एम्बुलेंस बुलाएं। झाड़-फूंक में समय न गंवाएं!',
      en: 'Keep victim calm, immobilize bitten limb, and rush to nearest PHC immediately. Avoid traditional healers!'
    },
    fullDetails: {
      hi: [
        'काटे गए स्थान पर कोई चीरा न लगाएं और मुंह से जहर चूसने की कोशिश न करें।',
        'काटे गए अंग पर कसकर पट्टी या रस्सी न बांधें, इससे अंग सड़ सकता है।',
        'घड़ी, कड़े या तंग कपड़े तुरंत उतार दें।',
        'सरकारी PHC/CHC में सांप के जहर का एंटी-वेनम (ASV) टीका बिलकुल मुफ्त उपलब्ध है।'
      ],
      en: [
        'Do NOT make cuts on bite mark or try to suck out poison.',
        'Do NOT tie tight tourniquets; it may cause tissue necrosis.',
        'Remove rings, bangles, or tight clothing immediately.',
        'Anti-Snake Venom (ASV) is available 100% FREE at Govt PHCs/CHCs.'
      ]
    },
    audioScript: {
      hi: 'सांप काटने पर घबराएं नहीं। मरीज को शांत लिटाएं और काटे अंग को न हिलाएं। झाड़-फूंक में समय बर्बाद न करें और सीधे सरकारी अस्पताल जाएं जहां एंटी-वेनम टीका मुफ्त मिलता है।',
      en: 'Do not panic if bitten by a snake. Keep the patient calm and take them straight to the government hospital for free anti-venom injection.'
    },
    bgGradient: 'from-red-950/60 to-amber-950/60'
  },
  {
    id: 'dengue-prevention',
    iconName: 'Droplets',
    title: {
      hi: 'डेंगू और मलेरिया से बचाव',
      en: 'Dengue & Malaria Prevention',
      bn: 'ডেঙ্গু ও ম্যালেরিয়া প্রতিরোধ',
      ta: 'டெங்கு மற்றும் மலேரியா தடுப்பு',
      te: 'డెంగ్యూ మరియు మలేరియా నివారణ',
      mr: 'डेंग्यू आणि मलेरियापासून बचाव',
      gu: 'ડેન્ગ્યુ અને મલેરિયાથી બચાવ',
      kn: 'ಡೆಂಗ್ಯೂ ಮತ್ತು ಮಲೇರಿಯಾ ತಡೆಗಟ್ಟುವಿಕೆ',
      pa: 'ਡੇਂਗੂ ਅਤੇ ਮਲੇਰੀਆ ਤੋਂ ਬਚਾਅ',
    },
    category: {
      hi: 'मौसमी बीमारियां',
      en: 'Seasonal Health'
    },
    quickTip: {
      hi: 'घर के आसपास कहीं भी साफ या गंदा पानी जमा न होने दें। मच्छरदानी का प्रयोग करें।',
      en: 'Prevent stagnant water accumulation around homes. Use mosquito nets at night.'
    },
    fullDetails: {
      hi: [
        'कूलर, गमले और पुराने तसले का पानी हर हफ्ते खाली करें।',
        'तेज बुखार के साथ बदन दर्द या सिरदर्द होने पर पेरासिटामोल लें, डिस्प्रिन न लें।',
        'मच्छर भगाने के लिए नीम की पत्तियां सुलगाएं या ओडोमोस लगाएं।',
        'PHC में खून की मुफ्त जांच (NS1 / मलेरिया) कराएं।'
      ],
      en: [
        'Empty water from coolers and pots at least once every week.',
        'Take Paracetamol for high fever; avoid Aspirin/Disprin.',
        'Use mosquito nets and repellents.',
        'Get free blood test for Dengue/Malaria at nearby PHC.'
      ]
    },
    audioScript: {
      hi: 'डेंगू का मच्छर साफ पानी में पनपता है। कूलर और टंकियों की हर हफ्ते सफाई करें। बुखार आने पर अस्पताल में मुफ्त खून जांच कराएं।',
      en: 'Dengue mosquitoes breed in clean water. Clean coolers weekly and visit PHC for free blood checkup if fever persists.'
    },
    bgGradient: 'from-blue-950/60 to-cyan-950/60'
  },
  {
    id: 'ors-hydration',
    iconName: 'HeartPulse',
    title: {
      hi: 'दस्त और उल्टी में ओआरएस (ORS) का घोल',
      en: 'ORS Preparation for Diarrhea',
      bn: 'ডায়রিয়ায় ORS তৈরির নিয়ম',
      ta: 'தண்ணீர் சத்து குறைபாடு ORS தயாரிப்பு',
      te: 'విరేచనాల నివారణకు ORS ద్రావణం',
      mr: 'अतिसारावर ओआरएस (ORS) चे मिश्रण',
      gu: 'ઝાડા-ઉલટીમાં ORS નું દ્રાવણ',
      kn: 'ಅತಿಸಾರಕ್ಕೆ ORS ದ್ರಾವಣ ತಯಾರಿಕೆ',
      pa: 'ਦਸਤ ਵਿੱਚ ਓ.ਆਰ.ਐਸ. (ORS) ਦਾ ਘੋਲ',
    },
    category: {
      hi: 'बाल स्वास्थ्य एवं उपचार',
      en: 'Child Health'
    },
    quickTip: {
      hi: '1 लीटर उबले पानी में 1 पैकेट ORS घोलें और बच्चे को हर दस्त के बाद थोड़ा-थोड़ा पिलाएं।',
      en: 'Dissolve 1 ORS packet in 1 Liter boiled water. Feed continuously after every loose stool.'
    },
    fullDetails: {
      hi: [
        'ORS न होने पर 1 लीटर पानी में 6 चम्मच चीनी और आधा चम्मच नमक मिलाएं।',
        'साथ में 14 दिनों तक जिंक (Zinc) की गोली जरूर दें।',
        'खाना या स्तनपान कभी बंद न करें।',
        'यदि बच्चा सुस्त हो या आंखें धंसने लगें तो तुरंत PHC ले जाएं।'
      ],
      en: [
        'If ORS packet is absent: Mix 6 tsp sugar + 1/2 tsp salt in 1L clean water.',
        'Give Zinc tablets daily for 14 days alongside ORS.',
        'Do not stop feeding or breastfeeding.',
        'If child is lethargic or unresponsive, rush to hospital immediately.'
      ]
    },
    audioScript: {
      hi: 'दस्त होने पर 1 लीटर पानी में ORS का पैकेट घोलें। ORS नहीं है तो 6 चम्मच चीनी और आधा चम्मच नमक मिलाएं। बच्चे को मां का दूध पिलाते रहें।',
      en: 'In case of diarrhea, dissolve ORS packet in 1 liter clean water. Continue breastfeeding without interruption.'
    },
    bgGradient: 'from-emerald-950/60 to-emerald-850/60'
  }
];
