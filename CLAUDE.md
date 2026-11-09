# AI Academy · variantes — 16 sitios desde los moldes del embudo (skill-web-pro)
Un proyecto, un tema por molde. Contenido y demo compartidos; la forma la pone cada tema.
- Temas: `src/temas/generar.py` (EDITAR AQUÍ: paleta claro/oscuro, fuentes, firma visual) → genera `src/temas/<id>/tema.css|tema.js`.
- Capa de identidad que leen los temas: variables al final de `src/styles/paginas.css`. Héroe lateral/centrado: `data-heroe` (LATERAL en generar.py).
- Una variante en desarrollo: `VARIANTE=21-beluga npm run dev` → http://localhost:4321/ai-academy-variantes/21-beluga/
- Todas: `bash scripts/construir.sh` (añade `--og` para regenerar og.png y portadas; necesita Chrome) → `dist/<id>/` + `dist/index.html` (vitrina).
- Textos: `src/contenido/es.js` (los mismos datos reales del producto que ai-academy-web).
- Publicación (pendiente de confirmar): repo bortrax25/ai-academy-variantes, workflow propio en .github/workflows/deploy.yml.
