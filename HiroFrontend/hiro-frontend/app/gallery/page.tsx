"use client";

import axiosInstance from "@/lib/axiosInstance";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface GalleryItem {
  _id?: string;
  title: string;
  description?: string;
  imageUrl: string;
}

const GalleryPage = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchGallery = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await axiosInstance.get("/gallery");
        setGalleryItems(res.data); // assuming your backend returns an array directly
      } catch (err: any) {
        console.error("Failed to fetch gallery:", err);
        setError("Failed to load gallery.");
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-[#001f3f] mb-4">
          Event Gallery
        </h1>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Explore our professionally executed events, showcasing our premium
          hospitality and catering services.
        </p>
      </section>

      {/* Error Message */}
      {error && (
        <p className="text-center text-red-500 mb-6 text-lg">{error}</p>
      )}

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="w-12 h-12 border-4 border-[#5cc3ff] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        // Gallery Grid
        <section className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">
              No gallery items yet.
            </p>
          ) : (
            galleryItems.map((item, index) => (
              <motion.div
                key={item._id || `gallery-${index}`} // fallback key ensures uniqueness
                className="bg-white rounded-2xl shadow-lg overflow-hidden group cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative">
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}${item.imageUrl}`}
                    alt={item.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                    <p className="text-white text-lg font-semibold px-2 text-center">
                      {item.title}
                    </p>
                  </div>
                </div>
                {item.description && (
                  <div className="p-4">
                    <p className="text-gray-700">{item.description}</p>
                  </div>
                )}
              </motion.div>
            ))
          )}
        </section>
      )}
    </div>
  );
};

export default GalleryPage;