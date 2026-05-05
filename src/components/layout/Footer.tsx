'use client';

import { BUSINESS_INFO } from '@/utils/businessInfo';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
    InstagramIcon,
    ThreadsIcon,
} from '@hugeicons/core-free-icons';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-black text-white pt-24 pb-12 px-10 border-t border-white/5">
            <div className="max-w-[1400px] mx-auto">
                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
                    {/* Brand Section */}
                    <div className="md:col-span-4 space-y-8">
                        <h2 className="text-condensed text-4xl font-black text-[#ed1c24] tracking-tighter">
                            K2 AUTO GROUP
                        </h2>
                        <p className="text-white/80 text-[11px] leading-relaxed font-medium uppercase tracking-widest max-w-sm">
                            Your trusted partner for certified automotive repair, 
                            expedited DMV registration, and a premium selection of 
                            quality vehicles in Orange County. Providing the gold 
                            standard in automotive excellence.
                        </p>
                    </div>

                    {/* Navigation Section */}
                    <div className="md:col-span-2 space-y-8">
                        <span className="text-[9px] font-black tracking-[0.4em] text-white/60 uppercase">
                            Explore
                        </span>
                        <div className="flex flex-col gap-4 text-[11px] font-bold text-white/80">
                            <Link href="/" className="hover:text-[#ed1c24] transition-colors">HOME</Link>
                            <Link href="/repair" className="hover:text-[#ed1c24] transition-colors">REPAIR</Link>
                            <Link href="/sales" className="hover:text-[#ed1c24] transition-colors">SALES</Link>
                            <Link href="/rental" className="hover:text-[#ed1c24] transition-colors">RENTAL</Link>
                            <Link href="/dmv" className="hover:text-[#ed1c24] transition-colors">DMV</Link>
                            <Link href="/faq" className="hover:text-[#ed1c24] transition-colors">FAQ</Link>
                            <Link href="/credit-application" className="hover:text-[#ed1c24] transition-colors">CREDIT APPLICATION</Link>
                        </div>
                    </div>

                    {/* Policy Section */}
                    <div className="md:col-span-2 space-y-8">
                        <span className="text-[9px] font-black tracking-[0.4em] text-white/60 uppercase">
                            Legal
                        </span>
                        <div className="flex flex-col gap-4 text-[11px] font-bold text-white/80">
                            <Link href="/privacy" className="hover:text-[#ed1c24] transition-colors">PRIVACY</Link>
                            <Link href="/terms" className="hover:text-[#ed1c24] transition-colors">TERMS</Link>
                            <Link href="/do-not-sell" className="hover:text-[#ed1c24] transition-colors text-nowrap">DO NOT SELL</Link>
                        </div>
                    </div>

                    {/* Contact & Social Section */}
                    <div className="md:col-span-4 space-y-8">
                        <span className="text-[9px] font-black tracking-[0.4em] text-white/60 uppercase">
                            Contact & Follow
                        </span>
                        <div className="space-y-6">
                            <div className="text-[11px] text-white/80 font-bold space-y-2 uppercase tracking-wider">
                                <p className="hover:text-white transition-colors cursor-pointer mb-4">
                                    {BUSINESS_INFO.email}
                                </p>
                                <p className="text-white/50 text-[9px] mb-1">GENERAL INQUIRY</p>
                                <p className="mb-4">
                                    <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="hover:text-white transition-colors">
                                        {BUSINESS_INFO.phone}
                                    </a>
                                </p>
                                <p className="text-white/50 text-[9px] mb-1">REPAIR DEPT DIRECT</p>
                                <p className="mb-4">
                                    <a href={`tel:${BUSINESS_INFO.repairPhoneRaw}`} className="hover:text-white transition-colors">
                                        {BUSINESS_INFO.repairPhone}
                                    </a>
                                </p>
                                <p className="text-white/50 text-[9px] mb-1">LOCATION</p>
                                <p>
                                    <a 
                                        href={BUSINESS_INFO.googleMapsUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-white transition-colors"
                                    >
                                        8892 Garden Grove Blvd.
                                        <br />
                                        Garden Grove, CA 92844
                                    </a>
                                </p>
                            </div>
                            <div className="flex gap-6">
                                <a 
                                    href={`https://instagram.com/${BUSINESS_INFO.instagram}`} 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white/60 hover:text-[#ed1c24] transition-colors"
                                    aria-label="Follow us on Instagram"
                                >
                                    <HugeiconsIcon icon={InstagramIcon} size={20} />
                                </a>
                                <a href="#" aria-label="Follow us on Threads" className="text-white/60 hover:text-[#ed1c24] transition-colors">
                                    <HugeiconsIcon icon={ThreadsIcon} size={20} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Disclaimer Section */}
                <div className="pt-12 border-t border-white/5 space-y-6">
                    <div className="text-[8px] text-white/50 leading-relaxed font-medium uppercase tracking-[0.15em] space-y-4">
                        <p>
                            * DMV DISCLOSURE: K2 AUTO GROUP IS A PRIVATELY OWNED REGISTRATION SERVICE PROVIDER LICENSED BY THE CALIFORNIA DEPARTMENT OF MOTOR VEHICLES. WE ARE NOT A GOVERNMENT AGENCY. ALL THIRD PARTY BRANDS AND LOGOS ARE THE REGISTERED TRADEMARKS OF THEIR RESPECTED OWNERS. THIS WEBSITE IS NOT AFFILIATED WITH, ENDORSED BY, OR SPONSORED BY THE DMV OR ANY OTHER GOVERNMENT ENTITY.
                        </p>
                        <p>
                            VEHICLE SALES & PRICING: UNLESS OTHERWISE STATED, PRICES DO NOT INCLUDE GOVERNMENT FEES AND TAXES, ANY FINANCE CHARGES, ANY DEALER DOCUMENT PROCESSING CHARGE, OR ANY EMISSION TESTING CHARGE. ALL VEHICLES ARE SUBJECT TO PRIOR SALE. ALL FINANCING IS SUBJECT TO CREDIT APPROVAL BY THIRD-PARTY LENDERS. AD PRICES EXPIRE AT MIDNIGHT ON THE DAY OF PUBLICATION.
                        </p>
                        <p>
                            SERVICE & WARRANTIES: ALL INFORMATION IS FOR GENERAL ILLUSTRATIVE PURPOSES ONLY. SERVICE WARRANTIES VARY BY TYPE; PLEASE CONSULT WITH OUR SPECIALISTS FOR SPECIFIC TERMS AND CONDITIONS. PRIVACY & SAFETY: YOUR PRIVACY IS IMPORTANT TO US. WE USE INDUSTRY STANDARD ENCRYPTION AND FOLLOW CCPA/CPRA GUIDELINES FOR THE PROTECTION OF YOUR PERSONAL INFORMATION.
                        </p>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="mt-12 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-[10px] text-white/50 font-bold uppercase tracking-widest">
                        © 2026 K2 AUTO GROUP. ALL RIGHTS RESERVED.
                    </div>
                    <div className="text-[10px] text-white/50 font-bold uppercase tracking-widest">
                        Site Developed by <a href="https://gawoori.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#ed1c24] transition-colors underline decoration-[#ed1c24] underline-offset-4">GAWOORI.COM</a>
                    </div>
                </div>

                {/* Back to Top - Sleek Fixed Square */}
                <button
                    onClick={scrollToTop}
                    aria-label="Scroll back to top"
                    className="fixed bottom-10 right-10 bg-[#ed1c24] text-white w-14 h-14 rounded-none z-50 hover:bg-black transition-all shadow-2xl group lg:flex hidden items-center justify-center overflow-hidden"
                >
                    <div className="relative w-full h-full flex items-center justify-center">
                        <ArrowUpRight 
                            size={20} 
                            className="group-hover:-translate-y-10 group-hover:translate-x-10 transition-all duration-500"
                        />
                        <span className="absolute inset-0 flex items-center justify-center text-[8px] font-black tracking-tighter leading-none translate-y-10 group-hover:translate-y-0 transition-all duration-500 uppercase">
                            TOP
                        </span>
                    </div>
                </button>
            </div>
        </footer>
    );
};

export default Footer;
