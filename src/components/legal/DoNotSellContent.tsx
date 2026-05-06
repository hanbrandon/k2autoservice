'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ShieldAlert } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { BUSINESS_INFO } from '@/utils/businessInfo';

export default function DoNotSellContent() {
    const [isOptedOut, setIsOptedOut] = useState(false);

    useEffect(() => {
        const status = localStorage.getItem('k2_privacy_opt_out');
        if (status === 'true') {
            setIsOptedOut(true);
        }
    }, []);

    const handleOptOut = () => {
        localStorage.setItem('k2_privacy_opt_out', 'true');
        setIsOptedOut(true);
        alert('Your preference has been saved for this browser.');
    };

    return (
        <div className="bg-white selection:bg-[#ed1c24] selection:text-white">
            <Navbar />
            <main className="pt-40 pb-32 px-10 min-h-screen">
                <div className="max-w-[1000px] mx-auto">
                    <header className="mb-24">
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-4 text-[#ed1c24] mb-8"
                        >
                            <ShieldAlert size={14} />
                            <span className="text-[10px] font-black tracking-[0.5em] uppercase italic">
                                Consumer Privacy
                            </span>
                        </motion.div>
                        <h1 className="text-condensed text-5xl md:text-8xl font-black italic leading-[0.9] uppercase">
                            Do Not Sell My
                            <br />
                            <span className="text-[#ed1c24]">Personal Info</span>
                        </h1>
                        <p className="mt-12 text-black/40 text-sm font-bold uppercase tracking-widest">
                            Last Updated: April 2026
                        </p>
                    </header>

                    <article className="prose prose-slate max-w-none text-black/60 font-medium leading-relaxed tracking-tight space-y-12">
                        <section>
                            <h2 className="text-black text-2xl font-black italic uppercase mb-6">
                                1. Your Privacy Rights
                            </h2>
                            <p>
                                Under the California Consumer Privacy Act (CCPA)
                                and the California Privacy Rights Act (CPRA),
                                California residents have the right to opt-out of
                                the "sale" or "sharing" of their personal
                                information. K2 Auto Group respects your privacy
                                and provides you with the ability to exercise
                                these rights.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-black text-2xl font-black italic uppercase mb-6">
                                2. "Selling" vs "Sharing"
                            </h2>
                            <p className="mb-4">
                                K2 Auto Group does not sell your personal
                                information for money in the traditional sense.
                                However, like many online businesses, we use
                                tracking technologies such as cookies and pixels
                                to share data with service providers like Google
                                and Meta for more relevant advertising. Under
                                California law, this may be considered a "sale" or
                                "sharing" of information.
                            </p>
                        </section>

                        <section className="bg-black/[0.03] border border-black/5 p-8 rounded-none not-prose">
                            <h2 className="text-black text-xl font-bold uppercase tracking-widest mb-6">
                                3. Instant Opt-Out (One-Click)
                            </h2>
                            <p className="mb-8 text-sm font-medium">
                                Click the button below to immediately opt-out of
                                sharing your behavioral data with advertising
                                partners on this browser.
                            </p>
                            <button
                                onClick={handleOptOut}
                                disabled={isOptedOut}
                                className={`px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                                    isOptedOut
                                        ? 'bg-green-600/10 text-green-600 border border-green-600/20 cursor-default'
                                        : 'bg-[#ed1c24] text-white hover:bg-black'
                                }`}
                            >
                                {isOptedOut
                                    ? 'OPTED OUT SUCCESSFULLY'
                                    : 'CLICK TO OPT OUT NOW'}
                            </button>
                            {isOptedOut && (
                                <p className="mt-4 text-[10px] text-green-600/80 uppercase tracking-widest font-bold">
                                    Your preference is active for this browser
                                    session.
                                </p>
                            )}
                        </section>

                        <section>
                            <h2 className="text-black text-2xl font-black italic uppercase mb-6">
                                4. Other Ways to Opt-Out
                            </h2>
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-[#ed1c24] font-bold uppercase text-sm mb-2">
                                        Browser-Based Signals
                                    </h3>
                                    <p>
                                        You can opt-out of cookie-based tracking by
                                        adjusting your browser settings or by using
                                        the Global Privacy Control (GPC) signal.
                                        We honor GPC signals sent by your browser.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-[#ed1c24] font-bold uppercase text-sm mb-2">
                                        Direct Request
                                    </h3>
                                    <p>
                                        To manually record your preference to not
                                        have your information sold or shared,
                                        contact us at:
                                    </p>
                                    <ul className="mt-4 space-y-2 text-black font-bold">
                                        <li>Email: {BUSINESS_INFO.email}</li>
                                        <li>Phone: {BUSINESS_INFO.phone}</li>
                                        <li>Address: {BUSINESS_INFO.address}</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-black text-2xl font-black italic uppercase mb-6">
                                5. Verification
                            </h2>
                            <p>
                                To process your request, we may need to verify
                                your identity. This is a security measure to
                                ensure that we are not disclosing personal
                                information to an unauthorized person. We will
                                only use personal information provided in an
                                opt-out request to review and comply with the
                                request.
                            </p>
                        </section>
                    </article>
                </div>
            </main>
            <Footer />
        </div>
    );
}
