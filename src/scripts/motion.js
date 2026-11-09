// Motor de movimiento compartido: GSAP + ScrollTrigger + Lenis, apariciones y anclas.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
export const lenis = new Lenis({ lerp: reduced ? 1 : 0.1 });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((t) => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);
window.__lenis = lenis;

// Apariciones: [data-reveal] y [data-reveal="stagger"] (hijos en cascada)
for (const el of document.querySelectorAll('[data-reveal="stagger"]')) {
  [...el.children].forEach((c, i) => c.style.setProperty('--i', i));
}
const io = new IntersectionObserver(
  (entradas) => {
    for (const e of entradas) if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
  },
  { rootMargin: '0px 0px -12% 0px' },
);
document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));

// Anclas internas con scroll suave
function irA(hash) {
  const destino = hash.length > 1 && document.querySelector(decodeURIComponent(hash));
  if (destino) lenis.scrollTo(destino, { offset: -24, duration: reduced ? 0 : 1.4 });
  return !!destino;
}
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href*="#"]');
  if (!a) return;
  const url = new URL(a.href);
  if (url.pathname.replace(/\/$/, '') !== location.pathname.replace(/\/$/, '')) return;
  if (irA(url.hash)) { e.preventDefault(); history.pushState(null, '', url.hash); }
});
if (location.hash) requestAnimationFrame(() => irA(location.hash));

export { gsap, ScrollTrigger };
