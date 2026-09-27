import React from 'react';
import { ArrowRight, Eye, Navigation, X } from 'lucide-react';
import { TIMELINE_EXHIBITS } from '../data/exhibitsData';
import { getExhibitDataUrl } from '../exhibits/proceduralArtTextures';

interface TimelineOverviewModalProps {
  onClose: () => void;
  onInspectExhibit: (exhibitId: string) => void;
  onWalkToExhibit: (exhibitId: string) => void;
}

export const TimelineOverviewModal: React.FC<TimelineOverviewModalProps> = ({
  onClose,
  onInspectExhibit,
  onWalkToExhibit
}) => {
  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label="Interactive Indian Art Timeline (CO1)"
    >
      <div className="relative w-full max-w-6xl max-h-[90vh] flex flex-col rounded-xl bg-[#191410] border border-[#C89D54]/50 shadow-2xl overflow-hidden text-[#F7F4EE]">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-5 bg-[#130F0C] border-b border-[#C89D54]/30">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C89D54] mb-1">
              <span>Activity 1 · Course Outcome 1 (CO1)</span>
              <span aria-hidden="true">·</span>
              <span>History Hall</span>
            </div>
            <h2 className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#F7F4EE]">
              Interactive Indian Art Chronological Timeline
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-[#261E18] hover:bg-[#352A22] border border-[#C89D54]/40 text-xs font-medium text-[#F7F4EE] flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Navigation className="w-3.5 h-3.5 text-[#E5B869]" />
              <span>Explore in 3D History Hall</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg bg-[#261E18] hover:bg-[#352A22] border border-[#C89D54]/30 text-[#D6CEBE] hover:text-[#F7F4EE] transition-colors cursor-pointer"
              aria-label="Close Timeline Overview"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Chronological Horizontal Step Rail */}
        <div className="px-6 py-3 bg-[#16120E] border-b border-[#C89D54]/20 overflow-x-auto">
          <div className="flex items-center justify-between min-w-[680px] gap-2">
            {TIMELINE_EXHIBITS.map((ex, idx) => (
              <React.Fragment key={ex.id}>
                <button
                  type="button"
                  onClick={() => onInspectExhibit(ex.id)}
                  className="group flex items-center gap-2.5 text-left py-1 px-2 rounded hover:bg-[#261E18] transition-colors cursor-pointer"
                >
                  <span className="w-6 h-6 rounded-full bg-[#C89D54]/20 border border-[#C89D54] text-[#E5B869] font-mono text-xs flex items-center justify-center font-semibold group-hover:bg-[#C89D54] group-hover:text-[#14110F] transition-colors">
                    {ex.order}
                  </span>
                  <div>
                    <p className="text-[11px] font-mono text-[#C89D54]">{ex.yearSort}</p>
                    <p className="text-xs font-medium text-[#F7F4EE] whitespace-nowrap">
                      {ex.eraTitle.split(' ')[0]}
                    </p>
                  </div>
                </button>
                {idx < TIMELINE_EXHIBITS.length - 1 && (
                  <div className="flex-1 h-px bg-[#C89D54]/30 min-w-[20px]" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* 6 Chronological Exhibit Cards */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TIMELINE_EXHIBITS.map((exhibit) => {
            const imgUrl = getExhibitDataUrl(exhibit.id);
            return (
              <article
                key={exhibit.id}
                className="flex flex-col justify-between rounded-lg bg-[#14100D] border border-[#C89D54]/30 hover:border-[#C89D54] transition-all overflow-hidden group"
              >
                <div>
                  {/* Artwork Thumbnail */}
                  <div
                    onClick={() => onInspectExhibit(exhibit.id)}
                    className="relative h-44 w-full bg-[#0E0B09] overflow-hidden cursor-pointer border-b border-[#C89D54]/25"
                  >
                    <img
                      src={imgUrl}
                      alt={exhibit.exhibitTitle}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end justify-between p-3">
                      <span className="text-[11px] font-mono text-[#E5B869] font-medium">
                        0{exhibit.order} · {exhibit.yearSort}
                      </span>
                      <span className="text-[11px] text-[#F7F4EE] flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded border border-white/15">
                        <Eye className="w-3 h-3 text-[#C89D54]" /> Inspect
                      </span>
                    </div>
                  </div>

                  {/* Card Text */}
                  <div className="p-4 space-y-2">
                    <div className="text-[11px] uppercase tracking-wider text-[#C89D54] font-semibold">
                      {exhibit.eraTitle}
                    </div>
                    <h3 className="font-serif-display text-xl font-semibold text-[#F7F4EE]">
                      {exhibit.exhibitTitle}
                    </h3>
                    <p className="text-xs text-[#A89F91]">
                      {exhibit.period} · {exhibit.region}
                    </p>
                    <p className="text-xs text-[#D6CEBE] leading-relaxed line-clamp-3">
                      {exhibit.shortSummary}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="px-4 pb-4 pt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onInspectExhibit(exhibit.id)}
                    className="flex-1 py-2 px-3 rounded bg-[#C89D54] hover:bg-[#DEB469] text-[#14110F] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Open Exhibit Panel</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onWalkToExhibit(exhibit.id)}
                    className="py-2 px-3 rounded bg-[#241D17] hover:bg-[#332920] text-[#D6CEBE] hover:text-[#F7F4EE] border border-[#C89D54]/35 text-xs font-medium transition-colors cursor-pointer"
                    title="Teleport 3D Camera in front of this exhibit"
                  >
                    3D View
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
