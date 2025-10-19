import { NavigationContent, FooterContent } from '../types';

export const navigationContent: NavigationContent = {
  logoText: 'Grove',
  links: [
    {
      text: 'Enterprise',
      href: '/'
    },
    {
      text: 'Schools',
      href: '/schools'
    }
  ],
  ctaButton: {
    text: 'Get Early Access',
    href: '#'
  }
};

export const footerContent: FooterContent = {
  copyright: 'Grove © 2025 — Designed to make large organizations feel small again.',
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
