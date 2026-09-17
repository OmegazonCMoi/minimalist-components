import Radio from "@/components/radio";
import Table from "@/components/table";
import { InstallBlock } from "@/components/docs/code-block";
import { PropSection } from "@/components/docs/prop-section";

const props = [
  { prop: "label", type: "ReactNode", default: "—", description: "Option label" },
  { prop: "size", type: "sm | md | lg", default: "md", description: "Control scale" },
  { prop: "name", type: "string", default: "—", description: "Group name" },
  { prop: "value", type: "string", default: "—", description: "Option value" },
  { prop: "checked", type: "boolean", default: "—", description: "Controlled state" },
  { prop: "defaultChecked", type: "boolean", default: "—", description: "Initial state" },
  { prop: "error", type: "string", default: "—", description: "Error message" },
  { prop: "disabled", type: "boolean", default: "false", description: "Disable control" },
  { prop: "onChange", type: "function", default: "—", description: "Change handler" },
  { prop: "className", type: "string", default: "—", description: "Extra classes" },
];

const imp = `import { Radio } from "@/components";`;

export default function RadioDocsPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
          Components
        </p>
        <h1 className="text-3xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50 md:text-4xl">
          Radio
        </h1>
        <p className="text-base leading-relaxed text-zinc-400">
          Circular option for single-select groups.
        </p>
      </header>

      <InstallBlock name="Radio" />

      <PropSection
        name="label"
        description="ReactNode — optional text"
        code={`${imp}

<Radio name="plan-label" value="pro" label="Pro plan" />`}
      >
        <Radio name="plan-label" value="pro" label="Pro plan" />
      </PropSection>

      <PropSection
        name="size"
        description="sm · md · lg — default md"
        code={`${imp}

<Radio name="plan-size" value="sm" size="sm" label="Small" defaultChecked />
<Radio name="plan-size-md" value="md" size="md" label="Medium" defaultChecked />
<Radio name="plan-size-lg" value="lg" size="lg" label="Large" defaultChecked />`}
      >
        <Radio name="plan-size" value="sm" size="sm" label="Small" defaultChecked />
        <Radio name="plan-size-md" value="md" size="md" label="Medium" defaultChecked />
        <Radio name="plan-size-lg" value="lg" size="lg" label="Large" defaultChecked />
      </PropSection>

      <PropSection
        name="name / value"
        description="group radios with the same name"
        code={`${imp}

<Radio name="theme" value="dark" label="Dark" defaultChecked />
<Radio name="theme" value="light" label="Light" />
<Radio name="theme" value="system" label="System" />`}
      >
        <Radio name="theme" value="dark" label="Dark" defaultChecked />
        <Radio name="theme" value="light" label="Light" />
        <Radio name="theme" value="system" label="System" />
      </PropSection>

      <PropSection
        name="error"
        description="string — error message + red state"
        code={`${imp}

<Radio name="err" value="a" label="Option A" error="Pick one" />`}
      >
        <Radio name="err" value="a" label="Option A" error="Pick one" />
      </PropSection>

      <PropSection
        name="disabled"
        description="boolean — default false"
        code={`${imp}

<Radio name="dis" value="on" label="Enabled" />
<Radio name="dis2" value="off" label="Disabled" disabled defaultChecked />`}
      >
        <Radio name="dis2" value="off" label="Disabled" disabled defaultChecked />
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
