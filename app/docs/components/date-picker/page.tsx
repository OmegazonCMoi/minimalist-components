import DatePicker from "@/components/date-picker";
import Table from "@/components/table";
import { InstallBlock } from "@/components/docs/code-block";
import { PropSection } from "@/components/docs/prop-section";

const datePickerProps = [
  { prop: "value", type: "string", default: "—", description: "Controlled ISO date" },
  { prop: "defaultValue", type: "string", default: "—", description: "Initial ISO date" },
  { prop: "placeholder", type: "string", default: "Pick a date", description: "Hint when empty" },
  { prop: "label", type: "string", default: "—", description: "Field label" },
  { prop: "size", type: "sm | md | lg", default: "md", description: "Field scale" },
  { prop: "border", type: "boolean", default: "false", description: "Show outline" },
  { prop: "min", type: "string", default: "—", description: "Min ISO date" },
  { prop: "max", type: "string", default: "—", description: "Max ISO date" },
  { prop: "locale", type: "string", default: "—", description: "Display locale" },
  { prop: "error", type: "string", default: "—", description: "Error message" },
  { prop: "disabled", type: "boolean", default: "false", description: "Disable field" },
  { prop: "name", type: "string", default: "—", description: "Field name" },
  { prop: "id", type: "string", default: "—", description: "Element id" },
  { prop: "onChange", type: "(value: string) => void", default: "—", description: "Change handler" },
  { prop: "className", type: "string", default: "—", description: "Extra classes" },
];

const imp = `import { DatePicker } from "@/components";`;

export default function DatePickerDocsPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
          Components
        </p>
        <h1 className="text-3xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50 md:text-4xl">
          DatePicker
        </h1>
        <p className="text-base leading-relaxed text-zinc-400">
          Custom calendar picker — ISO values, animated popover, same look everywhere.
        </p>
      </header>

      <InstallBlock name="DatePicker" />

      <PropSection
        name="placeholder"
        description="string — hint when empty"
        code={`${imp}

<DatePicker placeholder="Pick a date" />`}
      >
        <DatePicker placeholder="Pick a date" />
      </PropSection>

      <PropSection
        name="defaultValue"
        description="string — ISO YYYY-MM-DD"
        code={`${imp}

<DatePicker defaultValue="2026-09-16" />`}
      >
        <DatePicker defaultValue="2026-09-16" />
      </PropSection>

      <PropSection
        name="label"
        description="string — optional field label"
        code={`${imp}

<DatePicker label="Departure" placeholder="Select date" />`}
      >
        <DatePicker label="Departure" placeholder="Select date" />
      </PropSection>

      <PropSection
        name="size"
        description="sm · md · lg — default md"
        code={`${imp}

<DatePicker size="sm" placeholder="Small" />
<DatePicker size="md" placeholder="Medium" />
<DatePicker size="lg" placeholder="Large" />`}
      >
        <DatePicker size="sm" placeholder="Small" />
        <DatePicker size="md" placeholder="Medium" />
        <DatePicker size="lg" placeholder="Large" />
      </PropSection>

      <PropSection
        name="border"
        description="boolean — default false"
        code={`${imp}

<DatePicker placeholder="No border" />
<DatePicker border placeholder="With border" />`}
      >
        <DatePicker placeholder="No border" />
        <DatePicker border placeholder="With border" />
      </PropSection>

      <PropSection
        name="min / max"
        description="string — ISO bounds"
        code={`${imp}

<DatePicker
  label="Booking"
  min="2026-09-01"
  max="2026-09-30"
  placeholder="September only"
/>`}
      >
        <DatePicker
          label="Booking"
          min="2026-09-01"
          max="2026-09-30"
          placeholder="September only"
        />
      </PropSection>

      <PropSection
        name="locale"
        description="string — display formatting"
        code={`${imp}

<DatePicker locale="fr-FR" defaultValue="2026-09-16" />
<DatePicker locale="en-US" defaultValue="2026-09-16" />`}
      >
        <DatePicker locale="fr-FR" defaultValue="2026-09-16" />
        <DatePicker locale="en-US" defaultValue="2026-09-16" />
      </PropSection>

      <PropSection
        name="error"
        description="string — error message + red border"
        code={`${imp}

<DatePicker
  label="Deadline"
  defaultValue="2020-01-01"
  error="Date is in the past"
/>`}
      >
        <DatePicker
          label="Deadline"
          defaultValue="2020-01-01"
          error="Date is in the past"
        />
      </PropSection>

      <PropSection
        name="disabled"
        description="boolean — default false"
        code={`${imp}

<DatePicker placeholder="Enabled" />
<DatePicker disabled defaultValue="2026-09-16" />`}
      >
        <DatePicker placeholder="Enabled" />
        <DatePicker disabled defaultValue="2026-09-16" />
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
          rows={datePickerProps}
        />
      </section>
    </article>
  );
}
