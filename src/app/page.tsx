import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import RepairServices from "@/components/home/RepairServices";
import Experience from "@/components/home/Experience";
import Information from "@/components/home/Information";
import Partners from "@/components/home/Partners";
import Testimonials from "@/components/home/Testimonials";
import K2Standard from "@/components/home/K2Standard";
import InstagramShowcase from "@/components/home/InstagramShowcase";
import Location from "@/components/home/Location";
import ContactSection from "@/components/home/ContactSection";

export default function Home() {
  return (
    <div className="selection:bg-[#ed1c24] selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <RepairServices />
        <K2Standard />
        <Experience />
        <Information />
        <Partners />
        <Testimonials />
        <InstagramShowcase />
        <Location />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
