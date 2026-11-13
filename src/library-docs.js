(() => {
  const PAS_IMAGES = {
    proteger: './src/assets/images/pas_proteger_1794608577172.jpg',
    alertar: './src/assets/images/pas_alertar_1794608577844.jpg',
    socorrer: './src/assets/images/pas_socorrer_1794608578981.jpg',
  };

  const TOOL_VISUALS = {
    eppOro: './src/assets/images/tool_seguridad_oro_epp_1794612478942.jpg',
    alturaFuego: './src/assets/images/tool_altura_incendios_botiquin_1794612479258.jpg',
    ipercSenal: './src/assets/images/tool_iperc_senalizacion_campo_1794612478690.jpg',
    ambiental: './src/assets/images/tool_ambiental_revegetacion_1794612482804.jpg',
    quimicos: './src/assets/images/agro_pesticidas_seguro_1794612480380.jpg',
  };

  const POSTER_ASSETS = {
    colpa: './public/assets/aistudio/COLPA_4191c0b7.jpeg',
    residuos: './public/assets/aistudio/Codigo_de_colores_70464072.jpeg',
  };

  function pickToolVisual(tool) {
    const text = `${tool.title || ''} ${tool.badge || ''} ${tool.search || ''}`.toLowerCase();
    if (text.includes('altura') || text.includes('incendio') || text.includes('botiquin') || text.includes('botiquín')) {
      return { src: TOOL_VISUALS.alturaFuego, caption: 'Control crítico · Altura, incendios y primeros auxilios' };
    }
    if (text.includes('rima') || text.includes('medio ambiente') || text.includes('areas verdes') || text.includes('áreas verdes') || text.includes('frutales') || text.includes('forestales')) {
      return { src: TOOL_VISUALS.ambiental, caption: 'Operación sostenible · Protección de agua, suelo y flora' };
    }
    if (text.includes('iperc') || text.includes('señal') || text.includes('senal') || text.includes('actos') || text.includes('investigaci')) {
      return { src: TOOL_VISUALS.ipercSenal, caption: 'Prevención en campo · IPERC, señalización y reporte' };
    }
    return { src: TOOL_VISUALS.eppOro, caption: 'Seguridad operativa · Reglas de oro, EPP y disciplina' };
  }

  const pmaLesson = `<div class="learning-hero pma-hero"><span class="learning-kicker">OBSERVAR · PREVENIR · CUIDAR</span><h3>Plan de Manejo Ambiental</h3><p>Aprende a relacionar cada labor con el aspecto, el impacto y el control ambiental.</p></div>
    <section class="learning-block"><h4>¿Qué es el PMA?</h4><p>El Plan de Manejo Ambiental organiza las medidas para prevenir, reducir, controlar y hacer seguimiento a los efectos ambientales relacionados con un servicio. La matriz oficial que descargarás reúne actividades, aspectos e impactos, objetivos, metas, controles operacionales, frecuencias y responsables.</p></section>
    <div class="learning-concepts environmental-concepts">
      <section><span class="concept-icon">↔</span><h4>Aspecto ambiental</h4><p>Elemento de una actividad que interactúa con el ambiente: uso de agua, intervención del suelo, consumo de insumos o generación de residuos.</p><small>Pregunta: ¿qué usamos, generamos o modificamos?</small></section>
      <section><span class="concept-icon">◎</span><h4>Impacto ambiental</h4><p>Cambio que puede producirse en el agua, suelo, aire, flora o fauna como consecuencia de ese aspecto. Puede ser adverso o beneficioso.</p><small>Pregunta: ¿qué podría ocurrirle al entorno?</small></section>
    </div>
    <section class="learning-block"><h4>Imágenes de nuestras actividades</h4><p>Observa cómo estas labores se conectan con la prevención y la recuperación ambiental.</p>
      <div class="learning-photo-grid">
        <figure><img src="./assets/photos/pma-area-verde.jpg" alt="Área verde habilitada con plantones, césped y sistema de riego" referrerpolicy="no-referrer"><figcaption><b>Habilitación y mantenimiento</b><span>El riego y el cuidado del suelo requieren controles para evitar fugas, exceso de agua y erosión.</span></figcaption></figure>
        <figure><img src="./assets/photos/operacion-3.jpeg" alt="Trabajador realiza aplicación fitosanitaria en campo con equipo de protección" referrerpolicy="no-referrer"><figcaption><b>Aplicación fitosanitaria</b><span>El manejo del producto debe prevenir derrames, deriva y contaminación de suelo o agua.</span></figcaption></figure>
        <figure class="learning-before-after"><div><img src="./assets/photos/pma-revegetacion-antes.jpg" alt="Área disturbada antes de la revegetación" referrerpolicy="no-referrer"><span>ANTES</span></div><div><img src="./assets/photos/pma-revegetacion-despues.jpg" alt="Área revegetada como resultado de la rehabilitación" referrerpolicy="no-referrer"><span>DESPUÉS</span></div><figcaption><b>Rehabilitación y cierre de minas</b><span>El seguimiento permite verificar cobertura vegetal, prendimiento y necesidad de reposición.</span></figcaption></figure>
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
      purpose: 'Muestra peligros por puesto/actividad y los controles obligatorios antes de iniciar labores.',
      highlights: [
        { k: 'Antes de iniciar', v: 'Ubica tu tarea y confirma peligros de terreno, equipos y clima.' },
        { k: 'Controles obligatorios', v: 'Aplica orden del área, señalización, PETS y EPP específico.' },
        { k: 'Cada día en campo', v: 'Complementa la Línea Base llenando el IPERC Continuo al empezar.' }
      ],
      goldenRule: 'Si aparece un peligro nuevo sin control, detén la tarea y avisa al supervisor.',
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
      purpose: 'Guía paso a paso para preparar suelos, sembrar, regar y operar motoguadaña sin accidentes.',
      highlights: [
        { k: 'EPP y revisión previa', v: 'Verifica EPP sin fauna oculta, cinta trimestral en herramientas y check list.' },
        { k: 'Delimitación y permisos', v: 'Delimita con conos y cintas; opera equipos solo si estás autorizado.' },
        { k: 'Insumos y químicos', v: 'Lee FDS/MSDS, usa bandeja antiderrame y evita polvo al fertilizar.' }
      ],
      goldenRule: 'Nunca operes motoguadaña ni químicos sin capacitación vigente, delimitación y EPP completo.',
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
      purpose: 'Pasos seguros para excavar hoyos, preparar sustrato y plantar especies frutales o forestales.',
      highlights: [
        { k: 'Terreno estable', v: 'Evalúa pendiente, piedras y zanjas antes de excavar con pico o palana.' },
        { k: 'Distancia segura', v: 'Mantén separación entre compañeros con herramientas y cuida tu postura.' },
        { k: 'EPP y sol', v: 'Usa casco, lentes, guantes, botas punta de acero, bloqueador e hidratación.' }
      ],
      goldenRule: 'Respeta siempre la distancia segura entre compañeros al usar picos, palanas o herramientas de corte.',
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
      emptyHint: 'Los estándares en PDF agregados a la carpeta de Estándares se mostrarán aquí automáticamente.'
    },
    procedimientos: {
      group: 'procedimientos',
      groupLabel: 'Procedimientos y PETS',
      badge: 'PROCEDIMIENTO',
      emptyTitle: 'Sin procedimientos adicionales registrados',
      emptyHint: 'Los procedimientos en PDF agregados a la carpeta de Procedimientos aparecerán aquí automáticamente.'
    },
    reglamentos: {
      group: 'reglamentos',
      groupLabel: 'Reglamentos',
      badge: 'REGLAMENTO',
      emptyTitle: 'Sin documentos cargados aún en Reglamentos',
      emptyHint: 'Los reglamentos en PDF agregados a la carpeta de Reglamentos se mostrarán aquí automáticamente.'
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
      manifestCache = { estandares: [], procedimientos: [], reglamentos: [], emergencias: [], msds: [] };
    }
    return manifestCache;
  }

  function buildManifestTool(item, folderKey, index) {
    const meta = FOLDER_META[folderKey];
    const highlights = Array.isArray(item.highlights) && item.highlights.length
      ? item.highlights
      : [
          { k: 'Alcance', v: item.scope || 'Aplica al personal operativo y de supervisión asignado.' },
          { k: 'Control clave', v: item.control || 'Verifica condiciones del área, señalización y EPP antes de empezar.' },
          { k: 'Cumplimiento', v: item.compliance || 'Reporta desviaciones al supervisor antes de continuar.' }
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
      purpose: item.purpose || 'Documento oficial de gestión SSOMA para consulta y aplicación en campo.',
      highlights,
      goldenRule: item.goldenRule || 'Confirma con tu supervisor la aplicación en tu frente de trabajo.',
      question: item.question || '¿Qué debes hacer si encuentras una condición fuera de estándar?',
      answers: item.answers || ['Detener o asegurar el área y comunicar de inmediato al supervisor.', 'Continuar sin avisar para no retrasar el turno.'],
      correct: typeof item.correct === 'number' ? item.correct : 0,
      search: `${meta.groupLabel} ${item.title} ${item.purpose || ''} ${item.search || ''}`.toLowerCase()
    };
  }

  function renderToolCard(tool) {
    const visual = pickToolVisual(tool);
    return `<article class="tool-summary-card tool-card-${tool.group}" data-tool-group="${tool.group}" data-tool-search="${tool.search}">
      <div class="tool-visual-banner">
        <img src="${visual.src}" alt="${tool.title}" referrerpolicy="no-referrer" loading="lazy">
        <div class="tool-visual-scrim"></div>
        <div class="tool-visual-meta">
          <span class="tool-meta-text">${tool.badge} · ${tool.format}</span>
          <span class="tool-visual-caption">${visual.caption}</span>
        </div>
      </div>
      <div class="tool-card-content">
        <h3>${tool.title}</h3>
        <p class="tool-purpose"><b>Resumen clave:</b> ${tool.purpose}</p>
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
          'Señaliza el área con conos o cinta y apaga motores si es seguro hacerlo.',
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
          'Da 4 datos claros: Lugar exacto, Qué ocurrió, Cuántos heridos hay y Peligros presentes.',
          'No cuelgues ni cierres la comunicación hasta que vigilancia o control confirme recepción.'
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
          'Acércate cuando la zona sea segura, usa guantes y habla con calma al lesionado.',
          'No muevas al herido si sospechas golpe en cabeza, cuello o espalda, salvo peligro inmediato.',
          'Aplica primeros auxilios básicos hasta la llegada de la brigada médica.'
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
                <span class="pas-section-kicker">Práctica interactiva PAS</span>
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
                    <span class="tool-meta-text emergency-meta">${item.sede || 'Unidad Minera'} · ${item.format || 'IMAGEN'}</span>
                  </div>
                  <h5>${item.title}</h5>
                  <p>${item.summary || 'Cartilla oficial de comunicación ante emergencias, frecuencias radiales y anexos de respuesta.'}</p>
                  ${item.file ? `
                    <button type="button" class="cartilla-thumb-btn" data-zoom-src="${item.file}" data-zoom-title="${item.title}" data-zoom-download="${item.downloadName || `Cartilla_${idx + 1}.jpeg`}" aria-label="Ampliar ${item.title}">
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
                    ${item.file ? `<button type="button" class="btn btn-outline" data-zoom-src="${item.file}" data-zoom-title="${item.title}" data-zoom-download="${item.downloadName || `Cartilla_${idx + 1}.jpeg`}">Ver ampliada 🔍</button>` : ''}
                    <a class="btn btn-primary" href="${item.file}" download="${item.downloadName || `Cartilla_${idx + 1}.jpeg`}" target="_blank" rel="noopener">
                      Descargar cartilla ↓
                    </a>
                  </div>
                </article>
              `).join('') : `
                <div class="empty-folder-card">
                  <strong>Sin cartillas registradas</strong>
                  <p>No se encontraron cartillas en la carpeta de emergencias.</p>
                </div>
              `}
            </div>
          </section>
        </div>
      </div>
    </details>`;
  }

  function wireEmergencyFolder(folder) {
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
  }

  function buildColpaFolder() {
    const stages = [
      {
        letter: 'C',
        key: 'clasificar',
        color: '#b87c14',
        title: 'CLASIFICAR',
        teoria: 'Identificar, seleccionar, separar y retirar del lugar de trabajo todos los materiales innecesarios, conservando solo lo útil para la tarea.',
        clase: 'Antes de iniciar en campo o vivero, retira herramientas rotas, envases vacíos o maleza seca que estorben el paso.',
        clave: 'Si no lo necesitas en la jornada, no debe quedar tirado en el frente.'
      },
      {
        letter: 'O',
        key: 'ordenar',
        color: '#9c6412',
        title: 'ORDENAR',
        teoria: 'Asignar un lugar definido, visible e identificado para cada herramienta, equipo o insumo, de modo que sea fácil ubicarlo y devolverlo.',
        clase: 'Agrupa picos, palanas, mangueras y mochilas fumigadoras en zonas delimitadas; cada herramienta vuelve a su soporte al terminar.',
        clave: 'Un lugar para cada cosa y cada cosa en su lugar tras usarla.'
      },
      {
        letter: 'L',
        key: 'limpiar',
        color: '#176b39',
        title: 'LIMPIAR',
        teoria: 'Eliminar desperdicios, polvo, grasa, residuos vegetales y basura de las áreas de trabajo y ambientes comunes, inspeccionando a la vez el estado del área.',
        clase: 'Limpia el frente de revegetación, losa de equipos, botas y herramientas al cerrar la guardia; detectar fugas es más fácil en un área limpia.',
        clave: 'Limpiar también permite detectar derrames, fallas o peligros ocultos.'
      },
      {
        letter: 'P',
        key: 'prevenir',
        color: '#0b756c',
        title: 'PREVENIR',
        teoria: 'Estandarizar controles visuales para evitar errores humanos en máquinas, herramientas y zonas de trabajo mediante demarcación y señalización.',
        clase: 'Usa rótulos claros, código de colores de residuos, cinta trimestral vigente en herramientas y demarcación de peligros con conos o cintas.',
        clave: 'Lo estandarizado se mantiene sin depender de la memoria.'
      },
      {
        letter: 'A',
        key: 'autodisciplina',
        color: '#1f4f82',
        title: 'AUTODISCIPLINA',
        teoria: 'Convertir la Clasificación, Orden, Limpieza y Prevención en un hábito diario, actuando correctamente incluso cuando nadie está vigilando.',
        clase: 'Devuelve las herramientas limpias al cierre del turno, respeta los tachos de colores y corrige de inmediato un desorden observado.',
        clave: 'La autodisciplina sostiene la seguridad como cultura diaria del equipo.'
      }
    ];

    const colpaQuiz = [
      {
        q: '1. Al empezar una jornada de poda encuentras herramientas hechizas y restos viejos en el acceso. ¿Qué etapa del COLPA aplicas primero?',
        opts: [
          'C · Clasificar: separar y retirar lo innecesario o inoperativo del frente.',
          'Dejarlo ahí y solo barrer alrededor al final del mes.'
        ],
        ok: 0
      },
      {
        q: '2. ¿Qué busca la etapa P · PREVENIR dentro de la metodología COLPA?',
        opts: [
          'Demarcar zonas de trabajo, usar señalización y controles visuales para evitar errores humanos.',
          'Esconder los materiales rotos detrás del almacén.'
        ],
        ok: 0
      },
      {
        q: '3. ¿Cómo se demuestra la A · AUTODISCIPLINA en tu cuadrilla?',
        opts: [
          'Solo ordenando cuando viene una inspección.',
          'Devolviendo cada herramienta a su lugar y manteniendo el área limpia como hábito diario.'
        ],
        ok: 1
      }
    ];

    return `<details class="library-folder management-folder colpa-folder" id="colpaFolder">
      <summary class="library-folder-summary">
        <span class="library-folder-icon colpa-icon" aria-hidden="true">C</span>
        <span class="library-folder-title">
          <strong>COLPA · CLASIFICACIÓN, ORDEN, LIMPIEZA, PREVENCIÓN Y AUTODISCIPLINA</strong>
          <small>Teoría por etapas · Aplicación práctica en clase y campo · Afiche oficial ampliable y descargable</small>
        </span>
        <span class="library-folder-toggle" aria-hidden="true">⌄</span>
      </summary>
      <div class="library-folder-items">
        <div class="colpa-panel">
          <div class="learning-hero colpa-hero">
            <span class="learning-kicker">METODOLOGÍA COLPA (5S EN CAMPO)</span>
            <h3>Clasificar · Ordenar · Limpiar · Prevenir · Autodisciplina</h3>
            <p>Aprende la teoría de cada etapa y llévala a tu frente de trabajo para evitar tropiezos, pérdidas de tiempo y accidentes.</p>
          </div>

          <div class="pas-tabs" role="tablist" aria-label="Etapas del método COLPA">
            <button type="button" class="pas-tab is-active" data-colpa-filter="all">Ver las 5 etapas COLPA</button>
            ${stages.map(s => `<button type="button" class="pas-tab" data-colpa-filter="${s.key}">${s.letter} · ${s.title}</button>`).join('')}
          </div>

          <div class="colpa-split">
            <div class="colpa-stages-grid">
              ${stages.map((s, idx) => `
                <article class="colpa-stage-card" data-colpa-step="${s.key}" style="--stage-color:${s.color}">
                  <div class="colpa-stage-head">
                    <span class="colpa-letter-tile">${s.letter}</span>
                    <div>
                      <span class="colpa-stage-index">ETAPA 0${idx + 1}</span>
                      <h4>${s.title}</h4>
                    </div>
                  </div>
                  <div class="colpa-block">
                    <b>Teoría (¿qué significa?)</b>
                    <p>${s.teoria}</p>
                  </div>
                  <div class="colpa-block colpa-block-practice">
                    <b>En clase / campo SGAE</b>
                    <p>${s.clase}</p>
                  </div>
                  <p class="colpa-clave"><strong>Idea clave:</strong> ${s.clave}</p>
                </article>
              `).join('')}
            </div>

            <aside class="poster-spotlight-card">
              <div class="poster-spotlight-head">
                <span class="tool-meta-text">AFICHE OFICIAL · IMAGEN REPRESENTATIVA</span>
                <h4>Practicar COLPA te permite trabajar seguro</h4>
              </div>
              <button type="button" class="poster-zoom-frame" data-zoom-src="${POSTER_ASSETS.colpa}" data-zoom-title="Afiche Oficial COLPA · Clasificar, Ordenar, Limpiar, Prevenir, Autodisciplina" data-zoom-download="Afiche_COLPA_SGAE.jpeg" aria-label="Ampliar afiche COLPA">
                <img src="${POSTER_ASSETS.colpa}" alt="Afiche COLPA: Clasificar, Ordenar, Limpiar, Prevenir y Autodisciplina" referrerpolicy="no-referrer" loading="lazy">
                <span>🔍 Toca para ampliar imagen</span>
              </button>
              <p>Descarga esta lámina para tus charlas de 5 minutos en campo o compártela con tu cuadrilla.</p>
              <div class="cartilla-actions">
                <button type="button" class="btn btn-outline" data-zoom-src="${POSTER_ASSETS.colpa}" data-zoom-title="Afiche Oficial COLPA · Clasificar, Ordenar, Limpiar, Prevenir, Autodisciplina" data-zoom-download="Afiche_COLPA_SGAE.jpeg">Ver ampliada 🔍</button>
                <a class="btn btn-primary" href="${POSTER_ASSETS.colpa}" download="Afiche_COLPA_SGAE.jpeg" target="_blank" rel="noopener">Descargar imagen ↓</a>
              </div>
            </aside>
          </div>

          <section class="pas-practice">
            <div class="pas-practice-head">
              <div>
                <span class="pas-section-kicker">Repaso interactivo de clase COLPA</span>
                <h4>Pon a prueba lo aprendido en las 5 etapas</h4>
              </div>
              <span class="pas-score" id="colpaScoreBadge">0 / 3 respondidas</span>
            </div>
            <div class="pas-quiz-grid">
              ${colpaQuiz.map((item, qIdx) => `
                <article class="pas-quiz-item" data-colpa-q="${qIdx}" data-colpa-ok="${item.ok}">
                  <p>${item.q}</p>
                  <div class="pas-quiz-options">
                    ${item.opts.map((opt, oIdx) => `<button type="button" class="pas-opt-btn" data-colpa-opt="${oIdx}">${opt}</button>`).join('')}
                  </div>
                  <small class="pas-opt-feedback" aria-live="polite"></small>
                </article>
              `).join('')}
            </div>
          </section>
        </div>
      </div>
    </details>`;
  }

  function wireColpaFolder(folder) {
    if (!folder) return;
    const tabs = folder.querySelectorAll('[data-colpa-filter]');
    const cards = folder.querySelectorAll('.colpa-stage-card');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const mode = tab.dataset.colpaFilter;
        tabs.forEach(t => t.classList.toggle('is-active', t === tab));
        cards.forEach(c => {
          c.style.display = (mode === 'all' || c.dataset.colpaStep === mode) ? '' : 'none';
        });
      });
    });

    const answered = new Map();
    const scoreEl = folder.querySelector('#colpaScoreBadge');
    folder.querySelectorAll('[data-colpa-q]').forEach(qEl => {
      const qIdx = qEl.dataset.colpaQ;
      const correctIdx = Number(qEl.dataset.colpaOk);
      const fb = qEl.querySelector('.pas-opt-feedback');
      const btns = qEl.querySelectorAll('[data-colpa-opt]');
      btns.forEach(btn => {
        btn.addEventListener('click', () => {
          const chosen = Number(btn.dataset.colpaOpt);
          const isOk = chosen === correctIdx;
          btns.forEach(b => b.classList.remove('is-correct', 'is-wrong'));
          btn.classList.add(isOk ? 'is-correct' : 'is-wrong');
          fb.textContent = isOk
            ? '¡Excelente! Aplicaste correctamente la etapa del COLPA.'
            : 'Revisa las 5 letras C-O-L-P-A arriba e inténtalo de nuevo.';
          fb.style.color = isOk ? '#08785c' : '#9c4c27';
          answered.set(qIdx, isOk);
          const okCount = [...answered.values()].filter(Boolean).length;
          if (scoreEl) scoreEl.textContent = `${okCount} / 3 correctas`;
        });
      });
    });
  }

  function buildResiduosFolder() {
    const notions = [
      {
        num: '01',
        title: '¿Qué es un Residuo Sólido?',
        color: '#0b756c',
        text: 'Es todo material o resto que ya cumplió su vida útil tras nuestras tareas en campo: restos de poda, botellas, cartón, EPP deteriorado, trapos con aceite o envases químicos.'
      },
      {
        num: '02',
        title: '¿Qué es Segregar?',
        color: '#176b39',
        text: 'Separar cada residuo en el mismo momento y lugar donde se genera, depositándolo en el cilindro del color exacto según la norma NTP 900.058 para no mezclar reaprovechables con peligrosos.'
      },
      {
        num: '03',
        title: '¿Qué es la Disposición Segura?',
        color: '#1f4f82',
        text: 'Trasladar los residuos ya segregados al punto de acopio temporal autorizado. Según el RIMA está prohibido quemar, enterrar o arrojar restos en el suelo o quebradas.'
      }
    ];

    const drums = [
      { colorName: 'PLOMO', label: 'Vidrio', type: 'Reaprovechable', group: 'reaprovechable', hex: '#6f7b85', items: 'Botellas y vasos de vidrio, frascos limpios, lunas de ventana.' },
      { colorName: 'AZUL', label: 'Papel y Cartón', type: 'Reaprovechable', group: 'reaprovechable', hex: '#1d56a5', items: 'Hojas bond, cartón limpio, fólderes y sobres manila, cuadernos.' },
      { colorName: 'BLANCO', label: 'Plástico', type: 'Reaprovechable', group: 'reaprovechable', hex: '#8899a6', items: 'Botellas de agua/gaseosa, plástico duro y botellas de insumos enjuagadas.' },
      { colorName: 'AMARILLO', label: 'Metales', type: 'Reaprovechable', group: 'reaprovechable', hex: '#c89b12', items: 'Cables de acero, alambres, chatarra, brocas, latas limpias.' },
      { colorName: 'MARRÓN', label: 'Orgánicos', type: 'Reaprovechable', group: 'reaprovechable', hex: '#6d4423', items: 'Restos de poda, maleza vegetal, viruta de madera, estiércol.' },
      { colorName: 'NEGRO', label: 'Generales', type: 'No reaprovechable', group: 'no-reaprovechable', hex: '#262b30', items: 'Cinta de embalaje, papel higiénico, envolturas, EPP común en desuso.' },
      { colorName: 'ROJO', label: 'Peligrosos', type: 'No reaprovechable', group: 'no-reaprovechable', hex: '#b82520', items: 'Sprays, aceites, pilas, trapos con hidrocarburo, tierra contaminada, envases químicos no lavados.' }
    ];

    const residuosQuiz = [
      {
        q: '1. Terminas una poda de áreas verdes y tienes ramas cortadas junto con guantes rotos sin químicos. ¿Dónde va cada uno?',
        opts: [
          'Restos de poda al cilindro MARRÓN (orgánicos) y EPP común en desuso al NEGRO (generales).',
          'Todo junto al cilindro AZUL para ahorrar bolsas.'
        ],
        ok: 0
      },
      {
        q: '2. ¿Dónde se depositan trapos con grasa, tierra contaminada por derrame o pilas usadas?',
        opts: [
          'En el cilindro NEGRO de residuos generales.',
          'En el cilindro ROJO de residuos peligrosos.'
        ],
        ok: 1
      },
      {
        q: '3. ¿Qué regla prohíbe estrictamente el RIMA respecto a la disposición de residuos en campo?',
        opts: [
          'Quemar, enterrar o arrojar residuos en el terreno o quebradas.',
          'Separar el plástico limpio en el cilindro blanco.'
        ],
        ok: 0
      }
    ];

    return `<details class="library-folder management-folder residuos-folder" id="residuosFolder">
      <summary class="library-folder-summary">
        <span class="library-folder-icon residuos-icon" aria-hidden="true">♻</span>
        <span class="library-folder-title">
          <strong>SEGREGACIÓN Y DISPOSICIÓN DE RESIDUOS GENERADOS EN CAMPO</strong>
          <small>Nociones clave · Código de Colores oficial NTP 900.058 · Afiche ampliable y práctica rápida</small>
        </span>
        <span class="library-folder-toggle" aria-hidden="true">⌄</span>
      </summary>
      <div class="library-folder-items">
        <div class="residuos-panel">
          <div class="learning-hero residuos-hero">
            <span class="learning-kicker">GESTIÓN AMBIENTAL EN CAMPO · NTP 900.058</span>
            <h3>Segregación y Disposición de Residuos</h3>
            <p>Separar en la fuente protege el suelo, el agua y evita contaminación. Aprende las 3 nociones clave y revisa el código de colores.</p>
          </div>

          <div class="notion-grid">
            ${notions.map(n => `
              <article class="notion-card" style="--notion-accent:${n.color}">
                <span class="notion-num">${n.num}</span>
                <h4>${n.title}</h4>
                <p>${n.text}</p>
              </article>
            `).join('')}
          </div>

          <div class="residuos-split">
            <div class="residuos-drums-area">
              <div class="residuos-drums-head">
                <div>
                  <h4>Código de Colores por Tipo de Residuo</h4>
                  <p>Filtra para ubicar rápido qué va en cada cilindro.</p>
                </div>
                <div class="pas-tabs" role="tablist" aria-label="Filtrar residuos">
                  <button type="button" class="pas-tab is-active" data-drum-filter="all">Todos (7)</button>
                  <button type="button" class="pas-tab" data-drum-filter="reaprovechable">Reaprovechables (5)</button>
                  <button type="button" class="pas-tab" data-drum-filter="no-reaprovechable">No reaprovechables (2)</button>
                </div>
              </div>
              <div class="drums-grid">
                ${drums.map(d => `
                  <article class="drum-card" data-drum-group="${d.group}" style="--drum-color:${d.hex}">
                    <div class="drum-color-bar">
                      <strong>${d.colorName}</strong>
                      <span>${d.type}</span>
                    </div>
                    <div class="drum-card-body">
                      <h5>${d.label}</h5>
                      <p>${d.items}</p>
                    </div>
                  </article>
                `).join('')}
              </div>
            </div>

            <aside class="poster-spotlight-card">
              <div class="poster-spotlight-head">
                <span class="tool-meta-text">IMAGEN REFERENCIAL Y DE APOYO</span>
                <h4>Código de Colores para Segregar Residuos Sólidos</h4>
              </div>
              <button type="button" class="poster-zoom-frame" data-zoom-src="${POSTER_ASSETS.residuos}" data-zoom-title="Código de Colores para Segregar Residuos Sólidos" data-zoom-download="Codigo_de_Colores_Residuos.jpeg" aria-label="Ampliar afiche de código de colores">
                <img src="${POSTER_ASSETS.residuos}" alt="Afiche Código de Colores para segregar residuos sólidos: vidrio, papel, plástico, metal, orgánicos, generales y peligrosos" referrerpolicy="no-referrer" loading="lazy">
                <span>🔍 Toca para ampliar imagen</span>
              </button>
              <p>Úsala como referencia visual en tu punto de acopio antes de depositar cualquier residuo.</p>
              <div class="cartilla-actions">
                <button type="button" class="btn btn-outline" data-zoom-src="${POSTER_ASSETS.residuos}" data-zoom-title="Código de Colores para Segregar Residuos Sólidos" data-zoom-download="Codigo_de_Colores_Residuos.jpeg">Ver ampliada 🔍</button>
                <a class="btn btn-primary" href="${POSTER_ASSETS.residuos}" download="Codigo_de_Colores_Residuos.jpeg" target="_blank" rel="noopener">Descargar afiche ↓</a>
              </div>
            </aside>
          </div>

          <section class="pas-practice">
            <div class="pas-practice-head">
              <div>
                <span class="pas-section-kicker">Reto de campo</span>
                <h4>¿En qué cilindro va cada residuo?</h4>
              </div>
              <span class="pas-score" id="residuosScoreBadge">0 / 3 respondidas</span>
            </div>
            <div class="pas-quiz-grid">
              ${residuosQuiz.map((item, qIdx) => `
                <article class="pas-quiz-item" data-residuos-q="${qIdx}" data-residuos-ok="${item.ok}">
                  <p>${item.q}</p>
                  <div class="pas-quiz-options">
                    ${item.opts.map((opt, oIdx) => `<button type="button" class="pas-opt-btn" data-residuos-opt="${oIdx}">${opt}</button>`).join('')}
                  </div>
                  <small class="pas-opt-feedback" aria-live="polite"></small>
                </article>
              `).join('')}
            </div>
          </section>
        </div>
      </div>
    </details>`;
  }

  function wireResiduosFolder(folder) {
    if (!folder) return;
    const tabs = folder.querySelectorAll('[data-drum-filter]');
    const cards = folder.querySelectorAll('.drum-card');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const mode = tab.dataset.drumFilter;
        tabs.forEach(t => t.classList.toggle('is-active', t === tab));
        cards.forEach(c => {
          c.style.display = (mode === 'all' || c.dataset.drumGroup === mode) ? '' : 'none';
        });
      });
    });

    const answered = new Map();
    const scoreEl = folder.querySelector('#residuosScoreBadge');
    folder.querySelectorAll('[data-residuos-q]').forEach(qEl => {
      const qIdx = qEl.dataset.residuosQ;
      const correctIdx = Number(qEl.dataset.residuosOk);
      const fb = qEl.querySelector('.pas-opt-feedback');
      const btns = qEl.querySelectorAll('[data-residuos-opt]');
      btns.forEach(btn => {
        btn.addEventListener('click', () => {
          const chosen = Number(btn.dataset.residuosOpt);
          const isOk = chosen === correctIdx;
          btns.forEach(b => b.classList.remove('is-correct', 'is-wrong'));
          btn.classList.add(isOk ? 'is-correct' : 'is-wrong');
          fb.textContent = isOk
            ? '¡Correcto! Así evitas mezclar residuos en campo.'
            : 'Verifica el color correspondiente en la lámina NTP 900.058.';
          fb.style.color = isOk ? '#08785c' : '#9c4c27';
          answered.set(qIdx, isOk);
          const okCount = [...answered.values()].filter(Boolean).length;
          if (scoreEl) scoreEl.textContent = `${okCount} / 3 correctas`;
        });
      });
    });
  }

  function buildChemicalsFolder(localMsdsList = []) {
    const safeSteps = [
      { n: '01', title: 'Lee etiqueta y FDS/MSDS', desc: 'Revisa dosis autorizada, plazos y banda toxicológica (Roja, Amarilla, Azul o Verde) antes de abrir el envase.' },
      { n: '02', title: 'Usa EPP químico completo', desc: 'Respirador con cartuchos para vapores orgánicos, lentes cerrados, mandil impermeable, guantes de nitrilo y botas.' },
      { n: '03', title: 'Mezcla segura y a favor del viento', desc: 'Dosifica sobre bandeja antiderrame lejos de quebradas/acequias. Fumiga siempre a favor del viento.' },
      { n: '04', title: 'Triple lavado y cierre limpio', desc: 'Enjuaga 3 veces el envase vacío, perfóralo para evitar reuso y llévalo al acopio autorizado (cilindro rojo/especial).' }
    ];

    const quickExamples = ['Glifosato', 'Cipermetrina', 'Mancozeb', 'Roundup', 'Clorpirifos'];

    return `<details class="library-folder management-folder chemicals-folder" id="chemicalsFolder">
      <summary class="library-folder-summary">
        <span class="library-folder-icon chem-icon" aria-hidden="true">⚗</span>
        <span class="library-folder-title">
          <strong>USO RESPONSABLE DE PRODUCTOS QUÍMICOS · PESTICIDAS Y HOJAS MSDS</strong>
          <small>Guía práctica de fumigación segura + buscador de hojas MSDS por nombre, marca o fotografía</small>
        </span>
        <span class="library-folder-toggle" aria-hidden="true">⌄</span>
      </summary>
      <div class="library-folder-items">
        <div class="chemicals-panel">
          <div class="learning-hero chem-hero">
            <span class="learning-kicker">CONTROL FITOSANITARIO Y FDS / MSDS</span>
            <h3>Uso Correcto de Insumos y Pesticidas</h3>
            <p>Aplica estos 4 pasos en campo y consulta al instante la Hoja de Seguridad (MSDS) oficial antes de dosificar o fumigar.</p>
          </div>

          <div class="chem-guide-split">
            <figure class="chem-illustration-card">
              <img src="${TOOL_VISUALS.quimicos}" alt="Operador con traje impermeable, respirador, gafas y guantes de nitrilo dosificando sobre bandeja antiderrame" referrerpolicy="no-referrer" loading="lazy">
              <figcaption>Usa siempre bandeja de contención, EPP químico completo y mantente lejos de fuentes de agua.</figcaption>
            </figure>
            <div class="chem-steps-grid">
              ${safeSteps.map(s => `
                <article class="chem-step-card">
                  <span>${s.n}</span>
                  <div>
                    <h5>${s.title}</h5>
                    <p>${s.desc}</p>
                  </div>
                </article>
              `).join('')}
            </div>
          </div>

          <section class="msds-search-box">
            <div class="msds-search-head">
              <div>
                <span class="pas-section-kicker">Buscador Inteligente de Hojas de Seguridad</span>
                <h4>Consulta tu hoja MSDS / FDS (Fuentes oficiales Perú y carpeta local)</h4>
                <p>Escribe el nombre del producto, su nombre comercial o sube una fotografía de la etiqueta del envase. Buscamos primero en páginas oficiales peruanas (SENASA / fabricantes Perú) y, si no aparece, en las hojas PDF adjuntas de fumigación.</p>
              </div>
            </div>

            <form id="msdsSearchForm" class="msds-search-form">
              <div class="msds-input-row">
                <input id="msdsQueryInput" class="field" type="text" placeholder="Ej. Glifosato, Roundup, Cipermetrina, Tordon, Mancozeb…">
                <label class="btn btn-outline msds-photo-btn" for="msdsPhotoInput">
                  📷 Foto del producto
                  <input id="msdsPhotoInput" type="file" accept="image/*" capture="environment" hidden>
                </label>
                <button type="submit" class="btn btn-primary" id="msdsSubmitBtn">Buscar hoja MSDS →</button>
              </div>

              <div class="msds-quick-chips">
                <span>Consultas rápidas:</span>
                ${quickExamples.map(ex => `<button type="button" class="msds-chip" data-msds-sample="${ex}">${ex}</button>`).join('')}
              </div>

              <div id="msdsPhotoPreviewWrap" class="msds-photo-preview" hidden>
                <img id="msdsPhotoPreviewImg" src="" alt="Vista previa del producto químico" referrerpolicy="no-referrer">
                <div>
                  <strong id="msdsPhotoName">Imagen cargada</strong>
                  <small>Lista para identificar nombre comercial e ingrediente activo.</small>
                </div>
                <button type="button" class="btn btn-quiet" id="msdsPhotoClear">Quitar ✕</button>
              </div>
            </form>

            <div id="msdsResultsContainer" class="msds-results" aria-live="polite"></div>

            <div class="msds-local-bank">
              <div class="msds-local-bank-head">
                <strong>Carpeta de Hojas MSDS locales de fumigación (${localMsdsList.length})</strong>
                <span>Respaldo directo offline en carpeta <code>MSDS/</code> o <code>assets/msds/</code></span>
              </div>
              ${localMsdsList.length ? `
                <div class="msds-local-grid">
                  ${localMsdsList.map(item => `
                    <article class="msds-local-item">
                      <div>
                        <strong>${item.title}</strong>
                        <small>${item.category || 'Fumigación'} · ${item.format || 'PDF'}</small>
                      </div>
                      <a class="btn btn-outline" href="${item.file}" download="${item.downloadName}" target="_blank" rel="noopener">Descargar PDF ↓</a>
                    </article>
                  `).join('')}
                </div>
              ` : `
                <p class="msds-local-empty">Cuando subas tus archivos PDF a la carpeta <code>MSDS/</code> o <code>assets/msds/</code> del repositorio, aparecerán aquí automáticamente para descarga directa y como respaldo de búsqueda.</p>
              `}
            </div>
          </section>
        </div>
      </div>
    </details>`;
  }

  function resizeImageToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error('No se pudo leer la imagen.'));
      reader.onload = () => {
        const img = new Image();
        img.onerror = () => reject(new Error('Formato de imagen no compatible.'));
        img.onload = () => {
          const maxSide = 1024;
          const scale = Math.min(1, maxSide / Math.max(img.width || 1, img.height || 1));
          const canvas = document.createElement('canvas');
          canvas.width = Math.max(1, Math.round(img.width * scale));
          canvas.height = Math.max(1, Math.round(img.height * scale));
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.84);
          const base64 = dataUrl.split(',')[1] || '';
          resolve({ base64, mimeType: 'image/jpeg', dataUrl });
        };
        img.src = String(reader.result || '');
      };
      reader.readAsDataURL(file);
    });
  }

  function escapeHtml(text) {
    return String(text || '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;');
  }

  function renderMsdsSearchResult(data) {
    const officialLinks = Array.isArray(data.officialLinks) ? data.officialLinks : [];
    const localMatches = Array.isArray(data.localMatches) ? data.localMatches : [];
    const bandColor = /roj/i.test(data.toxicologicalBand) ? '#b82520'
      : /amarill/i.test(data.toxicologicalBand) ? '#b57c0e'
      : /azul/i.test(data.toxicologicalBand) ? '#1d56a5'
      : /verd/i.test(data.toxicologicalBand) ? '#176b39'
      : '#0b756c';

    return `<article class="msds-result-card">
      <div class="msds-result-top">
        <div>
          <span class="tool-meta-text" style="color:${bandColor}">
            ${data.foundOfficialOnline ? 'FUENTE OFICIAL ENCONTRADA' : 'BÚSQUEDA CON RESPALDO LOCAL'}
            ${data.toxicologicalBand ? ` · BANDA: ${escapeHtml(data.toxicologicalBand)}` : ''}
          </span>
          <h5>${escapeHtml(data.productName || 'Producto consultado')}</h5>
          ${data.activeIngredient ? `<p class="msds-active-ing">Ingrediente activo: <b>${escapeHtml(data.activeIngredient)}</b></p>` : ''}
        </div>
      </div>

      ${data.summary ? `<p class="msds-summary-text">${escapeHtml(data.summary)}</p>` : ''}

      <div class="msds-safety-mini-grid">
        ${data.ppeRequired ? `<div><b>EPP obligatorio</b><p>${escapeHtml(data.ppeRequired)}</p></div>` : ''}
        ${data.firstAid ? `<div><b>Primeros auxilios</b><p>${escapeHtml(data.firstAid)}</p></div>` : ''}
        ${data.spillControl ? `<div><b>Derrames y triple lavado</b><p>${escapeHtml(data.spillControl)}</p></div>` : ''}
      </div>

      <div class="msds-links-section">
        <h6>1. Enlaces oficiales en Perú (SENASA / Fabricantes autorizados)</h6>
        ${officialLinks.length ? `
          <div class="msds-official-list">
            ${officialLinks.map(link => `
              <a class="msds-official-link" href="${escapeHtml(link.uri)}" target="_blank" rel="noopener noreferrer">
                <span>${link.isPdf ? 'PDF' : 'WEB'}</span>
                <strong>${escapeHtml(link.title || link.uri)}</strong>
                <b>Abrir ↗</b>
              </a>
            `).join('')}
          </div>
        ` : `
          <p class="msds-fallback-note">No se confirmó un enlace directo oficial en este intento.${data.aiNotice ? ` (${escapeHtml(data.aiNotice)})` : ''} Activando respaldo en tu carpeta local de MSDS.</p>
        `}
      </div>

      <div class="msds-links-section">
        <h6>2. Búsqueda en tu carpeta local de hojas MSDS de fumigación</h6>
        ${localMatches.length ? `
          <div class="msds-local-grid">
            ${localMatches.map(item => `
              <article class="msds-local-item is-highlighted">
                <div>
                  <strong>${escapeHtml(item.title)}</strong>
                  <small>${escapeHtml(item.category || 'Carpeta MSDS')} · Listo para descargar</small>
                </div>
                <a class="btn btn-primary" href="${escapeHtml(item.file)}" download="${escapeHtml(item.downloadName)}" target="_blank" rel="noopener">Descargar PDF ↓</a>
              </article>
            `).join('')}
          </div>
        ` : `
          <p class="msds-fallback-note">No hay un PDF coincidente cargado todavía en la carpeta <code>MSDS/</code> o <code>assets/msds/</code> para "${escapeHtml(data.productName || data.query)}".</p>
        `}
      </div>
    </article>`;
  }

  function wireChemicalsFolder(folder, localMsdsList = []) {
    if (!folder) return;
    const form = folder.querySelector('#msdsSearchForm');
    const queryInput = folder.querySelector('#msdsQueryInput');
    const photoInput = folder.querySelector('#msdsPhotoInput');
    const previewWrap = folder.querySelector('#msdsPhotoPreviewWrap');
    const previewImg = folder.querySelector('#msdsPhotoPreviewImg');
    const previewName = folder.querySelector('#msdsPhotoName');
    const clearPhotoBtn = folder.querySelector('#msdsPhotoClear');
    const submitBtn = folder.querySelector('#msdsSubmitBtn');
    const resultsBox = folder.querySelector('#msdsResultsContainer');

    let pendingPhoto = null;

    folder.querySelectorAll('[data-msds-sample]').forEach(chip => {
      chip.addEventListener('click', () => {
        if (queryInput) queryInput.value = chip.dataset.msdsSample;
        form?.requestSubmit();
      });
    });

    photoInput?.addEventListener('change', async () => {
      const file = photoInput.files?.[0];
      if (!file) return;
      try {
        const resized = await resizeImageToBase64(file);
        pendingPhoto = { base64: resized.base64, mimeType: resized.mimeType };
        if (previewImg) previewImg.src = resized.dataUrl;
        if (previewName) previewName.textContent = file.name;
        if (previewWrap) previewWrap.hidden = false;
      } catch (err) {
        if (resultsBox) {
          resultsBox.innerHTML = `<div class="empty-folder-card"><strong>No se pudo procesar la foto</strong><p>${escapeHtml(err.message)}</p></div>`;
        }
      }
    });

    clearPhotoBtn?.addEventListener('click', () => {
      pendingPhoto = null;
      if (photoInput) photoInput.value = '';
      if (previewWrap) previewWrap.hidden = true;
    });

    form?.addEventListener('submit', async ev => {
      ev.preventDefault();
      const q = (queryInput?.value || '').trim();
      if (!q && !pendingPhoto) {
        if (resultsBox) {
          resultsBox.innerHTML = '<div class="empty-folder-card"><strong>Ingresa un nombre o sube una foto</strong><p>Escribe el nombre del pesticida o adjunta la fotografía del envase para buscar su hoja MSDS.</p></div>';
        }
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Buscando en Perú y carpeta MSDS…';
      }
      if (resultsBox) {
        resultsBox.innerHTML = '<div class="msds-loading">Consultando fuentes oficiales peruanas (SENASA / fabricantes) y revisando tu carpeta local de MSDS…</div>';
      }

      try {
        const res = await fetch('/api/msds-search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: q,
            imageBase64: pendingPhoto?.base64 || '',
            imageMimeType: pendingPhoto?.mimeType || 'image/jpeg'
          })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || 'Error en la consulta');
        if (resultsBox) resultsBox.innerHTML = renderMsdsSearchResult(data);
      } catch (err) {
        const normQ = q.toLowerCase();
        const fallbackMatches = localMsdsList.filter(item =>
          `${item.title} ${item.product || ''} ${item.downloadName}`.toLowerCase().includes(normQ)
        );
        if (resultsBox) {
          resultsBox.innerHTML = renderMsdsSearchResult({
            query: q,
            productName: q || 'Consulta local',
            foundOfficialOnline: false,
            localMatches: fallbackMatches,
            officialLinks: [],
            aiNotice: err.message
          });
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Buscar hoja MSDS →';
        }
      }
    });
  }

  function buildPreopFolder() {
    const items = [
      'Casco con barbiquejo, lentes de seguridad, guantes y botas punta de acero en buen estado.',
      'Herramientas manuales con mango firme y cinta de inspección trimestral vigente (Anexo 4 RISSO: Ene-Mar Verde · Abr-Jun Amarillo · Jul-Set Rojo · Oct-Dic Blanco).',
      'Equipos de poder (motoguadaña, fumigadora o motosierra) con guardas completas, sin fugas y operador autorizado.',
      'Área delimitada con conos/cintas de seguridad, IPERC Continuo firmado y kit antiderrame / botiquín cercano.'
    ];
    return `<details class="library-folder management-folder preop-folder" id="preopFolder">
      <summary class="library-folder-summary">
        <span class="library-folder-icon" aria-hidden="true">✓</span>
        <span class="library-folder-title">
          <strong>LISTA DE VERIFICACIÓN PREOPERACIONAL DE CAMPO</strong>
          <small>Check list rápido interactivo de EPP, cinta trimestral de herramientas y equipos antes de empezar</small>
        </span>
        <span class="library-folder-toggle" aria-hidden="true">⌄</span>
      </summary>
      <div class="library-folder-items">
        <div class="preop-panel">
          <div class="preop-tape-strip">
            <b>Código de cinta trimestral (RISSO Anexo N° 4):</b>
            <span class="tape-chip tape-verde">Ene–Mar: VERDE</span>
            <span class="tape-chip tape-amarillo">Abr–Jun: AMARILLO</span>
            <span class="tape-chip tape-rojo">Jul–Set: ROJO</span>
            <span class="tape-chip tape-blanco">Oct–Dic: BLANCO</span>
          </div>
          <div class="preop-checklist" id="preopChecklist">
            ${items.map((txt, idx) => `
              <label class="preop-check-item">
                <input type="checkbox" data-preop-idx="${idx}">
                <span>${txt}</span>
              </label>
            `).join('')}
          </div>
          <div class="preop-footer-row">
            <strong id="preopProgressText">0 / 4 verificaciones marcadas</strong>
            <button type="button" class="btn btn-outline" id="preopResetBtn">Reiniciar lista</button>
          </div>
        </div>
      </div>
    </details>`;
  }

  function wirePreopFolder(folder) {
    if (!folder) return;
    const checks = folder.querySelectorAll('[data-preop-idx]');
    const progressEl = folder.querySelector('#preopProgressText');
    const resetBtn = folder.querySelector('#preopResetBtn');
    const update = () => {
      const done = [...checks].filter(c => c.checked).length;
      if (progressEl) {
        progressEl.textContent = done === checks.length
          ? '4 / 4 listo — Frente apto para iniciar con seguridad'
          : `${done} / ${checks.length} verificaciones marcadas`;
      }
    };
    checks.forEach(c => c.addEventListener('change', update));
    resetBtn?.addEventListener('click', () => {
      checks.forEach(c => { c.checked = false; });
      update();
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

  function wireUnifiedLightbox() {
    if (!document.getElementById('bibliotecaLightbox')) {
      document.body.insertAdjacentHTML('beforeend', `
        <div class="cartilla-lightbox" id="bibliotecaLightbox" hidden role="dialog" aria-modal="true" aria-label="Vista ampliada de imagen o cartilla">
          <div class="cartilla-lightbox-dialog">
            <div class="cartilla-lightbox-bar">
              <strong id="bibliotecaLightboxTitle">Vista ampliada</strong>
              <div class="lightbox-actions">
                <a class="btn btn-primary" id="bibliotecaLightboxDownload" href="" download="" target="_blank" rel="noopener">Descargar ↓</a>
                <button type="button" class="btn btn-quiet" id="bibliotecaLightboxClose" aria-label="Cerrar vista ampliada">Cerrar ✕</button>
              </div>
            </div>
            <div class="cartilla-lightbox-body">
              <img id="bibliotecaLightboxImg" src="" alt="" referrerpolicy="no-referrer">
            </div>
          </div>
        </div>
      `);
    }

    const lightbox = document.getElementById('bibliotecaLightbox');
    const lbImg = document.getElementById('bibliotecaLightboxImg');
    const lbTitle = document.getElementById('bibliotecaLightboxTitle');
    const lbDownload = document.getElementById('bibliotecaLightboxDownload');
    const lbClose = document.getElementById('bibliotecaLightboxClose');

    const closeLightbox = () => {
      if (lightbox) lightbox.hidden = true;
    };

    document.querySelectorAll('[data-zoom-src]').forEach(btn => {
      if (btn.dataset.zoomBound === '1') return;
      btn.dataset.zoomBound = '1';
      btn.addEventListener('click', () => {
        const src = btn.dataset.zoomSrc;
        const title = btn.dataset.zoomTitle || 'Vista ampliada';
        const dlName = btn.dataset.zoomDownload || 'imagen_ssoma.jpeg';
        if (!src || !lightbox || !lbImg || !lbTitle) return;
        lbTitle.textContent = title;
        lbImg.src = src;
        lbImg.alt = title;
        if (lbDownload) {
          lbDownload.href = src;
          lbDownload.download = dlName;
        }
        lightbox.hidden = false;
      });
    });

    if (lbClose && lbClose.dataset.bound !== '1') {
      lbClose.dataset.bound = '1';
      lbClose.addEventListener('click', closeLightbox);
      lightbox?.addEventListener('click', ev => {
        if (ev.target === lightbox) closeLightbox();
      });
    }
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
          <small>Estándares · Procedimientos y PETS · Reglamentos · IPERC Línea Base — Fichas visuales y descarga</small>
        </span>
        <span class="library-folder-toggle" aria-hidden="true">⌄</span>
      </summary>
      <div class="library-folder-items">
        <div class="security-tools-panel">
          <div class="security-tools-intro">
            <p>Selecciona la carpeta que necesitas revisar. Cada ficha visual resume lo indispensable del documento antes de habilitar su descarga en PDF.</p>
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
    list.insertAdjacentHTML('beforebegin', buildColpaFolder());
    list.insertAdjacentHTML('beforebegin', buildResiduosFolder());
    list.insertAdjacentHTML('beforebegin', buildChemicalsFolder(manifest.msds || []));
    list.insertAdjacentHTML('beforebegin', buildPreopFolder());

    const securityFolder = document.getElementById('securityToolsFolder');
    const pmaFolder = document.getElementById('pmaFolder');
    const emergencyFolder = document.getElementById('emergencyFolder');
    const colpaFolder = document.getElementById('colpaFolder');
    const residuosFolder = document.getElementById('residuosFolder');
    const chemicalsFolder = document.getElementById('chemicalsFolder');
    const preopFolder = document.getElementById('preopFolder');

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
    wireEmergencyFolder(emergencyFolder);
    wireColpaFolder(colpaFolder);
    wireResiduosFolder(residuosFolder);
    wireChemicalsFolder(chemicalsFolder, manifest.msds || []);
    wirePreopFolder(preopFolder);
    wireUnifiedLightbox();

    const toggleFolder = (folderEl, visible) => {
      if (!folderEl) return;
      folderEl.style.display = visible ? '' : 'none';
      if (!visible) folderEl.open = false;
    };

    const applyAllFilters = () => {
      const query = (document.querySelector('#docSearch')?.value || '').trim().toLowerCase();
      const category = document.querySelector('#docFilter')?.value || '';
      filterSecurityTools(securityFolder, allTools);

      toggleFolder(
        pmaFolder,
        (!category || category === 'Gestión ambiental (PMA)') &&
          (!query || pmaFolder.querySelector('.doc-item').dataset.doc.includes(query))
      );

      const emergencySearchText = [
        'respuesta ante emergencias metodo pas proteger alertar socorrer cartillas sede unidad minera',
        ...(manifest.emergencias || []).map(item => `${item.sede || ''} ${item.title || ''} ${item.summary || ''}`)
      ].join(' ').toLowerCase();
      toggleFolder(
        emergencyFolder,
        (!category || category === 'Respuesta ante emergencias') &&
          (!query || emergencySearchText.includes(query))
      );

      toggleFolder(
        colpaFolder,
        (!category || category === 'COLPA · Orden y limpieza') &&
          (!query || 'colpa clasificacion orden limpieza prevencion autodisciplina 5s charla afiche'.includes(query))
      );

      toggleFolder(
        residuosFolder,
        (!category || category === 'Residuos en campo') &&
          (!query || 'segregacion disposicion residuos solidos codigo colores plomo azul blanco amarillo marron negro rojo ntp'.includes(query))
      );

      const msdsSearchText = [
        'uso responsable productos quimicos pesticidas fds msds fumigacion glifosato cipermetrina triple lavado',
        ...(manifest.msds || []).map(item => `${item.title || ''} ${item.product || ''} ${item.downloadName || ''}`)
      ].join(' ').toLowerCase();
      toggleFolder(
        chemicalsFolder,
        (!category || category === 'Productos químicos · MSDS') &&
          (!query || msdsSearchText.includes(query))
      );

      toggleFolder(
        preopFolder,
        (!category || category === 'Formatos operativos') &&
          (!query || 'lista verificacion preoperacional herramientas cinta trimestral epp check list'.includes(query))
      );
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
