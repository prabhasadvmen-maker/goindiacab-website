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
    <div className="fixed inset-0 z-[60] bg-white xl:hidden flex flex-col h-[100dvh]">
      {/* Mobile Drawer Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
        <Image src={siteConfig.logo} alt={siteConfig.name} width={150} height={42} className="h-10 w-auto" />
        <button onClick={onClose} className="p-2 text-gray-700 hover:text-gray-900 rounded-lg">
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Drawer Navigation List */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <nav className="flex flex-col space-y-2">
          {/* Blog Link */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs">
            <Link
              href="/blogs"
              onClick={onClose}
              className="flex items-center space-x-2.5 p-3.5 font-semibold text-sm text-gray-800 hover:text-[#0B4A9C] transition"
            >
              <span className="text-[#0B4A9C]">
                <FileText className="w-4 h-4" />
              </span>
              <span>Blog</span>
            </Link>
          </div>

          {/* Download App Link */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs">
            <Link
              href="/download-app"
              onClick={onClose}
              className="flex items-center space-x-2.5 p-3.5 font-semibold text-sm text-gray-800 hover:text-[#0B4A9C] transition"
            >
              <span className="text-[#0B4A9C]">
                <Smartphone className="w-4 h-4" />
              </span>
              <span>Download App</span>
            </Link>
          </div>

          {/* Login Link */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs">
            <Link
              href="/login"
              onClick={onClose}
              className="flex items-center space-x-2.5 p-3.5 font-semibold text-sm text-gray-800 hover:text-[#0B4A9C] transition"
            >
              <span className="text-[#0B4A9C]">
                <LogIn className="w-4 h-4" />
              </span>
              <span>Login</span>
            </Link>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer Bottom Call-to-Actions */}
      <div className="p-4 border-t border-gray-200 bg-white space-y-2.5">
        <a
          href={`tel:${siteConfig.phone.booking1}`}
          className="flex items-center justify-center w-full py-3 bg-[#0B4A9C] text-white rounded-xl font-bold text-sm hover:bg-[#093d82] transition shadow-xs"
        >
          <Phone className="w-4 h-4 mr-2" />
          Call {siteConfig.phone.booking1}
        </a>
        <Link
          href="/paynow"
          onClick={onClose}
          className="flex items-center justify-center w-full py-3 bg-[#F27A1A] text-white rounded-xl font-bold text-sm hover:bg-[#d96912] transition shadow-xs"
        >
          <CreditCard className="w-4 h-4 mr-2" />
          Pay Now Online <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
    </div>
  );
}

