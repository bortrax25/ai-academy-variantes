#!/usr/bin/env python3
# Genera src/temas/<id>/tema.css y tema.js a partir de TEMAS (la firma visual de cada molde del embudo).
# Cada color va como (claro, oscuro). Ejecuta: python3 src/temas/generar.py
import os, json
R = os.path.dirname(os.path.abspath(__file__)); NM = os.path.join(R, '..', '..', 'node_modules')

def italica(pkg):
    for f in ('wght-italic.css', 'standard-italic.css', 'full-italic.css'):
        if os.path.exists(os.path.join(NM, pkg, f)): return f"@import '{pkg}/{f}';"
    return ''
FUENTES = {
  'inter': ("@import '@fontsource-variable/inter';", "'Inter Variable', ui-sans-serif, system-ui, sans-serif"),
  'newsreader': ("@import '@fontsource-variable/newsreader';\n" + italica('@fontsource-variable/newsreader'), "'Newsreader Variable', Georgia, serif"),
  'plex': ("@import '@fontsource/ibm-plex-mono/400.css';\n@import '@fontsource/ibm-plex-mono/500.css';\n@import '@fontsource/ibm-plex-mono/600.css';\n@import '@fontsource/ibm-plex-mono/400-italic.css';", "'IBM Plex Mono', ui-monospace, monospace"),
  'nunito-sans': ("@import '@fontsource-variable/nunito-sans';", "'Nunito Sans Variable', ui-sans-serif, system-ui, sans-serif"),
  'nunito': ("@import '@fontsource-variable/nunito';", "'Nunito Variable', ui-rounded, system-ui, sans-serif"),
  'fraunces': ("@import '@fontsource-variable/fraunces';\n" + italica('@fontsource-variable/fraunces'), "'Fraunces Variable', Georgia, serif"),
  'instrument': ("@import '@fontsource/instrument-serif/400.css';\n@import '@fontsource/instrument-serif/400-italic.css';", "'Instrument Serif', Georgia, serif"),
  'caveat': ("@import '@fontsource-variable/caveat';", "'Caveat Variable', cursive"),
  'jetbrains': ("@import '@fontsource-variable/jetbrains-mono';", "'JetBrains Mono Variable', ui-monospace, monospace"),
}
LD = lambda par: par if isinstance(par, str) else (par[0] if par[0] == par[1] else f"light-dark({par[0]}, {par[1]})")

