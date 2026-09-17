import { Children, type ReactNode } from "react";
import Demo from "@/components/demo";

type PropSectionProps = {
  name: string;
  description: string;
  children: ReactNode;
  /** Source for a single demo block. */
  code?: string;
  /**
   * One source string per child when `stack` is true.
   * Falls back to `code` for every row if omitted.
   */
  codes?: string[];
  /** One demo block per child (for enum params). */
  stack?: boolean;
};

export function PropSection({
  name,
  description,
  children,
  code,
  codes,
  stack = false,
}: PropSectionProps) {
  const items = Children.toArray(children);

  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h2 className="font-mono text-sm text-zinc-900 dark:text-zinc-100">{name}</h2>
        <p className="text-sm text-zinc-500">{description}</p>
      </div>
      {stack ? (
        <div className="space-y-3">
          {items.map((child, index) => (
            <Demo key={index} code={codes?.[index] ?? code}>
              {child}
            </Demo>
          ))}
        </div>
      ) : (
        <Demo code={code}>{children}</Demo>
      )}
    </section>
  );
}
