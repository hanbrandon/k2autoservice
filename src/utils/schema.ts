import { BUSINESS_INFO } from '@/utils/businessInfo';

export const businessId = `${BUSINESS_INFO.siteUrl}/#business`;

export function serviceSchema({
    name,
    description,
    url,
    serviceType,
}: {
    name: string;
    description: string;
    url: string;
    serviceType: string;
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `${url}#service`,
        name,
        description,
        serviceType,
        url,
        provider: {
            '@id': businessId,
        },
        areaServed: [
            {
                '@type': 'City',
                name: 'Garden Grove',
            },
            {
                '@type': 'AdministrativeArea',
                name: 'Orange County',
            },
        ],
    };
}
