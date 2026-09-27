import * as THREE from 'three';

const dataUrlCache: Record<string, string> = {};
const textureCache: Record<string, THREE.CanvasTexture> = {};

function drawWarliFigure(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  scale = 1,
  color = '#FAF6EE',
  armAngle = 0.4
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 2.2;

  // Head
  ctx.beginPath();
  ctx.arc(0, -24, 5.5, 0, Math.PI * 2);
  ctx.fill();

  // Neck
  ctx.beginPath();
  ctx.moveTo(0, -18);
  ctx.lineTo(0, -14);
  ctx.stroke();

  // Upper triangle (torso)
  ctx.beginPath();
  ctx.moveTo(-10, -14);
  ctx.lineTo(10, -14);
  ctx.lineTo(0, 0);
  ctx.closePath();
  ctx.fill();

  // Lower triangle (pelvis/skirt)
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(-9, 13);
  ctx.lineTo(9, 13);
  ctx.closePath();
  ctx.fill();

  // Arms
  ctx.beginPath();
  ctx.moveTo(-9, -13);
  ctx.lineTo(-18, -13 - Math.sin(armAngle) * 10);
  ctx.lineTo(-22, -4);
  ctx.moveTo(9, -13);
  ctx.lineTo(18, -13 + Math.sin(armAngle) * 10);
  ctx.lineTo(22, -4);
  ctx.stroke();

  // Legs
  ctx.beginPath();
  ctx.moveTo(-5, 13);
  ctx.lineTo(-8, 24);
  ctx.lineTo(-4, 28);
  ctx.moveTo(5, 13);
  ctx.lineTo(8, 24);
  ctx.lineTo(12, 28);
  ctx.stroke();

  ctx.restore();
}

