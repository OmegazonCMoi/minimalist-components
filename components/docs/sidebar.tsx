"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { docsNav } from "@/lib/docs-nav";

export default function DocsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-full shrink-0 flex-col border-b border-zinc-200 dark:border-zinc-800/80 md:h-full md:w-56 md:border-b-0 md:border-r md:border-zinc-200 dark:md:border-zinc-800/80 lg:w-64">
      <nav className="min-h-0 flex-1 overflow-y-auto px-3 py-6 md:px-4">
        {docsNav.map((section) => (
          <div key={section.title} className="mb-6">
            <p className="mb-2 px-2 text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-400 dark:text-zinc-600">
              {section.title}
            </p>
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={[
                        "block rounded-lg px-2 py-1.5 text-sm transition-colors",
                        active
                          ? "bg-zinc-200 text-zinc-900 dark:bg-zinc-800/80 dark:text-zinc-50"
                          : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-900 dark:hover:text-zinc-200",
                      ].join(" ")}
                    >
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
