"use client";

import Image from "next/image";
import Link from "next/link";
import Switch from "@/components/switch";
import { useTheme } from "@/components/theme-provider";
import { MoonIcon, SunIcon } from "lucide-react";

type SiteNavbarProps = {
  className?: string;
  maxWidthClassName?: string;
  /** When true, keep logo white (for dark hero surfaces). */
  onDarkSurface?: boolean;
};

export default function SiteNavbar({
  className = "",
  maxWidthClassName = "max-w-5xl",
  onDarkSurface = false,
}: SiteNavbarProps) {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <header
      className={[
        "relative z-20 w-full border-b border-zinc-200/80 bg-[var(--background)]/80 backdrop-blur-md dark:border-zinc-800/80",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <nav
        className={[
          "mx-auto flex h-16 w-full items-center justify-between px-6",
          maxWidthClassName,
        ].join(" ")}
      >
        <Link href="/" className="inline-flex items-center">
          <Image
            src="/logo.png"
            alt="Minimalist Components"
            width={36}
            height={36}
            className={[
              "size-9 object-contain",
              onDarkSurface ? "" : "invert dark:invert-0",
            ]
              .filter(Boolean)
              .join(" ")}
            priority
          />
        </Link>

        <div className="flex items-center gap-6">
          <ul className="flex items-center gap-6 text-sm text-zinc-500 sm:gap-8">
            <li>
              <Link
                href="/docs/components/button"
                className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-200"
              >
                Components
              </Link>
            </li>
            <li>
              <Link
                href="/docs/blocks"
                className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-200"
              >
                Blocks
              </Link>
            </li>
            <li>
              <Link
                href="/docs"
                className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-200"
              >
                Docs
              </Link>
            </li>
          </ul>

          <div
            className="flex items-center gap-2"
            title={isDark ? "Dark mode" : "Light mode"}
          >
            <SunIcon
              className={[
                "size-3.5 shrink-0 transition-colors",
                isDark ? "text-zinc-600" : "text-amber-500",
              ].join(" ")}
              aria-hidden
            />
            <Switch
              size="sm"
              checked={isDark}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              onChange={(event) => {
                setTheme(event.target.checked ? "dark" : "light");
              }}
            />
            <MoonIcon
              className={[
                "size-3.5 shrink-0 transition-colors",
                isDark ? "text-zinc-200" : "text-zinc-400",
              ].join(" ")}
              aria-hidden
            />
          </div>
        </div>
      </nav>
    </header>
  );
}
