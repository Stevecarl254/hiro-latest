"use client";

import { motion } from "framer-motion";
import { GiChefToque, GiKnifeFork, GiTable } from "react-icons/gi";

const items = [
  {
    id: 1,
    title: "Our Vision",
    description:
      "To be a leading catering service recognized for refined presentation, premium equipment, and unforgettable dining experiences at every event.",
    icon: GiChefToque,
  },
  {
    id: 2,
    title: "Our Goal",
    description:
      "To provide fully equipped, well-coordinated catering services that combine taste, precision, and professional execution from setup to service.",
    icon: GiKnifeFork,
  },
  {
    id: 3,
    title: "Our Values",
    description:
      "We value quality ingredients, proper equipment, attention to detail, hygiene, and courteous service in everything we deliver.",
    icon: GiTable,
  },
];

export default function VisionSection() {
  return (
    <section className="relative bg-[#f9f9f9] py-16 sm:py-20 md:py-28 overflow-hidden">
      {/* Responsive background shapes */}
      <div className="absolute -top-24 -left-24 w-52 h-52 sm:w-72 sm:h-72 md:w-72 md:h-72 bg-[#FF6600]/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute -bottom-24 -right-24 w-64 h-64 sm:w-96 sm:h-96 md:w-96 md:h-96 bg-[#001f3f]/10 rounded-full blur-3xl animate-ping-slow"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Heading */}
        <div className="text-center mb-12 sm:mb-16 px-2 sm:px-0">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#001f3f] mb-4">
            Built on Excellence
          </h2>
          <p className="text-gray-700 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Our catering services are guided by a clear vision, a focused goal,
            and strong values that ensure every event is professionally served,
            beautifully presented, and expertly managed.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
          {items.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                whileHover={{ y: -10, scale: 1.03 }}
                className="relative bg-gradient-to-tr from-white to-[#f3f6ff] rounded-3xl p-6 sm:p-8 md:p-12 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center"
              >
                {/* Soft abstract shape behind icon */}
                <div className="absolute -top-6 right-0 w-16 sm:w-20 sm:h-24 bg-[#FF6600]/10 rounded-bl-full"></div>

                {/* Icon */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 mb-4 sm:mb-6 flex items-center justify-center rounded-full bg-[#001f3f] text-[#FF6600] shadow-md">
                  <Icon size={32} />
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl md:text-2xl font-semibold text-[#001f3f] mb-3 sm:mb-4">
                  {item.title}
                </h3>

                {/* Divider */}
                <div className="w-12 sm:w-14 h-1 bg-[#FF6600] mb-4 sm:mb-6 rounded-full" />

                {/* Text */}
                <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Animations for background shapes */}
      <style jsx>{`
        @keyframes pulseSlow {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.1); opacity: 0.5; }
        }
        @keyframes pingSlow {
          0% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.2); opacity: 0.4; }
          100% { transform: scale(1); opacity: 0.2; }
        }
        .animate-pulse-slow { animation: pulseSlow 6s infinite; }
        .animate-ping-slow { animation: pingSlow 7s infinite; }
      `}</style>
    </section>
  );
}
