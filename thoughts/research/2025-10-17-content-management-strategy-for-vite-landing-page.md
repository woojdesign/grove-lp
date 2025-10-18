---
doc_type: research
date: 2025-10-18T02:09:17+00:00
title: "Content Management Strategy for Vite Landing Page"
research_question: "What is the best approach for managing website content (text, images, sections) quickly in this Vite-based landing page built from Figma?"
researcher: Sean Kim

git_commit: ce7282dd0ae6d2f66797501a94762d0fed48a5f0
branch: main
repository: grove-lp

created_by: Sean Kim
last_updated: 2025-10-17
last_updated_by: Sean Kim

tags:
  - content-management
  - vite
  - react
  - landing-page
  - architecture
status: draft

related_docs: []
---

# Research: Content Management Strategy for Vite Landing Page

**Date**: October 17, 2025
**Researcher**: Sean Kim
**Git Commit**: ce7282dd0ae6d2f66797501a94762d0fed48a5f0
**Branch**: main
**Repository**: grove-lp

## Research Question

What is the best approach for managing website content (text, images, sections) quickly in this Vite-based landing page built from Figma? The goal is to enable rapid content updates for a small landing page without over-engineering the solution.

## Summary

This Vite-based landing page is built with React, TypeScript, shadcn/ui components, and Tailwind CSS. Currently, all content is hardcoded directly in the main App.tsx component (~458 lines). The codebase exhibits a **monolithic component structure** where text strings, images, layout, and presentation logic are tightly coupled.

**Key Finding**: For this specific use case (a single-page marketing site with ~10 sections), a **centralized content configuration file** approach is optimal. This provides an excellent balance between:
- Quick content updates (non-developers can edit a single file)
- Type safety (TypeScript interfaces ensure consistency)
- Low implementation complexity (1-2 hours to implement)
- No infrastructure overhead (no CMS, no database, no API)
- Developer-friendly (stays within the codebase, works with version control)

## Detailed Findings

### 1. Current Content Structure

#### Content Location Analysis

**File**: `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/src/App.tsx` (lines 1-458)

All content is hardcoded in JSX within the main App component:

**Text Content Examples**:
- **Hero headline** (line 46-48): `"In every big company or school, there are hundreds of people you'd love to know but never meet."`
- **Hero subheadline** (line 55): `"Commonplace quietly introduces you to the people who share your passions..."`
- **CTA buttons** (line 66, 74): `"Get Early Access"`, `"Request a Demo"`
- **Social proof** (line 100-102): `"Company A"`, `"University B"`, `"Startup C"`
- **Statistics** (line 269-281): `"74%"`, `"30-50%"`, `"3 of 4"` with descriptions
- **Testimonials** (line 287, 292): Quote and author pairs
- **Footer** (line 345): Copyright text and nav links

**Image References**:
- **Hero image** (line 5, 24): Imported via Figma alias - `import heroImage from "figma:asset/1d238fd6df90dc12f9289f962d9003c6c6a24d61.png"`
- **Feature image** (line 148): Unsplash URL hardcoded in src attribute
- **Image storage**: Single asset in `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/src/assets/` (1d238fd6df90dc12f9289f962d9003c6c6a24d61.png)

**Section Structure**:
The landing page consists of 9 distinct sections:
1. Hero section (lines 19-79)
2. Social proof strip (lines 82-105)
3. Problem statement (lines 108-135)
4. Split feature section (lines 138-178)
5. How it works - 3 process cards (lines 181-217)
6. Trust features (lines 220-249)
7. Outcomes with stats (lines 252-298)
8. Final CTA (lines 301-338)
9. Footer (lines 341-361)

**Component Props Pattern**:
Helper components receive data via props:
```typescript
// Line 365-389: ProcessCard
function ProcessCard({ number, title, description, delay }: {
  number: string; title: string; description: string; delay: number;
})

// Line 392-400: TrustFeature
function TrustFeature({ text }: { text: string })

// Line 403-420: StatCard
function StatCard({ stat, description, delay }: { stat: string; description: string; delay: number })

// Line 422-439: TestimonialCard
function TestimonialCard({ quote, author, delay }: { quote: string; author: string; delay: number })
```

