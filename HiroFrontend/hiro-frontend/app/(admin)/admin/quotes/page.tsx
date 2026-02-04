"use client";

import axiosInstance from "@/lib/axiosInstance";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaBell, FaTrash, FaPrint, FaCheckSquare, FaSquare } from "react-icons/fa";
import { io } from "socket.io-client";

interface Quote {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  quoteType: "Event" | "Equipment" | "EquipmentRepair" | "Staff";
  eventType?: string;
  eventDate?: string;
  guests?: number;
  equipmentType?: string;
  equipmentQuantity?: number;
  rentalDate?: string;
  staffType?: string;
  location?: string;
  details?: string;
  read: boolean;
  createdAt: string;
}

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [newQuotes, setNewQuotes] = useState<string[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [quoteToDelete, setQuoteToDelete] = useState<string | null>(null);

  /* -------------------- SEEN LOGIC -------------------- */
  const getSeenQuotes = (): string[] =>
    JSON.parse(localStorage.getItem("seenQuotes") || "[]");

  const markAsSeen = (id: string) => {
    const seen = getSeenQuotes();
    if (!seen.includes(id)) {
      seen.push(id);
      localStorage.setItem("seenQuotes", JSON.stringify(seen));
    }
  };

  /* -------------------- FETCH -------------------- */
  const fetchQuotes = async () => {
    try {
      // Use axiosInstance instead of raw axios
      const res = await axiosInstance.get("/api/quotes");
      const data: Quote[] = res.data.data || [];

      // Track unseen/new quotes
      const seen = getSeenQuotes();
      setNewQuotes(data.filter((q) => !seen.includes(q.id)).map((q) => q.id));

      setQuotes(data);
    } catch (err) {
      console.error("Failed to fetch quotes:", err);
    }
  };

  /* -------------------- SOCKET -------------------- */
  useEffect(() => {
    fetchQuotes();

    // Use environment variable or fallback to localhost
    const socket = io(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000");

    socket.on("connect", () => {
      console.log("Connected to quotes socket:", socket.id);
    });

    socket.on("newQuote", (quote: Quote) => {
      setQuotes((prev) => [quote, ...prev]);
      setNewQuotes((prev) => [...prev, quote.id]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  /* -------------------- DELETE -------------------- */
  const handleDelete = async () => {
    if (!quoteToDelete) return;
    try {
      await axiosInstance.delete(`/api/quotes/${quoteToDelete}`);

      setQuotes((prev) => prev.filter((q) => q.id !== quoteToDelete));
      setNewQuotes((prev) => prev.filter((id) => id !== quoteToDelete));

      const seen = getSeenQuotes().filter((id) => id !== quoteToDelete);
      localStorage.setItem("seenQuotes", JSON.stringify(seen));
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setShowModal(false);
      setQuoteToDelete(null);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const toggleSelect = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === quotes.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(quotes.map(q => q.id));
    }
  };

  /* -------------------- UI -------------------- */
  return (
    <div
      className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 px-4 sm:px-6 py-6 max-w-7xl mx-auto print:bg-white print:p-0"
      onClick={() => {
        newQuotes.forEach(markAsSeen);
        setNewQuotes([]);
      }}
    >
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #print-area, #print-area * {
            visibility: visible;
          }
          #print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8 no-print">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#001f3f] flex items-center gap-2">
          🍽️ Quote Requests
        </h1>

        <div className="flex items-center gap-3">
          {quotes.length > 0 && (
            <>
              <button
                onClick={toggleSelectAll}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition text-sm font-medium"
              >
                {selectedIds.length === quotes.length ? <FaCheckSquare className="text-[#001f3f]" /> : <FaSquare className="text-gray-300" />}
                {selectedIds.length === quotes.length ? "Deselect All" : "Select All"}
              </button>

              {selectedIds.length > 0 && (
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-6 py-2 bg-[#001f3f] text-white rounded-xl hover:bg-[#001a35] transition shadow-lg animate-fade-in"
                >
                  <FaPrint /> Print ({selectedIds.length})
                </button>
              )}
            </>
          )}

          {newQuotes.length > 0 && (
            <div className="relative">
              <FaBell className="text-orange-500 text-2xl sm:text-3xl animate-bounce" />
              <span className="absolute -top-2 -right-2 bg-red-600 text-white px-2 py-1 text-xs rounded-full shadow-lg">
                {newQuotes.length}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* LIST */}
      {quotes.length === 0 ? (
        <p className="text-center text-gray-500 mt-20 text-lg">
          No quote requests yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quotes.map((q) => (
            <div
              key={q.id}
              className="relative bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 duration-300 overflow-hidden"
            >
              {/* CHEF HAT ICONS */}
              <div className="absolute -top-6 -right-6 text-[#00b8e6]/20 text-[6rem] select-none pointer-events-none">
                👨‍🍳
              </div>
              <div className="absolute bottom-0 -left-6 text-[#00b8e6]/20 text-[6rem] select-none pointer-events-none">
                👩‍🍳
              </div>

              {/* SELECTION CHECKBOX */}
              <button
                onClick={(e) => toggleSelect(q.id, e)}
                className="absolute top-4 left-4 z-10 text-xl no-print"
              >
                {selectedIds.includes(q.id) ? (
                  <FaCheckSquare className="text-green-500 scale-125 transition-transform" />
                ) : (
                  <FaSquare className="text-gray-200 hover:text-gray-300" />
                )}
              </button>

              {/* DELETE */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setQuoteToDelete(q.id);
                  setShowModal(true);
                }}
                className="absolute top-4 right-4 text-red-600 hover:text-red-800 p-2 z-10 no-print"
              >
                <FaTrash />
              </button>

              {/* NAME */}
              <h2 className="text-xl font-semibold text-[#001f3f] mb-3 flex items-center gap-2">
                🧑‍🍳 {q.fullName}
              </h2>

              <div className="text-sm text-gray-700 space-y-1">
                <p><b>Email:</b> {q.email}</p>
                <p><b>Phone:</b> {q.phoneNumber}</p>
                <p><b>Type:</b> {q.quoteType}</p>

                {q.eventType && <p><b>Event:</b> {q.eventType}</p>}
                {q.eventDate && (
                  <p><b>Date:</b> {new Date(q.eventDate).toLocaleDateString()}</p>
                )}
                {q.guests && <p><b>Guests:</b> {q.guests}</p>}
                {q.equipmentType && <p><b>Equipment:</b> {q.equipmentType}</p>}
                {q.equipmentQuantity && (
                  <p><b>Qty:</b> {q.equipmentQuantity}</p>
                )}
                {q.rentalDate && (
                  <p><b>Rental Date:</b> {new Date(q.rentalDate).toLocaleDateString()}</p>
                )}
                {q.staffType && <p><b>Staff Needed:</b> {q.staffType}</p>}
                {q.location && <p><b>Location:</b> {q.location}</p>}
                {q.details && (
                  <p className="italic text-gray-600 break-words mt-2">
                    <b>Details:</b> {q.details}
                  </p>
                )}
              </div>

              <p className="text-xs text-gray-400 mt-3">
                {new Date(q.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
              ⚠️ Delete Quote?
            </h3>
            <p className="text-gray-600 mb-6">
              This action cannot be undone.
            </p>
            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded w-full sm:w-auto hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded w-full sm:w-auto hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {/* PRINT AREA */}
      <div id="print-area" className="hidden">
        {quotes.filter(q => selectedIds.includes(q.id)).map((q, idx) => (
          <div key={q.id} className={`p-8 bg-white border-b-2 border-dashed border-gray-300 last:border-0 ${idx > 0 ? "page-break-before" : ""}`}>
            <div className="flex justify-between items-start mb-8 border-b-2 border-[#001f3f] pb-4">
              <div>
                <img src="/logo.png" alt="Hiro Services" className="h-20 mb-2" />
                <h1 className="text-2xl font-bold text-[#001f3f]">Hiro Catering & Equipment</h1>
                <p className="text-sm text-gray-500">Professional Hosting Services</p>
              </div>
              <div className="text-right">
                <h2 className="text-xl font-bold text-orange-600">QUOTE REQUEST</h2>
                <p className="text-sm">ID: {q.id.slice(0, 8)}</p>
                <p className="text-sm">Date: {new Date().toLocaleDateString()}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-[#001f3f] border-b mb-2">Customer Details</h3>
                <p><b>Name:</b> {q.fullName}</p>
                <p><b>Email:</b> {q.email}</p>
                <p><b>Phone:</b> {q.phoneNumber}</p>
              </div>
              <div>
                <h3 className="font-bold text-[#001f3f] border-b mb-2">Quote Specification</h3>
                <p><b>Type:</b> {q.quoteType}</p>
                {q.location && <p><b>Location:</b> {q.location}</p>}
                {q.staffType && <p><b>Staff Needed:</b> {q.staffType}</p>}
              </div>
            </div>

            {q.quoteType === "Event" ? (
              <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-bold text-[#001f3f] mb-2 text-center uppercase tracking-widest">Event Details</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Type</p>
                    <p className="font-medium">{q.eventType}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Date</p>
                    <p className="font-medium">{q.eventDate ? new Date(q.eventDate).toLocaleDateString() : "-"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Guests</p>
                    <p className="font-medium">{q.guests}</p>
                  </div>
                </div>
              </div>
            ) : (q.quoteType === "Equipment" || q.quoteType === "EquipmentRepair") && (
              <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-bold text-[#001f3f] mb-2 text-center uppercase tracking-widest">Equipment Request</h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Equipment/Repair</p>
                    <p className="font-medium">{q.equipmentType}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Quantity / Date</p>
                    <p className="font-medium">{q.equipmentQuantity} item(s) on {q.rentalDate ? new Date(q.rentalDate).toLocaleDateString() : "-"}</p>
                  </div>
                </div>
              </div>
            )}

            {q.details && (
              <div className="mb-8">
                <h3 className="font-bold text-[#001f3f] border-b mb-2">Additional Information</h3>
                <p className="text-gray-700 whitespace-pre-wrap">{q.details}</p>
              </div>
            ) || <div className="h-20"></div>}

            <div className="mt-12 text-center border-t pt-4 text-sm text-gray-400">
              <p>Hiro Catering and Equipment Services Limited</p>
              <p>Contact: +254 (0) 7XX XXX XXX | Website: hirocateringandequipment.co.ke</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}