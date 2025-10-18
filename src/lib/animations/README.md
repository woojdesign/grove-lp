# Animation Library

A comprehensive, reusable animation system for Framer Motion in this Vite + React application.

## Overview

This library provides:
- **Reusable animation variants** for consistent motion design
- **Transition configurations** with standardized timing and easing
- **Utility functions** for composing and customizing animations
- **Accessibility support** with respect for user motion preferences

## Quick Start

### Basic Usage

```tsx
import { motion } from "motion/react";
import { fadeInUp } from "@/lib/animations";

function MyComponent() {
  return (
    <motion.div {...fadeInUp}>
      <h1>Hello World</h1>
    </motion.div>
  );
}
```

### Scroll-Triggered Animations

```tsx
import { motion } from "motion/react";
import { scrollFadeInUp } from "@/lib/animations";

function MySection() {
  return (
    <motion.section {...scrollFadeInUp}>
      <p>This fades in when scrolled into view</p>
    </motion.section>
  );
}
```

### Hover Animations

```tsx
import { motion } from "motion/react";
import { hoverScale } from "@/lib/animations";

function MyButton() {
  return (
    <motion.button {...hoverScale}>
      Click Me
    </motion.button>
  );
}
```

## Available Animations

### Fade Animations
- `fadeIn` - Simple fade in
- `fadeInUp` - Fade in from below (30px)
- `fadeInUpSmall` - Subtle fade in from below (20px)
- `fadeInUpMedium` - Medium fade in from below (40px)
- `fadeInUpLarge` - Dramatic fade in from below (50px)

### Scale Animations
- `scaleUp` - Grow from 95% to 100%
- `zoomIn` - Zoom from 105% to 100% (for images)
- `zoomInDramatic` - Dramatic zoom from 110% to 100%

### Slide Animations
- `slideInLeft` - Slide in from left
- `slideInRight` - Slide in from right

### Hover Animations
- `hoverLiftSmall` - Lift 4px on hover
- `hoverLiftMedium` - Lift 8px on hover
- `hoverScale` - Scale to 105% on hover, 95% on tap
- `hoverSlideRight` - Slide 4px right on hover

### Scroll-Triggered Animations
- `scrollFadeInUp` - Fade in when scrolled into view
- `scrollFadeInUpLarge` - Fade in large elements
- `scrollScaleUp` - Scale up when scrolled into view
- `scrollZoomIn` - Zoom in images on scroll

### Combined Animations
- `cardAnimationVariants` - Fade in + Lift on hover
- `statCardAnimationVariants` - Scale up + Lift on hover
- `testimonialCardAnimationVariants` - Fade in + Lift + Shadow

## Advanced Usage

### Using Variants

For better TypeScript support and orchestration:

```tsx
import { motion } from "motion/react";
import { fadeInUpVariants, transitions } from "@/lib/animations";

function MyComponent() {
  return (
    <motion.div
      variants={fadeInUpVariants}
      initial="initial"
      animate="animate"
      transition={transitions.default}
    >
      Content
    </motion.div>
  );
}
```

### Adding Delays

```tsx
import { motion } from "motion/react";
import { fadeInUp, addDelay } from "@/lib/animations";

function MyComponent() {
  return (
    <motion.div {...addDelay(fadeInUp, 0.5)}>
      This appears after 0.5s
    </motion.div>
  );
}
```

### Staggered Children

```tsx
import { motion } from "motion/react";
import { fadeInUp, staggeredProps } from "@/lib/animations";

function MyList() {
  const items = ["Item 1", "Item 2", "Item 3"];

  return (
    <div>
      {items.map((item, index) => (
        <motion.div key={index} {...staggeredProps(fadeInUp, index)}>
          {item}
        </motion.div>
      ))}
    </div>
  );
}
```

### Combining Animations

```tsx
import { motion } from "motion/react";
import { fadeInUp, hoverScale, combineMotionProps } from "@/lib/animations";

function MyCard() {
  return (
    <motion.div {...combineMotionProps(fadeInUp, hoverScale)}>
      Fades in and scales on hover
    </motion.div>
  );
}
```

### Parent-Child Orchestration

Use stagger containers to orchestrate child animations:

```tsx
import { motion } from "motion/react";
import {
  staggerContainerVariants,
  staggerItemVariants,
} from "@/lib/animations";

function MyGrid() {
  return (
    <motion.div
      variants={staggerContainerVariants}
      initial="initial"
      animate="animate"
    >
      {items.map((item) => (
        <motion.div key={item.id} variants={staggerItemVariants}>
          {item.content}
        </motion.div>
      ))}
    </motion.div>
  );
}
```

### Custom Animations

Create custom animations using helper functions:

```tsx
import { motion } from "motion/react";
import { createFadeInUp, createSlide } from "@/lib/animations";

function MyComponent() {
  const customFade = createFadeInUp(100); // 100px movement
  const customSlide = createSlide("right", 60); // Slide 60px from right

  return (
    <>
      <motion.div variants={customFade} initial="initial" animate="animate">
        Custom fade
      </motion.div>
      <motion.div variants={customSlide} initial="initial" animate="animate">
        Custom slide
      </motion.div>
    </>
  );
}
```