This component structure already supports data-driven rendering, but the data is currently inline.

### 2. Framework & Build Setup

#### Vite Configuration

**File**: `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/vite.config.ts` (lines 1-61)

Key configuration aspects:

```typescript
export default defineConfig({
  plugins: [react()],  // Using @vitejs/plugin-react-swc (Fast Refresh with SWC)

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src'),  // Path alias for imports
      'figma:asset/...': path.resolve(__dirname, './src/assets/...'),  // Figma asset aliasing
    },
  },

  build: {
    target: 'esnext',
    outDir: 'build',  // Build output directory
  },

  server: {
    port: 3000,
    open: true,
  },
});
```

**Build Commands** (package.json lines 56-59):
- `npm run dev` → `vite` (dev server on port 3000)
- `npm run build` → `vite build` (production build to `build/` directory)

**Deployment**: Configured for Vercel (vercel.json lines 1-6)

#### UI Framework Stack

**Dependencies Analysis** (package.json lines 6-49):

1. **React 18.3.1** - Core framework
2. **shadcn/ui component library** - Complete set of 30+ Radix UI components:
   - Accordion, Alert Dialog, Avatar, Badge, Button, Card, etc.
   - All components in `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/src/components/ui/`
3. **Radix UI primitives** - Unstyled, accessible component primitives
4. **class-variance-authority** (CVA) - Component variant management
5. **Framer Motion** - Animation library (`motion` package)
6. **lucide-react** - Icon library (used: ArrowRight, Shield, Users, Sparkles, CheckCircle2)

**Component Architecture**:
- **Utility-first**: All UI components use CVA for variant management
- **Composable**: Components use Radix's `Slot` pattern for polymorphism
- **Type-safe**: Full TypeScript with VariantProps typing

Example from Button component (`/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/src/components/ui/button.tsx` lines 7-35):
```typescript
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap...",
  {
    variants: {
      variant: { default, destructive, outline, secondary, ghost, link },
      size: { default, sm, lg, icon },
    },
  }
);
```

### 3. Styling Approach

#### Tailwind CSS Configuration

**Primary stylesheet**: `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/src/index.css` (1,840 lines)

The styling system uses **Tailwind CSS v4** with extensive customization:

**CSS Custom Properties** (lines 1422-1502):
```css
:root {
  /* Color system */
  --background: #fafaf9;
  --foreground: #4a4741;
  --primary: #1a1a1a;
  --secondary: #a07855;
  --accent: #d4a574;

  /* Typography system */
  --font-family-display: Georgia, 'Times New Roman', serif;
  --font-weight-light: 300;

  /* Fluid responsive typography */
  --font-size-hero: clamp(2.5rem, 6vw, 5rem);
  --font-size-section-heading: clamp(2rem, 5vw, 4rem);
  --font-size-section-heading-alt: clamp(2rem, 4vw, 3.5rem);
  --font-size-subsection-heading: clamp(1.75rem, 4vw, 3rem);

  /* Gradients */
  --gradient-bg-subtle: linear-gradient(135deg, rgba(212, 165, 116, 0.15)...);
  --gradient-hero-overlay: radial-gradient(circle at 30% 20%...);
}
```

**Custom Utility Classes** (lines 1565-1646):
```css
.font-display { font-family: var(--font-family-display); }
.text-hero { font-size: var(--font-size-hero); }
.text-section-heading { font-size: var(--font-size-section-heading); }
.text-accent-color { color: var(--accent); }
.bg-gradient-subtle { background: var(--gradient-bg-subtle); }
```

**Design System Characteristics**:
- Editorial/magazine-inspired aesthetic
- Warm color palette (browns, beiges)
- Large, fluid typography
- Subtle gradient overlays
- Dark mode support (lines 1504-1539)

