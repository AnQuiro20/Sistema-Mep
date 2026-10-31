# Database

PostgreSQL 17 (Supabase in deployed environments, see ADR 0002). Schema changes are SQL migrations in `db/migrations/`, named `<timestamp>_<description>.sql`, each with `-- Up Migration` and `-- Down Migration` sections.

## Local setup

1. Copy `.env.example` to `.env` and fill in local values (never commit it).
2. `npm run db:up` starts a local PostgreSQL with Docker (optional; you can also point `DATABASE_URL` at any PostgreSQL).
3. `npm run db:migrate` applies pending migrations to an empty or existing database.
4. `npm run db:seed` loads synthetic data from `db/seeds/dev.sql`. Seeds contain fictional records only.

## Integration test

`npm run test:db` starts a throwaway embedded PostgreSQL 17 (no Docker, no real database), migrates it, seeds it, checks the constraints, and reverts. It never reads `DATABASE_URL`.

## Reverting a change

- **Not yet released:** `npm run db:rollback` runs the latest migration's down section.
- **Already applied in a shared or production database:** do not edit or roll back. Write a new corrective migration that fixes the schema forward, test it on an empty database and on a copy of current data, then apply it.
- **Destructive down sections:** a down migration that drops data requires a verified backup first.
