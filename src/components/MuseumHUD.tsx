import React from 'react';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  Compass,
  Eye,
  Home,
  Info,
  Layers,
  MapPin,
  Pause,
  Play,
  Sparkles,
  X
} from 'lucide-react';
import {
  GUIDED_TOUR_STOPS,
  GuidedTourStop,
  TIMELINE_EXHIBITS,
  TimelineExhibit
} from '../data/exhibitsData';
import { HoveredTarget } from '../scenes/MuseumScene3D';

interface MuseumHUDProps {
  visitorStatus: {
    section: 'entrance' | 'history' | 'map' | 'fusion';
    nearestExhibit: TimelineExhibit | null;
    position: [number, number];
    yaw: number;
  };
  hoveredTarget: HoveredTarget | null;
  onGoHomeEntrance: () => void;
  onTeleportToEntranceHall: () => void;
  onOpenTimelineOverview: () => void;
  onOpenArtMap: () => void;
  onOpenFusionGallery: () => void;
  onOpenAbout: () => void;
  onTeleportToExhibit: (exhibitId: string) => void;
  onInspectExhibit: (exhibitId: string) => void;
  // Guided Tour state & handlers
  isTourActive: boolean;
  tourStopIndex: number;
  isTourPaused: boolean;
  tourProgress: number;
  onStartGuidedTour: () => void;
  onNextTourStop: () => void;
  onPrevTourStop: () => void;
  onTogglePauseTour: () => void;
  onExitGuidedTour: () => void;
  onInspectCurrentTourStop: (stop: GuidedTourStop) => void;
  // On-screen accessible movement controls
  onVirtualMoveChange: (input: { forward: number; right: number; turn: number }) => void;
}

