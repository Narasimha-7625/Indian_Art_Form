import React, { useCallback, useEffect, useState } from 'react';
import {
  GUIDED_TOUR_STOPS,
  GuidedTourStop,
  TIMELINE_EXHIBITS,
  TimelineExhibit
} from './data/exhibitsData';
import { EntranceScreen } from './components/EntranceScreen';
import { MuseumHUD } from './components/MuseumHUD';
import { ExhibitModal } from './components/ExhibitModal';
import { TimelineOverviewModal } from './components/TimelineOverviewModal';
import { ArtMapSection } from './components/ArtMapSection';
import { FusionGallerySection } from './components/FusionGallerySection';
import { CameraPose, HoveredTarget, MuseumScene3D } from './scenes/MuseumScene3D';

type ActiveOverlay = 'none' | 'timeline-overview' | 'art-map' | 'fusion-gallery';

export default function App() {
  // Whether visitor is on the opening cinematic entrance screen or inside the 3D museum
  const [hasEnteredMuseum, setHasEnteredMuseum] = useState<boolean>(false);
  const [isInitializing3D, setIsInitializing3D] = useState<boolean>(false);

  // Active full-section overlay or exhibit modal
  const [activeOverlay, setActiveOverlay] = useState<ActiveOverlay>('none');
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
    setActiveOverlay('none');
    setTargetCameraPose({
      position: stop.cameraPos,
      lookAt: stop.cameraLookAt,
      timestamp: Date.now()
    });
  }, []);

  // Auto-advance timer for Guided Tour when active and not paused or viewing a modal
  useEffect(() => {
    if (!isTourActive || isTourPaused || selectedExhibitId || activeOverlay !== 'none') {
      return;
    }

    const interval = setInterval(() => {
      setTourProgress((prev) => {
        if (prev >= 100) {
          const nextIdx = (tourStopIndex + 1) % GUIDED_TOUR_STOPS.length;
          applyTourStop(nextIdx);
          return 0;
        }
        return prev + 2; // ~9 seconds per stop
      });
    }, 180);

    return () => clearInterval(interval);
  }, [
    isTourActive,
    isTourPaused,
    tourStopIndex,
    selectedExhibitId,
    activeOverlay,
    applyTourStop
  ]);

  // Global ESC key handler to close any opened exhibit panel, map, or fusion overlay
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedExhibitId) {
          setSelectedExhibitId(null);
        } else if (activeOverlay !== 'none') {
          setActiveOverlay('none');
        } else if (isTourActive) {
          setIsTourActive(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedExhibitId, activeOverlay, isTourActive]);

  // Enter Museum handler with brief loading state
  const handleEnterMuseum = () => {
    setIsInitializing3D(true);
    setHasEnteredMuseum(true);
    setActiveOverlay('none');
    setSelectedExhibitId(null);
    setTargetCameraPose({
      position: [0, 2.2, 5.5],
      lookAt: [0, 2.2, -12],
      timestamp: Date.now()
    });
    setTimeout(() => {
      setIsInitializing3D(false);
    }, 320);
  };

  // Quick-jump from Entrance Screen
  const handleQuickJump = (destination: 'history' | 'map' | 'fusion' | 'tour') => {
    setHasEnteredMuseum(true);
    setSelectedExhibitId(null);

    if (destination === 'history') {
      setActiveOverlay('timeline-overview');
      setTargetCameraPose({
        position: [-3.2, 2.2, -14],
        lookAt: [-8.4, 2.5, -14],
        timestamp: Date.now()
      });
    } else if (destination === 'map') {
      setActiveOverlay('art-map');
      setTargetCameraPose({
        position: [-16.5, 2.2, -2],
        lookAt: [-22.4, 2.6, -2],
        timestamp: Date.now()
      });
    } else if (destination === 'fusion') {
      setActiveOverlay('fusion-gallery');
      setTargetCameraPose({
        position: [16.5, 2.2, -2],
        lookAt: [22.4, 2.8, -2],
        timestamp: Date.now()
      });
    } else if (destination === 'tour') {
      setActiveOverlay('none');
      setIsTourActive(true);
      setIsTourPaused(false);
      applyTourStop(0);
    }
  };

  // Teleport 3D camera in front of a History Hall exhibit
  const handleTeleportToExhibit = (exhibitId: string) => {
    const found = TIMELINE_EXHIBITS.find((e) => e.id === exhibitId);
    if (!found) return;
    setActiveOverlay('none');
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
    setActiveOverlay('none');
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
      setActiveOverlay('art-map');
    } else if (stop.section === 'fusion') {
      setActiveOverlay('fusion-gallery');
    }
  };

  if (!hasEnteredMuseum) {
    return (
      <EntranceScreen
        onEnterMuseum={handleEnterMuseum}
        onQuickJump={handleQuickJump}
      />
    );
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#14110F] text-[#F7F4EE]">
      {/* Brief Loading Screen Transition */}
      {isInitializing3D && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#14110F] text-[#F7F4EE]">
          <div className="w-12 h-12 rounded-full border-2 border-[#C89D54] border-t-transparent animate-spin mb-4" />
          <p className="font-serif-display text-2xl text-[#E5B869]">
            Entering Bharat Kala Museum...
          </p>
          <p className="text-xs text-[#A89F91] mt-1">
            Preparing 3D Architectural Galleries &amp; Curatorial Archives
          </p>
        </div>
      )}

      {/* 3D Navigable Museum Scene */}
      <MuseumScene3D
        targetCameraPose={targetCameraPose}
        onSelectExhibit={handleInspectExhibit}
        onOpenMapSection={() => {
          setFocusedMapSiteId(null);
          setActiveOverlay('art-map');
        }}
        onOpenFusionSection={() => setActiveOverlay('fusion-gallery')}
        onUpdateVisitorStatus={setVisitorStatus}
        onHoverTargetChange={setHoveredTarget}
        virtualMoveInput={virtualMoveInput}
        isModalOpen={Boolean(selectedExhibitId) || activeOverlay !== 'none'}
      />

      {/* Interactive Museum HUD */}
      <MuseumHUD
        visitorStatus={visitorStatus}
        hoveredTarget={hoveredTarget}
        onGoHomeEntrance={() => {
          setIsTourActive(false);
          setSelectedExhibitId(null);
          setActiveOverlay('none');
          setHasEnteredMuseum(false);
        }}
        onTeleportToEntranceHall={() => {
          setSelectedExhibitId(null);
          setActiveOverlay('none');
          setTargetCameraPose({
            position: [0, 2.2, 5.5],
            lookAt: [0, 2.2, -12],
            timestamp: Date.now()
          });
        }}
        onOpenTimelineOverview={() => {
          setSelectedExhibitId(null);
          setActiveOverlay('timeline-overview');
          setTargetCameraPose({
            position: [-3.2, 2.2, -14],
            lookAt: [-8.4, 2.5, -14],
            timestamp: Date.now()
          });
        }}
        onOpenArtMap={() => {
          setSelectedExhibitId(null);
          setFocusedMapSiteId(null);
          setActiveOverlay('art-map');
          setTargetCameraPose({
            position: [-16.5, 2.2, -2],
            lookAt: [-22.4, 2.6, -2],
            timestamp: Date.now()
          });
        }}
        onOpenFusionGallery={() => {
          setSelectedExhibitId(null);
          setActiveOverlay('fusion-gallery');
          setTargetCameraPose({
            position: [16.5, 2.2, -2],
            lookAt: [22.4, 2.8, -2],
            timestamp: Date.now()
          });
        }}
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

      {/* ACTIVITY 1: Chronological Visual Timeline Overview Modal */}
      {activeOverlay === 'timeline-overview' && (
        <TimelineOverviewModal
          onClose={() => setActiveOverlay('none')}
          onInspectExhibit={(id) => {
            setActiveOverlay('none');
            handleInspectExhibit(id);
          }}
          onWalkToExhibit={(id) => {
            setActiveOverlay('none');
            handleTeleportToExhibit(id);
          }}
        />
      )}

      {/* ACTIVITY 1: Individual Exhibit Information Panel Modal */}
      {selectedExhibit && (
        <ExhibitModal
          exhibit={selectedExhibit}
          onClose={() => setSelectedExhibitId(null)}
          onSelectExhibit={(nextId) => handleInspectExhibit(nextId)}
          onOpenLinkedMapSite={(siteId) => {
            setSelectedExhibitId(null);
            setFocusedMapSiteId(siteId);
            setActiveOverlay('art-map');
          }}
        />
      )}

      {/* ACTIVITY 2: Explore India — Art & Culture Map (Leaflet + OpenStreetMap) */}
      {activeOverlay === 'art-map' && (
        <ArtMapSection
          initialSiteId={focusedMapSiteId}
          onBackToMuseum={() => setActiveOverlay('none')}
          onInspectLinkedTimelineExhibit={(exhibitId) => {
            setActiveOverlay('none');
            handleInspectExhibit(exhibitId);
          }}
        />
      )}

      {/* ACTIVITY 3: Regional Painting Fusion Gallery (Warli × Kalamkari · CO2) */}
      {activeOverlay === 'fusion-gallery' && (
        <FusionGallerySection onBackToMuseum={() => setActiveOverlay('none')} />
      )}
    </div>
  );
}
