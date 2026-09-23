/** The only source of truth for task readiness and business transitions. */
export const FIELDS = [
  { key: 'context', label: 'Context', points: 10, group: 'Context and business need', hint: 'Describe the current workflow and the problem it causes.' },
  { key: 'need', label: 'Business need', points: 10, group: 'Context and business need', hint: 'Explain what must change and why it matters to the business.' },
  { key: 'data', label: 'Data and materials', points: 20, group: 'Data and materials', hint: 'Name the actual files, examples or sources available, and how teams can access them.' },
  { key: 'result', label: 'Expected result', points: 15, group: 'Expected result', hint: 'Describe the deliverable the team should demonstrate or hand over.' },
  { key: 'success', label: 'Measurable success criteria', points: 15, group: 'Success criteria', hint: 'Give a numeric target with a unit, or a specific pass/fail acceptance test.' },
  { key: 'constraints', label: 'Constraints', points: 10, group: 'Constraints', hint: 'State a real time, technology, access or scope boundary; explicitly state if there are none.' },
  { key: 'users', label: 'Target users', points: 10, group: 'Users', hint: 'Name the people or roles who will use the result.' },
  { key: 'contact', label: 'Business contact', points: 5, group: 'Business communication', hint: 'Provide an email, web contact URL, phone number, or named liaison with a contact channel.' },
  { key: 'interaction', label: 'Consultation and feedback', points: 5, group: 'Business communication', hint: 'Describe how and when the business will consult with teams and provide feedback.' }
];
export const CARD_KEYS = ['title', 'topic', ...FIELDS.map(f => f.key)];
export const LEVELS = ['Draft', 'Working', 'Ready', 'Priority'];
export const TOPICS = ['Retail', 'Education', 'Sustainability', 'Logistics', 'Community', 'Other'];
export const blankCard = () => Object.fromEntries(CARD_KEYS.map(k => [k, '']));
export const clone = value => structuredClone(value);
const now = () => new Date().toISOString();
const id = prefix => `${prefix}-${globalThis.crypto.randomUUID()}`;
const fail = message => { throw new Error(message); };

export function meaningful(value, minimum = 8) {
  if (typeof value !== 'string') return false;
  const s = value.trim();
  if (s.length < minimum || !/[\p{L}]/u.test(s)) return false;
  if (/^(?:[\s\p{P}]*|tbd|todo|n\/?a|none|unknown|not (?:sure|known|available|provided|applicable)|to be (?:decided|defined|confirmed|determined)|missing|placeholder|test(?:ing)?|lorem ipsum|coming soon|asdf|fill (?:this|in)|[x?]+)[\s\p{P}]*$/iu.test(s)) return false;
  if (/^(?:tbd|todo|placeholder|lorem ipsum)\b/iu.test(s) || /^(.)\1+$/u.test(s)) return false;
  return new Set(s.toLowerCase().replace(/\W/g, '')).size >= 4;
}

export function fieldValid(key, value) {
  if (!meaningful(value, key === 'users' ? 5 : key === 'contact' ? 6 : 12)) return false;
  const s = value.trim();
  if (key === 'success') return /(?:\d+(?:\.\d+)?\s*(?:%|percent|seconds?|minutes?|hours?|days?|records?|rows?|users?|orders?|requests?|items?|tests?|steps?|tasks?|ms|s\b|cases?|out of)|(?:all|every|zero|no)\b.+\b(?:pass|fail|error|match|complete|valid|duplicate)|\b(?:pass|fail)\s*(?:if|when|:))/i.test(s);
  if (key === 'context') return /\b(?:currently|today|now|manual|manually|workflow|process|record|track|use|uses|using|struggle|spread|lose|losing|delay|delays|problem|happens|maintained)\b/i.test(s);
  if (key === 'need') return /\b(?:need|needs|want|change|improve|reduce|solve|simplify|help|better|give|make|enable|spot|avoid|prevent|replace|automate|increase|find|organize)\b/i.test(s);
  if (key === 'data') return /\b(?:csv|spreadsheet|data|dataset|records|files?|examples?|samples?|forms?|documents?|images?|photos?|source|inventory|api|materials?|logs?|interviews?|reports?|research)\b/i.test(s) && !/\b(?:no|not|cannot|unavailable|without)\b.{0,30}\b(?:data|materials?|files?|records|samples?|examples?|available|access|provide|share)\b|\b(?:data|materials?|files?|records)\b.{0,20}\b(?:unavailable|missing|not available)\b/i.test(s);
  if (key === 'result') return /\b(?:deliver|deliverable|prototype|dashboard|website|app|application|report|analysis|catalog|tool|design|plan|model|system|interface|inventory|board|list|service|handover|export|working|searchable)\b/i.test(s);
  if (key === 'constraints') return /\b(?:within|only|must|cannot|deadline|hours?|days?|weeks?|budget|limit|limits|access|scope|browser|no|without|use|technology|technologies|synthetic|boundaries)\b/i.test(s);
  if (key === 'contact') return /[\w.+-]+@[\w.-]+\.[a-z]{2,}|https?:\/\/\S+|\b(?:email|phone|slack|teams|discord|telegram|contact desk)\b/i.test(s) || (s.match(/\+?\d[\d ().-]{5,}\d/g) || []).some(phone => phone.replace(/\D/g, '').length >= 7);
  if (key === 'interaction') return /\b(?:feedback|review|consult|consultation|meeting|check-in|call|office hours|workshop|email|slack|teams|discord)\b/i.test(s);
  return true;
}

