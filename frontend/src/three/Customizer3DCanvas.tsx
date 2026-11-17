import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import { Lock, Unlock } from 'lucide-react';
import { ProceduralTShirt, DecalLayer, GarmentType } from './ProceduralTShirt';
import { StudioLighting } from './StudioLighting';

interface Customizer3DCanvasProps {
  garmentType?: GarmentType;
  tshirtColor: string;
  frontLayers: DecalLayer[];
  backLayers: DecalLayer[];
  cameraView: 'front' | 'back' | 'leftSleeve' | 'rightSleeve' | 'free';
  isRotationLocked?: boolean;
  onToggleRotationLock?: () => void;
  onControlsChange?: () => void;
}

const CameraController: React.FC<{
  cameraView: 'front' | 'back' | 'leftSleeve' | 'rightSleeve' | 'free';
  controlsRef: React.RefObject<any>;
}> = ({ cameraView, controlsRef }) => {
  useEffect(() => {
    if (!controlsRef.current) return;
    const controls = controlsRef.current;

    switch (cameraView) {
      case 'front':
        controls.object.position.set(0, 0, 4.0);
        controls.target.set(0, 0, 0);
        break;
      case 'back':
        controls.object.position.set(0, 0, -4.0);
        controls.target.set(0, 0, 0);
        break;
      case 'leftSleeve':
        controls.object.position.set(-3.2, 0.4, 1.2);
        controls.target.set(-0.6, 0.25, 0);
        break;
      case 'rightSleeve':
        controls.object.position.set(3.2, 0.4, 1.2);
        controls.target.set(0.6, 0.25, 0);
        break;
      case 'free':
      default:
        break;
    }
    controls.update();
  }, [cameraView, controlsRef]);

  return null;
};

export const Customizer3DCanvas: React.FC<Customizer3DCanvasProps> = ({
  garmentType = 'round-neck',
  tshirtColor,
  frontLayers,
  backLayers,
  cameraView,
  isRotationLocked = false,
  onToggleRotationLock,
}) => {
  const controlsRef = useRef<any>(null);

  return (
    <div className="w-full h-full min-h-[380px] sm:min-h-[500px] lg:min-h-[720px] relative cursor-grab active:cursor-grabbing bg-white select-none touch-none">
      {/* 3D Model Lock/Freeze Floating Pill */}
      {onToggleRotationLock && (
        <div className="absolute top-3 right-3 z-20">
          <button
            type="button"
            onClick={onToggleRotationLock}
            title={
              isRotationLocked
                ? 'Garment position is locked (stationary for editing text)'
                : 'Click to lock 3D model in place'
            }
            className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-sm border transition-all ${
              isRotationLocked
                ? 'bg-[#A31C1B] text-white border-[#A31C1B]'
                : 'bg-white/95 text-[#171717] border-[#E5E5E5] hover:border-[#171717]'
            }`}
          >
            {isRotationLocked ? (
              <Lock className="w-3.5 h-3.5 text-white" />
            ) : (
              <Unlock className="w-3.5 h-3.5 text-[#666666]" />
            )}
            <span>{isRotationLocked ? '3D Locked' : 'Lock 3D Model'}</span>
          </button>
        </div>
      )}

      <Canvas
        id="customizer-webgl-canvas"
        shadows
        camera={{ position: [0, 0, 4.0], fov: 45 }}
        gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
        className="w-full h-full bg-white"
        style={{ width: '100%', height: '100%', minHeight: '380px' }}
      >
        <StudioLighting intensityMultiplier={1.3} />

        <ProceduralTShirt
          garmentType={garmentType}
          color={tshirtColor}
          frontLayers={frontLayers}
          backLayers={backLayers}
          isFloating={false}
        />

        <ContactShadows
          position={[0, -1.35, 0]}
          opacity={0.35}
          scale={4.5}
          blur={2.4}
          far={2.5}
        />

        <OrbitControls
          ref={controlsRef}
          enableRotate={!isRotationLocked}
          enableZoom={!isRotationLocked}
          enablePan={false}
          target={[0, 0, 0]}
          minDistance={2.0}
          maxDistance={6.0}
          maxPolarAngle={Math.PI / 1.7}
          minPolarAngle={Math.PI / 3.5}
        />

        <CameraController cameraView={cameraView} controlsRef={controlsRef} />
      </Canvas>
    </div>
  );
};

export default Customizer3DCanvas;
