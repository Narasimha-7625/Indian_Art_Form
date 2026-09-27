import React from 'react';

export type FusionHighlightMode = 'default' | 'warli' | 'kalamkari' | 'both-annotated';

interface WarliKalamkariArtworkProps {
  highlightMode: FusionHighlightMode;
  showAnnotations?: boolean;
  onSelectElementGroup?: (group: 'warli' | 'kalamkari') => void;
}

// Helper for rendering a Warli geometric human figure in SVG
const WarliHuman: React.FC<{
  x: number;
  y: number;
  scale?: number;
  rotate?: number;
  isTarpaPlayer?: boolean;
  holdingPot?: boolean;
}> = ({ x, y, scale = 1, rotate = 0, isTarpaPlayer = false, holdingPot = false }) => (
  <g transform={`translate(${x}, ${y}) rotate(${rotate}) scale(${scale})`}>
    {/* Circular Head */}
    <circle cx="0" cy="-24" r="5.2" fill="#FAF6EE" />
    {/* Pot on head if villager */}
    {holdingPot && (
      <g>
        <ellipse cx="0" cy="-34" rx="7" ry="4.5" fill="none" stroke="#FAF6EE" strokeWidth="2" />
        <line x1="-5" y1="-39" x2="5" y2="-39" stroke="#FAF6EE" strokeWidth="2" />
      </g>
    )}
    {/* Neck */}
    <line x1="0" y1="-18.5" x2="0" y2="-14" stroke="#FAF6EE" strokeWidth="2.2" />
    {/* Upper Inverted Triangle (Torso) */}
    <polygon points="-10,-14 10,-14 0,0" fill="#FAF6EE" />
    {/* Lower Triangle (Pelvis) */}
    <polygon points="0,0 -9.5,14 9.5,14" fill="#FAF6EE" />
    {/* Arms */}
    {isTarpaPlayer ? (
      <g>
        <polyline points="-9,-13 -16,-20 -8,-25" fill="none" stroke="#FAF6EE" strokeWidth="2.2" strokeLinecap="round" />
        <polyline points="9,-13 20,-22 14,-27" fill="none" stroke="#FAF6EE" strokeWidth="2.2" strokeLinecap="round" />
        {/* Iconic Tarpa Gourd Wind Instrument */}
        <polygon points="6,-24 38,-44 43,-34" fill="none" stroke="#FAF6EE" strokeWidth="2.3" />
        <line x1="38" y1="-44" x2="46" y2="-49" stroke="#FAF6EE" strokeWidth="2" />
      </g>
    ) : (
      <g>
        <polyline points="-9,-13 -19,-8 -24,-14" fill="none" stroke="#FAF6EE" strokeWidth="2.2" strokeLinecap="round" />
        <polyline points="9,-13 19,-8 24,-14" fill="none" stroke="#FAF6EE" strokeWidth="2.2" strokeLinecap="round" />
      </g>
    )}
    {/* Rhythmically Bent Legs */}
    <polyline points="-5,14 -9,24 -4,29" fill="none" stroke="#FAF6EE" strokeWidth="2.2" strokeLinecap="round" />
    <polyline points="5,14 9,24 14,29" fill="none" stroke="#FAF6EE" strokeWidth="2.2" strokeLinecap="round" />
  </g>
);

