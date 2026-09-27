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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exhibit-modal-title"
    >
      <div className="relative w-full max-w-6xl max-h-[92vh] flex flex-col rounded-xl bg-[#1A1512] border border-[#C89D54]/50 shadow-2xl overflow-hidden text-[#F7F4EE]">
        {/* Top Modal Header & Chronological Timeline Stepper */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-[#14100D] border-b border-[#C89D54]/30">
          <div className="flex items-center gap-2 text-xs text-[#C89D54] tracking-wider uppercase">
            <span>Activity 1 · CO1 · Indian Art Timeline</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums text-[#D6CEBE]">
              Exhibit 0{exhibit.order} of 06
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-[#A89F91]">{exhibit.accessionNumber}</span>
          </div>

          {/* Interactive 6-Stop Timeline Scrubber */}
          <div className="hidden lg:flex items-center gap-1.5">
            {TIMELINE_EXHIBITS.map((item) => {
              const active = item.id === exhibit.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectExhibit(item.id)}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    active
                      ? 'bg-[#C89D54] text-[#14110F] font-semibold'
                      : 'bg-[#241D18] text-[#D6CEBE] hover:bg-[#332922] hover:text-[#F7F4EE]'
                  }`}
                >
                  {item.order}. {item.eraTitle.split(' ')[0]}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#282019] hover:bg-[#382D24] text-[#F7F4EE] border border-[#C89D54]/40 text-xs font-medium transition-colors cursor-pointer"
            aria-label="Close exhibit panel"
          >
            <X className="w-4 h-4 text-[#E5B869]" />
            <span>Close (ESC)</span>
          </button>
        </div>

        {/* Main Scrollable Curatorial Dossier Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column (5 cols): Framed Artwork Preview & Accession Metadata Table */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-lg p-2.5 bg-[#120E0B] border-2 border-[#C89D54]/60 shadow-xl">
              <img
                src={artworkUrl}
                alt={`${exhibit.eraTitle} — ${exhibit.exhibitTitle}`}
                referrerPolicy="no-referrer"
                className="w-full h-auto rounded block"
              />
              <p className="mt-2 px-1 text-[11px] font-serif-display italic text-[#D6CEBE] text-center">
                Fig. 0{exhibit.order} — Curatorial reconstruction &amp; visual study of{' '}
                {exhibit.exhibitTitle}
              </p>
            </div>

            {/* Museum Accession Metadata Definition List */}
            <div className="rounded-lg bg-[#14100D] border border-[#C89D54]/25 p-5 space-y-3 text-xs">
              <h3 className="uppercase tracking-widest text-[#C89D54] font-semibold pb-2 border-b border-[#C89D54]/20">
                Curatorial Accession Record
              </h3>
              <dl className="space-y-2.5">
                <div className="grid grid-cols-3 gap-2 py-1 border-b border-white/5">
                  <dt className="text-[#A89F91]">Historical Period</dt>
                  <dd className="col-span-2 text-[#F7F4EE] font-medium">{exhibit.period}</dd>
                </div>
                <div className="grid grid-cols-3 gap-2 py-1 border-b border-white/5">
                  <dt className="text-[#A89F91]">Region</dt>
                  <dd className="col-span-2 text-[#F7F4EE] font-medium">{exhibit.region}</dd>
                </div>
                <div className="grid grid-cols-3 gap-2 py-1 border-b border-white/5">
                  <dt className="text-[#A89F91]">Provenance / Site</dt>
                  <dd className="col-span-2 text-[#D6CEBE]">{exhibit.location}</dd>
                </div>
                <div className="grid grid-cols-3 gap-2 py-1 border-b border-white/5">
                  <dt className="text-[#A89F91]">Art &amp; Material</dt>
                  <dd className="col-span-2 text-[#D6CEBE]">{exhibit.mediumAndMaterial}</dd>
                </div>
                <div className="grid grid-cols-3 gap-2 py-1">
                  <dt className="text-[#A89F91]">Scale / Format</dt>
                  <dd className="col-span-2 font-mono tabular-nums text-[#D6CEBE]">
                    {exhibit.dimensions}
                  </dd>
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

          {/* Right Column (7 cols): Title, Description, Artistic Features, Context, Significance */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#E5B869] mb-1.5">
                <span>0{exhibit.order} · {exhibit.eraTitle}</span>
                <span aria-hidden="true">·</span>
                <span>{exhibit.yearSort}</span>
              </div>
              <h2
                id="exhibit-modal-title"
                className="font-serif-display text-3xl sm:text-4xl font-semibold text-[#F7F4EE] mb-2"
              >
                {exhibit.exhibitTitle}
              </h2>
              <p className="text-sm text-[#C89D54] font-medium">
                {exhibit.period} · {exhibit.region}
              </p>
            </div>

            {/* Pull Quote */}
            <blockquote className="pl-4 border-l-2 border-[#C89D54] font-serif-display italic text-lg text-[#EAE2D3]">
              {exhibit.curatorialQuote}
            </blockquote>

            {/* Description */}
            <section className="space-y-2">
              <h3 className="text-xs uppercase tracking-widest text-[#C89D54] font-semibold">
                Curatorial Description
              </h3>
              <p className="text-sm sm:text-[15px] text-[#EAE2D3] leading-relaxed">
                {exhibit.description}
              </p>
            </section>

            {/* Artistic Features / Material & Themes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-[#14100D] border border-[#C89D54]/25 space-y-2">
                <h4 className="text-xs uppercase tracking-widest text-[#E5B869] font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Artistic Features &amp; Material Tradition</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-[#D6CEBE] leading-relaxed list-disc list-inside">
                  {exhibit.artisticFeatures.map((feat, i) => (
                    <li key={i}>{feat}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-[#14100D] border border-[#C89D54]/25 space-y-2">
                <h4 className="text-xs uppercase tracking-widest text-[#E5B869] font-semibold">
                  Core Themes &amp; Iconography
                </h4>
                <ul className="space-y-1.5 text-xs text-[#D6CEBE] leading-relaxed list-disc list-inside">
                  {exhibit.themes.map((theme, i) => (
                    <li key={i}>{theme}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Historical Context */}
            <section className="space-y-2 pt-1">
              <h3 className="text-xs uppercase tracking-widest text-[#C89D54] font-semibold">
                Historical Context
              </h3>
              <p className="text-sm sm:text-[15px] text-[#D6CEBE] leading-relaxed">
                {exhibit.historicalContext}
              </p>
            </section>

            {/* Cultural & Art-Historical Significance */}
            <section className="p-4 rounded-lg bg-[#231B15] border border-[#C89D54]/40 space-y-1.5">
              <h3 className="text-xs uppercase tracking-widest text-[#E5B869] font-semibold">
                Historical &amp; Cultural Significance
              </h3>
              <p className="text-sm text-[#F7F4EE] leading-relaxed">{exhibit.significance}</p>
            </section>
          </div>
        </div>

        {/* Bottom Action Bar: Previous Exhibit, Close, Next Exhibit */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-[#14100D] border-t border-[#C89D54]/30">
          <button
            type="button"
            onClick={() => onSelectExhibit(prevExhibit.id)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#241D17] hover:bg-[#332920] text-[#F7F4EE] border border-[#C89D54]/40 text-xs sm:text-sm font-medium transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 text-[#E5B869]" />
            <span>
              Previous Exhibit ({prevExhibit.order}. {prevExhibit.eraTitle.split(' ')[0]})
            </span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg bg-[#2D241C] hover:bg-[#3D3127] text-[#D6CEBE] hover:text-[#F7F4EE] border border-[#C89D54]/30 text-xs sm:text-sm font-medium transition-colors cursor-pointer"
          >
            Close
          </button>

          <button
            type="button"
            onClick={() => onSelectExhibit(nextExhibit.id)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#C89D54] hover:bg-[#DDB368] text-[#14110F] text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
          >
            <span>
              Next Exhibit ({nextExhibit.order}. {nextExhibit.eraTitle.split(' ')[0]})
            </span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
