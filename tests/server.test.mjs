import test from 'node:test';
import assert from 'node:assert/strict';
import { makeServer } from '../server.mjs';
import { WEAK_DESCRIPTION } from '../public/seed.js';

async function running(fn, env = {}) {
  const server = makeServer(env, async () => { throw new Error('mock offline'); });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  try { await fn(`http://127.0.0.1:${server.address().port}`); } finally { await new Promise(resolve => server.close(resolve)); }
}
test('application and static assets load with security headers', () => running(async base => {
  for (const path of ['/', '/app.js', '/styles.css', '/favicon.svg']) { const r = await fetch(base + path); assert.equal(r.status, 200); assert.ok(r.headers.get('content-security-policy')); assert.ok((await r.text()).length); }
  assert.equal((await fetch(base + '/.env')).status, 404);
  assert.equal((await fetch(base + '/server.mjs')).status, 404);
  assert.equal((await fetch(base + '/%2e%2e%5c.env')).status, 404);
}));
test('config exposes no credentials and handles bad demo point configuration', () => running(async base => {
  const r = await (await fetch(base + '/api/config')).json(); assert.deepEqual(r, { aiConfigured: true, progressPoints: 10 });
}, { OPENAI_API_KEY: 'test-secret', PROGRESS_POINTS: '-1' }));
test('API analysis returns structured questions and local fallback', () => running(async base => {
  const r = await fetch(base + '/api/analyze', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ description: WEAK_DESCRIPTION, topic: 'Retail', answers: {} }) });
  assert.equal(r.status, 200); const result = await r.json(); assert.equal(result.mode, 'local'); assert.ok(result.questions.length >= 3);
}));
test('configured provider request failure falls back through HTTP endpoint', () => running(async base => {
  const r = await fetch(base + '/api/analyze', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ description: WEAK_DESCRIPTION, topic: 'Retail', answers: {} }) });
  const result = await r.json(); assert.equal(r.status, 200); assert.equal(result.mode, 'local'); assert.ok(!JSON.stringify(result).includes('test-secret'));
}, { OPENAI_API_KEY: 'test-secret' }));
test('HTTP validation handles malformed requests, wrong origin and unknown routes', () => running(async base => {
  const post = (body, extra = {}) => fetch(base + '/api/analyze', { method: 'POST', headers: { 'Content-Type': 'application/json', ...extra }, body });
  assert.equal((await post('{oops')).status, 400);
  assert.equal((await post('{}')).status, 400);
  assert.equal((await post('{}', { Origin: 'https://unrelated.example' })).status, 403);
  assert.equal((await post('{}', { 'Content-Type': 'text/plain' })).status, 415);
  assert.equal((await post('x'.repeat(97000))).status, 413);
  assert.equal((await fetch(base + '/api/missing')).status, 404);
  assert.equal((await fetch(base + '/', { method: 'POST' })).status, 405);
}));
