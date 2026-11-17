import * as THREE from 'three';

/**
 * shirtGeometry.ts
 * ---------------------------------------------------------------------------
 * Procedural, regular-fit shirt geometry for the SAKTHI GARMENTS 3D studio.
 *
 * Units: 1 world unit ≈ 32 cm on a size-L tee (hem → neck ≈ 2.2 units ≈ 72 cm).
 * Axes : +x = viewer's right when looking at the FRONT, +y = up, +z = front.
 *
 * Everything is derived from ONE body-surface function (`torsoPoint`), so the
 * collar, placket, hem stitching and the print areas (decals) all sit exactly
 * on the fabric instead of floating next to it.
 */

export type ShirtKind = 'round-neck' | 'polo';
export type ShirtSide = 'front' | 'back';

/* ------------------------------------------------------------------------ */
/*  Small math helpers                                                       */
/* ------------------------------------------------------------------------ */

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const lerp = THREE.MathUtils.lerp;

/** GLSL-style smoothstep. Works for edge0 > edge1 too (inverted ramp). */
function smoothstep(e0: number, e1: number, x: number): number {
  const t = clamp01((x - e0) / (e1 - e0));
  return t * t * (3 - 2 * t);
}

/** Signed power used for super-ellipse cross sections. */
const sgnPow = (c: number, e: number) => Math.sign(c) * Math.pow(Math.abs(c), e);

/** Cubic-Hermite interpolation through (x, value) keys with smooth tangents. */
function keyed(x: number, keys: ReadonlyArray<readonly [number, number]>): number {
  const n = keys.length;
  if (x <= keys[0][0]) return keys[0][1];
  if (x >= keys[n - 1][0]) return keys[n - 1][1];
  let i = 0;
  while (i < n - 2 && x > keys[i + 1][0]) i++;
  const [x0, y0] = keys[i];
  const [x1, y1] = keys[i + 1];
  const tan = (k: number) => {
    const a = keys[Math.max(0, k - 1)];
    const b = keys[Math.min(n - 1, k + 1)];
    return (b[1] - a[1]) / (b[0] - a[0]);
  };
  const h = x1 - x0;
  const t = (x - x0) / h;
  const t2 = t * t;
  const t3 = t2 * t;
  return (
    (2 * t3 - 3 * t2 + 1) * y0 +
    (t3 - 2 * t2 + t) * h * tan(i) +
    (-2 * t3 + 3 * t2) * y1 +
    (t3 - t2) * h * tan(i + 1)
  );
}

/* ------------------------------------------------------------------------ */
/*  Master measurements                                                      */
/* ------------------------------------------------------------------------ */

export const SHIRT = {
  hemY: -1.18,
  /** Height where the straight body ends and the shoulder slope begins. */
  shoulderY: 0.78,
  neckY: 1.03,
  /** Super-ellipse exponent of the body cross-section (2 = ellipse). */
  bodyExp: 2.5,
} as const;

/** Half width of the body (x) as a function of height. */
const halfWidth = (y: number) =>
  keyed(y, [
    [-1.18, 0.59],
    [-0.6, 0.572],
    [0.0, 0.586],
    [0.45, 0.6],
    [0.78, 0.596],
  ]);

/** Half depth of the FRONT / BACK panel as a function of height. */
const depthFront = (y: number) =>
  keyed(y, [
    [-1.18, 0.255],
    [-0.4, 0.262],
    [0.2, 0.285],
    [0.6, 0.295],
    [0.78, 0.285],
  ]);
const depthBack = (y: number) =>
  keyed(y, [
    [-1.18, 0.235],
    [-0.4, 0.24],
    [0.2, 0.255],
    [0.6, 0.265],
    [0.78, 0.255],
  ]);

interface NeckConfig {
  nx: number; // half width of the neck opening
  nzF: number; // front half depth
  nzB: number; // back half depth
  nzC: number; // forward shift of the neck centre
  dropF: number; // how far the neckline dips at the front
  dropB: number; // ...and at the back
}

