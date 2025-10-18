/**
 * Reusable animation variants for Framer Motion
 *
 * These variants provide consistent, reusable animations across the application.
 * Each variant follows the pattern: { initial, animate, exit? }
 *
 * Usage:
 * import { fadeInUp } from '@/lib/animations';
 * <motion.div {...fadeInUp} />
 *
 * Or with variants prop:
 * <motion.div variants={fadeInUpVariants} initial="initial" animate="animate" />
 */

import { Variants, MotionProps } from "motion/react";
import { transitions, VIEWPORT } from "./transitions";

// ============================================================================
// FADE ANIMATIONS
// ============================================================================

/**
 * Fade in from below - Most common animation pattern
 * Used for: Text, cards, sections appearing on scroll
 */
export const fadeInUpVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
} satisfies Variants;

export const fadeInUp = {
  initial: fadeInUpVariants.initial,
  animate: fadeInUpVariants.animate,
  transition: transitions.default,
} satisfies MotionProps;

/**
 * Fade in with smaller movement - Subtle entry
 * Used for: Badges, small UI elements
 */
export const fadeInUpSmallVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
} satisfies Variants;

export const fadeInUpSmall = {
  initial: fadeInUpSmallVariants.initial,
  animate: fadeInUpSmallVariants.animate,
  transition: transitions.default,
} satisfies MotionProps;

/**
 * Fade in with larger movement - Dramatic entry
 * Used for: Hero sections, large headings
 */
export const fadeInUpLargeVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
} satisfies Variants;

export const fadeInUpLarge = {
  initial: fadeInUpLargeVariants.initial,
  animate: fadeInUpLargeVariants.animate,
  transition: transitions.default,
} satisfies MotionProps;

/**
 * Fade in with medium movement - Card entry
 * Used for: Process cards, feature cards
 */
export const fadeInUpMediumVariants = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
} satisfies Variants;

export const fadeInUpMedium = {
  initial: fadeInUpMediumVariants.initial,
  animate: fadeInUpMediumVariants.animate,
  transition: transitions.default,
} satisfies MotionProps;

/**
 * Simple fade in - No movement
 * Used for: Overlays, backgrounds
 */
export const fadeInVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
} satisfies Variants;

export const fadeIn = {
  initial: fadeInVariants.initial,
  animate: fadeInVariants.animate,
  transition: transitions.default,
} satisfies MotionProps;

// ============================================================================
// ZOOM/SCALE ANIMATIONS
// ============================================================================

/**
 * Zoom in - Image reveal effect
 * Used for: Hero images, feature images
 */
export const zoomInVariants = {
  initial: { opacity: 0, scale: 1.05 },
  animate: { opacity: 1, scale: 1 },
} satisfies Variants;

export const zoomIn = {
  initial: zoomInVariants.initial,
  animate: zoomInVariants.animate,
  transition: transitions.hero,
} satisfies MotionProps;

/**
 * Zoom in dramatic - Hero background effect
 * Used for: Hero section backgrounds
 */
export const zoomInDramaticVariants = {
  initial: { scale: 1.1 },
  animate: { scale: 1 },
} satisfies Variants;

export const zoomInDramatic = {
  initial: zoomInDramaticVariants.initial,
  animate: zoomInDramaticVariants.animate,
  transition: transitions.hero,
} satisfies MotionProps;

/**
 * Scale up - Grow from smaller
 * Used for: Stats, testimonials
 */
export const scaleUpVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
} satisfies Variants;

export const scaleUp = {
  initial: scaleUpVariants.initial,
  animate: scaleUpVariants.animate,
  transition: transitions.scroll,
} satisfies MotionProps;

// ============================================================================
// SLIDE ANIMATIONS
// ============================================================================

/**
 * Slide in from right
 * Used for: Side content, feature descriptions
 */
export const slideInRightVariants = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
} satisfies Variants;

export const slideInRight = {
  initial: slideInRightVariants.initial,
  animate: slideInRightVariants.animate,
  transition: transitions.default,
} satisfies MotionProps;

/**
 * Slide in from left
 * Used for: Side content, feature descriptions
 */
export const slideInLeftVariants = {
  initial: { opacity: 0, x: -40 },
  animate: { opacity: 1, x: 0 },
} satisfies Variants;

export const slideInLeft = {
  initial: slideInLeftVariants.initial,
  animate: slideInLeftVariants.animate,
  transition: transitions.default,
} satisfies MotionProps;

// ============================================================================
// HOVER ANIMATIONS
// ============================================================================

/**
 * Lift on hover - Subtle elevation
 * Used for: Cards, interactive elements
 */
export const hoverLiftSmallVariants = {
  initial: { y: 0 },
  hover: { y: -4 },
} satisfies Variants;

