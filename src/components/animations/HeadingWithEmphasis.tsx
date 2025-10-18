import { motion } from "motion/react";
import { AnimatedText } from "./AnimatedText";
import { editorialEasing, durations, viewport } from "../../lib/animations";

export interface HeadingContent {
  before?: string;
  highlight?: string;
  highlight1?: string;
  middle?: string;
  highlight2?: string;
  after?: string;
}

export interface HeadingWithEmphasisProps {
  content: HeadingContent;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
  emphasisClassName?: string;
  baseDelay?: number;
  staggerDelay?: number;
  animateContainer?: boolean;
}

/**
 * Smart heading component that automatically animates emphasis words based on content structure
 *
 * Supports three content patterns:
 * 1. Single emphasis: { before, highlight, after }
 * 2. Multiple emphasis: { before, highlight1, middle, highlight2, after }
 * 3. Plain text: { before }
 *
 * @example
 * <HeadingWithEmphasis
 *   content={content.problem.heading}
 *   as="h2"
 *   className="font-display text-section-heading"
 * />
 */
export function HeadingWithEmphasis({
  content,
  as: Component = "h2",
  className = "",
  emphasisClassName = "italic",
  baseDelay = 0.3,
  staggerDelay = 0.3,
  animateContainer = true
}: HeadingWithEmphasisProps) {
  const MotionComponent = motion[Component];

  // Detect pattern: single highlight vs multiple highlights
  const hasSingleHighlight = content.highlight !== undefined;
  const hasMultipleHighlights = content.highlight1 !== undefined;

  return (
    <MotionComponent
      className={className}
      {...(animateContainer && {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport,
        transition: { duration: durations.slow, ease: editorialEasing }
      })}
    >
      {/* Pattern 1: before + highlight + after */}
      {hasSingleHighlight && (
        <>
          {content.before}{' '}
          <AnimatedText
            delay={baseDelay}
            className={emphasisClassName}
          >
            {content.highlight}
          </AnimatedText>
          {content.after && <> {content.after}</>}
        </>
      )}

      {/* Pattern 2: before + highlight1 + middle + highlight2 + after */}
      {hasMultipleHighlights && (
        <>
          {content.before}{' '}
          <AnimatedText
            delay={baseDelay}
            className={emphasisClassName}
          >
            {content.highlight1}
          </AnimatedText>
          {' '}{content.middle}{' '}
          <AnimatedText
            delay={baseDelay + staggerDelay}
            className={emphasisClassName}
          >
            {content.highlight2}
          </AnimatedText>
          {content.after && <>{' '}{content.after}</>}
        </>
      )}

      {/* Pattern 3: Plain text (no highlights) */}
      {!hasSingleHighlight && !hasMultipleHighlights && (
        <>
          {content.before}
          {content.after}
        </>
      )}
    </MotionComponent>
  );
}
