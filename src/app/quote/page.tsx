import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import QuoteContent from "@/components/quote/QuoteContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get a Quote | Service & Appraisal Inquiry",
  description: "Request a personalized quote for auto repair, car sales, or DMV services from the K2 Auto Group concierge team.",
  alternates: {
    canonical: 'https://k2motorgroup.com/quote',
  },
};

export default function QuotePage() {
  return (
    <main className="selection:bg-[#ed1c24] selection:text-white">
      <Navbar />
      <QuoteContent />
      <Footer />
    </main>
  );
}
