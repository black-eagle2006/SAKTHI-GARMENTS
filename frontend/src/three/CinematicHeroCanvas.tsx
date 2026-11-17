import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ProceduralTShirt, DecalLayer } from './ProceduralTShirt';
import { StudioLighting } from './StudioLighting';

interface CinematicHeroCanvasProps {
  scrollProgress: number; // 0 to 1
  tshirtColor?: string;
  customLayers?: DecalLayer[];
}

const AnimatedHeroScene: React.FC<{
  scrollProgress: number;
  tshirtColor: string;
  customLayers: DecalLayer[];
}> = ({ scrollProgress, tshirtColor, customLayers }) => {
  const tShirtGroupRef = useRef<THREE.Group>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  useFrame(({ camera }) => {
    if (!tShirtGroupRef.current) return;

    // SCENE 1 (0.0 -> 0.18): Intro - Face front, gentle breathing, center position
    // SCENE 2 (0.18 -> 0.40): Rotation - 360 view around, camera zooms closer
    // SCENE 3 (0.40 -> 0.65): Customization reveal - rotate back to front, slight tilt
    // SCENE 4 (0.65 -> 0.85): AI Design showcase - dynamic presentation angle
    // SCENE 5 & 6 (0.85 -> 1.0): Marketplace & CTA - elevated cinematic angle

    const p = Math.min(1, Math.max(0, scrollProgress));

    // Smooth rotation based on scroll progress
    let targetRotY = 0;
    let targetRotX = 0;
    let targetPosY = 0;
    let targetPosZ = 0;
    let cameraZ = 4.2;

    if (p < 0.2) {
      // Scene 1: Initial subtle sway
      targetRotY = p * 0.5;
      targetRotX = 0;
      targetPosY = 0;
      cameraZ = 4.4 - p * 1.0;
    } else if (p < 0.45) {
      // Scene 2: Full dynamic rotation to show sides and back
      const normP = (p - 0.2) / 0.25;
      targetRotY = 0.1 + normP * Math.PI * 2;
      targetRotX = Math.sin(normP * Math.PI) * 0.15;
      targetPosY = 0.1;
      cameraZ = 3.6;
    } else if (p < 0.7) {
      // Scene 3 & 4: Artwork reveal & AI inspection angle
      const normP = (p - 0.45) / 0.25;
      targetRotY = Math.PI * 2 - normP * 0.35;
      targetRotX = 0.1 - normP * 0.05;
      targetPosY = 0.05;
      targetPosZ = normP * 0.2;
      cameraZ = 3.4;
    } else {
      // Scene 5 & 6: Final stylish presentation angle
      const normP = (p - 0.7) / 0.3;
      targetRotY = -0.35 + normP * 0.4;
      targetRotX = 0.05;
      targetPosY = -0.15;
      cameraZ = 3.8;
    }

    // Lerp rotation and position for cinematic smoothness
    tShirtGroupRef.current.rotation.y = THREE.MathUtils.lerp(
      tShirtGroupRef.current.rotation.y,
      targetRotY,
      0.08
    );
    tShirtGroupRef.current.rotation.x = THREE.MathUtils.lerp(
      tShirtGroupRef.current.rotation.x,
      targetRotX,
      0.08
    );
    tShirtGroupRef.current.position.y = THREE.MathUtils.lerp(
      tShirtGroupRef.current.position.y,
      targetPosY,
      0.08
    );
    tShirtGroupRef.current.position.z = THREE.MathUtils.lerp(
      tShirtGroupRef.current.position.z,
      targetPosZ,
      0.08
    );

    camera.position.z = THREE.MathUtils.lerp(camera.position.z, cameraZ, 0.05);
  });

  // Sample artwork that appears dynamically during scroll progress >= 0.35
  const activeFrontLayers = React.useMemo(() => {
    if (scrollProgress >= 0.35) {
      return customLayers.length > 0
        ? customLayers
        : [
            {
              id: 'hero-sample-text-1',
              type: 'text' as const,
              content: 'SAKTHI',
              x: 0.5,
              y: 0.38,
              scale: 1.1,
              rotation: 0,
              color: '#8B5CF6',
              fontFamily: 'Outfit, sans-serif',
              fontSize: 48,
            },
            {
              id: 'hero-sample-text-2',
              type: 'text' as const,
              content: 'FUTURE COUTURE // 2026',
              x: 0.5,
              y: 0.52,
              scale: 0.8,
              rotation: 0,
              color: '#67E8F9',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontSize: 24,
            },
          ];
    }
    return [];
  }, [scrollProgress, customLayers]);

  return (
    <>
      <StudioLighting intensityMultiplier={1.2} />
      <group ref={tShirtGroupRef}>
        <ProceduralTShirt
          color={tshirtColor}
          frontLayers={activeFrontLayers}
          isFloating={scrollProgress < 0.2}
        />
      </group>
    </>
  );
};

export const CinematicHeroCanvas: React.FC<CinematicHeroCanvasProps> = ({
  scrollProgress,
  tshirtColor = '#FFFFFF',
  customLayers = [],
}) => {
  return (
    <div className="w-full h-full relative pointer-events-none">
      <Canvas
        shadows
        camera={{ position: [0, 0, 4.4], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          <AnimatedHeroScene
            scrollProgress={scrollProgress}
            tshirtColor={tshirtColor}
            customLayers={customLayers}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
