"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type ProgressSize = "sm" | "md" | "lg";
type ProgressTone = "neutral" | "success" | "warning" | "danger";

type ProgressProps = {
  /** Current progress value. */
  value?: number;
  /** Maximum value — default 100. */
  max?: number;
  size?: ProgressSize;
  tone?: ProgressTone;
  label?: ReactNode;
  /** Show percentage beside the label. */
  showValue?: boolean;
  /** Left ↔ right sweep (ignores value). */
  indeterminate?: boolean;
  className?: string;
  "aria-label"?: string;
};

const trackHeight: Record<ProgressSize, string> = {
  sm: "h-1",
  md: "h-1.5",
  lg: "h-2.5",
};

const labelSize: Record<ProgressSize, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

const toneFill: Record<ProgressTone, string> = {
  neutral: "bg-zinc-900 dark:bg-zinc-100",
  success: "bg-[#16a34a] dark:bg-[#4ade80]",
  warning: "bg-[#ca8a04] dark:bg-[#facc15]",
  danger: "bg-[#dc2626] dark:bg-[#f87171]",
};

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export default function Progress({
  value = 0,
  max = 100,
  size = "md",
  tone = "neutral",
  label,
  showValue = false,
  indeterminate = false,
  className = "",
  "aria-label": ariaLabel,
}: ProgressProps) {
  const reduced = useReducedMotion() ?? false;
  const safeMax = max <= 0 ? 100 : max;
  const safeValue = clamp(value, 0, safeMax);
  const percent = indeterminate
    ? 0
    : Math.round((safeValue / safeMax) * 100);

  return (
    <div
      className={["flex w-full max-w-sm flex-col gap-1.5", className]
        .filter(Boolean)
        .join(" ")}
    >
      {label || showValue ? (
        <div
          className={[
            "flex items-center justify-between gap-3 font-sans",
            labelSize[size],
            "text-zinc-700 dark:text-zinc-300",
          ].join(" ")}
        >
          {label ? (
            <span className="min-w-0 truncate">{label}</span>
          ) : (
            <span />
          )}
          {showValue && !indeterminate ? (
            <span className="shrink-0 font-mono text-[0.92em] tabular-nums text-zinc-500 dark:text-zinc-400">
              {percent}%
            </span>
          ) : null}
        </div>
      ) : null}

      <div
        role="progressbar"
        aria-valuemin={indeterminate ? undefined : 0}
        aria-valuemax={indeterminate ? undefined : safeMax}
        aria-valuenow={indeterminate ? undefined : safeValue}
        aria-label={
          ariaLabel ?? (typeof label === "string" ? label : "Progress")
        }
        className={[
          "relative w-full overflow-hidden rounded-full",
          trackHeight[size],
          "bg-zinc-200 dark:bg-zinc-800",
        ].join(" ")}
      >
        {indeterminate ? (
          <motion.div
            className={[
              "absolute inset-y-0 left-0 w-1/3 rounded-full",
              toneFill[tone],
            ].join(" ")}
            initial={{ x: "0%" }}
            animate={
              reduced
                ? { x: "100%" }
                : { x: ["0%", "200%", "0%"] }
            }
            transition={
              reduced
                ? { duration: 0 }
                : {
                    duration: 1.6,
                    ease: "easeInOut",
                    repeat: Infinity,
                    times: [0, 0.5, 1],
                  }
            }
          />
        ) : (
          <div
            className={[
              "h-full rounded-full transition-[width] duration-300 ease-out",
              toneFill[tone],
            ].join(" ")}
            style={{ width: `${percent}%` }}
          />
        )}
      </div>
    </div>
  );
}

export { Progress };
export type { ProgressProps, ProgressSize, ProgressTone };