This styling system is **highly customized** and would remain unchanged regardless of content management approach.

### 4. Content Organization Patterns

#### Current Pattern: Monolithic Inline

**Strengths**:
- Simple to understand
- Fast to prototype
- No abstraction overhead
- Co-located with presentation

**Weaknesses**:
- Content updates require code changes
- 458-line component is difficult to navigate
- Content buried in JSX markup
- No content reusability
- Hard to version control content changes separately
- Non-developers cannot easily update content

#### Existing Separation Opportunities

The codebase already has some patterns that support content extraction:

1. **Component props are well-defined**: ProcessCard, StatCard, TestimonialCard accept data objects
2. **Icons imported separately**: lucide-react icons can be referenced by string names
3. **Images use import statements**: Can be mapped to a content configuration
4. **Animation values are parameterized**: `delay` props already accept configuration

### 5. Content Management Recommendations

Based on the analysis of this specific codebase, here are the recommended approaches ranked by suitability:

---

#### RECOMMENDED: Centralized Content Configuration File

**Approach**: Extract all content to a TypeScript configuration file with typed interfaces.

**Why it fits this codebase**:
1. **Scale-appropriate**: Single-page landing with ~10 sections doesn't need CMS complexity
2. **Type-safe**: TypeScript interfaces prevent content errors
3. **Developer-friendly**: Works with existing tooling (VS Code autocomplete, version control)
4. **Fast to implement**: Leverages existing component prop structure
5. **Easy to update**: Non-technical users can edit one file
6. **No infrastructure**: No databases, APIs, or deployment complexity

**Implementation Structure**:

Create `/src/content/landingPage.ts`:

```typescript
// Type definitions
export interface HeroContent {
  badge: string;
  headline: string;
  highlightedText: string;
  subheadline: string;
  primaryCTA: string;
  secondaryCTA: string;
  image: {
    src: string;
    alt: string;
  };
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface Stat {
  value: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  author: string;
}

export interface LandingPageContent {
  hero: HeroContent;
  socialProof: {
    heading: string;
    companies: string[];
  };
  problem: {
    heading: string;
    headingHighlights: string[];
    description: string;
    callout: string;
  };
  feature: {
    image: { src: string; alt: string };
    heading: string;
    description: string;
    cta: string;
  };
  process: {
    heading: string;
    steps: ProcessStep[];
  };
  trust: {
    heading: string;
    features: string[];
  };
  outcomes: {
    heading: string;
    stats: Stat[];
    testimonials: Testimonial[];
  };
  finalCTA: {
    heading: string;
    primaryCTA: string;
    secondaryCTA: string;
    subtext: string;
  };
  footer: {
    copyright: string;
    links: Array<{ text: string; href: string }>;
  };
}

// Content data
export const landingPageContent: LandingPageContent = {
  hero: {
    badge: "Designed for human connection",
    headline: "In every big company or school, there are",
    highlightedText: "hundreds of people",
    subheadline: "Commonplace quietly introduces you to the people who share your passions, experiences, and goals — so large organizations feel a little more human again.",
    primaryCTA: "Get Early Access",
    secondaryCTA: "Request a Demo",
    image: {
      src: "/src/assets/1d238fd6df90dc12f9289f962d9003c6c6a24d61.png",
      alt: "People connecting through shared interests"
    }
  },
  socialProof: {
    heading: "Already sparking conversations at",
    companies: ["Company A", "University B", "Startup C"]
  },
  // ... rest of content
};
```

Then update `App.tsx`:

```typescript
import { landingPageContent as content } from './content/landingPage';

export default function App() {
  return (
    <div>
      <section className="hero">
        <Badge>{content.hero.badge}</Badge>
        <h1>
          {content.hero.headline}{' '}
          <span className="italic">{content.hero.highlightedText}</span>
          {' '}you'd love to know but never meet.
        </h1>
        <p>{content.hero.subheadline}</p>
        <Button>{content.hero.primaryCTA}</Button>
      </section>

      {content.process.steps.map((step, index) => (
        <ProcessCard key={step.number} {...step} delay={0.1 * index} />
      ))}
    </div>
  );
}
```

