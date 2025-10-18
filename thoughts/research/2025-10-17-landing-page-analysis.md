---
doc_type: research
title: "Landing Page Project Analysis: Structure, Styling, and Deployment Options"
date: 2025-10-17
created_at: 2025-10-17 21:44:52 EDT
last_updated: 2025-10-17 21:44:52 EDT
last_updated_by: Claude
status: completed
researcher: Claude
research_question: "What is the current project structure, how are styles organized, and what are the best deployment options for this Vite React landing page?"
repository: grove-lp
branch: N/A (not a git repository)
git_commit: N/A (not a git repository)
tags:
  - landing-page
  - vite
  - react
  - deployment
  - styling
  - tailwind
  - static-site
  - css-variables
  - railway
  - vercel
  - netlify
  - github-pages
related_docs: []
---

# Research: Landing Page Project Analysis

**Date**: October 17, 2025 21:44:52 EDT
**Researcher**: Claude
**Repository**: grove-lp
**Project Location**: /Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp
**Source Files**: /Users/seankim/Downloads/Landing Page Design Request.zip

## Research Question

What is the current project structure, how are styles organized, and what are the best deployment options for this Vite React landing page?

## Executive Summary

This research documents a comprehensive analysis of a Vite + React landing page project for "Commonplace" (a platform for connecting people in organizations). The project is currently only in a zip file at `/Users/seankim/Downloads/Landing Page Design Request.zip`, with no source files in the actual grove-lp directory yet. The analysis covers:

1. **Project Structure**: A modern React SPA built with Vite, using Tailwind CSS v4, shadcn/ui components, and Framer Motion
2. **Styling Approach**: Mixed approach using Tailwind CSS classes, CSS custom properties, inline styles, and component variants
3. **Deployment Options**: Four platforms analyzed (Railway, Vercel, Netlify, GitHub Pages) with detailed comparison
4. **Recommendations**: Specific guidance on deployment platform selection and styling consolidation

---

## 1. Current Project Structure

### 1.1 Project Overview

**Project Name**: Landing Page Design Request
**Source Design**: https://www.figma.com/design/oINWOouTmA0rWvBOw1bERx/Landing-Page-Design-Request
**Build Tool**: Vite 6.3.5
**Framework**: React 18.3.1
**Language**: TypeScript

### 1.2 Directory Structure

The extracted zip file contains the following structure:

```
/tmp/landing_page_extract/
├── index.html                          # Entry HTML file
├── package.json                        # Dependencies and scripts
├── vite.config.ts                      # Vite configuration
├── README.md                           # Setup instructions
├── src/
│   ├── main.tsx                        # React entry point
│   ├── App.tsx                         # Main application component (444 lines)
│   ├── index.css                       # Generated Tailwind CSS (1715 lines)
│   ├── Attributions.md                 # Asset attributions
│   ├── styles/
│   │   └── globals.css                 # Custom CSS variables and theme (208 lines)
│   ├── assets/
│   │   └── 1d238fd6df90dc12f9289f962d9003c6c6a24d61.png  # Hero image
│   ├── guidelines/
│   │   └── Guidelines.md               # Design system guidelines template
│   └── components/
│       ├── figma/
│       │   └── ImageWithFallback.tsx   # Image component with fallback
│       └── ui/                         # 48+ shadcn/ui components
│           ├── button.tsx              # Button with variants
│           ├── badge.tsx               # Badge component
│           ├── card.tsx                # Card component
│           └── [45+ other UI components]
```

### 1.3 Key Files Analysis

#### package.json (`/tmp/landing_page_extract/package.json`)

**Build System:**
- Vite 6.3.5 with React SWC plugin for fast compilation
- TypeScript support with @types/node

**Dependencies (32 packages):**
- **UI Library**: 31 @radix-ui components for accessible primitives
- **Styling**: Tailwind CSS v4 (via index.css), class-variance-authority, clsx, tailwind-merge
- **Animation**: motion (Framer Motion), vaul (drawer), sonner (toasts)
- **Icons**: lucide-react
- **Charts**: recharts
- **Forms**: react-hook-form, react-day-picker, input-otp
- **Other**: next-themes (dark mode), embla-carousel-react

**Scripts:**
```json
{
  "dev": "vite",          // Development server
  "build": "vite build"   // Production build
}
```

**Build Output:**
- Output directory: `build/` (configured in vite.config.ts:55)
- Build target: esnext

#### vite.config.ts (`/tmp/landing_page_extract/vite.config.ts`)

**Configuration Highlights:**
- React plugin with SWC for fast refresh
- TypeScript support with `.ts`, `.tsx` extensions
- Path alias: `@` → `./src`
- Asset alias for Figma imports: `figma:asset/...` → `./src/assets/...`
- 31 package aliases for Radix UI components
- Dev server: port 3000, auto-open browser
- Build output: `build/` directory

#### App.tsx (`/tmp/landing_page_extract/src/App.tsx`)

**Component Structure (444 lines):**

The App.tsx file contains a single-page landing page with the following sections:

1. **Hero Section** (lines 24-94): Full-screen hero with background image, gradient overlays, heading, and CTA buttons
2. **Social Proof Strip** (lines 96-120): Company logos/names
3. **Problem Statement** (lines 122-164): Large editorial text explaining the problem
4. **Split Feature Section** (lines 166-216): Image + text explaining the solution
5. **How It Works** (lines 218-263): 3-step process cards
6. **Trust Section** (lines 265-308): Security and privacy features
7. **Outcomes Section** (lines 310-365): Statistics and testimonials
8. **Final CTA** (lines 367-418): Call-to-action section
9. **Footer** (lines 420-441): Copyright and links

**Sub-components defined in same file:**
- `ProcessCard` (lines 445-477): Three-step process card
- `TrustFeature` (lines 479-488): Security feature with checkmark icon
- `StatCard` (lines 490-516): Statistic display
- `TestimonialCard` (lines 518-544): Testimonial quote card

### 1.4 Current Grove-LP Directory

The current project directory at `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp` contains:

```
.claude/           # Claude Code configuration and agents
hack/              # Utility scripts including frontmatter generation
thoughts/          # Documentation directory with subdirectories:
  ├── research/
  ├── plans/
  ├── learning/
  ├── implementation-details/
  └── reviews/
```

**Important**: The actual landing page source code is NOT yet in the grove-lp directory. It only exists in the zip file. The directory needs to be initialized with the extracted files.

---

## 2. Styling Analysis

### 2.1 Styling Approaches Used

The project uses **four different styling approaches** simultaneously:

#### 2.1.1 Tailwind CSS Classes

**Primary styling method** used throughout the application.

**Location**: Applied via className prop on components

**Examples from App.tsx:**
```tsx
// Line 15: Background and layout
<div className="min-h-screen bg-background relative overflow-hidden">

// Line 37: Container and spacing
<div className="container mx-auto px-6 md:px-12 relative z-20 max-w-6xl">

// Line 44: Badge styling
<Badge variant="outline" className="mb-8 px-6 py-2.5 bg-white/5 border-white/20 text-white backdrop-blur-sm">
```

**Tailwind Classes Used:**
- Layout: `flex`, `grid`, `container`, `relative`, `absolute`, `fixed`
- Sizing: `w-full`, `h-full`, `min-h-screen`, `max-w-{size}`
- Spacing: `px-{n}`, `py-{n}`, `mx-auto`, `gap-{n}`, `space-y-{n}`
- Colors: `bg-{color}`, `text-{color}`, `border-{color}`
- Responsive: `md:`, `sm:` breakpoint prefixes
- Effects: `opacity-{n}`, `backdrop-blur-sm`, `transition-all`

