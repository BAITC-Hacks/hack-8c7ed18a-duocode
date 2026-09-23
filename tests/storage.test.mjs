import test from 'node:test';
import assert from 'node:assert/strict';
import { loadState, persistState, validateState, STORAGE_KEY } from '../public/storage.js';
import { makeSeed } from '../public/seed.js';
const memory = () => { const data = new Map(); return { getItem: k => data.get(k) || null, setItem: (k, v) => data.set(k, v) }; };
test('first load seeds and subsequent loads preserve saved decisions and points', () => {
  const storage = memory(), loaded = loadState(storage, makeSeed); assert.equal(loaded.error, '');
  loaded.state.tasks[0].draft.title = 'A saved unconfirmed change'; const next = persistState(storage, loaded.state);
  assert.equal(next.revision, 1); assert.equal(loadState(storage, makeSeed).state.tasks[0].draft.title, 'A saved unconfirmed change');
});
test('corrupt JSON and invalid references are preserved with a recoverable error', () => {
  const storage = memory(); storage.setItem(STORAGE_KEY, '{oops'); assert.ok(loadState(storage, makeSeed).error); assert.equal(storage.getItem(STORAGE_KEY), '{oops');
  const state = makeSeed(); state.proposals[0].teamId = 'missing'; storage.setItem(STORAGE_KEY, JSON.stringify(state));
  assert.ok(loadState(storage, makeSeed).error); assert.equal(JSON.parse(storage.getItem(STORAGE_KEY)).proposals[0].teamId, 'missing');
});
test('disabled or full storage fails without false success', () => {
  const storage = { getItem: () => null, setItem: () => { throw new Error('QuotaExceededError'); } };
  assert.ok(loadState(storage, makeSeed).error); assert.throws(() => persistState(storage, makeSeed()), /could not be saved/);
});
test('optimistic revisions reject stale multi-tab writes', () => {
  const storage = memory(), first = loadState(storage, makeSeed).state, stale = structuredClone(first);
  persistState(storage, first); assert.throws(() => persistState(storage, stale), /Another tab/);
});
test('explicit reseed recovers from damaged storage', () => {
  const storage = memory(); storage.setItem(STORAGE_KEY, 'broken'); persistState(storage, makeSeed(), { force: true });
  assert.equal(loadState(storage, makeSeed).error, '');
});
test('state validation rejects missing fields, duplicate IDs and invalid decision status', () => {
  for (const mutate of [s => s.tasks.push(s.tasks[0]), s => delete s.tasks[0].draft.data, s => s.proposals[0].status = 'Assigned', s => s.teams[0].skills = null, s => s.settings.progressPoints = -1, s => s.tasks[0].questions = [{ field: 'madeUp' }], s => s.tasks[0].revisions = [null], s => s.proposals[0].decisions = [null], s => s.tasks[0].evidence = [], s => s.tasks[0].id = '" onclick="bad']) {
    const s = makeSeed(); mutate(s); assert.throws(() => validateState(s));
  }
});