COMUN = dict(hair=None)
TEMAS = {
 '00-fuse': dict(molde='Editorial verde: serif tranquila, mucho aire, cifras grandes.', sans='inter', titulo='newsreader', em='newsreader',
   c=dict(paper=('#fbfaf8','#0f1714'), paper2=('#efede8','#17221e'), ink=('#15151a','#eceee9'), ink2=('#55565c','#a3aaa5'), accent=('#cfe7dd','#2f6f5e'), on_accent=('#10231f','#eceee9'), accent_ink=('#2f6f5e','#7cc7b0'), night=('#10231f','#0a1512'),
          marca=('#2f6f5e','#7cc7b0'), marca_sobre=('#fff','#0f1714'), marca_suave=('#e3efe9','#1d2d27'), marca_ink=('#10231f','#d6eee5'), btn_top=('#1d3a33','#e9efe9'), btn_bottom=('#10231f','#cfdcd5'), btn_ink=('#fff','#10231f'),
          wall=(('#e6f0f2','#1b2a2e'),('#cfe1e6','#121d20'),('#9fbcc4','#07100f'))),
   v={'--peso-titulo':'500','--tracking-titulo':'-0.02em','--logo-familia':'var(--font-sans)','--logo-peso':'700','--logo-b-estilo':'normal','--logo-b-peso':'700','--logo-tracking':'-0.04em',
      '--borde':'1px solid var(--hair)','--sombra-tarjeta':'0 20px 60px -30px rgba(40,70,80,.35)','--radio-tarjeta':'8px','--radio-btn':'6px','--btn-borde':'0','--btn-sombra':'0 1px 2px #0002','--btn-sombra-hover':'0 6px 18px -6px #0004',
      '--cifra-color':'#cfe7dd','--closer-sombra':'none','--destacado':'#cfe7dd','--fondo-tarjeta':'light-dark(#fff, #14201c)'}),
 '01-throxy': dict(molde='Monoespaciada y pastel: bloques lila, menta y durazno con sombra dura.', sans='plex', titulo='plex', em='plex', mono='plex',
   c=dict(paper=('#f7f3ee','#141312'), paper2=('#efe8df','#1e1c1a'), ink=('#1a1a1a','#efe9e0'), ink2=('#555555','#a9a196'), accent=('#9a82f0','#9a82f0'), on_accent=('#1a1a1a','#1a1a1a'), accent_ink=('#5b40c9','#b7a6ff'), night=('#1a1a1a','#0a0a0a'),
          marca=('#1a1a1a','#d7c9fa'), marca_sobre=('#fff','#1a1a1a'), marca_suave=('#ece5fd','#2a2440'), marca_ink=('#2a1a66','#e6dcff'), btn_top=('#2a2a2a','#f4efe8'), btn_bottom=('#1a1a1a','#ddd5ca'), btn_ink=('#fff','#1a1a1a'),
          wall=(('#d7c9fa','#2a2440'),('#d8f4cf','#1d2a22'),('#f3e6cf','#141312'))),
   v={'--peso-titulo':'500','--tracking-titulo':'-0.03em','--logo-peso':'600','--logo-b-estilo':'normal','--logo-b-peso':'600','--logo-tracking':'-0.05em','--em-color':'var(--accent-ink)',
      '--borde':'1.5px solid var(--ink)','--sombra-tarjeta':'6px 6px 0 var(--ink)','--radio-tarjeta':'0','--radio-btn':'0','--btn-borde':'1.5px solid var(--ink)','--btn-sombra':'4px 4px 0 #9a82f0','--btn-sombra-hover':'6px 6px 0 #9a82f0',
      '--cifra-color':'#d8f4cf','--closer-sombra':'10px 10px 0 #9a82f0','--destacado':'#d8f4cf','--fondo-tarjeta':'light-dark(#fff, #1c1a18)'},
   extra='body { font-size: 15px; } .leyenda, .heroe .frase { letter-spacing: -0.04em; } @media (width <= 480px) { .site-nav .btn.sm { padding: 0 10px; font-size: 12px; letter-spacing: -0.04em; } .site-brand .logo-mini { font-size: 21px; } }'),
 '02-orange-slice': dict(molde='Paisaje ilustrado y cálido: colinas, sol, naranja y crema.', sans='nunito-sans', titulo='fraunces', em='fraunces',
   c=dict(paper=('#f6efe2','#1a140d'), paper2=('#ece2cf','#241c13'), ink=('#2b2a22','#f1e9da'), ink2=('#6b6556','#b3a993'), accent=('#e27a3a','#ef8c4d'), on_accent=('#26170b','#26170b'), accent_ink=('#a84a14','#f4a06a'), night=('#3d4a2c','#2a331e'),
          marca=('#c9601f','#ef8c4d'), marca_sobre=('#fff','#26170b'), marca_suave=('#fde6d4','#3a2414'), marca_ink=('#5a2a0c','#fde6d4'), btn_top=('#ee9257','#ee9257'), btn_bottom=('#d96a26','#d96a26'), btn_ink=('#26170b','#26170b'),
          wall=(('#cfe0e4','#22303a'),('#9cbf7f','#1f2a17'),('#c9601f','#3a1d08'))),
   v={'--peso-titulo':'600','--tracking-titulo':'-0.025em','--logo-familia':'var(--font-sans)','--logo-peso':'800','--logo-b-estilo':'normal','--logo-b-peso':'800','--logo-tracking':'-0.04em',
      '--borde':'1px solid var(--hair)','--sombra-tarjeta':'0 20px 50px -24px rgba(40,30,10,.35)','--radio-tarjeta':'18px','--btn-borde':'0','--btn-sombra':'0 4px 14px rgba(0,0,0,.15)','--btn-sombra-hover':'0 8px 22px rgba(0,0,0,.2)',
      '--banda-fondo':'linear-gradient(180deg, #5f7d48, #8a5a2c)','--cifra-color':'#ffd9b8','--closer-fondo':'linear-gradient(135deg, #5f7d48, #a8622c)','--closer-sombra':'0 20px 50px -20px rgba(40,30,10,.5)','--destacado':'#ffd9b8','--fondo-tarjeta':'light-dark(#fffbf1, #221a11)'}),
 '08-persana-ai': dict(molde='Violeta luminoso: degradados morado-fucsia, píldoras, itálica serif.', sans='inter', titulo='inter', em='instrument',
   c=dict(paper=('#ffffff','#0f0a1d'), paper2=('#f4f0fd','#1a1330'), ink=('#1b1034','#eee9fb'), ink2=('#5b4d85','#ab9fd0'), accent=('#6d3df2','#6d3df2'), on_accent=('#fff','#fff'), accent_ink=('#6d3df2','#b69cff'), night=('#2a1366','#1d0f47'),
          marca=('#6d3df2','#8b5cf6'), marca_sobre=('#fff','#fff'), marca_suave=('#eee8fe','#2a1d50'), marca_ink=('#3b2d62','#eee8fe'), btn_top=('#8358f5','#8f68f7'), btn_bottom=('#5a2ee0','#6d3df2'), btn_ink=('#fff','#fff'),
          wall=(('#efe7ff','#2a1d50'),('#c9b6ff','#1b1236'),('#8b5cf6','#0b0716'))),
   v={'--peso-titulo':'700','--tracking-titulo':'-0.04em','--logo-familia':'var(--font-sans)','--logo-peso':'800','--logo-b-estilo':'normal','--logo-b-peso':'800','--em-color':'var(--accent-ink)',
      '--borde':'1px solid var(--hair)','--sombra-tarjeta':'0 30px 80px -30px rgba(109,61,242,.35)','--radio-tarjeta':'14px','--btn-borde':'0','--btn-sombra':'0 10px 30px -10px rgba(109,61,242,.6)','--btn-sombra-hover':'0 14px 36px -10px rgba(109,61,242,.7)',
      '--banda-fondo':'linear-gradient(120deg, #3b1a8f, #6d3df2 55%, #a21caf)','--cifra-color':'#e9dcff','--closer-fondo':'linear-gradient(120deg, #3b1a8f, #6d3df2 60%, #a21caf)','--closer-sombra':'0 30px 80px -30px rgba(109,61,242,.6)','--destacado':'#c084fc',
      '--fondo-pagina':'radial-gradient(60% 50% at 50% 0%, light-dark(#efe7ff, #24154d), transparent)','--fondo-tamano':'100% 1100px','--fondo-repetir':'no-repeat','--fondo-tarjeta':'light-dark(#fff, #161028)'}),
 '09-apten': dict(molde='SaaS limpio: azul marino, verde de acento, sombras suaves y una app.', sans='inter', titulo='inter', em='instrument',
   c=dict(paper=('#ffffff','#0b101c'), paper2=('#f6f8fd','#121a2b'), ink=('#0f1a2e','#e7ecf6'), ink2=('#4a566e','#9aa6bd'), accent=('#2fa57a','#2fa57a'), on_accent=('#062a1c','#062a1c'), accent_ink=('#1d7a57','#5fd3a7'), night=('#14264a','#0d1a33'),
          marca=('#2fa57a','#2fa57a'), marca_sobre=('#fff','#fff'), marca_suave=('#e6f6ef','#123326'), marca_ink=('#0f3d2c','#d4f3e6'), btn_top=('#1f3563','#f2f5fb'), btn_bottom=('#14264a','#d7deea'), btn_ink=('#fff','#14264a'),
          wall=(('#f6f8fd','#1a2440'),('#dfe5f0','#111a30'),('#a9b7d6','#070b14'))),
   v={'--peso-titulo':'650','--tracking-titulo':'-0.035em','--logo-familia':'var(--font-sans)','--logo-peso':'800','--logo-b-estilo':'normal','--logo-b-peso':'800',
      '--borde':'1px solid var(--hair)','--sombra-tarjeta':'0 2px 6px rgba(20,38,74,.06), 0 24px 48px -24px rgba(40,60,140,.25)','--radio-tarjeta':'16px','--radio-btn':'8px','--btn-borde':'0','--btn-sombra':'0 8px 20px -8px rgba(20,38,74,.5)','--btn-sombra-hover':'0 12px 26px -8px rgba(20,38,74,.55)',
      '--cifra-color':'#7fe0bb','--closer-sombra':'0 60px 80px -30px rgba(40,60,140,.45)','--destacado':'#b9ecd8','--fondo-tarjeta':'light-dark(#fff, #10182a)'}),
 '11-revnu': dict(molde='Mascota verde y letra manuscrita: redondo, alegre, sin dolor.', sans='nunito', titulo='nunito', em='caveat',
   c=dict(paper=('#f8f4ec','#10170f'), paper2=('#efe8d8','#182117'), ink=('#18241b','#e9efe4'), ink2=('#4d5a4f','#a5b2a3'), accent=('#8be0a0','#8be0a0'), on_accent=('#0e2414','#0e2414'), accent_ink=('#2f7a3f','#8be0a0'), night=('#18241b','#0a0f09'),
          marca=('#3f8f4e','#6ccf85'), marca_sobre=('#fff','#0e2414'), marca_suave=('#dff3e3','#1d3320'), marca_ink=('#133d1d','#dff3e3'), btn_top=('#3f8f4e','#9be8ae'), btn_bottom=('#2f7a3f','#6ccf85'), btn_ink=('#fff','#0e2414'),
          wall=(('#cfeccf','#1d2b1c'),('#8be0a0','#132012'),('#3f8f4e','#080d07'))),
   v={'--peso-titulo':'900','--tracking-titulo':'-0.035em','--em-peso':'700','--em-estilo':'normal','--em-color':'light-dark(#c94a12, #ff8a55)','--logo-familia':'var(--font-sans)','--logo-peso':'900','--logo-b-estilo':'normal','--logo-b-peso':'900','--glifo-color':'#ff6a2b',
      '--borde':'2px solid var(--ink)','--sombra-tarjeta':'0 12px 30px rgba(0,0,0,.12)','--radio-tarjeta':'16px','--btn-borde':'0','--btn-sombra':'0 2px 8px rgba(0,0,0,.12)','--btn-sombra-hover':'0 8px 20px rgba(0,0,0,.18)',
      '--cifra-color':'#8be0a0','--closer-fondo':'#2f7a3f','--closer-sombra':'none','--destacado':'#fde68a','--fondo-tarjeta':'light-dark(#fffdf7, #141c13)'},
   extra='em { font-size: 1.25em; }'),
 '18-rankai': dict(molde='Lavanda suave: violeta discreto, todo centrado, píldoras.', sans='inter', titulo='inter', em='instrument',
   c=dict(paper=('#ffffff','#0e0c18'), paper2=('#f7f6fb','#171425'), ink=('#15131f','#ecebf4'), ink2=('#6b6880','#a8a5bd'), accent=('#5b3fd6','#5b3fd6'), on_accent=('#fff','#fff'), accent_ink=('#5b3fd6','#a996ff'), night=('#3b25a0','#1d1450'),
          marca=('#5b3fd6','#7a60f0'), marca_sobre=('#fff','#fff'), marca_suave=('#eceaf3','#221c40'), marca_ink=('#2a1a7a','#e4defd'), btn_top=('#6c50e6','#7a60f0'), btn_bottom=('#4a30c4','#5b3fd6'), btn_ink=('#fff','#fff'),
          wall=(('#f7f6fb','#221c40'),('#d9d0ff','#16122b'),('#8b78e8','#08070f'))),
   v={'--peso-titulo':'700','--tracking-titulo':'-0.035em','--logo-familia':'var(--font-sans)','--logo-peso':'800','--logo-b-estilo':'normal','--logo-b-peso':'800','--em-color':'var(--accent-ink)',
      '--borde':'1px solid var(--hair)','--sombra-tarjeta':'0 4px 18px #5b3fd614, 0 14px 40px #5b3fd61c','--radio-tarjeta':'22px','--btn-borde':'0','--btn-sombra':'0 8px 24px -8px #5b3fd6aa','--btn-sombra-hover':'0 12px 30px -8px #5b3fd6cc',
      '--cifra-color':'#cfc4ff','--closer-sombra':'0 24px 60px -24px #5b3fd6aa','--destacado':'#d9d0ff','--fondo-pagina':'linear-gradient(180deg, light-dark(#f2f0fb, #171330), transparent)','--fondo-tamano':'100% 800px','--fondo-repetir':'no-repeat','--fondo-tarjeta':'light-dark(#fff, #141122)'}),
 '20-1stcollab': dict(molde='Cielo azul: degradado celeste arriba, tarjetas muy redondas y suaves.', sans='nunito-sans', titulo='nunito-sans', em='instrument',
   c=dict(paper=('#ffffff','#0a1424'), paper2=('#f4f8fd','#101d33'), ink=('#0d1b2e','#e6eef9'), ink2=('#4a5f7c','#9fb2cc'), accent=('#2f6fcc','#2a63bd'), on_accent=('#fff','#fff'), accent_ink=('#1d4f9a','#8fc1f7'), night=('#1d4f9a','#0f2a55'),
          marca=('#3b82e0','#3b82e0'), marca_sobre=('#fff','#fff'), marca_suave=('#e3eefc','#13284a'), marca_ink=('#1d4f9a','#dce9fb'), btn_top=('#4b8fe8','#4b8fe8'), btn_bottom=('#2f6fcc','#2f6fcc'), btn_ink=('#fff','#fff'),
          wall=(('#bcdafb','#183a6b'),('#8fc1f7','#0f2850'),('#3b82e0','#071328'))),
   v={'--peso-titulo':'800','--tracking-titulo':'-0.03em','--logo-familia':'var(--font-sans)','--logo-peso':'900','--logo-b-estilo':'normal','--logo-b-peso':'900','--em-color':'var(--accent-ink)',
      '--borde':'1px solid var(--hair)','--sombra-tarjeta':'0 6px 30px #3b7bd630','--radio-tarjeta':'24px','--btn-borde':'0','--btn-sombra':'0 10px 30px -10px #3b7bd6aa','--btn-sombra-hover':'0 14px 36px -10px #3b7bd6cc',
      '--banda-fondo':'linear-gradient(180deg, #2f6fcc, #1d4f9a)','--cifra-color':'#bcdafb','--closer-fondo':'linear-gradient(135deg, #3b82e0, #1d4f9a)','--closer-sombra':'0 20px 60px #3b7bd62a','--destacado':'#bcdafb',
      '--fondo-pagina':'linear-gradient(180deg, light-dark(#cfe4fb, #13305e) 0, light-dark(#e3effd, #0e2240) 420px, light-dark(#f7fafe, #0a1424) 760px, transparent 900px)','--fondo-tamano':'100% 900px','--fondo-repetir':'no-repeat','--fondo-tarjeta':'light-dark(#fff, #0f1c31)'}),
 '21-beluga': dict(molde='Papel punteado y juguetón: azul marino, amarillo subrayador, sombras duras.', sans='nunito', titulo='nunito', em='nunito',
   c=dict(paper=('#fbf8f0','#0f1233'), paper2=('#f2ecdc','#171b45'), ink=('#1a2266','#eef0ff'), ink2=('#3a4290','#aab0e0'), accent=('#ffd23f','#ffd23f'), on_accent=('#1a2266','#1a2266'), accent_ink=('#1f3be0','#ffd23f'), night=('#1f3be0','#1f3be0'),
          marca=('#1f3be0','#ffd23f'), marca_sobre=('#fff','#1a2266'), marca_suave=('#fff3c4','#262b5c'), marca_ink=('#1a2266','#fff3c4'), btn_top=('#2f4cf0','#ffdb5c'), btn_bottom=('#1f3be0','#ffd23f'), btn_ink=('#fff','#1a2266'),
          wall=(('#ffd23f','#2b3170'),('#ffb4a2','#1a1f55'),('#1f3be0','#0a0c26'))),
   v={'--peso-titulo':'900','--tracking-titulo':'-0.03em','--em-estilo':'normal','--em-peso':'900','--logo-familia':'var(--font-sans)','--logo-peso':'900','--logo-b-estilo':'normal','--logo-b-peso':'900','--numero-color':'light-dark(#d93a20, #ff8a70)',
      '--borde':'2px solid var(--ink)','--sombra-tarjeta':'4px 4px 0 var(--ink)','--radio-tarjeta':'14px','--btn-borde':'2px solid var(--ink)','--btn-sombra':'3px 3px 0 var(--ink)','--btn-sombra-hover':'5px 5px 0 var(--ink)',
      '--cifra-color':'#ffd23f','--closer-fondo':'#1f3be0','--closer-sombra':'8px 8px 0 #ffd23f','--destacado':'#ffd23f',
      '--fondo-pagina':'radial-gradient(light-dark(#e2dccb, #262b5c) 1px, transparent 1.4px)','--fondo-tamano':'7px 7px','--fondo-tarjeta':'light-dark(#fff, #151a45)'},
   extra='.h1 em, .h2 em, .frase em, .leyenda em { font-size: 1em; background: linear-gradient(transparent 58%, var(--accent) 58%, var(--accent) 92%, transparent 92%); color: var(--ink); } .banda .h2 em, .closer em { color: inherit; background: none; }'),
 '22-stormy-ai': dict(molde='Gris técnico: monocromo, etiquetas en mono, nada sobra.', sans='inter', titulo='inter', em='jetbrains',
   c=dict(paper=('#efefee','#111111'), paper2=('#e4e4e2','#1a1a1a'), ink=('#151515','#ededed'), ink2=('#555555','#a0a0a0'), accent=('#d4d4d0','#3a3a3a'), on_accent=('#151515','#ededed'), accent_ink=('#151515','#ededed'), night=('#151515','#000000'),
          marca=('#151515','#ededed'), marca_sobre=('#fff','#111'), marca_suave=('#e4e4e2','#242424'), marca_ink=('#151515','#ededed'), btn_top=('#2b2b2b','#f5f5f4'), btn_bottom=('#111111','#dcdcda'), btn_ink=('#fff','#111'),
          wall=(('#f5f5f4','#2a2a2a'),('#dcdcda','#1a1a1a'),('#a8a8a4','#0a0a0a'))),
   v={'--peso-titulo':'700','--tracking-titulo':'-0.045em','--em-estilo':'normal','--em-peso':'400','--logo-familia':'var(--font-sans)','--logo-peso':'800','--logo-b-estilo':'normal','--logo-b-peso':'800',
      '--borde':'1px solid var(--hair)','--sombra-tarjeta':'0 2px 0 #0000000d, 0 12px 30px #0000000a','--radio-tarjeta':'14px','--btn-borde':'0','--btn-sombra':'0 16px 50px -20px #0005','--btn-sombra-hover':'0 18px 50px -16px #0006',
      '--cifra-color':'#ffffff','--closer-sombra':'none','--destacado':'light-dark(#d4d4d0, #3a3a3a)','--fondo-tarjeta':'light-dark(#fff, #181818)'},
   extra='.h1 em, .h2 em, .frase em, .leyenda em, .closer em { font-size: 0.86em; letter-spacing: -0.04em; }'),
 '23-uplane': dict(molde='Azul eléctrico a rojo: degradado intenso, esquinas casi rectas.', sans='inter', titulo='inter', em='instrument',
   c=dict(paper=('#ffffff','#070a22'), paper2=('#f2f3fa','#0f1335'), ink=('#0b0f2a','#e9ebfb'), ink2=('#555a78','#a5a9c8'), accent=('#ef3d3d','#ff5a5a'), on_accent=('#0b0f2a','#0b0f2a'), accent_ink=('#1b2dd8','#8f9bff'), night=('#1b2dd8','#1b2dd8'),
          marca=('#1b2dd8','#3a4bff'), marca_sobre=('#fff','#fff'), marca_suave=('#e3e6fd','#151a4a'), marca_ink=('#0b0f2a','#e3e6fd'), btn_top=('#3a4bff','#3a4bff'), btn_bottom=('#1b2dd8','#1b2dd8'), btn_ink=('#fff','#fff'),
          wall=(('#3a4bff','#1b2dd8'),('#1b2dd8','#10197a'),('#ef3d3d','#5a1220'))),
   v={'--peso-titulo':'700','--tracking-titulo':'-0.04em','--logo-familia':'var(--font-sans)','--logo-peso':'800','--logo-b-estilo':'normal','--logo-b-peso':'800',
      '--borde':'1px solid var(--hair)','--sombra-tarjeta':'none','--radio-tarjeta':'6px','--radio-btn':'6px','--btn-borde':'0','--btn-sombra':'none','--btn-sombra-hover':'0 8px 20px -8px #1b2dd8',
      '--banda-fondo':'linear-gradient(180deg, #2438f0, #1b2dd8 55%, #b8233a)','--cifra-color':'#f6c6b8','--closer-fondo':'linear-gradient(100deg, #1b2dd8, #b8233a)','--closer-sombra':'none','--destacado':'#f6c6b8','--fondo-tarjeta':'light-dark(#fff, #0c1030)'}),
 '24-zaymo': dict(molde='Lima y negro: fondo hueso, un verde lima que grita, nada más.', sans='inter', titulo='inter', em='instrument',
   c=dict(paper=('#fbfaf7','#111110'), paper2=('#f1efe8','#1b1b19'), ink=('#161616','#efeee9'), ink2=('#555555','#a3a29c'), accent=('#e7f66a','#e7f66a'), on_accent=('#161616','#161616'), accent_ink=('#161616','#e7f66a'), night=('#1c1c1c','#000000'),
          marca=('#1c1c1c','#e7f66a'), marca_sobre=('#fff','#161616'), marca_suave=('#f4f9cc','#2a2a20'), marca_ink=('#161616','#f4f9cc'), btn_top=('#2a2a2a','#eef98a'), btn_bottom=('#161616','#e7f66a'), btn_ink=('#fff','#161616'),
          wall=(('#fbfaf7','#2a2a20'),('#e7f66a','#1b1b16'),('#c9c38f','#0a0a08'))),
   v={'--peso-titulo':'650','--tracking-titulo':'-0.045em','--logo-familia':'var(--font-sans)','--logo-peso':'800','--logo-b-estilo':'normal','--logo-b-peso':'800',
      '--borde':'1px solid var(--hair)','--sombra-tarjeta':'0 4px 18px rgba(0,0,0,.08)','--radio-tarjeta':'22px','--radio-btn':'6px','--btn-borde':'0','--btn-sombra':'none','--btn-sombra-hover':'0 0 0 3px #e7f66a',
      '--cifra-color':'#e7f66a','--closer-sombra':'0 30px 60px -30px rgba(120,100,40,.4)','--destacado':'#e7f66a','--fondo-tarjeta':'light-dark(#fff, #191917)'},
   extra='.h1 em, .h2 em { background: var(--accent); color: #161616; padding: 0 .12em; border-radius: 6px; } .banda .h2 em, .closer em { background: none; color: var(--accent); }'),
 '25-trynearby': dict(molde='Durazno cálido: degradado melocotón, naranja con brillo, serif itálica.', sans='nunito-sans', titulo='nunito-sans', em='fraunces',
   c=dict(paper=('#fff6ee','#1a0f08'), paper2=('#ffe9d8','#25170d'), ink=('#2a1a10','#f6e8dc'), ink2=('#6b4a38','#c4a590'), accent=('#e8641c','#ef7a33'), on_accent=('#2a1a10','#2a1a10'), accent_ink=('#a8420a','#ff9a5c'), night=('#2a1a10','#120a05'),
          marca=('#e8641c','#ef7a33'), marca_sobre=('#2a1a10','#2a1a10'), marca_suave=('#ffe2cb','#3a2210'), marca_ink=('#5a2a0c','#ffe2cb'), btn_top=('#f08a4a','#f08a4a'), btn_bottom=('#e8641c','#e8641c'), btn_ink=('#2a1a10','#2a1a10'),
          wall=(('#ffe2cb','#3a2210'),('#ffb98a','#2a170a'),('#e8641c','#120a05'))),
   v={'--peso-titulo':'800','--tracking-titulo':'-0.03em','--em-color':'var(--accent-ink)','--logo-familia':'var(--font-sans)','--logo-peso':'900','--logo-b-estilo':'normal','--logo-b-peso':'900','--glifo-color':'#e8641c',
      '--borde':'1px solid var(--hair)','--sombra-tarjeta':'0 2px 8px rgba(0,0,0,.06), 0 20px 40px -24px rgba(232,100,28,.4)','--radio-tarjeta':'18px','--btn-borde':'0','--btn-sombra':'0 6px 16px rgba(232,100,28,.35)','--btn-sombra-hover':'0 10px 24px rgba(232,100,28,.45)',
      '--cifra-color':'#ff9a5c','--closer-fondo':'linear-gradient(135deg, #f08a4a, #e8641c)','--closer-ink':'#2a1a10','--closer-sombra':'0 20px 50px -20px rgba(232,100,28,.6)','--destacado':'#ffd0ad',
      '--fondo-pagina':'linear-gradient(180deg, light-dark(#fff4ea, #24140a) 0, light-dark(#ffe2cb, #2c1709) 520px, light-dark(#fff6ee, #1a0f08) 1000px)','--fondo-tamano':'100% 1000px','--fondo-repetir':'no-repeat','--fondo-tarjeta':'light-dark(#fff, #22150c)'}),
 '31-convey': dict(molde='Pastel en diagonal: menta a crema, verde azulado y un amarillo suave.', sans='nunito-sans', titulo='nunito-sans', em='fraunces',
   c=dict(paper=('#fbf9ef','#0c1414'), paper2=('#f1eedd','#132020'), ink=('#10141f','#e8efee'), ink2=('#4a5566','#a2b1b0'), accent=('#f6e27a','#f6e27a'), on_accent=('#10141f','#10141f'), accent_ink=('#2a6663','#a8e3d4'), night=('#2f6f6c','#1e4a48'),
          marca=('#2f6f6c','#4a8f8c'), marca_sobre=('#fff','#fff'), marca_suave=('#dff0f2','#173030'), marca_ink=('#1e3d3c','#dff0f2'), btn_top=('#1c2433','#f8ea96'), btn_bottom=('#10141f','#f0d95a'), btn_ink=('#fff','#10141f'),
          wall=(('#dff0f2','#1a3333'),('#a8e3d4','#112424'),('#4a8f8c','#071010'))),
   v={'--peso-titulo':'700','--tracking-titulo':'-0.03em','--logo-familia':'var(--font-sans)','--logo-peso':'800','--logo-b-estilo':'normal','--logo-b-peso':'800',
      '--borde':'1px solid var(--hair)','--sombra-tarjeta':'0 8px 30px rgba(20,30,60,.08)','--radio-tarjeta':'18px','--btn-borde':'0','--btn-sombra':'0 8px 24px -10px rgba(20,30,60,.4)','--btn-sombra-hover':'0 12px 30px -10px rgba(20,30,60,.5)',
      '--cifra-color':'#f6e27a','--closer-fondo':'linear-gradient(135deg, #2f6f6c, #3f7f7c)','--closer-sombra':'0 20px 50px rgba(20,30,60,.18)','--destacado':'#a8e3d4',
      '--fondo-pagina':'linear-gradient(160deg, light-dark(#dff0f2, #102222) 0%, light-dark(#f4f1dc, #141a14) 30%, light-dark(#fbf9ef, #0c1414) 60%)','--fondo-tamano':'100% 1400px','--fondo-repetir':'no-repeat','--fondo-tarjeta':'light-dark(#fff, #111c1c)'}),
 '32-salient': dict(molde='Beige editorial: monocromo, titulares ligeros y subrayados, sin sombras.', sans='nunito-sans', titulo='nunito-sans', em='newsreader',
   c=dict(paper=('#f6f3ec','#121210'), paper2=('#ece8dd','#1c1b18'), ink=('#141414','#eeebe3'), ink2=('#555555','#a6a29a'), accent=('#d9d5c9','#3a3833'), on_accent=('#141414','#eeebe3'), accent_ink=('#141414','#eeebe3'), night=('#141414','#000000'),
          marca=('#141414','#eeebe3'), marca_sobre=('#fff','#141414'), marca_suave=('#ece8dd','#26241f'), marca_ink=('#141414','#eeebe3'), btn_top=('#2a2a2a','#f6f3ec'), btn_bottom=('#141414','#d9d5c9'), btn_ink=('#fff','#141414'),
          wall=(('#ece8dd','#2a2925'),('#d3cebf','#1c1b18'),('#9b968a','#0b0b0a'))),
   v={'--peso-titulo':'500','--tracking-titulo':'-0.035em','--logo-familia':'var(--font-sans)','--logo-peso':'700','--logo-b-estilo':'normal','--logo-b-peso':'700',
      '--borde':'1px solid var(--hair)','--sombra-tarjeta':'none','--radio-tarjeta':'22px','--btn-borde':'1px solid var(--ink)','--btn-sombra':'none','--btn-sombra-hover':'none',
      '--cifra-color':'#f6f3ec','--closer-sombra':'none','--destacado':'light-dark(#d9d5c9, #3a3833)','--numero-color':'var(--ink)','--fondo-tarjeta':'light-dark(#fbf9f4, #181816)'},
   extra='.h1 em, .h2 em { text-decoration: underline; text-decoration-thickness: .06em; text-underline-offset: .14em; }'),
 '36-clay': dict(molde='Arcilla y campo: crema, verde bosque, amarillo y tarjetas pastel.', sans='nunito-sans', titulo='nunito-sans', em='fraunces',
   c=dict(paper=('#f4efe3','#0c1510'), paper2=('#e9e2d0','#13201a'), ink=('#0d1a14','#e8efe9'), ink2=('#4a5a50','#a4b3aa'), accent=('#f2f06b','#f2f06b'), on_accent=('#0d1a14','#0d1a14'), accent_ink=('#0f4d2e','#c6e0a2'), night=('#0f4d2e','#0a3320'),
          marca=('#0f4d2e','#c6e0a2'), marca_sobre=('#fff','#0d1a14'), marca_suave=('#e7f1dd','#1a2e22'), marca_ink=('#0f4d2e','#e7f1dd'), btn_top=('#176b41','#f4f27e'), btn_bottom=('#0f4d2e','#e6e35a'), btn_ink=('#fff','#0d1a14'),
          wall=(('#c6e0a2','#1f3a26'),('#3f8a50','#13261a'),('#0f4d2e','#06100a'))),
   v={'--peso-titulo':'700','--tracking-titulo':'-0.035em','--logo-familia':'var(--font-sans)','--logo-peso':'800','--logo-b-estilo':'normal','--logo-b-peso':'800',
      '--borde':'1px solid var(--hair)','--sombra-tarjeta':'none','--radio-tarjeta':'24px','--btn-borde':'0','--btn-sombra':'none','--btn-sombra-hover':'0 8px 20px -8px #0f4d2e88',
      '--cifra-color':'#f2f06b','--closer-sombra':'none','--destacado':'#f2f06b','--fondo-tarjeta':'light-dark(#e7f1dd, #13241a)'},
   extra='.modulos .modulo:nth-child(4n+2) { --fondo-tarjeta: light-dark(#fde2d0, #2a1d14); } .modulos .modulo:nth-child(4n+3) { --fondo-tarjeta: light-dark(#dde8f6, #141e2a); } .modulos .modulo:nth-child(4n) { --fondo-tarjeta: light-dark(#f6f3c4, #26261a); }'),
}

