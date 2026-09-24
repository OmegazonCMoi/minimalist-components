"use client";

import { useState } from "react";
import Button from "@/components/button";
import InputOTP from "@/components/input-otp";
import { useToast } from "@/components/toast";

export const verifyOtpCode = `import { useState } from "react";
import { Button, InputOTP, useToast } from "@/components";

export function VerifyOtpBlock() {
  const { toast } = useToast();
  const [code, setCode] = useState("");

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <div className="space-y-1">
        <h3 className="text-base font-medium">Verify email</h3>
        <p className="text-sm text-zinc-500">
          Enter the 6-digit code we sent you.
        </p>
      </div>
      <InputOTP value={code} onChange={setCode} onComplete={(v) => setCode(v)} />
      <Button
        className="w-full"
        disabled={code.length < 6}
        onClick={() =>
          toast({ title: "Verified", description: "You’re all set.", tone: "success" })
        }
      >
        Confirm
      </Button>
    </div>
  );
}`;

export function VerifyOtpBlock() {
  const { toast } = useToast();
  const [code, setCode] = useState("");

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <div className="space-y-1">
        <h3 className="text-base font-medium text-zinc-900 dark:text-zinc-50">
          Verify email
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Enter the 6-digit code we sent you.
        </p>
      </div>
      <InputOTP
        value={code}
        onChange={setCode}
        onComplete={(value) => setCode(value)}
      />
      <Button
        className="w-full"
        disabled={code.length < 6}
        onClick={() =>
          toast({
            title: "Verified",
            description: "You’re all set.",
            tone: "success",
          })
        }
      >
        Confirm
      </Button>
    </div>
  );
}
