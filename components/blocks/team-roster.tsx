"use client";

import Badge from "@/components/badge";
import Button from "@/components/button";
import Table from "@/components/table";
import Tooltip from "@/components/tooltip";
import { MoreHorizontalIcon } from "lucide-react";

export const teamRosterCode = `import { Badge, Button, Table, Tooltip } from "@/components";
import { MoreHorizontalIcon } from "lucide-react";

export function TeamRosterBlock() {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-end justify-between gap-3">
        <div className="space-y-1">
          <h3 className="text-base font-medium">Team</h3>
          <p className="text-sm text-zinc-500">People with access to this workspace.</p>
        </div>
        <Button size="sm">Invite</Button>
      </div>
      <Table
        columns={[
          { key: "name", header: "Name" },
          { key: "role", header: "Role" },
          { key: "status", header: "Status" },
          { key: "actions", header: "" },
        ]}
        rows={[
          {
            name: "Ada Lovelace",
            role: "Owner",
            status: <Badge size="sm" tone="success">Active</Badge>,
            actions: (
              <Tooltip content="More">
                <Button size="sm" iconOnly variant="ghost" icon={<MoreHorizontalIcon />} aria-label="More" />
              </Tooltip>
            ),
          },
          // …
        ]}
      />
    </div>
  );
}`;

export function TeamRosterBlock() {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-end justify-between gap-3">
        <div className="space-y-1">
          <h3 className="text-base font-medium text-zinc-900 dark:text-zinc-50">
            Team
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            People with access to this workspace.
          </p>
        </div>
        <Button size="sm">Invite</Button>
      </div>
      <Table
        columns={[
          { key: "name", header: "Name" },
          { key: "role", header: "Role" },
          { key: "status", header: "Status" },
          { key: "actions", header: "" },
        ]}
        rows={[
          {
            name: "Ada Lovelace",
            role: "Owner",
            status: (
              <Badge size="sm" tone="success">
                Active
              </Badge>
            ),
            actions: (
              <Tooltip content="More">
                <Button
                  size="sm"
                  iconOnly
                  variant="ghost"
                  icon={<MoreHorizontalIcon className="size-4" />}
                  aria-label="More"
                />
              </Tooltip>
            ),
          },
          {
            name: "Grace Hopper",
            role: "Editor",
            status: (
              <Badge size="sm" tone="success">
                Active
              </Badge>
            ),
            actions: (
              <Tooltip content="More">
                <Button
                  size="sm"
                  iconOnly
                  variant="ghost"
                  icon={<MoreHorizontalIcon className="size-4" />}
                  aria-label="More"
                />
              </Tooltip>
            ),
          },
          {
            name: "Alan Turing",
            role: "Viewer",
            status: (
              <Badge size="sm" tone="warning">
                Invited
              </Badge>
            ),
            actions: (
              <Tooltip content="More">
                <Button
                  size="sm"
                  iconOnly
                  variant="ghost"
                  icon={<MoreHorizontalIcon className="size-4" />}
                  aria-label="More"
                />
              </Tooltip>
            ),
          },
        ]}
      />
    </div>
  );
}
