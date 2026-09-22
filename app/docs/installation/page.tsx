import Link from "next/link";
import Button from "@/components/button";
import CodeBlock from "@/components/docs/code-block";
import { ArrowRightIcon } from "lucide-react";

export default function InstallationPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
          Getting started
        </p>
        <h1 className="text-3xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50 md:text-4xl">
          Installation
        </h1>
        <p className="text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
          Components are copied into your project with a small CLI — you own the
          source and can edit it freely.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
          Requirements
        </h2>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          <li>Node.js 18+</li>
          <li>Next.js 14+ (App Router recommended)</li>
          <li>React 18+</li>
          <li>Tailwind CSS v4</li>
          <li>
            Path alias{" "}
            <code className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono text-xs text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              @/*
            </code>{" "}
            → project root (Next.js default)
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
          1. Init
        </h2>
        <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          Creates{" "}
          <code className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono text-xs text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
            minimalist.json
          </code>
          , plus your components and lib folders.
        </p>
        <CodeBlock>{`npx minimalist-components init`}</CodeBlock>
        <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          Non-interactive defaults:{" "}
          <code className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono text-xs text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
            npx minimalist-components init -y
          </code>
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
          2. Add a component
        </h2>
        <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          Copies the file (and shared utils / peer deps prompts) into your app.
        </p>
        <CodeBlock>{`npx minimalist-components add button
npx minimalist-components add badge input select
npx minimalist-components list`}</CodeBlock>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
          3. Import
        </h2>
        <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          Default path is{" "}
          <code className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono text-xs text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
            components/ui
          </code>
          .
        </p>
        <CodeBlock>{`import { Button } from "@/components/ui/button";

export default function Page() {
  return <Button style="primary">Save</Button>;
}`}</CodeBlock>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
          Peer libraries
        </h2>
        <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          The CLI lists missing npm packages when you{" "}
          <code className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono text-xs text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
            add
          </code>
          . Common ones:
        </p>
        <CodeBlock>{`npm install framer-motion lucide-react`}</CodeBlock>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
          Config
        </h2>
        <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          <code className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono text-xs text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
            minimalist.json
          </code>{" "}
          after init:
        </p>
        <CodeBlock>{`{
  "componentsDir": "components/ui",
  "libDir": "lib",
  "aliases": {
    "components": "@/components/ui",
    "lib": "@/lib"
  },
  "typescript": true
}`}</CodeBlock>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          <li>
            <code className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono text-xs text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              --force
            </code>{" "}
            — overwrite existing files on add
          </li>
          <li>
            <code className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono text-xs text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              -y
            </code>{" "}
            — keep existing files on conflict (add) / skip prompts (init)
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
          Next
        </h2>
        <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          Browse a component page for props and demos — each Install block shows
          the matching{" "}
          <code className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono text-xs text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
            add
          </code>{" "}
          command. Start with{" "}
          <Link
            href="/docs/components/button"
            className="text-zinc-800 underline-offset-4 hover:underline dark:text-zinc-200"
          >
            Button
          </Link>
          .
        </p>
      </section>

      <section className="flex flex-wrap gap-3">
        <Button
          href="/docs/components/button"
          icon={<ArrowRightIcon className="size-4" />}
        >
          Button
        </Button>
        <Button href="/docs" variant="outline" border>
          Introduction
        </Button>
      </section>
    </article>
  );
}