#### 2.1.2 Inline Styles (Style Objects)

**Usage**: Complex styles that can't be expressed in Tailwind, especially dynamic gradients and typography.

**Examples from App.tsx:**

**Background Gradients (lines 17-21, 27-29):**
```tsx
<div
  className="fixed inset-0 -z-10 animate-gradient opacity-30"
  style={{
    background: 'linear-gradient(135deg, rgba(212, 165, 116, 0.15) 0%, rgba(250, 250, 249, 0) 30%, rgba(160, 120, 85, 0.1) 60%, rgba(250, 250, 249, 0) 100%)'
  }}
/>

<div className="absolute inset-0 z-10" style={{
  background: 'radial-gradient(circle at 30% 20%, rgba(212, 165, 116, 0.12) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(160, 120, 85, 0.1) 0%, transparent 50%), linear-gradient(135deg, rgba(26, 26, 26, 0.65) 0%, rgba(26, 26, 26, 0.55) 50%, rgba(47, 69, 56, 0.6) 100%)'
}} />
```

**Typography Styles (lines 52-58, 61, 67-68, etc.):**
```tsx
<motion.h1
  variants={fadeInUp}
  className="mx-auto max-w-5xl"
  style={{
    fontSize: 'clamp(2.5rem, 6vw, 5rem)',
    lineHeight: '1.1',
    fontFamily: 'Georgia, serif',
    fontWeight: 300,
    letterSpacing: '-0.02em'
  }}
>

<span style={{ fontStyle: 'italic', color: '#d4a574' }}>hundreds of people</span>
```

**Hardcoded Colors in Inline Styles:**
- `#d4a574` - Accent gold/tan color (appears 5+ times)
- `#a07855` - Secondary brown color (appears 2+ times)
- `rgba(212, 165, 116, ...)` - Accent with opacity
- `rgba(160, 120, 85, ...)` - Secondary with opacity
- `rgba(26, 26, 26, ...)` - Dark overlay

#### 2.1.3 CSS Custom Properties (CSS Variables)

**Location**: `src/styles/globals.css` (lines 1-120)

**Theme Variables Defined:**

**Root Theme (Light Mode) - lines 3-42:**
```css
:root {
  --font-size: 16px;
  --background: #fafaf9;
  --foreground: rgb(74 71 65);
  --card: #ffffff;
  --card-foreground: rgb(74 71 65);
  --popover: #ffffff;
  --popover-foreground: rgb(74 71 65);
  --primary: #1a1a1a;
  --primary-foreground: #fafaf9;
  --secondary: #a07855;
  --secondary-foreground: #fafaf9;
  --muted: #f5f5f4;
  --muted-foreground: rgb(115 111 102);
  --accent: #d4a574;
  --accent-foreground: rgb(74 71 65);
  --destructive: #dc2626;
  --destructive-foreground: #ffffff;
  --border: rgba(74, 71, 65, 0.1);
  --input: transparent;
  --input-background: #f5f5f4;
  --switch-background: #d4d4d8;
  --font-weight-medium: 500;
  --font-weight-normal: 400;
  --ring: #a07855;
  --radius: 0.375rem;
  /* Chart colors using oklch */
  /* Sidebar colors */
}
```

**Dark Theme - lines 44-79:**
```css
.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  /* ... all theme colors redefined for dark mode */
}
```

**Tailwind Theme Mapping - lines 81-120:**
```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  /* Maps CSS variables to Tailwind color system */
}
```

**Custom Animations - lines 191-207:**
```css
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradientShift 15s ease infinite;
}
```

#### 2.1.4 Component Variant System (CVA)

**Location**: UI components using class-variance-authority

**Example**: `src/components/ui/button.tsx` (lines 7-35)

```tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90",
        outline: "border bg-background text-foreground hover:bg-accent",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md gap-1.5 px-3",
        lg: "h-10 rounded-md px-6",
        icon: "size-9 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);
```

### 2.2 Design Tokens Inventory

#### 2.2.1 Colors

**Defined in CSS Variables** (`globals.css`):
- Primary: `#1a1a1a` (near black)
- Secondary: `#a07855` (brown)
- Accent: `#d4a574` (gold/tan)
- Background: `#fafaf9` (off-white)
- Foreground: `rgb(74 71 65)` (dark gray)
- Destructive: `#dc2626` (red)

**Hardcoded in Inline Styles** (App.tsx):
- `#d4a574` - accent gold (used for emphasized text)
- `#a07855` - secondary brown
- Various rgba() values for gradients with opacity

**Issue**: The same colors are defined in two places (CSS variables AND hardcoded), creating maintenance burden.

#### 2.2.2 Typography

**Fonts:**
- Primary: System sans-serif (Tailwind default)
- Editorial/Headings: Georgia, serif (inline style)

**Font Sizes** (Tailwind CSS variables in index.css):
- `--text-xs`: 0.75rem
- `--text-sm`: 0.875rem
- `--text-base`: 1rem
- `--text-lg`: 1.125rem
- `--text-xl`: 1.25rem
- `--text-2xl`: 1.5rem
- `--text-3xl`: 1.875rem

**Responsive Typography** (clamp() in inline styles):
- `clamp(2.5rem, 6vw, 5rem)` - Hero heading
- `clamp(2rem, 5vw, 4rem)` - Section headings
- `clamp(1.75rem, 4vw, 3rem)` - Subsection headings

**Font Weights:**
- `--font-weight-normal`: 400
- `--font-weight-medium`: 500
- Inline: 300 (light weight for Georgia serif)

**Line Heights:**
- Base: 1.5
- Tight: 1.1 (hero), 1.2 (headings)
- Relaxed: 1.6, 1.7 (body text)

**Letter Spacing:**
- `--tracking-tight`: -0.025em
- `--tracking-wider`: 0.05em
- `--tracking-widest`: 0.1em
- Inline: -0.02em, -0.01em (for large headings)

#### 2.2.3 Spacing

**Tailwind Spacing System** (index.css):
- Base unit: `--spacing: 0.25rem` (4px)
- All spacing uses calc(var(--spacing) * n)
- Common values: 2, 3, 4, 6, 8, 10, 12, 16, 20, 24, 32, 40

**Container Widths:**
- `--container-lg`: 32rem
- `--container-3xl`: 48rem
- `--container-4xl`: 56rem
- `--container-5xl`: 64rem
- `--container-6xl`: 72rem
- `--container-7xl`: 80rem

**Padding Scale** (common in App.tsx):
- Small: 6 (1.5rem), 8 (2rem), 10 (2.5rem), 12 (3rem)
- Large sections: 16 (4rem), 20 (5rem), 24 (6rem), 32 (8rem), 40 (10rem)

#### 2.2.4 Borders and Radius

**Border Radius:**
- `--radius`: 0.375rem (base)
- `--radius-sm`: calc(var(--radius) - 4px)
- `--radius-md`: calc(var(--radius) - 2px)
- `--radius-lg`: var(--radius)
- `--radius-xl`: calc(var(--radius) + 4px)
- Full: 3.40282e38px (effectively infinite for pills/rounds)

