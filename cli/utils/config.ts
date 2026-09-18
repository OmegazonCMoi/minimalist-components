import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";

export type MinimalistConfig = {
  $schema?: string;
  componentsDir: string;
  libDir: string;
  aliases: {
    components: string;
    lib: string;
  };
  typescript: boolean;
};

export const CONFIG_FILENAME = "minimalist.json";

export const defaultConfig = (): MinimalistConfig => ({
  componentsDir: "components/ui",
  libDir: "lib",
  aliases: {
    components: "@/components/ui",
    lib: "@/lib",
  },
  typescript: true,
});

export function resolveConfigPath(cwd = process.cwd()): string {
  return path.join(cwd, CONFIG_FILENAME);
}

export function readConfig(cwd = process.cwd()): MinimalistConfig | null {
  const file = resolveConfigPath(cwd);
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, "utf8")) as MinimalistConfig;
}

export function writeConfig(config: MinimalistConfig, cwd = process.cwd()): void {
  const file = resolveConfigPath(cwd);
  fs.writeFileSync(file, `${JSON.stringify(config, null, 2)}\n`, "utf8");
}

export function isNextProject(cwd = process.cwd()): boolean {
  const pkgPath = path.join(cwd, "package.json");
  if (!fs.existsSync(pkgPath)) return false;
  try {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8")) as {
      dependencies?: Record<string, string>;
      devDependencies?: Record<string, string>;
    };
    const all = { ...pkg.dependencies, ...pkg.devDependencies };
    return Boolean(all.next);
  } catch {
    return false;
  }
}

export function hasTailwind(cwd = process.cwd()): boolean {
  const pkgPath = path.join(cwd, "package.json");
  if (!fs.existsSync(pkgPath)) return false;
  try {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8")) as {
      dependencies?: Record<string, string>;
      devDependencies?: Record<string, string>;
    };
    const all = { ...pkg.dependencies, ...pkg.devDependencies };
    return Boolean(all.tailwindcss || all["@tailwindcss/postcss"]);
  } catch {
    return false;
  }
}

export function readPackageJson(cwd = process.cwd()): {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
} | null {
  const pkgPath = path.join(cwd, "package.json");
  if (!fs.existsSync(pkgPath)) return null;
  return JSON.parse(fs.readFileSync(pkgPath, "utf8"));
}

export function missingNpmDeps(
  deps: string[],
  cwd = process.cwd(),
): string[] {
  const pkg = readPackageJson(cwd);
  if (!pkg) return deps;
  const installed = {
    ...pkg.dependencies,
    ...pkg.devDependencies,
  };
  return deps.filter((dep) => !installed[dep]);
}

export function promptConfirm(question: string): Promise<boolean> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(`${question} (y/N) `, (answer) => {
      rl.close();
      const normalized = answer.trim().toLowerCase();
      resolve(normalized === "y" || normalized === "yes");
    });
  });
}

export function promptText(
  question: string,
  fallback: string,
): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(`${question} (${fallback}) `, (answer) => {
      rl.close();
      const value = answer.trim();
      resolve(value || fallback);
    });
  });
}