**Implementation Complexity**: LOW (2-4 hours)
- 1 hour: Create content types
- 1 hour: Extract content to config
- 1-2 hours: Refactor App.tsx to use content

**Trade-offs**:
- ✅ Type safety ensures no broken references
- ✅ Single source of truth for content
- ✅ Works with version control (see exact content changes in diffs)
- ✅ No build complexity
- ✅ Fast updates (edit one file, refresh browser)
- ⚠️ Requires basic TypeScript knowledge for content editors
- ⚠️ Still requires rebuild/redeploy for changes
- ❌ Not suitable if non-technical stakeholders need real-time updates

---

#### ALTERNATIVE 1: JSON Content File with Schema Validation

**Approach**: Store content in JSON with runtime validation.

**Why consider it**:
- Non-developers can edit JSON more easily than TypeScript
- Content can be validated at build time
- Can add i18n support later

**Implementation**:

Create `/src/content/landingPage.json`:
```json
{
  "hero": {
    "badge": "Designed for human connection",
    "headline": "In every big company or school, there are",
    "highlightedText": "hundreds of people",
    ...
  }
}
```

Add validation with Zod (`npm install zod`):
```typescript
import { z } from 'zod';
import contentData from './content/landingPage.json';

const heroSchema = z.object({
  badge: z.string(),
  headline: z.string(),
  highlightedText: z.string(),
  // ...
});

export const content = heroSchema.parse(contentData);
```

**Implementation Complexity**: MEDIUM (3-5 hours)
- Requires Zod dependency
- Need to write validation schemas
- JSON editing less comfortable than TypeScript

**Trade-offs**:
- ✅ Easier for non-technical editors
- ✅ Can support multiple languages (separate JSON files)
- ✅ Runtime validation catches errors
- ⚠️ No autocomplete in editors (unless JSON schema added)
- ⚠️ Larger bundle size (includes validation library)
- ❌ Less type-safe than TypeScript approach

---

#### ALTERNATIVE 2: Markdown with Front Matter (MDX)

**Approach**: Use MDX (Markdown + JSX) for content-heavy sections.

**Why consider it**:
- Great for long-form content
- Allows inline React components
- Content editors can use Markdown

**Implementation**:

Install MDX: `npm install @mdx-js/rollup`

Update `vite.config.ts`:
```typescript
import mdx from '@mdx-js/rollup'

export default defineConfig({
  plugins: [mdx(), react()],
})
```

Create `/src/content/hero.mdx`:
```mdx
---
badge: "Designed for human connection"
primaryCTA: "Get Early Access"
---

# In every big company or school, there are **hundreds of people** you'd love to know but never meet.

Commonplace quietly introduces you to the people who share your passions...
```

**Implementation Complexity**: MEDIUM-HIGH (4-6 hours)
- Requires MDX plugin configuration
- Need to restructure sections as MDX files
- More complex than simple data extraction

**Trade-offs**:
- ✅ Markdown is familiar to many editors
- ✅ Can embed React components in content
- ✅ Good for blog-like content
- ⚠️ Overkill for structured data (stats, testimonials)
- ⚠️ Build complexity increases
- ❌ Not ideal for this landing page (mostly structured data, not prose)

---

#### ALTERNATIVE 3: Headless CMS (Sanity/Contentful)

**Approach**: Integrate a headless CMS for content management.

**When to use it**:
- Multiple non-technical content editors
- Frequent content updates (daily/weekly)
- Need preview/draft functionality
- Multi-language requirements
- Media asset management needs

**Why NOT recommended for this codebase**:
- Single-page landing site
- Small team (likely 1-2 editors)
- Infrequent updates (monthly at most)
- No complex workflows

