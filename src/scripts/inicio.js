// Coreografía: el curso en miniatura (4 capítulos). Ver references/movimiento.md §2.
import { crearHistoria, capitulo, desdeIcono, escribir, aparecer, aterrizar, lineas, guinio } from './historia.js';

const $ = (s) => document.querySelector(s);
const app = (n) => ($('.menubar .app').textContent = n);
const cuenta = (n) => ($('.curso .cuenta').textContent = `${n} de 6 clases`);
const estado = (a, n) => () => { app(a); cuenta(n); $('.m6').classList.toggle('hecho', n === 6); };

crearHistoria('.historia', (tl, m) => {
  const marcar = (i, t) => tl.fromTo(`.m${i} .ok`, { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(3)' }, t);

  // Intro: el héroe se va y el escritorio sube.
  const heroe = m.$('.heroe').getBoundingClientRect();
  const bajar = Math.max(0, heroe.bottom + (m.movil ? 24 : 40) - m.demo.getBoundingClientRect().top);
  tl.fromTo(m.demo, { y: bajar }, { y: 0, duration: 6, ease: 'power2.inOut' }, 0);
  tl.to('.heroe', { opacity: 0, y: -40, duration: 3.5 }, 0.5);
  [2, 3, 4, 5, 6].forEach((i) => tl.set(`.m${i} .ok`, { opacity: 0 }, 0));
  tl.estado(0, estado('Clase en vivo', 1));

  // 01 · Entra
  capitulo(tl, m, 1, 3.5);
  desdeIcono(tl, m, '.w-clase', '.d-clase', 4.2);
  tl.fromTo('.curso', { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 1.2, ease: 'power3.out' }, 5.6);
  if (!m.movil) lineas(tl, '.cara', 6.2, 0.35);

  // 02 · Pídelo mejor: la pregunta suelta → la instrucción completa → la tabla.
  capitulo(tl, m, 2, 9);
  escribir(tl, m, '.p-vaga', 10, 1);
  aparecer(tl, '.r-vaga', 11.3, 0.8);
  escribir(tl, m, '.p-buena', 12.8, 3);
  tl.to('.r-vaga', { opacity: 0.35, duration: 0.6 }, 15.6);
  aparecer(tl, '.r-tabla', 16.2, 0.9);
  marcar(2, 17.4); tl.estado(17.4, estado('Clase en vivo', 2));
  marcar(3, 18.2); tl.estado(18.2, estado('Clase en vivo', 3));

  // 03 · Automatiza: el flujo corre paso a paso.
  capitulo(tl, m, 3, 19.5);
  tl.estado(20.6, estado('Flujos', 3));
  desdeIcono(tl, m, '.w-flujo', '.d-flujo', 20.6);
  lineas(tl, '.nodo', 22, 0.7);
  lineas(tl, '.registro .tl', 24.2, 0.8);
  marcar(4, 26.6); tl.estado(26.6, estado('Flujos', 4));
  marcar(5, 27.3); tl.estado(27.3, estado('Flujos', 5));

  // 04 · Entrega: el flujo se convierte en la tarjeta del proyecto final.
  capitulo(tl, m, 4, 28.6);
  // La fila existe desde el principio: la ventana aterriza sobre ella y se funde (sin ocultarla antes).
  tl.set('.w-flujo', { clipPath: 'inset(0px 0px 0px 0px round 12px)' }, 30);
  tl.to('.w-flujo', { ...aterrizar(m, '.w-flujo', '.m6'), duration: 2.4, ease: 'power2.inOut' }, 30);
  tl.to('.w-flujo', { opacity: 0, duration: 0.45 }, 32.35);
  marcar(6, 32.5); tl.estado(32.5, estado('AI Academy', 6));
  guinio(tl, '.site-brand .glifo', 32.5);
  tl.to({}, { duration: 6 }, 34);
});
