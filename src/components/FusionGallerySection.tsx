import React, { useState } from 'react';
import { Cuboid, Eye, Layers, RotateCcw, Sparkles } from 'lucide-react';
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

  const handleResetArtwork = () => {
    setHighlightMode('default');
    setShowAnnotations(true);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#14110F] text-[#F7F4EE] overflow-hidden">
      {/* Top Section Sub-Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-4 sm:px-6 py-4 bg-[#191410] border-b border-[#C89D54]/35 shrink-0">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-widest text-[#C89D54] font-semibold">
            <span>CLA-I</span>
            <span aria-hidden="true">·</span>
            <span>CO2</span>
            <span aria-hidden="true">·</span>
            <span>Activity 3 — Regional Painting Fusion</span>
          </div>
          <h1 className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#F7F4EE]">
            REGIONAL PAINTING FUSION — WARLI × KALAMKARI
          </h1>
        </div>

        {/* Four Required Functional Controls + 3D Hall button */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setHighlightMode('warli')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold tracking-wide transition-all cursor-pointer whitespace-nowrap border ${
              highlightMode === 'warli'
                ? 'bg-[#FAF6EE] text-[#14110F] border-[#FAF6EE] shadow-md'
                : 'bg-[#261E18] hover:bg-[#352A21] text-[#F7F4EE] border-[#C89D54]/45'
            }`}
          >
            SHOW WARLI ELEMENTS
          </button>

          <button
            type="button"
            onClick={() => setHighlightMode('kalamkari')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold tracking-wide transition-all cursor-pointer whitespace-nowrap border ${
              highlightMode === 'kalamkari'
                ? 'bg-[#E09F3E] text-[#14110F] border-[#E09F3E] shadow-md'
                : 'bg-[#261E18] hover:bg-[#352A21] text-[#F7F4EE] border-[#C89D54]/45'
            }`}
          >
            SHOW KALAMKARI ELEMENTS
          </button>

          <button
            type="button"
            onClick={() => setHighlightMode('both-annotated')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold tracking-wide transition-all cursor-pointer whitespace-nowrap border flex items-center gap-1.5 ${
              highlightMode === 'both-annotated'
                ? 'bg-[#C89D54] text-[#14110F] border-[#C89D54] shadow-md'
                : 'bg-[#261E18] hover:bg-[#352A21] text-[#E5B869] border-[#C89D54]/45'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>SHOW FUSION</span>
          </button>

          <button
            type="button"
            onClick={handleResetArtwork}
            className="px-3.5 py-2 rounded-lg bg-[#1F1813] hover:bg-[#2E241C] text-[#D6CEBE] hover:text-[#F7F4EE] border border-[#C89D54]/35 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#E5B869]" />
            <span>RESET ARTWORK</span>
          </button>

          <button
            type="button"
            onClick={onBackToMuseum}
            className="px-3 py-2 rounded-lg bg-[#261E18] hover:bg-[#352A21] border border-[#C89D54]/45 text-xs font-semibold text-[#F7F4EE] flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
          >
            <Cuboid className="w-3.5 h-3.5 text-[#E5B869]" />
            <span className="hidden sm:inline">3D Hall</span>
          </button>
        </div>
      </div>

      {/* Main Scrollable Gallery & Curatorial Analysis Layout */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          {/* Left/Center Column (7 cols on xl): Central Framed Fusion Artwork + Layer Inspector Bar */}
          <div className="xl:col-span-7 space-y-4">
            {/* Layer Inspection Status Bar */}
            <div className="p-3.5 rounded-lg bg-[#1A1511] border border-[#C89D54]/35 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs">
                <Sparkles className="w-4 h-4 text-[#E5B869] shrink-0" />
                <span className="text-[#D6CEBE]">Active Visualization Mode:</span>
                <span className="font-semibold text-[#F7F4EE]">
                  {highlightMode === 'default' && 'Balanced Unified Composition (WARLI × KALAMKARI)'}
                  {highlightMode === 'warli' &&
                    'Showing Warli Elements (Geometric Figures, Tarpa Dance, Trees & Village)'}
                  {highlightMode === 'kalamkari' &&
                    'Showing Kalamkari Elements (Floral Motifs, Vines, Leaves & Borders)'}
                  {highlightMode === 'both-annotated' &&
                    'Showing Unified Fusion with Dual Tradition Callouts'}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setShowAnnotations((s) => !s)}
                className="px-2.5 py-1 rounded bg-[#261E18] hover:bg-[#342921] text-xs text-[#E5B869] border border-[#C89D54]/30 flex items-center gap-1 cursor-pointer"
                title="Show or hide callout labels when highlighting"
              >
                <Eye className="w-3 h-3" />
                <span>{showAnnotations ? 'Callout Labels: On' : 'Callout Labels: Off'}</span>
              </button>
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
                  <span className="text-[11px] text-[#C89D54]">Click to Isolate</span>
                </div>
                <p className="text-xs text-[#D6CEBE] leading-relaxed">
                  Geometric human figures with circular heads and triangular bodies, dancing
                  community figures in the Tarpa spiral, village huts, trees, animals, and nature
                  rendered in chalky rice-paste white.
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
                  <span className="text-[11px] text-[#C89D54]">Click to Isolate</span>
                </div>
                <p className="text-xs text-[#D6CEBE] leading-relaxed">
                  Floral motifs, multi-petaled lotuses, serrated leaves, scrolling Tree of Life
                  vines, nature-inspired patterns, and repeating decorative Hashiya borders.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols on xl): Curatorial Explanation Panel with Exact Required Headings */}
          <aside className="xl:col-span-5 space-y-5 bg-[#18130F] border border-[#C89D54]/35 rounded-xl p-6">
            <div className="border-b border-[#C89D54]/25 pb-4">
              <div className="text-xs uppercase tracking-widest text-[#C89D54] font-semibold mb-1">
                CLA-I · CO2 · Regional Painting Fusion
              </div>
              <h2 className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#F7F4EE]">
                WARLI × KALAMKARI
              </h2>
              <p className="text-xs text-[#E5B869] mt-1">
                {FUSION_CURATORIAL_DATA.title} · {FUSION_CURATORIAL_DATA.medium}
              </p>
            </div>

            {/* 1. What is Warli Art? */}
            <section className="space-y-2">
              <h3 className="text-xs uppercase tracking-widest text-[#E5B869] font-semibold">
                What is Warli Art?
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

            {/* 2. What is Kalamkari? */}
            <section className="space-y-2 pt-2 border-t border-[#C89D54]/20">
              <h3 className="text-xs uppercase tracking-widest text-[#E5B869] font-semibold">
                What is Kalamkari?
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

            {/* 3. How were the two traditions combined? */}
            <section className="space-y-2.5 pt-2 border-t border-[#C89D54]/20">
              <h3 className="text-xs uppercase tracking-widest text-[#E5B869] font-semibold">
                How were the two traditions combined?
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

            {/* 4. Why is this fusion relevant to regional Indian art? */}
            <section className="p-4 rounded-lg bg-[#231B15] border border-[#C89D54]/40 space-y-1.5">
              <h3 className="text-xs uppercase tracking-widest text-[#E5B869] font-semibold">
                Why is this fusion relevant to regional Indian art?
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
