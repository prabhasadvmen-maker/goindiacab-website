"use client";

import { useState } from "react";
import { Search, ArrowLeftRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import clsx from "clsx";
import { siteConfig } from "@/src/config/site";

export function SavaariHero() {
  const [tripTab, setTripTab] = useState<"oneway" | "roundtrip" | "local" | "airport">("oneway");
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [pickupDate, setPickupDate] = useState("16-09-2026");
  const [pickupTime, setPickupTime] = useState("07:00 AM");

  const handleSwap = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fromCity) {
      alert("Please enter pickup location!");
      return;
    }
    const msg = encodeURIComponent(
      `Hi GoIndiaCab! I need a cab (${tripTab.toUpperCase()}).\nFrom: ${fromCity}\nTo: ${toCity || 'Local'}\nDate: ${pickupDate}\nTime: ${pickupTime}`
    );
    const whatsappNum = siteConfig.phone.booking1.replace(/\D/g, "");
    window.open(`https://wa.me/${whatsappNum}?text=${msg}`, "_blank");
  };

  return (
    <section className="relative w-full py-16 sm:py-24 bg-[#111827] overflow-hidden min-h-[580px] flex flex-col justify-center">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/Hero_section_iamge/goindiacab_hero_section_1.png"
          alt="GoIndiaCab Hero Background"
          fill
          className="object-cover opacity-35"
          priority
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10 w-full flex flex-col items-center">
        
        {/* Large Centered Uppercase Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white text-center tracking-tight mb-8 drop-shadow-lg uppercase">
          SERVICES ACROSS 2000+ CITIES
        </h1>

        {/* Savaari Style Floating Search Widget Card */}
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 relative border border-gray-100 mb-12">
          
          {/* Top Segmented Tab Buttons */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex flex-wrap sm:flex-nowrap border-2 border-gray-300 rounded-xl overflow-hidden shadow-sm">
              <button
                type="button"
                onClick={() => setTripTab("oneway")}
                style={{ cursor: "pointer" }}
                className={clsx(
                  "px-6 py-2.5 font-black text-xs sm:text-sm uppercase tracking-wider transition-colors cursor-pointer min-w-[110px]",
                  tripTab === "oneway"
                    ? "bg-[#00A5D9] text-white"
                    : "bg-white text-gray-800 hover:bg-gray-50"
                )}
              >
                ONE WAY
              </button>

              <button
                type="button"
                onClick={() => setTripTab("roundtrip")}
                style={{ cursor: "pointer" }}
                className={clsx(
                  "px-6 py-2.5 font-black text-xs sm:text-sm uppercase tracking-wider transition-colors border-l border-gray-300 cursor-pointer min-w-[110px]",
                  tripTab === "roundtrip"
                    ? "bg-[#00A5D9] text-white"
                    : "bg-white text-gray-800 hover:bg-gray-50"
                )}
              >
                ROUND TRIP
              </button>

              <button
                type="button"
                onClick={() => setTripTab("local")}
                style={{ cursor: "pointer" }}
                className={clsx(
                  "px-6 py-2.5 font-black text-xs sm:text-sm uppercase tracking-wider transition-colors border-l border-gray-300 cursor-pointer min-w-[110px]",
                  tripTab === "local"
                    ? "bg-[#00A5D9] text-white"
                    : "bg-white text-gray-800 hover:bg-gray-50"
                )}
              >
                LOCAL
              </button>

              <button
                type="button"
                onClick={() => setTripTab("airport")}
                style={{ cursor: "pointer" }}
                className={clsx(
                  "px-6 py-2.5 font-black text-xs sm:text-sm uppercase tracking-wider transition-colors border-l border-gray-300 cursor-pointer min-w-[110px]",
                  tripTab === "airport"
                    ? "bg-[#00A5D9] text-white"
                    : "bg-white text-gray-800 hover:bg-gray-50"
                )}
              >
                AIRPORT
              </button>
            </div>
          </div>

          <form onSubmit={handleSearch} className="relative pb-4">
            
            {/* Input Grid Columns */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center mb-6">
              
              {/* FROM Pickup Location */}
              <div className="md:col-span-4 relative">
                <label className="block text-xs font-black text-gray-800 uppercase mb-1">
                  FROM
                </label>
                <div className="relative flex items-center border-b-2 border-gray-300 focus-within:border-[#00A5D9] pb-1.5 transition-colors">
                  <Search className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                  <input
                    type="text"
                    value={fromCity}
                    onChange={(e) => setFromCity(e.target.value)}
                    placeholder="Enter Pickup Location"
                    className="w-full text-xs sm:text-sm font-bold text-gray-900 placeholder-gray-400 focus:outline-none bg-transparent"
                    required
                  />
                </div>
                <span className="text-[10px] font-semibold text-rose-500 mt-1 block">
                  Please select from Dropdown
                </span>
              </div>

              {/* Swap Button */}
              <div className="md:col-span-1 flex items-center justify-center pt-2">
                <button
                  type="button"
                  onClick={handleSwap}
                  title="Swap Locations"
                  style={{ cursor: "pointer" }}
                  className="w-9 h-9 rounded-full border border-cyan-400 text-[#00A5D9] hover:bg-cyan-50 flex items-center justify-center transition-all cursor-pointer shadow-sm"
                >
                  <ArrowLeftRight className="w-4 h-4" />
                </button>
              </div>

              {/* TO Drop Location */}
              <div className="md:col-span-3 relative">
                <label className="block text-xs font-black text-gray-800 uppercase mb-1">
                  TO
                </label>
                <div className="relative flex items-center border-b-2 border-gray-300 focus-within:border-[#00A5D9] pb-1.5 transition-colors">
                  <Search className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                  <input
                    type="text"
                    value={toCity}
                    onChange={(e) => setToCity(e.target.value)}
                    placeholder="Enter Drop Location"
                    className="w-full text-xs sm:text-sm font-bold text-gray-900 placeholder-gray-400 focus:outline-none bg-transparent"
                  />
                </div>
              </div>

              {/* PICK UP DATE */}
              <div className="md:col-span-2 relative">
                <label className="block text-xs font-black text-gray-800 uppercase mb-1">
                  PICK UP DATE
                </label>
                <div className="relative flex items-center justify-between border-b-2 border-gray-300 pb-1.5">
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full text-xs sm:text-sm font-bold text-gray-900 bg-transparent focus:outline-none cursor-pointer"
                  />
                  <ChevronDown className="w-4 h-4 text-[#00A5D9] pointer-events-none ml-1" />
                </div>
              </div>

              {/* PICK UP TIME */}
              <div className="md:col-span-2 relative">
                <label className="block text-xs font-black text-gray-800 uppercase mb-1">
                  PICK UP TIME
                </label>
                <div className="relative flex items-center justify-between border-b-2 border-gray-300 pb-1.5">
                  <input
                    type="time"
                    value={pickupTime.includes(":") ? pickupTime : "07:00"}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full text-xs sm:text-sm font-bold text-gray-900 bg-transparent focus:outline-none cursor-pointer"
                  />
                  <ChevronDown className="w-4 h-4 text-[#00A5D9] pointer-events-none ml-1" />
                </div>
              </div>

            </div>

            {/* Overlapping Bottom Orange Button: EXPLORE CABS */}
            <div className="absolute -bottom-11 left-1/2 -translate-x-1/2 z-20">
              <button
                type="submit"
                style={{ cursor: "pointer" }}
                className="px-12 py-3.5 rounded-xl bg-gradient-to-r from-[#FF6600] to-[#E65200] hover:from-[#e65200] hover:to-[#cc4400] text-white font-black text-base sm:text-lg tracking-wider uppercase shadow-xl hover:shadow-2xl transition-all cursor-pointer whitespace-nowrap active:scale-95"
              >
                EXPLORE CABS
              </button>
            </div>

          </form>

        </div>

        {/* India's Top Rated Laurel Badge */}
        <div className="flex items-center gap-2 text-white/90 text-xs sm:text-sm font-extrabold mb-6 mt-4">
          <span className="text-amber-400">🌿</span>
          <span>India&apos;s Top Rated Car Rental Service</span>
          <span className="text-amber-400">🌿</span>
        </div>

        {/* Ratings Pill Bar (App Store, Google, Play Store) */}
        <div className="bg-white/95 backdrop-blur-md rounded-full px-6 py-3 shadow-2xl flex flex-wrap items-center justify-center gap-6 sm:gap-10 border border-white/40">
          
          {/* App Store Rating */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-sky-500 text-white flex items-center justify-center font-black text-xs shadow-sm">
              
            </div>
            <div className="text-left">
              <span className="block text-xs font-black text-gray-900 leading-none">
                App Store
              </span>
              <div className="flex items-center gap-1 mt-0.5">
                <div className="flex text-amber-400 text-[10px]">
                  {"★".repeat(5)}
                </div>
                <span className="text-[10px] font-bold text-gray-500">
                  (4.2K+ Reviews)
                </span>
              </div>
            </div>
          </div>

          <div className="h-6 w-[1px] bg-gray-300 hidden sm:block"></div>

          {/* Google Rating */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-white border border-gray-200 text-red-500 flex items-center justify-center font-black text-xs shadow-sm">
              G
            </div>
            <div className="text-left">
              <span className="block text-xs font-black text-gray-900 leading-none">
                Google
              </span>
              <div className="flex items-center gap-1 mt-0.5">
                <div className="flex text-amber-400 text-[10px]">
                  {"★".repeat(5)}
                </div>
                <span className="text-[10px] font-bold text-gray-500">
                  (6.1K+ Reviews)
                </span>
              </div>
            </div>
          </div>

          <div className="h-6 w-[1px] bg-gray-300 hidden sm:block"></div>

          {/* Play Store Rating */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-black text-xs shadow-sm">
              ▶
            </div>
            <div className="text-left">
              <span className="block text-xs font-black text-gray-900 leading-none">
                Play Store
              </span>
              <div className="flex items-center gap-1 mt-0.5">
                <div className="flex text-amber-400 text-[10px]">
                  {"★".repeat(5)}
                </div>
                <span className="text-[10px] font-bold text-gray-500">
                  (15.5K+ Reviews)
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