**Border Colors:**
- `--border`: rgba(74, 71, 65, 0.1)
- White variations: `/10`, `/20`, `/30` (opacity percentages)

#### 2.2.5 Effects

**Opacity Values:**
- 20%, 30%, 60%, 70%, 80%, 90% (used throughout)

**Backdrop Blur:**
- `--blur-sm`: 8px
- Applied via `backdrop-blur-sm` class

**Shadows:**
- Defined in Tailwind variables but not extensively used in this design

**Transitions:**
- `--default-transition-duration`: 0.15s
- `--default-transition-timing-function`: cubic-bezier(0.4, 0, 0.2, 1)
- Custom durations: 300ms, 800ms, 900ms, 1000ms, 1200ms
- Custom easing: [0.22, 1, 0.36, 1] (smooth out-cubic)

### 2.3 Animation System

**Framer Motion Animations** (App.tsx):

**Fade In Up** (lines 8-12):
```tsx
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};
```

**View-Based Animations** (examples throughout):
```tsx
initial={{ opacity: 0, y: 40 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-100px" }}
transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
```

**CSS Animations** (globals.css):
- `gradientShift` keyframe animation (15s infinite)
- Applied via `.animate-gradient` class

### 2.4 Styling Architecture Summary

**Current State:**
- ✅ CSS variables for theme colors (well organized)
- ✅ Tailwind utility classes (extensive usage)
- ✅ Component variants system (CVA in shadcn/ui)
- ⚠️ Inline styles for complex layouts (gradients, typography)
- ⚠️ Hardcoded colors in inline styles (duplicates CSS variables)
- ⚠️ Mixed font definitions (system + Georgia serif)
- ⚠️ Inconsistent color application (vars vs hardcoded)

**Styling Layers:**
1. **Base Layer**: Tailwind CSS reset and base styles (index.css)
2. **Theme Layer**: CSS custom properties (globals.css)
3. **Utility Layer**: Tailwind classes (generated in index.css)
4. **Component Layer**: CVA variants (button.tsx, etc.)
5. **Override Layer**: Inline styles in App.tsx

---

## 3. Static Site Deployment Options

### 3.1 Platform Comparison Table

| Feature | Railway | Vercel | Netlify | GitHub Pages |
|---------|---------|--------|---------|--------------|
| **Static Site Support** | ✅ Yes (via Caddy/Nginx) | ✅ Yes (native) | ✅ Yes (native) | ✅ Yes (native) |
| **Free Tier** | ⚠️ $5 one-time credit | ✅ 100GB bandwidth/month | ✅ 100GB bandwidth/month | ✅ Unlimited (soft limit 1GB) |
| **Build Minutes** | Limited by $5 credit | 6,000/month | 300/month | Unlimited (GitHub Actions) |
| **Bandwidth** | Usage-based (from credit) | 100GB/month | 100GB/month | 100GB/month soft limit |
| **Function Invocations** | Usage-based | 150,000/month | 125,000/month | ❌ No serverless functions |
| **Custom Domain** | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes |
| **SSL/HTTPS** | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes |
| **Auto Deploy (Git)** | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes (Actions) |
| **CDN** | ✅ Global | ✅ Edge Network | ✅ Global | ✅ GitHub CDN |
| **Build Command** | `npm run build` | Auto-detected | Auto-detected | Manual (Actions) |
| **Output Dir** | Configure manually | Auto-detected (dist) | Auto-detected (dist) | Manual (gh-pages) |
| **Recurring Cost** | ⚠️ Must upgrade after $5 | ✅ Free tier persists | ✅ Free tier persists | ✅ Always free |

### 3.2 Railway

**Overview**: Container-based platform with usage-based pricing.

**Static Site Deployment Method**:
- Uses Caddy or Nginx web server to serve static files
- Requires Dockerfile and Caddyfile configuration
- Deploys from GitHub repository or Railway CLI

**Free Tier (2025)**:
- ❌ No recurring free tier
- One-time $5 credit for trial accounts
- Services stop when credit runs out

**Pricing Model**:
- Hobby Plan: $5/month subscription (includes $5 usage credit)
- Usage-based: Pay for CPU, memory, and egress (bandwidth)
- If you don't use the $5 credit, you still pay $5 subscription

**Configuration Requirements**:

**Caddyfile** (to serve static files):
```
:{$PORT}
root * /srv
file_server
try_files {path} /index.html
```

