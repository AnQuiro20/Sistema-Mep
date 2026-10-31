import { readFileSync } from "node:fs";
import { Client } from "pg";

const SEED_FILE = new URL("./seeds/dev.sql", import.meta.url);
const MISSING_URL_MESSAGE =
  "DATABASE_URL is not set. Copy .env.example to .env and fill it in (see docs/database.md).";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error(MISSING_URL_MESSAGE);
}

const client = new Client({ connectionString });
await client.connect();
try {
  await client.query(readFileSync(SEED_FILE, "utf8"));
  console.log("Seed applied.");
} finally {
  await client.end();
}