const NECK: Record<ShirtKind, NeckConfig> = {
  'round-neck': { nx: 0.228, nzF: 0.2, nzB: 0.15, nzC: 0.012, dropF: 0.15, dropB: 0.03 },
  polo: { nx: 0.205, nzF: 0.175, nzB: 0.14, nzC: 0.008, dropF: 0.055, dropB: 0.022 },
};

export const neckConfig = (kind: ShirtKind): NeckConfig => NECK[kind];

/* ------------------------------------------------------------------------ */
/*  Generic lofted surface                                                   */
/* ------------------------------------------------------------------------ */

type SurfaceFn = (u: number, v: number) => THREE.Vector3;

interface LoftOptions {
  /** u wraps around (last column == first column). Seam normals are merged. */
  closedU?: boolean;
  /** v wraps around too (a tube). */
  closedV?: boolean;
  /** Reverse triangle winding. */
  flip?: boolean;
  /** UV density: texture repeats per world unit (before material.repeat). */
  uvPerUnit?: number;
}

/**
 * Builds an indexed grid surface from a (u, v) → position function.
 * UVs follow real arc-length so the cotton weave has uniform density.
 */
export function loft(
  rows: number,
  cols: number,
  fn: SurfaceFn,
  { closedU = false, closedV = false, flip = false, uvPerUnit = 1 }: LoftOptions = {}
): THREE.BufferGeometry {
  const stride = cols + 1;
  const pts: THREE.Vector3[] = [];
  for (let r = 0; r <= rows; r++) {
    for (let c = 0; c <= cols; c++) {
      pts.push(fn(c / cols, r / rows));
    }
  }

  const pos = new Float32Array(pts.length * 3);
  const uv = new Float32Array(pts.length * 2);
  // cumulative arc length along u (per row) and v (per column)
  const cu = new Float32Array(pts.length);
  const cv = new Float32Array(pts.length);
  for (let r = 0; r <= rows; r++) {
    for (let c = 0; c <= cols; c++) {
      const i = r * stride + c;
      if (c > 0) cu[i] = cu[i - 1] + pts[i].distanceTo(pts[i - 1]);
      if (r > 0) cv[i] = cv[i - stride] + pts[i].distanceTo(pts[i - stride]);
      pos[i * 3] = pts[i].x;
      pos[i * 3 + 1] = pts[i].y;
      pos[i * 3 + 2] = pts[i].z;
      uv[i * 2] = cu[i] * uvPerUnit;
      uv[i * 2 + 1] = cv[i] * uvPerUnit;
    }
  }

  const idx: number[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const p1 = r * stride + c;
      const p2 = p1 + stride;
      const p3 = p1 + 1;
      const p4 = p2 + 1;
      if (flip) idx.push(p1, p3, p2, p3, p4, p2);
      else idx.push(p1, p2, p3, p3, p2, p4);
    }
  }

  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  g.setIndex(idx);
  g.computeVertexNormals();

  // Merge normals across wrapped seams so there is no visible shading line.
  const nrm = g.getAttribute('normal') as THREE.BufferAttribute;
  const merge = (a: number, b: number) => {
    const x = nrm.getX(a) + nrm.getX(b);
    const y = nrm.getY(a) + nrm.getY(b);
    const z = nrm.getZ(a) + nrm.getZ(b);
    const l = Math.hypot(x, y, z) || 1;
    nrm.setXYZ(a, x / l, y / l, z / l);
    nrm.setXYZ(b, x / l, y / l, z / l);
  };
  if (closedU) for (let r = 0; r <= rows; r++) merge(r * stride, r * stride + cols);
  if (closedV) for (let c = 0; c <= cols; c++) merge(c, rows * stride + c);
  nrm.needsUpdate = true;

  g.computeBoundingSphere();
  return g;
}

/* ------------------------------------------------------------------------ */
/*  Torso                                                                    */
/* ------------------------------------------------------------------------ */

