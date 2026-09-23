# Requirements audit — Briefly

Audit date: **2026-09-23**. All mandatory requirements are implemented and verified as described below. Status applies to the specified local hackathon MVP, not to production authentication or a paid-provider deployment.

## Executed verification record

Environment: Windows, Node.js **24.19.0**, Playwright **1.62.1**, installed Edge/Chromium **153.0.4234.48**, desktop viewport **1440 × 1000**. No API credentials were supplied; the actual browser scenario used the deterministic local assistant. The optional provider was tested with controlled valid/invalid responses, HTTP failures and timeouts; no live paid-provider request is claimed.

| Executed command/check | Result |
| --- | --- |
| `npm install --ignore-scripts --no-audit --no-fund --cache .npm-cache` | [PASS] Install completed; zero runtime dependencies. |
| `node scripts/install.mjs` | [PASS] Node prerequisite and dependency-free setup verified. |
| `node scripts/check.mjs` | [PASS] Syntax and whitespace checks for 14 JavaScript files. |
| `node --test tests/*.test.mjs` | [PASS] **47 tests passed, 0 failed**; includes all 512 field combinations. |
| `node scripts/build.mjs` | [PASS] Production build; 8 assets plus hash manifest. |
| `node --env-file-if-exists=.env server.mjs --production` | [PASS] Production server started at `http://127.0.0.1:3000`. |
| `node tests/browser.mjs` with installed Playwright and Edge paths | [PASS] **17 real-browser checks passed**, no uncaught page errors; latest suite completed in 7 seconds. |
| Workspace, filtered catalog and confirmed-task screenshots | [PASS] Visually inspected for desktop layout, readable hierarchy, state labels and clipping. |
| Complete demonstration scenario | [PASS] Actual UI input → questions → editable card → manual confirmation → 45 points → confirmed improvements → 100 points → publication → team proposal → business acceptance → actual milestone → 10 progress points; reload persistence checked. |

Generated evidence: `test-results/browser-report.json`, `workspace.png`, `catalog.png`, `confirmed-task.png`. These are reproducible local verification artifacts, ignored by Git. Unit test names in the files below describe the individual assertions. A source inspection is explicitly identified where a requirement is structural or documentary.

## Inspection, architecture and scope

| Requirement | Implemented feature/file | Verification method | Status |
| --- | --- | --- | --- |
| Inspect structure, config, scripts, documentation and working state before editing | Initial directory and `rg --files`/Git inspection | Workspace was empty; Git reported no repository | [PASS] |
| Look for and follow repository instructions | Working tree and parent instruction-file inspection | No applicable AGENTS.md was present | [PASS] |
| Preserve useful code and avoid unrelated changes | New files in the empty project directory | No pre-existing project files or user changes to overwrite | [PASS] |
| Prefer existing usable stack, otherwise smallest reliable architecture | Node built-ins + browser modules + local storage | `package.json`, startup and browser suite | [PASS] |
| Implement repository files, not chat-only sample code | `public/`, `server.mjs`, `tests/`, scripts and docs | Installed, built, served and exercised working application | [PASS] |
| Complete functional MVP appropriate to five-hour format | End-to-end views and documented staged workflow | Browser suite + five-minute in-app guide | [PASS] |
| Limited, justified dependencies and clean scripts | No runtime dependencies; optional Playwright tooling | Install command, package inspection, README | [PASS] |
| Persist ordinary navigation and entire demo flow | `storage.js`, transactional domain operations | Reload, storage and browser tests | [PASS] |
| Keep derived score/readiness/points consistent | `scoreTask`, `scoreCard`, `teamPoints` derive from persisted source | All 512 field combinations; confirmed edit, reload and points tests | [PASS] |
| Respect technical exclusions | No auth/passwords/chat/notifications/calendar/storage service/ML training/vector DB/project tracker | Dependency/source inspection, README scope | [PASS] |
| Simple Business/Team perspectives sufficient | Role switch and active synthetic team selector | Browser role-switch journey | [PASS] |

## Complete required user flow

