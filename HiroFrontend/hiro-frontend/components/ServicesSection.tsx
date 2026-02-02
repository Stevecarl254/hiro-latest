"use client";

import { motion, Variants, easeOut } from "framer-motion";
import Link from "next/link";

const services = [
  {
    id: 1,
    title: "Catering & Hospitality Services",
    description:
      "Delivering exquisite catering for weddings, corporate functions, and private events — crafted to perfection with warmth and professionalism.",
  },
  {
    id: 2,
    title: "Event Staffing & Hosting",
    description:
      "Providing trained, elegant, and professional staff to ensure seamless service and memorable guest experiences.",
  },
  {
    id: 3,
    title: "Catering Equipment Hire",
    description:
      "Offering a wide selection of catering equipment — from utensils to full event setups, available for short-term hire.",
  },
];

export default function ServicesSection() {
  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
  };

  const numberVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: easeOut } },
  };

  return (
    <section className="py-16 sm:py-20 bg-white font-['Figtree'] relative">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#001f3f] mb-12 sm:mb-14"
        >
          Our Featured Services
        </motion.h2>

        {/* Services Cards */}
        <motion.div
          className="grid gap-8 sm:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              className="group relative cursor-pointer"
              variants={cardVariants}
              whileHover={{ scale: 1.03 }}
            >
              {/* Floating Glow */}
              <motion.div
                className="absolute inset-0 -z-10 w-full h-full rounded-3xl"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,102,0,0.15) 0%, rgba(255,102,0,0) 70%)",
                }}
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 3 + service.id, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Glow size for mobile */}
              <div className="absolute inset-0 -z-20 w-4/5 h-4/5 sm:w-full sm:h-full mx-auto my-auto rounded-3xl"></div>

              {/* Card */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-md hover:shadow-xl border-t-4 border-[#FF6600] transition-all duration-300 relative">
                {/* Number Badge */}
                <motion.div
                  className="absolute -top-6 left-6 bg-[#FF6600] text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg shadow-lg border-2 border-white"
                  variants={numberVariants}
                >
                  {service.id}
                </motion.div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-semibold text-[#001f3f] mt-6 mb-3">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed relative inline-block group-hover:after:w-full after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[3px] after:bg-[#FF6600] after:transition-all after:duration-300">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <div className="mt-12 sm:mt-16">
          <Link href="/services/short-term-waiters">
            <button className="bg-[#FF6600] text-white px-8 sm:px-10 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-[#e65c00] hover:scale-105 transition-all duration-300 shadow-lg">
              View More Services
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
