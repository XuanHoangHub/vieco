import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Layers, RotateCcw, ShieldCheck } from 'lucide-react';
import { sound } from '../utils/audio';

interface ThreeWalletViewerProps {
  color?: string; // 'espresso' | 'walnut' | 'caramel'
  initialExploded?: boolean;
}

export const ThreeWalletViewer: React.FC<ThreeWalletViewerProps> = ({
  color = 'espresso',
  initialExploded = false
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isExploded, setIsExploded] = useState(initialExploded);
  const [activeLayer, setActiveLayer] = useState<number | null>(null);
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [isRfidScanActive, setIsRfidScanActive] = useState(false);

  // References to keep animation state in sync with Three.js render loop
  const animStateRef = useRef({
    targetSeparation: initialExploded ? 1.4 : 0,
    currentSeparation: initialExploded ? 1.4 : 0,
    isRfidScanning: false,
    colorTheme: color,
  });

  useEffect(() => {
    animStateRef.current.targetSeparation = isExploded ? 1.4 : 0;
  }, [isExploded]);

  useEffect(() => {
    animStateRef.current.isRfidScanning = isRfidScanActive;
  }, [isRfidScanActive]);

  useEffect(() => {
    animStateRef.current.colorTheme = color;
  }, [color]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Clear any previous canvas
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const initialWidth = container.clientWidth || 800;
    const initialHeight = container.clientHeight || 560;

    // Function to calculate optimal camera distance based on viewport aspect ratio
    const getOptimalCameraDistance = (w: number, h: number) => {
      const aspect = w / h;
      if (aspect < 0.8) return 5.8;  // Mobile portrait
      if (aspect < 1.1) return 5.0;  // Tablet portrait / square
      return 4.2;                     // Desktop landscape
    };

    // Set camera FOV and position to look directly at center (0, 0, 0)
    const camera = new THREE.PerspectiveCamera(40, initialWidth / initialHeight, 0.1, 100);
    camera.position.set(0, 0, getOptimalCameraDistance(initialWidth, initialHeight));
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(initialWidth, initialHeight, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    
    // Ensure canvas stays perfectly centered and spans container exactly
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.outline = 'none';
    
    container.appendChild(renderer.domElement);

    // Group holding all wallet parts - CENTERED AT (0, 0, 0)
    const rootGroup = new THREE.Group();
    rootGroup.position.set(0, 0, 0);
    scene.add(rootGroup);

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xfff5ea, 1.4);
    scene.add(ambientLight);

    const mainKeyLight = new THREE.DirectionalLight(0xffe2c0, 2.5);
    mainKeyLight.position.set(4, 5, 5);
    mainKeyLight.castShadow = true;
    mainKeyLight.shadow.mapSize.width = 1024;
    mainKeyLight.shadow.mapSize.height = 1024;
    scene.add(mainKeyLight);

    const rimLight = new THREE.DirectionalLight(0xc88242, 2.2);
    rimLight.position.set(-5, 2, -3);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0xa5c4ab, 0.8);
    fillLight.position.set(0, -3, 3);
    scene.add(fillLight);

    // Procedural Coffee Texture Canvas for bump & roughness
    const createCoffeeTexture = () => {
      const c = document.createElement('canvas');
      c.width = 512;
      c.height = 512;
      const ctx = c.getContext('2d');
      if (!ctx) return new THREE.CanvasTexture(c);

      ctx.fillStyle = '#261b16';
      ctx.fillRect(0, 0, 512, 512);

      // Fine coffee grain speckles
      for (let i = 0; i < 45000; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        const radius = Math.random() * 1.2;
        const shade = Math.floor(Math.random() * 50);
        ctx.fillStyle = `rgba(${30 + shade}, ${20 + shade}, ${15 + shade}, 0.25)`;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Micro cracks & organic leather grain
      ctx.strokeStyle = 'rgba(10, 8, 6, 0.08)';
      ctx.lineWidth = 0.8;
      for (let j = 0; j < 80; j++) {
        ctx.beginPath();
        ctx.moveTo(Math.random() * 512, Math.random() * 512);
        ctx.bezierCurveTo(
          Math.random() * 512, Math.random() * 512,
          Math.random() * 512, Math.random() * 512,
          Math.random() * 512, Math.random() * 512
        );
        ctx.stroke();
      }

      const texture = new THREE.CanvasTexture(c);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(2, 2);
      return texture;
    };

    const coffeeTexture = createCoffeeTexture();

    // Procedural metallic weave texture for RFID shielding layer
    const createRfidMeshTexture = () => {
      const c = document.createElement('canvas');
      c.width = 128;
      c.height = 128;
      const ctx = c.getContext('2d');
      if (!ctx) return new THREE.CanvasTexture(c);

      ctx.fillStyle = '#1e1c18';
      ctx.fillRect(0, 0, 128, 128);

      ctx.strokeStyle = '#cda365';
      ctx.lineWidth = 1.5;
      for (let i = 0; i < 128; i += 6) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 128);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(128, i);
        ctx.stroke();
      }

      const texture = new THREE.CanvasTexture(c);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(16, 12);
      return texture;
    };

    const rfidTexture = createRfidMeshTexture();

    // Colors mapping
    const getLeatherColor = (theme: string) => {
      switch (theme) {
        case 'walnut':
          return new THREE.Color(0x3a281e);
        case 'caramel':
          return new THREE.Color(0x6e4324);
        case 'espresso':
        default:
          return new THREE.Color(0x231813);
      }
    };

    // Layer 1: Outer Shell (Coffee Bio-Composite 1.0 - 1.3 mm)
    const outerGroup = new THREE.Group();
    const outerGeo = new THREE.BoxGeometry(3.0, 2.0, 0.08);
    const outerMat = new THREE.MeshStandardMaterial({
      color: getLeatherColor(color),
      roughness: 0.65,
      metalness: 0.05,
      bumpMap: coffeeTexture,
      bumpScale: 0.02,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    outerMesh.castShadow = true;
    outerMesh.receiveShadow = true;
    outerGroup.add(outerMesh);

    // Decorative Stitches along edges
    const stitchGeo = new THREE.BoxGeometry(2.88, 1.88, 0.082);
    const stitchMat = new THREE.MeshBasicMaterial({
      color: 0xc88242,
      wireframe: true,
    });
    const stitchMesh = new THREE.Mesh(stitchGeo, stitchMat);
    outerGroup.add(stitchMesh);

    // EcoShield Embossed Logo Badge on Outer Face
    const logoBadgeGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.02, 32);
    const logoBadgeMat = new THREE.MeshStandardMaterial({
      color: 0x935d31,
      metalness: 0.8,
      roughness: 0.3,
    });
    const logoBadge = new THREE.Mesh(logoBadgeGeo, logoBadgeMat);
    logoBadge.rotation.x = Math.PI / 2;
    logoBadge.position.set(0.85, -0.45, 0.05);
    outerGroup.add(logoBadge);

    // Layer 2: RFID Shielding Mesh (Nickel + Copper electroconductive cloth)
    const rfidGroup = new THREE.Group();
    const rfidGeo = new THREE.BoxGeometry(2.9, 1.9, 0.03);
    const rfidMat = new THREE.MeshStandardMaterial({
      color: 0xd6b074,
      metalness: 0.92,
      roughness: 0.35,
      map: rfidTexture,
      transparent: true,
      opacity: 0.95,
      emissive: 0x4a3215,
      emissiveIntensity: 0.2
    });
    const rfidMesh = new THREE.Mesh(rfidGeo, rfidMat);
    rfidGroup.add(rfidMesh);

    // Layer 3: Inner Lining & Dual-Zone Architecture (Card slots + Apple Find My Tag)
    const innerGroup = new THREE.Group();
    const innerBaseGeo = new THREE.BoxGeometry(3.0, 2.0, 0.09);
    const innerBaseMat = new THREE.MeshStandardMaterial({
      color: 0x1f1612,
      roughness: 0.7,
      metalness: 0.05,
      bumpMap: coffeeTexture,
      bumpScale: 0.015,
    });
    const innerBaseMesh = new THREE.Mesh(innerBaseGeo, innerBaseMat);
    innerBaseMesh.receiveShadow = true;
    innerGroup.add(innerBaseMesh);

    // Credit Card mockup inserted in wallet
    const cardGeo = new THREE.BoxGeometry(1.35, 0.85, 0.02);
    const cardMat = new THREE.MeshStandardMaterial({
      color: 0x15222e,
      metalness: 0.7,
      roughness: 0.3,
    });
    const cardMesh = new THREE.Mesh(cardGeo, cardMat);
    cardMesh.position.set(-0.65, 0.3, 0.06);
    cardMesh.rotation.z = -0.04;
    innerGroup.add(cardMesh);

    // Apple Find My Compatible Smart Tag Disc
    const tagGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.07, 36);
    const tagMat = new THREE.MeshStandardMaterial({
      color: 0xf5f5f7,
      metalness: 0.85,
      roughness: 0.2,
    });
    const tagMesh = new THREE.Mesh(tagGeo, tagMat);
    tagMesh.rotation.x = Math.PI / 2;
    tagMesh.position.set(0.7, 0, 0.07);

    // Inner icon ring on tag
    const tagRingGeo = new THREE.RingGeometry(0.12, 0.22, 32);
    const tagRingMat = new THREE.MeshBasicMaterial({ color: 0x444444, side: THREE.DoubleSide });
    const tagRing = new THREE.Mesh(tagRingGeo, tagRingMat);
    tagRing.position.set(0.7, 0, 0.11);

    innerGroup.add(tagMesh);
    innerGroup.add(tagRing);

    // RFID Electromagnetic Shield Wave Particles
    const waveParticlesCount = 60;
    const waveGeo = new THREE.BufferGeometry();
    const wavePositions = new Float32Array(waveParticlesCount * 3);
    for (let i = 0; i < waveParticlesCount; i++) {
      wavePositions[i * 3] = (Math.random() - 0.5) * 3.2;
      wavePositions[i * 3 + 1] = (Math.random() - 0.5) * 2.2;
      wavePositions[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
    }
    waveGeo.setAttribute('position', new THREE.BufferAttribute(wavePositions, 3));
    const waveMat = new THREE.PointsMaterial({
      color: 0xdf9854,
      size: 0.07,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const waveParticles = new THREE.Points(waveGeo, waveMat);
    waveParticles.visible = false;
    rfidGroup.add(waveParticles);

    // Add all 3 layers to root group
    rootGroup.add(innerGroup);
    rootGroup.add(rfidGroup);
    rootGroup.add(outerGroup);

    // Initial orientation: balanced slight isometric view
    rootGroup.rotation.x = 0.15;
    rootGroup.rotation.y = -0.35;

    // Mouse / Touch Drag Rotation Interaction
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;
    let targetRotationX = 0.15;
    let targetRotationY = -0.35;

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      previousMouseX = clientX;
      previousMouseY = clientY;
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const deltaX = clientX - previousMouseX;
      const deltaY = clientY - previousMouseY;

      targetRotationY += deltaX * 0.007;
      targetRotationX += deltaY * 0.007;

      // Clamp vertical tilt
      targetRotationX = Math.max(-0.8, Math.min(0.8, targetRotationX));

      previousMouseX = clientX;
      previousMouseY = clientY;
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', handlePointerDown);
    domElement.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('mouseup', handlePointerUp);
    window.addEventListener('touchend', handlePointerUp);

    // Robust ResizeObserver for automatic centering & sizing
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          camera.aspect = width / height;
          camera.position.z = getOptimalCameraDistance(width, height);
          camera.lookAt(0, 0, 0);
          camera.updateProjectionMatrix();
          renderer.setSize(width, height, false);
        }
      }
    });
    resizeObserver.observe(container);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth layer separation lerp
      const targetSep = animStateRef.current.targetSeparation;
      animStateRef.current.currentSeparation += (targetSep - animStateRef.current.currentSeparation) * 0.08;
      const sep = animStateRef.current.currentSeparation;

      // Symmetrical layer separation along Z-axis (keeps center of gravity dead on 0,0,0)
      outerGroup.position.z = sep * 0.85;
      rfidGroup.position.z = 0;
      innerGroup.position.z = -sep * 0.85;

      // Color theme update
      outerMat.color.copy(getLeatherColor(animStateRef.current.colorTheme));

      // RFID scanning effect
      const isScanning = animStateRef.current.isRfidScanning;
      waveParticles.visible = isScanning;
      if (isScanning) {
        rfidMat.emissiveIntensity = 0.5 + Math.sin(elapsedTime * 8) * 0.35;
        waveMat.opacity = 0.5 + Math.sin(elapsedTime * 6) * 0.4;
        waveParticles.rotation.y += delta * 2;
      } else {
        rfidMat.emissiveIntensity = 0.2;
      }

      // Auto-rotation around exact center
      if (isAutoRotate && !isDragging) {
        targetRotationY += 0.004;
      }

      // Smooth rotational damping
      rootGroup.rotation.y += (targetRotationY - rootGroup.rotation.y) * 0.08;
      rootGroup.rotation.x += (targetRotationX - rootGroup.rotation.x) * 0.08;

      // Gentle breathing float around Y=0
      rootGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.03;

      // Keep camera locked dead center on (0, 0, 0)
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      domElement.removeEventListener('mousedown', handlePointerDown);
      domElement.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchend', handlePointerUp);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      coffeeTexture.dispose();
      rfidTexture.dispose();
    };
  }, [color]);

  const handleToggleExploded = () => {
    sound.playClick();
    setIsExploded(!isExploded);
  };

  const handleToggleAutoRotate = () => {
    sound.playClick();
    setIsAutoRotate(!isAutoRotate);
  };

  const handleToggleRfidScan = () => {
    sound.playShieldDeflect();
    setIsRfidScanActive(!isRfidScanActive);
  };

  return (
    <div className="relative w-full h-[520px] md:h-[620px] rounded-3xl overflow-hidden glass-coffee border border-[#c88242]/20 flex flex-col justify-between p-4 md:p-6 group select-none shadow-2xl">
      
      {/* Top Controls & Status Bar (Never overlaps the 3D model) */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pointer-events-auto">
        <div className="flex items-center gap-2.5 bg-[#0e0b0a]/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#c88242]/25 shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold tracking-wider text-[#eddccb] uppercase font-tech whitespace-nowrap">
            3D Studio View • {color.toUpperCase()}
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Exploded Mode Button */}
          <button
            onClick={handleToggleExploded}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all duration-300 whitespace-nowrap cursor-pointer ${
              isExploded
                ? 'bg-[#c88242] text-white shadow-lg shadow-[#c88242]/30'
                : 'bg-[#1e1714] text-[#d6b074] hover:bg-[#281f1b] border border-[#c88242]/20'
            }`}
            title="Bóc tách các lớp cấu tạo của ví"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{isExploded ? 'Thu Gọn Lớp' : 'Bóc Tách 3 Lớp'}</span>
          </button>

          {/* RFID Wave Simulator */}
          <button
            onClick={handleToggleRfidScan}
            className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all duration-300 whitespace-nowrap cursor-pointer ${
              isRfidScanActive
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
                : 'bg-[#1e1714] text-[#eddccb] hover:bg-[#281f1b] border border-[#c88242]/20'
            }`}
            title="Mô phỏng trường chắn sóng RFID 13.56 MHz"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Thử Khiên RFID</span>
          </button>

          {/* Auto Rotate Toggle */}
          <button
            onClick={handleToggleAutoRotate}
            className={`p-2 rounded-full text-xs transition-all duration-300 cursor-pointer ${
              isAutoRotate
                ? 'bg-[#1e1714] text-[#c88242] border border-[#c88242]/30'
                : 'bg-[#140e0c] text-zinc-500 border border-zinc-800'
            }`}
            title="Bật/Tắt xoay tự động"
            aria-label="Xoay tự động"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isAutoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }} />
          </button>
        </div>
      </div>

      {/* Main 3D WebGL Canvas Container - DEAD CENTER */}
      <div
        ref={mountRef}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center"
      />

      {/* Interactive Exploded View Layer Legend (Bottom overlay) */}
      <div className={`relative z-10 transition-all duration-500 pointer-events-auto ${isExploded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 max-w-3xl mx-auto">
          {/* Layer 1 Badge */}
          <div
            onMouseEnter={() => { sound.playClick(); setActiveLayer(1); }}
            onMouseLeave={() => setActiveLayer(null)}
            className={`p-3 rounded-xl backdrop-blur-md border transition-all cursor-pointer ${
              activeLayer === 1
                ? 'bg-[#c88242]/25 border-[#c88242] shadow-lg scale-102'
                : 'bg-[#0f0c0b]/90 border-[#c88242]/20'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="w-5 h-5 rounded-full bg-[#c88242]/20 text-[#c88242] text-[10px] font-bold flex items-center justify-center border border-[#c88242]/40 shrink-0 font-tech">
                1
              </span>
              <h4 className="text-xs font-semibold text-[#f5efeb] whitespace-nowrap">Vỏ Bio-Composite</h4>
            </div>
            <p className="text-[11px] text-[#b5a89e] leading-snug">
              Bã cà phê Đắk Lắk (1.0-1.3mm), mềm dẻo, kháng nước.
            </p>
          </div>

          {/* Layer 2 Badge */}
          <div
            onMouseEnter={() => { sound.playClick(); setActiveLayer(2); }}
            onMouseLeave={() => setActiveLayer(null)}
            className={`p-3 rounded-xl backdrop-blur-md border transition-all cursor-pointer ${
              activeLayer === 2
                ? 'bg-[#c88242]/25 border-[#c88242] shadow-lg scale-102'
                : 'bg-[#0f0c0b]/90 border-[#c88242]/20'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold flex items-center justify-center border border-amber-500/40 shrink-0 font-tech">
                2
              </span>
              <h4 className="text-xs font-semibold text-[#f5efeb] whitespace-nowrap">Lưới Chắn Sóng RFID</h4>
            </div>
            <p className="text-[11px] text-[#b5a89e] leading-snug">
              Vải dẫn điện phủ Niken & Đồng triệt tiêu sóng 13.56 MHz.
            </p>
          </div>

          {/* Layer 3 Badge */}
          <div
            onMouseEnter={() => { sound.playClick(); setActiveLayer(3); }}
            onMouseLeave={() => setActiveLayer(null)}
            className={`p-3 rounded-xl backdrop-blur-md border transition-all cursor-pointer ${
              activeLayer === 3
                ? 'bg-[#c88242]/25 border-[#c88242] shadow-lg scale-102'
                : 'bg-[#0f0c0b]/90 border-[#c88242]/20'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold flex items-center justify-center border border-emerald-500/40 shrink-0 font-tech">
                3
              </span>
              <h4 className="text-xs font-semibold text-[#f5efeb] whitespace-nowrap">Khoang Kép Smart Tag</h4>
            </div>
            <p className="text-[11px] text-[#b5a89e] leading-snug">
              Dual-Zone độc lập bên ngoài khiên, bắt sóng Bluetooth 2.4 GHz.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="relative z-10 flex items-center justify-between text-[11px] text-[#b5a89e]/80 pointer-events-none">
        <div className="flex items-center gap-1.5 whitespace-nowrap">
          <RotateCcw className="w-3 h-3 text-[#c88242]" />
          <span>Giữ & kéo chuột / vuốt để xoay ví 360°</span>
        </div>
        <div className="font-tech text-[#c88242] whitespace-nowrap">
          Dual-Zone Architecture™
        </div>
      </div>
    </div>
  );
};
