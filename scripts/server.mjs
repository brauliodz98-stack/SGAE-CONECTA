import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { resolveDocsManifest } from './docs-catalog.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const types = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.png':'image/png', '.jpeg':'image/jpeg', '.jpg':'image/jpeg', '.webp':'image/webp', '.ico':'image/x-icon', '.svg':'image/svg+xml', '.pdf':'application/pdf', '.docx':'application/vnd.openxmlformats-officedocument.wordprocessingml.document', '.doc':'application/msword', '.xlsx':'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', '.webmanifest':'application/manifest+json', '.json':'application/json' };
const server = http.createServer(async (req,res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    if (pathname === '/assets/docs-manifest.json') {
      const manifest = await resolveDocsManifest(root);
      res.writeHead(200, {'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-cache'});
      res.end(JSON.stringify(manifest));
      return;
    }
    const file = normalize(join(root, pathname === '/' ? 'index.html' : pathname));
    if (!file.startsWith(root)) throw new Error('Invalid path');
    const data = await readFile(file);
    res.writeHead(200, {'Content-Type':types[extname(file).toLowerCase()] || 'application/octet-stream','Cache-Control':'no-cache'});
    res.end(data);
  } catch {
    res.writeHead(404, {'Content-Type':'text/plain; charset=utf-8'});
    res.end('No encontrado');
  }
});
const port = Number(process.env.PORT || 3000);
server.listen(port,'0.0.0.0',()=>console.log(`Conecta SGAE disponible en http://0.0.0.0:${port}`));
