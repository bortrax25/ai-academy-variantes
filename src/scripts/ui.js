// UI compartida: tema, formularios, copiar, aviso de idioma y mensaje de consola.
import { gsap } from './motion.js';
import { parpadeo, iniciarPersonaje } from './personaje.js';
import { toast, T } from './toast.js';

const html = document.documentElement;

// ── Tema: sistema / claro / oscuro ──────────────────────────────
const botonesTema = [...document.querySelectorAll('.theme button')];
function pintarTema(t) {
  for (const b of botonesTema) b.setAttribute('aria-checked', String(b.dataset.t === t));
  for (const m of document.querySelectorAll('meta[name="theme-color"]')) {
    if (t === 'system') m.content = m.dataset.original;
    else m.content = t === 'dark' ? T.tema?.oscuro : T.tema?.claro;
  }
}
for (const m of document.querySelectorAll('meta[name="theme-color"]')) m.dataset.original = m.content;
pintarTema(html.dataset.theme || 'system');
for (const b of botonesTema) {
  b.addEventListener('click', () => {
    const t = b.dataset.t;
    if (t === 'system') delete html.dataset.theme; else html.dataset.theme = t;
    try { localStorage.setItem('tema', t); } catch {}
    pintarTema(t);
    gsap.timeline()
      .to('.glifo', { '--lid': 0.55, duration: 0.12 })
      .to('.glifo', { '--lid': 0, duration: 0.5, delay: 0.25 });
  });
}

// ── Formularios [data-form] ─────────────────────────────────────
for (const f of document.querySelectorAll('[data-form]')) {
  const msg = f.querySelector('.form-msg');
  const boton = f.querySelector('button[type="submit"]');
  f.addEventListener('submit', async (e) => {
    e.preventDefault();
    const datos = Object.fromEntries(new FormData(f));
    const endpoint = f.dataset.endpoint;
    if (!endpoint) {
      // Sin backend: abre el correo con el email ya escrito.
      const asunto = encodeURIComponent(T.form?.mailtoAsunto || '');
      location.href = `mailto:${f.dataset.contacto}?subject=${asunto}&body=${encodeURIComponent(datos.email || '')}`;
      return;
    }
    boton.disabled = true;
    msg.className = 'form-msg';
    msg.textContent = T.form?.enviando;
    try {
      const r = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...datos, idioma: html.lang, pagina: location.pathname }),
      });
      if (!r.ok) throw new Error();
      f.classList.add('hecho');
      msg.classList.add('ok');
      msg.textContent = T.form?.ok;
      parpadeo('.glifo', 0.1);
    } catch {
      msg.classList.add('err');
      msg.textContent = T.form?.error;
    } finally {
      boton.disabled = false;
    }
  });
}

// ── Copiar [data-copiar="texto"] ────────────────────────────────
for (const b of document.querySelectorAll('[data-copiar]')) {
  b.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(b.dataset.copiar); } catch {}
    const etiqueta = b.querySelector('[data-etiqueta]');
    const antes = etiqueta?.textContent;
    if (etiqueta && b.dataset.copiado) etiqueta.textContent = b.dataset.copiado;
    b.classList.add('copiado');
    toast(T.toasts?.copiado);
    setTimeout(() => { b.classList.remove('copiado'); if (etiqueta) etiqueta.textContent = antes; }, 1400);
  });
}

// ── Aviso de idioma ─────────────────────────────────────────────
const aviso = document.querySelector('.aviso-idioma');
if (aviso) {
  const prefiere = (navigator.language || '').slice(0, 2);
  let cerrado = false;
  try { cerrado = localStorage.getItem('aviso-idioma') === '1'; } catch {}
  if (!cerrado && prefiere === aviso.dataset.lang && prefiere !== html.lang) {
    aviso.hidden = false;
    // Se aparta al bajar (no tapa contenido) y vuelve arriba del todo.
    addEventListener('scroll', () => aviso.classList.toggle('fuera', scrollY > 300), { passive: true });
  }
  aviso.querySelector('button')?.addEventListener('click', () => {
    aviso.hidden = true;
    try { localStorage.setItem('aviso-idioma', '1'); } catch {}
  });
}

// ── Personaje y consola ─────────────────────────────────────────
iniciarPersonaje({ palabra: T.nombre });
if (T.consola) console.log(`%c${T.nombre}%c\n${T.consola}`, 'font:700 20px system-ui', 'font:12px monospace');