**Implementation Complexity**: HIGH (8-16 hours)
- CMS setup and configuration
- API integration
- Build-time data fetching
- Type generation from CMS schema
- Additional infrastructure costs

**Trade-offs**:
- ✅ Best for non-technical editors (visual UI)
- ✅ Preview functionality
- ✅ Media asset management
- ✅ Multi-user collaboration
- ❌ Infrastructure overhead (hosting, costs)
- ❌ Build complexity (API calls, caching)
- ❌ Over-engineered for single-page site
- ❌ Vendor lock-in

---

#### ALTERNATIVE 4: Hybrid Approach (Environment Variables for Key Values)

**Approach**: Keep content in TypeScript config, but allow overrides via environment variables for specific values.

**Use case**: When you want to change specific values (like CTAs, company names) without redeploying.

Create `.env`:
```env
VITE_PRIMARY_CTA="Get Early Access"
VITE_COMPANY_NAME="Commonplace"
```

Use in content config:
```typescript
export const landingPageContent = {
  hero: {
    primaryCTA: import.meta.env.VITE_PRIMARY_CTA || "Get Early Access",
  }
}
```

**Implementation Complexity**: LOW (1-2 hours)

**Trade-offs**:
- ✅ Quick value changes without rebuild
- ✅ Good for A/B testing CTAs
- ⚠️ Only works for simple string values
- ⚠️ Environment variables can be cumbersome
- ❌ Not suitable for complex content structures

---

### 6. Implementation Path (RECOMMENDED APPROACH)

Here's the step-by-step migration from current state to the recommended centralized content configuration:

#### Phase 1: Create Content Types (30 minutes)

**File to create**: `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/src/content/types.ts`

```typescript
export interface Image {
  src: string;
  alt: string;
}

export interface CTAButton {
  text: string;
  variant?: 'default' | 'outline' | 'ghost';
}

export interface HeroSection {
  badge: string;
  headline: {
    before: string;
    highlight: string;
    after: string;
  };
  subheadline: string;
  buttons: {
    primary: CTAButton;
    secondary: CTAButton;
  };
  backgroundImage: Image;
}

export interface SocialProofSection {
  heading: string;
  companies: string[];
}

export interface ProblemSection {
  heading: {
    before: string;
    highlight1: string;
    middle: string;
    highlight2: string;
    after: string;
  };
  description: string;
  callout: string;
}

export interface FeatureSection {
  image: Image;
  heading: {
    before: string;
    highlight: string;
  };
  description: string;
  ctaText: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface ProcessSection {
  heading: {
    before: string;
    highlight: string;
  };
  steps: ProcessStep[];
}

export interface TrustSection {
  heading: {
    before: string;
    highlight: string;
  };
  features: string[];
}

export interface StatItem {
  value: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  author: string;
}

export interface OutcomesSection {
  heading: {
    highlight1: string;
    middle: string;
    highlight2: string;
    after: string;
  };
  stats: StatItem[];
  testimonials: Testimonial[];
}

export interface FinalCTASection {
  heading: {
    before: string;
    highlight: string;
  };
  buttons: {
    primary: CTAButton;
    secondary: CTAButton;
  };
  subtext: string;
}

export interface FooterSection {
  copyright: string;
  links: Array<{
    text: string;
    href: string;
  }>;
}

export interface LandingPageContent {
  hero: HeroSection;
  socialProof: SocialProofSection;
  problem: ProblemSection;
  feature: FeatureSection;
  process: ProcessSection;
  trust: TrustSection;
  outcomes: OutcomesSection;
  finalCTA: FinalCTASection;
  footer: FooterSection;
}
```

#### Phase 2: Extract Content Data (1 hour)

**File to create**: `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/src/content/landingPage.ts`

