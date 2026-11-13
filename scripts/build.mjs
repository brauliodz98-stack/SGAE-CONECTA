import { cp, mkdir, rm } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';

const filesToCheck = [
  'scripts/server.mjs',
  'src/main.js',
  'src/extras.js',
  'src/library-docs.js',
];

for (const file of filesToCheck) {
  execFileSync(process.execPath, ['--check', file], { stdio: 'inherit' });
}

await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });

for (const entry of ['index.html', 'manifest.webmanifest', 'sw.js', 'src', 'assets']) {
  await cp(entry, `dist/${entry}`, { recursive: true });
}

console.log('Build completado en dist/');