| Requirement | Implemented feature/file | Verification method | Status |
| --- | --- | --- | --- |
| 1. Free-form initial business description | `newView`, create form | Browser weak-example input; description tests | [PASS] |
| 2. Analyze completeness and ask at least three relevant questions | `ai.js` extraction, `questionsFor` | AI tests and live questions shown in browser | [PASS] |
| 3. Business answers clarification questions | `questionsView`, structured answers | Browser fills supplied demonstration answers | [PASS] |
| 4. Convert only supplied facts into editable card | Exact-source `validateOutput`, `extractLocal` | Blank contact/data/success assertion; evidence tests | [PASS] |
| 5. Business reviews, edits and manually confirms | Card editor, accuracy checkbox, `confirmTask` | Browser title edit and rejected unchecked confirmation | [PASS] |
| 6. Calculate exact official 0–100 readiness | Central domain scoring | Component and 512-combination tests | [PASS] |
| 7. Display score, breakdown, level, missing facts and improvements | `ratingPanel` | Browser verifies 45/100, seven categories and guidance | [PASS] |
| 8. Edit and confirm additional information | `editView`, confirmation transaction | Browser inserts supplied additional facts and reconfirms | [PASS] |
| 9. Recalculate after every confirmed edit | Snapshot-based score derivation | 45→100 browser path; 100→80→100 unit path | [PASS] |
| 10. Publish confirmed task | `publishTask` | Browser actual publication; pre-confirmation rejection tests | [PASS] |
| 11. Rating determines catalog position | `catalog` comparator and global rank | Ranking, tie and confirmed-improvement position tests | [PASS] |
| 12. Any team can browse all published tasks and open one | Public catalog and detail view | Team browser journey; no team-based catalog restrictions in source | [PASS] |
| 13. Team submits every required proposal field | `proposalForm`, `submitProposal` | Browser complete submission and per-field unit validation | [PASS] |
| 14. Business views and compares proposals | `proposalsPanel`, full comparable proposal cards | Browser uses two seeded proposals with idea/plan/duration/link | [PASS] |
| 15. Explicit manual acceptance and rejection | Buttons invoke `decideProposal` | Browser acceptance/rejection + actor/status tests | [PASS] |
| 16. One, multiple, or no proposals accepted | Independent status updates | Unit and browser zero/one/two accepted outcomes | [PASS] |
| 17. Never automatically choose/assign teams | No assignment model/function; AI has no decision input | Domain/API source inspection, all proposals initially Pending | [PASS] |
| 18. Business confirms actual progress for selected team | Milestone/evidence/attestation and `confirmProgress` | Browser milestone and profile points; acceptance gating tests | [PASS] |

## Every task-card field and state

| Requirement | Implemented feature/file | Verification method | Status |
| --- | --- | --- | --- |
| Title | `CARD_KEYS`, required editor input | Card validation; browser manual title edit | [PASS] |
| Topic/industry | Required topic selector, stored topic | Card validation and catalog topic-filter tests | [PASS] |
| Context/current workflow | `context` field, editor/detail/source | Isolated 10-point test and browser card | [PASS] |
| Business need/change | `need` field | Isolated 10-point test; exact weak-description source assertion | [PASS] |
| Target users | `users` field | Isolated 10-point test; supplied clarification answer | [PASS] |
| Data/materials and supplied examples/sources | `data` field preserves exact text | Isolated 20-point test; availability/placeholder validation | [PASS] |
| Constraints: time, tech, access or boundaries | `constraints` field | Isolated 10-point test; boundary-term checks | [PASS] |
| Expected result | `result` field | Isolated 15-point test and prepared deliverable | [PASS] |
| Measurable success criteria | `success` field | Isolated 15-point, numeric/binary/vague criteria tests | [PASS] |
| Business contact | `contact` field | Isolated 5-point; contact-purpose tests | [PASS] |
| Interaction, consultation and feedback | `interaction` field | Isolated 5-point; purpose tests | [PASS] |
| Original draft description retained | `task.original`, source panel | Browser source callout and stored task assertion | [PASS] |
| Clarification questions and answers retained | `task.questions`, `task.answers`, source panel | AI tests, browser state, reload persistence | [PASS] |
| Source/evidence mapping where useful | `task.evidence`, exact source keys | Unsupported output/mapping/qualifier tests | [PASS] |
| Publication state | `published`, visible detail/catalog labels | Browser draft/private/confirmed/published transitions | [PASS] |
| Rating and category/field breakdown | Derived `scoreTask` output | Seven category browser check, nine component tests | [PASS] |
| Readiness level | `readiness` and visible badge | Boundary tests and catalog seed coverage | [PASS] |
| Missing-information and improvement guidance | `score.missing`, field hints, `ratingPanel` | Incomplete and complete browser assertions | [PASS] |
| Created/updated/confirmed timestamps and history | Task timestamps and `revisions` | Domain state tests, source panel inspection, schema validation | [PASS] |
| Title/topic required but add zero points | `validateCard`, no scoring entries | Isolated title/topic zero-score test | [PASS] |
| Editable before confirmation and after publication | Separate draft/confirmed snapshots | Browser edit/confirm; published-improvement ranking unit test | [PASS] |
| Distinguish private editing draft from published Draft readiness | Separate publication/confirmation state and badges | Source/UI inspection; zero-score published task test | [PASS] |

