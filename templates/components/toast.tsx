"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  AlertTriangleIcon,
  CheckCircle2Icon,
  InfoIcon,
  XCircleIcon,
  XIcon,
} from "lucide-react";

type ToastTone = "neutral" | "success" | "warning" | "danger";
type ToastSize = "sm" | "md" | "lg";
type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

type ToastData = {
  id: string;
  title: string;
  description?: string;
  tone?: ToastTone;
  size?: ToastSize;
  icon?: ReactNode;
  loading?: boolean;
  duration?: number;
  position?: ToastPosition;
};

type ToastOptions = Omit<ToastData, "id"> & { id?: string };

type ToastProps = {
  title: string;
  description?: string;
  tone?: ToastTone;
  size?: ToastSize;
  icon?: ReactNode;
  loading?: boolean;
  className?: string;
  onClose?: () => void;
};

type ToastContextValue = {
  toast: (options: ToastOptions) => string;
  update: (id: string, patch: Partial<ToastOptions>) => void;
  dismiss: (id: string) => void;
  dismissAll: () => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const sizeClasses: Record<ToastSize, string> = {
  sm: "max-w-xs gap-2 rounded-xl p-3 text-xs",
  md: "max-w-sm gap-2.5 rounded-2xl p-3.5 text-sm",
  lg: "max-w-md gap-3 rounded-2xl p-4 text-base",
};

const iconSizeClasses: Record<ToastSize, string> = {
  sm: "[&_svg]:size-3.5",
  md: "[&_svg]:size-4",
  lg: "[&_svg]:size-5",
};

const toneClasses: Record<ToastTone, string> = {
  neutral:
    "border-zinc-200 bg-white text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50",
  success:
    "border-[#86efac]/60 bg-[#f0fdf4] text-[#14532d] dark:border-[#22c55e]/40 dark:bg-[#052e16] dark:text-[#bbf7d0]",
  warning:
    "border-[#fde047]/70 bg-[#fefce8] text-[#713f12] dark:border-[#eab308]/40 dark:bg-[#422006] dark:text-[#fef08a]",
  danger:
    "border-[#fca5a5]/70 bg-[#fef2f2] text-[#7f1d1d] dark:border-[#ef4444]/40 dark:bg-[#450a0a] dark:text-[#fecaca]",
};

const toneIconClasses: Record<ToastTone, string> = {
  neutral: "text-zinc-500 dark:text-zinc-400",
  success: "text-[#16a34a] dark:text-[#86efac]",
  warning: "text-[#ca8a04] dark:text-[#fde047]",
  danger: "text-[#dc2626] dark:text-[#f87171]",
};

const POSITIONS: ToastPosition[] = [
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
];

const STACK_PEEK = 12;
const STACK_GAP = 10;
const STACK_CARD = 76;
const STACK_MAX = 3;

const popTransition = {
  type: "spring" as const,
  stiffness: 320,
  damping: 28,
  mass: 0.85,
};

const exitTransition = {
  duration: 0.28,
  ease: [0.4, 0, 1, 1] as const,
};

const positionClasses: Record<ToastPosition, string> = {
  "top-left": "top-0 left-0 items-start",
  "top-center": "top-0 left-1/2 -translate-x-1/2 items-center",
  "top-right": "top-0 right-0 items-end",
  "bottom-left": "bottom-0 left-0 items-start",
  "bottom-center": "bottom-0 left-1/2 -translate-x-1/2 items-center",
  "bottom-right": "bottom-0 right-0 items-end",
};

function isTopPosition(position: ToastPosition) {
  return position.startsWith("top");
}

function DefaultIcon({ tone }: { tone: ToastTone }) {
  const Icon =
    tone === "success"
      ? CheckCircle2Icon
      : tone === "warning"
        ? AlertTriangleIcon
        : tone === "danger"
          ? XCircleIcon
          : InfoIcon;
  return <Icon aria-hidden />;
}

function LoadingSpinner({ size }: { size: ToastSize }) {
  const dim =
    size === "sm" ? "size-3.5" : size === "lg" ? "size-5" : "size-4";
  return (
    <span
      aria-hidden
      className={[
        "inline-block animate-spin rounded-full border-2 border-current border-r-transparent",
        dim,
      ].join(" ")}
    />
  );
}

/** Presentational toast card — use for static previews or inside the viewport. */
export default function Toast({
  title,
  description,
  tone = "neutral",
  size = "md",
  icon,
  loading = false,
  className = "",
  onClose,
}: ToastProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy={loading || undefined}
      className={[
        "pointer-events-auto flex w-full items-start border shadow-lg shadow-zinc-900/5 dark:shadow-black/40",
        sizeClasses[size],
        toneClasses[tone],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span
        className={[
          "mt-0.5 inline-flex shrink-0",
          iconSizeClasses[size],
          toneIconClasses[tone],
        ].join(" ")}
      >
        {loading ? (
          <LoadingSpinner size={size} />
        ) : (
          (icon ?? <DefaultIcon tone={tone} />)
        )}
      </span>

      <div className="min-w-0 flex-1 space-y-0.5">
        <p className="font-medium leading-snug">{title}</p>
        {description ? (
          <p className="text-[0.92em] leading-relaxed opacity-80">{description}</p>
        ) : null}
      </div>

      {onClose ? (
        <button
          type="button"
          aria-label="Dismiss"
          onClick={onClose}
          className={[
            "inline-flex shrink-0 cursor-pointer rounded-lg p-1 transition-colors",
            "text-current opacity-50 hover:bg-black/5 hover:opacity-100",
            "dark:hover:bg-white/10",
          ].join(" ")}
        >
          <XIcon className="size-[1em]" aria-hidden />
        </button>
      ) : null}
    </div>
  );
}

function ToastViewport({
  toasts,
  onDismiss,
  defaultPosition,
}: {
  toasts: ToastData[];
  onDismiss: (id: string) => void;
  defaultPosition: ToastPosition;
}) {
  return (
    <>
      {POSITIONS.map((position) => {
        const stack = toasts.filter(
          (t) => (t.position ?? defaultPosition) === position,
        );
        // Always mount so exit slides can finish after the last toast leaves.
        return (
          <ToastStack
            key={position}
            position={position}
            stack={stack}
            onDismiss={onDismiss}
          />
        );
      })}
    </>
  );
}

function ToastStack({
  position,
  stack,
  onDismiss,
}: {
  position: ToastPosition;
  stack: ToastData[];
  onDismiss: (id: string) => void;
}) {
  const reduced = useReducedMotion() ?? false;
  const [expanded, setExpanded] = useState(false);
  const fromTop = isTopPosition(position);

  // Newest first (front of the pile).
  const ordered = [...stack].reverse();
  const visible = ordered.slice(0, STACK_MAX);
  const count = visible.length;

  const collapsedHeight = STACK_CARD + Math.max(0, count - 1) * STACK_PEEK;
  const expandedHeight =
    count * STACK_CARD + Math.max(0, count - 1) * STACK_GAP;

  const enterY = fromTop ? -40 : 40;
  const exitY = fromTop ? -120 : 120;

  return (
    <div
      className={[
        "pointer-events-none fixed z-[300] flex w-full max-w-sm overflow-visible p-4 sm:p-6",
        positionClasses[position],
      ].join(" ")}
      aria-label={`Notifications ${position}`}
    >
      <div
        className="pointer-events-auto relative w-full overflow-visible"
        style={{
          height: count === 0 ? 0 : expanded ? expandedHeight : collapsedHeight,
        }}
        onMouseEnter={() => count > 0 && setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        onFocusCapture={() => count > 0 && setExpanded(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node)) {
            setExpanded(false);
          }
        }}
      >
        <AnimatePresence mode="sync">
          {visible.map((item, frontIndex) => {
            const offset = expanded
              ? frontIndex * (STACK_CARD + STACK_GAP)
              : frontIndex * STACK_PEEK;
            const scale = expanded
              ? 1
              : Math.max(0.92, 1 - frontIndex * 0.04);
            const opacity = expanded
              ? 1
              : Math.max(0.78, 1 - frontIndex * 0.1);
            const stackY = fromTop ? offset : -offset;

            return (
              <motion.div
                key={item.id}
                layout={false}
                initial={
                  reduced
                    ? false
                    : { opacity: 0, y: enterY, scale: 0.92, filter: "blur(4px)" }
                }
                animate={{
                  opacity,
                  y: stackY,
                  scale,
                  filter: "blur(0px)",
                  zIndex: count - frontIndex,
                  transition: reduced
                    ? { duration: 0 }
                    : {
                        ...popTransition,
                        opacity: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                        filter: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                      },
                }}
                exit={
                  reduced
                    ? undefined
                    : {
                        opacity: 0,
                        y: exitY,
                        scale: 0.96,
                        filter: "blur(4px)",
                        transition: exitTransition,
                      }
                }
                className="absolute inset-x-0 will-change-transform"
                style={{
                  top: fromTop ? 0 : "auto",
                  bottom: fromTop ? "auto" : 0,
                  transformOrigin: fromTop ? "50% 0%" : "50% 100%",
                }}
              >
                <ToastItem
                  item={item}
                  onDismiss={onDismiss}
                  paused={expanded}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ToastItem({
  item,
  onDismiss,
  paused = false,
}: {
  item: ToastData;
  onDismiss: (id: string) => void;
  paused?: boolean;
}) {
  const loading = Boolean(item.loading);
  const duration = loading ? 0 : (item.duration ?? 4000);

  useEffect(() => {
    if (duration <= 0 || paused) return;
    const timer = window.setTimeout(() => onDismiss(item.id), duration);
    return () => window.clearTimeout(timer);
  }, [duration, item.id, onDismiss, paused]);

  return (
    <Toast
      title={item.title}
      description={item.description}
      tone={item.tone}
      size={item.size}
      icon={item.icon}
      loading={loading}
      onClose={() => onDismiss(item.id)}
    />
  );
}

export function ToastProvider({
  children,
  position = "bottom-right",
}: {
  children: ReactNode;
  /** Default stack position for toasts without an explicit `position`. */
  position?: ToastPosition;
}) {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const reactId = useId();

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const dismissAll = useCallback(() => setToasts([]), []);

  const update = useCallback(
    (id: string, patch: Partial<ToastOptions>) => {
      setToasts((prev) => {
        const current = prev.find((t) => t.id === id);
        if (!current) return prev;

        // New identity so loading exits while the next toast pops in.
        const nextId = `${reactId}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
        const leavingLoading = current.loading && patch.loading === false;
        const next: ToastData = {
          ...current,
          ...patch,
          id: nextId,
          loading: patch.loading ?? false,
          duration: leavingLoading
            ? (patch.duration ?? undefined)
            : patch.loading
              ? 0
              : (patch.duration ?? current.duration),
        };

        return [...prev.filter((t) => t.id !== id), next];
      });
    },
    [reactId],
  );

  const toast = useCallback(
    (options: ToastOptions) => {
      const id =
        options.id ??
        `${reactId}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      const resolvedPosition = options.position ?? position;
      const next: ToastData = {
        id,
        title: options.title,
        description: options.description,
        tone: options.tone,
        size: options.size,
        icon: options.icon,
        loading: options.loading,
        duration: options.loading ? 0 : options.duration,
        position: resolvedPosition,
      };
      setToasts((prev) => {
        const merged = [...prev, next];
        const byPosition = new Map<ToastPosition, ToastData[]>();
        for (const t of merged) {
          const key = t.position ?? position;
          const list = byPosition.get(key) ?? [];
          list.push(t);
          byPosition.set(key, list);
        }
        const trimmed: ToastData[] = [];
        for (const list of byPosition.values()) {
          trimmed.push(...list.slice(-STACK_MAX));
        }
        return trimmed;
      });
      return id;
    },
    [reactId, position],
  );

  const value = useMemo(
    () => ({ toast, dismiss, dismissAll, update }),
    [toast, dismiss, dismissAll, update],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport
        toasts={toasts}
        onDismiss={dismiss}
        defaultPosition={position}
      />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return ctx;
}

export { Toast };
export type {
  ToastProps,
  ToastTone,
  ToastSize,
  ToastPosition,
  ToastOptions,
  ToastData,
};
