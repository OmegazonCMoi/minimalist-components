/** Shared motion tokens for interactive open/close. */
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export const popoverTransition = {
  duration: 0.2,
  ease: EASE_OUT,
} as const;

export const popoverVariants = {
  hidden: {
    opacity: 0,
    y: -6,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
} as const;

/** Soft press feedback for buttons / clickable controls. */
export const tapScale = { scale: 0.97 } as const;

export const tapTransition = {
  type: "spring",
  stiffness: 520,
  damping: 32,
  mass: 0.6,
} as const;
