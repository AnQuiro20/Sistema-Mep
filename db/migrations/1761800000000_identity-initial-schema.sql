-- Up Migration
CREATE TABLE users (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  display_name text NOT NULL CHECK (length(btrim(display_name)) > 0),
  email        text NOT NULL CHECK (length(btrim(email)) > 0),
  locale       text NOT NULL DEFAULT 'es-CR' CHECK (locale IN ('es-CR', 'en')),
  time_zone    text NOT NULL DEFAULT 'America/Costa_Rica',
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now()
);

-- Accounts are never merged by email alone, so email is deliberately not unique.
CREATE TABLE auth_identities (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    uuid NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  provider   text NOT NULL CHECK (provider IN ('google', 'microsoft')),
  subject    text NOT NULL CHECK (length(subject) > 0),
  email      text,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT auth_identities_provider_subject_key UNIQUE (provider, subject)
);

CREATE INDEX auth_identities_user_id_idx ON auth_identities (user_id);

-- Down Migration
DROP TABLE auth_identities;
DROP TABLE users;
