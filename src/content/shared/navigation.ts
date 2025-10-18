import { NavigationContent, FooterContent } from '../types';

export const navigationContent: NavigationContent = {
  logoText: 'Commonplace',
  links: [], // No navigation links in current design
  ctaButton: {
    text: 'Get Early Access',
    href: '#'
  }
};

export const footerContent: FooterContent = {
  copyright: 'Commonplace © 2025 — Designed to make large organizations feel small again.',
  links: [
    {
      text: 'Privacy',
      href: '/privacy'
    },
    {
      text: 'Security',
      href: '/security'
    },
    {
      text: 'Contact',
      href: '/contact'
    }
  ]
};
