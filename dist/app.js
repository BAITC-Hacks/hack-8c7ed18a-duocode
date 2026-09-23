import { FIELDS, CARD_KEYS, LEVELS, TOPICS, blankCard, clone, createTask, confirmTask, publishTask, scoreTask, hasEdits, catalog, submitProposal, decideProposal, confirmProgress, teamPoints, getTask } from './domain.js';
import { localAnalysis, validateInput, validateOutput, questionsFor } from './ai.js';
import { makeSeed, WEAK_DESCRIPTION, DEMO_ANSWERS, DEMO_IMPROVEMENTS } from './seed.js';
import { loadState, persistState, STORAGE_KEY } from './storage.js';

const safeStorage = { getItem: k => localStorage.getItem(k), setItem: (k, v) => localStorage.setItem(k, v) };
const loaded = loadState(safeStorage, makeSeed);
let state = loaded.state;
const ui = { role: 'business', view: 'workspace', selected: '', teamId: state.teams[0]?.id, forms: {}, filters: { topic: '', level: '', order: 'desc', search: '' }, busy: '', error: '', storageError: loaded.error, aiConfigured: false, reset: false, proposalOpen: false };
const app = document.querySelector('#app');
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const date = value => new Date(value).toLocaleDateString('en', { month: 'short', day: 'numeric' });
const paths = {
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  catalog: '<path d="M4 4h16v16H4zM4 9h16M9 9v11"/>', teams: '<circle cx="9" cy="8" r="3"/><path d="M3 20v-2a6 6 0 0 1 12 0v2M17 5a3 3 0 0 1 0 6m2 3c2 1 2 3 2 6"/>',
  spark: '<path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z"/>',
  arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>', plus: '<path d="M12 5v14M5 12h14"/>', check: '<path d="m5 12 4 4L19 6"/>',
  book: '<path d="M12 5C8 2 4 3 3 4v15c4-2 6-1 9 1 3-2 5-3 9-1V4c-4-2-7-1-9 1Zm0 0v15"/>',
  arrowup: '<path d="M7 17 17 7M7 7h10v10"/>', reset: '<path d="M3 11a9 9 0 1 1 2 7M3 4v7h7"/>', link: '<path d="m10 13 4-4M8 16l-1 1a4 4 0 0 1-6-6l4-4a4 4 0 0 1 6 0m2 1 1-1a4 4 0 0 1 6 6l-4 4a4 4 0 0 1-6 0"/>'
};
const icon = (name, cls = '') => `<svg class="icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.spark}</svg>`;
const badge = (label, extra = '') => `<span class="badge ${esc(label.toLowerCase())} ${extra}">${label === 'Priority' ? '✦ ' : ''}${esc(label)}</span>`;
const button = (text, action, cls = 'secondary', attrs = '') => `<button type="button" class="btn ${cls}" data-action="${action}" ${attrs} ${ui.busy ? 'disabled' : ''}>${text}</button>`;
const formValues = (key, initial = {}) => ui.forms[key] ||= clone(initial);
const input = (label, name, value = '', options = {}) => `<label class="field ${options.wide ? 'wide' : ''}"><span>${esc(label)}${options.points ? `<small>${options.points} pts</small>` : ''}${options.required ? '<i aria-hidden="true"> *</i>' : ''}</span>${options.textarea ? `<textarea name="${name}" rows="${options.rows || 3}" maxlength="${options.max || 8000}" ${options.required ? 'required' : ''} placeholder="${esc(options.placeholder || '')}">${esc(value)}</textarea>` : `<input name="${name}" value="${esc(value)}" type="${options.type || 'text'}" maxlength="${options.max || 8000}" ${options.required ? 'required' : ''} placeholder="${esc(options.placeholder || '')}">`}${options.hint ? `<small class="hint">${esc(options.hint)}</small>` : ''}</label>`;
const topicSelect = (name, value = '') => `<label class="field"><span>Topic / industry <i aria-hidden="true">*</i></span><select name="${name}" required><option value="">Choose a topic</option>${[...new Set([...TOPICS, ...state.tasks.map(t => t.confirmed?.topic || t.topic), value])].filter(Boolean).map(t => `<option ${t === value ? 'selected' : ''}>${esc(t)}</option>`).join('')}</select></label>`;
function toast(message) { const node = document.querySelector('#toast'); node.textContent = message; node.classList.add('show'); clearTimeout(ui.toastTimer); ui.toastTimer = setTimeout(() => node.classList.remove('show'), 6000); }
function commit(action, force = false) {
  if (ui.storageError && !force) throw new Error(ui.storageError);
  const next = clone(state);
  const result = action(next);
  state = persistState(safeStorage, next, { force });
  return result;
}
function navigate(view, selected = '') {
  ui.view = view; ui.selected = selected; ui.error = ''; ui.proposalOpen = false;
  render(); window.scrollTo(0, 0);
}
function errorMessage(message) { ui.error = message; render(); document.querySelector('[role="alert"]')?.scrollIntoView({ block: 'center', behavior: 'smooth' }); }
async function work(label, action, success) {
  if (ui.busy) return;
  ui.error = ''; ui.busy = label; render();
  try { await new Promise(resolve => setTimeout(resolve, 180)); await action(); if (success) toast(success); }
  catch (error) { ui.error = error.message || 'This action could not be completed. Your entered information is preserved.'; }
  finally { ui.busy = ''; render(); if (ui.error) document.querySelector('[role="alert"]')?.scrollIntoView({ block: 'center' }); }
}
async function requestAnalysis(inputData) {
  validateInput(inputData);
  try {
    const response = await fetch('/api/analyze', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(inputData), signal: AbortSignal.timeout(22000) });
    if (!response.ok) throw new Error('Analysis unavailable');
    const result = await response.json();
    validateOutput({ card: result.card, evidence: result.evidence }, inputData);
    return { ...result, questions: questionsFor(result.card, inputData) };
  } catch { return localAnalysis(inputData, 'The AI service could not be reached or verified. The local assistant completed your request safely.'); }
}

