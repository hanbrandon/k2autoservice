import React from 'react';
import { BUSINESS_INFO } from '@/utils/businessInfo';

const JSONLD = () => {
    const businessSchema = {
        '@context': 'https://schema.org',
        '@type': 'AutoRepair',
        name: 'K2 Auto Group',
        image: `${BUSINESS_INFO.siteUrl}/og-image.png`, 
        '@id': BUSINESS_INFO.siteUrl,
        url: BUSINESS_INFO.siteUrl,
        telephone: `+1-${BUSINESS_INFO.phoneRaw.slice(0, 3)}-${BUSINESS_INFO.phoneRaw.slice(3, 6)}-${BUSINESS_INFO.phoneRaw.slice(6)}`,
        address: {
            '@type': 'PostalAddress',
            streetAddress: BUSINESS_INFO.address.split('.')[0] + '.',
            addressLocality: 'Garden Grove',
            addressRegion: 'CA',
            postalCode: '92844',
            addressCountry: 'US',
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: 33.7753,
            longitude: -117.9405,
        },
        openingHoursSpecification: [
            {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: [
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                ],
                opens: '08:00',
                closes: '18:00',
            },
            {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: 'Saturday',
                opens: '08:00',
                closes: '12:00',
            },
        ],
        sameAs: [
            `https://www.instagram.com/${BUSINESS_INFO.instagram}`,
            `https://www.threads.net/@${BUSINESS_INFO.instagram}`,
        ],
        priceRange: '$$',
        description:
            "K2 Auto Group is Garden Grove's premier automotive center. We provide certified auto repairs, expedited DMV services, and a curated selection of new and pre-owned vehicles. Professional care for all makes and models.",
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Automotive Services',
            itemListElement: [
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: 'Auto Repair & Maintenance',
                    },
                },
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: 'DMV Registration Services',
                    },
                },
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: 'Car Sales (New & Used)',
                    },
                },
            ],
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
        />
    );
};

export default JSONLD;
