import type { ReactNode } from "react";

type BadgeVariant = "solid" | "outline" | "ghost";
type BadgeSize = "sm" | "md" | "lg";
type BadgeTone = "neutral" | "success" | "warning" | "danger";

type BadgeProps = {
  children?: ReactNode;
  className?: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  tone?: BadgeTone;
  border?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  image?: string | ReactNode;
  imagePosition?: "left" | "right";
  alt?: string;
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: "gap-1 rounded-full px-2 py-1 text-[11px] leading-normal",
  md: "gap-1.5 rounded-full px-2.5 py-1 text-xs leading-normal",
  lg: "gap-2 rounded-full px-3 py-1.5 text-sm leading-normal",
};

const imageSizeClasses: Record<BadgeSize, string> = {
  sm: "size-3.5 rounded-full",
  md: "size-4 rounded-full",
  lg: "size-5 rounded-full",
};

const iconWrapClasses: Record<BadgeSize, string> = {
  sm: "[&_svg]:size-3",
  md: "[&_svg]:size-3.5",
  lg: "[&_svg]:size-4",
};

const toneSolid: Record<BadgeTone, string> = {
  neutral: "bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200",
  success: "bg-[#dcfce7] text-[#166534] dark:bg-[#14532d] dark:text-[#bbf7d0]",
  warning: "bg-[#fef9c3] text-[#854d0e] dark:bg-[#713f12] dark:text-[#fef08a]",
  danger: "bg-[#fee2e2] text-[#991b1b] dark:bg-[#7f1d1d] dark:text-[#fecaca]",
};

const toneOutline: Record<BadgeTone, string> = {
  neutral: "bg-transparent text-zinc-700 border-zinc-300 dark:text-zinc-300 dark:border-[#333338]",
  success: "bg-transparent text-[#16a34a] border-[#86efac] dark:text-[#86efac] dark:border-[#22c55e]",
  warning: "bg-transparent text-[#ca8a04] border-[#fde047] dark:text-[#fde047] dark:border-[#eab308]",
  danger: "bg-transparent text-[#dc2626] border-[#fca5a5] dark:text-[#f87171] dark:border-[#ef4444]",
};

const toneGhost: Record<BadgeTone, string> = {
  neutral: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800/50 dark:text-zinc-400",
  success: "bg-[#dcfce7]/70 text-[#15803d] dark:bg-[#14532d]/40 dark:text-[#86efac]",
  warning: "bg-[#fef9c3]/70 text-[#a16207] dark:bg-[#713f12]/40 dark:text-[#fde047]",
  danger: "bg-[#fee2e2]/80 text-[#b91c1c] dark:bg-[#7f1d1d]/45 dark:text-[#f87171]",
};

const toneBorder: Record<BadgeTone, string> = {
  neutral: "border-zinc-300 dark:border-[#333338]",
  success: "border-[#22c55e]/50 dark:border-[#22c55e]/60",
  warning: "border-[#eab308]/50 dark:border-[#eab308]/60",
  danger: "border-[#ef4444]/50 dark:border-[#ef4444]",
};

export default function Badge({
  children,
  className = "",
  variant = "solid",
  size = "md",
  tone = "neutral",
  border = false,
  icon,
  iconPosition = "left",
  image,
  imagePosition = "left",
  alt = "",
}: BadgeProps) {
  const toneClasses =
    variant === "outline"
      ? toneOutline[tone]
      : variant === "ghost"
        ? toneGhost[tone]
        : toneSolid[tone];

  const showBorder = border || variant === "outline";

  const classes = [
    "inline-flex max-w-full items-center font-sans font-medium tracking-wide",
    sizeClasses[size],
    toneClasses,
    showBorder ? `border ${toneBorder[tone]}` : "border border-transparent",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const media = image ? (
    <span
      className={`inline-flex shrink-0 overflow-hidden rounded-full ${imageSizeClasses[size]}`}
    >
      {typeof image === "string" ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt={alt} className="size-full object-cover" />
      ) : (
        <span className="flex size-full items-center justify-center [&_img]:size-full [&_img]:object-cover">
          {image}
        </span>
      )}
    </span>
  ) : null;

  const iconNode = icon ? (
    <span
      className={`inline-flex shrink-0 items-center justify-center ${iconWrapClasses[size]}`}
    >
      {icon}
    </span>
  ) : null;

  return (
    <span className={classes}>
      {image && imagePosition === "left" ? media : null}
      {icon && iconPosition === "left" ? iconNode : null}
      {children ? <span>{children}</span> : null}
      {icon && iconPosition === "right" ? iconNode : null}
      {image && imagePosition === "right" ? media : null}
    </span>
  );
}

export { Badge };
export type { BadgeProps, BadgeVariant, BadgeSize, BadgeTone };
