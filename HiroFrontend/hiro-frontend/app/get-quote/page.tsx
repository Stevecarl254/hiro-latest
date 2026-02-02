"use client";

 import axiosInstance from "@/lib/axiosInstance"
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";
import { FaClipboardList, FaPhoneAlt, FaEnvelope, FaWhatsapp, FaCheckCircle } from "react-icons/fa";
import { GiChefToque } from "react-icons/gi";

export default function GetQuotePage() {
  const [selectedQuote, setSelectedQuote] = useState<"Event" | "Equipment" | "EquipmentRepair" | "Staff" | null>(null);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    quoteType: "",
    staffType: "",
    eventType: "",
    eventDate: "",
    guests: "",
    location: "",
    details: "",
    equipmentType: "",
    equipmentQuantity: "",
    rentalDate: "",
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
;

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    await axiosInstance.post("/quotes", form);

    setSuccess(true);
    setForm({
      fullName: "",
      email: "",
      phoneNumber: "",
      quoteType: "",
      staffType: "",
      eventType: "",
      eventDate: "",
      guests: "",
      location: "",
      details: "",
      equipmentType: "",
      equipmentQuantity: "",
      rentalDate: "",
    });

    setSelectedQuote(null);
  } catch (err: any) {
    console.error("Failed to submit quote:", err);
  }
};
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const quoteButtons: { label: string; type: "Event" | "Equipment" | "EquipmentRepair" | "Staff" }[] = [
    { label: "Event Quote", type: "Event" },
    { label: "Equipment for hire Quote", type: "Equipment" },
    { label: "Equipment Repair Quote", type: "EquipmentRepair" },
    { label: "Staff Quote", type: "Staff" },
  ];

  const staffOptions = ["Production", "Cook", "Waiter", "Bartender", "Hostess"];

  return (
    <div className="relative bg-white text-gray-800 py-16 min-h-screen overflow-x-hidden">
      {/* Background decorative icons */}
      <GiChefToque className="absolute top-0 right-0 text-orange-200 text-[15rem] md:text-[18rem] pointer-events-none -z-10" />
      <GiChefToque className="absolute bottom-0 left-0 text-[#001f3f]/10 text-[15rem] md:text-[18rem] pointer-events-none -z-10" />

      {/* Success Toast */}
      {success && (
        <div className="fixed top-6 right-4 z-50 bg-white border-l-4 border-orange-500 shadow-lg rounded-lg px-4 py-3 flex items-center gap-3 animate-slide-in">
          <FaCheckCircle className="text-orange-500 text-2xl" />
          <div>
            <p className="font-semibold text-orange-600">Request Submitted!</p>
            <p className="text-gray-600 text-sm">Our team will contact you soon with a custom quote.</p>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="max-w-5xl mx-auto text-center mb-12 px-4">
        <div className="inline-flex flex-col md:flex-row items-center justify-center gap-3 bg-white shadow-md px-4 md:px-6 py-3 rounded-full border border-orange-400">
          <FaClipboardList className="text-orange-500 text-3xl" />
          <h1 className="text-2xl md:text-3xl font-bold text-[#001f3f]">Request a Quote</h1>
        </div>
        <p className="mt-4 md:mt-6 text-base md:text-lg text-gray-700 max-w-2xl mx-auto">
          Choose the type of quote you need and provide your details below. Our team will get back with a personalized offer.
        </p>
      </div>

      {/* Quote Type Buttons */}
      <section className="max-w-5xl mx-auto px-4 mb-12 text-center flex flex-col items-center gap-6 relative">
        <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6 w-full">
          {quoteButtons.map((btn) => (
            <button
              key={btn.type}
              onClick={() => {
                setSelectedQuote(btn.type);
                setForm({ ...form, quoteType: btn.type });
              }}
              className={`flex-1 px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold text-base md:text-lg transition-all duration-300 shadow-lg border-2 ${
                selectedQuote === btn.type
                  ? "bg-[#001f3f] text-white border-orange-500"
                  : "bg-white text-[#001f3f] border-orange-500 hover:bg-orange-500 hover:text-white"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {!selectedQuote && (
          <div className="flex flex-col items-center mt-6 md:mt-10 animate-bip-text">
            <svg viewBox="0 0 300 150" className="w-[180px] md:w-[300px] h-auto overflow-visible">
              <path d="M0,130 C75,0 225,0 300,130" stroke="orange" strokeWidth="2" fill="transparent" strokeDasharray="6 6" />
              <polygon points="295,125 305,130 295,135" fill="orange" />
              <polygon points="5,125 15,130 5,135" fill="orange" />
            </svg>
            <span className="mt-2 text-[#001f3f] font-bold text-center text-sm md:text-lg">
              Click a button above to get a quote
            </span>
          </div>
        )}
      </section>

      {/* Form Section */}
      {selectedQuote && (
        <section className="max-w-5xl mx-auto px-4 mb-12">
          <div className="bg-[#001f3f] p-6 md:p-10 rounded-3xl shadow-2xl border border-orange-500">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-6 md:mb-10">
              Provide Your Details
            </h2>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6" onSubmit={handleSubmit}>
              {/* Common Inputs */}
              {[
                { label: "Full Name", name: "fullName", type: "text", placeholder: "Your name", required: true },
                { label: "Email Address", name: "email", type: "email", placeholder: "example@email.com", required: true },
                { label: "Phone Number", name: "phoneNumber", type: "tel", placeholder: "+254...", required: true },
              ].map((input) => (
                <div key={input.name}>
                  <label className="block mb-1 md:mb-2 font-semibold text-white">{input.label}</label>
                  <input
                    type={input.type}
                    name={input.name}
                    value={form[input.name as keyof typeof form]}
                    onChange={handleChange}
                    placeholder={input.placeholder}
                    required={input.required}
                    className="w-full p-3 md:p-3 rounded-lg border border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400 text-white placeholder-white text-base md:text-base"
                  />
                </div>
              ))}

              {/* Event-specific fields */}
              {selectedQuote === "Event" && (
                <>
                  <div>
                    <label className="block mb-1 md:mb-2 font-semibold text-white">Event Type</label>
                    <select
                      name="eventType"
                      value={form.eventType}
                      onChange={handleChange}
                      className="w-full p-3 md:p-3 rounded-lg border border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400 text-white bg-[#001f3f] text-base md:text-base"
                    >
                      <option value="">Select an event type</option>
                      <option className="bg-white text-black">Wedding</option>
                      <option className="bg-white text-black">Corporate Event</option>
                      <option className="bg-white text-black">Birthday Party</option>
                      <option className="bg-white text-black">Private Dinner</option>
                      <option className="bg-white text-black">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 md:mb-2 font-semibold text-white">Event Date</label>
                    <input
                      type="date"
                      name="eventDate"
                      value={form.eventDate}
                      onChange={handleChange}
                      className="w-full p-3 md:p-3 rounded-lg border border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400 text-white text-base md:text-base"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 md:mb-2 font-semibold text-white">Number of Guests</label>
                    <input
                      type="number"
                      name="guests"
                      value={form.guests}
                      onChange={handleChange}
                      placeholder="e.g. 100"
                      className="w-full p-3 md:p-3 rounded-lg border border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400 text-white text-base md:text-base"
                    />
                  </div>
                </>
              )}

              {/* Equipment-specific fields */}
              {(selectedQuote === "Equipment" || selectedQuote === "EquipmentRepair") && (
                <>
                  <div>
                    <label className="block mb-1 md:mb-2 font-semibold text-white">Equipment Type</label>
                    <input
                      type="text"
                      name="equipmentType"
                      value={form.equipmentType}
                      onChange={handleChange}
                      placeholder="e.g. Chairs, Tables, Sound System"
                      className="w-full p-3 md:p-3 rounded-lg border border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400 text-white text-base md:text-base"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 md:mb-2 font-semibold text-white">Quantity</label>
                    <input
                      type="number"
                      name="equipmentQuantity"
                      value={form.equipmentQuantity}
                      onChange={handleChange}
                      placeholder="Number of items"
                      className="w-full p-3 md:p-3 rounded-lg border border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400 text-white text-base md:text-base"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 md:mb-2 font-semibold text-white">Rental Date</label>
                    <input
                      type="date"
                      name="rentalDate"
                      value={form.rentalDate}
                      onChange={handleChange}
                      className="w-full p-3 md:p-3 rounded-lg border border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400 text-white text-base md:text-base"
                    />
                  </div>
                </>
              )}

              {/* Staff-specific field */}
              {selectedQuote === "Staff" && (
                <div>
                  <label className="block mb-1 md:mb-2 font-semibold text-white">Staff Type</label>
                  <select
                    name="staffType"
                    value={form.staffType}
                    onChange={handleChange}
                    className="w-full p-3 md:p-3 rounded-lg border border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400 text-white bg-[#001f3f] text-base md:text-base"
                  >
                    <option value="">Select staff type</option>
                    {staffOptions.map((s) => (
                      <option key={s} className="bg-white text-black">{s}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Location */}
              <div className="md:col-span-2">
                <label className="block mb-1 md:mb-2 font-semibold text-white">Location / Venue</label>
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="Venue or address"
                  className="w-full p-3 md:p-3 rounded-lg border border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400 text-white text-base md:text-base"
                />
              </div>

              {/* Details */}
              <div className="md:col-span-2">
                <label className="block mb-1 md:mb-2 font-semibold text-white">Special Requests / Additional Details</label>
                <textarea
                  name="details"
                  value={form.details}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell us more..."
                  className="w-full p-3 md:p-3 rounded-lg border border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400 text-white text-base md:text-base"
                ></textarea>
              </div>

              {/* Submit */}
              <div className="md:col-span-2 text-center mt-4 md:mt-6">
                <button
                  type="submit"
                  className="bg-orange-500 text-white px-8 md:px-12 py-3 md:py-4 rounded-full font-semibold text-base md:text-lg hover:bg-white hover:text-[#001f3f] border-2 border-orange-500 transition-all duration-300 shadow-lg active:scale-95"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </section>
      )}

      {/* Contact Info Card */}
      <section className="py-12 md:py-16 px-4 md:px-6 text-center">
        <div className="max-w-3xl mx-auto bg-[#001f3f] rounded-2xl shadow-md p-6 md:p-10 border border-orange-500">
          <h3 className="text-xl md:text-2xl font-semibold text-white mb-4 md:mb-6">Prefer to talk to us directly?</h3>
          <p className="text-white mb-6 md:mb-8 text-sm md:text-base">You can contact us anytime through the following channels:</p>
          <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 text-base md:text-lg">
            <div className="flex items-center gap-2 justify-center text-white">
              <FaPhoneAlt className="text-orange-500" /> <span>+254 722 440 643</span>
            </div>
            <div className="flex items-center gap-2 justify-center text-white">
              <FaEnvelope className="text-orange-500" /> <span>info@hiroservices.co.ke</span>
            </div>
            <div className="flex items-center gap-2 justify-center text-white">
              <FaWhatsapp className="text-orange-500" /> <span>+254 796 273 218</span>
            </div>
          </div>
        </div>
      </section>

      {/* Animations */}
      <style jsx>{`
        .animate-slide-in { animation: slideIn 0.5s ease forwards; }
        @keyframes slideIn { 0% { transform: translateY(-20px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }

        @keyframes bip-text { 0%,100% { opacity: 1; transform: translateY(0) scale(1); } 50% { opacity: 0.7; transform: translateY(-4px) scale(1.05); } }
        .animate-bip-text { animation: bip-text 1s infinite; }

        @keyframes wiggle { 0%,100% { transform: rotate(0deg); } 25% { transform: rotate(-10deg); } 75% { transform: rotate(10deg); } }
        .wiggle-arrow { animation: wiggle 1s infinite; transform-origin: center bottom; }
      `}</style>
    </div>
  );
}