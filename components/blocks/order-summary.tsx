"use client";

import Badge from "@/components/badge";
import Button from "@/components/button";
import Collapsible, {
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/collapsible";
import Separator from "@/components/separator";

export const orderSummaryCode = `import {
  Badge,
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Separator,
} from "@/components";

export function OrderSummaryBlock() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-base font-medium text-zinc-900 dark:text-zinc-50">
          Order #1042
        </h3>
        <Badge tone="success" size="sm">
          Paid
        </Badge>
      </div>
      <Collapsible surface border defaultOpen>
        <CollapsibleTrigger>Items</CollapsibleTrigger>
        <CollapsibleContent>
          <ul className="space-y-1.5">
            <li className="flex justify-between gap-4">
              <span>Studio seat × 2</span>
              <span className="text-zinc-900 dark:text-zinc-200">$48</span>
            </li>
            <li className="flex justify-between gap-4">
              <span>Priority support</span>
              <span className="text-zinc-900 dark:text-zinc-200">$12</span>
            </li>
          </ul>
        </CollapsibleContent>
      </Collapsible>
      <Collapsible surface border>
        <CollapsibleTrigger>Shipping</CollapsibleTrigger>
        <CollapsibleContent>221B Baker Street · 2–4 days</CollapsibleContent>
      </Collapsible>
      <Separator />
      <div className="flex items-center justify-between text-sm">
        <span className="text-zinc-500">Total</span>
        <span className="font-medium text-zinc-900 dark:text-zinc-50">$60</span>
      </div>
      <Button className="w-full">View invoice</Button>
    </div>
  );
}`;

export function OrderSummaryBlock() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-base font-medium text-zinc-900 dark:text-zinc-50">
          Order #1042
        </h3>
        <Badge tone="success" size="sm">
          Paid
        </Badge>
      </div>
      <Collapsible surface border defaultOpen>
        <CollapsibleTrigger>Items</CollapsibleTrigger>
        <CollapsibleContent>
          <ul className="space-y-1.5">
            <li className="flex justify-between gap-4">
              <span>Studio seat × 2</span>
              <span className="text-zinc-900 dark:text-zinc-200">$48</span>
            </li>
            <li className="flex justify-between gap-4">
              <span>Priority support</span>
              <span className="text-zinc-900 dark:text-zinc-200">$12</span>
            </li>
          </ul>
        </CollapsibleContent>
      </Collapsible>
      <Collapsible surface border>
        <CollapsibleTrigger>Shipping</CollapsibleTrigger>
        <CollapsibleContent>221B Baker Street · 2–4 days</CollapsibleContent>
      </Collapsible>
      <Separator />
      <div className="flex items-center justify-between text-sm">
        <span className="text-zinc-500 dark:text-zinc-400">Total</span>
        <span className="font-medium text-zinc-900 dark:text-zinc-50">$60</span>
      </div>
      <Button className="w-full">View invoice</Button>
    </div>
  );
}
