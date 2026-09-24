"use client";

import AlertDialog from "@/components/alert-dialog";
import Button from "@/components/button";
import { useToast } from "@/components/toast";

export const dangerZoneCode = `import { AlertDialog, Button, useToast } from "@/components";

export function DangerZoneBlock() {
  const { toast } = useToast();

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <div className="space-y-1">
        <h3 className="text-base font-medium">Danger zone</h3>
        <p className="text-sm text-zinc-500">
          Permanently remove this workspace and its data.
        </p>
      </div>
      <AlertDialog
        tone="danger"
        title="Delete workspace?"
        description="This cannot be undone. All projects and members will lose access."
        confirmLabel="Delete"
        onConfirm={() =>
          toast({ title: "Workspace deleted", tone: "danger" })
        }
      >
        <Button style="danger" variant="outline" border>
          Delete workspace
        </Button>
      </AlertDialog>
    </div>
  );
}`;

export function DangerZoneBlock() {
  const { toast } = useToast();

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <div className="space-y-1">
        <h3 className="text-base font-medium text-zinc-900 dark:text-zinc-50">
          Danger zone
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Permanently remove this workspace and its data.
        </p>
      </div>
      <AlertDialog
        tone="danger"
        title="Delete workspace?"
        description="This cannot be undone. All projects and members will lose access."
        confirmLabel="Delete"
        onConfirm={() =>
          toast({ title: "Workspace deleted", tone: "danger" })
        }
      >
        <Button style="danger" variant="outline" border>
          Delete workspace
        </Button>
      </AlertDialog>
    </div>
  );
}
