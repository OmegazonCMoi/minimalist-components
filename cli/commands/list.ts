import {
  getRegistryItem,
  listRegistryNames,
  registry,
} from "../../registry/components";

export function listCommand(): void {
  console.log("Available components:\n");
  const max = Math.max(...registry.map((item) => item.name.length));
  for (const name of listRegistryNames()) {
    const item = getRegistryItem(name)!;
    console.log(`  ${name.padEnd(max + 2)}${item.description}`);
  }
  console.log("");
  console.log(`Total: ${registry.length}`);
}
