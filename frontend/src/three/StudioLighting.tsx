import React from 'react';

interface StudioLightingProps {
  intensityMultiplier?: number;
}

export const StudioLighting: React.FC<StudioLightingProps> = ({ intensityMultiplier = 1 }) => {
  return (
    <>
      {/* Ambient base lighting */}
      <ambientLight intensity={0.75 * intensityMultiplier} color="#FFFFFF" />

      {/* Key Light: Crisp frontal-high studio key */}
      <directionalLight
        position={[4, 6, 6]}
        intensity={1.3 * intensityMultiplier}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
        color="#FFFFFF"
      />

      {/* Fill Light: Soft natural studio fill */}
      <directionalLight
        position={[-5, 2, 4]}
        intensity={0.65 * intensityMultiplier}
        color="#F7F7F5"
      />

      {/* Rim / Silhouette Light: Clean top-back edge reflection */}
      <directionalLight
        position={[0, 4, -5]}
        intensity={0.85 * intensityMultiplier}
        color="#FFFFFF"
      />

      {/* Soft ground bounce */}
      <pointLight
        position={[0, -3, 1]}
        intensity={0.3 * intensityMultiplier}
        color="#FFFFFF"
        distance={8}
      />
    </>
  );
};

export default StudioLighting;
