"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Car, Plane, Clock, MapPin, Plus, Calendar,
  Briefcase, Search, ShieldCheck, Star,
  Headphones, X, CheckSquare, Square, ArrowLeftRight
} from "lucide-react";
import clsx from "clsx";
import Image from "next/image";
import { siteConfig } from "@/src/config/site";
import { AIRPORTS, searchAirports } from "@/src/lib/airports";
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
  value, onChange, placeholder, required, disabled, mode = "from", ariaLabel, bare,
}: {
  /** Airport tab address fields: any place via search, without the popular-cities / recent lists. */
  bare?: boolean;
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
  const showPopular = open && !disabled && !bare && q.length < 2 && (popular.length > 0 || recent.length > 0);
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
    if (!bare) try {
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

/** Airport picker: popular airports on focus, filtered by airport name or city as you type. Only a listed airport can be chosen. */
function AirportInput({
  value, onChange, placeholder, ariaLabel,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  ariaLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);
  const options = searchAirports(value);
  const picked = AIRPORTS.some((a) => a.label === value);
  const showList = open && !picked;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const select = (label: string) => { onChange(label); setOpen(false); setActive(-1); };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") { setOpen(false); return; }
    if (!showList || options.length === 0) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((i) => (i + 1) % options.length); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((i) => (i <= 0 ? options.length - 1 : i - 1)); }
    else if (e.key === "Enter" && active >= 0) { e.preventDefault(); select(options[active].label); }
  };

  return (
    <div className="relative" ref={ref}>
      <Plane className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
      <input
        type="text"
        value={value}
        required
        placeholder={placeholder}
        aria-label={ariaLabel}
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={showList}
        autoComplete="off"
        onFocus={() => setOpen(true)}
        onChange={(e) => { onChange(e.target.value); setOpen(true); setActive(-1); }}
        onKeyDown={handleKeyDown}
        className="w-full pl-9 pr-9 py-3 border rounded-xl text-sm sm:text-base font-extrabold focus:outline-none transition-all shadow-sm bg-white text-gray-900 border-gray-300 focus:border-[#00A5D9]"
      />
      {value && (
        <button
          type="button"
          aria-label="Clear"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => { onChange(""); setOpen(true); }}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      )}

      {showList && (
        <div className="absolute z-40 left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          <div className="max-h-72 overflow-y-auto py-1">
            {options.length === 0 ? (
              <p className="px-3 py-3 text-sm text-gray-500">No airport found. Try the airport or city name.</p>
            ) : (
              <>
                {!value.trim() && <p className="px-3 pt-2 pb-1 text-[11px] font-bold text-gray-400 uppercase tracking-wide">Popular Airports</p>}
                {options.map((a, i) => (
                  <button
                    key={a.label}
                    type="button"
                    role="option"
                    aria-selected={i === active}
                    onMouseDown={(e) => e.preventDefault()}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => select(a.label)}
                    className={clsx(
                      "w-full text-left px-3 py-2.5 text-sm font-medium text-gray-900 cursor-pointer",
                      i === active ? "bg-blue-50" : "hover:bg-blue-50"
                    )}
                  >
                    {a.label}
                  </button>
                ))}
              </>
            )}
          </div>
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

const CATEGORY_TABS = [
  { id: "outstation", label: "Outstation", shortLabel: "Outstation", Icon: Car },
  { id: "airport", label: "Airport", shortLabel: "Airport", Icon: Plane },
  { id: "hourly", label: "Hourly Rentals", shortLabel: "Hourly", Icon: Clock },
] as const;

/** Pill-style radio group: native radios stay in the DOM (keyboard + screen readers), the label is the visible button. */
function Segmented<T extends string>({ name, value, onChange, options, className }: {
  name: string;
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string; badge?: string }[];
  className?: string;
}) {
  return (
    <div
      role="radiogroup"
      className={clsx("grid gap-1 rounded-xl bg-gray-100 p-1", className)}
      style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}
    >
      {options.map((o) => {
        const on = o.value === value;
        return (
          <label
            key={o.value}
            className={clsx(
              "flex items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-[13px] sm:text-sm font-extrabold cursor-pointer select-none transition-all focus-within:ring-2 focus-within:ring-[#00A5D9]/40",
              on ? "bg-[#00A5D9] text-white shadow-sm" : "text-gray-700 hover:bg-white/70"
            )}
          >
            <input type="radio" name={name} checked={on} onChange={() => onChange(o.value)} className="sr-only" />
            <span className="whitespace-nowrap">{o.label}</span>
            {o.badge && (
              <span className={clsx("rounded px-1.5 py-0.5 text-[9px] font-black leading-none", on ? "bg-white/25 text-white" : "bg-[#00b074] text-white")}>
                {o.badge}
              </span>
            )}
          </label>
        );
      })}
    </div>
  );
}

