// Toast accesible (role=status). Uso: toast('Copiado.')
let reloj;
export function toast(texto, ms = 2200) {
  const el = document.querySelector('.toast');
  if (!el || !texto) return;
  el.textContent = texto;
  el.classList.add('on');
  clearTimeout(reloj);
  reloj = setTimeout(() => el.classList.remove('on'), ms);
}

/** Textos que necesita el JS, inyectados por Base.astro en <script id="textos-js">. */
export const T = (() => {
  try { return JSON.parse(document.getElementById('textos-js').textContent); } catch { return {}; }
})();
