import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RepairContent from "@/components/repair/RepairContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Repair & Maintenance | K2 AUTO GROUP",
  description: "Certified luxury vehicle repair, collision restoration, and performance diagnostics by K2 Auto Group.",
};

export default function RepairPage() {
  return (
    <div className="selection:bg-[#ed1c24] selection:text-white">
      <Navbar />
      <main>
        <RepairContent />
      </main>
      <Footer />
    </div>
  );
}