**Dockerfile**:
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM caddy:2-alpine
COPY --from=builder /app/build /srv
COPY Caddyfile /etc/caddy/Caddyfile
```

**Vite Config Adjustment**:
```ts
export default defineConfig({
  // ...
  build: {
    outDir: 'build', // Already configured
  },
});
```

**Pros**:
- Works with any static site via Docker
- Global infrastructure
- Good for full-stack apps (if you need databases, etc.)

**Cons**:
- No ongoing free tier (requires payment)
- More complex setup (Docker, Caddy)
- Overkill for a simple static site
- Credit runs out quickly with usage

**Best For**: Full-stack applications with databases and backend services, not ideal for pure static sites.

**Sources**:
- https://railway.com/pricing
- https://docs.railway.com/guides/react
- https://docs.railway.com/reference/pricing/plans

### 3.3 Vercel

**Overview**: Platform by the creators of Next.js, optimized for frontend frameworks.

**Static Site Deployment Method**:
- Auto-detects Vite projects
- Git push triggers automatic deployment
- Zero configuration needed (detects vite build automatically)

**Free Tier (Hobby Plan - 2025)**:
- ✅ 100GB bandwidth per month (~100k visitors)
- ✅ 6,000 build minutes per month
- ✅ 150,000 serverless function invocations per month
- ✅ 100 GB-hours of function execution
- ✅ Unlimited projects
- ⚠️ Hard limit: No overages allowed, service stops at limit

**Upgrade Path**:
- Pro Plan: $20/user/month
- 1TB bandwidth (~1M+ visitors)

**Configuration**:

**Automatic** (no config needed):
- Vercel detects Vite and runs `vite build`
- Auto-detects `dist` output directory
- No vercel.json needed for basic static sites

**Optional vercel.json** (for SPA routing):
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

**Deployment Workflow**:
1. Connect GitHub repository to Vercel
2. Vercel auto-detects Vite
3. Every git push triggers deployment
4. Preview deployments for branches
5. Production deployment for main branch

**Pros**:
- ✅ Zero configuration (just works)
- ✅ Best-in-class DX (developer experience)
- ✅ Fast global CDN
- ✅ Generous free tier
- ✅ Excellent for React/Vite projects
- ✅ Preview deployments for every PR

**Cons**:
- ⚠️ Free tier has hard limits (no overages)
- ⚠️ Costs can jump quickly on paid plans
- ⚠️ Vendor lock-in (Vercel-specific features)

**Best For**: React/Vite SPAs, portfolios, small-to-medium traffic sites, teams that want preview deployments.

**Sources**:
- https://vercel.com/pricing
- https://vercel.com/docs/limits
- https://vite.dev/guide/static-deploy
- https://flexprice.io/blog/vercel-pricing-breakdown

### 3.4 Netlify

**Overview**: Veteran static site hosting platform with strong Git integration.

**Static Site Deployment Method**:
- Auto-detects Vite projects
- Git push triggers build and deployment
- Supports multiple frameworks out of the box

**Free Tier (2025)**:
- ✅ 100GB bandwidth per month
- ✅ 300 build minutes per month
- ✅ 125,000 serverless function invocations per month
- ✅ 1 team member
- ✅ CI/CD, custom domains, HTTPS
- ⚠️ Services suspended if limits exceeded (can upgrade to restore)

**Upgrade Path**:
- Pro Plan: $19/month (usage-based pricing)
- 1TB bandwidth
- Unlimited build minutes

**Configuration**:

**Automatic** (via UI or Netlify CLI):
- Netlify detects Vite framework
- Auto-configures build command: `npm run build`
- Auto-configures publish directory: `dist`

**Optional netlify.toml**:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Deployment Workflows**:

**Method 1: Git Integration**
1. Connect GitHub/GitLab/Bitbucket
2. Select repository
3. Configure build settings (or auto-detect)
4. Deploy

**Method 2: Netlify CLI**
```bash
npm install -g netlify-cli
netlify deploy --prod
```

**Method 3: Drag & Drop**
- Build locally: `npm run build`
- Drag `dist` folder to Netlify dashboard

**Pros**:
- ✅ Simple, intuitive UI
- ✅ Generous free tier
- ✅ Great documentation
- ✅ Built-in form handling
- ✅ Split testing (A/B testing)
- ✅ No credit card required

**Cons**:
- ⚠️ Lower build minutes than Vercel (300 vs 6000)
- ⚠️ Service suspension if limits exceeded

**Best For**: Static sites, JAMstack projects, marketing sites, landing pages, side projects.

**Sources**:
- https://www.netlify.com/pricing/
- https://docs.netlify.com/frameworks/vite/
- https://vite.dev/guide/static-deploy

### 3.5 GitHub Pages

**Overview**: Free static site hosting directly from GitHub repositories.

**Static Site Deployment Method**:
- Serves static files from `gh-pages` branch or `/docs` folder
- No build server (requires GitHub Actions or local builds)
- Best for open-source projects and documentation

**Free Tier (2025)**:
- ✅ Unlimited sites (one per repository)
- ✅ Unlimited bandwidth (soft limit ~100GB/month)
- ✅ Unlimited builds (via GitHub Actions free tier)
- ✅ 2000 GitHub Actions minutes/month (free tier)
- ✅ No credit card required
- ✅ Always free for public repositories

**Configuration Requirements**:

**1. Update vite.config.ts** (set base path):
```ts
export default defineConfig({
  plugins: [react()],
  base: '/grove-lp/', // Repository name
  build: {
    outDir: 'dist',
  },
});
```

**2. Install gh-pages**:
```bash
npm install gh-pages --save-dev
```

**3. Update package.json**:
```json
{
  "homepage": "https://username.github.io/grove-lp/",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

**4. Add .nojekyll** (important!):
```bash
# Create .nojekyll in public/ folder or dist/ after build
echo > public/.nojekyll
```

Without `.nojekyll`, GitHub Pages won't serve files starting with underscore (Vite creates `_plugin-vue_export-helper.js` etc.).

**Deployment Workflows**:

**Method 1: Manual Deploy (gh-pages CLI)**
```bash
npm run deploy
```

This builds and pushes to `gh-pages` branch automatically.

**Method 2: GitHub Actions** (automated on push)

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

**5. Configure Repository Settings**:
- Go to repository Settings → Pages
- Source: Deploy from branch
- Branch: `gh-pages` / `/ (root)`
- Save

**React Router Configuration** (if using client-side routing):
```tsx
import { BrowserRouter } from 'react-router-dom';

<BrowserRouter basename="/grove-lp">
  <App />
</BrowserRouter>
```

**Pros**:
- ✅ Completely free (no credit card)
- ✅ Simple for static sites
- ✅ Great for open-source projects
- ✅ Integrated with GitHub (repo + hosting in one place)
- ✅ Unlimited sites (one per repo)
- ✅ Custom domains supported

**Cons**:
- ❌ No serverless functions
- ⚠️ Requires manual configuration (base path)
- ⚠️ Build process more manual (need gh-pages package or Actions)
- ⚠️ Slower deployments than Vercel/Netlify
- ⚠️ Limited to 1GB repository size
- ⚠️ 100GB/month bandwidth soft limit

**Best For**: Open-source projects, documentation, portfolios, landing pages with low-to-medium traffic, projects already on GitHub.

**Sources**:
- https://vite.dev/guide/static-deploy
- https://github.com/sitek94/vite-deploy-demo
- https://docs.github.com/en/pages

---

## 4. Deployment Recommendations

### 4.1 Decision Matrix

For this specific project (Commonplace landing page), here are platform recommendations based on different scenarios:

| Scenario | Recommended Platform | Reason |
|----------|---------------------|---------|
| **Quick prototype/demo** | Vercel | Zero config, fastest time to deployment |
| **Long-term free hosting** | Netlify or GitHub Pages | Truly free with no credits to run out |
| **Open-source project** | GitHub Pages | Free forever, integrated with repo |
| **Team collaboration** | Vercel or Netlify | Preview deployments, team features |
| **Future backend needs** | Railway or Vercel | Support for serverless functions/databases |
| **Maximum control** | Railway | Full Docker control (overkill for static) |
| **No credit card** | GitHub Pages or Netlify | No payment method required |
| **Highest traffic potential** | Netlify or Vercel | Best CDN and bandwidth on free tier |

### 4.2 Recommended Platform: **Vercel** (Primary) or **Netlify** (Alternative)

**Why Vercel:**

1. **Zero Configuration**: Auto-detects Vite, no config files needed
2. **Best Developer Experience**:
   - Push to git → instant deployment
   - Preview URLs for every branch/PR
   - Fast builds (6000 minutes/month)
3. **Generous Free Tier**: 100GB bandwidth handles ~100k visitors
4. **Purpose-Built for React/Vite**: Created by Next.js team, excellent Vite support
5. **Fast Global CDN**: Best performance for static sites
6. **Room to Grow**: Can add serverless functions later if needed

**Why Netlify (Alternative):**

1. **Equally Simple**: Auto-detects Vite, minimal config
2. **True Free Tier**: No hidden limits, clear suspension policy
3. **Proven Platform**: Longer track record with static sites
4. **Better UI**: More intuitive dashboard
5. **Built-in Features**: Forms, split testing, redirects

**Why NOT Railway:**
- Requires Docker knowledge (unnecessary complexity)
- No ongoing free tier (must pay after $5 credit)
- Overkill for a static landing page
- Better suited for full-stack apps with databases

**Why NOT GitHub Pages:**
- Requires manual configuration (base path, gh-pages)
- Slower deployment workflow
- No preview deployments
- Less developer-friendly for modern frameworks
- Better for documentation/open-source projects

### 4.3 Deployment Configuration: Vercel

#### Step-by-Step Deployment to Vercel:

**Prerequisites:**
- GitHub account
- Vercel account (free, sign up with GitHub)
- This project pushed to a GitHub repository

**Deployment Steps:**

1. **Push code to GitHub**:
```bash
git init
git add .
git commit -m "Initial commit: Commonplace landing page"
git remote add origin https://github.com/username/grove-lp.git
git push -u origin main
```

2. **Connect to Vercel**:
   - Go to https://vercel.com
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel auto-detects Vite configuration

3. **Review Settings** (auto-populated):
   - Framework Preset: Vite
   - Build Command: `vite build`
   - Output Directory: `build` (from vite.config.ts)
   - Install Command: `npm install`

4. **Deploy**:
   - Click "Deploy"
   - Wait ~1-2 minutes for build
   - Get deployment URL: `https://grove-lp.vercel.app`

5. **Configure Custom Domain** (optional):
   - Go to Project Settings → Domains
   - Add your custom domain
   - Update DNS records (Vercel provides instructions)

**Required Configuration Files:**

**None!** Vercel auto-detects everything.

**Optional vercel.json** (only if you need advanced features):
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite"
}
```

#### Ongoing Workflow:

**Automatic Deployments:**
- Push to `main` branch → Production deployment
- Push to any other branch → Preview deployment
- Open PR → Automatic preview URL in comments

**No manual steps needed** - just git push!

### 4.4 Deployment Configuration: Netlify (Alternative)

#### Step-by-Step Deployment to Netlify:

**Method 1: Git Integration (Recommended)**

1. **Push code to GitHub** (same as Vercel)

2. **Connect to Netlify**:
   - Go to https://netlify.com
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub and select repository

3. **Configure Build Settings** (auto-detected):
   - Build command: `npm run build`
   - Publish directory: `build`
   - Click "Deploy site"

4. **Get URL**: `https://[random-name].netlify.app`