export function renderExhibitCanvas(exhibitId: string, width = 900, height = 640): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  if (exhibitId === 'indus-valley') {
    // Mohenjo-daro Dancing Girl & Harappan Seals study
    const grad = ctx.createRadialGradient(width * 0.5, height * 0.45, 40, width * 0.5, height * 0.5, width * 0.65);
    grad.addColorStop(0, '#2A3830');
    grad.addColorStop(0.6, '#18221D');
    grad.addColorStop(1, '#0E1411');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Subtle Harappan fired-brick grid pattern in background
    ctx.strokeStyle = 'rgba(200, 157, 84, 0.08)';
    ctx.lineWidth = 1;
    for (let y = 40; y < height - 40; y += 28) {
      ctx.beginPath();
      ctx.moveTo(40, y);
      ctx.lineTo(width - 40, y);
      ctx.stroke();
      const offset = (y / 28) % 2 === 0 ? 0 : 28;
      for (let x = 40 + offset; x < width - 40; x += 56) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + 28);
        ctx.stroke();
      }
    }

    // Museum Inner Border
    ctx.strokeStyle = '#C89D54';
    ctx.lineWidth = 3;
    ctx.strokeRect(26, 26, width - 52, height - 52);
    ctx.strokeStyle = 'rgba(200, 157, 84, 0.35)';
    ctx.lineWidth = 1;
    ctx.strokeRect(36, 36, width - 72, height - 72);

    // Indus Script Pictograms along top frieze
    ctx.save();
    ctx.strokeStyle = 'rgba(216, 184, 120, 0.35)';
    ctx.lineWidth = 2.5;
    const glyphY = 78;
    for (let i = 0; i < 9; i++) {
      const gx = 150 + i * 75;
      ctx.strokeRect(gx - 18, glyphY - 18, 36, 36);
      ctx.beginPath();
      if (i % 3 === 0) {
        // Fish sign
        ctx.ellipse(gx, glyphY, 8, 13, 0, 0, Math.PI * 2);
        ctx.moveTo(gx - 6, glyphY + 11);
        ctx.lineTo(gx - 11, glyphY + 16);
        ctx.moveTo(gx + 6, glyphY + 11);
        ctx.lineTo(gx + 11, glyphY + 16);
      } else if (i % 3 === 1) {
        // Jar/U sign
        ctx.moveTo(gx - 10, glyphY - 10);
        ctx.quadraticCurveTo(gx, glyphY + 22, gx + 10, glyphY - 10);
        ctx.moveTo(gx - 13, glyphY - 6);
        ctx.lineTo(gx - 7, glyphY - 6);
        ctx.moveTo(gx + 7, glyphY - 6);
        ctx.lineTo(gx + 13, glyphY - 6);
      } else {
        // Spoked wheel sign
        ctx.arc(gx, glyphY, 12, 0, Math.PI * 2);
        ctx.moveTo(gx - 12, glyphY);
        ctx.lineTo(gx + 12, glyphY);
        ctx.moveTo(gx, glyphY - 12);
        ctx.lineTo(gx, glyphY + 12);
      }
      ctx.stroke();
    }
    ctx.restore();

    // Central spotlight halo
    const halo = ctx.createRadialGradient(width / 2, height * 0.5, 10, width / 2, height * 0.5, 220);
    halo.addColorStop(0, 'rgba(138, 178, 148, 0.25)');
    halo.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(width / 2, height * 0.5, 220, 0, Math.PI * 2);
    ctx.fill();

    // Stone pedestal base
    ctx.fillStyle = '#3B322B';
    ctx.fillRect(width / 2 - 95, height - 110, 190, 42);
    ctx.strokeStyle = '#C89D54';
    ctx.strokeRect(width / 2 - 95, height - 110, 190, 42);

    // Bronze Dancing Girl Figure (Patina Bronze + Verdigris highlights)
    ctx.save();
    ctx.translate(width / 2, height * 0.52);

    const bronzeGrad = ctx.createLinearGradient(-45, -180, 50, 180);
    bronzeGrad.addColorStop(0, '#8DAF93');
    bronzeGrad.addColorStop(0.35, '#5A755E');
    bronzeGrad.addColorStop(0.7, '#4A3B28');
    bronzeGrad.addColorStop(1, '#6D8972');

    ctx.fillStyle = bronzeGrad;
    ctx.strokeStyle = '#A8C9AE';
    ctx.lineWidth = 2.2;

    // Coiled hair bun & head tilted slightly
    ctx.beginPath();
    ctx.arc(16, -152, 14, 0, Math.PI * 2); // hair bun
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(0, -155, 20, 24, -0.1, 0, Math.PI * 2); // head
    ctx.fill();
    ctx.stroke();

    // Necklace with 3 pendants
    ctx.strokeStyle = '#D8B878';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(0, -125, 16, 0.2, Math.PI - 0.2);
    ctx.stroke();
    [-8, 0, 8].forEach((nx) => {
      ctx.fillStyle = '#D8B878';
      ctx.beginPath();
      ctx.arc(nx, -107, 3.5, 0, Math.PI * 2);
      ctx.fill();
    });

    // Elongated torso & contrapposto hips
    ctx.fillStyle = bronzeGrad;
    ctx.strokeStyle = '#9BBFA1';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-22, -124);
    ctx.lineTo(22, -124);
    ctx.quadraticCurveTo(14, -65, 25, -20);
    ctx.quadraticCurveTo(0, 2, -24, -22);
    ctx.quadraticCurveTo(-13, -65, -22, -124);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Right arm (cocked on hip)
    ctx.lineWidth = 11;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#658269';
    ctx.beginPath();
    ctx.moveTo(-20, -118);
    ctx.lineTo(-56, -72);
    ctx.lineTo(-24, -26);
    ctx.stroke();
    // 4 Bangles on right arm
    ctx.strokeStyle = '#D8B878';
    ctx.lineWidth = 2.5;
    [-110, -104, -42, -36].forEach((ry) => {
      ctx.beginPath();
      ctx.moveTo(-32, ry);
      ctx.lineTo(-22, ry + 5);
      ctx.stroke();
    });

    // Left arm (completely covered in 24 stacked bangles resting on left thigh)
    ctx.strokeStyle = '#658269';
    ctx.lineWidth = 12;
    ctx.beginPath();
    ctx.moveTo(21, -118);
    ctx.lineTo(36, -62);
    ctx.lineTo(20, 8);
    ctx.stroke();

    // Draw the famous stacked bangles along the entire left arm
    ctx.strokeStyle = '#C7D9C8';
    ctx.lineWidth = 2.2;
    for (let b = 0; b < 18; b++) {
      const t = b / 18;
      const bx = t < 0.5 ? 21 + t * 2 * 15 : 36 - (t - 0.5) * 2 * 16;
      const by = -115 + t * 118;
      ctx.beginPath();
      ctx.moveTo(bx - 7, by - 2);
      ctx.lineTo(bx + 7, by + 2);
      ctx.stroke();
    }

    // Legs
    ctx.strokeStyle = '#5D7861';
    ctx.lineWidth = 13;
    // Right leg straight
    ctx.beginPath();
    ctx.moveTo(-13, -15);
    ctx.lineTo(-15, 95);
    ctx.lineTo(-12, 185);
    ctx.stroke();
    // Left leg slightly bent forward at knee
    ctx.beginPath();
    ctx.moveTo(14, -15);
    ctx.lineTo(24, 88);
    ctx.lineTo(14, 185);
    ctx.stroke();

    ctx.restore();

    // Museum Label Footer
    ctx.fillStyle = '#D8B878';
    ctx.font = '600 16px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('INDUS VALLEY CIVILIZATION · c. 2300–1750 BCE · MOHENJO-DARO', width / 2, height - 42);
  } else if (exhibitId === 'ajanta') {
    // Ajanta Cave 1 Mural — Bodhisattva Padmapani & Lotus Pond
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#2B1B12');
    grad.addColorStop(0.5, '#4A2B18');
    grad.addColorStop(1, '#1E140E');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Mineral plaster texture dots
    for (let i = 0; i < 450; i++) {
      ctx.fillStyle = i % 2 === 0 ? 'rgba(218, 165, 102, 0.06)' : 'rgba(46, 89, 114, 0.07)';
      ctx.beginPath();
      ctx.arc((i * 73) % width, (i * 137) % height, (i % 6) + 2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Ornate Ajanta ceiling lotus medallion border
    ctx.strokeStyle = '#D89E54';
    ctx.lineWidth = 3;
    ctx.strokeRect(26, 26, width - 52, height - 52);

    // Radiant Nimbus (Prabhamandala) behind Bodhisattva
    const nimbus = ctx.createRadialGradient(width / 2, height * 0.45, 20, width / 2, height * 0.45, 190);
    nimbus.addColorStop(0, 'rgba(235, 188, 106, 0.45)');
    nimbus.addColorStop(0.6, 'rgba(186, 102, 48, 0.25)');
    nimbus.addColorStop(1, 'rgba(43, 27, 18, 0)');
    ctx.fillStyle = nimbus;
    ctx.beginPath();
    ctx.arc(width / 2, height * 0.45, 190, 0, Math.PI * 2);
    ctx.fill();

    // Lapis Lazuli & Terra Verte foliage background
    const lotusPositions = [
      [170, 220],
      [730, 210],
      [150, 420],
      [740, 430],
      [250, 140],
      [650, 140]
    ];
    lotusPositions.forEach(([lx, ly]) => {
      // Green lotus pad
      ctx.fillStyle = '#3A5F4B';
      ctx.strokeStyle = '#8FB399';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.ellipse(lx, ly + 35, 42, 16, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Blooming lotus petals
      ctx.fillStyle = '#C96A4B';
      for (let p = -3; p <= 3; p++) {
        ctx.save();
        ctx.translate(lx, ly);
        ctx.rotate(p * 0.28);
        ctx.beginPath();
        ctx.ellipse(0, -18, 9, 24, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    });

    // Central Bodhisattva Padmapani figure in Tribhanga grace
    ctx.save();
    ctx.translate(width / 2, height * 0.54);

    // Shoulders & Torso (Warm Ochre Chiaroscuro)
    const skinGrad = ctx.createRadialGradient(-10, -40, 15, 0, 0, 130);
    skinGrad.addColorStop(0, '#E6B37E');
    skinGrad.addColorStop(0.6, '#BA7641');
    skinGrad.addColorStop(1, '#6E3D1E');
    ctx.fillStyle = skinGrad;
    ctx.strokeStyle = '#4A210D';
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.moveTo(-95, 30);
    ctx.quadraticCurveTo(-85, -40, -15, -45);
    ctx.lineTo(25, -42);
    ctx.quadraticCurveTo(95, -35, 105, 45);
    ctx.lineTo(65, 175);
    ctx.lineTo(-65, 175);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Sacred Pearl Upavita & Necklace
    ctx.strokeStyle = '#F7EFE2';
    ctx.lineWidth = 4;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.arc(5, -35, 42, 0.2, Math.PI - 0.2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-38, -35);
    ctx.quadraticCurveTo(-10, 70, 48, 155);
    ctx.stroke();
    ctx.setLineDash([]);

    // Tilted Face (Tribhanga)
    ctx.save();
    ctx.translate(0, -98);
    ctx.rotate(-0.12);
    ctx.fillStyle = skinGrad;
    ctx.beginPath();
    ctx.ellipse(0, 0, 46, 58, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Tall Jeweled Mukuta (Crown) with Lapis Lazuli & Gold
    ctx.fillStyle = '#D9A44E';
    ctx.strokeStyle = '#523012';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(-46, -24);
    ctx.lineTo(-32, -108);
    ctx.lineTo(0, -142);
    ctx.lineTo(32, -108);
    ctx.lineTo(46, -24);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Lapis Lazuli jewels in crown
    ctx.fillStyle = '#24528A';
    [
      [0, -102, 11],
      [-22, -64, 8],
      [22, -64, 8],
      [0, -56, 13]
    ].forEach(([jx, jy, jr]) => {
      ctx.beginPath();
      ctx.arc(jx, jy, jr, 0, Math.PI * 2);
      ctx.fill();
    });

    // Arching brows & half-closed lotus eyes (Karuna)
    ctx.strokeStyle = '#2B1408';
    ctx.lineWidth = 2.8;
    ctx.beginPath();
    ctx.moveTo(-32, -14);
    ctx.quadraticCurveTo(-16, -26, -2, -14);
    ctx.moveTo(2, -14);
    ctx.quadraticCurveTo(16, -26, 32, -14);
    ctx.stroke();

    // Downcast meditative eyes
    ctx.fillStyle = '#F7EFE2';
    ctx.beginPath();
    ctx.ellipse(-17, -4, 12, 5, 0, 0, Math.PI);
    ctx.ellipse(17, -4, 12, 5, 0, 0, Math.PI);
    ctx.fill();
    ctx.stroke();

    // Chiaroscuro nose bridge highlight
    ctx.strokeStyle = '#F5D6AE';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, -12);
    ctx.lineTo(-2, 16);
    ctx.stroke();

    // Serene lips
    ctx.fillStyle = '#B8533C';
    ctx.beginPath();
    ctx.ellipse(0, 32, 14, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Right hand gracefully holding the Blue Lotus (Nilofar)
    ctx.strokeStyle = '#4A210D';
    ctx.fillStyle = '#D49460';
    ctx.beginPath();
    ctx.arc(105, -25, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Blue Lotus stem & Lapis petals
    ctx.strokeStyle = '#4B7A59';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(105, -25);
    ctx.quadraticCurveTo(135, -80, 120, -135);
    ctx.stroke();

    ctx.save();
    ctx.translate(120, -142);
    for (let lp = -3; lp <= 3; lp++) {
      ctx.save();
      ctx.rotate(lp * 0.25);
      ctx.fillStyle = lp === 0 ? '#3B78B8' : '#265385';
      ctx.strokeStyle = '#E8C57B';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.ellipse(0, -18, 8, 22, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }
    ctx.restore();

    ctx.restore();

    ctx.fillStyle = '#E8C57B';
    ctx.font = '600 16px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('AJANTA CAVE MURALS · BODHISATTVA PADMAPANI (CAVE 1) · c. 5TH CENTURY CE', width / 2, height - 42);
  } else if (exhibitId === 'chola-period') {
    // Imperial Chola Nataraja within the Flaming Prabhavali
    const grad = ctx.createRadialGradient(width / 2, height * 0.48, 30, width / 2, height * 0.5, width * 0.65);
    grad.addColorStop(0, '#3D2714');
    grad.addColorStop(0.55, '#1F140B');
    grad.addColorStop(1, '#100A06');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = '#C89D54';
    ctx.lineWidth = 3;
    ctx.strokeRect(26, 26, width - 52, height - 52);

    const cx = width / 2;
    const cy = height * 0.47;
    const ringRadius = 185;

    // Outer Prabhavali (Ring of Cosmic Fire)
    ctx.strokeStyle = '#D99E43';
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.arc(cx, cy, ringRadius, 0.25, Math.PI * 2 - 0.25);
    ctx.stroke();

    ctx.strokeStyle = '#F5CF7E';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(cx, cy, ringRadius - 7, 0, Math.PI * 2);
    ctx.stroke();

    // 27 Flame tongues (Jvala) around the Prabhavali
    for (let i = 0; i < 27; i++) {
      const angle = -Math.PI * 0.5 + ((i - 13) / 14) * Math.PI * 0.88;
      const fx = cx + Math.cos(angle) * (ringRadius + 8);
      const fy = cy + Math.sin(angle) * (ringRadius + 8);
      ctx.save();
      ctx.translate(fx, fy);
      ctx.rotate(angle + Math.PI / 2);
      ctx.fillStyle = '#E8B04F';
      ctx.beginPath();
      ctx.moveTo(-8, 0);
      ctx.quadraticCurveTo(-12, -18, 0, -28);
      ctx.quadraticCurveTo(12, -18, 8, 0);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    // Flying braided hair locks (Jata) radiating horizontally
    ctx.strokeStyle = '#B88435';
    ctx.lineWidth = 3;
    for (let side of [-1, 1]) {
      for (let j = -2; j <= 2; j++) {
        ctx.beginPath();
        ctx.moveTo(cx + side * 22, cy - 88 + j * 5);
        ctx.bezierCurveTo(
          cx + side * 80,
          cy - 105 + j * 12,
          cx + side * 125,
          cy - 72 + j * 12,
          cx + side * 168,
          cy - 88 + j * 14
        );
        ctx.stroke();
      }
    }

    // Shiva Nataraja Figure in Panchaloha Bronze
    ctx.fillStyle = '#D9A048';
    ctx.strokeStyle = '#FFF0C2';
    ctx.lineWidth = 2;

    // Head & Crown
    ctx.beginPath();
    ctx.arc(cx, cy - 88, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx - 16, cy - 105);
    ctx.lineTo(cx, cy - 142);
    ctx.lineTo(cx + 16, cy - 105);
    ctx.closePath();
    ctx.fill();

    // Torso
    ctx.beginPath();
    ctx.moveTo(cx - 32, cy - 60);
    ctx.lineTo(cx + 32, cy - 60);
    ctx.lineTo(cx + 16, cy + 5);
    ctx.lineTo(cx - 16, cy + 5);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Four Arms:
    ctx.lineCap = 'round';
    ctx.lineWidth = 10;
    ctx.strokeStyle = '#D9A048';
    // 1. Upper Right Arm (holding Damaru drum)
    ctx.beginPath();
    ctx.moveTo(cx - 28, cy - 55);
    ctx.lineTo(cx - 95, cy - 75);
    ctx.lineTo(cx - 130, cy - 45);
    ctx.stroke();
    // Damaru Drum
    ctx.fillStyle = '#F5CF7E';
    ctx.beginPath();
    ctx.moveTo(cx - 140, cy - 58);
    ctx.lineTo(cx - 120, cy - 34);
    ctx.lineTo(cx - 140, cy - 34);
    ctx.lineTo(cx - 120, cy - 58);
    ctx.closePath();
    ctx.fill();

    // 2. Upper Left Arm (holding Agni flame)
    ctx.beginPath();
    ctx.moveTo(cx + 28, cy - 55);
    ctx.lineTo(cx + 95, cy - 75);
    ctx.lineTo(cx + 130, cy - 45);
    ctx.stroke();
    // Agni Flame in palm
    ctx.fillStyle = '#FFAD33';
    ctx.beginPath();
    ctx.moveTo(cx + 122, cy - 50);
    ctx.quadraticCurveTo(cx + 130, cy - 82, cx + 138, cy - 50);
    ctx.fill();

    // 3. Lower Right Arm (Abhaya Mudra — fear not)
    ctx.beginPath();
    ctx.moveTo(cx - 24, cy - 45);
    ctx.lineTo(cx - 62, cy - 8);
    ctx.lineTo(cx - 46, cy - 38);
    ctx.stroke();

    // 4. Lower Left Arm (Gajahasta sweeping across chest pointing to raised foot)
    ctx.beginPath();
    ctx.moveTo(cx + 24, cy - 45);
    ctx.quadraticCurveTo(cx + 5, cy - 10, cx - 55, cy + 25);
    ctx.stroke();

    // Right Leg planted on Apasmara
    ctx.lineWidth = 12;
    ctx.beginPath();
    ctx.moveTo(cx + 10, cy + 5);
    ctx.lineTo(cx + 35, cy + 68);
    ctx.lineTo(cx + 8, cy + 128);
    ctx.stroke();

    // Left Leg raised gracefully across body
    ctx.beginPath();
    ctx.moveTo(cx - 10, cy + 5);
    ctx.lineTo(cx + 22, cy + 48);
    ctx.lineTo(cx - 78, cy + 58);
    ctx.stroke();

    // Apasmara & Padmapitha Lotus Pedestal
    ctx.fillStyle = '#8C6224';
    ctx.beginPath();
    ctx.ellipse(cx, cy + 145, 70, 18, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#634316';
    ctx.fillRect(cx - 95, cy + 160, 190, 36);
    ctx.strokeStyle = '#F5CF7E';
    ctx.strokeRect(cx - 95, cy + 160, 190, 36);

    ctx.fillStyle = '#F5CF7E';
    ctx.font = '600 16px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('IMPERIAL CHOLA BRONZE · SHIVA AS NATARAJA · THANJAVUR (c. 10TH–11TH CENTURY CE)', width / 2, height - 42);
  } else if (exhibitId === 'mughal-art') {
    // Imperial Mughal Miniature Folio with Lapis & Gold Hashiya Border
    // Outer Lapis Lazuli Hashiya Border
    ctx.fillStyle = '#152B47';
    ctx.fillRect(0, 0, width, height);

    // Gold leaf arabesque flecks on Hashiya
    ctx.strokeStyle = 'rgba(229, 188, 98, 0.45)';
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 24; i++) {
      const bx = 45 + (i % 8) * 112;
      const by = i < 8 ? 42 : i < 16 ? height - 42 : 120 + (i - 16) * 55;
      ctx.beginPath();
      ctx.arc(bx, by, 12, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Crimson & Gold inner rulings (Jadwal)
    ctx.fillStyle = '#7D1E1D';
    ctx.fillRect(68, 62, width - 136, height - 132);
    ctx.strokeStyle = '#E5BC62';
    ctx.lineWidth = 4;
    ctx.strokeRect(68, 62, width - 136, height - 132);

    // Inner Wasli Paper Garden & Pavilion Scene
    const skyGrad = ctx.createLinearGradient(88, 80, 88, height - 90);
    skyGrad.addColorStop(0, '#234F7A');
    skyGrad.addColorStop(0.45, '#D9B675');
    skyGrad.addColorStop(0.46, '#2E593F');
    skyGrad.addColorStop(1, '#1A3826');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(88, 80, width - 176, height - 168);
    ctx.strokeStyle = '#E5BC62';
    ctx.lineWidth = 2;
    ctx.strokeRect(88, 80, width - 176, height - 168);

    // Pietra Dura Marble Cusped Arch (Shahjahani Arch)
    ctx.strokeStyle = '#F7F3EB';
    ctx.fillStyle = 'rgba(247, 243, 235, 0.14)';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(180, height - 88);
    ctx.lineTo(180, 190);
    ctx.quadraticCurveTo(width / 2, 95, width - 180, 190);
    ctx.lineTo(width - 180, height - 88);
    ctx.stroke();

    // Radiant Gold Solar Nimbus behind Royal Portrait
    const cx = width / 2;
    const cy = 240;
    const nimbus = ctx.createRadialGradient(cx, cy, 12, cx, cy, 82);
    nimbus.addColorStop(0, '#FFF2B2');
    nimbus.addColorStop(0.65, '#D49E36');
    nimbus.addColorStop(1, 'rgba(212, 158, 54, 0)');
    ctx.fillStyle = nimbus;
    ctx.beginPath();
    ctx.arc(cx, cy, 82, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#FFF2B2';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, 66, 0, Math.PI * 2);
    ctx.stroke();

    // Imperial Figure in Jama & Turban holding a Falcon / Rose
    ctx.fillStyle = '#8F2422';
    ctx.strokeStyle = '#E5BC62';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cx - 65, height - 90);
    ctx.quadraticCurveTo(cx - 50, 290, cx - 22, 275);
    ctx.lineTo(cx + 22, 275);
    ctx.quadraticCurveTo(cx + 50, 290, cx + 65, height - 90);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Profile Head & Jeweled Sarpech Turban
    ctx.fillStyle = '#E8C39E';
    ctx.beginPath();
    ctx.arc(cx, cy, 26, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#D43F33';
    ctx.beginPath();
    ctx.ellipse(cx - 2, cy - 16, 30, 18, -0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#FFF2B2';
    ctx.stroke();

    // Pietra Dura Poppies & Cypress trees flanking
    [255, width - 255].forEach((tx) => {
      // Cypress tree
      ctx.fillStyle = '#163D29';
      ctx.strokeStyle = '#7BA886';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(tx - 18, height - 90);
      ctx.quadraticCurveTo(tx - 24, 250, tx, 165);
      ctx.quadraticCurveTo(tx + 24, 250, tx + 18, height - 90);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Crimson Poppy blossoms (Parchin Kari motif)
      for (let py of [350, 410, 465]) {
        ctx.fillStyle = '#C92B27';
        ctx.beginPath();
        ctx.arc(tx + 42 * (tx < width / 2 ? 1 : -1), py, 11, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#F2C94C';
        ctx.beginPath();
        ctx.arc(tx + 42 * (tx < width / 2 ? 1 : -1), py, 4, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    ctx.fillStyle = '#F5D996';
    ctx.font = '600 16px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('MUGHAL IMPERIAL KARKHANA · MINIATURE FOLIO & HASHIYA · c. 16TH–18TH CENTURY CE', width / 2, height - 26);
  } else if (exhibitId === 'madhubani-art') {
    // Madhubani / Mithila Kohbar & Twin Fish Mandala with Double-Line Borders
    ctx.fillStyle = '#F5EBD6'; // Handmade paper / primed ground
    ctx.fillRect(0, 0, width, height);

    // Double-line geometric border (Do-hari Rekha)
    ctx.strokeStyle = '#1C1613';
    ctx.lineWidth = 4;
    ctx.strokeRect(22, 22, width - 44, height - 68);
    ctx.strokeRect(32, 32, width - 64, height - 88);
    ctx.strokeRect(64, 64, width - 128, height - 152);

    // Zigzag & Lotus petal border fill
    ctx.fillStyle = '#C0392B';
    for (let x = 36; x < width - 68; x += 28) {
      ctx.beginPath();
      ctx.moveTo(x, 34);
      ctx.lineTo(x + 14, 62);
      ctx.lineTo(x + 28, 34);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(x, height - 58);
      ctx.lineTo(x + 14, height - 86);
      ctx.lineTo(x + 28, height - 58);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

    const cx = width / 2;
    const cy = (height - 46) / 2;

    // Kachni background cross-hatching rays
    ctx.strokeStyle = 'rgba(192, 57, 43, 0.28)';
    ctx.lineWidth = 1.5;
    for (let a = 0; a < 72; a++) {
      const ang = (a / 72) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(ang) * 60, cy + Math.sin(ang) * 60);
      ctx.lineTo(cx + Math.cos(ang) * 320, cy + Math.sin(ang) * 210);
      ctx.stroke();
    }

    // Central Purain (Sacred Lotus Ring of Mithila Kohbar)
    for (let ring = 3; ring >= 1; ring--) {
      const r = ring * 64;
      const petals = ring * 8;
      for (let p = 0; p < petals; p++) {
        const ang = (p / petals) * Math.PI * 2;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(ang);
        ctx.fillStyle = ring === 3 ? '#D35400' : ring === 2 ? '#F1C40F' : '#C0392B';
        ctx.strokeStyle = '#1C1613';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.ellipse(0, -r * 0.72, r * 0.22, r * 0.42, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    }

    // Center Medallion with Twin Auspicious Fishes (Matsya)
    ctx.fillStyle = '#1F618D';
    ctx.strokeStyle = '#1C1613';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.arc(cx, cy, 62, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    [-20, 20].forEach((offsetX, idx) => {
      ctx.save();
      ctx.translate(cx + offsetX, cy);
      ctx.scale(1, idx === 0 ? 1 : -1);
      ctx.fillStyle = '#F1C40F';
      ctx.strokeStyle = '#1C1613';
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.ellipse(0, 0, 14, 34, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      // Fish scales
      for (let sy = -18; sy <= 18; sy += 9) {
        ctx.beginPath();
        ctx.moveTo(-12, sy);
        ctx.lineTo(12, sy);
        ctx.stroke();
      }
      ctx.restore();
    });

    // Four Corner Peacocks / Lotus Rosettes
    [
      [155, 145],
      [width - 155, 145],
      [155, height - 175],
      [width - 155, height - 175]
    ].forEach(([px, py]) => {
      ctx.fillStyle = '#27AE60';
      ctx.strokeStyle = '#1C1613';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(px, py, 38, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#C0392B';
      ctx.beginPath();
      ctx.arc(px, py, 20, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    });

    // Bottom plaque bar
    ctx.fillStyle = '#1C1613';
    ctx.fillRect(0, height - 46, width, 46);
    ctx.fillStyle = '#F5D996';
    ctx.font = '600 16px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('MADHUBANI / MITHILA ART · KOHBAR & ARIPAN TRADITION · BIHAR', width / 2, height - 18);
  } else {
    // Warli Art — Chaukat & Tarpa Dance Spiral on Terracotta Geru Earth
    const grad = ctx.createRadialGradient(width / 2, height / 2, 40, width / 2, height / 2, width * 0.7);
    grad.addColorStop(0, '#8E3722');
    grad.addColorStop(0.7, '#6E2716');
    grad.addColorStop(1, '#4A180D');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Rice-paste white Chaukat geometric border
    ctx.strokeStyle = '#FAF6EE';
    ctx.lineWidth = 2.5;
    ctx.strokeRect(28, 26, width - 56, height - 74);
    ctx.strokeRect(42, 40, width - 84, height - 102);

    // Triangle chevron border along top and bottom
    for (let x = 44; x < width - 64; x += 22) {
      ctx.beginPath();
      ctx.moveTo(x, 40);
      ctx.lineTo(x + 11, 26);
      ctx.lineTo(x + 22, 40);
      ctx.moveTo(x, height - 62);
      ctx.lineTo(x + 11, height - 48);
      ctx.lineTo(x + 22, height - 62);
      ctx.stroke();
    }

    // Sun & Moon witnesses in upper corners
    ctx.beginPath();
    ctx.arc(115, 105, 22, 0, Math.PI * 2);
    ctx.stroke();
    for (let r = 0; r < 12; r++) {
      const a = (r / 12) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(115 + Math.cos(a) * 25, 105 + Math.sin(a) * 25);
      ctx.lineTo(115 + Math.cos(a) * 35, 105 + Math.sin(a) * 35);
      ctx.stroke();
    }

    // Crescent Moon
    ctx.beginPath();
    ctx.arc(width - 115, 105, 22, 0.3, Math.PI * 1.4);
    ctx.stroke();

    // Central Tarpa Dance Circle (16 Geometric Warli Dancers holding hands around the Tarpa player)
    const cx = width / 2;
    const cy = (height - 46) / 2;

    // Central Tarpa Horn Musician
    drawWarliFigure(ctx, cx, cy, 1.15, '#FAF6EE', 0.2);
    // Tarpa wind horn
    ctx.strokeStyle = '#FAF6EE';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(cx + 8, cy - 22);
    ctx.lineTo(cx + 38, cy - 42);
    ctx.lineTo(cx + 44, cy - 32);
    ctx.closePath();
    ctx.stroke();

    // Ring of 14 Warli figures dancing in a circle
    const numDancers = 14;
    const circleRadius = 155;
    for (let i = 0; i < numDancers; i++) {
      const ang = (i / numDancers) * Math.PI * 2;
      const dx = cx + Math.cos(ang) * circleRadius;
      const dy = cy + Math.sin(ang) * (circleRadius * 0.85);
      drawWarliFigure(ctx, dx, dy, 0.82, '#FAF6EE', (i % 2) * 0.4);
    }

    // Connecting hand-chain ring
    ctx.strokeStyle = 'rgba(250, 246, 238, 0.55)';
    ctx.lineWidth = 1.8;
    ctx.setLineDash([6, 4]);
    ctx.beginPath();
    ctx.ellipse(cx, cy - 6, circleRadius, circleRadius * 0.85, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Warli Trees in lower left and right corners
    [135, width - 135].forEach((tx) => {
      const ty = height - 95;
      ctx.strokeStyle = '#FAF6EE';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(tx, ty);
      ctx.lineTo(tx, ty - 110);
      ctx.stroke();
      for (let b = 0; b < 5; b++) {
        const by = ty - 45 - b * 15;
        const bw = 48 - b * 7;
        ctx.beginPath();
        ctx.moveTo(tx - bw, by - 12);
        ctx.lineTo(tx, by);
        ctx.lineTo(tx + bw, by - 12);
        ctx.stroke();
      }
    });

    ctx.fillStyle = '#240E08';
    ctx.fillRect(0, height - 46, width, 46);
    ctx.fillStyle = '#FAF6EE';
    ctx.font = '600 16px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('WARLI INDIGENOUS ART · TARPA DANCE & CHAUKAT · NORTH SAHYADRI, MAHARASHTRA', width / 2, height - 18);
  }

  return canvas;
}

export function getExhibitDataUrl(exhibitId: string): string {
  if (!dataUrlCache[exhibitId]) {
    const canvas = renderExhibitCanvas(exhibitId, 900, 640);
    dataUrlCache[exhibitId] = canvas.toDataURL('image/png');
  }
  return dataUrlCache[exhibitId];
}

export function getExhibitThreeTexture(exhibitId: string): THREE.CanvasTexture {
  if (!textureCache[exhibitId]) {
    const canvas = renderExhibitCanvas(exhibitId, 900, 640);
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.needsUpdate = true;
    textureCache[exhibitId] = tex;
  }
  return textureCache[exhibitId];
}

export function createSectionPortalTexture(
  title: string,
  subtitle: string,
  badge: string,
  theme: 'map' | 'fusion'
): THREE.CanvasTexture {
  const key = `portal-${theme}`;
  if (textureCache[key]) return textureCache[key];

  const canvas = document.createElement('canvas');
  canvas.width = 960;
  canvas.height = 640;
  const ctx = canvas.getContext('2d')!;

  if (theme === 'map') {
    const grad = ctx.createLinearGradient(0, 0, 960, 640);
    grad.addColorStop(0, '#14222E');
    grad.addColorStop(0.5, '#1D3344');
    grad.addColorStop(1, '#101A22');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 960, 640);

    // Lat/Long Cartographic Grid
    ctx.strokeStyle = 'rgba(200, 157, 84, 0.16)';
    ctx.lineWidth = 1;
    for (let x = 80; x < 900; x += 80) {
      ctx.beginPath();
      ctx.moveTo(x, 40);
      ctx.lineTo(x, 600);
      ctx.stroke();
    }
    for (let y = 80; y < 600; y += 80) {
      ctx.beginPath();
      ctx.moveTo(40, y);
      ctx.lineTo(920, y);
      ctx.stroke();
    }

    // Glowing heritage nodes & connecting lines
    const nodes = [
      [340, 210, 'Jaipur'],
      [540, 220, 'Madhubani'],
      [440, 265, 'Khajuraho'],
      [330, 340, 'Warli'],
      [395, 330, 'Ajanta & Ellora'],
      [560, 355, 'Puri'],
      [445, 480, 'Thanjavur']
    ];
    ctx.strokeStyle = 'rgba(229, 184, 105, 0.45)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    nodes.forEach(([nx, ny], idx) => {
      if (idx === 0) ctx.moveTo(Number(nx), Number(ny));
      else ctx.lineTo(Number(nx), Number(ny));
    });
    ctx.stroke();

    nodes.forEach(([nx, ny, label]) => {
      ctx.fillStyle = '#E5B869';
      ctx.beginPath();
      ctx.arc(Number(nx), Number(ny), 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#F7F4EE';
      ctx.font = '600 15px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(String(label), Number(nx) + 14, Number(ny) + 5);
    });
  } else {
    // Fusion Gallery Warli x Kalamkari Preview
    const grad = ctx.createRadialGradient(480, 320, 40, 480, 320, 520);
    grad.addColorStop(0, '#7A2A1B');
    grad.addColorStop(0.65, '#471911');
    grad.addColorStop(1, '#1E110E');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 960, 640);

    // Kalamkari golden-mustard & indigo vines
    ctx.strokeStyle = '#D9A44E';
    ctx.lineWidth = 4;
    for (let r = 110; r <= 230; r += 60) {
      ctx.beginPath();
      ctx.arc(480, 310, r, 0, Math.PI * 2);
      ctx.stroke();
    }
    // Warli figures inside
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      drawWarliFigure(ctx, 480 + Math.cos(a) * 155, 310 + Math.sin(a) * 155, 0.85, '#FAF6EE', 0.3);
    }
  }

  // Frame border
  ctx.strokeStyle = '#C89D54';
  ctx.lineWidth = 5;
  ctx.strokeRect(24, 24, 912, 592);

  // Header & CTA overlay banner
  ctx.fillStyle = 'rgba(20, 17, 15, 0.82)';
  ctx.fillRect(140, 46, 680, 118);
  ctx.strokeStyle = '#C89D54';
  ctx.lineWidth = 2;
  ctx.strokeRect(140, 46, 680, 118);

  ctx.fillStyle = '#D8B878';
  ctx.font = '600 15px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(badge, 480, 76);

  ctx.fillStyle = '#F7F4EE';
  ctx.font = '700 32px "Cormorant Garamond", Georgia, serif';
  ctx.fillText(title, 480, 116);

  ctx.fillStyle = '#D6CEBE';
  ctx.font = '500 16px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(subtitle, 480, 146);

  // Bottom click banner
  ctx.fillStyle = '#C89D54';
  ctx.fillRect(310, 548, 340, 44);
  ctx.fillStyle = '#14110F';
  ctx.font = '700 16px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('CLICK TO LAUNCH INTERACTIVE EXPERIENCE', 480, 576);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  textureCache[key] = tex;
  return tex;
}

export function createSignTexture(title: string, subtitle: string, arrow: string): THREE.CanvasTexture {
  const key = `sign-${title}-${arrow}`;
  if (textureCache[key]) return textureCache[key];

  const canvas = document.createElement('canvas');
  canvas.width = 640;
  canvas.height = 160;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#1B1612';
  ctx.fillRect(0, 0, 640, 160);
  ctx.strokeStyle = '#C89D54';
  ctx.lineWidth = 6;
  ctx.strokeRect(8, 8, 624, 144);

  ctx.fillStyle = '#E5B869';
  ctx.font = '700 44px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(arrow, 34, 94);

  ctx.fillStyle = '#F7F4EE';
  ctx.font = '700 30px "Cormorant Garamond", Georgia, serif';
  ctx.fillText(title, 105, 76);

  ctx.fillStyle = '#C89D54';
  ctx.font = '500 17px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(subtitle, 105, 114);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  textureCache[key] = tex;
  return tex;
}

export function createWoodFloorTexture(): THREE.CanvasTexture {
  const key = 'museum-wood-floor';
  if (textureCache[key]) return textureCache[key];

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#2B1D14';
  ctx.fillRect(0, 0, 512, 512);

  // Dark teakwood planks with warm brass-inlay subtle grid
  const plankH = 64;
  const plankW = 256;
  for (let y = 0; y < 512; y += plankH) {
    const offset = (y / plankH) % 2 === 0 ? 0 : 128;
    for (let x = -128; x < 512; x += plankW) {
      const shade = ((x + y) % 3) * 5;
      ctx.fillStyle = `rgb(${42 + shade}, ${28 + shade}, ${19 + shade})`;
      ctx.fillRect(x + offset, y, plankW - 2, plankH - 2);
      ctx.strokeStyle = 'rgba(18, 11, 7, 0.8)';
      ctx.lineWidth = 2;
      ctx.strokeRect(x + offset, y, plankW, plankH);
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(16, 18);
  tex.colorSpace = THREE.SRGBColorSpace;
  textureCache[key] = tex;
  return tex;
}

export function createWallSandstoneTexture(): THREE.CanvasTexture {
  const key = 'museum-sandstone-wall';
  if (textureCache[key]) return textureCache[key];

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#EAE2D3';
  ctx.fillRect(0, 0, 512, 512);

  // Subtle limestone/sandstone ashlar blocks
  ctx.strokeStyle = 'rgba(168, 150, 122, 0.25)';
  ctx.lineWidth = 1.5;
  for (let y = 0; y < 512; y += 64) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(512, y);
    ctx.stroke();
    const offset = (y / 64) % 2 === 0 ? 0 : 64;
    for (let x = offset; x < 512; x += 128) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + 64);
      ctx.stroke();
    }
  }

  // Decorative Indian geometric jali border along top
  ctx.fillStyle = '#C89D54';
  ctx.fillRect(0, 0, 512, 14);
  ctx.fillRect(0, 498, 512, 14);

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(8, 2);
  tex.colorSpace = THREE.SRGBColorSpace;
  textureCache[key] = tex;
  return tex;
}
