'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
    InstagramIcon,
    ThreadsIcon,
    YoutubeIcon,
} from '@hugeicons/core-free-icons';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-black text-white pt-20 pb-10 px-10">
            <div className="max-w-[1400px] mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20 border-b border-white/5 pb-20">
                    <div className="flex flex-col gap-8">
                        <h2 className="text-condensed text-4xl font-black text-[#ed1c24]">
                            K2 AUTO SERVICE
                        </h2>
                        <div className="flex flex-wrap gap-8 text-[12px] font-bold text-white/60">
                            <Link
                                href="/"
                                className="hover:text-[#ed1c24] transition-colors"
                            >
                                HOME
                            </Link>
                            <Link
                                href="/repair"
                                className="hover:text-[#ed1c24] transition-colors"
                            >
                                REPAIR
                            </Link>
                            <Link
                                href="/sales"
                                className="hover:text-[#ed1c24] transition-colors"
                            >
                                SALES
                            </Link>
                            <Link
                                href="/rental"
                                className="hover:text-[#ed1c24] transition-colors"
                            >
                                RENTAL
                            </Link>
                            <Link
                                href="/dmv"
                                className="hover:text-[#ed1c24] transition-colors"
                            >
                                DMV
                            </Link>
                            <Link
                                href="/faq"
                                className="hover:text-[#ed1c24] transition-colors"
                            >
                                FAQ
                            </Link>
                            <Link
                                href="/#contact"
                                className="hover:text-[#ed1c24] transition-colors"
                            >
                                CONTACT
                            </Link>
                        </div>
                    </div>

                    <button
                        onClick={scrollToTop}
                        className="fixed bottom-6 right-6 z-[100] md:static bg-[#ed1c24] md:bg-transparent border-none md:border md:border-white/20 w-12 h-12 md:w-auto md:h-auto px-0 md:px-8 md:py-3 text-[11px] font-bold flex items-center justify-center md:gap-4 hover:bg-[#ed1c24] hover:border-[#ed1c24] transition-all shadow-[0_10px_30px_-10px_rgba(237,28,36,0.5)] md:shadow-none rounded-full md:rounded-none group"
                    >
                        <span className="hidden md:inline">BACK TO TOP</span>
                        <ArrowUpRight
                            size={18}
                            className="md:w-[14px] md:h-[14px] group-hover:-rotate-45 transition-transform"
                        />
                    </button>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
                    <div className="text-[11px] text-white/40 leading-relaxed font-medium uppercase tracking-widest space-y-2">
                        <p>8892 Garden Grove Blvd. Garden Grove, CA 92844</p>
                        <p>
                            PHONE:{' '}
                            <a
                                href="tel:7145340024"
                                className="hover:text-white transition-colors"
                            >
                                714.534.0024
                            </a>
                        </p>
                        <p>COPYRIGHT K2 AUTO SERVICE. ALL RIGHTS RESERVED.</p>
                        <div className="flex gap-4 pt-1">
                            <Link
                                href="/privacy"
                                className="hover:text-white transition-colors"
                            >
                                PRIVACY POLICY
                            </Link>
                            <Link
                                href="/terms"
                                className="hover:text-white transition-colors"
                            >
                                TERMS OF USE
                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-10 md:gap-20">
                        <div className="flex flex-col items-start md:items-end gap-2 text-left md:text-right">
                            <span className="text-[9px] font-black tracking-[0.2em] text-[#ed1c24]">
                                BUSINESS HOURS
                            </span>
                            <div className="text-[10px] text-white/40 font-bold space-y-1 uppercase tracking-wider">
                                <p>MON - FRI: 8:00 AM - 6:00 PM</p>
                                <p>SAT: 8:00 AM - 2:00 PM</p>
                                <p>SUN: CLOSED</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-start md:items-end gap-4">
                            <span className="text-[9px] font-black tracking-[0.2em] text-[#ed1c24]">
                                FOLLOW US
                            </span>
                            <div className="flex gap-6">
                                <div className="cursor-pointer hover:text-[#ed1c24] transition-colors">
                                    <HugeiconsIcon
                                        icon={InstagramIcon}
                                        size={24}
                                    />
                                </div>
                                <div className="cursor-pointer hover:text-[#ed1c24] transition-colors">
                                    <HugeiconsIcon
                                        icon={ThreadsIcon}
                                        size={24}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
