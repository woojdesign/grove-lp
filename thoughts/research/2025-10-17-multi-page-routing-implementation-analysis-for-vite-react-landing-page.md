---
doc_type: research
date: 2025-10-18T02:25:03+00:00
title: "Multi-Page Routing Implementation Analysis for Vite React Landing Page"
research_question: "How to add additional pages to this Vite React landing page codebase and what is the best approach for implementing multi-page functionality?"
researcher: Sean Kim

git_commit: ce7282dd0ae6d2f66797501a94762d0fed48a5f0
branch: main
repository: grove-lp

created_by: Sean Kim
last_updated: 2025-10-17
last_updated_by: Sean Kim

tags:
  - routing
  - vite
  - react
  - multi-page
  - react-router
  - mpa
  - architecture
status: complete

related_docs:
  - thoughts/research/2025-10-17-content-management-strategy-for-vite-landing-page.md
---

# Research: Multi-Page Routing Implementation Analysis for Vite React Landing Page

**Date**: October 17, 2025, 7:25 PM PDT
**Researcher**: Sean Kim
**Git Commit**: ce7282dd0ae6d2f66797501a94762d0fed48a5f0
**Branch**: main
**Repository**: grove-lp

## Research Question

How to add additional pages to this Vite React landing page codebase and what is the best approach for implementing multi-page functionality? This research evaluates all routing options (React Router, Vite MPA mode, TanStack Router, file-based routing) with specific implementation details, code examples, and recommendations tailored to this codebase.

## Summary

This Vite React landing page is currently a **single-page application (SPA)** with no routing configured. The application structure consists of:
- Single entry point: `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/index.html`
- Single root component: `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/src/App.tsx` (458 lines)
- No routing library installed (package.json contains no react-router-dom, wouter, or similar)
- Vite configured for SPA mode with single build output

**Key Finding**: For this landing page, **React Router v6 with client-side routing** is the optimal approach because:
1. It maintains the existing SPA architecture (minimal configuration changes)
2. Provides excellent DX with the current Vite + React + TypeScript setup
3. Enables easy integration with the centralized content management approach
4. Supports code splitting and lazy loading for performance
5. Industry-standard with extensive documentation and community support
6. Works seamlessly with existing Vercel deployment (simple rewrites config)

Alternative approaches (Vite MPA mode, TanStack Router) are also analyzed with specific use cases where they may be preferable.

## Detailed Findings

### 1. Current Routing Setup

#### Application Entry Point

**File**: `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/index.html` (lines 1-15)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Landing Page Design Request</title>
  </head>

  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

**Analysis**:
- Single HTML entry point
- Single script tag pointing to `/src/main.tsx`
- No routing infrastructure in place

#### Root React Mount Point

**File**: `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/src/main.tsx` (lines 1-6)

```typescript
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
```

**Analysis**:
- Direct mounting of `<App />` component
- No router wrapper
- No lazy loading or code splitting
- Straightforward React 18 createRoot pattern

#### Main Application Component

**File**: `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/src/App.tsx` (lines 1-458)

The App component is a monolithic single-page component containing all sections:
- Hero section (lines 19-79)
- Social proof (lines 82-105)
- Problem statement (lines 108-135)
- Feature section (lines 138-178)
- Process cards (lines 181-217)
- Trust features (lines 220-249)
- Outcomes with stats (lines 252-298)
- Final CTA (lines 301-338)
- Footer (lines 341-361)

**Analysis**:
- No navigation component exists
- All content is on a single scrollable page
- Helper components (ProcessCard, StatCard, TestimonialCard) are defined inline
- No page-level component abstraction

#### Build Configuration

**File**: `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/vite.config.ts` (lines 1-61)

```typescript
export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src'),
      // ... Figma asset aliases
    },
  },
  build: {
    target: 'esnext',
    outDir: 'build',  // ← Single build output directory
  },
  server: {
    port: 3000,
    open: true,
  },
});
```

**Analysis**:
- Configured for **SPA mode** (single entry point)
- No `build.rollupOptions.input` configuration for multiple HTML files
- Build output goes to `build/` directory
- Using @vitejs/plugin-react-swc for fast refresh

#### Deployment Configuration

**File**: `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/vercel.json` (lines 1-6)

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

**Analysis**:
- Standard SPA deployment configuration
- No rewrites configured yet (will need rewrites for client-side routing)
- Single output directory

#### Current Dependencies

**File**: `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/package.json` (lines 6-49)

**Routing-related packages**: NONE installed

The package.json contains:
- React 18.3.1 and React DOM 18.3.1
- 30+ Radix UI components (shadcn/ui)
- Framer Motion for animations
- lucide-react for icons
- NO react-router-dom, wouter, or any routing library

**Analysis**:
- Clean slate for routing implementation
- No migration from existing router needed
- Will need to install routing library from scratch

### 2. Routing Options Analysis

#### Option 1: React Router v6/v7 (Client-Side SPA Routing)

**What it is**: The industry-standard routing library for React applications. Enables client-side navigation without full page reloads using the browser's History API.

##### Installation Requirements

```bash
npm install react-router-dom
```

**Package size**: ~18.7 KB minified + gzipped

##### Basic Setup

**Step 1**: Update `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/src/main.tsx`

```typescript
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

**Step 2**: Create page components structure

```
src/
  pages/
    HomePage.tsx       # Current App.tsx content
    AboutPage.tsx      # New about page
    ContactPage.tsx    # New contact page
    BlogPage.tsx       # New blog/resources page
```

**Step 3**: Update `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/src/App.tsx` to be a router

```typescript
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import BlogPage from "./pages/BlogPage";
import Layout from "./components/Layout";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="blog" element={<BlogPage />} />
      </Route>
    </Routes>
  );
}
```

**Step 4**: Create shared layout component

**File to create**: `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/src/components/Layout.tsx`

```typescript
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
```

**Step 5**: Create navigation component

**File to create**: `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/src/components/Navigation.tsx`

```typescript
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="font-display text-xl font-light">
            Commonplace
          </Link>

          <div className="flex items-center gap-8">
            <Link to="/about" className="text-sm hover:text-primary transition-colors">
              About
            </Link>
            <Link to="/blog" className="text-sm hover:text-primary transition-colors">
              Resources
            </Link>
            <Link to="/contact" className="text-sm hover:text-primary transition-colors">
              Contact
            </Link>
            <Button size="sm" className="rounded-full">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
