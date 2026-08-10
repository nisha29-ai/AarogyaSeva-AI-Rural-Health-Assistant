import React, { useState } from 'react';
import { ArrowLeft, MapPin, PhoneCall, Hospital, Search, CheckCircle2, ShieldAlert } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { LanguageCode, TRANSLATIONS } from '../data/translations';
import { HOSPITALS_DATA, HospitalFacility } from '../data/hospitalsData';

// Leaflet custom marker icons
const customIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -32],
});

interface HospitalLocatorViewProps {
  currentLang: LanguageCode;
  onBack: () => void;
}

export const HospitalLocatorView: React.FC<HospitalLocatorViewProps> = ({
  currentLang,
  onBack,
}) => {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.hi;
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'ALL' | 'PHC' | '24x7' | 'JanAushadhi'>('ALL');

  const filteredHospitals = HOSPITALS_DATA.filter((h) => {
    if (filterType === 'PHC' && h.type !== 'PHC') return false;
    if (filterType === '24x7' && !h.is24x7) return false;
    if (filterType === 'JanAushadhi' && h.type !== 'JanAushadhi') return false;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const name = (h.name[currentLang] || h.name.hi).toLowerCase();
      const addr = (h.address[currentLang] || h.address.hi).toLowerCase();
      return name.includes(q) || addr.includes(q);
    }
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-4 space-y-6">
      
      {/* Header Bar */}
      <div className="glass-panel rounded-2xl p-4 flex items-center justify-between border border-cyan-500/30">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-300 hover:text-white font-bold text-sm bg-slate-800/80 px-3 py-2 rounded-xl border border-slate-700 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{t.backToHome}</span>
        </button>

        <div className="flex items-center gap-2">
          <Hospital className="w-6 h-6 text-cyan-400" />
          <h2 className="text-xl font-extrabold text-white">{t.findHospitals}</h2>
        </div>

        <a
          href="tel:108"
          className="px-3 py-1.5 rounded-xl bg-red-600/30 text-red-400 font-bold border border-red-500/40 text-xs flex items-center gap-1"
        >
          <ShieldAlert className="w-4 h-4" />
          <span>108</span>
        </a>
      </div>

      {/* Search & Filter Bar */}
      <div className="glass-panel rounded-2xl p-4 space-y-4 border border-cyan-500/20">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchHospitalPlaceholder}
            className="w-full bg-slate-900/80 border border-slate-700 focus:border-cyan-500 text-white rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setFilterType('ALL')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
              filterType === 'ALL'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            सभी केंद्र (All)
          </button>
          <button
            onClick={() => setFilterType('PHC')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
              filterType === 'PHC'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            निःशुल्क PHC / CHC
          </button>
          <button
            onClick={() => setFilterType('24x7')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
              filterType === '24x7'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            24x7 आपातकालीन
          </button>
          <button
            onClick={() => setFilterType('JanAushadhi')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
              filterType === 'JanAushadhi'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            जन औषधि केंद्र
          </button>
        </div>
      </div>

      {/* Main Grid: Leaflet Map + Facility Cards List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Leaflet Map Frame */}
        <div className="glass-panel rounded-3xl overflow-hidden border border-cyan-500/30 h-[400px] lg:h-[550px] shadow-2xl relative">
          <MapContainer
            center={[28.6139, 77.2090]}
            zoom={12}
            scrollWheelZoom={false}
            className="w-full h-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filteredHospitals.map((h) => (
              <Marker key={h.id} position={[h.lat, h.lng]} icon={customIcon}>
                <Popup>
                  <div className="p-1 space-y-1 text-slate-900 font-sans">
                    <h4 className="font-bold text-sm text-emerald-700">{h.name[currentLang] || h.name.hi}</h4>
                    <p className="text-xs text-slate-600">{h.address[currentLang] || h.address.hi}</p>
                    <a
                      href={`tel:${h.phone}`}
                      className="inline-block mt-2 px-3 py-1 bg-emerald-600 text-white rounded-md text-xs font-bold"
                    >
                      📞 Call {h.phone}
                    </a>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Hospital List Cards */}
        <div className="space-y-4 max-h-[550px] overflow-y-auto pr-1">
          {filteredHospitals.map((hospital) => (
            <div
              key={hospital.id}
              className="glass-panel rounded-2xl p-5 border border-slate-700/80 hover:border-cyan-400/50 transition-all space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-black text-xs border border-cyan-500/40">
                      {hospital.type}
                    </span>
                    {hospital.isGovtFree && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[11px]">
                        100% निःशुल्क (Free)
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {hospital.name[currentLang] || hospital.name.hi}
                  </h3>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="text-xs text-amber-400 font-black flex items-center gap-1 justify-end">
                    <MapPin className="w-3.5 h-3.5" />
                    {hospital.distanceKm} km दूर
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300">
                {hospital.address[currentLang] || hospital.address.hi}
              </p>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
                <div className="flex items-center gap-3">
                  {hospital.is24x7 && (
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> 24x7 खुला
                    </span>
                  )}
                  {hospital.bedsAvailable > 0 && (
                    <span className="text-slate-300 font-medium">
                      🛏️ {hospital.bedsAvailable} बेड उपलब्ध
                    </span>
                  )}
                </div>

                <a
                  href={`tel:${hospital.phone}`}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-950 font-black text-xs shadow-md shadow-emerald-600/30 transition"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>डायरेक्ट कॉल</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
