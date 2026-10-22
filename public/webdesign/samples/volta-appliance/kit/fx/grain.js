/* grain - animated film grain over the host (photo and dark heroes). 2D canvas at CSS-pixel
   resolution, filled from three small pre-made noise tiles at a random offset ~12 times a
   second. Each grain is white or black at a low alpha, so it reads on light and dark
   grounds alike. Sits ABOVE the host's content (pointer-events: none).
   Knobs: data-strength (0-1, default 0.5) · data-fps (default 12). */
import { fxCanvas, loop } from '../motion.js';

const TILES = [192, 224, 256];

function tile(n) {
  const c = document.createElement('canvas');
  c.width = c.height = n;
  const x = c.getContext('2d'), img = x.createImageData(n, n), d = img.data;
  for (let i = 0; i < d.length; i += 4) {
    // Near-gaussian (sum of three uniforms), signed: >0 lightens, <0 darkens.
    const v = (Math.random() + Math.random() + Math.random()) / 1.5 - 1;
    const on = v > 0 ? 255 : 0;
    d[i] = d[i + 1] = d[i + 2] = on;
    d[i + 3] = Math.min(255, Math.abs(v) * 340);
  }
  x.putImageData(img, 0, 0);
  return c;
}

export default function mount(el) {
  const s = fxCanvas(el, { dpr: 1 });
  const ctx = s.ctx;
  if (!ctx) { s.c.remove(); if (s.off) s.off(); return { destroy() {} }; }
  s.c.style.zIndex = 'auto';
  const strength = Math.max(0, Math.min(1, el.dataset.strength != null ? +el.dataset.strength : 0.5));
  const pats = [];
  let prev = -1;

  return loop(s, () => {
    // One tile per frame until all three exist: no long task at mount.
    if (pats.length < TILES.length) pats.push(ctx.createPattern(tile(TILES[pats.length]), 'repeat'));
    let k = (Math.random() * pats.length) | 0;
    if (k === prev && pats.length > 1) k = (k + 1) % pats.length;
    prev = k;
    const W = s.c.width, H = s.c.height, n = TILES[k];
    const ox = Math.random() * n, oy = Math.random() * n;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, W, H);
    ctx.globalAlpha = 0.04 + strength * 0.16;
    ctx.fillStyle = pats[k];
    // Random flip + offset: the same three tiles never read as a repeating pattern.
    ctx.setTransform(Math.random() < 0.5 ? -1 : 1, 0, 0, Math.random() < 0.5 ? -1 : 1, W / 2, H / 2);
    ctx.translate(-ox, -oy);
    ctx.fillRect(ox - W, oy - H, W * 2, H * 2);
  }, { fps: Math.max(1, Math.min(30, +el.dataset.fps || 12)) });
}
