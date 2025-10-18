/**
 * Reusable transition configurations for Framer Motion animations
 *
 * These transitions provide consistent timing and easing across the application.
 * The custom easing curve [0.22, 1, 0.36, 1] creates a smooth, editorial feel.
 */

import { Transition } from "motion/react";

/**
 * Custom easing curve used throughout the application
 * Creates a smooth, editorial animation feel
 */
export const EDITORIAL_EASING = [0.22, 1, 0.36, 1] as const;

/**
 * Standard easing presets
 */
export const EASING = {
  editorial: EDITORIAL_EASING,
  easeOut: "easeOut" as const,
  easeInOut: "easeInOut" as const,
  linear: "linear" as const,
} as const;

/**
 * Duration presets in seconds
 */
export const DURATION = {
  instant: 0.2,
  fast: 0.4,
  normal: 0.8,
  slow: 1.2,
  slower: 1.5,
  slowest: 1.8,
  hero: 8, // For hero section background zoom
} as const;

/**
 * Common viewport configurations for scroll-triggered animations
 */
export const VIEWPORT = {
  // Trigger animation when element is 50px from entering viewport
  standard: { once: true, margin: "-50px" },
  // Trigger earlier for larger elements
  large: { once: true, margin: "-100px" },
  // Trigger closer for smaller elements
  small: { once: true, margin: "-80px" },
  // Allow animation to repeat
  repeat: { once: false, margin: "-50px" },
} as const;

/**
 * Base transition configurations
 */
export const transitions = {
  // Default transition for most animations
  default: {
    duration: DURATION.slow,
    ease: EASING.editorial,
  } as Transition,

  // Fast transition for hover effects
  fast: {
    duration: DURATION.fast,
    ease: EASING.editorial,
  } as Transition,

  // Quick interaction feedback
  instant: {
    duration: DURATION.instant,
    ease: EASING.easeOut,
  } as Transition,

  // Smooth, slow transitions for hero sections
  hero: {
    duration: DURATION.hero,
    ease: EASING.editorial,
  } as Transition,

  // Smooth transitions for scroll-triggered content
  scroll: {
    duration: DURATION.normal,
    ease: EASING.editorial,
  } as Transition,

  // Spring-based transitions for interactive elements
  spring: {
    type: "spring" as const,
    stiffness: 300,
    damping: 30,
  } as Transition,

  // Gentle spring for subtle movements
  gentleSpring: {
    type: "spring" as const,
    stiffness: 200,
    damping: 25,
  } as Transition,
} as const;

/**
 * Create a transition with a delay
 */
export const withDelay = (
  transition: Transition,
  delay: number
): Transition => ({
  ...transition,
  delay,
});

/**
 * Create a custom transition
 */
export const createTransition = (
  duration: number = DURATION.normal,
  ease: typeof EASING[keyof typeof EASING] = EASING.editorial,
  delay: number = 0
): Transition => ({
  duration,
  ease,
  ...(delay > 0 && { delay }),
});

/**
 * Create staggered delays for child animations
 *
 * @param baseDelay - Starting delay in seconds
 * @param increment - Delay increment between items in seconds
 * @param count - Number of items (optional, for generating array)
 * @returns Delay value or array of delays
 *
 * @example
 * // Get delay for 3rd item with 0.1s base and 0.15s increment
 * const delay = staggerDelay(0.1, 0.15, 2); // 0.4
 *
 * @example
 * // Generate array of delays for 5 items
 * const delays = staggerDelays(0.1, 0.15, 5); // [0.1, 0.25, 0.4, 0.55, 0.7]
 */
export const staggerDelay = (
  baseDelay: number,
  increment: number,
  index: number
): number => baseDelay + index * increment;

export const staggerDelays = (
  baseDelay: number,
  increment: number,
  count: number
): number[] => Array.from({ length: count }, (_, i) => staggerDelay(baseDelay, increment, i));
