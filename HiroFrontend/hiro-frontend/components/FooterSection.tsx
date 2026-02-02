"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Facebook,
  Instagram,
  Phone,
  Mail,
  MapPin,
  Clock,
  Heart,
} from "lucide-react";

export default function Footer() {
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services/hiring-catering-equipment" },
    { name: "Gallery", href: "/gallery" },
    { name: "Get Quote", href: "/get-quote" },
    { name: "Contact Us", href: "/contact" },
  ];

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-[#001f3f] text-gray-300 font-['Figtree'] pt-16 pb-8 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-3 tracking-wide">
            Hiro Catering
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            Creating unforgettable dining experiences, from weddings and
            corporate events to private celebrations.
          </p>

          <div className="flex gap-4 mt-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-orange-500/10 hover:bg-orange-500/20 transition"
            >
              <Facebook className="text-orange-400" size={18} />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-orange-500/10 hover:bg-orange-500/20 transition"
            >
              <Instagram className="text-orange-400" size={18} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            {links.map((link) => {
              const isActive = pathname === link.href;

              return (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    onClick={handleScrollTop}
                    className={`block transition-colors ${
                      isActive
                        ? "text-orange-400 font-semibold"
                        : "hover:text-orange-400"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">
            Get in Touch
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-orange-400 shrink-0" />
              <span>+254 722 440 643</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-orange-400 shrink-0" />
              <span>+254 796 273 218</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-orange-400 shrink-0" />
              <span className="break-all">
                info@hiroservices.co.ke
              </span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} className="text-orange-400 shrink-0" />
              <span>Nairobi, Kenya</span>
            </li>
            <li className="flex items-center gap-2">
              <Clock size={16} className="text-orange-400 shrink-0" />
              <span>Mon - Sat: 8am - 6pm</span>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">
            Stay Updated
          </h3>
          <p className="text-gray-400 text-sm mb-3">
            Subscribe to get our latest menus, offers, and updates.
          </p>

          <form className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <button
              type="submit"
              className="w-full px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-500 flex flex-col sm:flex-row items-center justify-center gap-2 px-4">
        <span>
          © {new Date().getFullYear()} Hiro Catering and Equipments. All rights reserved.
        </span>
        <span className="flex items-center gap-1">
          <Heart size={14} className="text-orange-400" />
          <span>Crafted by Stephen Otwabe</span>
        </span>
      </div>
    </footer>
  );
}