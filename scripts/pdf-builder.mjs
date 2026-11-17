function toWinAnsiHex(text) {
  const str = String(text || '')
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/—|–/g, '-')
    .replace(/•/g, '*')
    .replace(/→/g, '->')
    .replace(/✓/g, 'OK')
    .replace(/≥/g, '>=')
    .replace(/≤/g, '<=')
    .replace(/°/g, ' deg ');

  let hex = '';
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    if (code >= 32 && code <= 126) {
      hex += code.toString(16).padStart(2, '0');
    } else if (code >= 160 && code <= 255) {
      hex += code.toString(16).padStart(2, '0');
    } else {
      hex += '20';
    }
  }
  return `<${hex}>`;
}

function wrapText(text, maxChars = 90) {
  const cleaned = String(text || '').replace(/\s+/g, ' ').trim();
  if (!cleaned) return [];
  const words = cleaned.split(' ');
  const lines = [];
  let line = '';
  for (const w of words) {
    if (!line) {
      line = w;
    } else if ((line.length + 1 + w.length) <= maxChars) {
      line += ' ' + w;
    } else {
      lines.push(line);
      line = w;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function pickBandRgb(band = '') {
  if (/roj|prohib|extrem/i.test(band)) return '0.72 0.14 0.12';
  if (/amarill|moderad/i.test(band)) return '0.78 0.52 0.05';
  if (/azul|liger/i.test(band)) return '0.11 0.34 0.65';
  if (/verd|precau/i.test(band)) return '0.09 0.42 0.22';
  return '0.043 0.459 0.424';
}

export function buildMsdsSummaryPdf(data = {}) {
  const {
    productName = 'Producto Químico',
    activeIngredient = 'Por confirmar en etiqueta oficial',
    chemicalGroup = 'Fitosanitario / Insumo agrícola',
    toxicologicalBand = 'Verificar banda en etiqueta SENASA Perú',
    hazardLevelLabel = 'REVISAR ETIQUETA',
    usageDescription = '',
    summary = '',
    ppeRequired = '',
    firstAid = '',
    spillControl = '',
    regulatoryNote = '',
    sections16 = null
  } = data;

  const bandRgb = pickBandRgb(toxicologicalBand);

  const items16 = Array.isArray(sections16) && sections16.length === 16
    ? sections16
    : [
        { n: 1, title: '1. Identificación del producto y de la empresa (Perú)', body: `Producto comercial: ${productName}. Categoría: ${chemicalGroup}. Uso operativo en servicios SGAE conforme a etiqueta autorizada por SENASA Perú.` },
        { n: 2, title: '2. Identificación de los peligros (SGA y Banda SENASA Perú)', body: `Nivel de peligrosidad: ${hazardLevelLabel}. Banda toxicológica: ${toxicologicalBand}. ${regulatoryNote || summary}` },
        { n: 3, title: '3. Composición / Información sobre los componentes', body: `Ingrediente activo principal: ${activeIngredient}. Revisar concentración exacta declarada en el envase original.` },
        { n: 4, title: '4. Primeros auxilios', body: firstAid || 'Retirar a lugar ventilado, quitar ropa contaminada y lavar piel/ojos con agua limpia por 15 minutos. Acudir al centro médico con la etiqueta original.' },
        { n: 5, title: '5. Medidas de lucha contra incendios', body: 'Utilizar extintor PQS ABC, CO2 o espuma resistente al alcohol. No dirigir chorro de agua a presión sobre derrames químicos. Usar equipo de protección respiratoria y mantenerse a favor del viento.' },
        { n: 6, title: '6. Medidas en caso de vertido accidental', body: spillControl || 'Contener de inmediato con arena seca o kit antiderrame sobre bandeja de contención. Evitar ingreso a canales de riego, suelos o quebradas. Disponer en cilindro rojo (NTP 900.058).' },
        { n: 7, title: '7. Manipulación y almacenamiento', body: 'Dosificar sobre bandeja antiderrame, aplicar a favor del viento y practicar triple lavado y perforado al envase vacío. Almacenar bajo techo en lugar fresco, ventilado y rotulado (RIMA).' },
        { n: 8, title: '8. Controles de exposición / Protección personal (EPP Perú)', body: ppeRequired || 'Respirador media cara con cartuchos para vapores orgánicos, lentes herméticos, guantes de nitrilo, traje impermeable y botas de jebe (Estándar SIG_SST_EST_008).' },
        { n: 9, title: '9. Propiedades físicas y químicas', body: `Formulación según etiqueta comercial (${chemicalGroup}). Consultar estado físico, pH, densidad, solubilidad y punto de inflamación en la ficha técnica del fabricante registrado en Perú.` },
        { n: 10, title: '10. Estabilidad y reactividad', body: 'Estable en envase original cerrado y protegido de calor extremo, chispas o humedad. Evitar mezclar con oxidantes fuertes o productos incompatibles sin indicación técnica.' },
        { n: 11, title: '11. Información toxicológica', body: `Banda toxicológica nacional: ${toxicologicalBand}. Posible exposición por vía oral, dérmica, ocular o inhalatoria durante la mezcla y aspersión sin EPP adecuado.` },
        { n: 12, title: '12. Información ecotoxicológica', body: `${usageDescription} Evitar deriva hacia cuerpos de agua, acequias y zonas de polinización (abejas). Respetar franjas de seguridad y horarios permitidos en campo.` },
        { n: 13, title: '13. Información relativa a la eliminación de productos (NTP 900.058)', body: 'Envases vacíos con triple lavado y perforados o residuos impregnados se entregan al acopio de residuos peligrosos (Cilindro Rojo) bajo normativa peruana de residuos sólidos (D.L. 1278 / RIMA).' },
        { n: 14, title: '14. Información relativa al transporte (Normativa Perú - MTC)', body: 'Transportar en envase original hermético, separado de alimentos y personas, con hoja MSDS a bordo y kit antiderrames conforme al D.S. N° 021-2008-MTC.' },
        { n: 15, title: '15. Información sobre reglamentación vigente en Perú', body: `Normativa aplicable en Perú: D.S. N° 001-2015-MINAGRI (SENASA), Ley N° 29783 (SST), D.S. N° 024-2016-EM / 023-2017-EM, D.S. N° 015-2006-SA, NTP 900.058 y RIMA SGAE. ${regulatoryNote}` },
        { n: 16, title: '16. Otras informaciones y emergencias en Perú', body: `Emergencias Perú: SAMU 106 · Bomberos 116 · CISPROQUIM Perú 080-050-847 · Activar Método PAS y Cartilla de Respuesta ante Emergencias de tu sede minera. Fecha de emisión: ${new Date().toLocaleDateString('es-PE')}.` }
      ];

  const pagesOps = [];
  let ops = [];
  let y = 780;

  const drawText = (targetOps, x, yy, font, size, colorRgb, txt) => {
    targetOps.push(`${colorRgb} rg`);
    targetOps.push(`BT /${font} ${size} Tf 1 0 0 1 ${x} ${yy} Tm ${toWinAnsiHex(txt)} Tj ET`);
  };

  const startNewPage = (isFirst = false) => {
    ops = [];
    if (isFirst) {
      ops.push('0.043 0.459 0.424 rg 36 742 540 62 re f');
      ops.push(`${bandRgb} rg 36 734 540 8 re f`);
      drawText(ops, 48, 782, 'F2', 9.5, '0.85 0.96 0.58', 'CONECTA SGAE · HOJA DE SEGURIDAD DE 16 SECCIONES (NORMATIVA PERÚ - SENASA / LEY 29783)');
      drawText(ops, 48, 761, 'F2', 16, '1 1 1', String(productName).slice(0, 56));
      drawText(ops, 48, 747, 'F1', 9, '0.93 0.98 0.96', `Ingrediente activo: ${String(activeIngredient).slice(0, 48)} | Banda: ${String(toxicologicalBand).slice(0, 38)}`);

      ops.push('0.95 0.97 0.96 rg 36 694 540 34 re f');
      drawText(ops, 46, 715, 'F2', 9.2, bandRgb, `INDICADOR DE PELIGRO: ${hazardLevelLabel}`);
      drawText(ops, 46, 701, 'F1', 8.8, '0.22 0.30 0.27', `Grupo: ${chemicalGroup} · Emitido en ECOGUÍA AL DÍA Perú (${new Date().toLocaleDateString('es-PE')})`);
      y = 674;
    } else {
      ops.push('0.043 0.459 0.424 rg 36 774 540 28 re f');
      drawText(ops, 48, 784, 'F2', 9.5, '1 1 1', `HOJA MSDS (16 ÍTEMS PERÚ) · ${String(productName).slice(0, 46)} (Continuación)`);
      y = 752;
    }
  };

  const finishPage = (pageNum) => {
    ops.push('0.85 0.90 0.87 RG 1 w 36 46 m 576 46 l S');
    drawText(
      ops,
      36,
      33,
      'F1',
      7.8,
      '0.35 0.42 0.40',
      `Conecta SGAE · Documento conforme a normativa peruana vigente (SENASA / Ley 29783 / NTP 900.058) · Pág. ${pageNum}`
    );
    pagesOps.push(ops.join('\n') + '\n');
  };

  startNewPage(true);

  for (const sec of items16) {
    const lines = wrapText(sec.body, 94);
    const neededHeight = 16 + lines.length * 11.5 + 8;
    if (y - neededHeight < 64) {
      finishPage(pagesOps.length + 1);
      startNewPage(false);
    }
    const accent = [2, 4, 11].includes(sec.n) ? bandRgb : '0.043 0.459 0.424';
    ops.push(`${accent} rg 36 ${y - 2} 3.5 12 re f`);
    drawText(ops, 45, y, 'F2', 9.8, '0.08 0.26 0.20', sec.title);
    y -= 13;
    for (const ln of lines) {
      if (y < 60) {
        finishPage(pagesOps.length + 1);
        startNewPage(false);
      }
      drawText(ops, 45, y, 'F1', 8.8, '0.18 0.24 0.22', ln);
      y -= 11.5;
    }
    y -= 6;
  }

  finishPage(pagesOps.length + 1);

  // Build multi-page PDF 1.4 objects
  // 1: Catalog, 2: Pages, 3: F1 Helvetica, 4: F2 Helvetica-Bold, then pairs (PageObj, ContentObj)
  const pageCount = pagesOps.length;
  const pageIds = [];
  const objects = [];
  objects.push('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n');

  let nextId = 5;
  const pageObjs = [];
  for (let i = 0; i < pageCount; i++) {
    const pageObjId = nextId++;
    const contentObjId = nextId++;
    pageIds.push(`${pageObjId} 0 R`);
    const streamStr = pagesOps[i];
    const streamLen = Buffer.byteLength(streamStr, 'latin1');
    pageObjs.push(`${pageObjId} 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 820] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${contentObjId} 0 R >>\nendobj\n`);
    pageObjs.push(`${contentObjId} 0 obj\n<< /Length ${streamLen} >>\nstream\n${streamStr}endstream\nendobj\n`);
  }

  objects.push(`2 0 obj\n<< /Type /Pages /Kids [${pageIds.join(' ')}] /Count ${pageCount} >>\nendobj\n`);
  objects.push('3 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>\nendobj\n');
  objects.push('4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>\nendobj\n');
  objects.push(...pageObjs);

  const header = '%PDF-1.4\n%\xE2\xE3\xCF\xD3\n';
  const chunks = [Buffer.from(header, 'latin1')];
  const offsets = [0];
  let currentOffset = chunks[0].length;

  for (const objStr of objects) {
    offsets.push(currentOffset);
    const buf = Buffer.from(objStr, 'latin1');
    chunks.push(buf);
    currentOffset += buf.length;
  }

  const xrefOffset = currentOffset;
  let xref = `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let i = 1; i <= objects.length; i++) {
    xref += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
  }
  const trailer = `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;
  chunks.push(Buffer.from(xref + trailer, 'latin1'));

  return Buffer.concat(chunks);
}
