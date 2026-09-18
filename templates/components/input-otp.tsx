"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type ClipboardEvent,
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { EASE_OUT } from "@/lib/motion";

type InputOTPSize = "sm" | "md" | "lg";
type InputOTPLength = 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

type InputOTPProps = {
  className?: string;
  size?: InputOTPSize;
  length?: InputOTPLength;
  border?: boolean;
  label?: string;
  error?: string;
  disabled?: boolean;
  /** Allow A–Z as well as digits (stored uppercase). */
  letters?: boolean;
  /**
   * Mid split marker. `true` uses the default dot;
   * pass a node for a custom separator.
   */
  delimiter?: boolean | ReactNode;
  /** Full OTP string */
  value?: string;
  defaultValue?: string;
  name?: string;
  id?: string;
  autoFocus?: boolean;
  onChange?: (value: string) => void;
  /** Fires once when every slot is filled */
  onComplete?: (value: string) => void;
};

const slotSizeClasses: Record<InputOTPSize, string> = {
  sm: "size-8 text-xs rounded-xl",
  md: "size-10 text-sm rounded-2xl",
  lg: "size-12 text-base rounded-2xl",
};

function clampLength(length: number): InputOTPLength {
  const n = Math.min(12, Math.max(4, Math.round(length)));
  return n as InputOTPLength;
}

function sanitize(value: string, letters: boolean) {
  if (letters) {
    return value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
  }
  return value.replace(/\D/g, "");
}

function toSlots(value: string, length: number, letters: boolean) {
  const chars = sanitize(value, letters).slice(0, length).split("");
  return Array.from({ length }, (_, i) => chars[i] ?? "");
}

