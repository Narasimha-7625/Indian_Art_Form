import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { TIMELINE_EXHIBITS, TimelineExhibit } from '../data/exhibitsData';
import {
  createSectionPortalTexture,
  createSignTexture,
  createWallSandstoneTexture,
  createWoodFloorTexture,
  getExhibitThreeTexture
} from '../exhibits/proceduralArtTextures';

export interface CameraPose {
  position: [number, number, number];
  lookAt: [number, number, number];
  timestamp?: number;
}

export interface HoveredTarget {
  type: 'exhibit' | 'map-portal' | 'fusion-portal';
  id: string;
  title: string;
  subtitle: string;
}

interface MuseumScene3DProps {
  targetCameraPose: CameraPose | null;
  onSelectExhibit: (exhibitId: string) => void;
  onOpenMapSection: () => void;
  onOpenFusionSection: () => void;
  onUpdateVisitorStatus: (status: {
    section: 'entrance' | 'history' | 'map' | 'fusion';
    nearestExhibit: TimelineExhibit | null;
    position: [number, number];
    yaw: number;
  }) => void;
  onHoverTargetChange: (target: HoveredTarget | null) => void;
  virtualMoveInput: { forward: number; right: number; turn: number };
  isModalOpen: boolean;
}

// Check if a point (x, z) is inside the walkable museum corridors/wings
function isWalkablePosition(x: number, z: number): boolean {
  const margin = 1.15;
  // 1. Central Entrance Hall & North History Hall: x in [-9 + margin, 9 - margin], z in [-45 + margin, 8 - margin]
  const inMainAndHistory =
    x >= -9 + margin && x <= 9 - margin && z >= -45 + margin && z <= 8 - margin;

  // 2. West Wing (Map Hall): x in [-23 + margin, -7], z in [-7 + margin, 3 - margin]
  const inWestMapWing =
    x >= -23 + margin && x <= -7 && z >= -7 + margin && z <= 3 - margin;

  // 3. East Wing (Fusion Gallery): x in [7, 23 - margin], z in [-7 + margin, 3 - margin]
  const inEastFusionWing =
    x >= 7 && x <= 23 - margin && z >= -7 + margin && z <= 3 - margin;

  if (!inMainAndHistory && !inWestMapWing && !inEastFusionWing) {
    return false;
  }

  // Prevent walking through the 3D sculpture pedestals in History Hall
  const pedestals = [
    [-6.6, -14, 1.15], // Dancing Girl pedestal
    [-6.6, -25, 1.25], // Nataraja pedestal
    [-18.5, -2, 1.6]   // Map Hall central cartographic table
  ];
  for (const [px, pz, rad] of pedestals) {
    const dist = Math.hypot(x - px, z - pz);
    if (dist < rad) return false;
  }

  return true;
}

