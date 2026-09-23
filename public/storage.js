import { CARD_KEYS, validateCard, usableUrl } from './domain.js';
export const STORAGE_KEY = 'briefly.mvp.v1';
export function validateState(state) {
  const issue = () => { throw new Error('Saved demo data could not be read safely. It has been preserved. Reset the demo to start again.'); };
  const object = value => value && typeof value === 'object' && !Array.isArray(value);
  const timestamp = value => typeof value === 'string' && Number.isFinite(Date.parse(value));
  if (!state || state.version !== 1 || !Number.isInteger(state.revision) || state.revision < 0 || !['tasks', 'teams', 'proposals', 'progress'].every(k => Array.isArray(state[k]))) issue();
  if (!Number.isInteger(state.settings?.progressPoints) || state.settings.progressPoints < 1 || state.settings.progressPoints > 1000) issue();
  for (const name of ['tasks', 'teams', 'proposals', 'progress']) {
    if (new Set(state[name].map(v => v?.id)).size !== state[name].length || state[name].some(v => typeof v?.id !== 'string' || !/^[a-zA-Z0-9_-]+$/.test(v.id))) issue();
  }
  for (const t of state.tasks) {
    if (typeof t.original !== 'string' || typeof t.topic !== 'string' || typeof t.published !== 'boolean' || !Array.isArray(t.questions) || !Array.isArray(t.revisions) || !object(t.answers) || !object(t.evidence) || !['analyze', 'questions', 'card'].includes(t.stage)) issue();
    if (!t.draft || CARD_KEYS.some(k => typeof t.draft[k] !== 'string')) issue();
    if (t.confirmed !== null) { try { validateCard(t.confirmed); if (!timestamp(t.confirmedAt)) issue(); } catch { issue(); } }
    if (t.published && !t.confirmed) issue();
    if (![t.createdAt, t.updatedAt].every(timestamp)) issue();
    if (t.questions.some(q => !object(q) || !CARD_KEYS.includes(q.field) || typeof q.id !== 'string' || typeof q.text !== 'string' || typeof q.context !== 'string')) issue();
    if (Object.entries(t.answers).some(([k, v]) => !CARD_KEYS.includes(k) || typeof v !== 'string')) issue();
    if (Object.entries(t.evidence).some(([k, v]) => !CARD_KEYS.includes(k) || typeof v !== 'string')) issue();
    for (const r of t.revisions) {
      if (!object(r) || !timestamp(r.at) || typeof r.confirmedBy !== 'string' || !Number.isInteger(r.score) || r.score < 0 || r.score > 100) issue();
      try { validateCard(r.card); } catch { issue(); }
    }
  }
  for (const t of state.teams) if (typeof t.name !== 'string' || typeof t.initials !== 'string' || !['interests', 'skills', 'technologies'].every(k => Array.isArray(t[k]) && t[k].every(v => typeof v === 'string'))) issue();
  for (const p of state.proposals) {
    if (!state.tasks.some(t => t.id === p.taskId) || !state.teams.some(t => t.id === p.teamId) || !['Pending', 'Accepted', 'Rejected'].includes(p.status) || !Array.isArray(p.decisions) || !['idea', 'plan', 'duration', 'link'].every(k => typeof p[k] === 'string') || !usableUrl(p.link) || !timestamp(p.createdAt)) issue();
    if (p.decisions.some(d => !object(d) || !['Accepted', 'Rejected'].includes(d.decision) || typeof d.by !== 'string' || !timestamp(d.at))) issue();
  }
  for (const e of state.progress) if (!state.proposals.some(p => p.id === e.proposalId && p.taskId === e.taskId && p.teamId === e.teamId) || !Number.isInteger(e.points) || e.points < 1 || typeof e.milestone !== 'string' || typeof e.evidence !== 'string' || typeof e.confirmedBy !== 'string' || !timestamp(e.at)) issue();
  return state;
}
export function loadState(storage, seed) {
  try {
    const raw = storage.getItem(STORAGE_KEY);
    const state = raw ? validateState(JSON.parse(raw)) : seed();
    if (!raw) storage.setItem(STORAGE_KEY, JSON.stringify(state));
    return { state, error: '' };
  } catch { return { state: seed(), error: 'Browser storage is unavailable or saved data is invalid. Existing data was preserved. Enable storage or use Reset demo to recover; changes cannot be saved yet.' }; }
}
export function persistState(storage, state, { force = false } = {}) {
  validateState(state);
  try {
    const saved = storage.getItem(STORAGE_KEY);
    if (!force && saved && JSON.parse(saved).revision !== state.revision) throw new Error('conflict');
    const next = { ...state, revision: state.revision + 1 };
    storage.setItem(STORAGE_KEY, JSON.stringify(next));
    return next;
  } catch (error) {
    if (error.message === 'conflict') throw new Error('Another tab changed this demo. Reload to receive the latest data; your entered text remains on screen.');
    throw new Error('Your change could not be saved. Browser storage may be full or disabled. Your entered text is still available; free space or enable storage and try again.');
  }
}