/** Fraction of the ring rows spent on the straight body (rest = shoulders). */
const BODY_FRACTION = 0.8;
const TORSO_ROWS = 84;
const TORSO_COLS = 144;

/** Undisplaced body ring (super-ellipse) at height y, angle θ (θ=π/2 → front). */
function bodyRing(theta: number, y: number): [number, number] {
  const c = Math.cos(theta);
  const s = Math.sin(theta);
  const e = 2 / SHIRT.bodyExp;
  const A = halfWidth(y);
  const B = s >= 0 ? depthFront(y) : depthBack(y);
  return [A * sgnPow(c, e), B * sgnPow(s, e)];
}

/**
 * Gentle fabric drape (metres of outward push, in world units).
 * Kept below ~0.012 so the silhouette stays clean while the shading breaks up.
 */
function drape(theta: number, y: number): number {
  const low = smoothstep(0.55, -0.7, y); // stronger on the lower body
  const hemFade = smoothstep(SHIRT.hemY, SHIRT.hemY + 0.12, y);
  const topFade = 1 - smoothstep(0.5, 0.78, y);
  let d = 0.0085 * low * Math.sin(5 * theta + 1.4 * Math.sin(2.3 * y + 0.6));
  d += 0.0045 * (0.4 + 0.6 * low) * Math.sin(9 * theta - 3.2 * y + 0.8);
  // diagonal pull creases below each armhole
  const armpit = Math.exp(-Math.pow((y - 0.4) / 0.2, 2)) * Math.pow(Math.abs(Math.cos(theta)), 6);
  d += 0.009 * armpit * Math.sin(16 * (y - 0.4) + 5 * Math.sin(theta));
  return d * hemFade * topFade;
}

/**
 * Surface point of the torso.
 *  θ : 0 → +x (side), π/2 → front, π → −x, 3π/2 → back
 *  h : 0 at the hem, 1 at the neck opening
 */
export function torsoPoint(theta: number, h: number, kind: ShirtKind, out = new THREE.Vector3()): THREE.Vector3 {
  const nk = NECK[kind];
  const s = Math.sin(theta);
  const c = Math.cos(theta);

  if (h <= BODY_FRACTION) {
    const y = lerp(SHIRT.hemY, SHIRT.shoulderY, h / BODY_FRACTION);
    let [x, z] = bodyRing(theta, y);
    // push along the ring's outward direction
    const A = halfWidth(y);
    const B = s >= 0 ? depthFront(y) : depthBack(y);
    let gx = x / (A * A);
    let gz = z / (B * B);
    const gl = Math.hypot(gx, gz) || 1;
    gx /= gl;
    gz /= gl;
    const d = drape(theta, y);
    x += gx * d;
    z += gz * d;
    return out.set(x, y, z);
  }

  // Shoulder yoke: blend body ring → neck ring while rising to the neckline.
  const t = (h - BODY_FRACTION) / (1 - BODY_FRACTION);
  const [x0, z0] = bodyRing(theta, SHIRT.shoulderY);
  const x1 = nk.nx * c;
  const z1 = nk.nzC + (s >= 0 ? nk.nzF : nk.nzB) * s;
  const yN = SHIRT.neckY - (s >= 0 ? nk.dropF * Math.pow(s, 2) : nk.dropB * Math.pow(-s, 2));
  const e = t * t * (3 - 2 * t);
  const ee = 0.55 * e + 0.45 * t;
  const y = lerp(SHIRT.shoulderY, yN, t) + 0.018 * Math.sin(Math.PI * t) * c * c;
  return out.set(lerp(x0, x1, ee), y, lerp(z0, z1, ee));
}

/** Position on the neck opening edge at angle θ. */
export const neckPoint = (theta: number, kind: ShirtKind) => torsoPoint(theta, 1, kind);

