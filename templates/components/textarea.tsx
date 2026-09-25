import type { TextareaHTMLAttributes } from "react";

type TextareaSize = "sm" | "md" | "lg";

type TextareaProps = {
  className?: string;
  size?: TextareaSize;
  border?: boolean;
  label?: string;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  name?: string;
  id?: string;
  rows?: number;
  /** Allow manual resize. Default false. */
  resize?: boolean;
  onChange?: TextareaHTMLAttributes<HTMLTextAreaElement>["onChange"];
  onBlur?: TextareaHTMLAttributes<HTMLTextAreaElement>["onBlur"];
  onFocus?: TextareaHTMLAttributes<HTMLTextAreaElement>["onFocus"];
};

const sizeClasses: Record<TextareaSize, string> = {
  sm: "min-h-20 px-3 py-2 text-xs rounded-xl",
  md: "min-h-28 px-4 py-2.5 text-sm rounded-2xl",
  lg: "min-h-36 px-5 py-3 text-base rounded-2xl",
};

export default function Textarea({
  className = "",
  size = "md",
  border = false,
  label,
  error,
  disabled = false,
  placeholder,
  value,
  defaultValue,
  name,
  id,
  rows = 4,
  resize = false,
  onChange,
  onBlur,
  onFocus,
}: TextareaProps) {
  const textareaId = id ?? name;

  const fieldClasses = [
    "w-full max-w-sm font-sans transition-colors outline-none",
    disabled ? "cursor-not-allowed opacity-40" : "",
    resize ? "resize-y" : "resize-none",
    error
      ? "border border-[#fca5a5] bg-[#fef2f2] text-[#991b1b] focus:border-[#f87171] dark:border-[#f87171] dark:bg-[#450a0a]/50 dark:text-[#fecaca] dark:focus:border-[#fca5a5]"
      : border
        ? "border border-zinc-200 bg-white text-zinc-900 focus:border-zinc-300 focus:bg-zinc-50 dark:border-[#333338] dark:bg-zinc-800/80 dark:text-zinc-200 dark:focus:border-zinc-500 dark:focus:bg-zinc-800"
        : "border border-transparent bg-zinc-200/80 text-zinc-900 focus:bg-zinc-200 dark:bg-zinc-800/80 dark:text-zinc-200 dark:focus:bg-zinc-800",
    error
      ? "placeholder:text-[#f87171]/50"
      : "placeholder:text-zinc-400 dark:placeholder:text-zinc-500",
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="flex w-full max-w-sm flex-col gap-1.5">
      {label ? (
        <label
          htmlFor={textareaId}
          className={[
            "text-xs font-medium tracking-wide",
            error ? "text-[#f87171]" : "text-zinc-500 dark:text-zinc-400",
          ].join(" ")}
        >
          {label}
        </label>
      ) : null}

      <textarea
        id={textareaId}
        name={name}
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        rows={rows}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        aria-invalid={error ? true : undefined}
        className={fieldClasses}
      />

      {error ? <p className="text-xs text-[#f87171]">{error}</p> : null}
    </div>
  );
}

export { Textarea };
export type { TextareaProps, TextareaSize };
