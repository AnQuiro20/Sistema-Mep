---
name: architecture-standards
description: Design or revise module boundaries, dependency direction, cross-module contracts, or ADR-backed technical choices within the active AG-XXX story.
---

# Architecture standards

Shape changes around responsibilities required by the active story. Do not introduce future-story layers, extension points, or provider choices merely to make the project appear complete.

## Confirmed direction

- AG-001 requires Next.js with strict TypeScript.
- PostgreSQL is the preferred database direction, but changing or confirming it beyond the active story requires an approved ADR and explicit decision.
- Authentication, billing, remote configuration, hosting, storage, queue, and observability providers remain undecided until an applicable story or approved ADR selects them.
- A manifest, configuration file, or ADR can establish a technical choice; it cannot alter product requirements or story acceptance criteria.

## Inspect before deciding

1. Identify the active story, affected capabilities, callers, public contracts, and technical evidence.
2. Read a nearby implementation that solves a comparable problem when one exists.
3. State each proposed unit's purpose in one sentence without "and." Split a unit with multiple responsibilities.
4. Mark every new dependency and its direction.
5. Surface missing product or provider decisions instead of encoding assumptions.

When no project structure exists, create only the minimum boundary needed by the active story.

## Boundaries

- A module owns one cohesive capability and exposes the smallest contract its callers need.
- Callers use public contracts and never reach into another module's internal state.
- Domain decisions do not depend on delivery, storage, vendor, or user-interface details.
- High-level policy defines the contract it needs; replaceable infrastructure implements it.
- Resolve dependency cycles by correcting ownership or extracting a genuinely shared concept.
- Shared code needs a capability-specific name; do not create catch-all helper or utility modules.
- Prefer composition and explicit collaborators over inheritance used only for reuse.

## Size signals

Treat these as mandatory split signals for handwritten code:

| Unit | Maximum |
| --- | --- |
| File | 150 lines |
| Function or method | 40 lines |
| Parameters | 4 |
| Control-flow nesting | 3 levels |

Generated, vendored, migration-generated, and lock files are exempt. Split along responsibilities, never at an arbitrary line count.

## ADR boundary

Create or update an ADR when the active story requires a durable choice among material technologies, providers, data models, or dependency directions. Record context, decision, alternatives, consequences, and approval state. An unapproved ADR is a proposal, not an established project rule.

Keep unrelated refactors outside the story. If a required contract depends on an undecided product rule or provider, report the decision point and stop there.
