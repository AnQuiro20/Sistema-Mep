-- Synthetic data only: fictional teachers on the reserved example.test domain.
INSERT INTO users (id, display_name, email, locale) VALUES
  ('00000000-0000-4000-8000-000000000001', 'Docente Ficticio Uno', 'docente.uno@example.test', 'es-CR'),
  ('00000000-0000-4000-8000-000000000002', 'Fictional Teacher Two', 'teacher.two@example.test', 'en')
ON CONFLICT (id) DO NOTHING;

INSERT INTO auth_identities (id, user_id, provider, subject, email) VALUES
  ('00000000-0000-4000-8000-0000000000a1', '00000000-0000-4000-8000-000000000001', 'google', 'synthetic-google-subject-1', 'docente.uno@example.test'),
  ('00000000-0000-4000-8000-0000000000a2', '00000000-0000-4000-8000-000000000002', 'microsoft', 'synthetic-microsoft-subject-2', 'teacher.two@example.test')
ON CONFLICT (id) DO NOTHING;
