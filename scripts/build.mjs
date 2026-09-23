import { cp, mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import './check.mjs';
await mkdir('dist', { recursive: true });
await cp('public', 'dist', { recursive: true });
const manifest = {};
for (const name of await readdir('dist')) {
  if (name === 'build.json') continue;
  manifest[name] = createHash('sha256').update(await readFile(`dist/${name}`)).digest('hex');
}
await writeFile('dist/build.json', JSON.stringify({ builtAt: new Date().toISOString(), files: manifest }, null, 2));
console.log(`Production build complete: ${Object.keys(manifest).length} assets in dist/. Run node --env-file-if-exists=.env server.mjs --production`);
