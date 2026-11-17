import React, { useRef, useState, Component, ErrorInfo, ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ProceduralTShirt, GarmentType } from '../../three/ProceduralTShirt';
import { StudioLighting } from '../../three/StudioLighting';

interface CinematicSideGarmentProps {
  side: 'left' | 'right';
  garmentType: GarmentType;
  color: string;
  isVisible: boolean;
}

// Error Boundary to prevent WebGL or Three.js context issues from ever breaking the intro
class CanvasErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('CinematicSideGarment WebGL notice:', error.message);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

const FloatingGarmentScene: React.FC<{
  side: 'left' | 'right';
  garmentType: GarmentType;
  color: string;
}> = ({ side, garmentType, color }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Subtle 3D floating & luxury turning animation
    groupRef.current.position.y = Math.sin(t * 1.4 + (side === 'left' ? 0 : Math.PI)) * 0.08;
    groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.35 + (side === 'left' ? 0.25 : -0.25);
    groupRef.current.rotation.x = Math.sin(t * 0.8) * 0.04;
  });

  return (
    <>
      <StudioLighting intensityMultiplier={1.4} />
      <group ref={groupRef} scale={1.05} position={[0, -0.1, 0]}>
        <ProceduralTShirt
          garmentType={garmentType}
          color={color}
          frontLayers={[]}
          backLayers={[]}
          isFloating={false}
        />
      </group>
    </>
  );
};

export const CinematicSideGarment: React.FC<CinematicSideGarmentProps> = ({
  side,
  garmentType,
  color,
  isVisible,
}) => {
  const isLeft = side === 'left';
  const isPolo = garmentType === 'polo';

  // Fallback 2.5D visual in case WebGL is constrained or disabled
  const cssFallback = (
    <div className="w-full h-full flex items-center justify-center animate-pulse">
      <div
        className="w-20 h-28 sm:w-28 sm:h-36 rounded-2xl border border-white/20 shadow-2xl flex flex-col items-center justify-center p-2"
        style={{
          backgroundColor: color,
          transform: `perspective(600px) rotateY(${isLeft ? '18deg' : '-18deg'})`,
          transition: 'transform 1s ease',
        }}
      >
        <div className="w-8 h-4 border-b-2 border-white/40 rounded-full mb-2" />
        <span className="text-[9px] font-mono tracking-widest uppercase font-bold text-white/80">
          {isPolo ? 'POLO' : 'TEE'}
        </span>
      </div>
    </div>
  );

  return (
    <div
      className={`absolute top-1/2 -translate-y-1/2 z-10 pointer-events-none transition-all duration-1000 ease-out ${
        isLeft
          ? 'left-0 sm:left-4 md:left-8 lg:left-12'
          : 'right-0 sm:right-4 md:right-8 lg:right-12'
      } ${
        isVisible
          ? 'opacity-40 sm:opacity-90 translate-x-0 scale-100 filter blur-0'
          : isLeft
          ? 'opacity-0 -translate-x-12 scale-90 filter blur-xs'
          : 'opacity-0 translate-x-12 scale-90 filter blur-xs'
      }`}
    >
      {/* Ambient rim glow behind garment */}
      <div
        className={`w-28 h-28 sm:w-48 sm:h-48 md:w-60 md:h-60 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 filter blur-3xl pointer-events-none transition-opacity duration-1000 ${
          isLeft ? 'bg-[#A31C1B]/25' : 'bg-[#06110C]/50 border border-white/5'
        }`}
      />

      {/* 3D Garment Canvas with Error Boundary */}
      <div className="w-20 h-32 sm:w-40 sm:h-56 md:w-56 md:h-72 lg:w-72 lg:h-88 relative">
        <CanvasErrorBoundary fallback={cssFallback}>
          <Canvas
            camera={{ position: [0, 0, 3.8], fov: 42 }}
            gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
            className="w-full h-full"
          >
            <FloatingGarmentScene side={side} garmentType={garmentType} color={color} />
          </Canvas>
        </CanvasErrorBoundary>

        {/* Elegant Garment Label Pill beneath */}
        <div className="absolute bottom-1 inset-x-0 flex justify-center pointer-events-none">
          <span className="px-2.5 py-0.5 rounded-full bg-black/70 border border-white/10 text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-[#F7F7F5] backdrop-blur-xs">
            {isLeft ? 'Bio-Wash Tee' : 'Collared Polo'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CinematicSideGarment;
