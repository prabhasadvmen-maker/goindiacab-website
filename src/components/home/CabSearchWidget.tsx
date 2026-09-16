"use client";

import { useState, useEffect } from "react";
import { 
  Car, 
  Plane, 
  Clock, 
  MapPin, 
  Locate, 
  Plus, 
  Calendar, 
  Briefcase, 
  Search,
  ShieldCheck,
  ArrowRight,
  Gift,
  CheckCircle2,
  Star,
  Headphones,
  X,
  Info,
  CheckSquare,
  Square
} from "lucide-react";
import clsx from "clsx";
import Image from "next/image";
import { siteConfig } from "@/src/config/site";

export function CabSearchWidget() {
  const [tab, setTab] = useState<"outstation" | "airport" | "hourly">("outstation");
  const [tripType, setTripType] = useState<"oneway" | "roundtrip">("oneway");
  const [airportType, setAirportType] = useState<"drop" | "pickup">("drop");
  const [hourlyPackage, setHourlyPackage] = useState("8 Hrs / 80 Km");
  
  const [fromLocation, setFromLocation] = useState("Delhi / NCR, India");
  const [toLocation, setToLocation] = useState("");
  const [sameDropForHourly, setSameDropForHourly] = useState(false);
  
  const [hasStop, setHasStop] = useState(false);
  const [stopLocation, setStopLocation] = useState("");
  
  const [startDate, setStartDate] = useState("Today, 10:30 AM");
  const [travellers, setTravellers] = useState("1 Traveller, 1 Day");

  // Sync TO location if Same Pickup & Drop-off is checked in Hourly Rentals
  useEffect(() => {
    if (tab === "hourly" && sameDropForHourly) {
      setToLocation(fromLocation);
    }
  }, [tab, sameDropForHourly, fromLocation]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!toLocation && tab !== "hourly") {
      alert("Please enter destination city or landmark!");
      return;
    }
    const mode = tab === "outstation" ? tripType.toUpperCase() : tab === "airport" ? `AIRPORT (${airportType.toUpperCase()})` : `HOURLY (${hourlyPackage})`;
    const text = encodeURIComponent(
      `Hi GoIndiaCab! I want to book a cab.\nTab: ${tab.toUpperCase()} (${mode})\nFrom: ${fromLocation}\nTo: ${toLocation || 'Hourly Rental'}\nDate: ${startDate}\nDetails: ${travellers}`
    );
    const phoneNumber = siteConfig.phone.booking1.replace(/\D/g, "");
    window.open(`https://wa.me/${phoneNumber}?text=${text}`, "_blank");
  };

  return (
    <section className="w-full relative overflow-hidden pt-8 pb-16 bg-slate-900">
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/new_hero_bg.png"
          alt="GoIndiaCab Hero Background"
          fill
          className="object-cover object-center opacity-85"
          priority
        />
        {/* Soft overlay gradient for optimal text & card contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/40 via-sky-950/20 to-slate-900/60"></div>
      </div>

      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Main Hero Row: Left Features | Center Booking Card | Right Graphic */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center mb-12">
          
          {/* Left Column: Heading & Bullet Points */}
          <div className="hidden lg:flex lg:col-span-3 flex-col justify-center pr-2 drop-shadow-md">
            <h1 className="text-3xl xl:text-4xl font-black text-white leading-[1.15] mb-6 drop-shadow-lg">
              Reliable <br />
              Cabs for <br />
              Every <br />
              <span className="relative text-[#38bdf8] inline-block mt-1">
                Journey
                <span className="absolute -bottom-1 left-0 right-0 h-1.5 bg-[#FF6600] rounded-full"></span>
              </span>
            </h1>

            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/95 backdrop-blur-xs shadow-md border border-white/20 flex items-center justify-center text-[#00A5D9] flex-shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="text-xs font-black text-white drop-shadow-sm">Safe & Secure Rides</span>
              </li>
              
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/95 backdrop-blur-xs shadow-md border border-white/20 flex items-center justify-center text-[#00A5D9] flex-shrink-0">
                  <Car className="w-4 h-4" />
                </div>
                <span className="text-xs font-black text-white drop-shadow-sm">Professional Drivers</span>
              </li>

              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/95 backdrop-blur-xs shadow-md border border-white/20 flex items-center justify-center text-[#00A5D9] flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-xs font-black text-white drop-shadow-sm">Transparent Pricing</span>
              </li>

              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/95 backdrop-blur-xs shadow-md border border-white/20 flex items-center justify-center text-[#00A5D9] flex-shrink-0">
                  <Headphones className="w-4 h-4" />
                </div>
                <span className="text-xs font-black text-white drop-shadow-sm">24/7 Customer Support</span>
              </li>
            </ul>
          </div>

          {/* Center Column: Floating Booking Card */}
          <div className="lg:col-span-6 w-full">
            
            {/* Mobile Header Title */}
            <div className="block lg:hidden text-center mb-6">
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
                Reliable Cabs for <span className="text-[#00A5D9]">Every Journey</span>
              </h1>
            </div>

            <div className="bg-white rounded-[28px] shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-gray-100 p-5 sm:p-7 relative z-20">
              
              {/* 1. Top Navigation Tabs (Outstation, Airport, Hourly Rentals) */}
              <div className="flex items-center justify-around pb-3 border-b border-gray-100 mb-4">
                {/* Outstation */}
                <button
                  type="button"
                  onClick={() => setTab("outstation")}
                  style={{ cursor: "pointer" }}
                  className={clsx(
                    "flex items-center gap-2 pb-2.5 px-3 font-extrabold text-sm sm:text-base transition-all relative cursor-pointer",
                    tab === "outstation"
                      ? "text-[#00A5D9]"
                      : "text-gray-500 hover:text-gray-800"
                  )}
                >
                  <Car className="w-5 h-5" />
                  <span>Outstation</span>
                  {tab === "outstation" && (
                    <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#00A5D9] rounded-full"></span>
                  )}
                </button>

                {/* Airport */}
                <button
                  type="button"
                  onClick={() => setTab("airport")}
                  style={{ cursor: "pointer" }}
                  className={clsx(
                    "flex items-center gap-2 pb-2.5 px-3 font-extrabold text-sm sm:text-base transition-all relative cursor-pointer",
                    tab === "airport"
                      ? "text-[#00A5D9]"
                      : "text-gray-500 hover:text-gray-800"
                  )}
                >
                  <Plane className="w-5 h-5" />
                  <span>Airport</span>
                  {tab === "airport" && (
                    <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#00A5D9] rounded-full"></span>
                  )}
                </button>

                {/* Hourly Rentals */}
                <button
                  type="button"
                  onClick={() => setTab("hourly")}
                  style={{ cursor: "pointer" }}
                  className={clsx(
                    "flex items-center gap-2 pb-2.5 px-3 font-extrabold text-sm sm:text-base transition-all relative cursor-pointer",
                    tab === "hourly"
                      ? "text-[#00A5D9]"
                      : "text-gray-500 hover:text-gray-800"
                  )}
                >
                  <Clock className="w-5 h-5" />
                  <span>Hourly Rentals</span>
                  {tab === "hourly" && (
                    <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#00A5D9] rounded-full"></span>
                  )}
                </button>
              </div>

              {/* 2. Quality Banner */}
              <div className="bg-[#f0f6ff] border border-blue-100 rounded-xl px-4 py-2.5 flex items-center justify-between shadow-xs mb-4">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-700">
                  <ShieldCheck className="w-4 h-4 text-[#00A5D9]" />
                  <span>Clean and Quality cabs • 100% On-time guarantee</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF6600]"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-gray-300"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-gray-300"></span>
                </div>
              </div>

              <form onSubmit={handleSearch} className="space-y-4">
                           {/* 3. TRIP TYPE SELECTION & REQUIREMENTS */}
                {tab === "outstation" && (
                  <div>
                    {/* Outstation One Way & Round Trip Toggle */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {/* One Way */}
                      <div
                        onClick={() => setTripType("oneway")}
                        style={{ cursor: "pointer" }}
                        className={clsx(
                          "p-3.5 rounded-2xl border-2 transition-all flex items-center gap-3 cursor-pointer",
                          tripType === "oneway"
                            ? "bg-[#eef7ff] border-[#00A5D9] shadow-xs"
                            : "bg-white border-gray-200 hover:border-gray-300"
                        )}
                      >
                        <input
                          type="radio"
                          name="triptype"
                          checked={tripType === "oneway"}
                          onChange={() => setTripType("oneway")}
                          className="w-4 h-4 text-[#00A5D9] accent-[#00A5D9] cursor-pointer"
                        />
                        <div>
                          <h4 className="font-extrabold text-sm text-gray-900 leading-none">
                            One Way
                          </h4>
                          <p className="text-xs text-gray-500 font-medium mt-1">
                            Get dropped off
                          </p>
                        </div>
                      </div>

                      {/* Round Trip */}
                      <div
                        onClick={() => setTripType("roundtrip")}
                        style={{ cursor: "pointer" }}
                        className={clsx(
                          "p-3.5 rounded-2xl border-2 transition-all flex items-center justify-between gap-3 cursor-pointer",
                          tripType === "roundtrip"
                            ? "bg-[#eef7ff] border-[#00A5D9] shadow-xs"
                            : "bg-white border-gray-200 hover:border-gray-300"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="triptype"
                            checked={tripType === "roundtrip"}
                            onChange={() => setTripType("roundtrip")}
                            className="w-4 h-4 text-[#00A5D9] accent-[#00A5D9] cursor-pointer"
                          />
                          <div>
                            <h4 className="font-extrabold text-sm text-gray-900 leading-none">
                              Round Trip
                            </h4>
                            <p className="text-xs text-gray-500 font-medium mt-1">
                              Keep cab till return
                            </p>
                          </div>
                        </div>

                        <span className="bg-[#00b074] text-white text-[10px] font-black px-2 py-0.5 rounded shadow-2xs">
                          Save more
                        </span>
                      </div>
                    </div>

                    {/* Point (1): Extra line on GST / Tax extra */}
                    <div className="mt-2 flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200/80">
                      <Info className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                      <span>Note: Toll, State Tax & GST Extra as applicable.</span>
                    </div>
                  </div>
                )}

                {tab === "hourly" && (
                  <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-200/80">
                    <label className="block text-xs font-extrabold text-blue-900 mb-2">
                      Select Package Duration:
                    </label>
                    <div className="flex items-center gap-2 overflow-x-auto">
                      {["4 Hrs / 40 Km", "8 Hrs / 80 Km", "12 Hrs / 120 Km"].map((pkg) => (
                        <button
                          key={pkg}
                          type="button"
                          onClick={() => setHourlyPackage(pkg)}
                          className={clsx(
                            "py-1.5 px-3.5 rounded-lg text-xs font-extrabold border whitespace-nowrap transition-all cursor-pointer",
                            hourlyPackage === pkg
                              ? "bg-[#00A5D9] text-white border-[#00A5D9] shadow-xs"
                              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                          )}
                        >
                          ⏱️ {pkg}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. Location Fields (FROM, Checkbox for Same Pickup & Drop-off, TO) */}
                <div className="space-y-3">
                  
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-center">
                    {/* FROM Input */}
                    <div className="md:col-span-5 relative">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                        <label className="text-[11px] font-black text-gray-500 uppercase tracking-wider">
                          FROM
                        </label>
                      </div>

                      <div className="relative flex items-center">
                        <MapPin className="w-4 h-4 absolute left-3.5 text-gray-400 pointer-events-none" />
                        <input
                          type="text"
                          value={fromLocation}
                          onChange={(e) => setFromLocation(e.target.value)}
                          required
                          placeholder="Enter pickup city or location"
                          className="w-full pl-10 pr-9 py-3 bg-white border border-gray-300 rounded-xl text-xs sm:text-sm font-extrabold text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#00A5D9] transition-all shadow-2xs"
                        />
                        <button
                          type="button"
                          title="Locate Me"
                          onClick={() => {
                            if (navigator.geolocation) {
                              navigator.geolocation.getCurrentPosition(() => setFromLocation("Delhi NCR (Current Location)"));
                            }
                          }}
                          style={{ cursor: "pointer" }}
                          className="absolute right-2.5 text-[#00A5D9] hover:text-blue-700 p-1 cursor-pointer"
                        >
                          <Locate className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Add a Stop Center Button */}
                    <div className="md:col-span-2 flex flex-col items-center justify-center pt-2">
                      <button
                        type="button"
                        onClick={() => setHasStop(!hasStop)}
                        style={{ cursor: "pointer" }}
                        className="group flex flex-col items-center justify-center text-center cursor-pointer"
                      >
                        <div className="w-8 h-8 rounded-full bg-[#0066FF] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                          {hasStop ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </div>
                        <span className="text-[10px] font-extrabold text-[#0066FF] mt-1">
                          {hasStop ? "- Remove Stop" : "Add a Stop"}
                        </span>
                        <span className="text-[9px] text-gray-400 font-semibold leading-tight">
                          (Sightseeing, Hotel...)
                        </span>
                      </button>
                    </div>

                    {/* TO Input */}
                    <div className="md:col-span-5 relative">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FF6600]"></span>
                        <label className="text-[11px] font-black text-gray-500 uppercase tracking-wider">
                          TO
                        </label>
                      </div>

                      <div className="relative flex items-center">
                        <MapPin className="w-4 h-4 absolute left-3.5 text-gray-400 pointer-events-none" />
                        <input
                          type="text"
                          value={toLocation}
                          disabled={tab === "hourly" && sameDropForHourly}
                          onChange={(e) => setToLocation(e.target.value)}
                          required={tab !== "hourly"}
                          placeholder={tab === "hourly" && sameDropForHourly ? "Same as Pickup Location" : "Enter destination city or landmark"}
                          className={clsx(
                            "w-full pl-10 pr-4 py-3 border rounded-xl text-xs sm:text-sm font-extrabold focus:outline-none transition-all shadow-2xs",
                            tab === "hourly" && sameDropForHourly
                              ? "bg-gray-100 text-gray-600 border-gray-300 cursor-not-allowed"
                              : "bg-white text-gray-900 border-gray-300 focus:border-[#00A5D9]"
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Checkbox exclusively for Hourly Rentals Tab */}
                  {tab === "hourly" && (
                    <div className="flex items-center gap-2 pt-1">
                      <label 
                        onClick={() => setSameDropForHourly(!sameDropForHourly)}
                        style={{ cursor: "pointer" }}
                        className="inline-flex items-center gap-2 bg-[#f0f9ff] border border-blue-200/90 text-blue-900 px-3 py-1.5 rounded-lg text-xs font-black hover:bg-blue-100/70 transition-colors cursor-pointer select-none"
                      >
                        <input
                          type="checkbox"
                          checked={sameDropForHourly}
                          onChange={(e) => setSameDropForHourly(e.target.checked)}
                          className="w-4 h-4 rounded text-[#00A5D9] accent-[#00A5D9] cursor-pointer"
                        />
                        <span>Same Pickup & Drop-off point</span>
                      </label>
                    </div>
                  )}

                </div>

                {/* Optional Stop Field */}
                {hasStop && (
                  <div className="bg-blue-50/70 p-3 rounded-xl border border-blue-200">
                    <label className="block text-xs font-bold text-blue-900 mb-1">
                      Intermediate Stop:
                    </label>
                    <input
                      type="text"
                      value={stopLocation}
                      onChange={(e) => setStopLocation(e.target.value)}
                      placeholder="e.g. Mathura / Vrindavan / Sightseeing stop"
                      className="w-full px-3 py-2 bg-white border border-blue-300 rounded-lg text-xs font-semibold text-gray-900 focus:outline-none"
                    />
                  </div>
                )}

                {/* 5. Trip Details Row (Date & Time + Travellers) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  
                  {/* START DATE & TIME */}
                  <div className="p-3 bg-[#f8fafc] rounded-xl border border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="block text-[9px] font-black text-gray-400 uppercase tracking-wider">
                          TRIP START DATE & TIME
                        </span>
                        <span className="text-xs sm:text-sm font-black text-gray-900 block mt-0.5">
                          {startDate}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const newDate = prompt("Enter Trip Start Date & Time:", startDate);
                        if (newDate) setStartDate(newDate);
                      }}
                      style={{ cursor: "pointer" }}
                      className="text-xs font-extrabold text-[#0066FF] hover:underline px-2 py-1 cursor-pointer"
                    >
                      Change
                    </button>
                  </div>

                  {/* TRAVELLERS & DAYS */}
                  <div className="p-3 bg-[#f8fafc] rounded-xl border border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-lg bg-blue-100 text-[#0066FF] flex items-center justify-center flex-shrink-0">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="block text-[9px] font-black text-gray-400 uppercase tracking-wider">
                          TRAVELLERS & BAGS
                        </span>
                        <span className="text-xs sm:text-sm font-black text-gray-900 block mt-0.5">
                          {travellers}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const count = prompt("Enter Travellers & Days:", travellers);
                        if (count) setTravellers(count);
                      }}
                      style={{ cursor: "pointer" }}
                      className="text-xs font-extrabold text-[#0066FF] hover:underline px-2 py-1 cursor-pointer"
                    >
                      Edit
                    </button>
                  </div>

                </div>

                {/* 6. CTA Button */}
                <button
                  type="submit"
                  style={{ cursor: "pointer" }}
                  className="w-full py-4 px-8 rounded-xl bg-gradient-to-r from-[#FF6600] to-[#E65200] hover:from-[#e65200] hover:to-[#cc4400] text-white font-black text-base sm:text-lg tracking-wider uppercase shadow-lg shadow-orange-500/25 transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer active:scale-[0.99]"
                >
                  <Search className="w-5 h-5 stroke-[3]" />
                  <span>SEARCH CABS</span>
                </button>

              </form>

            </div>
          </div>

          {/* Right Column: Decorative Tagline */}
          <div className="hidden lg:flex lg:col-span-3 flex-col items-center justify-center relative">
            <div className="text-center">
              <span className="font-serif italic text-2xl text-white font-bold tracking-wide drop-shadow-md">
                Travel Made Easy
              </span>
              <svg className="w-32 h-3 text-[#FF6600] mx-auto mt-0.5" viewBox="0 0 100 20" fill="none" stroke="currentColor">
                <path d="M5 15 Q 50 2 95 15" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
