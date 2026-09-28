import React from 'react';
import { ArrowRight, Compass, Cuboid, Layers, MapPin, Sparkles } from 'lucide-react';
import { NavSection } from './PersistentNavbar';

interface AboutSectionProps {
  onNavigate: (section: NavSection) => void;
  onStartGuidedTour: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onNavigate,
  onStartGuidedTour
}) => {
  return (
    <div className="flex-1 overflow-y-auto bg-[#14110F] text-[#F7F4EE]">
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">
        {/* Main Header */}
        <header className="p-8 rounded-xl bg-[#1A1511] border border-[#C89D54]/40 space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest text-[#C89D54] font-semibold">
            <span>About the Exhibition</span>
            <span aria-hidden="true">·</span>
            <span>CLA-I Academic Demonstration</span>
            <span aria-hidden="true">·</span>
            <span>Course Outcomes CO1 &amp; CO2</span>
          </div>

          <h1 className="font-serif-display text-4xl sm:text-5xl font-semibold text-[#F7F4EE]">
            BHARAT KALA MUSEUM
          </h1>
          <p className="font-serif-display italic text-xl sm:text-2xl text-[#E5B869]">
            An Interactive Journey Through Indian Art
          </p>

          <p className="text-sm sm:text-base text-[#D6CEBE] leading-relaxed max-w-3xl">
            <strong className="text-[#F7F4EE]">BHARAT KALA MUSEUM</strong> is an interactive
            educational virtual museum created as a College CLA-I assignment. It integrates a
            three-dimensional navigable architectural gallery with three structured curatorial
            activities examining the chronological evolution, cultural geography, and creative
            regional synthesis of Indian visual traditions.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => onNavigate('3d-hall')}
              className="px-5 py-2.5 rounded-lg bg-[#C89D54] hover:bg-[#DEB469] text-[#14110F] text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Cuboid className="w-4 h-4" />
              <span>Enter 3D Museum Hall</span>
            </button>

            <button
              type="button"
              onClick={onStartGuidedTour}
              className="px-5 py-2.5 rounded-lg bg-[#261E18] hover:bg-[#352A21] border border-[#C89D54]/45 text-[#F7F4EE] text-xs sm:text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Compass className="w-4 h-4 text-[#E5B869]" />
              <span>Start 8-Stop Guided Tour</span>
            </button>
          </div>
        </header>

        {/* Three CLA-I Activities Breakdown */}
        <section className="space-y-4">
          <h2 className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#F7F4EE]">
            CLA-I Assignment Structure &amp; Course Outcomes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Activity 1 */}
            <div className="p-6 rounded-xl bg-[#18130F] border border-[#C89D54]/30 flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <div className="text-xs uppercase tracking-widest text-[#E5B869] font-semibold">
                  Activity 1 · CLA-I · CO1
                </div>
                <h3 className="font-serif-display text-2xl font-semibold text-[#F7F4EE]">
                  Interactive Indian Art Timeline
                </h3>
                <p className="text-xs text-[#D6CEBE] leading-relaxed">
                  A chronological exploration of six foundational Indian art traditions:
                  <strong> Indus Valley</strong> (Dancing Girl), <strong>Ajanta</strong> (Cave
                  Murals), <strong>Chola</strong> (Nataraja Bronze), <strong>Mughal</strong>{' '}
                  (Miniature Painting), <strong>Madhubani</strong> (Mithila Painting), and{' '}
                  <strong>Warli</strong> (Indigenous Wall Painting).
                </p>
              </div>

              <button
                type="button"
                onClick={() => onNavigate('timeline')}
                className="w-full py-2.5 px-4 rounded-lg bg-[#251E18] hover:bg-[#C89D54] text-[#F7F4EE] hover:text-[#14110F] border border-[#C89D54]/40 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Explore the Timeline</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Activity 2 */}
            <div className="p-6 rounded-xl bg-[#18130F] border border-[#C89D54]/30 flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <div className="text-xs uppercase tracking-widest text-[#E5B869] font-semibold">
                  Activity 2 · CLA-I · CO1
                </div>
                <h3 className="font-serif-display text-2xl font-semibold text-[#F7F4EE]">
                  Interactive Indian Art Map
                </h3>
                <p className="text-xs text-[#D6CEBE] leading-relaxed">
                  Real geographic cartography built with <strong>Leaflet</strong> and{' '}
                  <strong>OpenStreetMap</strong> featuring eight clickable heritage locations:
                  <strong> Ajanta, Ellora, Thanjavur, Khajuraho, Madhubani, Warli Region, Puri,</strong>{' '}
                  and <strong>Jaipur</strong>.
                </p>
              </div>

              <button
                type="button"
                onClick={() => onNavigate('art-map')}
                className="w-full py-2.5 px-4 rounded-lg bg-[#251E18] hover:bg-[#C89D54] text-[#F7F4EE] hover:text-[#14110F] border border-[#C89D54]/40 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Explore the Art Map</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Activity 3 */}
            <div className="p-6 rounded-xl bg-[#18130F] border border-[#C89D54]/30 flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <div className="text-xs uppercase tracking-widest text-[#E5B869] font-semibold">
                  Activity 3 · CLA-I · CO2
                </div>
                <h3 className="font-serif-display text-2xl font-semibold text-[#F7F4EE]">
                  Regional Painting Fusion
                </h3>
                <p className="text-xs text-[#D6CEBE] leading-relaxed">
                  An original <strong>WARLI × KALAMKARI</strong> digital fusion artwork uniting
                  Maharashtra’s geometric rice-paste village figures and Tarpa dancers with Andhra
                  Pradesh’s botanical Tree of Life vines, floral motifs, and ornate borders.
                </p>
              </div>

              <button
                type="button"
                onClick={() => onNavigate('fusion-gallery')}
                className="w-full py-2.5 px-4 rounded-lg bg-[#251E18] hover:bg-[#C89D54] text-[#F7F4EE] hover:text-[#14110F] border border-[#C89D54]/40 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Explore the Fusion Gallery</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>

        {/* Museum Guide & Navigation Instructions */}
        <section className="p-6 rounded-xl bg-[#18130F] border border-[#C89D54]/30 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h3 className="text-xs uppercase tracking-widest text-[#C89D54] font-semibold">
              3D Spatial Navigation &amp; Controls
            </h3>
            <p className="text-xs sm:text-sm text-[#D6CEBE] leading-relaxed">
              Inside the 3D Museum Hall, visitors can walk freely using <strong>W A S D</strong> or{' '}
              <strong>Arrow Keys</strong>, look around by dragging the mouse (or toggling Mouse Look
              Lock), and click on any framed artwork or 3D bronze sculpture to inspect its curatorial
              record. Pressing <strong>ESC</strong> closes any active modal panel.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs uppercase tracking-widest text-[#C89D54] font-semibold">
              Architectural &amp; Visual Language
            </h3>
            <p className="text-xs sm:text-sm text-[#D6CEBE] leading-relaxed">
              Designed with an authentic Indian institutional aesthetic—combining warm Rajasthani
              sandstone walls, dark teakwood flooring, brass frames, and procedural canvas
              reconstructions—so that every artwork and map marker operates reliably across desktop,
              tablet, and mobile viewports.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-4 border-t border-[#C89D54]/20 flex flex-wrap items-center justify-between gap-4 text-xs text-[#A89F91]">
          <span className="font-serif-display text-sm text-[#F7F4EE] font-semibold">
            BHARAT KALA MUSEUM — An Interactive Journey Through Indian Art
          </span>
          <span>CLA-I Educational Virtual Museum · CO1 &amp; CO2</span>
        </footer>
      </div>
    </div>
  );
};
