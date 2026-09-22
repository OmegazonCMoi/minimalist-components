import type { ReactNode } from "react";

type CodeBlockProps = {
  children: string;
  className?: string;
};

export default function CodeBlock({ children, className = "" }: CodeBlockProps) {
  return (
    <pre
      className={[
        "overflow-x-auto rounded-xl border p-4 font-mono text-xs leading-relaxed",
        "border-zinc-200 bg-zinc-100 text-zinc-700",
        "dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </pre>
  );
}

function toSlug(name: string) {
  return name
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
}

export function InstallBlock({
  name,
  children,
  /** When false, skip the CLI command (docs-only utilities). */
  cli = true,
}: {
  name: string;
  children?: ReactNode;
  cli?: boolean;
}) {
  const slug = toSlug(name);

  return (
    <section className="space-y-3">
      <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
        Install
      </h2>
      {cli ? (
        <>
          <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            After{" "}
            <code className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono text-xs text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              init
            </code>
            , add the component — files land under{" "}
            <code className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono text-xs text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              components/ui
            </code>{" "}
            by default.
          </p>
          <CodeBlock>{`npx minimalist-components add ${slug}`}</CodeBlock>
          <CodeBlock>{`import { ${name} } from "@/components/ui/${slug}";`}</CodeBlock>
        </>
      ) : (
        <>
          <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            Docs utility — copy from this repo if you want it in your app. Not
            available via the CLI.
          </p>
          <CodeBlock>{`import { ${name} } from "@/components/${slug}";`}</CodeBlock>
        </>
      )}
      {children}
    </section>
  );
}

export { CodeBlock };
export type { CodeBlockProps };
