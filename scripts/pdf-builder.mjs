function toWinAnsiHex(text) {
  const str = String(text || '')
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/—|–/g, '-')
    .replace(/•/g, '*')
    .replace(/→/g, '->')
    .replace(/✓/g, 'OK')
    .replace(/≥/g, '>=')
    .replace(/≤/g, '<=');

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

function wrapText(text, maxChars = 84) {
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

export function buildMsdsSummaryPdf({
  productName = 'Producto Químico',
  activeIngredient = 'Por confirmar en etiqueta',
  chemicalGroup = 'Fitosanitario / Uso agrícola',
  toxicologicalBand = 'Verificar en etiqueta',
  usageDescription = '',
  summary = '',
  ppeRequired = '',
  firstAid = '',
  spillControl = '',
  officialLinks = [],
  regulatoryNote = ''
}) {
  const ops = [];
  let y = 760;

  const drawText = (x, yy, font, size, colorRgb, txt) => {
    ops.push(`${colorRgb} rg`);
    ops.push(`BT /${font} ${size} Tf 1 0 0 1 ${x} ${yy} Tm ${toWinAnsiHex(txt)} Tj ET`);
  };

  // Header band (brand forest green)
  ops.push('0.043 0.459 0.424 rg 36 734 540 72 re f');
  drawText(50, 778, 'F2', 10, '0.85 0.96 0.58', 'CONECTA SGAE · FICHA DE SEGURIDAD Y USO RESPONSABLE (MSDS / FDS)');
  drawText(50, 756, 'F2', 17, '1 1 1', String(productName).slice(0, 52));
  drawText(50, 741, 'F1', 9.5, '0.92 0.98 0.95', `Ingrediente activo: ${activeIngredient} | Banda: ${toxicologicalBand}`);

  y = 708;

  // Subtitle strip
  ops.push('0.94 0.97 0.95 rg 36 680 540 38 re f');
  drawText(48, 703, 'F2', 9.5, '0.09 0.28 0.22', `Grupo / Categoría: ${chemicalGroup}`);
  drawText(48, 689, 'F1', 9, '0.25 0.36 0.32', `Generado desde ECOGUÍA AL DÍA · Fecha de consulta: ${new Date().toLocaleDateString('es-PE')}`);
  y = 656;

  const addSection = (title, body, accentRgb = '0.043 0.459 0.424') => {
    if (!body) return;
    if (y < 110) return;
    ops.push(`${accentRgb} rg 36 ${y - 2} 4 14 re f`);
    drawText(46, y, 'F2', 11, '0.09 0.28 0.22', title);
    y -= 16;
    const lines = wrapText(body, 88);
    for (const ln of lines) {
      if (y < 72) break;
      drawText(46, y, 'F1', 9.5, '0.18 0.24 0.22', ln);
      y -= 13;
    }
    y -= 10;
  };

  addSection('1. Descripción del insumo y aplicación en campo', usageDescription || summary);
  if (summary && usageDescription && summary !== usageDescription) {
    addSection('2. Resumen práctico SSOMA para dosificación y aplicación', summary);
  }
  if (regulatoryNote) {
    addSection('Aviso regulatorio SENASA Perú', regulatoryNote, '0.72 0.14 0.12');
  }
  addSection('3. Equipo de Protección Personal (EPP) obligatorio', ppeRequired);
  addSection('4. Primeros auxilios inmediatos ante exposición', firstAid, '0.72 0.14 0.12');
  addSection('5. Control de derrames, envases vacíos y triple lavado', spillControl);

  if (Array.isArray(officialLinks) && officialLinks.length && y > 130) {
    ops.push('0.043 0.459 0.424 rg 36 ' + (y - 2) + ' 4 14 re f');
    drawText(46, y, 'F2', 11, '0.09 0.28 0.22', '6. Referencias y fuentes oficiales en Perú (SENASA / Fabricantes)');
    y -= 16;
    for (const link of officialLinks.slice(0, 4)) {
      if (y < 76) break;
      drawText(46, y, 'F2', 8.8, '0.12 0.34 0.48', `- ${String(link.title || 'Fuente oficial').slice(0, 82)}`);
      y -= 12;
      drawText(54, y, 'F1', 8, '0.35 0.42 0.40', String(link.uri || '').slice(0, 92));
      y -= 13;
    }
  }

  // Footer
  ops.push('0.85 0.90 0.87 RG 1 w 36 52 m 576 52 l S');
  drawText(
    36,
    38,
    'F1',
    8,
    '0.35 0.42 0.40',
    'Documento de apoyo operativo Conecta SGAE. Verifica siempre la etiqueta original del envase y la FDS del fabricante autorizado en Perú.'
  );

  const streamContent = ops.join('\n') + '\n';
  const streamLen = Buffer.byteLength(streamContent, 'latin1');

  const objects = [
    '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n',
    '2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n',
    '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 820] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>\nendobj\n',
    '4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>\nendobj\n',
    '5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>\nendobj\n',
    `6 0 obj\n<< /Length ${streamLen} >>\nstream\n${streamContent}endstream\nendobj\n`
  ];

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
