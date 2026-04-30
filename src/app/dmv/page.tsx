import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import DMVContent from '@/components/dmv/DMVContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Expedited DMV Registration & Title Services',
    description:
        'Skip the lines at the DMV. K2 Auto Group offers expedited vehicle registration, title transfers, and out-of-state transitions in Garden Grove, CA.',
    alternates: {
        canonical: 'https://k2motorgroup.com/dmv',
    },
    openGraph: {
        title: 'Expedited DMV Registration & Title Services | K2 Auto Group',
        description:
            'Professional DMV registration and title services in Garden Grove.',
        url: 'https://k2motorgroup.com/dmv',
        type: 'article',
    },
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