// Helper for Kalamkari Multi-Petaled Lotus & Rosette
const KalamkariLotus: React.FC<{
  x: number;
  y: number;
  scale?: number;
  petalColor?: string;
  innerColor?: string;
}> = ({ x, y, scale = 1, petalColor = '#9E2A2B', innerColor = '#E09F3E' }) => {
  const angles = [-65, -40, -18, 0, 18, 40, 65];
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      {/* Serrated Kalamkari calyx leaves */}
      <path
        d="M -28,8 Q -14,24 0,14 Q 14,24 28,8 Q 14,4 0,10 Q -14,4 -28,8 Z"
        fill="#2A5C43"
        stroke="#18120E"
        strokeWidth="1.8"
      />
      {/* Radiating Lotus Petals with Kalam pen inner veins */}
      {angles.map((ang, idx) => (
        <g key={idx} transform={`rotate(${ang})`}>
          <path
            d="M 0,6 C -11,-8 -10,-28 0,-38 C 10,-28 11,-8 0,6 Z"
            fill={idx % 2 === 0 ? petalColor : innerColor}
            stroke="#18120E"
            strokeWidth="1.8"
          />
          <line x1="0" y1="2" x2="0" y2="-30" stroke="#FAF3E0" strokeWidth="1" strokeOpacity="0.65" />
        </g>
      ))}
      {/* Central Seed Pod */}
      <circle cx="0" cy="4" r="7.5" fill="#E09F3E" stroke="#18120E" strokeWidth="1.8" />
      <circle cx="0" cy="4" r="3" fill="#9E2A2B" />
    </g>
  );
};

// Helper for Kalamkari Serrated Botanical Leaf
const KalamkariLeaf: React.FC<{
  x: number;
  y: number;
  rotate?: number;
  scale?: number;
  fill?: string;
}> = ({ x, y, rotate = 0, scale = 1, fill = '#2A5C43' }) => (
  <g transform={`translate(${x}, ${y}) rotate(${rotate}) scale(${scale})`}>
    <path
      d="M 0,0 C -14,-10 -16,-30 0,-44 C 16,-30 14,-10 0,0 Z"
      fill={fill}
      stroke="#18120E"
      strokeWidth="1.8"
    />
    <line x1="0" y1="-2" x2="0" y2="-38" stroke="#E5C17B" strokeWidth="1.3" />
    <line x1="0" y1="-12" x2="-7" y2="-20" stroke="#E5C17B" strokeWidth="1.1" />
    <line x1="0" y1="-12" x2="7" y2="-20" stroke="#E5C17B" strokeWidth="1.1" />
    <line x1="0" y1="-24" x2="-6" y2="-31" stroke="#E5C17B" strokeWidth="1.1" />
    <line x1="0" y1="-24" x2="6" y2="-31" stroke="#E5C17B" strokeWidth="1.1" />
  </g>
);