# Composición del héroe en el molde: titular a la izquierda (lateral) o centrado.
LATERAL = {'00-fuse', '01-throxy', '09-apten', '11-revnu', '22-stormy-ai', '23-uplane', '24-zaymo', '32-salient', '36-clay'}

for tid, t in TEMAS.items():
    d = os.path.join(R, tid); os.makedirs(d, exist_ok=True)
    usadas = []
    for k in (t['sans'], t['titulo'], t['em'], t.get('mono', 'jetbrains')):
        if k not in usadas: usadas.append(k)
    c = t['c']
    L = ['/* Tema ' + tid + ' — ' + t['molde'] + ' (generado por src/temas/generar.py: edítalo ahí) */']
    L += [FUENTES[k][0] for k in usadas]
    L.append(':root {')
    L.append(f"  --font-sans: {FUENTES[t['sans']][1]}; --font-titulo: {FUENTES[t['titulo']][1]}; --em-familia: {FUENTES[t['em']][1]}; --font-serif: {FUENTES[t['em']][1]}; --font-mono: {FUENTES[t.get('mono','jetbrains')][1]};")
    mapa = dict(paper='--paper', paper2='--paper-2', ink='--ink', ink2='--ink-2', accent='--accent', on_accent='--on-accent', accent_ink='--accent-ink', night='--night',
                marca='--marca', marca_sobre='--marca-sobre', marca_suave='--marca-suave', marca_ink='--marca-ink', btn_top='--btn-top', btn_bottom='--btn-bottom', btn_ink='--btn-ink')
    for k, var in mapa.items(): L.append(f"  {var}: {LD(c[k])};")
    L.append(f"  --hair: light-dark(color-mix(in srgb, {c['ink'][0]} 14%, transparent), color-mix(in srgb, {c['ink'][1]} 15%, transparent));")
    L.append(f"  --sombra-dura: 6px 6px 0 var(--ink);")
    for i, w in enumerate(c['wall'], 1): L.append(f"  --demo-wall-{i}: {LD(w)};")
    for k, val in t['v'].items(): L.append(f"  {k}: {val};")
    L.append('}')
    if t.get('extra'): L.append(t['extra'])
    open(os.path.join(d, 'tema.css'), 'w').write('\n'.join(L) + '\n')
    js = {'id': tid, 'molde': t['molde'], 'heroe': 'lateral' if tid in LATERAL else 'centrado', 'colores': {'claro': c['paper'][0], 'oscuro': c['paper'][1]}}
    open(os.path.join(d, 'tema.js'), 'w').write(
      "// Generado por src/temas/generar.py\nexport const tema = " + json.dumps(js, ensure_ascii=False, indent=2) +
      ";\nexport const marca = { etiqueta: 'AI Academy', texto: 'AI○Academy' };\n")
print('temas:', len(TEMAS))
