import { existsSync } from 'node:fs';
import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { EXTRA_ROOT_DOC_DIRS, resolveDocsManifest } from './docs-catalog.mjs';

const filesToCheck = [
  'scripts/server.mjs',
  'scripts/docs-catalog.mjs',
  'scripts/msds-service.mjs',
  'api/msds-search.js',
  'src/main.js',
  'src/extras.js',
  'src/library-docs.js',
];

for (const file of filesToCheck) {
  execFileSync(process.execPath, ['--check', file], { stdio: 'inherit' });
}

await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });

for (const entry of ['index.html', 'manifest.webmanifest', 'sw.js', 'src', 'assets', 'public', 'favicon.ico', ...EXTRA_ROOT_DOC_DIRS]) {
  if (existsSync(entry)) {
    await cp(entry, `dist/${entry}`, { recursive: true });
  }
}

const resolvedManifest = await resolveDocsManifest(process.cwd());
await mkdir('dist/assets', { recursive: true });
await writeFile('dist/assets/docs-manifest.json', JSON.stringify(resolvedManifest, null, 2), 'utf8');

console.log('Build completado en dist/');
