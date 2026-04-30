import { MetadataRoute } from 'next';
import { BUSINESS_INFO } from '@/utils/businessInfo';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/api/',
        },
        sitemap: `${BUSINESS_INFO.siteUrl}/sitemap.xml`,
    };
}
