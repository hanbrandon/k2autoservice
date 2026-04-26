import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import RepairContent from '@/components/repair/RepairContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Auto Repair & Collision Center in Garden Grove, CA',
    description:
        'Certified auto repair, expert collision restoration, and computerized diagnostics in Garden Grove. Trusted mechanics for luxury and domestic vehicles.',
    alternates: {
        canonical: 'https://k2autoservice.com/repair',
    },
    openGraph: {
        title: 'Auto Repair & Collision Center in Garden Grove, CA',
        description: 'Certified auto repair and expert collision restoration in Garden Grove.',
        url: 'https://k2autoservice.com/repair',
        type: 'article',
    }
};

export default function RepairPage() {
    return (
        <div className="selection:bg-[#ed1c24] selection:text-white">
            <Navbar />
            <main>
                <RepairContent />
            </main>
            <Footer />
        </div>
    );
}
