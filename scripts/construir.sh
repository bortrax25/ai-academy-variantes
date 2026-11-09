#!/usr/bin/env bash
# Construye todas las variantes en dist/<id>/ y la vitrina en dist/index.html.
# Uso: bash scripts/construir.sh [--og]   (--og: regenera og.png e iconos de cada tema; necesita Chrome)
set -euo pipefail
cd "$(dirname "$0")/.."
python3 -I src/temas/generar.py >/dev/null
rm -rf dist; mkdir -p dist
TEMAS=$(ls -d src/temas/*/ | xargs -n1 basename)
for T in $TEMAS; do
  VARIANTE=$T npx astro build >/dev/null 2>&1 || { echo "✗ $T"; VARIANTE=$T npx astro build 2>&1 | tail -20; exit 1; }
  echo "✓ $T"
done
if [ "${1:-}" = "--og" ]; then
  RAIZ="$(mktemp -d)"; ln -s "$PWD/dist" "$RAIZ/ai-academy-variantes"
  npx -y serve@14.2.4 "$RAIZ" -l 4330 >/dev/null 2>&1 & SRV=$!; sleep 3
  for T in $TEMAS; do mkdir -p "src/temas/$T/public"; node ~/.claude/skills/skill-web-pro/scripts/og.mjs "http://localhost:4330/ai-academy-variantes/$T" "src/temas/$T" >/dev/null && echo "og $T"; done
  node scripts/portadas.mjs "http://localhost:4330/ai-academy-variantes" && echo "portadas"
  kill $SRV; rm -rf "$RAIZ"
fi
# Imágenes propias de cada tema (og.png, iconos) encima de las compartidas
for T in $TEMAS; do [ -d "src/temas/$T/public" ] && cp -R "src/temas/$T/public/." "dist/$T/"; done
node scripts/vitrina.mjs
echo "Listo: dist/ ($(echo $TEMAS | wc -w | tr -d ' ') variantes + vitrina)"
