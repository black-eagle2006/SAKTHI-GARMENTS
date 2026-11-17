import React, { useLayoutEffect, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { createCottonFabricTexture } from './proceduralTextures';
import { useDecalTexture } from './decalTexture';
import {
  PLACKET,
  ShirtKind,
  createCollarStitchGeometry,
  createHemGeometries,
  createPlacketGeometry,
  createPlacketStitchGeometries,
  createPoloCollarGeometry,
  createPrintPatchGeometry,
  createRibCollarGeometry,
  createSleeveGeometry,
  createSleeveHemGeometries,
  createTorsoGeometry,
  frontCentre,
} from './shirtGeometry';

export interface DecalLayer {
  id: string;
  type: 'text' | 'image';
  content: string; // text string or image URL/base64
  x: number; // 0 to 1 relative on print area
  y: number; // 0 to 1 relative on print area
  scale: number;
  rotation: number; // in degrees
  color?: string; // for text
  fontFamily?: string;
  fontSize?: number;
  textAlign?: 'left' | 'center' | 'right';
  locked?: boolean;
}

export type GarmentType = 'round-neck' | 'polo';

export interface GarmentModelProps {
  garmentType?: GarmentType;
  color?: string;
  frontLayers?: DecalLayer[];
  backLayers?: DecalLayer[];
  view?: 'front' | 'side' | 'back' | 'custom';
  customRotation?: [number, number, number];
  scale?: number;
  position?: [number, number, number];
}

/** Everything that depends on the garment style (round-neck tee vs polo). */
function buildShirt(kind: ShirtKind) {
  const sleeveHemL = createSleeveHemGeometries(-1, kind);
  const sleeveHemR = createSleeveHemGeometries(1, kind);
  const hem = createHemGeometries();
  const isPolo = kind === 'polo';

  const shirt = {
    torso: createTorsoGeometry(kind),
    sleeveL: createSleeveGeometry(-1, kind),
    sleeveR: createSleeveGeometry(1, kind),
    hemRoll: hem.roll,
    hemStitch: hem.stitch,
    sleeveHemL,
    sleeveHemR,
    printFront: createPrintPatchGeometry('front', kind),
    printBack: createPrintPatchGeometry('back', kind),
    ribCollar: isPolo ? null : createRibCollarGeometry(kind),
    collarStitch: isPolo ? null : createCollarStitchGeometry(kind),
    poloCollar: isPolo ? createPoloCollarGeometry() : null,
    placket: isPolo ? createPlacketGeometry() : null,
    placketStitches: isPolo ? createPlacketStitchGeometries() : [],
    buttons: isPolo
      ? PLACKET.buttons.map((y) => {
          const { p, n } = frontCentre(y, kind);
          const pos = p.clone().addScaledVector(n, 0.0105);
          const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), n);
          return { pos: pos.toArray() as [number, number, number], quat: quat.toArray() as [number, number, number, number] };
        })
      : [],
  };

  const geometries: THREE.BufferGeometry[] = [
    shirt.torso,
    shirt.sleeveL,
    shirt.sleeveR,
    shirt.hemRoll,
    shirt.hemStitch,
    sleeveHemL.roll,
    sleeveHemL.stitch,
    sleeveHemR.roll,
    sleeveHemR.stitch,
    shirt.printFront,
    shirt.printBack,
  ];
  for (const g of [
    sleeveHemL.band,
    sleeveHemR.band,
    shirt.ribCollar,
    shirt.collarStitch,
    shirt.poloCollar,
    shirt.placket,
    ...shirt.placketStitches,
  ]) {
    if (g) geometries.push(g);
  }
  return { shirt, geometries };
}

/** Slightly darker (light fabrics) or lighter (dark fabrics) tone for stitching / ribbing. */
function tonal(base: THREE.Color, darken: number, lighten: number): THREE.Color {
  const hsl = { h: 0, s: 0, l: 0 };
  base.getHSL(hsl);
  const l = hsl.l > 0.45 ? hsl.l * darken : Math.min(1, hsl.l + lighten);
  return new THREE.Color().setHSL(hsl.h, hsl.s, l);
}

