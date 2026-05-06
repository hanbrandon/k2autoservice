import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import RepairContent from '@/components/repair/RepairContent';
import { Metadata } from 'next';
import PageSchema from '@/components/seo/PageSchema';
import { serviceSchema } from '@/utils/schema';

export const metadata: Metadata = {
    title: 'Certified Auto Repair & Precision Maintenance',
    description:
        'K2 Auto Group offers certified auto repair, performance tuning, and computerized diagnostics in Garden Grove. Trusted technicians for luxury and performance vehicles.',
    alternates: {
        canonical: 'https://k2motorgroup.com/repair',
    },
    openGraph: {
        title: 'Auto Repair & Precision Maintenance | K2 Auto Group',
        description: 'Certified auto repair and performance tuning in Garden Grove.',
        url: 'https://k2motorgroup.com/repair',
        type: 'article',
    }
};

export default function RepairPage() {
    return (
        <div className="selection:bg-[#ed1c24] selection:text-white">
            <PageSchema
                schema={serviceSchema({
                    name: 'Certified Auto Repair and Precision Maintenance',
                    description:
                        'Certified diagnostics, repair, performance tuning, and maintenance services for luxury and performance vehicles in Garden Grove.',
                    url: 'https://k2motorgroup.com/repair',
                    serviceType: 'Auto repair and maintenance',
                })}
            />
            <Navbar />
            <main>
                <RepairContent />
            </main>
            <Footer />
        </div>
    );
}
