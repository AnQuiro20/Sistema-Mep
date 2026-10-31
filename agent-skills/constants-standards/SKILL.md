---
name: constants-standards
description: Place business values, repeated literals, configuration keys, paths, limits, statuses, or messages in an authoritative owner without bypassing locale or remote-configuration rules.
---

# Constants standards

Give each meaningful value one authoritative owner. Prevent silent drift without replacing incidental syntax with unnecessary indirection.

## Values that need an owner

Extract or configure:

- business limits, thresholds, time windows, and retry policies;
- identifiers, status values, error codes, and configuration keys;
- routes, endpoints, filenames, and persistent storage keys;
- regular expressions and format patterns with domain meaning;
- values repeated across call sites or changed as one decision.

Visible text and locale formatting follow `internationalization-standards`. Remotely managed parameters and flags follow `remote-config-standards`. Never move access rules, tenant ownership, secrets, or historical academic calculations into a general constants collection.

## Choose the owner

1. Search for an existing definition before creating one.
2. Follow the established constants, configuration, type, or message layout.
3. Keep a value with the capability that owns its meaning when only that capability uses it.
4. Promote it to a shared location only when multiple capabilities share the same concept.
5. Split collections by capability; do not create a miscellaneous global bucket.

Do not create a root directory, alias, library, or configuration service solely to store one value.

## Naming and stability

- Name the reason for the value, not its representation.
- Use one term for one concept throughout the repository.
- Follow strict TypeScript and neighboring naming conventions after AG-001 establishes them.
- Status and error identifiers are stable, unambiguous, and separate from display text.
- Boolean values read as assertions.

## Configuration and secrets

- Environment-dependent values belong in validated configuration, not scattered call sites.
- Credentials, tokens, keys, and secrets never belong in tracked source or plausible example values.
- Validate required configuration at the server boundary and fail with actionable context.
- Configuration sources do not override active-story acceptance criteria or approved product decisions.

## Review checklist

- No existing definition already owns the concept.
- The location follows capability ownership.
- The name explains why the value exists.
- One authoritative definition changes the decision everywhere.
- No secret, tenant rule, translation, or remotely governed value is misplaced.
