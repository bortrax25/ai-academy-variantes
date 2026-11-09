// Todo el texto del sitio de AI Academy. Fuente de los datos: embudo/productos/ai-academy
// (fondo.json, producto.json, materiales/silabo-detalle.json, practica-semana-1.md).
export default {
  lang: 'es',
  meta: {
    titulo: 'AI Academy · la IA en tu trabajo, en dos semanas',
    descripcion:
      'Curso en vivo de 2 semanas para profesionales no técnicos: 6 clases de 1 hora por Google Meet para usar IA en tu trabajo desde cero. S/ 120, pago único.',
    ogAlt: 'El logotipo AI\\Academy en azul cobalto sobre fondo crema, con la promesa del curso.',
  },
  nav: {
    saltar: 'Saltar al contenido',
    enlaces: [
      { texto: 'Temario', href: '/#temario' },
      { texto: 'Precio', href: '/precio' },
    ],
    cta: { texto: 'Inscribirme', href: '/inscribirme' },
    tema: { grupo: 'Tema', sistema: 'Sistema', claro: 'Claro', oscuro: 'Oscuro' },
  },
  heroe: {
    linea1: 'La IA, en tu trabajo.',
    linea2: '<em>En dos semanas, desde cero.</em>',
    cta: { texto: 'Inscribirme', href: '/inscribirme' },
    secundario: { texto: 'Ver temario', href: '/#temario' },
    nota: 'Curso en vivo · <b>S/ 120</b>, pago único · sin requisitos técnicos',
  },
  capitulos: [
    { etiqueta: '01 · Entra', html: 'Clases en vivo por Meet, de una hora. <em>Preguntas en el momento.</em>' },
    { etiqueta: '02 · Pídelo mejor', html: 'Rol, contexto, tarea y formato: la misma pregunta, <em>otra respuesta.</em>' },
    { etiqueta: '03 · Automatiza', html: 'Una tarea que repites cada semana, <em>resuelta sin programar.</em>' },
    { etiqueta: '04 · Entrega', html: 'Terminas con un proyecto real de <em>tu propio trabajo.</em>' },
  ],
  prueba: {
    titulo: 'Corto, en vivo <em>y práctico.</em>',
    cifras: [
      ['2', 'semanas'],
      ['6', 'clases en vivo'],
      ['3', 'clases por semana'],
      ['0', 'conocimientos previos'],
    ],
  },
  temario: {
    ceja: '06 módulos · una clase por módulo',
    titulo: 'Seis clases, <em>cero relleno.</em>',
    resultado:
      'Al terminar sabrás elegir la herramienta adecuada, escribir instrucciones que den resultados consistentes, automatizar una tarea repetitiva y aplicar la IA a un problema real de tu trabajo.',
    silabo: 'Descargar el sílabo (PDF)',
    modulos: [
      ['Fundamentos de la IA', 'Qué es, cómo aprende y por qué cambió todo.', 'Semana 1', ['Qué es un modelo de IA y cómo aprende', 'Qué puede hacer y qué no', 'Primer contacto guiado']],
      ['Prompting avanzado', 'Instrucciones claras, contexto y resultados consistentes.', 'Semana 1', ['Rol, contexto, tarea, formato y criterio', 'Cómo iterar sobre una respuesta', 'Plantillas reutilizables']],
      ['Modelos de lenguaje', 'Cómo elegir, evaluar y combinar modelos según la tarea.', 'Semana 1', ['Diferencias entre los modelos principales', 'Cómo evaluar una respuesta', 'Cuándo combinar modelos']],
      ['Automatización y agentes', 'Flujos que trabajan por ti: herramientas, memoria y decisiones.', 'Semana 2', ['Qué es un agente', 'Herramientas, memoria y decisiones', 'Automatiza una tarea sin programar']],
      ['Datos y análisis con IA', 'De hojas de cálculo desordenadas a conclusiones accionables.', 'Semana 2', ['Del archivo desordenado a la tabla limpia', 'Preguntas a tus datos', 'Cómo verificar las conclusiones']],
      ['Proyecto final', 'Construye y presenta tu propia solución de principio a fin.', 'Semana 2', ['Elige un problema real de tu trabajo', 'Diseña y prueba tu solución', 'Presentación en clase']],
    ],
  },
  porque: {
    ceja: 'Por qué este curso',
    titulo: 'Aprende <em>haciendo.</em>',
    puntos: [
      ['Desde cero', 'Lenguaje claro, ejemplos cotidianos y cero jerga innecesaria.'],
      ['Práctica real', 'En cada clase practicas algo útil que puedes usar en tu trabajo.'],
      ['Siempre al día', 'El contenido se actualiza con cada nuevo modelo y herramienta.'],
    ],
  },
  faq: {
    titulo: 'Preguntas frecuentes',
    items: [
      { p: '¿Necesito saber programar?', r: 'No. El curso es para profesionales no técnicos y empieza desde cero. Solo necesitas una cuenta gratuita de ChatGPT, Claude o Gemini.' },
      { p: '¿Cómo son las clases?', r: 'En vivo por Google Meet: 6 clases de 1 hora, 3 por semana, durante 2 semanas. Puedes preguntar en el momento.' },
      { p: '¿Cuánto cuesta?', r: '<b>S/ 120</b>, pago único. Mira <a href="/precio">precio</a>.' },
      { p: '¿Cómo me inscribo y pago?', r: 'Nos escribes por WhatsApp, pagas con Yape y envías la captura. En cuanto verificamos el pago, quedas inscrito. Los pasos están en <a href="/inscribirme">inscribirme</a>.' },
      { p: '¿Qué recibo al pagar?', r: 'Un correo con la bienvenida, los enlaces de Meet de las clases, el sílabo en PDF y el material de práctica de la primera semana.' },
      { p: '¿Hay tareas?', r: 'Un ejercicio corto por clase, de unos 30 minutos, sobre una tarea real de tu trabajo: lo que practicas hoy te sirve mañana.' },
      { p: '¿Cuándo empieza?', r: 'La primera cohorte abre pronto. Te confirmamos las fechas y los horarios por WhatsApp antes de pagar.' },
    ],
  },
  final: {
    frase: 'Empieza hoy. <em>Domina la IA.</em>',
    cta: { texto: 'Reservar mi lugar', href: '/inscribirme' },
  },
  precios: {
    meta: { titulo: 'Precio · AI Academy', descripcion: 'AI Academy cuesta S/ 120, pago único: 6 clases en vivo por Google Meet, sílabo en PDF y práctica de la primera semana.' },
    titulo: 'Un pago. <em>Seis clases.</em>',
    lead: 'Sin mensualidades ni suscripciones. <b>Pagas una vez</b>.',
    aviso: 'Inscripciones abiertas para la primera cohorte.',
    planes: [
      { nombre: 'AI Academy', sub: 'Curso en vivo de 2 semanas.', precio: 'S/ 120', nota: 'pago único<br>con Yape', cta: { texto: 'Reservar mi lugar', href: '/inscribirme' }, items: ['6 clases en vivo de 1 hora', '3 clases por semana, por Google Meet', 'Sílabo en PDF', 'Práctica de la primera semana', 'Proyecto final con tu propio trabajo'], destacado: true, insignia: 'Pago único' },
    ],
    incluye: { titulo: 'Al pagar recibes', texto: 'Por correo, en cuanto verificamos tu pago.', items: ['La bienvenida al curso', 'Los enlaces de Meet de cada clase', 'El sílabo en PDF', 'El material de práctica de la semana 1'] },
    faq: [
      { p: '¿Cómo se paga?', r: 'Con Yape. Envías la captura por WhatsApp y verificamos el pago con el aviso de nuestra cuenta.' },
      { p: '¿Tiene pagos mensuales?', r: 'No. Son S/ 120 una sola vez por el curso completo.' },
      { p: '¿Necesito comprar alguna herramienta?', r: 'No. En clase usamos cuentas gratuitas de ChatGPT, Claude o Gemini.' },
    ],
    closer: { titulo: 'Seis clases para usar la IA<br><em>en tu trabajo.</em>', cta: { texto: 'Reservar mi lugar', href: '/inscribirme' } },
  },
  empezar: {
    meta: { titulo: 'Inscribirme · AI Academy', descripcion: 'Cómo inscribirte en AI Academy: escribes por WhatsApp, pagas S/ 120 con Yape y recibes por correo los enlaces de Meet y el sílabo.' },
    titulo: 'Inscribirme',
    sub: 'S/ 120 · pago único · 6 clases en vivo por Google Meet',
    aviso: 'Inscripciones abiertas para la primera cohorte.',
    boton: { texto: 'Escribir por WhatsApp', textoCorreo: 'Escribir por correo' },
    mensaje: 'Hola, quiero inscribirme en AI Academy.',
    pasos: [
      'Escríbenos por WhatsApp: te confirmamos fechas y horarios.',
      'Paga S/ 120 con Yape y envía la captura por el mismo chat.',
      'Al verificar el pago te llega un correo con la bienvenida, los enlaces de Meet, el sílabo y la práctica de la semana 1.',
    ],
    extra: { titulo: 'Qué necesitas', texto: 'Una computadora con internet, una cuenta gratuita de ChatGPT, Claude o Gemini, y una tarea de tu trabajo que quieras mejorar.' },
    ayuda: '¿Dudas antes de inscribirte? Revisa las <a href="/#faq">preguntas frecuentes</a>.',
  },
  marca: {
    meta: { titulo: 'Marca · AI Academy', descripcion: 'Logotipo, colores y tipografía de AI Academy para usarlos en una publicación, una presentación o un documento.' },
    etiqueta: 'Kit de marca',
    titulo: 'Logotipo, colores y tipografía',
    lead: 'Todo lo necesario para mostrar AI Academy en una publicación, una presentación o un documento.',
    botonPrompt: 'Copiar prompt para agentes',
    prompt: 'Kit de marca de AI Academy (curso en vivo de IA para profesionales no técnicos). Logotipo: "AI\\Academy", con "AI" en serif muy pesada, una barra invertida y "Academy" en serif itálica. Colores: crema #F5F2E9 (fondo), azul marino #14286F (texto), azul cobalto #1740C8 (bandas y botones), amarillo #F1E35A (solo como relleno o sombra, nunca como texto sobre crema), pervinca #AEBFE6 (fondos secundarios). Tipografía: Fraunces para titulares (pesada, con una palabra en itálica), Inter Tight para el texto y JetBrains Mono para etiquetas. Estilo: bordes de 2 px y sombras duras desplazadas. No redibujes el logotipo.',
    nombre: { titulo: 'Nombre', texto: 'En una frase se escribe <b>AI Academy</b>. El logotipo es <b>AI\\Academy</b>, con la barra invertida.' },
    logos: { titulo: 'Logotipo', claro: 'Claro', oscuro: 'Oscuro' },
    colores: {
      titulo: 'Colores',
      texto: 'Cuatro colores del molde original, ordenados. El amarillo siempre es relleno, nunca texto sobre crema.',
      lista: [
        { nombre: 'Crema', uso: 'Fondo', hex: '#F5F2E9' },
        { nombre: 'Marino', uso: 'Texto', hex: '#14286F' },
        { nombre: 'Cobalto', uso: 'Bandas y botones', hex: '#1740C8' },
        { nombre: 'Amarillo', uso: 'Rellenos y sombras', hex: '#F1E35A' },
        { nombre: 'Pervinca', uso: 'Fondos secundarios', hex: '#AEBFE6' },
      ],
    },
    tipo: { titulo: 'Tipografía', texto: '<b>Fraunces</b> para titulares, con una palabra en itálica; <b>Inter Tight</b> para el texto y <b>JetBrains Mono</b> para etiquetas.' },
    uso: { titulo: 'Uso', reglas: ['La barra invertida es parte del nombre: no la quites.', 'No pongas texto amarillo sobre fondo crema.', 'Deja alrededor un margen igual a la altura de la "A".'] },
    copiado: 'Copiado',
  },
  legal: {
    privacidad: {
      meta: { titulo: 'Privacidad · AI Academy', descripcion: 'Qué datos usa AI Academy para inscribirte y verificar tu pago, y cuánto tiempo los guarda.' },
      titulo: 'Privacidad',
      actualizado: 'Última actualización: 8 de noviembre de 2026',
      secciones: [
        { h: 'Qué datos usamos', p: ['Tu número de WhatsApp, tu nombre y tu correo, para inscribirte y enviarte los enlaces de las clases. La captura de tu pago con Yape, para verificarlo.'] },
        { h: 'Cuánto tiempo', p: ['Las capturas de pago se borran a los 90 días. Tus datos de contacto se usan solo para este curso.'] },
        { h: 'Con quién', p: ['No vendemos ni compartimos tus datos. Las clases se dan por Google Meet, que tiene su propia política de privacidad.'] },
        { h: 'Esta web', p: ['No usa cookies ni analítica. Solo guarda en tu navegador tu preferencia de tema (claro u oscuro).'] },
      ],
    },
    terminos: {
      meta: { titulo: 'Términos · AI Academy', descripcion: 'Condiciones del curso AI Academy: precio, forma de pago, clases en vivo y uso del material.' },
      titulo: 'Términos',
      actualizado: 'Última actualización: 8 de noviembre de 2026',
      secciones: [
        { h: 'El curso', p: ['AI Academy es un curso en vivo de 6 clases de 1 hora por Google Meet, 3 por semana durante 2 semanas. Las fechas se confirman antes del pago.'] },
        { h: 'Pago', p: ['El precio es S/ 120, pago único con Yape. La inscripción queda confirmada cuando verificamos el pago.'] },
        { h: 'Material', p: ['El sílabo y el material de práctica son para tu uso personal. No los compartas ni los revendas.'] },
      ],
    },
  },
  noEncontrado: {
    meta: { titulo: 'No encontrado · AI Academy', descripcion: 'Esta página no existe. Vuelve al inicio de AI Academy, el curso en vivo de IA en dos semanas.' },
    titulo: 'Instrucción <em>no encontrada.</em>',
    texto: 'Esta página no existe o cambió de sitio.',
    boton: 'Volver al inicio',
  },
  pie: {
    columnas: [
      { titulo: 'Curso', enlaces: [{ texto: 'Temario', href: '/#temario' }, { texto: 'Precio', href: '/precio' }, { texto: 'Sílabo (PDF)', href: '/silabo.pdf' }] },
      { titulo: 'Inscripción', enlaces: [{ texto: 'Inscribirme', href: '/inscribirme' }, { texto: 'Preguntas', href: '/#faq' }] },
      { titulo: 'Recursos', enlaces: [{ texto: 'Marca', href: '/marca' }, { texto: 'Privacidad', href: '/privacidad' }, { texto: 'Términos', href: '/terminos' }] },
      { titulo: 'Contacto', enlaces: [{ texto: 'Escríbenos', href: '/inscribirme' }] },
    ],
    estado: 'Inscripciones abiertas · primera cohorte',
    legal: [{ texto: 'Privacidad', href: '/privacidad' }, { texto: 'Términos', href: '/terminos' }],
    idioma: 'Idioma',
  },
  form: { enviando: 'Enviando…', ok: 'Listo.', error: 'No se pudo enviar.', mailtoAsunto: 'Quiero inscribirme en AI Academy' },
  toasts: { copiado: 'Copiado.', hola: 'Instrucción recibida.', guinio: 'Te escucho.' },
  avisoIdioma: { texto: '¿Ver AI Academy en español?', boton: 'Ver en español', cerrar: 'Cerrar' },
  consola: 'Hola. Si estás leyendo esto, ya tienes curiosidad: el curso empieza desde cero.',
};
