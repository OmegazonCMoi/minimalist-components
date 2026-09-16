import Demo from "@/components/demo";
import Input from "@/components/input";
import Table from "@/components/table";
import { InstallBlock } from "@/components/docs/code-block";
import { SearchIcon } from "lucide-react";

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

const inputProps = [
  { prop: "placeholder", type: "string", default: "—", description: "Hint text" },
  { prop: "value", type: "string", default: "—", description: "Controlled value" },
  { prop: "defaultValue", type: "string", default: "—", description: "Initial value" },
  { prop: "label", type: "string", default: "—", description: "Field label" },
  { prop: "size", type: "sm | md | lg", default: "md", description: "Field scale" },
  { prop: "border", type: "boolean", default: "false", description: "Show outline" },
  { prop: "icon", type: "ReactNode", default: "—", description: "Trailing icon" },
  { prop: "iconPosition", type: "left | right", default: "right", description: "Icon side" },
  { prop: "error", type: "string", default: "—", description: "Error message" },
  { prop: "disabled", type: "boolean", default: "false", description: "Disable field" },
  { prop: "type", type: "text | password", default: "text", description: "Input type" },
  { prop: "name", type: "string", default: "—", description: "Field name" },
  { prop: "id", type: "string", default: "—", description: "Element id" },
  { prop: "onChange", type: "function", default: "—", description: "Change handler" },
  { prop: "className", type: "string", default: "—", description: "Extra classes" },
];

export default function InputDocsPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
          Components
        </p>
        <h1 className="text-3xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50 md:text-4xl">
          Input
        </h1>
        <p className="text-base leading-relaxed text-zinc-400">
          Compact text field with optional label, icon, and error state.
        </p>
      </header>

      <InstallBlock name="Input" />

      <PropSection name="placeholder" description="string — hint text">
        <Input placeholder="Email address" />
      </PropSection>

      <PropSection name="defaultValue" description="string — uncontrolled initial value">
        <Input defaultValue="hello@example.com" />
      </PropSection>

      <PropSection name="label" description="string — optional field label">
        <Input label="Email" placeholder="you@domain.com" />
      </PropSection>

      <PropSection name="size" description="sm · md · lg — default md">
        <Input size="sm" placeholder="Small" />
        <Input size="md" placeholder="Medium" />
        <Input size="lg" placeholder="Large" />
      </PropSection>

      <PropSection name="border" description="boolean — default false">
        <Input placeholder="No border" />
        <Input border placeholder="With border" />
      </PropSection>

      <PropSection name="icon" description="ReactNode — optional, right by default">
        <Input placeholder="Search" icon={<SearchIcon className="size-4" />} />
      </PropSection>

      <PropSection name="iconPosition" description="left · right — default right">
        <Input
          placeholder="Left icon"
          icon={<SearchIcon className="size-4" />}
          iconPosition="left"
        />
        <Input
          placeholder="Right icon"
          icon={<SearchIcon className="size-4" />}
          iconPosition="right"
        />
      </PropSection>

      <PropSection name="error" description="string — error message + red border">
        <Input
          label="Email"
          defaultValue="not-an-email"
          error="Invalid email"
        />
      </PropSection>

      <PropSection name="disabled" description="boolean — default false">
        <Input placeholder="Enabled" />
        <Input disabled placeholder="Disabled" defaultValue="Locked" />
      </PropSection>

      <PropSection name="type" description="text · password — default text">
        <Input type="text" placeholder="Text" />
        <Input type="password" placeholder="Password" defaultValue="secret" />
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
          rows={inputProps}
        />
      </section>
    </article>
  );
}
