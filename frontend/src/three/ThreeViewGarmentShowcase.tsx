import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import { GarmentModel, DecalLayer, GarmentType } from './GarmentModel';

interface ThreeViewGarmentShowcaseProps {
  color?: string;
  frontLayers?: DecalLayer[];
  backLayers?: DecalLayer[];
  className?: string;
  initialGarmentType?: GarmentType;
  onGarmentTypeChange?: (type: GarmentType) => void;
}

const StudioLighting: React.FC = () => {
  return (
    <>
      <ambientLight intensity={0.65} color="#FFFFFF" />
      {/* Key Light (Front-Left top) */}
      <directionalLight
        position={[3.2, 5.0, 4.0]}
        intensity={1.25}
        color="#FFFFFF"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
      />
      {/* Fill Light (Front-Right soft) */}
      <directionalLight
        position={[-3.5, 3.0, 3.2]}
        intensity={0.7}
        color="#EEF2FF"
      />
      {/* Back Rim Light (Highlights collar and shoulder silhouette) */}
      <directionalLight
        position={[0, 4.2, -4.5]}
        intensity={0.9}
        color="#FFFFFF"
      />
      {/* Bottom Soft Bounce */}
      <directionalLight
        position={[0, -3.0, 2.0]}
        intensity={0.25}
        color="#FFFFFF"
      />
    </>
  );
};

