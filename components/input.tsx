import type { InputHTMLAttributes, ReactNode } from "react";

type InputSize = "sm" | "md" | "lg";
type InputType = "text" | "password";

type InputProps = {
  className?: string;
  size?: InputSize;
  border?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  label?: string;
  error?: string;
  disabled?: boolean;
  type?: InputType;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  name?: string;
  id?: string;
  onChange?: InputHTMLAttributes<HTMLInputElement>["onChange"];
  onBlur?: InputHTMLAttributes<HTMLInputElement>["onBlur"];
  onFocus?: InputHTMLAttributes<HTMLInputElement>["onFocus"];
};

const sizeClasses: Record<InputSize, string> = {
  sm: "h-8 px-3 py-1.5 text-xs gap-1.5 rounded-xl",
  md: "h-10 px-4 py-2 text-sm gap-2 rounded-2xl",
  lg: "h-12 px-5 py-2.5 text-base gap-2.5 rounded-2xl",
};

export default function Input({
  className = "",
  size = "md",
  border = false,
  icon,
  iconPosition = "right",
  label,
  error,
  disabled = false,
  type = "text",
  placeholder,
  value,
  defaultValue,
  name,
  id,
  onChange,
  onBlur,
  onFocus,
}: InputProps) {
  const inputId = id ?? name;

  const fieldClasses = [
    "flex w-full max-w-sm items-center font-sans transition-colors",
    disabled ? "cursor-not-allowed opacity-40" : "",
    error
      ? "border border-[#fca5a5] bg-[#fef2f2] text-[#991b1b] focus-within:border-[#f87171] dark:border-[#f87171] dark:bg-[#450a0a]/50 dark:text-[#fecaca] dark:focus-within:border-[#fca5a5]"
      : border
        ? "border border-zinc-200 bg-white text-zinc-900 focus-within:border-zinc-300 focus-within:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-800/80 dark:text-zinc-200 dark:focus-within:border-zinc-400 dark:focus-within:bg-zinc-800"
        : "border border-transparent bg-zinc-200/80 text-zinc-900 focus-within:bg-zinc-200 dark:bg-zinc-800/80 dark:text-zinc-200 dark:focus-within:bg-zinc-800",
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="flex w-full max-w-sm flex-col gap-1.5">
      {label ? (
        <label
          htmlFor={inputId}
          className={[
            "text-xs font-medium tracking-wide",
            error ? "text-[#f87171]" : "text-zinc-500 dark:text-zinc-400",
          ].join(" ")}
        >
          {label}
        </label>
      ) : null}

      <div className={fieldClasses}>
        {icon && iconPosition === "left" ? (
          <span
            className={[
              "inline-flex shrink-0 [&_svg]:size-[1em]",
              error ? "text-[#f87171]" : "text-zinc-500",
            ].join(" ")}
          >
            {icon}
          </span>
        ) : null}

        <input
          id={inputId}
          name={name}
          type={type}
          disabled={disabled}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          aria-invalid={error ? true : undefined}
          className={[
            "min-w-0 flex-1 bg-transparent outline-none",
            disabled ? "cursor-not-allowed" : "",
            error
              ? "placeholder:text-[#f87171]/50"
              : "placeholder:text-zinc-400 dark:placeholder:text-zinc-500",
          ].join(" ")}
        />

        {icon && iconPosition === "right" ? (
          <span
            className={[
              "inline-flex shrink-0 [&_svg]:size-[1em]",
              error ? "text-[#f87171]" : "text-zinc-500",
            ].join(" ")}
          >
            {icon}
          </span>
        ) : null}
      </div>

      {error ? <p className="text-xs text-[#f87171]">{error}</p> : null}
    </div>
  );
}

export { Input };
export type { InputProps, InputSize, InputType };
