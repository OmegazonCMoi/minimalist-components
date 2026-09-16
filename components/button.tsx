import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "solid" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
  href?: string;
  children?: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  border?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  iconOnly?: boolean;
  disabled?: boolean;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  target?: string;
  rel?: string;
  "aria-label"?: string;
};

const variantClasses: Record<ButtonVariant, string> = {
  solid:
    "bg-white text-zinc-900 hover:bg-zinc-50 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100",
  outline:
    "bg-transparent text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white",
  ghost:
    "bg-transparent text-zinc-600 hover:bg-zinc-200 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-800/60 dark:hover:text-white",
};

const borderClasses: Record<ButtonVariant, string> = {
  solid: "border border-zinc-400 dark:border-zinc-500",
  outline:
    "border border-zinc-400 hover:border-zinc-600 dark:border-zinc-500 dark:hover:border-zinc-300",
  ghost:
    "border border-zinc-400/80 hover:border-zinc-500 dark:border-zinc-600 dark:hover:border-zinc-500",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs gap-1.5",
  md: "px-4 py-2 text-sm gap-2",
  lg: "px-6 py-2.5 text-base gap-2.5",
};

const iconOnlySizeClasses: Record<ButtonSize, string> = {
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
  lg: "size-12 text-base",
};

export default function Button({
  href,
  children,
  className = "",
  variant = "solid",
  size = "md",
  border = false,
  icon,
  iconPosition = "right",
  iconOnly = false,
  disabled = false,
  type = "button",
  onClick,
  target,
  rel,
  "aria-label": ariaLabel,
}: ButtonProps) {
  const classes = [
    "inline-flex items-center justify-center rounded-2xl font-sans font-medium tracking-normal transition-colors",
    disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer",
    variantClasses[variant],
    border ? borderClasses[variant] : "border border-transparent",
    iconOnly ? iconOnlySizeClasses[size] : sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const label =
    ariaLabel ??
    (typeof children === "string" || typeof children === "number"
      ? String(children)
      : undefined);

  const content = iconOnly ? (
    <span className="inline-flex shrink-0 [&_svg]:size-[1.1em]">{icon}</span>
  ) : (
    <>
      {icon && iconPosition === "left" ? (
        <span className="inline-flex shrink-0 [&_svg]:size-[1em]">{icon}</span>
      ) : null}
      {children}
      {icon && iconPosition === "right" ? (
        <span className="inline-flex shrink-0 [&_svg]:size-[1em]">{icon}</span>
      ) : null}
    </>
  );

  if (href && !disabled) {
    return (
      <Link
        href={href}
        className={classes}
        target={target}
        rel={rel}
        aria-label={iconOnly ? label : ariaLabel}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      aria-label={iconOnly ? label : ariaLabel}
    >
      {content}
    </button>
  );
}

export { Button };
export type { ButtonProps, ButtonVariant, ButtonSize };
