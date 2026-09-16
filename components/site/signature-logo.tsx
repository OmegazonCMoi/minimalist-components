"use client";

import { useState, type CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";

const APPLE_EASE = [0.16, 1, 0.3, 1] as const;

/** Soft ink front that travels along the writing direction. */
const INK_MASK =
  "linear-gradient(90deg, #000 0, #000 var(--ink), transparent calc(var(--ink) + 16%))";

const WORDMARK_CLASSES =
  "font-darlington whitespace-nowrap text-center text-[clamp(2.25rem,8vw,6rem)] leading-[1.05] tracking-wide text-white";

type SignatureLogoProps = {
  className?: string;
  text?: string;
};

/**
 * Reveals the intact Darlington wordmark along its writing direction.
 *
 * A feathered mask front sweeps left to right so the word forms in reading
 * order, paired with a blur-to-sharp focus pull. The glyph geometry is never
 * split, traced or reordered — the final frame equals the static logo.
 */
export default function SignatureLogo({
  className = "",
  text = "Minimalist Components",
}: SignatureLogoProps) {
  const reduced = useReducedMotion() ?? false;
  const [settled, setSettled] = useState(false);

  if (reduced) {
    return (
      <h1 className={[WORDMARK_CLASSES, className].filter(Boolean).join(" ")}>
        {text}
      </h1>
    );
  }

  return (
    <motion.h1
      className={[WORDMARK_CLASSES, className].filter(Boolean).join(" ")}
      aria-label={text}
      style={
        {
          "--ink": "0%",
          maskImage: INK_MASK,
          WebkitMaskImage: INK_MASK,
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          willChange: settled ? "auto" : "opacity, filter, mask-image",
        } as CSSProperties
      }
      initial={{ "--ink": "0%", opacity: 0, filter: "blur(6px)" }}
      animate={{ "--ink": "104%", opacity: 1, filter: "blur(0px)" }}
      exit={{
        opacity: 0,
        filter: "blur(4px)",
        transition: { duration: 0.35, ease: APPLE_EASE },
      }}
      transition={{
        "--ink": { duration: 2, ease: APPLE_EASE },
        opacity: { duration: 0.7, ease: APPLE_EASE },
        filter: { duration: 1.5, ease: APPLE_EASE },
      }}
      onAnimationComplete={() => setSettled(true)}
    >
      {text}
    </motion.h1>
  );
}
