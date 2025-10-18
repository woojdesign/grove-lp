import React from "react";

interface IPhoneFrameProps {
  src: string;
  alt: string;
  className?: string;
}

export default function IPhoneFrame({ src, alt, className = '' }: IPhoneFrameProps) {
  return (
    <div className={`relative ${className}`} style={{ width: '375px', height: '812px' }}>
      {/* iPhone frame using design system tokens */}
      <div className="phone-frame relative w-full h-full">
        {/* Screen area */}
        <div className="phone-screen">
          {/* Iframe - keep positioning inline as standard pattern */}
          <iframe
            src={src}
            title={alt}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none',
              display: 'block',
              zIndex: 1
            }}
            sandbox="allow-scripts allow-same-origin"
          />

          {/* Dynamic Island overlay */}
          <div className="phone-island" />
        </div>
      </div>
    </div>
  );
}
