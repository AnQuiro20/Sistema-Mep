# AulaGestión - Agent Contract

This file is the cross-tool contract for every coding agent working in this repository. The repository and folder retain the legacy name `Sistema MEP`; the product name is AulaGestión.

## Source of truth

| Layer | Path | Responsibility |
| --- | --- | --- |
| Current user direction | Conversation | Current objective and explicitly approved decisions |
| Product context | `Backlog,,userstories y contexto/Contexto_Proyecto.docx` | Product vision, scope, domain rules, and cross-cutting constraints |
| Delivery plan | `Backlog,,userstories y contexto/Backlog.docx` | Story priority, dependencies, readiness, and global completion criteria |
| Story specification | `Backlog,,userstories y contexto/UserStories.docx` | AG-XXX scope, acceptance criteria, and minimum validation |
| Project contract | `AGENTS.md` | Confirmed context, precedence, workflow, and skill routing |
| Task skills | `agent-skills/*/SKILL.md` | Detailed standards loaded only when their task applies |
| Technical evidence | Manifests, configuration, approved ADRs, and source | Confirmed technical choices, commands, and implementation patterns |

## Precedence

Apply guidance in this order:

1. The user's current requirement and explicit decisions.
2. Acceptance criteria for the active AG-XXX story and approved product decisions.
3. Manifests, configuration, and approved ADRs for technical scope only.
4. Every matching local skill.
5. General rules in this contract.
6. Established patterns in nearby code.
7. General engineering judgment.

Technical configuration cannot add, remove, or reinterpret product requirements. Escalate a real conflict instead of silently choosing a lower-priority rule.

## Confirmed project snapshot

- **Product:** AulaGestión, a web SaaS for individual teachers in Costa Rica.
- **MVP customer:** the paying account is an individual teacher; institutions, student accounts, and parent accounts are outside the initial scope.
- **Locales:** Costa Rican Spanish (`es-CR`) and English (`en`) from the first release.
- **Active story:** AG-001, repository and project structure initialization. Work on one AG-XXX story at a time and do not begin a dependent story early.
- **Application stack required by AG-001:** Next.js with strict TypeScript.
- **Database direction:** PostgreSQL is preferred and may change only through an approved ADR and explicit decision.
- **Undecided providers:** authentication, billing, remote configuration, hosting, storage, queues, observability, and other vendors remain unselected until their story or an approved ADR decides them.
- **Source layout and application commands:** Next.js App Router under `src/app/`; npm scripts `dev`, `build`, `start`, `typecheck`, `lint`, and `verify` are declared in `package.json`. TypeScript is pinned to 6.x because `typescript-eslint` does not yet support 7.

The three product documents above are authoritative. Read them before planning or implementing a story. Do not invent users, processes, calculations, percentages, legal conclusions, providers, or institutional integrations.

## Default engineering bar

- Choose the simplest architecture that satisfies the active story and its dependencies.
- Keep changes focused; do not add future-story features, speculative abstractions, or unrelated documentation.
- Extend established patterns instead of creating parallel structures.
- Make boundaries explicit, names domain-oriented, failures visible, and important behavior testable.
- Do not leave debug output, disabled code, unfinished placeholders, secrets, or real student data in the repository.

## Mandatory skill protocol

Before creating or changing repository content:

1. Read this contract and the three authoritative product documents.
2. Identify the single active AG-XXX story, its dependencies, acceptance criteria, minimum validation, and applicable global Definition of Done items.
3. Scan the catalog below and read every matching `SKILL.md` completely.
4. Inspect relevant manifests, configuration, approved ADRs, source, and tests.
5. Follow confirmed decisions and report unresolved product, legal, regulatory, or provider choices as blockers rather than assumptions.

## Skill catalog

| Skill | Path | Load when |
| --- | --- | --- |
| `story-delivery` | `agent-skills/story-delivery/SKILL.md` | Planning, implementing, reviewing, or closing any AG-XXX story |
| `architecture-standards` | `agent-skills/architecture-standards/SKILL.md` | Introducing modules, changing boundaries or dependency direction, or recording a technical decision |
| `constants-standards` | `agent-skills/constants-standards/SKILL.md` | Adding values with business meaning, configuration keys, paths, limits, statuses, or messages |
| `testing-standards` | `agent-skills/testing-standards/SKILL.md` | Adding or reviewing tests, changing important logic, or fixing a defect that needs regression coverage |
| `multi-tenant-security` | `agent-skills/multi-tenant-security/SKILL.md` | Reading or changing teacher-owned data, authorization, files, reports, jobs, or tenant-aware persistence |
| `internationalization-standards` | `agent-skills/internationalization-standards/SKILL.md` | Adding or changing user-visible text, errors, formatting, locale behavior, catalogs, or PDFs |
| `remote-config-standards` | `agent-skills/remote-config-standards/SKILL.md` | Adding or changing remote parameters, flags, catalogs, publication, fallback, caching, or rollback |

## Working agreements

- Read the files being changed and a nearby analogue when one exists.
- Keep one responsibility per module and expose the smallest useful public surface.
- Preserve dependency direction and avoid circular dependencies.
- Validate and authorize at server boundaries; client state and flags never grant access.
- Put secrets in the environment or an approved secret store, never in tracked files.
- Use synthetic data during development; do not place real minors' personal or academic data in fixtures, logs, screenshots, or demos.
- Run application commands only when declared by repository manifests or configuration. Required maintenance utilities, such as the skill validator, may run when already available; do not install dependencies merely to make a check pass.
- Report exact checks and results, including every check that could not run.
- Keep repository documentation, source, tests, commit text, branches, and pull request text in English unless the user explicitly requests otherwise. Preserve the existing Spanish product documents.

## Git authorization

Creating or editing files does not authorize history or remote changes. Do not commit, push, open or merge a pull request, force-push, or delete branches unless the user explicitly authorizes that action.

## Evolving this contract

When a story or technical decision establishes a tool or pattern, update this snapshot in the same change only when supported by a manifest, configuration, approved ADR, or present source. Never document a prospective provider as selected.

To add a skill:

1. Create `agent-skills/<kebab-name>/SKILL.md` with matching `name` and `description` frontmatter.
2. Keep it focused on one task family and do not duplicate this contract or another skill.
3. Register it in the catalog above.
4. Validate it with the available skill validator without installing new dependencies.
