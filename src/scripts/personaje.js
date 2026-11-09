// El personaje del logotipo: la metáfora de la marca en movimiento (patrón de ojito.dev).
// Mecánica: .glifo con pupila <i> y párpado ::before escalado por --lid (0 abierto, 1 cerrado).
// Si tu metáfora no es un ojo, cambia el dibujo en CSS y conserva estas funciones.
import { gsap, reduced } from './motion.js';
import { toast, T } from './toast.js';

const glifos = () => [...document.querySelectorAll('.glifo')];

export function parpadeo(sel = '.glifo', espera = 0) {
  return gsap.timeline()
    .to(sel, { '--lid': 1, duration: 0.08, ease: 'power2.out' })
    .to(sel, { '--lid': 0, duration: 0.2, ease: 'power2.out', delay: espera });
}

let cx = innerWidth / 2, cy = innerHeight * 0.8;
function mirar(fuerza = 0.13) {
  for (const i of document.querySelectorAll('.glifo i')) {
    const r = i.parentElement.getBoundingClientRect();
    if (r.bottom < 0 || r.top > innerHeight) continue;
    const x = r.left + r.width / 2, y = r.top + r.height / 2;
    const ang = Math.atan2(cy - y, cx - x);
    const d = Math.min(r.width * fuerza, Math.hypot(cx - x, cy - y) / 10);
    i.style.transform = `translate(calc(-50% + ${Math.cos(ang) * d}px), calc(-50% + ${Math.sin(ang) * d}px))`;
  }
}

export function huevos(mapa) {
  let buf = '';
  const konami = 'arrowuparrowuparrowdownarrowdownarrowleftarrowrightarrowleftarrowrightba';
  addEventListener('keydown', (e) => {
    buf = (buf + (e.key || '').toLowerCase()).slice(-80);
    for (const [palabra, fn] of Object.entries(mapa)) {
      if (palabra === 'konami' ? buf.endsWith(konami) : buf.endsWith(palabra)) fn();
    }
  });
}

export function iniciarPersonaje({ palabra } = {}) {
  if (!glifos().length) return;
  addEventListener('pointermove', (e) => { cx = e.clientX; cy = e.clientY; mirar(); despertar(); }, { passive: true });
  addEventListener('scroll', () => mirar(), { passive: true });
  mirar();

  for (const g of glifos()) {
    g.addEventListener('click', (e) => { e.stopPropagation(); e.preventDefault(); parpadeo([g], 0.12); });
    let t;
    g.addEventListener('pointerenter', () => (t = setTimeout(() => document.body.classList.add('pupilas-grandes'), 900)));
    g.addEventListener('pointerleave', () => { clearTimeout(t); document.body.classList.remove('pupilas-grandes'); });
  }
  for (const l of document.querySelectorAll('.logo')) {
    l.addEventListener('dblclick', () => { parpadeo(); toast(T.toasts?.guinio); });
  }

  // Sueño tras 20 s sin actividad
  let quieto = 0, dormido = false;
  function despertar() {
    quieto = 0;
    if (dormido) { dormido = false; gsap.to('.glifo', { '--lid': 0, duration: 0.25 }); }
  }
  setInterval(() => {
    if (++quieto >= 20 && !dormido) { dormido = true; gsap.to('.glifo', { '--lid': 0.62, duration: 1.6, ease: 'power2.out' }); }
  }, 1000);
  addEventListener('keydown', despertar);
  addEventListener('scroll', despertar, { passive: true });

  if (!reduced) {
    const ciclo = () => {
      if (!dormido && !document.hidden) parpadeo('.heroe .glifo, .final .glifo, .site-brand .glifo');
      setTimeout(ciclo, 3500 + Math.random() * 4000);
    };
    setTimeout(ciclo, 2500);
  }

  const giro = () => {
    const o = { a: 0 };
    gsap.to(o, {
      a: Math.PI * 6, duration: 1.6, ease: 'power3.out',
      onUpdate: () => document.querySelectorAll('.glifo i').forEach((i) => (i.style.transform = `translate(calc(-50% + ${Math.cos(o.a) * 10}px), calc(-50% + ${Math.sin(o.a) * 10}px))`)),
      onComplete: () => mirar(),
    });
  };
  huevos({
    ...(palabra ? { [palabra.toLowerCase()]: () => { toast(T.toasts?.hola); parpadeo('.glifo', 0.25); } } : {}),
    konami: giro,
  });
}
