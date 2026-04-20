import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DMVContent from "@/components/dmv/DMVContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DMV Services | K2 AUTO GROUP",
  description: "Expedited DMV processing, title transfers, and registration services by K2 Auto Group.",
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