```typescript
import { LandingPageContent } from './types';
import heroImage from '../assets/1d238fd6df90dc12f9289f962d9003c6c6a24d61.png';

export const content: LandingPageContent = {
  hero: {
    badge: "Designed for human connection",
    headline: {
      before: "In every big company or school, there are",
      highlight: "hundreds of people",
      after: "you'd love to know but never meet."
    },
    subheadline: "Commonplace quietly introduces you to the people who share your passions, experiences, and goals — so large organizations feel a little more human again.",
    buttons: {
      primary: { text: "Get Early Access" },
      secondary: { text: "Request a Demo", variant: "ghost" }
    },
    backgroundImage: {
      src: heroImage,
      alt: "People connecting through shared interests"
    }
  },

  socialProof: {
    heading: "Already sparking conversations at",
    companies: ["Company A", "University B", "Startup C"]
  },

  problem: {
    heading: {
      before: "Organizations have never been more",
      highlight1: "connected",
      middle: "— and people have never felt more",
      highlight2: "disconnected.",
      after: ""
    },
    description: "Remote work, hybrid teams, and endless Slack threads mean that we know our coworkers' calendars better than we know them. Culture can't thrive if people never cross paths — and serendipity doesn't scale on its own.",
    callout: "Commonplace restores serendipity — intentionally."
  },

  feature: {
    image: {
      src: "https://images.unsplash.com/photo-1753729213561-0fd9e4669d15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2UlMjBjYWxtfGVufDF8fHx8MTc2MDQ4NjYzM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Modern workspace"
    },
    heading: {
      before: "Thoughtful introductions, powered by",
      highlight: "quiet intelligence."
    },
    description: "Commonplace asks a few fun, open-ended questions to learn what makes each person tick, then maps interests using AI embeddings — like semantic DNA for your community.",
    ctaText: "Learn more"
  },

  process: {
    heading: {
      before: "No scrolling. No feeds.",
      highlight: "Just connection."
    },
    steps: [
      {
        number: "01",
        title: "Listen",
        description: "Commonplace asks a few fun, open-ended questions to learn what makes each person tick."
      },
      {
        number: "02",
        title: "Learn",
        description: "Our system maps interests and experiences using AI embeddings — like semantic DNA for your community."
      },
      {
        number: "03",
        title: "Connect",
        description: "Every month, Commonplace introduces you to someone nearby who shares your curiosity."
      }
    ]
  },

  trust: {
    heading: {
      before: "Safe, private, and built for",
      highlight: "enterprises."
    },
    features: [
      "SOC2-ready and GDPR-compliant security",
      "Double opt-in introductions only",
      "Aggregated analytics, never person-level tracking",
      "Flexible credentialing (email, SSO, or geofence)"
    ]
  },

  outcomes: {
    heading: {
      highlight1: "Belonging",
      middle: "drives retention.",
      highlight2: "Connection",
      after: "drives innovation."
    },
    stats: [
      {
        value: "74%",
        description: "of employees say they'd stay longer if they felt more connected at work"
      },
      {
        value: "30-50%",
        description: "participation within 90 days in Commonplace pilot organizations"
      },
      {
        value: "3 of 4",
        description: "participants report \"meeting someone they wouldn't have otherwise\""
      }
    ],
    testimonials: [
      {
        quote: "Our campus finally feels smaller.",
        author: "MBA student"
      },
      {
        quote: "It's like a quiet culture supercharger.",
        author: "HR Director"
      }
    ]
  },

  finalCTA: {
    heading: {
      before: "Ready to make your organization feel more",
      highlight: "human?"
    },
    buttons: {
      primary: { text: "Request a Demo" },
      secondary: { text: "Get Early Access", variant: "outline" }
    },
    subtext: "Commonplace pilots start with 200–500 users and grow organically.\nWe'll handle setup; you enjoy the ripple effects."
  },

  footer: {
    copyright: "Commonplace © 2025 — Designed to make large organizations feel small again.",
    links: [
      { text: "Privacy", href: "#" },
      { text: "Security", href: "#" },
      { text: "Contact", href: "#" }
    ]
  }
};
```

