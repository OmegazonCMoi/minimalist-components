import type { MinimalistConfig } from "./config";

/**
 * Rewrite source imports for the consumer project.
 * - @/lib/* → configured lib alias
 * - @/components/<name> → configured components alias
 * - @/components/ui/<name> → same (legacy template form)
 */
export function transformSource(
  source: string,
  config: MinimalistConfig,
): string {
  let out = source;

  out = out.replace(
    /from\s+["']@\/components\/(?:ui\/)?([a-z0-9-]+)["']/g,
    (_match, name: string) => `from "${config.aliases.components}/${name}"`,
  );

  out = out.replace(
    /from\s+["']@\/lib\/([^"']+)["']/g,
    (_match, rest: string) => `from "${config.aliases.lib}/${rest}"`,
  );

  return out;
}
