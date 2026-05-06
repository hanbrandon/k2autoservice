import type { Metadata } from 'next';
import DoNotSellContent from '@/components/legal/DoNotSellContent';

export const metadata: Metadata = {
    title: 'Do Not Sell or Share My Personal Information',
    description:
        'Submit a California privacy opt-out request for K2 Auto Group advertising, cookie, and data sharing preferences.',
    alternates: {
        canonical: 'https://k2motorgroup.com/do-not-sell',
    },
    robots: {
        index: false,
        follow: true,
    },
};

export default function DoNotSellPage() {
    return <DoNotSellContent />;
}
