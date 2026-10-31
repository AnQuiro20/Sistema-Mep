# AulaGestión

Web SaaS for individual teachers in Costa Rica. The repository keeps the legacy name `Sistema MEP`.

Product scope, backlog, and user stories live in `Backlog,,userstories y contexto/`. Agent rules live in `AGENTS.md`.

## Requirements

- Node.js `>=20.9.0` (developed with Node 26) and npm 10 or newer.

## Getting started

```bash
npm ci          # install the exact versions pinned in package-lock.json
npm run dev     # development server at http://localhost:3000
```

No environment variables are required yet. Never commit `.env*` files; they are git-ignored.

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create the production build |
| `npm run start` | Serve the production build (run `build` first) |
| `npm run typecheck` | Strict TypeScript check without emitting files |
| `npm run lint` | ESLint (Next.js core-web-vitals + TypeScript rules) |
| `npm run verify` | `typecheck` followed by `lint` |

## Project layout

```
src/app/      Next.js App Router (delivery layer only)
src/modules/  Domain modules: identity, academic, evaluation, reporting, billing
docs/adr/     Architecture decision records
```

Module boundaries and import rules are defined in `docs/adr/0001-modular-architecture.md` and enforced by `npm run lint`.

Dependencies are pinned to exact versions. Add dependencies with `npm install --save-exact`.