```

##### Example Page Component

**File to create**: `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/src/pages/AboutPage.tsx`

```typescript
import { motion } from "motion/react";
import { Badge } from "../components/ui/badge";
import { content } from "../content/pages/about";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="fixed inset-0 -z-10 animate-gradient opacity-30 bg-gradient-subtle" />

      <section className="py-32 md:py-40">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-6">{content.badge}</Badge>
            <h1 className="font-display text-section-heading font-light mb-8">
              {content.heading}
            </h1>
            <p className="text-xl text-muted-foreground leading-loose">
              {content.description}
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
```

##### Code Splitting with Lazy Loading

For performance optimization:

```typescript
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "./components/Layout";

// Lazy load pages
const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));

export default function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="blog" element={<BlogPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
```

**Build output analysis**: With lazy loading, Vite will create separate chunks:
- `index-[hash].js` - Main bundle
- `HomePage-[hash].js` - Home page chunk
- `AboutPage-[hash].js` - About page chunk
- `ContactPage-[hash].js` - Contact page chunk
- `BlogPage-[hash].js` - Blog page chunk

##### Vercel Configuration for React Router

**Update**: `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/vercel.json`

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

**Why this is needed**: When a user navigates to `/about` directly or refreshes the page, Vercel needs to serve `index.html` so React Router can handle the route client-side.

##### SEO Implications

**Challenges**:
- **Client-side rendering**: Search engine crawlers see empty HTML shell initially
- **JavaScript dependency**: Content only appears after JavaScript executes
- **Metadata management**: Each route needs unique meta tags (title, description, OG tags)

**Solutions**:

1. **Use react-helmet-async for dynamic metadata**:

```bash
npm install react-helmet-async
```

```typescript
// In each page component
import { Helmet } from "react-helmet-async";

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About Commonplace | Human Connection Platform</title>
        <meta name="description" content="Learn about Commonplace and our mission to restore serendipity in large organizations." />
        <meta property="og:title" content="About Commonplace" />
        <meta property="og:description" content="Learn about Commonplace and our mission..." />
      </Helmet>

      {/* Page content */}
    </>
  );
}
```

2. **Pre-rendering for SEO (future consideration)**: Use tools like `react-snap` or migrate to Remix/Next.js for server-side rendering

**Current state (2025)**: Google can render JavaScript, but initial indexing may be slower compared to server-rendered pages.

##### Performance Considerations

**Pros**:
- Code splitting reduces initial bundle size
- Lazy loading means only home page loads initially
- Fast client-side navigation (no full page reload)
- Shared layout components cached across routes

**Cons**:
- Initial JavaScript bundle includes React Router (~18 KB)
- First page load includes routing logic overhead
- Each route transition requires JavaScript execution

**Optimization**: Use `React.lazy()` and `Suspense` as shown above.

##### Integration with shadcn/ui

**Existing components work unchanged**: All shadcn/ui components in `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/src/components/ui/` work seamlessly with React Router.

**Navigation component with shadcn/ui**:

```typescript
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./ui/navigation-menu";

export default function Navigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link to="/">Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link to="/about">About</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
```

**Note**: The existing `@radix-ui/react-navigation-menu` (already installed) can be combined with React Router's `<Link>` component.

##### Implementation Complexity

**Time estimate**: 3-6 hours

**Breakdown**:
- Install react-router-dom: 5 minutes
- Update main.tsx with BrowserRouter: 10 minutes
- Create page structure and move Home content: 1 hour
- Create Layout and Navigation components: 1-2 hours
- Create additional pages (About, Contact, Blog): 1-2 hours
- Update Vercel config for rewrites: 5 minutes
- Testing and debugging: 30-60 minutes

**Risk level**: Low - Well-documented, industry-standard approach

---

#### Option 2: Vite Multi-Page Application (MPA) Mode

**What it is**: Traditional multi-page architecture where each page is a separate HTML file with its own JavaScript bundle. Navigation causes full page reloads, similar to traditional websites.

##### How Vite MPA Works

Vite MPA mode uses multiple HTML entry points. Each HTML file:
- Has its own `<script>` tag pointing to a TypeScript entry
- Generates a separate JavaScript bundle during build
- Navigates via traditional `<a>` tags (full page reload)

##### Configuration

**Update**: `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/vite.config.ts`

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src'),
      // ... existing aliases
    },
  },
  build: {
    target: 'esnext',
    outDir: 'build',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        contact: resolve(__dirname, 'contact.html'),
        blog: resolve(__dirname, 'blog.html'),
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
```

##### Directory Structure

```
grove-lp/
  index.html              # Home page entry
  about.html              # About page entry
  contact.html            # Contact page entry
  blog.html               # Blog page entry
  src/
    main.tsx              # Home page entry script
    about.tsx             # About page entry script
    contact.tsx           # Contact page entry script
    blog.tsx              # Blog page entry script
    pages/
      HomePage.tsx        # Home page component
      AboutPage.tsx       # About page component
      ContactPage.tsx     # Contact page component
      BlogPage.tsx        # Blog page component
    components/
      shared/
        Header.tsx        # Shared header (imported in each entry)
        Footer.tsx        # Shared footer (imported in each entry)
      ui/                 # Existing shadcn/ui components
```

##### HTML Entry Points

**File**: `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/about.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>About Commonplace | Human Connection Platform</title>
    <meta name="description" content="Learn about Commonplace and our mission to restore serendipity in large organizations." />
  </head>

  <body>
    <div id="root"></div>
    <script type="module" src="/src/about.tsx"></script>
  </body>
</html>
```

**Key difference**: Each HTML file has unique `<title>`, `<meta>` tags, and points to a different entry script.

##### Entry Script Example

**File to create**: `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/src/about.tsx`

```typescript
import { createRoot } from "react-dom/client";
import AboutPage from "./pages/AboutPage";
import "./index.css";

createRoot(document.getElementById("root")!).render(<AboutPage />);
```

**No router needed**: Each entry script directly mounts its page component.

##### Navigation Between Pages

Use traditional `<a>` tags (full page reload):

