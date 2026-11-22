import { useEffect } from 'react';

const SEOHead = ({ title, description, keywords, canonical }) => {
  useEffect(() => {
    const fullTitle = title 
      ? `${title} | SARAR INDUSTRIES` 
      : 'SARAR INDUSTRIES | Industrial Insulation & Sealing Products';
    document.title = fullTitle;

    // Meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        description ||
          'SARAR INDUSTRIES - Trusted manufacturer of industrial insulation, sealing, rubber and engineered products backed by over 50 years of manufacturing experience. Brands: SAKET & DWITECH.'
      );
    }

    // Meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords && keywords) {
      metaKeywords.setAttribute('content', keywords);
    }

    // Canonical link
    if (canonical) {
      let linkCanonical = document.querySelector('link[rel="canonical"]');
      if (!linkCanonical) {
        linkCanonical = document.createElement('link');
        linkCanonical.setAttribute('rel', 'canonical');
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.setAttribute('href', canonical);
    }
  }, [title, description, keywords, canonical]);

  return null;
};

export default SEOHead;
