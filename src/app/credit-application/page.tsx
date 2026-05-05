import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PreApproveForm from '@/components/pre-approve/PreApproveForm';

export const metadata: Metadata = {
    title: 'Credit Application',
    description: 'Apply for credit for your next vehicle purchase at K2 Auto Group. Secure and fast online application.',
};

export default function CreditApplicationPage() {
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
