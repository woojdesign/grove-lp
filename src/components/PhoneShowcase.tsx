import React from 'react';
import { motion } from 'motion/react';
import IPhoneFrame from './IPhoneFrame';

interface PhoneShowcaseProps {
  showcaseBaseUrl: string;
}

export default function PhoneShowcase({ showcaseBaseUrl }: PhoneShowcaseProps) {
  const phones = [
    {
      route: '/showcase/listen',
      alt: 'Listen - Answer questions to share what makes you tick',
      delay: 0,
    },
    {
      route: '/showcase/learn',
      alt: 'Learn - AI maps your interests like semantic DNA',
      delay: 0.2,
    },
    {
      route: '/showcase/connect',
      alt: 'Connect - Meet people who share your curiosity',
      delay: 0.4,
    },
  ];

  return (
    <div className="relative w-full py-20 overflow-hidden">
      {/* Desktop: Side by side layout */}
      <div className="hidden lg:flex items-center justify-center gap-8 min-h-[850px] relative">
        {phones.map((phone, index) => (
          <div
            key={`desktop-${phone.route}`}
            className={`relative ${
              index === 1 ? '-translate-y-5' : 'translate-y-5'
            }`}
          >
            <IPhoneFrame
              src={`${showcaseBaseUrl}${phone.route}`}
              alt={phone.alt}
            />
          </div>
        ))}
      </div>

      {/* Tablet: Smaller side by side */}
      <div className="hidden md:flex lg:hidden items-center justify-center gap-6 relative">
        {phones.map((phone) => (
          <div
            key={`tablet-${phone.route}`}
            className="relative scale-[0.8]"
          >
            <IPhoneFrame
              src={`${showcaseBaseUrl}${phone.route}`}
              alt={phone.alt}
            />
          </div>
        ))}
      </div>

      {/* Mobile: Vertical stack */}
      <div className="flex md:hidden flex-col items-center gap-12">
        {phones.map((phone) => (
          <div
            key={`mobile-${phone.route}`}
            className="scale-[0.7]"
          >
            <IPhoneFrame
              src={`${showcaseBaseUrl}${phone.route}`}
              alt={phone.alt}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
