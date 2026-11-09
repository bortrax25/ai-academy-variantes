// Captura la primera pantalla de cada variante (para la vitrina): src/temas/<id>/public/portada.jpg
import { execSync } from 'node:child_process';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
const raiz = execSync('npm root -g').toString().trim();
const { chromium } = await import(pathToFileURL(join(raiz, 'playwright', 'index.mjs')).href);
const base = process.argv[2];
const b = await chromium.launch({ channel: 'chrome' });
for (const id of readdirSync('src/temas', { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name)) {
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto(`${base}/${id}/`, { waitUntil: 'networkidle' }); await p.waitForTimeout(500);
  await p.screenshot({ path: `src/temas/${id}/public/portada.jpg`, type: 'jpeg', quality: 82, clip: { x: 0, y: 0, width: 1440, height: 900 } });
  await p.close();
}
await b.close();
