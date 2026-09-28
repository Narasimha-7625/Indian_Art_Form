import React from 'react';
import { ArrowRight, Compass, Cuboid, Layers, MapPin, Sparkles } from 'lucide-react';
import { NavSection } from './PersistentNavbar';

interface EntranceScreenProps {
  onEnterMuseum: () => void;
  onNavigate: (section: NavSection) => void;
  onStartGuidedTour: () => void;
}

export const EntranceScreen: React.FC<EntranceScreenProps> = ({
  onEnterMuseum,
  onNavigate,
  onStartGuidedTour
}) => {
  return (
    <div className="relative flex-1 w-full bg-[#130F0C] text-[#F7F4EE] flex flex-col justify-between overflow-y-auto">
      {/* Subtle Architectural Sandstone & Brass Background Atmosphere */}
      <div
        className="pointer-events-none fixed inset-0 opacity-90"
        style={{
          background:
            'radial-gradient(circle at 50% 28%, rgba(200, 157, 84, 0.15) 0%, rgba(94, 34, 22, 0.13) 42%, rgba(19, 15, 12, 0.98) 80%)'
        }}
      />

      {/* Subtle Indian Geometric Jali SVG Pattern Overlay */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.06]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="indianJali" width="64" height="64" patternUnits="userSpaceOnUse">
              <path
                d="M 32 0 L 64 32 L 32 64 L 0 32 Z M 32 12 L 52 32 L 32 52 L 12 32 Z"
                fill="none"
                stroke="#C89D54"
                strokeWidth="1.2"
              />
              <circle cx="32" cy="32" r="5" fill="none" stroke="#C89D54" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#indianJali)" />
        </svg>
      </div>

      {/* Main Center Architectural Portal */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12 max-w-6xl mx-auto text-center w-full">
        {/* Decorative Cusped Arch Frame */}
        <div className="w-full p-6 sm:p-10 md:p-12 rounded-xl bg-[#1A1511]/90 backdrop-blur-md border border-[#C89D54]/40 shadow-2xl relative">
          {/* Top Brass Arch Ornament SVG */}
          <div className="flex justify-center mb-5">
            <svg width="220" height="44" viewBox="0 0 220 44" className="text-[#C89D54]">
              <path
                d="M 10,40 Q 55,40 75,22 Q 95,6 110,2 Q 125,6 145,22 Q 165,40 210,40"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M 35,40 Q 75,36 92,20 Q 104,10 110,8 Q 116,10 128,20 Q 145,36 185,40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeOpacity="0.6"
              />
              <circle cx="110" cy="20" r="4" fill="currentColor" />
              <circle cx="75" cy="30" r="2.5" fill="currentColor" />
              <circle cx="145" cy="30" r="2.5" fill="currentColor" />
            </svg>
          </div>

          {/* Kicker Metadata */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs tracking-widest uppercase text-[#C89D54] mb-3">
            <span>CLA-I Educational Virtual Museum</span>
            <span aria-hidden="true">·</span>
            <span>CO1 &amp; CO2</span>
          </div>

          {/* Main Museum Title */}
          <h1
            className="font-serif-display text-4xl sm:text-6xl md:text-7xl font-semibold tracking-wide text-[#F7F4EE] mb-3"
            style={{ textWrap: 'balance' }}
          >
            BHARAT KALA MUSEUM
          </h1>

          {/* Subtitle */}
          <p className="font-serif-display italic text-xl sm:text-2xl md:text-3xl text-[#E5B869] mb-5">
            An Interactive Journey Through Indian Art
          </p>

          {/* Hairline Divider */}
          <div className="w-36 h-px bg-[#C89D54]/50 mx-auto mb-5" />

          {/* Exact Required Short Project Introduction */}
          <p className="max-w-3xl mx-auto text-sm sm:text-base text-[#EAE2D3] leading-relaxed mb-8">
            “Explore the evolution of Indian art through an interactive timeline, discover
            important artistic locations across India, and experience an original Warli × Kalamkari
            regional fusion.”
          </p>

          {/* Three Major Activity Cards / Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left mb-9">
            {/* Activity 1 Card */}
            <div className="flex flex-col justify-between p-5 rounded-xl bg-[#14100D] border border-[#C89D54]/35 hover:border-[#C89D54] transition-all">
              <div>
                <div className="flex items-center justify-between text-xs text-[#C89D54] font-semibold mb-2">
                  <span>ACTIVITY 1 · CLA-I · CO1</span>
                  <Sparkles className="w-4 h-4 text-[#E5B869]" />
                </div>
                <h2 className="font-serif-display text-2xl font-semibold text-[#F7F4EE] mb-2">
                  History Timeline
                </h2>
                <p className="text-xs text-[#D6CEBE] leading-relaxed mb-4">
                  Chronological progression across six foundational art traditions: Indus Valley →
                  Ajanta → Chola → Mughal → Madhubani → Warli.
                </p>
              </div>

              <button
                type="button"
                onClick={() => onNavigate('timeline')}
                className="w-full py-3 px-4 rounded-lg bg-[#C89D54] hover:bg-[#DEB469] text-[#14110F] font-bold text-xs tracking-wide flex items-center justify-center gap-2 transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>EXPLORE THE TIMELINE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Activity 2 Card */}
            <div className="flex flex-col justify-between p-5 rounded-xl bg-[#14100D] border border-[#C89D54]/35 hover:border-[#C89D54] transition-all">
              <div>
                <div className="flex items-center justify-between text-xs text-[#C89D54] font-semibold mb-2">
                  <span>ACTIVITY 2 · CLA-I · CO1</span>
                  <MapPin className="w-4 h-4 text-[#E5B869]" />
                </div>
                <h2 className="font-serif-display text-2xl font-semibold text-[#F7F4EE] mb-2">
                  Indian Art Map
                </h2>
                <p className="text-xs text-[#D6CEBE] leading-relaxed mb-4">
                  Interactive Leaflet &amp; OpenStreetMap cartography of 8 major centers: Ajanta,
                  Ellora, Thanjavur, Khajuraho, Madhubani, Warli Region, Puri, and Jaipur.
                </p>
              </div>

              <button
                type="button"
                onClick={() => onNavigate('art-map')}
                className="w-full py-3 px-4 rounded-lg bg-[#C89D54] hover:bg-[#DEB469] text-[#14110F] font-bold text-xs tracking-wide flex items-center justify-center gap-2 transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>EXPLORE THE ART MAP</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Activity 3 Card */}
            <div className="flex flex-col justify-between p-5 rounded-xl bg-[#14100D] border border-[#C89D54]/35 hover:border-[#C89D54] transition-all">
              <div>
                <div className="flex items-center justify-between text-xs text-[#C89D54] font-semibold mb-2">
                  <span>ACTIVITY 3 · CLA-I · CO2</span>
                  <Layers className="w-4 h-4 text-[#E5B869]" />
                </div>
                <h2 className="font-serif-display text-2xl font-semibold text-[#F7F4EE] mb-2">
                  Regional Painting Fusion
                </h2>
                <p className="text-xs text-[#D6CEBE] leading-relaxed mb-4">
                  Original <strong>WARLI × KALAMKARI</strong> digital fusion artwork with
                  interactive controls to isolate Warli elements, Kalamkari motifs, and the unified
                  fusion.
                </p>
              </div>

              <button
                type="button"
                onClick={() => onNavigate('fusion-gallery')}
                className="w-full py-3 px-4 rounded-lg bg-[#C89D54] hover:bg-[#DEB469] text-[#14110F] font-bold text-xs tracking-wide flex items-center justify-center gap-2 transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>EXPLORE THE FUSION GALLERY</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Secondary Action Row: Enter 3D Walkable Museum & Guided Tour */}
          <div className="pt-6 border-t border-[#C89D54]/25 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={onEnterMuseum}
              className="w-full sm:w-auto px-7 py-3.5 rounded-lg bg-[#261E18] hover:bg-[#362B22] text-[#F7F4EE] border border-[#C89D54]/60 font-semibold text-xs sm:text-sm tracking-wide transition-colors flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <Cuboid className="w-4 h-4 text-[#E5B869]" />
              <span>ENTER 3D VIRTUAL MUSEUM HALL</span>
            </button>

            <button
              type="button"
              onClick={onStartGuidedTour}
              className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-[#1F1813] hover:bg-[#2C231B] text-[#E5B869] border border-[#C89D54]/35 font-medium text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              <span>START AUTOMATED GUIDED TOUR</span>
            </button>
          </div>
        </div>
      </main>

      {/* Operational Utility Footer Strip */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 py-4 border-t border-[#C89D54]/20 flex flex-wrap items-center justify-between gap-4 text-xs text-[#A89F91]">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[#F7F4EE] font-serif-display font-semibold tracking-wide">
            BHARAT KALA MUSEUM
          </span>
          <span aria-hidden="true">·</span>
          <span>An Interactive Journey Through Indian Art</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span>CLA-I Assignment</span>
          <span aria-hidden="true">·</span>
          <span>CO1 (Timeline &amp; Map)</span>
          <span aria-hidden="true">·</span>
          <span>CO2 (Warli × Kalamkari Fusion)</span>
        </div>
      </footer>
    </div>
  );
};
