/* Studio kit - motion. One small, dependency-free module every studio site loads.
   Progressive enhancement only: with JS off, or reduced motion on, every element sits in
   its final, readable state. Contract and attribute reference: studio/kit/README.md. */

const root = document.documentElement;
const mq = (q) => window.matchMedia && window.matchMedia(q).matches;
const REDUCED = mq('(prefers-reduced-motion: reduce)');
const FINE = mq('(hover: hover) and (pointer: fine)');
const conn = navigator.connection || {};
const LOW_POWER = !!conn.saveData || /(^|-)2g$|^3g$/.test(conn.effectiveType || '') || (navigator.deviceMemory || 8) <= 2;

const ready = () => root.classList.add('kit-ready');
/* Past the CSS's 3 s fallback every reveal is already showing (kit.css); once .kit-ready lands that
   rule stops, so a late start marks them in rather than hiding again what is not yet scrolled to. */
const LATE = performance.now() > 3000;

/* Reveal on scroll: [data-reveal] (up | fade | clip | scale), [data-delay] ms, and a
   parent [data-stagger] ms that offsets its [data-reveal] children in order. */
function reveals() {
  const els = [...document.querySelectorAll('[data-reveal]')];
  if (!els.length) return;
  for (const p of document.querySelectorAll('[data-stagger]')) {
    const step = +p.dataset.stagger || 80;
    [...p.querySelectorAll(':scope [data-reveal]')].forEach((el, i) => {
      if (!el.dataset.delay) el.style.setProperty('--kit-delay', `${i * step}ms`);
    });
  }
  for (const el of els) if (el.dataset.delay) el.style.setProperty('--kit-delay', `${+el.dataset.delay}ms`);
  if (REDUCED || LATE || !('IntersectionObserver' in window)) { els.forEach((el) => el.classList.add('is-in')); return; }
  const pending = new Set(els);
  const show = (el) => { if (pending.delete(el)) el.classList.add('is-in'); };
  /* A clip reveal starts with no visible area, and Chrome never reports a box with none as on
     screen, so its parent stands watch for it (Cache Appliance's reviews stayed blank, 2026-10-15). */
  const watch = new Map();
  for (const el of els) {
    const t = el.dataset.reveal === 'clip' && el.parentElement ? el.parentElement : el;
    if (!watch.has(t)) watch.set(t, []);
    watch.get(t).push(el);
  }
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { watch.get(e.target).forEach(show); io.unobserve(e.target); }
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
  watch.forEach((_, t) => io.observe(t));
  /* The safety net: anything the visitor has scrolled to is shown, whatever the observer did
     (a box many screens tall never reaches the threshold). */
  let queued = false;
  const sweep = () => {
    queued = false;
    const line = window.innerHeight * 0.92;
    for (const el of pending) if (el.getBoundingClientRect().top < line) show(el);
    if (!pending.size) window.removeEventListener('scroll', onScroll);
  };
  const onScroll = () => { if (!queued) { queued = true; requestAnimationFrame(sweep); } };
  window.addEventListener('scroll', onScroll, { passive: true });
  setTimeout(sweep, 1200);
}

/* Split headline: [data-split] wraps each word in a masked span that rises into place on
   first view. The accessible name is the original text; the spans are presentational. */
function splits() {
  for (const el of document.querySelectorAll('[data-split]')) {
    if (el.dataset.splitDone) continue;
    el.dataset.splitDone = '1';
    const text = el.textContent.replace(/\s+/g, ' ').trim();
    el.setAttribute('aria-label', text);
    const walk = (node) => {
      for (const child of [...node.childNodes]) {
        if (child.nodeType === 3) {
          const frag = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.append(' '); return; }
            const w = document.createElement('span'); w.className = 'kit-w'; w.setAttribute('aria-hidden', 'true');
            const i = document.createElement('span'); i.className = 'kit-wi'; i.textContent = part;
            w.append(i); frag.append(w);
          });
          child.replaceWith(frag);
        } else if (child.nodeType === 1 && !child.classList.contains('kit-w')) walk(child);
      }
    };
    walk(el);
    [...el.querySelectorAll('.kit-wi')].forEach((s, n) => s.style.setProperty('--kit-i', n));
    if (REDUCED || LATE) { el.classList.add('is-in'); continue; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('is-in'); io.disconnect(); } }, { threshold: 0.2 });
    io.observe(el);
  }
}

/* Marquee: [data-marquee] holds one track; it is duplicated so the loop is seamless.
   [data-speed] = seconds per loop. Reduced motion leaves a static, wrapped row. */
function marquees() {
  for (const el of document.querySelectorAll('[data-marquee]')) {
    const track = el.firstElementChild;
    if (!track || REDUCED) continue;
    const copy = track.cloneNode(true); copy.setAttribute('aria-hidden', 'true');
    copy.querySelectorAll('a,button').forEach((a) => a.setAttribute('tabindex', '-1'));
    el.append(copy);
    el.style.setProperty('--kit-speed', `${+el.dataset.speed || 30}s`);
    el.classList.add('is-moving');
  }
}

