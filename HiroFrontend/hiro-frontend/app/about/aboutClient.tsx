"use client";

import { motion, cubicBezier } from "framer-motion";
import Image from "next/image";

const easeOutExpo = cubicBezier(0.16, 1, 0.3, 1);

const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOutExpo },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.4, ease: easeOutExpo },
  },
};

export default function AboutPage() {
  return (
    <motion.main
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="bg-white font-['Figtree'] overflow-hidden"
    >
      {/* HERO / INTRO */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#001f3f] to-[#002b5c] text-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 px-6 md:px-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: easeOutExpo }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 text-center md:text-left"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              About Hiro Catering
            </h1>
            <p className="text-gray-200 leading-relaxed text-base sm:text-lg">
Hiro Catering and Equipment is your ultimate one-stop solution for exceptional catering services and equipment hire. We specialize in providing a comprehensive range of services, including catering for all occasions, hostessing, professional cooks and waiting staff, barista services, functions bar services, and maintenance of catering equipment. 
Whether you are hosting an intimate gathering or a grand corporate event, we bring creativity and professionalism to ensure a world-class experience.
Our philosophy is rooted in delivering great food, exceptional presentation, and warm, attentive service. Every dish we serve reflects the dedication and artistry of our skilled chefs, while our team of professional staff ensures seamless service to make your event unforgettable. 
At Hiro Catering and Equipment, we are committed to excellence and strive to exceed your expectations with every detail
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: easeOutExpo }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 relative mt-8 md:mt-0"
          >
            <div className="absolute -top-4 -left-4 w-full h-full border-2 border-[#FF6600] rounded-3xl md:-top-6 md:-left-6"></div>
            <Image
              src="/hero.jpeg"
              alt="Hiro Catering Team"
              width={600}
              height={420}
              className="relative rounded-3xl shadow-2xl object-cover w-full h-auto"
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6 md:px-12 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOutExpo }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#001f3f] mb-6"
          >
            Our Story
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, ease: easeOutExpo }}
            className="space-y-4 sm:space-y-5 text-gray-700 leading-relaxed max-w-3xl mx-auto text-base sm:text-lg"
          >
            <p>
              Hiro Catering started with one goal, to elevate catering in Kenya
              through refined menus, elegant presentation, and world-class
              service.
            </p>
            <p>
              Today, we are trusted by clients who value quality, creativity,
              and flawless execution at every event.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SUSTAINABILITY */}
      <section className="py-16 md:py-24 bg-[#f9fafc]">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOutExpo }}
            className="text-center mb-10 md:mb-14"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#001f3f] mb-3 sm:mb-4">
              Sustainability & Impact
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
              We serve responsibly, supporting communities and protecting the
              planet.
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-10 md:gap-14 items-start md:items-center">
            {/* TEXT */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: easeOutExpo }}
              viewport={{ once: true }}
              className="flex-1 space-y-6"
            >
              {[
                { title: "Local Sourcing", text: "Partnering with local farmers for fresh ingredients." },
                { title: "Eco-Friendly Operations", text: "Reducing waste and embracing sustainability." },
                { title: "Community Empowerment", text: "Training youth in hospitality and service." },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 sm:gap-4 items-start">
                  <div className="bg-[#FF6600]/10 p-3 rounded-full text-lg sm:text-xl">🌟</div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-[#001f3f]">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base">{item.text}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* IMPACT CARD */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: easeOutExpo }}
              viewport={{ once: true }}
              className="bg-[#001f3f] text-white p-6 sm:p-10 rounded-3xl shadow-2xl w-full md:w-1/2"
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">
                Our Impact
              </h3>
              <div className="grid grid-cols-2 gap-4 sm:gap-8 text-center">
                {[
                  ["80%", "Local produce"],
                  ["200+", "Youth trained"],
                  ["95%", "Waste recycled"],
                  ["15+", "Community projects"],
                ].map(([value, label], i) => (
                  <div key={i}>
                    <p className="text-2xl sm:text-4xl font-bold text-[#FF6600]">{value}</p>
                    <p className="text-xs sm:text-sm text-gray-200">{label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#001f3f] mb-8 sm:mb-12">
            Our Values
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {["Integrity", "Creativity", "Excellence", "Community"].map(
              (value, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: easeOutExpo }}
                  className="border border-gray-100 shadow-lg rounded-2xl p-4 sm:p-6 hover:border-[#FF6600] hover:shadow-xl transition-all"
                >
                  <h3 className="text-lg sm:text-xl font-semibold text-[#001f3f]">
                    {value}
                  </h3>
                </motion.div>
              )
            )}
          </div>
        </div>
      </section>
    </motion.main>
  );
}