export const MuseumScene3D: React.FC<MuseumScene3DProps> = ({
  targetCameraPose,
  onSelectExhibit,
  onOpenMapSection,
  onOpenFusionSection,
  onUpdateVisitorStatus,
  onHoverTargetChange,
  virtualMoveInput,
  isModalOpen
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [webglError, setWebglError] = useState<string | null>(null);
  const [isPointerLocked, setIsPointerLocked] = useState(false);

  // Keep latest callbacks in refs to avoid recreating the Three.js scene
  const callbacksRef = useRef({
    onSelectExhibit,
    onOpenMapSection,
    onOpenFusionSection,
    onUpdateVisitorStatus,
    onHoverTargetChange
  });
  useEffect(() => {
    callbacksRef.current = {
      onSelectExhibit,
      onOpenMapSection,
      onOpenFusionSection,
      onUpdateVisitorStatus,
      onHoverTargetChange
    };
  }, [
    onSelectExhibit,
    onOpenMapSection,
    onOpenFusionSection,
    onUpdateVisitorStatus,
    onHoverTargetChange
  ]);

  const virtualMoveRef = useRef(virtualMoveInput);
  useEffect(() => {
    virtualMoveRef.current = virtualMoveInput;
  }, [virtualMoveInput]);

  const isModalOpenRef = useRef(isModalOpen);
  useEffect(() => {
    isModalOpenRef.current = isModalOpen;
    if (isModalOpen && document.pointerLockElement) {
      document.exitPointerLock?.();
    }
  }, [isModalOpen]);

  // Camera transition target ref
  const transitionRef = useRef<{
    active: boolean;
    targetPos: THREE.Vector3;
    targetYaw: number;
    targetPitch: number;
  }>({
    active: false,
    targetPos: new THREE.Vector3(0, 2.2, 5.5),
    targetYaw: 0,
    targetPitch: 0
  });

  useEffect(() => {
    if (!targetCameraPose) return;
    const [px, py, pz] = targetCameraPose.position;
    const [lx, ly, lz] = targetCameraPose.lookAt;
    const dx = lx - px;
    const dy = ly - py;
    const dz = lz - pz;
    const horizDist = Math.hypot(dx, dz) || 0.001;
    // Standard Three.js camera looks down -Z when yaw=0, pitch=0
    const targetYaw = Math.atan2(-dx, -dz);
    const targetPitch = Math.atan2(dy, horizDist);

    transitionRef.current = {
      active: true,
      targetPos: new THREE.Vector3(px, py, pz),
      targetYaw,
      targetPitch: Math.max(-0.55, Math.min(0.55, targetPitch))
    };
  }, [targetCameraPose]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Verify WebGL availability
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: 'high-performance'
      });
    } catch {
      setWebglError(
        'WebGL 3D hardware acceleration is unavailable in this browser environment. Use the top navigation bar to explore the History Timeline, Art Map, and Fusion Gallery.'
      );
      return;
    }

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const handleContextLost = (e: Event) => {
      e.preventDefault();
      setWebglError('WebGL rendering context was interrupted. You can still access all museum sections via the navigation controls.');
    };
    renderer.domElement.addEventListener('webglcontextlost', handleContextLost);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#14100D');
    scene.fog = new THREE.FogExp2('#14100D', 0.015);

    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      120
    );
    camera.rotation.order = 'YXZ';
    camera.position.set(0, 2.2, 5.5);

    // Lighting — Warm Indian Museum Atmosphere
    const ambientLight = new THREE.AmbientLight('#FFF3DC', 0.95);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight('#FFE6B8', '#2E1E12', 0.65);
    scene.add(hemiLight);

    // Warm overhead museum chandeliers along the halls
    const lightCoords: [number, number, number, number][] = [
      [0, 5.4, 2, 2.2],
      [0, 5.4, -6, 2.0],
      [0, 5.4, -15, 2.2],
      [0, 5.4, -24, 2.2],
      [0, 5.4, -33, 2.2],
      [0, 5.4, -41, 2.2],
      [-16, 5.4, -2, 2.4],
      [16, 5.4, -2, 2.4]
    ];

    const brassMaterial = new THREE.MeshStandardMaterial({
      color: '#C89D54',
      metalness: 0.72,
      roughness: 0.28
    });

    const darkWoodMat = new THREE.MeshStandardMaterial({
      color: '#26170E',
      roughness: 0.55,
      metalness: 0.08
    });

    lightCoords.forEach(([lx, ly, lz, intensity]) => {
      const pt = new THREE.PointLight('#FFD79A', intensity, 22, 1.3);
      pt.position.set(lx, ly - 0.3, lz);
      scene.add(pt);

      // Decorative brass museum pendant fixture
      const pendantGroup = new THREE.Group();
      pendantGroup.position.set(lx, ly, lz);
      const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.6, 8), brassMaterial);
      rod.position.y = 0.3;
      const globe = new THREE.Mesh(
        new THREE.SphereGeometry(0.24, 16, 12),
        new THREE.MeshBasicMaterial({ color: '#FFF0C4' })
      );
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.36, 0.03, 8, 24), brassMaterial);
      ring.rotation.x = Math.PI / 2;
      pendantGroup.add(rod, globe, ring);
      scene.add(pendantGroup);
    });

    // Materials
    const floorTex = createWoodFloorTexture();
    const floorMat = new THREE.MeshStandardMaterial({
      map: floorTex,
      roughness: 0.38,
      metalness: 0.12
    });

    const wallTex = createWallSandstoneTexture();
    const wallMat = new THREE.MeshStandardMaterial({
      map: wallTex,
      roughness: 0.78,
      metalness: 0.04
    });

    const ceilingMat = new THREE.MeshStandardMaterial({
      color: '#1E1611',
      roughness: 0.85
    });

    // Floor & Ceiling across the whole museum footprint
    const floorMesh = new THREE.Mesh(new THREE.PlaneGeometry(54, 60), floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.set(0, 0, -18);
    scene.add(floorMesh);

    const ceilingMesh = new THREE.Mesh(new THREE.PlaneGeometry(54, 60), ceilingMat);
    ceilingMesh.rotation.x = Math.PI / 2;
    ceilingMesh.position.set(0, 6.0, -18);
    scene.add(ceilingMesh);

    // Central Crimson & Gold Runner Carpet in History Hall
    const runnerGroup = new THREE.Group();
    const runnerTrim = new THREE.Mesh(
      new THREE.PlaneGeometry(2.6, 46),
      new THREE.MeshStandardMaterial({ color: '#C89D54', roughness: 0.4, metalness: 0.5 })
    );
    runnerTrim.rotation.x = -Math.PI / 2;
    runnerTrim.position.set(0, 0.01, -18);
    const runnerInner = new THREE.Mesh(
      new THREE.PlaneGeometry(2.3, 45.6),
      new THREE.MeshStandardMaterial({ color: '#5E1914', roughness: 0.85 })
    );
    runnerInner.rotation.x = -Math.PI / 2;
    runnerInner.position.set(0, 0.015, -18);
    runnerGroup.add(runnerTrim, runnerInner);
    scene.add(runnerGroup);

    // Helper to build a wall segment with baseboard and crown molding
    const addWallSegment = (
      x: number,
      z: number,
      width: number,
      depth: number,
      height = 6.0
    ) => {
      const wall = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), wallMat);
      wall.position.set(x, height / 2, z);
      scene.add(wall);

      // Dark wood baseboard
      const base = new THREE.Mesh(
        new THREE.BoxGeometry(width + 0.06, 0.35, depth + 0.06),
        darkWoodMat
      );
      base.position.set(x, 0.175, z);
      scene.add(base);

      // Brass frieze trim at y = 5.65
      const trim = new THREE.Mesh(
        new THREE.BoxGeometry(width + 0.08, 0.14, depth + 0.08),
        brassMaterial
      );
      trim.position.set(x, 5.65, z);
      scene.add(trim);
    };

    // Build Museum Walls:
    // 1. South Wall (behind entrance): z = 8, x from -9 to 9
    addWallSegment(0, 8, 18.4, 0.4);
    // 2. North End Wall of History Hall: z = -45, x from -9 to 9
    addWallSegment(0, -45, 18.4, 0.4);

    // 3. Entrance Hall Left & Right Lower Walls (z from 3 to 8)
    addWallSegment(-9, 5.5, 0.4, 5.4);
    addWallSegment(9, 5.5, 0.4, 5.4);

    // 4. History Hall Left & Right Walls (z from -45 to -7)
    addWallSegment(-9, -26, 0.4, 38.4);
    addWallSegment(9, -26, 0.4, 38.4);

    // 5. West Wing (Map Hall) Walls: x from -23 to -9, z from -7 to 3
    addWallSegment(-16, -7, 14.4, 0.4); // North wall of West Wing
    addWallSegment(-16, 3, 14.4, 0.4);  // South wall of West Wing
    addWallSegment(-23, -2, 0.4, 10.4); // West end wall (Map centerpiece wall)

    // 6. East Wing (Fusion Gallery) Walls: x from 9 to 23, z from -7 to 3
    addWallSegment(16, -7, 14.4, 0.4);  // North wall of East Wing
    addWallSegment(16, 3, 14.4, 0.4);   // South wall of East Wing
    addWallSegment(23, -2, 0.4, 10.4);  // East end wall (Fusion centerpiece wall)

    // Decorative Sandstone & Brass Columns at Wing Entrances
    const columnCoords: [number, number][] = [
      [-8.6, -7],
      [8.6, -7],
      [-8.6, 3],
      [8.6, 3],
      [-4.2, -7.2],
      [4.2, -7.2]
    ];
    columnCoords.forEach(([cx, cz]) => {
      const colGroup = new THREE.Group();
      colGroup.position.set(cx, 0, cz);
      const plinth = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.5, 0.9), darkWoodMat);
      plinth.position.y = 0.25;
      const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.36, 5.1, 16), wallMat);
      shaft.position.y = 3.0;
      const band1 = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 0.12, 16), brassMaterial);
      band1.position.y = 1.8;
      const band2 = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, 0.12, 16), brassMaterial);
      band2.position.y = 4.5;
      const capital = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.4, 0.95), brassMaterial);
      capital.position.y = 5.75;
      colGroup.add(plinth, shaft, band1, band2, capital);
      scene.add(colGroup);
    });

    // Overhead Directional Museum Signs at the Central Crossroads
    const addSignBoard = (
      x: number,
      y: number,
      z: number,
      rotY: number,
      title: string,
      subtitle: string,
      arrow: string
    ) => {
      const signTex = createSignTexture(title, subtitle, arrow);
      const signMesh = new THREE.Mesh(
        new THREE.BoxGeometry(4.4, 1.05, 0.12),
        new THREE.MeshBasicMaterial({ map: signTex })
      );
      signMesh.position.set(x, y, z);
      signMesh.rotation.y = rotY;
      scene.add(signMesh);
    };

    addSignBoard(
      0,
      4.85,
      -7.2,
      0,
      'HISTORY HALL',
      'Indian Art Timeline · 6 Masterworks (CO1)',
      '↑'
    );
    addSignBoard(
      -8.8,
      4.85,
      -2,
      Math.PI / 2,
      'INDIAN ART MAP',
      'Explore India · 8 Heritage Sites (CO1)',
      '←'
    );
    addSignBoard(
      8.8,
      4.85,
      -2,
      -Math.PI / 2,
      'FUSION GALLERY',
      'Warli × Kalamkari Synthesis (CO2)',
      '→'
    );

    // Glowing Brass Floor Direction Arrows
    const addFloorArrow = (x: number, z: number, rotZ: number) => {
      const shape = new THREE.Shape();
      shape.moveTo(0, 0.55);
      shape.lineTo(0.45, 0.05);
      shape.lineTo(0.18, 0.05);
      shape.lineTo(0.18, -0.55);
      shape.lineTo(-0.18, -0.55);
      shape.lineTo(-0.18, 0.05);
      shape.lineTo(-0.45, 0.05);
      shape.closePath();

      const geom = new THREE.ShapeGeometry(shape);
      const mesh = new THREE.Mesh(
        geom,
        new THREE.MeshBasicMaterial({ color: '#D8AD5C', side: THREE.DoubleSide })
      );
      mesh.rotation.x = -Math.PI / 2;
      mesh.rotation.z = rotZ;
      mesh.position.set(x, 0.025, z);
      scene.add(mesh);
    };

    addFloorArrow(0, 1.5, 0);              // North to History Hall
    addFloorArrow(0, -5.0, 0);             // Further North
    addFloorArrow(-5.2, -2.0, Math.PI / 2); // West to Art Map
    addFloorArrow(5.2, -2.0, -Math.PI / 2); // East to Fusion Gallery

    // Interactive Clickable Meshes Registry
    const interactiveMeshes: THREE.Object3D[] = [];
    const highlightMaterials: Map<string, THREE.MeshStandardMaterial> = new Map();

    // =========================================================================
    // BUILD THE 6 INTERACTIVE HISTORY HALL EXHIBITS (ACTIVITY 1 — CO1)
    // =========================================================================
    TIMELINE_EXHIBITS.forEach((exhibit) => {
      const group = new THREE.Group();
      group.position.set(...exhibit.wallPos);
      group.rotation.y = exhibit.wallRotY;

      // Outer Carved Wood & Brass Frame
      const frameMat = new THREE.MeshStandardMaterial({
        color: '#C89D54',
        metalness: 0.68,
        roughness: 0.32,
        emissive: new THREE.Color('#000000'),
        emissiveIntensity: 0
      });
      highlightMaterials.set(exhibit.id, frameMat);

      const outerFrame = new THREE.Mesh(new THREE.BoxGeometry(4.4, 3.2, 0.16), frameMat);
      group.add(outerFrame);

      const innerMat = new THREE.MeshStandardMaterial({
        color: '#1C140E',
        roughness: 0.7
      });
      const innerBacking = new THREE.Mesh(new THREE.BoxGeometry(4.1, 2.9, 0.18), innerMat);
      group.add(innerBacking);

      // Artwork Canvas Plane
      const artTex = getExhibitThreeTexture(exhibit.id);
      const artMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(3.92, 2.74),
        new THREE.MeshBasicMaterial({ map: artTex })
      );
      artMesh.position.z = 0.11;
      artMesh.userData = {
        type: 'exhibit',
        id: exhibit.id,
        title: `${exhibit.order}. ${exhibit.eraTitle}`,
        subtitle: `${exhibit.exhibitTitle} (${exhibit.yearSort})`
      };
      interactiveMeshes.push(artMesh);
      outerFrame.userData = artMesh.userData;
      interactiveMeshes.push(outerFrame);
      group.add(artMesh);

      // Brass Picture Light Above Frame
      const lampArm = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.08, 0.35), brassMaterial);
      lampArm.position.set(0, 1.72, 0.2);
      group.add(lampArm);

      // Museum Information Plaque beside the Frame
      const plaqueCanvas = document.createElement('canvas');
      plaqueCanvas.width = 360;
      plaqueCanvas.height = 220;
      const pctx = plaqueCanvas.getContext('2d')!;
      pctx.fillStyle = '#1E1814';
      pctx.fillRect(0, 0, 360, 220);
      pctx.strokeStyle = '#C89D54';
      pctx.lineWidth = 4;
      pctx.strokeRect(6, 6, 348, 208);
      pctx.fillStyle = '#C89D54';
      pctx.font = '700 14px "Plus Jakarta Sans", sans-serif';
      pctx.fillText(`EXHIBIT 0${exhibit.order} · ${exhibit.yearSort}`, 22, 38);
      pctx.fillStyle = '#F7F4EE';
      pctx.font = '700 20px "Cormorant Garamond", Georgia, serif';
      pctx.fillText(exhibit.eraTitle, 22, 72);
      pctx.fillStyle = '#D6CEBE';
      pctx.font = '500 14px "Plus Jakarta Sans", sans-serif';
      pctx.fillText(exhibit.exhibitTitle.slice(0, 34), 22, 102);
      pctx.fillStyle = '#E5B869';
      pctx.font = '600 14px "Plus Jakarta Sans", sans-serif';
      pctx.fillText('Click to Inspect Full Dossier →', 22, 184);

      const plaqueTex = new THREE.CanvasTexture(plaqueCanvas);
      plaqueTex.colorSpace = THREE.SRGBColorSpace;
      const plaqueMesh = new THREE.Mesh(
        new THREE.BoxGeometry(1.1, 0.68, 0.06),
        new THREE.MeshBasicMaterial({ map: plaqueTex })
      );
      plaqueMesh.position.set(2.85, -0.5, 0.04);
      plaqueMesh.userData = artMesh.userData;
      interactiveMeshes.push(plaqueMesh);
      group.add(plaqueMesh);

      scene.add(group);

      // Optional 3D Sculptural Pedestal in Front of Sculptural Exhibits (Dancing Girl & Nataraja)
      if (exhibit.hasSculpturePedestal) {
        const pedGroup = new THREE.Group();
        const pedX = exhibit.wallSide === 'left' ? -6.6 : 6.6;
        pedGroup.position.set(pedX, 0, exhibit.wallPos[2]);

        const basePlinth = new THREE.Mesh(
          new THREE.BoxGeometry(1.15, 1.25, 1.15),
          darkWoodMat
        );
        basePlinth.position.y = 0.625;
        pedGroup.add(basePlinth);

        const brassCap = new THREE.Mesh(
          new THREE.BoxGeometry(1.22, 0.08, 1.22),
          brassMaterial
        );
        brassCap.position.y = 1.28;
        pedGroup.add(brassCap);

        if (exhibit.sculptureType === 'dancing-girl') {
          // 3D Stylized Patina-Bronze Dancing Girl Statuette on Pedestal
          const patinaMat = new THREE.MeshStandardMaterial({
            color: '#6E8F75',
            metalness: 0.75,
            roughness: 0.28
          });
          const statuette = new THREE.Group();
          statuette.position.y = 1.32;

          const sBase = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.32, 0.1, 16), brassMaterial);
          const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.09, 0.55, 12), patinaMat);
          torso.position.y = 0.62;
          const head = new THREE.Mesh(new THREE.SphereGeometry(0.13, 16, 16), patinaMat);
          head.position.y = 1.02;
          const legL = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.04, 0.42, 10), patinaMat);
          legL.position.set(-0.06, 0.25, 0);
          const legR = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.04, 0.42, 10), patinaMat);
          legR.position.set(0.06, 0.25, 0.04);
          legR.rotation.x = -0.15;

          statuette.add(sBase, torso, head, legL, legR);
          statuette.traverse((child) => {
            child.userData = artMesh.userData;
          });
          interactiveMeshes.push(torso, head, basePlinth);
          pedGroup.add(statuette);
        } else if (exhibit.sculptureType === 'nataraja') {
          // 3D Stylized Panchaloha Bronze Nataraja inside Flaming Prabhavali Ring
          const cholaBronzeMat = new THREE.MeshStandardMaterial({
            color: '#D9A048',
            metalness: 0.85,
            roughness: 0.2
          });
          const nataraja = new THREE.Group();
          nataraja.position.y = 1.35;
          nataraja.rotation.y = Math.PI / 2;

          const lotusBase = new THREE.Mesh(
            new THREE.CylinderGeometry(0.38, 0.44, 0.16, 20),
            cholaBronzeMat
          );
          const prabhavaliRing = new THREE.Mesh(
            new THREE.TorusGeometry(0.62, 0.045, 12, 36),
            cholaBronzeMat
          );
          prabhavaliRing.position.y = 0.68;
          const dancerCore = new THREE.Mesh(
            new THREE.CylinderGeometry(0.12, 0.08, 0.65, 12),
            cholaBronzeMat
          );
          dancerCore.position.y = 0.65;
          const dancerHead = new THREE.Mesh(
            new THREE.SphereGeometry(0.13, 16, 16),
            cholaBronzeMat
          );
          dancerHead.position.y = 1.06;

          nataraja.add(lotusBase, prabhavaliRing, dancerCore, dancerHead);
          nataraja.traverse((child) => {
            child.userData = artMesh.userData;
          });
          interactiveMeshes.push(prabhavaliRing, dancerCore, basePlinth);
          pedGroup.add(nataraja);
        }

        scene.add(pedGroup);
      }
    });

    // =========================================================================
    // BUILD WEST WING — EXPLORE INDIA ART MAP INSTALLATION (ACTIVITY 2 — CO1)
    // =========================================================================
    const mapPortalGroup = new THREE.Group();
    mapPortalGroup.position.set(-22.6, 2.85, -2);
    mapPortalGroup.rotation.y = Math.PI / 2;

    const mapFrameMat = new THREE.MeshStandardMaterial({
      color: '#C89D54',
      metalness: 0.7,
      roughness: 0.3
    });
    highlightMaterials.set('map-portal', mapFrameMat);

    const mapFrame = new THREE.Mesh(new THREE.BoxGeometry(5.6, 3.6, 0.16), mapFrameMat);
    const mapTex = createSectionPortalTexture(
      'EXPLORE INDIA — ART & CULTURE MAP',
      '8 Heritage Centers · Interactive Leaflet & OpenStreetMap',
      'ACTIVITY 2 · COURSE OUTCOME 1 (CO1)',
      'map'
    );
    const mapCanvasMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(5.25, 3.28),
      new THREE.MeshBasicMaterial({ map: mapTex })
    );
    mapCanvasMesh.position.z = 0.1;
    mapCanvasMesh.userData = {
      type: 'map-portal',
      id: 'map-portal',
      title: 'Explore India — Art & Culture Map',
      subtitle: 'Click to Open Interactive Leaflet Map (8 Heritage Sites)'
    };
    mapFrame.userData = mapCanvasMesh.userData;
    interactiveMeshes.push(mapCanvasMesh, mapFrame);
    mapPortalGroup.add(mapFrame, mapCanvasMesh);
    scene.add(mapPortalGroup);

    // 3D Illuminated Cartographic Table in center of Map Hall
    const mapTableGroup = new THREE.Group();
    mapTableGroup.position.set(-18.5, 0, -2);
    const tablePedestal = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.8, 1.0, 16), darkWoodMat);
    tablePedestal.position.y = 0.5;
    const tableTop = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.14, 2.0), brassMaterial);
    tableTop.position.y = 1.05;
    tableTop.userData = mapCanvasMesh.userData;
    interactiveMeshes.push(tableTop);
    mapTableGroup.add(tablePedestal, tableTop);
    scene.add(mapTableGroup);

    // =========================================================================
    // BUILD EAST WING — FUSION GALLERY INSTALLATION (ACTIVITY 3 — CO2)
    // =========================================================================
    const fusionPortalGroup = new THREE.Group();
    fusionPortalGroup.position.set(22.6, 2.85, -2);
    fusionPortalGroup.rotation.y = -Math.PI / 2;

    const fusionFrameMat = new THREE.MeshStandardMaterial({
      color: '#C89D54',
      metalness: 0.7,
      roughness: 0.3
    });
    highlightMaterials.set('fusion-portal', fusionFrameMat);

    const fusionFrame = new THREE.Mesh(new THREE.BoxGeometry(5.6, 3.6, 0.16), fusionFrameMat);
    const fusionTex = createSectionPortalTexture(
      'WARLI × KALAMKARI FUSION',
      'Original Digital Regional Painting Synthesis',
      'ACTIVITY 3 · COURSE OUTCOME 2 (CO2)',
      'fusion'
    );
    const fusionCanvasMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(5.25, 3.28),
      new THREE.MeshBasicMaterial({ map: fusionTex })
    );
    fusionCanvasMesh.position.z = 0.1;
    fusionCanvasMesh.userData = {
      type: 'fusion-portal',
      id: 'fusion-portal',
      title: 'Regional Painting Fusion Gallery (CO2)',
      subtitle: 'Click to Inspect & Toggle Warli × Kalamkari Elements'
    };
    fusionFrame.userData = fusionCanvasMesh.userData;
    interactiveMeshes.push(fusionCanvasMesh, fusionFrame);
    fusionPortalGroup.add(fusionFrame, fusionCanvasMesh);
    scene.add(fusionPortalGroup);

    // =========================================================================
    // INPUT HANDLING: WASD, ARROWS, MOUSE DRAG, POINTER LOCK, RAYCASTING
    // =========================================================================
    const keysPressed: Record<string, boolean> = {};
    let yaw = 0;
    let pitch = 0;
    let isDragging = false;
    let dragDistance = 0;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const raycaster = new THREE.Raycaster();
    raycaster.far = 16;
    let currentHoverId: string | null = null;

    const onKeyDown = (e: KeyboardEvent) => {
      if (isModalOpenRef.current) return;
      // Ignore if typing in an input
      if (
        document.activeElement &&
        ['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)
      ) {
        return;
      }
      keysPressed[e.code] = true;
      // Cancel automatic camera glide if user manually moves
      if (
        [
          'KeyW',
          'KeyA',
          'KeyS',
          'KeyD',
          'ArrowUp',
          'ArrowDown',
          'ArrowLeft',
          'ArrowRight'
        ].includes(e.code)
      ) {
        transitionRef.current.active = false;
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      keysPressed[e.code] = false;
    };

    const onMouseDown = (e: MouseEvent) => {
      if (isModalOpenRef.current) return;
      if (e.button !== 0) return;
      isDragging = true;
      dragDistance = 0;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (isModalOpenRef.current) return;

      if (document.pointerLockElement === renderer.domElement) {
        transitionRef.current.active = false;
        yaw -= e.movementX * 0.0022;
        pitch = Math.max(-0.6, Math.min(0.6, pitch - e.movementY * 0.0018));
        return;
      }

      if (isDragging) {
        const dx = e.clientX - prevMouseX;
        const dy = e.clientY - prevMouseY;
        dragDistance += Math.hypot(dx, dy);
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
        transitionRef.current.active = false;
        yaw -= dx * 0.0032;
        pitch = Math.max(-0.6, Math.min(0.6, pitch - dy * 0.0025));
      }

      // Also check hover under mouse cursor when not pointer-locked
      const rect = renderer.domElement.getBoundingClientRect();
      const ndcX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ndcY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(new THREE.Vector2(ndcX, ndcY), camera);
      const hits = raycaster.intersectObjects(interactiveMeshes, false);
      if (hits.length > 0 && hits[0].object.userData?.id) {
        renderer.domElement.style.cursor = 'pointer';
      } else {
        renderer.domElement.style.cursor = isDragging ? 'grabbing' : 'grab';
      }
    };

    const triggerHitObject = (data: HoveredTarget) => {
      if (data.type === 'exhibit') {
        callbacksRef.current.onSelectExhibit(data.id);
      } else if (data.type === 'map-portal') {
        callbacksRef.current.onOpenMapSection();
      } else if (data.type === 'fusion-portal') {
        callbacksRef.current.onOpenFusionSection();
      }
    };

    const onMouseUp = (e: MouseEvent) => {
      if (!isDragging) return;
      isDragging = false;
      renderer.domElement.style.cursor = 'grab';

      if (isModalOpenRef.current) return;

      // If it was a clean click (not a camera drag)
      if (dragDistance < 7) {
        // 1. Check raycast at mouse click position first
        const rect = renderer.domElement.getBoundingClientRect();
        const ndcX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const ndcY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(new THREE.Vector2(ndcX, ndcY), camera);
        const mouseHits = raycaster.intersectObjects(interactiveMeshes, false);
        if (mouseHits.length > 0 && mouseHits[0].object.userData?.id) {
          triggerHitObject(mouseHits[0].object.userData as HoveredTarget);
          return;
        }

        // 2. Also check center crosshair raycast
        raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);
        const centerHits = raycaster.intersectObjects(interactiveMeshes, false);
        if (centerHits.length > 0 && centerHits[0].object.userData?.id) {
          triggerHitObject(centerHits[0].object.userData as HoveredTarget);
        }
      }
    };

    const onPointerLockChange = () => {
      setIsPointerLocked(document.pointerLockElement === renderer.domElement);
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    renderer.domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('pointerlockchange', onPointerLockChange);

    // Resize handler
    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', onResize);

    // Animation Loop
    let animationFrameId: number;
    let lastTime = performance.now();
    let lastStatusDispatch = 0;

    const animate = (now: number) => {
      animationFrameId = requestAnimationFrame(animate);
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // 1. Handle automated smooth camera transition (Guided Tour or Section Jump)
      if (transitionRef.current.active) {
        camera.position.lerp(transitionRef.current.targetPos, Math.min(1, dt * 4.5));

        // Shortest angle interpolation for yaw
        let diffYaw = transitionRef.current.targetYaw - yaw;
        while (diffYaw > Math.PI) diffYaw -= Math.PI * 2;
        while (diffYaw < -Math.PI) diffYaw += Math.PI * 2;
        yaw += diffYaw * Math.min(1, dt * 5.0);
        pitch += (transitionRef.current.targetPitch - pitch) * Math.min(1, dt * 5.0);

        if (
          camera.position.distanceTo(transitionRef.current.targetPos) < 0.06 &&
          Math.abs(diffYaw) < 0.02
        ) {
          transitionRef.current.active = false;
        }
      } else if (!isModalOpenRef.current) {
        // 2. Manual WASD / Arrow Keys + Virtual On-Screen Controls Movement
        const moveSpeed = 6.2;
        const turnSpeed = 1.8;

        let forwardInput = virtualMoveRef.current.forward;
        let rightInput = virtualMoveRef.current.right;
        let turnInput = virtualMoveRef.current.turn;

        if (keysPressed['KeyW'] || keysPressed['ArrowUp']) forwardInput += 1;
        if (keysPressed['KeyS'] || keysPressed['ArrowDown']) forwardInput -= 1;
        if (keysPressed['KeyD']) rightInput += 1;
        if (keysPressed['KeyA']) rightInput -= 1;
        if (keysPressed['ArrowLeft'] || keysPressed['KeyQ']) turnInput += 1;
        if (keysPressed['ArrowRight'] || keysPressed['KeyE']) turnInput -= 1;

        if (turnInput !== 0) {
          yaw += turnInput * turnSpeed * dt;
        }

        if (forwardInput !== 0 || rightInput !== 0) {
          const forwardVec = new THREE.Vector3(-Math.sin(yaw), 0, -Math.cos(yaw));
          const rightVec = new THREE.Vector3(Math.cos(yaw), 0, -Math.sin(yaw));

          const moveDelta = new THREE.Vector3()
            .addScaledVector(forwardVec, forwardInput)
            .addScaledVector(rightVec, rightInput);

          if (moveDelta.lengthSq() > 1) moveDelta.normalize();
          moveDelta.multiplyScalar(moveSpeed * dt);

          // Try X and Z axes independently for smooth wall sliding
          const nextX = camera.position.x + moveDelta.x;
          const nextZ = camera.position.z + moveDelta.z;

          if (isWalkablePosition(nextX, camera.position.z)) {
            camera.position.x = nextX;
          }
          if (isWalkablePosition(camera.position.x, nextZ)) {
            camera.position.z = nextZ;
          }
        }
      }

      camera.rotation.y = yaw;
      camera.rotation.x = pitch;

      // 3. Center Crosshair Raycast for Hover Highlight
      raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);
      const centerIntersects = raycaster.intersectObjects(interactiveMeshes, false);
      const hitData =
        centerIntersects.length > 0
          ? (centerIntersects[0].object.userData as HoveredTarget)
          : null;

      const nextHoverId = hitData?.id || null;
      if (nextHoverId !== currentHoverId) {
        // Reset previous highlight
        if (currentHoverId && highlightMaterials.has(currentHoverId)) {
          const prevMat = highlightMaterials.get(currentHoverId)!;
          prevMat.emissive.setHex(0x000000);
          prevMat.emissiveIntensity = 0;
        }
        // Highlight new target
        if (nextHoverId && highlightMaterials.has(nextHoverId)) {
          const nextMat = highlightMaterials.get(nextHoverId)!;
          nextMat.emissive.setHex(0xc89d54);
          nextMat.emissiveIntensity = 0.45;
        }
        currentHoverId = nextHoverId;
        callbacksRef.current.onHoverTargetChange(hitData);
      }

      // 4. Periodically report visitor section & nearest exhibit to HUD
      if (now - lastStatusDispatch > 140) {
        lastStatusDispatch = now;
        const cx = camera.position.x;
        const cz = camera.position.z;

        let section: 'entrance' | 'history' | 'map' | 'fusion' = 'entrance';
        if (cx < -9) section = 'map';
        else if (cx > 9) section = 'fusion';
        else if (cz < -8.5) section = 'history';

        let nearest: TimelineExhibit | null = null;
        let minDist = Infinity;
        for (const ex of TIMELINE_EXHIBITS) {
          const d = Math.hypot(cx - ex.wallPos[0], cz - ex.wallPos[2]);
          if (d < minDist) {
            minDist = d;
            nearest = ex;
          }
        }

        callbacksRef.current.onUpdateVisitorStatus({
          section,
          nearestExhibit: minDist < 12 ? nearest : null,
          position: [cx, cz],
          yaw
        });
      }

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('pointerlockchange', onPointerLockChange);
      renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);
      renderer.dispose();
    };
  }, []);

  const togglePointerLock = () => {
    const canvas = mountRef.current?.querySelector('canvas');
    if (!canvas) return;
    if (document.pointerLockElement === canvas) {
      document.exitPointerLock?.();
    } else {
      canvas.requestPointerLock?.();
    }
  };

  if (webglError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#14110F] p-6 text-center">
        <div className="max-w-lg p-8 rounded-lg bg-[#1D1814] border border-[#C89D54]/40 space-y-4">
          <p className="text-xs uppercase tracking-widest text-[#C89D54]">
            2D Curatorial Fallback Mode Active
          </p>
          <h2 className="text-2xl font-serif-display font-semibold text-[#F7F4EE]">
            Bharat Kala Museum — Interactive Catalog
          </h2>
          <p className="text-sm text-[#D6CEBE] leading-relaxed">{webglError}</p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onSelectExhibit('indus-valley')}
              className="px-4 py-2 rounded bg-[#C89D54] text-[#14110F] text-xs font-semibold hover:bg-[#D8B068] transition-colors"
            >
              Open History Timeline (CO1)
            </button>
            <button
              onClick={onOpenMapSection}
              className="px-4 py-2 rounded bg-[#2A221B] border border-[#C89D54]/40 text-[#F7F4EE] text-xs font-semibold hover:bg-[#382E25] transition-colors"
            >
              Open India Art Map (CO1)
            </button>
            <button
              onClick={onOpenFusionSection}
              className="px-4 py-2 rounded bg-[#2A221B] border border-[#C89D54]/40 text-[#F7F4EE] text-xs font-semibold hover:bg-[#382E25] transition-colors"
            >
              Open Fusion Gallery (CO2)
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden select-none">
      {/* 3D WebGL Viewport Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Subtle Pointer Lock Look Mode Toggle Button in Bottom-Left above controls */}
      <button
        type="button"
        onClick={togglePointerLock}
        className="fixed bottom-16 left-4 z-20 hidden md:flex items-center gap-2 px-3 py-1.5 rounded bg-[#18130F]/85 backdrop-blur-md border border-[#C89D54]/35 text-[11px] text-[#D6CEBE] hover:text-[#F7F4EE] hover:border-[#C89D54] transition-colors"
        title="Toggle Mouse Free-Look Mode"
      >
        <span className="w-2 h-2 rounded-full bg-[#C89D54]" />
        <span>{isPointerLocked ? 'Mouse Look Locked (ESC to Release)' : 'Click & Drag or Lock Mouse Look'}</span>
      </button>
    </div>
  );
};