/* Count-up: [data-count] holds its final value as text (so it reads right without JS);
   it counts up once from zero when it enters the view. [data-decimals] defaults to the
   decimals in the text. */
function counts() {
  const els = [...document.querySelectorAll('[data-count]')];
  if (!els.length || REDUCED) return;
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      io.unobserve(e.target);
      const el = e.target;
      const final = el.textContent.trim();
      const target = parseFloat(final.replace(/[^\d.]/g, ''));
      if (!isFinite(target)) continue;
      const dec = el.dataset.decimals != null ? +el.dataset.decimals : ((final.split('.')[1] || '').replace(/\D/g, '').length);
      const pre = final.match(/^[^\d]*/)[0], post = final.match(/[^\d.]*$/)[0];
      const t0 = performance.now(), dur = 1400;
      const fmt = (v) => pre + v.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec }) + post;
      const tick = (t) => {
        const k = Math.min(1, (t - t0) / dur), v = target * (1 - Math.pow(1 - k, 3));
        el.textContent = k < 1 ? fmt(v) : final;
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }
  }, { threshold: 0.6 });
  els.forEach((el) => io.observe(el));
}

/* Parallax: [data-parallax="0.15"] drifts the element against the scroll. Transform only,
   one rAF per frame, and only while the element is near the view. */
function parallax() {
  const els = [...document.querySelectorAll('[data-parallax]')];
  if (!els.length || REDUCED || LOW_POWER) return;
  const live = new Set();
  const io = new IntersectionObserver((es) => es.forEach((e) => (e.isIntersecting ? live.add(e.target) : live.delete(e.target))), { rootMargin: '20% 0px' });
  els.forEach((el) => io.observe(el));
  let queued = false;
  const frame = () => {
    queued = false;
    const vh = innerHeight;
    for (const el of live) {
      const r = el.getBoundingClientRect();
      const k = (r.top + r.height / 2 - vh / 2) / vh;
      el.style.transform = `translate3d(0, ${(-k * (+el.dataset.parallax || 0.15) * 100).toFixed(2)}px, 0)`;
    }
  };
  addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(frame); } }, { passive: true });
  frame();
}