export function createTorsoGeometry(kind: ShirtKind): THREE.BufferGeometry {
  const tmp = new THREE.Vector3();
  return loft(
    TORSO_ROWS,
    TORSO_COLS,
    (u, v) => torsoPoint(u * Math.PI * 2, v, kind, tmp).clone(),
    { closedU: true, uvPerUnit: 1 }
  );
}

/** Closed 3-D ring curve around the body at height `y` (for hems / stitching). */
function bodyRingCurve(y: number, offset = 0, segments = 160): THREE.CatmullRomCurve3 {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i < segments; i++) {
    const th = (i / segments) * Math.PI * 2;
    const [x, z] = bodyRing(th, y);
    const A = halfWidth(y);
    const B = Math.sin(th) >= 0 ? depthFront(y) : depthBack(y);
    let gx = x / (A * A);
    let gz = z / (B * B);
    const gl = Math.hypot(gx, gz) || 1;
    gx /= gl;
    gz /= gl;
    const d = drape(th, y) + offset;
    pts.push(new THREE.Vector3(x + gx * d, y, z + gz * d));
  }
  return new THREE.CatmullRomCurve3(pts, true, 'centripetal');
}

/** Thin tube along a closed curve — used for rolled hems and stitch lines. */
function ringTube(curve: THREE.CatmullRomCurve3, radius: number, tubular = 192, radial = 8) {
  return new THREE.TubeGeometry(curve, tubular, radius, radial, true);
}

/** Rolled bottom hem + a visible row of top-stitching above it. */
export function createHemGeometries(): { roll: THREE.BufferGeometry; stitch: THREE.BufferGeometry } {
  return {
    roll: ringTube(bodyRingCurve(SHIRT.hemY + 0.006, 0.002), 0.0095),
    stitch: ringTube(bodyRingCurve(SHIRT.hemY + 0.055, 0.0018), 0.0036, 192, 6),
  };
}

/* ------------------------------------------------------------------------ */
/*  Sleeves                                                                  */
/* ------------------------------------------------------------------------ */

const SLEEVE = {
  /** Cap centre (inside the shoulder), for the +x sleeve. */
  root: new THREE.Vector3(0.43, 0.575, -0.005),
  /** Sleeve axis tilt away from vertical (rad). */
  angle: 0.5,
  /** Slight forward swing so side views read naturally. */
  forward: 0.07,
  r0: 0.272,
  r1: 0.212,
  length: 0.62,
  flat: 0.9, // z radius / in-plane radius
};

export interface SleeveFrame {
  side: 1 | -1;
  origin: THREE.Vector3;
  axis: THREE.Vector3; // points from the shoulder toward the cuff
  up: THREE.Vector3; // in-plane cross-section direction (outer/top)
  fwd: THREE.Vector3; // cross-section direction toward the front
}

export function sleeveFrame(side: 1 | -1): SleeveFrame {
  const origin = SLEEVE.root.clone();
  origin.x *= side;
  const axis = new THREE.Vector3(Math.sin(SLEEVE.angle) * side, -Math.cos(SLEEVE.angle), SLEEVE.forward).normalize();
  const up = new THREE.Vector3(Math.cos(SLEEVE.angle) * side, Math.sin(SLEEVE.angle), 0).normalize();
  const fwd = new THREE.Vector3().crossVectors(up, axis).normalize();
  if (fwd.z < 0) fwd.negate();
  return { side, origin, axis, up, fwd };
}

/** Radius profile along the sleeve: [axial offset s, radius]. */
function sleeveProfile(kind: ShirtKind): Array<[number, number]> {
  const prof: Array<[number, number]> = [];
  const capRows = 12;
  const { r0, r1, length } = SLEEVE;
  // hemispherical cap (hidden inside the shoulder, rounds the sleeve head)
  for (let k = 0; k <= capRows; k++) {
    const psi = (k / capRows) * (Math.PI / 2);
    prof.push([-r0 * Math.cos(psi), r0 * Math.sin(psi)]);
  }
  const tubeRows = 30;
  const hemLen = kind === 'polo' ? 0.085 : 0.045;
  for (let m = 1; m <= tubeRows; m++) {
    const u = m / tubeRows;
    const s = length * u;
    let r = lerp(r0, r1, u) * (1 + 0.035 * Math.sin(Math.PI * Math.min(1, u * 1.1)));
    // sleeve narrows a touch into the hem band
    r *= 1 - 0.012 * smoothstep(length - hemLen - 0.04, length - hemLen, s);
    prof.push([s, r]);
  }
  return prof;
}

