import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SalesContent from '@/components/sales/SalesContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Premium Car Sales & Leasing Advisory',
    description:
        'K2 Auto Group provides expert car sales, strategic leasing options, and a premium selection of certified pre-owned vehicles in Garden Grove, CA.',
    alternates: {
        canonical: 'https://k2motorgroup.com/sales',
    },
    openGraph: {
        title: 'New & Used Car Sales | K2 Auto Group',
        description: 'Premium car sales and leasing advisory in Garden Grove.',
        url: 'https://k2motorgroup.com/sales',
        type: 'article',
    },
};

export default function SalesPage() {
    return (
        <div className="selection:bg-[#ed1c24] selection:text-white">
            <Navbar />
            <main>
                <SalesContent />
            </main>
            <Footer />
        </div>
    );
}
