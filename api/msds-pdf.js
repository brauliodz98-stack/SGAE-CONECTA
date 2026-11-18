function sanitizeFilename(name) {
  return String(name || 'MSDS_Proveedor')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9_-]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 60) || 'MSDS_Proveedor';
}

export default async function handler(req, res) {
  try {
    const reqUrl = new URL(req.url, 'http://localhost');
    const mode = reqUrl.searchParams.get('mode') || '';
    const targetUrl = reqUrl.searchParams.get('url') || '';
    const dispParam = reqUrl.searchParams.get('disposition') || '';
    const disp = dispParam === 'inline' ? 'inline' : 'attachment';

    if (req.method !== 'GET') {
      res.statusCode = 405;
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(JSON.stringify({ error: 'Solo se permite descarga o visualización directa de archivos reales del proveedor.' }));
      return;
    }

    if (mode === 'proxy' && /^https?:\/\//i.test(targetUrl)) {
      const name = sanitizeFilename(reqUrl.searchParams.get('name') || 'MSDS_Proveedor');
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 9000);
      const upstream = await fetch(targetUrl, {
        redirect: 'follow',
        signal: controller.signal,
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ConectaSGAE/1.0)' }
      });
      clearTimeout(timer);

      const contentType = (upstream.headers.get('content-type') || '').toLowerCase();
      if (upstream.ok && (contentType.includes('pdf') || /\.pdf($|\?)/i.test(targetUrl))) {
        const buf = Buffer.from(await upstream.arrayBuffer());
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `${disp}; filename="${name}.pdf"`);
        res.end(buf);
        return;
      }

      res.statusCode = 422;
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(JSON.stringify({ error: 'El enlace del proveedor no entregó un archivo PDF directo válido.' }));
      return;
    }

    if (mode === 'image' && /^https?:\/\//i.test(targetUrl)) {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 6000);
      const upstream = await fetch(targetUrl, {
        redirect: 'follow',
        signal: controller.signal,
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ConectaSGAE/1.0)' }
      });
      clearTimeout(timer);

      const contentType = (upstream.headers.get('content-type') || '').toLowerCase();
      if (upstream.ok && contentType.startsWith('image/')) {
        const buf = Buffer.from(await upstream.arrayBuffer());
        if (buf.length > 0 && buf.length <= 5 * 1024 * 1024) {
          res.statusCode = 200;
          res.setHeader('Content-Type', contentType.split(';')[0]);
          res.setHeader('Cache-Control', 'public, max-age=3600');
          res.end(buf);
          return;
        }
      }
      res.statusCode = 404;
      res.end();
      return;
    }

    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({ error: 'Solicitud no válida: solo se entregan documentos e imágenes auténticas del proveedor.' }));
  } catch (err) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({ error: err?.message || 'Error al obtener el recurso del proveedor.' }));
  }
}
