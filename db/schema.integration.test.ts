import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { after, before, describe, it } from "node:test";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import EmbeddedPostgres from "embedded-postgres";
import { Client } from "pg";

const MIGRATE_CLI = "./node_modules/node-pg-migrate/bin/node-pg-migrate.js";
const MIGRATIONS_DIR = "db/migrations";
const SEED_SCRIPT = "db/seed.ts";
const UNIQUE_VIOLATION = "23505";
const CHECK_VIOLATION = "23514";
const FOREIGN_KEY_VIOLATION = "23503";
const TEACHER_ONE = "00000000-0000-4000-8000-000000000001";

const TEST_PORT = 54329;
const TEST_USER = "postgres";
const TEST_PASSWORD = "ephemeral-test-only";
const TEST_DATABASE = "aulagestion_test";
const databaseUrl = `postgresql://${TEST_USER}:${TEST_PASSWORD}@127.0.0.1:${TEST_PORT}/${TEST_DATABASE}`;

const run = (...args: string[]) =>
  execFileSync("node", args, { env: { ...process.env, DATABASE_URL: databaseUrl }, stdio: "pipe" });
const migrate = (...args: string[]) => run(MIGRATE_CLI, ...args, "--migrations-dir", MIGRATIONS_DIR);

async function sqlStateOf(client: Client, sql: string, values: unknown[] = []) {
  try {
    await client.query(sql, values);
  } catch (error) {
    return (error as { code?: string }).code;
  }
  return undefined;
}

describe("initial identity schema", () => {
  const dataDir = mkdtempSync(join(tmpdir(), "aulagestion-pg-"));
  const server = new EmbeddedPostgres({
    databaseDir: dataDir,
    user: TEST_USER,
    password: TEST_PASSWORD,
    port: TEST_PORT,
    persistent: false,
  });
  const client = new Client({ connectionString: databaseUrl });

  before(async () => {
    await server.initialise();
    await server.start();
    await server.createDatabase(TEST_DATABASE);
    migrate("up");
    run(SEED_SCRIPT);
    await client.connect();
  });
  after(async () => {
    await client.end();
    await server.stop();
    rmSync(dataDir, { recursive: true, force: true });
  });

  it("seeds synthetic teachers with their identities", async () => {
    const { rows } = await client.query("SELECT count(*)::int AS n FROM auth_identities");
    assert.equal(rows[0].n, 2);
  });

  it("rejects the same provider subject for a second user", async () => {
    const code = await sqlStateOf(
      client,
      "INSERT INTO auth_identities (user_id, provider, subject) VALUES ($1, 'google', 'synthetic-google-subject-1')",
      [TEACHER_ONE],
    );
    assert.equal(code, UNIQUE_VIOLATION);
  });

  it("rejects an unsupported locale", async () => {
    const code = await sqlStateOf(client, "INSERT INTO users (display_name, email, locale) VALUES ('X', 'x@example.test', 'fr')");
    assert.equal(code, CHECK_VIOLATION);
  });

  it("rejects an identity for a user that does not exist", async () => {
    const code = await sqlStateOf(
      client,
      "INSERT INTO auth_identities (user_id, provider, subject) VALUES (gen_random_uuid(), 'google', 'orphan')",
    );
    assert.equal(code, FOREIGN_KEY_VIOLATION);
  });

  it("reverts cleanly with the down migration", async () => {
    migrate("down", "1");
    const { rows } = await client.query("SELECT to_regclass('public.users') AS users");
    assert.equal(rows[0].users, null);
  });
});
