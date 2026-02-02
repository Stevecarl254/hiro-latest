"use client";

import axiosInstance from "@/lib/axiosInstance"; // make sure this import is at the top
import React, { useState } from "react";
import axios from "axios";
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    const res = await axiosInstance.post("/messages", formData);

    if (res.status === 201 || res.status === 200) {
      setSuccess(true);
      setFormData({
        fullName: "",
        email: "",
        subject: "",
        message: "",
      });
    } else {
      setError("Failed to send message. Please try again.");
    }
  } catch (err: any) {
    setError(
      err.response?.data?.message ||
        "Failed to send message. Please try again."
    );
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="min-h-screen bg-white text-[#001f3f] relative">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
        {/* Contact Info */}
        <div className="space-y-6 text-center md:text-left">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Get in Touch
          </h2>

          <p className="text-[#001f3f]/80 max-w-md mx-auto md:mx-0">
            Have a question or need more information? Send us a message and we’ll
            get back to you shortly.
          </p>

         <div className="space-y-4 flex flex-col items-center md:items-start">
  <div className="flex items-center gap-3">
    <MapPin className="w-5 h-5 text-orange-500" />
    <span>Nairobi, Kenya</span>
  </div>

  <div className="flex items-center gap-3">
    <Phone className="w-5 h-5 text-orange-500" />
    <span>+254 722 440 643</span>
  </div>

  <div className="flex items-center gap-3">
    <Phone className="w-5 h-5 text-orange-500" />
    <span>+254 796 273 218</span>
  </div>

  <div className="flex items-center gap-3">
    <Mail className="w-5 h-5 text-orange-500" />
    <span>info@hiroservices.co.ke</span>
  </div>
</div>

          <p className="text-sm text-[#001f3f]/70">
            We typically respond within 24 hours.
          </p>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg space-y-5 relative border border-orange-200"
        >
          {/* Success Overlay */}
          {success && (
            <div className="absolute inset-0 bg-white/95 flex flex-col items-center justify-center rounded-2xl px-6 text-center">
              <CheckCircle className="w-14 h-14 text-orange-500 mb-4 animate-bounce" />
              <h3 className="text-xl sm:text-2xl font-bold">
                Message Sent!
              </h3>
              <p className="text-[#001f3f]/70 mt-2">
                Thank you for reaching out. We’ll get back to you soon.
              </p>
              <button
                type="button"
                onClick={() => setSuccess(false)}
                className="mt-4 inline-flex items-center gap-2 text-[#001f3f] font-semibold hover:text-orange-500"
              >
                <XCircle className="w-5 h-5" />
                Close
              </button>
            </div>
          )}

          <div>
            <label className="font-medium">Full Name</label>
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="Your full name"
              className="w-full mt-2 border border-orange-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div>
            <label className="font-medium">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Your email address"
              className="w-full mt-2 border border-orange-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div>
            <label className="font-medium">Subject</label>
            <input
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              placeholder="Subject"
              className="w-full mt-2 border border-orange-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div>
            <label className="font-medium">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Your message"
              className="w-full mt-2 border border-orange-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#001f3f] text-white py-3 rounded-md font-semibold hover:bg-orange-500 transition"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </section>

      {/* Floating Buttons */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 flex flex-col gap-3 z-50">
        <a
          href="tel:+254722440643"
          className="bg-orange-500 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-[#001f3f]"
        >
          <Phone />
        </a>

        <a
          href="https://wa.me/254796273218"
          target="_blank"
          rel="noreferrer"
          className="bg-orange-500 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-[#001f3f]"
        >
          <MessageCircle />
        </a>
      </div>
    </div>
  );
};

export default ContactPage;
