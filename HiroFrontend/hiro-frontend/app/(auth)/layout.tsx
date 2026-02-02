import "../globals.css";
import { Figtree } from "next/font/google";
import { ReactNode } from "react";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main
      className={`
        ${figtree.className}
        min-h-screen
        w-full
        flex
        items-center
        justify-center
        bg-gradient-to-b from-[#001f3f] via-[#4da6ff] to-[#e6f2ff]
        px-3 sm:px-6
        overflow-x-hidden
      `}
    >
      <div
        className="
          w-full
          max-w-md
          bg-white
          bg-opacity-95
          backdrop-blur-md
          shadow-2xl
          rounded-3xl
          p-6 sm:p-10
        "
      >
        {children}
      </div>
    </main>
  );
}