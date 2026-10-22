/* topo - slowly drifting topographic contour lines (landscaping, outdoors, surveying,
   roofing). 2D canvas: two layers of Perlin noise drift against each other, marching
   squares traces the contours, and every fifth line is a heavier "index contour" as on a
   survey sheet. Thin strokes in --fx-a (index lines in --fx-b if set) over --fx-bg if set,
   else over the host's own background. The field is seeded from the host name and
   element id, so a site always gets the same terrain and two sites never share one.
   Knobs: data-density (line count, default 1) · data-speed (default 1). */
import { fxCanvas, loop, color } from '../motion.js';

function perlin(seed) {
  const p = new Uint8Array(512), r = [...Array(256).keys()];
  for (let i = 255; i > 0; i--) {
    seed = (Math.imul(seed ^ (seed >>> 15), 0x2c1b3c6d) + 0x6d2b79f5) | 0;
    const j = (seed >>> 0) % (i + 1);
    [r[i], r[j]] = [r[j], r[i]];
  }
  for (let i = 0; i < 512; i++) p[i] = r[i & 255];
  const g = (h, x, y) => ((h & 1) ? -x : x) + ((h & 2) ? -y : y) * ((h & 4) ? 0.5 : 1);
  return (x, y) => {
    const X = Math.floor(x), Y = Math.floor(y), xi = X & 255, yi = Y & 255;
    x -= X; y -= Y;
    const u = x * x * x * (x * (x * 6 - 15) + 10), v = y * y * y * (y * (y * 6 - 15) + 10);
    const a = p[p[xi] + yi], b = p[p[xi] + yi + 1], c = p[p[xi + 1] + yi], d = p[p[xi + 1] + yi + 1];
    const l1 = g(a, x, y) + u * (g(c, x - 1, y) - g(a, x, y));
    const l2 = g(b, x, y - 1) + u * (g(d, x - 1, y - 1) - g(b, x, y - 1));
    return l1 + v * (l2 - l1);
  };
}

export default function mount(el) {
  const s = fxCanvas(el, { dpr: 2 });
  const ctx = s.ctx;
  if (!ctx) { s.c.remove(); if (s.off) s.off(); return { destroy() {} }; }
  let seed = 7;
  for (const ch of location.hostname + (el.id || '')) seed = Math.imul(seed ^ ch.charCodeAt(0), 0x5bd1e995);
  const n = perlin(seed);
  const d = el.dataset;
  const speed = d.speed != null ? +d.speed : 1;
  const step = 0.085 / Math.max(0.3, +d.density || 1);   // height between contours
  const A = color(el, '--fx-a', '#4f5d4a'), B = color(el, '--fx-b', A), BG = color(el, '--fx-bg', '');
  const CELL = 7;                                         // CSS px per marching-squares cell
  let F = new Float32Array(0);
  const ox = (seed & 1023) / 7, oy = ((seed >>> 10) & 1023) / 7;

  return loop(s, (t) => {
    const w = s.w, h = s.h, cols = Math.ceil(w / CELL) + 1, rows = Math.ceil(h / CELL) + 1;
    if (F.length !== cols * rows) F = new Float32Array(cols * rows);
    const k = 1 / 340, tt = t * speed * 0.018;            // ~340 px features
    for (let j = 0, i = 0; j < rows; j++) {
      const y = j * CELL * k;
      for (let q = 0; q < cols; q++, i++) {
        const x = q * CELL * k;
        F[i] = n(x + ox + tt, y + oy + tt * 0.6) * 0.72 + n(x * 2.1 - tt * 1.3 + 31, y * 2.1 + tt + 17) * 0.28;
      }
    }
    const thin = new Path2D(), bold = new Path2D();
    // Saddles resolve one way; at this cell size the difference is invisible.
    for (let j = 0; j < rows - 1; j++) {
      for (let q = 0; q < cols - 1; q++) {
        const i = j * cols + q, a = F[i], b = F[i + 1], c = F[i + cols + 1], e = F[i + cols];
        const lo = Math.min(a, b, c, e), hi = Math.max(a, b, c, e);
        const x0 = q * CELL, y0 = j * CELL;
        for (let m = Math.ceil(lo / step); m * step <= hi; m++) {
          const L = m * step;
          const pts = [];
          if ((a < L) !== (b < L)) pts.push(x0 + CELL * (L - a) / (b - a), y0);
          if ((b < L) !== (c < L)) pts.push(x0 + CELL, y0 + CELL * (L - b) / (c - b));
          if ((e < L) !== (c < L)) pts.push(x0 + CELL * (L - e) / (c - e), y0 + CELL);
          if ((a < L) !== (e < L)) pts.push(x0, y0 + CELL * (L - a) / (e - a));
          const P = m % 5 === 0 ? bold : thin;
          for (let z = 0; z + 3 < pts.length; z += 4) { P.moveTo(pts[z], pts[z + 1]); P.lineTo(pts[z + 2], pts[z + 3]); }
        }
      }
    }
    ctx.setTransform(s.ratio, 0, 0, s.ratio, 0, 0);
    if (BG) { ctx.fillStyle = BG; ctx.fillRect(0, 0, w, h); } else ctx.clearRect(0, 0, w, h);
    ctx.lineCap = 'round';
    ctx.strokeStyle = A; ctx.globalAlpha = 0.5; ctx.lineWidth = 0.8; ctx.stroke(thin);
    ctx.strokeStyle = B; ctx.globalAlpha = 0.85; ctx.lineWidth = 1.4; ctx.stroke(bold);
    ctx.globalAlpha = 1;
  });
}