export function readiness(score) {
  if (!Number.isFinite(score) || score < 0 || score > 100) fail('Readiness score must be between 0 and 100.');
  return score < 40 ? 'Draft' : score < 70 ? 'Working' : score < 90 ? 'Ready' : 'Priority';
}

export function scoreCard(confirmed) {
  const components = FIELDS.map(field => {
    const valid = !!confirmed && fieldValid(field.key, confirmed[field.key]);
    return { ...field, earned: valid ? field.points : 0, reason: valid ? 'Meaningful information manually confirmed.' : !confirmed ? 'Awaiting human confirmation.' : !confirmed[field.key]?.trim() ? 'Not supplied.' : 'Needs a concrete, meaningful value that meets this field’s purpose.' };
  });
  const groups = [...new Set(FIELDS.map(f => f.group))].map(name => {
    const fields = components.filter(f => f.group === name);
    return { name, earned: fields.reduce((a, f) => a + f.earned, 0), max: fields.reduce((a, f) => a + f.points, 0), fields };
  });
  const total = components.reduce((a, f) => a + f.earned, 0);
  return { total, level: readiness(total), components, groups, missing: components.filter(f => !f.earned) };
}
export const scoreTask = task => scoreCard(task.confirmed);
export const hasEdits = task => JSON.stringify(task.draft) !== JSON.stringify(task.confirmed);

export function validateDescription(value) {
  if (!meaningful(value, 16) || value.trim().split(/\s+/).length < 4) fail('Describe a business problem in at least four words (16 characters). For example: We need a better way to track shop orders.');
  if (value.length > 8000) fail('Keep the initial description under 8,000 characters.');
}
export function validateCard(card) {
  if (!card || typeof card !== 'object' || CARD_KEYS.some(k => typeof card[k] !== 'string')) fail('The task card is incomplete or has an invalid format.');
  if (!meaningful(card.title, 5)) fail('Add a meaningful task title (at least 5 characters).');
  if (!meaningful(card.topic, 3)) fail('Choose or enter a topic (at least 3 characters).');
  if (card.title.length > 140 || card.topic.length > 80 || CARD_KEYS.some(k => card[k].length > 8000)) fail('Use a title under 140 characters, a topic under 80, and fields under 8,000 characters.');
}

