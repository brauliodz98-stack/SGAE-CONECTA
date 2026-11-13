(() => {
  const PAS_IMAGES = {
    proteger: './src/assets/images/pas_proteger_1794608577172.jpg',
    alertar: './src/assets/images/pas_alertar_1794608577844.jpg',
    socorrer: './src/assets/images/pas_socorrer_1794608578981.jpg',
  };

  const pmaLesson = `<div class="learning-hero pma-hero"><span class="learning-kicker">OBSERVAR · PREVENIR · CUIDAR</span><h3>Plan de Manejo Ambiental</h3><p>Aprende a relacionar cada labor con el aspecto, el impacto y el control ambiental.</p></div>
    <section class="learning-block"><h4>¿Qué es el PMA?</h4><p>El Plan de Manejo Ambiental organiza las medidas para prevenir, reducir, controlar y hacer seguimiento a los efectos ambientales relacionados con un servicio. La matriz oficial que descargarás reúne actividades, aspectos e impactos, objetivos, metas, controles operacionales, frecuencias y responsables.</p></section>
    <div class="learning-concepts environmental-concepts">
      <section><span class="concept-icon">↔</span><h4>Aspecto ambiental</h4><p>Elemento de una actividad que interactúa con el ambiente: uso de agua, intervención del suelo, consumo de insumos o generación de residuos.</p><small>Pregunta: ¿qué usamos, generamos o modificamos?</small></section>
      <section><span class="concept-icon">◎</span><h4>Impacto ambiental</h4><p>Cambio que puede producirse en el agua, suelo, aire, flora o fauna como consecuencia de ese aspecto. Puede ser adverso o beneficioso.</p><small>Pregunta: ¿qué podría ocurrirle al entorno?</small></section>
    </div>
    <section class="learning-block"><h4>Imágenes de nuestras actividades</h4><p>Observa cómo estas labores se conectan con la prevención y la recuperación ambiental.</p>
      <div class="learning-photo-grid">
        <figure><img src="./assets/photos/pma-area-verde.jpg" alt="Área verde habilitada con plantones, césped y sistema de riego"><figcaption><b>Habilitación y mantenimiento</b><span>El riego y el cuidado del suelo requieren controles para evitar fugas, exceso de agua y erosión.</span></figcaption></figure>
        <figure><img src="./assets/photos/operacion-3.jpeg" alt="Trabajador realiza aplicación fitosanitaria en campo con equipo de protección"><figcaption><b>Aplicación fitosanitaria</b><span>El manejo del producto debe prevenir derrames, deriva y contaminación de suelo o agua.</span></figcaption></figure>
        <figure class="learning-before-after"><div><img src="./assets/photos/pma-revegetacion-antes.jpg" alt="Área disturbada antes de la revegetación"><span>ANTES</span></div><div><img src="./assets/photos/pma-revegetacion-despues.jpg" alt="Área revegetada como resultado de la rehabilitación"><span>DESPUÉS</span></div><figcaption><b>Rehabilitación y cierre de minas</b><span>El seguimiento permite verificar cobertura vegetal, prendimiento y necesidad de reposición.</span></figcaption></figure>
      </div>
    </section>
    <section class="learning-block"><h4>Aspecto, impacto y controles para nuestras labores</h4><p>Los impactos indicados son posibilidades que se deben prevenir. Aplica los controles establecidos en la matriz oficial y en los procedimientos vigentes del proyecto.</p>
      <div class="learning-control-grid">
        <article><span class="control-number">01</span><h5>Riego y áreas verdes</h5><p><b>Aspecto:</b> consumo de agua; posibles fugas o escurrimientos.</p><p><b>Impacto posible:</b> uso innecesario del recurso, encharcamiento o erosión.</p><div class="control-action"><b>Controles preventivos</b><ul><li>Inspecciona mangueras, válvulas, uniones y líneas HDPE antes de regar.</li><li>Aplica el caudal y tiempo programados; evita que el agua salga del área.</li><li>Cierra las válvulas al terminar y reporta fugas o consumos anormales.</li></ul></div></article>
        <article><span class="control-number">02</span><h5>Suelo, siembra y revegetación</h5><p><b>Aspecto:</b> preparación, remoción y almacenamiento de suelo; instalación de especies.</p><p><b>Impacto posible:</b> compactación, pérdida de suelo o erosión; la revegetación puede favorecer la recuperación del componente.</p><div class="control-action"><b>Controles preventivos</b><ul><li>Delimita la intervención y conserva el suelo superficial según el plan.</li><li>Descompacta y usa enmiendas, semillas y plantones autorizados para el proyecto.</li><li>Aplica riego y abonamiento programados; monitorea prendimiento y repón según corresponda.</li></ul></div></article>
        <article><span class="control-number">03</span><h5>Productos fitosanitarios</h5><p><b>Aspecto:</b> uso y almacenamiento de productos para el control fitosanitario.</p><p><b>Impacto posible:</b> contaminación del suelo o agua por derrame, mala disposición o deriva de aplicación.</p><div class="control-action"><b>Controles preventivos</b><ul><li>Verifica producto, etiqueta, dosis y FDS antes de preparar la aplicación.</li><li>Evita aplicar con viento que disperse el producto o cerca de cuerpos de agua sin control definido.</li><li>Ten medios de contención previstos y gestiona envases y sobrantes según el procedimiento.</li></ul></div></article>
        <article><span class="control-number">04</span><h5>Residuos de campo</h5><p><b>Aspecto:</b> restos vegetales, envases y residuos generados durante el servicio.</p><p><b>Impacto posible:</b> contaminación o afectación de suelo y agua por mezcla, quema o disposición inadecuada.</p><div class="control-action"><b>Controles preventivos</b><ul><li>Separa residuos en el punto de generación y usa recipientes identificados.</li><li>Composta restos orgánicos solo cuando el plan del área lo permita.</li><li>No abandones, entierres ni quemes residuos; entrega cada tipo al flujo definido.</li></ul></div></article>
      </div>
    </section>
    <section class="learning-block"><h4>¿Cómo leer la matriz del PMA?</h4><div class="learning-steps"><p><b>1 · Actividad:</b> ubica el proceso y la labor que realizarás.</p><p><b>2 · Aspecto e impacto:</b> entiende la interacción con el ambiente y el cambio que se busca prevenir o gestionar.</p><p><b>3 · Objetivo y meta:</b> revisa el resultado ambiental esperado.</p><p><b>4 · Control operacional:</b> identifica las medidas, frecuencia y responsable. Coordina su aplicación con el PETS y las instrucciones del proyecto.</p></div><p class="learning-note strong">Antes, durante y al cerrar: revisa tu área, evita salir de los límites de intervención y comunica derrames, daños o controles que no funcionaron.</p></section>`;

  const baseSecurityTools = [
    {
      id: 'tool-iperc-base',
      group: 'iperc',
      groupLabel: 'IPERC Base',
      badge: 'IPERC LÍNEA BASE',
      format: 'PDF',
      title: 'IPERC: Línea Base 2026',
      file: './assets/procedures/IPERC%20BASE%202026.pdf',
      downloadName: 'IPERC BASE 2026.pdf',
      purpose: 'Muestra todos los peligros identificados por puesto y actividad en SGAE, qué tan alto es cada riesgo y qué controles obligatorios debes aplicar antes de trabajar.',
      highlights: [
        { k: 'Antes de iniciar', v: 'Ubica tu tarea en la matriz y confirma los peligros de terreno, herramientas, equipos y clima.' },
        { k: 'Controles obligatorios', v: 'Aplica jerarquía de controles: orden del área, señalización, procedimientos vigentes y EPP específico.' },
        { k: 'En campo cada día', v: 'Complementa la Línea Base con el IPERC Continuo antes de empezar y si cambian las condiciones.' }
      ],
      goldenRule: 'Si aparece un peligro nuevo que no está controlado en el área, detén la tarea de forma segura y comunícalo al supervisor.',
      question: '¿Qué documento realiza el equipo cada día en campo para verificar condiciones reales del momento?',
      answers: ['El IPERC Continuo, que complementa al IPERC Línea Base.', 'Ninguno, la Línea Base se llena una sola vez al año.'],
      correct: 0,
      search: 'iperc linea base matriz peligro riesgo control continuo herramientas seguridad sgae 2026'
    },
    {
      id: 'tool-pets-areas-verdes',
      group: 'procedimientos',
      groupLabel: 'Procedimientos y PETS',
      badge: 'PETS · RV01',
      format: 'DOCX',
      title: 'PETS: Habilitación y mantenimiento de áreas verdes (RV01)',
      file: './assets/procedures/PETS_Habilitacion_Mantenimiento_Areas_Verdes_RV01.docx',
      downloadName: 'PETS_Habilitacion_Mantenimiento_Areas_Verdes_RV01.docx',
      purpose: 'Explica paso a paso cómo preparar suelos, abonar, sembrar gras/plantas, regar y operar herramientas o motoguadaña sin accidentes.',
      highlights: [
        { k: 'EPP y revisión previa', v: 'Revisa que no haya animales ocultos en tu EPP, verifica cinta de color trimestral en herramientas y llena el check list de equipos.' },
        { k: 'Delimitación y permisos', v: 'Delimita el área con conos y cintas, envía el IPERC Continuo al supervisor y opera equipos solo si estás entrenado y autorizado.' },
        { k: 'Trabajo seguro y químicos', v: 'Lee la hoja MSDS antes de usar abonos o pesticidas, usa bandeja de contingencia para combustible y evita polvo al fertilizar.' }
      ],
      goldenRule: 'Nunca uses motoguadaña, fumigadora ni productos químicos sin licencia/capacitación vigente, delimitación del área y EPP completo.',
      question: '¿Qué debes hacer antes de iniciar la habilitación o poda de áreas verdes según este PETS?',
      answers: ['Inspeccionar EPP/herramientas, delimitar con conos/cinta y enviar el IPERC Continuo al supervisor.', 'Empezar de frente para aprovechar la mañana y delimitar después.'],
      correct: 0,
      search: 'pets procedimiento escrito trabajo seguro habilitacion mantenimiento areas verdes rv01 poda motoguadaña riego abono'
    },
    {
      id: 'tool-pets-frutales',
      group: 'procedimientos',
      groupLabel: 'Procedimientos y PETS',
      badge: 'PETS',
      format: 'PDF',
      title: 'PETS: Mantenimiento y siembra de especies frutales y forestales',
      file: './assets/procedures/PETS_Mantenimiento_Siembra_Especies_Frutales_Forestales.pdf',
      downloadName: 'PETS_Mantenimiento_Siembra_Especies_Frutales_Forestales.pdf',
      purpose: 'Guía paso a paso para excavar hoyos, preparar sustrato, plantar especies frutales o forestales y realizar su mantenimiento con seguridad.',
      highlights: [
        { k: 'Terreno y excavación', v: 'Verifica pendiente, estabilidad del suelo y presencia de piedras o zanjas antes de excavar hoyos con picota, barreta o palana.' },
        { k: 'Postura y herramientas', v: 'Mantén distancia segura entre compañeros al usar herramientas manuales y aplica buena postura al levantar plantones o sacos.' },
        { k: 'Protección y clima', v: 'Usa casco, lentes, guantes de cuero/nitrilo, botas con punta de acero, bloqueador solar e hidratación continua.' }
      ],
      goldenRule: 'Respeta siempre la distancia segura de trabajo entre compañeros cuando se manipulan picos, palanas o herramientas de corte.',
      question: '¿Qué cuidado clave aplica al trabajar en cuadrilla con picotas, palanas o machetes durante la siembra?',
      answers: ['Mantener distancia segura entre trabajadores, usar herramientas con cinta vigente y EPP completo.', 'Trabajar muy juntos para avanzar más rápido la línea de hoyos.'],
      correct: 0,
      search: 'pets procedimiento escrito trabajo seguro mantenimiento siembra especies frutales forestales plantones hoyos herramientas'
    }
  ];

  const FOLDER_META = {
    estandares: {
      group: 'estandares',
      groupLabel: 'Estándares',
      badge: 'ESTÁNDAR',
      emptyTitle: 'Sin documentos cargados aún en Estándares',
      emptyHint: 'Los estándares en PDF agregados a la carpeta de Estándares se mostrarán aquí automáticamente con su resumen clave antes de la descarga.'
    },
    procedimientos: {
      group: 'procedimientos',
      groupLabel: 'Procedimientos y PETS',
      badge: 'PROCEDIMIENTO',
      emptyTitle: 'Sin procedimientos adicionales registrados',
      emptyHint: 'Los procedimientos en PDF agregados a la carpeta de Procedimientos aparecerán aquí automáticamente con su resumen clave antes de la descarga.'
    },
    reglamentos: {
      group: 'reglamentos',
      groupLabel: 'Reglamentos',
      badge: 'REGLAMENTO',
      emptyTitle: 'Sin documentos cargados aún en Reglamentos',
      emptyHint: 'Los reglamentos en PDF agregados a la carpeta de Reglamentos se mostrarán aquí automáticamente con su resumen clave antes de la descarga.'
    }
  };

  let manifestCache = null;
  async function loadManifest() {
    if (manifestCache) return manifestCache;
    try {
      const res = await fetch('./assets/docs-manifest.json', { cache: 'no-cache' });
      if (!res.ok) throw new Error('manifest unavailable');
      manifestCache = await res.json();
    } catch {
      manifestCache = { estandares: [], procedimientos: [], reglamentos: [], emergencias: [] };
    }
    return manifestCache;
  }

  function buildManifestTool(item, folderKey, index) {
    const meta = FOLDER_META[folderKey];
    const highlights = Array.isArray(item.highlights) && item.highlights.length
      ? item.highlights
      : [
          { k: 'Alcance', v: item.scope || 'Aplica al personal operativo y de supervisión asignado al servicio.' },
          { k: 'Control clave', v: item.control || 'Verifica las condiciones del área, señalización y EPP antes de ejecutar la labor.' },
          { k: 'Cumplimiento', v: item.compliance || 'Reporta desviaciones o dudas al supervisor antes de continuar.' }
        ];
    return {
      id: `tool-${folderKey}-${index}`,
      group: meta.group,
      groupLabel: meta.groupLabel,
      badge: item.badge || meta.badge,
      format: item.format || 'PDF',
      title: item.title,
      file: item.file,
      downloadName: item.downloadName || item.title.replace(/[^\w\-. ]+/g, '') + '.pdf',
      purpose: item.purpose || 'Documento oficial de gestión de seguridad y salud ocupacional para consulta y aplicación en campo.',
      highlights,
      goldenRule: item.goldenRule || 'Lee el resumen completo y confirma con tu supervisor la aplicación en tu frente de trabajo.',
      question: item.question || '¿Qué debes hacer si encuentras una condición fuera de estándar indicada en este documento?',
      answers: item.answers || ['Detener o asegurar el área y comunicar de inmediato al supervisor.', 'Continuar sin avisar para no retrasar el turno.'],
      correct: typeof item.correct === 'number' ? item.correct : 0,
      search: `${meta.groupLabel} ${item.title} ${item.purpose || ''} ${item.search || ''}`.toLowerCase()
    };
  }

  function renderToolCard(tool) {
    return `<article class="tool-summary-card" data-tool-group="${tool.group}" data-tool-search="${tool.search}">
      <div class="tool-card-top">
        <span class="tool-badge tool-badge-${tool.group}">${tool.badge}</span>
        <span class="tool-format-pill">${tool.format}</span>
      </div>
      <h3>${tool.title}</h3>
      <p class="tool-purpose"><b>¿Para qué sirve?</b> ${tool.purpose}</p>
      <div class="tool-highlights">
        ${tool.highlights.map((h, i) => `<div class="tool-highlight-item"><span>0${i + 1}</span><div><b>${h.k}</b><p>${h.v}</p></div></div>`).join('')}
      </div>
      <div class="tool-golden-rule"><strong>Regla de oro:</strong> ${tool.goldenRule}</div>
      <div class="tool-gate" data-tool-gate="${tool.id}">
        <div class="tool-quiz">
          <label for="tquiz-${tool.id}">Comprobación rápida: ${tool.question}</label>
          <select id="tquiz-${tool.id}" class="field">
            <option value="">Elige una respuesta para habilitar la descarga…</option>
            ${tool.answers.map((ans, idx) => `<option value="${idx}">${ans}</option>`).join('')}
          </select>
          <p class="learning-quiz-feedback" aria-live="polite"></p>
        </div>
        <label class="learning-confirm" hidden>
          <input type="checkbox" disabled data-tool-confirm="${tool.id}">
          <span>Comprendí los puntos clave de este documento.</span>
        </label>
        <div class="tool-download-row">
          <a class="btn btn-primary learning-download" data-tool-download="${tool.id}" aria-disabled="true" target="_blank" rel="noopener">
            <span aria-hidden="true">⇩</span> Abrir / Descargar ${tool.format}
          </a>
        </div>
      </div>
    </article>`;
  }

  function wireToolCard(card, tool) {
    const select = card.querySelector(`#tquiz-${tool.id}`);
    const feedback = card.querySelector('.learning-quiz-feedback');
    const confirmLabel = card.querySelector('.learning-confirm');
    const confirm = card.querySelector(`[data-tool-confirm="${tool.id}"]`);
    const download = card.querySelector(`[data-tool-download="${tool.id}"]`);
    if (!select || !confirm || !download) return;

    select.addEventListener('change', () => {
      const ok = select.value !== '' && Number(select.value) === tool.correct;
      feedback.textContent = ok
        ? '¡Correcto! Marca la confirmación para descargar el documento.'
        : select.value === ''
          ? ''
          : 'Revisa los puntos clave del resumen e inténtalo nuevamente.';
      confirm.disabled = !ok;
      confirmLabel.hidden = !ok;
      if (!ok) {
        confirm.checked = false;
        download.removeAttribute('href');
        download.removeAttribute('download');
        download.setAttribute('aria-disabled', 'true');
        download.classList.remove('is-ready');
      }
    });

    confirm.addEventListener('change', () => {
      if (confirm.checked) {
        download.href = tool.file;
        download.download = tool.downloadName;
        download.setAttribute('aria-disabled', 'false');
        download.classList.add('is-ready');
      } else {
        download.removeAttribute('href');
        download.removeAttribute('download');
        download.setAttribute('aria-disabled', 'true');
        download.classList.remove('is-ready');
      }
    });

    download.addEventListener('click', ev => {
      if (download.getAttribute('aria-disabled') === 'true') ev.preventDefault();
    });
  }

  function buildEmergencyMarkup(emergenciesList) {
    const sedes = [...new Set(emergenciesList.map(item => item.sede).filter(Boolean))];
    const pasCards = [
      {
        key: 'proteger',
        letter: 'P',
        title: 'PROTEGER',
        subtitle: 'Primero cuida tu vida y asegura el lugar',
        image: PAS_IMAGES.proteger,
        alt: 'Trabajador colocando conos y cinta de seguridad para proteger la zona antes de acercarse a un incidente',
        bullets: [
          'Detente 3 segundos y observa si hay peligros activos (equipos encendidos, talud inestable, vehículos o cables).',
          'Señaliza el área con conos o cinta de seguridad y apaga motores o fuentes de energía si es seguro hacerlo.',
          'Nunca te expongas sin asegurar la zona: un rescatista accidentado agrava la emergencia.'
        ]
      },
      {
        key: 'alertar',
        letter: 'A',
        title: 'ALERTAR',
        subtitle: 'Comunica rápido usando la cartilla de tu sede',
        image: PAS_IMAGES.alertar,
        alt: 'Trabajador comunicando por radio de emergencia mientras consulta la cartilla de contactos de su sede',
        bullets: [
          'Llama por radio o teléfono al canal oficial indicado en la cartilla de tu unidad minera.',
          'Da 4 datos claros: ① Lugar exacto / frente, ② Qué ocurrió, ③ Cuántas personas hay y su estado, ④ Peligros presentes.',
          'No cuelgues ni cierres la comunicación hasta que el centro de control confirme que recibió el mensaje.'
        ]
      },
      {
        key: 'socorrer',
        letter: 'S',
        title: 'SOCORRER',
        subtitle: 'Acompaña con calma y aplica solo lo que sabes',
        image: PAS_IMAGES.socorrer,
        alt: 'Trabajador capacitado con guantes brindando apoyo y calma a un compañero herido junto a un botiquín',
        bullets: [
          'Acércate cuando la zona sea segura, usa guantes de protección y habla con voz tranquila al herido.',
          'No muevas al lesionado si sospechas golpe en cabeza, cuello o espalda, salvo peligro inmediato (incendio, derrumbe).',
          'Aplica primeros auxilios básicos (control de hemorragias, abrigo, acompañamiento) hasta la llegada de la brigada.'
        ]
      }
    ];

    const pasQuiz = [
      {
        q: '1. Un compañero resbala en una ladera cerca de una motoguadaña encendida. ¿Qué haces primero según el método PAS?',
        opts: [
          'PROTEGER: asegurar el área, detener el equipo si es seguro y evitar otro accidente.',
          'Correr a cargarlo de inmediato sin mirar el terreno ni el equipo.'
        ],
        ok: 0
      },
      {
        q: '2. Al usar la cartilla de emergencia de tu unidad minera para ALERTAR, ¿qué información es indispensable?',
        opts: [
          'Solo decir "vengan rápido" y colgar la llamada.',
          'Ubicación exacta, qué ocurrió, número de afectados y riesgos en la zona, sin colgar primero.'
        ],
        ok: 1
      },
      {
        q: '3. Al SOCORRER a un trabajador con posible golpe en la columna tras una caída, ¿qué corresponde?',
        opts: [
          'No moverlo (salvo peligro inminente), tranquilizarlo y esperar a la brigada médica.',
          'Sentarlo enseguida y darle agua.'
        ],
        ok: 0
      }
    ];

    return `<details class="library-folder management-folder emergency-folder" id="emergencyFolder">
      <summary class="library-folder-summary">
        <span class="library-folder-icon emergency-icon" aria-hidden="true">✚</span>
        <span class="library-folder-title">
          <strong>RESPUESTA ANTE EMERGENCIAS · MÉTODO PAS Y CARTILLAS POR SEDE</strong>
          <small>Aprende Proteger · Alertar · Socorrer con imágenes interactivas y descarga la cartilla de tu unidad minera</small>
        </span>
        <span class="library-folder-toggle" aria-hidden="true">⌄</span>
      </summary>
      <div class="library-folder-items">
        <div class="emergency-panel">
          <div class="learning-hero emergency-hero">
            <span class="learning-kicker">MÉTODO P · A · S EN EMERGENCIAS</span>
            <h3>Proteger · Alertar · Socorrer</h3>
            <p>Actúa siempre en este orden para cuidar tu vida, avisar con precisión a la brigada de tu sede y ayudar de forma segura.</p>
          </div>

          <div class="pas-tabs" role="tablist" aria-label="Pasos del método PAS">
            <button type="button" class="pas-tab is-active" data-pas-filter="all">Ver los 3 pasos (PAS)</button>
            <button type="button" class="pas-tab" data-pas-filter="proteger">1. Proteger (P)</button>
            <button type="button" class="pas-tab" data-pas-filter="alertar">2. Alertar (A)</button>
            <button type="button" class="pas-tab" data-pas-filter="socorrer">3. Socorrer (S)</button>
          </div>

          <div class="pas-grid">
            ${pasCards.map(c => `
              <article class="pas-card" data-pas-step="${c.key}">
                <div class="pas-img-wrap">
                  <img src="${c.image}" alt="${c.alt}" referrerpolicy="no-referrer" loading="lazy">
                  <span class="pas-letter-badge">${c.letter}</span>
                </div>
                <div class="pas-card-body">
                  <span class="pas-step-kicker">PASO ${c.letter === 'P' ? '01' : c.letter === 'A' ? '02' : '03'}</span>
                  <h4>${c.title}</h4>
                  <p class="pas-subtitle">${c.subtitle}</p>
                  <ul>${c.bullets.map(b => `<li>${b}</li>`).join('')}</ul>
                </div>
              </article>
            `).join('')}
          </div>

          <section class="pas-practice">
            <div class="pas-practice-head">
              <div>
                <span class="tag">Práctica interactiva PAS</span>
                <h4>Comprueba cómo actuar antes de abrir tu cartilla</h4>
              </div>
              <span class="pas-score" id="pasScoreBadge">0 / 3 respondidas</span>
            </div>
            <div class="pas-quiz-grid">
              ${pasQuiz.map((item, qIdx) => `
                <article class="pas-quiz-item" data-pas-q="${qIdx}" data-pas-ok="${item.ok}">
                  <p>${item.q}</p>
                  <div class="pas-quiz-options">
                    ${item.opts.map((opt, oIdx) => `<button type="button" class="pas-opt-btn" data-pas-opt="${oIdx}">${opt}</button>`).join('')}
                  </div>
                  <small class="pas-opt-feedback" aria-live="polite"></small>
                </article>
              `).join('')}
            </div>
          </section>

          <section class="emergency-cards-section">
            <div class="emergency-cards-head">
              <div>
                <h4>Cartillas de Comunicación por Sede / Unidad Minera</h4>
                <p>Selecciona tu unidad minera para revisar los anexos clave, ampliar la cartilla oficial o descargarla en tu celular.</p>
              </div>
              ${sedes.length ? `
                <select id="emergencySedeFilter" class="field">
                  <option value="">Todas las sedes (${sedes.length})</option>
                  ${sedes.map(s => `<option value="${s}">${s}</option>`).join('')}
                </select>
              ` : ''}
            </div>

            ${sedes.length ? `
              <div class="pas-tabs emergency-sede-tabs" role="tablist" aria-label="Filtrar por sede minera">
                <button type="button" class="pas-tab is-active" data-sede-pill="">Todas las sedes (${sedes.length})</button>
                ${sedes.map(s => `<button type="button" class="pas-tab" data-sede-pill="${s}">${s}</button>`).join('')}
              </div>
            ` : ''}

            <div class="emergency-alert-script">
              <strong>¡Atención Puesto de Vigilancia, hay una emergencia! — Qué debes informar al llamar:</strong>
              <ul>
                <li>Hora del accidente y ubicación exacta detectada.</li>
                <li>Nombre y área del trabajador que reporta.</li>
                <li>Descripción breve de lo sucedido y gravedad.</li>
                <li>Número de accidentados, lesiones, condición y nombre/empresa.</li>
                <li>Elementos del medio ambiente dañados o con riesgo de daño.</li>
                <li>Requerimiento inmediato (ambulancia, camilla, brigada, contención).</li>
              </ul>
            </div>

            <div class="emergency-cards-list" id="emergencyCardsList">
              ${emergenciesList.length ? emergenciesList.map((item, idx) => `
                <article class="emergency-sede-card" data-sede="${item.sede || 'General'}">
                  <div class="tool-card-top">
                    <span class="tool-badge tool-badge-emergencia">${item.sede || 'Unidad Minera'}</span>
                    <span class="tool-format-pill">${item.format || 'IMAGEN'}</span>
                  </div>
                  <h5>${item.title}</h5>
                  <p>${item.summary || 'Cartilla oficial de comunicación ante emergencias, frecuencias radiales y anexos de respuesta.'}</p>
                  ${item.file ? `
                    <button type="button" class="cartilla-thumb-btn" data-cartilla-zoom="${idx}" aria-label="Ampliar ${item.title}">
                      <img src="${item.file}" alt="${item.title}" referrerpolicy="no-referrer" loading="lazy">
                      <span>🔍 Toca para ampliar cartilla</span>
                    </button>
                  ` : ''}
                  ${(item.vigilancia || item.medico || item.sst || item.ambiental) ? `
                    <div class="cartilla-contacts">
                      ${item.vigilancia ? `<div><b>Puesto de Vigilancia:</b> <span>${item.vigilancia}</span></div>` : ''}
                      ${item.medico ? `<div><b>Centro / Posta Médica:</b> <span>${item.medico}</span></div>` : ''}
                      ${item.sst ? `<div><b>SST / Superintendencia:</b> <span>${item.sst}</span></div>` : ''}
                      ${item.ambiental ? `<div><b>Emergencias Ambientales:</b> <span>${item.ambiental}</span></div>` : ''}
                    </div>
                  ` : ''}
                  <div class="cartilla-actions">
                    ${item.file ? `<button type="button" class="btn btn-outline" data-cartilla-zoom="${idx}">Ver ampliada 🔍</button>` : ''}
                    <a class="btn btn-primary" href="${item.file}" download="${item.downloadName || `Cartilla_${idx + 1}.jpeg`}" target="_blank" rel="noopener">
                      Descargar cartilla ↓
                    </a>
                  </div>
                </article>
              `).join('') : `
                <div class="empty-folder-card">
                  <strong>Carpeta <code>assets/emergencias/</code> lista para tus cartillas por sede</strong>
                  <p>Cuando agregues cartillas en <code>assets/emergencias/</code> y las registres en <code>assets/docs-manifest.json</code>, aparecerán automáticamente divididas por cada sede.</p>
                </div>
              `}
            </div>

            <div class="cartilla-lightbox" id="cartillaLightbox" hidden role="dialog" aria-modal="true" aria-label="Vista ampliada de cartilla de emergencia">
              <div class="cartilla-lightbox-dialog">
                <div class="cartilla-lightbox-bar">
                  <strong id="cartillaLightboxTitle">Cartilla de emergencia</strong>
                  <button type="button" class="btn btn-quiet" id="cartillaLightboxClose" aria-label="Cerrar vista ampliada">Cerrar ✕</button>
                </div>
                <div class="cartilla-lightbox-body">
                  <img id="cartillaLightboxImg" src="" alt="" referrerpolicy="no-referrer">
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </details>`;
  }

  function wireEmergencyFolder(folder, emergenciesList = []) {
    const tabs = folder.querySelectorAll('[data-pas-filter]');
    const cards = folder.querySelectorAll('.pas-card');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const mode = tab.dataset.pasFilter;
        tabs.forEach(t => t.classList.toggle('is-active', t === tab));
        cards.forEach(c => {
          c.style.display = (mode === 'all' || c.dataset.pasStep === mode) ? '' : 'none';
        });
      });
    });

    const answered = new Map();
    const scoreEl = folder.querySelector('#pasScoreBadge');
    folder.querySelectorAll('.pas-quiz-item').forEach(qEl => {
      const qIdx = qEl.dataset.pasQ;
      const correctIdx = Number(qEl.dataset.pasOk);
      const fb = qEl.querySelector('.pas-opt-feedback');
      const btns = qEl.querySelectorAll('.pas-opt-btn');
      btns.forEach(btn => {
        btn.addEventListener('click', () => {
          const chosen = Number(btn.dataset.pasOpt);
          const isOk = chosen === correctIdx;
          btns.forEach(b => b.classList.remove('is-correct', 'is-wrong'));
          btn.classList.add(isOk ? 'is-correct' : 'is-wrong');
          fb.textContent = isOk
            ? '¡Correcto! Aplicaste el método PAS en el orden seguro.'
            : 'Recuerda el orden PAS: 1° Proteger el área, 2° Alertar con datos claros, 3° Socorrer con calma.';
          fb.style.color = isOk ? '#08785c' : '#9c4c27';
          answered.set(qIdx, isOk);
          const okCount = [...answered.values()].filter(Boolean).length;
          if (scoreEl) scoreEl.textContent = `${okCount} / 3 correctas`;
        });
      });
    });

    const sedeFilter = folder.querySelector('#emergencySedeFilter');
    const sedePills = folder.querySelectorAll('[data-sede-pill]');
    const applySedeFilter = val => {
      if (sedeFilter) sedeFilter.value = val;
      sedePills.forEach(p => p.classList.toggle('is-active', p.dataset.sedePill === val));
      folder.querySelectorAll('.emergency-sede-card').forEach(c => {
        c.style.display = (!val || c.dataset.sede === val) ? '' : 'none';
      });
    };
    if (sedeFilter) sedeFilter.addEventListener('change', () => applySedeFilter(sedeFilter.value));
    sedePills.forEach(pill => pill.addEventListener('click', () => applySedeFilter(pill.dataset.sedePill)));

    const lightbox = folder.querySelector('#cartillaLightbox');
    const lbImg = folder.querySelector('#cartillaLightboxImg');
    const lbTitle = folder.querySelector('#cartillaLightboxTitle');
    const lbClose = folder.querySelector('#cartillaLightboxClose');
    const closeLightbox = () => {
      if (lightbox) lightbox.hidden = true;
    };
    folder.querySelectorAll('[data-cartilla-zoom]').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = emergenciesList[Number(btn.dataset.cartillaZoom)];
        if (!item || !lightbox || !lbImg || !lbTitle) return;
        lbTitle.textContent = item.title;
        lbImg.src = item.file;
        lbImg.alt = item.title;
        lightbox.hidden = false;
      });
    });
    lbClose?.addEventListener('click', closeLightbox);
    lightbox?.addEventListener('click', ev => {
      if (ev.target === lightbox) closeLightbox();
    });
  }

  function buildPmaFolder() {
    return `<details class="library-folder management-folder" id="pmaFolder">
      <summary class="library-folder-summary">
        <span class="library-folder-icon" aria-hidden="true">▰</span>
        <span class="library-folder-title"><strong>PMA: PLAN DE MANEJO AMBIENTAL</strong><small>Lectura breve antes de habilitar la descarga · PDF oficial</small></span>
        <span class="library-folder-toggle" aria-hidden="true">⌄</span>
      </summary>
      <div class="library-folder-items">
        <article class="talk-row doc-item library-procedure learning-card" data-category="Gestión ambiental (PMA)" data-doc="pma plan manejo ambiental aspecto impacto agua suelo residuos insumos revegetación riego objetivos metas controles">
          <span class="library-doc-icon" role="img" aria-label="Plan de manejo ambiental">
            <svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M11 5.5h19l8 8V41a2 2 0 0 1-2 2H11a2 2 0 0 1-2-2V7.5a2 2 0 0 1 2-2Z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/><path d="M29.5 6v8h8M15 19h15" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M17 35c1-8 7-12 15-13-1 8-5 14-13 14m2-3 9-8" stroke="#5caa53" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </span>
          <div class="learning-content" style="flex:1">
            <p class="learning-intro">Entiende qué aspectos e impactos ambientales debemos reconocer y cómo leer los controles del plan.</p>
            <div class="learning-scroll" tabindex="0" aria-label="Contenido de lectura para PMA" data-reading="pmaFolder">${pmaLesson}</div>
            <div class="learning-gate" data-gate="pmaFolder">
              <p class="learning-status" role="status">Desplázate hasta el final de la lectura para habilitar la comprobación.</p>
              <div class="learning-quiz" data-quiz="pmaFolder" hidden>
                <label for="quiz-pmaFolder">¿Qué diferencia un aspecto ambiental de un impacto ambiental?</label>
                <select id="quiz-pmaFolder" class="field">
                  <option value="">Elige una respuesta…</option>
                  <option value="0">El aspecto es la interacción de la actividad; el impacto es el cambio que puede causar en el entorno.</option>
                  <option value="1">El aspecto es el daño ocurrido; el impacto es el material que usamos.</option>
                </select>
                <p class="learning-quiz-feedback" aria-live="polite"></p>
              </div>
              <label class="learning-confirm" hidden><input type="checkbox" disabled data-confirm="pmaFolder"> <span>Leí y comprendí esta explicación.</span></label>
              <a class="btn btn-primary learning-download" data-download="pmaFolder" aria-disabled="true"><span aria-hidden="true">⇩</span> Descargar PMA oficial en PDF</a>
            </div>
          </div>
        </article>
      </div>
    </details>`;
  }

  function wirePmaFolder(folder) {
    if (!folder) return;
    const reading = folder.querySelector('[data-reading="pmaFolder"]');
    const status = folder.querySelector('.learning-status');
    const confirm = folder.querySelector('[data-confirm="pmaFolder"]');
    const download = folder.querySelector('[data-download="pmaFolder"]');
    const quiz = folder.querySelector('[data-quiz="pmaFolder"]');
    const quizSelect = quiz.querySelector('select');
    const quizFeedback = quiz.querySelector('.learning-quiz-feedback');
    const confirmLabel = folder.querySelector('.learning-confirm');

    const readToEnd = () => {
      if (reading.scrollTop + reading.clientHeight < reading.scrollHeight - 12) return;
      quiz.hidden = false;
      status.textContent = 'Llegaste al final. Responde la pregunta para habilitar la descarga.';
      reading.removeEventListener('scroll', readToEnd);
    };
    reading.addEventListener('scroll', readToEnd, { passive: true });
    reading.addEventListener('keyup', readToEnd);

    quizSelect.addEventListener('change', () => {
      const isCorrect = Number(quizSelect.value) === 0;
      quizFeedback.textContent = isCorrect ? '¡Correcto! Ya puedes confirmar que leíste el contenido.' : quizSelect.value === '' ? '' : 'Esa respuesta no es correcta. Revisa la explicación y vuelve a intentarlo.';
      confirm.disabled = !isCorrect;
      confirmLabel.hidden = !isCorrect;
      if (!isCorrect) {
        confirm.checked = false;
        download.removeAttribute('href');
        download.removeAttribute('download');
        download.setAttribute('aria-disabled', 'true');
        download.classList.remove('is-ready');
      }
    });

    confirm.addEventListener('change', () => {
      if (confirm.checked) {
        download.href = './assets/procedures/PMA%20SERVICIOS%20DE%20GESTION%20AMBIENTAL%20EIZAGUIRRE%202026.pdf';
        download.download = 'PMA SERVICIOS DE GESTION AMBIENTAL EIZAGUIRRE 2026.pdf';
        download.setAttribute('aria-disabled', 'false');
        download.classList.add('is-ready');
        status.textContent = 'Lectura confirmada. Ya puedes descargar el documento oficial.';
      } else {
        download.removeAttribute('href');
        download.removeAttribute('download');
        download.setAttribute('aria-disabled', 'true');
        download.classList.remove('is-ready');
        status.textContent = 'Confirma la lectura para mostrar la descarga.';
      }
    });

    download.addEventListener('click', event => {
      if (download.getAttribute('aria-disabled') === 'true') event.preventDefault();
    });
  }

  let activeToolTab = 'all';

  function filterSecurityTools(folder, tools) {
    const query = (document.querySelector('#docSearch')?.value || '').trim().toLowerCase();
    const category = document.querySelector('#docFilter')?.value || '';
    const cards = [...folder.querySelectorAll('.tool-summary-card')];
    const emptyBox = folder.querySelector('#securityToolsEmpty');

    const folderVisible = !category || category === 'Herramientas de gestión';
    folder.style.display = folderVisible ? '' : 'none';
    if (!folderVisible) {
      folder.open = false;
      return;
    }

    let visibleCount = 0;
    cards.forEach(card => {
      const groupMatch = activeToolTab === 'all' || card.dataset.toolGroup === activeToolTab;
      const searchMatch = !query || card.dataset.toolSearch.includes(query);
      const show = groupMatch && searchMatch;
      card.style.display = show ? '' : 'none';
      if (show) visibleCount += 1;
    });

    if (emptyBox) {
      const folderNotice = FOLDER_META[activeToolTab];
      const hasAnyInTab = tools.some(t => t.group === activeToolTab);
      if (folderNotice && !hasAnyInTab) {
        emptyBox.hidden = false;
        emptyBox.innerHTML = `<strong>${folderNotice.emptyTitle}</strong><p>${folderNotice.emptyHint}</p>`;
      } else if (visibleCount === 0) {
        emptyBox.hidden = false;
        emptyBox.innerHTML = `<strong>Sin coincidencias</strong><p>No encontramos herramientas de gestión que coincidan con "${query}".</p>`;
      } else {
        emptyBox.hidden = true;
      }
    }
  }

  async function enhanceLibrary() {
    const list = document.querySelector('#documents');
    const filter = document.querySelector('#docFilter');
    if (!list || !filter || document.getElementById('securityToolsFolder')) return;

    const manifest = await loadManifest();
    if (!document.querySelector('#documents') || document.getElementById('securityToolsFolder')) return;

    const extraTools = [
      ...(manifest.estandares || []).map((item, i) => buildManifestTool(item, 'estandares', i)),
      ...(manifest.procedimientos || []).map((item, i) => buildManifestTool(item, 'procedimientos', i)),
      ...(manifest.reglamentos || []).map((item, i) => buildManifestTool(item, 'reglamentos', i)),
    ];
    const allTools = [...baseSecurityTools, ...extraTools];

    const counts = {
      all: allTools.length,
      estandares: allTools.filter(t => t.group === 'estandares').length,
      procedimientos: allTools.filter(t => t.group === 'procedimientos').length,
      reglamentos: allTools.filter(t => t.group === 'reglamentos').length,
      iperc: allTools.filter(t => t.group === 'iperc').length,
    };

    const securityMarkup = `<details class="library-folder management-folder security-tools-folder" id="securityToolsFolder">
      <summary class="library-folder-summary">
        <span class="library-folder-icon" aria-hidden="true">▣</span>
        <span class="library-folder-title">
          <strong>HERRAMIENTAS DE GESTIÓN DE SEGURIDAD</strong>
          <small>Estándares · Procedimientos y PETS · Reglamentos · IPERC Línea Base — Resumen clave antes de descargar</small>
        </span>
        <span class="library-folder-toggle" aria-hidden="true">⌄</span>
      </summary>
      <div class="library-folder-items">
        <div class="security-tools-panel">
          <div class="security-tools-intro">
            <p>Selecciona la carpeta que necesitas revisar. Cada documento muestra un <b>resumen visual y práctico</b> con sus reglas críticas antes de habilitar la descarga en PDF.</p>
          </div>
          <div class="security-tabs" role="tablist" aria-label="Carpetas de herramientas de gestión">
            <button type="button" class="security-tab is-active" data-tool-tab="all">Todos <span>${counts.all}</span></button>
            <button type="button" class="security-tab" data-tool-tab="estandares">Estándares <span>${counts.estandares}</span></button>
            <button type="button" class="security-tab" data-tool-tab="procedimientos">Procedimientos y PETS <span>${counts.procedimientos}</span></button>
            <button type="button" class="security-tab" data-tool-tab="reglamentos">Reglamentos <span>${counts.reglamentos}</span></button>
            <button type="button" class="security-tab" data-tool-tab="iperc">IPERC Base <span>${counts.iperc}</span></button>
          </div>
          <div class="security-tools-grid">
            ${allTools.map(renderToolCard).join('')}
          </div>
          <div class="empty-folder-card" id="securityToolsEmpty" hidden></div>
        </div>
      </div>
    </details>`;

    list.insertAdjacentHTML('beforebegin', securityMarkup);
    list.insertAdjacentHTML('beforebegin', buildPmaFolder());
    list.insertAdjacentHTML('beforebegin', buildEmergencyMarkup(manifest.emergencias || []));

    const securityFolder = document.getElementById('securityToolsFolder');
    const pmaFolder = document.getElementById('pmaFolder');
    const emergencyFolder = document.getElementById('emergencyFolder');

    allTools.forEach(tool => {
      const card = securityFolder.querySelector(`[data-tool-gate="${tool.id}"]`)?.closest('.tool-summary-card');
      if (card) wireToolCard(card, tool);
    });

    securityFolder.querySelectorAll('[data-tool-tab]').forEach(tab => {
      tab.addEventListener('click', () => {
        activeToolTab = tab.dataset.toolTab;
        securityFolder.querySelectorAll('[data-tool-tab]').forEach(t => t.classList.toggle('is-active', t === tab));
        filterSecurityTools(securityFolder, allTools);
      });
    });

    wirePmaFolder(pmaFolder);
    wireEmergencyFolder(emergencyFolder, manifest.emergencias || []);

    const applyAllFilters = () => {
      const query = (document.querySelector('#docSearch')?.value || '').trim().toLowerCase();
      const category = document.querySelector('#docFilter')?.value || '';
      filterSecurityTools(securityFolder, allTools);

      const pmaVisible = (!category || category === 'Gestión ambiental (PMA)') &&
        (!query || pmaFolder.querySelector('.doc-item').dataset.doc.includes(query));
      pmaFolder.style.display = pmaVisible ? '' : 'none';
      if (!pmaVisible) pmaFolder.open = false;

      const emergencySearchText = [
        'respuesta ante emergencias metodo pas proteger alertar socorrer cartillas sede unidad minera',
        ...(manifest.emergencias || []).map(item => `${item.sede || ''} ${item.title || ''} ${item.summary || ''}`)
      ].join(' ').toLowerCase();
      const emergencyVisible = (!category || category === 'Respuesta ante emergencias') &&
        (!query || emergencySearchText.includes(query));
      emergencyFolder.style.display = emergencyVisible ? '' : 'none';
      if (!emergencyVisible) emergencyFolder.open = false;
    };

    applyAllFilters();
    document.querySelector('#docSearch')?.addEventListener('input', applyAllFilters);
    document.querySelector('#docFilter')?.addEventListener('change', applyAllFilters);
  }

  const observer = new MutationObserver(() => {
    if (document.querySelector('#documents') && !document.getElementById('securityToolsFolder')) {
      enhanceLibrary();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
  if (document.querySelector('#documents')) enhanceLibrary();
})();
