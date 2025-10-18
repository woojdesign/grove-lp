# Migration Examples

Step-by-step examples for refactoring existing animations to use the animation library.

## Table of Contents
1. [Simple Fade In](#simple-fade-in)
2. [Scroll-Triggered Animations](#scroll-triggered-animations)
3. [Hover Effects](#hover-effects)
4. [Staggered Lists](#staggered-lists)
5. [Card Components](#card-components)
6. [Hero Section](#hero-section)
7. [Combined Animations](#combined-animations)

---

## Simple Fade In

### Before
```tsx
<motion.h1
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
>
  Headline
</motion.h1>
```

### After (Method 1: Spread)
```tsx
import { fadeInUp, addDelay } from "@/lib/animations";

<motion.h1 {...addDelay(fadeInUp, 0.8)}>
  Headline
</motion.h1>
```

### After (Method 2: Variants)
```tsx
import { fadeInUpVariants, withDelay, transitions } from "@/lib/animations";

<motion.h1
  variants={fadeInUpVariants}
  initial="initial"
  animate="animate"
  transition={withDelay(transitions.default, 0.8)}
>
  Headline
</motion.h1>
```

---

## Scroll-Triggered Animations

### Before
```tsx
<motion.p
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-50px" }}
  transition={{ duration: 0.9 }}
>
  Content
</motion.p>
```

### After
```tsx
import { scrollFadeInUp } from "@/lib/animations";

<motion.p {...scrollFadeInUp}>
  Content
</motion.p>
```

### Large Section Example

#### Before
```tsx
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
>
  Large section
</motion.div>
```

#### After
```tsx
import { scrollFadeInUpLarge } from "@/lib/animations";

<motion.div {...scrollFadeInUpLarge}>
  Large section
</motion.div>
```

---

## Hover Effects

### Button Hover

#### Before
```tsx
<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ duration: 0.2, ease: "easeOut" }}
>
  <Button>Click Me</Button>
</motion.div>
```

#### After
```tsx
import { hoverScale } from "@/lib/animations";

<motion.div {...hoverScale}>
  <Button>Click Me</Button>
</motion.div>
```

### Card Lift

#### Before
```tsx
<motion.div
  whileHover={{ y: -4, transition: { duration: 0.3 } }}
>
  Card content
</motion.div>
```

#### After
```tsx
import { hoverLiftSmall } from "@/lib/animations";

<motion.div {...hoverLiftSmall}>
  Card content
</motion.div>
```

---

## Staggered Lists

### Before (Manual Delays)
```tsx
// In HomePage.tsx - Process cards
<div className="grid md:grid-cols-3 gap-12">
  {steps.map((step, index) => (
    <ProcessCard
      key={step.number}
      delay={0.1 + index * 0.15}  // Manual calculation
    />
  ))}
</div>

// In ProcessCard.tsx
export function ProcessCard({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* content */}
    </motion.div>
  );
}
```

### After (Method 1: Using staggeredProps)
```tsx
import { fadeInUpMedium, staggeredProps } from "@/lib/animations";

<div className="grid md:grid-cols-3 gap-12">
  {steps.map((step, index) => (
    <motion.div
      key={step.number}
      {...staggeredProps(fadeInUpMedium, index, 0.1, 0.15)}
    >
      <ProcessCard {...step} />
    </motion.div>
  ))}
</div>

// Simplified ProcessCard (no delay prop needed)
export function ProcessCard({ number, title, description }: ProcessCardProps) {
  return (
    <div className="space-y-4">
      <div className="text-sm text-teal">{number}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
```

### After (Method 2: Parent-Child Orchestration)
```tsx
import {
  staggerContainerVariants,
  fadeInUpMediumVariants,
} from "@/lib/animations";

<motion.div
  className="grid md:grid-cols-3 gap-12"
  variants={staggerContainerVariants}
  initial="initial"
  animate="animate"
>
  {steps.map((step) => (
    <motion.div key={step.number} variants={fadeInUpMediumVariants}>
      <ProcessCard {...step} />
    </motion.div>
  ))}
</motion.div>
```

---

## Card Components

### ProcessCard

#### Before
```tsx
// src/components/home/ProcessCard.tsx
export function ProcessCard({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, transition: { duration: 0.3 } }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-4"
    >
      {/* content */}
    </motion.div>
  );
}
```

#### After
```tsx
// src/components/home/ProcessCard.tsx
import { motion } from "motion/react";
import {
  cardAnimationVariants,
  VIEWPORT,
  staggerDelay,
  transitions,
} from "@/lib/animations";

interface ProcessCardProps {
  number: string;
  title: string;
  description: string;
  index?: number; // Optional: for staggering
}

export function ProcessCard({
  number,
  title,
  description,
  index = 0,
}: ProcessCardProps) {
  return (
    <motion.div
      variants={cardAnimationVariants}
      initial="initial"
      whileInView="animate"
      whileHover="hover"
      viewport={VIEWPORT.small}
      transition={{
        ...transitions.default,
        delay: staggerDelay(0.1, 0.15, index),
      }}
      className="space-y-4"
    >
      <div className="text-sm text-teal">{number}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </motion.div>
  );
}
```

### StatCard

#### Before
```tsx
export function StatCard({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -8, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* content */}
    </motion.div>
  );
}
```

#### After
```tsx
import { motion } from "motion/react";
import {
  statCardAnimationVariants,
  VIEWPORT,
  staggerDelay,
  transitions,
} from "@/lib/animations";

interface StatCardProps {
  stat: string;
  description: string;
  index?: number;
}

export function StatCard({ stat, description, index = 0 }: StatCardProps) {
  return (
    <motion.div
      variants={statCardAnimationVariants}
      initial="initial"
      whileInView="animate"
      whileHover="hover"
      viewport={VIEWPORT.small}
      transition={{
        ...transitions.scroll,
        delay: staggerDelay(0.1, 0.15, index),
      }}
    >
      <div className="mb-6 font-display text-stat">{stat}</div>
      <p className="text-sm opacity-80">{description}</p>
    </motion.div>
  );
}
```

### TestimonialCard

#### Before
```tsx
export function TestimonialCard({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -4,
        boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
      }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* content */}
    </motion.div>
  );
}
```

#### After
```tsx
import { motion } from "motion/react";
import {
  testimonialCardAnimationVariants,
  VIEWPORT,
  staggerDelay,
  transitions,
} from "@/lib/animations";

interface TestimonialCardProps {
  quote: string;
  author: string;
  index?: number;
}

export function TestimonialCard({
  quote,
  author,
  index = 0,
}: TestimonialCardProps) {
  return (
    <motion.div
      variants={testimonialCardAnimationVariants}
      initial="initial"
      whileInView="animate"
      whileHover="hover"
      viewport={VIEWPORT.small}
      transition={{
        ...transitions.scroll,
        delay: staggerDelay(0.1, 0.15, index),
      }}
      className="border border-white/10 rounded-lg p-10"
    >
      <p className="mb-6 font-display text-testimonial">"{quote}"</p>
      <p className="text-sm opacity-70 uppercase">{author}</p>
    </motion.div>
  );
}
```

---

## Hero Section

### Before
```tsx
// HomePage.tsx - Hero section
<section>
  <motion.div
    className="absolute inset-0 z-0"
    initial={{ scale: 1.1 }}
    animate={{ scale: 1 }}
    transition={{ duration: 8, ease: [0.22, 1, 0.36, 1] }}
  >
    <img src={hero.bg} alt="" />
  </motion.div>

  <motion.h1
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
  >
    Headline
  </motion.h1>

  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    transition={{ duration: 0.2, ease: "easeOut" }}
  >
    <Button>CTA</Button>
  </motion.div>
</section>
```

### After
```tsx
import {
  zoomInDramatic,
  fadeInUp,
  addDelay,
  hoverScale,
} from "@/lib/animations";

<section>
  <motion.div className="absolute inset-0 z-0" {...zoomInDramatic}>
    <img src={hero.bg} alt="" />
  </motion.div>

  <motion.h1 {...addDelay(fadeInUp, 0.8)}>
    Headline
  </motion.h1>

  <motion.div {...hoverScale}>
    <Button>CTA</Button>
  </motion.div>
</section>
```

---

## Combined Animations

### Scroll + Hover + Custom Delay

#### Before
```tsx
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  whileHover={{ y: -4 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 1.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
>
  Content
</motion.div>
```

#### After (Composing Utilities)
```tsx
import {
  scrollFadeInUpLarge,
  hoverLiftSmall,
  combineMotionProps,
  addDelay,
} from "@/lib/animations";

<motion.div
  {...combineMotionProps(
    addDelay(scrollFadeInUpLarge, 0.3),
    hoverLiftSmall
  )}
>
  Content
</motion.div>
```

#### After (Using Variants - Recommended)
```tsx
import {
  fadeInUpMediumVariants,
  VIEWPORT,
  transitions,
  withDelay,
} from "@/lib/animations";

<motion.div
  variants={{
    ...fadeInUpMediumVariants,
    hover: { y: -4 },
  }}
  initial="initial"
  whileInView="animate"
  whileHover="hover"
  viewport={VIEWPORT.large}
  transition={withDelay(transitions.default, 0.3)}
>
  Content
</motion.div>
```

---

## Complete HomePage Refactor Example

### Before
```tsx
export function HomePage() {
  const fadeInUp = {  // Defined but never used!
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
  };

  return (
    <div>
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Badge>Badge</Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Headline
        </motion.h1>
      </section>
    </div>
  );
}
```

### After
```tsx
import {
  fadeInUpSmall,
  fadeInUp,
  addDelay,
} from "@/lib/animations";

export function HomePage() {
  return (
    <div>
      <section>
        <motion.div {...addDelay(fadeInUpSmall, 0.5)}>
          <Badge>Badge</Badge>
        </motion.div>

        <motion.h1 {...addDelay(fadeInUp, 0.8)}>
          Headline
        </motion.h1>
      </section>
    </div>
  );
}
```

---

## Migration Checklist

- [ ] Install animation library (files already created)
- [ ] Update imports in components
- [ ] Replace inline animations with library animations
- [ ] Remove unused local animation variables
- [ ] Simplify card components (remove delay props)
- [ ] Update parent components to use staggering utilities
- [ ] Add accessibility support with `respectMotionPreference`
- [ ] Test all animations
- [ ] Remove duplicate animation code

---

## Tips

1. **Start with one component** - Refactor one component at a time
2. **Test frequently** - Check animations after each change
3. **Use TypeScript** - The library is fully typed
4. **Read the README** - Comprehensive examples in `README.md`
5. **Combine when needed** - Use `combineMotionProps` for complex cases
6. **Prefer variants** - Better orchestration and TypeScript support
