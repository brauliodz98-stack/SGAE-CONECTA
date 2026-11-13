import { existsSync } from 'node:fs';
import { readdir, readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';

const TOOL_EXTENSIONS = new Set(['.pdf', '.docx', '.doc', '.xlsx']);
const EMERGENCY_EXTENSIONS = new Set(['.pdf', '.jpg', '.jpeg', '.png', '.webp']);

const FOLDER_SOURCES = {
  estandares: ['assets/estandares', 'assets/estandar', 'assets/ESTANDARES', 'assets/ESTANDAR', 'estandares', 'estandar', 'ESTANDARES', 'ESTANDAR'],
  procedimientos: ['assets/procedimientos', 'assets/procedimiento', 'assets/PROCEDIMIENTOS', 'assets/PROCEDIMIENTO', 'procedimientos', 'procedimiento', 'PROCEDIMIENTOS', 'PROCEDIMIENTO'],
  reglamentos: ['assets/reglamentos', 'assets/reglamento', 'assets/REGLAMENTOS', 'assets/REGLAMENTO', 'reglamentos', 'reglamento', 'REGLAMENTOS', 'REGLAMENTO'],
  emergencias: ['assets/emergencias', 'assets/emergencia', 'assets/EMERGENCIAS', 'assets/EMERGENCIA', 'emergencias', 'emergencia', 'EMERGENCIAS', 'EMERGENCIA']
};

function prettifyTitle(filename) {
  const base = filename.replace(/\.[^.]+$/, '');
  return base
    .replace(/[_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function buildSmartToolEntry(folderKey, relWebPath, filename, ext) {
  const title = prettifyTitle(filename);
  const lower = title.toLowerCase();
  const format = ext.replace('.', '').toUpperCase();

  let purpose = '';
  let highlights = [];
  let goldenRule = '';
  let question = '';
  let answers = [];

  if (folderKey === 'estandares') {
    purpose = `Define los requisitos obligatorios mínimos de seguridad para "${title}" que todo trabajador y supervisor debe cumplir en campo.`;
    highlights = [
      { k: 'Requisitos antes de iniciar', v: 'Verifica autorizaciones, condiciones del área, señalización y EPP específico exigido por este estándar.' },
      { k: 'Controles de ejecución', v: 'Cumple las distancias, barreras físicas, permisos o bloqueos aplicables durante toda la jornada.' },
      { k: 'Verificación y reporte', v: 'Si un control falla o cambia el entorno, detén el trabajo e informa de inmediato al supervisor.' }
    ];
    goldenRule = `No inicies "${title}" si falta alguno de los requisitos críticos o permisos indicados en el estándar.`;
    question = `¿Qué corresponde hacer antes de ejecutar una labor cubierta por el estándar "${title}"?`;
    answers = [
      'Confirmar que el área, el personal autorizado y los controles exigidos por el estándar estén completos.',
      'Empezar primero para avanzar y revisar el estándar al terminar el turno.'
    ];
  } else if (folderKey === 'reglamentos') {
    purpose = `Establece las normas oficiales, deberes, prohibiciones y responsabilidades aplicables a "${title}" dentro de las operaciones de SGAE y el cliente minero.`;
    highlights = [
      { k: 'Derechos y deberes', v: 'Conoce tus obligaciones preventivas, uso obligatorio de EPP y el derecho a negarte a realizar trabajo inseguro.' },
      { k: 'Normas y prohibiciones', v: 'Respeta reglas de tránsito, orden, herramientas, reporte de incidentes y cuidado ambiental.' },
      { k: 'Reporte oportuno', v: 'Comunica cualquier acto o condición subestándar, incidente o emergencia sin demora al supervisor o SST.' }
    ];
    goldenRule = 'El cumplimiento del reglamento protege tu integridad y la de tu equipo en todo momento.';
    question = `Según "${title}", ¿qué debes hacer frente a una condición insegura que ponga en riesgo al equipo?`;
    answers = [
      'Detener la tarea de forma segura, resguardar el área y reportar de inmediato al supervisor o SST.',
      'Continuar normalmente sin avisar para evitar observaciones.'
    ];
  } else {
    purpose = `Detalla la secuencia paso a paso, herramientas y controles preventivos para ejecutar "${title}" de forma segura y sin incidentes.`;
    highlights = [
      { k: 'Preparación previa', v: 'Inspecciona EPP y herramientas con cinta de color vigente, delimita el área y completa el IPERC Continuo.' },
      { k: 'Secuencia segura', v: 'Sigue el orden de pasos establecido evitando atajos, posturas forzadas o exposición a línea de fuego.' },
      { k: 'Cierre de tarea', v: 'Deja el frente ordenado, segrega residuos generados y verifica el estado de equipos al concluir.' }
    ];
    goldenRule = `Sigue cada paso de "${title}" sin improvisar atajos ni operar equipos sin autorización.`;
    question = `Al aplicar el procedimiento "${title}", ¿cuál es la forma correcta de trabajar en campo?`;
    answers = [
      'Aplicar el paso a paso establecido, respetar delimitación y usar EPP y herramientas aptas.',
      'Saltar pasos para terminar más rápido aunque falte algún control.'
    ];
  }

  if (lower.includes('altura') || lower.includes('escalera') || lower.includes('andamio')) {
    highlights[0] = { k: 'Protección anticaídas', v: 'Inspecciona arnés, línea de vida, puntos de anclaje certificados y permiso para trabajos en altura (>1.80 m).' };
  } else if (lower.includes('quimic') || lower.includes('fitosanit') || lower.includes('matpel') || lower.includes('msds') || lower.includes('fds')) {
    highlights[1] = { k: 'Manejo químico seguro', v: 'Revisa la hoja FDS/MSDS, usa bandeja antiderrame, EPP químico y respeta dosis y ventilación.' };
  } else if (lower.includes('vehic') || lower.includes('transit') || lower.includes('conduc') || lower.includes('transporte')) {
    highlights[1] = { k: 'Tránsito y manejo defensivo', v: 'Respeta límites de velocidad, uso de cinturón, check list pre-uso, cuñas y comunicación radial.' };
  } else if (lower.includes('excav') || lower.includes('zanja') || lower.includes('talud')) {
    highlights[1] = { k: 'Estabilidad del terreno', v: 'Evalúa grietas, pendiente y entibado o señalización perimetral antes de ingresar o excavar.' };
  } else if (lower.includes('herramienta') || lower.includes('manual') || lower.includes('poder') || lower.includes('motosierra') || lower.includes('motoguada')) {
    highlights[0] = { k: 'Herramientas y equipos', v: 'Verifica cinta de inspección trimestral, guardas activas, distancia segura y EPP completo.' };
  }

  return {
    title,
    format,
    file: encodeURI(`./${relWebPath}`),
    downloadName: filename,
    purpose,
    highlights,
    goldenRule,
    question,
    answers,
    correct: 0,
    search: `${folderKey} ${title} ${lower}`
  };
}

function buildSmartEmergencyEntry(relWebPath, filename, ext, subfolderSede) {
  const title = prettifyTitle(filename);
  const sede = subfolderSede || title.replace(/^cartilla(\s+de)?(\s+emergencias?)?[\s\-–]*/i, '').trim() || 'Sede operativa';
  return {
    sede,
    title,
    format: ext.replace('.', '').toUpperCase(),
    file: encodeURI(`./${relWebPath}`),
    downloadName: filename,
    summary: `Cartilla oficial de comunicación y respuesta ante emergencias para la sede ${sede}.`
  };
}

async function scanDirectoryFiles(rootDir, dirRelPath, allowedExts, nestedSubdir = '') {
  const absDir = join(rootDir, dirRelPath);
  if (!existsSync(absDir)) return [];
  const entries = await readdir(absDir, { withFileTypes: true });
  const results = [];

  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;
    const childRel = `${dirRelPath}/${entry.name}`;
    if (entry.isDirectory()) {
      const deeper = await scanDirectoryFiles(
        rootDir,
        childRel,
        allowedExts,
        nestedSubdir || entry.name
      );
      results.push(...deeper);
    } else if (entry.isFile()) {
      const ext = extname(entry.name).toLowerCase();
      if (allowedExts.has(ext)) {
        results.push({ relWebPath: childRel, filename: entry.name, ext, subfolder: nestedSubdir });
      }
    }
  }
  return results;
}

export async function resolveDocsManifest(rootDir) {
  let baseManifest = { estandares: [], procedimientos: [], reglamentos: [], emergencias: [] };
  const manifestPath = join(rootDir, 'assets', 'docs-manifest.json');
  if (existsSync(manifestPath)) {
    try {
      const parsed = JSON.parse(await readFile(manifestPath, 'utf8'));
      baseManifest = {
        estandares: Array.isArray(parsed.estandares) ? [...parsed.estandares] : [],
        procedimientos: Array.isArray(parsed.procedimientos) ? [...parsed.procedimientos] : [],
        reglamentos: Array.isArray(parsed.reglamentos) ? [...parsed.reglamentos] : [],
        emergencias: Array.isArray(parsed.emergencias) ? [...parsed.emergencias] : []
      };
    } catch {
      // Fallback to empty structure if manifest JSON is invalid
    }
  }

  for (const [folderKey, dirs] of Object.entries(FOLDER_SOURCES)) {
    const existingList = baseManifest[folderKey];
    const knownFiles = new Set(existingList.map(item => decodeURI(String(item.file || '')).toLowerCase()));
    const knownDownloads = new Set(existingList.map(item => String(item.downloadName || '').toLowerCase()).filter(Boolean));
    const allowedExts = folderKey === 'emergencias' ? EMERGENCY_EXTENSIONS : TOOL_EXTENSIONS;

    for (const dirRel of dirs) {
      const found = await scanDirectoryFiles(rootDir, dirRel, allowedExts);
      for (const fileInfo of found) {
        const encodedRel = `./${fileInfo.relWebPath}`.toLowerCase();
        if (knownFiles.has(encodedRel) || knownDownloads.has(fileInfo.filename.toLowerCase())) continue;

        knownFiles.add(encodedRel);
        knownDownloads.add(fileInfo.filename.toLowerCase());
        if (folderKey === 'emergencias') {
          existingList.push(buildSmartEmergencyEntry(fileInfo.relWebPath, fileInfo.filename, fileInfo.ext, fileInfo.subfolder));
        } else {
          existingList.push(buildSmartToolEntry(folderKey, fileInfo.relWebPath, fileInfo.filename, fileInfo.ext));
        }
      }
    }
  }

  return baseManifest;
}

export const EXTRA_ROOT_DOC_DIRS = [
  'estandares',
  'estandar',
  'ESTANDARES',
  'ESTANDAR',
  'procedimientos',
  'procedimiento',
  'PROCEDIMIENTOS',
  'PROCEDIMIENTO',
  'reglamentos',
  'reglamento',
  'REGLAMENTOS',
  'REGLAMENTO',
  'emergencias',
  'emergencia',
  'EMERGENCIAS',
  'EMERGENCIA'
];
