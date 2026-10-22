/* caustics - sunlight through a moving water surface, as on a pool floor (pools,
   irrigation, car washes, spas). Physically drawn, not faked: a grid of light rays is bent
   by a sum-of-waves surface (deep-water dispersion, so long waves run faster), and each
   ray carries the light density 1/|det J| of the bent grid, so light piles up into the
   real web of folds and cusps. WebGL; draws only light, over a transparent canvas, so the
   host's CSS background is the water. Without WebGL it removes itself.
   Knobs: data-speed (default 1) · data-scale (cell size, default 1) · data-strength (0-1, default 0.6). */
import { fxCanvas, loop, color } from '../motion.js';

const rgb = (v) => {
  const x = document.createElement('canvas').getContext('2d');
  x.canvas.width = x.canvas.height = 1;
  x.fillStyle = v; x.fillRect(0, 0, 1, 1);
  const d = x.getImageData(0, 0, 1, 1).data;
  return [d[0] / 255, d[1] / 255, d[2] / 255];
};

const N = 7;
const VS = `attribute vec2 g;uniform vec2 R;uniform float T;uniform vec4 W[${N}];varying float v;
void main(){vec2 d=vec2(0.);vec3 H=vec3(0.);
for(int i=0;i<${N};i++){vec4 w=W[i];float f=dot(w.xy,g)-w.z*T;d+=w.xy*(w.w*cos(f));H-=vec3(w.x*w.x,w.y*w.y,w.x*w.y)*(w.w*sin(f));}
float j=(1.+H.x)*(1.+H.y)-H.z*H.z;v=min(1./max(abs(j),.02),24.);
gl_Position=vec4((g+d)/R*vec2(2.,-2.)+vec2(-1.,1.),0.,1.);}`;
const FS = `precision mediump float;uniform vec3 A;uniform float K;varying float v;
void main(){gl_FragColor=vec4(A,K*max(v-.8,0.));}`;

export default function mount(el) {
  const s = fxCanvas(el, { dpr: 1, webgl: true });
  const gl = s.ctx;
  const quit = () => { s.c.remove(); if (s.off) s.off(); return { destroy() {} }; };
  if (!gl) return quit();
  const pr = gl.createProgram();
  for (const [k, src] of [[gl.VERTEX_SHADER, VS], [gl.FRAGMENT_SHADER, FS]]) {
    const sh = gl.createShader(k); gl.shaderSource(sh, src); gl.compileShader(sh); gl.attachShader(pr, sh);
  }
  gl.bindAttribLocation(pr, 0, 'g');
  gl.linkProgram(pr);
  if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return quit();
  gl.useProgram(pr);
  const u = (n) => gl.getUniformLocation(pr, n);
  const d = el.dataset;
  // Dominant wavelength in CSS px: 170 on a desktop hero, tighter on a phone.
  const S = 170 * Math.min(1.1, Math.max(0.6, el.clientWidth / 1280)) * Math.max(0.3, +d.scale || 1);
  const speed = d.speed != null ? +d.speed : 1;
  const strength = Math.max(0, Math.min(1, d.strength != null ? +d.strength : 0.6));
  // Seven waves: spread directions, wavelengths 0.55-1.3 S, a·k² constant so every wave
  // bends light by the same amount and the fold density is set by one number.
  const L = [1, 0.83, 0.69, 1.3, 0.58, 0.94, 1.14], W = new Float32Array(N * 4);
  const a0 = Math.random() * 6.28;
  for (let i = 0; i < N; i++) {
    const k = 6.2832 / (S * L[i]), th = a0 + i * 2.4 + Math.sin(i * 7.1) * 0.5;
    W.set([k * Math.cos(th), k * Math.sin(th), 1.25 * speed * Math.sqrt(1 / L[i]), 0.4 / (k * k)], i * 4);
  }
  gl.uniform4fv(u('W[0]'), W);
  gl.uniform3fv(u('A'), rgb(color(el, '--fx-a', '#f2fdff')));
  gl.uniform1f(u('K'), 0.05 + strength * 0.1);
  const uR = u('R'), uT = u('T');
  const vb = gl.createBuffer(), ib = gl.createBuffer();
  let count = 0, gw = 0, gh = 0;
  const grid = () => {
    gw = s.w; gh = s.h;
    const m = S * 0.7, x0 = -m, y0 = -m, ww = gw + 2 * m, hh = gh + 2 * m;
    let st = 6;
    while ((ww / st + 1) * (hh / st + 1) > 60000) st += 1;
    const cx = Math.ceil(ww / st), cy = Math.ceil(hh / st), V = new Float32Array((cx + 1) * (cy + 1) * 2);
    let o = 0;
    for (let y = 0; y <= cy; y++) for (let x = 0; x <= cx; x++) { V[o++] = x0 + x * st; V[o++] = y0 + y * st; }
    const I = new Uint16Array(cx * cy * 6);
    o = 0;
    for (let y = 0; y < cy; y++) for (let x = 0; x < cx; x++) {
      const a = y * (cx + 1) + x, b = a + cx + 1;
      I[o++] = a; I[o++] = a + 1; I[o++] = b; I[o++] = a + 1; I[o++] = b + 1; I[o++] = b;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, vb); gl.bufferData(gl.ARRAY_BUFFER, V, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ib); gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, I, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    count = I.length;
  };
  gl.enable(gl.BLEND);
  // Colour is replaced, light (alpha) accumulates where bent rays overlap.
  gl.blendFuncSeparate(gl.ONE, gl.ZERO, gl.ONE, gl.ONE);
  gl.clearColor(0, 0, 0, 0);
  const t0 = Math.random() * 50;
  const h = loop(s, (t) => {
    if (s.w !== gw || s.h !== gh) grid();
    gl.viewport(0, 0, s.c.width, s.c.height);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform2f(uR, s.w, s.h);
    gl.uniform1f(uT, t0 + t);
    gl.drawElements(gl.TRIANGLES, count, gl.UNSIGNED_SHORT, 0);
  });
  s.c.addEventListener('webglcontextlost', () => h.destroy());
  return h;
}
