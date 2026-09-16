import type { ReactNode } from "react";

type DemoProps = {
  children: ReactNode;
  className?: string;
};

export default function Demo({ children, className = "" }: DemoProps) {
  return (
    <div
      className={[
        "relative flex flex-wrap items-center justify-center gap-3 overflow-visible rounded-xl border border-dashed p-8",
        "border-zinc-300 bg-zinc-100/70",
        "[background-image:radial-gradient(rgba(0,0,0,0.12)_1px,transparent_1px)] [background-size:12px_12px]",
        "dark:border-zinc-700 dark:bg-zinc-950/40",
        "dark:[background-image:radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}

export { Demo };
export type { DemoProps };
