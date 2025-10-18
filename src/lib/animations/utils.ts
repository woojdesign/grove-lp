/**
 * Animation utility functions
 *
 * Helper functions for working with Framer Motion animations
 */

import { Variants, MotionProps } from "motion/react";
import { transitions, withDelay, staggerDelay } from "./transitions";

/**
 * Combine multiple motion props objects
 * Useful for composing animations
 *
 * @example
 * const props = combineMotionProps(fadeInUp, hoverScale);
 * <motion.div {...props} />
 */
export const combineMotionProps = (
  ...props: Partial<MotionProps>[]
): Partial<MotionProps> => {
  return props.reduce((acc, prop) => ({ ...acc, ...prop }), {});
};

/**
 * Add a delay to any motion props
 *
 * @example
 * <motion.div {...addDelay(fadeInUp, 0.5)} />
 */
export const addDelay = (
  motionProps: Partial<MotionProps>,
  delay: number
): Partial<MotionProps> => ({
  ...motionProps,
  transition: withDelay(
    motionProps.transition || transitions.default,
    delay
  ),
});

/**
 * Create motion props from variants
 * Converts variants object to motion props with initial/animate
 *
 * @example
 * const props = fromVariants(fadeInUpVariants);
 * <motion.div {...props} />
 */
export const fromVariants = (
  variants: Variants,
  customTransition?: MotionProps["transition"]
): MotionProps => ({
  initial: "initial" as const,
  animate: "animate" as const,
  variants,
  transition: customTransition || transitions.default,
});

/**
 * Create scroll-triggered motion props from variants
 *
 * @example
 * const props = scrollFrom(fadeInUpVariants);
 * <motion.div {...props} />
 */
export const scrollFrom = (
  variants: Variants,
  viewport: MotionProps["viewport"] = { once: true, margin: "-50px" }
): MotionProps => ({
  initial: "initial" as const,
  whileInView: "animate" as const,
  viewport,
  variants,
  transition: transitions.scroll,
});

/**
 * Create a staggered list of motion props
 * Useful for animating lists or grids with delays
 *
 * @example
 * items.map((item, i) => (
 *   <motion.div key={i} {...staggeredProps(fadeInUp, i, 0.1, 0.15)}>
 *     {item}
 *   </motion.div>
 * ))
 */
export const staggeredProps = (
  baseProps: Partial<MotionProps>,
  index: number,
  baseDelay: number = 0.1,
  increment: number = 0.15
): Partial<MotionProps> => ({
  ...baseProps,
  transition: withDelay(
    baseProps.transition || transitions.default,
    staggerDelay(baseDelay, increment, index)
  ),
});

/**
 * Check if user prefers reduced motion
 * Use this to conditionally disable animations
 *
 * @example
 * const shouldAnimate = !prefersReducedMotion();
 * <motion.div {...(shouldAnimate ? fadeInUp : {})} />
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

/**
 * Get motion props that respect user's motion preference
 * Returns empty object if user prefers reduced motion
 *
 * @example
 * <motion.div {...respectMotionPreference(fadeInUp)} />
 */
export const respectMotionPreference = (
  motionProps: Partial<MotionProps>
): Partial<MotionProps> => {
  return prefersReducedMotion() ? {} : motionProps;
};

/**
 * Create exit animation from enter animation
 * Reverses the initial/animate states
 *
 * @example
 * const exitProps = createExit(fadeInUpVariants);
 */
export const createExit = (variants: Variants): Variants => {
  if (!variants.initial || !variants.animate) {
    throw new Error("Variants must have initial and animate states");
  }

  return {
    ...variants,
    exit: variants.initial,
  };
};

/**
 * Merge variants objects
 * Useful for combining multiple animation states
 */
export const mergeVariants = (...variants: Variants[]): Variants => {
  return variants.reduce((acc, variant) => {
    const merged = { ...acc };

    Object.keys(variant).forEach((key) => {
      merged[key] = {
        ...(acc[key] || {}),
        ...variant[key],
      };
    });

    return merged;
  }, {} as Variants);
};

/**
 * Create responsive animation based on screen size
 * Useful for different animation distances on mobile vs desktop
 *
 * @example
 * const props = responsiveAnimation(
 *   { opacity: 0, y: 20 },  // mobile
 *   { opacity: 0, y: 40 }   // desktop
 * );
 */
export const responsiveAnimation = (
  mobile: Record<string, any>,
  desktop: Record<string, any>
): Variants => {
  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 768;

  return {
    initial: isMobile ? mobile : desktop,
    animate: { opacity: 1, y: 0, x: 0, scale: 1 },
  };
};
