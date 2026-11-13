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
  'hortus.com.pe'
];

function normalizeText(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
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
  if (lowerUri.endsWith('.pdf') || lowerUri.includes('.pdf?')) score += 6;
  if (lowerTitle.includes('fds') || lowerTitle.includes('msds') || lowerTitle.includes('hoja de seguridad') || lowerTitle.includes('ficha de datos') || lowerTitle.includes('senasa')) {
    score += 5;
  }
  return score;
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
        '{"productName":"nombre comercial exacto visible","activeIngredient":"ingrediente activo y concentración si se ve","manufacturer":"marca o empresa formuladora","toxicBand":"banda toxicológica (Roja, Amarilla, Azul, Verde o No visible)","searchQuery":"término corto ideal para buscar su hoja FDS/MSDS en Perú"}'
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
        `Busca la Hoja de Datos de Seguridad (MSDS / FDS en español) para el insumo químico o pesticida: "${effectiveSearchTerm}".`,
        'Prioriza estrictamente páginas oficiales y verificadas del Perú: SENASA Perú (senasa.gob.pe / gob.pe/senasa), MIDAGRI, DIGESA y fichas oficiales de fabricantes o formuladores registrados en Perú (Bayer Perú, Syngenta Perú, BASF Perú, Farmex, Silvestre Perú, Aris Industrial, Farmagro, TQC, Corteva Perú, FMC).',
        'Si encuentras la FDS o ficha técnica oficial, resume claramente para el trabajador de campo en español:',
        'Devuelve al final un bloque ```json con estas claves exactas (si un dato no consta en fuentes oficiales, indícalo claramente):',
        '{',
        '  "productName": "nombre comercial identificado",',
        '  "activeIngredient": "ingrediente activo / composición",',
        '  "toxicologicalBand": "categoría o color de banda toxicológica",',
        '  "officialSourceFound": true/false,',
        '  "summary": "resumen práctico en 1-2 frases para el trabajador",',
        '  "ppeRequired": "EPP obligatorio para dosificación y aplicación",',
        '  "firstAid": "primeros auxilios inmediatos si hay contacto o inhalación",',
        '  "spillControl": "qué hacer ante un derrame o envase roto y triple lavado"',
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
        activeIngredient: detectedFromPhoto?.activeIngredient || 'Ver fuente oficial enlazada',
        toxicologicalBand: detectedFromPhoto?.toxicBand || 'Confirmar en etiqueta oficial',
        officialSourceFound: false,
        summary: (searchResponse.text || '').replace(/```[\s\S]*?```/g, '').trim().slice(0, 420),
        ppeRequired: 'Respirador con cartucho para vapores orgánicos, lentes herméticos, guantes de nitrilo, traje impermeable y botas.',
        firstAid: 'Retirar a zona ventilada, lavar piel/ojos con abundante agua 15 min y acudir al centro médico con la etiqueta.',
        spillControl: 'Contener con kit antiderrames/material absorbente lejos de drenajes, recoger en bolsa roja y aplicar triple lavado al envase.'
      };

      const chunks = searchResponse.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const seenUris = new Set();
      officialLinks = chunks
        .map(c => c?.web)
        .filter(w => w?.uri && !seenUris.has(w.uri) && seenUris.add(w.uri))
        .map(w => ({
          title: w.title || 'Documento / Fuente oficial',
          uri: w.uri,
          isPdf: /\.pdf($|\?)/i.test(w.uri),
          relevance: scorePeruvianOfficialLink(w.uri, w.title)
        }))
        .sort((a, b) => b.relevance - a.relevance)
        .slice(0, 6);
    } catch (err) {
      const msg = String(err?.message || '');
      if (msg.includes('429') || msg.includes('RESOURCE_EXHAUSTED')) {
        aiNotice = aiNotice || 'La búsqueda web automática alcanzó su límite de cuota temporal (revisa Settings > Secrets si deseas ampliar cuota).';
      } else if (msg.includes('403') || msg.includes('400') || msg.includes('API_KEY_INVALID') || msg.includes('PERMISSION_DENIED')) {
        aiNotice = aiNotice || 'Verifica la clave de API configurada en Settings > Secrets o en las variables de entorno de Vercel.';
      } else {
        aiNotice = aiNotice || 'Búsqueda web en vivo no disponible en este momento.';
      }
    }
  } else if (!ai) {
    aiNotice = 'Búsqueda web en vivo no configurada en este entorno; mostrando resultados de la carpeta local MSDS.';
  }

  const verifiedPeruvianLinks = officialLinks.filter(l => l.relevance >= 5);
  const foundOfficialOnline = verifiedPeruvianLinks.length > 0 || (officialLinks.length > 0 && onlineSummary?.officialSourceFound === true);

  const fallbackQueryTerm = effectiveSearchTerm || cleanQuery;
  const fallbackOfficialPortalLinks = (!foundOfficialOnline && fallbackQueryTerm)
    ? [
        {
          title: `Buscar "${fallbackQueryTerm}" en Portal Oficial SENASA Perú (gob.pe)`,
          uri: `https://www.gob.pe/busquedas?institucion%5B%5D=senasa&term=${encodeURIComponent(fallbackQueryTerm)}`,
          isPdf: false,
          relevance: 8
        },
        {
          title: `Buscar FDS / MSDS oficial de "${fallbackQueryTerm}" en Perú (.gob.pe / fabricantes)`,
          uri: `https://www.google.com/search?q=${encodeURIComponent(`"${fallbackQueryTerm}" ("FDS" OR "MSDS" OR "Hoja de seguridad") (site:gob.pe OR site:senasa.gob.pe OR Peru) filetype:pdf`)}`,
          isPdf: true,
          relevance: 6
        }
      ]
    : [];

  const searchTermsForLocal = [
    cleanQuery,
    detectedFromPhoto?.productName,
    detectedFromPhoto?.activeIngredient,
    onlineSummary?.productName,
    onlineSummary?.activeIngredient
  ].filter(Boolean);

  const localResult = await searchLocalMsds(rootDir, manifest, searchTermsForLocal);

  return {
    query: cleanQuery,
    detectedFromPhoto,
    productName: onlineSummary?.productName || detectedFromPhoto?.productName || cleanQuery || 'Producto consultado',
    activeIngredient: onlineSummary?.activeIngredient || detectedFromPhoto?.activeIngredient || '',
    toxicologicalBand: onlineSummary?.toxicologicalBand || detectedFromPhoto?.toxicBand || '',
    summary: onlineSummary?.summary || '',
    ppeRequired: onlineSummary?.ppeRequired || '',
    firstAid: onlineSummary?.firstAid || '',
    spillControl: onlineSummary?.spillControl || '',
    officialLinks: foundOfficialOnline
      ? (verifiedPeruvianLinks.length ? verifiedPeruvianLinks : officialLinks)
      : fallbackOfficialPortalLinks,
    foundOfficialOnline,
    usedFallbackToLocal: !foundOfficialOnline,
    localMatches: localResult.matches,
    allLocalMsds: localResult.allLocalMsds,
    aiNotice
  };
}