export function createSleeveGeometry(side: 1 | -1, kind: ShirtKind): THREE.BufferGeometry {
  const f = sleeveFrame(side);
  const prof = sleeveProfile(kind);
  const rows = prof.length - 1;
  const cols = 64;
  const tmp = new THREE.Vector3();
  return loft(
    rows,
    cols,
    (u, v) => {
      const [s, r] = prof[Math.round(v * rows)];
      const a = u * Math.PI * 2;
      const rn = r;
      const rz = r * SLEEVE.flat;
      // subtle gathering at the front/back of the sleeve head
      const wob = 1 + 0.012 * Math.sin(3 * a + s * 6);
      tmp
        .copy(f.origin)
        .addScaledVector(f.axis, s)
        .addScaledVector(f.up, Math.cos(a) * rn * wob)
        .addScaledVector(f.fwd, Math.sin(a) * rz * wob);
      return tmp.clone();
    },
    { closedU: true, flip: side === 1 }
  );
}

/** Centre point + radii of the cuff opening, used for hem / cuff details. */
export function sleeveCuff(side: 1 | -1) {
  const f = sleeveFrame(side);
  return { frame: f, centre: f.origin.clone().addScaledVector(f.axis, SLEEVE.length), rn: SLEEVE.r1, rz: SLEEVE.r1 * SLEEVE.flat };
}

/** Closed ring curve around the sleeve at axial offset `s`. */
function sleeveRingCurve(side: 1 | -1, s: number, radiusAt: number, grow = 0, segments = 96) {
  const f = sleeveFrame(side);
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i < segments; i++) {
    const a = (i / segments) * Math.PI * 2;
    pts.push(
      f.origin
        .clone()
        .addScaledVector(f.axis, s)
        .addScaledVector(f.up, Math.cos(a) * (radiusAt + grow))
        .addScaledVector(f.fwd, Math.sin(a) * (radiusAt + grow) * SLEEVE.flat)
    );
  }
  return new THREE.CatmullRomCurve3(pts, true, 'centripetal');
}

/** Radius of the sleeve body at axial offset s (matches sleeveProfile). */
function sleeveRadiusAt(s: number, kind: ShirtKind): number {
  const u = clamp01(s / SLEEVE.length);
  const hemLen = kind === 'polo' ? 0.085 : 0.045;
  let r = lerp(SLEEVE.r0, SLEEVE.r1, u) * (1 + 0.035 * Math.sin(Math.PI * Math.min(1, u * 1.1)));
  r *= 1 - 0.012 * smoothstep(SLEEVE.length - hemLen - 0.04, SLEEVE.length - hemLen, s);
  return r;
}

