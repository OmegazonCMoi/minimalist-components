"use client";

import { useId, useState, type InputHTMLAttributes, type ReactNode } from "react";

type RadioSize = "sm" | "md" | "lg";

type RadioProps = {
  className?: string;
  size?: RadioSize;
  label?: ReactNode;
  error?: string;
  disabled?: boolean;
  checked?: boolean;
  defaultChecked?: boolean;
  name?: string;
  id?: string;
  value?: string;
  onChange?: InputHTMLAttributes<HTMLInputElement>["onChange"];
};

const circleSize: Record<RadioSize, string> = {
  sm: "size-4",
  md: "size-5",
  lg: "size-6",
};

const dotSize: Record<RadioSize, string> = {
  sm: "size-1.5",
  md: "size-2",
  lg: "size-2.5",
};

const labelSize: Record<RadioSize, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

export default function Radio({
  className = "",
  size = "md",
  label,
  error,
  disabled = false,
  checked,
  defaultChecked = false,
  name,
  id,
  value,
  onChange,
}: RadioProps) {
  const reactId = useId();
  const inputId = id ?? (name && value ? `${name}-${value}` : name) ?? reactId;
  const isControlled = checked !== undefined;
  const [internal, setInternal] = useState(defaultChecked);
  const isChecked = isControlled ? checked : internal;

  return (
    <div className={["flex flex-col gap-1.5", className].filter(Boolean).join(" ")}>
      <label
        htmlFor={inputId}
        className={[
          "inline-flex items-center gap-2.5 font-sans select-none !cursor-pointer",
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
          type="radio"
          value={value}
          checked={isChecked}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          onChange={(event) => {
            if (!isControlled) setInternal(event.target.checked);
            onChange?.(event);
          }}
          className="sr-only"
        />
        <span
          aria-hidden
          className={[
            "inline-flex shrink-0 items-center justify-center rounded-full border transition-colors",
            circleSize[size],
            isChecked
              ? error
                ? "border-[#fca5a5] bg-white dark:bg-zinc-900"
                : "border-zinc-900 bg-white dark:border-zinc-200 dark:bg-zinc-900"
              : error
                ? "border-[#fca5a5] bg-white dark:bg-zinc-900"
                : "border-zinc-200 bg-white dark:border-[#333338] dark:bg-zinc-900",
          ].join(" ")}
        >
          <span
            className={[
              "rounded-full transition-opacity",
              dotSize[size],
              isChecked ? "opacity-100" : "opacity-0",
              error ? "bg-[#f87171]" : "bg-zinc-900 dark:bg-zinc-200",
            ].join(" ")}
          />
        </span>
        {label ? <span>{label}</span> : null}
      </label>
      {error ? <p className="text-xs text-[#f87171]">{error}</p> : null}
    </div>
  );
}

export { Radio };
export type { RadioProps, RadioSize };
