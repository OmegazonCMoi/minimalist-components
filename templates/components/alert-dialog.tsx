"use client";

import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Button, { type ButtonStyle } from "@/components/button";
import { EASE_OUT } from "@/lib/motion";

type AlertDialogTone = "neutral" | "danger" | "warning";

type AlertDialogProps = {
  title: string;
  description?: string;
  children?: ReactNode;
  /** Controlled open state. */
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  cancelLabel?: string;
  confirmLabel?: string;
  /** Confirm button semantic color. */
  tone?: AlertDialogTone;
  onConfirm?: () => void;
  onCancel?: () => void;
  /** Hide cancel button. */
  hideCancel?: boolean;
  className?: string;
};

const toneToStyle: Record<AlertDialogTone, ButtonStyle> = {
  neutral: "primary",
  danger: "danger",
  warning: "warning",
};

const toneBorderClasses: Record<AlertDialogTone, string> = {
  neutral: "border-zinc-400/55 dark:border-[#333338]",
  danger: "border-[#fecaca]/25 dark:border-[#f87171]/40",
  warning: "border-[#fef08a]/25 dark:border-[#eab308]/40",
};

export default function AlertDialog({
  title,
  description,
  children,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  cancelLabel = "Cancel",
  confirmLabel = "Continue",
  tone = "neutral",
  onConfirm,
  onCancel,
  hideCancel = false,
  className = "",
}: AlertDialogProps) {
  const reduced = useReducedMotion() ?? false;
  const titleId = useId();
  const descriptionId = useId();
  const isControlled = openProp !== undefined;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = isControlled ? openProp : internalOpen;
  const [mounted, setMounted] = useState(false);
  /** Keep shell mounted through the panel exit animation. */
  const [present, setPresent] = useState(open);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const onOpenChangeRef = useRef(onOpenChange);
  const onCancelRef = useRef(onCancel);
  onOpenChangeRef.current = onOpenChange;
  onCancelRef.current = onCancel;

  function updateOpen(next: boolean) {
    if (!isControlled) setInternalOpen(next);
    onOpenChangeRef.current?.(next);
  }

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (open) setPresent(true);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    previouslyFocused.current =
      (document.activeElement as HTMLElement | null) ?? null;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const frame = window.requestAnimationFrame(() => {
      const focusable = panelRef.current?.querySelector<HTMLElement>(
        'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      focusable?.focus();
    });

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onCancelRef.current?.();
        updateOpen(false);
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusables = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => !el.hasAttribute("disabled") && el.tabIndex !== -1);

      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused.current?.focus?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- updateOpen is stable enough via refs
  }, [open, isControlled]);

  function handleCancel() {
    onCancelRef.current?.();
    updateOpen(false);
  }

  function handleConfirm() {
    onConfirm?.();
    updateOpen(false);
  }

  const showShell = open || present;

  const dialog = showShell ? (
    <div className="fixed inset-0 z-[400]">
      {/* Scrim fades in/out with the panel. */}
      <motion.div
        aria-hidden
        className={[
          "absolute inset-0 bg-zinc-950/55 backdrop-blur-[12px] dark:bg-black/60",
          open ? "" : "pointer-events-none",
        ]
          .filter(Boolean)
          .join(" ")}
        style={{ transform: "translateZ(0)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: open ? 1 : 0 }}
        transition={{ duration: reduced ? 0 : 0.2, ease: EASE_OUT }}
        onClick={handleCancel}
      />

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-4">
        <AnimatePresence
          onExitComplete={() => {
            if (!open) setPresent(false);
          }}
        >
          {open ? (
            <motion.div
              key="alert-panel"
              ref={panelRef}
              role="alertdialog"
              aria-modal="true"
              aria-labelledby={titleId}
              aria-describedby={description ? descriptionId : undefined}
              className={[
                "pointer-events-auto relative w-full max-w-md rounded-2xl border-4 p-5 shadow-xl",
                "bg-white/75 text-zinc-900 backdrop-blur-sm",
                "dark:bg-zinc-950/80 dark:text-zinc-50",
                "shadow-zinc-900/10 dark:shadow-black/40",
                toneBorderClasses[tone],
                className,
              ]
                .filter(Boolean)
                .join(" ")}
              initial={
                reduced ? false : { opacity: 0, y: 10, scale: 0.97 }
              }
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={
                reduced
                  ? { opacity: 0 }
                  : { opacity: 0, y: 8, scale: 0.97 }
              }
              transition={{ duration: reduced ? 0 : 0.2, ease: EASE_OUT }}
            >
              <div className="space-y-2">
                <h2
                  id={titleId}
                  className="text-base font-medium tracking-tight sm:text-lg"
                >
                  {title}
                </h2>
                {description ? (
                  <p
                    id={descriptionId}
                    className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400"
                  >
                    {description}
                  </p>
                ) : null}
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-end gap-2">
                {!hideCancel ? (
                  <Button
                    size="sm"
                    style="secondary"
                    border
                    onClick={handleCancel}
                  >
                    {cancelLabel}
                  </Button>
                ) : null}
                <Button
                  size="sm"
                  style={toneToStyle[tone]}
                  onClick={handleConfirm}
                >
                  {confirmLabel}
                </Button>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  ) : null;

  return (
    <>
      {children ? (
        <span className="inline-flex" onClick={() => updateOpen(true)}>
          {children}
        </span>
      ) : null}
      {mounted ? createPortal(dialog, document.body) : null}
    </>
  );
}

export { AlertDialog };
export type { AlertDialogProps, AlertDialogTone };
