"use client";

import axiosInstance from "@/lib/axiosInstance";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaBell, FaTrash } from "react-icons/fa";
import { io } from "socket.io-client";

interface Quote {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  quoteType: "Event" | "Equipment";
  eventType?: string;
  eventDate?: string;
  guests?: number;
  equipmentType?: string;
  equipmentQuantity?: number;
  rentalDate?: string;
  location?: string;
  details?: string;
  read: boolean;
  createdAt: string;
}

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [newQuotes, setNewQuotes] = useState<string[]>([]);
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
    const res = await axiosInstance.get("/quotes");
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
    await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/quotes/${quoteToDelete}`
    );

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

  /* -------------------- UI -------------------- */
  return (
    <div
      className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 px-4 sm:px-6 py-6 max-w-7xl mx-auto"
      onClick={() => {
        newQuotes.forEach(markAsSeen);
        setNewQuotes([]);
      }}
    >
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#001f3f] flex items-center gap-2">
          🍽️ Quote Requests
        </h1>

        {newQuotes.length > 0 && (
          <div className="relative self-start sm:self-auto">
            <FaBell className="text-orange-500 text-2xl sm:text-3xl animate-bounce" />
            <span className="absolute -top-2 -right-2 bg-red-600 text-white px-2 py-1 text-xs rounded-full shadow-lg">
              {newQuotes.length}
            </span>
          </div>
        )}
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

              {/* NEW BADGE */}
              {newQuotes.includes(q.id) && (
                <span className="absolute top-4 left-4 bg-orange-500 text-white text-xs px-3 py-1 rounded-full animate-pulse shadow">
                  NEW
                </span>
              )}

              {/* DELETE */}
              <button
                onClick={() => {
                  setQuoteToDelete(q.id);
                  setShowModal(true);
                }}
                className="absolute top-4 right-4 text-red-600 hover:text-red-800 p-2"
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
                {q.location && <p><b>Location:</b> {q.location}</p>}
                {q.details && (
                  <p className="italic text-gray-600 break-words">
                    {q.details.length > 60
                      ? q.details.slice(0, 60) + "..."
                      : q.details}
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
    </div>
  );
}