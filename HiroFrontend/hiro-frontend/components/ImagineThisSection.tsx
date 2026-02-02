"use client";

import { motion, useAnimation, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

const content = {
  heading: "Imagine This",
  subheading: "More Than Just Food",
  description:
    "At Hiro Catering, we create unforgettable experiences, blending exquisite food, elegant presentation, and warm hospitality to make your events truly special.",
  imageSrc: "/setup.jpeg",
  imageAlt: "Elegant catering setup",
};

export default function ImagineThisSection() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2 });

  // Motion values for parallax
  const y = useMotionValue(0);
  const rotate = useTransform(y, [-50, 50], [-2, 2]);

  useEffect(() => {
    if (inView) controls.start("visible");
    else controls.start("hidden");
  }, [controls, inView]);

  const textVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  };

  return (
    <section
      ref={ref}
      className="relative w-full py-24 bg-white overflow-hidden font-['Figtree']"
    >
      <div className="max-w-6xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12">
        {/* Text Panel */}
        <motion.div
          className="flex-1 relative z-10 bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl text-center md:text-left"
          initial="hidden"
          animate={controls}
          variants={textVariants}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#001f3f] mb-2">
            {content.heading}
          </h2>
          <h3 className="text-2xl sm:text-3xl font-semibold text-[#FF6600] mb-6 relative inline-block after:content-[''] after:block after:w-16 sm:after:w-20 after:h-1 after:bg-[#FF6600] after:mt-2">
            {content.subheading}
          </h3>
          <p className="text-gray-800 text-base sm:text-lg md:text-xl leading-relaxed">
            {content.description}
          </p>
        </motion.div>

        {/* Image Panel with Parallax & Gradient Overlay */}
        <motion.div
          style={{ y, rotate }}
          className="flex-1 relative w-full h-64 sm:h-80 md:h-96 rounded-3xl shadow-2xl overflow-hidden"
          initial="hidden"
          animate={controls}
          variants={imageVariants}
        >
          <Image
            src={content.imageSrc}
            alt={content.imageAlt}
            fill
            className="object-cover rounded-3xl"
          />
          {/* Gradient Overlay with subtle moving effect */}
          <motion.div
            className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/40 via-transparent to-transparent"
            animate={{ opacity: [0.6, 0.4, 0.6] }}
            transition={{ duration: 6, repeat: Infinity, repeatType: "mirror" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
