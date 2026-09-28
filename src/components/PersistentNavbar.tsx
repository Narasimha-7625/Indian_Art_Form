import React, { useState } from 'react';
import { Compass, Cuboid, Home, Info, Layers, MapPin, Menu, Sparkles, X } from 'lucide-react';

export type NavSection = 'home' | '3d-hall' | 'timeline' | 'art-map' | 'fusion-gallery' | 'about';

interface PersistentNavbarProps {
  activeSection: NavSection;
  onNavigate: (section: NavSection) => void;
  onStartGuidedTour: () => void;
  isTourActive?: boolean;
}

export const PersistentNavbar: React.FC<PersistentNavbarProps> = ({
  activeSection,
  onNavigate,
  onStartGuidedTour,
  isTourActive = false
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: NavSection; label: string; badge?: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Home className="w-3.5 h-3.5" /> },
    { id: 'timeline', label: 'Timeline', badge: 'CO1', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'art-map', label: 'Art Map', badge: 'CO1', icon: <MapPin className="w-3.5 h-3.5" /> },
    {
      id: 'fusion-gallery',
      label: 'Fusion Gallery',
      badge: 'CO2',
      icon: <Layers className="w-3.5 h-3.5" />
    },
    { id: 'about', label: 'About', icon: <Info className="w-3.5 h-3.5" /> }
  ];

  const handleSelect = (section: NavSection) => {
    setMobileMenuOpen(false);
    onNavigate(section);
  };

  return (
    <header className="relative z-50 w-full bg-[#14100D]/95 backdrop-blur-md border-b border-[#C89D54]/35 select-none shrink-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Zone 1: Official Project Brand */}
        <button
          type="button"
          onClick={() => handleSelect('home')}
          className="font-serif-display text-lg sm:text-xl font-semibold tracking-wider text-[#F7F4EE] hover:text-[#E5B869] transition-colors cursor-pointer whitespace-nowrap text-left"
        >
          BHARAT KALA MUSEUM
        </button>

        {/* Zone 2: Desktop Navigation Links (Home, Timeline, Art Map, Fusion Gallery, About) */}
        <nav
          className="hidden md:flex items-center gap-5 lg:gap-7 text-xs font-medium"
          aria-label="Primary Museum Navigation"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.id)}
                className={`py-1.5 flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap border-b-2 ${
                  isActive
                    ? 'border-[#C89D54] text-[#E5B869] font-semibold'
                    : 'border-transparent text-[#D6CEBE] hover:text-[#F7F4EE]'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[10px] font-mono text-[#C89D54] opacity-85">
                    · {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 3D Museum Hall & Mobile Menu Trigger */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleSelect('3d-hall')}
            className={`hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
              activeSection === '3d-hall'
                ? 'bg-[#C89D54] text-[#14110F]'
                : 'bg-[#261E18] hover:bg-[#352A21] text-[#F7F4EE] border border-[#C89D54]/45'
            }`}
          >
            <Cuboid className="w-3.5 h-3.5 text-current" />
            <span>3D Museum Hall</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onStartGuidedTour();
            }}
            className={`hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap border ${
              isTourActive
                ? 'bg-[#C89D54]/20 border-[#E5B869] text-[#E5B869]'
                : 'bg-[#1D1712] hover:bg-[#2A211A] border-[#C89D54]/30 text-[#D6CEBE]'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-[#E5B869]" />
            <span>{isTourActive ? 'Tour Active' : 'Guided Tour'}</span>
          </button>

          {/* Working Mobile Hamburger Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-lg bg-[#241D17] hover:bg-[#342A21] border border-[#C89D54]/40 text-[#F7F4EE] cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-[#E5B869]" />
            ) : (
              <Menu className="w-5 h-5 text-[#E5B869]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#18130F] border-b border-[#C89D54]/40 px-4 pt-2 pb-4 space-y-1.5 shadow-2xl">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.id)}
                className={`w-full px-3.5 py-2.5 rounded-lg text-left text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#C89D54] text-[#14110F] font-semibold'
                    : 'bg-[#211A14] text-[#F7F4EE] hover:bg-[#2E241C]'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  {item.icon}
                  <span>{item.label}</span>
                </span>
                {item.badge && (
                  <span
                    className={`text-[10px] font-mono ${
                      isActive ? 'text-[#14110F]' : 'text-[#E5B869]'
                    }`}
                  >
                    CLA-I · {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-2 grid grid-cols-2 gap-2 border-t border-[#C89D54]/20">
            <button
              type="button"
              onClick={() => handleSelect('3d-hall')}
              className="px-3 py-2.5 rounded-lg bg-[#282019] border border-[#C89D54]/45 text-xs font-semibold text-[#E5B869] flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Cuboid className="w-3.5 h-3.5" />
              <span>Enter 3D Hall</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onStartGuidedTour();
              }}
              className="px-3 py-2.5 rounded-lg bg-[#282019] border border-[#C89D54]/45 text-xs font-semibold text-[#F7F4EE] flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5 text-[#E5B869]" />
              <span>Guided Tour</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