function shell(content) {
  const nav = [['workspace', 'grid', 'My workspace'], ['catalog', 'catalog', 'Task catalog'], ['teams', 'teams', 'Team profiles'], ['guide', 'book', 'Demo guide']];
  return `<aside class="sidebar"><a class="brand" href="#" data-action="home"><img src="/favicon.svg" alt="" width="36" height="36">briefly<span>®</span></a><div class="workspace-label">THE OPPORTUNITY WORKSPACE</div><nav aria-label="Main navigation">${nav.map(([view, symbol, label]) => `<button data-action="nav" data-view="${view}" class="nav-item ${ui.view === view || view === 'workspace' && ['new', 'questions', 'edit'].includes(ui.view) ? 'active' : ''}">${icon(symbol)}${label}${view === 'catalog' ? `<span class="nav-count" aria-hidden="true">${catalog(state).length}</span>` : ''}</button>`).join('')}</nav><div class="sidebar-note"><div class="little-spark">✦</div><strong>Better briefs.<br>Real possibilities.</strong><p>A little clarity opens up a lot of opportunity.</p><button data-action="nav" data-view="guide" class="text-link">How Briefly works ${icon('arrow')}</button></div><div class="sidebar-bottom"><span class="live-dot"></span> Hackathon demo <span class="vtag">v1.0</span></div></aside>
    <div class="page"><header class="topbar"><div class="crumb">Workspace <span>/</span> <strong>${({ workspace: 'Overview', catalog: 'Task catalog', teams: 'Teams', guide: 'Demo guide', new: 'New task', questions: 'Clarify your brief', edit: 'Review your card', detail: 'Task details' })[ui.view]}</strong></div><div class="top-actions"><span class="demo-label">Demo perspective</span><div class="role-switch" aria-label="Demo role">${['business', 'team'].map(role => `<button data-action="role" data-role="${role}" class="${ui.role === role ? 'selected' : ''}" aria-pressed="${ui.role === role}">${role === 'business' ? 'Business' : 'Team'}</button>`).join('')}</div><div class="avatar">${ui.role === 'business' ? 'B' : 'T'}</div></div></header><main id="main" tabindex="-1">
    ${ui.storageError ? `<div class="alert" role="alert">${esc(ui.storageError)} ${button('Reset demo', 'reset')}</div>` : ''}
    ${ui.error ? `<div class="alert" role="alert"><strong>Let’s fix that.</strong> ${esc(ui.error)}</div>` : ''}
    ${ui.busy ? `<div class="processing" role="status"><span class="spinner"></span>${esc(ui.busy)}</div>` : ''}
    ${ui.role === 'team' ? `<div class="team-bar"><span>${icon('teams')} You’re exploring as</span><label><span class="sr-only">Active team</span><select id="active-team" aria-label="Active team">${state.teams.map(t => `<option value="${t.id}" ${t.id === ui.teamId ? 'selected' : ''}>${esc(t.name)}</option>`).join('')}</select></label><small>Every published task is open to your team.</small></div>` : ''}
    ${content}</main><footer><span>Made for clearer collaboration.</span><span>All seeded organizations, contacts and teams are synthetic. <button data-action="reset" class="text-link">Reset demo</button></span></footer></div>
    ${ui.reset ? `<div class="modal-backdrop"><section class="modal" role="dialog" aria-modal="true" aria-labelledby="reset-title"><h2 id="reset-title">Reset this demo?</h2><p>This replaces tasks, proposals and progress in this browser with the original synthetic examples. Your current demo changes will be removed.</p><div class="actions">${button('Keep my data', 'cancel-reset')}${button('Reset synthetic demo', 'confirm-reset', 'danger')}</div></section></div>` : ''}`;
}
function heading(kicker, title, subtitle, actions = '') { return `<div class="page-heading"><div><div class="eyebrow">${kicker}</div><h1>${title}</h1><p>${subtitle}</p></div>${actions}</div>`; }
function empty(title, text, action = '') { return `<div class="empty">${icon('catalog')}<h3>${title}</h3><p>${text}</p>${action}</div>`; }
function taskTile(t) {
  const score = scoreTask(t), c = t.confirmed || t.draft;
  return `<article class="task-tile ${score.level === 'Priority' && t.published ? 'priority-card' : ''}"><div class="tile-top"><span class="topic">${esc(c.topic || t.topic || 'Uncategorized')}</span>${t.published ? badge(score.level) : '<span class="badge editing">Unconfirmed draft</span>'}</div><h3><button data-action="open" data-id="${t.id}">${esc(c.title || t.original)}</button></h3><p>${esc(c.need || t.original)}</p><div class="tile-bottom"><div><strong>${t.confirmed ? score.total : '—'}</strong><span>${t.confirmed ? '/ 100 readiness' : 'Awaiting review'}</span></div><button aria-label="Open ${esc(c.title || t.original)}" data-action="open" data-id="${t.id}" class="round-button">${icon('arrow')}</button></div><div class="tile-meta"><span>${t.published ? `<span class="live-dot"></span> Published${t.rank ? ` · Rank #${t.rank}` : ''}` : 'Private editing draft'}</span><span>${state.proposals.filter(p => p.taskId === t.id).length} proposals</span></div></article>`;
}
function workspace() {
  if (ui.role === 'team') return teamWorkspace();
  const confirmed = state.tasks.filter(t => t.confirmed), pending = state.proposals.filter(p => p.status === 'Pending').length;
  return `${heading('YOUR BUSINESS WORKSPACE', 'Good ideas start with a clear brief.', 'Shape your business need into a task that teams can act on.', button(`${icon('plus')} Create a task`, 'new', 'primary'))}
    <section class="hero"><div><span class="hero-tag">A LITTLE CLARITY GOES A LONG WAY</span><h2>Your next great collaboration<br>starts here.</h2><p>Describe the challenge. Build a stronger brief.<br>Let the right teams come to you.</p>${button(`Turn an idea into a task ${icon('arrow')}`, 'new', 'white')}</div><div class="hero-visual" aria-label="Describe, clarify, confirm, connect"><div class="orbit orbit-one"></div><div class="orbit orbit-two"></div><div class="mini-card"><div class="mini-top"><span class="mini-icon">✦</span><span>A clearer brief</span><span class="mini-check">✓</span></div><div class="mini-lines"><i></i><i></i></div><div class="mini-score"><span>Readiness</span><strong>90<span>/100</span></strong></div><div class="mini-progress"></div><span class="mini-priority">✦ Priority opportunity</span></div><div class="floating-tag">${icon('check')} Human confirmed</div></div></section>
    <section class="stats" aria-label="Workspace statistics"><div><span>Published opportunities</span><strong>${catalog(state).length}</strong><small>Open to every team</small></div><div><span>Average readiness</span><strong>${confirmed.length ? Math.round(confirmed.reduce((s, t) => s + scoreTask(t).total, 0) / confirmed.length) : 0}<em>/100</em></strong><small>Better briefs rank higher</small></div><div><span>Proposals to review</span><strong>${pending}</strong><small>You make every decision</small></div><div><span>Confirmed progress</span><strong>${state.progress.reduce((s, e) => s + e.points, 0)}<em> pts</em></strong><small>Earned through real milestones</small></div></section>
    <div class="section-heading"><div><h2>Your task cards <span class="count">${confirmed.length}</span></h2><p>More useful information. More visibility. Better collaboration.</p></div>${button('View public catalog ' + icon('arrow'), 'catalog', 'quiet')}</div><div class="task-grid">${confirmed.map(taskTile).join('') || empty('Your first opportunity starts here', 'Create a task and turn a rough idea into a confirmed brief.')}</div>
    <div class="section-heading"><div><h2>Ideas in progress <span class="count">${state.tasks.filter(t => !t.confirmed).length}</span></h2><p>Private, unconfirmed drafts — continue whenever you’re ready.</p></div></div><div class="draft-list">${state.tasks.filter(t => !t.confirmed).map(t => `<button data-action="open" data-id="${t.id}" class="draft-row"><div class="draft-symbol">${icon('book')}</div><div><strong>${esc(t.draft.title || t.original)}</strong><span>${esc(t.topic)} · ${t.stage === 'questions' ? 'Clarification in progress' : t.stage === 'card' ? 'Ready for your review' : 'Ready to analyze'}</span></div>${icon('arrow')}</button>`).join('') || empty('No unfinished ideas', 'Your drafts will appear here as you start a new task.')}</div>`;
}
function catalogView() {
  const items = catalog(state, ui.filters), all = catalog(state);
  return `${heading('THE SHARED TASK CATALOG', 'Find a challenge worth solving.', 'Clearer briefs rise to the top. Every published task is open to every team.')}
  <div class="catalog-note">${icon('spark')} <div><strong>Clarity gets noticed.</strong> Tasks rank by confirmed readiness. A Draft readiness badge means clarification is needed; you can still propose a solution.</div></div>
  <section class="filters" aria-label="Catalog filters"><label><span>Search tasks</span><input id="search" type="search" placeholder="Find a title or business need…" value="${esc(ui.filters.search)}"></label><label><span>Topic</span><select id="filter-topic" aria-label="Topic"><option value="">All topics</option>${[...new Set(all.map(t => t.confirmed.topic))].sort().map(t => `<option ${ui.filters.topic === t ? 'selected' : ''}>${esc(t)}</option>`).join('')}</select></label><label><span>Readiness</span><select id="filter-level" aria-label="Readiness"><option value="">All readiness levels</option>${LEVELS.map(l => `<option ${ui.filters.level === l ? 'selected' : ''}>${l}</option>`).join('')}</select></label><label><span>Sort by</span><select id="filter-order" aria-label="Sort by"><option value="desc" ${ui.filters.order === 'desc' ? 'selected' : ''}>Highest rating first</option><option value="asc" ${ui.filters.order === 'asc' ? 'selected' : ''}>Lowest rating first</option></select></label></section>
  <div class="results-line"><span><strong>${items.length}</strong> ${items.length === 1 ? 'opportunity' : 'opportunities'} ${items.length !== all.length ? `of ${all.length}` : 'to make a difference'}</span>${button('Clear filters', 'clear-filters', 'text-link')}</div><div class="task-grid">${items.map(taskTile).join('')}</div>${!items.length ? all.length ? empty('No tasks match these filters', 'Try another topic, readiness level or search term.', button('Clear filters', 'clear-filters')) : empty('The catalog is waiting for its first task', 'Confirm and publish a business task to make it available to every team.') : ''}`;
}
function steps(current) { return `<ol class="steps">${['Describe', 'Clarify', 'Review & confirm', 'Publish & connect'].map((s, i) => `<li class="${i < current ? 'done' : i === current ? 'current' : ''}"><span>${i < current ? '✓' : i + 1}</span>${s}</li>`).join('')}</ol>`; }
function newView() {
  const existing = ui.selected ? getTask(state, ui.selected) : null;
  const f = formValues('create', { description: existing?.original || '', topic: existing?.topic || '' });
  return `${heading('BUILD A BETTER BRIEF', 'What would you like to solve?', 'Start with what you know. We’ll help you find the gaps.')}${steps(0)}<div class="two-column"><section class="panel"><div class="panel-heading"><span class="number-chip">01</span><div><h2>Describe your business need</h2><p>You don’t need a perfect brief to get started.</p></div></div><form data-form="create">${input('Your rough description', 'description', f.description, { textarea: true, rows: 7, required: true, placeholder: 'What is happening now? What would you like to improve?', hint: 'Use at least 4 words and 16 characters. Your original text stays available as a factual source.' })}${topicSelect('topic', f.topic)}<div class="form-actions">${button('Use weak demo example', 'weak', 'quiet')}<button class="btn primary" ${ui.busy ? 'disabled' : ''}>${icon('spark')} Analyze my brief</button></div></form></section><aside class="panel soft"><div class="section-icon">${icon('spark')}</div><h2>A helpful second pair of eyes.</h2><p>The assistant checks what’s missing and asks relevant questions. It only uses facts you supply.</p><ul class="checklist"><li>You can leave unknown details blank.</li><li>Every generated field stays editable.</li><li>You confirm the card before it goes live.</li><li>More clarity earns a higher catalog position.</li></ul><div class="assistant-mode"><span class="live-dot"></span>${ui.aiConfigured ? 'AI configured · local fallback available' : 'Local assistant · no API key needed'}</div></aside></div>`;
}
function questionsView() {
  const t = getTask(state, ui.selected), f = formValues(`answers:${t.id}`, t.answers);
  return `${heading('BUILD A BETTER BRIEF', 'A few details make all the difference.', 'Answer what you know. Leave unknown facts blank; they will stay missing.')}${steps(1)}<div class="source-callout"><strong>Your original description</strong><p>${esc(t.original)}</p></div><div class="notice">${icon('spark')} ${esc(t.aiNotice || 'The assistant found gaps in the brief.')}</div><form class="panel" data-form="answers:${t.id}"><div class="section-heading compact"><div><h2>Clarify your brief</h2><p>${t.questions.length} relevant questions · answers are optional when information is unavailable.</p></div><span class="badge editing">Unconfirmed source</span></div><div class="form-grid">${t.questions.map(q => input(q.text, q.field, f[q.field] || '', { textarea: true, points: q.points, hint: q.context, placeholder: 'Add a real detail, or leave blank if unknown.' })).join('')}</div><div class="form-actions">${button('Add prepared demo answers', 'demo-answers', 'quiet')}<button class="btn primary" ${ui.busy ? 'disabled' : ''}>Generate editable card ${icon('arrow')}</button></div><p class="footnote">Prepared demo answers are synthetic user-supplied examples. They are inserted only when you choose that action.</p></form>`;
}
function ratingPanel(t) {
  const s = scoreTask(t);
  return `<section class="panel rating-panel"><div class="eyebrow">OFFICIAL READINESS</div><div class="score-row"><div class="score-ring" style="--score:${s.total}%"><div><strong data-testid="official-score">${s.total}</strong><span>out of 100</span></div></div><div>${badge(s.level)}<p>${t.confirmed ? 'Based on confirmed information' : 'Awaiting your confirmation'}</p></div></div><div class="rating-explainer">${s.level === 'Draft' ? 'Requires clarification. Published Draft tasks remain visible and open to proposals.' : s.level === 'Working' ? 'Teams can respond. Add more detail to move higher in the catalog.' : s.level === 'Ready' ? 'A strong brief, positioned higher in the catalog.' : 'Fully ready for work and highlighted in the catalog.'}</div><h3>Every point explained</h3><div class="breakdown">${s.groups.map(g => `<details><summary><span>${esc(g.name)}</span><strong>${g.earned}<em> / ${g.max}</em></strong></summary>${g.fields.map(f => `<div class="field-reason"><strong>${f.earned ? '✓' : '○'} ${esc(f.label)} · ${f.earned}/${f.points}</strong><p>${esc(f.reason)}</p>${!f.earned ? `<p>${esc(f.hint)}</p>` : ''}</div>`).join('')}</details>`).join('')}</div><p class="footnote">Title and topic add no points. Unconfirmed edits never change this official score.</p></section><section class="panel improve"><h3>${s.missing.length ? 'Your next steps to a stronger brief' : 'All the details are in place'}</h3>${s.missing.length ? `<ul>${s.missing.map(f => `<li><div><strong>${esc(f.label)}</strong><span>+${f.points}</span></div><p>${esc(f.hint)}</p></li>`).join('')}</ul>` : '<div class="complete-message">✓ No missing fields. All seven scoring categories are complete.</div>'}</section>`;
}
function sourcePanel(t) {
  return `<details class="panel sources"><summary>Factual sources & confirmation history</summary><h3>Original description</h3><p class="preserve">${esc(t.original)}</p><h3>Clarification questions and answers</h3>${t.questions.length ? t.questions.map(q => `<div class="source-answer"><strong>${esc(q.text)}</strong><p>${esc(t.answers[q.field] || 'Not supplied')}</p></div>`).join('') : '<p>These are supplied synthetic fixture facts; no generated answers.</p>'}<h3>Generated-field evidence</h3><ul>${Object.entries(t.evidence).filter(([, v]) => v).map(([k, v]) => `<li><strong>${esc(k)}:</strong> ${esc(v)}</li>`).join('') || '<li>No generated evidence yet.</li>'}</ul><p class="hint">Evidence records extraction sources. Later business edits are recorded in the confirmed revisions below.</p><h3>Confirmed revisions</h3>${t.revisions.length ? t.revisions.map((r, i) => `<details><summary>Revision ${i + 1} · ${date(r.at)} · ${r.score}/100 · ${esc(r.confirmedBy)}</summary><dl>${CARD_KEYS.map(k => `<dt>${esc(k)}</dt><dd>${esc(r.card[k] || 'Not supplied')}</dd>`).join('')}</dl></details>`).join('') : '<p>No human-confirmed revisions yet.</p>'}<p class="footnote">Created ${date(t.createdAt)} · Updated ${date(t.updatedAt)}</p></details>`;
}
function editView() {
  const t = getTask(state, ui.selected), f = formValues(`card:${t.id}`, { ...t.draft, attested: false });
  return `${heading('BUILD A BETTER BRIEF', t.confirmed ? 'Make a good brief even better.' : 'Make this brief your own.', 'Review every fact, edit freely, then confirm when it’s accurate.', button('Back to workspace', 'workspace', 'quiet'))}${steps(2)}<div class="notice amber"><strong>Unconfirmed editing draft.</strong> ${t.published ? `Your published card keeps its confirmed ${scoreTask(t).total}/100 rating until you confirm these edits.` : 'Publication becomes available after your manual confirmation.'}</div><div class="two-column"><div><form class="panel" data-form="card:${t.id}"><div class="panel-heading"><span class="number-chip">03</span><div><h2>Your editable task card</h2><p>Unknown details stay empty. A title and topic are required.</p></div></div><div class="form-grid">${input('Task title', 'title', f.title, { required: true, max: 140 })}${topicSelect('topic', f.topic)}${FIELDS.map(field => input(field.label, field.key, f[field.key], { textarea: true, points: field.points, hint: field.hint, wide: ['context', 'need'].includes(field.key) })).join('')}</div><label class="checkbox"><input type="checkbox" name="attested" ${f.attested ? 'checked' : ''}> <span>I have reviewed this card and confirm that the supplied facts are accurate. Missing details may remain blank.</span></label><div class="form-actions">${button('Save unconfirmed draft', 'save-draft')}<button class="btn primary" ${ui.busy ? 'disabled' : ''}>${icon('check')} Confirm card & calculate rating</button></div></form><div class="demo-helper">${button('Insert complete synthetic demo details', 'demo-improve', 'quiet')}<small>Only for demonstrating the shop-order example. Review these supplied demo facts before confirming.</small></div>${sourcePanel(t)}</div><aside>${ratingPanel(t)}</aside></div>`;
}
function detailView() {
  const t = getTask(state, ui.selected);
  if (!t.confirmed) return editView();
  if (ui.role === 'team' && !t.published) return empty('This task is not published', 'Return to the catalog to explore tasks available to your team.', button('Open catalog', 'catalog'));
  const c = t.confirmed, rank = catalog(state).find(x => x.id === t.id)?.rank;
  return `<button class="back-link" data-action="${ui.role === 'team' ? 'catalog' : 'workspace'}">← ${ui.role === 'team' ? 'Task catalog' : 'My workspace'}</button>${heading(esc(c.topic).toUpperCase(), esc(c.title), esc(c.need || 'This task needs more detail. Ask the business about the intended change.'), ui.role === 'business' ? button('Edit & improve ' + icon('arrowup'), 'edit') : '')}<div class="detail-status">${badge(scoreTask(t).level)}<span class="publication"><span class="live-dot ${!t.published ? 'muted-dot' : ''}"></span>${t.published ? `Published · Catalog rank #${rank}` : 'Confirmed · Not published'}</span><span>Confirmed ${date(t.confirmedAt)}</span>${hasEdits(t) ? '<span class="badge editing">Unconfirmed edits saved</span>' : ''}</div>${ui.role === 'business' && !t.published ? `<div class="publish-banner"><div><strong>Your task is confirmed and ready to share.</strong><p>Publish at any score. Every team can choose to submit a proposal.</p></div>${button('Publish task ' + icon('arrow'), 'publish', 'primary')}</div>` : ''}<div class="two-column"><div><section class="panel"><div class="section-heading compact"><h2>The business brief</h2><span class="confirmed-tag">${icon('check')} Human confirmed</span></div><dl class="brief-fields">${FIELDS.map(f => `<div><dt>${esc(f.label)}</dt><dd class="${c[f.key] ? '' : 'missing-value'}">${esc(c[f.key] || 'Not supplied — clarification needed')}</dd></div>`).join('')}</dl></section>${ui.role === 'team' && t.published ? proposalForm(t) : ''}${ui.role === 'business' ? proposalsPanel(t) : ''}${sourcePanel(t)}</div><aside>${ratingPanel(t)}</aside></div>`;
}
function proposalForm(t) {
  const key = `proposal:${t.id}:${ui.teamId}`, f = formValues(key, {}), team = state.teams.find(t => t.id === ui.teamId);
  return `<section class="panel proposal-form"><div class="section-heading compact"><div><h2>Bring your idea to the table.</h2><p>Proposing as <strong>${esc(team?.name || 'Choose a team')}</strong>. The business makes every decision.</p></div></div><form data-form="${key}"><div class="form-grid">${input('Solution idea', 'idea', f.idea, { textarea: true, required: true, wide: true })}${input('Implementation plan', 'plan', f.plan, { textarea: true, required: true, wide: true })}${input('Estimated duration / delivery term', 'duration', f.duration, { required: true, placeholder: 'For example: 4 hours' })}${input('Prototype link', 'link', f.link, { required: true, type: 'url', max: 2000, placeholder: 'https://…', hint: 'Use a full HTTP(S) URL. For this demo, https://example.com/prototype is supported.' })}</div><div class="form-actions"><p class="hint">No readiness threshold. No proposal-count limit.</p><button class="btn primary" ${ui.busy ? 'disabled' : ''}>Submit proposal ${icon('arrow')}</button></div></form></section>`;
}
function proposalsPanel(t) {
  const proposals = state.proposals.filter(p => p.taskId === t.id);
  return `<section class="panel"><div class="section-heading compact"><div><h2>Compare proposals <span class="count">${proposals.length}</span></h2><p>Accept one, several, or none. Each decision is yours.</p></div></div><div class="notice compact-notice">Accepting a proposal does not affect other proposals or award progress points.</div>${proposals.map(p => proposalCard(p, true)).join('') || empty('No proposals yet', 'Once published, this task can receive proposals from any team.')}</section>`;
}
function proposalCard(p, controls = false) {
  const team = state.teams.find(t => t.id === p.teamId), t = state.tasks.find(t => t.id === p.taskId), progress = state.progress.filter(e => e.proposalId === p.id);
  const f = formValues(`progress:${p.id}`, {});
  return `<article class="proposal-card" data-proposal="${p.id}"><div class="proposal-heading"><div class="team-heading"><div class="team-avatar">${esc(team?.initials)}</div><div><h3>${esc(controls ? team?.name : t?.confirmed?.title)}</h3><small>${controls ? esc(team?.skills.join(' · ')) : esc(team?.name)} · ${date(p.createdAt)}</small></div></div>${badge(p.status)}</div><dl><dt>Solution idea</dt><dd>${esc(p.idea)}</dd><dt>Implementation plan</dt><dd>${esc(p.plan)}</dd></dl><div class="proposal-meta"><span><strong>Delivery:</strong> ${esc(p.duration)}</span><a href="${esc(p.link)}" target="_blank" rel="noopener noreferrer">View prototype ${icon('arrowup')}</a></div>${p.decisions.length ? `<p class="decision-note">${esc(p.status)} manually by the business · ${date(p.decisions.at(-1).at)}</p>` : '<p class="decision-note">Awaiting a manual business decision.</p>'}${controls ? `<div class="actions">${p.status !== 'Accepted' ? button('Accept proposal', 'accept', 'primary small', `data-id="${p.id}"`) : '<span class="confirmed-tag">✓ Manually accepted</span>'}${p.status !== 'Rejected' ? button('Reject proposal', 'reject', 'secondary small', `data-id="${p.id}"`) : ''}</div>` : ''}${controls && p.status === 'Accepted' ? `<details class="progress-form"><summary>Confirm an actual milestone · +${state.settings.progressPoints} demo points</summary><form data-form="progress:${p.id}">${input('Completed milestone', 'milestone', f.milestone, { required: true, max: 500, placeholder: 'For example: Searchable prototype demonstrated' })}${input('Evidence of actual progress reviewed', 'evidence', f.evidence, { textarea: true, required: true, placeholder: 'Describe what you saw and verified.' })}<label class="checkbox"><input type="checkbox" name="attested" ${f.attested ? 'checked' : ''} required><span>I personally verified this completed milestone.</span></label><button class="btn primary small" ${ui.busy ? 'disabled' : ''}>Confirm progress & award points</button></form><p class="footnote">${state.settings.progressPoints} points is a configurable demo assumption, not an official rule. A milestone can earn points once per team and task.</p></details>` : ''}${progress.length ? `<div class="progress-history">${progress.map(e => `<div><strong>+${e.points} points · ${esc(e.milestone)}</strong><p>${esc(e.evidence)}</p><small>Business confirmed · ${date(e.at)}</small></div>`).join('')}</div>` : ''}</article>`;
}
function teamsView() {
  return `${heading('PEOPLE BEHIND THE POSSIBILITIES', 'Different skills. Shared ambition.', 'Five synthetic teams, free to explore every opportunity. Points reflect business-confirmed progress.')}<div class="team-grid">${state.teams.map(t => `<article class="panel team-profile"><div class="team-heading"><div class="team-avatar large">${esc(t.initials)}</div><div><h2>${esc(t.name)}</h2><span class="points">${teamPoints(state, t.id)} progress points</span></div></div><h3>Interests</h3><div class="tags">${t.interests.map(s => `<span>${esc(s)}</span>`).join('')}</div><h3>Skills</h3><p>${esc(t.skills.join(' · '))}</p><h3>Technologies</h3><div class="tags neutral">${t.technologies.map(s => `<span>${esc(s)}</span>`).join('')}</div><details class="team-history"><summary>Proposal history · ${state.proposals.filter(p => p.teamId === t.id).length}</summary>${state.proposals.filter(p => p.teamId === t.id).map(p => `<div class="history-row"><button class="text-link" data-action="open" data-id="${p.taskId}">${esc(state.tasks.find(task => task.id === p.taskId)?.confirmed?.title)}</button>${badge(p.status)}</div>`).join('') || '<p>No proposals yet. Explore the full catalog and send your first idea.</p>'}</details>${ui.role === 'team' ? button('Explore as this team', 'choose-team', 'secondary', `data-id="${t.id}"`) : ''}</article>`).join('')}</div>`;
}
function teamWorkspace() {
  const team = state.teams.find(t => t.id === ui.teamId), proposals = state.proposals.filter(p => p.teamId === ui.teamId);
  return `${heading('YOUR TEAM WORKSPACE', `Make your next move, ${esc(team?.name)}.`, 'Discover an opportunity, share your approach, and track the business’s response.', button('Explore the catalog ' + icon('arrow'), 'catalog', 'primary'))}<div class="team-summary panel"><strong>${teamPoints(state, ui.teamId)}<span> confirmed progress points</span></strong><p>Only a manually verified milestone earns points. Selection alone earns none.</p></div><div class="section-heading"><h2>Your proposals <span class="count">${proposals.length}</span></h2></div>${proposals.map(p => proposalCard(p)).join('') || empty('Your next collaboration starts with a proposal', 'Your team has no proposal history yet. Every published task is available.', button('Browse opportunities', 'catalog', 'primary'))}`;
}
function guideView() {
  return `${heading('FIVE MINUTES, ONE COMPLETE JOURNEY', 'From “we need help” to “let’s build”.', 'A repeatable live demonstration. Every step runs inside this application.')}<div class="two-column"><section class="panel demo-guide"><ol><li><strong>0:00 · Start with a rough idea</strong><p>Switch to Business, create a task and choose “Use weak demo example.” Analyze the brief.</p></li><li><strong>0:40 · Clarify what’s missing</strong><p>Show the questions. Insert the prepared demo answers (context, result and users), then generate the editable card.</p></li><li><strong>1:20 · Review, confirm, and score</strong><p>Review the source text. Confirm the card with the accuracy checkbox. See the initial 45/100 Working rating and expand the breakdown.</p></li><li><strong>2:00 · Add clarity and publish</strong><p>Edit the card. Insert the complete synthetic demo details. Notice the official score stays 45 until confirmation. Confirm to reach 100/100 Priority, then publish.</p></li><li><strong>2:45 · Make a team proposal</strong><p>Switch to Team. Filter the catalog by Retail and Priority, open your task, and submit an idea, plan, duration and HTTP(S) prototype link.</p></li><li><strong>3:40 · Make the business decision</strong><p>Switch back to Business. Compare the proposal fields and manually accept or reject. Seeded retail tasks have multiple proposals for comparison.</p></li><li><strong>4:20 · Confirm real progress</strong><p>For an accepted proposal, enter a completed milestone and evidence. Confirm actual progress to award ${state.settings.progressPoints} demo points. Check the team profile.</p></li></ol>${button('Start the demo ' + icon('arrow'), 'start-demo', 'primary')}</section><aside><section class="panel"><h2>The readiness ladder</h2><div class="level-guide">${[['Draft', '0–39', 'Visible, open to proposals; needs clarification.'], ['Working', '40–69', 'Teams may respond; useful for discovery.'], ['Ready', '70–89', 'Higher position through a stronger brief.'], ['Priority', '90–100', 'Highlighted and fully ready for work.']].map(([l, range, desc]) => `<div>${badge(l)}<strong>${range}</strong><p>${desc}</p></div>`).join('')}</div><p class="hint">Your catalog position is determined only by your confirmed score. Teams always choose their own tasks.</p></section><section class="panel"><h3>Reset for the next judge</h3><p>Reset restores 5 confirmed cards, 5 rough drafts, 5 teams and 5 pending proposals. All original data is synthetic.</p>${button(icon('reset') + ' Reset demo', 'reset')}</section></aside></div>`;
}

