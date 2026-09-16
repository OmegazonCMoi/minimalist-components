import Table from "@/components/table";
import { InstallBlock } from "@/components/docs/code-block";

const sampleColumns = [
  { key: "prop", header: "Prop", mono: true },
  { key: "type", header: "Type", mono: true },
  { key: "default", header: "Default", mono: true },
  { key: "description", header: "Description" },
];

const sampleRows = [
  { prop: "name", type: "string", default: "—", description: "Display label" },
  { prop: "active", type: "boolean", default: "false", description: "Active state" },
];

export default function TableDocsPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
          Components
        </p>
        <h1 className="text-3xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50 md:text-4xl">
          Table
        </h1>
        <p className="text-base leading-relaxed text-zinc-400">
          Compact data table for props and reference lists.
        </p>
      </header>

      <InstallBlock name="Table" />

      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="font-mono text-sm text-zinc-900 dark:text-zinc-100">columns / rows</h2>
          <p className="text-sm text-zinc-500">Define headers and row cells</p>
        </div>
        <Table columns={sampleColumns} rows={sampleRows} />
      </section>

      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="font-mono text-sm text-zinc-900 dark:text-zinc-100">mono</h2>
          <p className="text-sm text-zinc-500">boolean — monospace column cells</p>
        </div>
        <Table
          columns={[
            { key: "prop", header: "Prop", mono: true },
            { key: "description", header: "Description" },
          ]}
          rows={[
            { prop: "mono", description: "Code-looking cells" },
            { prop: "plain", description: "Regular text cells" },
          ]}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">Props</h2>
        <Table
          columns={sampleColumns}
          rows={[
            { prop: "columns", type: "TableColumn[]", default: "—", description: "Header config" },
            { prop: "rows", type: "Record[]", default: "—", description: "Row data" },
            { prop: "className", type: "string", default: "—", description: "Extra classes" },
          ]}
        />
      </section>
    </article>
  );
}
