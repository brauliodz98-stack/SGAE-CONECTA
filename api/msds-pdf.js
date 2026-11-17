import { buildMsdsSummaryPdf } from '../scripts/pdf-builder.mjs';

function sanitizeFilename(name) {
  return String(name || 'Ficha_MSDS_SGAE')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9_-]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 60) || 'Ficha_MSDS_SGAE';
}

export default async function handler(req, res) {
  try {
    const reqUrl = new URL(req.url, 'http://localhost');
    const dispParam = reqUrl.searchParams.get('disposition') || '';

    if (req.method === 'GET') {
      const mode = reqUrl.searchParams.get('mode') || '';
      const targetUrl = reqUrl.searchParams.get('url') || '';
      const name = sanitizeFilename(reqUrl.searchParams.get('name') || 'MSDS_Oficial');
      const disp = dispParam === 'inline' ? 'inline' : 'attachment';

      if (mode === 'proxy' && /^https?:\/\//i.test(targetUrl)) {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 8000);
        const upstream = await fetch(targetUrl, { redirect: 'follow', signal: controller.signal });
        clearTimeout(timer);
        const contentType = (upstream.headers.get('content-type') || '').toLowerCase();
        if (upstream.ok && (contentType.includes('pdf') || /\.pdf($|\?)/i.test(targetUrl))) {
          const arrBuf = await upstream.arrayBuffer();
          const buf = Buffer.from(arrBuf);
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/pdf');
          res.setHeader('Content-Disposition', `${disp}; filename="${name}.pdf"`);
          res.end(buf);
          return;
        }
        res.statusCode = 422;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify({ error: 'El enlace externo no entregó un binario PDF directo.' }));
        return;
      }

      const fallbackPdf = buildMsdsSummaryPdf({
        productName: reqUrl.searchParams.get('productName') || 'Producto Químico',
        activeIngredient: reqUrl.searchParams.get('activeIngredient') || '',
        toxicologicalBand: reqUrl.searchParams.get('toxicologicalBand') || '',
        hazardLevelLabel: reqUrl.searchParams.get('hazardLevelLabel') || '',
        usageDescription: reqUrl.searchParams.get('usageDescription') || '',
        summary: reqUrl.searchParams.get('summary') || '',
        ppeRequired: reqUrl.searchParams.get('ppeRequired') || '',
        firstAid: reqUrl.searchParams.get('firstAid') || '',
        spillControl: reqUrl.searchParams.get('spillControl') || '',
        regulatoryNote: reqUrl.searchParams.get('regulatoryNote') || ''
      });
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `${disp}; filename="MSDS_${name}.pdf"`);
      res.end(fallbackPdf);
      return;
    }

    if (req.method === 'POST') {
      let body = req.body;
      if (typeof body === 'string') {
        body = JSON.parse(body || '{}');
      } else if (!body) {
        const chunks = [];
        for await (const chunk of req) chunks.push(chunk);
        body = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}');
      }
      const disp = (dispParam === 'inline' || body?.disposition === 'inline') ? 'inline' : 'attachment';
      const filename = sanitizeFilename(body?.productName || 'Ficha_MSDS');
      const pdfBuf = buildMsdsSummaryPdf(body || {});
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `${disp}; filename="MSDS_${filename}.pdf"`);
      res.end(pdfBuf);
      return;
    }

    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({ error: 'Método no permitido' }));
  } catch (err) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({ error: err?.message || 'Error al generar el PDF MSDS.' }));
  }
}
