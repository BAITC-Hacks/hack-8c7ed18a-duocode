import { blankCard, scoreCard } from './domain.js';

export const WEAK_DESCRIPTION = 'We need a better way to track orders in our shop.';
export const DEMO_ANSWERS = {
  context: 'Shop staff currently copy customer orders from paper into a spreadsheet and lose order updates.',
  result: 'Deliver a working order dashboard with order status and a searchable order list.',
  users: 'Shop staff who record orders and check delivery status.'
};
export const DEMO_IMPROVEMENTS = {
  title: 'A clearer way to track shop orders', topic: 'Retail',
  context: DEMO_ANSWERS.context,
  need: 'Reduce lost order updates and help shop staff see the current status of each order.',
  data: 'A synthetic CSV of 50 shop orders and a sample order form are available from the business contact.',
  result: DEMO_ANSWERS.result,
  success: 'Find the status of an order in under 10 seconds in 5 test cases.',
  constraints: 'Build a browser prototype in five hours using synthetic data only.',
  users: DEMO_ANSWERS.users,
  contact: 'Demo shop liaison via orders@shop.example',
  interaction: 'A 10-minute kickoff consultation and a final demo review with written feedback.'
};

export function makeSeed() {
  const specifications = [
    {
      id: 'task-orders', title: 'Make every shop order easy to follow', topic: 'Retail',
      context: 'Shop staff currently copy paper orders into a spreadsheet and lose status updates.',
      need: 'Give staff a single view of order status so fewer customer requests are missed.',
      data: 'A synthetic 50-row orders CSV and example order forms are available through the demo liaison.',
      result: 'An interactive order dashboard with search, status updates and a handover note.',
      success: 'Staff can find an order in under 10 seconds in 5 test cases.',
      constraints: 'Use synthetic data only and finish the browser prototype within five hours.',
      users: 'Shop assistants and the store manager.',
      contact: 'Demo retail liaison via retail@briefly.example',
      interaction: 'A kickoff consultation and two review calls with written feedback.'
    },
    {
      id: 'task-campus', title: 'Help students find the right campus workshop', topic: 'Education',
      context: 'Campus workshop listings are spread across several manually maintained pages.',
      need: 'Help students discover relevant workshops without checking multiple lists.',
      data: 'A synthetic workshop CSV with topics and sample course descriptions is available by email.',
      result: 'A searchable workshop catalog with topic filters and clear workshop details.',
      success: '', constraints: 'Keep the prototype in a web browser; no registration or live booking.',
      users: 'Students exploring campus workshops.', contact: 'Campus demo liaison via campus@briefly.example',
      interaction: 'An opening consultation and final review with email feedback.'
    },
    {
      id: 'task-reuse', title: 'Give surplus materials a second life', topic: 'Sustainability',
      context: 'Workshop managers track surplus materials in separate paper lists.',
      need: 'Make reusable surplus visible to other workshops before it is discarded.',
      data: 'An example inventory spreadsheet of synthetic surplus items is available from the liaison.',
      result: 'A browsable inventory prototype with material categories and availability status.',
      success: '', constraints: '', users: 'Workshop managers looking for reusable supplies.',
      contact: '', interaction: 'A final review meeting with the workshop coordinator and feedback.'
    },
    {
      id: 'task-delivery', title: 'See where delivery handovers get stuck', topic: 'Logistics',
      context: 'Dispatch staff manually record handovers in a shared spreadsheet.',
      need: 'Spot delayed handovers before they affect the next delivery stage.',
      data: '', result: 'A browser prototype showing handover status for each delivery.',
      success: '', constraints: '', users: 'Dispatch coordinators handling delivery handovers.',
      contact: 'Demo dispatch liaison via dispatch@briefly.example', interaction: ''
    },
    {
      id: 'task-community', title: 'A simpler way to organize volunteer shifts', topic: 'Community',
      context: '', need: 'We need a better way to organize volunteer shifts for community events.',
      data: '', result: '', success: '', constraints: '', users: '', contact: '', interaction: ''
    }
  ];
  const tasks = specifications.map((spec, index) => {
    const { id, ...card } = spec;
    const at = `2026-09-${String(10 + index).padStart(2, '0')}T09:00:00.000Z`;
    const original = Object.values(card).filter(Boolean).join('\n');
    return { id, original, topic: card.topic, draft: { ...card }, confirmed: { ...card }, confirmedAt: at, published: true, questions: [], answers: {}, evidence: Object.fromEntries(Object.keys(card).map(k => [k, card[k] ? 'Synthetic business fixture' : ''])), createdAt: at, updatedAt: at, stage: 'card', revisions: [{ at, card: { ...card }, score: scoreCard(card).total, confirmedBy: 'Synthetic business fixture' }] };
  });
  const drafts = [
    { original: WEAK_DESCRIPTION, topic: 'Retail' },
    { original: 'Students struggle to find workshops. We need a searchable list for our campus.', topic: 'Education' },
    { original: 'We need to reuse workshop materials. Currently surplus sits in storage. A sample inventory spreadsheet is available.', topic: 'Sustainability' },
    { original: 'Currently dispatch staff lose handover notes. We need a delivery status dashboard. Target users are dispatch coordinators. Deliver a browser prototype within five hours.', topic: 'Logistics' },
    { original: 'We need a volunteer shift list. Currently a coordinator uses paper. A sample spreadsheet is available. Deliver a browser prototype for our event organizers. Success means finding shifts in under 10 seconds. Contact volunteer@briefly.example. Weekly feedback calls are available.', topic: 'Community' }
  ];
  drafts.forEach((d, i) => tasks.push({ id: `draft-${i + 1}`, ...d, draft: { ...blankCard(), topic: d.topic }, confirmed: null, confirmedAt: null, published: false, questions: [], answers: {}, evidence: {}, createdAt: `2026-09-${15 + i}T09:00:00.000Z`, updatedAt: `2026-09-${15 + i}T09:00:00.000Z`, stage: 'analyze', revisions: [] }));
  const teams = [
    { id: 'team-orbit', name: 'Orbit Studio', initials: 'OS', interests: ['Retail', 'Service design'], skills: ['UX research', 'Frontend development'], technologies: ['JavaScript', 'Figma', 'CSS'] },
    { id: 'team-pixel', name: 'Pixel Pioneers', initials: 'PP', interests: ['Education', 'Accessibility'], skills: ['Interface design', 'Rapid prototyping'], technologies: ['React', 'HTML', 'Figma'] },
    { id: 'team-green', name: 'Green Circuit', initials: 'GC', interests: ['Sustainability', 'Community'], skills: ['Data analysis', 'Full-stack development'], technologies: ['Python', 'SQLite', 'JavaScript'] },
    { id: 'team-route', name: 'Route Makers', initials: 'RM', interests: ['Logistics', 'Data visualization'], skills: ['Process mapping', 'Backend development'], technologies: ['Node.js', 'SQL', 'SVG'] },
    { id: 'team-common', name: 'Common Ground', initials: 'CG', interests: ['Community', 'Education'], skills: ['Product discovery', 'Usability testing'], technologies: ['Vue', 'CSS', 'Figma'] }
  ];
  const proposals = [
    ['task-orders', 'team-orbit', 'An order board with clear status lanes and fast search.', 'Interview the demo liaison, build a local order board, then test five order lookups.', '4 hours'],
    ['task-orders', 'team-route', 'A compact status table for fast handover checks.', 'Map the current process, build a searchable table, and validate status transitions.', '5 hours'],
    ['task-campus', 'team-pixel', 'An accessible catalog organized around student interests.', 'Sketch the navigation, implement filters, then test keyboard access.', '4 hours'],
    ['task-reuse', 'team-green', 'A shared materials inventory with category search.', 'Normalize the sample inventory, build cards and filters, then test discovery.', '5 hours'],
    ['task-community', 'team-common', 'A simple volunteer shift overview for coordinators.', 'Clarify the workflow with the business, prototype the list, and gather feedback.', '3 hours']
  ].map(([taskId, teamId, idea, plan, duration], i) => ({ id: `proposal-${i + 1}`, taskId, teamId, idea, plan, duration, link: `https://example.com/prototypes/${i + 1}`, status: 'Pending', createdAt: `2026-09-20T10:0${i}:00.000Z`, decisions: [] }));
  return { version: 1, revision: 0, tasks, teams, proposals, progress: [], settings: { progressPoints: 10 } };
}
