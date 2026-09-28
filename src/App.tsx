import React, { useCallback, useEffect, useState } from 'react';
import {
  GUIDED_TOUR_STOPS,
  GuidedTourStop,
  TIMELINE_EXHIBITS,
  TimelineExhibit
} from './data/exhibitsData';
import { PersistentNavbar, NavSection } from './components/PersistentNavbar';
import { EntranceScreen } from './components/EntranceScreen';
import { MuseumHUD } from './components/MuseumHUD';
import { ExhibitModal } from './components/ExhibitModal';
import { TimelineOverviewModal } from './components/TimelineOverviewModal';
import { ArtMapSection } from './components/ArtMapSection';
import { FusionGallerySection } from './components/FusionGallerySection';
import { AboutSection } from './components/AboutSection';
import { CameraPose, HoveredTarget, MuseumScene3D } from './scenes/MuseumScene3D';

export default function App() {
  // Active primary section: 'home' | '3d-hall' | 'timeline' | 'art-map' | 'fusion-gallery' | 'about'
  const [activeSection, setActiveSection] = useState<NavSection>('home');
  const [selectedExhibitId, setSelectedExhibitId] = useState<string | null>(null);
  const [focusedMapSiteId, setFocusedMapSiteId] = useState<string | null>(null);

  // 3D Camera target pose for smooth teleport / Guided Tour interpolation
  const [targetCameraPose, setTargetCameraPose] = useState<CameraPose | null>({
    position: [0, 2.2, 5.5],
    lookAt: [0, 2.2, -10],
    timestamp: Date.now()
  });

  // Live 3D visitor status reported from MuseumScene3D
  const [visitorStatus, setVisitorStatus] = useState<{
    section: 'entrance' | 'history' | 'map' | 'fusion';
    nearestExhibit: TimelineExhibit | null;
    position: [number, number];
    yaw: number;
  }>({
    section: 'entrance',
    nearestExhibit: null,
    position: [0, 5.5],
    yaw: 0
  });

  const [hoveredTarget, setHoveredTarget] = useState<HoveredTarget | null>(null);
  const [virtualMoveInput, setVirtualMoveInput] = useState<{
    forward: number;
    right: number;
    turn: number;
  }>({ forward: 0, right: 0, turn: 0 });

  // Guided Tour state
  const [isTourActive, setIsTourActive] = useState<boolean>(false);
  const [tourStopIndex, setTourStopIndex] = useState<number>(0);
  const [isTourPaused, setIsTourPaused] = useState<boolean>(false);
  const [tourProgress, setTourProgress] = useState<number>(0);

  const selectedExhibit =
    TIMELINE_EXHIBITS.find((e) => e.id === selectedExhibitId) || null;

  // Move 3D camera to a specific Guided Tour stop
  const applyTourStop = useCallback((index: number) => {
    const stop = GUIDED_TOUR_STOPS[index];
    if (!stop) return;
    setTourStopIndex(index);
    setTourProgress(0);
    setSelectedExhibitId(null);
    setActiveSection('3d-hall');
    setTargetCameraPose({
      position: stop.cameraPos,
      lookAt: stop.cameraLookAt,
      timestamp: Date.now()
    });
  }, []);

  // Auto-advance timer for Guided Tour when active and in 3D Hall
  useEffect(() => {
    if (
      !isTourActive ||
      isTourPaused ||
      selectedExhibitId ||
      activeSection !== '3d-hall'
    ) {
      return;
    }

    const interval = setInterval(() => {
      setTourProgress((prev) => {
        if (prev >= 100) {
          const nextIdx = (tourStopIndex + 1) % GUIDED_TOUR_STOPS.length;
          applyTourStop(nextIdx);
          return 0;
        }
        return prev + 2;
      });
    }, 180);

    return () => clearInterval(interval);
  }, [
    isTourActive,
    isTourPaused,
    tourStopIndex,
    selectedExhibitId,
    activeSection,
    applyTourStop
  ]);

  // Global ESC key handler to close any opened exhibit modal or return to 3D hall / home
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedExhibitId) {
          setSelectedExhibitId(null);
        } else if (isTourActive) {
          setIsTourActive(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedExhibitId, isTourActive]);

  // Unified section navigation handler
  const handleNavigate = (section: NavSection) => {
    setSelectedExhibitId(null);
    if (section !== 'art-map') {
      setFocusedMapSiteId(null);
    }
    setActiveSection(section);

    if (section === '3d-hall') {
      setTargetCameraPose({
        position: [0, 2.2, 5.5],
        lookAt: [0, 2.2, -12],
        timestamp: Date.now()
      });
    } else if (section === 'timeline') {
      setTargetCameraPose({
        position: [-3.2, 2.2, -14],
        lookAt: [-8.4, 2.5, -14],
        timestamp: Date.now()
      });
    } else if (section === 'art-map') {
      setTargetCameraPose({
        position: [-16.5, 2.2, -2],
        lookAt: [-22.4, 2.6, -2],
        timestamp: Date.now()
      });
    } else if (section === 'fusion-gallery') {
      setTargetCameraPose({
        position: [16.5, 2.2, -2],
        lookAt: [22.4, 2.8, -2],
        timestamp: Date.now()
      });
    }
  };

  // Teleport 3D camera in front of a History Hall exhibit
  const handleTeleportToExhibit = (exhibitId: string) => {
    const found = TIMELINE_EXHIBITS.find((e) => e.id === exhibitId);
    if (!found) return;
    setSelectedExhibitId(null);
    setActiveSection('3d-hall');
    setTargetCameraPose({
      position: found.cameraStandPos,
      lookAt: found.cameraLookAt,
      timestamp: Date.now()
    });
  };

  // Inspect an exhibit (opens ExhibitModal and also aligns 3D camera to it)
  const handleInspectExhibit = (exhibitId: string) => {
    const found = TIMELINE_EXHIBITS.find((e) => e.id === exhibitId);
    if (!found) return;
    setSelectedExhibitId(exhibitId);
    setTargetCameraPose({
      position: found.cameraStandPos,
      lookAt: found.cameraLookAt,
      timestamp: Date.now()
    });
  };

  // Guided Tour Controls
  const handleStartGuidedTour = () => {
    setIsTourActive(true);
    setIsTourPaused(false);
    applyTourStop(0);
  };

  const handleNextTourStop = () => {
    const nextIdx = (tourStopIndex + 1) % GUIDED_TOUR_STOPS.length;
    applyTourStop(nextIdx);
  };

  const handlePrevTourStop = () => {
    const prevIdx =
      (tourStopIndex - 1 + GUIDED_TOUR_STOPS.length) % GUIDED_TOUR_STOPS.length;
    applyTourStop(prevIdx);
  };

  const handleInspectCurrentTourStop = (stop: GuidedTourStop) => {
    setIsTourPaused(true);
    if (stop.section === 'history' && stop.exhibitId) {
      setSelectedExhibitId(stop.exhibitId);
    } else if (stop.section === 'map') {
      setActiveSection('art-map');
    } else if (stop.section === 'fusion') {
      setActiveSection('fusion-gallery');
    }
  };

  return (
    <div className="relative w-screen h-screen flex flex-col overflow-hidden bg-[#14110F] text-[#F7F4EE]">
      {/* Persistent Museum Navigation Bar with Mobile Menu */}
      <PersistentNavbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onStartGuidedTour={handleStartGuidedTour}
        isTourActive={isTourActive}
      />

      {/* Main Viewport Area below Persistent Navbar */}
      <div className="relative flex-1 flex flex-col overflow-hidden">
        {/* SECTION: HOME (Landing Page) */}
        {activeSection === 'home' && (
          <EntranceScreen
            onEnterMuseum={() => handleNavigate('3d-hall')}
            onNavigate={handleNavigate}
            onStartGuidedTour={handleStartGuidedTour}
          />
        )}

        {/* SECTION: 3D NAVIGABLE VIRTUAL MUSEUM HALL */}
        {activeSection === '3d-hall' && (
          <div className="relative flex-1 w-full h-full overflow-hidden">
            <MuseumScene3D
              targetCameraPose={targetCameraPose}
              onSelectExhibit={handleInspectExhibit}
              onOpenMapSection={() => handleNavigate('art-map')}
              onOpenFusionSection={() => handleNavigate('fusion-gallery')}
              onUpdateVisitorStatus={setVisitorStatus}
              onHoverTargetChange={setHoveredTarget}
              virtualMoveInput={virtualMoveInput}
              isModalOpen={Boolean(selectedExhibitId)}
            />

            <MuseumHUD
              visitorStatus={visitorStatus}
              hoveredTarget={hoveredTarget}
              onGoHomeEntrance={() => handleNavigate('home')}
              onTeleportToEntranceHall={() => {
                setSelectedExhibitId(null);
                setTargetCameraPose({
                  position: [0, 2.2, 5.5],
                  lookAt: [0, 2.2, -12],
                  timestamp: Date.now()
                });
              }}
              onOpenTimelineOverview={() => handleNavigate('timeline')}
              onOpenArtMap={() => handleNavigate('art-map')}
              onOpenFusionGallery={() => handleNavigate('fusion-gallery')}
              onOpenAbout={() => handleNavigate('about')}
              onTeleportToExhibit={handleTeleportToExhibit}
              onInspectExhibit={handleInspectExhibit}
              isTourActive={isTourActive}
              tourStopIndex={tourStopIndex}
              isTourPaused={isTourPaused}
              tourProgress={tourProgress}
              onStartGuidedTour={handleStartGuidedTour}
              onNextTourStop={handleNextTourStop}
              onPrevTourStop={handlePrevTourStop}
              onTogglePauseTour={() => setIsTourPaused((p) => !p)}
              onExitGuidedTour={() => setIsTourActive(false)}
              onInspectCurrentTourStop={handleInspectCurrentTourStop}
              onVirtualMoveChange={setVirtualMoveInput}
            />
          </div>
        )}

        {/* SECTION: ACTIVITY 1 — INTERACTIVE INDIAN ART TIMELINE (CO1) */}
        {activeSection === 'timeline' && (
          <TimelineOverviewModal
            onClose={() => handleNavigate('3d-hall')}
            onInspectExhibit={(id) => handleInspectExhibit(id)}
            onWalkToExhibit={(id) => handleTeleportToExhibit(id)}
          />
        )}

        {/* SECTION: ACTIVITY 2 — INTERACTIVE INDIAN ART MAP (CO1) */}
        {activeSection === 'art-map' && (
          <ArtMapSection
            initialSiteId={focusedMapSiteId}
            onBackToMuseum={() => handleNavigate('3d-hall')}
            onInspectLinkedTimelineExhibit={(exhibitId) => handleInspectExhibit(exhibitId)}
          />
        )}

        {/* SECTION: ACTIVITY 3 — REGIONAL PAINTING FUSION GALLERY (CO2) */}
        {activeSection === 'fusion-gallery' && (
          <FusionGallerySection onBackToMuseum={() => handleNavigate('3d-hall')} />
        )}

        {/* SECTION: ABOUT BHARAT KALA MUSEUM */}
        {activeSection === 'about' && (
          <AboutSection
            onNavigate={handleNavigate}
            onStartGuidedTour={handleStartGuidedTour}
          />
        )}
      </div>

      {/* ACTIVITY 1: Detailed Exhibit Information Modal (accessible from Timeline, 3D Hall, or Map) */}
      {selectedExhibit && (
        <ExhibitModal
          exhibit={selectedExhibit}
          onClose={() => setSelectedExhibitId(null)}
          onSelectExhibit={(nextId) => handleInspectExhibit(nextId)}
          onOpenLinkedMapSite={(siteId) => {
            setSelectedExhibitId(null);
            setFocusedMapSiteId(siteId);
            setActiveSection('art-map');
          }}
        />
      )}
    </div>
  );
}
