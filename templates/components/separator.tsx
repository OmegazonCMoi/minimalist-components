import type { ReactNode } from "react";

type SeparatorOrientation = "horizontal" | "vertical";

type SeparatorProps = {
  orientation?: SeparatorOrientation;
  /** Optional label rendered in the middle (horizontal only). */
  label?: ReactNode;
  className?: string;
  /** Decorative by default (ignored by screen readers). */
  decorative?: boolean;
};

export default function Separator({
  orientation = "horizontal",
  label,
  className = "",
  decorative = true,
}: SeparatorProps) {
  const isVertical = orientation === "vertical";

  if (isVertical) {
    return (
      <div
        role={decorative ? "none" : "separator"}
        aria-orientation="vertical"
        aria-hidden={decorative || undefined}
        className={[
          "w-px shrink-0 self-stretch bg-zinc-200 dark:bg-zinc-800",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      />
    );
  }

  if (label) {
    return (
      <div
        role={decorative ? "none" : "separator"}
        aria-orientation="horizontal"
        aria-hidden={decorative || undefined}
        className={[
          "flex w-full items-center gap-3",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
        <span className="shrink-0 text-xs font-medium tracking-wide text-zinc-500 dark:text-zinc-400">
          {label}
        </span>
        <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
      </div>
    );
  }

  return (
    <div
      role={decorative ? "none" : "separator"}
      aria-orientation="horizontal"
      aria-hidden={decorative || undefined}
      className={[
        "h-px w-full bg-zinc-200 dark:bg-zinc-800",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}

export { Separator };
export type { SeparatorProps, SeparatorOrientation };
