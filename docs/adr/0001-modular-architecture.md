# ADR 0001: Modular monolith and domain contracts

- **Status:** Proposed (becomes a project rule once the user approves it)
- **Story:** AG-002
- **Date:** 2026-10-30

## Context

AulaGestión handles personal and academic data of minors for many independent teachers. The product needs identity, academic, evaluation, reporting, and billing capabilities with low coupling and no cross-teacher access. Hosting, queue, auth, and billing providers are still undecided, so the architecture must not depend on them.

## Decision

Build a **modular monolith** inside the Next.js application. Each module owns one capability and lives in `src/modules/<module>/`.

| Module       | Owns                                                                          | May depend on                        |
| ------------ | ----------------------------------------------------------------------------- | ------------------------------------ |
| `identity`   | users, auth identities, sessions, teacher context                             | none                                 |
| `academic`   | years, periods, groups, subjects, students, enrollments, schedule, attendance | `identity`                           |
| `evaluation` | profiles, schemes, rubrics, assessments, grades                               | `identity`, `academic`               |
| `reporting`  | statistics, report jobs, PDFs                                                 | `identity`, `academic`, `evaluation` |
| `billing`    | subscriptions, payments, payment events                                       | `identity`                           |

Dependencies point one way along this table. A cycle is a design error: fix ownership or extract a genuinely shared concept.

### Module layout

```
src/modules/<module>/
  index.ts          public contract: DTOs, service interfaces, domain events
  domain/           entities and rules; no framework, database, or vendor imports
  application/      services that run business operations and authorization
  infrastructure/   persistence and vendor adapters implementing contracts
```

Folders are created by the story that first needs them. `index.ts` always exists.

### Import conventions

- Other modules and `src/app` import only `@/modules/<module>` (the public `index.ts`).
- Deep imports such as `@/modules/academic/domain/...` are forbidden. ESLint enforces this (`no-restricted-imports` in `eslint.config.mjs`).
- Inside a module, use relative imports. Reaching into a sibling module with `../../` is forbidden.

### Services and DTOs

- Business operations and authorization live in `application/` services, never only in React components, route handlers, or server actions. Those delivery layers validate input, call a service, and map the result.
- Every service method receives a `TeacherContext` (the authenticated `teacherId`, resolved on the server) and checks ownership of every object it reads or writes. IDs, roles, and flags from the client are never trusted.
- DTOs are plain serializable types defined in the module's `index.ts`. Entities and database rows never cross a module boundary.

### Trust boundaries

1. **Browser to server:** untrusted. Validate and authorize every request on the server.
2. **Delivery layer to application service:** input is validated; `TeacherContext` comes from the session, not the request body.
3. **Application service to infrastructure:** queries are always scoped by `teacherId` (row-level security as defense in depth, designed in AG-007).
4. **Server to external providers:** providers are accessed only through contracts owned by the module that needs them.

### Transactions

- One application service call is one unit of work and one database transaction. Transaction scope is opened by the service and passed to repositories; repositories never open their own.
- A transaction never spans two modules. A cross-module effect is a domain event, not a shared transaction.
- Operations that can be retried (webhooks, jobs, imports) must be idempotent.

### Events

- A module publishes domain events (past-tense, serializable DTOs) from its `index.ts`. Consumers react in their own transaction.
- Events are delivered in-process after the publishing transaction commits. A durable queue or outbox requires a later ADR, because queue providers are undecided.
- Events carry identifiers and the `teacherId`, never student personal data, so logs stay free of PII.

## Alternatives considered

- **Layered by technical type only** (`components/`, `services/`, `db/`): simpler, but mixes capabilities and makes cross-teacher leaks harder to prevent.
- **Microservices:** unjustified operational cost for the MVP and unselected infrastructure.

## Consequences

- Boundaries are checked automatically by lint, so violations fail verification.
- Cross-module features need an explicit contract in `index.ts`, adding small upfront cost.
- Event delivery guarantees are limited to in-process until a durable mechanism is approved.
