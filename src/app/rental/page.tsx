import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import RentalContent from '@/components/rental/RentalContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Premium Car Rental & Insurance Replacements | Garden Grove, CA',
    description:
        'Need a rental car? K2 Auto Service offers luxury car rentals and insurance replacement vehicles. Flexible short and long-term rental options in Garden Grove.',
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
