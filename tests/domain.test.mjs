import test from 'node:test';
import assert from 'node:assert/strict';
import * as d from '../public/domain.js';
import { makeSeed, DEMO_IMPROVEMENTS, WEAK_DESCRIPTION } from '../public/seed.js';

const proposal = { idea: 'Build a clear order dashboard for shop staff.', plan: 'Review the sample data, implement search, and validate the prototype.', duration: '4 hours', link: 'https://example.com/prototype' };
test('exact readiness boundaries: 0, 39, 40, 69, 70, 89, 90, 100', () => {
  for (const [score, level] of [[0, 'Draft'], [39, 'Draft'], [40, 'Working'], [69, 'Working'], [70, 'Ready'], [89, 'Ready'], [90, 'Priority'], [100, 'Priority']]) assert.equal(d.readiness(score), level);
  for (const invalid of [-1, 101, NaN, Infinity]) assert.throws(() => d.readiness(invalid));
});
test('exact official field and category weights total 100, no title or topic bonus', () => {
  assert.deepEqual(d.FIELDS.map(f => f.points), [10, 10, 20, 15, 15, 10, 10, 5, 5]);
  const score = d.scoreCard(DEMO_IMPROVEMENTS);
  assert.equal(score.total, 100);
  assert.deepEqual(score.groups.map(g => g.max), [20, 20, 15, 15, 10, 10, 10]);
  assert.equal(d.scoreCard({ ...d.blankCard(), title: 'A useful task title', topic: 'Retail' }).total, 0);
  for (const f of d.FIELDS) {
    assert.equal(d.scoreCard({ ...d.blankCard(), [f.key]: DEMO_IMPROVEMENTS[f.key] }).total, f.points, f.key);
    assert.equal(d.scoreCard({ ...DEMO_IMPROVEMENTS, [f.key]: '' }).total, 100 - f.points, f.key);
  }
});
test('all 512 field combinations are deterministic, bounded and additive', () => {
  for (let mask = 0; mask < 512; mask++) {
    const card = d.blankCard(); let expected = 0;
    d.FIELDS.forEach((f, index) => { if (mask & (1 << index)) { card[f.key] = DEMO_IMPROVEMENTS[f.key]; expected += f.points; } });
    assert.equal(d.scoreCard(card).total, expected);
    assert.deepEqual(d.scoreCard(card), d.scoreCard(structuredClone(card)));
  }
});
test('blank, placeholder and non-purpose values earn zero', () => {
  for (const value of ['', '      ', 'TBD', 'TBD later on', 'to be determined', 'unknown', 'not provided', 'placeholder information', 'lorem ipsum dolor sit amet', 'xxxxxxxxxxxxxxxx']) {
    const card = Object.fromEntries(d.CARD_KEYS.map(k => [k, value])); assert.equal(d.scoreCard(card).total, 0, value);
  }
  assert.equal(d.fieldValid('success', 'It should work really well for everyone.'), false);
  assert.equal(d.fieldValid('success', 'The business started in 2020.'), false);
  assert.equal(d.fieldValid('success', 'Pass if the exported file matches every supplied test record.'), true);
  assert.equal(d.fieldValid('contact', 'A person on our business team'), false);
  assert.equal(d.fieldValid('interaction', 'We are generally available'), false);
  assert.equal(d.fieldValid('data', 'We cannot provide customer records.'), false);
  for (const key of ['context', 'need', 'data', 'result', 'constraints']) assert.equal(d.fieldValid(key, 'This is a reasonably long sentence.'), false, key);
});
test('source descriptions reject empty and unusably weak text', () => {
  for (const v of ['', 'help', 'Make an app', '                 ']) assert.throws(() => d.validateDescription(v));
  d.validateDescription(WEAK_DESCRIPTION);
  assert.throws(() => d.validateDescription('a business need '.repeat(1000)));
});
test('manual confirmation gates score and publishing; confirmed edits recalculate', () => {
  const s = makeSeed(), t = d.createTask(s, WEAK_DESCRIPTION, 'Retail');
  t.draft = { ...DEMO_IMPROVEMENTS };
  assert.equal(d.scoreTask(t).total, 0);
  assert.throws(() => d.publishTask(s, t.id));
  assert.throws(() => d.confirmTask(s, t.id, false));
  d.confirmTask(s, t.id, true); assert.equal(d.scoreTask(t).total, 100);
  t.draft.data = ''; assert.equal(d.scoreTask(t).total, 100);
  assert.throws(() => d.publishTask(s, t.id));
  d.confirmTask(s, t.id, true); assert.equal(d.scoreTask(t).total, 80);
  d.publishTask(s, t.id); assert.equal(t.published, true);
  t.draft.data = DEMO_IMPROVEMENTS.data; assert.equal(d.scoreTask(t).total, 80);
  assert.equal(d.catalog(s).find(x => x.id === t.id).confirmed.data, '');
  d.confirmTask(s, t.id, true); assert.equal(d.scoreTask(t).total, 100); assert.equal(t.revisions.length, 3);
});
test('required card title, topic and format validated without blocking low scores', () => {
  const s = makeSeed(), t = d.createTask(s, WEAK_DESCRIPTION);
  assert.throws(() => d.confirmTask(s, t.id, true));
  t.draft.title = 'A meaningful business task'; assert.throws(() => d.confirmTask(s, t.id, true));
  t.draft.topic = 'Retail'; d.confirmTask(s, t.id, true); d.publishTask(s, t.id);
  assert.equal(d.scoreTask(t).total, 0);
  assert.ok(d.catalog(s).find(x => x.id === t.id));
  assert.equal(d.submitProposal(s, t.id, s.teams[0].id, proposal).status, 'Pending');
});
test('seed includes five rough drafts, five confirmed cards, five teams, five proposals and all levels', () => {
  const s = makeSeed();
  assert.equal(s.tasks.filter(t => !t.confirmed).length, 5);
  assert.equal(s.tasks.filter(t => t.confirmed).length, 5);
  assert.equal(s.teams.length, 5); assert.equal(s.proposals.length, 5);
  assert.deepEqual(new Set(d.catalog(s).map(t => d.scoreTask(t).level)), new Set(d.LEVELS));
  assert.deepEqual(d.catalog(s).map(t => d.scoreTask(t).total), [100, 85, 70, 50, 10]);
  for (const t of s.teams) for (const k of ['name', 'interests', 'skills', 'technologies']) assert.ok(t[k].length);
  for (const t of s.tasks) { assert.ok(t.original); assert.ok(t.topic); for (const f of d.CARD_KEYS) assert.equal(typeof t.draft[f], 'string'); }
});
test('catalog visibility, sorting, deterministic ties, topic and readiness filters', () => {
  const s = makeSeed();
  assert.equal(d.catalog(s).length, 5);
  assert.equal(d.catalog(s, { level: 'Draft' })[0].id, 'task-community');
  assert.equal(d.catalog(s, { topic: 'Retail' })[0].id, 'task-orders');
  assert.equal(d.catalog(s, { topic: 'Retail', level: 'Draft' }).length, 0);
  assert.deepEqual(d.catalog(s, { order: 'asc' }).map(t => d.scoreTask(t).total), [10, 50, 70, 85, 100]);
  assert.equal(d.catalog(s, { search: 'order' }).length, 1);
  const copy = structuredClone(s.tasks[0]); copy.id = 'aaa'; s.tasks.push(copy);
  assert.equal(d.catalog(s)[0].id, 'aaa'); // creation timestamp ties break by ID
  copy.createdAt = '2026-09-22T00:00:00.000Z'; assert.equal(d.catalog(s)[0].id, 'task-orders');
});
test('proposals validate all fields, link and references', () => {
  for (const key of ['idea', 'plan', 'duration', 'link']) assert.throws(() => d.submitProposal(makeSeed(), 'task-community', 'team-orbit', { ...proposal, [key]: '' }), key);
  for (const link of ['javascript:alert(1)', 'data:text/html,test', 'example.com', 'https://user:secret@example.com']) assert.throws(() => d.submitProposal(makeSeed(), 'task-community', 'team-orbit', { ...proposal, link }));
  for (const link of ['https://example.com/demo', 'http://localhost:3000/prototype']) assert.ok(d.usableUrl(link));
  assert.throws(() => d.submitProposal(makeSeed(), 'missing', 'team-orbit', proposal));
  assert.throws(() => d.submitProposal(makeSeed(), 'task-orders', 'missing', proposal));
  assert.throws(() => d.submitProposal(makeSeed(), 'draft-1', 'team-orbit', proposal));
});
test('confirmed published improvements change catalog position while drafts do not', () => {
  const s = makeSeed(), t = d.getTask(s, 'task-community');
  assert.equal(d.catalog(s).find(x => x.id === t.id).rank, 5);
  t.draft = { ...DEMO_IMPROVEMENTS };
  assert.equal(d.catalog(s).find(x => x.id === t.id).rank, 5);
  d.confirmTask(s, t.id, true);
  assert.equal(t.published, true);
  assert.equal(d.catalog(s).find(x => x.id === t.id).rank, 2);
});
test('unlimited proposals including repeated proposals to Draft-rated tasks', () => {
  const s = makeSeed(); for (let i = 0; i < 125; i++) d.submitProposal(s, 'task-community', 'team-orbit', proposal);
  assert.equal(s.proposals.length, 130); assert.equal(s.proposals.filter(p => p.status === 'Pending').length, 130);
  assert.equal(s.progress.length, 0);
});
test('zero, one and multiple selections are manual and independent', () => {
  const s = makeSeed(); assert.equal(s.proposals.filter(p => p.status === 'Accepted').length, 0);
  d.decideProposal(s, 'proposal-1', 'Accepted');
  assert.equal(s.proposals[1].status, 'Pending'); assert.equal(s.proposals.filter(p => p.status === 'Accepted').length, 1);
  d.decideProposal(s, 'proposal-2', 'Accepted'); assert.equal(s.proposals.filter(p => p.status === 'Accepted').length, 2);
  for (const p of s.proposals) d.decideProposal(s, p.id, 'Rejected');
  assert.equal(s.proposals.filter(p => p.status === 'Accepted').length, 0);
  assert.equal(s.progress.length, 0);
  assert.ok(s.proposals.every(p => p.decisions.every(d => d.by === 'Business representative')));
});
test('invalid business decisions and non-business actors are rejected', () => {
  const s = makeSeed();
  assert.throws(() => d.decideProposal(s, 'proposal-1', 'Assigned'));
  assert.throws(() => d.decideProposal(s, 'proposal-1', 'Accepted', 'team'));
  assert.throws(() => d.decideProposal(s, 'missing', 'Accepted'));
  d.decideProposal(s, 'proposal-1', 'Accepted'); assert.throws(() => d.decideProposal(s, 'proposal-1', 'Accepted'));
});
test('progress requires accepted proposal, actual evidence, attestation and business actor', () => {
  const s = makeSeed(); const award = (...args) => d.confirmProgress(s, 'proposal-1', ...args);
  assert.throws(() => award('Prototype demonstrated', 'Business reviewed search results in the working prototype.', true));
  d.decideProposal(s, 'proposal-1', 'Accepted'); assert.equal(d.teamPoints(s, 'team-orbit'), 0);
  assert.throws(() => award('Prototype demonstrated', '', true));
  assert.throws(() => award('Prototype demonstrated', 'Business reviewed search results in the working prototype.', false));
  assert.throws(() => award('Prototype demonstrated', 'Business reviewed search results in the working prototype.', true, 'team'));
  award('Prototype demonstrated', 'Business reviewed search results in the working prototype.', true);
  assert.equal(d.teamPoints(s, 'team-orbit'), 10);
  assert.throws(() => award(' Prototype demonstrated ', 'Business reviewed search results in the working prototype.', true));
  s.settings.progressPoints = 25;
  award('Final handover reviewed', 'Business verified the completed handover notes and acceptance tests.', true);
  assert.equal(d.teamPoints(s, 'team-orbit'), 35);
  d.decideProposal(s, 'proposal-1', 'Rejected'); assert.equal(d.teamPoints(s, 'team-orbit'), 35);
  assert.throws(() => award('Another completed step', 'Business reviewed search results in the working prototype.', true));
});
test('missing task/team references reject decisions and progress', () => {
  const s = makeSeed(); s.teams = [];
  assert.throws(() => d.decideProposal(s, 'proposal-1', 'Accepted'));
  s.proposals[0].status = 'Accepted'; assert.throws(() => d.confirmProgress(s, 'proposal-1', 'Actual milestone', 'Actual evidence reviewed by business', true));
});
