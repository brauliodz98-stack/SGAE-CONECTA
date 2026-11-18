import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { inflateSync } from 'node:zlib';
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
  'agripac.com.pe',
  'capeagro.com',
  'pointandina.com',
  'molinosycia.com'
];

function normalizeText(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function extractReadablePdfText(buffer) {
  const pieces = [];
  try {
    const latin = buffer.subarray(0, 450000).toString('latin1');
    // Uncompressed readable fragments
    const rawTokens = latin.match(/[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\-/%.,:;() ]{5,}/g) || [];
    pieces.push(rawTokens.slice(0, 600).join(' '));

    // Decompress FlateDecode content streams to read supplier PDFs reliably
    const streamRegex = /stream\r?\n([\s\S]*?)\r?\nendstream/g;
    let match;
    let inspectedStreams = 0;
    while ((match = streamRegex.exec(latin)) !== null && inspectedStreams < 18) {
      inspectedStreams += 1;
      const rawChunk = Buffer.from(match[1], 'latin1');
      let decoded = '';
      try {
        decoded = inflateSync(rawChunk).toString('latin1');
      } catch {
        decoded = rawChunk.toString('latin1');
      }
      const litStrings = decoded.match(/\(([^()\\]{2,120})\)/g) || [];
      if (litStrings.length) {
        pieces.push(litStrings.map(s => s.slice(1, -1)).join(' '));
      } else {
        const ascii = decoded.match(/[A-Za-z0-9ÁÉÍÓÚáéíóúÑñ.\-/% ]{4,}/g) || [];
        pieces.push(ascii.slice(0, 200).join(' '));
      }
    }
  } catch {
    // Ignore parse edge cases
  }
  return pieces.join(' ').replace(/\s+/g, ' ').trim();
}

function detectConfirmedBandFromText(text) {
  const norm = normalizeText(text);
  if (!norm) return null;
  if (/(franja|banda)\s*(de\s*color\s*)?azul|ligeramente\s*peligros|categoria\s*iii\b|clase\s*iii\b/.test(norm)) {
    return { toxicologicalBand: 'Franja Azul · Ligeramente Peligroso', hazardLevel: 'MODERADO' };
  }
  if (/(franja|banda)\s*(de\s*color\s*)?amarill|moderadamente\s*peligros|categoria\s*ii\b|clase\s*ii\b/.test(norm)) {
    return { toxicologicalBand: 'Franja Amarilla · Moderadamente Peligroso', hazardLevel: 'ALTO' };
  }
  if (/(franja|banda)\s*(de\s*color\s*)?roj|altamente\s*peligros|extremadamente\s*peligros|categoria\s*i[ab]?\b/.test(norm)) {
    return { toxicologicalBand: 'Franja Roja · Altamente / Extremadamente Peligroso', hazardLevel: 'CRITICO' };
  }
  if (/(franja|banda)\s*(de\s*color\s*)?verd|normalmente\s*no\s*ofrece\s*peligro|precaucion\b.*categoria\s*iv\b|clase\s*iv\b/.test(norm)) {
    return { toxicologicalBand: 'Franja Verde · Precaución (Categoría IV)', hazardLevel: 'BAJO' };
  }
  return null;
}

async function searchLocalMsds(rootDir, manifest, terms) {
  const msdsList = Array.isArray(manifest?.msds) ? manifest.msds : [];
  const cleanTerms = terms
    .flatMap(t => normalizeText(t).split(/\s+/))
    .map(w => w.trim())
    .filter(w => w.length >= 2 && !['msds', 'fds', 'hoja', 'ficha', 'seguridad', 'producto', 'peru', 'para', 'de', 'la', 'el'].includes(w));

  const scored = [];
  for (const entry of msdsList) {
    const baseText = normalizeText(`${entry.title || ''} ${entry.product || ''} ${entry.downloadName || ''} ${entry.category || ''}`);
    let pdfRawText = '';
    let score = 0;

    if (!cleanTerms.length) {
      scored.push({ ...entry, score: 1 });
      continue;
    }

    for (const word of cleanTerms) {
      if (baseText.includes(word)) score += 4;
    }

    if (entry.file) {
      const rel = decodeURI(String(entry.file)).replace(/^\.\//, '');
      const abs = join(rootDir, rel);
      if (existsSync(abs) && rel.toLowerCase().endsWith('.pdf')) {
        pdfRawText = extractReadablePdfText(await readFile(abs));
        const pdfNorm = normalizeText(pdfRawText);
        for (const word of cleanTerms) {
          if (pdfNorm.includes(word)) score += 2;
        }
      }
    }

    if (score > 0) {
      const detectedBand = detectConfirmedBandFromText(pdfRawText);
      scored.push({
        ...entry,
        score,
        detectedBand: detectedBand?.toxicologicalBand || '',
        detectedHazardLevel: detectedBand?.hazardLevel || ''
      });
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
  if (lowerUri.includes('.pe/')) score += 5;
  if (lowerUri.endsWith('.pdf') || lowerUri.includes('.pdf?')) score += 18;
  if (lowerTitle.includes('fds') || lowerTitle.includes('msds') || lowerTitle.includes('hoja de seguridad') || lowerTitle.includes('ficha de datos') || lowerTitle.includes('senasa')) {
    score += 6;
  }
  return score;
}

async function inspectSupplierPage(uri, searchTerm = '') {
  const result = { isPdf: false, pdfLinks: [], imageUrl: '' };
  if (!uri || !/^https?:\/\//i.test(uri)) return result;

  if (/\.pdf($|\?)/i.test(uri)) {
    result.isPdf = true;
    return result;
  }

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3200);
    const res = await fetch(uri, {
      method: 'GET',
      redirect: 'follow',
      signal: controller.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ConectaSGAE/1.0)' }
    });
    clearTimeout(timer);
    if (!res.ok) return result;

    const ctype = (res.headers.get('content-type') || '').toLowerCase();
    if (ctype.includes('application/pdf')) {
      result.isPdf = true;
      return result;
    }
    if (!ctype.includes('text/html')) return result;

    const html = (await res.text()).slice(0, 250000);
    const baseUrl = new URL(res.url || uri);

    // 1. Extract real supplier PDF links inside page
    const hrefMatches = [...html.matchAll(/<a[^>]+href=["']([^"']+\.pdf(?:\?[^"']*)?)["'][^>]*>([\s\S]*?)<\/a>/gi)];
    const normTermWords = normalizeText(searchTerm).split(/\s+/).filter(w => w.length >= 3);
    for (const m of hrefMatches) {
      try {
        const absPdf = new URL(m[1], baseUrl).href;
        const anchorText = m[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
        const combined = normalizeText(`${absPdf} ${anchorText}`);
        const matchesMsds = /msds|fds|seguridad|hoja|ficha|tecnica/.test(combined) || normTermWords.some(w => combined.includes(w));
        if (matchesMsds && !result.pdfLinks.some(x => x.uri === absPdf)) {
          result.pdfLinks.push({
            title: anchorText || 'Hoja MSDS / Ficha del Proveedor (PDF)',
            uri: absPdf,
            isPdf: true,
            relevance: scorePeruvianOfficialLink(absPdf, anchorText) + 12
          });
        }
      } catch {
        // Ignore malformed relative href
      }
    }

    // 2. Extract real product image (og:image or twitter:image)
    const ogMatch = html.match(/<meta[^>]+(?:property=["']og:image["']|name=["']twitter:image["'])[^>]+content=["']([^"']+)["']/i)
      || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+(?:property=["']og:image["']|name=["']twitter:image["'])/i);
    if (ogMatch?.[1]) {
      try {
        const candidateImg = new URL(ogMatch[1], baseUrl).href;
        if (/^https?:\/\//i.test(candidateImg) && !/logo|favicon|sprite|banner-default/i.test(candidateImg)) {
          result.imageUrl = candidateImg;
        }
      } catch {
        // Ignore invalid image URL
      }
    }
  } catch {
    // Ignore network timeout / upstream blocks
  }

  return result;
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
  let rawSupplierLinks = [];
  let aiNotice = '';

  if (ai && imageBase64) {
    try {
      const visionPrompt = [
        'Eres especialista SSOMA en Perú.',
        'Lee EXCLUSIVAMENTE lo que es visible en esta fotografía real de la etiqueta del envase.',
        'NO inventes datos que no aparezcan claramente impresos en la foto.',
        cleanQuery ? `Referencia escrita por el usuario: "${cleanQuery}".` : '',
        'Responde ÚNICAMENTE con un JSON válido:',
        '{"productName":"nombre comercial exacto visible o vacío","activeIngredient":"ingrediente activo y concentración exactos si se leen o vacío","manufacturer":"empresa formuladora/distribuidora en Perú si se lee o vacío","toxicBand":"color de franja toxicológica visible en la base de la etiqueta (Azul, Amarilla, Roja, Verde o vacío si no se distingue)","searchQuery":"término corto exacto para buscar el PDF oficial del proveedor en Perú"}'
      ].filter(Boolean).join('\n');

      const visionResponse = await ai.models.generateContent({
        model: 'gemini-4-hydrogen',
        contents: {
          parts: [
            { inlineData: { mimeType: imageMimeType || 'image/jpeg', data: imageBase64 } },
            { text: visionPrompt }
          ]
        }
      });
      detectedFromPhoto = tryExtractJson(visionResponse.text);
    } catch (err) {
      aiNotice = `No se pudo leer la fotografía automáticamente (${err?.message || 'error'}).`;
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
        `Busca la Hoja de Datos de Seguridad (MSDS / FDS en PDF) del PROVEEDOR o FABRICANTE OFICIAL en PERÚ para: "${effectiveSearchTerm}".`,
        'REGLAS ESTRICTAS DE VERACIDAD (CERO INVENCIÓN):',
        '1. Solo reporta datos que hayas encontrado explícitamente en resultados verificados de fabricantes, distribuidores o SENASA en Perú (Silvestre, Farmex, Farmagro, TQC, Aris, Hortus, Bayer Perú, Syngenta Perú, BASF Perú, Corteva, FMC, UPL, Adama, Agripac, Serfi, SENASA).',
        '2. NO inventes ni deduzcas la banda/franja toxicológica, ingrediente activo ni descripción si no aparece explícitamente en una fuente del proveedor.',
        '3. Si no encuentras información verificada del proveedor, deja esos campos como cadena vacía "" y pon "verifiedSupplierData": false.',
        'Devuelve un bloque ```json con estas claves:',
        '{',
        '  "verifiedSupplierData": true/false,',
        '  "productName": "nombre comercial exacto del proveedor o vacío",',
        '  "manufacturer": "empresa proveedora / titular SENASA en Perú o vacío",',
        '  "activeIngredient": "ingrediente activo verificado en ficha del proveedor o vacío",',
        '  "chemicalGroup": "uso / clase agrícola verificada o vacío",',
        '  "toxicologicalBand": "color exacto de franja/banda según el proveedor (ej. Franja Azul - Ligeramente Peligroso) o vacío",',
        '  "summary": "resumen breve basado solo en la ficha del proveedor encontrada, o vacío",',
        '  "productImageUrl": "URL directa a la fotografía real del envase comercial en el sitio oficial del proveedor si aparece, o vacío"',
        '}'
      ].join('\n');

      const searchResponse = await ai.models.generateContent({
        model: 'gemini-4-hydrogen',
        contents: searchPrompt,
        config: { tools: [{ googleSearch: {} }] }
      });

      onlineSummary = tryExtractJson(searchResponse.text);

      const chunks = searchResponse.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const seenUris = new Set();
      rawSupplierLinks = chunks
        .map(c => c?.web)
        .filter(w => w?.uri && !seenUris.has(w.uri) && seenUris.add(w.uri))
        .map(w => ({
          title: w.title || 'Documento oficial del proveedor en Perú',
          uri: w.uri,
          isPdf: /\.pdf($|\?)/i.test(w.uri),
          relevance: scorePeruvianOfficialLink(w.uri, w.title)
        }))
        .sort((a, b) => b.relevance - a.relevance)
        .slice(0, 6);
    } catch (err) {
      const msg = String(err?.message || '');
      if (msg.includes('429') || msg.includes('RESOURCE_EXHAUSTED')) {
        aiNotice = aiNotice || 'Búsqueda web ocupada; revisando carpeta local MSDS/ de archivos del proveedor.';
      }
    }
  }

  // Inspect verified Peruvian/supplier links for actual PDFs & real product image
  const directPdfLinks = [];
  const supplierPortalLinks = [];
  let verifiedProductImageUrl = onlineSummary?.productImageUrl || '';

  const inspected = await Promise.all(
    rawSupplierLinks.map(async link => ({
      link,
      info: await inspectSupplierPage(link.uri, effectiveSearchTerm)
    }))
  );

  for (const { link, info } of inspected) {
    if (info.isPdf || link.isPdf) {
      if (!directPdfLinks.some(x => x.uri === link.uri)) {
        directPdfLinks.push({ ...link, isPdf: true });
      }
    } else if (link.relevance >= 10) {
      supplierPortalLinks.push(link);
    }
    for (const embeddedPdf of info.pdfLinks) {
      if (!directPdfLinks.some(x => x.uri === embeddedPdf.uri)) {
        directPdfLinks.push(embeddedPdf);
      }
    }
    if (!verifiedProductImageUrl && info.imageUrl) {
      verifiedProductImageUrl = info.imageUrl;
    }
  }

  directPdfLinks.sort((a, b) => b.relevance - a.relevance);

  // Search local MSDS/ folder (and uploaded PDFs) using all verified terms
  const searchTermsForLocal = [
    cleanQuery,
    detectedFromPhoto?.productName,
    detectedFromPhoto?.activeIngredient,
    onlineSummary?.verifiedSupplierData ? onlineSummary?.productName : '',
    onlineSummary?.verifiedSupplierData ? onlineSummary?.activeIngredient : ''
  ].filter(Boolean);

  const localResult = await searchLocalMsds(rootDir, manifest, searchTermsForLocal);
  const topLocal = localResult.matches[0] || null;

  // Use ONLY confirmed data from local supplier PDF or grounded verified supplier data (ZERO invention)
  const resolvedProduct = topLocal?.product || topLocal?.title || (onlineSummary?.verifiedSupplierData ? onlineSummary.productName : '') || detectedFromPhoto?.productName || cleanQuery || 'Producto consultado';
  const resolvedIngredient = (onlineSummary?.verifiedSupplierData ? onlineSummary.activeIngredient : '') || detectedFromPhoto?.activeIngredient || '';
  const resolvedManufacturer = (onlineSummary?.verifiedSupplierData ? onlineSummary.manufacturer : '') || detectedFromPhoto?.manufacturer || '';
  const resolvedGroup = (onlineSummary?.verifiedSupplierData ? onlineSummary.chemicalGroup : '') || topLocal?.category || '';
  const resolvedBand = topLocal?.detectedBand || (onlineSummary?.verifiedSupplierData ? onlineSummary.toxicologicalBand : '') || detectedFromPhoto?.toxicBand || '';
  const detectedBandFromBandText = detectConfirmedBandFromText(resolvedBand);
  const hazardLevel = topLocal?.detectedHazardLevel || detectedBandFromBandText?.hazardLevel || '';
  const resolvedSummary = (onlineSummary?.verifiedSupplierData ? onlineSummary.summary : '') || (topLocal ? `Documento oficial del proveedor encontrado en tu carpeta MSDS/: ${topLocal.downloadName || topLocal.title}.` : '');

  const hasAuthenticDocument = localResult.matches.length > 0 || directPdfLinks.length > 0;

  return {
    query: cleanQuery,
    detectedFromPhoto,
    productName: resolvedProduct,
    manufacturer: resolvedManufacturer,
    activeIngredient: resolvedIngredient,
    chemicalGroup: resolvedGroup,
    toxicologicalBand: resolvedBand,
    hazardLevel,
    summary: resolvedSummary,
    productImageUrl: verifiedProductImageUrl,
    localMatches: localResult.matches,
    directPdfLinks,
    supplierPortalLinks,
    allLocalMsds: localResult.allLocalMsds,
    hasAuthenticDocument,
    verifiedSupplierData: Boolean(onlineSummary?.verifiedSupplierData || topLocal),
    aiNotice
  };
}
