---
name: story-delivery
description: Plan, implement, review, or close one AulaGestión AG-XXX story using its exact scope, dependencies, acceptance criteria, minimum validation, and applicable global completion criteria.
---

# Story delivery

Deliver exactly one AG-XXX story at a time. The Contexto, Backlog, and UserStories documents are the product authority; repository configuration supplies technical evidence but cannot redefine the story.

## Establish the active story

Before editing:

1. Identify the AG-XXX requested by the user or declared active in `AGENTS.md`.
2. Read its full entry in `UserStories.docx` and its backlog row.
3. Read every listed dependency and confirm it is complete or has the stable contract explicitly allowed by the backlog.
4. Copy the story acceptance criteria and minimum validation into the working checklist without rewriting their meaning.
5. Select only the global Definition of Done and cross-cutting rules that apply to this story.

If a dependency is unresolved, stop and report the dependency. Do not implement it incidentally or begin a later story to unblock yourself.

## Bound the change

- Treat acceptance criteria as the required product contract, not a starting point for extra features.
- Do not implement work assigned to a later AG-XXX story, even when it appears convenient.
- A missing commercial, legal, regulatory, domain, or provider decision is a blocker or ADR candidate, not permission to choose.
- Use synthetic data only. Never substitute real student data into fixtures, screenshots, logs, or demonstrations.
- Keep every file and migration traceable to an acceptance criterion, an applicable completion criterion, or necessary technical support for them.

## Delivery sequence

1. State the active story, dependency status, acceptance checklist, and applicable cross-cutting concerns.
2. Inspect current manifests, configuration, approved ADRs, source, and tests.
3. Plan the smallest implementation and the evidence required for acceptance.
4. Add or update tests for important behavior and failure paths.
5. Implement only the active scope.
6. Review security, tenant isolation, internationalization, and remote configuration when each concern applies.
7. Run application checks declared by repository configuration and any already-available maintenance validator required by the change.
8. Report each acceptance criterion as met, unmet, or blocked with concrete evidence.

## Completion report

Include:

- active story and dependency status;
- files changed and the criterion each supports;
- exact verification commands and real results;
- security, locale, and configuration evidence when applicable;
- remaining blockers or unmet criteria.

Do not mark the story complete or start the next story while any acceptance criterion or applicable completion gate remains unmet.
