"use client";

import { useEffect, useState } from "react";
import Progress from "@/components/progress";
import Table from "@/components/table";
import { InstallBlock } from "@/components/docs/code-block";
import { PropSection } from "@/components/docs/prop-section";

const props = [
  { prop: "value", type: "number", default: "0", description: "Current progress" },
  { prop: "max", type: "number", default: "100", description: "Maximum value" },
  { prop: "size", type: "sm | md | lg", default: "md", description: "Bar scale" },
  { prop: "tone", type: "neutral | success | warning | danger", default: "neutral", description: "Fill color" },
  { prop: "label", type: "ReactNode", default: "—", description: "Optional label" },
  { prop: "showValue", type: "boolean", default: "false", description: "Show percentage" },
  { prop: "indeterminate", type: "boolean", default: "false", description: "Left ↔ right loading sweep" },
  { prop: "className", type: "string", default: "—", description: "Extra classes" },
];

const imp = `import { Progress } from "@/components";`;

function AnimatedDemo() {
  const [value, setValue] = useState(12);

  useEffect(() => {
    const id = window.setInterval(() => {
      setValue((prev) => (prev >= 100 ? 0 : prev + 8));
    }, 500);
    return () => window.clearInterval(id);
  }, []);

  return <Progress label="Uploading…" showValue value={value} />;
}

export default function ProgressDocsPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
          Components
        </p>
        <h1 className="text-3xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50 md:text-4xl">
          Progress
        </h1>
        <p className="text-base leading-relaxed text-zinc-400">
          Linear progress indicator — determinate fill or a left ↔ right sweep.
        </p>
      </header>

      <InstallBlock name="Progress" />

      <PropSection
        name="value"
        description="number — current progress (0 → max)"
        code={`${imp}

<Progress value={40} />
<Progress value={75} />`}
      >
        <Progress value={40} />
        <Progress value={75} />
      </PropSection>

      <PropSection
        name="label / showValue"
        description="optional label + percentage"
        code={`${imp}

<Progress label="Storage" showValue value={62} />`}
      >
        <Progress label="Storage" showValue value={62} />
      </PropSection>

      <PropSection
        name="size"
        description="sm · md · lg — default md"
        stack
        codes={[
          `${imp}

<Progress size="sm" value={45} />`,
          `${imp}

<Progress size="md" value={45} />`,
          `${imp}

<Progress size="lg" value={45} />`,
        ]}
      >
        <Progress size="sm" label="sm" value={45} />
        <Progress size="md" label="md" value={45} />
        <Progress size="lg" label="lg" value={45} />
      </PropSection>

      <PropSection
        name="tone"
        description="neutral · success · warning · danger"
        code={`${imp}

<Progress tone="neutral" value={50} />
<Progress tone="success" value={50} />
<Progress tone="warning" value={50} />
<Progress tone="danger" value={50} />`}
      >
        <Progress label="Neutral" tone="neutral" value={50} />
        <Progress label="Success" tone="success" value={50} />
        <Progress label="Warning" tone="warning" value={50} />
        <Progress label="Danger" tone="danger" value={50} />
      </PropSection>

      <PropSection
        name="indeterminate"
        description="boolean — segment sweeps left ↔ right"
        code={`${imp}

<Progress label="Loading…" indeterminate />`}
      >
        <Progress label="Loading…" indeterminate />
      </PropSection>

      <PropSection
        name="live"
        description="value updates over time"
        code={`${imp}

const [value, setValue] = useState(12);

<Progress label="Uploading…" showValue value={value} />`}
      >
        <AnimatedDemo />
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
