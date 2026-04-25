import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Experience from '@/components/home/Experience';
import Testimonials from '@/components/home/Testimonials';
import InstagramShowcase from '@/components/home/InstagramShowcase';
import Location from '@/components/home/Location';
import ContactSection from '@/components/home/ContactSection';

export default function Home() {
    return (
        <div className="selection:bg-[#ed1c24] selection:text-white">
            <Navbar />
            <main>
                <Hero />
                <Experience />
                <Testimonials />
                <InstagramShowcase />
                <Location />
                <ContactSection />
            </main>
            <Footer />
        </div>
    );
}