export const hoverLiftSmall = {
  whileHover: hoverLiftSmallVariants.hover,
  transition: transitions.fast,
} satisfies MotionProps;

/**
 * Lift on hover - Medium elevation
 * Used for: Larger cards
 */
export const hoverLiftMediumVariants = {
  initial: { y: 0 },
  hover: { y: -8 },
} satisfies Variants;

export const hoverLiftMedium = {
  whileHover: hoverLiftMediumVariants.hover,
  transition: transitions.fast,
} satisfies MotionProps;

/**
 * Scale on hover - Button interaction
 * Used for: Buttons, CTAs
 */
export const hoverScaleVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
} satisfies Variants;

export const hoverScale = {
  whileHover: hoverScaleVariants.hover,
  whileTap: hoverScaleVariants.tap,
  transition: transitions.instant,
} satisfies MotionProps;

/**
 * Slide on hover - Subtle movement
 * Used for: List items, links
 */
export const hoverSlideRightVariants = {
  initial: { x: 0 },
  hover: { x: 4 },
} satisfies Variants;

export const hoverSlideRight = {
  whileHover: hoverSlideRightVariants.hover,
  transition: transitions.instant,
} satisfies MotionProps;

// ============================================================================
// SCROLL-TRIGGERED ANIMATIONS
// ============================================================================

/**
 * Fade in on scroll - Standard
 * Used for: Most scroll-triggered content
 */
export const scrollFadeInUpVariants = fadeInUpVariants;

export const scrollFadeInUp = {
  ...fadeInUp,
  viewport: VIEWPORT.standard,
  whileInView: fadeInUpVariants.animate,
} satisfies MotionProps;

/**
 * Fade in on scroll - Large elements
 * Used for: Sections, large content blocks
 */
export const scrollFadeInUpLargeVariants = fadeInUpLargeVariants;

export const scrollFadeInUpLarge = {
  ...fadeInUpLarge,
  viewport: VIEWPORT.large,
  whileInView: fadeInUpLargeVariants.animate,
} satisfies MotionProps;

/**
 * Scale up on scroll
 * Used for: Stats, cards
 */
export const scrollScaleUpVariants = scaleUpVariants;

export const scrollScaleUp = {
  ...scaleUp,
  viewport: VIEWPORT.small,
  whileInView: scaleUpVariants.animate,
} satisfies MotionProps;

/**
 * Zoom in on scroll
 * Used for: Images
 */
export const scrollZoomInVariants = zoomInVariants;

export const scrollZoomIn = {
  ...zoomIn,
  viewport: VIEWPORT.large,
  whileInView: zoomInVariants.animate,
} satisfies MotionProps;

// ============================================================================
// COMBINED HOVER + SCROLL ANIMATIONS
// ============================================================================

/**
 * Card animation - Fade in on scroll + Lift on hover
 * Used for: Process cards, feature cards
 */
export const cardAnimationVariants = {
  initial: fadeInUpMediumVariants.initial,
  animate: fadeInUpMediumVariants.animate,
  hover: { y: -4 },
} satisfies Variants;

/**
 * Stat card animation - Scale on scroll + Lift on hover
 * Used for: Stat cards
 */
export const statCardAnimationVariants = {
  initial: scaleUpVariants.initial,
  animate: scaleUpVariants.animate,
  hover: { y: -8 },
} satisfies Variants;

/**
 * Testimonial card animation - Fade in + Lift + Shadow on hover
 * Used for: Testimonial cards
 */
export const testimonialCardAnimationVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  hover: {
    y: -4,
    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
  },
} satisfies Variants;

// ============================================================================
// STAGGER ANIMATIONS (Parent-Child Orchestration)
// ============================================================================

/**
 * Stagger container - Orchestrates child animations
 * Used for: Grids, lists
 */
export const staggerContainerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
} satisfies Variants;

/**
 * Stagger item - Child of stagger container
 * Used for: Grid items, list items
 */
export const staggerItemVariants = fadeInUpVariants;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Create a custom fade in up animation with configurable distance
 */
export const createFadeInUp = (distance: number = 30): Variants => ({
  initial: { opacity: 0, y: distance },
  animate: { opacity: 1, y: 0 },
});

/**
 * Create a custom scale animation
 */
export const createScale = (initialScale: number = 0.95): Variants => ({
  initial: { opacity: 0, scale: initialScale },
  animate: { opacity: 1, scale: 1 },
});

/**
 * Create a custom slide animation
 */
export const createSlide = (
  direction: "left" | "right" | "up" | "down",
  distance: number = 40
): Variants => {
  const axis = direction === "left" || direction === "right" ? "x" : "y";
  const multiplier =
    direction === "left" || direction === "up" ? -1 : 1;

  return {
    initial: { opacity: 0, [axis]: distance * multiplier },
    animate: { opacity: 1, [axis]: 0 },
  };
};