export default function InputOTP({
  className = "",
  size = "md",
  length: lengthProp = 6,
  border = false,
  label,
  error,
  disabled = false,
  letters = false,
  delimiter = false,
  value,
  defaultValue = "",
  name,
  id,
  autoFocus = false,
  onChange,
  onComplete,
}: InputOTPProps) {
  const length = clampLength(lengthProp);
  const reduced = useReducedMotion() ?? false;
  const reactId = useId();
  const groupId = id ?? name ?? reactId;

  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(() =>
    sanitize(defaultValue, letters).slice(0, length),
  );
  const otp = isControlled
    ? sanitize(value, letters).slice(0, length)
    : internal;
  const slots = toSlots(otp, length, letters);

  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const completedRef = useRef("");
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!autoFocus || disabled) return;
    inputsRef.current[0]?.focus();
  }, [autoFocus, disabled]);

  useEffect(() => {
    if (otp.length === length && otp !== completedRef.current) {
      completedRef.current = otp;
      onComplete?.(otp);
    }
    if (otp.length < length) {
      completedRef.current = "";
    }
  }, [otp, length, onComplete]);

  function commit(next: string) {
    const cleaned = sanitize(next, letters).slice(0, length);
    if (!isControlled) setInternal(cleaned);
    onChange?.(cleaned);
  }

  function focusAt(index: number) {
    const el = inputsRef.current[Math.max(0, Math.min(length - 1, index))];
    el?.focus();
    el?.select();
  }

  function updateSlot(index: number, char: string) {
    const next = slots.slice();
    next[index] = char;
    commit(next.join(""));
  }

  function handleChange(index: number, event: FormEvent<HTMLInputElement>) {
    const raw = event.currentTarget.value;
    const chars = sanitize(raw, letters);

    if (!chars) {
      updateSlot(index, "");
      return;
    }

    if (chars.length > 1) {
      const next = slots.slice();
      let cursor = index;
      for (const char of chars) {
        if (cursor >= length) break;
        next[cursor] = char;
        cursor += 1;
      }
      commit(next.join(""));
      focusAt(Math.min(cursor, length - 1));
      return;
    }

    updateSlot(index, chars);
    if (index < length - 1) focusAt(index + 1);
  }

  function handleKeyDown(
    index: number,
    event: KeyboardEvent<HTMLInputElement>,
  ) {
    if (event.key === "Backspace" || event.key === "Delete") {
      event.preventDefault();
      if (slots[index]) {
        updateSlot(index, "");
        if (index > 0) focusAt(index - 1);
      } else if (index > 0) {
        updateSlot(index - 1, "");
        focusAt(index - 1);
      }
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      focusAt(index - 1);
      return;
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      focusAt(index + 1);
    }
  }

  function handlePaste(event: ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();
    const pasted = sanitize(event.clipboardData.getData("text"), letters).slice(
      0,
      length,
    );
    if (!pasted) return;
    commit(pasted);
    focusAt(Math.min(pasted.length, length - 1));
  }

  function slotClasses(filled: boolean) {
    return [
      "inline-flex items-center justify-center font-sans font-medium outline-none transition-colors",
      letters ? "uppercase" : "tabular-nums",
      "text-center caret-transparent selection:bg-transparent",
      disabled ? "cursor-not-allowed opacity-40" : "cursor-text",
      error
        ? "border border-[#f87171] bg-[#fef2f2] text-[#991b1b] focus:border-[#f87171] dark:bg-[#450a0a]/50 dark:text-[#fecaca] dark:focus:border-[#fca5a5]"
        : border
          ? "border border-zinc-300 bg-white text-zinc-900 focus:border-zinc-500 focus:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-800/80 dark:text-zinc-200 dark:focus:border-zinc-400 dark:focus:bg-zinc-800"
          : "border border-transparent bg-zinc-200/80 text-zinc-900 focus:bg-zinc-200 dark:bg-zinc-800/80 dark:text-zinc-200 dark:focus:bg-zinc-800",
      filled && !error ? "text-zinc-950 dark:text-zinc-50" : "",
      slotSizeClasses[size],
    ]
      .filter(Boolean)
      .join(" ");
  }

  const splitAt = Math.floor(length / 2);
  const showDelimiter = Boolean(delimiter);

  const nodes: ReactNode[] = [];
  slots.forEach((digit, index) => {
    if (showDelimiter && index === splitAt) {
      nodes.push(
        <span
          key={`${groupId}-delimiter`}
          aria-hidden
          className="inline-flex shrink-0 items-center px-0.5 text-sm font-medium text-zinc-400/50 dark:text-zinc-500/50"
        >
          {delimiter === true ? "·" : delimiter}
        </span>,
      );
    }

    nodes.push(
      <motion.div
        key={`${groupId}-${index}`}
        animate={{
          scale: !reduced && focusedIndex === index ? 1.05 : 1,
        }}
        transition={
          reduced ? { duration: 0 } : { duration: 0.15, ease: EASE_OUT }
        }
      >
        <input
          ref={(el) => {
            inputsRef.current[index] = el;
          }}
          id={`${groupId}-${index}`}
          type="text"
          inputMode={letters ? "text" : "numeric"}
          autoComplete={index === 0 ? "one-time-code" : "off"}
          pattern={letters ? "[A-Za-z0-9]*" : "[0-9]*"}
          maxLength={length}
          disabled={disabled}
          aria-label={`Character ${index + 1} of ${length}`}
          aria-invalid={error ? true : undefined}
          value={digit}
          onChange={(event) => handleChange(index, event)}
          onKeyDown={(event) => handleKeyDown(index, event)}
          onPaste={handlePaste}
          onFocus={(event) => {
            setFocusedIndex(index);
            event.currentTarget.select();
          }}
          onBlur={() =>
            setFocusedIndex((current) =>
              current === index ? null : current,
            )
          }
          className={slotClasses(Boolean(digit))}
        />
      </motion.div>,
    );
  });

  return (
    <div
      className={["flex w-fit max-w-full flex-col gap-1.5", className]
        .filter(Boolean)
        .join(" ")}
    >
      {label ? (
        <label
          htmlFor={`${groupId}-0`}
          className={[
            "text-xs font-medium tracking-wide",
            error ? "text-[#f87171]" : "text-zinc-500 dark:text-zinc-400",
          ].join(" ")}
        >
          {label}
        </label>
      ) : null}

      {name ? <input type="hidden" name={name} value={otp} /> : null}

      <div
        role="group"
        aria-invalid={error ? true : undefined}
        className="flex flex-wrap items-center gap-2"
      >
        {nodes}
      </div>

      {error ? <p className="text-xs text-[#f87171]">{error}</p> : null}
    </div>
  );
}

export { InputOTP };
export type { InputOTPProps, InputOTPSize, InputOTPLength };
