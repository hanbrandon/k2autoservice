import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FAQContent from "@/components/faq/FAQContent";

export default function FAQ() {
  return (
    <div className="selection:bg-[#ed1c24] selection:text-white">
      <Navbar />
      <FAQContent />
      <Footer />
    </div>
  );
}
