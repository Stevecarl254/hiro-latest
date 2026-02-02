"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const testimonials = [
  {
    id: 1,
    name: "Alice Johnson",
    rating: 5,
    text: "Hiro Catering made our wedding unforgettable. The food, presentation, and staff were absolutely top-notch!",
  },
  {
    id: 2,
    name: "Mark Thompson",
    rating: 4,
    text: "The catering service was professional and elegant. Highly recommended for corporate events.",
  },
  {
    id: 3,
    name: "Sophia Lee",
    rating: 5,
    text: "Amazing experience! The team went above and beyond to ensure everything was perfect.",
  },
];

export default function TestimonialSection() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-scroll every 5 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  const renderStars = (count: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`inline-block w-4 h-4 ${i < count ? "text-[#FF6600]" : "text-gray-300"}`}
      >
        ★
      </span>
    ));
  };

  return (
    <section className="relative py-24 bg-white font-['Figtree']">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#001f3f] mb-12">
          Testimonials
        </h2>

        {/* Slider Container */}
        <div className="relative overflow-hidden h-72 sm:h-80 md:h-96">
          <AnimatePresence initial={false}>
            <motion.div
              key={testimonials[current].id}
              className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-8 md:px-12 text-center"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.6 }}
            >
              {/* Blurred overlay */}
              <div className="absolute inset-0 bg-white/30 backdrop-blur-md rounded-3xl shadow-lg"></div>

              <div className="relative z-10 max-w-2xl flex flex-col items-center">
                <p className="text-gray-900 text-base sm:text-lg md:text-xl mb-4 leading-relaxed">
                  "{testimonials[current].text}"
                </p>
                <div className="text-[#001f3f] font-semibold text-lg md:text-xl mb-2">
                  {testimonials[current].name}
                </div>
                <div className="flex justify-center mb-2">{renderStars(testimonials[current].rating)}</div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-1 sm:left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-[#001f3f] p-2 sm:p-2.5 md:p-3 rounded-full shadow-md z-20"
          >
            <FiChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-1 sm:right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-[#001f3f] p-2 sm:p-2.5 md:p-3 rounded-full shadow-md z-20"
          >
            <FiChevronRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
