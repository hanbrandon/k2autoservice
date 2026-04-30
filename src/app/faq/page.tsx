import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FAQContent from "@/components/faq/FAQContent";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Frequently Asked Questions',
    description:
        'Find answers to common questions about auto repairs, DMV services, and car acquisition at K2 Auto Group.',
    alternates: {
        canonical: 'https://k2motorgroup.com/faq',
    },
};

export default function FAQ() {
  return (
    <div className="selection:bg-[#ed1c24] selection:text-white">
      <Navbar />
      <FAQContent />
      <Footer />
    </div>
  );
}
