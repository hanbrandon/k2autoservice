import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PreApproveForm from '@/components/pre-approve/PreApproveForm';

export const metadata: Metadata = {
    title: 'Pre-Approval Application',
    description: 'Get pre-approved for your next vehicle purchase at K2 Auto Group. Secure and fast online application.',
};

export default function PreApprovePage() {
    return (
        <div className="bg-[#0a0a0a] min-h-screen text-white">
            <Navbar />
            <main className="pt-24 md:pt-32 pb-20">
                <PreApproveForm />
            </main>
            <Footer />
        </div>
    );
}
