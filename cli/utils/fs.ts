import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/** Root of the installed package (or repo when developing). */
export function getPackageRoot(): string {
  const here = path.dirname(fileURLToPath(import.meta.url));
  const candidates = [
    path.resolve(here, ".."),
    path.resolve(here, "../.."),
    path.resolve(here, "../../.."),
    process.cwd(),
  ];

  for (const candidate of candidates) {
    const hasPkg = fs.existsSync(path.join(candidate, "package.json"));
    const hasTemplates = fs.existsSync(path.join(candidate, "templates"));
    const hasComponents = fs.existsSync(path.join(candidate, "components"));
    if (hasPkg && (hasTemplates || hasComponents)) {
      return candidate;
    }
  }

  return path.resolve(here, "..");
}

export function getTemplatesRoot(): string {
  return path.join(getPackageRoot(), "templates");
}

export function pathExists(p: string): boolean {
  return fs.existsSync(p);
}

export function ensureDir(dir: string): void {
  fs.mkdirSync(dir, { recursive: true });
}

export function readText(filePath: string): string {
  return fs.readFileSync(filePath, "utf8");
}

export function writeText(filePath: string, content: string): void {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, "utf8");
}

export function copyFile(from: string, to: string): void {
  ensureDir(path.dirname(to));
  fs.copyFileSync(from, to);
}
