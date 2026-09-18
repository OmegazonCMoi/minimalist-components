import type { MinimalistConfig } from "./config";

/**
 * Rewrite source imports for the consumer project.
 * - @/lib/* → configured lib alias
 * - @/components/<name> → configured components alias (ui folder)
 */
export function transformSource(
  source: string,
  config: MinimalistConfig,
): string {
  let out = source;

  // Internal component imports used by the monorepo docs site.
  out = out.replace(
    /from\s+["']@\/components\/([a-z0-9-]+)["']/g,
    (_match, name: string) => `from "${config.aliases.components}/${name}"`,
  );

  // Shared motion / lib utils.
  out = out.replace(
    /from\s+["']@\/lib\/([^"']+)["']/g,
    (_match, rest: string) => `from "${config.aliases.lib}/${rest}"`,
  );

  return out;
}
