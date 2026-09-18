#!/usr/bin/env node
import { addCommand } from "./commands/add";
import { initCommand } from "./commands/init";
import { listCommand } from "./commands/list";

function printHelp(): void {
  console.log(`minimalist-components

Usage:
  minimalist-components init
  minimalist-components add <component...>
  minimalist-components list

Options:
  --yes, -y   Non-interactive defaults (init) / keep existing files (add)
  --force     Overwrite existing files without prompting (add)
  -h, --help
`);
}

async function main(): Promise<void> {
  const argv = process.argv.slice(2);
  const command = argv[0];

  if (!command || command === "-h" || command === "--help") {
    printHelp();
    return;
  }

  if (command === "init") {
    const yes = argv.includes("--yes") || argv.includes("-y");
    await initCommand(process.cwd(), { yes });
    return;
  }

  if (command === "list") {
    listCommand();
    return;
  }

  if (command === "add") {
    const names = argv.slice(1).filter((arg) => !arg.startsWith("-"));
    const force = argv.includes("--force");
    const yes = argv.includes("--yes");
    await addCommand(names, { force, yes });
    return;
  }

  console.error(`Unknown command "${command}".`);
  printHelp();
  process.exitCode = 1;
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
