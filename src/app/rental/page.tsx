import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RentalContent from "@/components/rental/RentalContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premium Rental Services | K2 AUTO GROUP",
  description: "Short-term luxury rentals, long-term leasing, and insurance replacement vehicles by K2 Auto Group.",
};

export default function RentalPage() {
  return (
    <div className="selection:bg-[#ed1c24] selection:text-white">
      <Navbar />
      <main>
        <RentalContent />
      </main>
      <Footer />
    </div>
  );
}
