import { existsSync } from 'node:fs';
import { readdir, readFile, stat } from 'node:fs/promises';
import { extname, join } from 'node:path';

const TOOL_EXTENSIONS = new Set(['.pdf', '.docx', '.doc', '.xlsx']);
const EMERGENCY_EXTENSIONS = new Set(['.pdf', '.jpg', '.jpeg', '.png', '.webp']);
const MSDS_EXTENSIONS = new Set(['.pdf', '.docx', '.doc', '.jpg', '.jpeg', '.png', '.webp']);

const FOLDER_SOURCES = {
  estandares: ['assets/estandares', 'assets/estandar', 'assets/ESTANDARES', 'assets/ESTANDAR', 'estandares', 'estandar', 'ESTANDARES', 'ESTANDAR'],
  procedimientos: ['assets/procedimientos', 'assets/procedimiento', 'assets/PROCEDIMIENTOS', 'assets/PROCEDIMIENTO', 'procedimientos', 'procedimiento', 'PROCEDIMIENTOS', 'PROCEDIMIENTO'],
  reglamentos: ['assets/reglamentos', 'assets/reglamento', 'assets/REGLAMENTOS', 'assets/REGLAMENTO', 'reglamentos', 'reglamento', 'REGLAMENTOS', 'REGLAMENTO'],
  emergencias: ['assets/emergencias', 'assets/emergencia', 'assets/EMERGENCIAS', 'assets/EMERGENCIA', 'emergencias', 'emergencia', 'EMERGENCIAS', 'EMERGENCIA'],
  msds: ['assets/msds', 'assets/MSDS', 'assets/hojas_msds', 'assets/HOJAS_MSDS', 'MSDS', 'msds', 'HOJAS_MSDS', 'hojas_msds']
};

function prettifyTitle(filename) {
  const base = filename.replace(/\.[^.]+$/, '');
  return base
    .replace(/[_-]+/g, ' ')
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
    purpose = `Requisitos obligatorios de seguridad para "${title}" en campo.`;
    highlights = [
      { k: 'Antes de iniciar', v: 'Verifica autorizaciones, condiciones del área, señalización y EPP específico.' },
      { k: 'Durante la tarea', v: 'Cumple distancias, barreras físicas, permisos o bloqueos aplicables.' },
      { k: 'Si algo cambia', v: 'Detén la labor si falla un control e informa de inmediato al supervisor.' }
    ];
    goldenRule = `No inicies "${title}" si falta algún requisito crítico o permiso.`;
    question = `¿Qué corresponde hacer antes de ejecutar una labor cubierta por el estándar "${title}"?`;
    answers = [
      'Confirmar área, personal autorizado y controles exigidos completos.',
      'Empezar primero y revisar el estándar al terminar el turno.'
    ];
  } else if (folderKey === 'reglamentos') {
    purpose = `Normas oficiales, deberes, prohibiciones y responsabilidades de "${title}".`;
    highlights = [
      { k: 'Derechos y deberes', v: 'Cumple tus obligaciones preventivas, usa tu EPP y di NO al trabajo inseguro.' },
      { k: 'Reglas en operación', v: 'Respeta tránsito, orden, herramientas con cinta vigente y cuidado ambiental.' },
      { k: 'Reporte inmediato', v: 'Comunica cualquier acto o condición subestándar sin demora.' }
    ];
    goldenRule = 'El cumplimiento del reglamento protege tu integridad y la de tu equipo.';
    question = `Según "${title}", ¿qué haces frente a una condición insegura sin controlar?`;
    answers = [
      'Detener la tarea, resguardar el área y reportar de inmediato al supervisor o SST.',
      'Continuar normalmente sin avisar.'
    ];
  } else {
    purpose = `Secuencia paso a paso y controles preventivos para "${title}".`;
    highlights = [
      { k: 'Preparación previa', v: 'Inspecciona EPP y herramientas con cinta trimestral, delimita el área y llena el IPERC Continuo.' },
      { k: 'Secuencia segura', v: 'Sigue cada paso establecido sin atajos ni exposición a línea de fuego.' },
      { k: 'Cierre de jornada', v: 'Deja el área ordenada y segrega los residuos según código de colores.' }
    ];
    goldenRule = `Sigue cada paso de "${title}" sin improvisar atajos.`;
    question = `Al aplicar "${title}", ¿cuál es la forma correcta de trabajar en campo?`;
    answers = [
      'Aplicar el paso a paso establecido, respetar delimitación y usar EPP apto.',
      'Saltar pasos para terminar más rápido.'
    ];
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

function buildSmartMsdsEntry(relWebPath, filename, ext, subfolder) {
  const title = prettifyTitle(filename);
  return {
    title,
    product: title.replace(/\b(msds|fds|hoja de seguridad|ficha de seguridad|safety data sheet)\b/gi, '').replace(/\s+/g, ' ').trim() || title,
    category: subfolder || 'Fumigación / Insumos químicos',
    format: ext.replace('.', '').toUpperCase(),
    file: encodeURI(`./${relWebPath}`),
    downloadName: filename,
    summary: `Hoja de seguridad (MSDS / FDS) disponible en la carpeta local de fumigación: ${filename}.`
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
      if (!allowedExts.has(ext)) continue;
      const info = await stat(join(rootDir, childRel));
      if (info.size === 0) continue;
      results.push({ relWebPath: childRel, filename: entry.name, ext, subfolder: nestedSubdir });
    }
  }
  return results;
}

