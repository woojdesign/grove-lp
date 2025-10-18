import { Helmet } from 'react-helmet-async';
import { PageMetadata } from '../content/types';

interface PageHeadProps {
  metadata: PageMetadata;
  noindex?: boolean;
}

export function PageHead({ metadata, noindex = false }: PageHeadProps) {
  return (
    <Helmet>
      {/* Essential meta tags */}
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />

      {/* Robots meta tag */}
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph tags for social sharing */}
      {metadata.ogTitle && (
        <meta property="og:title" content={metadata.ogTitle} />
      )}
      {metadata.ogDescription && (
        <meta property="og:description" content={metadata.ogDescription} />
      )}
      {metadata.ogImage && (
        <meta property="og:image" content={metadata.ogImage} />
      )}
      <meta property="og:type" content="website" />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      {metadata.ogTitle && (
        <meta name="twitter:title" content={metadata.ogTitle} />
      )}
      {metadata.ogDescription && (
        <meta name="twitter:description" content={metadata.ogDescription} />
      )}
      {metadata.ogImage && (
        <meta name="twitter:image" content={metadata.ogImage} />
      )}
    </Helmet>
  );
}
