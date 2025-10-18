// Content Management Type Definitions
// All content structures for the Grove landing page

// ============================================================================
// SHARED TYPES
// ============================================================================

export interface Image {
  src: string;
  alt: string;
}

export interface CTAButton {
  text: string;
  variant?: 'default' | 'outline' | 'ghost';
}

export interface NavigationLink {
  text: string;
  href: string;
}

export interface PageMetadata {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

// ============================================================================
// NAVIGATION & FOOTER
// ============================================================================

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

// ============================================================================
// HOME PAGE TYPES
// ============================================================================

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

export interface HomePageContent {
  metadata: PageMetadata;
  hero: HeroSection;
  socialProof: SocialProofSection;
  problem: ProblemSection;
  feature: FeatureSection;
  process: ProcessSection;
  trust: TrustSection;
  outcomes: OutcomesSection;
  finalCTA: FinalCTASection;
}

// ============================================================================
// METADATA COLLECTION
// ============================================================================

export interface SiteMetadata {
  home: PageMetadata;
  // Future pages can be added here
  // about: PageMetadata;
  // contact: PageMetadata;
  // blog: PageMetadata;
}
