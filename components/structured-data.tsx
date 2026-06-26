export function StructuredData() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Ravi Kumar Sharma - Advocate',
    url: 'https://rks.ad',
    telephone: '+91-XXXXXXXXXX',
    email: 'iam@rks.ad',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
      addressLocality: 'Jaipur',
      addressRegion: 'Rajasthan',
    },
    areaServed: ['Jaipur', 'Rajasthan', 'India'],
    priceRange: '₹₹₹',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '1100',
      reviewCount: '1100',
    },
    jobTitle: 'Advocate & Legal Counsel',
    knowsAbout: ['Criminal Law', 'Civil Law', 'Corporate Law', 'Legal Advocacy'],
    description:
      'Premium legal counsel and advocacy services by Ravi Kumar Sharma, a highly experienced and top-rated advocate in Jaipur with 1100+ satisfied clients and 980+ cases won.',
    sameAs: [
      'https://ecourtsindia.com/advocate/ravi-kumar-sharma',
      'https://cal.id/lawup',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  )
}