```typescript
// src/components/shared/Header.tsx
export default function Header() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="font-display text-xl font-light">
            Commonplace
          </a>

          <div className="flex items-center gap-8">
            <a href="/about.html" className="text-sm hover:text-primary transition-colors">
              About
            </a>
            <a href="/blog.html" className="text-sm hover:text-primary transition-colors">
              Resources
            </a>
            <a href="/contact.html" className="text-sm hover:text-primary transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
```

**Note**: Navigation causes full page reload (browser fetches new HTML).

##### Build Output Structure

After running `npm run build`, the `build/` directory contains:

```
build/
  index.html
  about.html
  contact.html
  blog.html
  assets/
    main-[hash].js        # Home page bundle
    about-[hash].js       # About page bundle
    contact-[hash].js     # Contact page bundle
    blog-[hash].js        # Blog page bundle
    shared-[hash].js      # Shared components chunk
    index-[hash].css      # Shared styles
```

**Bundle analysis**: Vite automatically extracts shared dependencies (React, shared components) into separate chunks to avoid duplication.

##### Vercel Deployment Configuration

**Update**: `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/vercel.json`

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "cleanUrls": true
}
```

**With cleanUrls**: Vercel serves `/about.html` when users visit `/about` (no `.html` extension in URL).

**No rewrites needed**: Each HTML file exists on the server, so no SPA fallback required.

##### SEO Implications

**Pros**:
- **Better SEO out of the box**: Each HTML file has complete metadata in `<head>`
- **No JavaScript dependency for indexing**: Crawlers see full HTML immediately
- **Traditional web architecture**: Search engines are optimized for this pattern
- **Faster initial indexing**: No JavaScript execution required to see content

**Cons**:
- **Dynamic metadata still limited**: Can't change meta tags based on dynamic data (need SSR for that)

**Overall**: MPA mode is **significantly better for SEO** than client-side SPA routing.

##### Performance Considerations

**Pros**:
- **Smaller initial bundles**: Each page only loads its own code
- **Better caching**: Unchanged pages don't need re-fetching
- **No router overhead**: No routing library needed (~18 KB saved)

**Cons**:
- **Full page reloads**: Each navigation re-downloads HTML, CSS, JS
- **No shared state**: Can't easily share state between pages (need localStorage/sessionStorage)
- **Slower perceived navigation**: White flash during page transitions
- **More HTTP requests**: Each page load is a full network round-trip

**Performance comparison**:
- **First page load**: MPA slightly faster (no router overhead)
- **Subsequent navigation**: SPA significantly faster (no reload)

##### Integration with Existing Components

**Shared components**: Import Header/Footer in each page component:

```typescript
// src/pages/AboutPage.tsx
import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import { content } from "../content/pages/about";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Page content */}
      </main>
      <Footer />
    </div>
  );
}
```

**shadcn/ui components**: Work identically, no changes needed.

##### When to Choose MPA Mode

**Good fit when**:
- SEO is critical priority (better than SPA)
- Pages are largely independent (no shared state)
- Marketing site with infrequent navigation
- Users typically land on specific pages from search/ads
- Traditional website feel is acceptable

**Poor fit when**:
- Need fast, app-like navigation
- Heavy state management across pages
- Frequent user navigation between pages
- Interactive features requiring shared context

##### Implementation Complexity

**Time estimate**: 4-8 hours

**Breakdown**:
- Configure vite.config.ts with multiple inputs: 30 minutes
- Create HTML entry files for each page: 1 hour
- Create TypeScript entry scripts: 1 hour
- Extract shared Header/Footer components: 1-2 hours
- Migrate Home page content: 1 hour
- Create additional pages (About, Contact, Blog): 2-3 hours
- Update navigation links: 30 minutes
- Testing across all pages: 1 hour

**Risk level**: Medium - More complex build setup, less common pattern in React ecosystem

---

#### Option 3: TanStack Router (TypeScript-First Routing)

**What it is**: A modern, type-safe routing library designed with TypeScript at its core. Provides automatic type inference for routes, parameters, and search params.

##### Key Differentiators

**Type safety**:
- Automatically generates TypeScript types for all routes
- IDE warns if you mistype a route path
- Type-safe path parameters and search parameters
- Full autocomplete for navigation

**Example of type safety**:

```typescript
// Type error if route doesn't exist
navigate({ to: '/abuot' })  // ← TypeScript error: Route '/abuot' does not exist

// Type-safe params
navigate({
  to: '/blog/$postId',
  params: { postId: '123' }  // ← TypeScript ensures postId is provided
})

// Type-safe search params
navigate({
  to: '/blog',
  search: { category: 'tech', page: 1 }  // ← Types enforced
})
```

##### Installation

```bash
npm install @tanstack/react-router
npm install -D @tanstack/router-devtools @tanstack/router-vite-plugin
```

**Package size**: ~12 KB minified + gzipped (smaller than React Router)

##### Configuration

**Update**: `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/vite.config.ts`

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite(),  // ← Generates route types
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'esnext',
    outDir: 'build',
  },
  server: {
    port: 3000,
    open: true,
  },
});
```

##### File-Based Routing Structure

TanStack Router supports file-based routing (similar to Next.js):

```
src/
  routes/
    __root.tsx           # Root layout
    index.tsx            # Home page (/)
    about.tsx            # About page (/about)
    contact.tsx          # Contact page (/contact)
    blog/
      index.tsx          # Blog listing (/blog)
      $postId.tsx        # Blog post (/blog/:postId)
```

##### Route File Examples

**Root Layout**: `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/src/routes/__root.tsx`

```typescript
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Outlet />
      </main>
      <Footer />
      <TanStackRouterDevtools />
    </div>
  ),
});
```

**Home Page**: `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/src/routes/index.tsx`

```typescript
import { createFileRoute } from '@tanstack/react-router';
import HomePage from '../pages/HomePage';

export const Route = createFileRoute('/')({
  component: HomePage,
});
```

**About Page**: `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/src/routes/about.tsx`

```typescript
import { createFileRoute } from '@tanstack/react-router';
import AboutPage from '../pages/AboutPage';

export const Route = createFileRoute('/about')({
  component: AboutPage,
  // Type-safe metadata
  meta: () => [
    { title: 'About Commonplace' },
    { name: 'description', content: 'Learn about our mission...' },
  ],
});
```