export const ThreeViewGarmentShowcase: React.FC<ThreeViewGarmentShowcaseProps> = ({
  color = '#FFFFFF',
  frontLayers = [],
  backLayers = [],
  className = '',
  initialGarmentType = 'round-neck',
  onGarmentTypeChange,
}) => {
  const [garmentType, setGarmentType] = useState<GarmentType>(initialGarmentType);
  const [activeTab, setActiveTab] = useState<'front-back' | 'three-views' | 'front' | 'back' | 'side'>('front-back');

  const handleTypeSelect = (type: GarmentType) => {
    setGarmentType(type);
    if (onGarmentTypeChange) onGarmentTypeChange(type);
  };

  return (
    <div
      className={`w-full rounded-[28px] overflow-hidden bg-[#202327] border border-white/10 shadow-2xl relative flex flex-col ${className}`}
      style={{
        boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
      }}
    >
      {/* Top Header Bar: Garment Style Selector + View Modes */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-white/5 bg-[#1a1d21]/90 backdrop-blur-md z-10">
        {/* Garment Type Selector (Round Neck vs Polo Collar) */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-white/50 uppercase tracking-wider mr-1">
            Garment:
          </span>
          <div className="flex items-center bg-[#141618] p-1 rounded-xl border border-white/10">
            <button
              onClick={() => handleTypeSelect('round-neck')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                garmentType === 'round-neck'
                  ? 'bg-[#06110C] text-white shadow-sm'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Round Neck T-Shirt
            </button>
            <button
              onClick={() => handleTypeSelect('polo')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                garmentType === 'polo'
                  ? 'bg-[#06110C] text-white shadow-sm'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Collar-Neck Polo
            </button>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center bg-[#141618] p-1 rounded-xl border border-white/5">
          <button
            onClick={() => setActiveTab('front-back')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'front-back'
                ? 'bg-white/20 text-white shadow-sm font-bold'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Front & Back
          </button>
          <button
            onClick={() => setActiveTab('three-views')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'three-views'
                ? 'bg-white/20 text-white shadow-sm font-bold'
                : 'text-white/60 hover:text-white'
            }`}
          >
            3-View Row
          </button>
          <button
            onClick={() => setActiveTab('front')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'front'
                ? 'bg-white/20 text-white shadow-sm font-bold'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Front
          </button>
          <button
            onClick={() => setActiveTab('back')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'back'
                ? 'bg-white/20 text-white shadow-sm font-bold'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Back
          </button>
          <button
            onClick={() => setActiveTab('side')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'side'
                ? 'bg-white/20 text-white shadow-sm font-bold'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Side
          </button>
        </div>
      </div>

      {/* Main 3D Stage on Neutral Dark Charcoal Canvas */}
      <div className="relative w-full flex-grow h-[460px] sm:h-[520px] lg:h-[560px] flex items-center justify-center bg-[#202327]">
        <Canvas
          shadows
          camera={{
            position: [
              0,
              0.05,
              activeTab === 'three-views' ? 4.9 : activeTab === 'front-back' ? 4.4 : 3.8,
            ],
            fov: activeTab === 'three-views' ? 46 : activeTab === 'front-back' ? 44 : 42,
          }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          className="w-full h-full"
        >
          <Suspense fallback={null}>
            <StudioLighting />

            {/* 1. CLEAN TWO-VIEW COMPOSITION (LEFT: FRONT, RIGHT: BACK) */}
            {activeTab === 'front-back' && (
              <>
                {/* LEFT: FRONT VIEW */}
                <group position={[-1.75, 0.05, 0]}>
                  <GarmentModel
                    garmentType={garmentType}
                    color={color}
                    frontLayers={frontLayers}
                    backLayers={backLayers}
                    view="front"
                    scale={1.14}
                  />
                  <ContactShadows
                    position={[0, -1.45, 0]}
                    opacity={0.48}
                    scale={2.8}
                    blur={2.0}
                    far={2.5}
                  />
                </group>

                {/* RIGHT: BACK VIEW */}
                <group position={[1.75, 0.05, 0]}>
                  <GarmentModel
                    garmentType={garmentType}
                    color={color}
                    frontLayers={frontLayers}
                    backLayers={backLayers}
                    view="back"
                    scale={1.14}
                  />
                  <ContactShadows
                    position={[0, -1.45, 0]}
                    opacity={0.48}
                    scale={2.8}
                    blur={2.0}
                    far={2.5}
                  />
                </group>
              </>
            )}

            {/* 2. THREE-VIEW ROW (FRONT, SIDE, BACK) */}
            {activeTab === 'three-views' && (
              <>
                <group position={[-2.5, 0.05, 0]}>
                  <GarmentModel
                    garmentType={garmentType}
                    color={color}
                    frontLayers={frontLayers}
                    backLayers={backLayers}
                    view="front"
                    scale={1.08}
                  />
                  <ContactShadows position={[0, -1.35, 0]} opacity={0.45} scale={2.6} blur={2.0} far={2.5} />
                </group>
                <group position={[0, 0.05, 0]}>
                  <GarmentModel
                    garmentType={garmentType}
                    color={color}
                    frontLayers={frontLayers}
                    backLayers={backLayers}
                    view="side"
                    scale={1.08}
                  />
                  <ContactShadows position={[0, -1.35, 0]} opacity={0.45} scale={2.6} blur={2.0} far={2.5} />
                </group>
                <group position={[2.5, 0.05, 0]}>
                  <GarmentModel
                    garmentType={garmentType}
                    color={color}
                    frontLayers={frontLayers}
                    backLayers={backLayers}
                    view="back"
                    scale={1.08}
                  />
                  <ContactShadows position={[0, -1.35, 0]} opacity={0.45} scale={2.6} blur={2.0} far={2.5} />
                </group>
              </>
            )}

            {/* 3. SINGLE FOCUSED VIEWS */}
            {activeTab === 'front' && (
              <group position={[0, 0, 0]}>
                <GarmentModel
                  garmentType={garmentType}
                  color={color}
                  frontLayers={frontLayers}
                  backLayers={backLayers}
                  view="front"
                  scale={1.22}
                />
                <ContactShadows position={[0, -1.5, 0]} opacity={0.5} scale={3.2} blur={2.2} far={3.0} />
              </group>
            )}

            {activeTab === 'back' && (
              <group position={[0, 0, 0]}>
                <GarmentModel
                  garmentType={garmentType}
                  color={color}
                  frontLayers={frontLayers}
                  backLayers={backLayers}
                  view="back"
                  scale={1.22}
                />
                <ContactShadows position={[0, -1.5, 0]} opacity={0.5} scale={3.2} blur={2.2} far={3.0} />
              </group>
            )}

            {activeTab === 'side' && (
              <group position={[0, 0, 0]}>
                <GarmentModel
                  garmentType={garmentType}
                  color={color}
                  frontLayers={frontLayers}
                  backLayers={backLayers}
                  view="side"
                  scale={1.22}
                />
                <ContactShadows position={[0, -1.5, 0]} opacity={0.5} scale={3.2} blur={2.2} far={3.0} />
              </group>
            )}
          </Suspense>
        </Canvas>
      </div>

      {/* Bottom Labels Bar */}
      <div className="py-3 px-6 bg-[#181a1e]/90 border-t border-white/5 flex items-center justify-between text-xs text-white/60">
        {activeTab === 'front-back' ? (
          <div className="grid grid-cols-2 w-full text-center">
            <span className="font-bold text-white uppercase tracking-wider">
              Left: Front View ({garmentType === 'round-neck' ? 'Classic Crew Neck' : 'Polo Collar & 3 Buttons'})
            </span>
            <span className="font-bold text-white uppercase tracking-wider border-l border-white/10">
              Right: Back View (Rear Silhouette & Shoulder Drape)
            </span>
          </div>
        ) : activeTab === 'three-views' ? (
          <div className="grid grid-cols-3 w-full text-center">
            <span className="font-bold text-white uppercase tracking-wider">1. Front View</span>
            <span className="font-bold text-[#A31C1B] uppercase tracking-wider border-x border-white/10">2. Side Profile</span>
            <span className="font-bold text-white uppercase tracking-wider">3. Back View</span>
          </div>
        ) : (
          <div className="w-full text-center">
            <span className="font-bold text-white uppercase tracking-wider">
              {activeTab === 'front' ? 'Front Product Inspection' : activeTab === 'back' ? 'Rear Product Inspection' : 'Side Profile Inspection'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThreeViewGarmentShowcase;
