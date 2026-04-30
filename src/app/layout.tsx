import type { Metadata } from 'next';
import './globals.css';
import JSONLD from '@/components/seo/JSONLD';

export const metadata: Metadata = {
    metadataBase: new URL('https://k2motorgroup.com'),
    icons: {
        icon: '/favicon.ico',
        apple: '/favicon.ico', // Standard fallback
    },
    title: {
        default: 'K2 Auto Group | Premium Auto Repair & Car Sales Garden Grove',
        template: '%s | K2 Auto Group',
    },
    description:
        "Garden Grove's leading automotive center. K2 Auto Group offers certified auto repair, fast DMV registration, and a premium selection of new and used cars in Orange County.",
    keywords: [
        'K2 Auto Group',
        'Auto Repair Garden Grove',
        'Car Sales Orange County',
        'DMV Services Garden Grove',
        'Used Cars Garden Grove',
        'Mechanic Orange County',
        'Registration Renewal CA',
        'Title Transfer Services',
        'Certified Pre-Owned Cars',
        'Car Leasing Garden Grove',
    ],
    authors: [{ name: 'K2 Auto Group' }],
    creator: 'K2 Auto Group',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://k2motorgroup.com',
        siteName: 'K2 Auto Group',
        title: 'K2 Auto Group | Auto Repair & Car Sales in Garden Grove, CA',
        description:
            'Professional automotive solutions: Certified repairs, expedited DMV services, and premium car sales in Garden Grove.',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'K2 Auto Group - Garden Grove',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'K2 Auto Group | Auto Repair & Car Sales',
        description:
            'Professional automotive solutions in Garden Grove. Repairs, DMV, and Sales.',
        images: ['/og-image.png'],
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
        canonical: 'https://k2motorgroup.com',
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
