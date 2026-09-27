import React from 'react';
import { ArrowRight, Compass, Layers, MapPin, Sparkles } from 'lucide-react';

interface EntranceScreenProps {
  onEnterMuseum: () => void;
  onQuickJump: (destination: 'history' | 'map' | 'fusion' | 'tour') => void;
}

export const EntranceScreen: React.FC<EntranceScreenProps> = ({
  onEnterMuseum,
  onQuickJump
}) => {
  return (
    <div className="relative min-h-screen w-full bg-[#130F0C] text-[#F7F4EE] flex flex-col justify-between overflow-y-auto">
      {/* Subtle Architectural Sandstone & Brass Background Atmosphere */}
      <div
        className="pointer-events-none fixed inset-0 opacity-90"
        style={{
          background:
            'radial-gradient(circle at 50% 28%, rgba(200, 157, 84, 0.16) 0%, rgba(94, 34, 22, 0.14) 42%, rgba(19, 15, 12, 0.98) 80%)'
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

      {/* Top Institutional Bar (Strict 3-Zone Contract) */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-5 flex items-center justify-between border-b border-[#C89D54]/25">
        <span className="font-serif-display text-lg font-semibold tracking-wider text-[#F7F4EE]">
          BHARAT KALA MUSEUM
        </span>

        <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-[#D6CEBE]">
          <button
            type="button"
            onClick={() => onQuickJump('history')}
            className="hover:text-[#E5B869] transition-colors whitespace-nowrap"
          >
            History Hall (CO1)
          </button>
          <button
            type="button"
            onClick={() => onQuickJump('map')}
            className="hover:text-[#E5B869] transition-colors whitespace-nowrap"
          >
            India Art Map (CO1)
          </button>
          <button
            type="button"
            onClick={() => onQuickJump('fusion')}
            className="hover:text-[#E5B869] transition-colors whitespace-nowrap"
          >
            Fusion Gallery (CO2)
          </button>
          <button
            type="button"
            onClick={() => onQuickJump('tour')}
            className="hover:text-[#E5B869] transition-colors whitespace-nowrap"
          >
            Guided Tour
          </button>
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onEnterMuseum}
            className="px-4 py-2 rounded bg-[#C89D54] text-[#14110F] text-xs font-semibold hover:bg-[#D9B068] transition-colors whitespace-nowrap"
          >
            Enter 3D Hall
          </button>
        </div>
      </header>

      {/* Main Center Architectural Portal */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-10 max-w-5xl mx-auto text-center">
        {/* Decorative Cusped Arch Frame */}
        <div className="w-full p-8 sm:p-12 md:p-14 rounded-xl bg-[#1A1511]/85 backdrop-blur-md border border-[#C89D54]/40 shadow-2xl relative">
          {/* Top Brass Arch Ornament SVG */}
          <div className="flex justify-center mb-6">
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

          {/* Kicker Metadata (Clean unboxed text with separators) */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs tracking-widest uppercase text-[#C89D54] mb-4">
            <span>Curatorial Digital Exhibition</span>
            <span aria-hidden="true">·</span>
            <span>CLA-I Academic Project</span>
            <span aria-hidden="true">·</span>
            <span>CO1 &amp; CO2</span>
          </div>

          {/* Main Museum Title */}
          <h1
            className="font-serif-display text-4xl sm:text-6xl md:text-7xl font-semibold tracking-wide text-[#F7F4EE] mb-4"
            style={{ textWrap: 'balance' }}
          >
            BHARAT KALA MUSEUM
          </h1>

          {/* Subtitle */}
          <p className="font-serif-display italic text-xl sm:text-2xl md:text-3xl text-[#E5B869] mb-6">
            “An Interactive Journey Through Indian Art”
          </p>

          {/* Hairline Divider */}
          <div className="w-36 h-px bg-[#C89D54]/50 mx-auto mb-6" />

          {/* Short Curatorial Description */}
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#D6CEBE] leading-relaxed mb-9">
            Step inside a navigable three-dimensional architectural pavilion dedicated to over four
            millennia of Indian visual heritage. Explore six chronological masterworks in the{' '}
            <strong className="font-medium text-[#F7F4EE]">History Hall</strong>, traverse eight
            regional heritage centers on the{' '}
            <strong className="font-medium text-[#F7F4EE]">Interactive Art &amp; Culture Map</strong>,
            and inspect an original{' '}
            <strong className="font-medium text-[#F7F4EE]">Warli × Kalamkari</strong> digital synthesis
            in the <strong className="font-medium text-[#F7F4EE]">Fusion Gallery</strong>.
          </p>

          {/* Primary CTA: ENTER MUSEUM + Secondary Guided Tour CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <button
              type="button"
              onClick={onEnterMuseum}
              className="group px-8 py-4 rounded-lg bg-[#C89D54] hover:bg-[#DEB469] text-[#14110F] font-semibold text-sm sm:text-base tracking-wide transition-all shadow-lg flex items-center gap-3 cursor-pointer"
            >
              <span>ENTER MUSEUM</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              type="button"
              onClick={() => onQuickJump('tour')}
              className="px-6 py-4 rounded-lg bg-[#251E18] hover:bg-[#322820] text-[#F7F4EE] border border-[#C89D54]/45 font-medium text-sm transition-colors flex items-center gap-2.5 cursor-pointer"
            >
              <Compass className="w-4 h-4 text-[#E5B869]" />
              <span>Start Automated Guided Tour</span>
            </button>
          </div>

          {/* Three Museum Wings Overview Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left border-t border-[#C89D54]/25 pt-8">
            <button
              type="button"
              onClick={() => onQuickJump('history')}
              className="group p-4 rounded-lg bg-[#15110E]/90 hover:bg-[#211B16] border border-[#C89D54]/25 hover:border-[#C89D54]/60 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between text-xs text-[#C89D54] mb-1.5">
                <span>01 · North Wing · CO1</span>
                <Sparkles className="w-3.5 h-3.5 opacity-80 group-hover:scale-110 transition-transform" />
              </div>
              <h2 className="font-serif-display text-lg font-semibold text-[#F7F4EE] mb-1">
                History Hall Timeline
              </h2>
              <p className="text-xs text-[#A89F91] leading-relaxed">
                Chronological gallery of 6 exhibits: Indus Valley Dancing Girl, Ajanta Murals, Chola
                Nataraja, Mughal Miniature, Madhubani, and Warli Art.
              </p>
            </button>

            <button
              type="button"
              onClick={() => onQuickJump('map')}
              className="group p-4 rounded-lg bg-[#15110E]/90 hover:bg-[#211B16] border border-[#C89D54]/25 hover:border-[#C89D54]/60 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between text-xs text-[#C89D54] mb-1.5">
                <span>02 · West Wing · CO1</span>
                <MapPin className="w-3.5 h-3.5 opacity-80 group-hover:scale-110 transition-transform" />
              </div>
              <h2 className="font-serif-display text-lg font-semibold text-[#F7F4EE] mb-1">
                Indian Art &amp; Culture Map
              </h2>
              <p className="text-xs text-[#A89F91] leading-relaxed">
                Interactive Leaflet &amp; OpenStreetMap cartography of Ajanta, Ellora, Thanjavur,
                Khajuraho, Madhubani, Warli Region, Puri, and Jaipur.
              </p>
            </button>

            <button
              type="button"
              onClick={() => onQuickJump('fusion')}
              className="group p-4 rounded-lg bg-[#15110E]/90 hover:bg-[#211B16] border border-[#C89D54]/25 hover:border-[#C89D54]/60 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between text-xs text-[#C89D54] mb-1.5">
                <span>03 · East Wing · CO2</span>
                <Layers className="w-3.5 h-3.5 opacity-80 group-hover:scale-110 transition-transform" />
              </div>
              <h2 className="font-serif-display text-lg font-semibold text-[#F7F4EE] mb-1">
                Fusion Gallery
              </h2>
              <p className="text-xs text-[#A89F91] leading-relaxed">
                Original Warli × Kalamkari regional painting synthesis with interactive layer
                highlighting and curatorial analysis.
              </p>
            </button>
          </div>
        </div>
      </main>

      {/* Operational Utility Footer Strip */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 py-4 border-t border-[#C89D54]/20 flex flex-wrap items-center justify-between gap-4 text-xs text-[#A89F91]">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[#D6CEBE] font-medium">3D Navigation Controls:</span>
          <span>WASD or Arrow Keys to Walk</span>
          <span aria-hidden="true">·</span>
          <span>Mouse Drag or Lock to Look</span>
          <span aria-hidden="true">·</span>
          <span>Click Exhibits to Inspect</span>
          <span aria-hidden="true">·</span>
          <span>ESC to Close Panels</span>
        </div>
        <div>
          <span>Bharat Kala Museum · Curatorial Archive &amp; Virtual Exhibition</span>
        </div>
      </footer>
    </div>
  );
};
