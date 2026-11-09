import { sitio } from '../sitio.js';

// Carga todos los archivos de src/contenido/<idioma>.js
const mods = import.meta.glob('../contenido/*.js', { eager: true });
const todos = Object.fromEntries(
  Object.entries(mods).map(([r, m]) => [r.match(/(\w+)\.js$/)[1], m.default]),
);

/** Textos del idioma pedido, con caída al idioma principal. */
export function textos(lang) {
  return todos[lang] || todos[sitio.idiomas[0]];
}
