// Copies the API contract from the backend so both projects validate with the same rules.
// The backend copy is the source of truth: never edit src/contracts by hand.
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const from = join(here, "../../backend/src/contracts");
const to = join(here, "../src/contracts");
if (!existsSync(from)) {
  console.error("backend/src/contracts not found. Run this from a full checkout.");
  process.exit(1);
}
rmSync(to, { recursive: true, force: true });
mkdirSync(to, { recursive: true });
cpSync(from, to, { recursive: true });
console.log(`Synced ${readdirSync(to).length} contract files.`);