#### Phase 3: Refactor App.tsx to Use Content (1-2 hours)

**File to modify**: `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/src/App.tsx`

Key changes:

```typescript
// Add import at top (replace line 5)
import { content } from "./content/landingPage";

// Hero section (lines 36-76) becomes:
<motion.div variants={fadeInUp}>
  <Badge variant="outline" className="mb-8 px-6 py-2.5 bg-white/5 border-white/20 text-white backdrop-blur-sm">
    {content.hero.badge}
  </Badge>
</motion.div>

<motion.h1 variants={fadeInUp} className="mx-auto max-w-5xl font-display text-hero font-light">
  {content.hero.headline.before}{' '}
  <span className="italic text-accent-color">{content.hero.headline.highlight}</span>
  {' '}{content.hero.headline.after}
</motion.h1>

<motion.p variants={fadeInUp} className="text-xl md:text-2xl mx-auto max-w-3xl opacity-90 leading-relaxed font-light">
  {content.hero.subheadline}
</motion.p>

<Button size="lg" className="bg-white text-black hover:bg-white/90 px-10 py-7 rounded-full transition-all duration-300 hover:scale-105">
  {content.hero.buttons.primary.text}
  <ArrowRight className="ml-2 h-5 w-5" />
</Button>

// Process cards (lines 196-215) become:
{content.process.steps.map((step, index) => (
  <ProcessCard
    key={step.number}
    {...step}
    delay={0.1 + (index * 0.15)}
  />
))}

// Stats (lines 267-283) become:
{content.outcomes.stats.map((stat, index) => (
  <StatCard
    key={stat.value}
    stat={stat.value}
    description={stat.description}
    delay={0.1 + (index * 0.15)}
  />
))}

// And so on for all sections...
```

#### Phase 4: Create Content Update Documentation (15 minutes)

**File to create**: `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/CONTENT_GUIDE.md`

```markdown
# Content Update Guide

## Quick Start

All website content lives in one file: `src/content/landingPage.ts`

To update content:
1. Open `src/content/landingPage.ts`
2. Find the section you want to edit
3. Update the text directly
4. Save the file
5. Run `npm run build` to rebuild
6. Deploy to Vercel

## Content Structure

The landing page has these sections:

### Hero Section
- Badge text
- Headline (with highlighted text)
- Subheadline
- Button text

### Social Proof
- Heading
- Company names (array)

### Problem Statement
- Heading with highlights
- Description
- Callout text

... (document each section)

## Tips

- Text with `highlight` will appear in italic accent color
- Button text should be short (2-4 words)
- Descriptions should be under 200 characters
- Stats should be concise numbers (e.g., "74%", "3 of 4")

## Common Updates

### Change Call-to-Action Button
```typescript
buttons: {
  primary: { text: "Your New CTA Text" }
}
```

### Update Statistics
```typescript
stats: [
  {
    value: "85%",  // <- Change this
    description: "new stat description"  // <- And this
  }
]
```
```

#### Phase 5: Testing & Validation (30 minutes)

1. **Type checking**: Run `npm run build` to ensure TypeScript types are valid
2. **Visual testing**: Run `npm run dev` and verify all sections render correctly
3. **Content validation**: Check that all original content is preserved
4. **Hot reload**: Test that changes to `landingPage.ts` trigger fast refresh

---

### Files That Need Modification

#### New Files to Create:
1. `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/src/content/types.ts` - Type definitions
2. `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/src/content/landingPage.ts` - Content data
3. `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/CONTENT_GUIDE.md` - Documentation for editors

#### Files to Modify:
1. `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/src/App.tsx` - Replace hardcoded content with imports from content config

#### Files to Keep Unchanged:
- All UI components in `/src/components/ui/`
- Styling in `/src/index.css`
- Build configuration in `vite.config.ts`
- Entry point in `/src/main.tsx`

