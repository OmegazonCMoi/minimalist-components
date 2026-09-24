"use client";

import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent,
} from "react";
import { popoverTransition, popoverVariants } from "@/lib/motion";

type DatePickerSize = "sm" | "md" | "lg";

type DatePickerProps = {
  className?: string;
  size?: DatePickerSize;
  border?: boolean;
  label?: string;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
  /** ISO date `YYYY-MM-DD` */
  value?: string;
  /** ISO date `YYYY-MM-DD` */
  defaultValue?: string;
  /** ISO date `YYYY-MM-DD` */
  min?: string;
  /** ISO date `YYYY-MM-DD` */
  max?: string;
  name?: string;
  id?: string;
  locale?: string;
  onChange?: (value: string) => void;
  onBlur?: (event: FocusEvent<HTMLButtonElement>) => void;
  onFocus?: (event: FocusEvent<HTMLButtonElement>) => void;
};

const sizeClasses: Record<DatePickerSize, string> = {
  sm: "h-8 px-3 py-1.5 text-xs gap-1.5 rounded-xl",
  md: "h-10 px-4 py-2 text-sm gap-2 rounded-2xl",
  lg: "h-12 px-5 py-2.5 text-base gap-2.5 rounded-2xl",
};

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"] as const;

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function toISO(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function parseISO(value?: string): Date | null {
  if (!value) return null;
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]) - 1;
  const day = Number(match[3]);
  const date = new Date(year, month, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month ||
    date.getDate() !== day
  ) {
    return null;
  }
  return date;
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatDisplay(date: Date, locale?: string) {
  return date.toLocaleDateString(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function monthLabel(year: number, month: number, locale?: string) {
  return new Date(year, month, 1).toLocaleDateString(locale, {
    month: "long",
    year: "numeric",
  });
}

/** Monday-first weekday index (0 = Monday). */
function mondayIndex(date: Date) {
  return (date.getDay() + 6) % 7;
}

function buildCalendarDays(year: number, month: number) {
  const first = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const leading = mondayIndex(first);
  const cells: Array<Date | null> = [];

  for (let i = 0; i < leading; i++) cells.push(null);
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push(new Date(year, month, day));
  }
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

function isOutOfRange(date: Date, min?: Date | null, max?: Date | null) {
  const t = startOfDay(date).getTime();
  if (min && t < startOfDay(min).getTime()) return true;
  if (max && t > startOfDay(max).getTime()) return true;
  return false;
}

export default function DatePicker({
  className = "",
  size = "md",
  border = false,
  label,
  error,
  disabled = false,
  placeholder = "Pick a date",
  value,
  defaultValue = "",
  min,
  max,
  name,
  id,
  locale,
  onChange,
  onBlur,
  onFocus,
}: DatePickerProps) {
  const reduced = useReducedMotion() ?? false;
  const reactId = useId();
  const pickerId = id ?? name ?? reactId;
  const popoverId = `${pickerId}-popover`;

  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue);
  const selectedISO = isControlled ? value : internal;
  const selectedDate = parseISO(selectedISO);

  const minDate = parseISO(min);
  const maxDate = parseISO(max);

  const today = useMemo(() => startOfDay(new Date()), []);

  const [open, setOpen] = useState(false);
  const [layerUp, setLayerUp] = useState(false);
  const [view, setView] = useState(() => {
    const base = selectedDate ?? today;
    return { year: base.getFullYear(), month: base.getMonth() };
  });

  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const displayLabel = selectedDate
    ? formatDisplay(selectedDate, locale)
    : placeholder;
  const isPlaceholder = !selectedDate;

  const days = useMemo(
    () => buildCalendarDays(view.year, view.month),
    [view.year, view.month],
  );

  const triggerClasses = [
    "relative flex w-full max-w-sm items-center font-sans transition-colors outline-none",
    disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer",
    error
      ? "border border-[#f87171] bg-[#fef2f2] text-[#991b1b] focus-visible:border-[#f87171] dark:bg-[#450a0a]/50 dark:text-[#fecaca] dark:focus-visible:border-[#fca5a5]"
      : border
        ? "border border-zinc-300 bg-white text-zinc-900 focus-visible:border-zinc-500 focus-visible:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-800/80 dark:text-zinc-200 dark:focus-visible:border-zinc-400 dark:focus-visible:bg-zinc-800"
        : "border border-transparent bg-zinc-200/80 text-zinc-900 focus-visible:bg-zinc-200 dark:bg-zinc-800/80 dark:text-zinc-200 dark:focus-visible:bg-zinc-800",
    open && !error && !border ? "bg-zinc-200 dark:bg-zinc-800" : "",
    open && !error && border
      ? "border-zinc-500 bg-zinc-50 dark:border-zinc-400 dark:bg-zinc-800"
      : "",
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  function commit(next: string) {
    if (!isControlled) setInternal(next);
    onChange?.(next);
    setOpen(false);
    buttonRef.current?.focus();
  }

  function openPicker() {
    if (disabled) return;
    const base = selectedDate ?? today;
    setView({ year: base.getFullYear(), month: base.getMonth() });
    setLayerUp(true);
    setOpen(true);
  }

  function shiftMonth(delta: number) {
    setView((prev) => {
      const date = new Date(prev.year, prev.month + delta, 1);
      return { year: date.getFullYear(), month: date.getMonth() };
    });
  }

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function onKey(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        buttonRef.current?.focus();
      }
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function onTriggerKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (disabled) return;
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (!open) openPicker();
    }
    if (event.key === "Escape" && open) {
      event.preventDefault();
      setOpen(false);
    }
  }

  return (
    <div ref={rootRef} className="flex w-full max-w-sm flex-col gap-1.5">
      {label ? (
        <label
          htmlFor={pickerId}
          className={[
            "text-xs font-medium tracking-wide",
            error ? "text-[#f87171]" : "text-zinc-500 dark:text-zinc-400",
          ].join(" ")}
        >
          {label}
        </label>
      ) : null}

      {name ? <input type="hidden" name={name} value={selectedISO} /> : null}

      <div
        className={["relative w-full", layerUp ? "z-[200]" : ""]
          .filter(Boolean)
          .join(" ")}
      >
        <button
          ref={buttonRef}
          type="button"
          id={pickerId}
          disabled={disabled}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={popoverId}
          aria-invalid={error ? true : undefined}
          onClick={() => (open ? setOpen(false) : openPicker())}
          onKeyDown={onTriggerKeyDown}
          onBlur={onBlur}
          onFocus={onFocus}
          className={triggerClasses}
        >
          <span
            className={[
              "min-w-0 flex-1 truncate text-left",
              isPlaceholder
                ? error
                  ? "text-[#f87171]/50"
                  : "text-zinc-400 dark:text-zinc-500"
                : "",
            ].join(" ")}
          >
            {displayLabel}
          </span>
          <span
            className={[
              "inline-flex shrink-0 [&_svg]:size-[1em]",
              error ? "text-[#f87171]" : "text-zinc-500",
            ].join(" ")}
            aria-hidden
          >
            <CalendarIcon />
          </span>
        </button>

        <AnimatePresence onExitComplete={() => setLayerUp(false)}>
          {open ? (
            <motion.div
              id={popoverId}
              role="dialog"
              aria-modal="false"
              aria-label="Choose date"
              initial={reduced ? false : "hidden"}
              animate="visible"
              exit={reduced ? undefined : "hidden"}
              variants={popoverVariants}
              transition={reduced ? { duration: 0 } : popoverTransition}
              style={{ transformOrigin: "50% 0%" }}
              className={[
                "absolute top-full left-0 z-[200] mt-1.5 w-max min-w-[16.5rem] p-2.5",
                "rounded-2xl border border-zinc-200 bg-white shadow-lg",
                "dark:border-zinc-700 dark:bg-zinc-900 dark:shadow-black/40",
                "outline-none",
              ].join(" ")}
            >
              <div className="mb-1.5 flex items-center justify-between gap-1">
                <button
                  type="button"
                  aria-label="Previous month"
                  onClick={() => shiftMonth(-1)}
                  className="inline-flex size-7 cursor-pointer items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
                >
                  <ChevronLeftIcon className="size-3.5" />
                </button>
                <p className="text-sm font-medium capitalize text-zinc-900 dark:text-zinc-50">
                  {monthLabel(view.year, view.month, locale)}
                </p>
                <button
                  type="button"
                  aria-label="Next month"
                  onClick={() => shiftMonth(1)}
                  className="inline-flex size-7 cursor-pointer items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
                >
                  <ChevronRightIcon className="size-3.5" />
                </button>
              </div>

              <div className="mb-0.5 grid grid-cols-7 gap-0.5">
                {WEEKDAYS.map((day) => (
                  <div
                    key={day}
                    className="flex size-9 items-center justify-center text-[0.65rem] font-medium uppercase tracking-wide text-zinc-400 dark:text-zinc-500"
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-0.5">
                {days.map((date, index) => {
                  if (!date) {
                    return <div key={`empty-${index}`} className="size-9" />;
                  }

                  const iso = toISO(date);
                  const selected = selectedDate
                    ? sameDay(date, selectedDate)
                    : false;
                  const isToday = sameDay(date, today);
                  const out = isOutOfRange(date, minDate, maxDate);

                  return (
                    <button
                      key={iso}
                      type="button"
                      disabled={out}
                      aria-label={formatDisplay(date, locale)}
                      aria-pressed={selected}
                      onClick={() => commit(iso)}
                      className={[
                        "flex size-9 items-center justify-center rounded-lg text-sm transition-colors",
                        out
                          ? "cursor-not-allowed opacity-30"
                          : selected
                            ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                            : isToday
                              ? "bg-zinc-100 font-medium text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-700"
                              : "cursor-pointer text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50",
                      ].join(" ")}
                    >
                      {date.getDate()}
                    </button>
                  );
                })}
              </div>

              <div className="mt-1.5 flex items-center justify-between gap-2 border-t border-zinc-100 pt-1.5 dark:border-zinc-800">
                <button
                  type="button"
                  className="cursor-pointer rounded-xl px-2.5 py-1.5 text-xs font-medium text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
                  onClick={() => {
                    if (isOutOfRange(today, minDate, maxDate)) return;
                    setView({
                      year: today.getFullYear(),
                      month: today.getMonth(),
                    });
                    commit(toISO(today));
                  }}
                >
                  Today
                </button>
                {selectedISO ? (
                  <button
                    type="button"
                    className="cursor-pointer rounded-xl px-2.5 py-1.5 text-xs font-medium text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
                    onClick={() => commit("")}
                  >
                    Clear
                  </button>
                ) : null}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      {error ? <p className="text-xs text-[#f87171]">{error}</p> : null}
    </div>
  );
}

export { DatePicker };
export type { DatePickerProps, DatePickerSize };
