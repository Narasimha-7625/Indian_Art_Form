import React from 'react';
import { ChevronLeft, ChevronRight, MapPin, Sparkles, X } from 'lucide-react';
import { TIMELINE_EXHIBITS, TimelineExhibit } from '../data/exhibitsData';
import { getExhibitDataUrl } from '../exhibits/proceduralArtTextures';

interface ExhibitModalProps {
  exhibit: TimelineExhibit;
  onClose: () => void;
  onSelectExhibit: (exhibitId: string) => void;
  onOpenLinkedMapSite?: (siteId: string) => void;
}

const SHORT_LABELS: Record<string, string> = {
  'indus-valley': 'Indus Valley',
  ajanta: 'Ajanta',
  'chola-period': 'Chola',
  'mughal-art': 'Mughal',
  'madhubani-art': 'Madhubani',
  'warli-art': 'Warli'
};

export const ExhibitModal: React.FC<ExhibitModalProps> = ({
  exhibit,
  onClose,
  onSelectExhibit,
  onOpenLinkedMapSite
}) => {
  const currentIndex = TIMELINE_EXHIBITS.findIndex((e) => e.id === exhibit.id);
  const prevExhibit =
    TIMELINE_EXHIBITS[(currentIndex - 1 + TIMELINE_EXHIBITS.length) % TIMELINE_EXHIBITS.length];
  const nextExhibit =
    TIMELINE_EXHIBITS[(currentIndex + 1) % TIMELINE_EXHIBITS.length];

  const artworkUrl = getExhibitDataUrl(exhibit.id);

  // Check if this exhibit also corresponds to one of the 8 Map locations
  const linkedMapId =
    exhibit.id === 'ajanta'
      ? 'ajanta'
      : exhibit.id === 'chola-period'
      ? 'thanjavur'
      : exhibit.id === 'madhubani-art'
      ? 'madhubani'
      : exhibit.id === 'warli-art'
      ? 'warli-region'
      : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-5 bg-black/80 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exhibit-modal-title"
    >
      <div className="relative w-full max-w-6xl max-h-[92vh] flex flex-col rounded-xl bg-[#1A1512] border border-[#C89D54]/50 shadow-2xl overflow-hidden text-[#F7F4EE]">
        {/* Top Modal Header & Visual Timeline Progression */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3.5 bg-[#14100D] border-b border-[#C89D54]/30">
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#C89D54] tracking-wider uppercase font-semibold">
            <span>CLA-I · CO1</span>
            <span aria-hidden="true">·</span>
            <span>Interactive Indian Art Timeline</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums text-[#D6CEBE]">
              0{exhibit.order} / 06
            </span>
          </div>

          {/* Visual Timeline Progression: Indus Valley → Ajanta → Chola → Mughal → Madhubani → Warli */}
          <div className="hidden xl:flex items-center gap-1">
            {TIMELINE_EXHIBITS.map((item, idx) => {
              const active = item.id === exhibit.id;
              return (
                <React.Fragment key={item.id}>
                  <button
                    type="button"
                    onClick={() => onSelectExhibit(item.id)}
                    className={`px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                      active
                        ? 'bg-[#C89D54] text-[#14110F] font-bold'
                        : 'bg-[#241D18] text-[#D6CEBE] hover:bg-[#332922] hover:text-[#F7F4EE]'
                    }`}
                  >
                    {SHORT_LABELS[item.id] || item.eraTitle}
                  </button>
                  {idx < TIMELINE_EXHIBITS.length - 1 && (
                    <span className="text-[#C89D54] text-xs font-bold px-0.5">→</span>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#282019] hover:bg-[#382D24] text-[#F7F4EE] border border-[#C89D54]/40 text-xs font-semibold transition-colors cursor-pointer"
            aria-label="Close exhibit panel"
          >
            <X className="w-4 h-4 text-[#E5B869]" />
            <span>Close</span>
          </button>
        </div>

        {/* Main Scrollable Curatorial Dossier Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-7">
          {/* Left Column (5 cols): Framed Artwork Preview & Required Metadata Fields */}
          <div className="lg:col-span-5 space-y-5">
            <div className="rounded-lg p-2.5 bg-[#120E0B] border-2 border-[#C89D54]/60 shadow-xl">
              <img
                src={artworkUrl}
                alt={`${exhibit.eraTitle} — ${exhibit.exhibitTitle}`}
                referrerPolicy="no-referrer"
                className="w-full h-auto rounded block"
              />
              <p className="mt-2 px-1 text-[11px] font-serif-display italic text-[#D6CEBE] text-center">
                Exhibit 0{exhibit.order}: {exhibit.exhibitTitle} ({exhibit.eraTitle})
              </p>
            </div>

            {/* Required Curatorial Metadata Table */}
            <div className="rounded-lg bg-[#14100D] border border-[#C89D54]/30 p-5 space-y-3 text-xs">
              <h3 className="uppercase tracking-widest text-[#C89D54] font-semibold pb-2 border-b border-[#C89D54]/20">
                Exhibit Specifications (CLA-I · CO1)
              </h3>
              <dl className="space-y-2.5">
                <div className="grid grid-cols-3 gap-2 py-1 border-b border-white/5">
                  <dt className="text-[#A89F91]">Artwork / Art Form</dt>
                  <dd className="col-span-2 text-[#F7F4EE] font-semibold">
                    {exhibit.exhibitTitle}
                  </dd>
                </div>
                <div className="grid grid-cols-3 gap-2 py-1 border-b border-white/5">
                  <dt className="text-[#A89F91]">Historical Period</dt>
                  <dd className="col-span-2 text-[#E5B869] font-medium">{exhibit.period}</dd>
                </div>
                <div className="grid grid-cols-3 gap-2 py-1 border-b border-white/5">
                  <dt className="text-[#A89F91]">Region / Location</dt>
                  <dd className="col-span-2 text-[#F7F4EE] font-medium">
                    {exhibit.location} ({exhibit.region})
                  </dd>
                </div>
                <div className="grid grid-cols-3 gap-2 py-1">
                  <dt className="text-[#A89F91]">Material &amp; Medium</dt>
                  <dd className="col-span-2 text-[#D6CEBE]">{exhibit.mediumAndMaterial}</dd>
                </div>
              </dl>

              {linkedMapId && onOpenLinkedMapSite && (
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => onOpenLinkedMapSite(linkedMapId)}
                    className="w-full py-2 px-3 rounded bg-[#241D17] hover:bg-[#31271F] border border-[#C89D54]/40 text-[#E5B869] text-xs font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Locate on Interactive India Art Map →</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column (7 cols): Description, Historical Context, Significance, Important Characteristics */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#E5B869] mb-1">
                <span>0{exhibit.order} · {exhibit.eraTitle}</span>
                <span aria-hidden="true">·</span>
                <span>{exhibit.yearSort}</span>
              </div>
              <h2
                id="exhibit-modal-title"
                className="font-serif-display text-3xl sm:text-4xl font-semibold text-[#F7F4EE] mb-1.5"
              >
                {exhibit.exhibitTitle}
              </h2>
              <p className="text-sm text-[#C89D54] font-medium">
                {exhibit.period} · {exhibit.region}
              </p>
            </div>

            {/* Description */}
            <section className="space-y-1.5">
              <h3 className="text-xs uppercase tracking-widest text-[#C89D54] font-semibold">
                Description
              </h3>
              <p className="text-sm sm:text-[15px] text-[#EAE2D3] leading-relaxed">
                {exhibit.description}
              </p>
            </section>

            {/* Historical Context */}
            <section className="space-y-1.5">
              <h3 className="text-xs uppercase tracking-widest text-[#C89D54] font-semibold">
                Historical Context
              </h3>
              <p className="text-sm sm:text-[15px] text-[#D6CEBE] leading-relaxed">
                {exhibit.historicalContext}
              </p>
            </section>

            {/* Cultural / Artistic Significance */}
            <section className="p-4 rounded-lg bg-[#231B15] border border-[#C89D54]/40 space-y-1.5">
              <h3 className="text-xs uppercase tracking-widest text-[#E5B869] font-semibold">
                Cultural &amp; Artistic Significance
              </h3>
              <p className="text-sm text-[#F7F4EE] leading-relaxed">{exhibit.significance}</p>
            </section>

            {/* Important Characteristics & Themes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-[#14100D] border border-[#C89D54]/25 space-y-2">
                <h4 className="text-xs uppercase tracking-widest text-[#E5B869] font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Important Characteristics</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-[#D6CEBE] leading-relaxed list-disc list-inside">
                  {exhibit.artisticFeatures.map((feat, i) => (
                    <li key={i}>{feat}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-[#14100D] border border-[#C89D54]/25 space-y-2">
                <h4 className="text-xs uppercase tracking-widest text-[#E5B869] font-semibold">
                  Themes &amp; Cultural Motifs
                </h4>
                <ul className="space-y-1.5 text-xs text-[#D6CEBE] leading-relaxed list-disc list-inside">
                  {exhibit.themes.map((theme, i) => (
                    <li key={i}>{theme}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action Bar: Functional Previous, Close, Next Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-4 bg-[#14100D] border-t border-[#C89D54]/30">
          <button
            type="button"
            onClick={() => onSelectExhibit(prevExhibit.id)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#241D17] hover:bg-[#332920] text-[#F7F4EE] border border-[#C89D54]/45 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 text-[#E5B869]" />
            <span>Previous ({SHORT_LABELS[prevExhibit.id] || prevExhibit.eraTitle})</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg bg-[#2D241C] hover:bg-[#3D3127] text-[#F7F4EE] border border-[#C89D54]/35 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
          >
            Close
          </button>

          <button
            type="button"
            onClick={() => onSelectExhibit(nextExhibit.id)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#C89D54] hover:bg-[#DDB368] text-[#14110F] text-xs sm:text-sm font-bold transition-colors cursor-pointer"
          >
            <span>Next ({SHORT_LABELS[nextExhibit.id] || nextExhibit.eraTitle})</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
