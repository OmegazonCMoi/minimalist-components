import Table from "@/components/table";
import Collapsible, {
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/collapsible";
import { InstallBlock } from "@/components/docs/code-block";
import { PropSection } from "@/components/docs/prop-section";

const props = [
  { prop: "open", type: "boolean", default: "—", description: "Controlled open state" },
  { prop: "defaultOpen", type: "boolean", default: "false", description: "Initial open (uncontrolled)" },
  { prop: "onOpenChange", type: "(open) => void", default: "—", description: "Open change callback" },
  { prop: "surface", type: "boolean", default: "false", description: "Soft background panel" },
  { prop: "border", type: "boolean", default: "false", description: "Show outline" },
  { prop: "size", type: "sm | md | lg", default: "md", description: "Padding / type scale" },
  { prop: "disabled", type: "boolean", default: "false", description: "Disable toggle" },
  { prop: "className", type: "string", default: "—", description: "Root classes" },
  { prop: "hideIcon", type: "boolean", default: "false", description: "Trigger — hide chevron" },
];

const imp = `import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components";`;

export default function CollapsibleDocsPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
          Components
        </p>
        <h1 className="text-3xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50 md:text-4xl">
          Collapsible
        </h1>
        <p className="text-base leading-relaxed text-zinc-400">
          Animated disclosure for sidebars, order details, FAQs, and section
          groups.
        </p>
      </header>

      <InstallBlock name="Collapsible">
        <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          Also export{" "}
          <code className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono text-xs text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
            CollapsibleTrigger
          </code>{" "}
          and{" "}
          <code className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono text-xs text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
            CollapsibleContent
          </code>
          .
        </p>
      </InstallBlock>

      <PropSection
        name="default"
        description="trigger + animated content panel"
        code={`${imp}

<Collapsible>
  <CollapsibleTrigger>Shipping address</CollapsibleTrigger>
  <CollapsibleContent>
    221B Baker Street, London
  </CollapsibleContent>
</Collapsible>`}
      >
        <div className="w-full max-w-sm">
          <Collapsible>
            <CollapsibleTrigger>Shipping address</CollapsibleTrigger>
            <CollapsibleContent>
              221B Baker Street, London NW1 6XE
            </CollapsibleContent>
          </Collapsible>
        </div>
      </PropSection>

      <PropSection
        name="defaultOpen"
        description="boolean — start expanded"
        code={`${imp}

<Collapsible defaultOpen>
  <CollapsibleTrigger>Order summary</CollapsibleTrigger>
  <CollapsibleContent>
    Subtotal $48 · Shipping $4 · Total $52
  </CollapsibleContent>
</Collapsible>`}
      >
        <div className="w-full max-w-sm">
          <Collapsible defaultOpen>
            <CollapsibleTrigger>Order summary</CollapsibleTrigger>
            <CollapsibleContent>
              Subtotal $48 · Shipping $4 · Total $52
            </CollapsibleContent>
          </Collapsible>
        </div>
      </PropSection>

      <PropSection
        name="surface"
        description="boolean — soft background — default false"
        code={`${imp}

<Collapsible surface defaultOpen>
  <CollapsibleTrigger>Order info</CollapsibleTrigger>
  <CollapsibleContent>
    Placed today · Estimated Fri
  </CollapsibleContent>
</Collapsible>`}
      >
        <div className="w-full max-w-sm">
          <Collapsible surface defaultOpen>
            <CollapsibleTrigger>Order info</CollapsibleTrigger>
            <CollapsibleContent>
              Placed today · Estimated Fri
            </CollapsibleContent>
          </Collapsible>
        </div>
      </PropSection>

      <PropSection
        name="border"
        description="boolean — default false"
        code={`${imp}

<Collapsible border>
  <CollapsibleTrigger>Payment</CollapsibleTrigger>
  <CollapsibleContent>Visa ···· 4242</CollapsibleContent>
</Collapsible>
<Collapsible surface border defaultOpen>
  <CollapsibleTrigger>Shipping</CollapsibleTrigger>
  <CollapsibleContent>221B Baker Street</CollapsibleContent>
</Collapsible>`}
      >
        <div className="flex w-full max-w-sm flex-col gap-3">
          <Collapsible surface border defaultOpen>
            <CollapsibleTrigger>Shipping</CollapsibleTrigger>
            <CollapsibleContent>221B Baker Street</CollapsibleContent>
          </Collapsible>
        </div>
      </PropSection>

      <PropSection
        name="size"
        description="sm · md · lg — frame padding + type (default md)"
        stack
        codes={[
          `${imp}

<Collapsible surface border size="sm" defaultOpen>
  <CollapsibleTrigger>Order #1042</CollapsibleTrigger>
  <CollapsibleContent>Subtotal $48 · Total $52</CollapsibleContent>
</Collapsible>`,
          `${imp}

<Collapsible surface border size="md" defaultOpen>
  <CollapsibleTrigger>Order #1042</CollapsibleTrigger>
  <CollapsibleContent>Subtotal $48 · Total $52</CollapsibleContent>
</Collapsible>`,
          `${imp}

<Collapsible surface border size="lg" defaultOpen>
  <CollapsibleTrigger>Order #1042</CollapsibleTrigger>
  <CollapsibleContent>Subtotal $48 · Total $52</CollapsibleContent>
</Collapsible>`,
        ]}
      >
        <Collapsible surface border size="sm" defaultOpen className="w-full max-w-sm">
          <CollapsibleTrigger>Order #1042</CollapsibleTrigger>
          <CollapsibleContent>Subtotal $48 · Total $52</CollapsibleContent>
        </Collapsible>
        <Collapsible surface border size="md" defaultOpen className="w-full max-w-sm">
          <CollapsibleTrigger>Order #1042</CollapsibleTrigger>
          <CollapsibleContent>Subtotal $48 · Total $52</CollapsibleContent>
        </Collapsible>
        <Collapsible surface border size="lg" defaultOpen className="w-full max-w-sm">
          <CollapsibleTrigger>Order #1042</CollapsibleTrigger>
          <CollapsibleContent>Subtotal $48 · Total $52</CollapsibleContent>
        </Collapsible>
      </PropSection>

      <PropSection
        name="sections"
        description="stack several panels — sidebar / FAQ style"
        code={`${imp}

<div className="w-full max-w-sm space-y-2">
  <Collapsible surface border defaultOpen>
    <CollapsibleTrigger>Catalog</CollapsibleTrigger>
    <CollapsibleContent>…</CollapsibleContent>
  </Collapsible>
  <Collapsible surface border>
    <CollapsibleTrigger>Filters</CollapsibleTrigger>
    <CollapsibleContent>Size · Color · Price</CollapsibleContent>
  </Collapsible>
</div>`}
      >
        <div className="w-full max-w-sm space-y-2">
          <Collapsible surface border defaultOpen>
            <CollapsibleTrigger>Catalog</CollapsibleTrigger>
            <CollapsibleContent>
              <ul className="space-y-1">
                <li>All products</li>
                <li>New arrivals</li>
                <li>Bestsellers</li>
              </ul>
            </CollapsibleContent>
          </Collapsible>
          <Collapsible surface border>
            <CollapsibleTrigger>Filters</CollapsibleTrigger>
            <CollapsibleContent>Size · Color · Price</CollapsibleContent>
          </Collapsible>
          <Collapsible surface border>
            <CollapsibleTrigger>Help</CollapsibleTrigger>
            <CollapsibleContent>
              Shipping takes 2–4 business days.
            </CollapsibleContent>
          </Collapsible>
        </div>
      </PropSection>

      <PropSection
        name="hideIcon"
        description="boolean — trigger without chevron"
        code={`${imp}

<Collapsible surface border>
  <CollapsibleTrigger hideIcon>Details</CollapsibleTrigger>
  <CollapsibleContent>Extra line items and notes.</CollapsibleContent>
</Collapsible>`}
      >
        <div className="w-full max-w-sm">
          <Collapsible surface border>
            <CollapsibleTrigger hideIcon>Details</CollapsibleTrigger>
            <CollapsibleContent>Extra line items and notes.</CollapsibleContent>
          </Collapsible>
        </div>
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
