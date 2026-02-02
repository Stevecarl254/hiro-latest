"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Link from "next/link";

export default function BookingSection() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2 });

  useEffect(() => {
    if (inView) controls.start("visible");
    else controls.start("hidden");
  }, [controls, inView]);

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <section
      ref={ref}
      className="relative w-full py-20 sm:py-24 md:py-28 bg-gradient-to-r from-[#001f3f] via-[#004d7a] to-[#FF6600] overflow-hidden font-['Figtree']"
    >
      {/* Abstract shapes */}
      <div className="absolute -top-20 -left-20 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-[#FF660020] rounded-full filter blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-[#001f3f20] rounded-full filter blur-3xl"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-4 sm:gap-6">
        <motion.h2
          initial="hidden"
          animate={controls}
          variants={textVariants}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white"
        >
          Let’s Make Your Event Unforgettable
        </motion.h2>

        <motion.p
          initial="hidden"
          animate={controls}
          variants={textVariants}
          className="text-gray-200 text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl"
        >
          Book Hiro Catering today and experience elegance, taste, and exceptional service tailored for your special day.
        </motion.p>

        <motion.div
          initial="hidden"
          animate={controls}
          variants={buttonVariants}
          className="mt-4 sm:mt-6 relative"
        >
          <Link href="/get-quote">
            <button className="relative overflow-hidden bg-[#FF6600] text-white px-8 sm:px-10 md:px-12 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg md:text-lg shadow-lg hover:bg-[#e65c00] transition-all duration-300">
              Book Now
              {/* Shining mirror line */}
              <span className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-white/30 via-white/70 to-white/30 transform -skew-x-12 animate-shine pointer-events-none"></span>
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Tailwind keyframes for the shine */}
      <style jsx>{`
        @keyframes shine {
          0% {
            left: -50%;
          }
          100% {
            left: 100%;
          }
        }
        .animate-shine {
          animation: shine 2s infinite;
        }
      `}</style>
    </section>
  );
}
