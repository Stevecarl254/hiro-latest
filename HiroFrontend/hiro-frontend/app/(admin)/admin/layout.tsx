"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import {
  FaHome,
  FaUsers,
  FaBoxOpen,
  FaFileAlt,
  FaEnvelope,
  FaBars,
  FaImages,
  FaClipboardCheck,
  FaSignOutAlt,
} from "react-icons/fa";
import Link from "next/link";
import axiosInstance from "@/lib/axiosInstance";
import axios from "axios";
import { io, Socket } from "socket.io-client";
import { useRouter } from "next/navigation";

/* =========================
   TYPES
========================= */
interface AdminLayoutProps {
  children: ReactNode;
}

interface Quote {
  _id: string;
}

interface Message {
  _id: string;
}

/* =========================
   CONFIG
========================= */
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

/* =========================
   COMPONENT
========================= */
export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [newQuotesCount, setNewQuotesCount] = useState(0);
  const [newBookingsCount, setNewBookingsCount] = useState(0);
  const [newMessagesCount, setNewMessagesCount] = useState(0);
  const [adminName, setAdminName] = useState("Admin");

  const socketRef = useRef<Socket | null>(null);
  const isMountedRef = useRef(false);
  const router = useRouter();

  /* =========================
     LOCAL STORAGE HELPERS
  ========================== */
  const getSeenQuotes = (): string[] => {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem("seenQuotes") || "[]");
  };

  const getReadMessages = (): string[] => {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem("readMessages") || "[]");
  };

  const getSeenBookings = (): string[] => {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem("seenBookings") || "[]");
  };

  const markAllAsSeen = () => {
    if (typeof window === "undefined") return;
    // This is a generic helper if needed
    window.dispatchEvent(new Event("storage"));
  };

  /* =========================
     FETCH ADMIN INFO
  ========================== */
  const fetchAdminName = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) return handleLogout();

    try {
      const res = await axios.get(`${API_BASE}/api/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdminName(res.data.user?.name.split(" ")[0] || "Admin");
    } catch (err) {
      console.error("Failed to fetch admin info:", err);
      handleLogout();
    }
  };

  /* =========================
     INITIAL FETCH
  ========================== */
  const fetchInitialCounts = async () => {
    try {
      const [quotesRes, messagesRes, bookingsRes] = await Promise.all([
        axiosInstance.get("/api/quotes"),
        axiosInstance.get("/api/messages"),
        axiosInstance.get("/api/equipment-bookings"),
      ]);

      const quotes: any[] = quotesRes.data.data || [];
      const messages: any[] = messagesRes.data.data || [];
      const bookings: any[] = bookingsRes.data.data || [];

      setNewQuotesCount(
        quotes.filter((q) => !getSeenQuotes().includes(q.id)).length
      );
      setNewMessagesCount(
        messages.filter((m) => !getReadMessages().includes(m.id)).length
      );
      setNewBookingsCount(
        bookings.filter((b) => !getSeenBookings().includes(b.id)).length
      );
    } catch (err) {
      console.error("Initial fetch error:", err);
    }
  };

  /* =========================
     SOCKET SETUP
  ========================== */
  useEffect(() => {
    if (isMountedRef.current) return;
    isMountedRef.current = true;

    fetchAdminName();
    fetchInitialCounts();

    const socket = io(API_BASE, { transports: ["websocket"], reconnection: true });
    socketRef.current = socket;

    socket.on("newQuote", (quote: any) => {
      const id = quote.id || quote._id;
      if (!getSeenQuotes().includes(id)) setNewQuotesCount((prev) => prev + 1);
    });

    socket.on("newMessage", (msg: any) => {
      const id = msg.id || msg._id;
      if (!getReadMessages().includes(id)) setNewMessagesCount((prev) => prev + 1);
    });

    socket.on("newEquipmentBooking", (booking: any) => {
      if (!getSeenBookings().includes(booking.id)) setNewBookingsCount((prev) => prev + 1);
    });

    // Listen for storage changes from other pages (e.g. marking messages as read)
    const handleStorageChange = () => {
      fetchInitialCounts();
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      socket.disconnect();
      socketRef.current = null;
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  /* =========================
     LOGOUT
  ========================== */
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    router.push("/login");
  };

  /* =========================
     MENU
  ========================== */
  const menuItems = [
    { name: "Dashboard", icon: <FaHome />, href: "/admin" },
    { name: "Equipment Bookings", icon: <FaClipboardCheck />, href: "/admin/equipment-bookings", badge: newBookingsCount },
    { name: "Staff", icon: <FaUsers />, href: "/admin/staff" },
    { name: "Equipment", icon: <FaBoxOpen />, href: "/admin/equipment" },
    { name: "Quotes", icon: <FaEnvelope />, href: "/admin/quotes", badge: newQuotesCount },
    { name: "Messages", icon: <FaEnvelope />, href: "/admin/messages", badge: newMessagesCount },
    { name: "Gallery", icon: <FaImages />, href: "/admin/gallery" },
    { name: "Reports", icon: <FaFileAlt />, href: "/admin/reports" },
  ];

  /* =========================
     UI
  ========================== */
  return (
    <div className="flex h-screen bg-gray-100">

      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside className={`${isSidebarOpen ? "w-64" : "w-20"} hidden md:flex flex-col bg-[#001f3f] text-white transition-all duration-300 shadow-xl`}>
        <div className="flex items-center justify-between p-4 border-b border-white/20">
          <span className={`${!isSidebarOpen && "hidden"} text-lg font-bold`}>Hiro Admin</span>
          <button className="p-2 rounded hover:bg-white/10 transition" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <FaBars />
          </button>
        </div>

        <nav className="flex-1 mt-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 hover:bg-[#FF6600] transition-colors ${!isSidebarOpen ? "justify-center" : ""} relative`}
            >
              <span className="text-lg">{item.icon}</span>
              {isSidebarOpen && <span className="font-medium">{item.name}</span>}
              {item.badge && item.badge > 0 && (
                <span className="absolute top-2 right-4 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full animate-pulse">{item.badge}</span>
              )}
            </Link>
          ))}
        </nav>
      </aside>

      {/* ================= MOBILE SIDEBAR ================= */}
      <div className={`md:hidden fixed inset-0 z-50 flex transition-transform ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="w-64 bg-[#001f3f] text-white flex flex-col shadow-xl">
          <div className="flex items-center justify-between p-4 border-b border-white/20">
            <span className="text-lg font-bold">Hiro Admin</span>
            <button className="p-2 rounded hover:bg-white/10 transition" onClick={() => setIsMobileSidebarOpen(false)}>
              <FaBars />
            </button>
          </div>

          <nav className="flex-1 mt-4 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 hover:bg-[#FF6600] transition-colors relative"
                onClick={() => setIsMobileSidebarOpen(false)}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
                {item.badge && item.badge > 0 && (
                  <span className="absolute top-2 right-4 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full animate-pulse">{item.badge}</span>
                )}
              </Link>
            ))}

            {/* Mobile Logout */}
            <button
              className="flex items-center gap-2 px-4 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl m-4 transition"
              onClick={() => { handleLogout(); setIsMobileSidebarOpen(false); }}
            >
              <FaSignOutAlt /> Logout
            </button>
          </nav>
        </div>

        {/* Overlay */}
        <div className="flex-1 bg-black/40" onClick={() => setIsMobileSidebarOpen(false)} />
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* ================= HEADER / NAVBAR ================= */}
        <header className="flex items-center justify-between bg-white p-4 shadow flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <button className="md:hidden p-2 rounded hover:bg-gray-200 transition" onClick={() => setIsMobileSidebarOpen(true)}>
              <FaBars className="text-[#001f3f]" />
            </button>
            <h1 className="text-xl font-semibold text-[#001f3f] truncate hidden sm:block">Dashboard</h1>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
            <span className="text-gray-700 font-medium truncate hidden md:block">Welcome, {adminName}</span>
            <button
              className="flex items-center gap-2 px-4 py-1.5 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-full transition whitespace-nowrap"
              onClick={handleLogout}
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}