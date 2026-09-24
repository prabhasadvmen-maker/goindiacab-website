"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/src/config/site";
import { navItems } from "@/src/config/navigation";
import { X, ChevronDown, Phone, CreditCard, ArrowRight, FileText, Smartphone, LogIn, Home, Users, Car, MapPin, MapIcon, Bus } from "lucide-react";
import clsx from "clsx";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

function getMobileNavIcon(label: string) {
  switch (label) {
    case "Home":
      return <Home className="w-4 h-4" />;
    case "About Us":
      return <Users className="w-4 h-4" />;
    case "Taxi Packages":
      return <Car className="w-4 h-4" />;
    case "Taxi Outstation Services":
      return <MapPin className="w-4 h-4" />;
    case "Popular Routes":
      return <MapIcon className="w-4 h-4" />;
    case "Tempo Traveller in Delhi":
      return <Bus className="w-4 h-4" />;
    case "Blogs":
      return <FileText className="w-4 h-4" />;
    case "Contact Us":
      return <Phone className="w-4 h-4" />;
    case "Pay Now":
      return <CreditCard className="w-4 h-4" />;
    default:
      return null;
  }
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleAccordion = (label: string) => {
    setOpenAccordion(openAccordion === label ? null : label);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 xl:hidden">
      {/* Semi-transparent backdrop that closes menu on click (no blur) */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      
      {/* Centered card menu */}
      <div className="relative bg-gray-50 flex flex-col w-[320px] sm:w-[360px] max-h-[85vh] rounded-[1.5rem] shadow-2xl overflow-hidden border border-white">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white">
          <div className="flex items-center h-10">
            <Image src={siteConfig.logo} alt={siteConfig.name} width={160} height={45} className="h-full w-auto object-contain" />
          </div>
          <button onClick={onClose} className="p-1.5 text-gray-500 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50/80">
          <nav className="flex flex-col space-y-2.5">
            {/* Blog Link */}
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-md transition-shadow">
              <Link
                href="/blogs"
                onClick={onClose}
                className="flex items-center space-x-3 p-3 font-bold text-sm text-gray-700 hover:text-[#00A5D9] transition-colors"
              >
                <div className="w-9 h-9 rounded-[10px] bg-blue-50/80 text-[#00A5D9] flex items-center justify-center border border-blue-100">
                  <FileText className="w-4 h-4" />
                </div>
                <span>Blog</span>
              </Link>
            </div>

            {/* Download App Link */}
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-md transition-shadow">
              <Link
                href="/download-app"
                onClick={onClose}
                className="flex items-center space-x-3 p-3 font-bold text-sm text-gray-700 hover:text-[#00A5D9] transition-colors"
              >
                <div className="w-9 h-9 rounded-[10px] bg-blue-50/80 text-[#00A5D9] flex items-center justify-center border border-blue-100">
                  <Smartphone className="w-4 h-4" />
                </div>
                <span>Download App</span>
              </Link>
            </div>

            {/* Login Link */}
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-md transition-shadow">
              <Link
                href="/login"
                onClick={onClose}
                className="flex items-center space-x-3 p-3 font-bold text-sm text-gray-700 hover:text-[#00A5D9] transition-colors"
              >
                <div className="w-9 h-9 rounded-[10px] bg-blue-50/80 text-[#00A5D9] flex items-center justify-center border border-blue-100">
                  <LogIn className="w-4 h-4" />
                </div>
                <span>Login</span>
              </Link>
            </div>
          </nav>
        </div>

        {/* Bottom Call-to-Actions */}
        <div className="p-4 border-t border-gray-100 bg-white space-y-2.5">
          <a
            href={`tel:${siteConfig.phone.booking1}`}
            className="flex items-center justify-center w-full py-3 bg-[#0B4A9C] text-white rounded-xl font-bold text-sm hover:bg-[#093d82] transition shadow-md"
          >
            <Phone className="w-4 h-4 mr-2" />
            Call {siteConfig.phone.booking1}
          </a>
          <Link
            href="/paynow"
            onClick={onClose}
            className="flex items-center justify-center w-full py-3 bg-gradient-to-r from-[#FF6600] to-[#e65200] text-white rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition active:scale-[0.98]"
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Pay Now Online <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}