/** Rolled cuff edge + top stitch (tee) or a folded rib cuff (polo). */
export function createSleeveHemGeometries(side: 1 | -1, kind: ShirtKind) {
  const L = SLEEVE.length;
  const rEnd = sleeveRadiusAt(L, kind);
  const roll = ringTube(sleeveRingCurve(side, L - 0.004, rEnd, 0.002), 0.0085, 96, 8);
  if (kind === 'polo') {
    // folded cuff: a slightly proud band with a stitched top edge
    const hem = 0.085;
    const rTop = sleeveRadiusAt(L - hem, kind);
    const f = sleeveFrame(side);
    const rowsN = 14;
    const band = loft(
      rowsN,
      64,
      (u, v) => {
        const s = lerp(L - hem, L, v);
        const rr = lerp(rTop, rEnd, v) + 0.0065;
        const a = u * Math.PI * 2;
        return f.origin
          .clone()
          .addScaledVector(f.axis, s)
          .addScaledVector(f.up, Math.cos(a) * rr)
          .addScaledVector(f.fwd, Math.sin(a) * rr * SLEEVE.flat);
      },
      { closedU: true, flip: side === 1 }
    );
    return {
      roll,
      band,
      stitch: ringTube(sleeveRingCurve(side, L - hem, rTop, 0.0075), 0.0036, 96, 6),
    };
  }
  return {
    roll,
    band: null as THREE.BufferGeometry | null,
    stitch: ringTube(sleeveRingCurve(side, L - 0.045, sleeveRadiusAt(L - 0.045, kind), 0.002), 0.0036, 96, 6),
  };
}

/* ------------------------------------------------------------------------ */
/*  Collars                                                                  */
/* ------------------------------------------------------------------------ */

/** Horizontal outward direction of the neck opening at angle θ. */
function neckOut(theta: number, nk: NeckConfig): THREE.Vector3 {
  const s = Math.sin(theta);
  const nz = s >= 0 ? nk.nzF : nk.nzB;
  const v = new THREE.Vector3(Math.cos(theta) / nk.nx, 0, s / nz);
  return v.normalize();
}

/** Ribbed crew-neck band: a flattened rolled tube hugging the neck edge. */
export function createRibCollarGeometry(kind: ShirtKind = 'round-neck'): THREE.BufferGeometry {
  const nk = NECK[kind];
  const rho = 0.032; // width of the band (radial)
  const hgt = 0.02; // thickness (vertical)
  return loft(
    20,
    160,
    (u, v) => {
      const th = u * Math.PI * 2;
      const base = neckPoint(th, kind);
      const out = neckOut(th, nk);
      const psi = v * Math.PI * 2;
      // band lies on the shoulders: tilt follows the shoulder slope at that angle
      const slope = 0.5 * Math.cos(th) * Math.cos(th) + 0.05;
      const dr = 0.004 + Math.cos(psi) * rho;
      const dh = 0.006 + Math.sin(psi) * hgt - dr * slope;
      return base.clone().addScaledVector(out, dr).add(new THREE.Vector3(0, dh, 0));
    },
    { closedU: true, closedV: true, flip: true }
  );
}

/** Stitch lines either side of the rib collar. */
export function createCollarStitchGeometry(kind: ShirtKind = 'round-neck'): THREE.BufferGeometry {
  const nk = NECK[kind];
  const pts: THREE.Vector3[] = [];
  const n = 160;
  for (let i = 0; i < n; i++) {
    const th = (i / n) * Math.PI * 2;
    const base = neckPoint(th, kind);
    const out = neckOut(th, nk);
    const slope = 0.5 * Math.cos(th) * Math.cos(th) + 0.05;
    const dr = 0.05;
    pts.push(base.clone().addScaledVector(out, dr).add(new THREE.Vector3(0, 0.001 - dr * slope, 0)));
  }
  return ringTube(new THREE.CatmullRomCurve3(pts, true, 'centripetal'), 0.0032, 192, 6);
}

/**
 * Polo fold-over collar. Two wings meet at the placket; the outer edge lies
 * on the shoulders and the front tips point down onto the chest.
 */
