"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const [tab, setTab] = useState<"outstation" | "airport" | "hourly">("outstation");
  const [tripType, setTripType] = useState<"oneway" | "roundtrip">("oneway");
  const [airportType, setAirportType] = useState<"drop" | "pickup">("drop");
  const [hourlyPackage, setHourlyPackage] = useState("8 Hrs / 80 Km");

  const [fromLocation, setFromLocation] = useState("Delhi / NCR, India");
  const [toLocation, setToLocation] = useState("");
  const [sameDropForHourly, setSameDropForHourly] = useState(false);

  const [hasStop, setHasStop] = useState(false);
  const [stopLocation, setStopLocation] = useState("");

  const [startDate, setStartDate] = useState("Loading...");
  const [travellers, setTravellers] = useState("1 Traveller, 1 Day");

  // Auto-update Start Date to Current Time
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      
      const dayStr = "Today";

      let hours = now.getHours();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; 
      const minutes = now.getMinutes();
      
      const strTime = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ' ' + ampm;
      
      setStartDate(`${dayStr}, ${strTime}`);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 60000);
    return () => clearInterval(interval);
  }, []);

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
    
    const params = new URLSearchParams({
      tab,
      tripType,
      airportType,
      hourlyPackage,
      from: fromLocation,
      to: toLocation || 'Local Drop',
      date: startDate,
      travellers
    });

    router.push(`/search?${params.toString()}`);
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

        {/* Main Hero Row: Centered Booking Card */}
        <div className="max-w-[1100px] mx-auto mb-6">

          <div className="w-full">

            <div className="bg-white rounded-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-gray-100 p-2 sm:p-2.5 relative z-20">

              {/* 1. Top Navigation Tabs (Outstation, Airport, Hourly Rentals) */}
              <div className="flex items-center justify-around pb-1.5 border-b border-gray-100 mb-1.5 overflow-x-auto whitespace-nowrap hide-scrollbar">
                {/* Outstation */}
                <button
                  type="button"
                  onClick={() => setTab("outstation")}
                  style={{ cursor: "pointer" }}
                  className={clsx(
                    "flex items-center gap-1.5 pb-1.5 px-2 font-extrabold text-sm sm:text-base transition-all relative cursor-pointer",
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
                    "flex items-center gap-1.5 pb-1.5 px-2 font-extrabold text-sm sm:text-base transition-all relative cursor-pointer",
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
                    "flex items-center gap-1.5 pb-1.5 px-2 font-extrabold text-sm sm:text-base transition-all relative cursor-pointer",
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
              <div className="bg-[#f0f6ff] border border-blue-100 rounded-lg px-3 py-1 flex flex-wrap items-center justify-between shadow-xs mb-1.5 gap-2">
                <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gray-700">
                  <ShieldCheck className="w-4 h-4 text-[#00A5D9]" />
                  <span>Clean and Quality cabs • 100% On-time guarantee</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF6600]"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-gray-300"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-gray-300"></span>
                </div>
              </div>

              <form onSubmit={handleSearch} className="space-y-1.5">
                {/* 3. TRIP TYPE SELECTION & REQUIREMENTS */}
                {tab === "outstation" && (
                  <div className="mb-3">
                    {/* Outstation One Way & Round Trip Toggle */}
                    <div className="grid grid-cols-2 gap-3 max-w-[340px]">
                      {/* One Way */}
                      <label
                        className={clsx(
                          "py-2.5 px-4 rounded-xl border-2 transition-all flex items-center justify-center gap-2.5 cursor-pointer",
                          tripType === "oneway"
                            ? "bg-[#eef7ff] border-[#00A5D9] shadow-sm"
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
                        <span className="font-extrabold text-sm text-gray-900 whitespace-nowrap">
                          One Way
                        </span>
                      </label>

                      {/* Round Trip */}
                      <label
                        className={clsx(
                          "py-2.5 px-4 rounded-xl border-2 transition-all flex items-center justify-center gap-2.5 cursor-pointer relative",
                          tripType === "roundtrip"
                            ? "bg-[#eef7ff] border-[#00A5D9] shadow-sm"
                            : "bg-white border-gray-200 hover:border-gray-300"
                        )}
                      >
                        <input
                          type="radio"
                          name="triptype"
                          checked={tripType === "roundtrip"}
                          onChange={() => setTripType("roundtrip")}
                          className="w-4 h-4 text-[#00A5D9] accent-[#00A5D9] cursor-pointer"
                        />
                        <span className="font-extrabold text-sm text-gray-900 whitespace-nowrap">
                          Round Trip
                        </span>
                        <span className="absolute -top-2.5 -right-2 bg-[#00b074] text-white text-[9px] font-black px-2 py-0.5 rounded shadow-sm">
                          Save
                        </span>
                      </label>
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
                <div className="space-y-1.5">

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-1.5 items-center">
                    {/* FROM Input */}
                    <div className="md:col-span-5 relative min-w-0">
                      <div className="flex items-center gap-1 mb-0.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-wider">
                          FROM
                        </label>
                      </div>

                      <div className="relative flex items-center">
                        <MapPin className="w-4 h-4 absolute left-3 text-gray-400 pointer-events-none" />
                        <input
                          type="text"
                          value={fromLocation}
                          onChange={(e) => setFromLocation(e.target.value)}
                          required
                          placeholder="Enter pickup city or location"
                          className="w-full pl-9 pr-9 py-3 bg-white border border-gray-300 rounded-xl text-sm sm:text-base font-extrabold text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#00A5D9] transition-all shadow-sm"
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
                    <div className="md:col-span-2 flex flex-col items-center justify-center pt-0 md:pt-4">
                      <button
                        type="button"
                        onClick={() => setHasStop(!hasStop)}
                        className="group flex flex-col md:flex-row items-center justify-center gap-1.5 bg-blue-50/80 hover:bg-blue-100 border border-blue-100 px-3 md:px-4 py-1.5 rounded-full transition-colors cursor-pointer shadow-sm mx-auto"
                      >
                        <div className="w-4 h-4 md:w-4 md:h-4 rounded-full bg-[#0066FF] text-white flex items-center justify-center shadow-sm flex-shrink-0">
                          {hasStop ? <X className="w-2.5 h-2.5" /> : <Plus className="w-2.5 h-2.5" />}
                        </div>
                        <span className="text-[10px] md:text-xs font-extrabold text-[#0066FF] whitespace-nowrap">
                          {hasStop ? "Remove Stop" : "Add Stop"}
                        </span>
                      </button>
                    </div>

                    {/* TO Input */}
                    <div className="md:col-span-5 relative min-w-0">
                      <div className="flex items-center gap-1 mb-0.5">
                        <span className="w-2 h-2 rounded-full bg-[#FF6600]"></span>
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-wider">
                          TO
                        </label>
                      </div>

                      <div className="relative flex items-center">
                        <MapPin className="w-4 h-4 absolute left-3 text-gray-400 pointer-events-none" />
                        <input
                          type="text"
                          value={toLocation}
                          disabled={tab === "hourly" && sameDropForHourly}
                          onChange={(e) => setToLocation(e.target.value)}
                          required={tab !== "hourly"}
                          placeholder={tab === "hourly" && sameDropForHourly ? "Same as Pickup" : "Enter destination"}
                          className={clsx(
                            "w-full pl-9 pr-4 py-3 border rounded-xl text-sm sm:text-base font-extrabold focus:outline-none transition-all shadow-sm",
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">

                  {/* START DATE & TIME */}
                  <div className="p-1 px-3 bg-[#f8fafc] rounded-xl border border-gray-200 flex items-center justify-between min-w-0">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <span className="block text-[8px] font-black text-gray-400 uppercase tracking-wider truncate">
                          TRIP START DATE & TIME
                        </span>
                        <span className="text-xs font-black text-gray-900 block leading-tight truncate">
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
                  <div className="p-1 px-3 bg-[#f8fafc] rounded-xl border border-gray-200 flex items-center justify-between min-w-0">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-100 text-[#0066FF] flex items-center justify-center flex-shrink-0">
                        <Briefcase className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <span className="block text-[8px] font-black text-gray-400 uppercase tracking-wider truncate">
                          TRAVELLERS & BAGS
                        </span>
                        <span className="text-xs font-black text-gray-900 block leading-tight truncate">
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
                  className="w-full py-2 px-8 rounded-xl bg-gradient-to-r from-[#FF6600] to-[#E65200] hover:from-[#e65200] hover:to-[#cc4400] text-white font-black text-base tracking-wider uppercase shadow-lg shadow-orange-500/25 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                >
                  <Search className="w-4 h-4 stroke-[3]" />
                  <span>SEARCH CABS</span>
                </button>

              </form>

            </div>
          </div>



        </div>

        {/* Rating Section */}
        <div className="flex flex-col items-center justify-center mt-6 mb-2 z-20 relative">
          <div className="flex items-center gap-3 mb-4">
            <svg className="w-6 h-8 text-white drop-shadow-md" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9.99 21.65c-1.57-2.31-2.91-5.11-3.66-8.3C5.55 10 5.48 6.78 6 3.63a.5.5 0 0 1 .84-.27c1.33 1.25 3.01 2.21 5.06 2.76 1.48.4 3.06.58 4.75.52.28 0 .49.25.43.53-.78 3.55-2.58 6.7-5.26 9.17-1.16 1.07-2.42 2-3.76 2.78-1.51.87-2.82 1.95-3.88 3.25a.5.5 0 0 1-.8-.01.5.5 0 0 1 0-.01l6.6-1.58z" />
            </svg>
            <span className="text-white font-bold text-lg sm:text-xl drop-shadow-md tracking-wide">India's Top Rated Car Rental Service</span>
            <svg className="w-6 h-8 text-white drop-shadow-md transform scale-x-[-1]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9.99 21.65c-1.57-2.31-2.91-5.11-3.66-8.3C5.55 10 5.48 6.78 6 3.63a.5.5 0 0 1 .84-.27c1.33 1.25 3.01 2.21 5.06 2.76 1.48.4 3.06.58 4.75.52.28 0 .49.25.43.53-.78 3.55-2.58 6.7-5.26 9.17-1.16 1.07-2.42 2-3.76 2.78-1.51.87-2.82 1.95-3.88 3.25a.5.5 0 0 1-.8-.01.5.5 0 0 1 0-.01l6.6-1.58z" />
            </svg>
          </div>

          <div className="bg-white rounded-[1.5rem] sm:rounded-[2rem] py-4 px-2 sm:py-3.5 sm:px-12 shadow-[0_8px_30px_rgb(0,0,0,0.12)] grid grid-cols-3 sm:flex sm:flex-row items-start sm:items-center justify-center gap-2 sm:gap-14 border border-white/40 w-full sm:w-fit mx-auto max-w-[360px] sm:max-w-none">
            {/* App Store */}
            <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-3.5 text-center sm:text-left">
              <div className="w-9 h-9 sm:w-11 sm:h-11 bg-[#007AFF] rounded-xl flex items-center justify-center text-white shadow-sm flex-shrink-0">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.26-.79 3.59-.76 1.48.06 2.58.74 3.32 1.76-2.9 1.63-2.39 5.38.43 6.64-1.28 2.05-1.46 3.58-2.42 4.53zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" /></svg>
              </div>
              <div className="flex flex-col items-center sm:items-start mt-1 sm:mt-0">
                <span className="font-extrabold text-gray-900 text-[10px] sm:text-sm leading-tight">App Store</span>
                <div className="flex text-[#ffb400] text-[9px] sm:text-xs my-0.5 gap-[1px]">
                  <Star className="w-[10px] h-[10px] sm:w-[14px] sm:h-[14px] fill-current" />
                  <Star className="w-[10px] h-[10px] sm:w-[14px] sm:h-[14px] fill-current" />
                  <Star className="w-[10px] h-[10px] sm:w-[14px] sm:h-[14px] fill-current" />
                  <Star className="w-[10px] h-[10px] sm:w-[14px] sm:h-[14px] fill-current" />
                  <Star className="w-[10px] h-[10px] sm:w-[14px] sm:h-[14px] fill-current" />
                </div>
                <span className="text-[9px] sm:text-[11px] font-bold text-gray-800 leading-tight">(4.2K+)</span>
              </div>
            </div>

            {/* Google */}
            <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-3.5 text-center sm:text-left">
              <div className="w-9 h-9 sm:w-11 sm:h-11 bg-gray-50 rounded-full flex items-center justify-center shadow-sm border border-gray-100 flex-shrink-0">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
              </div>
              <div className="flex flex-col items-center sm:items-start mt-1 sm:mt-0">
                <span className="font-extrabold text-gray-900 text-[10px] sm:text-sm leading-tight">Google</span>
                <div className="flex text-[#ffb400] text-[9px] sm:text-xs my-0.5 gap-[1px]">
                  <Star className="w-[10px] h-[10px] sm:w-[14px] sm:h-[14px] fill-current" />
                  <Star className="w-[10px] h-[10px] sm:w-[14px] sm:h-[14px] fill-current" />
                  <Star className="w-[10px] h-[10px] sm:w-[14px] sm:h-[14px] fill-current" />
                  <Star className="w-[10px] h-[10px] sm:w-[14px] sm:h-[14px] fill-current" />
                  <Star className="w-[10px] h-[10px] sm:w-[14px] sm:h-[14px] fill-current" />
                </div>
                <span className="text-[9px] sm:text-[11px] font-bold text-gray-800 leading-tight">(6.1K+)</span>
              </div>
            </div>

            {/* Play Store */}
            <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-3.5 text-center sm:text-left">
              <div className="w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center flex-shrink-0">
                <svg className="w-7 h-7 sm:w-9 sm:h-9" viewBox="0 0 24 24"><path fill="#00e676" d="M3.7,2.2l12.4,12.4l3.1-1.8c1.1-0.6,1.1-1.7,0-2.3l-12.7-7.3C5.5,2.7,4.3,2.4,3.7,2.2z" /><path fill="#29b6f6" d="M2.5,2.7v18.7c0,0.5,0.4,0.8,0.8,0.5l9.9-9.9L2.5,2.7z" /><path fill="#ff3d00" d="M16.1,14.6l-2.9-2.9L3.3,21.5c0.4,0.3,1.1,0.3,1.9-0.2l10.9-6.3L16.1,14.6z" /><path fill="#ffc107" d="M19.2,12.7L16.1,14.6L13.2,11.7l2.9-2.9l3.1,1.8C20.3,11.1,20.3,12.2,19.2,12.7z" /></svg>
              </div>
              <div className="flex flex-col items-center sm:items-start mt-1 sm:mt-0">
                <span className="font-extrabold text-gray-900 text-[10px] sm:text-sm leading-tight">Play Store</span>
                <div className="flex text-[#ffb400] text-[9px] sm:text-xs my-0.5 gap-[1px]">
                  <Star className="w-[10px] h-[10px] sm:w-[14px] sm:h-[14px] fill-current" />
                  <Star className="w-[10px] h-[10px] sm:w-[14px] sm:h-[14px] fill-current" />
                  <Star className="w-[10px] h-[10px] sm:w-[14px] sm:h-[14px] fill-current" />
                  <Star className="w-[10px] h-[10px] sm:w-[14px] sm:h-[14px] fill-current" />
                  <Star className="w-[10px] h-[10px] sm:w-[14px] sm:h-[14px] fill-current" />
                </div>
                <span className="text-[9px] sm:text-[11px] font-bold text-gray-800 leading-tight">(15.5K+)</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
