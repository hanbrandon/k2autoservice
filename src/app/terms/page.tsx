'use client';

import { motion } from 'motion/react';
import { FileText } from 'lucide-react';

const TermsOfUse = () => {
    return (
        <div className="bg-white pt-40 pb-32 px-10 min-h-screen">
            <div className="max-w-[1000px] mx-auto">
                <header className="mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-4 text-[#ed1c24] mb-8"
                    >
                        <FileText size={14} />
                        <span className="text-[10px] font-black tracking-[0.5em] uppercase italic">
                            Service Agreement
                        </span>
                    </motion.div>
                    <h1 className="text-condensed text-5xl md:text-8xl font-black italic  leading-[0.9] uppercase">
                        Terms Of
                        <br />
                        Use
                    </h1>
                    <p className="mt-12 text-black/40 text-sm font-bold uppercase tracking-widest">
                        Last Updated: April 2026
                    </p>
                </header>

                <article className="prose prose-slate max-w-none text-black/60 font-medium leading-relaxed tracking-tight space-y-12">
                    <section>
                        <h2 className="text-black text-2xl font-black italic uppercase  mb-6">
                            1. Agreement to Terms
                        </h2>
                        <p>
                            By accessing or using the services provided by K2
                            Auto Service, you agree to be bound by these Terms
                            of Use. If you do not agree to these terms, please
                            do not use our services or website.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-black text-2xl font-black italic uppercase  mb-6">
                            2. Description of Services
                        </h2>
                        <p>
                            K2 Auto Service provides a comprehensive range of
                            automotive solutions, including but not limited to
                            mechanical repair, collision restoration, vehicle
                            sales and acquisition, executive rentals, and DMV
                            concierge services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-black text-2xl font-black italic uppercase  mb-6">
                            3. User Obligations
                        </h2>
                        <p>
                            When requesting quotes or services, users agree to
                            provide accurate, current, and complete information,
                            including VIN numbers and vehicle history.
                            Misrepresentation of vehicle condition or ownership
                            status may result in immediate termination of
                            services and potential legal liability.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-black text-2xl font-black italic uppercase  mb-6">
                            4. Payments & Estimates
                        </h2>
                        <p>
                            All service estimates provided are subject to change
                            upon physical inspection of the vehicle. Payments
                            are due upon completion of services unless prior
                            corporate billing arrangements have been
                            established.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-black text-2xl font-black italic uppercase  mb-6">
                            5. Limitation of Liability
                        </h2>
                        <p>
                            To the maximum extent permitted by California law,
                            K2 Auto Service shall not be liable for any
                            indirect, incidental, or consequential damages
                            arising from the use of our services or website.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-black text-2xl font-black italic uppercase  mb-6">
                            6. Governing Law
                        </h2>
                        <p>
                            These Terms of Use are governed by and construed in
                            accordance with the laws of the State of California,
                            without regard to its conflict of law principles.
                            Any legal action arising out of these terms shall be
                            filed in the courts located in Orange County,
                            California.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-black text-2xl font-black italic uppercase  mb-6">
                            7. Contact Information
                        </h2>
                        <p>
                            For legal inquiries regarding these terms, please
                            contact:
                            <br />
                            <br />
                            <strong>K2 Auto Service Legal Dept.</strong>
                            <br />
                            8892 Garden Grove Blvd.
                            <br />
                            Garden Grove, CA 92844
                            <br />
                            Phone: 714.534.0024
                        </p>
                    </section>
                </article>
            </div>
        </div>
    );
};

export default TermsOfUse;