export function createPoloCollarGeometry(): THREE.BufferGeometry {
  const kind: ShirtKind = 'polo';
  const nk = NECK[kind];
  const gap = 0.2; // half-angle left open at the front for the placket
  const th0 = Math.PI / 2 + gap;
  const th1 = Math.PI / 2 + Math.PI * 2 - gap;

  // cross-section (radial ρ, height h) for the back of the collar
  const sect: Array<[number, number]> = [
    [-0.012, -0.004],
    [-0.016, 0.03],
    [-0.01, 0.062],
    [0.012, 0.079],
    [0.044, 0.07],
    [0.078, 0.044],
    [0.102, 0.012],
  ];
  const sampleSect = (w: number): [number, number] => {
    const f = w * (sect.length - 1);
    const i = Math.min(sect.length - 2, Math.floor(f));
    const t = f - i;
    // Catmull-ish smoothing by blending neighbours
    const p0 = sect[Math.max(0, i - 1)];
    const p1 = sect[i];
    const p2 = sect[i + 1];
    const p3 = sect[Math.min(sect.length - 1, i + 2)];
    const cr = (a: number, b: number, c: number, d: number) =>
      0.5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t * t + (-a + 3 * b - 3 * c + d) * t * t * t);
    return [cr(p0[0], p1[0], p2[0], p3[0]), cr(p0[1], p1[1], p2[1], p3[1])];
  };

  return loft(
    18,
    120,
    (u, v) => {
      const th = lerp(th0, th1, u);
      const base = neckPoint(th, kind);
      const out = neckOut(th, nk);
      // distance from the placket gap: 0 at the tips → 1 around the back
      const edge = Math.min(u, 1 - u);
      const tip = 1 - smoothstep(0, 0.2, edge);
      const [rho0, h0] = sampleSect(v);
      const rho = rho0 * (1 + 0.38 * tip);
      const slope = 0.5 * Math.cos(th) * Math.cos(th) + 0.07;
      // standing height shrinks toward the front, outer edge drapes onto the chest
      const standing = lerp(1, 0.78, tip);
      let h = h0 * standing - Math.max(0, rho0) * slope - tip * v * v * 0.07;
      // keep the collar's fold above the fabric
      h += 0.004;
      return base.clone().addScaledVector(out, rho).add(new THREE.Vector3(0, h, 0));
    },
    { flip: true }
  );
}

/* ------------------------------------------------------------------------ */
/*  Polo placket + buttons                                                   */
/* ------------------------------------------------------------------------ */

export const PLACKET = {
  width: 0.118,
  bottomY: 0.5,
  buttons: [0.835, 0.73, 0.625],
};

/** y at the front-centre of the neckline, where the placket tucks under the collar. */
const frontNeckY = (kind: ShirtKind) => SHIRT.neckY - NECK[kind].dropF;

/** Point + normal on the front-centre column of the shirt at height y. */
export function frontCentre(y: number, kind: ShirtKind): { p: THREE.Vector3; n: THREE.Vector3 } {
  const yTop = frontNeckY(kind);
  const eps = 0.004;
  const at = (yy: number) => {
    let h: number;
    if (yy <= SHIRT.shoulderY) {
      h = ((yy - SHIRT.hemY) / (SHIRT.shoulderY - SHIRT.hemY)) * BODY_FRACTION;
    } else {
      const t = clamp01((yy - SHIRT.shoulderY) / (yTop - SHIRT.shoulderY));
      h = BODY_FRACTION + t * (1 - BODY_FRACTION);
    }
    return torsoPoint(Math.PI / 2, h, kind);
  };
  const p = at(y);
  const tangent = at(y + eps).sub(at(y - eps)).normalize();
  const n = new THREE.Vector3(1, 0, 0).cross(tangent).normalize(); // x × up → +z-ish
  if (n.z < 0) n.negate();
  return { p, n };
}

export function createPlacketGeometry(): THREE.BufferGeometry {
  const kind: ShirtKind = 'polo';
  const w = PLACKET.width;
  const yTop = frontNeckY(kind) - 0.004;
  const lift = 0.0065;
  return loft(
    40,
    8,
    (u, v) => {
      const y = lerp(PLACKET.bottomY, yTop, v);
      const { p, n } = frontCentre(y, kind);
      const x = (u - 0.5) * w;
      // gentle rounded edges so the strip reads as a folded placket
      const edge = Math.pow(Math.abs(u - 0.5) * 2, 6);
      return p.clone().addScaledVector(n, lift * (1 - 0.55 * edge)).add(new THREE.Vector3(x, 0, 0));
    },
    { flip: true }
  );
}

