(() => {
  const STATS_KEY = 'sgae-weekly-stats';
  const LOG_KEY = 'sgae-engagement-log';

  let audioCtx = null;
  let soundEnabled = true;

  function ensureAudio() {
    if (!soundEnabled) return null;
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      if (!audioCtx) audioCtx = new AC();
      if (audioCtx.state === 'suspended') {
        audioCtx.resume().catch(() => {});
      }
      return audioCtx;
    } catch {
      return null;
    }
  }

  function playTone(freq, dur = 0.14, type = 'triangle', vol = 0.2) {
    if (!soundEnabled) return;
    try {
      const ctx = ensureAudio();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(vol, now + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + dur + 0.02);
    } catch {}
  }

  function playSpinTicks() {
    if (!soundEnabled) return;
    const delays = [0, 90, 180, 280, 400, 540, 700, 880, 1080, 1320, 1590, 1900];
    delays.forEach((ms, i) => {
      setTimeout(() => playTone(320 + (i % 3) * 55, 0.055, 'triangle', 0.14), ms);
    });
  }

  function playWinSound() {
    playTone(523.25, 0.14, 'triangle', 0.22);
    setTimeout(() => playTone(659.25, 0.15, 'triangle', 0.24), 100);
    setTimeout(() => playTone(783.99, 0.22, 'triangle', 0.26), 200);
    setTimeout(() => playTone(1046.5, 0.26, 'sine', 0.22), 320);
  }

  function playWrongSound() {
    playTone(230, 0.16, 'sawtooth', 0.16);
    setTimeout(() => playTone(175, 0.22, 'sawtooth', 0.16), 140);
  }

  function shuffleArray(list) {
    const arr = [...list];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function pickUnseenItems(pool, seenSet, count = 1, keyFn = item => item.id || item.q || item.item) {
    let candidates = pool.filter(item => !seenSet.has(keyFn(item)));
    if (candidates.length < count) {
      seenSet.clear();
      candidates = [...pool];
    }
    const picked = shuffleArray(candidates).slice(0, count);
    picked.forEach(item => seenSet.add(keyFn(item)));
    return picked;
  }

  function getWeekInfo(date = new Date()) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    const weekKey = `${d.getUTCFullYear()}-W${String(weekNo).padStart(2, '0')}`;
    const todayIso = date.toISOString().slice(0, 10);
    return { weekKey, weekNo, todayIso };
  }

  function esc(text) {
    return String(text || '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;');
  }

  function readJson(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }

  function writeJson(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch {}
  }

  function getCurrentActor() {
    const s = window.getSgaeSession?.();
    if (s && s.name) {
      return {
        id: `${s.name.trim().toLowerCase()}|${s.role || 'Trabajador'}|${s.sede || 'General'}`,
        name: s.name.trim(),
        role: s.role || 'Trabajador',
        sede: s.sede || 'General',
        code: s.code || ''
      };
    }
    return {
      id: 'invitado|Trabajador|General',
      name: 'Colaborador (sin sesión)',
      role: 'Visitante',
      sede: 'General',
      code: ''
    };
  }

  function getOrInitWeeklyStats() {
    const { weekKey } = getWeekInfo();
    const actor = getCurrentActor();
    const allLogs = readJson(LOG_KEY, {});
    const existing = allLogs[actor.id];
    let entry;

    if (!existing || existing.weekKey !== weekKey) {
      entry = {
        id: actor.id,
        name: actor.name,
        role: actor.role,
        sede: actor.sede,
        code: actor.code,
        weekKey,
        daysActive: [],
        talksReviewed: [],
        docsConfirmed: [],
        gamesCompleted: [],
        challengeSolved: false,
        msdsSearched: 0,
        reportsSent: 0,
        points: 0,
        lastActiveAt: new Date().toISOString()
      };
    } else {
      entry = {
        ...existing,
        name: actor.name,
        role: actor.role,
        sede: actor.sede,
        daysActive: Array.isArray(existing.daysActive) ? existing.daysActive : [],
        talksReviewed: Array.isArray(existing.talksReviewed) ? existing.talksReviewed : [],
        docsConfirmed: Array.isArray(existing.docsConfirmed) ? existing.docsConfirmed : [],
        gamesCompleted: Array.isArray(existing.gamesCompleted) ? existing.gamesCompleted : []
      };
    }
    return { allLogs, entry };
  }

  function computeMissions(entry) {
    const talksCount = Math.min(3, (entry.talksReviewed || []).length);
    const gamesCount = Math.min(2, (entry.gamesCompleted || []).length);
    const docsCount = Math.min(1, (entry.docsConfirmed || []).length);
    const challengeDone = Boolean(entry.challengeSolved);
    const completed = (talksCount >= 3 ? 1 : 0) + (gamesCount >= 2 ? 1 : 0) + (docsCount >= 1 ? 1 : 0) + (challengeDone ? 1 : 0);

    let level = 'Por iniciar';
    let levelTone = 'neutral';
    if (completed === 4 || (completed >= 3 && (entry.daysActive || []).length >= 3)) {
      level = 'Embajador Preventivo';
      levelTone = 'gold';
    } else if (completed >= 2 || (entry.points || 0) >= 60) {
      level = 'Participación Activa';
      levelTone = 'green';
    } else if (completed >= 1 || (entry.points || 0) > 0) {
      level = 'En Progreso';
      levelTone = 'blue';
    }

    return { talksCount, gamesCount, docsCount, challengeDone, completed, total: 4, level, levelTone };
  }

  function saveEntry(allLogs, entry) {
    allLogs[entry.id] = entry;
    writeJson(LOG_KEY, allLogs);
    writeJson(STATS_KEY, entry);
  }

  window.sgaeTrackAction = (type, detail = '') => {
    const { todayIso } = getWeekInfo();
    const { allLogs, entry } = getOrInitWeeklyStats();

    if (!entry.daysActive.includes(todayIso)) {
      entry.daysActive.push(todayIso);
    }
    entry.lastActiveAt = new Date().toISOString();

    if (type === 'talk') {
      const key = String(detail);
      if (!entry.talksReviewed.includes(key)) {
        entry.talksReviewed.push(key);
        entry.points += 15;
      }
    } else if (type === 'doc') {
      const key = String(detail);
      if (!entry.docsConfirmed.includes(key)) {
        entry.docsConfirmed.push(key);
        entry.points += 20;
      }
    } else if (type === 'game') {
      const key = String(detail);
      if (!entry.gamesCompleted.includes(key)) {
        entry.gamesCompleted.push(key);
        entry.points += 25;
      } else {
        entry.points += 5;
      }
    } else if (type === 'challenge') {
      if (!entry.challengeSolved) {
        entry.challengeSolved = true;
        entry.points += 35;
      }
    } else if (type === 'msds') {
      entry.msdsSearched = (entry.msdsSearched || 0) + 1;
      entry.points += 10;
    } else if (type === 'report') {
      entry.reportsSent = (entry.reportsSent || 0) + 1;
      entry.points += 15;
    } else if (type === 'login') {
      entry.points = Math.max(entry.points, 5);
    }

    saveEntry(allLogs, entry);
    updateDockProgress();
    window.sgaeRefreshTracker?.();
  };

  /* -------------------- 40 UNIQUE QUESTIONS (5 PER WEDGE) GROUNDED IN ALL DOCS -------------------- */
  const WHEEL_CATEGORIES = [
    { label: '9 Reglas de Oro', color: '#145d3f', topic: 'reglas_oro' },
    { label: 'PETS & IPERC', color: '#0b756c', topic: 'pets_iperc' },
    { label: 'PMA Ambiental', color: '#2b8248', topic: 'pma' },
    { label: 'COLPA 5S', color: '#b57c0e', topic: 'colpa' },
    { label: 'Residuos NTP', color: '#1d56a5', topic: 'residuos' },
    { label: 'Método PAS', color: '#b82520', topic: 'pas' },
    { label: 'Pesticidas MSDS', color: '#6b3fa0', topic: 'msds' },
    { label: 'RISSO & RIMA', color: '#265c73', topic: 'reglamentos' }
  ];

  const QUESTION_BANK = {
    reglas_oro: [
      {
        q: 'Según las 9 Reglas de Oro (SST-EST-005), ¿qué derecho obligatorio tienes si detectas una condición insegura sin control en campo?',
        opts: [
          'Ejercer el derecho a decir NO, detener la tarea y reportar de inmediato al supervisor.',
          'Avanzar rápido para terminar antes de que empeore el clima.'
        ],
        ok: 0,
        ref: 'Estándar SST-EST-005 · 9 Reglas de Oro'
      },
      {
        q: 'En trabajos en altura según SST_EST_010 y las Reglas de Oro, ¿a partir de qué desnivel es obligatorio usar arnés con doble línea de vida y PETAR?',
        opts: [
          'Desde 3.50 metros únicamente.',
          'Desde 1.80 metros sobre el nivel inferior.'
        ],
        ok: 1,
        ref: 'Estándar SST_EST_010 · Trabajos en Altura'
      },
      {
        q: 'Antes de realizar mantenimiento o limpieza de cuchillas en un equipo energizado o con motor, ¿qué exige la Regla de Oro de bloqueo?',
        opts: [
          'Apagar el motor, aislar energía / desconectar bujía y aplicar bloqueo LOTO.',
          'Solo pedir a un compañero que sostenga el acelerador sin soltarlo.'
        ],
        ok: 0,
        ref: 'SST-EST-005 · Aislamiento y Bloqueo LOTO'
      },
      {
        q: 'De acuerdo con SST_EST_020 (Botiquines), ¿por qué está prohibido asegurar el botiquín de campo con candado?',
        opts: [
          'Porque retrasa la atención en una emergencia; debe usar solo precinto de fácil ruptura e inspeccionarse mensualmente.',
          'Porque pesa mucho al trasladarlo.'
        ],
        ok: 0,
        ref: 'Estándar SST_EST_020 · Botiquines'
      },
      {
        q: 'Al combatir un amago de incendio con extintor portátil (SST_EST_019), ¿cómo debes ubicarte respecto al viento y dónde apuntas?',
        opts: [
          'A favor del viento (el viento a tu espalda), dirigiendo el chorro en abanico a la base del fuego.',
          'En contra del viento y directo a la punta más alta de la llama.'
        ],
        ok: 0,
        ref: 'Estándar SST_EST_019 · Incendios y Extintores'
      }
    ],
    pets_iperc: [
      {
        q: 'De acuerdo con el IPERC Línea Base 2026 y SST-EST-006, ¿cómo se complementa la evaluación antes de iniciar la jornada diaria?',
        opts: [
          'Llenando el IPERC Continuo en el frente de trabajo aplicando la pausa "Toma Dos".',
          'No hace falta revisarlo si el IPERC Base ya fue aprobado al inicio del año.'
        ],
        ok: 0,
        ref: 'IPERC Base 2026 · SST-EST-006'
      },
      {
        q: 'Según el PETS RV01 de Áreas Verdes, antes de encender una motoguadaña debes:',
        opts: [
          'Revisar EPP, guarda protectora, delimitar con conos/cintas (15 m de exclusión) y verificar autorización vigente.',
          'Retirar la guarda inferior para cortar más rápido cerca de piedras.'
        ],
        ok: 0,
        ref: 'PETS RV01 · Áreas Verdes'
      },
      {
        q: 'Según el PETS de Siembra de Especies Frutales y Forestales, ¿qué distancia es clave al excavar hoyos en cuadrilla con pico o palana?',
        opts: [
          'Mantener separación segura entre compañeros fuera del radio de giro de la herramienta.',
          'Excavar hombro con hombro para terminar la línea en menos tiempo.'
        ],
        ok: 0,
        ref: 'PETS Siembra Frutales y Forestales'
      },
      {
        q: 'Según SST-EST-007 (Investigación de Incidentes), si ocurre un evento en el frente de trabajo, ¿cuál es la regla inmediata sobre el área?',
        opts: [
          'No alterar ni mover evidencias tras proteger/auxiliar al trabajador, salvo para eliminar peligro inminente.',
          'Barrer todo de inmediato para ocultar huellas antes de que llegue supervisión.'
        ],
        ok: 0,
        ref: 'SST-EST-007 · Investigación PEEPO'
      },
      {
        q: 'En Disciplina Operativa (SST-EST-004), ¿para qué sirve la Observación Planeada de Tarea (OPT)?',
        opts: [
          'Para verificar en campo que el trabajador conoce y cumple paso a paso el PETS, corrigiendo desviaciones en equipo.',
          'Solo para sancionar al trabajador sin explicarle el estándar.'
        ],
        ok: 0,
        ref: 'SST-EST-004 · Disciplina Operativa y OPT'
      }
    ],
    pma: [
      {
        q: 'En el Plan de Manejo Ambiental (PMA), ¿cuál es la diferencia entre Aspecto Ambiental e Impacto Ambiental?',
        opts: [
          'El aspecto es la interacción de nuestra tarea (uso de agua, residuos); el impacto es el cambio positivo o negativo en el ambiente.',
          'Ambos términos significan exactamente lo mismo.'
        ],
        ok: 0,
        ref: 'PMA SGAE 2026'
      },
      {
        q: 'Durante el riego con líneas HDPE según el PMA, ¿qué control operacional es clave?',
        opts: [
          'Inspeccionar válvulas y uniones para evitar fugas, desperdicio de agua y erosión del talud.',
          'Dejar las válvulas abiertas toda la noche para humedecer el cerro.'
        ],
        ok: 0,
        ref: 'PMA · Control de Riego y Agua'
      },
      {
        q: 'En rehabilitación y cierre de minas, ¿qué representa la conservación del suelo superficial (topsoil) y la revegetación?',
        opts: [
          'Un impacto ambiental positivo: retiene humedad, evita erosión y devuelve cobertura vegetal al entorno.',
          'Un trámite innecesario si las máquinas ya nivelaron la ladera.'
        ],
        ok: 0,
        ref: 'PMA · Cierre y Rehabilitación'
      },
      {
        q: '¿Qué horario y técnica exige el PMA/RIMA para regar áreas verdes y plantones sin desperdiciar agua?',
        opts: [
          'Regar en horas frescas (mañana o tarde) aplicando el caudal programado y sin escurrimientos fuera del área.',
          'Regar al mediodía bajo sol intenso con chorro libre sobre la pista.'
        ],
        ok: 0,
        ref: 'PMA & RIMA · Uso Eficiente del Agua'
      },
      {
        q: 'Si observas un goteo continuo o manguera HDPE rota en campo, ¿qué indica la Ficha de Observación Ambiental?',
        opts: [
          'Aislar/reportar el punto de fuga, registrar la observación ambiental y evitar erosión localizada.',
          'Esperar al fin de mes para ver si se arregla solo.'
        ],
        ok: 0,
        ref: 'PMA · Monitoreo en Campo'
      }
    ],
    colpa: [
      {
        q: 'En la metodología COLPA (5S), ¿qué representa la letra "P"?',
        opts: [
          'PREVENIR: estandarizar rótulos, demarcación y controles visuales para evitar errores.',
          'APURAR la entrega aunque queden herramientas sueltas.'
        ],
        ok: 0,
        ref: 'Metodología COLPA · 5 Etapas'
      },
      {
        q: 'Cuando devuelves herramientas limpias a su soporte sin necesidad de que te vigilen, practicas la etapa:',
        opts: [
          'A · Autodisciplina.',
          'C · Clasificar solamente.'
        ],
        ok: 0,
        ref: 'COLPA · Autodisciplina'
      },
      {
        q: '¿Cuál es el objetivo principal de la primera letra C · CLASIFICAR en el frente de trabajo o almacén?',
        opts: [
          'Separar lo necesario de lo inservible o dañado para despejar el área antes de trabajar.',
          'Pintar todas las herramientas de un solo color.'
        ],
        ok: 0,
        ref: 'COLPA · Etapa 01 Clasificar'
      },
      {
        q: 'En la etapa O · ORDENAR, ¿qué regla práctica facilita encontrar picos, palanas y mochilas fumigadoras?',
        opts: [
          'Asignar un lugar definido, rotulado y visible para cada elemento ("un lugar para cada cosa").',
          'Apilar todo dentro de un mismo cilindro sin letrero.'
        ],
        ok: 0,
        ref: 'COLPA · Etapa 02 Ordenar'
      },
      {
        q: '¿Por qué la etapa L · LIMPIAR previene accidentes e incidentes ambientales durante la jornada?',
        opts: [
          'Porque al limpiar equipos, losas y botas detectas a tiempo fugas de aceite, fisuras o derrames ocultos.',
          'Porque solo mejora las fotografías de fin de mes.'
        ],
        ok: 0,
        ref: 'COLPA · Etapa 03 Limpiar'
      }
    ],
    residuos: [
      {
        q: 'Según la NTP 900.058 y la lámina de campo, ¿en qué cilindro se depositan trapos con aceite, tierra contaminada o envases químicos no lavados?',
        opts: [
          'Cilindro NEGRO (generales).',
          'Cilindro ROJO (residuos peligrosos).'
        ],
        ok: 1,
        ref: 'NTP 900.058 · Código de Colores'
      },
      {
        q: '¿Qué residuo corresponde depositar en el cilindro MARRÓN?',
        opts: [
          'Restos orgánicos de poda, maleza vegetal y estiércol.',
          'Botellas de plástico duro y latas de metal.'
        ],
        ok: 0,
        ref: 'Segregación de Residuos en Campo'
      },
      {
        q: 'En la NTP 900.058, ¿para qué tipo de residuo reaprovechable está destinado el cilindro PLOMO?',
        opts: [
          'Vidrio limpio (botellas, vasos o frascos sin residuos químicos).',
          'Restos de cartón mojado con aceite.'
        ],
        ok: 0,
        ref: 'NTP 900.058 · Cilindro Plomo'
      },
      {
        q: 'Alambres retorcidos, mallas metálicas en desuso y latas limpias deben segregarse en el cilindro de color:',
        opts: [
          'AMARILLO (Metales reaprovechables).',
          'AZUL (Papel y cartón).'
        ],
        ok: 0,
        ref: 'NTP 900.058 · Cilindro Amarillo'
      },
      {
        q: 'Guantes de hilo comunes gastados (sin grasa ni pesticidas) y envolturas no reaprovechables van al cilindro:',
        opts: [
          'NEGRO (Residuos no reaprovechables / generales).',
          'BLANCO (Plástico limpio).'
        ],
        ok: 0,
        ref: 'NTP 900.058 · Cilindro Negro'
      }
    ],
    pas: [
      {
        q: '¿Cuál es el orden obligatorio del Método PAS ante una emergencia?',
        opts: [
          'Alertar, luego Socorrer y finalmente Proteger.',
          '1° PROTEGER la zona y tu vida · 2° ALERTAR con datos exactos · 3° SOCORRER con calma.'
        ],
        ok: 1,
        ref: 'Respuesta ante Emergencias · PAS'
      },
      {
        q: 'Al ALERTAR al Puesto de Vigilancia usando tu cartilla por sede minera, ¿qué nunca debes olvidar?',
        opts: [
          'Indicar ubicación, qué pasó, número de lesionados, riesgos presentes y no colgar hasta confirmar recepción.',
          'Solo decir "emergencia" y cortar la radio.'
        ],
        ok: 0,
        ref: 'Cartillas de Emergencia por Sede'
      },
      {
        q: 'Durante el paso S · SOCORRER a un trabajador con posible golpe en cabeza o columna, ¿qué acción es correcta?',
        opts: [
          'No moverlo (salvo peligro inmediato), tranquilizarlo y esperar a la brigada médica.',
          'Sentarlo enseguida y darle bebidas energizantes.'
        ],
        ok: 0,
        ref: 'Método PAS · Primeros Auxilios'
      },
      {
        q: 'En Santa María, Paraíso, Vijus o Hualanga, ¿cuál es el primer receptor de llamada radial indicado en las cartillas?',
        opts: [
          'El Puesto de Vigilancia / Canal oficial de tu unidad minera y anexo médico/SST.',
          'Publicarlo primero en redes sociales personales.'
        ],
        ok: 0,
        ref: 'Cartillas Oficiales por Unidad Minera'
      },
      {
        q: '¿Por qué el paso P · PROTEGER es siempre el número 1 en el método PAS?',
        opts: [
          'Porque si el auxiliador se accidenta al entrar sin asegurar energía, talud o tránsito, se agrava la emergencia.',
          'Porque toma menos de un segundo gritar desde lejos.'
        ],
        ok: 0,
        ref: 'Manual de Respuesta ante Emergencias PAS'
      }
    ],
    msds: [
      {
        q: 'Antes de preparar cualquier mezcla fitosanitaria o pesticida en campo debes:',
        opts: [
          'Consultar su Hoja MSDS (16 ítems), banda toxicológica SENASA, usar bandeja antiderrame y EPP químico completo.',
          'Mezclar directo junto a la acequia para lavar el balde más rápido.'
        ],
        ok: 0,
        ref: 'Uso Responsable de Productos Químicos'
      },
      {
        q: '¿En qué consiste el "Triple Lavado" de envases vacíos de pesticidas?',
        opts: [
          'Enjuagar 3 veces el envase vertiendo el agua en la mochila fumigadora, perforarlo y llevarlo al cilindro rojo autorizado.',
          'Llenar el envase con agua para tomar o guardar gasolina.'
        ],
        ok: 0,
        ref: 'PETS / MSDS · Manejo de Envases'
      },
      {
        q: 'En Perú, según SENASA (D.S. N° 001-2015-MINAGRI), ¿qué significan las Bandas Toxicológicas Roja y Amarilla en la etiqueta?',
        opts: [
          'Roja: Extremadamente / Altamente peligroso · Amarilla: Moderadamente peligroso (exigen control máximo y EPP estricto).',
          'Son solo colores decorativos de la marca fabricante.'
        ],
        ok: 0,
        ref: 'SENASA Perú · Etiquetado Fitosanitario'
      },
      {
        q: 'Si encuentras un frasco de THIODAN (Endosulfán) en un almacén antiguo en Perú, ¿qué debes hacer?',
        opts: [
          'NO aplicarlo (está prohibido por SENASA como COP); inmovilizar, rotular y gestionar retiro como residuo peligroso.',
          'Diluyente a mitad de dosis para aprovecharlo en el cerco.'
        ],
        ok: 0,
        ref: 'SENASA Perú · Plaguicidas Prohibidos'
      },
      {
        q: '¿Cuántos ítems obligatorios debe contener una Hoja de Datos de Seguridad (MSDS / FDS) oficial?',
        opts: [
          '16 secciones estandarizadas (de Identificación hasta Reglamentación y Emergencias Perú).',
          'Solo 3 líneas con el precio y la marca.'
        ],
        ok: 0,
        ref: 'FDS / MSDS 16 Secciones · Normativa Perú'
      }
    ],
    reglamentos: [
      {
        q: 'Según el Anexo N° 4 del RISSO, ¿qué color de cinta trimestral corresponde a la inspección de herramientas entre Abril y Junio?',
        opts: [
          'Verde.',
          'Amarillo.'
        ],
        ok: 1,
        ref: 'RISSO 2023 · Anexo N° 4'
      },
      {
        q: '¿Qué prohíbe expresamente el RIMA 2024 respecto a los residuos en operaciones?',
        opts: [
          'Cero plásticos de un solo uso/tecnopor, prohibido quemar o arrojar residuos al suelo o quebradas.',
          'Usar cilindros rotulados en los puntos de acopio.'
        ],
        ok: 0,
        ref: 'RIMA 2024 · Reglamento Interno de Medio Ambiente'
      },
      {
        q: 'En el código de colores de señalización (SST_EST_015), ¿cuándo se usa cinta ROJA en lugar de cinta AMARILLA?',
        opts: [
          'Cinta ROJA para peligro grave/prohibición de ingreso sin permiso; cinta AMARILLA para precaución o advertencia.',
          'Ambas significan exactamente lo mismo.'
        ],
        ok: 0,
        ref: 'SST_EST_015 · Señales y Colores'
      },
      {
        q: 'Según el RISSO 2023, para proteger la piel ante radiación solar en labores de campo es obligatorio usar:',
        opts: [
          'Bloqueador solar FPS 30+, camisa manga larga, cortaviento/ala ancha en casco y pausas de hidratación.',
          'Camisa sin mangas para refrescarse más rápido.'
        ],
        ok: 0,
        ref: 'RISSO 2023 · Salud Ocupacional UV'
      },
      {
        q: 'Si ves a un compañero cometiendo un acto subestándar o detectas una condición insegura (SGI_P-04), ¿qué corresponde?',
        opts: [
          'Comunicarlo con respeto, corregir o detener la tarea si es crítico y registrarlo en el reporte de actos y condiciones.',
          'Ignorarlo si no te corresponde a tu frente.'
        ],
        ok: 0,
        ref: 'SGI_P-04 · Reporte de Actos y Condiciones'
      }
    ]
  };

  /* -------------------- 6 DISTINCT SVG SCENES FOR "ENCUENTRA EL PELIGRO" -------------------- */
  const HAZARD_SCENES = [
    {
      id: 'poda',
      title: 'Escena 1 · Poda con motoguadaña y tránsito',
      ruleRef: 'PETS RV01 · SST_EST_008 · RISSO Anexo 4',
      summary: 'Encuentra los 4 peligros o condiciones subestándar ocultos en la escena tocando directamente sobre ellos.',
      viewBox: '0 0 640 320',
      svg: `
        <rect width="640" height="320" fill="#eef6f0"/>
        <rect y="220" width="640" height="100" fill="#c7d8be"/>
        <path d="M0 220 Q160 190 320 218 T640 205 L640 245 L0 245 Z" fill="#9bc08b"/>
        <circle cx="150" cy="145" r="18" fill="#174739"/>
        <rect x="135" y="165" width="30" height="58" rx="8" fill="#d9532f"/>
        <path d="M165 182 L225 225" stroke="#334" stroke-width="5" stroke-linecap="round"/>
        <circle cx="228" cy="227" r="13" fill="#b82520" opacity="0.85"/>
        <text x="150" y="120" text-anchor="middle" font-size="11" font-weight="700" fill="#9c2b23">Sin careta ni guarda</text>
        <circle cx="268" cy="150" r="16" fill="#1d56a5"/>
        <rect x="255" y="168" width="26" height="55" rx="7" fill="#1d56a5"/>
        <path d="M195 215 L252 215" stroke="#b82520" stroke-width="2" stroke-dasharray="4 4"/>
        <text x="275" y="130" text-anchor="middle" font-size="11" font-weight="700" fill="#9c2b23">A menos de 2 m</text>
        <path d="M370 250 L430 268" stroke="#6d4423" stroke-width="7" stroke-linecap="round"/>
        <rect x="425" y="258" width="22" height="16" rx="3" fill="#6f7b85"/>
        <text x="405" y="292" text-anchor="middle" font-size="11" font-weight="700" fill="#6d4423">Pico sin cinta en paso</text>
        <rect x="520" y="210" width="38" height="46" rx="6" fill="#c92a2a"/>
        <ellipse cx="539" cy="264" rx="28" ry="6" fill="#3a2f26" opacity="0.5"/>
        <text x="539" y="198" text-anchor="middle" font-size="11" font-weight="700" fill="#9c2b23">Combustible sin bandeja</text>
      `,
      hotspots: [
        { id: 'h1', x: 26, y: 45, label: '1. Operador sin careta facial ni guarda en motoguadaña', rule: 'PETS RV01 & SST_EST_008: Es obligatorio usar careta facial, protección auditiva y verificar que la guarda de corte esté completa.' },
        { id: 'h2', x: 43, y: 55, label: '2. Compañero dentro del radio de proyección (< 15 m)', rule: 'PETS RV01: Mantén distancia de exclusión de seguridad cuando la motoguadaña está operando y delimita con conos.' },
        { id: 'h3', x: 64, y: 82, label: '3. Herramienta sin cinta trimestral tirada en zona de paso', rule: 'COLPA & RISSO Anexo 4: Toda herramienta debe tener cinta trimestral vigente y ubicarse ordenada fuera de rutas de tránsito.' },
        { id: 'h4', x: 84, y: 72, label: '4. Bidón de mezcla sobre suelo sin bandeja antiderrame', rule: 'RIMA 2024 & PMA: Todo combustible o insumo líquido en campo debe reposar sobre bandeja de contención impermeable.' }
      ]
    },
    {
      id: 'fumigacion',
      title: 'Escena 2 · Preparación y fumigación en vivero',
      ruleRef: 'RIMA 2024 · Uso de Pesticidas / MSDS',
      summary: 'Ubica los 4 incumplimientos críticos en manejo de productos fitosanitarios tocando cada zona.',
      viewBox: '0 0 640 320',
      svg: `
        <rect width="640" height="320" fill="#f3f8f4"/>
        <path d="M0 245 Q160 230 340 250 T640 238 L640 320 L0 320 Z" fill="#88c5e3"/>
        <text x="85" y="285" font-size="12" font-weight="800" fill="#0f476e">Acequia / Cuerpo de agua</text>
        <rect x="135" y="185" width="44" height="52" rx="6" fill="#26734d"/>
        <circle cx="157" cy="210" r="10" fill="#f7c948"/>
        <text x="157" y="174" text-anchor="middle" font-size="11" font-weight="700" fill="#9c2b23">Mezcla junto al agua</text>
        <circle cx="310" cy="128" r="18" fill="#174739"/>
        <rect x="295" y="148" width="32" height="60" rx="8" fill="#f29f05"/>
        <text x="311" y="102" text-anchor="middle" font-size="11" font-weight="700" fill="#9c2b23">Sin respirador ni nitrilo</text>
        <path d="M445 120 L380 120 M380 120 L392 112 M380 120 L392 128" stroke="#1d56a5" stroke-width="4" stroke-linecap="round"/>
        <text x="430" y="98" text-anchor="middle" font-size="11" font-weight="700" fill="#1d56a5">Viento hacia el rostro</text>
        <rect x="520" y="192" width="36" height="48" rx="6" fill="#d9480f"/>
        <text x="538" y="180" text-anchor="middle" font-size="11" font-weight="700" fill="#9c2b23">Envase sin triple lavado</text>
      `,
      hotspots: [
        { id: 'f1', x: 25, y: 64, label: '1. Dosificación junto a acequia sin bandeja de contención', rule: 'PMA & RIMA: Prepara mezclas lejos de cuerpos de agua y siempre sobre bandeja antiderrame.' },
        { id: 'f2', x: 49, y: 49, label: '2. Aplicador sin respirador de vapores ni guantes de nitrilo', rule: 'Hoja MSDS: Antes de abrir un pesticida coloca respirador con cartuchos vigentes, gafas cerradas, mandil y guantes de nitrilo.' },
        { id: 'f3', x: 66, y: 36, label: '3. Fumigación con viento en contra (deriva hacia operador)', rule: 'PETS Fitosanitario: Aplica siempre a favor del viento; si el viento dispersa la nube hacia ti o hacia el agua, suspende.' },
        { id: 'f4', x: 84, y: 66, label: '4. Envase químico vacío sin triple lavado ni perforado', rule: 'Gestión de Químicos: Realiza el triple lavado, perfora el envase para impedir su reuso y entrégalo al acopio peligroso (cilindro rojo).' }
      ]
    },
    {
      id: 'altura',
      title: 'Escena 3 · Revegetación en talud >= 1.80 m',
      ruleRef: 'SST_EST_010 Altura · SST_EST_015 Señalización',
      summary: 'Detecta los 4 controles ausentes en trabajos en talud con desnivel superior a 1.80 metros.',
      viewBox: '0 0 640 320',
      svg: `
        <rect width="640" height="320" fill="#eef4f7"/>
        <polygon points="0,120 350,120 560,295 0,295" fill="#bfa686"/>
        <polygon points="350,120 560,295 640,295 640,320 0,320 0,295" fill="#947a5a"/>
        <line x1="250" y1="120" x2="350" y2="120" stroke="#b82520" stroke-width="5" stroke-dasharray="8 6"/>
        <text x="155" y="106" font-size="11" font-weight="700" fill="#9c2b23">Borde sin cinta roja ni conos</text>
        <circle cx="320" cy="70" r="16" fill="#174739"/>
        <rect x="307" y="88" width="26" height="45" rx="6" fill="#e67700"/>
        <text x="330" y="45" text-anchor="middle" font-size="11" font-weight="700" fill="#9c2b23">Sin arnés ni línea de vida (&gt;1.80m)</text>
        <circle cx="215" cy="116" r="10" fill="#5c5346"/>
        <circle cx="232" cy="114" r="12" fill="#473f34"/>
        <text x="215" y="142" text-anchor="middle" font-size="11" font-weight="700" fill="#473f34">Rocas sueltas en cabecera</text>
        <circle cx="485" cy="212" r="15" fill="#1d56a5"/>
        <rect x="473" y="229" width="24" height="44" rx="6" fill="#1d56a5"/>
        <text x="485" y="190" text-anchor="middle" font-size="11" font-weight="700" fill="#9c2b23">Trabaja en línea de caída</text>
      `,
      hotspots: [
        { id: 'a1', x: 51, y: 29, label: '1. Trabajador sobre 1.80 m sin arnés, línea de vida ni PETAR', rule: 'SST_EST_010 & 9 Reglas de Oro: Desde 1.80 m de desnivel es obligatorio PETAR autorizado, arnés certificado y punto de anclaje.' },
        { id: 'a2', x: 24, y: 37, label: '2. Borde sin delimitación roja ni advertencia de peligro', rule: 'SST_EST_015 Señalización: Usa cinta ROJA cuando exista peligro grave de caída o prohibición de ingreso sin permiso.' },
        { id: 'a3', x: 35, y: 41, label: '3. Material y rocas sueltas sin desquinchar en cabecera', rule: 'IPERC Taludes: Inspecciona y estabiliza rocas sueltas antes de ubicarte o trabajar debajo en la ladera.' },
        { id: 'a4', x: 76, y: 74, label: '4. Colaborador debajo en la vertical de caída de objetos', rule: '9 Reglas de Oro: Nunca trabajes en niveles superpuestos ni dentro de la línea de fuego de caída de piedras o herramientas.' }
      ]
    },
    {
      id: 'riego',
      title: 'Escena 4 · Riego HDPE, calor solar y orden en paso',
      ruleRef: 'PMA Agua · RISSO UV · COLPA Orden',
      summary: 'Identifica los 4 desvíos ambientales y ergonómicos en la operación de riego y áreas verdes.',
      viewBox: '0 0 640 320',
      svg: `
        <rect width="640" height="320" fill="#f3f9f3"/>
        <circle cx="565" cy="52" r="28" fill="#f5b82e"/>
        <text x="545" y="96" text-anchor="middle" font-size="11" font-weight="700" fill="#9c5a08">Sol intenso sin agua ni sombra</text>
        <rect y="235" width="640" height="85" fill="#d5e5cb"/>
        <!-- Manguera cruzando paso peatonal -->
        <path d="M50 262 Q160 245 270 268" fill="none" stroke="#182b3a" stroke-width="8" stroke-linecap="round"/>
        <text x="155" y="292" text-anchor="middle" font-size="11" font-weight="700" fill="#9c2b23">Manguera cruzada en paso</text>
        <!-- Válvula HDPE con fuga -->
        <rect x="295" y="210" width="38" height="24" rx="4" fill="#0b756c"/>
        <path d="M314 234 L305 268 L325 272 Z" fill="#52b2e8"/>
        <text x="314" y="198" text-anchor="middle" font-size="11" font-weight="700" fill="#0d5b78">Fuga en unión HDPE</text>
        <!-- Operador levantando saco doblando espalda -->
        <circle cx="468" cy="180" r="16" fill="#174739"/>
        <path d="M468 196 L444 228 L444 252" stroke="#d9532f" stroke-width="14" stroke-linecap="round"/>
        <rect x="408" y="222" width="34" height="26" rx="5" fill="#9e7b56"/>
        <text x="455" y="154" text-anchor="middle" font-size="11" font-weight="700" fill="#9c2b23">Carga doblando la espalda</text>
      `,
      hotspots: [
        { id: 'r1', x: 24, y: 82, label: '1. Manguera HDPE suelta atravesando ruta peatonal', rule: 'COLPA & Tránsito Seguro: Ordena las mangueras fuera del paso o coloca paso protegido y señalización.' },
        { id: 'r2', x: 49, y: 74, label: '2. Válvula HDPE con fuga continua provocando erosión', rule: 'PMA Agua: Cierra o ajusta la válvula de inmediato y registra la observación ambiental para reparar el acople.' },
        { id: 'r3', x: 70, y: 69, label: '3. Levantamiento de saco pesado doblando la columna', rule: 'Ergonomía: Flexiona rodillas con espalda recta, acerca la carga o usa carretilla/apoyo de un compañero.' },
        { id: 'r4', x: 86, y: 22, label: '4. Jornada bajo sol intenso sin punto de hidratación visible', rule: 'RISSO Salud UV: Usa bloqueador FPS 30+, manga larga, cortaviento y mantén agua potable con pausas.' }
      ]
    },
    {
      id: 'residuos_campo',
      title: 'Escena 5 · Acopio temporal y residuos NTP 900.058',
      ruleRef: 'RIMA 2024 · NTP 900.058 · Código de Colores',
      summary: 'Ubica los 4 errores críticos de segregación y disposición de residuos en campo.',
      viewBox: '0 0 640 320',
      svg: `
        <rect width="640" height="320" fill="#f5faf5"/>
        <rect y="235" width="640" height="85" fill="#dfdfd3"/>
        <!-- Cilindro marron desbordado -->
        <rect x="95" y="170" width="52" height="72" rx="6" fill="#6d4423"/>
        <rect x="108" y="148" width="26" height="22" fill="#e63946"/>
        <text x="121" y="136" text-anchor="middle" font-size="11" font-weight="700" fill="#9c2b23">Lata de aceite en Marrón</text>
        <!-- Tecnopor/Descartables prohibidos -->
        <rect x="245" y="218" width="48" height="24" rx="4" fill="#ffffff" stroke="#8899a6" stroke-width="2"/>
        <text x="269" y="205" text-anchor="middle" font-size="11" font-weight="700" fill="#9c2b23">Tecnopor descartable</text>
        <!-- Quema de ramas -->
        <polygon points="395,242 425,180 455,242" fill="#e65100"/>
        <polygon points="410,242 425,198 440,242" fill="#ffb300"/>
        <text x="425" y="168" text-anchor="middle" font-size="11" font-weight="700" fill="#b82520">Quema de poda en campo</text>
        <!-- Cilindro Rojo abierto al sol con tierra contaminada regada -->
        <rect x="528" y="170" width="52" height="72" rx="6" fill="#b82520"/>
        <ellipse cx="554" cy="252" rx="40" ry="8" fill="#4f3b2b" opacity="0.65"/>
        <text x="554" y="156" text-anchor="middle" font-size="11" font-weight="700" fill="#9c2b23">Derrame fuera del Rojo</text>
      `,
      hotspots: [
        { id: 'rc1', x: 19, y: 54, label: '1. Lata de aceite mezclada en el cilindro Marrón orgánico', rule: 'NTP 900.058: El cilindro MARRÓN es exclusivo para restos orgánicos; hidrocarburos y trapos contaminados van al ROJO.' },
        { id: 'rc2', x: 42, y: 71, label: '2. Uso de envases de tecnopor de un solo uso', rule: 'RIMA 2024: Está prohibido ingresar descartables de tecnopor o plástico de un solo uso a las operaciones.' },
        { id: 'rc3', x: 66, y: 65, label: '3. Quema a cielo abierto de restos vegetales de poda', rule: 'RIMA & PMA: Prohibido quemar, enterrar o arrojar residuos. Los restos vegetales se compostan o entregan al acopio autorizado.' },
        { id: 'rc4', x: 86, y: 68, label: '4. Derrame de residuo peligroso fuera de contención en cilindro Rojo', rule: 'NTP 900.058: El acopio peligroso requiere losa/bandeja antiderrame, tapa cerrada y rótulo visible.' }
      ]
    },
    {
      id: 'almacen',
      title: 'Escena 6 · Almacén, botiquín y extintores',
      ruleRef: 'SST_EST_019 Extintores · SST_EST_020 Botiquines · COLPA',
      summary: 'Encuentra las 4 condiciones subestándar en la zona de acopio de herramientas y respuesta a emergencias.',
      viewBox: '0 0 640 320',
      svg: `
        <rect width="640" height="320" fill="#f4f7f8"/>
        <rect y="245" width="640" height="75" fill="#cfd9df"/>
        <!-- Extintor bloqueado con cajas -->
        <rect x="88" y="145" width="32" height="65" rx="6" fill="#c92a2a"/>
        <rect x="74" y="185" width="62" height="60" rx="4" fill="#c79b63"/>
        <text x="105" y="132" text-anchor="middle" font-size="11" font-weight="700" fill="#9c2b23">Extintor bloqueado</text>
        <!-- Botiquín con candado -->
        <rect x="235" y="135" width="54" height="44" rx="6" fill="#ffffff" stroke="#176b39" stroke-width="3"/>
        <path d="M254 157 h16 M262 149 v16" stroke="#176b39" stroke-width="4"/>
        <rect x="278" y="162" width="14" height="16" rx="3" fill="#d4a017"/>
        <text x="262" y="120" text-anchor="middle" font-size="11" font-weight="700" fill="#9c2b23">Botiquín con candado</text>
        <!-- Herramienta hechiza sin cinta -->
        <path d="M375 215 L445 215" stroke="#7c522d" stroke-width="8" stroke-linecap="round"/>
        <line x1="425" y1="215" x2="435" y2="232" stroke="#889" stroke-width="3"/>
        <text x="410" y="198" text-anchor="middle" font-size="11" font-weight="700" fill="#9c2b23">Mango rajado amarrado</text>
        <!-- Cable eléctrico en charco -->
        <ellipse cx="548" cy="260" rx="42" ry="12" fill="#70b5dc"/>
        <path d="M510 220 Q535 262 585 256" fill="none" stroke="#222" stroke-width="4"/>
        <text x="548" y="206" text-anchor="middle" font-size="11" font-weight="700" fill="#9c2b23">Cable eléctrico sobre agua</text>
      `,
      hotspots: [
        { id: 'al1', x: 16, y: 56, label: '1. Extintor obstruido por cajas de cartón', rule: 'SST_EST_019: Todo extintor debe permanecer visible, señalizado y con acceso 100% libre de obstáculos.' },
        { id: 'al2', x: 41, y: 49, label: '2. Botiquín de primeros auxilios cerrado con candado', rule: 'SST_EST_020: Prohibido poner candado a botiquines; usa solo precinto de apertura inmediata ante emergencia.' },
        { id: 'al3', x: 64, y: 67, label: '3. Herramienta hechiza con mango rajado amarrada con alambre', rule: 'RISSO Anexo 4: Herramienta dañada o hechiza se retira de inmediato y se reemplaza por una con cinta trimestral vigente.' },
        { id: 'al4', x: 86, y: 78, label: '4. Extensión eléctrica en contacto con piso húmedo', rule: '9 Reglas de Oro: Riesgo eléctrico grave; retira cables del agua, usa protecciones diferenciales y bloquea si hay daño.' }
      ]
    }
  ];

  /* -------------------- 3 EXPANDED DECKS FOR "CLASIFICA RÁPIDO" (SHUFFLED 6-ITEM ROUNDS) -------------------- */
  const SORT_RESIDUOS_ITEMS = [
    { item: 'Ramas cortadas, hojas secas y maleza de poda', drum: 'MARRÓN', explain: 'Restos vegetales y orgánicos van al cilindro MARRÓN.' },
    { item: 'Trapos impregnados con aceite de motoguadaña', drum: 'ROJO', explain: 'Material contaminado con hidrocarburo o químico es residuo peligroso -> ROJO.' },
    { item: 'Botella de agua descartable vacía y limpia', drum: 'BLANCO', explain: 'Plástico reaprovechable limpio va al cilindro BLANCO.' },
    { item: 'Cajas de cartón limpias y hojas usadas de registro', drum: 'AZUL', explain: 'Papel y cartón limpios se segregan en el cilindro AZUL.' },
    { item: 'Alambres retorcidos y retazos de malla metálica', drum: 'AMARILLO', explain: 'Metales y chatarra limpia corresponden al cilindro AMARILLO.' },
    { item: 'Botellas o frascos de vidrio limpios', drum: 'PLOMO', explain: 'Vidrio reaprovechable va al cilindro PLOMO.' },
    { item: 'Guantes de hilo gastados (sin químicos ni grasa)', drum: 'NEGRO', explain: 'Residuo general no reaprovechable sin contaminantes peligrosos -> NEGRO.' },
    { item: 'Envase vacío de pesticida sin lavar o tierra contaminada', drum: 'ROJO', explain: 'Envases químicos y suelos contaminados van al cilindro ROJO.' },
    { item: 'Pilas alcalinas agotadas de linterna o radio', drum: 'ROJO', explain: 'Las pilas y baterías son residuos peligrosos -> ROJO.' },
    { item: 'Estiércol seco y viruta limpia usada en abono', drum: 'MARRÓN', explain: 'Insumos orgánicos biodegradables corresponden al cilindro MARRÓN.' },
    { item: 'Envase plástico limpio de manguera o bidón enjuagado sin químicos', drum: 'BLANCO', explain: 'Plástico limpio libre de contaminantes peligrosos -> BLANCO.' },
    { item: 'Sobres manila limpios y folders de cartulina usados', drum: 'AZUL', explain: 'Papelería limpia va al cilindro AZUL.' },
    { item: 'Lunas de vidrio rotas de caseta (limpias)', drum: 'PLOMO', explain: 'Vidrio limpio segregado con cuidado al cilindro PLOMO.' },
    { item: 'Envolturas metalizadas de galletas y papel higiénico usado', drum: 'NEGRO', explain: 'Residuos comunes no reaprovechables -> NEGRO.' },
    { item: 'Restos de brocas, pernos y retazos de fierro oxidado limpio', drum: 'AMARILLO', explain: 'Chatarra metálica va al cilindro AMARILLO.' },
    { item: 'Envases en aerosol (spray) usados o filtros con combustible', drum: 'ROJO', explain: 'Aerosoles y filtros con hidrocarburo -> cilindro ROJO.' }
  ];

  const SORT_COLPA_ITEMS = [
    { item: 'Retirar herramientas rotas y maleza inservible antes de empezar la jornada', stage: 'C', explain: 'C · CLASIFICAR: separar lo útil de lo innecesario.' },
    { item: 'Colocar cada pico, palana y manguera en su soporte rotulado después del uso', stage: 'O', explain: 'O · ORDENAR: un lugar definido para cada cosa.' },
    { item: 'Limpiar polvo, restos vegetales y barro del área de vivero y botas al cerrar turno', stage: 'L', explain: 'L · LIMPIAR: mantener el área limpia e inspeccionar posibles fugas.' },
    { item: 'Demarcar zonas con conos, señalética de colores y cinta trimestral vigente', stage: 'P', explain: 'P · PREVENIR: estandarizar controles visuales para evitar errores.' },
    { item: 'Cumplir el orden y uso de tachos cada día sin esperar que el supervisor mire', stage: 'A', explain: 'A · AUTODISCIPLINA: sostener el hábito preventivo como cultura.' },
    { item: 'Separar bidones vacíos inoperativos del almacén para liberar pasadizos', stage: 'C', explain: 'C · CLASIFICAR: eliminar elementos obsoletos del área.' },
    { item: 'Etiquetar estantes de EPP y ubicar el kit antiderrame en zona visible', stage: 'O', explain: 'O · ORDENAR: acceso rápido y señalizado.' },
    { item: 'Lavar losa de mezcla y revisar que no haya goteos en válvulas HDPE', stage: 'L', explain: 'L · LIMPIAR: la limpieza permite detectar fugas temprano.' },
    { item: 'Aplicar listas de verificación estándar y colores NTP 900.058 en acopios', stage: 'P', explain: 'P · PREVENIR: estandarización visual en todo el frente.' },
    { item: 'Corregir en el acto una manguera suelta y fomentar el ejemplo en tu cuadrilla', stage: 'A', explain: 'A · AUTODISCIPLINA: cultura constante del equipo.' },
    { item: 'Desechar maderas astilladas y alambres sueltos acumulados en esquina del vivero', stage: 'C', explain: 'C · CLASIFICAR: retirar lo que no sirve para la labor.' },
    { item: 'Alinear botas y cascos en el perchero asignado al término de la guardia', stage: 'O', explain: 'O · ORDENAR: cada EPP en su ubicación designada.' }
  ];

  const SORT_CINTAS_ITEMS = [
    { item: 'Inspección trimestral de herramientas: Enero – Febrero – Marzo', code: 'VERDE', explain: 'RISSO Anexo N° 4: Primer trimestre (Ene–Mar) lleva cinta VERDE.' },
    { item: 'Inspección trimestral de herramientas: Abril – Mayo – Junio', code: 'AMARILLO', explain: 'RISSO Anexo N° 4: Segundo trimestre (Abr–Jun) lleva cinta AMARILLA.' },
    { item: 'Inspección trimestral de herramientas: Julio – Agosto – Septiembre', code: 'ROJO', explain: 'RISSO Anexo N° 4: Tercer trimestre (Jul–Set) lleva cinta ROJA.' },
    { item: 'Inspección trimestral de herramientas: Octubre – Noviembre – Diciembre', code: 'BLANCO', explain: 'RISSO Anexo N° 4: Cuarto trimestre (Oct–Dic) lleva cinta BLANCA.' },
    { item: 'Delimitar borde de talud >= 1.80 m con peligro grave de caída o prohibición de paso', code: 'CINTA_ROJA', explain: 'SST_EST_015: La cinta ROJA delimita peligro grave y prohíbe el ingreso sin autorización.' },
    { item: 'Delimitar perímetro de advertencia donde solo se permite paso con precaución y EPP', code: 'CINTA_AMARILLA', explain: 'SST_EST_015: La cinta AMARILLA advierte peligro y exige precaución al transitar.' },
    { item: 'Herramienta con mango partido hallada durante check list preoperacional', code: 'RETIRAR', explain: 'RISSO & COLPA: Retirar de servicio de inmediato y rotular como inoperativa.' },
    { item: 'Uso obligatorio de casco, lentes o arnés en cartel de seguridad (SST_EST_015)', code: 'AZUL_OBLIG', explain: 'NTP 399.010-1 / SST_EST_015: El color AZUL indica obligación de uso.' },
    { item: 'Señalización de rutas de evacuación, punto de reunión o ubicación de botiquín', code: 'VERDE_COND', explain: 'NTP 399.010-1: El color VERDE identifica evacuación, botiquines y condición segura.' },
    { item: 'Ubicación de extintores PQS/CO2 y pulsadores de emergencia contra incendios', code: 'ROJO_FUEGO', explain: 'SST_EST_015 / SST_EST_019: El color ROJO señala equipos contra incendios.' }
  ];

  /* -------------------- 3 GEOMETRICALLY VERIFIED CROSSWORD BOARDS -------------------- */
  const CROSSWORD_BOARDS = [
    {
      id: 'cw-normas',
      title: 'Tablero 1 · Normas y Herramientas SSOMA',
      subtitle: 'Completa las 6 siglas clave de reglamentos, estándares y herramientas diarias.',
      rows: 5,
      cols: 11,
      cells: [
        ['', '', 'M', '', 'C', '', '', '', 'I', '', ''],
        ['R', 'I', 'S', 'S', 'O', '', '', '', 'P', 'A', 'S'],
        ['', '', 'D', '', 'L', '', '', '', 'E', '', ''],
        ['', '', 'S', '', 'P', 'E', 'T', 'A', 'R', '', ''],
        ['', '', '', '', 'A', '', '', '', 'C', '', '']
      ],
      clues: [
        { dir: 'Horizontal · Fila 2', word: 'RISSO', clue: 'Reglamento Interno de Seguridad y Salud Ocupacional (siglas).' },
        { dir: 'Vertical · Col 3', word: 'MSDS', clue: 'Hoja de seguridad de 16 ítems obligatoria antes de usar pesticidas.' },
        { dir: 'Vertical · Col 5', word: 'COLPA', clue: 'Metodología 5S de Clasificación, Orden, Limpieza, Prevención y Autodisciplina.' },
        { dir: 'Horizontal · Fila 4', word: 'PETAR', clue: 'Permiso Escrito de Trabajo de Alto Riesgo (obligatorio desde 1.80 m).' },
        { dir: 'Vertical · Col 9', word: 'IPERC', clue: 'Matriz y herramienta diaria para identificar peligros y evaluar riesgos.' },
        { dir: 'Horizontal · Fila 2 (der.)', word: 'PAS', clue: 'Método de respuesta ante emergencias: Proteger, Alertar y Socorrer.' }
      ]
    },
    {
      id: 'cw-campo',
      title: 'Tablero 2 · Operaciones en Campo y Medio Ambiente',
      subtitle: 'Términos clave de PMA, RIMA, riego, poda, protección y trabajos en altura.',
      rows: 6,
      cols: 10,
      cells: [
        ['R', 'I', 'M', 'A', '', '', '', '', '', ''],
        ['I', '', '', 'G', '', '', '', '', '', ''],
        ['E', '', '', 'U', '', '', '', '', '', ''],
        ['G', '', '', 'A', 'R', 'N', 'E', 'S', '', 'P'],
        ['O', '', '', '', '', '', 'P', '', '', 'M'],
        ['', '', '', '', '', '', 'P', 'O', 'D', 'A']
      ],
      clues: [
        { dir: 'Horizontal · Fila 1', word: 'RIMA', clue: 'Reglamento Interno de Medio Ambiente vigente en SGAE.' },
        { dir: 'Vertical · Col 1', word: 'RIEGO', clue: 'Labor de suministro controlado de agua con líneas HDPE o aspersión.' },
        { dir: 'Vertical · Col 4', word: 'AGUA', clue: 'Recurso natural crítico que cuidamos evitando fugas y escurrimientos.' },
        { dir: 'Horizontal · Fila 4', word: 'ARNES', clue: 'Equipo de protección contra caídas obligatorio en taludes >= 1.80 m (sin tilde).' },
        { dir: 'Vertical · Col 7', word: 'EPP', clue: 'Equipo de Protección Personal elegido según la exposición de la tarea.' },
        { dir: 'Horizontal · Fila 6', word: 'PODA', clue: 'Corte y perfilado seguro de ramas o áreas verdes delimitando 15 m.' },
        { dir: 'Vertical · Col 10', word: 'PMA', clue: 'Plan de Manejo Ambiental que identifica aspectos, impactos y controles.' }
      ]
    },
    {
      id: 'cw-controles',
      title: 'Tablero 3 · Controles Críticos y Normativa Perú',
      subtitle: 'Bloqueo de energías, observaciones, cintas trimestrales, autoridad agrícola y cultura.',
      rows: 7,
      cols: 9,
      cells: [
        ['', '', '', 'L', 'O', 'T', 'O', '', ''],
        ['', '', '', '', 'P', '', '', '', ''],
        ['', 'C', 'I', 'N', 'T', 'A', '', '', ''],
        ['', 'A', '', '', '', '', '', '', ''],
        ['', 'S', 'E', 'N', 'A', 'S', 'A', '', ''],
        ['', 'C', '', '', '', 'G', '', '', ''],
        ['', 'O', '', '', 'V', 'I', 'D', 'A', '']
      ],
      clues: [
        { dir: 'Horizontal · Fila 1', word: 'LOTO', clue: 'Regla de Oro de bloqueo y etiquetado para aislar energías antes de intervenir equipos.' },
        { dir: 'Vertical · Col 5', word: 'OPT', clue: 'Observación Planeada de Tarea aplicada en Disciplina Operativa (siglas).' },
        { dir: 'Horizontal · Fila 3', word: 'CINTA', clue: 'Distintivo de color trimestral (Verde, Amarillo, Rojo, Blanco) en herramientas.' },
        { dir: 'Vertical · Col 2', word: 'CASCO', clue: 'Protector rígido con barbiquejo obligatorio para la cabeza en campo.' },
        { dir: 'Horizontal · Fila 5', word: 'SENASA', clue: 'Autoridad sanitaria del Perú que regula pesticidas y bandas toxicológicas.' },
        { dir: 'Vertical · Col 6', word: 'SGI', clue: 'Siglas del Sistema de Gestión Integrado (documentación SSOMAC).' },
        { dir: 'Horizontal · Fila 7', word: 'VIDA', clue: 'Valor supremo que protegemos al aplicar la Regla de Oro de decir NO ("Lo que cobra ____ aquí").' }
      ]
    }
  ];

  /* -------------------- 12 VARIED SCENARIOS FOR "¿QUÉ HARÍAS TÚ?" -------------------- */
  const WHAT_WOULD_YOU_DO = [
    {
      badge: '9 REGLAS DE ORO · SST-EST-005',
      title: 'Frente con terreno húmedo y talud inestable',
      situation: 'Llegas con tu cuadrilla a plantar en una ladera luego de lluvia intensa. Observas grietas en la parte alta del talud y material suelto.',
      choices: [
        { label: 'Detener la actividad, aplicar la Regla de Oro (derecho a decir NO), señalizar el borde y reportar al supervisor para reevaluar el IPERC.', ok: true, fb: '¡Decisión correcta! Ninguna meta productiva está por encima de tu vida. El supervisor debe autorizar controles antes de ingresar.' },
        { label: 'Ingresar rápido solo por 20 minutos para completar la cuota de hoyones antes del almuerzo.', ok: false, fb: 'Incorrecto. Trabajar bajo un talud inestable viola las 9 Reglas de Oro y expone a la cuadrilla a sepultamiento.' }
      ]
    },
    {
      badge: 'BOTIQUINES · SST_EST_020',
      title: 'Botiquín de campo cerrado con candado',
      situation: 'Al realizar el check list preoperacional notas que el botiquín portátil del frente fue asegurado con candado y no tiene llave a la mano.',
      choices: [
        { label: 'Dejarlo así para que no se pierdan las gasas y avisar la otra semana.', ok: false, fb: 'Incorrecto. En una emergencia médica cada segundo cuenta.' },
        { label: 'Retirar el candado o exigir reposición inmediata con precinto de fácil apertura según SST_EST_020 y verificar vencimientos.', ok: true, fb: '¡Exacto! El Estándar de Botiquines prohíbe candados para garantizar acceso inmediato sin demoras.' }
      ]
    },
    {
      badge: 'EMERGENCIAS · MÉTODO PAS',
      title: 'Compañero sufre corte con herramienta durante poda',
      situation: 'Un compañero se corta el antebrazo y cae cerca de una motoguadaña aún encendida.',
      choices: [
        { label: '1° Apagar el equipo y asegurar el área (Proteger) · 2° Llamar por radio con la cartilla de la sede (Alertar) · 3° Colocarse guantes y hacer presión limpia con gasa (Socorrer).', ok: true, fb: '¡Perfecto! Aplicaste el orden exacto P-A-S protegiendo primero al auxiliador y dando datos precisos a la brigada.' },
        { label: 'Correr sin guantes y mover de golpe al herido dejando la máquina encendida.', ok: false, fb: 'Peligroso. Siempre protege primero el entorno y protégete con guantes antes de atender.' }
      ]
    },
    {
      badge: 'PESTICIDAS · RIMA & MSDS',
      title: 'Envase trasvasado sin etiqueta ni Hoja MSDS',
      situation: 'Encuentras en almacén temporal un envase de plástico común (botella de bebida) con líquido verdoso sin rótulo ni Hoja MSDS.',
      choices: [
        { label: 'Prohibido usar o trasvasar químicos en envases de bebidas. Inmovilizar el envase, notificar al supervisor y consultar el procedimiento/MSDS.', ok: true, fb: '¡Correcto! Trasvasar pesticidas en envases de consumo humano genera riesgo mortal de intoxicación.' },
        { label: 'Oler el contenido para adivinar qué producto es y aplicarlo igual.', ok: false, fb: 'Nunca inhales ni uses productos sin etiqueta oficial SENASA ni FDS/MSDS confirmada.' }
      ]
    },
    {
      badge: 'DISCIPLINA OPERATIVA · SST-EST-004',
      title: 'Herramienta hechiza en frente de obra',
      situation: 'Un compañero trae un pico con mango rajado amarrado con alambre y sin cinta de inspección trimestral.',
      choices: [
        { label: 'Usarlo con cuidado solo por hoy mientras llega otro.', ok: false, fb: 'Incorrecto. El RISSO y SST-EST-004 prohíben herramientas hechizas o defectuosas.' },
        { label: 'Retirarla de inmediato del área de trabajo como herramienta inoperativa y solicitar reemplazo inspeccionado con cinta del trimestre.', ok: true, fb: '¡Muy bien! Así evitas desprendimientos de cabeza metálica y lesiones graves.' }
      ]
    },
    {
      badge: 'ALTURA · SST_EST_010',
      title: 'Poda de rama alta a 2.30 metros sin arnés',
      situation: 'Para podar una rama a 2.30 m de altura te piden subir a una escalera sin línea de vida ni PETAR porque "solo toma dos minutos".',
      choices: [
        { label: 'Rechazar realizar el trabajo en altura sin PETAR, arnés con doble línea de vida y punto de anclaje evaluado (aplica desde 1.80 m).', ok: true, fb: '¡Excelente! La norma SST_EST_010 no hace excepciones por duración: desde 1.80 m el PETAR y arnés son obligatorios.' },
        { label: 'Subir rápido mientras otro trabajador sujeta la escalera desde abajo.', ok: false, fb: 'Incorrecto. Una caída desde 2.30 m sin sistema anticaídas puede ser fatal.' }
      ]
    },
    {
      badge: 'SALUD OCUPACIONAL · RISSO UV',
      title: 'Compañero con mareo y sudoración por calor',
      situation: 'A las 13:30 h en campo abierto sin sombra, un compañero deja de sudar, siente mareos y confusión al plantar.',
      choices: [
        { label: 'Pedirle que aguante 30 minutos más hasta completar el surco.', ok: false, fb: 'Peligroso. Son señales de golpe de calor; continuar trabajando pone en riesgo su vida.' },
        { label: 'Detener la labor, llevarlo a sombra, hidratar poco a poco si está consciente, refrescarlo y activar la cartilla médica/PAS de la sede.', ok: true, fb: '¡Bien actuado! Identificar síntomas tempranos de estrés térmico evita emergencias mayores.' }
      ]
    },
    {
      badge: 'BIODIVERSIDAD · RIMA & PMA',
      title: 'Hallazgo de serpiente o fauna silvestre en vivero',
      situation: 'Al levantar una manta en el vivero descubres una serpiente silvestre enroscada en el área de paso.',
      choices: [
        { label: 'Retirarse con calma manteniendo distancia, delimitar el punto para evitar que alguien pase y reportar a Gestión Ambiental para reubicación segura.', ok: true, fb: '¡Correcto! El RIMA prohíbe capturar, golpear o manipular fauna silvestre sin personal competente.' },
        { label: 'Intentar atraparla con un palo o sacarla con las manos.', ok: false, fb: 'Incorrecto. Provocar o manipular fauna aumenta el riesgo de mordedura y afecta el entorno.' }
      ]
    },
    {
      badge: 'EXTINTORES · SST_EST_019',
      title: 'Extintor con manómetro en rojo en caseta',
      situation: 'Durante el check list ves un extintor PQS con la aguja del manómetro en la zona roja de descarga y con la tarjeta vencida.',
      choices: [
        { label: 'Reportar de inmediato para su recarga y reemplazo por un equipo operativo antes de autorizar trabajos cerca de combustible.', ok: true, fb: '¡Exacto! Un extintor despresurizado no sirve ante un amago de incendio.' },
        { label: 'Dejarlo en la caseta hasta la auditoría anual.', ok: false, fb: 'Incorrecto. Todos los equipos de emergencia deben estar 100% operativos en todo turno.' }
      ]
    },
    {
      badge: 'INVESTIGACIÓN · SST-EST-007',
      title: 'Incidente leve al manipular motoguadaña',
      situation: 'Una piedra proyectada rompe los lentes de seguridad de un operario (sin lesionar su ojo). Otro compañero sugiere barrer la piedra y no avisar.',
      choices: [
        { label: 'Reportar el incidente/cuasi-accidente de inmediato al supervisor, preservar las condiciones para el análisis PEEPO y cambiar los lentes.', ok: true, fb: '¡Muy bien! Reportar incidentes sin lesión permite corregir la causa raíz (guarda o delimitación) antes de un daño grave.' },
        { label: 'Cambiar de lentes en silencio para no quedar mal en las estadísticas.', ok: false, fb: 'Ocultar incidentes impide corregir peligros reales para otros compañeros.' }
      ]
    },
    {
      badge: 'SEÑALIZACIÓN · SST_EST_015',
      title: 'Ingreso a zona delimitada con cinta ROJA',
      situation: 'Necesitas recoger una palana que quedó dentro de un sector delimitado con cinta ROJA porque hay rocas sueltas arriba.',
      choices: [
        { label: 'Agacharse por debajo de la cinta 5 segundos para sacar la palana sin decir nada.', ok: false, fb: 'Prohibido. La cinta ROJA restringe absolutamente el paso por peligro grave; nadie cruza sin autorización del responsable.' },
        { label: 'Respetar la cinta roja, no cruzar y coordinar con el supervisor encargado de la zona segura.', ok: true, fb: '¡Correcto! La cinta roja exige permiso expreso tras verificar condiciones seguras.' }
      ]
    },
    {
      badge: 'RESIDUOS · NTP 900.058',
      title: 'Restos de aceite hidráulico en bandeja de campo',
      situation: 'Tras revisar una motobomba queda medio litro de aceite usado y un trapo empapado sobre la bandeja antiderrame.',
      choices: [
        { label: 'Verter el aceite al suelo seco detrás de unas piedras para que lo absorba la tierra.', ok: false, fb: 'Inaceptable. Contaminar el suelo incumple el RIMA y la legislación ambiental peruana.' },
        { label: 'Envasar el aceite usado en bidón rotulado y depositar el trapo contaminado en el Cilindro ROJO de residuos peligrosos.', ok: true, fb: '¡Perfecto! Así evitas contaminación del suelo y aguas subterráneas.' }
      ]
    }
  ];

  const WEEKLY_CRITICAL_CASE = {
    weekTitle: 'Caso Crítico de la Semana · Control Integrado en Vivero y Talud',
    scenario: 'Una cuadrilla debe aplicar un producto fitosanitario en plantones ubicados al pie de un talud tras lluvia ligera. Uno de los envases no tiene bandeja antiderrame y la cinta del trimestre en la mochila pulverizadora venció ayer.',
    question: '¿Cuál es la secuencia obligatoria según el RISSO, PMA y PETS antes de iniciar?',
    options: [
      'Detener el inicio, actualizar la inspección trimestral, colocar bandeja antiderrame, revisar la Hoja MSDS (16 ítems) en ECOGUÍA, verificar estabilidad del talud en el IPERC Continuo y usar EPP químico.',
      'Aplicar solo la mitad de la dosis para avanzar más rápido y regularizar la cinta y el IPERC al cierre de la tarde.',
      'Mezclar el insumo directo en el suelo alejado 1 metro del vivero sin consultar la MSDS.'
    ],
    correct: 0,
    explanation: '¡Reto semanal superado! La prevención exige validar controles ANTES de empezar: herramientas/equipos inspeccionados, bandeja antiderrame, FDS/MSDS consultada e IPERC Continuo firmado en campo.'
  };

  /* -------------------- GAME STATE & ANTI-REPETITION TRACKING -------------------- */
  let activeGameTab = 'ruleta';
  let wheelRotation = 0;
  let wheelSpinning = false;
  let activeWheelQuestion = null;
  const seenWheelByTopic = {};

  let activeHazardSceneIdx = 0;
  const foundHazards = {};

  let sortMode = 'residuos';
  let sortRoundDeck = [];
  let sortIdx = 0;
  let sortScore = 0;
  const seenSortByMode = {
    residuos: new Set(),
    colpa: new Set(),
    cintas: new Set()
  };

  let activeCrosswordIdx = 0;
  const crosswordAnswersByBoard = {};

  let scenarioIdx = 0;
  let scenarioSolved = {};

  let blitzQuestions = [];
  let blitzIdx = 0;
  let blitzScore = 0;
  let blitzAnswered = false;
  const seenBlitzQuestions = new Set();

  function getSortSource(mode) {
    if (mode === 'colpa') return SORT_COLPA_ITEMS;
    if (mode === 'cintas') return SORT_CINTAS_ITEMS;
    return SORT_RESIDUOS_ITEMS;
  }

  function dealNewSortRound(mode) {
    const source = getSortSource(mode);
    if (!seenSortByMode[mode]) seenSortByMode[mode] = new Set();
    sortRoundDeck = pickUnseenItems(source, seenSortByMode[mode], 6, it => it.item);
    sortIdx = 0;
    sortScore = 0;
  }

  function buildGameModalMarkup() {
    return `<div class="sgae-modal-backdrop" id="sgaeGameModal" hidden role="dialog" aria-modal="true" aria-label="Centro de Juegos Interactivos SGAE GAME">
      <div class="sgae-modal-shell">
        <header class="sgae-modal-head">
          <div>
            <span class="sgae-modal-kicker">APRENDE JUGANDO · TODA LA DOCUMENTACIÓN SGAE</span>
            <h2>SGAE GAME · Juegos Interactivos SSOMA</h2>
          </div>
          <div class="sgae-modal-actions">
            <button type="button" class="btn btn-outline btn-sm" id="sgaeSoundToggle">${soundEnabled ? '🔊 Sonido ON' : '🔇 Silencio'}</button>
            <button type="button" class="btn btn-quiet btn-sm" id="sgaeGameClose">Cerrar ✕</button>
          </div>
        </header>
        <nav class="sgae-game-tabs" aria-label="Elegir juego">
          <button type="button" class="sgae-gtab ${activeGameTab === 'ruleta' ? 'is-active' : ''}" data-game-tab="ruleta">🎡 Ruleta SSOMA (40)</button>
          <button type="button" class="sgae-gtab ${activeGameTab === 'peligros' ? 'is-active' : ''}" data-game-tab="peligros">🔍 Encuentra el peligro (6)</button>
          <button type="button" class="sgae-gtab ${activeGameTab === 'clasifica' ? 'is-active' : ''}" data-game-tab="clasifica">♻ Clasifica Rápido (3 modos)</button>
          <button type="button" class="sgae-gtab ${activeGameTab === 'crucigrama' ? 'is-active' : ''}" data-game-tab="crucigrama">🧩 Crucigrama (3 tableros)</button>
          <button type="button" class="sgae-gtab ${activeGameTab === 'decisiones' ? 'is-active' : ''}" data-game-tab="decisiones">🧭 ¿Qué harías tú? (12)</button>
          <button type="button" class="sgae-gtab ${activeGameTab === 'relampago' ? 'is-active' : ''}" data-game-tab="relampago">⚡ Reto Relámpago</button>
        </nav>
        <div class="sgae-modal-body" id="sgaeGameStage"></div>
      </div>
    </div>`;
  }

  function renderWheelSvg() {
    const n = WHEEL_CATEGORIES.length;
    const cx = 150, cy = 150, r = 140;
    const step = (2 * Math.PI) / n;
    const slices = WHEEL_CATEGORIES.map((cat, i) => {
      const a0 = i * step - Math.PI / 2;
      const a1 = a0 + step;
      const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
      const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
      const mid = (a0 + a1) / 2;
      const tx = cx + (r * 0.62) * Math.cos(mid);
      const ty = cy + (r * 0.62) * Math.sin(mid);
      const rot = (mid * 180) / Math.PI;
      return `<path d="M${cx},${cy} L${x0.toFixed(1)},${y0.toFixed(1)} A${r},${r} 0 0,1 ${x1.toFixed(1)},${y1.toFixed(1)} Z" fill="${cat.color}" stroke="#ffffff" stroke-width="2"/>
        <text x="${tx.toFixed(1)}" y="${ty.toFixed(1)}" fill="#ffffff" font-size="9.5" font-weight="800" font-family="Manrope,sans-serif" text-anchor="middle" dominant-baseline="middle" transform="rotate(${rot.toFixed(1)} ${tx.toFixed(1)} ${ty.toFixed(1)})">${esc(cat.label)}</text>`;
    }).join('');

    return `<div class="wheel-wrap">
      <div class="wheel-pointer" aria-hidden="true">▼</div>
      <svg class="wheel-svg" id="sgaeWheelSvg" viewBox="0 0 300 300" style="transform:rotate(${wheelRotation}deg)">
        ${slices}
        <circle cx="150" cy="150" r="24" fill="#ffffff" stroke="#174739" stroke-width="4"/>
        <text x="150" y="152" text-anchor="middle" dominant-baseline="middle" font-size="10" font-weight="800" fill="#174739">SGAE</text>
      </svg>
    </div>`;
  }

  function renderGameStage() {
    const stage = document.getElementById('sgaeGameStage');
    if (!stage) return;

    if (activeGameTab === 'ruleta') {
      const totalSeen = Object.values(seenWheelByTopic).reduce((acc, s) => acc + s.size, 0);
      stage.innerHTML = `<div class="game-ruleta-grid">
        <div class="game-card-center">
          <h3>Ruleta del Conocimiento SSOMA</h3>
          <p>40 preguntas distintas sin repetición inmediata de Estándares, PETS, PMA, COLPA, Residuos, PAS y MSDS (${totalSeen}/40 vistas).</p>
          ${renderWheelSvg()}
          <button type="button" class="btn btn-primary" id="spinWheelBtn" ${wheelSpinning ? 'disabled' : ''}>${wheelSpinning ? 'Girando ruleta…' : '🎯 Girar Ruleta ahora'}</button>
        </div>
        <div class="game-question-panel" id="wheelQuestionBox">
          ${activeWheelQuestion ? `
            <span class="game-pill">${esc(activeWheelQuestion.catLabel)}</span>
            <h4>${esc(activeWheelQuestion.q)}</h4>
            <div class="game-options">
              ${activeWheelQuestion.opts.map((opt, idx) => `<button type="button" class="game-opt-btn" data-wheel-opt="${idx}">${esc(opt)}</button>`).join('')}
            </div>
            <div class="game-feedback" id="wheelFeedback"></div>
          ` : `
            <div class="game-empty-hint">
              <strong>¡40 escenarios distintos listos!</strong>
              <p>Presiona <b>"Girar Ruleta ahora"</b> para sortear una de las 8 áreas temáticas de toda la documentación oficial y sumar puntos al Reto Semanal.</p>
            </div>
          `}
        </div>
      </div>`;

      stage.querySelector('#spinWheelBtn')?.addEventListener('click', () => {
        if (wheelSpinning) return;
        wheelSpinning = true;
        ensureAudio();
        playSpinTicks();
        const btn = stage.querySelector('#spinWheelBtn');
        if (btn) { btn.disabled = true; btn.textContent = 'Girando ruleta…'; }

        const n = WHEEL_CATEGORIES.length;
        const chosenIndex = Math.floor(Math.random() * n);
        const wedgeAngle = 360 / n;
        const targetMod = (360 - (chosenIndex * wedgeAngle + wedgeAngle / 2) + 360) % 360;
        const currentMod = ((wheelRotation % 360) + 360) % 360;
        const delta = (targetMod - currentMod + 360) % 360;
        wheelRotation += 1080 + delta;

        const svg = stage.querySelector('#sgaeWheelSvg');
        if (svg) svg.style.transform = `rotate(${wheelRotation}deg)`;

        setTimeout(() => {
          wheelSpinning = false;
          const cat = WHEEL_CATEGORIES[chosenIndex];
          const pool = QUESTION_BANK[cat.topic] || [];
          if (!seenWheelByTopic[cat.topic]) seenWheelByTopic[cat.topic] = new Set();
          const [picked] = pickUnseenItems(pool, seenWheelByTopic[cat.topic], 1, item => item.q);
          activeWheelQuestion = { ...picked, catLabel: cat.label };
          playTone(620, 0.14, 'triangle', 0.22);
          renderGameStage();
        }, 2350);
      });

      stage.querySelectorAll('[data-wheel-opt]').forEach(btn => {
        btn.addEventListener('click', () => {
          if (!activeWheelQuestion) return;
          const idx = Number(btn.dataset.wheelOpt);
          const ok = idx === activeWheelQuestion.ok;
          const fb = stage.querySelector('#wheelFeedback');
          stage.querySelectorAll('[data-wheel-opt]').forEach(b => {
            b.disabled = true;
            b.classList.remove('is-ok', 'is-err');
          });
          btn.classList.add(ok ? 'is-ok' : 'is-err');
          if (ok) {
            playWinSound();
            window.sgaeTrackAction?.('game', 'ruleta');
            if (fb) fb.innerHTML = `<b style="color:#146b45">✓ ¡Correcto! (+25 pts)</b> · Referencia: ${esc(activeWheelQuestion.ref)}. ¡Gira de nuevo para recibir una nueva pregunta!`;
          } else {
            playWrongSound();
            if (fb) fb.innerHTML = `<b style="color:#b82520">✕ Revisa el documento:</b> ${esc(activeWheelQuestion.ref)}. Respuesta correcta: "${esc(activeWheelQuestion.opts[activeWheelQuestion.ok])}"`;
          }
        });
      });
      return;
    }

    if (activeGameTab === 'peligros') {
      const scene = HAZARD_SCENES[activeHazardSceneIdx] || HAZARD_SCENES[0];
      const foundSet = foundHazards[scene.id] || [];
      const allDone = foundSet.length >= scene.hotspots.length;
      stage.innerHTML = `<div class="game-hazards-wrap">
        <div class="game-subbar">
          <div>
            <h3>Encuentra el Peligro en Campo</h3>
            <p>${esc(scene.summary)}</p>
          </div>
          <div class="game-scene-pills">
            ${HAZARD_SCENES.map((sc, i) => `<button type="button" class="pas-tab ${i === activeHazardSceneIdx ? 'is-active' : ''}" data-scene-idx="${i}">Escena ${i + 1}${(foundHazards[sc.id]?.length || 0) >= sc.hotspots.length ? ' ✓' : ''}</button>`).join('')}
            <button type="button" class="btn btn-outline btn-sm" id="randomHazardSceneBtn">🎲 Aleatoria</button>
          </div>
        </div>
        <div class="hazard-stage-grid">
          <div class="hazard-canvas-box">
            <div class="hazard-canvas-head">
              <strong>${esc(scene.title)}</strong>
              <span class="game-pill">${foundSet.length} / ${scene.hotspots.length} encontrados</span>
            </div>
            <div class="hazard-svg-container">
              <svg viewBox="${scene.viewBox}" class="hazard-scene-svg">${scene.svg}</svg>
              ${scene.hotspots.map(h => {
                const isFound = foundSet.includes(h.id);
                return `<button type="button" class="hazard-hotspot ${isFound ? 'is-found' : ''}" style="left:${h.x}%;top:${h.y}%" data-hotspot-id="${h.id}" aria-label="${esc(h.label)}">${isFound ? '✓' : '!'}</button>`;
              }).join('')}
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap">
              <small class="hazard-ref-note">Base normativa: ${esc(scene.ruleRef)} · Toca cada marcador (!).</small>
              ${allDone ? `<button type="button" class="btn btn-primary btn-sm" id="nextHazardSceneBtn">Siguiente escena →</button>` : ''}
            </div>
          </div>
          <div class="hazard-findings-list">
            <h4>Peligros detectados en esta escena</h4>
            ${scene.hotspots.map(h => {
              const isFound = foundSet.includes(h.id);
              return `<article class="hazard-finding-card ${isFound ? 'is-found' : ''}">
                <strong>${isFound ? `✓ ${esc(h.label)}` : '🔒 Peligro oculto — tócalo en la escena'}</strong>
                <p>${isFound ? esc(h.rule) : 'Observa condiciones inseguras en personas, herramientas, químicos o entorno.'}</p>
              </article>`;
            }).join('')}
          </div>
        </div>
      </div>`;

      stage.querySelectorAll('[data-scene-idx]').forEach(btn => {
        btn.addEventListener('click', () => {
          playTone(460, 0.08, 'sine', 0.14);
          activeHazardSceneIdx = Number(btn.dataset.sceneIdx);
          renderGameStage();
        });
      });

      stage.querySelector('#randomHazardSceneBtn')?.addEventListener('click', () => {
        playTone(500, 0.09, 'triangle', 0.16);
        const others = HAZARD_SCENES.map((_, idx) => idx).filter(idx => idx !== activeHazardSceneIdx);
        activeHazardSceneIdx = others[Math.floor(Math.random() * others.length)] ?? 0;
        renderGameStage();
      });

      stage.querySelector('#nextHazardSceneBtn')?.addEventListener('click', () => {
        playTone(520, 0.08, 'triangle', 0.16);
        activeHazardSceneIdx = (activeHazardSceneIdx + 1) % HAZARD_SCENES.length;
        renderGameStage();
      });

      stage.querySelectorAll('[data-hotspot-id]').forEach(btn => {
        btn.addEventListener('click', () => {
          const hid = btn.dataset.hotspotId;
          if (!foundHazards[scene.id]) foundHazards[scene.id] = [];
          if (!foundHazards[scene.id].includes(hid)) {
            foundHazards[scene.id].push(hid);
            playTone(660, 0.12, 'triangle', 0.22);
            if (foundHazards[scene.id].length === scene.hotspots.length) {
              setTimeout(playWinSound, 120);
              window.sgaeTrackAction?.('game', `peligros-${scene.id}`);
            }
            renderGameStage();
          }
        });
      });
      return;
    }

    if (activeGameTab === 'clasifica') {
      if (!sortRoundDeck.length) dealNewSortRound(sortMode);
      const deck = sortRoundDeck;
      const done = sortIdx >= deck.length;
      const curr = deck[sortIdx];

      const modeInfo = {
        residuos: { title: 'Código de Colores NTP 900.058', sub: 'Selecciona en qué cilindro debe depositarse cada residuo de campo (6 casos aleatorios por ronda).' },
        colpa: { title: 'Las 5 Etapas COLPA', sub: 'Asocia cada hábito operativo de campo o taller con la etapa exacta de COLPA.' },
        cintas: { title: 'Cintas Trimestrales & Señalización', sub: 'Asigna el color de cinta trimestral RISSO Anexo N° 4 o señal SST_EST_015 correcto.' }
      }[sortMode];

      const choicesByMode = {
        residuos: [
          { k: 'MARRÓN', sub: 'Orgánicos', bg: '#6d4423' },
          { k: 'BLANCO', sub: 'Plástico', bg: '#738491' },
          { k: 'AZUL', sub: 'Papel/Cartón', bg: '#1d56a5' },
          { k: 'PLOMO', sub: 'Vidrio', bg: '#606c76' },
          { k: 'AMARILLO', sub: 'Metales', bg: '#b88b0b' },
          { k: 'NEGRO', sub: 'Generales', bg: '#262b30' },
          { k: 'ROJO', sub: 'Peligrosos', bg: '#b82520' }
        ],
        colpa: [
          { k: 'C', sub: 'Clasificar', bg: '#b87c14' },
          { k: 'O', sub: 'Ordenar', bg: '#9c6412' },
          { k: 'L', sub: 'Limpiar', bg: '#176b39' },
          { k: 'P', sub: 'Prevenir', bg: '#0b756c' },
          { k: 'A', sub: 'Autodisciplina', bg: '#1f4f82' }
        ],
        cintas: [
          { k: 'VERDE', sub: 'Ene–Mar', bg: '#176b39' },
          { k: 'AMARILLO', sub: 'Abr–Jun', bg: '#b57c0e' },
          { k: 'ROJO', sub: 'Jul–Set', bg: '#b82520' },
          { k: 'BLANCO', sub: 'Oct–Dic', bg: '#4e5f57' },
          { k: 'CINTA_ROJA', sub: 'Peligro grave', bg: '#9b1c1c' },
          { k: 'CINTA_AMARILLA', sub: 'Precaución', bg: '#b7791f' },
          { k: 'RETIRAR', sub: 'Inoperativa', bg: '#4b5563' },
          { k: 'AZUL_OBLIG', sub: 'Obligación EPP', bg: '#1d56a5' },
          { k: 'VERDE_COND', sub: 'Evacuación', bg: '#0b756c' },
          { k: 'ROJO_FUEGO', sub: 'Extintores', bg: '#c92a2a' }
        ]
      }[sortMode];

      stage.innerHTML = `<div class="game-sort-wrap">
        <div class="game-subbar">
          <div>
            <h3>Clasifica Rápido: ${esc(modeInfo.title)}</h3>
            <p>${esc(modeInfo.sub)}</p>
          </div>
          <div class="game-scene-pills">
            <button type="button" class="pas-tab ${sortMode === 'residuos' ? 'is-active' : ''}" data-sort-mode="residuos">♻ Residuos (16)</button>
            <button type="button" class="pas-tab ${sortMode === 'colpa' ? 'is-active' : ''}" data-sort-mode="colpa">🧹 COLPA 5S (12)</button>
            <button type="button" class="pas-tab ${sortMode === 'cintas' ? 'is-active' : ''}" data-sort-mode="cintas">🏷 Cintas & Señales (10)</button>
          </div>
        </div>

        ${done ? `
          <div class="game-complete-card">
            <span class="game-pill">¡RONDA COMPLETADA!</span>
            <h4>Obtuviste ${sortScore} / ${deck.length} aciertos en ${esc(modeInfo.title)}</h4>
            <p>Ya sumaste tu participación en <b>SGAE RETO</b>. Al volver a jugar recibirás elementos diferentes.</p>
            <button type="button" class="btn btn-primary" id="sortRestartBtn">Nueva ronda con otros casos ↻</button>
          </div>
        ` : `
          <div class="sort-card">
            <div class="sort-progress">Elemento ${sortIdx + 1} de ${deck.length} · Aciertos: <b>${sortScore}</b></div>
            <h4>${esc(curr.item)}</h4>
            <div class="sort-choices-grid">
              ${choicesByMode.map(b => `
                <button type="button" class="sort-choice-btn" style="--choice-bg:${b.bg}" data-sort-pick="${b.k}">
                  <strong>${b.k.replace('_', ' ')}</strong>
                  <span>${b.sub}</span>
                </button>
              `).join('')}
            </div>
            <div class="game-feedback" id="sortFeedback"></div>
          </div>
        `}
      </div>`;

      stage.querySelectorAll('[data-sort-mode]').forEach(btn => {
        btn.addEventListener('click', () => {
          playTone(460, 0.08, 'sine', 0.14);
          sortMode = btn.dataset.sortMode;
          dealNewSortRound(sortMode);
          renderGameStage();
        });
      });

      stage.querySelector('#sortRestartBtn')?.addEventListener('click', () => {
        playTone(540, 0.1, 'triangle', 0.18);
        dealNewSortRound(sortMode);
        renderGameStage();
      });

      stage.querySelectorAll('[data-sort-pick]').forEach(btn => {
        btn.addEventListener('click', () => {
          if (!curr) return;
          const pick = btn.dataset.sortPick;
          const expected = sortMode === 'residuos' ? curr.drum : sortMode === 'colpa' ? curr.stage : curr.code;
          const ok = pick === expected;
          const fb = stage.querySelector('#sortFeedback');
          stage.querySelectorAll('[data-sort-pick]').forEach(b => { b.disabled = true; });
          if (ok) {
            sortScore += 1;
            playTone(680, 0.12, 'triangle', 0.2);
            if (fb) fb.innerHTML = `<b style="color:#146b45">✓ ¡Exacto!</b> ${esc(curr.explain)}`;
          } else {
            playWrongSound();
            if (fb) fb.innerHTML = `<b style="color:#b82520">✕ Corresponde a ${esc(expected.replace('_', ' '))}:</b> ${esc(curr.explain)}`;
          }
          setTimeout(() => {
            sortIdx += 1;
            if (sortIdx >= deck.length) {
              playWinSound();
              window.sgaeTrackAction?.('game', `clasifica-${sortMode}`);
            }
            renderGameStage();
          }, 1150);
        });
      });
      return;
    }

    if (activeGameTab === 'crucigrama') {
      const board = CROSSWORD_BOARDS[activeCrosswordIdx] || CROSSWORD_BOARDS[0];
      if (!crosswordAnswersByBoard[board.id]) crosswordAnswersByBoard[board.id] = {};
      const boardAnswers = crosswordAnswersByBoard[board.id];

      let gridHtml = `<div class="crossword-grid" style="grid-template-columns:repeat(${board.cols}, 34px)">`;
      for (let r = 0; r < board.rows; r += 1) {
        for (let c = 0; c < board.cols; c += 1) {
          const expected = board.cells[r][c];
          const key = `${r}-${c}`;
          if (!expected) {
            gridHtml += '<div class="cw-block" aria-hidden="true"></div>';
          } else {
            const val = (boardAnswers[key] || '').toUpperCase();
            gridHtml += `<input class="cw-cell" maxlength="1" data-cw-key="${key}" data-cw-exp="${expected}" value="${esc(val)}" aria-label="Celda fila ${r + 1} columna ${c + 1}">`;
          }
        }
      }
      gridHtml += '</div>';

      stage.innerHTML = `<div class="game-cw-wrap">
        <div class="game-subbar">
          <div>
            <h3>Crucigrama Preventivo SGAE · ${esc(board.title)}</h3>
            <p>${esc(board.subtitle)}</p>
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            ${CROSSWORD_BOARDS.map((b, i) => `<button type="button" class="pas-tab ${i === activeCrosswordIdx ? 'is-active' : ''}" data-cw-board="${i}">Tablero ${i + 1}</button>`).join('')}
            <button type="button" class="btn btn-outline btn-sm" id="cwHintBtn">💡 Pista</button>
            <button type="button" class="btn btn-primary btn-sm" id="cwCheckBtn">Verificar ✓</button>
          </div>
        </div>
        <div class="cw-layout">
          <div class="cw-board-box">
            ${gridHtml}
            <div class="game-feedback" id="cwFeedback"></div>
          </div>
          <div class="cw-clues-box">
            <h4>Pistas del tablero ${activeCrosswordIdx + 1}</h4>
            <ul>
              ${board.clues.map(cl => `<li><b>${esc(cl.dir)} (${cl.word.length} letras):</b> ${esc(cl.clue)}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>`;

      stage.querySelectorAll('[data-cw-board]').forEach(btn => {
        btn.addEventListener('click', () => {
          playTone(460, 0.08, 'sine', 0.14);
          activeCrosswordIdx = Number(btn.dataset.cwBoard);
          renderGameStage();
        });
      });

      const cells = [...stage.querySelectorAll('.cw-cell')];
      cells.forEach((inp, idx) => {
        inp.addEventListener('input', () => {
          const clean = inp.value.replace(/[^a-zA-Z]/g, '').toUpperCase().slice(0, 1);
          inp.value = clean;
          inp.classList.remove('is-ok', 'is-err');
          boardAnswers[inp.dataset.cwKey] = clean;
          if (clean) {
            playTone(440 + (idx % 6) * 28, 0.04, 'sine', 0.1);
            if (cells[idx + 1]) cells[idx + 1].focus();
          }
        });
      });

      stage.querySelector('#cwHintBtn')?.addEventListener('click', () => {
        const pending = cells.find(c => (c.value || '').toUpperCase() !== c.dataset.cwExp);
        if (!pending) return;
        pending.value = pending.dataset.cwExp;
        boardAnswers[pending.dataset.cwKey] = pending.dataset.cwExp;
        pending.classList.add('is-ok');
        playTone(580, 0.1, 'triangle', 0.18);
      });

      stage.querySelector('#cwCheckBtn')?.addEventListener('click', () => {
        let right = 0;
        cells.forEach(inp => {
          const ok = (inp.value || '').toUpperCase() === inp.dataset.cwExp;
          inp.classList.toggle('is-ok', ok);
          inp.classList.toggle('is-err', !ok && inp.value !== '');
          if (ok) right += 1;
        });
        const fb = stage.querySelector('#cwFeedback');
        if (right === cells.length) {
          playWinSound();
          window.sgaeTrackAction?.('game', `crucigrama-${board.id}`);
          if (fb) fb.innerHTML = `<b style="color:#146b45">✓ ¡Tablero ${activeCrosswordIdx + 1} completo (${right}/${cells.length})!</b> Cambia al Tablero ${(activeCrosswordIdx + 1) % CROSSWORD_BOARDS.length + 1} para seguir practicando.`;
        } else {
          playWrongSound();
          if (fb) fb.innerHTML = `<b style="color:#b57c0e">${right} de ${cells.length} letras correctas.</b> Revisa las pistas o usa "💡 Pista".`;
        }
      });
      return;
    }

    if (activeGameTab === 'decisiones') {
      const sc = WHAT_WOULD_YOU_DO[scenarioIdx] || WHAT_WOULD_YOU_DO[0];
      const solvedCount = Object.values(scenarioSolved).filter(Boolean).length;
      stage.innerHTML = `<div class="game-decision-wrap">
        <div class="game-subbar">
          <div>
            <h3>¿Qué harías tú en campo?</h3>
            <p>12 situaciones reales basadas en Reglas de Oro, Botiquines, PAS, Altura, UV, Químicos y Disciplina Operativa.</p>
          </div>
          <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
            <span class="game-pill">${solvedCount} / ${WHAT_WOULD_YOU_DO.length} casos superados</span>
            <button type="button" class="btn btn-outline btn-sm" id="decRandomBtn">🎲 Caso aleatorio</button>
          </div>
        </div>
        <article class="decision-card">
          <span class="tool-meta-text">${esc(sc.badge)} · Caso ${scenarioIdx + 1} de ${WHAT_WOULD_YOU_DO.length}</span>
          <h4>${esc(sc.title)}</h4>
          <p class="decision-situation">${esc(sc.situation)}</p>
          <div class="game-options">
            ${sc.choices.map((ch, i) => `<button type="button" class="game-opt-btn" data-dec-idx="${i}">${esc(ch.label)}</button>`).join('')}
          </div>
          <div class="game-feedback" id="decisionFeedback"></div>
          <div class="decision-nav">
            <button type="button" class="btn btn-outline btn-sm" id="decPrevBtn" ${scenarioIdx === 0 ? 'disabled' : ''}>← Caso anterior</button>
            <button type="button" class="btn btn-primary btn-sm" id="decNextBtn">${scenarioIdx < WHAT_WOULD_YOU_DO.length - 1 ? 'Siguiente caso →' : 'Volver al caso 1 ↻'}</button>
          </div>
        </article>
      </div>`;

      stage.querySelector('#decRandomBtn')?.addEventListener('click', () => {
        playTone(490, 0.08, 'triangle', 0.16);
        const unsolved = WHAT_WOULD_YOU_DO.map((_, idx) => idx).filter(idx => !scenarioSolved[idx] && idx !== scenarioIdx);
        const pool = unsolved.length ? unsolved : WHAT_WOULD_YOU_DO.map((_, idx) => idx).filter(idx => idx !== scenarioIdx);
        scenarioIdx = pool[Math.floor(Math.random() * pool.length)] ?? 0;
        renderGameStage();
      });

      stage.querySelectorAll('[data-dec-idx]').forEach(btn => {
        btn.addEventListener('click', () => {
          const ch = sc.choices[Number(btn.dataset.decIdx)];
          const fb = stage.querySelector('#decisionFeedback');
          stage.querySelectorAll('[data-dec-idx]').forEach(b => b.classList.remove('is-ok', 'is-err'));
          btn.classList.add(ch.ok ? 'is-ok' : 'is-err');
          if (fb) fb.innerHTML = `<b style="color:${ch.ok ? '#146b45' : '#b82520'}">${ch.ok ? '✓' : '✕'}</b> ${esc(ch.fb)}`;
          if (ch.ok) {
            scenarioSolved[scenarioIdx] = true;
            playWinSound();
            if (Object.values(scenarioSolved).filter(Boolean).length >= 3) {
              window.sgaeTrackAction?.('game', 'decisiones');
            }
          } else {
            playWrongSound();
          }
        });
      });

      stage.querySelector('#decPrevBtn')?.addEventListener('click', () => {
        if (scenarioIdx > 0) {
          playTone(440, 0.07, 'sine', 0.12);
          scenarioIdx -= 1;
          renderGameStage();
        }
      });
      stage.querySelector('#decNextBtn')?.addEventListener('click', () => {
        playTone(480, 0.07, 'sine', 0.12);
        scenarioIdx = (scenarioIdx + 1) % WHAT_WOULD_YOU_DO.length;
        renderGameStage();
      });
      return;
    }

    /* Reto Relámpago (8 preguntas distintas por ronda de un banco de 40) */
    if (!blitzQuestions.length) {
      const flat = Object.entries(QUESTION_BANK).flatMap(([k, arr]) =>
        arr.map(item => ({ ...item, cat: WHEEL_CATEGORIES.find(w => w.topic === k)?.label || 'SSOMA' }))
      );
      blitzQuestions = pickUnseenItems(flat, seenBlitzQuestions, 8, it => it.q);
      blitzIdx = 0;
      blitzScore = 0;
      blitzAnswered = false;
    }

    if (blitzIdx >= blitzQuestions.length) {
      stage.innerHTML = `<div class="game-complete-card">
        <span class="game-pill">RETO RELÁMPAGO COMPLETADO</span>
        <h3>Puntaje final: ${blitzScore} / ${blitzQuestions.length}</h3>
        <p>${blitzScore >= 6 ? '¡Excelente dominio de toda la documentación SSOMA!' : 'Buen intento. Te recomendamos repasar los documentos en ECOGUÍA AL DÍA y probar una nueva ronda con preguntas distintas.'}</p>
        <button type="button" class="btn btn-primary" id="blitzRetryBtn">Nuevo Reto Relámpago (8 nuevas) ↻</button>
      </div>`;
      stage.querySelector('#blitzRetryBtn')?.addEventListener('click', () => {
        playTone(540, 0.1, 'triangle', 0.16);
        blitzQuestions = [];
        renderGameStage();
      });
      return;
    }

    const bq = blitzQuestions[blitzIdx];
    stage.innerHTML = `<div class="game-blitz-wrap">
      <div class="game-subbar">
        <div>
          <h3>Reto Relámpago · 40 Preguntas de Toda la Documentación</h3>
          <p>8 preguntas nuevas por partida sin repetir preguntas ya contestadas.</p>
        </div>
        <span class="game-pill">Pregunta ${blitzIdx + 1} / ${blitzQuestions.length} · Aciertos: ${blitzScore}</span>
      </div>
      <div class="blitz-bar"><div style="width:${Math.round(((blitzIdx + 1) / blitzQuestions.length) * 100)}%"></div></div>
      <article class="decision-card">
        <span class="tool-meta-text">${esc(bq.cat)} · ${esc(bq.ref)}</span>
        <h4>${esc(bq.q)}</h4>
        <div class="game-options">
          ${bq.opts.map((o, i) => `<button type="button" class="game-opt-btn" data-blitz-opt="${i}">${esc(o)}</button>`).join('')}
        </div>
        <div class="game-feedback" id="blitzFeedback"></div>
      </article>
    </div>`;

    stage.querySelectorAll('[data-blitz-opt]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (blitzAnswered) return;
        blitzAnswered = true;
        const ok = Number(btn.dataset.blitzOpt) === bq.ok;
        const fb = stage.querySelector('#blitzFeedback');
        btn.classList.add(ok ? 'is-ok' : 'is-err');
        if (ok) {
          blitzScore += 1;
          playTone(700, 0.13, 'triangle', 0.22);
          if (fb) fb.innerHTML = `<b style="color:#146b45">✓ ¡Correcto!</b> Referencia: ${esc(bq.ref)}`;
        } else {
          playWrongSound();
          if (fb) fb.innerHTML = `<b style="color:#b82520">✕ Repasa:</b> ${esc(bq.ref)}`;
        }
        setTimeout(() => {
          blitzIdx += 1;
          blitzAnswered = false;
          if (blitzIdx >= blitzQuestions.length) {
            playWinSound();
            window.sgaeTrackAction?.('game', 'relampago');
          }
          renderGameStage();
        }, 1050);
      });
    });
  }

  /* -------------------- SGAE RETO (WEEKLY CHALLENGE MODAL) -------------------- */
  function renderChallengeModalBody() {
    const body = document.getElementById('sgaeChallengeBody');
    if (!body) return;
    const { weekNo } = getWeekInfo();
    const { entry } = getOrInitWeeklyStats();
    const m = computeMissions(entry);
    const s = window.getSgaeSession?.();

    const dayLabels = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
    const activeCount = entry.daysActive.length;

    body.innerHTML = `<div class="reto-layout">
      <div class="reto-summary-banner">
        <div>
          <span class="sgae-modal-kicker">SEMANA ${weekNo} · PARTICIPACIÓN REAL</span>
          <h3>${s ? `${esc(s.name)} · ${esc(s.role)} (${esc(s.sede)})` : 'Identifícate en "Acceso usuarios" para registrar tu puesto'}</h3>
          <p>Este reto mide tu constancia y ganas de aprender en campo. Completa las 4 misiones semanales para alcanzar el nivel <b>Embajador Preventivo</b>.</p>
        </div>
        <div class="reto-score-badge tone-${m.levelTone}">
          <strong>${m.completed} / ${m.total}</strong>
          <span>Misiones</span>
          <small>${m.level} · ${entry.points} pts</small>
        </div>
      </div>

      <div class="reto-days-strip">
        <b>Frecuencia semanal (${activeCount} día${activeCount === 1 ? '' : 's'} activo${activeCount === 1 ? '' : 's'}):</b>
        <div class="reto-days-pills">
          ${dayLabels.map((dl, idx) => `<span class="${idx < activeCount ? 'is-on' : ''}">${dl}</span>`).join('')}
        </div>
      </div>

      <div class="reto-missions-grid">
        <article class="reto-mission ${m.talksCount >= 3 ? 'is-done' : ''}">
          <div>
            <span>MISIÓN 01 · CHARLAS DIARIAS</span>
            <h4>Revisar 3 Charlas diarias (${m.talksCount}/3)</h4>
            <p>Abre una charla diaria y confirma su revisión al final.</p>
          </div>
          <button type="button" class="btn btn-outline btn-sm" data-reto-go="calendar">Ir a charlas →</button>
        </article>

        <article class="reto-mission ${m.gamesCount >= 2 ? 'is-done' : ''}">
          <div>
            <span>MISIÓN 02 · SGAE GAME</span>
            <h4>Completar 2 Juegos distintos (${m.gamesCount}/2)</h4>
            <p>Juega la Ruleta, Encuentra el Peligro, Clasifica, Crucigrama o Reto Relámpago.</p>
          </div>
          <button type="button" class="btn btn-outline btn-sm" id="retoGoGamesBtn">Abrir juegos →</button>
        </article>

        <article class="reto-mission ${m.docsCount >= 1 ? 'is-done' : ''}">
          <div>
            <span>MISIÓN 03 · DOCUMENTACIÓN</span>
            <h4>Confirmar 1 Documento en ECOGUÍA (${m.docsCount}/1)</h4>
            <p>Lee un estándar, PETS, reglamento o PMA y aprueba su comprobación.</p>
          </div>
          <button type="button" class="btn btn-outline btn-sm" data-reto-go="library">Ir a ECOGUÍA →</button>
        </article>

        <article class="reto-mission ${m.challengeDone ? 'is-done' : ''}">
          <div>
            <span>MISIÓN 04 · CASO CRÍTICO</span>
            <h4>Resolver el Caso Semanal (${m.challengeDone ? '1/1' : '0/1'})</h4>
            <p>Responde correctamente el caso integrado de esta semana aquí abajo.</p>
          </div>
          <span class="game-pill">${m.challengeDone ? '✓ Superado' : '+35 pts'}</span>
        </article>
      </div>

      <section class="reto-case-box">
        <span class="tool-meta-text">${esc(WEEKLY_CRITICAL_CASE.weekTitle)}</span>
        <p class="reto-case-scenario">${esc(WEEKLY_CRITICAL_CASE.scenario)}</p>
        <h5>${esc(WEEKLY_CRITICAL_CASE.question)}</h5>
        <div class="game-options">
          ${WEEKLY_CRITICAL_CASE.options.map((opt, idx) => `<button type="button" class="game-opt-btn ${m.challengeDone && idx === WEEKLY_CRITICAL_CASE.correct ? 'is-ok' : ''}" data-reto-opt="${idx}">${esc(opt)}</button>`).join('')}
        </div>
        <div class="game-feedback" id="retoCaseFeedback">
          ${m.challengeDone ? `<b style="color:#146b45">✓</b> ${esc(WEEKLY_CRITICAL_CASE.explanation)}` : ''}
        </div>
      </section>
    </div>`;

    body.querySelectorAll('[data-reto-go]').forEach(btn => {
      btn.addEventListener('click', () => {
        closeChallengeModal();
        const page = btn.dataset.retoGo;
        document.querySelector(`header [data-page="${page}"]`)?.click();
      });
    });

    body.querySelector('#retoGoGamesBtn')?.addEventListener('click', () => {
      closeChallengeModal();
      window.openSgaeGames?.();
    });

    body.querySelectorAll('[data-reto-opt]').forEach(btn => {
      btn.addEventListener('click', () => {
        const ok = Number(btn.dataset.retoOpt) === WEEKLY_CRITICAL_CASE.correct;
        const fb = body.querySelector('#retoCaseFeedback');
        body.querySelectorAll('[data-reto-opt]').forEach(b => b.classList.remove('is-ok', 'is-err'));
        btn.classList.add(ok ? 'is-ok' : 'is-err');
        if (ok) {
          playWinSound();
          window.sgaeTrackAction?.('challenge', getWeekInfo().weekKey);
          if (fb) fb.innerHTML = `<b style="color:#146b45">✓</b> ${esc(WEEKLY_CRITICAL_CASE.explanation)}`;
        } else {
          playWrongSound();
          if (fb) fb.innerHTML = '<b style="color:#b82520">✕ No es seguro iniciar así.</b> Recuerda: primero se validan los controles preventivos completos.';
        }
      });
    });
  }

  function openGamesModal(tab) {
    if (tab) activeGameTab = tab;
    let modal = document.getElementById('sgaeGameModal');
    if (!modal) {
      document.body.insertAdjacentHTML('beforeend', buildGameModalMarkup());
      modal = document.getElementById('sgaeGameModal');

      modal.querySelector('#sgaeGameClose')?.addEventListener('click', () => { modal.hidden = true; });
      modal.addEventListener('click', ev => { if (ev.target === modal) modal.hidden = true; });
      modal.querySelector('#sgaeSoundToggle')?.addEventListener('click', ev => {
        soundEnabled = !soundEnabled;
        ev.currentTarget.textContent = soundEnabled ? '🔊 Sonido ON' : '🔇 Silencio';
        if (soundEnabled) {
          ensureAudio();
          playTone(587.33, 0.1, 'triangle', 0.22);
          setTimeout(() => playTone(880, 0.15, 'triangle', 0.24), 95);
        }
      });
      modal.querySelectorAll('[data-game-tab]').forEach(t => {
        t.addEventListener('click', () => {
          playTone(500, 0.06, 'sine', 0.12);
          activeGameTab = t.dataset.gameTab;
          modal.querySelectorAll('[data-game-tab]').forEach(x => x.classList.toggle('is-active', x === t));
          renderGameStage();
        });
      });
    }
    modal.querySelectorAll('[data-game-tab]').forEach(x => x.classList.toggle('is-active', x.dataset.gameTab === activeGameTab));
    modal.hidden = false;
    renderGameStage();
  }

  function openChallengeModal() {
    let modal = document.getElementById('sgaeChallengeModal');
    if (!modal) {
      document.body.insertAdjacentHTML('beforeend', `<div class="sgae-modal-backdrop" id="sgaeChallengeModal" hidden role="dialog" aria-modal="true" aria-label="Reto Semanal SGAE RETO">
        <div class="sgae-modal-shell">
          <header class="sgae-modal-head">
            <div>
              <span class="sgae-modal-kicker">RETO SEMANAL DE APRENDIZAJE Y FRECUENCIA</span>
              <h2>SGAE RETO · Compromiso Preventivo</h2>
            </div>
            <div class="sgae-modal-actions">
              <button type="button" class="btn btn-quiet btn-sm" id="sgaeChallengeClose">Cerrar ✕</button>
            </div>
          </header>
          <div class="sgae-modal-body" id="sgaeChallengeBody"></div>
        </div>
      </div>`);
      modal = document.getElementById('sgaeChallengeModal');
      modal.querySelector('#sgaeChallengeClose')?.addEventListener('click', closeChallengeModal);
      modal.addEventListener('click', ev => { if (ev.target === modal) closeChallengeModal(); });
    }
    renderChallengeModalBody();
    modal.hidden = false;
  }

  function closeChallengeModal() {
    const m = document.getElementById('sgaeChallengeModal');
    if (m) m.hidden = true;
  }

  window.openSgaeGames = openGamesModal;
  window.openSgaeChallenge = openChallengeModal;

  /* -------------------- FLOATING LAUNCHER DOCK -------------------- */
  let dockCollapsed = false;

  function updateDockProgress() {
    const { weekNo } = getWeekInfo();
    const { entry } = getOrInitWeeklyStats();
    const m = computeMissions(entry);
    const badge = document.getElementById('sgaeRetoDockMeta');
    if (badge) {
      badge.textContent = `Sem ${weekNo} · ${m.completed}/${m.total} misiones`;
    }
  }

  function ensureFloatingDock() {
    if (!document.getElementById('sgaeFloatingDock')) {
      document.body.insertAdjacentHTML('beforeend', `
        <aside class="sgae-floating-dock" id="sgaeFloatingDock" aria-label="Accesos rápidos de Reto Semanal y Juegos">
          <button type="button" class="sgae-dock-collapse" id="sgaeDockToggle" title="Minimizar o mostrar ventanas flotantes" aria-label="Minimizar o mostrar ventanas flotantes">− Ocultar</button>
          <div class="sgae-dock-cards" id="sgaeDockCards">
            <button type="button" class="sgae-float-btn is-reto" id="sgaeLaunchRetoBtn">
              <span class="sgae-float-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4Z"/><path d="M7 6H4v2a3 3 0 0 0 3 3M17 6h3v2a3 3 0 0 1-3 3"/></svg>
              </span>
              <span class="sgae-float-text">
                <strong>SGAE RETO</strong>
                <small id="sgaeRetoDockMeta">Reto semanal</small>
              </span>
            </button>
            <button type="button" class="sgae-float-btn is-game" id="sgaeLaunchGameBtn">
              <span class="sgae-float-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="4"/><path d="M6 12h4M8 10v4M15 11h.01M18 13h.01"/></svg>
              </span>
              <span class="sgae-float-text">
                <strong>SGAE GAME</strong>
                <small>6 juegos · Aprende</small>
              </span>
            </button>
          </div>
        </aside>
      `);

      document.getElementById('sgaeLaunchRetoBtn')?.addEventListener('click', openChallengeModal);
      document.getElementById('sgaeLaunchGameBtn')?.addEventListener('click', () => openGamesModal());
      document.getElementById('sgaeDockToggle')?.addEventListener('click', () => {
        dockCollapsed = !dockCollapsed;
        const cards = document.getElementById('sgaeDockCards');
        const btn = document.getElementById('sgaeDockToggle');
        if (cards) cards.hidden = dockCollapsed;
        if (btn) btn.textContent = dockCollapsed ? '🎮 Reto & Juegos' : '− Ocultar';
      });
    }

    document.querySelectorAll('[data-open-games]').forEach(btn => {
      if (btn.dataset.gamesBound === '1') return;
      btn.dataset.gamesBound = '1';
      btn.addEventListener('click', () => openGamesModal());
    });
    document.querySelectorAll('[data-open-challenge]').forEach(btn => {
      if (btn.dataset.challengeBound === '1') return;
      btn.dataset.challengeBound = '1';
      btn.addEventListener('click', openChallengeModal);
    });

    updateDockProgress();
  }

  /* -------------------- ENGAGEMENT TRACKER PANEL (DASHBOARD & INDICATORS) -------------------- */
  function refreshEngagementPanel() {
    ensureFloatingDock();
    const mount = document.getElementById('engagementTrackerPanel');
    if (!mount) return;

    const { weekKey, weekNo } = getWeekInfo();
    const { allLogs, entry } = getOrInitWeeklyStats();
    const m = computeMissions(entry);
    const s = window.getSgaeSession?.();
    const canSeeTeam = s && (s.role === 'Supervisor' || s.role === 'Gerente General');

    const weekEntries = Object.values(allLogs || {})
      .filter(item => item && item.weekKey === weekKey)
      .sort((a, b) => (b.points || 0) - (a.points || 0));

    mount.innerHTML = `<section class="panel engagement-panel">
      <div class="panel-title">
        <div>
          <h2>Seguimiento del Reto Semanal y Uso de Aprendizaje · Semana ${weekNo}</h2>
          <p style="margin:4px 0 0;font-size:11.5px;color:var(--muted)">Mide la frecuencia real de consulta en charlas diarias, documentos oficiales, juegos y caso semanal.</p>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button type="button" class="btn btn-outline btn-sm" id="panelOpenRetoBtn">Abrir SGAE RETO</button>
          <button type="button" class="btn btn-primary btn-sm" id="panelOpenGameBtn">Jugar en SGAE GAME</button>
        </div>
      </div>

      <div class="engagement-kpi-grid">
        <div class="stat-card"><span>Nivel semanal</span><strong>${esc(m.level)}</strong><small>${entry.points} puntos acumulados</small></div>
        <div class="stat-card"><span>Misiones cumplidas</span><strong>${m.completed} / ${m.total}</strong><small>Charlas · Juegos · Docs · Caso</small></div>
        <div class="stat-card"><span>Frecuencia semanal</span><strong>${entry.daysActive.length} día${entry.daysActive.length === 1 ? '' : 's'}</strong><small>Días distintos activos esta semana</small></div>
        <div class="stat-card"><span>Juegos completados</span><strong>${entry.gamesCompleted.length}</strong><small>${entry.challengeSolved ? 'Caso semanal resuelto ✓' : 'Caso semanal pendiente'}</small></div>
      </div>

      ${canSeeTeam ? `
        <div class="team-engagement-block">
          <div class="team-engagement-head">
            <div>
              <strong>Registro de Uso y Aprendizaje del Personal (${weekEntries.length} perfil${weekEntries.length === 1 ? '' : 'es'} en este equipo)</strong>
              <small>Vista habilitada para ${esc(s.role)} · Identifica quién utiliza la app con mayor frecuencia para aprender.</small>
            </div>
            <button type="button" class="btn btn-outline btn-sm" id="exportEngagementCsvBtn">Exportar seguimiento semanal CSV ↓</button>
          </div>
          <div class="team-engagement-table-wrap">
            <table class="team-engagement-table">
              <thead>
                <tr>
                  <th>Colaborador</th>
                  <th>Puesto / Sede</th>
                  <th>Días activos</th>
                  <th>Charlas</th>
                  <th>Docs</th>
                  <th>Juegos</th>
                  <th>Caso Semanal</th>
                  <th>Puntos / Nivel</th>
                </tr>
              </thead>
              <tbody>
                ${weekEntries.length ? weekEntries.map(row => {
                  const rm = computeMissions(row);
                  return `<tr>
                    <td><b>${esc(row.name)}</b></td>
                    <td>${esc(row.role)} · ${esc(row.sede)}</td>
                    <td>${(row.daysActive || []).length}</td>
                    <td>${(row.talksReviewed || []).length}</td>
                    <td>${(row.docsConfirmed || []).length}</td>
                    <td>${(row.gamesCompleted || []).length}</td>
                    <td>${row.challengeSolved ? '✓ Superado' : 'Pendiente'}</td>
                    <td><b>${row.points || 0}</b> · ${esc(rm.level)}</td>
                  </tr>`;
                }).join('') : '<tr><td colspan="8">Aún no hay actividad registrada esta semana.</td></tr>'}
              </tbody>
            </table>
          </div>
        </div>
      ` : ''}
    </section>`;

    mount.querySelector('#panelOpenRetoBtn')?.addEventListener('click', openChallengeModal);
    mount.querySelector('#panelOpenGameBtn')?.addEventListener('click', () => openGamesModal());
    mount.querySelector('#exportEngagementCsvBtn')?.addEventListener('click', () => {
      const headers = ['Semana', 'Colaborador', 'Cargo', 'Sede', 'Dias_Activos', 'Charlas', 'Documentos', 'Juegos', 'Caso_Semanal', 'Puntos', 'Nivel'];
      const rows = [
        headers,
        ...weekEntries.map(r => {
          const rm = computeMissions(r);
          return [
            r.weekKey,
            r.name,
            r.role,
            r.sede,
            (r.daysActive || []).length,
            (r.talksReviewed || []).length,
            (r.docsConfirmed || []).length,
            (r.gamesCompleted || []).length,
            r.challengeSolved ? 'Si' : 'No',
            r.points || 0,
            rm.level
          ];
        })
      ].map(cols => cols.map(v => `"${String(v ?? '').replaceAll('"', '""')}"`).join(',')).join('\n');

      const blob = new Blob([rows], { type: 'text/csv;charset=utf-8' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `seguimiento-reto-semanal-${weekKey}.csv`;
      a.click();
    });
  }

  window.sgaeRefreshTracker = refreshEngagementPanel;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      ensureFloatingDock();
      refreshEngagementPanel();
    });
  } else {
    ensureFloatingDock();
    refreshEngagementPanel();
  }
})();