export function CabSearchWidget() {
  const router = useRouter();
  const [tab, setTab] = useState<"outstation" | "airport" | "hourly">("outstation");
  const [tripType, setTripType] = useState<"oneway" | "roundtrip">("oneway");
  const [airportDir, setAirportDir] = useState<"from" | "to">("to");
  const config = useWebConfig();
  const [hourlyPackage, setHourlyPackage] = useState("");

  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [sameDropForHourly, setSameDropForHourly] = useState(false);

  const [hasStop, setHasStop] = useState(false);
  const [stopLocation, setStopLocation] = useState("");

  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [passengers, setPassengers] = useState("2");
  const [formError, setFormError] = useState("");
  const activePackage = config?.localPackages.find((p) => p.label === hourlyPackage)?.label ?? config?.localPackages[0]?.label ?? "";
  const isRoundTrip = tab === "outstation" && tripType === "roundtrip";
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

  const airportFrom = tab === "airport" && airportDir === "from";
  const airportTo = tab === "airport" && airportDir === "to";

  // Entering the Airport tab or switching direction: earlier entries don't fit, start clean.
  useEffect(() => {
    if (tab === "airport") { setFromLocation(""); setToLocation(""); }
  }, [tab, airportDir]);

  // Sync TO location if Same Pickup & Drop-off is checked in Hourly Rentals
  useEffect(() => {
    if (tab === "hourly" && sameDropForHourly) {
      setToLocation(fromLocation);
    }
  }, [tab, sameDropForHourly, fromLocation]);

  const swapPlaces = () => {
    setFromLocation(toLocation);
    setToLocation(fromLocation);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const from = fromLocation.trim();
    const to = toLocation.trim();
    const stop = tab === "outstation" && hasStop ? stopLocation.trim() : "";

    if (!from) return setFormError("Please enter pickup city or location.");
    if (!to && tab !== "hourly") return setFormError("Please enter destination city or landmark.");
    if (tab !== "hourly" && cityKey(from) === cityKey(to)) return setFormError("Pickup and destination cannot be the same.");
    if (stop && (cityKey(stop) === cityKey(from) || cityKey(stop) === cityKey(to))) {
      return setFormError("Intermediate stop must be different from pickup and destination.");
    }
    if (pickupDate < todayLocal()) return setFormError("Pickup date cannot be in the past.");
    if (isRoundTrip && !returnDate) return setFormError("Please select a return date.");
    if (isRoundTrip && returnDate < pickupDate) return setFormError("Return date cannot be before the pickup date.");
    if (pickupDate === todayLocal() && pickupTime) {
      const [h, m] = pickupTime.split(":").map(Number);
      const pickup = new Date();
      pickup.setHours(h, m, 0, 0);
      if (pickup.getTime() < Date.now() - 15 * 60 * 1000) return setFormError("Pickup time has already passed.");
    }
    if (tab === "airport") {
      // Airport side must be one of the listed airports; the address side is any searched place.
      const airportSide = airportFrom ? from : to;
      if (!AIRPORTS.some((a) => a.label === airportSide)) return setFormError("Please select an airport from the list.");
    } else {
      // Pickup must be one of the cities we serve (same list the FROM suggestions show).
      const served = await suggestLocations(from);
      if (!served.some((c) => cityKey(c.value) === cityKey(from))) {
        return setFormError("Service is not available at this pickup location. Please pick a city from the list.");
      }
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
    if (tab === "airport") params.set("airportDir", airportDir);
    if (stop) params.set("stop", stop);
    if (isRoundTrip) params.set("returnDate", returnDate);

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

              {/* 1. Trip category tabs */}
              <div role="tablist" aria-label="Trip category" className="grid grid-cols-3 gap-1 rounded-xl bg-gray-100 p-1 mb-2">
                {CATEGORY_TABS.map(({ id, label, shortLabel, Icon }) => {
                  const active = tab === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setTab(id)}
                      className={clsx(
                        "flex items-center justify-center gap-1.5 rounded-lg px-1 py-2 text-[13px] sm:text-sm font-extrabold transition-all cursor-pointer",
                        active ? "bg-white text-[#00A5D9] shadow-sm ring-1 ring-black/5" : "text-gray-500 hover:text-gray-800"
                      )}
                    >
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                      <span className="truncate">
                        <span className="sm:hidden">{shortLabel}</span>
                        <span className="hidden sm:inline">{label}</span>
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* 2. Quality Banner */}
              <div className="bg-[#f0f6ff] border border-blue-100 rounded-lg px-3 py-1 flex flex-wrap items-center justify-between shadow-xs mb-1.5 gap-2">
                <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gray-700">
                  <ShieldCheck className="w-4 h-4 text-[#00A5D9]" />
                  <span>Clean and Quality cabs • 100% On-time guarantee</span>
                </div>
              </div>

              <form onSubmit={handleSearch} className="space-y-1.5">

                {/* 3. Trip type */}
                {tab === "outstation" && (
                  <Segmented
                    name="triptype"
                    value={tripType}
                    onChange={setTripType}
                    className="sm:max-w-[320px]"
                    options={[
                      { value: "oneway", label: "One Way" },
                      { value: "roundtrip", label: "Round Trip", badge: "Save" },
                    ]}
                  />
                )}

                {tab === "airport" && (
                  <Segmented
                    name="airportdir"
                    value={airportDir}
                    onChange={setAirportDir}
                    className="sm:max-w-[440px]"
                    options={[
                      { value: "from", label: "Pickup from Airport" },
                      { value: "to", label: "Drop to Airport" },
                    ]}
                  />
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

                {/* 4. Location fields */}
                <div className="space-y-2">
                  <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-1.5 md:gap-2 md:items-end">

                    {/* FROM */}
                    <div className="relative min-w-0">
                      <div className="flex items-center gap-1 mb-0.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-wider">FROM</label>
                      </div>
                      {airportFrom ? (
                        <AirportInput value={fromLocation} onChange={setFromLocation} ariaLabel="From airport" placeholder="Start typing airport name or city" />
                      ) : (
                        <LocationInput
                          value={fromLocation}
                          onChange={setFromLocation}
                          ariaLabel="From"
                          mode={airportTo ? "to" : "from"}
                          bare={airportTo}
                          placeholder={airportTo ? "Enter pickup address" : "Enter pickup city or location"}
                          required
                        />
                      )}
                    </div>

                    {/* Swap FROM <-> TO (outstation only) */}
                    <div className="relative z-10 flex justify-end md:justify-center -my-3.5 md:my-0 md:pb-1 pr-4 md:pr-0">
                      {tab === "outstation" ? (
                        <button
                          type="button"
                          onClick={swapPlaces}
                          disabled={!fromLocation && !toLocation}
                          aria-label="Swap pickup and destination"
                          title="Swap pickup and destination"
                          className="w-9 h-9 rounded-full bg-white border border-gray-300 text-[#00A5D9] shadow-sm flex items-center justify-center hover:bg-[#f0f9ff] hover:border-[#00A5D9] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                        >
                          <ArrowLeftRight className="w-4 h-4 rotate-90 md:rotate-0" />
                        </button>
                      ) : (
                        <span className="hidden md:block w-9" />
                      )}
                    </div>

                    {/* TO */}
                    <div className="relative min-w-0">
                      <div className="flex items-center gap-1 mb-0.5">
                        <span className="w-2 h-2 rounded-full bg-[#FF6600]" />
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-wider">TO</label>
                      </div>
                      {airportTo ? (
                        <AirportInput value={toLocation} onChange={setToLocation} ariaLabel="Drop airport" placeholder="Start typing airport name or city" />
                      ) : (
                        <LocationInput
                          value={toLocation}
                          onChange={setToLocation}
                          mode="to"
                          bare={airportFrom}
                          placeholder={
                            tab === "hourly" && sameDropForHourly ? "Same as Pickup"
                              : airportFrom ? "Enter drop address"
                              : "Enter destination"
                          }
                          required={tab !== "hourly"}
                          disabled={tab === "hourly" && sameDropForHourly}
                        />
                      )}
                    </div>
                  </div>

                  {/* Optional stop on the way (outstation only) */}
                  {tab === "outstation" && (
                    hasStop ? (
                      <div className="flex items-start gap-2.5 rounded-xl border border-blue-200 bg-blue-50/60 p-2.5">
                        <span className="mt-1 w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <label className="mb-0.5 block text-[10px] font-black uppercase tracking-wider text-blue-900">Stop on the way</label>
                          <LocationInput
                            value={stopLocation}
                            onChange={setStopLocation}
                            mode="to"
                            required
                            placeholder="e.g. Mathura, Vrindavan, Agra..."
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => { setStopLocation(""); setHasStop(false); }}
                          aria-label="Remove stop"
                          title="Remove stop"
                          className="mt-4 rounded-full p-1.5 text-gray-500 hover:bg-white hover:text-red-600 cursor-pointer transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setHasStop(true)}
                        className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-[#00A5D9]/60 bg-[#f0f9ff] px-3.5 py-1.5 text-xs font-extrabold text-[#0B7AA8] hover:bg-[#e0f2fe] hover:border-[#00A5D9] cursor-pointer transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add a stop on the way
                      </button>
                    )
                  )}

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

                {/* 5. Trip Details Row */}
                <div className={clsx("grid grid-cols-1 gap-1.5", isRoundTrip ? "sm:grid-cols-4" : "sm:grid-cols-3")}>

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

                  {/* RETURN DATE (round trip only) */}
                  {isRoundTrip && (
                    <div className="p-1 px-3 bg-[#f8fafc] rounded-xl border border-gray-200 flex items-center gap-2 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="block text-[8px] font-black text-gray-400 uppercase tracking-wider">RETURN DATE</span>
                        <input
                          type="date"
                          value={returnDate}
                          min={pickupDate || todayLocal()}
                          onChange={(e) => setReturnDate(e.target.value)}
                          required
                          className="w-full text-xs font-black text-gray-900 bg-transparent outline-none cursor-pointer"
                        />
                      </div>
                    </div>
                  )}

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
