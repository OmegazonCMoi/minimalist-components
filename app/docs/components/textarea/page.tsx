import Textarea from "@/components/textarea";
import Table from "@/components/table";
import { InstallBlock } from "@/components/docs/code-block";
import { PropSection } from "@/components/docs/prop-section";

const props = [
  { prop: "placeholder", type: "string", default: "—", description: "Hint text" },
  { prop: "value", type: "string", default: "—", description: "Controlled value" },
  { prop: "defaultValue", type: "string", default: "—", description: "Initial value" },
  { prop: "label", type: "string", default: "—", description: "Field label" },
  { prop: "size", type: "sm | md | lg", default: "md", description: "Field scale" },
  { prop: "rows", type: "number", default: "4", description: "Visible rows" },
  { prop: "resize", type: "boolean", default: "false", description: "Allow vertical resize" },
  { prop: "border", type: "boolean", default: "false", description: "Show outline" },
  { prop: "error", type: "string", default: "—", description: "Error message" },
  { prop: "disabled", type: "boolean", default: "false", description: "Disable field" },
  { prop: "name", type: "string", default: "—", description: "Field name" },
  { prop: "id", type: "string", default: "—", description: "Element id" },
  { prop: "onChange", type: "function", default: "—", description: "Change handler" },
  { prop: "className", type: "string", default: "—", description: "Extra classes" },
];

const imp = `import { Textarea } from "@/components";`;

export default function TextareaDocsPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
          Components
        </p>
        <h1 className="text-3xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50 md:text-4xl">
          Textarea
        </h1>
        <p className="text-base leading-relaxed text-zinc-400">
          Multi-line text field with optional label, border, and error state.
        </p>
      </header>

      <InstallBlock name="Textarea" />

      <PropSection
        name="placeholder"
        description="string — hint text"
        code={`${imp}

<Textarea placeholder="Write a note…" />`}
      >
        <Textarea placeholder="Write a note…" />
      </PropSection>

      <PropSection
        name="label"
        description="string — field label"
        code={`${imp}

<Textarea label="Message" placeholder="Tell us more…" />`}
      >
        <Textarea label="Message" placeholder="Tell us more…" />
      </PropSection>

      <PropSection
        name="size"
        description="sm · md · lg — default md"
        stack
        codes={[
          `${imp}

<Textarea size="sm" placeholder="sm" />`,
          `${imp}

<Textarea size="md" placeholder="md" />`,
          `${imp}

<Textarea size="lg" placeholder="lg" />`,
        ]}
      >
        <Textarea size="sm" placeholder="sm" />
        <Textarea size="md" placeholder="md" />
        <Textarea size="lg" placeholder="lg" />
      </PropSection>

      <PropSection
        name="border"
        description="boolean — default false"
        code={`${imp}

<Textarea border placeholder="With border" />`}
      >
        <Textarea border placeholder="With border" />
      </PropSection>

      <PropSection
        name="rows / resize"
        description="rows number · resize boolean"
        code={`${imp}

<Textarea border rows={6} resize placeholder="Drag the corner…" />`}
      >
        <Textarea border rows={6} resize placeholder="Drag the corner…" />
      </PropSection>

      <PropSection
        name="error"
        description="string — error message + red border"
        code={`${imp}

<Textarea
  label="Bio"
  error="Keep it under 160 characters"
  defaultValue="A very long biography that goes on and on…"
/>`}
      >
        <Textarea
          label="Bio"
          error="Keep it under 160 characters"
          defaultValue="A very long biography that goes on and on…"
        />
      </PropSection>

      <PropSection
        name="disabled"
        description="boolean — default false"
        code={`${imp}

<Textarea disabled defaultValue="Read-only for now" />`}
      >
        <Textarea disabled defaultValue="Read-only for now" />
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
