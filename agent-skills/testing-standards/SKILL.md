---
name: testing-standards
description: Add or review tests for an active AG-XXX story, including business rules, parsing, state changes, public contracts, error paths, and defect regressions with configured tooling.
---

# Testing standards

Test observable behavior required by the active story. The story's acceptance criteria, minimum validation, and applicable global completion gates define required evidence.

## Discover the test contract

1. Read the active story and identify its positive, negative, boundary, and failure behaviors.
2. Read the dependency manifest, test configuration, and project scripts.
3. Read a nearby test for the same kind of unit when one exists.
4. Determine the exact non-watch command for the relevant test.

If no runner or convention exists, do not install or invent one unless the active story explicitly requires establishing it. Report unavailable checks honestly. Already-available maintenance utilities may validate repository governance artifacts.

## Required coverage

Add focused tests for:

- acceptance criteria with observable behavior;
- business calculations, parsing, serialization, and state transitions;
- boundary conditions and explicit error paths;
- public contracts whose behavior changed;
- every defect fix through a regression that fails before the fix and passes after it;
- cross-tenant denial, both supported locales, or remote fallback and rollback when those concerns apply.

Follow the specialized security, internationalization, and remote-configuration skills for their detailed test obligations. Do not test trivial accessors, generated code, third-party behavior, or private implementation details.

## Test design

- One behavior per test, named as a specification.
- Keep setup, action, and assertion distinguishable.
- Assert observable results and side effects rather than private call sequences.
- Keep tests independent of order and shared mutable state.
- Control clocks, randomness, locale, and external state.
- Do not use arbitrary sleeps or live network dependencies.
- Replace only external boundaries; never mock the unit under test.
- Use synthetic records and clean up fixtures even after failure.

## Verification report

Run the narrowest relevant test first, then configured broader checks when practical. Report exact commands, real results, covered acceptance criteria, and important untested behavior. Never describe an unexecuted check as passing.
