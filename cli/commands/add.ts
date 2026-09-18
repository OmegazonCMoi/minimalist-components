import fs from "node:fs";
import path from "node:path";
import {
  getRegistryItem,
  type RegistryItem,
} from "../../registry/components";
import {
  missingNpmDeps,
  promptConfirm,
  readConfig,
  type MinimalistConfig,
} from "../utils/config";
import {
  getTemplatesRoot,
  pathExists,
  readText,
  writeText,
} from "../utils/fs";
import { transformSource } from "../utils/transform";

type AddOptions = {
  cwd?: string;
  force?: boolean;
  yes?: boolean;
};

function resolveItem(name: string): RegistryItem {
  const item = getRegistryItem(name);
  if (!item) {
    const available = "Run: npx minimalist-components list";
    throw new Error(`Unknown component "${name}". ${available}`);
  }
  return item;
}

function collectInstallPlan(
  name: string,
  seen = new Set<string>(),
): RegistryItem[] {
  if (seen.has(name)) return [];
  seen.add(name);
  const item = resolveItem(name);
  const deps = item.registryDependencies.flatMap((dep) =>
    collectInstallPlan(dep, seen),
  );
  return [...deps, item];
}

async function writeTransformedFile(opts: {
  from: string;
  to: string;
  config: MinimalistConfig;
  force?: boolean;
  yes?: boolean;
}): Promise<"written" | "skipped" | "exists"> {
  const { from, to, config, force, yes } = opts;
  if (!pathExists(from)) {
    throw new Error(`Template missing: ${from}`);
  }

  if (pathExists(to) && !force) {
    if (yes) {
      return "exists";
    }
    const ok = await promptConfirm(`Overwrite ${path.relative(process.cwd(), to)}?`);
    if (!ok) return "skipped";
  }

  const raw = readText(from);
  const next = transformSource(raw, config);
  writeText(to, next);
  return "written";
}

export async function addCommand(
  names: string[],
  options: AddOptions = {},
): Promise<void> {
  const cwd = options.cwd ?? process.cwd();
  const config = readConfig(cwd);
  if (!config) {
    console.error(
      "✖ Missing minimalist.json. Run: npx minimalist-components init",
    );
    process.exitCode = 1;
    return;
  }

  if (names.length === 0) {
    console.error("✖ Specify at least one component. Example: add button");
    process.exitCode = 1;
    return;
  }

  const templatesRoot = getTemplatesRoot();
  if (!pathExists(templatesRoot)) {
    console.error(
      "✖ Templates not found in the package. Reinstall minimalist-components or run npm run sync:templates in the library repo.",
    );
    process.exitCode = 1;
    return;
  }

  const plan: RegistryItem[] = [];
  const seen = new Set<string>();
  for (const name of names) {
    for (const item of collectInstallPlan(name.toLowerCase(), seen)) {
      plan.push(item);
    }
  }

  const npmNeeded = new Set<string>();
  const written: string[] = [];
  const skipped: string[] = [];

  for (const item of plan) {
    for (const dep of item.dependencies) npmNeeded.add(dep);

    for (const util of item.utils) {
      const from = path.join(templatesRoot, "lib", util.target);
      const to = path.join(cwd, config.libDir, util.target);
      if (pathExists(to) && !options.force) {
        // Shared util already present — keep consumer edits.
        skipped.push(path.relative(cwd, to));
        continue;
      }
      const result = await writeTransformedFile({
        from,
        to,
        config,
        force: options.force,
        yes: options.yes,
      });
      if (result === "written") written.push(path.relative(cwd, to));
      else if (result === "skipped") skipped.push(path.relative(cwd, to));
    }

    for (const file of item.files) {
      const from = path.join(templatesRoot, "components", file.target);
      const to = path.join(cwd, config.componentsDir, file.target);
      const result = await writeTransformedFile({
        from,
        to,
        config,
        force: options.force,
        yes: options.yes,
      });
      if (result === "written") written.push(path.relative(cwd, to));
      else if (result === "skipped" || result === "exists") {
        skipped.push(path.relative(cwd, to));
      }
    }

    console.log(`✓ ${item.name}`);
  }

  if (written.length) {
    console.log("\nFiles:");
    for (const file of written) console.log(`  + ${file}`);
  }
  if (skipped.length) {
    console.log("\nSkipped (already present / declined):");
    for (const file of [...new Set(skipped)]) console.log(`  · ${file}`);
  }

  const missing = missingNpmDeps([...npmNeeded], cwd);
  if (missing.length) {
    console.log("\nInstall peer dependencies:");
    console.log(`  npm install ${missing.join(" ")}`);
  }

  // Ensure components dir exists even if something odd happened.
  fs.mkdirSync(path.join(cwd, config.componentsDir), { recursive: true });
}