##### Navigation with Type Safety

```typescript
import { Link } from '@tanstack/react-router';

export default function Navigation() {
  return (
    <nav>
      <Link to="/" className="font-display text-xl">
        Commonplace
      </Link>

      <Link
        to="/about"
        activeProps={{ className: "text-primary" }}
        inactiveProps={{ className: "text-muted-foreground" }}
      >
        About
      </Link>

      <Link to="/blog" search={{ category: 'all' }}>
        Blog
      </Link>
    </nav>
  );
}
```

**Type safety**: If you mistype `to="/abuot"`, TypeScript shows an error.

##### Setup in main.tsx

**Update**: `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/src/main.tsx`

```typescript
import { createRoot } from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';  // Auto-generated
import './index.css';

// Create router instance
const router = createRouter({ routeTree });

// Register router for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);
```

**Note**: `routeTree.gen.ts` is automatically generated by the Vite plugin based on files in `src/routes/`.

##### Built-in Features

**1. Data Loading (Loaders)**:

```typescript
export const Route = createFileRoute('/blog')({
  loader: async () => {
    const posts = await fetch('/api/posts').then(r => r.json());
    return { posts };
  },
  component: BlogPage,
});

function BlogPage() {
  const { posts } = Route.useLoaderData();  // Type-safe!
  return <div>{/* Render posts */}</div>;
}
```

**2. Search Params Validation** (using Zod):

```typescript
import { z } from 'zod';

const blogSearchSchema = z.object({
  category: z.enum(['tech', 'design', 'business']).optional(),
  page: z.number().optional(),
});

export const Route = createFileRoute('/blog')({
  validateSearch: blogSearchSchema,
  component: BlogPage,
});
```

**3. Built-in Caching**: Loosely based on TanStack Query, automatically caches loader results.

##### SEO Implications

Similar to React Router (client-side rendering challenges), but with better metadata management:

```typescript
export const Route = createFileRoute('/about')({
  meta: () => [
    { title: 'About Commonplace | Human Connection Platform' },
    { name: 'description', content: '...' },
    { property: 'og:title', content: 'About Commonplace' },
  ],
});
```

##### Performance Considerations

**Pros over React Router**:
- Smaller bundle size (12 KB vs 18 KB)
- Built-in caching reduces redundant data fetching
- Structural sharing minimizes re-renders
- Code splitting with lazy loading supported

**Cons**:
- Additional build step for type generation
- More complex setup than React Router

##### Integration with shadcn/ui

Works identically to React Router. All existing components compatible.

##### When to Choose TanStack Router

**Good fit when**:
- TypeScript is a project priority
- You want compile-time route validation
- Complex search parameter requirements
- Team values modern DX and type safety
- Building a complex application with many routes

**Poor fit when**:
- JavaScript-only project
- Team unfamiliar with advanced TypeScript
- Simple routing needs (2-3 pages)
- Need maximum community support (React Router more mature)

##### Implementation Complexity

**Time estimate**: 5-8 hours

**Breakdown**:
- Install TanStack Router and plugins: 10 minutes
- Configure Vite plugin: 20 minutes
- Create routes directory structure: 30 minutes
- Create route files (__root, index, about, etc.): 2 hours
- Update main.tsx with router setup: 30 minutes
- Migrate Home page content: 1 hour
- Create additional pages: 2-3 hours
- Configure type generation and testing: 1 hour

**Risk level**: Medium - Newer library, smaller community, learning curve for type-safe patterns

---

#### Option 4: File-Based Routing with vite-plugin-pages

**What it is**: A Vite plugin that automatically generates React Router routes based on your file structure (Next.js-style routing).

##### Installation

```bash
npm install -D vite-plugin-pages
npm install react-router-dom
```

##### Configuration

**Update**: `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/vite.config.ts`

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import Pages from 'vite-plugin-pages';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    Pages({
      dirs: 'src/pages',  // Pages directory
      extensions: ['tsx', 'ts'],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '~pages': path.resolve(__dirname, 'src/pages'),  // For route imports
    },
  },
  build: {
    target: 'esnext',
    outDir: 'build',
  },
});
```

##### File Structure

```
src/
  pages/
    index.tsx           # Home page (/)
    about.tsx           # About page (/about)
    contact.tsx         # Contact page (/contact)
    blog/
      index.tsx         # Blog listing (/blog)
      [id].tsx          # Blog post (/blog/:id)
```

**Convention**: File names map to routes automatically.

##### Setup in main.tsx

**Update**: `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/src/main.tsx`

```typescript
import { createRoot } from 'react-dom/client';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { Suspense } from 'react';
import routes from '~react-pages';  // Auto-generated
import './index.css';

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {useRoutes(routes)}
    </Suspense>
  );
}

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

##### Example Page Component

**File**: `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/src/pages/about.tsx`

```typescript
import { motion } from 'motion/react';
import Layout from '../components/Layout';
import { content } from '../content/pages/about';

export default function AboutPage() {
  return (
    <Layout>
      <section className="py-32 md:py-40">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-display text-section-heading">
            {content.heading}
          </h1>
          <p className="text-xl text-muted-foreground">
            {content.description}
          </p>
        </motion.div>
      </section>
    </Layout>
  );
}
```

##### Dynamic Routes

**File**: `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/src/pages/blog/[id].tsx`

```typescript
import { useParams } from 'react-router-dom';
import Layout from '../../components/Layout';

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();

  return (
    <Layout>
      <article>
        <h1>Blog Post {id}</h1>
      </article>
    </Layout>
  );
}
```

**Route**: `/blog/123` → renders `BlogPost` with `id = "123"`

##### Type Generation

vite-plugin-pages can generate TypeScript types:

```typescript
// vite.config.ts
Pages({
  dirs: 'src/pages',
  extensions: ['tsx', 'ts'],
  importMode: 'async',  // Lazy load by default
})
```

Generated `~react-pages` module includes route definitions.

##### When to Choose File-Based Routing

**Good fit when**:
- You prefer Next.js-style conventions
- Want automatic route generation (less boilerplate)
- Need dynamic routes with parameters
- Appreciate convention over configuration

