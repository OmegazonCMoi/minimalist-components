"use client";

import { useId, useState, type InputHTMLAttributes, type ReactNode } from "react";

type SwitchSize = "sm" | "md" | "lg";

type SwitchProps = {
  className?: string;
  size?: SwitchSize;
  label?: ReactNode;
  error?: string;
  disabled?: boolean;
  checked?: boolean;
  defaultChecked?: boolean;
  name?: string;
  id?: string;
  onChange?: InputHTMLAttributes<HTMLInputElement>["onChange"];
  "aria-label"?: string;
};

const trackClasses: Record<SwitchSize, string> = {
  sm: "h-5 w-9",
  md: "h-6 w-11",
  lg: "h-7 w-[3.25rem]",
};

const thumbClasses: Record<SwitchSize, { size: string; off: string; on: string }> = {
  sm: {
    size: "size-4",
    off: "left-0.5",
    on: "left-[1.125rem]",
  },
  md: {
    size: "size-5",
    off: "left-0.5",
    on: "left-[1.375rem]",
  },
  lg: {
    size: "size-5",
    off: "left-1",
    on: "left-[1.75rem]",
  },
};

const labelSize: Record<SwitchSize, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

export default function Switch({
  className = "",
  size = "md",
  label,
  error,
  disabled = false,
  checked,
  defaultChecked = false,
  name,
  id,
  onChange,
  "aria-label": ariaLabel,
}: SwitchProps) {
  const reactId = useId();
  const inputId = id ?? name ?? reactId;
  const isControlled = checked !== undefined;
  const [internal, setInternal] = useState(defaultChecked);
  const isOn = isControlled ? Boolean(checked) : internal;
  const thumb = thumbClasses[size];

  return (
    <div className={["flex flex-col gap-1.5", className].filter(Boolean).join(" ")}>
      <label
        htmlFor={inputId}
        className={[
          "inline-flex items-center gap-3 font-sans select-none !cursor-pointer",
          disabled ? "cursor-not-allowed opacity-40" : "",
          error ? "text-[#f87171]" : "text-zinc-700 dark:text-zinc-300",
          labelSize[size],
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <input
          id={inputId}
          name={name}
          type="checkbox"
          role="switch"
          checked={isOn}
          disabled={disabled}
          aria-checked={isOn}
          aria-label={ariaLabel}
          aria-invalid={error ? true : undefined}
          onChange={(event) => {
            if (!isControlled) setInternal(event.target.checked);
            onChange?.(event);
          }}
          className="peer sr-only"
        />

        <span
          aria-hidden
          className={[
            "relative inline-flex shrink-0 rounded-full transition-colors duration-200",
            "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-zinc-400 dark:peer-focus-visible:outline-zinc-500",
            trackClasses[size],
            isOn
              ? error
                ? "bg-[#f87171]"
                : "bg-zinc-900 dark:bg-zinc-200"
              : error
                ? "bg-[#fecaca] dark:bg-[#7f1d1d]"
                : "bg-zinc-300 dark:bg-zinc-700",
          ].join(" ")}
        >
          <span
            className={[
              "absolute top-1/2 -translate-y-1/2 rounded-full shadow-sm transition-all duration-200 ease-out",
              thumb.size,
              isOn ? thumb.on : thumb.off,
              isOn
                ? error
                  ? "bg-[#450a0a]"
                  : "bg-white dark:bg-zinc-900"
                : error
                  ? "bg-[#f87171]"
                  : "bg-white dark:bg-zinc-200",
            ].join(" ")}
          />
        </span>

        {label ? <span>{label}</span> : null}
      </label>
      {error ? <p className="text-xs text-[#f87171]">{error}</p> : null}
    </div>
  );
}

export { Switch };
export type { SwitchProps, SwitchSize };
