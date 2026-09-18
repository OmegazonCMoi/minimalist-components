import fs from "node:fs";
import path from "node:path";
import {
  CONFIG_FILENAME,
  defaultConfig,
  hasTailwind,
  isNextProject,
  promptConfirm,
  promptText,
  resolveConfigPath,
  writeConfig,
} from "../utils/config";

export async function initCommand(
  cwd = process.cwd(),
  options: { yes?: boolean } = {},
): Promise<void> {
  const pkgPath = path.join(cwd, "package.json");
  if (!fs.existsSync(pkgPath)) {
    console.error("✖ No package.json found. Run this inside a Node project.");
    process.exitCode = 1;
    return;
  }

  if (!isNextProject(cwd)) {
    console.warn("⚠ next was not found in package.json — continuing anyway.");
  } else {
    console.log("✓ Next.js project detected");
  }

  if (hasTailwind(cwd)) {
    console.log("✓ Tailwind CSS detected");
  } else {
    console.warn(
      "⚠ Tailwind CSS not detected. Components use Tailwind utility classes.",
    );
  }

  const configPath = resolveConfigPath(cwd);
  if (fs.existsSync(configPath)) {
    if (!options.yes) {
      const overwrite = await promptConfirm(
        `${CONFIG_FILENAME} already exists. Overwrite?`,
      );
      if (!overwrite) {
        console.log("Skipped. Existing config kept.");
        return;
      }
    }
  }

  const defaults = defaultConfig();
  const interactive = process.stdin.isTTY && !options.yes;

  const componentsDir = interactive
    ? await promptText("Components directory", defaults.componentsDir)
    : defaults.componentsDir;
  const libDir = interactive
    ? await promptText("Lib directory", defaults.libDir)
    : defaults.libDir;

  if (!interactive) {
    console.log(`Using defaults: ${componentsDir}, ${libDir}`);
  }

  const config = {
    ...defaults,
    componentsDir,
    libDir,
    aliases: {
      components: `@/${componentsDir.replace(/\\/g, "/")}`,
      lib: `@/${libDir.replace(/\\/g, "/")}`,
    },
  };

  writeConfig(config, cwd);
  fs.mkdirSync(path.join(cwd, componentsDir), { recursive: true });
  fs.mkdirSync(path.join(cwd, libDir), { recursive: true });

  console.log(`✓ Wrote ${CONFIG_FILENAME}`);
  console.log(`✓ Ensured ./${componentsDir}`);
  console.log(`✓ Ensured ./${libDir}`);
  console.log("");
  console.log("Next:");
  console.log("  npx minimalist-components add button");
  console.log("  npx minimalist-components list");
}
