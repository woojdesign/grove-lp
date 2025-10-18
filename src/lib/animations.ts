/**
 * Reusable Animation Library
 *
 * Centralized animation variants and utilities for consistent motion design.
 * All animations use the premium editorial easing curve: [0.22, 1, 0.36, 1]
 */

import { Transition, Variants } from "motion/react";

// ===========================
// EASING & TIMING
// ===========================

export const editorialEasing = [0.22, 1, 0.36, 1] as const;

export const durations = {
  instant: 0.2,
  fast: 0.6,
  normal: 0.9,
  slow: 1.2,
  slower: 1.5,
  slowest: 1.8,
  hero: 8, // For background zoom effects
} as const;

// ===========================
// VIEWPORT CONFIG
// ===========================

export const viewport = {
  once: true,
  margin: "-100px",
} as const;

export const viewportTight = {
  once: true,
  margin: "-50px",
} as const;

// ===========================
// CORE ANIMATION VARIANTS
// ===========================

/**
 * Fade in with upward motion - Small (20px)
 * Use for: Small text, badges, subtle elements
 */
export const fadeInUpSmall: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

/**
 * Fade in with upward motion - Medium (30px)
 * Use for: Body text, standard content
 */
export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

/**
 * Fade in with upward motion - Large (50px)
 * Use for: Headings, important content
 */
export const fadeInUpLarge: Variants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
};

/**
 * Zoom in effect - Subtle
 * Use for: Images, background photos
 */
export const zoomIn: Variants = {
  initial: { scale: 1.1 },
  animate: { scale: 1 },
};

/**
 * Zoom in effect - Very subtle (for hero backgrounds)
 * Use for: Hero section backgrounds, large images
 */
export const zoomInHero: Variants = {
  initial: { scale: 1.05 },
  animate: { scale: 1 },
};

/**
 * Scale up effect
 * Use for: Cards, interactive elements on scroll
 */
export const scaleUp: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
};

/**
 * Blur in effect - Subtle
 * Use for: Emphasis text, italic highlights
 */
export const blurIn: Variants = {
  initial: { filter: "blur(10px)" },
  animate: { filter: "blur(0px)" },
};

/**
 * Blur in effect - Strong
 * Use for: Major emphasis, hero text
 */
export const blurInStrong: Variants = {
  initial: { filter: "blur(15px)" },
  animate: { filter: "blur(0px)" },
};

/**
 * Slide in from right
 * Use for: Side content, alternating sections
 */
export const slideInRight: Variants = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
};

// ===========================
// TRANSITION HELPERS
// ===========================

/**
 * Create a transition with editorial easing
 */
export const createTransition = (
  duration: number,
  delay: number = 0
): Transition => ({
  duration,
  delay,
  ease: editorialEasing,
});

/**
 * Standard transitions for common durations
 */
export const transitions = {
  fast: createTransition(durations.fast),
  normal: createTransition(durations.normal),
  slow: createTransition(durations.slow),
  slower: createTransition(durations.slower),
  slowest: createTransition(durations.slowest),
  hero: createTransition(durations.hero),
} as const;

// ===========================
// SCROLL-TRIGGERED VARIANTS
// ===========================

/**
 * Fade in up on scroll - Small
 */
export const scrollFadeInUpSmall = {
  ...fadeInUpSmall,
  viewport,
};

/**
 * Fade in up on scroll - Medium
 */
export const scrollFadeInUp = {
  ...fadeInUp,
  viewport,
};

/**
 * Fade in up on scroll - Large
 */
export const scrollFadeInUpLarge = {
  ...fadeInUpLarge,
  viewport,
};

/**
 * Zoom in on scroll
 */
export const scrollZoomIn = {
  ...zoomIn,
  viewport,
};

/**
 * Scale up on scroll
 */
export const scrollScaleUp = {
  ...scaleUp,
  viewport,
};

// ===========================
// HOVER ANIMATIONS
// ===========================

/**
 * Hover scale effect
 */
export const hoverScale = {
  scale: 1.05,
};

/**
 * Hover lift - Small
 */
export const hoverLiftSmall = {
  y: -4,
};

/**
 * Hover lift - Large
 */
export const hoverLift = {
  y: -8,
};

// ===========================
// UTILITY FUNCTIONS
// ===========================

/**
 * Add delay to any animation variant
 */
export const withDelay = (variant: Variants, delay: number): Variants => ({
  ...variant,
  transition: { ...createTransition(durations.slow, delay) },
});

/**
 * Create staggered animation props for list items
 */
export const staggered = (index: number, baseDelay: number = 0.1) => ({
  transition: createTransition(durations.slow, baseDelay + index * 0.15),
});

/**
 * Combine motion props (for when you need multiple properties)
 */
export const combineProps = (...props: any[]) => {
  return Object.assign({}, ...props);
};