function render() {
  try {
    const views = { workspace, catalog: catalogView, new: newView, questions: questionsView, edit: editView, detail: detailView, teams: teamsView, guide: guideView };
    app.innerHTML = shell((views[ui.view] || workspace)());
    app.setAttribute('aria-busy', String(!!ui.busy));
    if (ui.reset) document.querySelector('[data-action="cancel-reset"]')?.focus();
  } catch { ui.view = 'workspace'; ui.selected = ''; ui.error = 'That item is unavailable. Choose a task from the workspace or catalog.'; app.innerHTML = shell(workspace()); }
}
function requireBusiness() { if (ui.role !== 'business') throw new Error('Switch to the Business perspective to perform this manual action.'); }
function openTask(taskId) {
  const task = getTask(state, taskId);
  if (ui.role === 'team' && !task.published) throw new Error('This task is still private. Choose a published task from the catalog.');
  if (task.confirmed) navigate('detail', taskId);
  else if (task.stage === 'questions') navigate('questions', taskId);
  else if (task.stage === 'card') navigate('edit', taskId);
  else { delete ui.forms.create; navigate('new', taskId); }
}
app.addEventListener('input', event => {
  const form = event.target.closest('[data-form]');
  if (form && event.target.name) {
    const f = formValues(form.dataset.form);
    f[event.target.name] = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    if (form.dataset.form.startsWith('card:') && event.target.name !== 'attested') {
      f.attested = false;
      form.querySelector('[name="attested"]').checked = false;
    }
  }
});
app.addEventListener('change', event => {
  const name = { 'filter-topic': 'topic', 'filter-level': 'level', 'filter-order': 'order', search: 'search' }[event.target.id];
  if (name) { ui.filters[name] = event.target.value; render(); }
  if (event.target.id === 'active-team') { ui.teamId = event.target.value; render(); }
});
app.addEventListener('keydown', event => {
  if (event.target.id === 'search' && event.key === 'Enter') { ui.filters.search = event.target.value; render(); }
  if (ui.reset && event.key === 'Escape') { ui.reset = false; render(); }
  if (ui.reset && event.key === 'Tab') {
    const buttons = [...document.querySelectorAll('.modal button')], index = buttons.indexOf(document.activeElement);
    event.preventDefault(); buttons[(index + (event.shiftKey ? buttons.length - 1 : 1)) % buttons.length].focus();
  }
});
app.addEventListener('click', async event => {
  const target = event.target.closest('[data-action]');
  if (!target || ui.busy) return;
  event.preventDefault();
  const action = target.dataset.action;
  try {
    if (['home', 'workspace', 'catalog'].includes(action)) return navigate(action === 'home' ? 'workspace' : action);
    if (action === 'nav') return navigate(target.dataset.view);
    if (action === 'role') { ui.role = target.dataset.role; ui.error = ''; if (ui.role === 'team' && ['new', 'questions', 'edit'].includes(ui.view)) navigate('catalog'); else if (ui.view === 'workspace') navigate(ui.role === 'team' ? 'catalog' : 'workspace'); else render(); return; }
    if (action === 'choose-team') { ui.teamId = target.dataset.id; return navigate('catalog'); }
    if (action === 'clear-filters') { ui.filters = { topic: '', level: '', order: 'desc', search: '' }; return render(); }
    if (action === 'new' || action === 'start-demo') { ui.role = 'business'; delete ui.forms.create; if (action === 'start-demo') ui.forms.create = { description: WEAK_DESCRIPTION, topic: 'Retail' }; return navigate('new'); }
    if (action === 'open') return openTask(target.dataset.id);
    if (action === 'reset') { ui.reset = true; return render(); }
    if (action === 'cancel-reset') { ui.reset = false; return render(); }
    if (action === 'confirm-reset') {
      const fresh = makeSeed(); fresh.settings.progressPoints = state.settings.progressPoints;
      state = persistState(safeStorage, fresh, { force: true }); ui.storageError = ''; ui.forms = {}; ui.reset = false; ui.role = 'business'; ui.filters = { topic: '', level: '', order: 'desc', search: '' }; navigate('workspace'); toast('Synthetic demo restored.'); return;
    }
    requireBusiness();
    if (action === 'weak') { ui.forms.create = { description: WEAK_DESCRIPTION, topic: 'Retail' }; return render(); }
    if (action === 'demo-answers') { Object.assign(formValues(`answers:${ui.selected}`), DEMO_ANSWERS); render(); toast('Synthetic demo answers inserted. Review them before generating.'); return; }
    if (action === 'edit') { const task = getTask(state, ui.selected); ui.forms[`card:${task.id}`] = { ...clone(task.draft), attested: false }; return navigate('edit', ui.selected); }
    if (action === 'demo-improve') { ui.forms[`card:${ui.selected}`] = { ...DEMO_IMPROVEMENTS, attested: false }; render(); toast('Synthetic demo facts inserted. Official rating is unchanged until you confirm.'); return; }
    if (action === 'save-draft') return work('Saving your unconfirmed draft…', () => {
      const f = formValues(`card:${ui.selected}`);
      commit(s => { const t = getTask(s, ui.selected); t.draft = Object.fromEntries(CARD_KEYS.map(k => [k, f[k] || ''])); t.updatedAt = new Date().toISOString(); });
    }, 'Draft saved. Your official score has not changed.');
    if (action === 'publish') return work('Publishing your confirmed task…', () => commit(s => publishTask(s, ui.selected)), 'Published. Your task is now open to every team.');
    if (action === 'accept' || action === 'reject') return work('Saving your manual decision…', () => commit(s => decideProposal(s, target.dataset.id, action === 'accept' ? 'Accepted' : 'Rejected', ui.role)), `Proposal ${action === 'accept' ? 'accepted' : 'rejected'} by you. Other proposals are unchanged.`);
  } catch (error) { errorMessage(error.message); }
});
app.addEventListener('submit', event => {
  const form = event.target.closest('[data-form]');
  if (!form) return;
  event.preventDefault();
  const key = form.dataset.form, f = clone(formValues(key));
  if (key === 'create') return work('Analyzing completeness and preparing questions…', async () => {
    requireBusiness();
    const data = { description: f.description || '', topic: f.topic || '', answers: {} };
    const result = await requestAnalysis(data);
    const taskId = commit(s => {
      const t = ui.selected ? getTask(s, ui.selected) : createTask(s, data.description, data.topic);
      t.original = data.description.trim(); t.topic = data.topic; t.questions = result.questions; t.draft = result.card; t.evidence = result.evidence; t.aiNotice = result.notice; t.answers = {}; t.stage = 'questions'; t.updatedAt = new Date().toISOString();
      return t.id;
    });
    delete ui.forms[`answers:${taskId}`]; ui.view = 'questions'; ui.selected = taskId; window.scrollTo(0, 0);
  });
  if (key.startsWith('answers:')) return work('Building an editable card from your supplied facts…', async () => {
    requireBusiness(); const t = getTask(state, ui.selected);
    const data = { description: t.original, topic: t.topic, answers: f };
    const result = await requestAnalysis(data);
    commit(s => { const task = getTask(s, t.id); task.answers = f; task.draft = result.card; task.evidence = result.evidence; task.aiNotice = result.notice; task.stage = 'card'; task.updatedAt = new Date().toISOString(); });
    delete ui.forms[`card:${t.id}`]; ui.view = 'edit'; window.scrollTo(0, 0);
  }, 'Card generated from your source text. Review and confirm it.');
  if (key.startsWith('card:')) return work('Confirming your card and calculating official readiness…', () => {
    requireBusiness();
    commit(s => { const t = getTask(s, ui.selected); t.draft = Object.fromEntries(CARD_KEYS.map(k => [k, f[k] || ''])); confirmTask(s, t.id, f.attested); });
    delete ui.forms[key]; ui.view = 'detail'; window.scrollTo(0, 0);
  }, 'Card confirmed. Your official rating has been recalculated.');
  if (key.startsWith('proposal:')) return work('Submitting your team’s proposal…', () => {
    if (ui.role !== 'team') throw new Error('Switch to the Team perspective to submit a proposal.');
    commit(s => submitProposal(s, ui.selected, ui.teamId, f)); delete ui.forms[key]; ui.view = 'workspace'; window.scrollTo(0, 0);
  }, 'Proposal submitted. It is pending a manual business decision.');
  if (key.startsWith('progress:')) return work('Recording business-confirmed progress…', () => {
    requireBusiness(); commit(s => confirmProgress(s, key.slice('progress:'.length), f.milestone || '', f.evidence || '', f.attested, ui.role)); delete ui.forms[key];
  }, 'Milestone confirmed. Team progress points have been recorded.');
});
window.addEventListener('storage', event => { if (event.key === STORAGE_KEY) { ui.storageError = 'Another tab updated this demo. Reload this page before saving. Unsaved form text remains on screen.'; render(); } });
window.addEventListener('beforeunload', event => {
  if (Object.entries(ui.forms).some(([k, v]) => k.startsWith('card:') && CARD_KEYS.some(field => v[field] !== state.tasks.find(t => t.id === k.slice(5))?.draft[field]))) event.preventDefault();
});
render();
fetch('/api/config').then(r => r.json()).then(config => {
  ui.aiConfigured = !!config.aiConfigured;
  if (Number.isInteger(config.progressPoints) && config.progressPoints !== state.settings.progressPoints) {
    try { commit(s => { s.settings.progressPoints = config.progressPoints; }); } catch (error) { ui.storageError = error.message; }
  }
  // Do not rerender an active form or lose focus when configuration arrives.
}).catch(() => { /* Local analysis remains fully functional. */ });
