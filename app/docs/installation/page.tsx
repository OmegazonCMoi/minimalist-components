import Button from "@/components/button";
import { InstallBlock } from "@/components/docs/code-block";
import { ArrowRightIcon } from "lucide-react";

export default function InstallationPage() {
  return (
    <article className="space-y-8">
      <header className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
          Getting started
        </p>
        <h1 className="text-3xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50 md:text-4xl">
          Installation
        </h1>
        <p className="text-base leading-relaxed text-zinc-400">
          Drop components into your Next.js app. No registry, no CLI — just
          files.
        </p>
      </header>

      <InstallBlock name="Button" />

      <section className="pt-2">
        <Button href="/docs/components/button" icon={<ArrowRightIcon className="size-4" />}>
          View Button
        </Button>
      </section>
    </article>
  );
}
