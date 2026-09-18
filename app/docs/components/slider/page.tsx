"use client";

import { useState } from "react";
import Slider from "@/components/slider";
import Table from "@/components/table";
import { InstallBlock } from "@/components/docs/code-block";
import { PropSection } from "@/components/docs/prop-section";

const props = [
  { prop: "label", type: "ReactNode", default: "—", description: "Field label" },
  { prop: "showValue", type: "boolean", default: "false", description: "Show current value" },
  { prop: "size", type: "sm | md | lg", default: "md", description: "Control scale" },
  { prop: "value", type: "number", default: "—", description: "Controlled value" },
  { prop: "defaultValue", type: "number", default: "min", description: "Initial value" },
  { prop: "min", type: "number", default: "0", description: "Minimum" },
  { prop: "max", type: "number", default: "100", description: "Maximum" },
  { prop: "step", type: "number", default: "1", description: "Increment" },
  { prop: "error", type: "string", default: "—", description: "Error message" },
  { prop: "disabled", type: "boolean", default: "false", description: "Disable control" },
  { prop: "name", type: "string", default: "—", description: "Hidden input name" },
  { prop: "onChange", type: "(value) => void", default: "—", description: "Change handler" },
  { prop: "className", type: "string", default: "—", description: "Extra classes" },
];

const imp = `import { Slider } from "@/components";`;

function ControlledDemo() {
  const [value, setValue] = useState(40);
  return (
    <Slider
      label="Volume"
      showValue
      value={value}
      onChange={setValue}
    />
  );
}

export default function SliderDocsPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
          Components
        </p>
        <h1 className="text-3xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50 md:text-4xl">
          Slider
        </h1>
        <p className="text-base leading-relaxed text-zinc-400">
          Range control for numeric values.
        </p>
      </header>

      <InstallBlock name="Slider" />

      <PropSection
        name="label"
        description="ReactNode — optional text"
        code={`${imp}

<Slider label="Volume" defaultValue={40} />`}
      >
        <Slider label="Volume" defaultValue={40} />
      </PropSection>

      <PropSection
        name="showValue"
        description="boolean — current value next to the label"
        code={`${imp}

<Slider label="Brightness" showValue defaultValue={70} />`}
      >
        <Slider label="Brightness" showValue defaultValue={70} />
      </PropSection>

      <PropSection
        name="size"
        description="sm · md · lg — default md"
        stack
        codes={[
          `${imp}

<Slider size="sm" label="Small" defaultValue={30} />`,
          `${imp}

<Slider size="md" label="Medium" defaultValue={50} />`,
          `${imp}

<Slider size="lg" label="Large" defaultValue={70} />`,
        ]}
      >
        <Slider size="sm" label="Small" defaultValue={30} />
        <Slider size="md" label="Medium" defaultValue={50} />
        <Slider size="lg" label="Large" defaultValue={70} />
      </PropSection>

      <PropSection
        name="min / max / step"
        description="numeric range bounds"
        code={`${imp}

<Slider
  label="Opacity"
  showValue
  min={0}
  max={1}
  step={0.1}
  defaultValue={0.5}
/>`}
      >
        <Slider
          label="Opacity"
          showValue
          min={0}
          max={1}
          step={0.1}
          defaultValue={0.5}
        />
      </PropSection>

      <PropSection
        name="value / onChange"
        description="controlled mode"
        code={`${imp}

const [value, setValue] = useState(40);

<Slider
  label="Volume"
  showValue
  value={value}
  onChange={setValue}
/>`}
      >
        <ControlledDemo />
      </PropSection>

      <PropSection
        name="error"
        description="string — error message + red state"
        code={`${imp}

<Slider label="Amount" error="Out of range" defaultValue={20} />`}
      >
        <Slider label="Amount" error="Out of range" defaultValue={20} />
      </PropSection>

      <PropSection
        name="disabled"
        description="boolean — default false"
        code={`${imp}

<Slider label="Enabled" defaultValue={50} />
<Slider label="Disabled" disabled defaultValue={50} />`}
      >
        <Slider label="Disabled" disabled defaultValue={50} />
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
