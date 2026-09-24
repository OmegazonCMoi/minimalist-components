"use client";

import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent,
} from "react";
import { EASE_OUT, popoverTransition, popoverVariants } from "@/lib/motion";

type SelectSize = "sm" | "md" | "lg";

type SelectOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

type SelectProps = {
  className?: string;
  size?: SelectSize;
  border?: boolean;
  label?: string;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  name?: string;
  id?: string;
  onChange?: (value: string) => void;
  onBlur?: (event: FocusEvent<HTMLButtonElement>) => void;
  onFocus?: (event: FocusEvent<HTMLButtonElement>) => void;
};

const sizeClasses: Record<SelectSize, string> = {
  sm: "h-8 px-3 py-1.5 text-xs gap-1.5 rounded-xl",
  md: "h-10 px-4 py-2 text-sm gap-2 rounded-2xl",
  lg: "h-12 px-5 py-2.5 text-base gap-2.5 rounded-2xl",
};

const optionSizeClasses: Record<SelectSize, string> = {
  sm: "px-2.5 py-1.5 text-xs rounded-xl",
  md: "px-3 py-2 text-sm rounded-xl",
  lg: "px-3.5 py-2.5 text-base rounded-xl",
};

export default function Select({
  className = "",
  size = "md",
  border = false,
  label,
  error,
  disabled = false,
  placeholder = "Select…",
  options,
  value,
  defaultValue = "",
  name,
  id,
  onChange,
  onBlur,
  onFocus,
}: SelectProps) {
  const reduced = useReducedMotion() ?? false;
  const reactId = useId();
  const selectId = id ?? name ?? reactId;
  const listboxId = `${selectId}-listbox`;

  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue);
  const selected = isControlled ? value : internal;

  const [open, setOpen] = useState(false);
  const [layerUp, setLayerUp] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const enabledOptions = options.filter((o) => !o.disabled);
  const selectedOption = options.find((o) => o.value === selected);
  const displayLabel = selectedOption?.label ?? placeholder;
  const isPlaceholder = !selectedOption;

  const triggerClasses = [
    "relative flex w-full max-w-sm items-center font-sans transition-colors outline-none",
    disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer",
    error
      ? "border border-[#fca5a5] bg-[#fef2f2] text-[#991b1b] focus-visible:border-[#f87171] dark:border-[#f87171] dark:bg-[#450a0a]/50 dark:text-[#fecaca] dark:focus-visible:border-[#fca5a5]"
      : border
        ? "border border-zinc-200 bg-white text-zinc-900 focus-visible:border-zinc-300 focus-visible:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-800/80 dark:text-zinc-200 dark:focus-visible:border-zinc-400 dark:focus-visible:bg-zinc-800"
        : "border border-transparent bg-zinc-200/80 text-zinc-900 focus-visible:bg-zinc-200 dark:bg-zinc-800/80 dark:text-zinc-200 dark:focus-visible:bg-zinc-800",
    open && !error && !border ? "bg-zinc-200 dark:bg-zinc-800" : "",
    open && !error && border
      ? "border-zinc-300 bg-zinc-50 dark:border-zinc-400 dark:bg-zinc-800"
      : "",
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  function commit(next: string) {
    if (!isControlled) setInternal(next);
    onChange?.(next);
    setOpen(false);
    buttonRef.current?.focus();
  }

  function openList(index?: number) {
    if (disabled) return;
    const fallback =
      options.findIndex((o) => o.value === selected && !o.disabled) >= 0
        ? options.findIndex((o) => o.value === selected && !o.disabled)
        : options.findIndex((o) => !o.disabled);
    setActiveIndex(index ?? (fallback >= 0 ? fallback : 0));
    setLayerUp(true);
    setOpen(true);
  }

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function onKey(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        buttonRef.current?.focus();
      }
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    if (!open || activeIndex < 0) return;
    const el = listRef.current?.querySelector<HTMLElement>(
      `[data-index="${activeIndex}"]`,
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [open, activeIndex]);

  function moveActive(delta: number) {
    if (enabledOptions.length === 0) return;
    let idx = activeIndex;
    for (let i = 0; i < options.length; i++) {
      idx = (idx + delta + options.length) % options.length;
      if (!options[idx]?.disabled) {
        setActiveIndex(idx);
        return;
      }
    }
  }

  function onTriggerKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (disabled) return;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        if (!open) openList();
        else moveActive(1);
        break;
      case "ArrowUp":
        event.preventDefault();
        if (!open) openList();
        else moveActive(-1);
        break;
      case "Home":
        event.preventDefault();
        if (!open) openList(options.findIndex((o) => !o.disabled));
        else {
          const first = options.findIndex((o) => !o.disabled);
          if (first >= 0) setActiveIndex(first);
        }
        break;
      case "End":
        event.preventDefault();
        {
          let last = -1;
          for (let i = options.length - 1; i >= 0; i--) {
            if (!options[i]?.disabled) {
              last = i;
              break;
            }
          }
          if (!open) openList(last);
          else if (last >= 0) setActiveIndex(last);
        }
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        if (!open) openList();
        else if (activeIndex >= 0 && !options[activeIndex]?.disabled) {
          commit(options[activeIndex].value);
        }
        break;
      case "Escape":
        if (open) {
          event.preventDefault();
          setOpen(false);
        }
        break;
      default:
        break;
    }
  }

  return (
    <div ref={rootRef} className="flex w-full max-w-sm flex-col gap-1.5">
      {label ? (
        <label
          htmlFor={selectId}
          className={[
            "text-xs font-medium tracking-wide",
            error ? "text-[#f87171]" : "text-zinc-500 dark:text-zinc-400",
          ].join(" ")}
        >
          {label}
        </label>
      ) : null}

      {name ? <input type="hidden" name={name} value={selected} /> : null}

      <div
        className={["relative w-full", layerUp ? "z-[200]" : ""]
          .filter(Boolean)
          .join(" ")}
      >
        <button
          ref={buttonRef}
          type="button"
          id={selectId}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-invalid={error ? true : undefined}
          onClick={() => (open ? setOpen(false) : openList())}
          onKeyDown={onTriggerKeyDown}
          onBlur={onBlur}
          onFocus={onFocus}
          className={triggerClasses}
        >
          <span
            className={[
              "min-w-0 flex-1 truncate text-left",
              isPlaceholder
                ? error
                  ? "text-[#f87171]/50"
                  : "text-zinc-400 dark:text-zinc-500"
                : "",
            ].join(" ")}
          >
            {displayLabel}
          </span>
          <motion.span
            className={[
              "inline-flex shrink-0 [&_svg]:size-[1em]",
              error ? "text-[#f87171]" : "text-zinc-500",
            ].join(" ")}
            aria-hidden
            animate={{ rotate: open ? 180 : 0 }}
            transition={
              reduced ? { duration: 0 } : { duration: 0.2, ease: EASE_OUT }
            }
          >
            <ChevronDownIcon />
          </motion.span>
        </button>

        <AnimatePresence onExitComplete={() => setLayerUp(false)}>
          {open ? (
            <motion.ul
              ref={listRef}
              id={listboxId}
              role="listbox"
              aria-labelledby={selectId}
              tabIndex={-1}
              initial={reduced ? false : "hidden"}
              animate="visible"
              exit={reduced ? undefined : "hidden"}
              variants={popoverVariants}
              transition={reduced ? { duration: 0 } : popoverTransition}
              style={{ transformOrigin: "50% 0%" }}
              className={[
                "absolute top-full left-0 z-[200] mt-1.5 max-h-60 w-full overflow-auto p-1",
                "rounded-2xl border border-zinc-200 bg-white shadow-lg",
                "dark:border-zinc-700 dark:bg-zinc-900 dark:shadow-black/40",
                "outline-none",
              ].join(" ")}
            >
              {options.map((option, index) => {
                const isSelected = option.value === selected;
                const isActive = index === activeIndex;

                return (
                  <li
                    key={option.value}
                    id={`${selectId}-opt-${index}`}
                    role="option"
                    data-index={index}
                    aria-selected={isSelected}
                    aria-disabled={option.disabled || undefined}
                    className={[
                      "flex w-full cursor-pointer items-center justify-between gap-2",
                      optionSizeClasses[size],
                      option.disabled
                        ? "cursor-not-allowed opacity-40"
                        : isActive
                          ? "bg-zinc-100 text-zinc-950 dark:bg-zinc-800 dark:text-zinc-50"
                          : "text-zinc-700 dark:text-zinc-300",
                      isSelected && !isActive
                        ? "text-zinc-950 dark:text-zinc-50"
                        : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onMouseEnter={() => {
                      if (!option.disabled) setActiveIndex(index);
                    }}
                    onMouseDown={(event) => {
                      event.preventDefault();
                    }}
                    onClick={() => {
                      if (option.disabled) return;
                      commit(option.value);
                    }}
                  >
                    <span className="truncate">{option.label}</span>
                    {isSelected ? (
                      <CheckIcon
                        className="size-[1em] shrink-0 text-zinc-500"
                        aria-hidden
                      />
                    ) : null}
                  </li>
                );
              })}
            </motion.ul>
          ) : null}
        </AnimatePresence>
      </div>

      {error ? <p className="text-xs text-[#f87171]">{error}</p> : null}
    </div>
  );
}

export { Select };
export type { SelectProps, SelectSize, SelectOption };
