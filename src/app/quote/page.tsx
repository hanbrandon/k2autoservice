import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import QuoteContent from "@/components/quote/QuoteContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get a Quote | K2 AUTO GROUP",
  description: "Get an instant strategic appraisal and quote for your vehicle.",
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
