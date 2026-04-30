'use client';

import { motion } from 'motion/react';
import { Instagram, ArrowUpRight, Maximize2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { BUSINESS_INFO } from '@/utils/businessInfo';

const localPhotos = [
    {
        id: 1,
        url: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=800',
        size: 'large',
        tag: 'PAINT CORRECTION',
    },
    {
        id: 2,
        url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800',
        size: 'small',
        tag: 'ENGINE TUNING',
    },
    {
        id: 3,
        url: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=800',
        size: 'small',
        tag: 'DIAGNOSTICS',
    },
    {
        id: 4,
        url: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800',
        size: 'small',
        tag: 'BODY WORK',
    },
    {
        id: 5,
        url: 'https://images.unsplash.com/photo-1621359953202-02623244d217?auto=format&fit=crop&q=80&w=800',
        size: 'large',
        tag: 'DELIVERY',
    },
    {
        id: 6,
        url: 'https://images.unsplash.com/photo-1603584173870-7f309f824231?auto=format&fit=crop&q=80&w=800',
        size: 'small',
        tag: 'WHEEL ALIGNMENT',
    },
];

const InstagramShowcase = () => {
    const [photos, setPhotos] = useState(localPhotos);

    useEffect(() => {
        const fetchInstagram = async () => {
            const feedId = process.env.NEXT_PUBLIC_BEHOLD_FEED_ID;
            if (!feedId) return;

            try {
                const response = await fetch(
                    `https://behold.so/api/v2/feed/${feedId}`,
                );
                if (response.ok) {
                    const data = await response.json();
                    if (Array.isArray(data) && data.length > 0) {
                        const formatted = data
                            .slice(0, 6)
                            .map((post: any, index: number) => ({
                                id: post.id,
                                url: post.mediaUrl,
                                permalink: post.permalink,
                                size:
                                    index === 0 || index === 4
                                        ? 'large'
                                        : 'small',
                                tag:
                                    post.caption
                                        ?.split(' ')[0]
                                        ?.replace('#', '')
                                        ?.toUpperCase() || 'SHOWCASE',
                            }));
                        setPhotos(formatted);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch Instagram feed:', error);
            }
        };

        fetchInstagram();
    }, []);

    return (
        <section
            id="showcase"
            className="py-20 md:py-32 px-10 bg-white text-black overflow-hidden"
        >
            <div className="max-w-[1400px] mx-auto">
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 md:mb-24 gap-8">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-4 text-[#ed1c24] mb-6"
                        >
                            <Instagram size={14} />
                            <span className="text-[9px] font-black tracking-[0.5em] uppercase">
                                Real-Time Operations
                            </span>
                        </motion.div>
                        <h2 className="text-condensed text-4xl md:text-5xl font-black  leading-[0.9] uppercase text-black">
                            Field
                            <br />
                            Showcase
                        </h2>
                    </div>

                    <a
                        href={`https://instagram.com/${BUSINESS_INFO.instagram}`}
                        target="_blank"
                        className="group flex items-center gap-5 text-[9px] font-black tracking-[0.4em] uppercase text-black/20 hover:text-black transition-all border-b border-black/5 pb-2"
                    >
                        Follow @{BUSINESS_INFO.instagram}
                        <ArrowUpRight
                            size={14}
                            className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-[#ed1c24]"
                        />
                    </a>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 auto-rows-[180px] md:auto-rows-[350px]">
                    {photos.map((item, i) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05, duration: 0.8 }}
                            className={`relative overflow-hidden group cursor-pointer border border-black/5 bg-black/[0.02] ${
                                item.size === 'large'
                                    ? 'md:col-span-2 md:row-span-2 col-span-1 row-span-1'
                                    : 'col-span-1 row-span-1'
                            }`}
                            onClick={() => {
                                if ('permalink' in item) {
                                    window.open(
                                        item.permalink as string,
                                        '_blank',
                                    );
                                }
                            }}
                        >
                            <img
                                src={item.url}
                                alt={item.tag}
                                className="w-full h-full object-cover transition-all duration-[2s] ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100 grayscale hover:grayscale-0"
                            />

                            {/* Corner Accents */}
                            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#ed1c24]/0 group-hover:border-[#ed1c24]/50 transition-all duration-500 m-4" />

                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-700" />

                            <div className="absolute inset-0 flex flex-col justify-end p-8">
                                <div className="flex flex-col gap-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <div className="flex items-center gap-3">
                                        <div className="h-px w-4 bg-[#ed1c24]" />
                                        <span className="text-[8px] font-black uppercase tracking-[0.4em] text-[#ed1c24]">
                                            {item.tag}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 group-hover:opacity-100 transition-opacity">
                                            View Operational Detail
                                        </span>
                                        <Maximize2
                                            size={16}
                                            className="text-black/20 group-hover:text-black transition-colors"
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default InstagramShowcase;
