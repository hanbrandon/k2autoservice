'use client';

import { motion } from 'motion/react';
import { ShieldCheck } from 'lucide-react';

const PrivacyPolicy = () => {
    return (
        <div className="bg-white pt-40 pb-32 px-10 min-h-screen">
            <div className="max-w-[1000px] mx-auto">
                <header className="mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-4 text-[#ed1c24] mb-8"
                    >
                        <ShieldCheck size={14} />
                        <span className="text-[10px] font-black tracking-[0.5em] uppercase italic">
                            Legal Protection
                        </span>
                    </motion.div>
                    <h1 className="text-condensed text-5xl md:text-8xl font-black italic  leading-[0.9] uppercase">
                        Privacy
                        <br />
                        Policy
                    </h1>
                    <p className="mt-12 text-black/40 text-sm font-bold uppercase tracking-widest">
                        Last Updated: April 2026
                    </p>
                </header>

                <article className="prose prose-slate max-w-none text-black/60 font-medium leading-relaxed tracking-tight space-y-12">
                    <section>
                        <h2 className="text-black text-2xl font-black italic uppercase  mb-6">
                            1. Information We Collect
                        </h2>
                        <p>
                            K2 Auto Service collects information to provide
                            better services to our clients. This includes:
                        </p>
                        <ul className="list-disc pl-6 space-y-4 mt-4">
                            <li>
                                <strong>Contact Information:</strong> Name,
                                email address, phone number, and physical
                                address provided during quote requests or
                                service bookings.
                            </li>
                            <li>
                                <strong>Vehicle Information:</strong> VIN
                                numbers, license plate numbers, vehicle
                                make/model, and repair history.
                            </li>
                            <li>
                                <strong>Government IDs:</strong> For DMV-related
                                services, we may collect information from
                                driver's licenses or vehicle titles as required
                                by the State of California.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-black text-2xl font-black italic uppercase  mb-6">
                            2. How We Use Information
                        </h2>
                        <p>We use your information to:</p>
                        <ul className="list-disc pl-6 space-y-4 mt-4">
                            <li>
                                Process and complete vehicle repairs, sales, or
                                rentals.
                            </li>
                            <li>
                                Coordinated with insurance providers for claims
                                handling.
                            </li>
                            <li>
                                Submit necessary documentation to the California
                                DMV and Bureau of Automotive Repair.
                            </li>
                            <li>
                                Provide updates on your vehicle's service
                                status.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-black text-2xl font-black italic uppercase  mb-6">
                            3. Data Sharing & Third Parties
                        </h2>
                        <p>
                            We do not sell your personal information. We share
                            information with:
                        </p>
                        <ul className="list-disc pl-6 space-y-4 mt-4">
                            <li>
                                <strong>Government Entities:</strong> California
                                Department of Motor Vehicles (DMV) for
                                registration and titling.
                            </li>
                            <li>
                                <strong>Service Partners:</strong> Insurance
                                adjusters and authorized parts providers
                                necessary for your specific repair.
                            </li>
                            <li>
                                <strong>Legal Compliance:</strong> When required
                                by law or to protect the safety and rights of K2
                                Auto Service.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-black text-2xl font-black italic uppercase  mb-6">
                            4. California Privacy Rights (CCPA)
                        </h2>
                        <p>
                            As a California resident, you have the right to
                            request access to the personal information we have
                            collected about you, the right to request deletion
                            of that information, and the right to opt-out of
                            certain data usage. Please contact us at the details
                            below to exercise these rights.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-black text-2xl font-black italic uppercase  mb-6">
                            5. Security
                        </h2>
                        <p>
                            We implement industry-standard security measures to
                            protect your sensitive data, especially regarding
                            VIN numbers and financial information. Electronic
                            documentation is stored on secured servers with
                            restricted access.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-black text-2xl font-black italic uppercase  mb-6">
                            6. Contact Us
                        </h2>
                        <p>
                            For any questions regarding this Privacy Policy,
                            please contact:
                            <br />
                            <br />
                            <strong>K2 Auto Service</strong>
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

export default PrivacyPolicy;
