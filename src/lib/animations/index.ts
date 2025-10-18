/**
 * Animation library for Framer Motion
 *
 * This module provides reusable animation variants, transitions, and utilities
 * for consistent animations across the application.
 *
 * @example Basic usage with motion props
 * import { fadeInUp } from '@/lib/animations';
 * <motion.div {...fadeInUp}>Content</motion.div>
 *
 * @example Using variants
 * import { fadeInUpVariants } from '@/lib/animations';
 * <motion.div
 *   variants={fadeInUpVariants}
 *   initial="initial"
 *   animate="animate"
 * >
 *   Content
 * </motion.div>
 *
 * @example Scroll-triggered animation
 * import { scrollFadeInUp } from '@/lib/animations';
 * <motion.div {...scrollFadeInUp}>Content</motion.div>
 *
 * @example With custom delay
 * import { fadeInUp, addDelay } from '@/lib/animations';
 * <motion.div {...addDelay(fadeInUp, 0.5)}>Content</motion.div>
 *
 * @example Staggered children
 * import { staggeredProps, fadeInUp } from '@/lib/animations';
 * {items.map((item, i) => (
 *   <motion.div key={i} {...staggeredProps(fadeInUp, i)}>
 *     {item}
 *   </motion.div>
 * ))}
 */

// Export all variants
export * from "./variants";

// Export transition configurations
export * from "./transitions";

// Export utility functions
export * from "./utils";
