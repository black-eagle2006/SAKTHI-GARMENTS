import * as THREE from 'three';

/**
 * Generates a procedural cotton fabric micro-weave texture for realistic cloth rendering
 */
export function createCottonFabricTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.fillStyle = '#808080';
    ctx.fillRect(0, 0, 256, 256);

    // Draw delicate cross-weave pattern
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    for (let x = 0; x < 256; x += 4) {
      ctx.fillRect(x, 0, 2, 256);
    }
    ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
    for (let y = 0; y < 256; y += 4) {
      ctx.fillRect(0, y, 256, 2);
    }

    // Add subtle stochastic noise for organic fabric feel
    const imgData = ctx.getImageData(0, 0, 256, 256);
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
      const noise = (Math.random() - 0.5) * 16;
      data[i] = Math.min(255, Math.max(0, data[i] + noise));
      data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
      data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
    }
    ctx.putImageData(imgData, 0, 0);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(16, 16);
  return texture;
}
