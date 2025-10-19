import { HomePageContent } from '../types';
import heroImage from '../../assets/1d238fd6df90dc12f9289f962d9003c6c6a24d61.png';
import featureImage from '../../assets/priscilla-du-preez-K8XYGbw4Ahg-unsplash.jpg';

export const schoolsPageContent: HomePageContent = {
  metadata: {
    title: 'Grove | Meaningful Connections for Students',
    description: 'Grove introduces students to people who share their passions, experiences, and goals — helping students feel more connected on and off campus.',
    ogTitle: 'Grove - Student Connection Platform for Universities',
    ogDescription: 'AI-powered introductions that help students meet others they\'d love to know but never meet. Used by colleges and universities to deepen community.',
    ogImage: 'https://commonplace.app/og-image.jpg'
  },

  hero: {
    badge: 'Designed for student connection',
    headline: {
      before: 'At every college and university, there are',
      highlight: 'hundreds of people',
      after: "you'd love to know but never meet."
    },
    subheadline: 'Grove introduces you to the people who share your passions, experiences, and goals — so students can feel more connected on and off campus.',
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
      alt: 'Students connecting through shared interests'
    }
  },

  socialProof: {
    heading: 'Already sparking conversations at',
    companies: ['University A', 'College B', 'Campus C']
  },

  problem: {
    heading: {
      before: 'Schools have never been more',
      highlight1: 'connected',
      middle: '— and yet students have never felt more',
      highlight2: 'disconnected',
      after: 'from their learning experience.'
    },
    description: "Students can learn just as much from each other as in the class room. But peer learning can't thrive if students never cross paths — and serendipity doesn't scale on its own.",
    callout: 'Grove accelerates serendipity.'
  },

  feature: {
    image: {
      src: featureImage,
      alt: 'Students learning together'
    },
    heading: {
      before: 'Thoughtful introductions, powered by',
      highlight: 'quiet intelligence.'
    },
    description: 'Grove asks a few fun, open-ended questions to learn what makes each person tick, then maps interests using AI embeddings — like semantic DNA for your community.',
    ctaText: 'Learn more'
  },

  process: {
    heading: {
      before: 'No scrolling. No feeds. Just connection.',
      highlight: 'Deepen community across your student population.'
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
        description: 'Every month, Grove introduces each student to someone at your school who they\'d really enjoy meeting.'
      }
    ]
  },

  trust: {
    heading: {
      before: 'Safe, private, and built for',
      highlight: 'education.'
    },
    features: [
      {
        text: 'FERPA-compliant and student privacy focused',
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
      after: 'drives learning.'
    },
    stats: [
      {
        value: '70%',
        description: 'of students say peer connections improve their learning experience'
      },
      {
        value: '30-50%',
        description: 'participation within 90 days in Grove pilot programs'
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
        quote: "It's helping students build real community.",
        author: 'Student Life Director'
      }
    ]
  },

  finalCTA: {
    heading: {
      before: 'Ready to deepen connection on your',
      highlight: 'campus?'
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
    subtext: 'Grove pilots start with 200–500 students and grow organically.\nWe\'ll handle setup; you enjoy the ripple effects.'
  }
};
