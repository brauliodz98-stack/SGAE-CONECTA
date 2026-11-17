import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { GoogleGenAI } from '@google/genai';
import { resolveDocsManifest } from './docs-catalog.mjs';

const PERUVIAN_AUTHORITATIVE_DOMAINS = [
  'senasa.gob.pe',
  'gob.pe',
  'midagri.gob.pe',
  'minagri.gob.pe',
  'digesa.minsa.gob.pe',
  'minam.gob.pe',
  'silvestre.com.pe',
  'farmex.com.pe',
  'farmagro.com.pe',
  'aris.com.pe',
  'tqc.com.pe',
  'agro.bayer.pe',
  'cropscience.bayer.pe',
  'bayer.com',
  'syngenta.com.pe',
  'syngenta.pe',
  'basf.com',
  'agro.basf.pe',
  'corteva.pe',
  'fmcperu.com',
  'adama.com',
  'upl-ltd.com',
  'hortus.com.pe',
  'serfi.biz',
  'agripac.com.pe'
];

const KNOWN_AGROCHEMICALS = [
  {
    aliases: ['thiodan', 'endosulfan', 'endosulfán', 'thionex'],
    productName: 'THIODAN (Endosulfán)',
    activeIngredient: 'Endosulfán (Insecticida / Acaricida organoclorado)',
    chemicalGroup: 'Insecticida Organoclorado · Ciclodieno',
    toxicologicalBand: 'Roja / Altamente Peligroso (Prohibido en Perú - SENASA)',
    hazardLevel: 'CRITICO',
    hazardLevelLabel: 'MUY PELIGROSO / PROHIBIDO EN PERÚ',
    pictograms: ['toxic', 'env', 'health'],
    usageDescription: 'Históricamente formulado como insecticida y acaricida de contacto e ingestión para controlar masticadores, chupadores y ácaros en cultivos agrícolas.',
    summary: 'Sustancia tóxica persistente para personas, fauna acuática y abejas. En Perú su importación, comercialización y uso están prohibidos por SENASA (Convenio de Estocolmo y D.S. N° 001-2015-MINAGRI). Si encuentras un envase en almacén, NO lo apliques; inmovilízalo, rotúlalo y coordina su disposición como residuo peligroso (Cilindro Rojo).',
    regulatoryNote: 'ALERTA SENASA PERÚ (D.S. N° 001-2015-MINAGRI): El Endosulfán (Thiodan) está prohibido en el Perú como Contaminante Orgánico Persistente (COP). No debe adquirirse ni aplicarse en campo.',
    ppeRequired: 'Para inventario o retiro seguro de envases antiguos: respirador doble vía con filtros para vapores orgánicos, lentes herméticos, guantes de nitrilo grueso, traje Tyvek impermeable y botas de jebe.',
    firstAid: 'Si hubo contacto o inhalación: retirar inmediatamente al aire fresco, quitar ropa contaminada, lavar piel/ojos con agua abundante por 15 minutos y trasladar con urgencia al centro médico con la etiqueta.',
    spillControl: 'Contener sin agua usando absorbente inerte/arena sobre bandeja antiderrame. Recoger todo en bolsa roja rotulada como residuo peligroso (NTP 900.058). Nunca verter a desagües o quebradas.'
  },
  {
    aliases: ['glifosato', 'roundup', 'ranger', 'faena', 'panzer', 'bazuka'],
    productName: 'Glifosato (Roundup / Herbicida sistémico)',
    activeIngredient: 'Glifosato sal isopropilamina / potásica (360 - 480 g/L)',
    chemicalGroup: 'Herbicida sistémico no selectivo · Fosfonometilglicina',
    toxicologicalBand: 'Azul o Verde (Ligeramente peligroso según registro SENASA Perú)',
    hazardLevel: 'MODERADO',
    hazardLevelLabel: 'PRECAUCIÓN · BANDA AZUL / VERDE',
    pictograms: ['irritant', 'env'],
    usageDescription: 'Herbicida sistémico post-emergente no selectivo usado para el control de malezas de hoja ancha y gramíneas en habilitación de áreas verdes, caminos y mantenimiento de cercos.',
    summary: 'Se absorbe por el follaje y se trasloca a las raíces. Aplica a favor del viento con boquilla antideriva, protegiendo las especies forestales y frutales vecinas para evitar fitotoxicidad.',
    regulatoryNote: 'Uso permitido solo con registro SENASA vigente y etiqueta autorizada en español (D.S. N° 001-2015-MINAGRI). Respetar franjas de seguridad junto a canales y cultivos sensibles.',
    ppeRequired: 'Traje impermeable completo o mandil de PVC, botas de goma, guantes de nitrilo, lentes de seguridad cerrados y respirador con filtro para neblinas/vapores orgánicos durante mezcla y aspersión.',
    firstAid: 'Ojos/Piel: lavar con abundante agua limpia durante 15 minutos. Ingestión: no inducir el vómito; acudir al centro médico mostrando la etiqueta o hoja MSDS.',
    spillControl: 'Absorber con tierra seca, arena o kit antiderrames en bandeja de contención. Enjuagar envases vacíos mediante triple lavado y perforarlos antes de llevarlos al acopio autorizado (Cilindro Rojo).'
  },
  {
    aliases: ['cipermetrina', 'cymbush', 'sherpa', 'arrivo', 'galgotrin'],
    productName: 'Cipermetrina (Insecticida piretroide)',
    activeIngredient: 'Cipermetrina (200 - 250 g/L EC)',
    chemicalGroup: 'Insecticida Piretroide sintético',
    toxicologicalBand: 'Amarilla (Moderadamente peligroso)',
    hazardLevel: 'ALTO',
    hazardLevelLabel: 'PELIGROSO · BANDA AMARILLA (NOCIVO)',
    pictograms: ['toxic', 'irritant', 'env'],
    usageDescription: 'Insecticida piretroide de amplio espectro que actúa por contacto e ingestión contra plagas defoliadoras, gusanos cortadores, trips y pulgones en viveros, áreas verdes y frutales.',
    summary: 'Efecto rápido de choque, muy tóxico para peces, organismos acuáticos y abejas. Evita aplicar en horas de floración o cerca de canales de riego y quebradas.',
    regulatoryNote: 'Cumplir periodo de reingreso establecido en etiqueta SENASA y normas de protección de polinizadores en Perú.',
    ppeRequired: 'Respirador media cara con cartucho para vapores orgánicos + prefiltro P100, gafas herméticas, guantes de nitrilo, mameluco impermeable con capucha y botas de seguridad.',
    firstAid: 'Puede causar parestesia (hormigueo facial/cutáneo). Lavar la piel inmediatamente con agua y jabón suave, retirar a ambiente ventilado y consultar atención médica si persisten síntomas.',
    spillControl: 'Evitar que llegue a canales de agua. Absorber derrame líquido con arena/vermiculita, recoger en bolsa roja de peligrosos (NTP 900.058) y practicar triple lavado al envase vacío.'
  },
  {
    aliases: ['mancozeb', 'dithane', 'manzate', 'mancozeb 80'],
    productName: 'Mancozeb (Fungicida protector)',
    activeIngredient: 'Mancozeb 80% WP (Etilenbisditiocarbamato de Mn y Zn)',
    chemicalGroup: 'Fungicida Ditiocarbamato · Polvo mojable',
    toxicologicalBand: 'Verde o Azul (Cuidado al manipular polvo mojable)',
    hazardLevel: 'MODERADO',
    hazardLevelLabel: 'PRECAUCIÓN · RIESGO POR POLVO AL DOSIFICAR',
    pictograms: ['irritant', 'health', 'env'],
    usageDescription: 'Fungicida agrícola de contacto con acción preventiva para proteger plantones en vivero y especies frutales contra hongos foliares como alternaria, mildiu, roya y manchas foliares.',
    summary: 'Por presentarse como polvo mojable genera riesgo de inhalación y sensibilización cutánea al dosificar. Prepara la pre-mezcla en zona ventilada sin viento usando mascarilla P100.',
    regulatoryNote: 'Uso regulado por SENASA Perú. Almacenar lejos de humedad para evitar calentamiento y descomposición en campo.',
    ppeRequired: 'Respirador contra polvo y neblinas (N95/P100 o cartucho combinado), gafas ajustadas, guantes de nitrilo, ropa manga larga impermeable y botas.',
    firstAid: 'Inhalación: trasladar al aire fresco. Piel u ojos: irrigar con agua abundante por 15 min. Acudir a tópico si persiste irritación respiratoria o ocular.',
    spillControl: 'No barrer en seco si levanta polvo; humedecer ligeramente o recoger con absorbente en bolsa roja rotulada. Almacenar en lugar fresco y seco, lejos de humedad.'
  },
  {
    aliases: ['clorpirifos', 'lorsban', 'dursban', 'pyrinex'],
    productName: 'Clorpirifos (Insecticida organofosforado)',
    activeIngredient: 'Clorpirifos (480 g/L EC)',
    chemicalGroup: 'Insecticida Organofosforado · Inhibidor de colinesterasa',
    toxicologicalBand: 'Amarilla / Alta restricción sanitaria en Perú (SENASA)',
    hazardLevel: 'CRITICO',
    hazardLevelLabel: 'ALTA PELIGROSIDAD / RESTRINGIDO EN PERÚ',
    pictograms: ['toxic', 'health', 'env'],
    usageDescription: 'Insecticida de contacto, ingestión e inhalación empleado tradicionalmente en control de plagas de suelo y gusanos masticadores.',
    summary: 'Inhibidor de colinesterasa que requiere control médico/vigilancia y cumplimiento estricto de las resoluciones vigentes de SENASA Perú sobre prohibición/restricción de clorpirifos.',
    regulatoryNote: 'ATENCIÓN SENASA PERÚ (R.D. N° 0032-2023-MIDAGRI-SENASA-DIAIA y normativas conexas): SENASA dispuso prohibición y retiro del mercado de plaguicidas formulados con Clorpirifos. No utilizar salvo inventario en retiro controlado.',
    ppeRequired: 'Obligatorio EPP químico completo: respirador con cartucho para vapores orgánicos, lentes herméticos, mandil y guantes de nitrilo, traje impermeable y botas.',
    firstAid: 'Emergencia médica inmediata ante síntomas colinérgicos (mareo, sudoración excesiva, visión borrosa): retirar ropa contaminada, lavar piel, traslado médico urgente indicando organofosforado.',
    spillControl: 'Contener sobre bandeja antiderrame lejos de drenajes, absorber con material inerte, disponer en cilindro rojo de residuos peligrosos (NTP 900.058) y comunicar a SSOMA.'
  },
  {
    aliases: ['abamectina', 'vertimec', 'abamex'],
    productName: 'Abamectina (Acaricida e insecticida biológico)',
    activeIngredient: 'Abamectina 18 g/L EC (Avermectina)',
    chemicalGroup: 'Acaricida-Insecticida de origen natural (Avermectina)',
    toxicologicalBand: 'Amarilla (Moderadamente peligroso)',
    hazardLevel: 'ALTO',
    hazardLevelLabel: 'PELIGROSO · BANDA AMARILLA (TÓXICO ABEJAS/PECES)',
    pictograms: ['toxic', 'env'],
    usageDescription: 'Acaricida e insecticida translaminar utilizado contra arañita roja, ácaros y minadores de hojas en viveros, frutales y áreas ornamentales.',
    summary: 'Muy tóxico para abejas e invertebrados acuáticos. Aplicar al atardecer o sin vientos fuertes y respetar el periodo de reingreso al área tratada.',
    regulatoryNote: 'Registro agrícola fiscalizado por SENASA Perú. Evitar deriva hacia cuerpos de agua o zonas de floración con abejas.',
    ppeRequired: 'Respirador con filtro orgánico, lentes sellados, guantes de nitrilo, traje protector impermeable y botas.',
    firstAid: 'Lavar con agua abundante ojos/piel por 15 min. Si se ingiere o inhala neblina, acudir de inmediato al centro de salud con la etiqueta.',
    spillControl: 'Absorber con tierra seca o kit antiderrame, almacenar en cilindro rojo de peligrosos y aplicar triple lavado al frasco.'
  },
  {
    aliases: ['imidacloprid', 'confidor', 'gaucho', 'imida'],
    productName: 'Imidacloprid (Insecticida neonicotinoide)',
    activeIngredient: 'Imidacloprid 350 g/L SC / 70% WP',
    chemicalGroup: 'Insecticida Neonicotinoide sistémico',
    toxicologicalBand: 'Azul (Moderadamente / Ligeramente peligroso)',
    hazardLevel: 'MODERADO',
    hazardLevelLabel: 'PRECAUCIÓN · BANDA AZUL (CUIDAR POLINIZADORES)',
    pictograms: ['irritant', 'env'],
    usageDescription: 'Insecticida sistémico usado para controlar mosca blanca, pulgones, cochinillas y cigarritas en plantones frutales, forestales y vivero.',
    summary: 'Riesgo elevado para polinizadores (abejas). Prohibido aplicarlo sobre flores abiertas o en horarios de pecoreo.',
    regulatoryNote: 'Cumplir recomendaciones SENASA de protección apícola e intervalos de aplicación en campo.',
    ppeRequired: 'Guantes de nitrilo, gafas de seguridad, traje de aplicación impermeable, botas y respirador para neblinas/vapores.',
    firstAid: 'En caso de contacto dérmico u ocular, enjuagar 15 min con agua limpia. Retirar a zona fresca.',
    spillControl: 'Recoger derrame con material absorbente en bolsa roja. Triple lavado obligatorio de envases antes de entregarlos al acopio.'
  }
];

