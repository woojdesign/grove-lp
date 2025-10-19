import { PageMetadata } from '../types';

export interface ContactPageContent {
  metadata: PageMetadata;
  hero: {
    title: string;
    description: string;
  };
  sections: {
    title: string;
    content: string[];
    email?: string;
  }[];
}

export const contactPageContent: ContactPageContent = {
  metadata: {
    title: 'Contact Us | Grove',
    description: 'Get in touch with Grove. We\'re here to answer questions, discuss partnerships, and help you build meaningful connections.',
    ogTitle: 'Contact Us - Grove',
    ogDescription: 'Questions about Grove? We\'d love to hear from you.',
  },

  hero: {
    title: 'Get in Touch',
    description: 'We\'d love to hear from you. Whether you\'re interested in bringing Grove to your organization or just have questions, reach out anytime.'
  },

  sections: [
    {
      title: 'General Inquiries',
      content: [
        'For general questions about Grove, how it works, or anything else, drop us a line.',
      ],
      email: 'hello@commonplace.app'
    },
    {
      title: 'Enterprise & Partnerships',
      content: [
        'Interested in bringing Grove to your company, university, or organization? We\'d love to discuss how we can help foster meaningful connections in your community.',
        'Whether you\'re just exploring options or ready to start a pilot, our partnerships team is here to help.'
      ],
      email: 'partnerships@commonplace.app'
    },
    {
      title: 'Privacy Requests',
      content: [
        'For data access requests, privacy inquiries, or to exercise your privacy rights (GDPR, CCPA), contact our privacy team.',
        'Please include "Privacy Request" in your subject line to ensure prompt routing.'
      ],
      email: 'privacy@commonplace.app'
    },
    {
      title: 'Security & Compliance',
      content: [
        'For security questions, responsible vulnerability disclosure, or compliance documentation requests, reach out to our security team.',
        'We typically respond to security inquiries within 48 hours.'
      ],
      email: 'security@commonplace.app'
    },
    {
      title: 'Support',
      content: [
        'If you\'re already using Grove and need help, our support team is ready to assist.',
        'For technical issues, account questions, or general support, we\'re here.'
      ],
      email: 'support@commonplace.app'
    },
    {
      title: 'Press & Media',
      content: [
        'Journalists and media inquiries can reach our communications team for press materials, interviews, or story collaboration.',
      ],
      email: 'press@commonplace.app'
    },
    {
      title: 'Mailing Address',
      content: [
        'Grove',
        'San Francisco, CA',
        'USA'
      ]
    },
    {
      title: 'We\'re Human Too',
      content: [
        'We read every email and try to respond as quickly as possible. While we can\'t guarantee immediate responses, we typically reply within 1-2 business days.',
        'Thanks for your interest in Grove. We look forward to hearing from you.'
      ]
    }
  ]
};
