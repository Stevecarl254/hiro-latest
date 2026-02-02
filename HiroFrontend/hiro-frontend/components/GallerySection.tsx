"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const galleryItems = [
  {
    id: 1,
    title: "Elegant Buffet Setup",
    description:
      "A modern buffet arrangement featuring stylish plating and exquisite attention to detail.",
    image: "/buffet.jpeg",
  },
  {
    id: 2,
    title: "Outdoor Event Perfection",
    description:
      "Our outdoor catering setup designed to impress guests with charm and class.",
    image: "/images.jpeg",
  },
  {
    id: 3,
    title: "Fine Dining Experience",
    description:
      "A premium indoor dining setup, showcasing Hiro’s attention to ambiance and excellence.",
    image: "/hero.jpeg",
  },
];

export default function GallerySection() {
  return (
    <section className="w-full py-24 bg-white font-['Figtree'] overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#001f3f]">
            Gallery Highlights
          </h2>
          <p className="text-gray-600 text-base sm:text-lg mt-3">
            A glimpse into Hiro Catering’s unforgettable moments.
          </p>
        </div>

        {/* Diagonal Layout */}
        <div className="space-y-12 sm:space-y-16 md:space-y-24">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className={`flex flex-col md:flex-row items-center gap-4 sm:gap-6 md:gap-10 ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Image */}
              <div className="relative w-full md:w-1/2 h-56 sm:h-64 md:h-[400px] overflow-hidden rounded-3xl shadow-2xl">
                <div className="absolute inset-0 bg-gray-200 rounded-3xl" />
                <div
                  className="w-full h-full overflow-hidden rounded-3xl"
                  style={{
                    clipPath: "polygon(0 0, 100% 5%, 100% 95%, 0% 100%)",
                  }}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                {/* Gradient overlay for modern look */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-3xl"></div>
              </div>

              {/* Text */}
              <div className="flex-1 text-center md:text-left mt-4 md:mt-0 px-2 sm:px-0">
                <h3 className="text-lg sm:text-xl md:text-3xl font-semibold text-[#001f3f] mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-10 sm:mt-12 md:mt-16">
          <a
            href="/gallery"
            className="inline-block bg-[#FF6600] text-white px-5 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-base md:text-lg font-medium shadow-md hover:bg-[#e65c00] transition-all"
          >
            View Full Gallery →
          </a>
        </div>
      </div>
    </section>
  );
}
