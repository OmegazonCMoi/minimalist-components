import Demo from "@/components/demo";
import Select from "@/components/select";
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

const fruitOptions = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry" },
];

const countryOptions = [
  { label: "France", value: "fr" },
  { label: "Germany", value: "de" },
  { label: "Japan", value: "jp" },
  { label: "United States", value: "us" },
];

const selectProps = [
  { prop: "options", type: "SelectOption[]", default: "—", description: "List of choices" },
  { prop: "placeholder", type: "string", default: "—", description: "Hint when empty" },
  { prop: "value", type: "string", default: "—", description: "Controlled value" },
  { prop: "defaultValue", type: "string", default: "—", description: "Initial value" },
  { prop: "label", type: "string", default: "—", description: "Field label" },
  { prop: "size", type: "sm | md | lg", default: "md", description: "Field scale" },
  { prop: "border", type: "boolean", default: "false", description: "Show outline" },
  { prop: "error", type: "string", default: "—", description: "Error message" },
  { prop: "disabled", type: "boolean", default: "false", description: "Disable field" },
  { prop: "name", type: "string", default: "—", description: "Field name" },
  { prop: "id", type: "string", default: "—", description: "Element id" },
  { prop: "onChange", type: "(value: string) => void", default: "—", description: "Change handler" },
  { prop: "className", type: "string", default: "—", description: "Extra classes" },
];

export default function SelectDocsPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
          Components
        </p>
        <h1 className="text-3xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50 md:text-4xl">
          Select
        </h1>
        <p className="text-base leading-relaxed text-zinc-400">
          Custom listbox select — same look on Safari, Chrome, and Firefox.
        </p>
      </header>

      <InstallBlock name="Select" />

      <PropSection name="options" description="SelectOption[] — required choices">
        <Select options={fruitOptions} defaultValue="apple" />
      </PropSection>

      <PropSection name="placeholder" description="string — disabled empty option">
        <Select options={fruitOptions} placeholder="Pick a fruit" />
      </PropSection>

      <PropSection name="defaultValue" description="string — uncontrolled initial value">
        <Select options={countryOptions} defaultValue="fr" />
      </PropSection>

      <PropSection name="label" description="string — optional field label">
        <Select
          label="Country"
          options={countryOptions}
          placeholder="Select a country"
        />
      </PropSection>

      <PropSection name="size" description="sm · md · lg — default md">
        <Select size="sm" options={fruitOptions} placeholder="Small" />
        <Select size="md" options={fruitOptions} placeholder="Medium" />
        <Select size="lg" options={fruitOptions} placeholder="Large" />
      </PropSection>

      <PropSection name="border" description="boolean — default false">
        <Select options={fruitOptions} placeholder="No border" />
        <Select border options={fruitOptions} placeholder="With border" />
      </PropSection>

      <PropSection name="error" description="string — error message + red border">
        <Select
          label="Plan"
          options={[
            { label: "Free", value: "free" },
            { label: "Pro", value: "pro" },
          ]}
          defaultValue="free"
          error="Upgrade required"
        />
      </PropSection>

      <PropSection name="disabled" description="boolean — default false">
        <Select options={fruitOptions} placeholder="Enabled" />
        <Select
          disabled
          options={fruitOptions}
          defaultValue="banana"
        />
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
          rows={selectProps}
        />
      </section>
    </article>
  );
}
