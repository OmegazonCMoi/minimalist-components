"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";

type SliderSize = "sm" | "md" | "lg";

type SliderProps = {
  className?: string;
  size?: SliderSize;
  label?: ReactNode;
  /** Show the current value beside the label. */
  showValue?: boolean;
  error?: string;
  disabled?: boolean;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  name?: string;
  id?: string;
  onChange?: (value: number) => void;
  "aria-label"?: string;
};

const trackHeight: Record<SliderSize, string> = {
  sm: "h-1",
  md: "h-1.5",
  lg: "h-2",
};

const thumbSize: Record<SliderSize, string> = {
  sm: "size-3.5",
  md: "size-4",
  lg: "size-5",
};

const labelSize: Record<SliderSize, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function snap(n: number, min: number, max: number, step: number) {
  const raw = Math.round((n - min) / step) * step + min;
  const precision = String(step).includes(".")
    ? String(step).split(".")[1].length
    : 0;
  const rounded =
    precision > 0 ? Number(raw.toFixed(precision)) : Math.round(raw);
  return clamp(rounded, min, max);
}

export default function Slider({
  className = "",
  size = "md",
  label,
  showValue = false,
  error,
  disabled = false,
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue,
  name,
  id,
  onChange,
  "aria-label": ariaLabel,
}: SliderProps) {
  const reactId = useId();
  const inputId = id ?? name ?? reactId;
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const isControlled = value !== undefined;
  const fallback = clamp(defaultValue ?? min, min, max);
  const [internal, setInternal] = useState(fallback);
  const current = isControlled ? clamp(value, min, max) : internal;
  const percent = max === min ? 0 : ((current - min) / (max - min)) * 100;

  const commit = useCallback(
    (next: number) => {
      const snapped = snap(next, min, max, step);
      if (!isControlled) setInternal(snapped);
      onChange?.(snapped);
    },
    [isControlled, min, max, step, onChange],
  );

  const valueFromPointer = useCallback(
    (clientX: number) => {
      const track = trackRef.current;
      if (!track) return current;
      const rect = track.getBoundingClientRect();
      const ratio = rect.width === 0 ? 0 : (clientX - rect.left) / rect.width;
      return min + clamp(ratio, 0, 1) * (max - min);
    },
    [current, min, max],
  );

  function onPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (disabled) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    dragging.current = true;
    commit(valueFromPointer(event.clientX));
  }

  function onPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!dragging.current || disabled) return;
    commit(valueFromPointer(event.clientX));
  }

  function onPointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    if (!dragging.current) return;
    dragging.current = false;
    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      /* already released */
    }
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (disabled) return;
    const large = step * 10;
    let next: number | null = null;

    switch (event.key) {
      case "ArrowRight":
      case "ArrowUp":
        next = current + step;
        break;
      case "ArrowLeft":
      case "ArrowDown":
        next = current - step;
        break;
      case "Home":
        next = min;
        break;
      case "End":
        next = max;
        break;
      case "PageUp":
        next = current + large;
        break;
      case "PageDown":
        next = current - large;
        break;
      default:
        return;
    }

    event.preventDefault();
    commit(next);
  }

  useEffect(() => {
    if (isControlled) return;
    setInternal((prev) => snap(prev, min, max, step));
  }, [isControlled, min, max, step]);

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
            error ? "text-[#f87171]" : "text-zinc-700 dark:text-zinc-300",
            disabled ? "opacity-40" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {label ? (
            <label htmlFor={inputId} className="min-w-0 truncate">
              {label}
            </label>
          ) : (
            <span />
          )}
          {showValue ? (
            <span className="shrink-0 font-mono text-[0.92em] tabular-nums text-zinc-500 dark:text-zinc-400">
              {current}
            </span>
          ) : null}
        </div>
      ) : null}

      <div
        ref={trackRef}
        id={inputId}
        role="slider"
        tabIndex={disabled ? -1 : 0}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={current}
        aria-label={ariaLabel ?? (typeof label === "string" ? label : undefined)}
        aria-disabled={disabled || undefined}
        aria-invalid={error ? true : undefined}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={onKeyDown}
        className={[
          "relative flex w-full touch-none items-center py-2 select-none",
          disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer",
        ].join(" ")}
      >
        <div
          className={[
            "relative w-full overflow-hidden rounded-full",
            trackHeight[size],
            error
              ? "bg-[#fecaca] dark:bg-[#7f1d1d]/60"
              : "bg-zinc-200 dark:bg-zinc-800",
          ].join(" ")}
        >
          <div
            className={[
              "absolute inset-y-0 left-0 rounded-full",
              error
                ? "bg-[#ef4444]"
                : "bg-zinc-900 dark:bg-zinc-100",
            ].join(" ")}
            style={{ width: `${percent}%` }}
          />
        </div>

        <div
          className={[
            "absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-sm transition-[box-shadow]",
            thumbSize[size],
            error
              ? "bg-[#ef4444]"
              : "bg-zinc-900 dark:bg-zinc-100",
            disabled
              ? ""
              : "hover:shadow-md focus-visible:outline-none",
          ].join(" ")}
          style={{ left: `${percent}%` }}
        />
      </div>

      {name ? (
        <input type="hidden" name={name} value={current} disabled={disabled} />
      ) : null}

      {error ? (
        <p className="text-xs text-[#f87171]">{error}</p>
      ) : null}
    </div>
  );
}

export { Slider };
export type { SliderProps, SliderSize };