export const MuseumHUD: React.FC<MuseumHUDProps> = ({
  visitorStatus,
  hoveredTarget,
  onGoHomeEntrance,
  onTeleportToEntranceHall,
  onOpenTimelineOverview,
  onOpenArtMap,
  onOpenFusionGallery,
  onOpenAbout,
  onTeleportToExhibit,
  onInspectExhibit,
  isTourActive,
  tourStopIndex,
  isTourPaused,
  tourProgress,
  onStartGuidedTour,
  onNextTourStop,
  onPrevTourStop,
  onTogglePauseTour,
  onExitGuidedTour,
  onInspectCurrentTourStop,
  onVirtualMoveChange
}) => {
  const currentTourStop = GUIDED_TOUR_STOPS[tourStopIndex] || GUIDED_TOUR_STOPS[0];

  const sectionLabelMap: Record<'entrance' | 'history' | 'map' | 'fusion', string> = {
    entrance: 'CENTRAL ENTRANCE PAVILION',
    history: 'HISTORY HALL · TIMELINE (CLA-I · CO1)',
    map: 'WEST WING · ART MAP (CLA-I · CO1)',
    fusion: 'EAST WING · FUSION GALLERY (CLA-I · CO2)'
  };

  // Map visitor world coordinates (x in [-24, 24], z in [-46, 9]) to mini-map SVG (120 x 140)
  const mapX = Math.max(8, Math.min(112, 60 + (visitorStatus.position[0] / 24) * 50));
  const mapY = Math.max(8, Math.min(132, 112 + (visitorStatus.position[1] / 46) * 95));

  return (
    <div className="pointer-events-none fixed inset-x-0 top-14 bottom-0 z-30 flex flex-col justify-between select-none">
      {/* ===================================================================== */}
      {/* CENTER CROSSHAIR & HOVER TARGET PROMPT                                */}
      {/* ===================================================================== */}
      <div className="fixed inset-x-0 top-14 bottom-0 pointer-events-none flex items-center justify-center">
        <div className="relative flex flex-col items-center">
          {/* Visible Crosshair Reticle */}
          <div
            className={`transition-all duration-150 rounded-full flex items-center justify-center ${
              hoveredTarget
                ? 'w-9 h-9 border-2 border-[#E5B869] bg-[#C89D54]/25 scale-110'
                : 'w-5 h-5 border border-white/75 bg-black/25'
            }`}
          >
            <div
              className={`rounded-full ${
                hoveredTarget ? 'w-2 h-2 bg-[#E5B869]' : 'w-1 h-1 bg-white/90'
              }`}
            />
          </div>

          {/* Interactive Tooltip when targeting an exhibit or wing portal */}
          {hoveredTarget && (
            <button
              type="button"
              onClick={() => {
                if (hoveredTarget.type === 'exhibit') onInspectExhibit(hoveredTarget.id);
                else if (hoveredTarget.type === 'map-portal') onOpenArtMap();
                else if (hoveredTarget.type === 'fusion-portal') onOpenFusionGallery();
              }}
              className="pointer-events-auto mt-3 px-4 py-2 rounded-lg bg-[#14100D]/95 border border-[#E5B869] shadow-xl text-center cursor-pointer"
            >
              <p className="text-[10px] uppercase tracking-widest text-[#E5B869] font-semibold">
                Click to Inspect
              </p>
              <p className="font-serif-display text-base font-semibold text-[#F7F4EE] whitespace-nowrap">
                {hoveredTarget.title}
              </p>
              <p className="text-[11px] text-[#D6CEBE] whitespace-nowrap">
                {hoveredTarget.subtitle}
              </p>
            </button>
          )}
        </div>
      </div>

      {/* ===================================================================== */}
      {/* MIDDLE ROW: LEFT NAVIGATION PANEL & RIGHT SECTION / EXHIBIT INFO      */}
      {/* ===================================================================== */}
      <div className="flex-1 flex items-start justify-between px-4 sm:px-6 py-4 gap-4 overflow-hidden">
        {/* LEFT SIDE: Museum Navigation Panel */}
        <aside className="pointer-events-auto hidden md:block w-60 rounded-xl bg-[#14100D]/85 backdrop-blur-md border border-[#C89D54]/35 p-3.5 space-y-3 shadow-xl max-h-[calc(100vh-150px)] overflow-y-auto">
          <div className="text-[11px] uppercase tracking-widest text-[#C89D54] font-semibold border-b border-[#C89D54]/20 pb-2">
            3D Museum Navigation
          </div>

          {/* Section Navigation Buttons */}
          <div className="space-y-1.5">
            <button
              type="button"
              onClick={onGoHomeEntrance}
              className="w-full px-3 py-2 rounded-lg bg-[#1F1914] hover:bg-[#2E251D] border border-white/10 hover:border-[#C89D54]/50 text-xs font-medium text-[#F7F4EE] flex items-center gap-2.5 transition-colors cursor-pointer"
            >
              <Home className="w-3.5 h-3.5 text-[#E5B869] shrink-0" />
              <span>HOME</span>
            </button>

            <button
              type="button"
              onClick={onOpenTimelineOverview}
              className="w-full px-3 py-2 rounded-lg bg-[#1F1914] hover:bg-[#2E251D] border border-white/10 hover:border-[#C89D54]/50 text-xs font-medium text-[#F7F4EE] flex items-center gap-2.5 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E5B869] shrink-0" />
              <span>HISTORY TIMELINE (CO1)</span>
            </button>

            <button
              type="button"
              onClick={onOpenArtMap}
              className="w-full px-3 py-2 rounded-lg bg-[#1F1914] hover:bg-[#2E251D] border border-white/10 hover:border-[#C89D54]/50 text-xs font-medium text-[#F7F4EE] flex items-center gap-2.5 transition-colors cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-[#E5B869] shrink-0" />
              <span>INDIAN ART MAP (CO1)</span>
            </button>

            <button
              type="button"
              onClick={onOpenFusionGallery}
              className="w-full px-3 py-2 rounded-lg bg-[#1F1914] hover:bg-[#2E251D] border border-white/10 hover:border-[#C89D54]/50 text-xs font-medium text-[#F7F4EE] flex items-center gap-2.5 transition-colors cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5 text-[#E5B869] shrink-0" />
              <span>FUSION GALLERY (CO2)</span>
            </button>

            <button
              type="button"
              onClick={onOpenAbout}
              className="w-full px-3 py-2 rounded-lg bg-[#1F1914] hover:bg-[#2E251D] border border-white/10 hover:border-[#C89D54]/50 text-xs font-medium text-[#F7F4EE] flex items-center gap-2.5 transition-colors cursor-pointer"
            >
              <Info className="w-3.5 h-3.5 text-[#E5B869] shrink-0" />
              <span>ABOUT</span>
            </button>

            <button
              type="button"
              onClick={isTourActive ? onExitGuidedTour : onStartGuidedTour}
              className={`w-full px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer ${
                isTourActive
                  ? 'bg-[#C89D54] text-[#14110F]'
                  : 'bg-[#2B2118] hover:bg-[#3A2D21] border border-[#C89D54]/50 text-[#E5B869]'
              }`}
            >
              <Compass className="w-3.5 h-3.5 shrink-0" />
              <span>{isTourActive ? 'STOP GUIDED TOUR' : 'GUIDED TOUR'}</span>
            </button>
          </div>

          {/* Quick 3D Teleport to the 6 History Hall Exhibits */}
          <div className="pt-2 border-t border-[#C89D54]/20 space-y-1.5">
            <div className="text-[10px] uppercase tracking-wider text-[#A89F91] font-semibold">
              6 Timeline Exhibits (CO1)
            </div>
            <div className="space-y-1">
              {TIMELINE_EXHIBITS.map((ex) => {
                const isNearby = visitorStatus.nearestExhibit?.id === ex.id;
                return (
                  <div key={ex.id} className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => onTeleportToExhibit(ex.id)}
                      className={`flex-1 text-left px-2.5 py-1.5 rounded text-[11px] transition-colors cursor-pointer truncate ${
                        isNearby
                          ? 'bg-[#C89D54]/25 border border-[#C89D54] text-[#F7F4EE] font-semibold'
                          : 'bg-[#1A1410] hover:bg-[#282019] text-[#D6CEBE]'
                      }`}
                      title={`Walk to ${ex.eraTitle}`}
                    >
                      {ex.order}. {ex.eraTitle}
                    </button>
                    <button
                      type="button"
                      onClick={() => onInspectExhibit(ex.id)}
                      className="p-1.5 rounded bg-[#241D17] hover:bg-[#C89D54] text-[#E5B869] hover:text-[#14110F] transition-colors cursor-pointer"
                      title={`Open ${ex.exhibitTitle} Information Panel`}
                    >
                      <Eye className="w-3 h-3" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>

        {/* RIGHT SIDE: Current Section, Active Exhibit Info & Floorplan Mini-Map */}
        <aside className="pointer-events-auto hidden sm:flex flex-col w-72 rounded-xl bg-[#14100D]/85 backdrop-blur-md border border-[#C89D54]/35 p-4 space-y-3.5 shadow-xl ml-auto">
          {/* Current Section */}
          <div className="border-b border-[#C89D54]/20 pb-3">
            <div className="text-[10px] uppercase tracking-widest text-[#A89F91]">
              Current Section
            </div>
            <div className="text-xs font-semibold text-[#E5B869] mt-0.5">
              {sectionLabelMap[visitorStatus.section]}
            </div>
          </div>

          {/* Nearest / Active Exhibit Information */}
          {visitorStatus.nearestExhibit ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] text-[#C89D54]">
                <span>Exhibit 0{visitorStatus.nearestExhibit.order} Nearby</span>
                <span className="font-mono">{visitorStatus.nearestExhibit.yearSort}</span>
              </div>
              <h3 className="font-serif-display text-lg font-semibold text-[#F7F4EE] leading-snug">
                {visitorStatus.nearestExhibit.exhibitTitle}
              </h3>
              <p className="text-xs text-[#D6CEBE] line-clamp-3 leading-relaxed">
                {visitorStatus.nearestExhibit.shortSummary}
              </p>
              <button
                type="button"
                onClick={() => onInspectExhibit(visitorStatus.nearestExhibit!.id)}
                className="w-full py-2 px-3 rounded-lg bg-[#C89D54] hover:bg-[#DFB56A] text-[#14110F] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Inspect Exhibit Details</span>
              </button>
            </div>
          ) : (
            <div className="space-y-2 text-xs text-[#D6CEBE]">
              <p className="leading-relaxed">
                Walk north into the <strong className="text-[#F7F4EE]">History Hall</strong>, west
                for the <strong className="text-[#F7F4EE]">Art Map</strong>, or east for the{' '}
                <strong className="text-[#F7F4EE]">Fusion Gallery</strong>.
              </p>
            </div>
          )}

          {/* Mini-Map Architectural Floorplan */}
          <div className="pt-2 border-t border-[#C89D54]/20">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-[#A89F91] mb-2">
              <span>3D Floorplan Radar</span>
              <span className="font-mono text-[#D6CEBE]">Click Wing to Jump</span>
            </div>
            <div className="relative rounded-lg bg-[#0E0B09] border border-[#C89D54]/30 p-2 flex justify-center">
              <svg width="120" height="140" viewBox="0 0 120 140" className="overflow-visible">
                {/* History Hall (North Wing) */}
                <rect
                  x="42"
                  y="8"
                  width="36"
                  height="86"
                  fill="rgba(200, 157, 84, 0.12)"
                  stroke="#C89D54"
                  strokeWidth="1.2"
                  className="cursor-pointer hover:fill-[#C89D54]/30"
                  onClick={() => onTeleportToExhibit('indus-valley')}
                />
                {/* West Map Wing */}
                <rect
                  x="8"
                  y="94"
                  width="34"
                  height="24"
                  fill="rgba(200, 157, 84, 0.12)"
                  stroke="#C89D54"
                  strokeWidth="1.2"
                  className="cursor-pointer hover:fill-[#C89D54]/30"
                  onClick={onOpenArtMap}
                />
                {/* East Fusion Wing */}
                <rect
                  x="78"
                  y="94"
                  width="34"
                  height="24"
                  fill="rgba(200, 157, 84, 0.12)"
                  stroke="#C89D54"
                  strokeWidth="1.2"
                  className="cursor-pointer hover:fill-[#C89D54]/30"
                  onClick={onOpenFusionGallery}
                />
                {/* Entrance Hall */}
                <rect
                  x="42"
                  y="94"
                  width="36"
                  height="36"
                  fill="rgba(200, 157, 84, 0.18)"
                  stroke="#C89D54"
                  strokeWidth="1.2"
                  className="cursor-pointer hover:fill-[#C89D54]/30"
                  onClick={onTeleportToEntranceHall}
                />

                {/* 6 Exhibit Dots in History Hall */}
                <circle cx="45" cy="80" r="2.2" fill="#E5B869" />
                <circle cx="75" cy="68" r="2.2" fill="#E5B869" />
                <circle cx="45" cy="56" r="2.2" fill="#E5B869" />
                <circle cx="75" cy="44" r="2.2" fill="#E5B869" />
                <circle cx="45" cy="30" r="2.2" fill="#E5B869" />
                <circle cx="75" cy="18" r="2.2" fill="#E5B869" />

                {/* Labels */}
                <text x="60" y="52" textAnchor="middle" fill="#D6CEBE" fontSize="6.5">
                  HISTORY
                </text>
                <text x="25" y="108" textAnchor="middle" fill="#D6CEBE" fontSize="6.5">
                  MAP
                </text>
                <text x="95" y="108" textAnchor="middle" fill="#D6CEBE" fontSize="6.5">
                  FUSION
                </text>

                {/* Live Visitor Position & Orientation Dot */}
                <g transform={`translate(${mapX}, ${mapY})`}>
                  <circle cx="0" cy="0" r="4" fill="#FAF6EE" stroke="#14110F" strokeWidth="1" />
                </g>
              </svg>
            </div>
          </div>
        </aside>
      </div>

      {/* ===================================================================== */}
      {/* GUIDED TOUR ACTIVE BANNER (STOPS 1 TO 8)                              */}
      {/* ===================================================================== */}
      {isTourActive && (
        <div className="pointer-events-auto mx-auto mb-3 w-[94%] max-w-3xl rounded-xl bg-[#16110D]/95 backdrop-blur-md border-2 border-[#C89D54] p-4 shadow-2xl">
          {/* Progress Bar */}
          <div className="w-full h-1 bg-[#2B2119] rounded-full overflow-hidden mb-3">
            <div
              className="h-full bg-[#E5B869] transition-all duration-200"
              style={{ width: `${tourProgress}%` }}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#E5B869] font-semibold">
              <Compass className="w-4 h-4" />
              <span>Guided Tour · Stop 0{currentTourStop.stopNumber} of 08</span>
            </div>

            {/* 8 Stop Indicators */}
            <div className="flex items-center gap-1">
              {GUIDED_TOUR_STOPS.map((st, idx) => (
                <span
                  key={st.id}
                  className={`w-5 h-5 rounded text-[10px] font-mono flex items-center justify-center ${
                    idx === tourStopIndex
                      ? 'bg-[#C89D54] text-[#14110F] font-bold'
                      : 'bg-[#261E17] text-[#A89F91]'
                  }`}
                >
                  {st.stopNumber}
                </span>
              ))}
            </div>
          </div>

          <h3 className="font-serif-display text-xl sm:text-2xl font-semibold text-[#F7F4EE]">
            {currentTourStop.title} —{' '}
            <span className="text-[#E5B869] italic font-normal">{currentTourStop.subtitle}</span>
          </h3>
          <p className="text-xs sm:text-sm text-[#EAE2D3] leading-relaxed mt-1.5 mb-3">
            {currentTourStop.narration}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#C89D54]/25">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onPrevTourStop}
                className="px-3 py-1.5 rounded-lg bg-[#251E18] hover:bg-[#332920] border border-[#C89D54]/40 text-xs font-medium text-[#F7F4EE] flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5 text-[#E5B869]" />
                <span>Previous</span>
              </button>

              <button
                type="button"
                onClick={onTogglePauseTour}
                className="px-3 py-1.5 rounded-lg bg-[#251E18] hover:bg-[#332920] border border-[#C89D54]/40 text-xs font-medium text-[#E5B869] flex items-center gap-1.5 cursor-pointer"
              >
                {isTourPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                <span>{isTourPaused ? 'Resume Auto-Tour' : 'Pause'}</span>
              </button>

              <button
                type="button"
                onClick={onNextTourStop}
                className="px-3.5 py-1.5 rounded-lg bg-[#C89D54] hover:bg-[#DFB56A] text-[#14110F] text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span>Next Stop</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onInspectCurrentTourStop(currentTourStop)}
                className="px-3 py-1.5 rounded-lg bg-[#2B221A] hover:bg-[#3B2E24] border border-[#C89D54]/50 text-xs font-semibold text-[#F7F4EE] flex items-center gap-1.5 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-[#E5B869]" />
                <span>Open Stop Details</span>
              </button>

              <button
                type="button"
                onClick={onExitGuidedTour}
                className="px-3 py-1.5 rounded-lg bg-[#3A1D1A] hover:bg-[#522723] border border-red-400/40 text-xs font-semibold text-[#F7F4EE] flex items-center gap-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>Exit Tour</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* BOTTOM BAR: CONTROLS LEGEND & ON-SCREEN ACCESSIBLE WALK PAD           */}
      {/* ===================================================================== */}
      <footer className="pointer-events-auto w-full px-4 sm:px-6 py-2.5 bg-[#14100D]/90 backdrop-blur-md border-t border-[#C89D54]/30 flex flex-wrap items-center justify-between gap-3 text-xs text-[#D6CEBE]">
        {/* Required Controls Legend */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-5">
          <div className="flex items-center gap-1.5">
            <span className="px-1.5 py-0.5 rounded bg-[#261E18] border border-[#C89D54]/40 font-mono text-[11px] text-[#E5B869]">
              W A S D / Arrows
            </span>
            <span>— Move</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="px-1.5 py-0.5 rounded bg-[#261E18] border border-[#C89D54]/40 font-mono text-[11px] text-[#E5B869]">
              Mouse
            </span>
            <span>— Look</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="px-1.5 py-0.5 rounded bg-[#261E18] border border-[#C89D54]/40 font-mono text-[11px] text-[#E5B869]">
              Click
            </span>
            <span>— Inspect</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="px-1.5 py-0.5 rounded bg-[#261E18] border border-[#C89D54]/40 font-mono text-[11px] text-[#E5B869]">
              ESC
            </span>
            <span>— Close</span>
          </div>
        </div>

        {/* Accessible On-Screen Step/Turn Buttons for Touch or Mouse-Only Users */}
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-[#A89F91] hidden md:inline mr-1">On-Screen Walk:</span>
          <button
            type="button"
            onMouseDown={() => onVirtualMoveChange({ forward: 0, right: 0, turn: 1 })}
            onMouseUp={() => onVirtualMoveChange({ forward: 0, right: 0, turn: 0 })}
            onMouseLeave={() => onVirtualMoveChange({ forward: 0, right: 0, turn: 0 })}
            onTouchStart={() => onVirtualMoveChange({ forward: 0, right: 0, turn: 1 })}
            onTouchEnd={() => onVirtualMoveChange({ forward: 0, right: 0, turn: 0 })}
            className="p-1.5 rounded bg-[#241D17] hover:bg-[#342A21] border border-[#C89D54]/40 text-[#F7F4EE] cursor-pointer"
            title="Turn Left"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onMouseDown={() => onVirtualMoveChange({ forward: 1, right: 0, turn: 0 })}
            onMouseUp={() => onVirtualMoveChange({ forward: 0, right: 0, turn: 0 })}
            onMouseLeave={() => onVirtualMoveChange({ forward: 0, right: 0, turn: 0 })}
            onTouchStart={() => onVirtualMoveChange({ forward: 1, right: 0, turn: 0 })}
            onTouchEnd={() => onVirtualMoveChange({ forward: 0, right: 0, turn: 0 })}
            className="p-1.5 rounded bg-[#241D17] hover:bg-[#342A21] border border-[#C89D54]/40 text-[#F7F4EE] cursor-pointer"
            title="Walk Forward"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onMouseDown={() => onVirtualMoveChange({ forward: -1, right: 0, turn: 0 })}
            onMouseUp={() => onVirtualMoveChange({ forward: 0, right: 0, turn: 0 })}
            onMouseLeave={() => onVirtualMoveChange({ forward: 0, right: 0, turn: 0 })}
            onTouchStart={() => onVirtualMoveChange({ forward: -1, right: 0, turn: 0 })}
            onTouchEnd={() => onVirtualMoveChange({ forward: 0, right: 0, turn: 0 })}
            className="p-1.5 rounded bg-[#241D17] hover:bg-[#342A21] border border-[#C89D54]/40 text-[#F7F4EE] cursor-pointer"
            title="Walk Backward"
          >
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onMouseDown={() => onVirtualMoveChange({ forward: 0, right: 0, turn: -1 })}
            onMouseUp={() => onVirtualMoveChange({ forward: 0, right: 0, turn: 0 })}
            onMouseLeave={() => onVirtualMoveChange({ forward: 0, right: 0, turn: 0 })}
            onTouchStart={() => onVirtualMoveChange({ forward: 0, right: 0, turn: -1 })}
            onTouchEnd={() => onVirtualMoveChange({ forward: 0, right: 0, turn: 0 })}
            className="p-1.5 rounded bg-[#241D17] hover:bg-[#342A21] border border-[#C89D54]/40 text-[#F7F4EE] cursor-pointer"
            title="Turn Right"
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </footer>
    </div>
  );
};
