"use client";

import Button from "@/components/button";
import Table from "@/components/table";
import Toast, { useToast } from "@/components/toast";
import { InstallBlock } from "@/components/docs/code-block";
import { PropSection } from "@/components/docs/prop-section";
import { SparklesIcon } from "lucide-react";

const toastProps = [
  { prop: "title", type: "string", default: "—", description: "Primary message" },
  { prop: "description", type: "string", default: "—", description: "Supporting text" },
  { prop: "tone", type: "neutral | success | warning | danger", default: "neutral", description: "Color tone" },
  { prop: "size", type: "sm | md | lg", default: "md", description: "Toast scale" },
  { prop: "loading", type: "boolean", default: "false", description: "Spinner + sticky" },
  { prop: "position", type: "ToastPosition", default: "bottom-right", description: "Stack corner / center" },
  { prop: "icon", type: "ReactNode", default: "—", description: "Override icon" },
  { prop: "duration", type: "number", default: "4000", description: "Auto-dismiss ms (0 = sticky)" },
  { prop: "onClose", type: "() => void", default: "—", description: "Close handler" },
  { prop: "className", type: "string", default: "—", description: "Extra classes" },
];

const hookProps = [
  { prop: "toast()", type: "(options) => id", default: "—", description: "Push a toast" },
  { prop: "update()", type: "(id, patch) => void", default: "—", description: "Swap a toast (exit + enter)" },
  { prop: "dismiss()", type: "(id) => void", default: "—", description: "Dismiss one" },
  { prop: "dismissAll()", type: "() => void", default: "—", description: "Clear stack" },
];

const imp = `import { Toast, ToastProvider, useToast } from "@/components";`;
const impBtn = `import { Button, useToast } from "@/components";`;

function TriggerDemo({
  label,
  options,
}: {
  label: string;
  options: Parameters<ReturnType<typeof useToast>["toast"]>[0];
}) {
  const { toast } = useToast();
  return (
    <Button
      size="sm"
      onClick={() => {
        toast(options);
      }}
    >
      {label}
    </Button>
  );
}

function LoadingDemo() {
  const { toast, update } = useToast();
  return (
    <Button
      size="sm"
      onClick={() => {
        const id = toast({
          title: "Uploading…",
          description: "Please wait.",
          loading: true,
        });
        window.setTimeout(() => {
          update(id, {
            loading: false,
            tone: "success",
            title: "Upload complete",
            description: "file.png is ready.",
            duration: 3000,
          });
        }, 2000);
      }}
    >
      Simulate upload
    </Button>
  );
}

