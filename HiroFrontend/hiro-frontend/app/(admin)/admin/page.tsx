"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Users, Box, Calendar, FileText, Bell, MessageCircle } from "lucide-react";

const reminders = [
  { icon: <Bell className="inline w-5 h-5 mr-2 text-[#ffb347]" />, text: "Check new client bookings today!" },
  { icon: <Bell className="inline w-5 h-5 mr-2 text-[#ffb347]" />, text: "Update available equipment inventory." },
  { icon: <MessageCircle className="inline w-5 h-5 mr-2 text-[#ffb347]" />, text: "Review new messages from clients." },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);
  const [currentReminder, setCurrentReminder] = useState(0);
  const [loadingAuth, setLoadingAuth] = useState(true);

  // Check admin role
  useEffect(() => {
    const role = localStorage.getItem("userRole");
    const name = localStorage.getItem("userName");

    if (!role) {
      // localStorage not populated yet, wait
      return;
    }

    if (role !== "admin") {
      router.push("/login");
    } else {
      setUserName(name);
    }

    setLoadingAuth(false);
  }, [router]);

  // Cycle reminders
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReminder((prev) => (prev + 1) % reminders.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  if (loadingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#001f3f] font-semibold">
        Loading admin dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white relative text-gray-900 flex flex-col">
      {/* Logo watermark */}
      <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
        <img src="/logo.png" alt="Hiro Logo" className="max-w-3xl w-full px-6 sm:px-0" />
      </div>

      {/* Welcome Section */}
      <section className="z-10 relative p-6 sm:p-10 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-2 text-[#001f3f]">
          Welcome, <span className="text-[#ffb347]">{userName}</span>!
        </h2>
        <p className="text-md sm:text-lg text-[#001f3f]">
          Focus on today’s tasks at <span className="text-[#ffb347]">Hiro Catering & Equipment</span>
        </p>
      </section>

      {/* Reminder Section */}
      <section className="z-10 relative p-4 sm:p-6 flex justify-center mb-8">
        <div className="bg-white border border-gray-200 text-[#001f3f] px-4 sm:px-8 py-3 sm:py-4 rounded-2xl shadow-lg w-full max-w-xl text-center transition-transform duration-700 ease-in-out">
          <p className="text-sm sm:text-lg font-medium">
            {reminders[currentReminder].icon}
            <span className="text-[#ffb347]">{reminders[currentReminder].text}</span>
          </p>
        </div>
      </section>

      {/* Admin Action Cards */}
      <main className="z-10 relative flex-1 p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 flex flex-col items-center hover:scale-105 transition-transform">
          <Users className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 text-[#001f3f]" />
          <h3 className="font-semibold text-lg sm:text-xl mb-1 sm:mb-2 text-[#001f3f]">
            Manage <span className="text-[#ffb347]">Users</span>
          </h3>
          <p className="text-gray-700 text-sm sm:text-base text-center">
            Add, edit, or remove clients and staff accounts.
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 flex flex-col items-center hover:scale-105 transition-transform">
          <Box className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 text-[#001f3f]" />
          <h3 className="font-semibold text-lg sm:text-xl mb-1 sm:mb-2 text-[#001f3f]">
            Manage <span className="text-[#ffb347]">Equipment</span>
          </h3>
          <p className="text-gray-700 text-sm sm:text-base text-center">
            Track, update, and organize catering equipment inventory.
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 flex flex-col items-center hover:scale-105 transition-transform">
          <Calendar className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 text-[#001f3f]" />
          <h3 className="font-semibold text-lg sm:text-xl mb-1 sm:mb-2 text-[#001f3f]">
            Manage <span className="text-[#ffb347]">Bookings</span>
          </h3>
          <p className="text-gray-700 text-sm sm:text-base text-center">
            View, update, and confirm client bookings and events.
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 flex flex-col items-center hover:scale-105 transition-transform">
          <FileText className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 text-[#001f3f]" />
          <h3 className="font-semibold text-lg sm:text-xl mb-1 sm:mb-2 text-[#001f3f]">
            View <span className="text-[#ffb347]">Quotes</span>
          </h3>
          <p className="text-gray-700 text-sm sm:text-base text-center">
            Review all client quotes and requests in one place.
          </p>
        </div>
      </main>
    </div>
  );
}