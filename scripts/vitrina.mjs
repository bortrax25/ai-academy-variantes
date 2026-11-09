// Portada que reúne todas las variantes: dist/index.html
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
const temas = readdirSync('src/temas', { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name).sort();
const datos = temas.map((id) => {
  const js = readFileSync(`src/temas/${id}/tema.js`, 'utf8');
  return { id, molde: /"molde": "([^"]+)"/.exec(js)[1], claro: /"claro": "([^"]+)"/.exec(js)[1] };
});
const tarjetas = datos.map((t, i) => `
    <a class="t" href="./${t.id}/" style="--c:${t.claro}">
      <img src="./${t.id}/portada.jpg" alt="Portada de la variante ${t.id}" width="1440" height="900" loading="${i < 6 ? 'eager' : 'lazy'}">
      <span class="n">${String(i + 1).padStart(2, '0')}</span><b>${t.id}</b><small>${t.molde}</small>
    </a>`).join('');
writeFileSync('dist/index.html', `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>AI Academy · ${datos.length} variantes</title>
<meta name="description" content="El mismo curso de AI Academy en ${datos.length} identidades visuales distintas, cada una nacida de un molde del embudo.">
<meta name="robots" content="noindex"><link rel="icon" href="./${datos[0].id}/favicon.svg" type="image/svg+xml">
<style>
:root{color-scheme:light dark;--p:light-dark(#f5f3ee,#111);--i:light-dark(#151515,#eee);--i2:light-dark(#5a5a5a,#a5a5a5);--h:light-dark(#0000001a,#ffffff1f)}
*{box-sizing:border-box;margin:0}body{background:var(--p);color:var(--i);font:16px/1.5 system-ui,-apple-system,sans-serif;padding:clamp(24px,5vw,64px) clamp(16px,4vw,48px)}
header{max-width:1200px;margin:0 auto 40px;display:grid;gap:10px}h1{font-size:clamp(34px,5vw,60px);letter-spacing:-.04em;line-height:1}
header p{color:var(--i2);max-width:62ch}main{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:20px}
.t{display:grid;gap:6px;text-decoration:none;color:inherit;padding:10px 10px 16px;border-radius:16px;border:1px solid var(--h);background:light-dark(#fff,#1a1a1a);transition:transform .25s cubic-bezier(.16,1,.3,1),box-shadow .25s}
.t:hover{transform:translateY(-3px);box-shadow:0 18px 40px -20px #0006}.t img{width:100%;height:auto;border-radius:10px;border:1px solid var(--h);background:var(--c)}
.n{font:600 11px/1 ui-monospace,monospace;color:var(--i2);margin-top:8px}.t b{font-size:17px;letter-spacing:-.02em}.t small{color:var(--i2);font-size:14px}
a:focus-visible{outline:2px solid currentColor;outline-offset:3px}
</style></head><body>
<header><h1>AI Academy, ${datos.length} veces</h1>
<p>El mismo curso (6 clases en vivo, S/ 120, pago único) con ${datos.length} identidades distintas. Cada una traduce un molde del embudo a un sitio completo: historia animada, temario, precio, inscripción, marca y modo oscuro.</p></header>
<main>${tarjetas}
</main></body></html>`);
console.log('vitrina:', datos.length);
