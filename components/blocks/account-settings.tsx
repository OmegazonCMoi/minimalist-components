"use client";

import Button from "@/components/button";
import Select from "@/components/select";
import Slider from "@/components/slider";
import Switch from "@/components/switch";
import { useToast } from "@/components/toast";

export const accountSettingsCode = `import {
  Button,
  Select,
  Slider,
  Switch,
  useToast,
} from "@/components";

export function AccountSettingsBlock() {
  const { toast } = useToast();

  return (
    <div className="flex w-full max-w-sm flex-col gap-5">
      <div className="space-y-1">
        <h3 className="text-base font-medium">Preferences</h3>
        <p className="text-sm text-zinc-500">Tune notifications and display.</p>
      </div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium">Email digests</p>
          <p className="text-xs text-zinc-500">Weekly product updates</p>
        </div>
        <Switch defaultChecked aria-label="Email digests" />
      </div>
      <Select
        border
        label="Language"
        defaultValue="en"
        options={[
          { label: "English", value: "en" },
          { label: "Français", value: "fr" },
          { label: "Deutsch", value: "de" },
        ]}
      />
      <Slider label="UI scale" showValue defaultValue={100} min={80} max={120} />
      <Button
        onClick={() =>
          toast({ title: "Saved", description: "Preferences updated.", tone: "success" })
        }
      >
        Save changes
      </Button>
    </div>
  );
}`;

export function AccountSettingsBlock() {
  const { toast } = useToast();

  return (
    <div className="flex w-full max-w-sm flex-col gap-5">
      <div className="space-y-1">
        <h3 className="text-base font-medium text-zinc-900 dark:text-zinc-50">
          Preferences
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Tune notifications and display.
        </p>
      </div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
            Email digests
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Weekly product updates
          </p>
        </div>
        <Switch defaultChecked aria-label="Email digests" />
      </div>
      <Select
        border
        label="Language"
        defaultValue="en"
        options={[
          { label: "English", value: "en" },
          { label: "Français", value: "fr" },
          { label: "Deutsch", value: "de" },
        ]}
      />
      <Slider label="UI scale" showValue defaultValue={100} min={80} max={120} />
      <Button
        onClick={() =>
          toast({
            title: "Saved",
            description: "Preferences updated.",
            tone: "success",
          })
        }
      >
        Save changes
      </Button>
    </div>
  );
}