/** Stitched outline for the placket: two verticals + a bottom bar. */
export function createPlacketStitchGeometries(): THREE.BufferGeometry[] {
  const kind: ShirtKind = 'polo';
  const w = PLACKET.width;
  const yTop = frontNeckY(kind) - 0.004;
  const lift = 0.0085;
  const line = (xOff: number) => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 24; i++) {
      const y = lerp(PLACKET.bottomY + 0.008, yTop, i / 24);
      const { p, n } = frontCentre(y, kind);
      pts.push(p.clone().addScaledVector(n, lift).add(new THREE.Vector3(xOff, 0, 0)));
    }
    return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 40, 0.0026, 5, false);
  };
  const bar = (() => {
    const { p, n } = frontCentre(PLACKET.bottomY + 0.008, kind);
    const a = p.clone().addScaledVector(n, lift).add(new THREE.Vector3(-w * 0.46, 0, 0));
    const b = p.clone().addScaledVector(n, lift).add(new THREE.Vector3(w * 0.46, 0, 0));
    return new THREE.TubeGeometry(new THREE.LineCurve3(a, b), 8, 0.0026, 5, false);
  })();
  return [line(-w * 0.46), line(w * 0.46), bar];
}

/* ------------------------------------------------------------------------ */
/*  Print areas (decals)                                                     */
/* ------------------------------------------------------------------------ */

/**
 * World-space size of the printable chest/back rectangle and the pixel size of
 * the artwork canvas that is wrapped onto it. Pixels-per-unit is identical in
 * x and y so text and logos are never stretched.
 */
export const PRINT_AREA = {
  width: 0.7,
  height: 1.02,
  centreY: 0.12,
  canvasW: 1024,
  canvasH: Math.round((1024 * 1.02) / 0.7),
  /** How far the print floats above the fabric. */
  lift: 0.0045,
};

/**
 * A patch that wraps the front or back of the torso. Its vertices are sampled
 * from the SAME surface function as the shirt, so artwork follows the chest
 * curvature and drape exactly and can never clip into / float off the fabric.
 */
export function createPrintPatchGeometry(side: ShirtSide, kind: ShirtKind): THREE.BufferGeometry {
  const { width, height, centreY, lift } = PRINT_AREA;
  const sign = side === 'front' ? 1 : -1;
  const e = 2 / SHIRT.bodyExp;
  const tmp = new THREE.Vector3();
  const geom = loft(
    48,
    36,
    (u, v) => {
      const y = centreY + height / 2 - v * height;
      const xNominal = (u - 0.5) * width * (side === 'front' ? 1 : -1);
      const A = halfWidth(y);
      const cosT = sgnPow(clamp01(Math.abs(xNominal) / A) * Math.sign(xNominal || 1), 1 / e);
      const th = Math.acos(THREE.MathUtils.clamp(cosT, -1, 1)) * sign; // front: (0,π), back: (−π,0)
      const hParam = ((y - SHIRT.hemY) / (SHIRT.shoulderY - SHIRT.hemY)) * BODY_FRACTION;
      const p = torsoPoint(th, hParam, kind, tmp).clone();
      // outward normal ≈ ring gradient
      const B = Math.sin(th) >= 0 ? depthFront(y) : depthBack(y);
      const n = new THREE.Vector3(p.x / (A * A), 0, p.z / (B * B)).normalize();
      return p.addScaledVector(n, lift);
    },
    { flip: false }
  );
  // UVs for the artwork canvas: u across (mirrored on the back), v up.
  const uv = geom.getAttribute('uv') as THREE.BufferAttribute;
  const cols = 36;
  const rows = 48;
  for (let r = 0; r <= rows; r++) {
    for (let c = 0; c <= cols; c++) {
      uv.setXY(r * (cols + 1) + c, c / cols, 1 - r / rows);
    }
  }
  uv.needsUpdate = true;
  return geom;
}
