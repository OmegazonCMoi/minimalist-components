"use client";

import { useState, type ReactNode } from "react";
import { Code2Icon, ComponentIcon } from "lucide-react";
import { highlight } from "sugar-high";

type DemoMode = "demo" | "code";

type DemoProps = {
  children: ReactNode;
  /** Source shown when the code view is selected. */
  code?: string;
  className?: string;
  /** Hide the top-right demo/code switcher. */
  toolbar?: boolean;
  /** Dot grid behind the preview. Default true. */
  pattern?: boolean;
};

const modes: Array<{
  id: DemoMode;
  label: string;
  icon: typeof ComponentIcon;
}> = [
  { id: "demo", label: "Preview", icon: ComponentIcon },
  { id: "code", label: "Code", icon: Code2Icon },
];

export default function Demo({
  children,
  code,
  className = "",
  toolbar = true,
  pattern = true,
}: DemoProps) {
  const [mode, setMode] = useState<DemoMode>("demo");
  const showCode = mode === "code";

  return (
    <div
      className={[
        "relative overflow-hidden rounded-xl border",
        showCode
          ? "border-zinc-200 bg-zinc-200/50 dark:border-zinc-800 dark:bg-zinc-900"
          : [
              "flex flex-wrap items-center justify-center gap-3 overflow-visible border-dashed p-8",
              "border-zinc-300 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900",
              pattern
                ? [
                    "bg-zinc-200/50",
                    "[background-image:radial-gradient(rgba(0,0,0,0.12)_1px,transparent_1px)] [background-size:12px_12px]",
                    "dark:[background-image:radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)]",
                  ].join(" ")
                : null,
            ]
              .filter(Boolean)
              .join(" "),
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {toolbar ? (
        <div
          role="group"
          aria-label="Demo view"
          className="absolute top-2.5 right-2.5 z-10 inline-flex items-center gap-0.5 rounded-xl border border-zinc-300/80 bg-zinc-200/90 p-0.5 shadow-sm backdrop-blur-sm dark:border-zinc-600/80 dark:bg-zinc-800/90"
        >
          {modes.map(({ id, label, icon: Icon }) => {
            const active = mode === id;
            return (
              <button
                key={id}
                type="button"
                title={label}
                aria-label={label}
                aria-pressed={active}
                onClick={() => setMode(id)}
                className={[
                  "inline-flex size-7 cursor-pointer items-center justify-center rounded-[calc(0.75rem-0.125rem)] transition-colors",
                  active
                    ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                    : "text-zinc-500 hover:bg-zinc-300/70 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-700/80 dark:hover:text-zinc-50",
                ].join(" ")}
              >
                <Icon className="size-3.5" aria-hidden />
              </button>
            );
          })}
        </div>
      ) : null}

      {showCode ? (
        code ? (
          <pre className="demo-code overflow-x-auto p-5 pr-14 font-mono text-[0.8rem] leading-relaxed text-zinc-700 dark:text-zinc-300">
            <code
              dangerouslySetInnerHTML={{ __html: highlight(code) }}
            />
          </pre>
        ) : (
          <p className="px-5 py-8 text-center text-sm text-zinc-500">
            Pass a <code className="font-mono text-xs">code</code> prop to show
            source.
          </p>
        )
      ) : (
        children
      )}
    </div>
  );
}

export { Demo };
export type { DemoProps, DemoMode };
