/**
 * Copies installable sources into templates/ for npm packaging.
 * Rewrites @/components/<name> → @/components/ui/<name> for consumer-ready imports.
 *
 * Run: node scripts/sync-templates.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const registryPath = path.join(root, "registry", "components.json");
if (!fs.existsSync(registryPath)) {
  console.error("Missing registry/components.json");
  process.exit(1);
}

const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));
const templatesRoot = path.join(root, "templates");

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function transformForTemplate(source) {
  return source.replace(
    /from\s+["']@\/components\/([a-z0-9-]+)["']/g,
    (_m, name) => `from "@/components/ui/${name}"`,
  );
}

function copyTransformed(from, to) {
  const raw = fs.readFileSync(from, "utf8");
  ensureDir(path.dirname(to));
  fs.writeFileSync(to, transformForTemplate(raw), "utf8");
}

fs.rmSync(templatesRoot, { recursive: true, force: true });
ensureDir(path.join(templatesRoot, "components"));
ensureDir(path.join(templatesRoot, "lib"));

const copied = new Set();

for (const item of registry) {
  for (const file of item.files) {
    const from = path.join(root, file.source);
    const to = path.join(templatesRoot, "components", file.target);
    if (!fs.existsSync(from)) {
      throw new Error(`Missing source for ${item.name}: ${file.source}`);
    }
    copyTransformed(from, to);
    copied.add(to);
  }
  for (const util of item.utils) {
    const from = path.join(root, util.source);
    const to = path.join(templatesRoot, "lib", util.target);
    if (!fs.existsSync(from)) {
      throw new Error(`Missing util for ${item.name}: ${util.source}`);
    }
    if (!copied.has(to)) {
      copyTransformed(from, to);
      copied.add(to);
    }
  }
}

console.log(`Synced ${copied.size} template files → templates/`);