---

### Migration Path Summary

**Current State**:
- 458-line App.tsx with all content inline
- No content separation
- Difficult to update without code knowledge

**Target State**:
- ~200-line App.tsx focused on presentation
- Content in dedicated `src/content/` directory
- Type-safe content with IntelliSense
- Simple file editing for content updates

**Effort**: 2-4 hours total implementation time

**Risk**: Low - Types ensure nothing breaks during migration

---

## Code References

- `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/src/App.tsx:1-458` - Main component with all hardcoded content
- `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/src/App.tsx:365-389` - ProcessCard component showing props pattern
- `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/src/App.tsx:403-420` - StatCard component
- `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/src/App.tsx:422-439` - TestimonialCard component
- `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/vite.config.ts:1-61` - Vite build configuration
- `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/package.json:6-49` - Dependencies (React, shadcn/ui, Radix UI)
- `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/src/index.css:1422-1502` - Custom CSS properties and design tokens
- `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/src/components/ui/button.tsx:7-35` - Button component with CVA variants
- `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/src/components/figma/ImageWithFallback.tsx:1-28` - Image component with error handling

## Architecture Documentation

### Current Architecture

**Layer 1: Build & Development**
- Vite 6.3.5 with React SWC plugin (fast refresh)
- TypeScript compilation
- Tailwind CSS v4 processing
- Output: Static build to `build/` directory

**Layer 2: UI Framework**
- React 18.3.1 functional components
- shadcn/ui component library (30+ components)
- Radix UI primitives for accessibility
- Framer Motion for animations

**Layer 3: Styling**
- Tailwind CSS utility classes
- Custom CSS properties for design tokens
- Fluid responsive typography with clamp()
- Dark mode support via CSS variables

**Layer 4: Content (Current)**
- Hardcoded JSX in App.tsx
- Images imported via Figma aliases
- Props-based component data
- No content abstraction

**Layer 5: Deployment**
- Vercel hosting
- Build output from `build/` directory
- Environment: Node.js serverless

### Recommended Architecture (After Content Separation)

**New Content Layer**:
```
src/
  content/
    types.ts           # TypeScript interfaces
    landingPage.ts     # Content data
    images.ts          # Image imports/references
  components/
    ui/                # Unchanged
  App.tsx              # Presentation logic only
```

This creates a clean separation of concerns:
- **Content**: What to display
- **Components**: How to display
- **Styling**: Visual appearance
- **App**: Composition and layout

## Open Questions

1. **Content Update Frequency**: How often will content be updated?
   - If weekly/daily → Consider headless CMS
   - If monthly/quarterly → Content file approach is optimal

2. **Content Editors**: Who will be updating content?
   - Developers → TypeScript content file (recommended)
   - Non-technical editors → JSON with validation or CMS

3. **Multi-language Support**: Is internationalization (i18n) needed?
   - If yes → Consider JSON files per language or CMS
   - If no → TypeScript content file works great

4. **A/B Testing**: Will different content variants be tested?
   - If yes → Consider environment variable overrides or CMS
   - If no → Single content file is sufficient

5. **Asset Management**: Will images be frequently updated?
   - If yes → Consider image CDN or CMS
   - If no → Local assets in `src/assets/` work well

6. **Preview Environments**: Do editors need to preview changes before publishing?
   - If yes → CMS with preview mode
   - If no → Git workflow with branch deployments suffices

## Related Research

No prior research documents found in this repository.

## Conclusion

For this Vite-based landing page, the **centralized TypeScript content configuration** approach is the optimal solution. It provides:

- Type safety and developer experience
- Simple content updates (single file editing)
- Low implementation cost (2-4 hours)
- No infrastructure overhead
- Perfect fit for single-page, infrequently-updated sites

Alternative approaches (JSON, MDX, CMS) add complexity without proportional benefit for this use case. The recommended approach can evolve later if requirements change (e.g., adding i18n support or multiple content editors).
