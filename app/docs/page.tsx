import Link from "next/link";
import Button from "@/components/button";
import { ArrowRightIcon } from "lucide-react";

export default function DocsPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
          Getting started
        </p>
        <h1 className="text-3xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50 md:text-4xl">
          Introduction
        </h1>
        <p className="text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
          Minimalist Components is a UI kit for Next.js + Tailwind CSS v4.
          Components are copied into your app via CLI — you own the source under{" "}
          <code className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono text-xs text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
            components/ui
          </code>
          , with no runtime lock-in on this package.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
          How it works
        </h2>
        <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          <li>
            Run{" "}
            <code className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono text-xs text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              npx minimalist-components init
            </code>{" "}
            once in your project.
          </li>
          <li>
            Add what you need with{" "}
            <code className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono text-xs text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              npx minimalist-components add …
            </code>
            .
          </li>
          <li>Import from your local files and customize the classes.</li>
        </ol>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
          How to use these docs
        </h2>
        <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          <li>
            Follow{" "}
            <Link
              href="/docs/installation"
              className="text-zinc-800 underline-offset-4 hover:underline dark:text-zinc-200"
            >
              Installation
            </Link>{" "}
            to set up the CLI.
          </li>
          <li>
            Browse{" "}
            <Link
              href="/docs/blocks"
              className="text-zinc-800 underline-offset-4 hover:underline dark:text-zinc-200"
            >
              Blocks
            </Link>{" "}
            for full UI compositions.
          </li>
          <li>
            Open a component in the sidebar (Form, Actions, Display…).
          </li>
          <li>
            Use the{" "}
            <span className="text-zinc-700 dark:text-zinc-300">Install</span>{" "}
            block for the{" "}
            <code className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono text-xs text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              add
            </code>{" "}
            command and import path.
          </li>
          <li>
            Scroll the prop demos — each section shows one option at a time.
          </li>
          <li>Use the props table at the bottom as a quick reference.</li>
        </ol>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
          What you need
        </h2>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          <li>Next.js 14+ (App Router) and React 18+</li>
          <li>Tailwind CSS v4</li>
          <li>
            Path alias{" "}
            <code className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono text-xs text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              @/*
            </code>{" "}
            pointing to your project root
          </li>
          <li>
            Peer libs when prompted — often{" "}
            <code className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono text-xs text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              framer-motion
            </code>{" "}
            and{" "}
            <code className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono text-xs text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              lucide-react
            </code>
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
          Component groups
        </h2>
        <div className="space-y-3 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          <p>
            <span className="font-medium text-zinc-800 dark:text-zinc-200">
              Form
            </span>{" "}
            — Input, Input OTP, Select, Date Picker, Checkbox, Radio, Switch,
            Slider.
          </p>
          <p>
            <span className="font-medium text-zinc-800 dark:text-zinc-200">
              Actions
            </span>{" "}
            — Button and Alert Dialog.
          </p>
          <p>
            <span className="font-medium text-zinc-800 dark:text-zinc-200">
              Display
            </span>{" "}
            — Badge, Breadcrumbs, Collapsible, Progress, Separator, Table, Toast,
            Tooltip.
          </p>
          <p>
            <span className="font-medium text-zinc-800 dark:text-zinc-200">
              Utilities
            </span>{" "}
            — Demo surfaces used in these docs (not installed via CLI).
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
          Light &amp; dark
        </h2>
        <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          Components ship with light and dark styles via the{" "}
          <code className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono text-xs text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
            .dark
          </code>{" "}
          class on{" "}
          <code className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono text-xs text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
            &lt;html&gt;
          </code>
          . Toggle the theme from the site navbar to preview both modes.
        </p>
      </section>

      <section className="flex flex-wrap gap-3">
        <Button
          href="/docs/installation"
          icon={<ArrowRightIcon className="size-4" />}
        >
          Installation
        </Button>
        <Button
          href="/docs/blocks"
          variant="outline"
          border
          icon={<ArrowRightIcon className="size-4" />}
        >
          Blocks
        </Button>
      </section>
    </article>
  );
}