5. **Configure Custom Domain** (optional):
   - Site settings → Domain management
   - Add custom domain
   - Update DNS

**Method 2: Netlify CLI**

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build locally
npm run build

# Deploy
netlify deploy --prod
```

**Required Configuration Files:**

**None!** Netlify auto-detects Vite.

**Optional netlify.toml** (for SPA routing):
```toml
[build]
  command = "npm run build"
  publish = "build"

# Redirect all routes to index.html for SPA
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

Note: This project is a single-page app (no React Router), so redirects aren't strictly necessary. But good to have for future routing.

### 4.5 Important: Vite Config Adjustment

The current `vite.config.ts` sets output to `build/`:

```ts
build: {
  target: 'esnext',
  outDir: 'build', // Custom output directory
},
```

**For Vercel/Netlify:**
- Both platforms auto-detect `dist` by default
- Current config uses `build/` - **this is fine**, both platforms can handle it
- Vercel/Netlify will read the config and deploy from `build/`

**No changes needed** - current config works with all platforms.

---

## 5. Styling Consolidation Plan

### 5.1 Current Problems

The current styling approach has several maintainability issues:

1. **Duplicate Color Definitions**:
   - CSS variables define `--accent: #d4a574`
   - Inline styles hardcode `color: '#d4a574'`
   - Same color exists in TWO places

2. **Inconsistent Color Application**:
   - Some components use Tailwind classes: `text-accent`
   - Others use inline styles: `style={{ color: '#d4a574' }}`
   - Makes theme changes difficult

3. **Inline Gradient Complexity**:
   - Complex gradients defined inline in App.tsx
   - Can't be reused across components
   - Hard to maintain/update

4. **Mixed Font Systems**:
   - Tailwind uses system sans-serif
   - Georgia serif defined inline
   - No centralized typography system

5. **Scattered Animation Definitions**:
   - Framer Motion configs in component
   - CSS animations in globals.css
   - No single source of truth

### 5.2 Recommended Architecture

**Goal**: Single source of truth for all design tokens, using CSS variables as the foundation.

#### 5.2.1 Enhanced CSS Variables System

**File**: `src/styles/design-tokens.css` (new file)

```css
/**
 * Design Tokens - Single Source of Truth
 * All design decisions centralized here
 */

:root {
  /* === Typography === */
  --font-family-sans: ui-sans-serif, system-ui, sans-serif;
  --font-family-serif: Georgia, 'Times New Roman', serif;
  --font-family-display: var(--font-family-serif);

  --font-size-base: 16px;

  /* Font sizes with fluid scaling */
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;

  /* Responsive/fluid font sizes */
  --font-size-hero: clamp(2.5rem, 6vw, 5rem);
  --font-size-section-heading: clamp(2rem, 4vw, 3.5rem);
  --font-size-subsection-heading: clamp(1.75rem, 4vw, 3rem);

  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;

  --line-height-tight: 1.1;
  --line-height-snug: 1.2;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.6;
  --line-height-loose: 1.7;

  --letter-spacing-tight: -0.02em;
  --letter-spacing-normal: 0;
  --letter-spacing-wide: 0.025em;

  /* === Colors === */
  /* Base palette */
  --color-black: #000000;
  --color-white: #ffffff;

  /* Brand colors */
  --color-primary: #1a1a1a;
  --color-primary-foreground: #fafaf9;
  --color-secondary: #a07855;
  --color-secondary-foreground: #fafaf9;
  --color-accent: #d4a574;
  --color-accent-foreground: #4a4741;

  /* Neutrals */
  --color-background: #fafaf9;
  --color-foreground: #4a4741;
  --color-muted: #f5f5f4;
  --color-muted-foreground: #736f66;

  /* Semantic colors */
  --color-destructive: #dc2626;
  --color-destructive-foreground: #ffffff;

  /* UI elements */
  --color-border: rgba(74, 71, 65, 0.1);
  --color-input: transparent;
  --color-ring: #a07855;

  /* === Gradients === */
  /* Background gradients (reusable) */
  --gradient-bg-subtle: linear-gradient(
    135deg,
    rgba(212, 165, 116, 0.15) 0%,
    rgba(250, 250, 249, 0) 30%,
    rgba(160, 120, 85, 0.1) 60%,
    rgba(250, 250, 249, 0) 100%
  );

  --gradient-bg-warm: linear-gradient(
    135deg,
    rgba(212, 165, 116, 0.08) 0%,
    rgba(250, 250, 249, 0) 40%,
    rgba(160, 120, 85, 0.06) 70%,
    rgba(250, 250, 249, 0) 100%
  );

  --gradient-hero-overlay:
    radial-gradient(circle at 30% 20%, rgba(212, 165, 116, 0.12) 0%, transparent 50%),
    radial-gradient(circle at 70% 80%, rgba(160, 120, 85, 0.1) 0%, transparent 50%),
    linear-gradient(135deg, rgba(26, 26, 26, 0.65) 0%, rgba(26, 26, 26, 0.55) 50%, rgba(47, 69, 56, 0.6) 100%);

  /* === Spacing === */
  --spacing-unit: 0.25rem; /* 4px */

  /* === Border Radius === */
  --radius: 0.375rem;
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --radius-full: 9999px;

  /* === Shadows === */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);

  /* === Transitions === */
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base: 300ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 500ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-smooth: 800ms cubic-bezier(0.22, 1, 0.36, 1);

  /* === Z-index Scale === */
  --z-base: 0;
  --z-dropdown: 10;
  --z-sticky: 20;
  --z-overlay: 30;
  --z-modal: 40;
  --z-popover: 50;
  --z-tooltip: 60;
}

/* Dark mode overrides */
.dark {
  --color-background: oklch(0.145 0 0);
  --color-foreground: oklch(0.985 0 0);
  --color-primary: oklch(0.985 0 0);
  --color-primary-foreground: oklch(0.205 0 0);
  --color-secondary: oklch(0.269 0 0);
  --color-accent: oklch(0.269 0 0);
  /* ... other dark mode overrides */
}
```

#### 5.2.2 Tailwind Integration

**File**: `src/styles/globals.css` (updated)

