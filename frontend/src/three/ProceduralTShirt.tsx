import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { GarmentModel, DecalLayer, GarmentType } from './GarmentModel';

export type { DecalLayer, GarmentType };

export interface TShirtCustomizationProps {
  garmentType?: GarmentType;
  color?: string;
  frontLayers?: DecalLayer[];
  backLayers?: DecalLayer[];
  leftSleeveLayers?: DecalLayer[];
  rightSleeveLayers?: DecalLayer[];
  activeSide?: 'front' | 'back' | 'leftSleeve' | 'rightSleeve';
  isFloating?: boolean;
}

export const ProceduralTShirt: React.FC<TShirtCustomizationProps> = ({
  garmentType = 'round-neck',
  color = '#FFFFFF',
  frontLayers = [],
  backLayers = [],
  isFloating = false,
}) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (isFloating && groupRef.current) {
      const t = state.clock.getElapsedTime();
      groupRef.current.position.y = Math.sin(t * 1.5) * 0.05;
      groupRef.current.rotation.y = Math.sin(t * 0.8) * 0.04;
    }
  });

  return (
    <group ref={groupRef} dispose={null}>
      <GarmentModel
        garmentType={garmentType}
        color={color}
        frontLayers={frontLayers}
        backLayers={backLayers}
        view="front"
        scale={1.0}
      />
    </group>
  );
};

export default ProceduralTShirt;
