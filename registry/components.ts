import data from "./components.json";

export type RegistryFile = {
  source: string;
  target: string;
};

export type RegistryItem = {
  name: string;
  description: string;
  files: RegistryFile[];
  registryDependencies: string[];
  utils: RegistryFile[];
  dependencies: string[];
};

export const registry = data as RegistryItem[];

export function getRegistryItem(name: string): RegistryItem | undefined {
  return registry.find((item) => item.name === name);
}

export function listRegistryNames(): string[] {
  return registry.map((item) => item.name).sort();
}
