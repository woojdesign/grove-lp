import { HomePageContent } from '../types';
import heroImage from '../../assets/1d238fd6df90dc12f9289f962d9003c6c6a24d61.png';
import featureImage from '../../assets/priscilla-du-preez-K8XYGbw4Ahg-unsplash.jpg';

export const homePageContent: HomePageContent = {
  metadata: {
    title: 'Grove | Enterprise',
    description: 'Commonplace quietly introduces you to people who share your passions, experiences, and goals — making large organizations feel human again.',
    ogTitle: 'Grove - Human Connection Platform for Organizations',
    ogDescription: 'AI-powered introductions that spark belonging. Used by companies and universities to help people meet others they\'d love to know but never meet.',
    ogImage: 'https://commonplace.app/og-image.jpg'
  },

  hero: {
    badge: 'Designed for human connection',
    headline: {
      before: 'In every big company, there are',
      highlight: 'hundreds of people',
      after: "you'd love to know but never meet."
    },
    subheadline: 'Grove introduces you to the people who share your passions, experiences, and goals — so large organizations feel more human.',
    buttons: {
      primary: {
        text: 'Get Early Access'
      },
      secondary: {
        text: 'Request a Demo',
        variant: 'ghost'
      }
    },
    backgroundImage: {
      src: heroImage,
      alt: 'People connecting through shared interests'
    }
  },

  socialProof: {
    heading: 'Already sparking conversations at',
    companies: ['Company A', 'University B', 'Startup C']
  },

  problem: {
    heading: {
      before: 'Organizations have never been more',
      highlight1: 'connected',
      middle: '— and people have never felt more',
      highlight2: 'disconnected.',
      after: ''
    },
    description: "Back-to-back Zoom meetings, distributed teams, and endless Slack threads mean that we know our coworkers' calendars better than we know them. Culture can't thrive if people never cross paths — and serendipity doesn't scale on its own.",
    callout: 'Grove accelerates serendipity.'
  },

  feature: {
    image: {
      src: featureImage,
      alt: 'Modern workspace'
    },
    heading: {
      before: 'Thoughtful introductions, powered by',
      highlight: 'quiet intelligence.'
    },
    description: 'Commonplace asks a few fun, open-ended questions to learn what makes each person tick, then maps interests using AI embeddings — like semantic DNA for your community.',
    ctaText: 'Learn more'
  },

  process: {
    heading: {
      before: 'No scrolling. No feeds. Just connection.',
      highlight: 'Create community within your company.'
    },
    steps: [
      {
        number: '01',
        title: 'Listen',
        description: 'Grove asks a few fun, open-ended questions to learn what makes each person tick.'
      },
      {
        number: '02',
        title: 'Learn',
        description: 'Our system maps interests and experiences using AI embeddings — like semantic DNA for your community.'
      },
      {
        number: '03',
        title: 'Connect',
        description: 'Every month, Grove introduces each employee to someone at your organization who they\'d really enjoy meeting.'
      }
    ]
  },

  trust: {
    heading: {
      before: 'Safe, private, and built for',
      highlight: 'enterprises.'
    },
    features: [
      {
        text: 'SOC2-ready and GDPR-compliant security',
        icon: 'Shield'
      },
      {
        text: 'Double opt-in introductions only',
        icon: 'UserCheck'
      },
      {
        text: 'Aggregated analytics, never person-level tracking',
        icon: 'BarChart3'
      },
      {
        text: 'Flexible credentialing (email, SSO, or geofence)',
        icon: 'Key'
      }
    ]
  },

  outcomes: {
    heading: {
      highlight1: 'Belonging',
      middle: 'drives retention.',
      highlight2: 'Connection',
      after: 'drives innovation.'
    },
    stats: [
      {
        value: '74%',
        description: "of employees say they'd stay longer if they felt more connected at work"
      },
      {
        value: '30-50%',
        description: 'participation within 90 days in Commonplace pilot organizations'
      },
      {
        value: '3 of 4',
        description: 'participants report "meeting someone they wouldn\'t have otherwise"'
      }
    ],
    testimonials: [
      {
        quote: 'Our campus finally feels smaller.',
        author: 'MBA student'
      },
      {
        quote: "It's like a quiet culture supercharger.",
        author: 'HR Director'
      }
    ]
  },

  finalCTA: {
    heading: {
      before: 'Ready to make your organization feel more',
      highlight: 'human?'
    },
    buttons: {
      primary: {
        text: 'Request a Demo'
      },
      secondary: {
        text: 'Get Early Access',
        variant: 'outline'
      }
    },
    subtext: 'Commonplace pilots start with 200–500 users and grow organically.\nWe\'ll handle setup; you enjoy the ripple effects.'
  }
};
