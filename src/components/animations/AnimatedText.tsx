import { motion } from "motion/react";
import { ReactNode } from "react";
import { editorialEasing, durations, viewport as defaultViewport } from "../../lib/animations";

export type AnimationType = "blur" | "fadeUp" | "scale" | "none";

export interface AnimatedTextProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  animation?: AnimationType;
  viewport?: typeof defaultViewport;
}

/**
 * Reusable animated text component supporting multiple animation types
 *
 * @example
 * <AnimatedText delay={0.3} animation="blur" className="italic">
 *   Emphasized text
 * </AnimatedText>
 */
export function AnimatedText({
  children,
  delay = 0,
  className = "",
  animation = "blur",
  viewport: customViewport = defaultViewport
}: AnimatedTextProps) {
  const animations = {
    blur: {
      initial: { filter: "blur(10px)" },
      animate: { filter: "blur(0px)" }
    },
    fadeUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 }
    },
    scale: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 }
    },
    none: {
      initial: {},
      animate: {}
    }
  };

  const selectedAnimation = animations[animation];

  return (
    <motion.span
      className={className}
      initial={selectedAnimation.initial}
      whileInView={selectedAnimation.animate}
      viewport={customViewport}
      transition={{ duration: durations.slow, delay, ease: editorialEasing }}
    >
      {children}
    </motion.span>
  );
}
