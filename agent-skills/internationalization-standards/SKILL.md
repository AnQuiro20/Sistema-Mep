---
name: internationalization-standards
description: Implement or review user-visible text, errors, formatting, locale selection, translation catalogs, or generated documents for the required es-CR and en locales.
---

# Internationalization standards

AulaGestión ships Costa Rican Spanish (`es-CR`) and English (`en`) from the first release. Internationalize user-visible behavior when its story introduces it; do not prebuild future screens or select an unapproved library.

## Message ownership

- Use stable semantic keys rather than source-language text as identifiers.
- Keep user-interface text, validation messages, errors, emails, and generated documents translatable.
- Do not hardcode visible strings in components, handlers, or templates.
- Escape interpolation values and keep placeholders equivalent across locales.
- Preserve teacher-authored content, student names, subject names, and observations in their original language.
- Do not place authorization or academic calculation logic in translation catalogs.

## Locale behavior

- Support `es-CR` and `en` with complete catalogs for the active story.
- Persist the teacher's explicit locale preference when the applicable story provides persistence.
- Use locale-aware date, time, number, grade, and currency formatting at display boundaries.
- Keep stored domain values locale-neutral; formatting never changes calculations or persisted meaning.
- Define a deterministic local fallback so missing remote catalogs or connectivity do not prevent startup.

The specific library, catalog path, and locale-routing strategy must follow the active story, manifests, configuration, or an approved ADR.

## Verification

For each affected flow:

- exercise both `es-CR` and `en`;
- detect missing keys and mismatched interpolation variables;
- verify fallback behavior for a missing or unavailable catalog;
- test locale-sensitive formatting with fixed inputs;
- check errors and generated documents as well as primary UI;
- verify user-authored content is not translated automatically.

Do not consider an affected acceptance criterion complete while either supported locale is missing required text or formatting.
