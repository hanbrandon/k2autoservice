import React from 'react';

const JSONLD = () => {
    const businessSchema = {
        '@context': 'https://schema.org',
        '@type': 'AutoRepair',
        name: 'K2 Auto Service',
        image: 'https://k2autoservice.com/logo.png', // Update with actual logo URL
        '@id': 'https://k2autoservice.com',
        url: 'https://k2autoservice.com',
        telephone: '+1-714-534-0024',
        address: {
            '@type': 'PostalAddress',
            streetAddress: '8892 Garden Grove Blvd.',
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
                closes: '14:00',
            },
        ],
        sameAs: [
            'https://www.instagram.com/k2autoservice', // Update with actual social links
            'https://www.threads.net/@k2autoservice',
        ],
        priceRange: '$$',
        description:
            "K2 Auto Service is Garden Grove's premier automotive center. We provide certified auto repairs, expedited DMV services, and a curated selection of new and pre-owned vehicles. Professional care for all makes and models.",
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
