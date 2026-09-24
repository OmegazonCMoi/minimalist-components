"use client";

import { useId, useState, type InputHTMLAttributes, type ReactNode } from "react";

type CheckboxSize = "sm" | "md" | "lg";

type CheckboxProps = {
  className?: string;
  size?: CheckboxSize;
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

const boxSize: Record<CheckboxSize, string> = {
  sm: "size-4 rounded",
  md: "size-5 rounded-md",
  lg: "size-6 rounded-lg",
};

const labelSize: Record<CheckboxSize, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

export default function Checkbox({
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
}: CheckboxProps) {
  const reactId = useId();
  const inputId = id ?? name ?? reactId;
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
          type="checkbox"
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
            "inline-flex shrink-0 items-center justify-center border transition-colors",
            boxSize[size],
            isChecked
              ? error
                ? "border-[#f87171] bg-[#f87171]"
                : "border-zinc-900 bg-zinc-900 dark:border-zinc-200 dark:bg-zinc-200"
              : error
                ? "border-[#fca5a5] bg-white dark:bg-zinc-900"
                : "border-zinc-200 bg-white dark:border-zinc-600 dark:bg-zinc-900",
          ].join(" ")}
        >
          <svg
            viewBox="0 0 12 12"
            className={[
              "size-[65%] transition-opacity",
              isChecked ? "opacity-100" : "opacity-0",
              error ? "text-[#450a0a]" : "text-white dark:text-zinc-900",
            ].join(" ")}
          >
            <path
              d="M2.2 6.2 4.7 8.7 9.8 3.3"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        {label ? <span>{label}</span> : null}
      </label>
      {error ? <p className="text-xs text-[#f87171]">{error}</p> : null}
    </div>
  );
}

export { Checkbox };
export type { CheckboxProps, CheckboxSize };
