import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FAQContent from "@/components/faq/FAQContent";
import { Metadata } from 'next';
import PageSchema from '@/components/seo/PageSchema';

export const metadata: Metadata = {
    title: 'Frequently Asked Questions',
    description:
        'Find answers to common questions about auto repairs, DMV services, and car acquisition at K2 Auto Group.',
    alternates: {
        canonical: 'https://k2motorgroup.com/faq',
    },
};

export default function FAQ() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What makes K2 Auto Group different from other service centers?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "K2 Auto Group uses factory-direct diagnostic tools, original OEM parts, and manufacturer service bulletins to protect vehicle integrity and warranty coverage.",
        },
      },
      {
        '@type': 'Question',
        name: 'Do you provide pick-up and delivery services?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. K2 Auto Group offers complimentary concierge pick-up and delivery within a 25-mile radius for major service operations and long-term rental engagements.',
        },
      },
      {
        '@type': 'Question',
        name: 'What types of maintenance do you perform?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'K2 Auto Group performs advanced diagnostics, performance tuning, suspension calibration, brake service, and routine factory-scheduled maintenance.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you offer a warranty on your services?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Mechanical services include a 12-month/12,000-mile limited workmanship warranty plus applicable manufacturer warranties on genuine OEM parts.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I trade in my current vehicle?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. K2 Auto Group accepts trade-ins for all makes and models and can apply the equity toward a new lease or purchase.',
        },
      },
    ],
  };

  return (
    <div className="selection:bg-[#ed1c24] selection:text-white">
      <PageSchema schema={faqSchema} />
      <Navbar />
      <FAQContent />
      <Footer />
    </div>
  );
}
