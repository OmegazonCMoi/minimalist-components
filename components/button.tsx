"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { tapScale, tapTransition } from "@/lib/motion";

type ButtonVariant = "solid" | "outline" | "ghost";
type ButtonStyle = "primary" | "secondary" | "danger" | "warning" | "info";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
  href?: string;
  children?: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  /** Semantic color — independent of solid / outline / ghost. */
  style?: ButtonStyle;
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

const solidClasses: Record<ButtonStyle, string> = {
  primary:
    "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-white",
  secondary:
    "bg-white text-zinc-900 hover:bg-zinc-50 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700",
  danger:
    "bg-[#dc2626] text-white hover:bg-[#b91c1c] dark:bg-[#ef4444] dark:hover:bg-[#f87171]",
  warning:
    "bg-[#eab308] text-[#422006] hover:bg-[#ca8a04] dark:bg-[#eab308] dark:text-[#422006] dark:hover:bg-[#facc15]",
  info: "bg-[#2563eb] text-white hover:bg-[#1d4ed8] dark:bg-[#3b82f6] dark:hover:bg-[#60a5fa]",
};

const outlineClasses: Record<ButtonStyle, string> = {
  primary:
    "bg-transparent text-zinc-900 hover:bg-zinc-900/5 dark:text-zinc-50 dark:hover:bg-white/10",
  secondary:
    "bg-transparent text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white",
  danger:
    "bg-transparent text-[#dc2626] hover:bg-[#dc2626]/10 dark:text-[#f87171] dark:hover:bg-[#ef4444]/15",
  warning:
    "bg-transparent text-[#a16207] hover:bg-[#eab308]/15 dark:text-[#fde047] dark:hover:bg-[#eab308]/15",
  info: "bg-transparent text-[#2563eb] hover:bg-[#2563eb]/10 dark:text-[#60a5fa] dark:hover:bg-[#3b82f6]/15",
};

const ghostClasses: Record<ButtonStyle, string> = {
  primary:
    "bg-transparent text-zinc-800 hover:bg-zinc-200 hover:text-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-800/60 dark:hover:text-white",
  secondary:
    "bg-transparent text-zinc-600 hover:bg-zinc-200 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-800/60 dark:hover:text-white",
  danger:
    "bg-transparent text-[#dc2626] hover:bg-[#dc2626]/10 dark:text-[#f87171] dark:hover:bg-[#ef4444]/15",
  warning:
    "bg-transparent text-[#a16207] hover:bg-[#eab308]/15 dark:text-[#fde047] dark:hover:bg-[#eab308]/15",
  info: "bg-transparent text-[#2563eb] hover:bg-[#2563eb]/10 dark:text-[#60a5fa] dark:hover:bg-[#3b82f6]/15",
};

const variantByStyle: Record<
  ButtonVariant,
  Record<ButtonStyle, string>
> = {
  solid: solidClasses,
  outline: outlineClasses,
  ghost: ghostClasses,
};

const borderClasses: Record<ButtonStyle, string> = {
  primary:
    "border border-zinc-300 hover:border-zinc-400 dark:border-zinc-400 dark:hover:border-zinc-200",
  secondary:
    "border border-zinc-200 hover:border-zinc-300 dark:border-[#333338] dark:hover:border-zinc-600",
  danger:
    "border border-[#fca5a5] hover:border-[#f87171] dark:border-[#ef4444]/60 dark:hover:border-[#f87171]",
  warning:
    "border border-[#fde047]/80 hover:border-[#eab308] dark:border-[#eab308]/50 dark:hover:border-[#fde047]",
  info: "border border-[#93c5fd] hover:border-[#60a5fa] dark:border-[#3b82f6]/50 dark:hover:border-[#60a5fa]",
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

const MotionLink = motion.create(Link);

export default function Button({
  href,
  children,
  className = "",
  variant = "solid",
  style = "primary",
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
  const reduced = useReducedMotion() ?? false;

  const classes = [
    "inline-flex items-center justify-center rounded-2xl font-sans font-medium tracking-normal transition-colors",
    disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer",
    variantByStyle[variant][style],
    border || variant === "outline"
      ? borderClasses[style]
      : "border border-transparent",
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

  const press = !disabled && !reduced ? tapScale : undefined;

  if (href && !disabled) {
    return (
      <MotionLink
        href={href}
        className={classes}
        target={target}
        rel={rel}
        aria-label={iconOnly ? label : ariaLabel}
        whileTap={press}
        transition={tapTransition}
      >
        {content}
      </MotionLink>
    );
  }

  return (
    <motion.button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      aria-label={iconOnly ? label : ariaLabel}
      whileTap={press}
      transition={tapTransition}
    >
      {content}
    </motion.button>
  );
}

export { Button };
export type { ButtonProps, ButtonVariant, ButtonStyle, ButtonSize };