## AI, schema, fallback and anti-fabrication

| Requirement | Implemented feature/file | Verification method | Status |
| --- | --- | --- | --- |
| Substantive AI-assisted extraction/completeness function | Optional OpenAI structured extraction plus local NLP fallback | Controlled valid provider response, real offline extraction/browser flow | [PASS] |
| At least three contextually relevant questions | Missing-field checks, order/workshop/volunteer wording | AI question count/context assertions and live browser form | [PASS] |
| Questions target missing/unclear information | Invalid-purpose fields prioritized; verification questions when complete | Missing-fields and all-complete question tests | [PASS] |
| Structured input and schema validation | `validateInput`, exact three top-level input keys | Invalid types, unknown fields, excessive length and placeholder tests | [PASS] |
| Strict structured output schema | `AI_SCHEMA`, `validateOutput`, `docs/ai-schema.json` | Extra/missing keys and null tests; documented-schema equality | [PASS] |
| No generated facts absent from source | Exact quote + known source + mapping validation | Invented contact, wrong mapping and unsupported topic tests | [PASS] |
| Preserve negations and qualifications | Whole description sentences and complete answer values | Dropped-negation and truncated-answer rejection tests | [PASS] |
| Missing information remains empty | Empty values/evidence; fallback extraction | Live blank contact/data/success assertions | [PASS] |
| Editable generated content; manual confirmation | Draft editor and attestation | Browser title edit and confirmation gating | [PASS] |
| Retain original factual sources | Original, answers and evidence panel | Source inspection + state persistence assertions | [PASS] |
| No sensitive participant profiling | Synthetic skill/interest/technology profiles only | Seed/AI input schema inspection | [PASS] |
| Recommendations cannot restrict catalog | No recommendation filter implemented | Catalog accepts no team/profile argument | [PASS] |
| AI cannot choose, accept or assign a team | AI schema has only factual card/evidence; decision function is separate | Schema tests and source inspection | [PASS] |
| Optional external API configured safely with env vars | Server-side key, `.env.example`, `.gitignore` | HTTP config does not leak test secret; server only serves public assets | [PASS] |
| Fully working missing-key/offline fallback | `localAnalysis` in server and browser | Missing-key unit/HTTP tests and entire actual UI scenario | [PASS] |
| Handle request failure and timeout | Server abort/Race, outer browser timeout | Network/HTTP failure and aborted signal tests | [PASS] |
| Handle malformed/invalid/empty/refused/incomplete output | Discard provider output and use local facts | Dedicated provider tests for each case | [PASS] |
| Handle invented or unsupported output safely | Reject whole invalid extraction, local fallback | Invented-fact unit case and malformed browser endpoint case | [PASS] |
| Actual prompt, input/output/schema and behavior documented | README + `docs/ai-schema.json` | Prompt inclusion and schema equality test, document review | [PASS] |

## Exact business rating and catalog rules

