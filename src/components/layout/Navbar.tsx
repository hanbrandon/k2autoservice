'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

interface NavItem {
    name: string;
    type: 'page' | 'anchor';
    path?: string;
    target?: string;
}

const navItems: NavItem[] = [
    { name: 'Home', type: 'page', path: '/' },
    { name: 'Repair', type: 'page', path: '/repair' },
    { name: 'Sales', type: 'page', path: '/sales' },
    { name: 'Rental', type: 'page', path: '/rental' },
    { name: 'DMV', type: 'page', path: '/dmv' },
    { name: 'FAQ', type: 'page', path: '/faq' },
    { name: 'Contact', type: 'anchor', target: 'contact' },
];

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const activeTab =
        pathname === '/'
            ? 'Home'
            : pathname === '/faq'
              ? 'FAQ'
              : pathname === '/dmv'
                ? 'DMV'
                : pathname === '/repair'
                  ? 'Repair'
                  : pathname === '/sales'
                    ? 'Sales'
                    : pathname === '/rental'
                      ? 'Rental'
                      : '';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (item: NavItem) => {
        if (item.type === 'page') {
            router.push(item.path || '/');
            window.scrollTo(0, 0);
        } else {
            if (pathname !== '/') {
                router.push('/');
                setTimeout(() => {
                    const el = document.getElementById(item.target || '');
                    el?.scrollIntoView({ behavior: 'smooth' });
                }, 300);
            } else {
                const el = document.getElementById(item.target || '');
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
        setIsMenuOpen(false);
    };

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-md py-0 border-b border-black/5' : 'py-0 bg-transparent'}`}
        >
            <div
                className={`max-w-[1400px] mx-auto px-10 flex justify-between items-center text-condensed text-xl tracking-tighter transition-all duration-500 ${isScrolled ? 'h-16' : 'h-24'}`}
            >
                <div className="flex items-center gap-10 h-full">
                    <Link
                        href="/"
                        className="text-2xl font-black text-[#ed1c24] cursor-pointer"
                        onClick={(e) => {
                            e.preventDefault();
                            handleNavClick({ name: 'Home', type: 'page' });
                        }}
                    >
                        K2 AUTO SERVICE
                    </Link>
                    <div className="hidden lg:flex items-center h-full">
                        {navItems.map((item) => {
                            const isActive = activeTab === item.name;
                            return (
                                <a
                                    key={item.name}
                                    href={
                                        item.type === 'anchor'
                                            ? `#${item.target}`
                                            : '#'
                                    }
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleNavClick(item);
                                    }}
                                    className={`relative h-full flex items-center px-4 text-base font-light transition-all duration-300 group ${isActive ? 'text-[#ed1c24]' : 'text-black hover:text-[#ed1c24]'}`}
                                >
                                    <span
                                        className={`absolute top-0 left-0 right-0 h-1 bg-[#ed1c24] transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                                    />
                                    {item.name.toUpperCase()}
                                </a>
                            );
                        })}
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <Link
                        href="/quote"
                        className="hidden sm:block border border-black px-6 py-2 text-sm font-bold hover:bg-black hover:text-white transition-all"
                    >
                        GET A QUOTE
                    </Link>
                    <button
                        className="lg:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: '100vh', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="fixed inset-0 bg-white z-[90] lg:hidden overflow-hidden flex flex-col justify-center p-10"
                    >
                        <div className="flex flex-col gap-8 text-condensed text-4xl">
                            {navItems.map((item) => (
                                <a
                                    key={item.name}
                                    href={
                                        item.type === 'anchor'
                                            ? `#${item.name.toLowerCase().replace(' ', '-')}`
                                            : '#'
                                    }
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleNavClick(item);
                                    }}
                                    className={`transition-all ${activeTab === item.name ? 'text-[#ed1c24]' : 'hover:pl-4'}`}
                                >
                                    {item.name.toUpperCase()}
                                </a>
                            ))}
                            <div className="mt-12 flex flex-col gap-4">
                                <Link
                                    href="/quote"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="bg-[#ed1c24] text-white py-6 text-center font-bold text-lg uppercase tracking-widest"
                                >
                                    Get A Quote
                                </Link>
                                <button
                                    onClick={() => setIsMenuOpen(false)}
                                    className="bg-black text-white py-6 rounded-none font-bold text-lg uppercase tracking-widest"
                                >
                                    Close Menu
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