/* Pointer tilt [data-tilt] and magnetic pull [data-magnetic]: fine pointers only. */
function pointer() {
  if (!FINE || REDUCED) return;
  for (const el of document.querySelectorAll('[data-tilt]')) {
    const max = +el.dataset.tilt || 6;
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateX(${(-y * max).toFixed(2)}deg) rotateY(${(x * max).toFixed(2)}deg)`;
    });
    el.addEventListener('pointerleave', () => { el.style.transform = ''; });
  }
  for (const el of document.querySelectorAll('[data-magnetic]')) {
    const pull = +el.dataset.magnetic || 0.25;
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.transform = `translate(${((e.clientX - r.left - r.width / 2) * pull).toFixed(1)}px, ${((e.clientY - r.top - r.height / 2) * pull).toFixed(1)}px)`;
    });
    el.addEventListener('pointerleave', () => { el.style.transform = ''; });
  }
}

/* Header state: [data-header] gets .is-scrolled once the page has moved. */
function header() {
  const h = document.querySelector('[data-header]');
  if (!h) return;
  const set = () => h.classList.toggle('is-scrolled', scrollY > 8);
  addEventListener('scroll', set, { passive: true }); set();
}

/* Effects: [data-fx="name"] lazy-loads kit/fx/{name}.js no sooner than 1.5 s after load, on
   idle, once the element is near the view. Skipped entirely on reduced motion or low-power
   devices, where the element's own CSS background is what shows. .fx-on marks a host whose
   effect is actually drawing: it is not set when a module declines (no canvas), and loop()
   takes it off again if the effect is destroyed or gives up. */
function effects() {
  const els = [...document.querySelectorAll('[data-fx]')];
  if (!els.length || REDUCED || LOW_POWER) return;
  const base = new URL('./fx/', import.meta.url);
  /* the effect URLs carry motion.js's own ?v= (the hash of motion.js and every effect the site ships, W141) */
  const FX_QUERY = new URL(import.meta.url).search;
  const mount = (el) => {
    const name = el.dataset.fx;
    if (!/^[a-z0-9-]+$/.test(name)) return;
    import(new URL(`${name}.js`, base).href + FX_QUERY)
      .then((m) => { const h = m.default(el); if (h) el.kitFx = h; if (el.querySelector(':scope > .kit-fx-canvas')) el.classList.add('fx-on'); })
      .catch(() => {});
  };
  const start = () => {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { io.unobserve(e.target); mount(e.target); } }), { rootMargin: '200px' });
    els.forEach((el) => io.observe(el));
  };
  const idle = window.requestIdleCallback || ((f) => setTimeout(f, 200));
  const go = () => setTimeout(() => idle(start, { timeout: 2500 }), 1500);
  if (document.readyState === 'complete') go(); else addEventListener('load', go, { once: true });
}

/* WebGL on a software rasteriser (no usable GPU) turns every frame into a long task. Such a
   device gets no WebGL effect: the browser's own caveat flag first, the renderer name second. */
const SOFT_GL = /swiftshader|llvmpipe|softpipe|software|basic render|mesa offscreen/i;
const glName = (gl) => {
  let r = gl.getParameter(gl.RENDERER) || '';
  if (/^webkit webgl$/i.test(r)) { const x = gl.getExtension('WEBGL_debug_renderer_info'); if (x) r = gl.getParameter(x.UNMASKED_RENDERER_WEBGL) || r; }
  return r;
};
let pageShown = 0;
document.addEventListener('visibilitychange', () => { pageShown++; });

/* Shared helper for fx modules: a canvas that fills its host, sized for DPR ≤ 2, which
   reports whether it is on screen so the module can stop drawing when it is not. With no
   usable context (or WebGL on a software renderer) ctx is null and the canvas is already
   gone: the module returns a no-op handle and the host's CSS background stays. */
export function fxCanvas(el, { dpr = 2, webgl = false } = {}) {
  const c = document.createElement('canvas');
  c.setAttribute('aria-hidden', 'true');
  c.className = 'kit-fx-canvas';
  el.append(c);
  let ctx = webgl ? (c.getContext('webgl', { antialias: false, premultipliedAlpha: false, alpha: true, failIfMajorPerformanceCaveat: true }) || null) : c.getContext('2d');
  if (ctx && webgl && SOFT_GL.test(glName(ctx))) { const x = ctx.getExtension('WEBGL_lose_context'); if (x) x.loseContext(); ctx = null; }
  const state = { c, ctx, w: 0, h: 0, ratio: 1, visible: true, off() {} };
  if (!ctx) { c.remove(); return state; }
  const size = () => {
    const r = el.getBoundingClientRect();
    state.ratio = Math.min(dpr, window.devicePixelRatio || 1);
    state.w = Math.max(1, Math.round(r.width)); state.h = Math.max(1, Math.round(r.height));
    c.width = Math.round(state.w * state.ratio); c.height = Math.round(state.h * state.ratio);
  };
  size();
  /* The latest entry wins (a batch can hold out-then-in). No visibilitychange flag here:
     loop() already checks document.hidden, and a flag cleared on hide was never set back. */
  const ro = new ResizeObserver(size), io = new IntersectionObserver((es) => { state.visible = es[es.length - 1].isIntersecting; });
  ro.observe(el); io.observe(el);
  state.off = () => { ro.disconnect(); io.disconnect(); };
  return state;
}

/* A rAF loop that only runs while its canvas is visible and the tab is shown, at `fps`
   (default 30: ambient motion does not need more; pointer-driven modules ask for 60).
   It also keeps the effect inside a frame budget, on any device: if the median of the first
   20 draws is over 8 ms, or 3 frames within 5 s take over 50 ms (the draw itself, or a
   blocked gap between two live ticks, which is how a struggling GPU shows), the effect
   stops, its last frame fades out and the poster stays. A draw that returns false (nothing
   to draw yet) is not sampled. A module that wraps destroy() by assigning handle.destroy
   gets its own cleanup run too. */
export function loop(state, draw, { fps = 30 } = {}) {
  const c = state.c, host = c.parentNode, gap = 1000 / fps - 8, cost = [], slow = [];
  let id = 0, t0 = performance.now(), stopped = false, last = -1e9, prev = 0, ep = pageShown;
  const h = { destroy() { stopped = true; cancelAnimationFrame(id); c.remove(); if (state.off) state.off(); if (host) host.classList.remove('fx-on'); } };
  const bail = () => { stopped = true; cancelAnimationFrame(id); if (host) host.classList.remove('fx-on'); c.style.opacity = '0'; setTimeout(() => h.destroy(), 1300); };
  const tick = (t) => {
    if (stopped) return;
    id = requestAnimationFrame(tick);
    const on = state.visible && !document.hidden;
    if (ep !== pageShown) { ep = pageShown; prev = 0; }
    if (on && prev && t - prev > 50) slow.push(t);
    prev = on ? t : 0;
    if (!on || t - last < gap) return;
    last = t;
    const a = performance.now();
    if (draw((t - t0) / 1000) === false) return;        // nothing drawn yet: not a sample
    // (A draw over 50 ms shows up as the next tick's gap, so it is counted there, once.)
    if (cost.length < 20 && cost.push(performance.now() - a) === 20 && cost.sort((x, y) => x - y)[10] > 8) return bail();
    while (slow.length && t - slow[0] > 5000) slow.shift();
    if (slow.length >= 3) bail();
  };
  id = requestAnimationFrame(tick);
  return h;
}

export const color = (el, name, fallback) => (getComputedStyle(el).getPropertyValue(name).trim() || fallback);

/* One init per page: a module that imports this file by another URL gets its own copy of it (the fx
   modules' '../motion.js'), and a second init() would double the marquee and every loop. */
function init() {
  if (root.hasAttribute('data-kit-init')) return;
  root.setAttribute('data-kit-init', '');
  splits(); reveals(); marquees(); counts(); parallax(); pointer(); header(); effects();
  ready();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true }); else init();
