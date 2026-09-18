import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";
import type { ReactNode } from "react";

type BreadcrumbItem = {
  label: string;
  /** Omit on the current page. */
  href?: string;
};

type BreadcrumbSize = "sm" | "md" | "lg";

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  size?: BreadcrumbSize;
  /** Custom separator between items. */
  separator?: ReactNode;
  className?: string;
};

const sizeClasses: Record<BreadcrumbSize, string> = {
  sm: "gap-1 text-xs",
  md: "gap-1.5 text-sm",
  lg: "gap-2 text-base",
};

const sepSizeClasses: Record<BreadcrumbSize, string> = {
  sm: "size-3",
  md: "size-3.5",
  lg: "size-4",
};

export default function Breadcrumbs({
  items,
  size = "md",
  separator,
  className = "",
}: BreadcrumbsProps) {
  if (items.length === 0) return null;

  const sep =
    separator ?? (
      <ChevronRightIcon aria-hidden className={sepSizeClasses[size]} />
    );

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol
        className={[
          "flex flex-wrap items-center font-medium",
          sizeClasses[size],
        ].join(" ")}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="inline-flex items-center">
              {index > 0 ? (
                <span
                  aria-hidden
                  className="mr-[0.4em] inline-flex shrink-0 text-zinc-400 dark:text-zinc-600"
                >
                  {sep}
                </span>
              ) : null}

              {isLast || !item.href ? (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={
                    isLast
                      ? "text-zinc-900 dark:text-zinc-100"
                      : "text-zinc-500 dark:text-zinc-400"
                  }
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export { Breadcrumbs };
export type { BreadcrumbsProps, BreadcrumbItem, BreadcrumbSize };