export async function resolveDocsManifest(rootDir) {
  let baseManifest = { estandares: [], procedimientos: [], reglamentos: [], emergencias: [], msds: [] };
  const manifestPath = join(rootDir, 'assets', 'docs-manifest.json');
  if (existsSync(manifestPath)) {
    try {
      const parsed = JSON.parse(await readFile(manifestPath, 'utf8'));
      baseManifest = {
        estandares: Array.isArray(parsed.estandares) ? [...parsed.estandares] : [],
        procedimientos: Array.isArray(parsed.procedimientos) ? [...parsed.procedimientos] : [],
        reglamentos: Array.isArray(parsed.reglamentos) ? [...parsed.reglamentos] : [],
        emergencias: Array.isArray(parsed.emergencias) ? [...parsed.emergencias] : [],
        msds: Array.isArray(parsed.msds) ? [...parsed.msds] : []
      };
    } catch {
      // Fallback to empty structure if manifest JSON is invalid
    }
  }

  for (const [folderKey, dirs] of Object.entries(FOLDER_SOURCES)) {
    const existingList = baseManifest[folderKey];
    const knownFiles = new Set(existingList.map(item => decodeURI(String(item.file || '')).toLowerCase()));
    const knownDownloads = new Set(existingList.map(item => String(item.downloadName || '').toLowerCase()).filter(Boolean));
    const allowedExts = folderKey === 'emergencias'
      ? EMERGENCY_EXTENSIONS
      : folderKey === 'msds'
        ? MSDS_EXTENSIONS
        : TOOL_EXTENSIONS;

    for (const dirRel of dirs) {
      const found = await scanDirectoryFiles(rootDir, dirRel, allowedExts);
      for (const fileInfo of found) {
        const encodedRel = `./${fileInfo.relWebPath}`.toLowerCase();
        if (knownFiles.has(encodedRel) || knownDownloads.has(fileInfo.filename.toLowerCase())) continue;

        knownFiles.add(encodedRel);
        knownDownloads.add(fileInfo.filename.toLowerCase());
        if (folderKey === 'emergencias') {
          existingList.push(buildSmartEmergencyEntry(fileInfo.relWebPath, fileInfo.filename, fileInfo.ext, fileInfo.subfolder));
        } else if (folderKey === 'msds') {
          existingList.push(buildSmartMsdsEntry(fileInfo.relWebPath, fileInfo.filename, fileInfo.ext, fileInfo.subfolder));
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
  'EMERGENCIA',
  'MSDS',
  'msds',
  'HOJAS_MSDS',
  'hojas_msds'
];
