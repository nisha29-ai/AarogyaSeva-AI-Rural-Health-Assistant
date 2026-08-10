export interface HospitalFacility {
  id: string;
  name: Record<string, string>;
  type: 'PHC' | 'CHC' | 'District' | 'JanAushadhi';
  lat: number;
  lng: number;
  distanceKm: number;
  phone: string;
  address: Record<string, string>;
  is24x7: boolean;
  bedsAvailable: number;
  isGovtFree: boolean;
}

export const HOSPITALS_DATA: HospitalFacility[] = [
  {
    id: 'phc-1',
    name: {
      hi: 'प्राथमिक स्वास्थ्य केंद्र (PHC) - रामपुर',
      en: 'Primary Health Centre (PHC) - Rampur',
      bn: 'প্রাথমিক স্বাস্থ্য কেন্দ্র - রামপুর',
      ta: 'ஆரம்ப சுகாதார நிலையம் - ராம்பூர்',
      te: 'ప్రాథమిక ఆరోగ్య కేంద్రం - రాంపూర్',
      mr: 'प्राथमिक आरोग्य केंद्र - रामपूर',
      gu: 'પ્રાથમિક આરોગ્ય કેન્દ્ર - રામપુર',
      kn: 'ಪ್ರಾಥಮಿಕ ಆರೋಗ್ಯ ಕೇಂದ್ರ - ರಾಮಪುರ',
      pa: 'ਪ੍ਰਾਇਮਰੀ ਹੈਲਥ ਸੈਂਟਰ - ਰਾਮਪੁਰ',
    },
    type: 'PHC',
    lat: 28.6139,
    lng: 77.2090,
    distanceKm: 1.2,
    phone: '108',
    address: {
      hi: 'मुख्य बाजार के पास, रामपुर गांव',
      en: 'Near Main Market, Rampur Village'
    },
    is24x7: true,
    bedsAvailable: 8,
    isGovtFree: true
  },
  {
    id: 'chc-2',
    name: {
      hi: 'सामुदायिक स्वास्थ्य केंद्र (CHC) - सेवानगर',
      en: 'Community Health Centre (CHC) - Sevanagar',
      bn: 'কমিউনিটি হেলথ সেন্টার - সেবানগর',
      ta: 'சமூக சுகாதார மையம் - சேவாநகர்',
      te: 'సామాజిక ఆరోగ్య కేంద్రం - సేవానగర్',
      mr: 'समुदाय आरोग्य केंद्र - सेवानगर',
      gu: 'સામુદાયિક આરોગ્ય કેન્દ્ર - સેવાનગર',
      kn: 'ಸಮುದಾಯ ಆರೋಗ್ಯ ಕೇಂದ್ರ - ಸೇವಾ ನಗರ',
      pa: 'ਕਮਿਊਨਿਟੀ ਹੈਲਥ ਸੈਂਟਰ - ਸੇਵਾ ਨਗਰ',
    },
    type: 'CHC',
    lat: 28.6250,
    lng: 77.2200,
    distanceKm: 4.5,
    phone: '011-23456789',
    address: {
      hi: 'जिला सड़क, ब्लॉक कार्यालय के सामने',
      en: 'District Road, Opposite Block Office'
    },
    is24x7: true,
    bedsAvailable: 24,
    isGovtFree: true
  },
  {
    id: 'dist-3',
    name: {
      hi: 'जिला राजकीय अस्पताल (District Hospital)',
      en: 'Government District Hospital',
      bn: 'জেলা সরকারি হাসপাতাল',
      ta: 'மாவட்ட அரசு மருத்துவமனை',
      te: 'జిల్లా ప్రభుత్వ ఆసుపత్రి',
      mr: 'जिल्हा शासकीय रुग्णालय',
      gu: 'જિલ્લા સરકારી હોસ્પિટલ',
      kn: 'ಜಿಲ್ಲಾ ಸರ್ಕಾರಿ ಆಸ್ಪತ್ರೆ',
      pa: 'ਜ਼ਿਲ੍ਹਾ ਸਰਕਾਰੀ ਹਸਪਤਾਲ',
    },
    type: 'District',
    lat: 28.5900,
    lng: 77.2300,
    distanceKm: 8.9,
    phone: '011-28901234',
    address: {
      hi: 'सिविल लाइन्स, मुख्य चौक',
      en: 'Civil Lines, Main Circle'
    },
    is24x7: true,
    bedsAvailable: 110,
    isGovtFree: true
  },
  {
    id: 'jan-4',
    name: {
      hi: 'प्रधानमंत्री जन औषधि केंद्र #402',
      en: 'PM Jan Aushadhi Kendra Store #402',
      bn: 'প্রধানমন্ত্রী জন ঔষধি কেন্দ্র #৪০২',
      ta: 'பிரதம மந்திரி ஜன ഔஷதி மையம் #402',
      te: 'జన్ ఔషధి కేంద్రం #402',
      mr: 'जन औषधी केंद्र #४०२',
      gu: 'જન ઔષધિ કેન્દ્ર #૪૦૨',
      kn: 'ಜನೌಷಧಿ ಕೇಂದ್ರ #402',
      pa: 'ਜਨ ਔਸ਼ਧੀ ਕੇਂਦਰ #402',
    },
    type: 'JanAushadhi',
    lat: 28.6050,
    lng: 77.2150,
    distanceKm: 2.1,
    phone: '1800-180-8080',
    address: {
      hi: 'बस स्टैंड के पास, रामपुर',
      en: 'Near Bus Stand, Rampur'
    },
    is24x7: false,
    bedsAvailable: 0,
    isGovtFree: false
  }
];
