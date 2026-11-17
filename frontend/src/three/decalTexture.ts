import { useEffect, useMemo } from 'react';
import * as THREE from 'three';
import type { DecalLayer } from './GarmentModel';
import { PRINT_AREA } from './shirtGeometry';

/**
 * decalTexture.ts
 * ---------------------------------------------------------------------------
 * Renders the user's artwork layers (text + uploaded images) onto a canvas
 * that is wrapped over the shirt's print area.
 *
 * The whole canvas is repainted — in layer order, with the correct
 * translate / rotate for every layer — whenever an uploaded image finishes
 * decoding or a web-font becomes available. This guarantees artwork always
 * lands exactly where the X / Y / scale / rotation controls say it should.
 */

const imageCache = new Map<string, HTMLImageElement>();

function getImage(src: string): HTMLImageElement {
  let img = imageCache.get(src);
  if (!img) {
    img = new Image();
    if (/^https?:/i.test(src)) img.crossOrigin = 'anonymous';
    img.decoding = 'async';
    img.src = src;
    if (imageCache.size > 32) {
      const first = imageCache.keys().next().value;
      if (first !== undefined) imageCache.delete(first);
    }
    imageCache.set(src, img);
  }
  return img;
}

/** Cheap content signature so the texture is only rebuilt when something visible changed. */
function layersSignature(layers: DecalLayer[] | undefined): string {
  if (!layers || layers.length === 0) return '';
  return layers
    .map((l) =>
      [
        l.id,
        l.type,
        l.x,
        l.y,
        l.scale,
        l.rotation,
        l.color ?? '',
        l.fontFamily ?? '',
        l.fontSize ?? '',
        l.textAlign ?? 'center',
        l.type === 'image' ? `${l.content.length}:${l.content.slice(0, 40)}:${l.content.slice(-40)}` : l.content,
      ].join('|')
    )
    .join('~');
}

function paintLayers(ctx: CanvasRenderingContext2D, layers: DecalLayer[]) {
  const { canvasW, canvasH } = PRINT_AREA;
  ctx.clearRect(0, 0, canvasW, canvasH);

  for (const layer of layers) {
    ctx.save();
    // x / y are 0..1 across the print area
    ctx.translate(layer.x * canvasW, layer.y * canvasH);
    ctx.rotate((layer.rotation * Math.PI) / 180);

    if (layer.type === 'text') {
      const scale = Math.max(0.2, layer.scale || 1);
      const baseFontSize = (layer.fontSize || 36) * scale * 1.9;
      const maxTextW = Math.min(canvasW * 0.85, 720 * scale);

      ctx.fillStyle = layer.color || '#111326';
      ctx.textAlign = (layer.textAlign as CanvasTextAlign) || 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowColor = 'rgba(0,0,0,0.25)';
      ctx.shadowBlur = 4;

      // Handle multi-line text and word-wrapping to prevent text from expanding off the garment
      const rawLines = (layer.content || '').split('\n');
      const lines: string[] = [];

      ctx.font = `bold ${baseFontSize}px ${layer.fontFamily || 'Outfit, sans-serif'}`;

      for (const rawLine of rawLines) {
        const words = rawLine.split(' ');
        let currentLine = '';

        for (const word of words) {
          const testLine = currentLine ? `${currentLine} ${word}` : word;
          const metrics = ctx.measureText(testLine);
          if (metrics.width > maxTextW && currentLine) {
            lines.push(currentLine);
            currentLine = word;
          } else {
            currentLine = testLine;
          }
        }
        if (currentLine) lines.push(currentLine);
      }

      // If any single line is still wider than maxTextW, scale font down to fit perfectly
      let effectiveFontSize = baseFontSize;
      for (const line of lines) {
        const w = ctx.measureText(line).width;
        if (w > maxTextW) {
          effectiveFontSize = Math.min(effectiveFontSize, (maxTextW / w) * effectiveFontSize);
        }
      }

      ctx.font = `bold ${effectiveFontSize}px ${layer.fontFamily || 'Outfit, sans-serif'}`;
      const lineHeight = effectiveFontSize * 1.25;
      const totalBlockHeight = lines.length * lineHeight;
      const startY = -totalBlockHeight / 2 + lineHeight / 2;

      lines.forEach((line, index) => {
        ctx.fillText(line, 0, startY + index * lineHeight);
      });
    } else if (layer.type === 'image' && layer.content) {
      const img = getImage(layer.content);
      if (img.complete && img.naturalWidth > 0) {
        const scale = Math.max(0.2, layer.scale || 1);
        // Bounded target box so images never expand or blow up outside the garment
        const maxBox = 440 * scale;
        const imgAspect = img.naturalWidth / img.naturalHeight;

        let w = maxBox;
        let h = maxBox;
        if (imgAspect >= 1) {
          h = maxBox / imgAspect;
        } else {
          w = maxBox * imgAspect;
        }

        // Hard clamp to ensure image fits within printable chest zone
        w = Math.min(w, canvasW * 0.85);
        h = Math.min(h, canvasH * 0.75);

        ctx.drawImage(img, -w / 2, -h / 2, w, h);
      }
    }
    ctx.restore();
  }
}

/**
 * Returns a CanvasTexture for the given layers (or null when there are none).
 * The texture is disposed automatically when the layers change / on unmount.
 */
export function useDecalTexture(layers: DecalLayer[] | undefined): THREE.CanvasTexture | null {
  const signature = layersSignature(layers);

  const entry = useMemo(() => {
    if (!layers || layers.length === 0) return null;
    const snapshot = layers.map((l) => ({ ...l }));
    const canvas = document.createElement('canvas');
    canvas.width = PRINT_AREA.canvasW;
    canvas.height = PRINT_AREA.canvasH;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;

    const paint = () => {
      paintLayers(ctx, snapshot);
      texture.needsUpdate = true;
    };
    paint();
    return { texture, paint, snapshot };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signature]);

  useEffect(() => {
    if (!entry) return;
    let alive = true;
    const repaint = () => {
      if (alive) entry.paint();
    };

    for (const l of entry.snapshot) {
      if (l.type === 'image' && l.content) {
        const img = getImage(l.content);
        if (!img.complete) img.addEventListener('load', repaint, { once: true });
      }
      if (l.type === 'text' && typeof document !== 'undefined' && document.fonts) {
        document.fonts.load(`bold 40px ${l.fontFamily || 'Outfit, sans-serif'}`).then(repaint).catch(() => undefined);
      }
    }

    return () => {
      alive = false;
      entry.texture.dispose();
    };
  }, [entry]);

  return entry ? entry.texture : null;
}
