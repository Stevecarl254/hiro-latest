"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  const { scrollY } = useScroll();

  /* Scroll-based transforms (GPU-friendly) */
  const bgY = useTransform(scrollY, [0, 600], [0, 200]);
  const fadeOut = useTransform(scrollY, [0, 200], [1, 0]);
  const scaleDown = useTransform(scrollY, [0, 600], [1, 0.85]);

  return (
    <section className="relative min-h-[95vh] flex items-center overflow-hidden">
      {/* ✅ Background image (LCP optimized) */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 -z-10 scale-[1.05]"
      >
        <Image
          src="/image 1.jpeg"
          alt="Catering event setup"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#001f3f]/90 via-[#001f3f]/70 to-[#001f3f]/40" />

      {/* Orange Glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 w-[420px] sm:w-[500px] h-[420px] sm:h-[500px] bg-[#FF6600]/20 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-3xl text-white"
        >
          {/* Badge */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block mb-4 px-4 py-1 rounded-full bg-white/10 text-xs sm:text-sm tracking-wide backdrop-blur-md border border-white/20"
          >
            Premium Catering & Hospitality
          </motion.span>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl xl:text-7xl font-bold leading-tight mb-6 font-['Figtree']">
            Your One-Stop <br />
            <span className="text-[#FF6600]">Catering Solution</span>
          </h1>

          {/* Description (UPDATED ONLY HERE) */}
          <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-10 leading-relaxed">
            Your One Stop Solution for Catering Excellence from Event Staffing{" "}
            <span className="italic">
              (Production Staff / cooks ; waiters ; bartenders ; hostesses)
            </span>{" "}
            to all Equipment Hire for all Occasions and Repairs. We have got you
            covered.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/get-quote">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#FF6600] text-white px-8 py-4 rounded-md font-semibold text-base sm:text-lg shadow-lg hover:bg-[#e65c00] transition-all"
              >
                Get a Quote
              </motion.button>
            </Link>

            <Link href="/services/hiring-catering-equipment">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-md font-semibold text-base sm:text-lg border border-white/40 text-white hover:bg-white hover:text-[#001f3f] transition-all"
              >
                View Services
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* ⬇ Scroll Indicator */}
      <motion.div
        style={{ opacity: fadeOut, scale: scaleDown }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center"
      >
        <span className="text-xs tracking-widest text-white/70 mb-2">
          SCROLL DOWN
        </span>

        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex items-center justify-center w-10 h-10 rounded-full border border-white/40 backdrop-blur-sm"
        >
          <ChevronDown className="w-6 h-6 text-[#FF6600]" />
        </motion.div>
      </motion.div>
    </section>
  );
}