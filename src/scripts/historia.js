// Helpers para la historia fijada al scroll (la técnica de ojito.dev, generalizada).
// Uso en src/scripts/inicio.js:  crearHistoria('.historia', (tl, m) => { ... })
import { gsap, ScrollTrigger, reduced } from './motion.js';

export { gsap, reduced };

// Propiedades que la historia anima y que hay que limpiar antes de volver a medir.
const PROPS = 'transform,opacity,clipPath,filter,outlineColor,visibility,translate,scale,rotate,--lid';

/** Construye (y reconstruye al cambiar el ancho) una línea de tiempo con scrub sobre `sel`. */
export function crearHistoria(sel, construir) {
  const raiz = document.querySelector(sel);
  if (!raiz || reduced) return; // con movimiento reducido manda el CSS (.is-static)
  let tl;
  let anchoPrevio = 0;

  const build = () => {
    anchoPrevio = innerWidth;
    tl?.scrollTrigger?.kill();
    tl?.kill();
    gsap.set(raiz.querySelectorAll('*'), { clearProps: PROPS });
    raiz.querySelectorAll('[data-escribe]').forEach((el) => (el.textContent = el.dataset.escribe));

    const demo = raiz.querySelector('.demo') || raiz;
    const cajas = new Map();
    const base = demo.getBoundingClientRect();
    const caja = (s) => {
      const el = typeof s === 'string' ? raiz.querySelector(s) : s;
      if (!el) throw new Error(`historia: no existe ${s}`);
      if (!cajas.has(el)) {
        const b = el.getBoundingClientRect();
        cajas.set(el, { x: b.left - base.left, y: b.top - base.top, w: b.width, h: b.height });
      }
      return cajas.get(el);
    };
    // Mide TODO antes de que construir() aplique estados iniciales.
    raiz.querySelectorAll('.demo *').forEach((el) => el.offsetParent && caja(el));

    const estados = [];
    let ultimo;
    tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: raiz, start: 'top top', end: 'bottom bottom', scrub: true },
      onUpdate() {
        const t = tl.time();
        let fn;
        for (const [tt, f] of estados) if (t >= tt) fn = f;
        if (fn && fn !== ultimo) { ultimo = fn; fn(); }
      },
    });
    tl.estado = (t, fn) => { estados.push([t, fn]); estados.sort((a, b) => a[0] - b[0]); return tl; };

    const m = { raiz, demo, caja, movil: innerWidth < 700, $: (s) => raiz.querySelector(s), $$: (s) => [...raiz.querySelectorAll(s)] };
    construir(tl, m);
    estados[0]?.[1]();
    raiz.classList.add('construida');
  };

  document.fonts.ready.then(() => {
    build();
    let id;
    addEventListener('resize', () => {
      if (innerWidth === anchoPrevio) return; // la barra de URL del móvil no reconstruye
      clearTimeout(id);
      id = setTimeout(() => { build(); ScrollTrigger.refresh(); }, 200);
    });
  });
}

/** Cruza la leyenda n-1 → n en el tiempo t (las leyendas son .leyenda dentro de la historia). */
export function capitulo(tl, m, n, t) {
  const l = m.$$('.leyenda');
  if (n > 1) tl.to(l[n - 2], { opacity: 0, y: -14, duration: 1 }, t);
  tl.fromTo(l[n - 1], { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 1.5 }, t + (n > 1 ? 1 : 0));
}

/** Aparece un elemento (sube 40px). */
export function aparecer(tl, sel, t, dur = 1.4) {
  tl.fromTo(sel, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: dur, ease: 'power3.out' }, t);
}

/** Una ventana nace desde su icono del dock (o desde otro elemento) y crece a su sitio. */
export function desdeIcono(tl, m, win, icono, t, dur = 1.4) {
  const a = m.caja(win), b = m.caja(icono);
  tl.fromTo(
    win,
    { x: b.x - a.x, y: b.y - a.y, scale: b.w / a.w, opacity: 0, transformOrigin: '0 0' },
    { x: 0, y: 0, scale: 1, opacity: 1, duration: dur, ease: 'power3.out' },
    t,
  );
  tl.to(icono, { y: -10, duration: 0.3, yoyo: true, repeat: 1 }, t);
}

/** Calcula x/y/scale/clipPath para que `desde` caiga exactamente sobre `hasta`. */
export function aterrizar(m, desde, hasta) {
  const a = m.caja(desde), b = m.caja(hasta);
  const s = Math.max(b.w / a.w, b.h / a.h);
  return {
    x: b.x - a.x, y: b.y - a.y, scale: s, transformOrigin: '0 0',
    clipPath: `inset(0px ${a.w - b.w / s}px ${a.h - b.h / s}px 0px round ${10 / s}px)`,
  };
}

/** La ventana vuela hasta la tarjeta y se convierte en ella (cruce de opacidad al final). */
export function convertir(tl, m, win, tarjeta, t, dur = 2.4) {
  gsap.set(tarjeta, { opacity: 0 });
  tl.set(win, { clipPath: 'inset(0px 0px 0px 0px round 12px)' }, t);
  tl.to(win, { ...aterrizar(m, win, tarjeta), duration: dur, ease: 'power2.inOut' }, t);
  tl.to(tarjeta, { opacity: 1, duration: 0.45 }, t + dur - 0.05);
  tl.to(win, { opacity: 0, duration: 0.45 }, t + dur - 0.05);
}

/** Simula tecleo del texto que YA tiene el elemento (el HTML guarda el estado final). */
export function escribir(tl, m, sel, t, dur = 2) {
  const el = typeof sel === 'string' ? m.$(sel) : sel;
  const texto = (el.dataset.escribe ??= el.textContent);
  const o = { n: 0 };
  el.textContent = '';
  tl.to(o, { n: texto.length, duration: dur, onUpdate: () => (el.textContent = texto.slice(0, Math.round(o.n))) }, t);
}

/** Muestra líneas (p. ej. de una terminal) una a una. */
export function lineas(tl, sel, t, separacion = 1.2) {
  tl.fromTo(sel, { opacity: 0 }, { opacity: 1, duration: 0.6, stagger: separacion }, t);
}

/** Parpadeo/destello del glifo de la marca dentro de la historia. */
export function guinio(tl, sel, t) {
  tl.to(sel, { '--lid': 1, duration: 0.35 }, t).to(sel, { '--lid': 0, duration: 0.55 }, t + 0.35);
}
