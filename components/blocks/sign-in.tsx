"use client";

import Button from "@/components/button";
import Checkbox from "@/components/checkbox";
import Input from "@/components/input";
import Separator from "@/components/separator";

function GitHubMark({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.28-.01-1.02-.02-2-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.08 1.85 1.24 1.85 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.05.14 3.01.4 2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.81 1.1.81 2.22 0 1.61-.01 2.91-.01 3.3 0 .32.22.7.83.58A12.01 12.01 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
    </svg>
  );
}

export const signInCode = `import {
  Button,
  Checkbox,
  Input,
  Separator,
} from "@/components";

function GitHubMark({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.28-.01-1.02-.02-2-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.08 1.85 1.24 1.85 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.05.14 3.01.4 2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.81 1.1.81 2.22 0 1.61-.01 2.91-.01 3.3 0 .32.22.7.83.58A12.01 12.01 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
    </svg>
  );
}

export function SignInBlock() {
  return (
    <form className="flex w-full max-w-sm flex-col gap-4">
      {/* … */}
      <Button
        type="button"
        variant="outline"
        border
        style="secondary"
        className="w-full"
        icon={<GitHubMark />}
        iconPosition="left"
      >
        Continue with GitHub
      </Button>
    </form>
  );
}`;

export function SignInBlock() {
  return (
    <form
      className="flex w-full max-w-sm flex-col gap-4"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="space-y-1">
        <h3 className="text-base font-medium text-zinc-900 dark:text-zinc-50">
          Sign in
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Welcome back — enter your details.
        </p>
      </div>
      <Input border label="Email" type="text" placeholder="you@studio.dev" />
      <Input border label="Password" type="password" placeholder="••••••••" />
      <Checkbox label="Remember me for 30 days" />
      <Button type="submit" className="w-full">
        Continue
      </Button>
      <Separator label="or" />
      <Button
        type="button"
        variant="outline"
        border
        style="secondary"
        className="w-full"
        icon={<GitHubMark />}
        iconPosition="left"
      >
        Continue with GitHub
      </Button>
    </form>
  );
}
