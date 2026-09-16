import Demo from "@/components/demo";
import Switch from "@/components/switch";
import Table from "@/components/table";
import { InstallBlock } from "@/components/docs/code-block";

function PropSection({
  name,
  description,
  children,
}: {
  name: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h2 className="font-mono text-sm text-zinc-900 dark:text-zinc-100">{name}</h2>
        <p className="text-sm text-zinc-500">{description}</p>
      </div>
      <Demo>{children}</Demo>
    </section>
  );
}

const props = [
  { prop: "label", type: "ReactNode", default: "—", description: "Field label" },
  { prop: "size", type: "sm | md | lg", default: "md", description: "Control scale" },
  { prop: "checked", type: "boolean", default: "—", description: "Controlled state" },
  { prop: "defaultChecked", type: "boolean", default: "—", description: "Initial state" },
  { prop: "error", type: "string", default: "—", description: "Error message" },
  { prop: "disabled", type: "boolean", default: "false", description: "Disable control" },
  { prop: "name", type: "string", default: "—", description: "Field name" },
  { prop: "onChange", type: "function", default: "—", description: "Change handler" },
  { prop: "className", type: "string", default: "—", description: "Extra classes" },
];

export default function SwitchDocsPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
          Components
        </p>
        <h1 className="text-3xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50 md:text-4xl">
          Switch
        </h1>
        <p className="text-base leading-relaxed text-zinc-400">
          Sliding toggle for on/off settings.
        </p>
      </header>

      <InstallBlock name="Switch" />

      <PropSection name="label" description="ReactNode — optional text">
        <Switch label="Notifications" />
      </PropSection>

      <PropSection name="size" description="sm · md · lg — default md">
        <Switch size="sm" label="Small" defaultChecked />
        <Switch size="md" label="Medium" defaultChecked />
        <Switch size="lg" label="Large" defaultChecked />
      </PropSection>

      <PropSection name="defaultChecked" description="boolean — initial on">
        <Switch label="Off" />
        <Switch label="On" defaultChecked />
      </PropSection>

      <PropSection name="error" description="string — error message + red state">
        <Switch label="Required" error="Must enable" />
      </PropSection>

      <PropSection name="disabled" description="boolean — default false">
        <Switch label="Enabled" />
        <Switch label="Disabled" disabled defaultChecked />
      </PropSection>

      <section className="space-y-4">
        <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">Props</h2>
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
