"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/src/config/site";
import { Phone, Smartphone, User, Menu } from "lucide-react";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white z-50 sticky top-0 border-b border-gray-200/80 shadow-sm">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
        
        {/* Left: Brand Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src={siteConfig.logo}
            alt={siteConfig.name}
            width={200}
            height={55}
            className="w-auto h-9 sm:h-11 md:h-12 object-contain"
            priority
          />
        </Link>

        {/* Center: 24x7 Call Badge (Exact Savaari style badge from screenshot) */}
        <div className="hidden md:flex items-center justify-center">
          <a
            href={`tel:${siteConfig.phone.booking1}`}
            className="inline-flex items-center rounded-lg border-2 border-[#00A5D9] bg-white text-[#00A5D9] overflow-hidden text-xs sm:text-sm font-black hover:opacity-90 transition-all shadow-sm"
          >
            <span className="bg-[#00A5D9] text-white px-3 py-1.5 flex items-center gap-1.5 font-bold">
              <Phone className="w-3.5 h-3.5 fill-current" />
              24x7
            </span>
            <span className="px-3.5 py-1.5 tracking-wide text-[#00A5D9] font-black">
              {siteConfig.phone.booking1}
            </span>
          </a>
        </div>

        {/* Right Nav Links: Blog, Download App, Login */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          <Link
            href="/blogs"
            className="hidden sm:inline-block text-xs sm:text-sm font-bold text-gray-700 hover:text-[#00A5D9] transition-colors"
          >
            Blog
          </Link>

          <Link
            href="/download-app"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-300 hover:border-[#00A5D9] text-gray-700 hover:text-[#00A5D9] font-bold text-xs transition-all shadow-sm"
          >
            <Smartphone className="w-3.5 h-3.5 text-[#00A5D9]" />
            <span>Download App</span>
          </Link>

          <Link
            href="/login"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-300 hover:border-[#00A5D9] text-gray-700 hover:text-[#00A5D9] font-bold text-xs transition-all shadow-sm"
          >
            <User className="w-3.5 h-3.5 text-gray-500" />
            <span>Login</span>
          </Link>

          {/* Mobile Phone Call Button */}
          <a
            href={`tel:${siteConfig.phone.booking1}`}
            className="md:hidden flex items-center justify-center p-2 rounded-lg bg-[#00A5D9] text-white"
          >
            <Phone className="w-4 h-4" />
          </a>

          {/* Mobile Menu Button */}
          <button
            className="xl:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition cursor-pointer"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

      </div>

      {/* Mobile Menu Drawer */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </header>
  );
}
