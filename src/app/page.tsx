import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import VehicleSales from "@/components/home/VehicleSales";
import RepairServices from "@/components/home/RepairServices";
import Experience from "@/components/home/Experience";
import Information from "@/components/home/Information";
import Partners from "@/components/home/Partners";
import Testimonials from "@/components/home/Testimonials";
import Location from "@/components/home/Location";
import ContactSection from "@/components/home/ContactSection";

export default function Home() {
  return (
    <div className="selection:bg-[#ed1c24] selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <VehicleSales />
        <RepairServices />
        <Experience />
        <Information />
        <Partners />
        <Testimonials />
        <Location />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
