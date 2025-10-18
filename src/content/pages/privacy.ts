import { PageMetadata } from '../types';

export interface PrivacyPageContent {
  metadata: PageMetadata;
  hero: {
    title: string;
    description: string;
    lastUpdated: string;
  };
  sections: {
    title: string;
    content: string[];
  }[];
}

export const privacyPageContent: PrivacyPageContent = {
  metadata: {
    title: 'Privacy Policy | Commonplace',
    description: 'Learn how Commonplace protects your privacy and handles your personal information.',
    ogTitle: 'Privacy Policy - Commonplace',
    ogDescription: 'Our commitment to protecting your privacy and personal data.',
  },

  hero: {
    title: 'Privacy Policy',
    description: 'Your privacy matters. Here\'s how we protect your information and respect your data.',
    lastUpdated: 'Last updated: January 2025'
  },

  sections: [
    {
      title: 'Our Commitment to Privacy',
      content: [
        'At Commonplace, we believe meaningful connections should never come at the cost of your privacy. We\'re committed to transparency about what data we collect, how we use it, and the choices you have.',
        'This privacy policy explains our practices in clear, straightforward language — because privacy policies shouldn\'t require a law degree to understand.'
      ]
    },
    {
      title: 'Information We Collect',
      content: [
        'To facilitate meaningful introductions, we collect information you provide when creating your profile, including your name, work email, interests, experiences, and responses to our onboarding questions.',
        'We also collect basic usage data to improve our service, such as which features you use, when you log in, and technical information like your device type and browser.',
        'We do not track your browsing behavior outside of Commonplace, and we never sell your personal information to third parties.'
      ]
    },
    {
      title: 'How We Use Your Data',
      content: [
        'Your profile information powers our AI matching system, which uses semantic embeddings to find people with shared interests and experiences. This processing happens securely within our systems.',
        'We use aggregated, anonymized data to help organizations understand program engagement and effectiveness — but we never share individual-level activity or identify specific users to administrators.',
        'Your data is used exclusively to connect you with others in your community and improve the Commonplace experience. We don\'t use it for advertising or unrelated purposes.'
      ]
    },
    {
      title: 'Data Protection & Security',
      content: [
        'We employ industry-standard security measures to protect your information, including encryption in transit and at rest, regular security audits, and strict access controls.',
        'We\'re SOC2-ready and GDPR-compliant, meeting enterprise-grade security standards. Our infrastructure is hosted on secure cloud providers with robust physical and digital safeguards.',
        'In the unlikely event of a data breach, we\'ll notify affected users promptly and transparently.'
      ]
    },
    {
      title: 'Your Privacy Rights',
      content: [
        'You have full control over your data. You can access, update, or delete your profile at any time through your account settings.',
        'You can opt out of introductions whenever you choose, and you decide which connections to accept or decline. We never force interactions.',
        'If you\'re in the EU, UK, or California, you have additional rights under GDPR and CCPA, including the right to data portability and the right to object to processing. Contact us to exercise these rights.'
      ]
    },
    {
      title: 'Data Retention',
      content: [
        'We retain your profile information for as long as your account is active. If you delete your account, we remove your personal data within 30 days, though we may retain anonymized analytics data.',
        'Organizations may have their own data retention policies. When your organization\'s Commonplace program ends, we work with them to ensure proper data handling according to their preferences and applicable regulations.'
      ]
    },
    {
      title: 'Cookies & Tracking',
      content: [
        'We use essential cookies to keep you logged in and remember your preferences. We don\'t use advertising cookies or third-party tracking pixels.',
        'You can control cookie settings through your browser, though disabling essential cookies may limit functionality.'
      ]
    },
    {
      title: 'Third-Party Services',
      content: [
        'We work with carefully selected service providers who help us operate Commonplace, including cloud hosting, email delivery, and analytics. These partners are contractually required to protect your data and use it only for Commonplace-related services.',
        'We do not share your data with third parties for their own marketing or unrelated purposes.'
      ]
    },
    {
      title: 'Children\'s Privacy',
      content: [
        'Commonplace is designed for organizations and is not intended for children under 16. We do not knowingly collect information from children. If you believe we\'ve inadvertently collected data from a child, please contact us immediately.'
      ]
    },
    {
      title: 'Changes to This Policy',
      content: [
        'We may update this privacy policy from time to time to reflect changes in our practices or legal requirements. We\'ll notify you of significant changes via email or through the platform.',
        'Continued use of Commonplace after changes take effect constitutes acceptance of the updated policy.'
      ]
    },
    {
      title: 'Contact Us',
      content: [
        'Questions about privacy? We\'re here to help. Reach out to our privacy team at privacy@commonplace.app.',
        'For data access requests or to exercise your privacy rights, email us at privacy@commonplace.app with "Privacy Request" in the subject line.'
      ]
    }
  ]
};
