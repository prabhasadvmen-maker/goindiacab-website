"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/src/config/site";
import { navItems } from "@/src/config/navigation";
import { X, ChevronDown, Phone, CreditCard, ArrowRight, Home, Users, Car, MapPin, Map, Bus, FileText } from "lucide-react";
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
      return <Map className="w-4 h-4" />;
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
          {navItems.map((item) => (
            <div key={item.label} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs">
              {item.children ? (
                <div>
                  <button
                    onClick={() => toggleAccordion(item.label)}
                    className="flex items-center justify-between w-full p-3.5 text-left font-semibold text-gray-800 hover:text-[#0B4A9C]"
                  >
                    <div className="flex items-center space-x-2.5">
                      <span className="text-[#0B4A9C]">{getMobileNavIcon(item.label)}</span>
                      <span className="text-sm">{item.label}</span>
                    </div>
                    <ChevronDown className={clsx("w-4 h-4 text-gray-500 transition-transform", openAccordion === item.label ? "rotate-180 text-[#0B4A9C]" : "")} />
                  </button>
                  <div className={clsx("overflow-hidden transition-all duration-200", openAccordion === item.label ? "max-h-[500px] border-t border-gray-100 bg-blue-50/50" : "max-h-0")}>
                    <div className="flex flex-col py-2 px-4 space-y-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          onClick={onClose}
                          className="text-xs font-medium text-gray-700 hover:text-[#0B4A9C] py-1.5 transition"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={clsx(
                    "flex items-center space-x-2.5 p-3.5 font-semibold text-sm transition",
                    item.label === "Home" ? "bg-[#0B4A9C] text-white" : "text-gray-800 hover:text-[#0B4A9C]"
                  )}
                >
                  <span className={item.label === "Home" ? "text-white" : "text-[#0B4A9C]"}>
                    {getMobileNavIcon(item.label)}
                  </span>
                  <span>{item.label}</span>
                </Link>
              )}
            </div>
          ))}
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

