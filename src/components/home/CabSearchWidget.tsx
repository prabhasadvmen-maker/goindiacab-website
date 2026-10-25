"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Car, Plane, Clock, MapPin, Plus, Calendar,
  Briefcase, Search, ShieldCheck, Star,
  Headphones, X, CheckSquare, Square
} from "lucide-react";
import clsx from "clsx";
import Image from "next/image";
import { siteConfig } from "@/src/config/site";
import {
  suggestLocations, suggestDestinations, getWebConfig, formatCancelWindow,
  type LocationSuggestion, type WebConfig,
} from "@/src/lib/api";

/** Popular cities, local packages and policy text come from the admin-managed website config. */
function useWebConfig() {
  const [config, setConfig] = useState<WebConfig | null>(null);
  useEffect(() => {
    let alive = true;
    getWebConfig().then((c) => { if (alive) setConfig(c); });
    return () => { alive = false; };
  }, []);
  return config;
}

const RECENT_KEY = "gic_recent_places";

function LocationInput({
  value, onChange, placeholder, required, disabled, mode = "from", ariaLabel,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  mode?: "from" | "to";
  ariaLabel?: string;
}) {
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [active, setActive] = useState(-1);
  const [recent, setRecent] = useState<string[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const popular = useWebConfig()?.popularCities ?? [];
  const reqId = useRef(0);
  const skipNext = useRef(false);

  const q = value.trim();
  const showPopular = open && !disabled && q.length < 2 && (popular.length > 0 || recent.length > 0);
  const showList = open && !disabled && q.length >= 2 && suggestions.length > 0;
  const showEmpty = open && !disabled && q.length >= 2 && searched && !loading && suggestions.length === 0;

  // Debounced live search. Stale responses are dropped via reqId.
  useEffect(() => {
    if (disabled) return;
    if (skipNext.current) { skipNext.current = false; return; }
    if (q.length < 2) {
      reqId.current++;
      setSuggestions([]);
      setLoading(false);
      setSearched(false);
      return;
    }
    const id = ++reqId.current;
    setSearched(false);
    const timer = setTimeout(async () => {
      setLoading(true);
      const results = mode === "from" ? await suggestLocations(q) : await suggestDestinations(q);
      if (id !== reqId.current) return;
      setLoading(false);
      setSuggestions(results);
      setSearched(true);
      setActive(-1);
    }, 250);
    return () => clearTimeout(timer);
  }, [q, mode, disabled]);

  useEffect(() => {
    if (!open) return;
    try {
      const list = JSON.parse(localStorage.getItem(RECENT_KEY) || "[]");
      setRecent(Array.isArray(list) ? list.slice(0, 5) : []);
    } catch { setRecent([]); }
  }, [open]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (val: string) => {
    try {
      const list: string[] = JSON.parse(localStorage.getItem(RECENT_KEY) || "[]");
      const next = [val, ...list.filter((x) => x.toLowerCase() !== val.toLowerCase())].slice(0, 5);
      localStorage.setItem(RECENT_KEY, JSON.stringify(next));
    } catch { /* storage unavailable */ }
    if (val.trim() !== q) skipNext.current = true;
    reqId.current++;
    setSuggestions([]);
    setSearched(false);
    setLoading(false);
    setActive(-1);
    setOpen(false);
    onChange(val);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") { setOpen(false); return; }
    if (!showList) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i <= 0 ? suggestions.length - 1 : i - 1));
    } else if (e.key === "Enter" && active >= 0) {
      e.preventDefault();
      handleSelect(suggestions[active].value);
    }
  };

  return (
    <div className="relative" ref={ref}>
      <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
      <input
        type="text"
        value={value}
        disabled={disabled}
        required={required}
        placeholder={placeholder}
        aria-label={ariaLabel}
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={showList || showPopular}
        autoComplete="off"
        onFocus={() => setOpen(true)}
        onChange={(e) => { onChange(e.target.value); setOpen(true); }}
        onKeyDown={handleKeyDown}
        className={clsx(
          "w-full pl-9 pr-9 py-3 border rounded-xl text-sm sm:text-base font-extrabold focus:outline-none transition-all shadow-sm",
          disabled
            ? "bg-gray-100 text-gray-600 border-gray-300 cursor-not-allowed"
            : "bg-white text-gray-900 border-gray-300 focus:border-[#00A5D9]"
        )}
      />
      {loading ? (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <div className="w-4 h-4 border-2 border-[#00A5D9] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : value && !disabled ? (
        <button
          type="button"
          aria-label="Clear"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => { skipNext.current = false; onChange(""); setOpen(true); }}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      ) : null}

      {/* Recent searches + popular cities */}
      {showPopular && (
        <div className="absolute z-40 left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          <div className="max-h-72 overflow-y-auto py-1">
            {recent.length > 0 && (
              <>
                <p className="px-3 pt-2 pb-1 text-[11px] font-bold text-gray-400 uppercase tracking-wide">Recent Searches</p>
                {recent.map((name) => (
                  <button
                    key={`r-${name}`}
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleSelect(name)}
                    className="w-full text-left px-3 py-2.5 text-sm font-medium text-gray-900 hover:bg-blue-50 cursor-pointer"
                  >
                    {name}
                  </button>
                ))}
              </>
            )}
            {popular.length > 0 && (
              <p className="px-3 pt-3 pb-1 text-[11px] font-bold text-gray-400 uppercase tracking-wide">Popular Cities</p>
            )}
            {popular.map((dest) => (
              <button
                key={dest.name}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleSelect(dest.name)}
                className="w-full text-left px-3 py-2.5 text-sm font-medium text-gray-900 hover:bg-blue-50 cursor-pointer flex items-center justify-between gap-2"
              >
                {dest.name}
                <span className="text-xs font-normal text-gray-400">{dest.state}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Search suggestions */}
      {showList && (
        <ul role="listbox" className="absolute z-40 left-0 right-0 mt-1 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden max-h-72 overflow-y-auto">
          {suggestions.map((s, i) => (
            <li key={`${s.value}-${i}`} role="option" aria-selected={i === active}>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onMouseEnter={() => setActive(i)}
                onClick={() => handleSelect(s.value)}
                className={clsx(
                  "w-full text-left px-3 py-2.5 text-sm text-gray-700 flex items-center gap-2 cursor-pointer",
                  i === active ? "bg-blue-50" : "hover:bg-blue-50"
                )}
              >
                <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" /> {s.label}
              </button>
            </li>
          ))}
        </ul>
      )}

      {showEmpty && (
        <div className="absolute z-40 left-0 right-0 mt-1 bg-white border border-gray-100 rounded-xl shadow-lg px-3 py-3 text-sm text-gray-500">
          {mode === "from" ? "Service not available at this location." : "No matching places found. Try a different spelling."}
        </div>
      )}
    </div>
  );
}