export default function ToastDocsPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
          Components
        </p>
        <h1 className="text-3xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50 md:text-4xl">
          Toast
        </h1>
        <p className="text-base leading-relaxed text-zinc-400">
          Ephemeral notifications with tones, sizes, and a simple{" "}
          <code className="font-mono text-xs text-zinc-500">useToast</code> API.
        </p>
      </header>

      <InstallBlock name="Toast">
        <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          Wrap your app with{" "}
          <code className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono text-xs text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
            ToastProvider
          </code>{" "}
          once (already wired in this docs site).
        </p>
      </InstallBlock>

      <PropSection
        name="useToast"
        description="imperative API — push toasts from anywhere"
        code={`${impBtn}

function Example() {
  const { toast } = useToast();

  return (
    <Button
      onClick={() =>
        toast({
          title: "Saved",
          description: "Your changes are live.",
          tone: "success",
        })
      }
    >
      Show toast
    </Button>
  );
}`}
      >
        <TriggerDemo
          label="Show toast"
          options={{
            title: "Saved",
            description: "Your changes are live.",
            tone: "success",
          }}
        />
      </PropSection>

      <PropSection
        name="tone"
        description="neutral · success · warning · danger — default neutral"
        code={`${imp}

<Toast title="Update available" description="Version 1.2 is ready." />
<Toast tone="success" title="Payment received" description="Invoice #4821." />
<Toast tone="warning" title="Storage almost full" description="12% remaining." />
<Toast tone="danger" title="Sync failed" description="Check your connection." />`}
      >
        <div className="flex w-full max-w-sm flex-col gap-2">
          <Toast title="Update available" description="Version 1.2 is ready." />
          <Toast
            tone="success"
            title="Payment received"
            description="Invoice #4821."
          />
          <Toast
            tone="warning"
            title="Storage almost full"
            description="12% remaining."
          />
          <Toast
            tone="danger"
            title="Sync failed"
            description="Check your connection."
          />
        </div>
      </PropSection>

      <PropSection
        name="size"
        description="sm · md · lg — default md"
        stack
        codes={[
          `${imp}\n\n<Toast size="sm" title="Compact notice" />`,
          `${imp}\n\n<Toast size="md" title="Default notice" description="Supporting line." />`,
          `${imp}\n\n<Toast size="lg" title="Large notice" description="More breathing room." />`,
        ]}
      >
        <Toast size="sm" title="Compact notice" />
        <Toast size="md" title="Default notice" description="Supporting line." />
        <Toast size="lg" title="Large notice" description="More breathing room." />
      </PropSection>

      <PropSection
        name="description"
        description="string — optional supporting text"
        code={`${imp}

<Toast
  tone="success"
  title="Invite sent"
  description="We'll email them a magic link."
/>`}
      >
        <Toast
          tone="success"
          title="Invite sent"
          description="We'll email them a magic link."
        />
      </PropSection>

      <PropSection
        name="icon"
        description="ReactNode — overrides the default tone icon"
        code={`${imp}
import { SparklesIcon } from "lucide-react";

<Toast
  title="New feature"
  description="Toasts just landed."
  icon={<SparklesIcon />}
/>`}
      >
        <Toast
          title="New feature"
          description="Toasts just landed."
          icon={<SparklesIcon />}
        />
      </PropSection>

      <PropSection
        name="loading"
        description="boolean — spinner icon, stays until updated/dismissed"
        code={`${imp}

<Toast loading title="Uploading…" description="Please wait." />`}
      >
        <Toast loading title="Uploading…" description="Please wait." />
      </PropSection>

      <PropSection
        name="loading + update"
        description="dismisses the loading toast while the result pops in"
        code={`${impBtn}

const { toast, update } = useToast();

const id = toast({ title: "Uploading…", loading: true });

// later — loading exits, result enters
update(id, {
  loading: false,
  tone: "success",
  title: "Upload complete",
  duration: 3000,
});`}
      >
        <LoadingDemo />
      </PropSection>

      <PropSection
        name="position"
        description="top-left · top-center · top-right · bottom-left · bottom-center · bottom-right"
        code={`${impBtn}

toast({ title: "Top left", position: "top-left" });
toast({ title: "Top center", position: "top-center" });
toast({ title: "Top right", position: "top-right" });
toast({ title: "Bottom left", position: "bottom-left" });
toast({ title: "Bottom center", position: "bottom-center" });
toast({ title: "Bottom right", position: "bottom-right" });`}
      >
        <TriggerDemo
          label="Top left"
          options={{ title: "Top left", position: "top-left" }}
        />
        <TriggerDemo
          label="Top center"
          options={{ title: "Top center", position: "top-center" }}
        />
        <TriggerDemo
          label="Top right"
          options={{ title: "Top right", position: "top-right" }}
        />
        <TriggerDemo
          label="Bottom left"
          options={{ title: "Bottom left", position: "bottom-left" }}
        />
        <TriggerDemo
          label="Bottom center"
          options={{ title: "Bottom center", position: "bottom-center" }}
        />
        <TriggerDemo
          label="Bottom right"
          options={{ title: "Bottom right", position: "bottom-right" }}
        />
      </PropSection>

      <PropSection
        name="duration"
        description="number — auto-dismiss ms, 0 stays until closed"
        code={`${impBtn}

const { toast } = useToast();

toast({ title: "Sticky", duration: 0 });
toast({ title: "Quick", duration: 1500 });`}
      >
        <TriggerDemo label="Sticky (0)" options={{ title: "Sticky toast", duration: 0 }} />
        <TriggerDemo
          label="Quick (1.5s)"
          options={{ title: "Quick toast", duration: 1500 }}
        />
      </PropSection>

      <section className="space-y-4">
        <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
          Toast props
        </h2>
        <Table
          columns={[
            { key: "prop", header: "Prop", mono: true },
            { key: "type", header: "Type", mono: true },
            { key: "default", header: "Default", mono: true },
            { key: "description", header: "Description" },
          ]}
          rows={toastProps}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
          useToast
        </h2>
        <Table
          columns={[
            { key: "prop", header: "API", mono: true },
            { key: "type", header: "Type", mono: true },
            { key: "default", header: "Default", mono: true },
            { key: "description", header: "Description" },
          ]}
          rows={hookProps}
        />
      </section>
    </article>
  );
}
