import React, { useEffect, useMemo, useRef, useState } from 'react';
import L from 'leaflet';
import {
  ArrowLeft,
  Compass,
  Eye,
  MapPin,
  Minus,
  Plus,
  RotateCcw,
  Search,
  Sparkles,
  X
} from 'lucide-react';
import { MAP_ART_LOCATIONS, MapArtLocation } from '../data/exhibitsData';

interface ArtMapSectionProps {
  initialSiteId?: string | null;
  onBackToMuseum: () => void;
  onInspectLinkedTimelineExhibit: (exhibitId: string) => void;
}

const INDIA_CENTER: [number, number] = [21.2, 79.2];
const INDIA_DEFAULT_ZOOM = 5;

export const ArtMapSection: React.FC<ArtMapSectionProps> = ({
  initialSiteId,
  onBackToMuseum,
  onInspectLinkedTimelineExhibit
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Record<string, L.Marker>>({});

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedZone, setSelectedZone] = useState<string>('All');
  const [activeSite, setActiveSite] = useState<MapArtLocation | null>(
    () => MAP_ART_LOCATIONS.find((loc) => loc.id === initialSiteId) || MAP_ART_LOCATIONS[0]
  );
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState<boolean>(Boolean(initialSiteId));

  const zones = [
    'All',
    'Western India',
    'Southern India',
    'Central India',
    'Eastern India',
    'Northern India'
  ];

  const filteredLocations = useMemo(() => {
    return MAP_ART_LOCATIONS.filter((loc) => {
      const matchesZone = selectedZone === 'All' || loc.zone === selectedZone;
      const q = searchQuery.trim().toLowerCase();
      if (!q) return matchesZone;
      return (
        matchesZone &&
        (loc.name.toLowerCase().includes(q) ||
          loc.stateRegion.toLowerCase().includes(q) ||
          loc.artTradition.toLowerCase().includes(q) ||
          loc.shortDescription.toLowerCase().includes(q))
      );
    });
  }, [searchQuery, selectedZone]);

  // Initialize Leaflet Map with OpenStreetMap tiles
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: INDIA_CENTER,
      zoom: INDIA_DEFAULT_ZOOM,
      minZoom: 4,
      maxZoom: 14,
      zoomControl: true
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18
    }).addTo(map);

    mapInstanceRef.current = map;

    // Create markers for all 8 required locations
    MAP_ART_LOCATIONS.forEach((loc) => {
      const customIcon = L.divIcon({
        className: 'bkm-custom-marker',
        html: `
          <div style="
            position: relative;
            width: 34px;
            height: 34px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #1C1510;
            border: 2px solid #E5B869;
            border-radius: 9999px;
            color: #F7F4EE;
            font-weight: 700;
            font-size: 12px;
            font-family: 'Plus Jakarta Sans', sans-serif;
            box-shadow: 0 6px 16px rgba(0,0,0,0.65);
            cursor: pointer;
          ">
            <span>${loc.order}</span>
          </div>
        `,
        iconSize: [34, 34],
        iconAnchor: [17, 17],
        popupAnchor: [0, -18]
      });

      const popupHtml = `
        <div style="min-width: 245px; max-width: 280px; color: #F7F4EE;">
          <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em; color: #E5B869; font-weight: 600; margin-bottom: 2px;">
            0${loc.order} · ${loc.stateRegion}
          </div>
          <div style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 21px; font-weight: 700; color: #F7F4EE; margin-bottom: 4px;">
            ${loc.name}
          </div>
          <div style="font-size: 12px; font-weight: 600; color: #C89D54; margin-bottom: 6px;">
            ${loc.artTradition}
          </div>
          <p style="font-size: 12px; color: #D6CEBE; line-height: 1.45; margin: 0 0 10px 0;">
            ${loc.shortDescription}
          </p>
          <button
            type="button"
            data-view-details="${loc.id}"
            style="
              width: 100%;
              padding: 7px 12px;
              border-radius: 6px;
              background: #C89D54;
              color: #14110F;
              font-weight: 700;
              font-size: 12px;
              border: none;
              cursor: pointer;
              text-align: center;
            "
          >
            View Details →
          </button>
        </div>
      `;

      const marker = L.marker(loc.coordinates, { icon: customIcon })
        .addTo(map)
        .bindPopup(popupHtml, { maxWidth: 300 });

      marker.on('click', () => {
        setActiveSite(loc);
      });

      markersRef.current[loc.id] = marker;
    });

    // Listen for clicks on the "View Details" button inside Leaflet popups
    const handlePopupClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const btn = target?.closest('[data-view-details]') as HTMLElement | null;
      if (btn) {
        const siteId = btn.getAttribute('data-view-details');
        const found = MAP_ART_LOCATIONS.find((item) => item.id === siteId);
        if (found) {
          setActiveSite(found);
          setIsDetailsModalOpen(true);
        }
      }
    };

    const containerEl = mapContainerRef.current;
    containerEl.addEventListener('click', handlePopupClick);

    // Ensure proper Leaflet sizing after mount
    setTimeout(() => {
      map.invalidateSize();
    }, 120);

    return () => {
      containerEl.removeEventListener('click', handlePopupClick);
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update visible markers when search/filter changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const visibleIds = new Set(filteredLocations.map((l) => l.id));
    MAP_ART_LOCATIONS.forEach((loc) => {
      const marker = markersRef.current[loc.id];
      if (!marker) return;
      if (visibleIds.has(loc.id)) {
        if (!map.hasLayer(marker)) marker.addTo(map);
      } else {
        if (map.hasLayer(marker)) marker.remove();
      }
    });
  }, [filteredLocations]);

  // Focus initialSiteId if passed
  useEffect(() => {
    if (!initialSiteId || !mapInstanceRef.current) return;
    const found = MAP_ART_LOCATIONS.find((loc) => loc.id === initialSiteId);
    if (found) {
      setActiveSite(found);
      mapInstanceRef.current.flyTo(found.coordinates, 7, { duration: 1.1 });
      markersRef.current[found.id]?.openPopup();
    }
  }, [initialSiteId]);

  const handleFocusLocation = (loc: MapArtLocation, openFullDetails = false) => {
    setActiveSite(loc);
    if (openFullDetails) {
      setIsDetailsModalOpen(true);
    }
    const map = mapInstanceRef.current;
    if (map) {
      map.flyTo(loc.coordinates, 7, { duration: 0.9 });
      markersRef.current[loc.id]?.openPopup();
    }
  };

  const handleResetMap = () => {
    setSearchQuery('');
    setSelectedZone('All');
    setIsDetailsModalOpen(false);
    const map = mapInstanceRef.current;
    if (map) {
      map.closePopup();
      map.flyTo(INDIA_CENTER, INDIA_DEFAULT_ZOOM, { duration: 0.9 });
    }
  };

  const handleZoomIn = () => {
    mapInstanceRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapInstanceRef.current?.zoomOut();
  };

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-[#14110F] text-[#F7F4EE] overflow-hidden">
      {/* Top Section Header Bar */}
      <header className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 bg-[#191410] border-b border-[#C89D54]/35">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onBackToMuseum}
            className="px-3.5 py-2 rounded-lg bg-[#261E18] hover:bg-[#352A21] border border-[#C89D54]/45 text-xs font-semibold text-[#F7F4EE] flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap"
          >
            <ArrowLeft className="w-4 h-4 text-[#E5B869]" />
            <span>Back to Museum</span>
          </button>

          <div>
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-[#C89D54]">
              <span>Activity 2 · Course Outcome 1 (CO1)</span>
              <span aria-hidden="true">·</span>
              <span>8 Heritage Centers</span>
            </div>
            <h1 className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#F7F4EE]">
              EXPLORE INDIA — ART &amp; CULTURE MAP
            </h1>
          </div>
        </div>

        {/* Map Controls: Zoom In, Zoom Out, Reset Map */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center rounded-lg bg-[#241D17] border border-[#C89D54]/35 p-0.5">
            <button
              type="button"
              onClick={handleZoomIn}
              className="px-2.5 py-1.5 rounded hover:bg-[#342A21] text-xs font-medium text-[#F7F4EE] flex items-center gap-1 transition-colors cursor-pointer"
              title="Zoom In"
            >
              <Plus className="w-3.5 h-3.5 text-[#E5B869]" />
              <span className="hidden sm:inline">Zoom In</span>
            </button>
            <div className="w-px h-4 bg-[#C89D54]/25" />
            <button
              type="button"
              onClick={handleZoomOut}
              className="px-2.5 py-1.5 rounded hover:bg-[#342A21] text-xs font-medium text-[#F7F4EE] flex items-center gap-1 transition-colors cursor-pointer"
              title="Zoom Out"
            >
              <Minus className="w-3.5 h-3.5 text-[#E5B869]" />
              <span className="hidden sm:inline">Zoom Out</span>
            </button>
          </div>

          <button
            type="button"
            onClick={handleResetMap}
            className="px-3.5 py-2 rounded-lg bg-[#C89D54] hover:bg-[#DFB56A] text-[#14110F] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Map</span>
          </button>
        </div>
      </header>

      {/* Main Content Split: Left Search/Filter Directory & Active Dossier + Right Leaflet Map */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Left Sidebar (5 cols on lg): Search, Filter & 8 Locations Directory */}
        <aside className="lg:col-span-5 flex flex-col bg-[#18130F] border-r border-[#C89D54]/25 overflow-hidden">
          {/* Search & Regional Filter Bar */}
          <div className="p-4 space-y-3 border-b border-[#C89D54]/20 bg-[#14100D]">
            <div className="relative">
              <Search className="w-4 h-4 text-[#A89F91] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Ajanta, Ellora, Thanjavur, Khajuraho, Madhubani, Warli, Puri, Jaipur..."
                className="w-full pl-10 pr-8 py-2 rounded-lg bg-[#1F1914] border border-[#C89D54]/35 text-xs text-[#F7F4EE] placeholder-[#8C8275] focus:outline-none focus:border-[#E5B869]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#A89F91] hover:text-[#F7F4EE]"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Zone Filter Segmented Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {zones.map((zone) => {
                const active = selectedZone === zone;
                return (
                  <button
                    key={zone}
                    type="button"
                    onClick={() => setSelectedZone(zone)}
                    className={`px-2.5 py-1 rounded text-[11px] font-medium whitespace-nowrap transition-colors cursor-pointer ${
                      active
                        ? 'bg-[#C89D54] text-[#14110F] font-semibold'
                        : 'bg-[#231C16] text-[#D6CEBE] hover:bg-[#30261E]'
                    }`}
                  >
                    {zone}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Scrollable List of the 8 Art Locations */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
            {filteredLocations.length === 0 ? (
              <div className="p-6 text-center rounded-lg bg-[#14100D] border border-[#C89D54]/20 space-y-2">
                <p className="text-sm text-[#D6CEBE]">No art centers match your filter.</p>
                <button
                  type="button"
                  onClick={handleResetMap}
                  className="px-3 py-1.5 rounded bg-[#C89D54] text-[#14110F] text-xs font-semibold cursor-pointer"
                >
                  Reset Filter
                </button>
              </div>
            ) : (
              filteredLocations.map((loc) => {
                const isSelected = activeSite?.id === loc.id;
                return (
                  <div
                    key={loc.id}
                    onClick={() => handleFocusLocation(loc, false)}
                    className={`p-3.5 rounded-lg border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#251D17] border-[#C89D54] shadow-md'
                        : 'bg-[#14100D] border-[#C89D54]/20 hover:border-[#C89D54]/50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2 text-[11px] text-[#C89D54] font-medium">
                          <span className="font-mono">0{loc.order}</span>
                          <span aria-hidden="true">·</span>
                          <span>{loc.stateRegion}</span>
                        </div>
                        <h2 className="font-serif-display text-xl font-semibold text-[#F7F4EE]">
                          {loc.name}
                        </h2>
                      </div>
                      <span className="font-mono tabular-nums text-[11px] text-[#A89F91]">
                        {loc.coordinates[0].toFixed(2)}°N, {loc.coordinates[1].toFixed(2)}°E
                      </span>
                    </div>

                    <p className="text-xs font-medium text-[#E5B869] mt-1">{loc.artTradition}</p>
                    <p className="text-xs text-[#D6CEBE] mt-1.5 leading-relaxed">
                      {loc.shortDescription}
                    </p>

                    <div className="mt-3 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFocusLocation(loc, false);
                        }}
                        className="px-2.5 py-1.5 rounded bg-[#2D231B] hover:bg-[#3B2E24] text-[#F7F4EE] border border-[#C89D54]/35 text-[11px] font-medium flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <MapPin className="w-3 h-3 text-[#E5B869]" />
                        <span>Locate on Map</span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFocusLocation(loc, true);
                        }}
                        className="px-3 py-1.5 rounded bg-[#C89D54] hover:bg-[#DFB56A] text-[#14110F] text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Eye className="w-3 h-3" />
                        <span>View Details</span>
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </aside>

        {/* Right Area (7 cols on lg): Live Leaflet OpenStreetMap Viewport + Floating Selected Preview */}
        <div className="lg:col-span-7 relative w-full h-full min-h-[380px] bg-[#191613]">
          <div ref={mapContainerRef} className="w-full h-full z-10" />

          {/* Bottom Floating Quick Bar for Currently Focused Location */}
          {activeSite && (
            <div className="absolute bottom-4 left-4 right-4 z-20 p-4 rounded-xl bg-[#18130F]/95 backdrop-blur-md border border-[#C89D54]/50 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-[#C89D54]">
                  <Compass className="w-3.5 h-3.5" />
                  <span>
                    Selected Marker 0{activeSite.order}: {activeSite.name} · {activeSite.stateRegion}
                  </span>
                </div>
                <h3 className="font-serif-display text-xl font-semibold text-[#F7F4EE]">
                  {activeSite.artTradition}
                </h3>
                <p className="text-xs text-[#D6CEBE] line-clamp-1 mt-0.5">
                  {activeSite.shortDescription}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsDetailsModalOpen(true)}
                  className="px-4 py-2 rounded-lg bg-[#C89D54] hover:bg-[#DFB56A] text-[#14110F] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Details</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Detailed Curatorial Dossier Modal when "View Details" is clicked */}
      {isDetailsModalOpen && activeSite && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`Details for ${activeSite.name}`}
        >
          <div className="w-full max-w-3xl max-h-[88vh] flex flex-col rounded-xl bg-[#1B1612] border border-[#C89D54]/60 shadow-2xl overflow-hidden text-[#F7F4EE]">
            <div className="flex items-center justify-between px-6 py-4 bg-[#130F0C] border-b border-[#C89D54]/30">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C89D54]">
                <span>Heritage Site Dossier · 0{activeSite.order} of 08</span>
                <span aria-hidden="true">·</span>
                <span>{activeSite.zone}</span>
              </div>
              <button
                type="button"
                onClick={() => setIsDetailsModalOpen(false)}
                className="px-3 py-1.5 rounded bg-[#282019] hover:bg-[#382D24] text-xs font-medium text-[#F7F4EE] border border-[#C89D54]/35 flex items-center gap-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5 text-[#E5B869]" />
                <span>Close</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              <div>
                <h2 className="font-serif-display text-3xl sm:text-4xl font-semibold text-[#F7F4EE]">
                  {activeSite.name}
                </h2>
                <p className="text-sm text-[#E5B869] font-medium mt-1">
                  {activeSite.stateRegion} ·{' '}
                  <span className="font-mono text-xs text-[#D6CEBE]">
                    {activeSite.coordinates[0].toFixed(4)}° N, {activeSite.coordinates[1].toFixed(4)}° E
                  </span>
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[#14100D] border border-[#C89D54]/30 space-y-1">
                <div className="text-[11px] uppercase tracking-wider text-[#C89D54] font-semibold">
                  Primary Art &amp; Architectural Tradition
                </div>
                <div className="text-base font-semibold text-[#F7F4EE]">
                  {activeSite.artTradition}
                </div>
                <div className="text-xs text-[#A89F91]">Historical Span: {activeSite.period}</div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xs uppercase tracking-widest text-[#C89D54] font-semibold">
                  Historical &amp; Cultural Overview
                </h3>
                <p className="text-sm text-[#EAE2D3] leading-relaxed">
                  {activeSite.detailedHistory}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-[#14100D] border border-[#C89D54]/25 space-y-2">
                  <h4 className="text-xs uppercase tracking-widest text-[#E5B869] font-semibold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Artistic &amp; Material Techniques</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-[#D6CEBE] list-disc list-inside leading-relaxed">
                    {activeSite.keyTechniques.map((tech, i) => (
                      <li key={i}>{tech}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-[#14100D] border border-[#C89D54]/25 space-y-2">
                  <h4 className="text-xs uppercase tracking-widest text-[#E5B869] font-semibold">
                    Representative Monuments &amp; Works
                  </h4>
                  <ul className="space-y-1.5 text-xs text-[#D6CEBE] list-disc list-inside leading-relaxed">
                    {activeSite.notableWorks.map((work, i) => (
                      <li key={i}>{work}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-[#241C15] border border-[#C89D54]/40 space-y-1">
                <h4 className="text-xs uppercase tracking-widest text-[#E5B869] font-semibold">
                  Cultural Significance
                </h4>
                <p className="text-sm text-[#F7F4EE] leading-relaxed">
                  {activeSite.culturalSignificance}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-[#130F0C] border-t border-[#C89D54]/30">
              {activeSite.linkedTimelineId ? (
                <button
                  type="button"
                  onClick={() => {
                    setIsDetailsModalOpen(false);
                    onInspectLinkedTimelineExhibit(activeSite.linkedTimelineId!);
                  }}
                  className="px-4 py-2 rounded-lg bg-[#C89D54] hover:bg-[#DFB56A] text-[#14110F] text-xs font-semibold transition-colors cursor-pointer"
                >
                  Open Corresponding History Hall Exhibit →
                </button>
              ) : (
                <span className="text-xs text-[#A89F91]">
                  Click any other marker on the map to compare regional traditions.
                </span>
              )}

              <button
                type="button"
                onClick={() => setIsDetailsModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-[#282019] hover:bg-[#382D24] text-xs font-medium text-[#F7F4EE] border border-[#C89D54]/35 cursor-pointer"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
