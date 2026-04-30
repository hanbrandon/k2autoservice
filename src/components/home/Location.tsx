'use client';

import { useState } from 'react';
import {
    Navigation,
    ArrowRight,
    MapPin,
    ArrowUpRight,
    Share2,
} from 'lucide-react';

const Location = () => {
    const [userLoc, setUserLoc] = useState('');
    const [copied, setCopied] = useState(false);

    const address = '8892 Garden Grove Blvd. Garden Grove, CA 92844';
    const googleMapsUrl = 'https://maps.app.goo.gl/neW56UUucAaGUsc98';

    const handleDirections = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!userLoc.trim()) return;

        const destination = encodeURIComponent(address);
        const origin = encodeURIComponent(userLoc.trim());
        const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;

        window.open(url, '_blank');
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'K2 Auto Group',
                    text: address,
                    url: googleMapsUrl,
                });
            } catch (err) {
                console.log('Error sharing:', err);
            }
        } else {
            // Fallback to copy
            try {
                await navigator.clipboard.writeText(googleMapsUrl);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                console.error('Failed to copy!', err);
            }
        }
    };

    return (
        <section id="location" className="py-20 md:py-32 px-10">
            <div className="max-w-[1400px] mx-auto">
                <h2 className="section-title">VISIT K2 AUTO GROUP</h2>

                <div className="relative border border-black/5 overflow-hidden">
                    {/* Find Fast Path Sidebar overlay */}
                    <div className="absolute top-0 left-0 bottom-0 w-80 bg-black text-white z-20 p-10 flex flex-col hidden lg:flex">
                        <h3 className="text-condensed text-4xl mb-10">
                            LOCATE
                            <br />
                            US
                        </h3>
                        <div className="space-y-6 flex-1">
                            <form
                                onSubmit={handleDirections}
                                className="border-b border-white/20 pb-2 flex justify-between items-center group/input"
                            >
                                <input
                                    type="text"
                                    value={userLoc}
                                    onChange={(e) => setUserLoc(e.target.value)}
                                    placeholder="ENTER YOUR LOCATION"
                                    className="bg-transparent text-xs uppercase placeholder:text-white/20 outline-none w-full font-bold tracking-wider"
                                />
                                <button
                                    type="submit"
                                    className="hover:text-[#ed1c24] transition-colors"
                                >
                                    <Navigation size={16} />
                                </button>
                            </form>
                            <div
                                onClick={handleShare}
                                className="border-b border-white/20 pb-2 flex justify-between items-center text-[#ed1c24] cursor-pointer group/share"
                            >
                                <span className="text-xs uppercase font-bold">
                                    {copied
                                        ? 'Copied to Clipboard!'
                                        : 'Share Address'}
                                </span>
                                <Share2
                                    size={16}
                                    className="group-hover/share:scale-110 transition-transform"
                                />
                            </div>
                        </div>
                        <div className="flex justify-between items-center opacity-40">
                            <MapPin size={20} />
                            <ArrowUpRight size={20} />
                        </div>
                    </div>

                    {/* Map Content */}
                    <div className="bg-[#f0f0f0] h-[600px] relative overflow-hidden grayscale contrast-125 hover:grayscale-0 transition-all duration-700">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3316.5927972749455!2d-117.9734187!3d33.7744315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dd28892697843d%3A0x6b8a8f1ffea73788!2s8892+Garden+Grove+Blvd%2C+Garden+Grove%2C+CA+92844!5e0!3m2!1sen!2sus!4v1714000000000!5m2!1sen!2sus"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="K2 Auto Group Location"
                        />
                    </div>

                    {/* Mobile Controls */}
                    <div className="lg:hidden bg-black text-white p-8 space-y-8">
                        <h3 className="text-condensed text-3xl">LOCATE US</h3>
                        <div className="space-y-6">
                            <form
                                onSubmit={handleDirections}
                                className="border-b border-white/20 pb-2 flex justify-between items-center group/input"
                            >
                                <input
                                    type="text"
                                    value={userLoc}
                                    onChange={(e) => setUserLoc(e.target.value)}
                                    placeholder="ENTER YOUR LOCATION"
                                    className="bg-transparent text-xs uppercase placeholder:text-white/20 outline-none w-full font-bold tracking-wider"
                                />
                                <button
                                    type="submit"
                                    className="hover:text-[#ed1c24] transition-colors cursor-pointer"
                                >
                                    <Navigation size={18} />
                                </button>
                            </form>
                            <div
                                onClick={handleShare}
                                className="border-b border-white/20 pb-2 flex justify-between items-center text-[#ed1c24] cursor-pointer group/share"
                            >
                                <span className="text-xs uppercase font-bold">
                                    {copied
                                        ? 'Copied to Clipboard!'
                                        : 'Share Address'}
                                </span>
                                <Share2
                                    size={18}
                                    className="group-hover/share:scale-110 transition-transform"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Location;
