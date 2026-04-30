import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import RentalContent from '@/components/rental/RentalContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Luxury Car Rental & Concierge Mobility',
    description:
        'K2 Auto Group offers luxury car rentals and seamless insurance replacement vehicles. Flexible short and long-term concierge mobility solutions in Garden Grove.',
    alternates: {
        canonical: 'https://k2motorgroup.com/rental',
    },
    openGraph: {
        title: 'Premium Car Rental & Insurance Replacements | K2 Auto Group',
        description:
            'Luxury car rentals and insurance replacement vehicles in Garden Grove.',
        url: 'https://k2motorgroup.com/rental',
        type: 'article',
    },
};

export default function RentalPage() {
    return (
        <div className="selection:bg-[#ed1c24] selection:text-white">
            <Navbar />
            <main>
                <RentalContent />
            </main>
            <Footer />
        </div>
    );
}
