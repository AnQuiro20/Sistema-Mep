# ADR 0002: Supabase PostgreSQL as the single data platform

- **Status:** Accepted (user delegated the decision, 2026-10-31)
- **Stories:** AG-003 (database), AG-017 and later (Remote Config)

## Context

The context document requires PostgreSQL with versioned migrations and row-level security. It also requires Remote Config to be server-managed, versioned, audited, and reversible, and lists `remote_config_keys`, `remote_config_versions`, `translation_catalogs`, and `audit_events` among the domain entities. The user considered Firestore for Remote Config.

## Decision

1. **One data platform:** PostgreSQL 17 hosted on Supabase. Schema is owned by this repository's SQL migrations (`db/migrations`, node-pg-migrate), not by the Supabase dashboard. The application connects through `DATABASE_URL`, so it stays portable to any PostgreSQL.
2. **Remote Config lives in PostgreSQL** (AG-017/AG-018). Publishing a version and its audit event share one transaction; rollback moves a pointer to a previous immutable version.
3. **Firestore and Firebase are not used.** They would add a second vendor and credential set without a capability PostgreSQL lacks for this scope.

## Not decided

Supabase Auth versus another OIDC service (AG-009), Supabase Storage versus another private store (AG-072), hosting, queues, and observability remain open until their stories or a new ADR.

## Consequences

- Remote Config safety rules (allowlist, schema, no access control by flag) are enforced in application code and database constraints.
- A bad deployment of Remote Config is bounded by the same backups and RLS as the rest of the data.
- Revisit Firestore only if Remote Config needs client push updates that polling cannot satisfy.