```css
@import './design-tokens.css';

/* Map CSS variables to Tailwind theme */
@theme inline {
  /* Colors */
  --color-background: var(--color-background);
  --color-foreground: var(--color-foreground);
  --color-primary: var(--color-primary);
  --color-primary-foreground: var(--color-primary-foreground);
  --color-secondary: var(--color-secondary);
  --color-secondary-foreground: var(--color-secondary-foreground);
  --color-accent: var(--color-accent);
  --color-accent-foreground: var(--color-accent-foreground);

  /* Typography */
  --font-sans: var(--font-family-sans);
  --font-serif: var(--font-family-serif);
  --font-display: var(--font-family-display);

  /* Spacing (already handled by Tailwind) */
  /* Radius */
  --radius-sm: var(--radius-sm);
  --radius: var(--radius);
  --radius-md: var(--radius-md);
  --radius-lg: var(--radius-lg);
  --radius-xl: var(--radius-xl);
  --radius-full: var(--radius-full);
}

/* Base styles */
@layer base {
  html {
    font-size: var(--font-size-base);
    font-family: var(--font-family-sans);
  }

  body {
    @apply bg-background text-foreground;
  }
}

/* Utility classes for custom values */
@layer utilities {
  /* Typography utilities */
  .font-display {
    font-family: var(--font-family-display);
  }

  .text-hero {
    font-size: var(--font-size-hero);
    line-height: var(--line-height-tight);
    letter-spacing: var(--letter-spacing-tight);
  }

  .text-section-heading {
    font-size: var(--font-size-section-heading);
    line-height: var(--line-height-snug);
    letter-spacing: var(--letter-spacing-tight);
  }

  .text-subsection-heading {
    font-size: var(--font-size-subsection-heading);
    line-height: var(--line-height-snug);
  }

  /* Gradient backgrounds */
  .bg-gradient-subtle {
    background: var(--gradient-bg-subtle);
  }

  .bg-gradient-warm {
    background: var(--gradient-bg-warm);
  }

  .bg-hero-overlay {
    background: var(--gradient-hero-overlay);
  }
}

/* Animation keyframes */
@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradientShift 15s ease infinite;
}
```

#### 5.2.3 Updated Component Usage

**File**: `src/App.tsx` (refactored examples)

**Before** (inline styles):
```tsx
<div
  className="fixed inset-0 -z-10 animate-gradient opacity-30"
  style={{
    background: 'linear-gradient(135deg, rgba(212, 165, 116, 0.15) 0%, rgba(250, 250, 249, 0) 30%, rgba(160, 120, 85, 0.1) 60%, rgba(250, 250, 249, 0) 100%)'
  }}
/>
```

**After** (CSS variable):
```tsx
<div className="fixed inset-0 -z-10 animate-gradient opacity-30 bg-gradient-subtle" />
```

---

**Before** (inline typography):
```tsx
<motion.h1
  variants={fadeInUp}
  className="mx-auto max-w-5xl"
  style={{
    fontSize: 'clamp(2.5rem, 6vw, 5rem)',
    lineHeight: '1.1',
    fontFamily: 'Georgia, serif',
    fontWeight: 300,
    letterSpacing: '-0.02em'
  }}
>
```

**After** (utility class):
```tsx
<motion.h1
  variants={fadeInUp}
  className="mx-auto max-w-5xl font-display text-hero font-light"
>
```

---

**Before** (hardcoded color):
```tsx
<span style={{ fontStyle: 'italic', color: '#d4a574' }}>hundreds of people</span>
```

**After** (Tailwind class):
```tsx
<span className="italic text-accent">hundreds of people</span>
```

---

**Before** (inline gradient):
```tsx
<div className="absolute inset-0 z-10" style={{
  background: 'radial-gradient(circle at 30% 20%, rgba(212, 165, 116, 0.12) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(160, 120, 85, 0.1) 0%, transparent 50%), linear-gradient(135deg, rgba(26, 26, 26, 0.65) 0%, rgba(26, 26, 26, 0.55) 50%, rgba(47, 69, 56, 0.6) 100%)'
}} />
```

**After** (utility class):
```tsx
<div className="absolute inset-0 z-10 bg-hero-overlay" />
```

#### 5.2.4 Component-Level Custom Properties

For component-specific theming, use scoped CSS variables:

**Example**: Button with custom theme

```css
/* src/components/ui/button.css */
.btn-custom {
  --btn-bg: var(--color-accent);
  --btn-fg: var(--color-accent-foreground);
  --btn-hover-bg: oklch(from var(--color-accent) calc(l - 0.05) c h);

  background-color: var(--btn-bg);
  color: var(--btn-fg);
  transition: background-color var(--transition-base);
}

.btn-custom:hover {
  background-color: var(--btn-hover-bg);
}
```

### 5.3 Migration Steps

**Phase 1: Create Design Tokens** (1-2 hours)
1. Create `src/styles/design-tokens.css`
2. Move all CSS variables from `globals.css` to `design-tokens.css`
3. Add new variables for gradients, typography, transitions
4. Import `design-tokens.css` in `globals.css`

**Phase 2: Add Utility Classes** (1 hour)
1. Add typography utilities (`.text-hero`, `.font-display`, etc.)
2. Add gradient utilities (`.bg-gradient-subtle`, etc.)
3. Test utilities in a sample component

**Phase 3: Refactor App.tsx** (2-3 hours)
1. Replace inline gradients with utility classes
2. Replace inline typography with utility classes
3. Replace hardcoded colors with Tailwind classes
4. Test all sections for visual consistency

**Phase 4: Update Components** (1-2 hours)
1. Review all UI components (`src/components/ui/`)
2. Ensure they use CSS variables for theming
3. Update any hardcoded values

**Phase 5: Documentation** (30 minutes)
1. Document all design tokens in `design-tokens.css` (add comments)
2. Create a style guide showing how to use tokens
3. Update README with styling conventions

**Total Estimated Time**: 6-9 hours

### 5.4 Benefits of Consolidation

**Before**:
- Colors defined in 2+ places (CSS vars + inline)
- Gradients copy-pasted (maintainability nightmare)
- Typography inconsistent (inline + Tailwind)
- Theme changes require editing multiple files

**After**:
- **Single source of truth**: All tokens in `design-tokens.css`
- **Easy theming**: Change one variable, entire site updates
- **Reusable patterns**: Gradients, typography defined once
- **Better performance**: No duplicate inline styles
- **Easier collaboration**: Designers can edit tokens directly
- **Future-proof**: Easy to add dark mode, color schemes, etc.

### 5.5 Advanced: Automatic Theme Generation

For future enhancement, consider generating color variations automatically:

```css
:root {
  --color-accent: #d4a574;

  /* Auto-generate hover/active states using oklch */
  --color-accent-hover: oklch(from var(--color-accent) calc(l - 0.05) c h);
  --color-accent-active: oklch(from var(--color-accent) calc(l - 0.1) c h);

  /* Auto-generate opacity variants */
  --color-accent-10: color-mix(in oklch, var(--color-accent) 10%, transparent);
  --color-accent-20: color-mix(in oklch, var(--color-accent) 20%, transparent);
  --color-accent-50: color-mix(in oklch, var(--color-accent) 50%, transparent);
}
```

This uses modern CSS features (`oklch()`, `color-mix()`) to automatically generate color variations from base values.

---

## 6. Project Restructuring Recommendations

### 6.1 Current State vs Ideal Structure

