import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SalesContent from "@/components/sales/SalesContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vehicle Sales & Leasing | K2 AUTO GROUP",
  description: "Luxury vehicle acquisition, strategic leasing, and certified pre-owned inventory by K2 Auto Group.",
};

export default function SalesPage() {
  return (
    <div className="selection:bg-[#ed1c24] selection:text-white">
      <Navbar />
      <main>
        <SalesContent />
      </main>
      <Footer />
    </div>
  );
}
