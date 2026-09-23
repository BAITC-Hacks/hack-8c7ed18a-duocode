import { readdir, readFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
async function files(dir) { const list = await readdir(dir, { withFileTypes: true }); return (await Promise.all(list.filter(e => !['node_modules', 'dist', '.git', 'test-results'].includes(e.name)).map(e => e.isDirectory() ? files(`${dir}/${e.name}`) : `${dir}/${e.name}`))).flat(); }
let count = 0;
for (const file of await files('.')) {
  if (!/\.(js|mjs)$/.test(file)) continue;
  const result = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
  if (result.status) { console.error(result.stderr); process.exit(1); }
  const content = await readFile(file, 'utf8');
  if (/\t|[ \t]+\r?$/m.test(content)) throw new Error(`Unexpected tab or trailing whitespace in ${file}`);
  count++;
}
console.log(`Syntax and whitespace checks passed for ${count} JavaScript files.`);