| Requirement | Implemented feature/file | Verification method | Status |
| --- | --- | --- | --- |
| Context 10 + business need 10 = category 20 | `FIELDS`, category grouping | Individual component and group-max assertions | [PASS] |
| Data/materials = 20 | `FIELDS.data` | Individual full/empty component assertions | [PASS] |
| Expected result = 15 | `FIELDS.result` | Individual full/empty component assertions | [PASS] |
| Success criteria = 15 | `FIELDS.success` | Individual and measurable-purpose assertions | [PASS] |
| Constraints = 10 | `FIELDS.constraints` | Individual and purpose assertions | [PASS] |
| Users = 10 | `FIELDS.users` | Individual full/empty component assertions | [PASS] |
| Contact 5 + interaction 5 = communication 10 | `FIELDS.contact`, `FIELDS.interaction` | Individual/group assertions | [PASS] |
| Exact 100 total, no bonuses or partial points | Sum of full-or-zero field values | 100 maximum and all 512 field combinations | [PASS] |
| Only meaningful confirmed facts score | `fieldValid`, placeholder checks, `scoreTask(confirmed)` | Empty/filler/purpose/unconfirmed tests | [PASS] |
| Centralized and deterministic | `public/domain.js` scoring functions | Same source yields deep-equal score objects in 512 cases | [PASS] |
| Score/max, reasons, missing fields and concrete guidance | `ratingPanel` category details and hints | Browser expanded reason, missing list and full-complete message | [PASS] |
| Official rating changes only after confirmation | Separate editable and confirmed data | Unit and live saved-unconfirmed-draft assertions | [PASS] |
| Draft inclusive 0–39 | `readiness` | Explicit 0 and 39 assertions | [PASS] |
| Working inclusive 40–69 | `readiness` | Explicit 40 and 69 assertions | [PASS] |
| Ready inclusive 70–89 | `readiness` | Explicit 70 and 89 assertions | [PASS] |
| Priority inclusive 90–100 | `readiness` | Explicit 90 and 100 assertions | [PASS] |
| Low score never hides a published task or prevents proposals | No readiness gate in `catalog`/`submitProposal` | Unit score-zero submission and browser score-10 submission | [PASS] |
| Complete shared catalog for all teams | Published confirmed task filter only | Seed count, team role journey, source inspection | [PASS] |
| Default descending rating and visible rank | Comparator and `rank` display | Sorting assertions and live catalog screenshot | [PASS] |
| Higher scores gain position; Priority highlighted | Rank calculation and `priority-card` | Confirmed published improvement rank 5→2; visual inspection | [PASS] |
| Badge, score, topic, title and concise summary | `taskTile` | Browser screenshots and rendered cards | [PASS] |
| Topic and readiness filters | `catalog` + labeled selectors | Combined unit/browser filters and no-results state | [PASS] |
| Ascending/descending rating sorting | Order selector and deterministic comparator | Unit values [10,50,70,85,100] and live selector | [PASS] |
| Full details, score, missing information and proposal action | `detailView`, `ratingPanel`, `proposalForm` | Actual team proposal journey | [PASS] |
| Deterministic documented ties | Creation timestamp then ID | Equal-score timestamp/ID tests; README | [PASS] |

## Teams, proposals, decisions, progress and synthetic data

