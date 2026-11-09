import { sitio } from '../sitio.js';

const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');

/** Ruta interna con la base del sitio: ruta('/precios') → '/repo/precios'. */
export function ruta(p = '/') {
  if (/^(https?:|mailto:|tel:|#)/.test(p)) return p;
  const r = (base + (p.startsWith('/') ? p : '/' + p)).replace(/(.)\/+$/, '$1');
  return r || '/';
}

/** Ruta en un idioma (el principal no lleva prefijo), con base: rutaIdioma('en','/precios') → '/repo/en/precios'. */
export function rutaIdioma(lang, p = '/') {
  if (/^(https?:|mailto:|tel:|#)/.test(p)) return p;
  const pre = lang === sitio.idiomas[0] ? '' : '/' + lang;
  return ruta(pre + (p === '/' ? '/' : p));
}

/** URL absoluta a partir de una ruta YA con base (la que devuelven ruta/rutaIdioma). */
export function absoluta(rutaConBase) {
  return sitio.url + rutaConBase;
}

/** Reescribe href="/…" dentro de textos HTML del contenido para que respeten base e idioma. */
export function enlazar(html = '', lang) {
  return html.replace(/href="(\/[^"]*)"/g, (_, p) => `href="${rutaIdioma(lang, p)}"`);
}

/** href de un enlace del contenido (interno, ancla, mailto o externo). */
export const href = (lang, p) => rutaIdioma(lang, p);