export const GarmentModel: React.FC<GarmentModelProps> = ({
  garmentType = 'round-neck',
  color = '#FFFFFF',
  frontLayers = [],
  backLayers = [],
  view = 'front',
  customRotation,
  scale = 1.0,
  position = [0, 0, 0],
}) => {
  const kind: ShirtKind = garmentType === 'polo' ? 'polo' : 'round-neck';
  const isPolo = kind === 'polo';

  // ---------------------------------------------------------------- geometry
  const built = useMemo(() => buildShirt(kind), [kind]);
  const g = built.shirt;

  // ---------------------------------------------------------------- materials
  const fabricBump = useMemo(() => {
    const tex = createCottonFabricTexture();
    tex.repeat.set(2.6, 2.6);
    tex.anisotropy = 8;
    return tex;
  }, []);

  const mats = useMemo(
    () => ({
      fabric: new THREE.MeshPhysicalMaterial({
        roughness: 0.86,
        metalness: 0,
        sheen: 0.55,
        sheenRoughness: 0.55,
        sheenColor: new THREE.Color('#ffffff'),
        bumpMap: fabricBump,
        bumpScale: 0.012,
        side: THREE.DoubleSide,
      }),
      rib: new THREE.MeshPhysicalMaterial({
        roughness: 0.9,
        metalness: 0,
        sheen: 0.4,
        sheenRoughness: 0.6,
        sheenColor: new THREE.Color('#ffffff'),
        bumpMap: fabricBump,
        bumpScale: 0.022,
        side: THREE.DoubleSide,
      }),
      stitch: new THREE.MeshStandardMaterial({ roughness: 0.9, metalness: 0 }),
      button: new THREE.MeshStandardMaterial({ color: '#25262b', roughness: 0.28, metalness: 0.12 }),
      buttonHole: new THREE.MeshBasicMaterial({ color: '#0d0d10' }),
    }),
    [fabricBump]
  );

  // Update colours in place (no material re-creation / leak on every swatch click).
  useLayoutEffect(() => {
    // If pure white #FFFFFF, use a realistic combed cotton albedo (#EAEAE6)
    // so shadows, neckline stitches, and fabric folds remain clearly visible against pure white background
    const isPureWhite = color.toUpperCase() === '#FFFFFF';
    const base = isPureWhite ? new THREE.Color('#EAEAE6') : new THREE.Color(color);
    mats.fabric.color.copy(base);
    mats.rib.color.copy(base).multiplyScalar(0.97);
    mats.stitch.color.copy(tonal(base, 0.8, 0.1));
  }, [color, mats]);

  // ---------------------------------------------------------------- artwork
  const frontTexture = useDecalTexture(frontLayers);
  const backTexture = useDecalTexture(backLayers);

  // ---------------------------------------------------------------- orientation
  const rotation: [number, number, number] = useMemo(() => {
    if (customRotation) return customRotation;
    switch (view) {
      case 'front':
        return [0, 0, 0];
      case 'side':
        return [0, -Math.PI / 2, 0];
      case 'back':
        return [0, Math.PI, 0];
      default:
        return [0, 0, 0];
    }
  }, [view, customRotation]);

  const renderSleeveHem = (hem: typeof g.sleeveHemL, key: string) => (
    <group key={key}>
      <mesh geometry={hem.roll} material={mats.rib} />
      <mesh geometry={hem.stitch} material={mats.stitch} />
      {hem.band && <mesh geometry={hem.band} material={mats.rib} castShadow receiveShadow />}
    </group>
  );

  return (
    <group position={position} rotation={rotation} scale={[scale, scale, scale]} dispose={null}>
      {/* 1. Body: one continuous shell (front, back, shoulders) */}
      <mesh geometry={g.torso} material={mats.fabric} castShadow receiveShadow />

      {/* 2. Set-in short sleeves */}
      <mesh geometry={g.sleeveL} material={mats.fabric} castShadow receiveShadow />
      <mesh geometry={g.sleeveR} material={mats.fabric} castShadow receiveShadow />
      {renderSleeveHem(g.sleeveHemL, 'hem-l')}
      {renderSleeveHem(g.sleeveHemR, 'hem-r')}

      {/* 3. Rolled bottom hem with top-stitching */}
      <mesh geometry={g.hemRoll} material={mats.rib} />
      <mesh geometry={g.hemStitch} material={mats.stitch} />

      {/* 4. Neckline */}
      {!isPolo && g.ribCollar && g.collarStitch && (
        <>
          <mesh geometry={g.ribCollar} material={mats.rib} castShadow receiveShadow />
          <mesh geometry={g.collarStitch} material={mats.stitch} />
        </>
      )}

      {isPolo && g.poloCollar && g.placket && (
        <>
          <mesh geometry={g.poloCollar} material={mats.rib} castShadow receiveShadow />
          <mesh geometry={g.placket} material={mats.fabric} castShadow receiveShadow />
          {g.placketStitches.map((geo, i) => (
            <mesh key={`ps-${i}`} geometry={geo} material={mats.stitch} />
          ))}
          {g.buttons.map((b, i) => (
            <group key={`btn-${i}`} position={b.pos} quaternion={b.quat}>
              <mesh material={mats.button} castShadow>
                <cylinderGeometry args={[0.03, 0.03, 0.011, 28]} />
              </mesh>
              <mesh position={[0, 0.0055, 0]} rotation={[Math.PI / 2, 0, 0]} material={mats.button}>
                <torusGeometry args={[0.0255, 0.0035, 8, 28]} />
              </mesh>
              {[
                [-0.008, -0.008],
                [0.008, -0.008],
                [-0.008, 0.008],
                [0.008, 0.008],
              ].map(([hx, hz], k) => (
                <mesh key={k} position={[hx, 0.0058, hz]} rotation={[-Math.PI / 2, 0, 0]} material={mats.buttonHole}>
                  <circleGeometry args={[0.0032, 10]} />
                </mesh>
              ))}
            </group>
          ))}
        </>
      )}

      {/* 5. Print areas — wrapped onto the real fabric surface */}
      {frontTexture && (
        <mesh geometry={g.printFront} renderOrder={2}>
          <meshBasicMaterial
            map={frontTexture}
            transparent
            opacity={0.96}
            depthWrite={false}
            toneMapped={false}
            polygonOffset
            polygonOffsetFactor={-2}
            polygonOffsetUnits={-2}
            side={THREE.FrontSide}
          />
        </mesh>
      )}
      {backTexture && (
        <mesh geometry={g.printBack} renderOrder={2}>
          <meshBasicMaterial
            map={backTexture}
            transparent
            opacity={0.96}
            depthWrite={false}
            toneMapped={false}
            polygonOffset
            polygonOffsetFactor={-2}
            polygonOffsetUnits={-2}
            side={THREE.FrontSide}
          />
        </mesh>
      )}
    </group>
  );
};

export default GarmentModel;
