import Separator from "@/components/separator";
import Table from "@/components/table";
import { InstallBlock } from "@/components/docs/code-block";
import { PropSection } from "@/components/docs/prop-section";

const props = [
  { prop: "orientation", type: "horizontal | vertical", default: "horizontal", description: "Line direction" },
  { prop: "label", type: "ReactNode", default: "—", description: "Center label (horizontal)" },
  { prop: "decorative", type: "boolean", default: "true", description: "Hide from screen readers" },
  { prop: "className", type: "string", default: "—", description: "Extra classes" },
];

const imp = `import { Separator } from "@/components";`;

export default function SeparatorDocsPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
          Components
        </p>
        <h1 className="text-3xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50 md:text-4xl">
          Separator
        </h1>
        <p className="text-base leading-relaxed text-zinc-400">
          Thin divider for grouping content — horizontal, vertical, or labeled.
        </p>
      </header>

      <InstallBlock name="Separator" />

      <PropSection
        name="orientation"
        description="horizontal · vertical — default horizontal"
        pattern={false}
        code={`${imp}

<Separator />
<div className="flex h-16 items-center gap-4">
  <span>Left</span>
  <Separator orientation="vertical" />
  <span>Right</span>
</div>`}
      >
        <div className="flex w-full max-w-sm flex-col gap-6">
          <Separator />
          <div className="flex h-16 items-center gap-4 text-sm text-zinc-600 dark:text-zinc-300">
            <span>Left</span>
            <Separator orientation="vertical" />
            <span>Right</span>
          </div>
        </div>
      </PropSection>

      <PropSection
        name="label"
        description="ReactNode — text in the middle (horizontal)"
        pattern={false}
        code={`${imp}

<Separator label="or" />
<Separator label="Continue with" />`}
      >
        <div className="flex w-full max-w-sm flex-col gap-6">
          <Separator label="or" />
          <Separator label="Continue with" />
        </div>
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