**Current**: All code in zip file, project directory empty (except .claude/, hack/, thoughts/)

**Ideal Structure**:

```
grove-lp/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions for deployment (if using)
├── .claude/                         # Existing: Claude configuration
├── hack/                            # Existing: Utility scripts
├── thoughts/                        # Existing: Documentation
│   ├── research/
│   │   └── 2025-10-17-landing-page-analysis.md  # This document
│   └── ...
├── public/                          # Static assets
│   ├── .nojekyll                   # For GitHub Pages (if using)
│   ├── favicon.ico
│   └── images/                     # Move hero image here
│       └── hero.png
├── src/
│   ├── assets/                     # Keep for Vite imports
│   ├── components/
│   │   ├── landing/                # NEW: Landing page specific components
│   │   │   ├── Hero.tsx
│   │   │   ├── ProcessCard.tsx
│   │   │   ├── StatCard.tsx
│   │   │   ├── TestimonialCard.tsx
│   │   │   └── TrustFeature.tsx
│   │   ├── layout/                 # NEW: Layout components
│   │   │   ├── Footer.tsx
│   │   │   └── Container.tsx
│   │   └── ui/                     # Existing: shadcn/ui components
│   ├── styles/
│   │   ├── design-tokens.css      # NEW: Centralized design tokens
│   │   ├── globals.css            # Updated: Theme mapping
│   │   └── index.css              # Existing: Tailwind output
│   ├── lib/                        # NEW: Utilities
│   │   ├── animations.ts          # Motion variants
│   │   └── utils.ts               # Existing: cn() helper
│   ├── App.tsx                     # Refactored: Uses new components
│   ├── main.tsx
│   └── vite-env.d.ts
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.ts
├── README.md
└── netlify.toml                    # If using Netlify
    OR vercel.json                  # If using Vercel
```

### 6.2 Component Extraction Plan

**Current**: All components in single `App.tsx` file (444 lines)

**Recommended**: Extract into separate files for maintainability

**New Files to Create**:

**1. `src/components/landing/Hero.tsx`** (lines 24-94 from App.tsx)
```tsx
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero.png";
import { fadeInUp } from "@/lib/animations";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary text-primary-foreground">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 z-10 bg-hero-overlay" />
        <img src={heroImage} alt="..." className="w-full h-full object-cover opacity-60" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 md:px-12 relative z-20 max-w-6xl">
        <motion.div className="text-center space-y-12 py-24" initial="initial" animate="animate">
          {/* ... rest of hero content */}
        </motion.div>
      </div>
    </section>
  );
}
```

**2. `src/components/landing/ProcessCard.tsx`**
**3. `src/components/landing/StatCard.tsx`**
**4. `src/components/landing/TestimonialCard.tsx`**
**5. `src/components/landing/TrustFeature.tsx`**
**6. `src/components/layout/Footer.tsx`**

**7. `src/lib/animations.ts`** (Motion variants)
```ts
export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 1.05 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
};

// ... other animation variants
```

**Updated `src/App.tsx`**:
```tsx
import { Hero } from './components/landing/Hero';
import { SocialProof } from './components/landing/SocialProof';
import { ProblemStatement } from './components/landing/ProblemStatement';
// ... other section imports
import { Footer } from './components/layout/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="fixed inset-0 -z-10 animate-gradient opacity-30 bg-gradient-subtle" />

      <Hero />
      <SocialProof />
      <ProblemStatement />
      {/* ... other sections */}
      <Footer />
    </div>
  );
}
```

**Benefits**:
- Easier to maintain (smaller files)
- Reusable components
- Better code organization
- Easier testing
- Clearer separation of concerns

### 6.3 Setup Steps

**Step 1: Initialize Git Repository**
```bash
cd "/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp"
git init
git add .claude hack thoughts
git commit -m "Initial commit: Project structure"
```

**Step 2: Extract Zip Contents**
```bash
# Extract zip to temporary location (already done)
# Copy relevant files to project

cd "/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp"

# Copy source files
cp -r /tmp/landing_page_extract/src ./
cp -r /tmp/landing_page_extract/public ./ # if exists
cp /tmp/landing_page_extract/index.html ./
cp /tmp/landing_page_extract/package.json ./
cp /tmp/landing_page_extract/package-lock.json ./
cp /tmp/landing_page_extract/vite.config.ts ./
cp /tmp/landing_page_extract/tsconfig.json ./
cp /tmp/landing_page_extract/README.md ./README-landing-page.md

# Create .gitignore
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
package-lock.json

# Build outputs
dist/
build/
.vite/

# Environment files
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*
EOF
```

**Step 3: Install Dependencies**
```bash
npm install
```

**Step 4: Test Locally**
```bash
npm run dev
# Opens http://localhost:3000
```

**Step 5: Create Deployment Configuration**

**For Vercel** (recommended):
- No files needed, just connect GitHub repo

**For Netlify**:
```bash
cat > netlify.toml << 'EOF'
[build]
  command = "npm run build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
EOF
```

**For GitHub Pages**:
```bash
# Update package.json
npm install gh-pages --save-dev

# Add to scripts:
# "predeploy": "npm run build",
# "deploy": "gh-pages -d build"

# Create .nojekyll
mkdir -p public
touch public/.nojekyll

# Update vite.config.ts base path (see section 3.5)
```

**Step 6: Commit and Push**
```bash
git add .
git commit -m "Add landing page source code from Figma export"
git remote add origin https://github.com/username/grove-lp.git
git push -u origin main
```

**Step 7: Deploy** (see section 4.3 or 4.4)

---

## 7. Code Quality Improvements (Optional)

### 7.1 TypeScript Configuration

**Current**: Basic TypeScript setup

**Recommended** `tsconfig.json` enhancements:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### 7.2 Linting and Formatting

**ESLint** (React best practices):
```bash
npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react eslint-plugin-react-hooks
```

**.eslintrc.cjs**:
```js
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'react/react-in-jsx-scope': 'off',
  },
  settings: {
    react: { version: 'detect' },
  },
};
```

**Prettier** (code formatting):
```bash
npm install -D prettier
```

**.prettierrc**:
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false
}
```

**Add to package.json scripts**:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "format": "prettier --write \"src/**/*.{ts,tsx,css}\"",
    "type-check": "tsc --noEmit"
  }
}
```

### 7.3 Performance Optimizations

**Image Optimization**:
- Use WebP format for hero image
- Add loading="lazy" for below-fold images
- Use responsive image srcset

**Code Splitting** (if app grows):
```tsx
import { lazy, Suspense } from 'react';

const Hero = lazy(() => import('./components/landing/Hero'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Hero />
    </Suspense>
  );
}
```

**Bundle Analysis**:
```bash
npm install -D rollup-plugin-visualizer

# Add to vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true }),
  ],
});
```

---

## 8. Next Steps and Action Items

### 8.1 Immediate Actions (Required)

1. **Extract and Initialize Project** (30 min)
   - [ ] Extract zip to grove-lp directory
   - [ ] Initialize git repository
   - [ ] Install dependencies
   - [ ] Test local development server

2. **Choose Deployment Platform** (5 min)
   - [ ] Decision: Vercel (recommended) or Netlify
   - [ ] Create account if needed
   - [ ] Connect GitHub repository

3. **Deploy Initial Version** (15 min)
   - [ ] Push code to GitHub
   - [ ] Connect to deployment platform
   - [ ] Verify deployment works
   - [ ] Test live URL

