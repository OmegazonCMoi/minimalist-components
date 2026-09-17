import Button from "@/components/button";
import Table from "@/components/table";
import { InstallBlock } from "@/components/docs/code-block";
import { PropSection } from "@/components/docs/prop-section";
import { ArrowRightIcon, SearchIcon } from "lucide-react";

const buttonProps = [
  { prop: "children", type: "ReactNode", default: "—", description: "Button content" },
  { prop: "href", type: "string", default: "—", description: "Link destination" },
  { prop: "variant", type: "solid | outline | ghost", default: "solid", description: "Visual style" },
  { prop: "size", type: "sm | md | lg", default: "md", description: "Button scale" },
  { prop: "border", type: "boolean", default: "false", description: "Show outline" },
  { prop: "icon", type: "ReactNode", default: "—", description: "Trailing icon" },
  { prop: "iconPosition", type: "left | right", default: "right", description: "Icon side" },
  { prop: "iconOnly", type: "boolean", default: "false", description: "Icon button" },
  { prop: "disabled", type: "boolean", default: "false", description: "Disable interaction" },
  { prop: "type", type: "button | submit | reset", default: "button", description: "Native type" },
  { prop: "onClick", type: "function", default: "—", description: "Click handler" },
  { prop: "className", type: "string", default: "—", description: "Extra classes" },
  { prop: "target", type: "string", default: "—", description: "Link target" },
  { prop: "rel", type: "string", default: "—", description: "Link rel" },
];

const imp = `import { Button } from "@/components";`;
const impArrow = `import { Button } from "@/components";
import { ArrowRightIcon } from "lucide-react";`;
const impIcons = `import { Button } from "@/components";
import { ArrowRightIcon, SearchIcon } from "lucide-react";`;

export default function ButtonDocsPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
          Components
        </p>
        <h1 className="text-3xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50 md:text-4xl">
          Button
        </h1>
        <p className="text-base leading-relaxed text-zinc-400">
          Compact action control with optional link, border, and icon.
        </p>
      </header>

      <InstallBlock name="Button" />

      <PropSection
        name="variant"
        description="solid · outline · ghost — default solid"
        code={`${imp}

<Button variant="solid">Solid</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>`}
      >
        <Button variant="solid">Solid</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
      </PropSection>

      <PropSection
        name="size"
        description="sm · md · lg — default md"
        code={`${imp}

<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`}
      >
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </PropSection>

      <PropSection
        name="border"
        description="boolean — default false"
        code={`${imp}

<Button border={false}>No border</Button>
<Button border>With border</Button>`}
      >
        <Button border={false}>No border</Button>
        <Button border>With border</Button>
      </PropSection>

      <PropSection
        name="icon"
        description="ReactNode — optional, rendered on the right by default"
        code={`${impArrow}

<Button>No icon</Button>
<Button icon={<ArrowRightIcon />}>With icon</Button>`}
      >
        <Button>No icon</Button>
        <Button icon={<ArrowRightIcon className="size-4" />}>With icon</Button>
      </PropSection>

      <PropSection
        name="iconPosition"
        description="left · right — default right"
        code={`${impArrow}

<Button icon={<ArrowRightIcon />} iconPosition="left">Left</Button>
<Button icon={<ArrowRightIcon />} iconPosition="right">Right</Button>`}
      >
        <Button icon={<ArrowRightIcon className="size-4" />} iconPosition="left">
          Left
        </Button>
        <Button icon={<ArrowRightIcon className="size-4" />} iconPosition="right">
          Right
        </Button>
      </PropSection>

      <PropSection
        name="iconOnly"
        description="boolean — square icon button, default false"
        code={`${impIcons}

<Button iconOnly icon={<SearchIcon />} aria-label="Search" />
<Button iconOnly size="sm" border icon={<ArrowRightIcon />} aria-label="Next" />
<Button iconOnly size="lg" variant="ghost" icon={<SearchIcon />} aria-label="Search large" />`}
      >
        <Button iconOnly icon={<SearchIcon className="size-4" />} aria-label="Search" />
        <Button
          iconOnly
          size="sm"
          border
          icon={<ArrowRightIcon className="size-4" />}
          aria-label="Next"
        />
        <Button
          iconOnly
          size="lg"
          variant="ghost"
          icon={<SearchIcon className="size-4" />}
          aria-label="Search large"
        />
      </PropSection>

      <PropSection
        name="disabled"
        description="boolean — default false"
        code={`${imp}

<Button>Enabled</Button>
<Button disabled>Disabled</Button>`}
      >
        <Button>Enabled</Button>
        <Button disabled>Disabled</Button>
      </PropSection>

      <PropSection
        name="href"
        description="string — renders a Next.js Link when set"
        code={`${imp}

<Button>Button</Button>
<Button href="/docs">Link</Button>`}
      >
        <Button>Button</Button>
        <Button href="/docs">Link</Button>
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
          rows={buttonProps}
        />
      </section>
    </article>
  );
}
