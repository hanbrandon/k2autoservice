import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SalesContent from '@/components/sales/SalesContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'New & Used Car Sales | Leasing in Garden Grove, CA | K2 Auto Service',
    description:
        'Find your next vehicle at K2 Auto Service. Expert car sales, flexible leasing options, and a premium selection of certified pre-owned cars in Garden Grove.',
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
