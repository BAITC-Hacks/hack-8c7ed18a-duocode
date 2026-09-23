import test from 'node:test';
import assert from 'node:assert/strict';
import { analyze, localAnalysis, extractLocal, validateInput, validateOutput, AI_SCHEMA, SYSTEM_PROMPT } from '../public/ai.js';
import { WEAK_DESCRIPTION, DEMO_ANSWERS } from '../public/seed.js';
import { CARD_KEYS, scoreCard } from '../public/domain.js';
import { readFile } from 'node:fs/promises';

const input = { description: WEAK_DESCRIPTION, topic: 'Retail', answers: {} };
const response = output => ({ ok: true, json: async () => ({ status: 'completed', output: [{ content: [{ type: 'output_text', text: typeof output === 'string' ? output : JSON.stringify(output) }] }] }) });
test('local completeness analysis asks at least three relevant questions based on gaps', () => {
  const result = localAnalysis(input);
  assert.equal(result.mode, 'local'); assert.ok(result.questions.length >= 3);
  assert.ok(result.questions.every(q => q.context.includes('Retail') && q.context.includes('track orders')));
  assert.ok(result.questions.some(q => q.field === 'data'));
  assert.ok(result.questions.some(q => q.field === 'success'));
  assert.equal(result.card.need, WEAK_DESCRIPTION); assert.equal(result.card.contact, ''); assert.equal(result.card.data, '');
});
test('local structured generation only copies supplied description, topic and exact answers', () => {
  const data = { ...input, answers: DEMO_ANSWERS }, result = extractLocal(data);
  assert.deepEqual(result.card.context, DEMO_ANSWERS.context); assert.equal(result.evidence.context, 'answer:context');
  assert.equal(result.card.contact, ''); assert.equal(result.card.success, '');
  assert.equal(scoreCard(result.card).total, 45);
  assert.deepEqual(validateOutput(result, data), result);
});
test('input schema rejects incorrect types, unknown fields, invalid and oversize answers', () => {
  for (const bad of [null, [], {}, { ...input, secret: 'invent' }, { ...input, topic: 4 }, { ...input, answers: [] }, { ...input, answers: { invented: 'hello world' } }, { ...input, answers: { data: 'TBD' } }, { ...input, answers: { data: 12 } }, { ...input, answers: { data: 'x'.repeat(8001) } }]) assert.throws(() => validateInput(bad));
  validateInput({ ...input, answers: { data: '' } });
});
test('schema enumerates every card and evidence key with no extra properties', () => {
  assert.equal(AI_SCHEMA.additionalProperties, false);
  assert.deepEqual(AI_SCHEMA.properties.card.required, CARD_KEYS);
  assert.deepEqual(AI_SCHEMA.properties.evidence.required, CARD_KEYS);
  assert.match(SYSTEM_PROMPT, /never invent/);
});
test('documented response schema and exact prompt match executable definitions', async () => {
  assert.deepEqual(JSON.parse(await readFile(new URL('../docs/ai-schema.json', import.meta.url), 'utf8')), AI_SCHEMA);
  assert.ok((await readFile(new URL('../README.md', import.meta.url), 'utf8')).includes(SYSTEM_PROMPT));
});
test('unsupported facts and invented fields are rejected', () => {
  for (const mutate of [r => { r.card.contact = 'invented@example.com'; r.evidence.contact = 'description'; }, r => { r.card.company = 'Imaginary Ltd'; }, r => { delete r.card.users; }, r => { r.card.data = null; }, r => { r.evidence.data = 'description'; }, r => { r.card.topic = 'Retail'; r.evidence.topic = 'description'; }]) {
    const result = extractLocal(input); mutate(result); assert.throws(() => validateOutput(result, input));
  }
});
test('wrong answer mappings and dropped qualifiers/negations are rejected', () => {
  const data = { ...input, description: 'We cannot provide customer records. We need an order dashboard.', answers: { data: 'Synthetic records are available but may not leave the local machine.' } };
  const result = extractLocal(data);
  result.card.data = 'provide customer records'; result.evidence.data = 'description';
  assert.throws(() => validateOutput(result, data));
  const second = extractLocal(data); second.card.data = 'Synthetic records are available'; assert.throws(() => validateOutput(second, data));
  const third = extractLocal(data); third.card.contact = data.answers.data; third.evidence.contact = 'answer:data'; assert.throws(() => validateOutput(third, data));
});
test('all-supplied prose still receives at least three verification questions', () => {
  const result = localAnalysis({ ...input, answers: { context: 'We currently record orders by hand on paper.', need: 'We need a clear dashboard for tracking orders.', data: 'A synthetic CSV of 50 orders is available by email.', result: 'Deliver a working order search dashboard.', success: 'Find orders in under 10 seconds in 5 test cases.', users: 'Shop staff', constraints: 'Use synthetic data only in a five hour prototype.', contact: 'orders@shop.example', interaction: 'A kickoff consultation and final review meeting with feedback.' } });
  assert.equal(result.missing.length, 0); assert.equal(result.questions.length, 3);
  assert.ok(result.questions.every(q => q.text.startsWith('Please verify or correct:')));
});
test('missing API configuration returns meaningful local fallback', async () => {
  const result = await analyze(input); assert.equal(result.mode, 'local'); assert.ok(result.questions.length >= 3);
});
test('valid provider response uses strict schema and server-only credentials', async () => {
  let sent;
  const result = await analyze(input, { apiKey: 'test-key', fetchImpl: async (url, options) => { sent = { url, options }; return response(extractLocal(input)); } });
  assert.equal(result.mode, 'ai'); assert.equal(sent.url, 'https://api.openai.com/v1/responses');
  const request = JSON.parse(sent.options.body); assert.equal(request.store, false); assert.equal(request.text.format.strict, true);
  assert.equal(sent.options.headers.Authorization, 'Bearer test-key'); assert.ok(!JSON.stringify(result).includes('test-key'));
});
for (const [name, fetchImpl] of [
  ['network failure', async () => { throw new Error('network: secret provider payload'); }],
  ['HTTP rejection', async () => ({ ok: false })],
  ['malformed JSON', async () => response('{not json}')],
  ['invalid schema', async () => response({ card: { title: 'A hallucinated title' } })],
  ['empty output', async () => response('')],
  ['refusal', async () => ({ ok: true, json: async () => ({ output: [{ content: [{ type: 'refusal', refusal: 'Cannot comply' }] }] }) })],
  ['incomplete output', async () => ({ ok: true, json: async () => ({ status: 'incomplete', output: [] }) })],
  ['invented fact', async () => { const r = extractLocal(input); r.card.contact = 'made-up@invented.example'; r.evidence.contact = 'description'; return response(r); }],
  ['empty card', async () => response({ card: Object.fromEntries(CARD_KEYS.map(k => [k, ''])), evidence: Object.fromEntries(CARD_KEYS.map(k => [k, ''])) })]
]) test(`${name} safely falls back with source preservation`, async () => {
  const result = await analyze(input, { apiKey: 'test-key', fetchImpl });
  assert.equal(result.mode, 'local'); assert.equal(result.card.need, input.description); assert.equal(result.card.contact, '');
  assert.ok(result.questions.length >= 3); assert.ok(!JSON.stringify(result).includes('secret provider'));
});
test('timeout aborts provider and safely completes via fallback', async () => {
  let signal;
  const result = await analyze(input, { apiKey: 'test-key', timeout: 15, fetchImpl: (_, opts) => { signal = opts.signal; return new Promise(() => {}); } });
  assert.equal(result.mode, 'local'); assert.equal(signal.aborted, true);
});
