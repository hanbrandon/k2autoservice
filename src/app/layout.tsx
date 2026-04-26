import type { Metadata } from 'next';
import './globals.css';
import JSONLD from '@/components/seo/JSONLD';

export const metadata: Metadata = {
    metadataBase: new URL('https://k2autoservice.com'),
    title: {
        default:
            'K2 Auto Service | Premium Auto Repair & Car Sales Garden Grove',
        template: '%s | K2 Auto Service',
    },
    description:
        "Garden Grove's leading automotive center. K2 Auto Service offers certified auto repair, fast DMV registration, and a premium selection of new and used cars in Orange County.",
    keywords: [
        'Auto Repair Garden Grove',
        'Car Sales Orange County',
        'DMV Services Garden Grove',
        'Used Cars Garden Grove',
        'Mechanic Orange County',
        'Registration Renewal CA',
        'Title Transfer Services',
        'Certified Pre-Owned Cars',
    ],
    authors: [{ name: 'K2 Auto Service' }],
    creator: 'K2 Auto Service',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://k2autoservice.com',
        siteName: 'K2 Auto Service',
        title: 'K2 Auto Service | Auto Repair & Car Sales in Garden Grove, CA',
        description:
            'Professional automotive solutions: Certified repairs, expedited DMV services, and premium car sales in Garden Grove.',
        images: [
            {
                url: '/og-image.jpg', // Placeholder, user should provide
                width: 1200,
                height: 630,
                alt: 'K2 Auto Service - Garden Grove',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'K2 Auto Service | Auto Repair & Car Sales',
        description:
            'Professional automotive solutions in Garden Grove. Repairs, DMV, and Sales.',
        images: ['/og-image.jpg'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    alternates: {
        canonical: 'https://k2autoservice.com',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <JSONLD />
            </head>
            <body className="antialiased selection:bg-[#ed1c24] selection:text-white">
                {children}
            </body>
        </html>
    );
}
