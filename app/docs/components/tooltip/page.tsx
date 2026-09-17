import Button from "@/components/button";
import Table from "@/components/table";
import Tooltip from "@/components/tooltip";
import { InstallBlock } from "@/components/docs/code-block";
import { PropSection } from "@/components/docs/prop-section";
import { InfoIcon, SaveIcon } from "lucide-react";

const props = [
  { prop: "content", type: "ReactNode", default: "—", description: "Tooltip label" },
  { prop: "children", type: "ReactNode", default: "—", description: "Trigger element" },
  { prop: "side", type: "top | bottom | left | right", default: "top", description: "Placement" },
  { prop: "size", type: "sm | md | lg", default: "md", description: "Bubble scale" },
  { prop: "delay", type: "number", default: "200", description: "Open delay (ms)" },
  { prop: "disabled", type: "boolean", default: "false", description: "Disable tooltip" },
  { prop: "className", type: "string", default: "—", description: "Trigger wrapper classes" },
  { prop: "contentClassName", type: "string", default: "—", description: "Bubble classes" },
];

const imp = `import { Tooltip, Button } from "@/components";
import { SaveIcon } from "lucide-react";`;
const impIcon = `import { Tooltip, Button } from "@/components";
import { InfoIcon } from "lucide-react";`;

export default function TooltipDocsPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
          Components
        </p>
        <h1 className="text-3xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50 md:text-4xl">
          Tooltip
        </h1>
        <p className="text-base leading-relaxed text-zinc-400">
          Lightweight hover/focus hint with placement and size.
        </p>
      </header>

      <InstallBlock name="Tooltip" />

      <PropSection
        name="content"
        description="ReactNode — the tooltip label"
        code={`${imp}

<Tooltip content="Save">
  <Button iconOnly icon={<SaveIcon />} aria-label="Save" />
</Tooltip>`}
      >
        <Tooltip content="Save">
          <Button
            iconOnly
            icon={<SaveIcon className="size-4" />}
            aria-label="Save"
          />
        </Tooltip>
      </PropSection>

      <PropSection
        name="side"
        description="top · bottom · left · right — default top"
        code={`${imp}

<Tooltip content="Top" side="top"><Button size="sm">Top</Button></Tooltip>
<Tooltip content="Bottom" side="bottom"><Button size="sm">Bottom</Button></Tooltip>
<Tooltip content="Left" side="left"><Button size="sm">Left</Button></Tooltip>
<Tooltip content="Right" side="right"><Button size="sm">Right</Button></Tooltip>`}
        codes={[
          `${imp}

<Tooltip content="Top" side="top">
  <Button size="sm">Top</Button>
</Tooltip>`,
          `${imp}

<Tooltip content="Bottom" side="bottom">
  <Button size="sm">Bottom</Button>
</Tooltip>`,
          `${imp}

<Tooltip content="Left" side="left">
  <Button size="sm">Left</Button>
</Tooltip>`,
          `${imp}

<Tooltip content="Right" side="right">
  <Button size="sm">Right</Button>
</Tooltip>`,
        ]}
        stack
      >
        <Tooltip content="Top" side="top">
          <Button size="sm" style="secondary">
            Top
          </Button>
        </Tooltip>
        <Tooltip content="Bottom" side="bottom">
          <Button size="sm" style="secondary">
            Bottom
          </Button>
        </Tooltip>
        <Tooltip content="Left" side="left">
          <Button size="sm" style="secondary">
            Left
          </Button>
        </Tooltip>
        <Tooltip content="Right" side="right">
          <Button size="sm" style="secondary">
            Right
          </Button>
        </Tooltip>
      </PropSection>

      <PropSection
        name="size"
        description="sm · md · lg — default md"
        code={`${imp}

<Tooltip content="Small" size="sm"><Button size="sm">sm</Button></Tooltip>
<Tooltip content="Medium" size="md"><Button size="sm">md</Button></Tooltip>
<Tooltip content="Large" size="lg"><Button size="sm">lg</Button></Tooltip>`}
      >
        <Tooltip content="Small tip" size="sm">
          <Button size="sm" style="secondary">
            sm
          </Button>
        </Tooltip>
        <Tooltip content="Medium tip" size="md">
          <Button size="sm" style="secondary">
            md
          </Button>
        </Tooltip>
        <Tooltip content="Large tip with a bit more room" size="lg">
          <Button size="sm" style="secondary">
            lg
          </Button>
        </Tooltip>
      </PropSection>

      <PropSection
        name="delay"
        description="number — open delay in ms, default 200"
        code={`${imp}

<Tooltip content="Instant" delay={0}>
  <Button size="sm">0ms</Button>
</Tooltip>
<Tooltip content="Slower" delay={600}>
  <Button size="sm">600ms</Button>
</Tooltip>`}
      >
        <Tooltip content="Instant" delay={0}>
          <Button size="sm" style="secondary">
            0ms
          </Button>
        </Tooltip>
        <Tooltip content="Slower" delay={600}>
          <Button size="sm" style="secondary">
            600ms
          </Button>
        </Tooltip>
      </PropSection>

      <PropSection
        name="icon trigger"
        description="works on icon-only buttons too"
        code={`${impIcon}

<Tooltip content="More information">
  <Button
    size="sm"
    style="secondary"
    iconOnly
    icon={<InfoIcon />}
    aria-label="Info"
  />
</Tooltip>`}
      >
        <Tooltip content="More information">
          <Button
            size="sm"
            style="secondary"
            iconOnly
            icon={<InfoIcon className="size-4" />}
            aria-label="Info"
          />
        </Tooltip>
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
