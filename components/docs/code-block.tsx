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

export function InstallBlock({
  name,
  children,
}: {
  name: string;
  children?: ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
        Install
      </h2>
      <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
        Import from{" "}
        <code className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono text-xs text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
          @/components
        </code>{" "}
        after adding the source under{" "}
        <code className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono text-xs text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
          components/
        </code>
        .
      </p>
      <CodeBlock>{`import { ${name} } from "@/components";`}</CodeBlock>
      {children}
    </section>
  );
}

export { CodeBlock };
export type { CodeBlockProps };