**Poor fit when**:
- Routes don't match file structure
- Need complex nested route configurations
- Prefer explicit route definitions

##### Implementation Complexity

**Time estimate**: 4-6 hours

**Breakdown**:
- Install vite-plugin-pages and react-router-dom: 10 minutes
- Configure Vite plugin: 30 minutes
- Create pages directory structure: 30 minutes
- Migrate Home page to pages/index.tsx: 1 hour
- Create additional pages: 2-3 hours
- Update main.tsx with useRoutes: 30 minutes
- Testing and debugging: 1 hour

**Risk level**: Low-Medium - Plugin adds abstraction, but React Router underneath is stable

---

#### Option 5: Wouter (Minimal Lightweight Router)

**What it is**: A tiny (~2.1 KB) minimalist routing library for React. Focuses on simplicity and small bundle size.

##### Installation

```bash
npm install wouter
```

**Package size**: 2.1 KB minified + gzipped (vs React Router's 18 KB)

##### Basic Setup

**Update**: `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/src/App.tsx`

```typescript
import { Route, Switch, Link } from "wouter";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import Layout from "./components/Layout";

export default function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/blog/:id">
          {params => <BlogPost id={params.id} />}
        </Route>
        <Route>404 Not Found</Route>
      </Switch>
    </Layout>
  );
}
```

**No Provider needed**: Unlike React Router, no top-level `<BrowserRouter>` wrapper.

##### Navigation

```typescript
import { Link } from "wouter";

export default function Navigation() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/contact">Contact</Link>
    </nav>
  );
}
```

##### Programmatic Navigation

```typescript
import { useLocation } from "wouter";

function SomeComponent() {
  const [, setLocation] = useLocation();

  const handleClick = () => {
    setLocation("/about");
  };

  return <button onClick={handleClick}>Go to About</button>;
}
```

##### Limitations

- **No nested routes** out of the box
- **No data loaders** (like React Router's loaders)
- **Limited features** compared to React Router
- **Smaller community** and ecosystem

##### When to Choose Wouter

**Good fit when**:
- Bundle size is critical priority
- Simple routing needs (3-5 flat routes)
- Side projects, prototypes, hackathons
- Minimalist philosophy

**Poor fit when**:
- Need advanced routing features
- Nested route layouts required
- Large application with complex routing
- Team needs extensive documentation/support

##### Implementation Complexity

**Time estimate**: 2-3 hours (simplest option)

**Risk level**: Low for simple use cases, Medium for complex routing needs

---

### 3. Build Configuration Analysis

#### Current Build Output

**Command**: `npm run build`

**Location**: `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/build/`

**Current output structure**:
```
build/
  index.html
  assets/
    index-[hash].js       # Main bundle (~300-400 KB with all dependencies)
    index-[hash].css      # Compiled Tailwind CSS
    [image assets]        # Imported images
```

**Analysis**:
- Single JavaScript bundle
- No code splitting currently
- All React, Radix UI, Framer Motion bundled together

#### With React Router + Lazy Loading

**Output structure**:
```
build/
  index.html
  assets/
    index-[hash].js          # Main bundle (React, Router, shared code)
    HomePage-[hash].js       # Home page chunk
    AboutPage-[hash].js      # About page chunk
    ContactPage-[hash].js    # Contact page chunk
    BlogPage-[hash].js       # Blog page chunk
    shared-[hash].js         # Shared components chunk
    index-[hash].css         # Shared styles
```

**Benefits**:
- Initial load smaller (only home page code)
- Other pages loaded on demand
- Better caching (unchanged pages don't re-download)

#### With Vite MPA Mode

**Output structure**:
```
build/
  index.html
  about.html
  contact.html
  blog.html
  assets/
    main-[hash].js           # Home page bundle
    about-[hash].js          # About page bundle
    contact-[hash].js        # Contact page bundle
    blog-[hash].js           # Blog page bundle
    shared-[hash].js         # Shared dependencies (React, etc.)
```

**Benefits**:
- Separate bundles per page
- Shared code automatically extracted
- No routing library overhead

**Trade-off**: More complex build configuration

---

### 4. Content Management Integration with Routing

Building on the centralized TypeScript content management approach from the [previous research](/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/thoughts/research/2025-10-17-content-management-strategy-for-vite-landing-page.md), here's how to structure content for multiple pages:

#### Recommended Structure: Per-Page Content Files

```
src/
  content/
    types.ts                 # Shared TypeScript interfaces
    pages/
      home.ts                # Home page content
      about.ts               # About page content
      contact.ts             # Contact page content
      blog.ts                # Blog page content
    shared/
      navigation.ts          # Navigation links and CTA
      footer.ts              # Footer content
      metadata.ts            # SEO metadata per page
```

#### Type Definitions

**File**: `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/src/content/types.ts`

```typescript
export interface PageMetadata {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

export interface NavigationLink {
  text: string;
  href: string;
}

export interface NavigationContent {
  logoText: string;
  links: NavigationLink[];
  ctaButton: {
    text: string;
    href: string;
  };
}

export interface FooterContent {
  copyright: string;
  links: NavigationLink[];
}

// Page-specific interfaces
export interface HomePageContent {
  hero: {
    badge: string;
    headline: { before: string; highlight: string; after: string };
    subheadline: string;
    // ... rest of home page structure
  };
  // ... other home sections
}

export interface AboutPageContent {
  badge: string;
  heading: string;
  description: string;
  sections: Array<{
    title: string;
    content: string;
  }>;
}

export interface ContactPageContent {
  heading: string;
  description: string;
  form: {
    fields: Array<{
      name: string;
      label: string;
      type: string;
      placeholder: string;
      required: boolean;
    }>;
    submitButton: string;
  };
}
```

#### Shared Content

**File**: `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/src/content/shared/navigation.ts`

```typescript
import { NavigationContent } from '../types';

export const navigationContent: NavigationContent = {
  logoText: "Commonplace",
  links: [
    { text: "About", href: "/about" },
    { text: "Resources", href: "/blog" },
    { text: "Contact", href: "/contact" },
  ],
  ctaButton: {
    text: "Get Started",
    href: "/contact",
  },
};
```

**File**: `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/src/content/shared/footer.ts`

```typescript
import { FooterContent } from '../types';

export const footerContent: FooterContent = {
  copyright: "Commonplace © 2025 — Designed to make large organizations feel small again.",
  links: [
    { text: "Privacy", href: "/privacy" },
    { text: "Security", href: "/security" },
    { text: "Contact", href: "/contact" },
  ],
};
```

**File**: `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/src/content/shared/metadata.ts`

```typescript
import { PageMetadata } from '../types';

export const metadata: Record<string, PageMetadata> = {
  home: {
    title: "Commonplace | Human Connection Platform for Organizations",
    description: "Commonplace quietly introduces you to people who share your passions, experiences, and goals — making large organizations feel more human.",
    ogTitle: "Commonplace | Restore Serendipity in Your Organization",
    ogDescription: "Connect with hundreds of people you'd love to know but never meet.",
  },
  about: {
    title: "About Commonplace | Our Mission and Story",
    description: "Learn about Commonplace and our mission to restore serendipity and human connection in large organizations.",
  },
  contact: {
    title: "Contact Commonplace | Get in Touch",
    description: "Interested in bringing Commonplace to your organization? Let's talk.",
  },
  blog: {
    title: "Resources | Commonplace",
    description: "Insights on building culture, fostering connection, and designing for serendipity in organizations.",
  },
};
```

#### Page Content Files

**File**: `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/src/content/pages/about.ts`

```typescript
import { AboutPageContent } from '../types';

export const aboutContent: AboutPageContent = {
  badge: "Our Story",
  heading: "Building a more human workplace",
  description: "Commonplace was born from a simple observation: in every large organization, there are hundreds of people you'd love to know but never meet.",
  sections: [
    {
      title: "The Problem",
      content: "Remote work, hybrid teams, and endless Slack threads mean that we know our coworkers' calendars better than we know them. Culture can't thrive if people never cross paths — and serendipity doesn't scale on its own.",
    },
    {
      title: "Our Approach",
      content: "We built Commonplace to restore serendipity — intentionally. Using thoughtful questions and AI embeddings, we quietly introduce people who share genuine interests and experiences.",
    },
    {
      title: "Our Values",
      content: "Privacy-first, opt-in always, and designed for humans. We believe in building connection, not engagement metrics.",
    },
  ],
};
```

**File**: `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/src/content/pages/contact.ts`

```typescript
import { ContactPageContent } from '../types';

export const contactContent: ContactPageContent = {
  heading: "Let's talk about bringing Commonplace to your organization",
  description: "Commonplace pilots start with 200–500 users and grow organically. We'll handle setup; you enjoy the ripple effects.",
  form: {
    fields: [
      {
        name: "name",
        label: "Name",
        type: "text",
        placeholder: "Your name",
        required: true,
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "you@company.com",
        required: true,
      },
      {
        name: "organization",
        label: "Organization",
        type: "text",
        placeholder: "Company or university name",
        required: true,
      },
      {
        name: "orgSize",
        label: "Organization Size",
        type: "select",
        placeholder: "Select size",
        required: true,
      },
      {
        name: "message",
        label: "Message",
        type: "textarea",
        placeholder: "Tell us about your organization and goals...",
        required: false,
      },
    ],
    submitButton: "Request a Demo",
  },
};
```

#### Using Content in Page Components

**File**: `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/src/pages/AboutPage.tsx`

```typescript
import { motion } from "motion/react";
import { Badge } from "../components/ui/badge";
import { aboutContent as content } from "../content/pages/about";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="fixed inset-0 -z-10 animate-gradient opacity-30 bg-gradient-subtle" />

      <section className="py-32 md:py-40">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <Badge className="mb-6">{content.badge}</Badge>

            <h1 className="font-display text-section-heading font-light">
              {content.heading}
            </h1>

            <p className="text-xl text-muted-foreground leading-loose">
              {content.description}
            </p>

            <div className="space-y-16 pt-12">
              {content.sections.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <h2 className="font-display text-subsection-heading font-light mb-4">
                    {section.title}
                  </h2>
                  <p className="text-lg text-muted-foreground leading-loose">
                    {section.content}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
```

#### Using Shared Navigation

**File**: `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/src/components/Navigation.tsx`

```typescript
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { navigationContent } from "../content/shared/navigation";

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="font-display text-xl font-light">
            {navigationContent.logoText}
          </Link>

          <div className="flex items-center gap-8">
            {navigationContent.links.map(link => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm hover:text-primary transition-colors"
              >
                {link.text}
              </Link>
            ))}
            <Button size="sm" className="rounded-full" asChild>
              <Link to={navigationContent.ctaButton.href}>
                {navigationContent.ctaButton.text}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
```

#### Benefits of This Structure

**Separation of concerns**:
- Page content isolated per page
- Shared content (navigation, footer) centralized
- Metadata management in one place

**Type safety**:
- TypeScript interfaces ensure content consistency
- Autocomplete in VS Code when editing content
- Compile-time errors if content structure changes

**Easy updates**:
- Non-developers can edit content files
- Single source of truth for all text/copy
- Version control tracks content changes separately

**Scalability**:
- Easy to add new pages (create new content file)
- Shared content updates automatically propagate
- Can migrate to i18n later (separate content files per language)

---

### 5. Recommended Approach for This Codebase

Based on the comprehensive analysis, here is the **recommended approach** for adding multi-page functionality to this Vite React landing page:

#### Primary Recommendation: React Router v6 with Lazy Loading

**Why this is the best fit**:

1. **Minimal configuration changes**: Works with existing Vite SPA setup
2. **Industry standard**: Largest community, most documentation, most Stack Overflow answers
3. **Excellent TypeScript support**: Type-safe with hooks like `useParams`, `useNavigate`
4. **Code splitting ready**: Easy lazy loading with `React.lazy()` and `Suspense`
5. **Vercel deployment**: Simple rewrites configuration
6. **Future-proof**: React Router 7 (stable) offers migration path to Remix if needed
7. **Integration**: Seamless with existing shadcn/ui components, Framer Motion, Tailwind
8. **Performance**: Client-side navigation is fast, shared layout cached

**Trade-offs accepted**:
- SEO requires additional work (react-helmet-async for metadata)
- Client-side rendering (not a major issue for marketing site with good metadata)
- Initial bundle includes router (~18 KB, acceptable overhead)

#### Implementation Roadmap

**Phase 1: Setup Routing Infrastructure (1-2 hours)**

1. Install React Router:
   ```bash
   npm install react-router-dom
   ```

2. Update `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/src/main.tsx`:
   ```typescript
   import { createRoot } from "react-dom/client";
   import { BrowserRouter } from "react-router-dom";
   import App from "./App.tsx";
   import "./index.css";

   createRoot(document.getElementById("root")!).render(
     <BrowserRouter>
       <App />
     </BrowserRouter>
   );
   ```

3. Create directory structure:
   ```bash
   mkdir -p src/pages src/components/shared src/content/pages src/content/shared
   ```

**Phase 2: Extract Shared Components (1 hour)**

4. Move current App.tsx content to `src/pages/HomePage.tsx`

5. Create `src/components/shared/Layout.tsx`:
   ```typescript
   import { Outlet } from "react-router-dom";
   import Navigation from "./Navigation";
   import Footer from "./Footer";

   export default function Layout() {
     return (
       <div className="min-h-screen bg-background">
         <Navigation />
         <main>
           <Outlet />
         </main>
         <Footer />
       </div>
     );
   }
   ```

6. Create `src/components/shared/Navigation.tsx` (see Navigation example above)

7. Extract footer from HomePage to `src/components/shared/Footer.tsx`

**Phase 3: Configure Routes (1 hour)**

8. Update `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/src/App.tsx`:
   ```typescript
   import { Routes, Route } from "react-router-dom";
   import { lazy, Suspense } from "react";
   import Layout from "./components/shared/Layout";

   const HomePage = lazy(() => import("./pages/HomePage"));
   const AboutPage = lazy(() => import("./pages/AboutPage"));
   const ContactPage = lazy(() => import("./pages/ContactPage"));
   const BlogPage = lazy(() => import("./pages/BlogPage"));

   export default function App() {
     return (
       <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
         <Routes>
           <Route path="/" element={<Layout />}>
             <Route index element={<HomePage />} />
             <Route path="about" element={<AboutPage />} />
             <Route path="contact" element={<ContactPage />} />
             <Route path="blog" element={<BlogPage />} />
           </Route>
         </Routes>
       </Suspense>
     );
   }
   ```

**Phase 4: Setup Content Management (2 hours)**

9. Create content types in `src/content/types.ts` (see Content Management section)

10. Create shared content:
    - `src/content/shared/navigation.ts`
    - `src/content/shared/footer.ts`
    - `src/content/shared/metadata.ts`

11. Create page content files:
    - `src/content/pages/home.ts` (migrate from existing App.tsx)
    - `src/content/pages/about.ts`
    - `src/content/pages/contact.ts`
    - `src/content/pages/blog.ts`

**Phase 5: Create Additional Pages (2-3 hours)**

12. Create `src/pages/AboutPage.tsx` (see AboutPage example above)

13. Create `src/pages/ContactPage.tsx`:
    ```typescript
    import { motion } from "motion/react";
    import { Button } from "../components/ui/button";
    import { Input } from "../components/ui/input";
    import { Textarea } from "../components/ui/textarea";
    import { contactContent as content } from "../content/pages/contact";

    export default function ContactPage() {
      return (
        <div className="min-h-screen bg-background py-32">
          <div className="container mx-auto px-6 md:px-12 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <h1 className="font-display text-section-heading font-light">
                {content.heading}
              </h1>
              <p className="text-xl text-muted-foreground">
                {content.description}
              </p>

              <form className="space-y-6 pt-8">
                {content.form.fields.map(field => (
                  <div key={field.name}>
                    <label className="block text-sm mb-2">{field.label}</label>
                    {field.type === "textarea" ? (
                      <Textarea placeholder={field.placeholder} required={field.required} />
                    ) : (
                      <Input type={field.type} placeholder={field.placeholder} required={field.required} />
                    )}
                  </div>
                ))}
                <Button size="lg" className="w-full">
                  {content.form.submitButton}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      );
    }
    ```

14. Create `src/pages/BlogPage.tsx` (blog listing or resources page)

**Phase 6: Add SEO Metadata (1 hour)**

15. Install react-helmet-async:
    ```bash
    npm install react-helmet-async
    ```

16. Wrap app in HelmetProvider in `main.tsx`:
    ```typescript
    import { HelmetProvider } from "react-helmet-async";

    createRoot(document.getElementById("root")!).render(
      <HelmetProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HelmetProvider>
    );
    ```

17. Add Helmet to each page component:
    ```typescript
    import { Helmet } from "react-helmet-async";
    import { metadata } from "../content/shared/metadata";

    export default function AboutPage() {
      return (
        <>
          <Helmet>
            <title>{metadata.about.title}</title>
            <meta name="description" content={metadata.about.description} />
          </Helmet>
          {/* Page content */}
        </>
      );
    }
    ```

**Phase 7: Configure Deployment (15 minutes)**

18. Update `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/vercel.json`:
    ```json
    {
      "buildCommand": "npm run build",
      "outputDirectory": "build",
      "devCommand": "npm run dev",
      "installCommand": "npm install",
      "rewrites": [
        {
          "source": "/(.*)",
          "destination": "/index.html"
        }
      ]
    }
    ```

**Phase 8: Testing and Refinement (1-2 hours)**

19. Test all routes locally (`npm run dev`)
20. Test lazy loading (network tab in DevTools)
21. Build and preview production build (`npm run build && npx serve build`)
22. Test navigation, metadata, animations
23. Deploy to Vercel and test live

#### Total Implementation Time: 8-12 hours

**Breakdown**:
- Phase 1 (Setup): 1-2 hours
- Phase 2 (Shared components): 1 hour
- Phase 3 (Routes): 1 hour
- Phase 4 (Content management): 2 hours
- Phase 5 (Pages): 2-3 hours
- Phase 6 (SEO): 1 hour
- Phase 7 (Deployment): 15 minutes
- Phase 8 (Testing): 1-2 hours

---

### 6. Alternative Recommendation: When to Choose Differently

#### Use Vite MPA Mode If:

- **SEO is the absolute top priority** (better initial indexing)
- **Pages are completely independent** (no shared state needed)
- **Traditional website feel is acceptable** (page reloads on navigation)
- **Target audience has slow connections** (smaller per-page bundles)

**Example use case**: Public-facing marketing site targeting search traffic where each page ranks independently.

#### Use TanStack Router If:

- **TypeScript-first development** is critical
- **Complex routing with many nested routes**
- **Search parameter validation** is important
- **Modern DX** is prioritized over community size

**Example use case**: Internal dashboard or complex web application with TypeScript-savvy team.

#### Use Wouter If:

- **Bundle size is the #1 priority** (landing page needs to be under 100 KB total)
- **Simple routing needs** (3-5 flat routes, no nesting)
- **Prototype or MVP** development

**Example use case**: Performance-critical landing page with strict budget constraints.

---

## Code References

- `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/index.html:1-15` - Single HTML entry point
- `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/src/main.tsx:1-6` - Application mount point
- `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/src/App.tsx:1-458` - Current monolithic single-page component
- `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/vite.config.ts:1-61` - Vite configuration (SPA mode)
- `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/vercel.json:1-6` - Deployment configuration
- `/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/package.json:6-49` - Dependencies (no routing library)

## Architecture Documentation

### Current Architecture (Single-Page)

```
index.html
  └─ src/main.tsx
      └─ <App />
          └─ [All sections inline]
              ├─ Hero
              ├─ Social Proof
              ├─ Problem Statement
              ├─ Features
              ├─ Process
              ├─ Trust
              ├─ Outcomes
              ├─ Final CTA
              └─ Footer
```

**Characteristics**:
- Single component tree
- No routing
- All content loaded on initial render
- No code splitting

### Recommended Architecture (React Router with Lazy Loading)

```
index.html
  └─ src/main.tsx
      └─ <BrowserRouter>
          └─ <App />
              └─ <Routes>
                  └─ <Route path="/" element={<Layout />}>
                      ├─ <Route index element={<HomePage />} />        [Lazy loaded]
                      ├─ <Route path="about" element={<AboutPage />} /> [Lazy loaded]
                      ├─ <Route path="contact" element={<ContactPage />} /> [Lazy loaded]
                      └─ <Route path="blog" element={<BlogPage />} />   [Lazy loaded]

Layout component:
  ├─ <Navigation /> (shared, from content/shared/navigation.ts)
  ├─ <Outlet /> (page-specific content)
  └─ <Footer /> (shared, from content/shared/footer.ts)
```

**Characteristics**:
- Client-side routing (no page reloads)
- Shared layout (Navigation + Footer rendered once)
- Code splitting (each page loaded on demand)
- Centralized content management

**Content structure**:
```
src/content/
  types.ts                     # TypeScript interfaces
  pages/
    home.ts                    # HomePage content
    about.ts                   # AboutPage content
    contact.ts                 # ContactPage content
    blog.ts                    # BlogPage content
  shared/
    navigation.ts              # Navigation links
    footer.ts                  # Footer content
    metadata.ts                # SEO metadata
```

**Build output**:
```
build/
  index.html
  assets/
    index-[hash].js            # Main bundle (React, Router, shared)
    HomePage-[hash].js         # Home page chunk
    AboutPage-[hash].js        # About page chunk
    ContactPage-[hash].js      # Contact page chunk
    BlogPage-[hash].js         # Blog page chunk
    index-[hash].css           # Shared styles
```

---

## Historical Context

This research builds on the [Content Management Strategy research](/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/thoughts/research/2025-10-17-content-management-strategy-for-vite-landing-page.md) which recommended a centralized TypeScript content configuration approach for managing landing page content.

**Key decisions from previous research**:
- Use TypeScript content files (not JSON or CMS)
- Centralize content for easy updates
- Type-safe content structure
- Single-page focus (now extending to multi-page)

**This research extends that approach by**:
- Adding routing for multiple pages
- Structuring content per-page
- Maintaining type safety across routes
- Preserving centralized content management benefits

---

## Open Questions

1. **How many pages will be added initially?**
   - If only 2-3 pages: React Router is sufficient
   - If 10+ pages with complex nesting: Consider TanStack Router
   - If completely independent pages: Consider Vite MPA

2. **What is the expected navigation frequency?**
   - Frequent navigation between pages: Client-side routing (React Router)
   - Infrequent navigation: MPA mode acceptable

3. **Is SEO the top priority?**
   - Critical SEO: Consider Vite MPA or server-side rendering (Remix/Next.js)
   - Moderate SEO: React Router + react-helmet-async is sufficient

4. **Will there be dynamic routes (e.g., `/blog/:slug`)?**
   - Yes: React Router or TanStack Router required
   - No: Any approach works

5. **Is internationalization (i18n) planned?**
   - Yes: Structure content files per language (e.g., `content/en/`, `content/es/`)
   - No: Current structure works

6. **What is the team's TypeScript proficiency?**
   - High: TanStack Router may be appealing
   - Moderate: React Router is safer choice
   - Low: Wouter or basic React Router

---

## Related Research

- [Content Management Strategy for Vite Landing Page](/Users/seankim/Wooj Dropbox/Utilities/grove/grove-lp/thoughts/research/2025-10-17-content-management-strategy-for-vite-landing-page.md) - Centralized TypeScript content configuration approach

---

## Conclusion

For this Vite React landing page, **React Router v6 with lazy loading** is the optimal approach for implementing multi-page functionality. It balances:

- **Developer experience**: Industry-standard library with extensive documentation
- **Performance**: Code splitting reduces initial load, fast client-side navigation
- **Type safety**: TypeScript support for routes and content
- **Integration**: Seamless with existing Vite, React, shadcn/ui, and Tailwind setup
- **Deployment**: Simple Vercel configuration with rewrites
- **Future flexibility**: Easy migration path to Remix if SSR becomes needed

**Implementation complexity**: 8-12 hours total, low risk, well-documented approach.

**Alternative approaches** (Vite MPA, TanStack Router, Wouter) are documented with specific use cases where they may be preferable, but for a marketing landing page with 3-5 pages, React Router offers the best balance of features, community support, and developer experience.

The centralized content management approach from previous research integrates seamlessly with this routing strategy by structuring content per-page while maintaining type safety and ease of updates.
