"use client";

import { motion, useAnimation, Variants } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { FiCheck } from "react-icons/fi";

const reasons = [
  "Exceptional catering tailored to your event",
  "Professional and experienced staff",
  "High-quality ingredients and presentation",
  "Flexible and reliable service",
  "Creating unforgettable experiences",
];

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.2,
      duration: 0.5,
      ease: [0.42, 0, 0.58, 1], // cubic-bezier easeOut
    },
  }),
};

export default function WhyHiroSection() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2 });

  useEffect(() => {
    if (inView) controls.start("visible");
    else controls.start("hidden");
  }, [controls, inView]);

  return (
    <section
      ref={ref}
      className="relative py-24 font-['Figtree'] overflow-hidden bg-gray-100 bg-[url('/rough-texture.png')]"
    >
      <div className="max-w-6xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-12">
        
        {/* Left: List */}
        <motion.div
          className="flex-1 text-center md:text-left"
          initial="hidden"
          animate={controls}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#001f3f] mb-8">
            Why Hiro Catering
          </h2>
          <ul className="space-y-4">
            {reasons.map((reason, index) => (
              <motion.li
                key={index}
                custom={index}
                initial="hidden"
                animate={controls}
                variants={itemVariants}
                className="flex items-start gap-3 text-base sm:text-lg md:text-lg text-gray-800"
              >
                <FiCheck className="text-[#FF6600] mt-1 flex-shrink-0" size={20} />
                {reason}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Right: Image with hover & fade-in */}
        <motion.div
          className="flex-1 w-full max-w-md aspect-square rounded-3xl overflow-hidden shadow-xl mx-auto md:mx-0 mt-8 md:mt-0 cursor-pointer"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={controls}
          whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
          transition={{ duration: 0.5, ease: [0.42, 0, 0.58, 1] }}
        >
          <img
            src="/hero.jpeg"
            alt="Why Hiro Catering"
            className="w-full h-full object-cover rounded-3xl"
          />
        </motion.div>

      </div>
    </section>
  );
}
