"use client";

import { io as socketIOClient } from "socket.io-client";
import axiosInstance from "@/lib/axiosInstance";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Mail,
  User,
  Trash2,
  X,
  MessageSquare,
  Coffee,
  Box,
} from "lucide-react";

interface Message {
  id: string; // matches backend UUID
  fullName: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Message | null>(null);
  const [error, setError] = useState("");

  const getReadMessages = (): string[] => {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem("readMessages") || "[]");
  };

  const markAsRead = (ids: string[]) => {
    const read = getReadMessages();
    ids.forEach((id) => {
      if (!read.includes(id)) read.push(id);
    });
    localStorage.setItem("readMessages", JSON.stringify(read));
    window.dispatchEvent(new Event("storage"));
  };

  const fetchMessages = async () => {
    try {
      const res = await axiosInstance.get("/api/messages"); // use axiosInstance
      const msgs: Message[] = res.data.data || [];

      // sort unread first
      const readIds = getReadMessages();
      msgs.sort((a, b) => {
        const aRead = readIds.includes(a.id);
        const bRead = readIds.includes(b.id);
        if (aRead === bRead)
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        return aRead ? 1 : -1;
      });

      setMessages(msgs);
      markAsRead(msgs.map((m) => m.id));
    } catch (err) {
      console.error("Failed to fetch messages", err);
      setError("Failed to load messages.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();

    const socket = socketIOClient(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000");

    socket.on("connect", () => {
      console.log("Connected to socket:", socket.id);
    });

    socket.on("newMessage", (msg: Message) => {
      setMessages((prev) => [msg, ...prev]);
      markAsRead([msg.id]);
      setTimeout(() => {
        document.getElementById(`msg-${msg.id}`)?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;

    try {
      await axiosInstance.delete(`/api/messages/${deleteTarget.id}`);
      setMessages((prev) => prev.filter((m) => m.id !== deleteTarget.id));
    } catch (err) {
      console.error("Delete failed", err);
      setError("Delete failed. Please try again.");
    } finally {
      setDeleteTarget(null);
    }
  };

  const readMessages = getReadMessages();

  return (
    <div className="relative space-y-8 p-4 sm:p-6">
      {/* Background Icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Coffee className="absolute top-10 left-4 sm:left-10 w-24 sm:w-32 h-24 sm:h-32 text-[#00b8e6]/10" />
        <Box className="absolute top-60 right-4 sm:right-20 w-36 sm:w-48 h-36 sm:h-48 text-[#00b8e6]/10 rotate-12" />
        <Coffee className="absolute bottom-40 left-8 sm:left-32 w-32 sm:w-40 h-32 sm:h-40 text-[#00b8e6]/10 -rotate-6" />
        <Box className="absolute bottom-10 right-4 sm:right-10 w-28 sm:w-36 h-28 sm:h-36 text-[#00b8e6]/10 rotate-45" />
      </div>

      {/* Header */}
      <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between z-10 gap-2 sm:gap-0">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#002366] flex items-center gap-2">
          <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7" />
          Messages
        </h2>
        <span className="text-gray-500 text-sm sm:text-base">{messages.length} total messages</span>
      </div>

      {/* Loading */}
      {loading && <p className="text-gray-500 animate-pulse relative z-10">Loading messages...</p>}

      {/* Error */}
      {error && !loading && <p className="text-red-500 relative z-10">{error}</p>}

      {/* Empty State */}
      {!loading && messages.length === 0 && (
        <div className="bg-white p-6 sm:p-10 rounded-2xl shadow text-center relative z-10">
          <Mail className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 text-sm sm:text-base">No messages received yet.</p>
        </div>
      )}

      {/* Messages List */}
      <div className="relative z-10 flex flex-col divide-y divide-gray-200">
        {messages.map((msg) => {
          const isRead = readMessages.includes(msg.id);
          const preview = msg.message.length > 80 ? msg.message.slice(0, 80) + "..." : msg.message;

          return (
            <div
              key={msg.id}
              id={`msg-${msg.id}`}
              className={`relative flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 sm:p-6 cursor-pointer hover:bg-gray-50 transition ${!isRead ? "bg-[#e6f7ff]" : "bg-white"
                }`}
              onClick={() => {
                setSelectedMessage(msg);
                markAsRead([msg.id]);
              }}
            >
              {/* Unread Badge */}
              {!isRead && (
                <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  Unread
                </span>
              )}

              <div className="flex-1">
                <h3 className={`font-semibold ${!isRead ? "text-[#002366]" : "text-gray-800"}`}>
                  {msg.subject}
                </h3>
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 text-gray-500 text-sm mt-1 sm:mt-2">
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {msg.fullName}
                  </span>
                  <span className="flex items-center gap-1 mt-1 sm:mt-0">
                    <Mail className="w-4 h-4" />
                    {msg.email}
                  </span>
                </div>
                <p className="text-gray-600 mt-2 sm:mt-4 text-sm line-clamp-2">
                  {preview} <span className="text-blue-600 font-medium">Click to open</span>
                </p>
              </div>

              <div className="flex items-center gap-4 mt-2 sm:mt-0">
                <span className="text-xs text-gray-400">
                  {new Date(msg.createdAt).toLocaleString()}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteTarget(msg);
                  }}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* View Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-0">
          <div className="bg-white max-w-sm sm:max-w-lg w-full rounded-2xl p-4 sm:p-6 relative">
            <button
              onClick={() => setSelectedMessage(null)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-500"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <h3 className="text-lg sm:text-2xl font-bold text-[#002366] mb-2 sm:mb-4">
              {selectedMessage.subject}
            </h3>

            <p className="text-gray-700 text-sm sm:text-base whitespace-pre-line">
              {selectedMessage.message}
            </p>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-0">
          <div className="bg-white rounded-2xl p-4 sm:p-6 max-w-xs sm:max-w-sm w-full text-center">
            <h3 className="text-lg sm:text-xl font-bold text-[#002366] mb-3">
              Delete Message?
            </h3>

            <div className="flex justify-center gap-3 sm:gap-4">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-3 sm:px-4 py-1 sm:py-2 rounded-md border text-xs sm:text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-3 sm:px-4 py-1 sm:py-2 rounded-md bg-red-600 text-white text-xs sm:text-sm"
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