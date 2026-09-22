import Button from "@/components/button";
import Demo from "@/components/demo";
import Table from "@/components/table";
import { InstallBlock } from "@/components/docs/code-block";

const impButton = `import { Button } from "@/components";`;
const impDemo = `import { Button, Demo } from "@/components";`;

export default function DemoDocsPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
          Components
        </p>
        <h1 className="text-3xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50 md:text-4xl">
          Demo
        </h1>
        <p className="text-base leading-relaxed text-zinc-400">
          Preview surface with a top-right switcher between live demo and source code.
        </p>
      </header>

      <InstallBlock name="Demo" cli={false} />

      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="font-mono text-sm text-zinc-900 dark:text-zinc-100">default</h2>
          <p className="text-sm text-zinc-500">Centered preview + code toggle</p>
        </div>
        <Demo
          code={`${impButton}

<Button size="sm">Action</Button>`}
        >
          <Button size="sm">Action</Button>
        </Demo>
      </section>

      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="font-mono text-sm text-zinc-900 dark:text-zinc-100">className</h2>
          <p className="text-sm text-zinc-500">string — tweak layout or height</p>
        </div>
        <Demo
          className="!flex-col min-h-40 gap-4"
          code={`${impDemo}

<Demo className="!flex-col min-h-40 gap-4">
  <Button size="sm" variant="solid">Top</Button>
  <Button size="sm" variant="ghost">Bottom</Button>
</Demo>`}
        >
          <Button size="sm" variant="solid">
            Top
          </Button>
          <Button size="sm" variant="ghost">
            Bottom
          </Button>
        </Demo>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">Props</h2>
        <Table
          columns={[
            { key: "prop", header: "Prop", mono: true },
            { key: "type", header: "Type", mono: true },
            { key: "default", header: "Default", mono: true },
            { key: "description", header: "Description" },
          ]}
          rows={[
            { prop: "children", type: "ReactNode", default: "—", description: "Live preview" },
            { prop: "code", type: "string", default: "—", description: "Source for code view" },
            { prop: "className", type: "string", default: "—", description: "Extra classes" },
            { prop: "toolbar", type: "boolean", default: "true", description: "Demo/code switcher" },
          ]}
        />
      </section>
    </article>
  );
}