| Requirement | Implemented feature/file | Verification method | Status |
| --- | --- | --- | --- |
| At least five profiles | `makeSeed().teams` | Exact count assertion | [PASS] |
| Each profile has name, interests, skills, technologies | Seed fields and `teamsView` | Per-team required-field assertions, profile screenshots/DOM | [PASS] |
| Synthetic non-sensitive profiles, history and points | Named synthetic teams, derived history/points | Seed inspection and live 10-point profile assertion | [PASS] |
| Team freely chooses any published task | Team catalog and task-linked proposal form | Actual low-readiness proposal, no selection restrictions | [PASS] |
| Required proposal team reference | `teamId`, active team selector | Invalid team unit case; browser team ID assertion | [PASS] |
| Required solution idea | `idea` | Empty/placeholder rejection and live validation error | [PASS] |
| Required implementation plan | `plan` | Per-field validation + live submitted plan | [PASS] |
| Required estimated duration/delivery term | `duration` | Per-field validation + live `4 hours` value | [PASS] |
| Required usable prototype URL/demo link | `link`, HTTP(S)/hostname/credential rules | Invalid JS/data/missing scheme/credential tests + live URL | [PASS] |
| No artificial proposal-count limit | Append-only proposal operation | 125 additional proposals accepted for the same low-rated task/team | [PASS] |
| Submission success and failure feedback | Async state, error alert, success toast | Live invalid idea and successful Pending submission | [PASS] |
| Proposal states Pending, Accepted, Rejected | Explicit status model and badges | Browser and domain transitions | [PASS] |
| Compare all proposal fields | Business proposal cards | Two seeded retail proposals shown and decided independently | [PASS] |
| Manual explicit Accept/Reject actions | `decideProposal`, business-only UI dispatch | Actor/status errors and live buttons | [PASS] |
| One, multiple, none; pending allowed | Independent proposal records | Browser two accepts, two rejects; unit zero/one/multiple cases | [PASS] |
| Accepting one must not reject others | Updates only specified proposal | Immediate Pending assertion for second proposal | [PASS] |
| Every state change visible and persisted | Status badge, decision actor/time/history | Browser reload checks and state assertions | [PASS] |
| Never imply accepted means automatic assignment | UI says manually accepted; no assignment field | Source/UI review; all new proposals Pending | [PASS] |
| Progress only for an accepted proposal/team | `confirmProgress` guard | Pending/rejected and missing-reference rejection tests | [PASS] |
| Points only after actual stage, manual evidence and verification | Milestone/evidence/attestation fields | Unit false/empty/non-business checks and actual UI confirmation | [PASS] |
| Selection alone earns zero | No decision-side point mutation | Browser and unit zero-point assertion after accept | [PASS] |
| Simple configurable point assumption, explicitly unofficial | `PROGRESS_POINTS`, 10-point default | 10/25 event tests, README and UI explanation | [PASS] |
| Prevent repeat award for same team/task milestone | Normalized duplicate check | Duplicate milestone rejection test | [PASS] |
| At least five text/industry drafts of differing completeness | Five separate unpublished seed drafts | Count/field tests and workspace list | [PASS] |
| At least five cards with all rating fields and current scores | Five confirmed published snapshots, derived scores | All card keys and [100,85,70,50,10] assertions | [PASS] |
| At least five complete proposals | Five seed proposal records | Count and full-field model/seed inspection | [PASS] |
| All readiness levels represented and data internally consistent | Seed scores, valid references, timestamps | Seed level-set and `validateState` tests | [PASS] |
| Prepared weak example that can improve | Weak source, three answers, complete demo facts | Real 45→100 browser journey | [PASS] |
| Easy repeatable reset/reseed | Explicit modal and `makeSeed` | Corrupt-storage reset browser check | [PASS] |

## Validation, interface, loading and empty states

| Requirement | Implemented feature/file | Verification method | Status |
| --- | --- | --- | --- |
| Empty and unusably weak description errors | Native required + `validateDescription` | Unit blank/short checks, browser error preserves text | [PASS] |
| Missing required card information | `validateCard`, required title/topic controls | Missing title/topic and invalid format tests | [PASS] |
| Invalid/empty answers where relevant | Optional unknowns; reject nonempty placeholders/types | Input schema tests; unknown blanks remain empty | [PASS] |
| API configuration/request/timeout/schema/fabrication errors | Safe notices and deterministic fallback | AI and HTTP cases; browser malformed-output recovery | [PASS] |
| Publishing before confirmation or with unconfirmed edits | `publishTask` guards | Unit gate tests and actual browser rejected publish | [PASS] |
| Invalid proposal fields and links | Centralized checks plus native required/url fields | Per-field and URL scheme tests; live error retains data | [PASS] |
| Persistence failure | Transactional writes and safe error alert | Quota failure unit/browser tests | [PASS] |
| Malformed stored model and missing references | `validateState`, domain lookups | Corrupt JSON, missing team/task, invalid IDs/history tests | [PASS] |
| Invalid business actions | Actor, decision enum and duplicate-state guards | Explicit invalid/non-business decisions tests | [PASS] |
| Nonaccepted progress attempts | Acceptance, actor and evidence validation | Dedicated progress tests | [PASS] |
| Preserve inputs after recoverable errors; no false success | In-memory form values; commit only after write | Browser invalid description, proposal and quota tests | [PASS] |
| No raw stack traces or secrets in UI | Generic provider/server/storage notices; public-only assets | Secret exclusion assertions and browser page-error array | [PASS] |
| AI analysis, submit, publish, decision and progress loading | Shared async `work` state, spinner, disabled controls | Live analysis-loading assertion and all action paths | [PASS] |
| No catalog tasks | Explicit empty-catalog message | Isolated empty-state browser session | [PASS] |
| No filtered results | Clear explanation and clear-filter actions | Real conflicting topic/readiness filter check | [PASS] |
| No proposals | `proposalsPanel` empty message | Newly published task browser assertion | [PASS] |
| No team history | Team workspace and profile empty text | Isolated no-proposal team browser check | [PASS] |
| No missing fields on complete card | Completion message | Browser 100-point card assertion | [PASS] |
| Current perspective and flow step obvious | Role pills, active-team bar, numbered wizard steps | Browser screenshots and view transitions | [PASS] |
| Editable versus confirmed, score/readiness/publication/rank obvious | Separate labels, official score panel and status strip | Browser assertions + screenshot inspection | [PASS] |
| Proposal status/manual controls/progress points obvious | Status badges, decision buttons, verified milestone history | Actual proposal/progress browser scenario | [PASS] |
| Clear hierarchy, accessible labels, keyboard-native controls | Labels, aria names/status, skip link, dialog focus loop, visible focus | Browser label-based controls and visual review; no formal certification claimed | [PASS] |
| Stable coherent desktop layout | Responsive CSS at 1440px | No horizontal overflow assertion and screenshots | [PASS] |
| Visible primary controls function; no dead placeholder buttons | Working navigation, forms, reset, guide and demo actions | Browser action coverage; source review of action handlers | [PASS] |

