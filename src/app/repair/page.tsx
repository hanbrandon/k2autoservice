import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import RepairContent from '@/components/repair/RepairContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Certified Auto Repair & Collision Center',
    description:
        'K2 Auto Group offers certified auto repair, expert collision restoration, and computerized diagnostics in Garden Grove. Trusted technicians for luxury and performance vehicles.',
    alternates: {
        canonical: 'https://k2motorgroup.com/repair',
    },
    openGraph: {
        title: 'Auto Repair & Collision Center | K2 Auto Group',
        description: 'Certified auto repair and expert collision restoration in Garden Grove.',
        url: 'https://k2motorgroup.com/repair',
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
