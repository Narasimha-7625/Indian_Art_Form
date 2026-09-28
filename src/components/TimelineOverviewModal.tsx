import React from 'react';
import { ArrowRight, Eye, Navigation, X } from 'lucide-react';
import { TIMELINE_EXHIBITS } from '../data/exhibitsData';
import { getExhibitDataUrl } from '../exhibits/proceduralArtTextures';

interface TimelineOverviewModalProps {
  onClose: () => void;
  onInspectExhibit: (exhibitId: string) => void;
  onWalkToExhibit: (exhibitId: string) => void;
}

const SHORT_NAMES: Record<string, string> = {
  'indus-valley': 'Indus Valley',
  ajanta: 'Ajanta',
  'chola-period': 'Chola',
  'mughal-art': 'Mughal',
  'madhubani-art': 'Madhubani',
  'warli-art': 'Warli'
};

export const TimelineOverviewModal: React.FC<TimelineOverviewModalProps> = ({
  onClose,
  onInspectExhibit,
  onWalkToExhibit
}) => {
  return (
    <div
      className="flex-1 overflow-y-auto bg-[#14110F] text-[#F7F4EE]"
      role="region"
      aria-label="Interactive Indian Art Timeline (CLA-I · CO1)"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-xl bg-[#191410] border border-[#C89D54]/40">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest text-[#C89D54] font-semibold mb-1">
              <span>CLA-I</span>
              <span aria-hidden="true">·</span>
              <span>CO1</span>
              <span aria-hidden="true">·</span>
              <span>Activity 1 — Interactive Indian Art Timeline</span>
            </div>
            <h1 className="font-serif-display text-3xl sm:text-4xl font-semibold text-[#F7F4EE]">
              INTERACTIVE INDIAN ART TIMELINE
            </h1>
            <p className="text-xs sm:text-sm text-[#D6CEBE] mt-1">
              Click any of the six chronological art traditions below to inspect its artwork,
              historical period, region, context, significance, and important characteristics.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-lg bg-[#261E18] hover:bg-[#352A22] border border-[#C89D54]/45 text-xs font-semibold text-[#F7F4EE] flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap"
            >
              <Navigation className="w-3.5 h-3.5 text-[#E5B869]" />
              <span>Walk in 3D History Hall</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2.5 rounded-lg bg-[#261E18] hover:bg-[#352A22] border border-[#C89D54]/30 text-[#D6CEBE] hover:text-[#F7F4EE] transition-colors cursor-pointer"
              aria-label="Return to 3D Hall"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Visual Timeline Progression Bar: Indus Valley → Ajanta → Chola → Mughal → Madhubani → Warli */}
        <div className="p-4 sm:p-5 rounded-xl bg-[#18130F] border border-[#C89D54]/35">
          <div className="flex items-center justify-between text-xs text-[#C89D54] uppercase tracking-widest font-semibold mb-3">
            <span>Chronological Visual Progression</span>
            <span className="font-mono text-[11px] text-[#D6CEBE]">
              Indus Valley → Ajanta → Chola → Mughal → Madhubani → Warli
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {TIMELINE_EXHIBITS.map((ex, idx) => (
              <button
                key={ex.id}
                type="button"
                onClick={() => onInspectExhibit(ex.id)}
                className="group relative p-3 rounded-lg bg-[#120E0B] hover:bg-[#241C16] border border-[#C89D54]/30 hover:border-[#C89D54] text-left transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span className="w-5 h-5 rounded-full bg-[#C89D54] text-[#14110F] font-mono text-[11px] font-bold flex items-center justify-center">
                    {ex.order}
                  </span>
                  <span className="text-[10px] font-mono text-[#E5B869]">{ex.yearSort}</span>
                </div>
                <div className="font-serif-display text-base font-semibold text-[#F7F4EE] group-hover:text-[#E5B869] transition-colors">
                  {SHORT_NAMES[ex.id] || ex.eraTitle}
                </div>
                <div className="text-[11px] text-[#A89F91] truncate mt-0.5">
                  {ex.exhibitTitle}
                </div>
                {idx < TIMELINE_EXHIBITS.length - 1 && (
                  <span className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 text-[#C89D54] font-bold z-10">
                    →
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 6 Chronological Exhibit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TIMELINE_EXHIBITS.map((exhibit) => {
            const imgUrl = getExhibitDataUrl(exhibit.id);
            return (
              <article
                key={exhibit.id}
                className="flex flex-col justify-between rounded-xl bg-[#18130F] border border-[#C89D54]/35 hover:border-[#C89D54] transition-all overflow-hidden group shadow-lg"
              >
                <div>
                  {/* Artwork Thumbnail */}
                  <div
                    onClick={() => onInspectExhibit(exhibit.id)}
                    className="relative h-48 w-full bg-[#0E0B09] overflow-hidden cursor-pointer border-b border-[#C89D54]/25"
                  >
                    <img
                      src={imgUrl}
                      alt={exhibit.exhibitTitle}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex items-end justify-between p-3.5">
                      <span className="text-xs font-mono text-[#E5B869] font-semibold">
                        0{exhibit.order} · {exhibit.yearSort}
                      </span>
                      <span className="text-xs text-[#F7F4EE] flex items-center gap-1 bg-black/70 px-2.5 py-1 rounded border border-[#C89D54]/40">
                        <Eye className="w-3.5 h-3.5 text-[#E5B869]" /> Click to Inspect
                      </span>
                    </div>
                  </div>

                  {/* Card Text */}
                  <div className="p-5 space-y-2">
                    <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-[#C89D54] font-semibold">
                      <span>{exhibit.eraTitle}</span>
                      <span>CLA-I · CO1</span>
                    </div>
                    <h2 className="font-serif-display text-2xl font-semibold text-[#F7F4EE]">
                      {exhibit.exhibitTitle}
                    </h2>
                    <p className="text-xs text-[#E5B869] font-medium">
                      {exhibit.period} · {exhibit.region}
                    </p>
                    <p className="text-xs text-[#D6CEBE] leading-relaxed line-clamp-3">
                      {exhibit.shortSummary}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="px-5 pb-5 pt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onInspectExhibit(exhibit.id)}
                    className="flex-1 py-2.5 px-3.5 rounded-lg bg-[#C89D54] hover:bg-[#DEB469] text-[#14110F] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Open Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onWalkToExhibit(exhibit.id)}
                    className="py-2.5 px-3 rounded-lg bg-[#241D17] hover:bg-[#332920] text-[#D6CEBE] hover:text-[#F7F4EE] border border-[#C89D54]/35 text-xs font-medium transition-colors cursor-pointer"
                    title="View in 3D History Hall"
                  >
                    View in 3D
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
};
