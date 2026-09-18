import Breadcrumbs from "@/components/breadcrumbs";
import Table from "@/components/table";
import { InstallBlock } from "@/components/docs/code-block";
import { PropSection } from "@/components/docs/prop-section";
import { SlashIcon } from "lucide-react";

const props = [
  { prop: "items", type: "BreadcrumbItem[]", default: "—", description: "Trail segments" },
  { prop: "items[].label", type: "string", default: "—", description: "Segment text" },
  { prop: "items[].href", type: "string", default: "—", description: "Link (omit on current)" },
  { prop: "size", type: "sm | md | lg", default: "md", description: "Trail scale" },
  { prop: "separator", type: "ReactNode", default: "ChevronRight", description: "Between items" },
  { prop: "className", type: "string", default: "—", description: "Extra classes" },
];

const sample = [
  { label: "Docs", href: "/docs" },
  { label: "Components", href: "/docs/components/button" },
  { label: "Breadcrumbs" },
];

const imp = `import { Breadcrumbs } from "@/components";`;
const impSep = `import { Breadcrumbs } from "@/components";
import { SlashIcon } from "lucide-react";`;

export default function BreadcrumbsDocsPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
          Components
        </p>
        <h1 className="text-3xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50 md:text-4xl">
          Breadcrumbs
        </h1>
        <p className="text-base leading-relaxed text-zinc-400">
          Navigation trail for the current page hierarchy.
        </p>
      </header>

      <InstallBlock name="Breadcrumbs" />

      <PropSection
        name="items"
        description="label + optional href — last item is the current page"
        code={`${imp}

<Breadcrumbs
  items={[
    { label: "Docs", href: "/docs" },
    { label: "Components", href: "/docs/components/button" },
    { label: "Breadcrumbs" },
  ]}
/>`}
      >
        <Breadcrumbs items={sample} />
      </PropSection>

      <PropSection
        name="size"
        description="sm · md · lg — default md"
        stack
        codes={[
          `${imp}

<Breadcrumbs size="sm" items={[…]} />`,
          `${imp}

<Breadcrumbs size="md" items={[…]} />`,
          `${imp}

<Breadcrumbs size="lg" items={[…]} />`,
        ]}
      >
        <Breadcrumbs size="sm" items={sample} />
        <Breadcrumbs size="md" items={sample} />
        <Breadcrumbs size="lg" items={sample} />
      </PropSection>

      <PropSection
        name="separator"
        description="ReactNode — default chevron"
        code={`${impSep}

<Breadcrumbs
  separator={<SlashIcon className="size-3.5" />}
  items={[
    { label: "Home", href: "/" },
    { label: "Docs", href: "/docs" },
    { label: "Breadcrumbs" },
  ]}
/>`}
      >
        <Breadcrumbs
          separator={<SlashIcon className="size-3.5" aria-hidden />}
          items={[
            { label: "Home", href: "/" },
            { label: "Docs", href: "/docs" },
            { label: "Breadcrumbs" },
          ]}
        />
      </PropSection>

      <section className="space-y-4">
        <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
          Props
        </h2>
        <Table
          columns={[
            { key: "prop", header: "Prop", mono: true },
            { key: "type", header: "Type", mono: true },
            { key: "default", header: "Default", mono: true },
            { key: "description", header: "Description" },
          ]}
          rows={props}
        />
      </section>
    </article>
  );
}
