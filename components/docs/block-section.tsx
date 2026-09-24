"use client";

import type { ReactNode } from "react";
import Demo from "@/components/demo";

type BlockSectionProps = {
  id: string;
  title: string;
  description: string;
  components: string[];
  code: string;
  children: ReactNode;
  className?: string;
};

export function BlockSection({
  id,
  title,
  description,
  components,
  code,
  children,
  className = "",
}: BlockSectionProps) {
  return (
    <section id={id} className="scroll-mt-24 space-y-4">
      <div className="space-y-2">
        <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
          {title}
        </h2>
        <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          {description}
        </p>
        <p className="flex flex-wrap gap-1.5 pt-0.5">
          {components.map((name) => (
            <span
              key={name}
              className="rounded-md bg-zinc-200/80 px-1.5 py-0.5 font-mono text-[11px] text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
            >
              {name}
            </span>
          ))}
        </p>
      </div>
      <Demo
        code={code}
        pattern={false}
        className={["w-full !items-stretch !justify-start", className]
          .filter(Boolean)
          .join(" ")}
      >
        {children}
      </Demo>
    </section>
  );
}