export const WarliKalamkariArtwork: React.FC<WarliKalamkariArtworkProps> = ({
  highlightMode,
  showAnnotations = true,
  onSelectElementGroup
}) => {
  const warliOpacity = highlightMode === 'kalamkari' ? 0.18 : 1;
  const kalamkariOpacity = highlightMode === 'warli' ? 0.18 : 1;

  const isWarliFocused = highlightMode === 'warli';
  const isKalamkariFocused = highlightMode === 'kalamkari';
  const showWarliBadges = showAnnotations && (highlightMode === 'warli' || highlightMode === 'both-annotated');
  const showKalamkariBadges = showAnnotations && (highlightMode === 'kalamkari' || highlightMode === 'both-annotated');

  // 14 Tarpa dancers in the central spiral circle
  const tarpaDancers = Array.from({ length: 14 }, (_, i) => {
    const angle = (i / 14) * Math.PI * 2;
    const rx = 148;
    const ry = 128;
    return {
      x: 600 + Math.cos(angle) * rx,
      y: 415 + Math.sin(angle) * ry,
      idx: i
    };
  });

  // Repeating border tile coordinates
  const topBottomTiles = Array.from({ length: 14 }, (_, i) => 115 + i * 74);
  const leftRightTiles = Array.from({ length: 8 }, (_, i) => 135 + i * 74);

  return (
    <div className="relative w-full select-none">
      {/* Ornate Carved Teakwood & Brass Museum Frame */}
      <div className="relative rounded-lg p-3 sm:p-5 bg-gradient-to-br from-[#3A2416] via-[#22140C] to-[#150C07] border-2 border-[#C89D54] shadow-2xl">
        <div className="rounded border border-[#C89D54]/60 p-1.5 bg-[#19100B]">
          <svg
            viewBox="0 0 1200 800"
            className="w-full h-auto block rounded bg-[#5E2216]"
            role="img"
            aria-label="Original Warli and Kalamkari Regional Painting Fusion Artwork"
          >
            <defs>
              {/* Terracotta Geru Earth + Myrobalan Warmth Radial Gradient */}
              <radialGradient id="geruEarthBg" cx="50%" cy="50%" r="65%">
                <stop offset="0%" stopColor="#7C2E1E" />
                <stop offset="55%" stopColor="#5B2014" />
                <stop offset="100%" stopColor="#38120B" />
              </radialGradient>

              {/* Subtle Kalamkari Cotton Weave Pattern */}
              <pattern id="cottonWeave" width="12" height="12" patternUnits="userSpaceOnUse">
                <path
                  d="M 0 6 L 12 6 M 6 0 L 6 12"
                  stroke="rgba(250, 240, 220, 0.04)"
                  strokeWidth="1"
                />
              </pattern>

              {/* Glow filter for highlighted layer */}
              <filter id="warliGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#FFF7E0" floodOpacity="0.85" />
              </filter>

              <filter id="kalamkariGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#F5C45E" floodOpacity="0.9" />
              </filter>
            </defs>

            {/* Base Earthen & Dyed Textile Ground */}
            <rect x="0" y="0" width="1200" height="800" fill="url(#geruEarthBg)" />
            <rect x="0" y="0" width="1200" height="800" fill="url(#cottonWeave)" />

            {/* ===================================================================== */}
            {/* LAYER 1: KALAMKARI-INSPIRED ELEMENTS (BORDERS, VINES, LOTUSES, LEAVES) */}
            {/* ===================================================================== */}
            <g
              style={{
                opacity: kalamkariOpacity,
                transition: 'opacity 320ms cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              filter={isKalamkariFocused ? 'url(#kalamkariGlow)' : undefined}
              onClick={() => onSelectElementGroup?.('kalamkari')}
              className="cursor-pointer"
            >
              {/* Outer Kalamkari Hashiya Decorative Border Band */}
              <rect
                x="18"
                y="18"
                width="1164"
                height="764"
                fill="none"
                stroke="#E09F3E"
                strokeWidth="5"
              />
              <rect
                x="26"
                y="26"
                width="1148"
                height="748"
                fill="none"
                stroke="#1D3557"
                strokeWidth="14"
              />
              <rect
                x="36"
                y="36"
                width="1128"
                height="728"
                fill="none"
                stroke="#E09F3E"
                strokeWidth="3"
              />

              {/* Kalamkari Repeating Floral & Paisley (Manga) Border Band */}
              <rect
                x="40"
                y="40"
                width="1120"
                height="720"
                fill="none"
                stroke="#221510"
                strokeWidth="34"
                strokeOpacity="0.55"
              />

              {/* Top & Bottom Repeating Kalamkari Floral Rosettes & Scrolling Vine */}
              <path
                d="M 80,56 Q 115,38 152,56 T 226,56 T 300,56 T 374,56 T 448,56 T 522,56 T 596,56 T 670,56 T 744,56 T 818,56 T 892,56 T 966,56 T 1040,56 T 1114,56"
                fill="none"
                stroke="#E09F3E"
                strokeWidth="2.5"
              />
              <path
                d="M 80,744 Q 115,726 152,744 T 226,744 T 300,744 T 374,744 T 448,744 T 522,744 T 596,744 T 670,744 T 744,744 T 818,744 T 892,744 T 966,744 T 1040,744 T 1114,744"
                fill="none"
                stroke="#E09F3E"
                strokeWidth="2.5"
              />

              {topBottomTiles.map((tx, i) => (
                <g key={`tb-${i}`}>
                  {/* Top Border Motif */}
                  <circle cx={tx} cy="56" r="11" fill={i % 2 === 0 ? '#9E2A2B' : '#1D3557'} stroke="#E09F3E" strokeWidth="1.8" />
                  <circle cx={tx} cy="56" r="4" fill="#F4D58D" />
                  <path d={`M ${tx - 24},56 Q ${tx - 18},44 ${tx - 12},56`} fill="#2A5C43" stroke="#E09F3E" strokeWidth="1.2" />
                  {/* Bottom Border Motif */}
                  <circle cx={tx} cy="744" r="11" fill={i % 2 === 0 ? '#1D3557' : '#9E2A2B'} stroke="#E09F3E" strokeWidth="1.8" />
                  <circle cx={tx} cy="744" r="4" fill="#F4D58D" />
                  <path d={`M ${tx - 24},744 Q ${tx - 18},732 ${tx - 12},744`} fill="#2A5C43" stroke="#E09F3E" strokeWidth="1.2" />
                </g>
              ))}

              {/* Left & Right Repeating Kalamkari Border Motifs */}
              {leftRightTiles.map((ty, i) => (
                <g key={`lr-${i}`}>
                  <circle cx="56" cy={ty} r="11" fill={i % 2 === 0 ? '#9E2A2B' : '#2A5C43'} stroke="#E09F3E" strokeWidth="1.8" />
                  <circle cx="56" cy={ty} r="4" fill="#F4D58D" />
                  <circle cx="1144" cy={ty} r="11" fill={i % 2 === 0 ? '#2A5C43' : '#9E2A2B'} stroke="#E09F3E" strokeWidth="1.8" />
                  <circle cx="1144" cy={ty} r="4" fill="#F4D58D" />
                </g>
              ))}

              {/* Four Corner Kalamkari Mandala Medallions */}
              {[
                [56, 56],
                [1144, 56],
                [56, 744],
                [1144, 744]
              ].map(([cx, cy], idx) => (
                <g key={`corner-${idx}`}>
                  <rect x={cx - 20} y={cy - 20} width="40" height="40" fill="#1D3557" stroke="#E09F3E" strokeWidth="2.5" />
                  <circle cx={cx} cy={cy} r="13" fill="#9E2A2B" stroke="#F4D58D" strokeWidth="1.8" />
                  <circle cx={cx} cy={cy} r="5" fill="#F4D58D" />
                </g>
              ))}

              {/* Scalloped Kalamkari Mihrab / Torana Cusped Archway Framing the Scene */}
              <path
                d="M 88,712 L 88,195 Q 140,120 260,104 Q 420,86 600,86 Q 780,86 940,104 Q 1060,120 1112,195 L 1112,712"
                fill="none"
                stroke="#E09F3E"
                strokeWidth="3.5"
              />

              {/* Grand Kalamkari Kalpavriksha (Tree of Life) Scrolling Vines & Tendrils */}
              <g stroke="#E09F3E" fill="none" strokeLinecap="round">
                {/* Main Left & Right Winding Vine Boughs */}
                <path
                  d="M 600,710 C 595,620 520,610 410,550 C 280,480 230,360 310,240 C 370,150 490,125 600,155"
                  strokeWidth="6"
                />
                <path
                  d="M 600,710 C 605,620 680,610 790,550 C 920,480 970,360 890,240 C 830,150 710,125 600,155"
                  strokeWidth="6"
                />
                {/* Secondary Curvilinear Tendrils */}
                <path d="M 350,515 C 240,540 150,470 165,375 C 180,295 260,290 285,345" strokeWidth="3.8" />
                <path d="M 850,515 C 960,540 1050,470 1035,375 C 1020,295 940,290 915,345" strokeWidth="3.8" />
                <path d="M 325,220 C 235,195 160,220 145,155" strokeWidth="3.5" />
                <path d="M 875,220 C 965,195 1040,220 1055,155" strokeWidth="3.5" />
              </g>

              {/* Central Kalamkari Multi-Petaled Lotus Ring Framing the Warli Tarpa Circle */}
              <circle cx="600" cy="415" r="218" fill="none" stroke="#E09F3E" strokeWidth="3" strokeDasharray="8 6" />
              <circle cx="600" cy="415" r="204" fill="none" stroke="#1D3557" strokeWidth="12" strokeOpacity="0.85" />
              <circle cx="600" cy="415" r="196" fill="none" stroke="#E09F3E" strokeWidth="2.5" />

              {/* 24 Kalamkari Lotus Petals radiating around the Central Medallion */}
              {Array.from({ length: 24 }, (_, i) => {
                const deg = i * 15;
                return (
                  <g key={`medallion-petal-${i}`} transform={`translate(600, 415) rotate(${deg})`}>
                    <path
                      d="M -11,-198 C -16,-218 -6,-234 0,-240 C 6,-234 16,-218 11,-198 Z"
                      fill={i % 3 === 0 ? '#9E2A2B' : i % 3 === 1 ? '#E09F3E' : '#1D3557'}
                      stroke="#18120E"
                      strokeWidth="1.5"
                    />
                  </g>
                );
              })}

              {/* Blooming Kalamkari Lotuses along the Vines */}
              <KalamkariLotus x={600} y={145} scale={1.15} petalColor="#9E2A2B" innerColor="#E09F3E" />
              <KalamkariLotus x={295} y={240} scale={0.95} petalColor="#1D3557" innerColor="#E09F3E" />
              <KalamkariLotus x={905} y={240} scale={0.95} petalColor="#1D3557" innerColor="#E09F3E" />
              <KalamkariLotus x={168} y={372} scale={0.9} petalColor="#9E2A2B" innerColor="#F4D58D" />
              <KalamkariLotus x={1032} y={372} scale={0.9} petalColor="#9E2A2B" innerColor="#F4D58D" />
              <KalamkariLotus x={355} y={535} scale={0.88} petalColor="#9E2A2B" innerColor="#E09F3E" />
              <KalamkariLotus x={845} y={535} scale={0.88} petalColor="#9E2A2B" innerColor="#E09F3E" />
              <KalamkariLotus x={148} y={152} scale={0.78} petalColor="#E09F3E" innerColor="#9E2A2B" />
              <KalamkariLotus x={1052} y={152} scale={0.78} petalColor="#E09F3E" innerColor="#9E2A2B" />

              {/* Kalamkari Serrated Botanical Leaves along the Kalpavriksha Vines */}
              <KalamkariLeaf x={460} y={142} rotate={-45} scale={0.95} fill="#2A5C43" />
              <KalamkariLeaf x={740} y={142} rotate={45} scale={0.95} fill="#2A5C43" />
              <KalamkariLeaf x={265} y={310} rotate={-65} scale={0.9} fill="#1D3557" />
              <KalamkariLeaf x={935} y={310} rotate={65} scale={0.9} fill="#1D3557" />
              <KalamkariLeaf x={235} y={485} rotate={-115} scale={0.9} fill="#2A5C43" />
              <KalamkariLeaf x={965} y={485} rotate={115} scale={0.9} fill="#2A5C43" />
              <KalamkariLeaf x={475} y={595} rotate={-35} scale={0.95} fill="#2A5C43" />
              <KalamkariLeaf x={725} y={595} rotate={35} scale={0.95} fill="#2A5C43" />
              <KalamkariLeaf x={555} y={665} rotate={-25} scale={0.85} fill="#1D3557" />
              <KalamkariLeaf x={645} y={665} rotate={25} scale={0.85} fill="#1D3557" />
            </g>

            {/* ===================================================================== */}
            {/* LAYER 2: WARLI INDIGENOUS ELEMENTS (FIGURES, TARPA, TREES, VILLAGE)   */}
            {/* ===================================================================== */}
            <g
              style={{
                opacity: warliOpacity,
                transition: 'opacity 320ms cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              filter={isWarliFocused ? 'url(#warliGlow)' : undefined}
              onClick={() => onSelectElementGroup?.('warli')}
              className="cursor-pointer"
            >
              {/* Inner Warli Sacred Chaukat Geometric Chevron Border */}
              <rect x="80" y="80" width="1040" height="640" fill="none" stroke="#FAF6EE" strokeWidth="2" />
              <rect
                x="88"
                y="88"
                width="1024"
                height="624"
                fill="none"
                stroke="#FAF6EE"
                strokeWidth="1.5"
                strokeDasharray="6 4"
              />

              {/* Warli Cosmic Witnesses: Radiant Sun (Left) and Crescent Moon (Right) */}
              <g transform="translate(235, 148)">
                <circle cx="0" cy="0" r="18" fill="none" stroke="#FAF6EE" strokeWidth="2.4" />
                <circle cx="0" cy="0" r="6" fill="#FAF6EE" />
                {Array.from({ length: 12 }, (_, r) => {
                  const a = (r / 12) * Math.PI * 2;
                  return (
                    <line
                      key={r}
                      x1={Math.cos(a) * 21}
                      y1={Math.sin(a) * 21}
                      x2={Math.cos(a) * 31}
                      y2={Math.sin(a) * 31}
                      stroke="#FAF6EE"
                      strokeWidth="2"
                    />
                  );
                })}
              </g>

              <g transform="translate(965, 148)">
                <path
                  d="M -12,-18 A 22,22 0 1,0 18,12 A 17,17 0 1,1 -12,-18 Z"
                  fill="#FAF6EE"
                />
                <circle cx="-26" cy="-8" r="2.2" fill="#FAF6EE" />
                <circle cx="24" cy="-16" r="2.2" fill="#FAF6EE" />
                <circle cx="0" cy="28" r="2.2" fill="#FAF6EE" />
              </g>

              {/* Central Sacred Lagnachauk Diamond & Tarpa Horn Musician */}
              <g transform="translate(600, 415)">
                <polygon
                  points="0,-66 66,0 0,66 -66,0"
                  fill="none"
                  stroke="#FAF6EE"
                  strokeWidth="2.2"
                />
                <polygon
                  points="0,-54 54,0 0,54 -54,0"
                  fill="none"
                  stroke="#FAF6EE"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
              </g>

              {/* Central Tarpa Player */}
              <WarliHuman x={596} y={418} scale={1.18} isTarpaPlayer />

              {/* Unbroken Hand-Chain Circle of 14 Warli Tarpa Dancers */}
              <ellipse
                cx="600"
                cy="407"
                rx="148"
                ry="128"
                fill="none"
                stroke="#FAF6EE"
                strokeWidth="1.8"
                strokeDasharray="5 4"
              />
              {tarpaDancers.map((d) => (
                <WarliHuman key={d.idx} x={d.x} y={d.y} scale={0.86} />
              ))}

              {/* Left & Right Warli Geometric Forest Trees with Birds */}
              {[
                { tx: 168, ty: 685 },
                { tx: 1032, ty: 685 }
              ].map(({ tx, ty }, idx) => (
                <g key={`warli-tree-${idx}`}>
                  {/* Trunk */}
                  <line x1={tx} y1={ty} x2={tx} y2={ty - 165} stroke="#FAF6EE" strokeWidth="3.5" />
                  {/* Geometric V-branches & hatched leaves */}
                  {[0, 1, 2, 3, 4, 5].map((b) => {
                    const by = ty - 45 - b * 22;
                    const span = 64 - b * 8;
                    return (
                      <g key={b}>
                        <polyline
                          points={`${tx - span},${by - 16} ${tx},${by} ${tx + span},${by - 16}`}
                          fill="none"
                          stroke="#FAF6EE"
                          strokeWidth="2.2"
                        />
                        <line
                          x1={tx - span * 0.6}
                          y1={by - 10}
                          x2={tx - span * 0.6}
                          y2={by - 20}
                          stroke="#FAF6EE"
                          strokeWidth="1.6"
                        />
                        <line
                          x1={tx + span * 0.6}
                          y1={by - 10}
                          x2={tx + span * 0.6}
                          y2={by - 20}
                          stroke="#FAF6EE"
                          strokeWidth="1.6"
                        />
                      </g>
                    );
                  })}
                  {/* Warli Geometric Birds perched above canopy */}
                  <path
                    d={`M ${tx - 28},${ty - 182} Q ${tx - 18},${ty - 194} ${tx - 8},${ty - 182} Q ${tx + 2},${ty - 194} ${tx + 12},${ty - 182}`}
                    fill="none"
                    stroke="#FAF6EE"
                    strokeWidth="2"
                  />
                </g>
              ))}

              {/* Warli Village Scene: Left & Right Thatched Huts (Ghar) */}
              {[
                { hx: 195, hy: 295 },
                { hx: 1005, hy: 295 }
              ].map(({ hx, hy }, idx) => (
                <g key={`hut-${idx}`} transform={`translate(${hx}, ${hy})`}>
                  {/* Triangular Thatched Roof with Chevron Hatching */}
                  <polygon
                    points="-58,0 0,-46 58,0"
                    fill="rgba(94, 34, 22, 0.75)"
                    stroke="#FAF6EE"
                    strokeWidth="2.4"
                  />
                  <line x1="-38" y1="-15" x2="38" y2="-15" stroke="#FAF6EE" strokeWidth="1.5" />
                  <line x1="-20" y1="-30" x2="20" y2="-30" stroke="#FAF6EE" strokeWidth="1.5" />
                  {/* Rectangular Hut Walls */}
                  <rect
                    x="-46"
                    y="0"
                    width="92"
                    height="52"
                    fill="rgba(94, 34, 22, 0.6)"
                    stroke="#FAF6EE"
                    strokeWidth="2.2"
                  />
                  {/* Central Doorway & Cross-hatched courtyard */}
                  <rect x="-12" y="16" width="24" height="36" fill="none" stroke="#FAF6EE" strokeWidth="1.8" />
                </g>
              ))}

              {/* Warli Community Figures around the Village (Carrying Water Pots & Harvesting) */}
              <WarliHuman x={285} y={335} scale={0.76} holdingPot />
              <WarliHuman x={915} y={335} scale={0.76} holdingPot />
              <WarliHuman x={295} y={645} scale={0.82} />
              <WarliHuman x={345} y={645} scale={0.82} />
              <WarliHuman x={855} y={645} scale={0.82} />
              <WarliHuman x={905} y={645} scale={0.82} />

              {/* Warli Geometric Animals (Deer & Horses built from facing triangles) */}
              {[
                { ax: 355, ay: 185, flip: 1 },
                { ax: 845, ay: 185, flip: -1 },
                { ax: 445, ay: 665, flip: 1 },
                { ax: 755, ay: 665, flip: -1 }
              ].map(({ ax, ay, flip }, idx) => (
                <g key={`animal-${idx}`} transform={`translate(${ax}, ${ay}) scale(${flip}, 1)`}>
                  {/* Two horizontal apex-joined triangles for animal body */}
                  <polygon points="-22,-10 0,0 -22,10" fill="#FAF6EE" />
                  <polygon points="22,-10 0,0 22,10" fill="#FAF6EE" />
                  {/* Neck, Head & Antlers/Ears */}
                  <polyline points="20,-8 30,-24 39,-20" fill="none" stroke="#FAF6EE" strokeWidth="2.2" />
                  <line x1="30" y1="-24" x2="26" y2="-33" stroke="#FAF6EE" strokeWidth="1.8" />
                  <line x1="30" y1="-24" x2="34" y2="-33" stroke="#FAF6EE" strokeWidth="1.8" />
                  {/* Tail & Four Legs */}
                  <line x1="-22" y1="-6" x2="-31" y2="-15" stroke="#FAF6EE" strokeWidth="2" />
                  <line x1="-18" y1="9" x2="-21" y2="24" stroke="#FAF6EE" strokeWidth="2" />
                  <line x1="-11" y1="7" x2="-12" y2="24" stroke="#FAF6EE" strokeWidth="2" />
                  <line x1="12" y1="7" x2="11" y2="24" stroke="#FAF6EE" strokeWidth="2" />
                  <line x1="19" y1="9" x2="22" y2="24" stroke="#FAF6EE" strokeWidth="2" />
                </g>
              ))}
            </g>

            {/* ===================================================================== */}
            {/* LAYER 3: INTERACTIVE CALLOUT ANNOTATIONS WHEN TOGGLED                 */}
            {/* ===================================================================== */}
            {showWarliBadges && (
              <g className="pointer-events-none">
                {[
                  { x: 600, y: 272, label: 'WARLI · Tarpa Spiral Dance & Geometric Figures' },
                  { x: 200, y: 225, label: 'WARLI · Village Hut & Community Life' },
                  { x: 185, y: 495, label: 'WARLI · Geometric Sahyadri Forest Tree' },
                  { x: 365, y: 135, label: 'WARLI · Apex-Triangle Forest Fauna' }
                ].map((b, i) => (
                  <g key={`wb-${i}`} transform={`translate(${b.x}, ${b.y})`}>
                    <rect
                      x="-148"
                      y="-16"
                      width="296"
                      height="30"
                      rx="4"
                      fill="#14110F"
                      fillOpacity="0.92"
                      stroke="#FAF6EE"
                      strokeWidth="1.8"
                    />
                    <text
                      x="0"
                      y="4"
                      textAnchor="middle"
                      fill="#FAF6EE"
                      fontSize="12.5"
                      fontWeight="600"
                      fontFamily="Plus Jakarta Sans, sans-serif"
                    >
                      {b.label}
                    </text>
                  </g>
                ))}
              </g>
            )}

            {showKalamkariBadges && (
              <g className="pointer-events-none">
                {[
                  { x: 600, y: 92, label: 'KALAMKARI · Blooming Lotus & Natural Dye Palette' },
                  { x: 905, y: 190, label: 'KALAMKARI · Kalpavriksha Scrolling Vines & Leaves' },
                  { x: 600, y: 635, label: 'KALAMKARI · Ornate Lotus Mandala Ring' },
                  { x: 600, y: 744, label: 'KALAMKARI · Repeating Hashiya Floral Border' }
                ].map((b, i) => (
                  <g key={`kb-${i}`} transform={`translate(${b.x}, ${b.y})`}>
                    <rect
                      x="-160"
                      y="-16"
                      width="320"
                      height="30"
                      rx="4"
                      fill="#14110F"
                      fillOpacity="0.92"
                      stroke="#E09F3E"
                      strokeWidth="1.8"
                    />
                    <text
                      x="0"
                      y="4"
                      textAnchor="middle"
                      fill="#F4D58D"
                      fontSize="12.5"
                      fontWeight="600"
                      fontFamily="Plus Jakarta Sans, sans-serif"
                    >
                      {b.label}
                    </text>
                  </g>
                ))}
              </g>
            )}
          </svg>
        </div>

        {/* Museum Brass Plaque Mounted on Frame Base */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-3 py-2 rounded bg-[#18120E] border border-[#C89D54]/40 text-xs text-[#D6CEBE]">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#E5B869] tracking-wide">
              SANGAMAM: WARLI × KALAMKARI
            </span>
            <span aria-hidden="true">·</span>
            <span>CO2 — Regional Painting Fusion</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-[#A89F91]">
            <span>Active Layer Focus:</span>
            <span className="font-semibold text-[#F7F4EE]">
              {highlightMode === 'default' && 'Balanced Full Artwork'}
              {highlightMode === 'warli' && '1. Warli Elements Highlighted (Rice-Paste Geometric Layer)'}
              {highlightMode === 'kalamkari' && '2. Kalamkari Elements Highlighted (Botanical Vine & Border Layer)'}
              {highlightMode === 'both-annotated' && '3. Dual Synthesis with Curatorial Callouts'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
