import { PageMetadata } from '../types';

export interface SecurityPageContent {
  metadata: PageMetadata;
  hero: {
    title: string;
    description: string;
  };
  sections: {
    title: string;
    content: string[];
  }[];
}

export const securityPageContent: SecurityPageContent = {
  metadata: {
    title: 'Security | Grove',
    description: 'Learn about Grove\'s security practices, compliance standards, and commitment to protecting your data.',
    ogTitle: 'Security - Grove',
    ogDescription: 'Enterprise-grade security and compliance for meaningful connections.',
  },

  hero: {
    title: 'Security & Compliance',
    description: 'Trust is foundational to connection. Here\'s how we protect your data and maintain the highest security standards.'
  },

  sections: [
    {
      title: 'Built for Enterprise Security',
      content: [
        'Grove is designed from the ground up with enterprise-grade security. We understand that organizations trust us with sensitive data about their people, and we take that responsibility seriously.',
        'Our security practices meet or exceed industry standards, including SOC2 Type II readiness and GDPR compliance. We continuously monitor, test, and improve our security posture.'
      ]
    },
    {
      title: 'Data Encryption',
      content: [
        'All data is encrypted in transit using TLS 1.3, ensuring that information moving between your device and our servers is protected from interception.',
        'Data at rest is encrypted using AES-256 encryption, the same standard used by governments and financial institutions worldwide.',
        'Encryption keys are managed using industry best practices with strict access controls and regular rotation.'
      ]
    },
    {
      title: 'Infrastructure Security',
      content: [
        'Grove runs on secure cloud infrastructure with tier-appropriate providers who maintain SOC2, ISO 27001, and other critical certifications.',
        'Our infrastructure includes redundant systems, automated backups, and disaster recovery capabilities to ensure data availability and resilience.',
        'We employ network segmentation, firewalls, and intrusion detection systems to protect against unauthorized access.'
      ]
    },
    {
      title: 'Access Controls',
      content: [
        'Access to production systems and user data is strictly limited to authorized personnel on a need-to-know basis.',
        'We enforce multi-factor authentication (MFA) for all team members accessing sensitive systems.',
        'All access is logged and monitored, with regular reviews to ensure compliance with our security policies.'
      ]
    },
    {
      title: 'Application Security',
      content: [
        'Our development practices include regular security code reviews, static and dynamic analysis, and dependency vulnerability scanning.',
        'We follow OWASP guidelines and secure development lifecycle practices to prevent common vulnerabilities.',
        'Third-party security audits and penetration testing help us identify and address potential security gaps proactively.'
      ]
    },
    {
      title: 'Privacy by Design',
      content: [
        'Privacy and security are not afterthoughts — they\'re built into every feature from the start.',
        'We collect only the minimum data necessary to provide meaningful introductions and maintain our service.',
        'Users have full control over their data, with transparent access, modification, and deletion capabilities.',
        'We never sell user data, and we use anonymized, aggregated analytics to protect individual privacy.'
      ]
    },
    {
      title: 'Compliance & Certifications',
      content: [
        'SOC2 Type II readiness: We maintain controls and processes that meet SOC2 Trust Service Criteria for security, availability, and confidentiality.',
        'GDPR compliance: We adhere to EU data protection regulations, including data minimization, purpose limitation, and user rights.',
        'CCPA compliance: We honor California residents\' privacy rights, including data access, deletion, and opt-out requests.',
        'Regular third-party audits validate our compliance posture and identify areas for continuous improvement.'
      ]
    },
    {
      title: 'Incident Response',
      content: [
        'We maintain a comprehensive incident response plan to quickly detect, contain, and remediate security incidents.',
        'Our team monitors systems 24/7 for suspicious activity and potential security events.',
        'In the event of a data breach, we\'ll notify affected users and relevant authorities in accordance with applicable regulations.',
        'We conduct post-incident reviews to learn from events and strengthen our defenses.'
      ]
    },
    {
      title: 'Employee Training',
      content: [
        'All Grove team members receive regular security awareness training covering topics like phishing, social engineering, and data handling best practices.',
        'Security is part of our culture — every team member is empowered and expected to prioritize user data protection.'
      ]
    },
    {
      title: 'Vendor Management',
      content: [
        'We carefully vet all third-party vendors and service providers who handle user data, ensuring they meet our security standards.',
        'Vendor agreements include strict data protection requirements and regular security reviews.',
        'We minimize third-party integrations and data sharing to reduce our attack surface.'
      ]
    },
    {
      title: 'Responsible Disclosure',
      content: [
        'We welcome reports from security researchers who discover potential vulnerabilities in Grove.',
        'If you\'ve found a security issue, please report it responsibly to security@commonplace.app. We\'ll acknowledge your report within 48 hours and work with you to understand and address the issue.',
        'We\'re committed to transparency and will provide updates on remediation efforts for verified vulnerabilities.'
      ]
    },
    {
      title: 'Questions About Security?',
      content: [
        'For detailed security documentation, compliance certifications, or enterprise security inquiries, contact our security team at security@commonplace.app.',
        'We\'re happy to discuss our security practices, participate in vendor security assessments, and answer any questions about how we protect your data.'
      ]
    }
  ]
};