function normalizeText(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function findKnownAgrochemical(term) {
  const norm = normalizeText(term);
  if (!norm) return null;
  return KNOWN_AGROCHEMICALS.find(item =>
    item.aliases.some(alias => norm.includes(normalizeText(alias)))
  ) || null;
}

function inferHazardFromBand(band = '', regNote = '') {
  const full = `${band} ${regNote}`.toLowerCase();
  if (/prohib|restring|extrem|rojo|roja/.test(full)) {
    return {
      hazardLevel: 'CRITICO',
      hazardLevelLabel: /prohib/.test(full) ? 'MUY PELIGROSO / PROHIBIDO EN PERÚ' : 'MUY PELIGROSO · BANDA ROJA SENASA',
      pictograms: ['toxic', 'health', 'env']
    };
  }
  if (/amarill|moderad/.test(full)) {
    return {
      hazardLevel: 'ALTO',
      hazardLevelLabel: 'PELIGROSO · BANDA AMARILLA SENASA',
      pictograms: ['toxic', 'irritant', 'env']
    };
  }
  if (/azul|liger/.test(full)) {
    return {
      hazardLevel: 'MODERADO',
      hazardLevelLabel: 'PRECAUCIÓN · BANDA AZUL SENASA',
      pictograms: ['irritant', 'env']
    };
  }
  if (/verd|precau|normal/.test(full)) {
    return {
      hazardLevel: 'BAJO',
      hazardLevelLabel: 'PRECAUCIÓN ESTÁNDAR · BANDA VERDE SENASA',
      pictograms: ['irritant']
    };
  }
  return {
    hazardLevel: 'MODERADO',
    hazardLevelLabel: 'VERIFICAR ETIQUETA Y BANDA SENASA PERÚ',
    pictograms: ['irritant', 'env']
  };
}

function buildPeru16Sections(base) {
  const {
    productName,
    activeIngredient,
    chemicalGroup,
    toxicologicalBand,
    hazardLevelLabel,
    usageDescription,
    regulatoryNote,
    summary,
    ppeRequired,
    firstAid,
    spillControl,
    physicalProps,
    stabilityInfo,
    toxicologyInfo,
    ecotoxInfo
  } = base;

  return [
    {
      n: 1,
      title: '1. Identificación del producto y de la empresa (Perú)',
      body: `Nombre comercial: ${productName}. Categoría / Grupo químico: ${chemicalGroup}. Uso previsto en operaciones SGAE bajo registro fitosanitario SENASA Perú (D.S. N° 001-2015-MINAGRI). Verificar fabricante/titular del registro en la etiqueta del envase.`
    },
    {
      n: 2,
      title: '2. Identificación de los peligros (SGA y Banda SENASA Perú)',
      body: `Nivel de peligrosidad: ${hazardLevelLabel}. Banda toxicológica Perú: ${toxicologicalBand}. ${regulatoryNote || summary}`
    },
    {
      n: 3,
      title: '3. Composición / Información sobre los componentes',
      body: `Ingrediente activo declarado: ${activeIngredient}. Los coadyuvantes e inertes forman parte de la formulación comercial aprobada por SENASA.`
    },
    {
      n: 4,
      title: '4. Primeros auxilios',
      body: firstAid
    },
    {
      n: 5,
      title: '5. Medidas de lucha contra incendios',
      body: 'Medios de extinción recomendados: Polvo Químico Seco (PQS ABC), CO2 o espuma química. Evitar chorro directo de agua para no dispersar contaminantes hacia acequias o drenajes. Usar equipo de protección respiratoria y ubicarse a favor del viento (NTP 350.043 / SST_EST_019).'
    },
    {
      n: 6,
      title: '6. Medidas en caso de vertido accidental',
      body: spillControl
    },
    {
      n: 7,
      title: '7. Manipulación y almacenamiento',
      body: 'Leer la etiqueta y esta FDS antes de abrir el envase. Dosificar únicamente sobre bandeja antiderrame, aplicar a favor del viento y no comer, beber ni fumar durante la labor. Almacenar bajo llave en ambiente seco, ventilado y rotulado conforme al RIMA y D.S. N° 024-2016-EM.'
    },
    {
      n: 8,
      title: '8. Controles de exposición / Protección personal (EPP Perú)',
      body: `${ppeRequired} Estándar de referencia nacional: Ley N° 29783, D.S. N° 015-2006-SA (Límites Permisibles en Perú) y SIG_SST_EST_008.`
    },
    {
      n: 9,
      title: '9. Propiedades físicas y químicas',
      body: physicalProps || `Formulación: ${chemicalGroup}. Estado físico, color, olor, densidad, pH y solubilidad en agua conforme a las especificaciones del fabricante autorizado en Perú.`
    },
    {
      n: 10,
      title: '10. Estabilidad y reactividad',
      body: stabilityInfo || 'Estable en condiciones normales de almacenamiento en su envase original cerrado. Evitar humedad excesiva, luz solar directa, llamas abiertas y mezcla con oxidantes fuertes o productos incompatibles.'
    },
    {
      n: 11,
      title: '11. Información toxicológica',
      body: toxicologyInfo || `Clasificación toxicológica nacional: ${toxicologicalBand}. Vías de exposición posibles: dérmica, ocular, inhalatoria e ingestión accidental. ${summary}`
    },
    {
      n: 12,
      title: '12. Información ecotoxicológica',
      body: ecotoxInfo || `${usageDescription} Riesgo potencial para organismos acuáticos, suelo e insectos polinizadores si se aplica sin control de deriva o cerca de fuentes de agua.`
    },
    {
      n: 13,
      title: '13. Información relativa a la eliminación de los productos (NTP 900.058)',
      body: 'Aplicar Triple Lavado (3 enjuagues vertidos al tanque de mezcla) e inutilizar/perforar los envases vacíos sin dañar la etiqueta. Segregar en Cilindro ROJO de Residuos Peligrosos (NTP 900.058, D.L. N° 1278 y RIMA SGAE) para entrega a EO-RS autorizada por MINAM.'
    },
    {
      n: 14,
      title: '14. Información relativa al transporte (Normativa Perú - MTC)',
      body: 'Transportar en vehículo autorizado, envase sellado y asegurado verticalmente, separado de alimentos, semillas o personal. Portar Hoja MSDS y kit antiderrames en cumplimiento del D.S. N° 021-2008-MTC (Reglamento Nacional de Transporte Terrestre de Materiales y Residuos Peligrosos).'
    },
    {
      n: 15,
      title: '15. Información sobre reglamentación vigente en Perú',
      body: `Normas nacionales aplicables: D.S. N° 001-2015-MINAGRI (Reglamento del Sistema Nacional de Plaguicidas de Uso Agrícola - SENASA), Ley N° 29783 (SST), D.S. N° 024-2016-EM y D.S. N° 023-2017-EM (Minería), D.L. N° 1278 (Residuos), D.S. N° 021-2008-MTC, NTP 900.058, NTP 399.010-1 y RIMA/RISSO SGAE. ${regulatoryNote || ''}`.trim()
    },
    {
      n: 16,
      title: '16. Otras informaciones y emergencias en Perú',
      body: 'Ante intoxicación o derrame activar Método P-A-S (Proteger, Alertar, Socorrer) con la Cartilla de Emergencia de la Unidad Minera (Santa María, Paraíso, Vijus o Hualanga). Líneas nacionales en Perú: SAMU 106 · Bomberos 116 · CISPROQUIM Perú 080-050-847 · Centro Toxicológico CETOX (01) 273-2318.'
    }
  ];
}

function extractPdfAsciiSnippet(buffer) {
  try {
    const raw = buffer.subarray(0, 120000).toString('latin1');
    const tokens = raw.match(/[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\-/]{3,}/g) || [];
    return normalizeText(tokens.slice(0, 800).join(' '));
  } catch {
    return '';
  }
}

async function searchLocalMsds(rootDir, manifest, terms) {
  const msdsList = Array.isArray(manifest?.msds) ? manifest.msds : [];
  const cleanTerms = terms
    .flatMap(t => normalizeText(t).split(/\s+/))
    .map(w => w.trim())
    .filter(w => w.length >= 3 && !['msds', 'fds', 'hoja', 'ficha', 'seguridad', 'producto', 'peru', 'para'].includes(w));

  const scored = [];
  for (const entry of msdsList) {
    const baseText = normalizeText(`${entry.title || ''} ${entry.product || ''} ${entry.downloadName || ''} ${entry.category || ''}`);
    let pdfText = '';
    if (!cleanTerms.length) {
      scored.push({ ...entry, score: 1 });
      continue;
    }

    let score = 0;
    for (const word of cleanTerms) {
      if (baseText.includes(word)) score += 3;
    }

    if (score === 0 && entry.file) {
      const rel = decodeURI(String(entry.file)).replace(/^\.\//, '');
      const abs = join(rootDir, rel);
      if (existsSync(abs) && rel.toLowerCase().endsWith('.pdf')) {
        pdfText = extractPdfAsciiSnippet(await readFile(abs));
        for (const word of cleanTerms) {
          if (pdfText.includes(word)) score += 1;
        }
      }
    }

    if (score > 0) {
      scored.push({ ...entry, score });
    }
  }

  scored.sort((a, b) => b.score - a.score);
  return {
    matches: scored,
    allLocalMsds: msdsList
  };
}

function scorePeruvianOfficialLink(uri, title) {
  const lowerUri = String(uri || '').toLowerCase();
  const lowerTitle = normalizeText(title || '');
  let score = 0;
  for (const domain of PERUVIAN_AUTHORITATIVE_DOMAINS) {
    if (lowerUri.includes(domain)) score += 10;
  }
  if (lowerUri.includes('.gob.pe')) score += 12;
  if (lowerUri.includes('.pe/')) score += 4;
  if (lowerUri.endsWith('.pdf') || lowerUri.includes('.pdf?')) score += 15;
  if (lowerTitle.includes('fds') || lowerTitle.includes('msds') || lowerTitle.includes('hoja de seguridad') || lowerTitle.includes('ficha de datos') || lowerTitle.includes('senasa')) {
    score += 5;
  }
  return score;
}

async function verifyDirectPdfUrl(uri) {
  if (!uri || !/^https?:\/\//i.test(uri)) return false;
  if (/\.pdf($|\?)/i.test(uri)) return true;
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 2200);
    const res = await fetch(uri, { method: 'HEAD', redirect: 'follow', signal: controller.signal });
    clearTimeout(timer);
    const ctype = (res.headers.get('content-type') || '').toLowerCase();
    return res.ok && ctype.includes('application/pdf');
  } catch {
    return false;
  }
}

function tryExtractJson(rawText) {
  const text = String(rawText || '').trim();
  const fenced = text.match(/```json\s*([\s\S]*?)```/i) || text.match(/```\s*([\s\S]*?)```/);
  const candidate = fenced ? fenced[1] : text;
  const firstBrace = candidate.indexOf('{');
  const lastBrace = candidate.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace > firstBrace) {
    try {
      return JSON.parse(candidate.slice(firstBrace, lastBrace + 1));
    } catch {
      return null;
    }
  }
  return null;
}

function getClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
  });
}

export async function searchMsds({ rootDir, query = '', imageBase64 = '', imageMimeType = 'image/jpeg' }) {
  const cleanQuery = String(query || '').trim();
  const manifest = await resolveDocsManifest(rootDir);
  const ai = getClient();

  let detectedFromPhoto = null;
  let onlineSummary = null;
  let officialLinks = [];
  let aiNotice = '';

  if (ai && imageBase64) {
    try {
      const visionPrompt = [
        'Eres especialista SSOMA agrícola y ambiental en Perú.',
        'Analiza esta fotografía de un producto químico / pesticida / fertilizante y extrae con precisión lo que se lee en la etiqueta.',
        cleanQuery ? `El usuario también escribió esta referencia: "${cleanQuery}".` : '',
        'Responde ÚNICAMENTE con un objeto JSON válido con estas claves:',
        '{"productName":"nombre comercial exacto visible","activeIngredient":"ingrediente activo y concentración si se ve","manufacturer":"marca o empresa formuladora en Perú","toxicBand":"banda toxicológica SENASA (Roja, Amarilla, Azul, Verde o No visible)","searchQuery":"término corto ideal para buscar su hoja FDS/MSDS en PDF en Perú"}'
      ].filter(Boolean).join('\n');

      const visionResponse = await ai.models.generateContent({
        model: 'gemini-4-hydrogen',
        contents: {
          parts: [
            {
              inlineData: {
                mimeType: imageMimeType || 'image/jpeg',
                data: imageBase64
              }
            },
            { text: visionPrompt }
          ]
        }
      });
      detectedFromPhoto = tryExtractJson(visionResponse.text);
    } catch (err) {
      aiNotice = `No se pudo leer la foto automáticamente (${err?.message || 'error de visión'}).`;
    }
  }

  const effectiveSearchTerm = [
    cleanQuery,
    detectedFromPhoto?.productName,
    detectedFromPhoto?.activeIngredient,
    detectedFromPhoto?.searchQuery
  ].filter(Boolean).join(' ').trim();

  if (ai && effectiveSearchTerm) {
    try {
      const searchPrompt = [
        `Busca la Hoja de Datos de Seguridad en PDF (MSDS / FDS en español, 16 secciones) para el insumo químico o pesticida: "${effectiveSearchTerm}".`,
        'IMPORTANTE - LIMITACIÓN ESTRICTA A NORMATIVA DEL PERÚ:',
        '- Limítate exclusivamente a normativa nacional peruana: SENASA Perú (D.S. N° 001-2015-MINAGRI), Ley N° 29783, D.S. N° 024-2016-EM / 023-2017-EM, D.S. N° 015-2006-SA, D.S. N° 021-2008-MTC, D.L. N° 1278 y NTP 900.058. NO incluyas normas extranjeras (no OSHA, EPA, UE ni leyes de otros países).',
        '- Prioriza archivos PDF directos (.pdf) de páginas oficiales y verificadas del Perú (senasa.gob.pe, midagri.gob.pe, digesa, Silvestre Perú, Farmex, Bayer Perú, Syngenta Perú, BASF Perú, Aris, TQC, Hortus, Farmagro).',
        'Devuelve al final un bloque ```json con estas claves exactas:',
        '{',
        '  "productName": "nombre comercial identificado",',
        '  "activeIngredient": "ingrediente activo / concentración",',
        '  "chemicalGroup": "categoría o grupo químico",',
        '  "toxicologicalBand": "categoría y color de banda toxicológica SENASA Perú (Roja, Amarilla, Azul o Verde)",',
        '  "hazardLevel": "CRITICO | ALTO | MODERADO | BAJO",',
        '  "hazardLevelLabel": "etiqueta visual corta del peligro para el trabajador en campo",',
        '  "officialSourceFound": true/false,',
        '  "usageDescription": "descripción breve y clara de qué es este insumo y en qué labor o plaga se usa",',
        '  "regulatoryNote": "si tiene prohibición o restricción vigente de SENASA Perú indícalo; si está permitido indícalo brevemente",',
        '  "summary": "resumen práctico SSOMA en 1-2 frases para el trabajador",',
        '  "ppeRequired": "EPP obligatorio en Perú",',
        '  "firstAid": "primeros auxilios inmediatos",',
        '  "spillControl": "qué hacer ante un derrame, triple lavado y cilindro rojo NTP 900.058",',
        '  "physicalProps": "propiedades físicas y químicas resumidas (Sección 9)",',
        '  "stabilityInfo": "estabilidad y reactividad (Sección 10)",',
        '  "toxicologyInfo": "información toxicológica clave (Sección 11)",',
        '  "ecotoxInfo": "información ecotoxicológica para abejas, peces y suelo (Sección 12)"',
        '}'
      ].join('\n');

      const searchResponse = await ai.models.generateContent({
        model: 'gemini-4-hydrogen',
        contents: searchPrompt,
        config: {
          tools: [{ googleSearch: {} }]
        }
      });

      onlineSummary = tryExtractJson(searchResponse.text) || {
        productName: detectedFromPhoto?.productName || cleanQuery || effectiveSearchTerm,
        activeIngredient: detectedFromPhoto?.activeIngredient || 'Ver etiqueta / ficha técnica SENASA del producto',
        chemicalGroup: 'Insumo fitosanitario / agrícola',
        toxicologicalBand: detectedFromPhoto?.toxicBand || 'Confirmar banda SENASA en etiqueta del envase',
        officialSourceFound: false,
        usageDescription: (searchResponse.text || '').replace(/```[\s\S]*?```/g, '').trim().slice(0, 320),
        summary: (searchResponse.text || '').replace(/```[\s\S]*?```/g, '').trim().slice(0, 360),
        ppeRequired: 'Respirador con cartucho para vapores orgánicos, lentes herméticos, guantes de nitrilo, traje impermeable y botas.',
        firstAid: 'Retirar a zona ventilada, lavar piel/ojos con abundante agua 15 min y acudir al centro médico con la etiqueta.',
        spillControl: 'Contener con kit antiderrames/material absorbente lejos de drenajes, recoger en bolsa roja (NTP 900.058) y aplicar triple lavado al envase.'
      };

      const chunks = searchResponse.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const seenUris = new Set();
      const rawLinks = chunks
        .map(c => c?.web)
        .filter(w => w?.uri && !seenUris.has(w.uri) && seenUris.add(w.uri))
        .map(w => ({
          title: w.title || 'Hoja MSDS Oficial en PDF',
          uri: w.uri,
          isPdf: /\.pdf($|\?)/i.test(w.uri),
          relevance: scorePeruvianOfficialLink(w.uri, w.title)
        }))
        .sort((a, b) => b.relevance - a.relevance)
        .slice(0, 8);

      officialLinks = await Promise.all(rawLinks.map(async link => {
        const directPdf = link.isPdf || (link.relevance >= 5 ? await verifyDirectPdfUrl(link.uri) : false);
        return { ...link, isPdf: directPdf };
      }));
    } catch (err) {
      const msg = String(err?.message || '');
      if (msg.includes('429') || msg.includes('RESOURCE_EXHAUSTED')) {
        aiNotice = aiNotice || 'Consulta web temporalmente ocupada; mostrando Hoja MSDS completa de 16 ítems (Perú) y respaldo local.';
      } else {
        aiNotice = aiNotice || 'Generando Hoja MSDS de 16 ítems conforme a normativa peruana y buscando respaldo en carpeta local MSDS.';
      }
    }
  } else if (!ai) {
    aiNotice = 'Mostrando Hoja MSDS completa de 16 ítems (normativa Perú) y respaldo de carpeta local MSDS.';
  }

  const known = findKnownAgrochemical(effectiveSearchTerm || cleanQuery);

  // Only keep verified direct PDF links (never send field workers to generic Google search pages)
  const verifiedPeruvianPdfs = officialLinks.filter(l => l.isPdf && l.relevance >= 4);
  const directPdfLinks = verifiedPeruvianPdfs.length
    ? verifiedPeruvianPdfs
    : officialLinks.filter(l => l.isPdf);
  const foundOfficialOnline = directPdfLinks.length > 0;

  const searchTermsForLocal = [
    cleanQuery,
    detectedFromPhoto?.productName,
    detectedFromPhoto?.activeIngredient,
    onlineSummary?.productName,
    onlineSummary?.activeIngredient,
    known?.productName,
    known?.activeIngredient
  ].filter(Boolean);

  const localResult = await searchLocalMsds(rootDir, manifest, searchTermsForLocal);

  const resolvedProduct = onlineSummary?.productName || detectedFromPhoto?.productName || known?.productName || cleanQuery || 'Insumo consultado';
  const resolvedIngredient = onlineSummary?.activeIngredient || detectedFromPhoto?.activeIngredient || known?.activeIngredient || 'Confirmar ingrediente activo en la etiqueta SENASA del envase';
  const resolvedGroup = onlineSummary?.chemicalGroup || known?.chemicalGroup || 'Producto químico / Fitosanitario de uso en campo';
  const resolvedBand = onlineSummary?.toxicologicalBand || detectedFromPhoto?.toxicBand || known?.toxicologicalBand || 'Verificar banda toxicológica en etiqueta (Roja/Amarilla/Azul/Verde)';
  const resolvedUsage = onlineSummary?.usageDescription || known?.usageDescription || `Producto fitosanitario o insumo agrícola consultado para tareas de fumigación, control de plagas o mantenimiento vegetal (${resolvedProduct}).`;
  const resolvedSummary = onlineSummary?.summary || known?.summary || 'Antes de dosificar o aplicar en campo, verifica la etiqueta autorizada por SENASA, dosis permitida y dirección del viento sobre bandeja antiderrame.';
  const resolvedPpe = onlineSummary?.ppeRequired || known?.ppeRequired || 'Respirador con cartucho para vapores orgánicos, lentes herméticos, guantes de nitrilo, traje impermeable y botas de jebe.';
  const resolvedFirstAid = onlineSummary?.firstAid || known?.firstAid || 'Retirar a lugar ventilado, lavar piel y ojos con abundante agua durante 15 minutos y trasladar al centro de salud con la etiqueta del envase.';
  const resolvedSpill = onlineSummary?.spillControl || known?.spillControl || 'Contener sobre bandeja antiderrame con material absorbente, disponer en cilindro rojo (NTP 900.058) y aplicar triple lavado al envase vacío antes de perforarlo.';
  const resolvedRegNote = onlineSummary?.regulatoryNote || known?.regulatoryNote || 'Uso sujeto a registro SENASA vigente en Perú (D.S. N° 001-2015-MINAGRI) y controles del RIMA SGAE.';

  const inferredHazard = inferHazardFromBand(resolvedBand, resolvedRegNote);
  const hazardLevel = onlineSummary?.hazardLevel || known?.hazardLevel || inferredHazard.hazardLevel;
  const hazardLevelLabel = onlineSummary?.hazardLevelLabel || known?.hazardLevelLabel || inferredHazard.hazardLevelLabel;
  const pictograms = known?.pictograms || inferredHazard.pictograms;

  const sections16 = buildPeru16Sections({
    productName: resolvedProduct,
    activeIngredient: resolvedIngredient,
    chemicalGroup: resolvedGroup,
    toxicologicalBand: resolvedBand,
    hazardLevelLabel,
    usageDescription: resolvedUsage,
    regulatoryNote: resolvedRegNote,
    summary: resolvedSummary,
    ppeRequired: resolvedPpe,
    firstAid: resolvedFirstAid,
    spillControl: resolvedSpill,
    physicalProps: onlineSummary?.physicalProps,
    stabilityInfo: onlineSummary?.stabilityInfo,
    toxicologyInfo: onlineSummary?.toxicologyInfo,
    ecotoxInfo: onlineSummary?.ecotoxInfo
  });

  return {
    query: cleanQuery,
    detectedFromPhoto,
    productName: resolvedProduct,
    activeIngredient: resolvedIngredient,
    chemicalGroup: resolvedGroup,
    toxicologicalBand: resolvedBand,
    hazardLevel,
    hazardLevelLabel,
    pictograms,
    usageDescription: resolvedUsage,
    regulatoryNote: resolvedRegNote,
    summary: resolvedSummary,
    ppeRequired: resolvedPpe,
    firstAid: resolvedFirstAid,
    spillControl: resolvedSpill,
    sections16,
    directPdfLinks,
    officialLinks: directPdfLinks,
    foundOfficialOnline,
    usedFallbackToLocal: !foundOfficialOnline,
    canGeneratePdfSummary: true,
    localMatches: localResult.matches,
    allLocalMsds: localResult.allLocalMsds,
    aiNotice
  };
}
