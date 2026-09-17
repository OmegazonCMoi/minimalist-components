"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

type TooltipSide = "top" | "bottom" | "left" | "right";
type TooltipSize = "sm" | "md" | "lg";

type TooltipProps = {
  /** Tooltip label. */
  content: ReactNode;
  children: ReactNode;
  side?: TooltipSide;
  size?: TooltipSize;
  /** Delay before open, in ms. */
  delay?: number;
  disabled?: boolean;
  className?: string;
  /** Extra classes on the tooltip bubble. */
  contentClassName?: string;
};

const sizeClasses: Record<TooltipSize, string> = {
  sm: "w-max px-2.5 py-1 text-[0.7rem] rounded-lg max-w-[14rem]",
  md: "w-max px-3 py-1.5 text-xs rounded-xl max-w-[18rem]",
  lg: "w-max px-3.5 py-2 text-sm rounded-xl max-w-[22rem]",
};

const sidePosition: Record<TooltipSide, string> = {
  top: "bottom-full left-1/2 mb-2 -translate-x-1/2",
  bottom: "top-full left-1/2 mt-2 -translate-x-1/2",
  left: "right-full top-1/2 mr-2 -translate-y-1/2",
  right: "left-full top-1/2 ml-2 -translate-y-1/2",
};

const arrowPosition: Record<TooltipSide, string> = {
  top: "top-full left-1/2 -translate-x-1/2 -mt-px",
  bottom: "bottom-full left-1/2 -translate-x-1/2 -mb-px",
  left: "left-full top-1/2 -translate-y-1/2 -ml-px",
  right: "right-full top-1/2 -translate-y-1/2 -mr-px",
};

const arrowShape: Record<TooltipSide, string> = {
  top: "border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-zinc-900 dark:border-t-zinc-100",
  bottom:
    "border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-zinc-900 dark:border-b-zinc-100",
  left: "border-t-4 border-b-4 border-l-4 border-t-transparent border-b-transparent border-l-zinc-900 dark:border-l-zinc-100",
  right:
    "border-t-4 border-b-4 border-r-4 border-t-transparent border-b-transparent border-r-zinc-900 dark:border-r-zinc-100",
};

function slideOffset(side: TooltipSide) {
  if (side === "top") return { y: 6 };
  if (side === "bottom") return { y: -6 };
  if (side === "left") return { x: 6 };
  return { x: -6 };
}

export default function Tooltip({
  content,
  children,
  side = "top",
  size = "md",
  delay = 200,
  disabled = false,
  className = "",
  contentClassName = "",
}: TooltipProps) {
  const reduced = useReducedMotion() ?? false;
  const tooltipId = useId();
  const [open, setOpen] = useState(false);
  const timerRef = useRef<number | null>(null);
  const offset = slideOffset(side);

  function clearTimer() {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }

  function show() {
    if (disabled) return;
    clearTimer();
    timerRef.current = window.setTimeout(() => setOpen(true), delay);
  }

  function hide() {
    clearTimer();
    setOpen(false);
  }

  useEffect(() => () => clearTimer(), []);

  return (
    <span
      className={["relative inline-flex", className].filter(Boolean).join(" ")}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      <span
        aria-describedby={open ? tooltipId : undefined}
        className="inline-flex"
      >
        {children}
      </span>

      <AnimatePresence>
        {open && !disabled ? (
          <span
            className={[
              "pointer-events-none absolute z-50",
              sidePosition[side],
            ].join(" ")}
          >
            <motion.span
              id={tooltipId}
              role="tooltip"
              initial={
                reduced
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.96, ...offset }
              }
              animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              exit={
                reduced
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.96, ...offset }
              }
              transition={{ duration: reduced ? 0 : 0.16, ease: EASE_OUT }}
              className={[
                "relative block w-max text-center font-medium leading-snug",
                "bg-zinc-900 text-white shadow-lg shadow-zinc-900/10",
                "dark:bg-zinc-100 dark:text-zinc-900 dark:shadow-black/30",
                sizeClasses[size],
                contentClassName,
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {content}
              <span
                aria-hidden
                className={[
                  "absolute size-0",
                  arrowPosition[side],
                  arrowShape[side],
                ].join(" ")}
              />
            </motion.span>
          </span>
        ) : null}
      </AnimatePresence>
    </span>
  );
}

export { Tooltip };
export type { TooltipProps, TooltipSide, TooltipSize };
