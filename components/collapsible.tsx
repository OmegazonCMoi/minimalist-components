"use client";

import {
  createContext,
  useContext,
  useId,
  useState,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDownIcon } from "lucide-react";
import { EASE_OUT } from "@/lib/motion";

type CollapsibleSize = "sm" | "md" | "lg";

type CollapsibleContextValue = {
  open: boolean;
  toggle: () => void;
  contentId: string;
  disabled: boolean;
  size: CollapsibleSize;
  framed: boolean;
};

const CollapsibleContext = createContext<CollapsibleContextValue | null>(null);

function useCollapsibleContext() {
  const ctx = useContext(CollapsibleContext);
  if (!ctx) {
    throw new Error("CollapsibleTrigger/Content must be used within Collapsible");
  }
  return ctx;
}

/** Frame padding — tight, card-like (no double-stack with trigger height). */
const frameClasses: Record<CollapsibleSize, string> = {
  sm: "rounded-xl px-3 py-2",
  md: "rounded-2xl px-3.5 py-2.5",
  lg: "rounded-2xl px-4 py-3",
};

const triggerTypeClasses: Record<CollapsibleSize, string> = {
  sm: "gap-2 text-xs",
  md: "gap-2 text-sm",
  lg: "gap-2.5 text-sm",
};

const contentTypeClasses: Record<CollapsibleSize, string> = {
  sm: "pt-1.5 text-xs leading-relaxed",
  md: "pt-2 text-sm leading-relaxed",
  lg: "pt-2.5 text-sm leading-relaxed",
};

const iconSizeClasses: Record<CollapsibleSize, string> = {
  sm: "size-3.5",
  md: "size-4",
  lg: "size-4",
};

type CollapsibleProps = {
  children: ReactNode;
  /** Controlled open state. */
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  /** Soft background panel. */
  surface?: boolean;
  /** Show outline. */
  border?: boolean;
  size?: CollapsibleSize;
  className?: string;
};

function Collapsible({
  children,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  disabled = false,
  surface = false,
  border = false,
  size = "md",
  className = "",
}: CollapsibleProps) {
  const contentId = useId();
  const isControlled = openProp !== undefined;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = isControlled ? openProp : internalOpen;

  function toggle() {
    if (disabled) return;
    const next = !open;
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  }

  const framed = surface || border;

  const frameTone = surface
    ? "border border-zinc-200 bg-zinc-100 dark:border-[#333338] dark:bg-zinc-900"
    : border
      ? "border border-zinc-200 bg-white dark:border-[#333338] dark:bg-zinc-950"
      : null;

  return (
    <CollapsibleContext.Provider
      value={{ open, toggle, contentId, disabled, size, framed }}
    >
      <div
        data-state={open ? "open" : "closed"}
        className={[
          framed ? `overflow-hidden ${frameClasses[size]}` : null,
          frameTone,
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {children}
      </div>
    </CollapsibleContext.Provider>
  );
}

type CollapsibleTriggerProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  /** Hide the trailing chevron. */
  hideIcon?: boolean;
  className?: string;
};

function CollapsibleTrigger({
  children,
  hideIcon = false,
  className = "",
  type = "button",
  onClick,
  disabled: disabledProp,
  ...rest
}: CollapsibleTriggerProps) {
  const { open, toggle, contentId, disabled, size, framed } =
    useCollapsibleContext();
  const reduced = useReducedMotion() ?? false;

  return (
    <button
      type={type}
      id={`${contentId}-trigger`}
      aria-expanded={open}
      aria-controls={contentId}
      disabled={disabled || disabledProp}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) toggle();
      }}
      className={[
        "inline-flex w-full cursor-pointer items-center justify-between text-left font-medium text-zinc-900 transition-colors",
        "hover:text-zinc-700 disabled:cursor-not-allowed disabled:opacity-40",
        "dark:text-zinc-100 dark:hover:text-zinc-300",
        // Bare trigger gets a touch of vertical rhythm; framed relies on card pad
        framed ? null : "py-1",
        triggerTypeClasses[size],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      <span className="min-w-0 flex-1">{children}</span>
      {hideIcon ? null : (
        <motion.span
          aria-hidden
          className="inline-flex shrink-0 text-zinc-500 dark:text-zinc-400"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{
            duration: reduced ? 0 : 0.22,
            ease: EASE_OUT,
          }}
        >
          <ChevronDownIcon className={iconSizeClasses[size]} strokeWidth={2} />
        </motion.span>
      )}
    </button>
  );
}

type CollapsibleContentProps = {
  children: ReactNode;
  className?: string;
};

function CollapsibleContent({
  children,
  className = "",
}: CollapsibleContentProps) {
  const { open, contentId, size } = useCollapsibleContext();
  const reduced = useReducedMotion() ?? false;

  return (
    <AnimatePresence initial={false}>
      {open ? (
        <motion.div
          id={contentId}
          role="region"
          aria-labelledby={`${contentId}-trigger`}
          initial={reduced ? false : { height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{
            duration: reduced ? 0 : 0.25,
            ease: EASE_OUT,
          }}
          className="overflow-hidden"
        >
          <div
            className={[
              "text-zinc-600 dark:text-zinc-400",
              contentTypeClasses[size],
              className,
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {children}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default Collapsible;
export { Collapsible, CollapsibleTrigger, CollapsibleContent };
export type {
  CollapsibleProps,
  CollapsibleTriggerProps,
  CollapsibleContentProps,
  CollapsibleSize,
};
