import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import RepairContent from '@/components/repair/RepairContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Auto Repair & Collision Center in Garden Grove, CA | K2 Auto Service',
    description:
        'Certified auto repair, expert collision restoration, and computerized diagnostics in Garden Grove. Trusted mechanics for luxury and domestic vehicles.',
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
