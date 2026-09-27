import React, { useState } from 'react';
import { ArrowLeft, Eye, Layers, RotateCcw, Sparkles } from 'lucide-react';
import { FUSION_CURATORIAL_DATA } from '../data/exhibitsData';
import {
  FusionHighlightMode,
  WarliKalamkariArtwork
} from '../exhibits/WarliKalamkariArtwork';

interface FusionGallerySectionProps {
  onBackToMuseum: () => void;
}

export const FusionGallerySection: React.FC<FusionGallerySectionProps> = ({
  onBackToMuseum
}) => {
  const [highlightMode, setHighlightMode] = useState<FusionHighlightMode>('default');
  const [showAnnotations, setShowAnnotations] = useState<boolean>(true);

  // "TOGGLE FUSION ELEMENTS" button cycles:
  // default -> warli (Warli elements first) -> kalamkari (Kalamkari elements second) -> both-annotated -> warli ...
  const handleToggleFusionElements = () => {
    setHighlightMode((prev) => {
      if (prev === 'default') return 'warli';
      if (prev === 'warli') return 'kalamkari';
      if (prev === 'kalamkari') return 'both-annotated';
      return 'warli';
    });
  };

  const handleResetArtwork = () => {
    setHighlightMode('default');
    setShowAnnotations(true);
  };

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-[#14110F] text-[#F7F4EE] overflow-hidden">
      {/* Top Section Header */}
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
              <span>CO2 — Regional Painting Fusion</span>
              <span aria-hidden="true">·</span>
              <span>Activity 3 · East Wing Pavilion</span>
            </div>
            <h1 className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#F7F4EE]">
              FUSION GALLERY — WARLI × KALAMKARI
            </h1>
          </div>
        </div>

        {/* Required Primary Interactive Controls: TOGGLE FUSION ELEMENTS & RESET ARTWORK */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={handleToggleFusionElements}
            className="px-4 py-2.5 rounded-lg bg-[#C89D54] hover:bg-[#E0B66B] text-[#14110F] text-xs sm:text-sm font-bold tracking-wide flex items-center gap-2 shadow-lg transition-all cursor-pointer whitespace-nowrap"
          >
            <Layers className="w-4 h-4" />
            <span>TOGGLE FUSION ELEMENTS</span>
          </button>

          <button
            type="button"
            onClick={handleResetArtwork}
            className="px-4 py-2.5 rounded-lg bg-[#261E18] hover:bg-[#352A21] text-[#F7F4EE] border border-[#C89D54]/45 text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap"
          >
            <RotateCcw className="w-4 h-4 text-[#E5B869]" />
            <span>RESET ARTWORK</span>
          </button>
        </div>
      </header>

      {/* Main Scrollable Gallery & Curatorial Analysis Layout */}
      <div className="flex-1 overflow-y-auto p-6 sm:p-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          {/* Left/Center Column (7 cols on xl): Central Framed Fusion Artwork + Layer Inspector Bar */}
          <div className="xl:col-span-7 space-y-4">
            {/* Layer Inspection Status & Direct Layer Selector Bar */}
            <div className="p-3.5 rounded-lg bg-[#1A1511] border border-[#C89D54]/35 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs">
                <Sparkles className="w-4 h-4 text-[#E5B869] shrink-0" />
                <span className="text-[#D6CEBE]">Layer Inspector:</span>
                <span className="font-semibold text-[#F7F4EE]">
                  {highlightMode === 'default' && 'Default Museum View (Click Toggle to Highlight Layers)'}
                  {highlightMode === 'warli' && 'Step 1 · Highlighting Warli Elements (Geometric Figures & Village)'}
                  {highlightMode === 'kalamkari' && 'Step 2 · Highlighting Kalamkari Elements (Floral Vines & Borders)'}
                  {highlightMode === 'both-annotated' && 'Step 3 · Dual Layer Synthesis with Callout Labels'}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setHighlightMode('warli')}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                    highlightMode === 'warli'
                      ? 'bg-[#FAF6EE] text-[#14110F] font-semibold'
                      : 'bg-[#261E18] text-[#D6CEBE] hover:text-[#F7F4EE]'
                  }`}
                >
                  1. Warli Layer
                </button>
                <button
                  type="button"
                  onClick={() => setHighlightMode('kalamkari')}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                    highlightMode === 'kalamkari'
                      ? 'bg-[#E09F3E] text-[#14110F] font-semibold'
                      : 'bg-[#261E18] text-[#D6CEBE] hover:text-[#F7F4EE]'
                  }`}
                >
                  2. Kalamkari Layer
                </button>
                <button
                  type="button"
                  onClick={() => setHighlightMode('both-annotated')}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                    highlightMode === 'both-annotated'
                      ? 'bg-[#C89D54] text-[#14110F] font-semibold'
                      : 'bg-[#261E18] text-[#D6CEBE] hover:text-[#F7F4EE]'
                  }`}
                >
                  Dual Callouts
                </button>
                <button
                  type="button"
                  onClick={() => setShowAnnotations((s) => !s)}
                  className="px-2.5 py-1 rounded bg-[#261E18] hover:bg-[#342921] text-xs text-[#E5B869] border border-[#C89D54]/30 flex items-center gap-1 cursor-pointer"
                  title="Show or hide callout labels when highlighting"
                >
                  <Eye className="w-3 h-3" />
                  <span>{showAnnotations ? 'Labels On' : 'Labels Off'}</span>
                </button>
              </div>
            </div>

            {/* Central Framed Warli x Kalamkari Original Digital Artwork */}
            <WarliKalamkariArtwork
              highlightMode={highlightMode}
              showAnnotations={showAnnotations}
              onSelectElementGroup={(group) => setHighlightMode(group)}
            />

            {/* Visual Legend comparing the two layers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                onClick={() => setHighlightMode('warli')}
                className={`p-4 rounded-lg border transition-all cursor-pointer ${
                  highlightMode === 'warli'
                    ? 'bg-[#271C16] border-[#FAF6EE] shadow-md'
                    : 'bg-[#18130F] border-[#C89D54]/25 hover:border-[#C89D54]/60'
                }`}
              >
                <div className="flex items-center justify-between text-xs text-[#FAF6EE] font-semibold mb-1.5">
                  <span>WARLI ELEMENTS (MAHARASHTRA)</span>
                  <span className="text-[11px] text-[#C89D54]">Click to Highlight 1st</span>
                </div>
                <p className="text-xs text-[#D6CEBE] leading-relaxed">
                  Geometric human figures with circular heads and inverse triangular bodies, the
                  unbroken Tarpa spiral harvest dance, thatched village huts, radiating forest
                  trees, and apex-triangle fauna in chalky rice-paste white.
                </p>
              </div>

              <div
                onClick={() => setHighlightMode('kalamkari')}
                className={`p-4 rounded-lg border transition-all cursor-pointer ${
                  highlightMode === 'kalamkari'
                    ? 'bg-[#271C16] border-[#E09F3E] shadow-md'
                    : 'bg-[#18130F] border-[#C89D54]/25 hover:border-[#C89D54]/60'
                }`}
              >
                <div className="flex items-center justify-between text-xs text-[#E5B869] font-semibold mb-1.5">
                  <span>KALAMKARI ELEMENTS (ANDHRA PRADESH)</span>
                  <span className="text-[11px] text-[#C89D54]">Click to Highlight 2nd</span>
                </div>
                <p className="text-xs text-[#D6CEBE] leading-relaxed">
                  Sinuous Kalpavriksha (Tree of Life) scrolling vines, multi-petaled blooming
                  lotuses, serrated botanical leaves with fine kalam pen veins, and repeating
                  Hashiya borders in indigo, madder crimson, and myrobalan mustard.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols on xl): Curatorial Information Panel */}
          <aside className="xl:col-span-5 space-y-5 bg-[#18130F] border border-[#C89D54]/35 rounded-xl p-6">
            <div className="border-b border-[#C89D54]/25 pb-4">
              <div className="text-xs uppercase tracking-widest text-[#C89D54] font-semibold mb-1">
                {FUSION_CURATORIAL_DATA.courseOutcome}
              </div>
              <h2 className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#F7F4EE]">
                {FUSION_CURATORIAL_DATA.title}
              </h2>
              <p className="text-xs text-[#E5B869] mt-1">
                {FUSION_CURATORIAL_DATA.subtitle} · {FUSION_CURATORIAL_DATA.medium}
              </p>
            </div>

            {/* 1. What Warli Art Is */}
            <section className="space-y-2">
              <h3 className="text-xs uppercase tracking-widest text-[#E5B869] font-semibold">
                1. {FUSION_CURATORIAL_DATA.whatIsWarli.heading}
              </h3>
              <p className="text-xs text-[#A89F91]">
                Region: {FUSION_CURATORIAL_DATA.whatIsWarli.region}
              </p>
              <p className="text-xs sm:text-sm text-[#EAE2D3] leading-relaxed">
                {FUSION_CURATORIAL_DATA.whatIsWarli.summary}
              </p>
              <ul className="space-y-1 text-xs text-[#D6CEBE] list-disc list-inside leading-relaxed">
                {FUSION_CURATORIAL_DATA.whatIsWarli.visualGrammar.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>

            {/* 2. What Kalamkari Is */}
            <section className="space-y-2 pt-2 border-t border-[#C89D54]/20">
              <h3 className="text-xs uppercase tracking-widest text-[#E5B869] font-semibold">
                2. {FUSION_CURATORIAL_DATA.whatIsKalamkari.heading}
              </h3>
              <p className="text-xs text-[#A89F91]">
                Region: {FUSION_CURATORIAL_DATA.whatIsKalamkari.region}
              </p>
              <p className="text-xs sm:text-sm text-[#EAE2D3] leading-relaxed">
                {FUSION_CURATORIAL_DATA.whatIsKalamkari.summary}
              </p>
              <ul className="space-y-1 text-xs text-[#D6CEBE] list-disc list-inside leading-relaxed">
                {FUSION_CURATORIAL_DATA.whatIsKalamkari.visualGrammar.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>

            {/* 3. What Elements Were Combined */}
            <section className="space-y-2.5 pt-2 border-t border-[#C89D54]/20">
              <h3 className="text-xs uppercase tracking-widest text-[#E5B869] font-semibold">
                3. {FUSION_CURATORIAL_DATA.combinedElements.heading}
              </h3>
              <div className="space-y-2">
                {FUSION_CURATORIAL_DATA.combinedElements.points.map((pt, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded bg-[#130F0C] border border-[#C89D54]/20 space-y-1"
                  >
                    <h4 className="text-xs font-semibold text-[#F7F4EE]">{pt.title}</h4>
                    <p className="text-xs text-[#D6CEBE] leading-relaxed">{pt.detail}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 4. Why the Fusion Represents Regional Artistic Diversity */}
            <section className="p-4 rounded-lg bg-[#231B15] border border-[#C89D54]/40 space-y-1.5">
              <h3 className="text-xs uppercase tracking-widest text-[#E5B869] font-semibold">
                4. {FUSION_CURATORIAL_DATA.whyFusionRepresentsDiversity.heading}
              </h3>
              <p className="text-xs sm:text-sm text-[#F7F4EE] leading-relaxed">
                {FUSION_CURATORIAL_DATA.whyFusionRepresentsDiversity.essay}
              </p>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
};
