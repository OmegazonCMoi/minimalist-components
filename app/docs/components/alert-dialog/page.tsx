"use client";

import { useState } from "react";
import AlertDialog from "@/components/alert-dialog";
import Button from "@/components/button";
import Table from "@/components/table";
import { InstallBlock } from "@/components/docs/code-block";
import { PropSection } from "@/components/docs/prop-section";

const props = [
  { prop: "title", type: "string", default: "—", description: "Dialog heading" },
  { prop: "description", type: "string", default: "—", description: "Supporting text" },
  { prop: "children", type: "ReactNode", default: "—", description: "Trigger element" },
  { prop: "open", type: "boolean", default: "—", description: "Controlled open" },
  { prop: "defaultOpen", type: "boolean", default: "false", description: "Uncontrolled initial" },
  { prop: "onOpenChange", type: "(open) => void", default: "—", description: "Open state callback" },
  { prop: "tone", type: "neutral | danger | warning", default: "neutral", description: "Confirm button style" },
  { prop: "cancelLabel", type: "string", default: "Cancel", description: "Cancel button label" },
  { prop: "confirmLabel", type: "string", default: "Continue", description: "Confirm button label" },
  { prop: "hideCancel", type: "boolean", default: "false", description: "Hide cancel button" },
  { prop: "onConfirm", type: "() => void", default: "—", description: "Confirm handler" },
  { prop: "onCancel", type: "() => void", default: "—", description: "Cancel / Escape handler" },
  { prop: "className", type: "string", default: "—", description: "Panel classes" },
];

const imp = `import { AlertDialog, Button } from "@/components";`;

function BasicDemo() {
  return (
    <AlertDialog
      title="Are you sure?"
      description="This will apply the change immediately."
      confirmLabel="Confirm"
    >
      <Button size="sm" style="secondary" border>
        Open dialog
      </Button>
    </AlertDialog>
  );
}

function ToneDemo({
  tone,
  label,
}: {
  tone: "neutral" | "danger" | "warning";
  label: string;
}) {
  return (
    <AlertDialog
      title={
        tone === "danger"
          ? "Delete project?"
          : tone === "warning"
            ? "Overwrite file?"
            : "Continue?"
      }
      description={
        tone === "danger"
          ? "This action cannot be undone. All data will be lost."
          : tone === "warning"
            ? "Existing content will be replaced."
            : "You can come back to this later."
      }
      tone={tone}
      confirmLabel={
        tone === "danger" ? "Delete" : tone === "warning" ? "Overwrite" : "Continue"
      }
    >
      <Button
        size="sm"
        style={tone === "neutral" ? "secondary" : tone}
        border={tone === "neutral"}
      >
        {label}
      </Button>
    </AlertDialog>
  );
}

function ControlledDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button size="sm" style="secondary" border onClick={() => setOpen(true)}>
        Controlled open
      </Button>
      <AlertDialog
        open={open}
        onOpenChange={setOpen}
        title="Discard draft?"
        description="Unsaved changes will be lost."
        tone="warning"
        confirmLabel="Discard"
        onConfirm={() => setOpen(false)}
      />
    </>
  );
}

export default function AlertDialogDocsPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
          Components
        </p>
        <h1 className="text-3xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50 md:text-4xl">
          Alert Dialog
        </h1>
        <p className="text-base leading-relaxed text-zinc-400">
          Modal confirmation for destructive or important actions.
        </p>
      </header>

      <InstallBlock name="AlertDialog" />

      <PropSection
        name="basic"
        description="trigger + title + description"
        code={`${imp}

<AlertDialog
  title="Are you sure?"
  description="This will apply the change immediately."
  confirmLabel="Confirm"
>
  <Button size="sm">Open dialog</Button>
</AlertDialog>`}
      >
        <BasicDemo />
      </PropSection>

      <PropSection
        name="tone"
        description="neutral · danger · warning — confirm button style"
        stack
        codes={[
          `${imp}

<AlertDialog title="Continue?" tone="neutral" confirmLabel="Continue">
  <Button size="sm">Neutral</Button>
</AlertDialog>`,
          `${imp}

<AlertDialog
  title="Delete project?"
  description="This action cannot be undone."
  tone="danger"
  confirmLabel="Delete"
>
  <Button size="sm" style="danger">Danger</Button>
</AlertDialog>`,
          `${imp}

<AlertDialog
  title="Overwrite file?"
  description="Existing content will be replaced."
  tone="warning"
  confirmLabel="Overwrite"
>
  <Button size="sm" style="warning">Warning</Button>
</AlertDialog>`,
        ]}
      >
        <ToneDemo tone="neutral" label="Neutral" />
        <ToneDemo tone="danger" label="Danger" />
        <ToneDemo tone="warning" label="Warning" />
      </PropSection>

      <PropSection
        name="open / onOpenChange"
        description="controlled mode without a wrapped trigger"
        code={`${imp}

const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Controlled open</Button>
<AlertDialog
  open={open}
  onOpenChange={setOpen}
  title="Discard draft?"
  description="Unsaved changes will be lost."
  tone="warning"
  confirmLabel="Discard"
/>`}
      >
        <ControlledDemo />
      </PropSection>

      <PropSection
        name="hideCancel"
        description="boolean — confirm-only dialog"
        code={`${imp}

<AlertDialog
  title="You're offline"
  description="Check your connection and try again."
  hideCancel
  confirmLabel="Got it"
>
  <Button size="sm">Show notice</Button>
</AlertDialog>`}
      >
        <AlertDialog
          title="You're offline"
          description="Check your connection and try again."
          hideCancel
          confirmLabel="Got it"
        >
          <Button size="sm" style="secondary" border>
            Show notice
          </Button>
        </AlertDialog>
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