## Accessibility

The library includes utilities to respect user motion preferences:

```tsx
import { motion } from "motion/react";
import { fadeInUp, respectMotionPreference } from "@/lib/animations";

function MyComponent() {
  return (
    <motion.div {...respectMotionPreference(fadeInUp)}>
      This respects prefers-reduced-motion
    </motion.div>
  );
}
```

Or check manually:

```tsx
import { prefersReducedMotion, fadeInUp } from "@/lib/animations";

function MyComponent() {
  const shouldAnimate = !prefersReducedMotion();

  return (
    <motion.div {...(shouldAnimate ? fadeInUp : {})}>
      Conditional animation
    </motion.div>
  );
}
```

## Configuration

### Custom Transitions

```tsx
import { motion } from "motion/react";
import { fadeInUpVariants, createTransition, DURATION, EASING } from "@/lib/animations";

function MyComponent() {
  return (
    <motion.div
      variants={fadeInUpVariants}
      initial="initial"
      animate="animate"
      transition={createTransition(DURATION.slower, EASING.editorial, 0.5)}
    >
      Custom timing
    </motion.div>
  );
}
```

### Custom Viewport

```tsx
import { motion } from "motion/react";
import { fadeInUpVariants, VIEWPORT } from "@/lib/animations";

function MyComponent() {
  return (
    <motion.div
      variants={fadeInUpVariants}
      initial="initial"
      whileInView="animate"
      viewport={VIEWPORT.large} // or VIEWPORT.small, VIEWPORT.standard
    >
      Custom viewport trigger
    </motion.div>
  );
}
```

## Best Practices

### 1. Use Motion Sparingly
Only wrap elements that need animation. Don't use `motion.div` everywhere.

```tsx
// Good
<div>
  <motion.h1 {...fadeInUp}>Title</motion.h1>
  <p>Static content</p>
</div>

// Bad
<motion.div>
  <motion.h1 {...fadeInUp}>Title</motion.h1>
  <motion.p>Static content</motion.p>
</motion.div>
```

### 2. Prefer Variants Over Inline Props
Variants are more maintainable and enable orchestration.

```tsx
// Good
<motion.div variants={fadeInUpVariants} initial="initial" animate="animate" />

// Okay for one-offs
<motion.div {...fadeInUp} />

// Bad
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
/>
```

### 3. Use Scroll Triggers Appropriately
Add viewport margins to control when animations trigger.

```tsx
// Good - triggers slightly before entering viewport
<motion.div {...scrollFadeInUp} />

// Better for large sections
<motion.div
  variants={fadeInUpVariants}
  whileInView="animate"
  viewport={{ once: true, margin: "-100px" }}
/>
```

### 4. Respect User Preferences
Always consider accessibility.

```tsx
import { respectMotionPreference, fadeInUp } from "@/lib/animations";

<motion.div {...respectMotionPreference(fadeInUp)}>
  Content
</motion.div>
```

### 5. Use Staggering for Lists
Create delightful list animations with staggering.

```tsx
import { staggeredProps, fadeInUp } from "@/lib/animations";

{items.map((item, i) => (
  <motion.div key={i} {...staggeredProps(fadeInUp, i, 0.1, 0.15)}>
    {item}
  </motion.div>
))}
```

## Performance Tips

1. **Use `will-change` sparingly** - Only for elements that will definitely animate
2. **Prefer `opacity` and `transform`** - These are GPU-accelerated
3. **Use `viewport={{ once: true }}`** - Prevents re-triggering on scroll
4. **Avoid animating `width`, `height`, `left`, `top`** - These cause layout recalculation

## Migration Guide

See `MIGRATION_EXAMPLES.md` for step-by-step examples of refactoring existing animations.

## API Reference

### Variants
All animation variants export both a `*Variants` object and a plain motion props object.

- `*Variants` - Use with `variants` prop for orchestration
- Plain object (e.g., `fadeInUp`) - Use with spread operator for simple cases

### Transitions
- `transitions.default` - Standard 1.2s editorial ease
- `transitions.fast` - Quick 0.4s for interactions
- `transitions.instant` - Very quick 0.2s for immediate feedback
- `transitions.hero` - Slow 8s for hero backgrounds
- `transitions.scroll` - Medium 0.8s for scroll triggers
- `transitions.spring` - Spring physics
- `transitions.gentleSpring` - Softer spring

### Constants
- `DURATION` - Predefined durations in seconds
- `EASING` - Easing curve presets
- `VIEWPORT` - Common viewport configurations

### Utilities
- `combineMotionProps()` - Merge multiple motion props
- `addDelay()` - Add delay to any animation
- `fromVariants()` - Convert variants to motion props
- `scrollFrom()` - Create scroll-triggered props
- `staggeredProps()` - Create staggered delays
- `prefersReducedMotion()` - Check user preference
- `respectMotionPreference()` - Auto-respect preference
- `createExit()` - Generate exit animations
- `mergeVariants()` - Combine variant objects