const todayLocal = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
};
const cityKey = (v: string) => v.split(",")[0].trim().toLowerCase();

export function CabSearchWidget() {
  const router = useRouter();
  const [tab, setTab] = useState<"outstation" | "airport" | "hourly">("outstation");
  const [tripType, setTripType] = useState<"oneway" | "roundtrip">("oneway");
  const config = useWebConfig();
  const [hourlyPackage, setHourlyPackage] = useState("");

  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [sameDropForHourly, setSameDropForHourly] = useState(false);

  const [hasStop, setHasStop] = useState(false);
  const [stopLocation, setStopLocation] = useState("");

  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [passengers, setPassengers] = useState("2");
  const [formError, setFormError] = useState("");
  const activePackage = config?.localPackages.find((p) => p.label === hourlyPackage)?.label ?? config?.localPackages[0]?.label ?? "";
  const maxPassengers = config?.maxSeats || Number(passengers) || 1;

  // Set default date/time to now
  useEffect(() => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    setPickupDate(now.toISOString().slice(0, 10));
    const h = String(now.getHours()).padStart(2, "0");
    const m = String(now.getMinutes()).padStart(2, "0");
    setPickupTime(`${h}:${m}`);
  }, []);

  // Sync TO location if Same Pickup & Drop-off is checked in Hourly Rentals
  useEffect(() => {
    if (tab === "hourly" && sameDropForHourly) {
      setToLocation(fromLocation);
    }
  }, [tab, sameDropForHourly, fromLocation]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const from = fromLocation.trim();
    const to = toLocation.trim();
    const stop = hasStop ? stopLocation.trim() : "";

    if (!from) return setFormError("Please enter pickup city or location.");
    if (!to && tab !== "hourly") return setFormError("Please enter destination city or landmark.");
    if (tab !== "hourly" && cityKey(from) === cityKey(to)) return setFormError("Pickup and destination cannot be the same.");
    if (stop && (cityKey(stop) === cityKey(from) || cityKey(stop) === cityKey(to))) {
      return setFormError("Intermediate stop must be different from pickup and destination.");
    }
    if (pickupDate < todayLocal()) return setFormError("Pickup date cannot be in the past.");
    if (pickupDate === todayLocal() && pickupTime) {
      const [h, m] = pickupTime.split(":").map(Number);
      const pickup = new Date();
      pickup.setHours(h, m, 0, 0);
      if (pickup.getTime() < Date.now() - 15 * 60 * 1000) return setFormError("Pickup time has already passed.");
    }
    // Pickup must be one of the cities we serve (same list the FROM suggestions show).
    const served = await suggestLocations(from);
    if (!served.some((c) => cityKey(c.value) === cityKey(from))) {
      return setFormError("Service is not available at this pickup location. Please pick a city from the list.");
    }
    setFormError("");

    // Map to /search page params
    let tripTypeParam = "oneway";
    if (tab === "outstation") tripTypeParam = tripType;
    if (tab === "airport") tripTypeParam = "airport";
    if (tab === "hourly") tripTypeParam = "local";

    const params = new URLSearchParams({
      from,
      to: to || "Local Drop",
      date: pickupDate,
      time: pickupTime,
      tripType: tripTypeParam,
      passengers,
    });

    if (tab === "hourly") {
      if (!activePackage) return setFormError("No rental packages are available right now.");
      params.set("pkg", activePackage);
    }
    if (stop) params.set("stop", stop);

    router.push(`/search?${params.toString()}`);
  };

  return (
    <section className="w-full relative pt-8 pb-16 bg-slate-900">

      {/* Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/new_hero_bg.png"
          alt="GoIndiaCab Hero Background"
          fill
          className="object-cover object-center opacity-85"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/40 via-sky-950/20 to-slate-900/60" />
      </div>

      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 relative z-10">

        <div className="max-w-[1100px] mx-auto mb-6">
          <div className="w-full">
            <div className="bg-white rounded-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-gray-100 p-2 sm:p-2.5 relative z-30">

              {/* 1. Top Navigation Tabs */}
              <div className="flex items-center justify-around pb-1.5 border-b border-gray-100 mb-1.5 overflow-x-auto whitespace-nowrap hide-scrollbar">
                {/* Outstation */}
                <button
                  type="button"
                  onClick={() => setTab("outstation")}
                  className={clsx(
                    "flex items-center gap-1.5 pb-1.5 px-2 font-extrabold text-sm sm:text-base transition-all relative cursor-pointer",
                    tab === "outstation" ? "text-[#00A5D9]" : "text-gray-500 hover:text-gray-800"
                  )}
                >
                  <Car className="w-5 h-5" />
                  <span>Outstation</span>
                  {tab === "outstation" && (
                    <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#00A5D9] rounded-full" />
                  )}
                </button>

                {/* Airport */}
                <button
                  type="button"
                  onClick={() => setTab("airport")}
                  className={clsx(
                    "flex items-center gap-1.5 pb-1.5 px-2 font-extrabold text-sm sm:text-base transition-all relative cursor-pointer",
                    tab === "airport" ? "text-[#00A5D9]" : "text-gray-500 hover:text-gray-800"
                  )}
                >
                  <Plane className="w-5 h-5" />
                  <span>Airport</span>
                  {tab === "airport" && (
                    <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#00A5D9] rounded-full" />
                  )}
                </button>

                {/* Hourly Rentals */}
                <button
                  type="button"
                  onClick={() => setTab("hourly")}
                  className={clsx(
                    "flex items-center gap-1.5 pb-1.5 px-2 font-extrabold text-sm sm:text-base transition-all relative cursor-pointer",
                    tab === "hourly" ? "text-[#00A5D9]" : "text-gray-500 hover:text-gray-800"
                  )}
                >
                  <Clock className="w-5 h-5" />
                  <span>Hourly Rentals</span>
                  {tab === "hourly" && (
                    <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#00A5D9] rounded-full" />
                  )}
                </button>
              </div>

              {/* 2. Quality Banner */}
              <div className="bg-[#f0f6ff] border border-blue-100 rounded-lg px-3 py-1 flex flex-wrap items-center justify-between shadow-xs mb-1.5 gap-2">
                <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gray-700">
                  <ShieldCheck className="w-4 h-4 text-[#00A5D9]" />
                  <span>Clean and Quality cabs • 100% On-time guarantee</span>
                </div>
              </div>

              <form onSubmit={handleSearch} className="space-y-1.5">

                {/* 3. Trip Type Selection */}
                {tab === "outstation" && (
                  <div className="mb-3">
                    <div className="grid grid-cols-2 gap-3 max-w-[340px]">
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
                          className="w-4 h-4 accent-[#00A5D9] cursor-pointer"
                        />
                        <span className="font-extrabold text-sm text-gray-900 whitespace-nowrap">One Way</span>
                      </label>

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
                          className="w-4 h-4 accent-[#00A5D9] cursor-pointer"
                        />
                        <span className="font-extrabold text-sm text-gray-900 whitespace-nowrap">Round Trip</span>
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
                      {config && config.localPackages.length === 0 && (
                        <span className="text-xs font-bold text-gray-500">No rental packages available right now.</span>
                      )}
                      {(config?.localPackages ?? []).map(({ label: pkg }) => (
                        <button
                          key={pkg}
                          type="button"
                          onClick={() => setHourlyPackage(pkg)}
                          className={clsx(
                            "py-1.5 px-3.5 rounded-lg text-xs font-extrabold border whitespace-nowrap transition-all cursor-pointer",
                            activePackage === pkg
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

                {/* 4. Location Fields */}
                <div className="space-y-1.5">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-1.5 items-center">

                    {/* FROM */}
                    <div className="md:col-span-5 relative min-w-0">
                      <div className="flex items-center gap-1 mb-0.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-wider">FROM</label>
                      </div>
                      <LocationInput
                        value={fromLocation}
                        onChange={setFromLocation}
                        ariaLabel="From"
                        placeholder="Enter pickup city or location"
                        required
                      />
                    </div>

                    {/* Add Stop Button */}
                    <div className="md:col-span-2 flex flex-col items-center justify-center pt-0 md:pt-4">
                      <button
                        type="button"
                        onClick={() => { if (hasStop) setStopLocation(""); setHasStop(!hasStop); }}
                        className="group flex flex-col md:flex-row items-center justify-center gap-1.5 bg-blue-50/80 hover:bg-blue-100 border border-blue-100 px-3 md:px-4 py-1.5 rounded-full transition-colors cursor-pointer shadow-sm mx-auto"
                      >
                        <div className="w-4 h-4 rounded-full bg-[#0066FF] text-white flex items-center justify-center shadow-sm flex-shrink-0">
                          {hasStop ? <X className="w-2.5 h-2.5" /> : <Plus className="w-2.5 h-2.5" />}
                        </div>
                        <span className="text-[10px] md:text-xs font-extrabold text-[#0066FF] whitespace-nowrap">
                          {hasStop ? "Remove Stop" : "Add Stop"}
                        </span>
                      </button>
                    </div>

                    {/* TO */}
                    <div className="md:col-span-5 relative min-w-0">
                      <div className="flex items-center gap-1 mb-0.5">
                        <span className="w-2 h-2 rounded-full bg-[#FF6600]" />
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-wider">TO</label>
                      </div>
                      <LocationInput
                        value={toLocation}
                        onChange={setToLocation}
                        mode="to"
                        placeholder={tab === "hourly" && sameDropForHourly ? "Same as Pickup" : "Enter destination"}
                        required={tab !== "hourly"}
                        disabled={tab === "hourly" && sameDropForHourly}
                      />
                    </div>
                  </div>

                  {/* Same Pickup & Drop checkbox for Hourly */}
                  {tab === "hourly" && (
                    <div className="flex items-center gap-2 pt-1">
                      <label
                        onClick={() => setSameDropForHourly(!sameDropForHourly)}
                        className="inline-flex items-center gap-2 bg-[#f0f9ff] border border-blue-200/90 text-blue-900 px-3 py-1.5 rounded-lg text-xs font-black hover:bg-blue-100/70 transition-colors cursor-pointer select-none"
                      >
                        {sameDropForHourly
                          ? <CheckSquare className="w-4 h-4 text-[#00A5D9]" />
                          : <Square className="w-4 h-4 text-gray-400" />
                        }
                        <span>Same Pickup &amp; Drop-off point</span>
                      </label>
                    </div>
                  )}
                </div>

                {/* Optional Stop Field */}
                {hasStop && (
                  <div className="bg-blue-50/70 p-3 rounded-xl border border-blue-200">
                    <div className="flex items-center gap-1 mb-1">
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                      <label className="text-[10px] font-black text-blue-900 uppercase tracking-wider">Intermediate Stop</label>
                    </div>
                    <LocationInput
                      value={stopLocation}
                      onChange={setStopLocation}
                      mode="to"
                      placeholder="e.g. Mathura, Vrindavan, Agra..."
                    />
                  </div>
                )}

                {/* 5. Trip Details Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">

                  {/* DATE */}
                  <div className="p-1 px-3 bg-[#f8fafc] rounded-xl border border-gray-200 flex items-center gap-2 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="block text-[8px] font-black text-gray-400 uppercase tracking-wider">DATE</span>
                      <input
                        type="date"
                        value={pickupDate}
                        min={todayLocal()}
                        onChange={(e) => setPickupDate(e.target.value)}
                        required
                        className="w-full text-xs font-black text-gray-900 bg-transparent outline-none cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* TIME */}
                  <div className="p-1 px-3 bg-[#f8fafc] rounded-xl border border-gray-200 flex items-center gap-2 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="block text-[8px] font-black text-gray-400 uppercase tracking-wider">TIME</span>
                      <input
                        type="time"
                        value={pickupTime}
                        onChange={(e) => setPickupTime(e.target.value)}
                        required
                        className="w-full text-xs font-black text-gray-900 bg-transparent outline-none cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* PASSENGERS */}
                  <div className="p-1 px-3 bg-[#f8fafc] rounded-xl border border-gray-200 flex items-center gap-2 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="block text-[8px] font-black text-gray-400 uppercase tracking-wider">PASSENGERS</span>
                      <select
                        value={passengers}
                        onChange={(e) => setPassengers(e.target.value)}
                        className="w-full text-xs font-black text-gray-900 bg-transparent outline-none cursor-pointer"
                      >
                        {Array.from({ length: Math.max(maxPassengers, 1) }, (_, i) => i + 1).map((n) => (
                          <option key={n} value={String(n)}>{n} Passenger{n > 1 ? "s" : ""}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {formError && (
                  <div role="alert" className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm font-bold rounded-lg px-3 py-2">
                    <X className="w-4 h-4 shrink-0" /> {formError}
                  </div>
                )}

                {/* 6. CTA Button */}
                <button
                  type="submit"
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
        <div className="flex flex-col items-center justify-center mt-6 mb-2 z-10 relative">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-white font-bold text-lg sm:text-xl drop-shadow-md tracking-wide">
              India&apos;s Top Rated Car Rental Service
            </span>
          </div>

          <div className="bg-white rounded-[1.5rem] sm:rounded-[2rem] py-4 px-2 sm:py-3.5 sm:px-12 shadow-[0_8px_30px_rgb(0,0,0,0.12)] grid grid-cols-3 sm:flex sm:flex-row items-start sm:items-center justify-center gap-2 sm:gap-14 border border-white/40 w-full sm:w-fit mx-auto max-w-[360px] sm:max-w-none">

            {/* Google */}
            <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-3.5 text-center sm:text-left">
              <div className="w-9 h-9 sm:w-11 sm:h-11 bg-gray-50 rounded-full flex items-center justify-center shadow-sm border border-gray-100 flex-shrink-0">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              </div>
              <div className="flex flex-col items-center sm:items-start mt-1 sm:mt-0">
                <span className="font-extrabold text-gray-900 text-[10px] sm:text-sm leading-tight">Google</span>
                <div className="flex text-[#ffb400] my-0.5 gap-[1px]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-[10px] h-[10px] sm:w-[14px] sm:h-[14px] fill-current" />
                  ))}
                </div>
                <span className="text-[9px] sm:text-[11px] font-bold text-gray-800 leading-tight">
                  {siteConfig.googleRating} ({siteConfig.googleReviewCount})
                </span>
              </div>
            </div>

            {/* Free Cancellation */}
            <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-3.5 text-center sm:text-left">
              <div className="w-9 h-9 sm:w-11 sm:h-11 bg-green-50 rounded-full flex items-center justify-center shadow-sm border border-green-100 flex-shrink-0">
                <ShieldCheck className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex flex-col items-center sm:items-start mt-1 sm:mt-0">
                <span className="font-extrabold text-gray-900 text-[10px] sm:text-sm leading-tight">Free Cancel</span>
                <span className="text-[9px] sm:text-[11px] font-bold text-gray-500 leading-tight">{config ? `Up to ${formatCancelWindow(config.freeCancelMinutes)} before` : "Before pickup"}</span>
              </div>
            </div>

            {/* 24/7 Support */}
            <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-3.5 text-center sm:text-left">
              <div className="w-9 h-9 sm:w-11 sm:h-11 bg-blue-50 rounded-full flex items-center justify-center shadow-sm border border-blue-100 flex-shrink-0">
                <Headphones className="w-5 h-5 text-[#0B4A9C]" />
              </div>
              <div className="flex flex-col items-center sm:items-start mt-1 sm:mt-0">
                <span className="font-extrabold text-gray-900 text-[10px] sm:text-sm leading-tight">24/7 Support</span>
                <span className="text-[9px] sm:text-[11px] font-bold text-gray-500 leading-tight">{siteConfig.phone.booking1}</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
