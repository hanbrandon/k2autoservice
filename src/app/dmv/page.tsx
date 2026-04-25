import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import DMVContent from '@/components/dmv/DMVContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Fast DMV Services & Registration | Garden Grove, CA | K2 Auto Service',
    description:
        'Skip the lines at the DMV. K2 Auto Service offers fast vehicle registration, title transfers, and out-of-state transitions in Garden Grove.',
};

export default function DMVPage() {
    return (
        <div className="selection:bg-[#ed1c24] selection:text-white">
            <Navbar />
            <main>
                <DMVContent />
            </main>
            <Footer />
        </div>
    );
}
