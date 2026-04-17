"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const titleOpacity = useTransform(smoothProgress, [0, 0.15, 0.3], [1, 1, 0]);
  const titleY = "0vh";

  const imageWidth = useTransform(smoothProgress, [0, 0.3], ["92%", "100%"]);
  const imageHeight = useTransform(smoothProgress, [0, 0.3], ["75vh", "100vh"]);
  const imageRadius = useTransform(smoothProgress, [0, 0.2], ["32px", "0px"]);

  const imageSlideY = useTransform(smoothProgress, [0.6, 0.95], ["0%", "-100%"]);

  const contentOpacity = useTransform(smoothProgress, [0.35, 0.5], [0, 1]);
  const contentYOffset = useTransform(smoothProgress, [0.3, 0.5], ["10vh", "0vh"]);

  const sectionTextColor = useTransform(smoothProgress, [0.65, 0.75], ["#ffffff", "#000000"]);
  const buttonPrimaryBg = useTransform(smoothProgress, [0.65, 0.75], ["#ffffff", "#000000"]);
  const buttonPrimaryText = useTransform(smoothProgress, [0.65, 0.75], ["#000000", "#ffffff"]);
  const buttonSecondaryBorder = useTransform(smoothProgress, [0.65, 0.75], ["#ffffff", "#000000"]);
  const buttonSecondaryText = useTransform(smoothProgress, [0.65, 0.75], ["#ffffff", "#000000"]);
  const badgeColor = useTransform(smoothProgress, [0.65, 0.75], ["#ffffff", "#ed1c24"]);

  const innerImgY = useTransform(smoothProgress, [0, 1], ["0%", "-30%"]);
  // Removed stickyExitY to prevent empty space gap

  return (
    <div ref={targetRef} className="relative h-[300vh] bg-white">
      <motion.div
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
      >
        <motion.div
          style={{
            opacity: contentOpacity,
            y: contentYOffset,
            color: sectionTextColor
          }}
          className="absolute z-20 flex flex-col items-center justify-center text-center px-10 pointer-events-auto"
        >
          <motion.span style={{ color: badgeColor }} className="text-xs font-black tracking-[0.5em] mb-6 uppercase">
            The Gold Standard
          </motion.span>
          <h2 className="text-condensed text-5xl md:text-[8vw] mb-10 leading-[0.85] max-w-6xl font-black italic tracking-tighter uppercase">
            Excellence in Motion,<br />Trust in Every Mile
          </h2>
          <p className="text-base md:text-xl max-w-2xl mb-14 font-light tracking-[0.1em] leading-relaxed uppercase opacity-80">
            The premier automotive hub in the US. From certified repairs and DMV assistance
            to a meticulously curated inventory of new and used vehicles.
          </p>
          <div className="flex flex-col sm:flex-row gap-8">
            <motion.button
              style={{ backgroundColor: buttonPrimaryBg, color: buttonPrimaryText }}
              className="px-14 py-6 font-black uppercase tracking-[0.3em] text-[10px] hover:bg-[#ed1c24] hover:text-white transition-colors"
            >
              Explore Inventory
            </motion.button>
            <motion.button
              style={{ borderColor: buttonSecondaryBorder, color: buttonSecondaryText }}
              className="border-2 px-14 py-6 font-black uppercase tracking-[0.3em] text-[10px] hover:bg-black hover:text-white transition-colors"
            >
              Book Service
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          style={{
            opacity: titleOpacity,
            y: titleY,
          }}
          className="absolute z-50 pointer-events-none text-center"
        >
          <h1 className="text-condensed text-[12vw] leading-none font-black text-white mix-blend-difference tracking-tighter whitespace-nowrap">
            K2 AUTO GROUP
          </h1>
        </motion.div>

        <motion.div
          style={{
            width: imageWidth,
            height: imageHeight,
            borderRadius: imageRadius,
            y: imageSlideY
          }}
          className="relative z-10 overflow-hidden origin-center"
        >
          <motion.div
            style={{
              y: innerImgY,
              height: "140%",
              top: "-20%"
            }}
            className="absolute inset-0 w-full"
          >
            <img
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2000"
              alt="K2 Auto Premium"
              className="w-full h-full object-cover brightness-[0.5]"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          <motion.div
            style={{
              opacity: useTransform(smoothProgress, [0, 0.25, 0.35], [0, 1, 0]),
              y: titleY,
            }}
            className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
          >
            <h1 className="text-condensed text-[12vw] leading-none font-black text-white whitespace-nowrap tracking-tighter">
              K2 AUTO GROUP
            </h1>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ opacity: useTransform(smoothProgress, [0, 0.05], [1, 0]) }}
          className="absolute bottom-10 z-[60] flex flex-col items-center"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-black/40 mb-2">Scroll</span>
          <ChevronDown size={20} className="text-[#ed1c24] animate-bounce" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