## README, judging and final completion

| Requirement | Implemented feature/file | Verification method | Status |
| --- | --- | --- | --- |
| Purpose, architecture, choices and prerequisites | README opening/architecture | Document review against executable files and Node requirement | [PASS] |
| Exact install/start/build/environment steps | README Run/AI sections, `.env.example` | Executed dependency-free commands and npm install | [PASS] |
| AI provider, actual prompts, input/output/schema | README AI sections, schema artifact | Prompt/schema automated equality and document review | [PASS] |
| Fabrication safeguards, invalid output and offline fallback | README AI behavior | Matches tested code paths and source validators | [PASS] |
| Complete card field list, exact formula, validation/ranges | README Card/rating sections | Compare to `FIELDS`, `fieldValid`, `readiness` and tests | [PASS] |
| Catalog visibility, sorting, ties, filters, low-score access | README Catalog | Compare to comparator and actual browser visibility | [PASS] |
| Team fields and all proposal rules | README Teams/proposals | Model/test comparison | [PASS] |
| Manual decisions; multiple/no selections; no auto assignment | README purpose and decisions | Source/model and independent-choice test comparison | [PASS] |
| Progress confirmation, points and documented assumption | README progress and env | Verified 10-point live award, configuration unit checks | [PASS] |
| Synthetic dataset, reset and test commands | README seed/verification | Actual seed counts, reset recovery and commands | [PASS] |
| Known limitations do not replace required features | README troubleshooting/scope | Local storage expressly permitted; core complete; optional paid provider limitation disclosed | [PASS] |
| Step-by-step demonstration within five minutes | README timed table + in-app guide | All transitions automated in actual browser; guide entry works | [PASS] |
| Troubleshooting | README last section | Covers observed port/setup/storage/provider/test-tool conditions | [PASS] |
| End-to-end judging criterion (20 points) | Live complete scenario | Browser input through acceptance/progress | [PASS] |
| Task-card quality criterion (15 points) | Contextual questions, source-locked editable fields | AI schema/source tests and live review | [PASS] |
| Business gamification criterion (25 points) | Exact transparent confirmed rating and rank | Weight/boundary/combinations tests and live 45→100 improvement | [PASS] |
| Catalog/proposals criterion (15 points) | All tasks, both filters, unlimited proposals, manual decisions | Catalog/proposal unit and browser tests | [PASS] |
| AI criterion (10 points) | Optional strict-schema provider and useful local fallback | Provider mocks, hallucination rejection and actual local workflow | [PASS] |
| Technical-quality criterion (10 points) | Dependency-free install, validation, persistence, tests and docs | Successful install, lint, 47 tests and production build | [PASS] |
| Demonstration criterion (5 points) | In-app timed guide and prepared facts | Actual end-to-end UI automation + visual review | [PASS] |
| Final audit covers requirements with implementation/evidence/status | This file | Every requirement mapped above; all mandatory statuses pass | [PASS] |
| Definition of done: actual files, runnable app, all core interactions, tests/docs/audit | Complete project | Final production build and real-browser suite | [PASS] |

The judging rows verify implementation coverage; they do not claim scores awarded by organizers. Remaining non-mandatory limits are the deliberately local single-browser demo persistence, conservative English extraction/validation, no full mobile optimization or authentication, and the absence of a live paid-provider credential test. None prevents the required demonstration.
