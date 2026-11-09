import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { fileURLToPath } from 'node:url';
import { existsSync } from 'node:fs';

// Un proyecto, varias variantes: VARIANTE=<id> elige src/temas/<id>/ (tokens, fuentes, logo).
const VARIANTE = process.env.VARIANTE || '00-fuse';
const tema = fileURLToPath(new URL(`./src/temas/${VARIANTE}/`, import.meta.url));
if (!existsSync(tema)) throw new Error(`No existe el tema ${VARIANTE}`);
const REPO = 'ai-academy-variantes';

export default defineConfig({
  site: 'https://bortrax25.github.io',
  base: `/${REPO}/${VARIANTE}`,
  outDir: `./dist/${VARIANTE}`,
  trailingSlash: 'ignore',
  build: { format: 'file' },
  integrations: [sitemap({ filter: (p) => !p.includes('/og') })],
  vite: { resolve: { alias: { '@tema': tema } } },
});