export function createTask(state, description, topic = '') {
  validateDescription(description);
  const task = { id: id('task'), original: description.trim(), topic, questions: [], answers: {}, evidence: {}, draft: { ...blankCard(), topic }, confirmed: null, confirmedAt: null, published: false, createdAt: now(), updatedAt: now(), revisions: [], stage: 'analyze' };
  state.tasks.push(task);
  return task;
}
export function getTask(state, taskId) {
  return state.tasks.find(t => t.id === taskId) || fail('This task could not be found. Return to the catalog and try again.');
}
export function confirmTask(state, taskId, attested) {
  const t = getTask(state, taskId);
  if (!attested) fail('Confirm that you reviewed this card and that its facts are accurate.');
  validateCard(t.draft);
  t.confirmed = Object.fromEntries(CARD_KEYS.map(k => [k, t.draft[k].trim()]));
  t.draft = clone(t.confirmed);
  t.confirmedAt = t.updatedAt = now();
  t.stage = 'card';
  t.revisions.push({ at: t.confirmedAt, card: clone(t.confirmed), score: scoreTask(t).total, confirmedBy: 'Business representative' });
  return t;
}
export function publishTask(state, taskId) {
  const t = getTask(state, taskId);
  if (!t.confirmed || hasEdits(t)) fail('Review and manually confirm the latest edits before publishing.');
  validateCard(t.confirmed);
  t.published = true;
  t.updatedAt = now();
}
export function catalog(state, { topic = '', level = '', order = 'desc', search = '' } = {}) {
  const ranked = state.tasks.filter(t => t.published && t.confirmed).sort((a, b) => scoreTask(b).total - scoreTask(a).total || a.createdAt.localeCompare(b.createdAt) || a.id.localeCompare(b.id));
  const result = ranked.map((t, index) => ({ ...t, rank: index + 1 })).filter(t => (!topic || t.confirmed.topic === topic) && (!level || scoreTask(t).level === level) && (!search || `${t.confirmed.title} ${t.confirmed.need}`.toLowerCase().includes(search.toLowerCase())));
  return order === 'asc' ? result.sort((a, b) => scoreTask(a).total - scoreTask(b).total || a.rank - b.rank) : result;
}
export function usableUrl(value) {
  try { const u = new URL(value); return ['http:', 'https:'].includes(u.protocol) && !!u.hostname && !u.username && !u.password; } catch { return false; }
}
export function submitProposal(state, taskId, teamId, input) {
  if (!getTask(state, taskId).published) fail('Only published tasks can receive proposals.');
  if (!state.teams.some(t => t.id === teamId)) fail('Choose an existing team profile.');
  for (const [key, label] of [['idea', 'solution idea'], ['plan', 'implementation plan'], ['duration', 'estimated duration']]) {
    if (!meaningful(input[key], key === 'duration' ? 3 : 12)) fail(`Add a meaningful ${label}.`);
    if (input[key].length > 8000) fail('Keep each proposal field under 8,000 characters.');
  }
  if (!usableUrl(input.link) || input.link.length > 2000) fail('Enter a complete http:// or https:// prototype URL (no embedded credentials).');
  const p = { id: id('proposal'), taskId, teamId, ...Object.fromEntries(['idea', 'plan', 'duration', 'link'].map(k => [k, input[k].trim()])), status: 'Pending', createdAt: now(), decisions: [] };
  state.proposals.push(p);
  return p;
}
export function decideProposal(state, proposalId, decision, actor = 'business') {
  if (actor !== 'business' || !['Accepted', 'Rejected'].includes(decision)) fail('Only the business can explicitly accept or reject a proposal.');
  const p = state.proposals.find(p => p.id === proposalId) || fail('This proposal could not be found.');
  getTask(state, p.taskId);
  if (!state.teams.some(t => t.id === p.teamId)) fail('The proposal references a missing team.');
  if (p.status === decision) fail(`This proposal is already ${decision.toLowerCase()}.`);
  p.status = decision;
  p.decisions.push({ decision, at: now(), by: 'Business representative' });
  return p;
}
export function confirmProgress(state, proposalId, milestone, evidence, attested, actor = 'business') {
  if (actor !== 'business') fail('Only the business can confirm progress.');
  const p = state.proposals.find(p => p.id === proposalId) || fail('This proposal could not be found.');
  getTask(state, p.taskId);
  if (!state.teams.some(t => t.id === p.teamId)) fail('The proposal references a missing team.');
  if (p.status !== 'Accepted') fail('Progress points require an accepted proposal. Selection alone earns no points.');
  if (!attested || !meaningful(milestone, 8) || !meaningful(evidence, 12)) fail('Describe the completed milestone and the evidence you reviewed, then confirm actual progress.');
  if (milestone.length > 500 || evidence.length > 8000) fail('Keep milestones under 500 characters and evidence under 8,000 characters.');
  if (state.progress.some(e => e.taskId === p.taskId && e.teamId === p.teamId && e.milestone.toLowerCase() === milestone.trim().toLowerCase())) fail('This milestone has already received points for this team and task.');
  const points = state.settings.progressPoints;
  if (!Number.isInteger(points) || points < 1 || points > 1000) fail('The demo progress-points configuration is invalid.');
  state.progress.push({ id: id('progress'), proposalId, taskId: p.taskId, teamId: p.teamId, milestone: milestone.trim(), evidence: evidence.trim(), points, at: now(), confirmedBy: 'Business representative' });
}
export const teamPoints = (state, teamId) => state.progress.filter(e => e.teamId === teamId).reduce((sum, e) => sum + e.points, 0);