### 8.2 Short-term Improvements (1-2 days)

4. **Consolidate Styling** (6-9 hours)
   - [ ] Create design-tokens.css
   - [ ] Add utility classes for gradients/typography
   - [ ] Refactor App.tsx to use utilities
   - [ ] Remove inline styles
   - [ ] Test visual consistency

5. **Extract Components** (2-3 hours)
   - [ ] Create landing/ and layout/ directories
   - [ ] Extract Hero, Footer, and card components
   - [ ] Create animations.ts library
   - [ ] Update App.tsx imports
   - [ ] Test functionality

6. **Setup Code Quality Tools** (1 hour)
   - [ ] Install ESLint, Prettier
   - [ ] Configure rules
   - [ ] Add npm scripts
   - [ ] Run linter and fix issues

### 8.3 Optional Enhancements (Future)

7. **Optimize Performance**
   - [ ] Convert images to WebP
   - [ ] Add lazy loading
   - [ ] Implement code splitting
   - [ ] Analyze bundle size

8. **Add Features**
   - [ ] Form handling (email capture)
   - [ ] Analytics integration
   - [ ] SEO optimization (meta tags, Open Graph)
   - [ ] Accessibility audit (WCAG)

9. **Documentation**
   - [ ] Update README with setup instructions
   - [ ] Create CONTRIBUTING.md
   - [ ] Document component API
   - [ ] Add design system documentation

---

## 9. Key File References

### 9.1 Source Files (Zip)

| File | Location | Purpose | Lines |
|------|----------|---------|-------|
| App.tsx | `/tmp/landing_page_extract/src/App.tsx` | Main landing page component | 444 |
| globals.css | `/tmp/landing_page_extract/src/styles/globals.css` | CSS variables and theme | 208 |
| index.css | `/tmp/landing_page_extract/src/index.css` | Generated Tailwind CSS | 1715 |
| package.json | `/tmp/landing_page_extract/package.json` | Dependencies and scripts | 60 |
| vite.config.ts | `/tmp/landing_page_extract/vite.config.ts` | Vite build configuration | 61 |
| button.tsx | `/tmp/landing_page_extract/src/components/ui/button.tsx` | Button component with variants | 59 |

### 9.2 Project Files (Grove-LP)

| File | Location | Purpose |
|------|----------|---------|
| Research Doc | `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/thoughts/research/2025-10-17-landing-page-analysis.md` | This document |
| Frontmatter Script | `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/hack/generate_frontmatter.sh` | Generates research frontmatter |

### 9.3 External Resources

| Resource | URL | Purpose |
|----------|-----|---------|
| Figma Design | https://www.figma.com/design/oINWOouTmA0rWvBOw1bERx/Landing-Page-Design-Request | Original design |
| Vercel Docs | https://vercel.com/docs | Deployment guide |
| Netlify Docs | https://docs.netlify.com | Deployment guide |
| Vite Static Deploy | https://vite.dev/guide/static-deploy | Vite deployment guide |
| Tailwind CSS v4 | https://tailwindcss.com | Styling framework docs |

---

## 10. Summary and Conclusion

### 10.1 Research Summary

This comprehensive analysis examined the Commonplace landing page project across three critical dimensions:

**1. Project Structure**:
- Modern Vite + React + TypeScript stack
- 48+ shadcn/ui components for UI primitives
- Tailwind CSS v4 for styling
- Framer Motion for animations
- Currently only in zip file, needs to be extracted to grove-lp directory

**2. Styling Architecture**:
- Mixed approach: Tailwind classes + CSS variables + inline styles
- Key issue: Duplicate color definitions (CSS vars vs hardcoded)
- Recommendation: Consolidate into CSS custom properties as single source of truth
- Estimated effort: 6-9 hours for complete refactoring

**3. Deployment Options**:
- Four platforms analyzed: Railway, Vercel, Netlify, GitHub Pages
- **Recommended**: Vercel (best DX) or Netlify (proven platform)
- **Not Recommended**: Railway (no free tier) or GitHub Pages (too manual)
- Estimated time to deploy: 15 minutes (Vercel/Netlify)

### 10.2 Key Findings

**Strengths**:
- ✅ Modern tech stack (Vite, React 18, TypeScript)
- ✅ Comprehensive UI component library (shadcn/ui)
- ✅ Well-structured CSS variables for theming
- ✅ Smooth animations (Framer Motion)
- ✅ Responsive design (Tailwind breakpoints)

**Weaknesses**:
- ⚠️ Styling inconsistency (inline styles + CSS vars)
- ⚠️ Large single-file component (444 lines)
- ⚠️ Hardcoded color values (maintenance burden)
- ⚠️ No project initialization (code only in zip)

**Opportunities**:
- 🎯 Easy deployment to Vercel/Netlify
- 🎯 Quick wins: Extract components, consolidate styles
- 🎯 Strong foundation for future features
- 🎯 Well-documented design tokens

### 10.3 Recommended Path Forward

**Phase 1: Foundation** (1-2 hours)
1. Extract zip to grove-lp directory
2. Initialize git repository
3. Deploy to Vercel or Netlify
4. Verify live deployment

**Phase 2: Styling Consolidation** (6-9 hours)
1. Create design-tokens.css with all variables
2. Add utility classes for common patterns
3. Refactor App.tsx to remove inline styles
4. Test visual consistency

**Phase 3: Code Organization** (2-3 hours)
1. Extract components from App.tsx
2. Create animations library
3. Setup layout components
4. Update imports and test

**Phase 4: Quality & Optimization** (2-4 hours)
1. Setup ESLint and Prettier
2. Optimize images
3. Add SEO meta tags
4. Performance audit

**Total Estimated Time**: 11-18 hours for complete setup and refactoring

### 10.4 Final Recommendation

**Deploy First, Optimize Later**

The fastest path to production:
1. Extract zip to project directory (10 min)
2. Push to GitHub (5 min)
3. Deploy to Vercel (5 min)
4. **You're live** in 20 minutes!

Then iterate on improvements:
- Week 1: Styling consolidation
- Week 2: Component extraction
- Week 3: Code quality and optimization

This approach gets the landing page live quickly while allowing for incremental improvements without blocking launch.

---

## 11. Open Questions

1. **Custom Domain**: Does the project need a custom domain? (e.g., commonplace.app)
2. **Analytics**: Should we integrate analytics (Google Analytics, Plausible, etc.)?
3. **Form Handling**: "Get Early Access" button needs a form - what's the email capture strategy?
4. **CMS**: Will content need to be editable by non-developers? (Consider Contentful, Sanity, etc.)
5. **A/B Testing**: Are there plans to test different messaging/CTAs?
6. **Monitoring**: Should we add error tracking (Sentry) and performance monitoring?
7. **Accessibility**: Has there been an accessibility audit? (WCAG compliance)
8. **SEO**: Are there specific SEO requirements (meta tags, structured data, sitemap)?

---

## Related Research

- None yet (this is the first research document for this project)

## Changelog

- **2025-10-17 21:44:52 EDT**: Initial research completed by Claude
  - Analyzed project structure from zip file
  - Documented styling approaches
  - Researched deployment platforms (Railway, Vercel, Netlify, GitHub Pages)
  - Created styling consolidation plan
  - Generated deployment recommendations

---

**End of Research Document**
