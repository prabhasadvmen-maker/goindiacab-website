"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowRight, Briefcase, Car, ChevronDown, ChevronUp,
  BadgeCheck, Clock, Filter, Fuel, Pencil, Route, ShieldCheck, Snowflake, Sparkles, Star, Users, X,
} from "lucide-react";
import {
  FALLBACK_IMG, TRIP_LABEL, formatDate,
  apiTripType, inr, nowMs, tripDays,
  AIRPORT_DIR_LABEL, type AirportDir, type BookingData, type CabOption, type FareBreakdown,
} from "@/src/lib/booking";
import {
  getDistanceApi, getVehicles, calculateFareApi, getWebConfig, formatCancelWindow,
  ApiError, type ApiVehicle,
} from "@/src/lib/api";

type Sort = "price" | "rating";

type CabCard = {
  cab: CabOption;
  fare: FareBreakdown;
  partPercent?: number;
};

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden animate-pulse">
      <div className="grid grid-cols-[96px_minmax(0,1fr)_auto] sm:grid-cols-[176px_minmax(0,1fr)_auto] gap-x-3 sm:gap-x-5 px-3 sm:px-5 py-4">
        <div className="h-16 sm:h-28 bg-gray-200 rounded-xl" />
        <div className="space-y-2.5">
          <div className="h-5 w-2/3 bg-gray-200 rounded" />
          <div className="h-3.5 w-1/2 bg-gray-200 rounded" />
          <div className="h-4 w-3/4 bg-gray-200 rounded" />
        </div>
        <div className="h-8 w-16 sm:w-24 bg-gray-200 rounded self-center" />
      </div>
      <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-3 sm:px-5 py-2.5">
        <div className="h-4 w-40 bg-gray-200 rounded" />
        <div className="h-10 w-28 bg-gray-200 rounded-xl" />
      </div>
    </div>
  );
}

// Convert ApiVehicle → CabOption for display
function apiVehicleToCabOption(v: ApiVehicle): CabOption {
  return {
    id: v.id,
    name: v.name,
    model: v.model,
    seats: v.seats,
    bags: v.bags,
    image: v.imageUrl || FALLBACK_IMG,
    rating: v.rating,
    fuelType: v.fuelType || undefined,
    gstPercent: v.gstPercent,
  };
}

type FilterOption = { value: string; label: string; count: number };

function FilterGroup({ title, options, selected, onToggle, onClear }: {
  title: string;
  options: FilterOption[];
  selected: string[];
  onToggle: (v: string) => void;
  onClear: () => void;
}) {
  const [open, setOpen] = useState(true);
  if (options.length === 0) return null;
  return (
    <div className="border-t border-gray-100 pt-4">
      <div className="flex items-center justify-between mb-2">
        <button type="button" onClick={() => setOpen((o) => !o)} className="flex items-center gap-1.5 text-sm font-bold text-gray-800 cursor-pointer">
          {title} {open ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
        </button>
        {selected.length > 0 && (
          <button type="button" onClick={onClear} className="text-xs font-bold text-[#0B4A9C] cursor-pointer">CLEAR</button>
        )}
      </div>
      {open && options.map((o) => (
        <label key={o.value} className="flex items-center gap-2 py-1.5 text-sm text-gray-700 cursor-pointer">
          <input type="checkbox" checked={selected.includes(o.value)} onChange={() => onToggle(o.value)} className="accent-[#0B4A9C] w-4 h-4" />
          <span className="flex-1 min-w-0 truncate">{o.label}</span>
          <span className="text-xs text-gray-400">({o.count})</span>
        </label>
      ))}
    </div>
  );
}

const countBy = (items: string[]): FilterOption[] => {
  const m = new Map<string, number>();
  items.filter(Boolean).forEach((i) => m.set(i, (m.get(i) ?? 0) + 1));
  return [...m.entries()].map(([value, count]) => ({ value, label: value, count }));
};

const fmtDuration = (mins: number) => `${(mins / 60).toFixed(1)} hr(s)`;

function SearchInner() {
  const router = useRouter();
  const sp = useSearchParams();

  const from = sp.get("from") ?? "";
  const to = sp.get("to") ?? "";
  const date = sp.get("date") ?? "";
  const time = sp.get("time") ?? "10:00";
  const tripType = sp.get("tripType") ?? "oneway";
  const passengers = sp.get("passengers") ?? "2";
  const airportDir: AirportDir | undefined = tripType === "airport" ? (sp.get("airportDir") === "from" ? "from" : "to") : undefined;
  const pkgParam = sp.get("pkg") ?? "";
  const stop = sp.get("stop") ?? "";
  const returnDate = tripType === "roundtrip" ? sp.get("returnDate") ?? "" : "";
  const days = tripDays(date, returnDate);

  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState<Sort>("price");
  const [types, setTypes] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [fuels, setFuels] = useState<string[]>([]);
  const [durationMins, setDurationMins] = useState(0);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [sheet, setSheet] = useState(false);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({ from, to, date, time, tripType, passengers });
  const [draftErr, setDraftErr] = useState("");
  const [cabs, setCabs] = useState<CabCard[]>([]);
  const [distanceKm, setDistanceKm] = useState(0);
  const [pkg, setPkg] = useState(pkgParam);
  const [cancelText, setCancelText] = useState("");
  const [loadError, setLoadError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  // Sync draft when URL params change
  useEffect(() => {
    setDraft({ from, to, date, time, tripType, passengers });
  }, [from, to, date, time, tripType, passengers]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setLoadError("");
    setCabs([]);

    const fail = (msg: string) => {
      if (cancelled) return;
      setLoadError(msg);
      setLoading(false);
    };

    async function load() {
      const config = await getWebConfig();
      if (cancelled) return;
      if (config) setCancelText(formatCancelWindow(config.freeCancelMinutes));

      // Step 1: distance / included km for the selected trip type
      let km = 0;
      let mins = 0;
      let activePkg = "";
      if (tripType === "local") {
        const pkgs = config?.localPackages ?? [];
        const chosen = pkgs.find((p) => p.label === pkgParam) ?? pkgs[0];
        if (!chosen) return fail("Local rental packages are not available right now.");
        activePkg = chosen.label;
        km = chosen.km;
      } else {
        let distRes: Awaited<ReturnType<typeof getDistanceApi>>;
        try {
          distRes = await getDistanceApi(from, to, stop);
        } catch (err) {
          if (cancelled) return;
          return fail(err instanceof ApiError ? "Service is not available at this pickup location." : "We could not calculate the distance for this route. Please check the locations and try again.");
        }
        if (cancelled) return;
        if (!distRes) return fail("We could not calculate the distance for this route. Please check the locations and try again.");
        km = distRes.distanceKm;
        mins = distRes.durationMins;
      }
      setPkg(activePkg);
      setDistanceKm(km);
      setDurationMins(mins);

      // Step 2: vehicles
      const apiVehicles = await getVehicles();
      if (cancelled) return;
      if (apiVehicles === null) return fail("We could not load the cab list. Please try again.");
      if (apiVehicles.length === 0) return fail("No cabs are available right now.");

      // Step 3: fares, in parallel
      const fares = await Promise.all(apiVehicles.map((v) => calculateFareApi({
        vehicleType: v.id,
        distanceKm: km,
        tripType: apiTripType(tripType),
        package: tripType === "local" ? activePkg : undefined,
        days,
        airportDir,
      })));
      if (cancelled) return;

      const results: CabCard[] = [];
      apiVehicles.forEach((v, i) => {
        const apiFare = fares[i];
        if (!apiFare) return; // fare unavailable for this vehicle (e.g. no local package) - do not show a guessed price
        results.push({
          cab: apiVehicleToCabOption(v),
          fare: {
            baseFare: apiFare.baseFare,
            extraKmFare: apiFare.extraKmFare,
            driverAllowance: apiFare.driverAllowance,
            gst: apiFare.gst,
            total: apiFare.total,
            billableKm: apiFare.billableKm,
            includedKm: apiFare.includedKm,
            perKmAfter: apiFare.perKmAfter,
          },
          partPercent: apiFare.paymentOptions?.part?.percent,
        });
      });
      if (results.length === 0) return fail("Fares are not available for this trip right now.");

      setCabs(results);
      setLoading(false);
    }

    load();
    return () => { cancelled = true; };
  }, [from, to, stop, date, time, tripType, airportDir, pkgParam, days, reloadKey]);

  const sameCity = from.trim().toLowerCase() === to.trim().toLowerCase() && tripType !== "local";

  const filtered = cabs
    .filter((c) => types.length === 0 || types.includes(c.cab.id))
    .filter((c) => models.length === 0 || models.includes(c.cab.model))
    .filter((c) => fuels.length === 0 || fuels.includes(c.cab.fuelType ?? ""))
    .sort((a, b) => sort === "price" ? a.fare.total - b.fare.total : b.cab.rating - a.cab.rating);

  const selectCab = (cab: CabOption, fare: FareBreakdown, partPercent?: number) => {
    const data: BookingData = {
      from, to, date, time, tripType, passengers,
      ...(airportDir ? { airportDir } : {}),
      ...(stop ? { stop } : {}),
      ...(returnDate ? { returnDate, days } : {}),
      vehicle: {
        id: cab.id, name: cab.name, model: cab.model,
        seats: cab.seats, image: cab.image, gstPercent: cab.gstPercent,
        rating: cab.rating, fuelType: cab.fuelType,
        includedKm: fare.includedKm, billableKm: fare.billableKm, bags: cab.bags, perKmAfter: fare.perKmAfter,
        fare: {
          baseFare: fare.baseFare, extraKmFare: fare.extraKmFare,
          driverAllowance: fare.driverAllowance, gst: fare.gst, total: fare.total,
        },
      },
      distanceKm,
      pkg: tripType === "local" ? pkg : undefined,
      partPercent,
      selectedAt: nowMs(),
    };
    try { localStorage.setItem("bookingData", JSON.stringify(data)); } catch { /* ignore */ }
    router.push("/checkout");
  };

  const applyModify = () => {
    const f = draft.from.trim();
    const t = draft.to.trim();
    if (!f || !t) return setDraftErr("Enter both FROM and TO");
    if (f.toLowerCase() === t.toLowerCase()) return setDraftErr("From and To cannot be the same");
    if (!draft.date) return setDraftErr("Select a pickup date");
    setDraftErr("");
    const p = new URLSearchParams({ ...draft, from: f, to: t });
    if (tripType === "local" && pkg) p.set("pkg", pkg);
    if (stop) p.set("stop", stop);
    if (airportDir) p.set("airportDir", airportDir);
    if (returnDate) p.set("returnDate", returnDate);
    router.replace(`/search?${p.toString()}`);
    setEditing(false);
  };

  const toggleIn = (set: React.Dispatch<React.SetStateAction<string[]>>) => (id: string) =>
    set((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id]);
  const clearAll = () => { setTypes([]); setModels([]); setFuels([]); };

  const typeOptions: FilterOption[] = cabs.map(({ cab }) => ({ value: cab.id, label: cab.name, count: 1 }));
  const modelOptions = countBy(cabs.map((c) => c.cab.model).filter((m) => m.length <= 40));
  const fuelOptions = countBy(cabs.map((c) => c.cab.fuelType ?? ""));
  const hasRatings = cabs.some((c) => c.cab.rating > 0);
  const hasFilters = types.length + models.length + fuels.length > 0;
  const lowestId = filtered.length > 1 ? filtered.reduce((a, b) => (b.fare.total < a.fare.total ? b : a)).cab.id : null;
  const topRated = filtered.length > 1 ? filtered.reduce((a, b) => (b.cab.rating > a.cab.rating ? b : a)) : null;
  const topRatedId = topRated && topRated.cab.rating > 0 && topRated.cab.id !== lowestId ? topRated.cab.id : null;

  const filters = (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-bold text-gray-800 mb-3">Sort by</h3>
        {(hasRatings ? (["price", "rating"] as Sort[]) : (["price"] as Sort[])).map((s) => (
          <label key={s} className="flex items-center gap-2 py-1.5 text-sm text-gray-700 cursor-pointer">
            <input type="radio" name="sort" checked={sort === s} onChange={() => setSort(s)} className="accent-[#0B4A9C]" />
            {s === "price" ? "Price (low to high)" : "Rating (high to low)"}
          </label>
        ))}
      </div>
      {hasFilters && (
        <button type="button" onClick={clearAll} className="text-xs font-bold text-[#0B4A9C] cursor-pointer">CLEAR ALL FILTERS</button>
      )}
      <FilterGroup title="Cab Type" options={typeOptions} selected={types} onToggle={toggleIn(setTypes)} onClear={() => setTypes([])} />
      <FilterGroup title="Cab Model" options={modelOptions} selected={models} onToggle={toggleIn(setModels)} onClear={() => setModels([])} />
      <FilterGroup title="Fuel Type" options={fuelOptions} selected={fuels} onToggle={toggleIn(setFuels)} onClear={() => setFuels([])} />
    </div>
  );

  const inputCls = "w-full h-11 px-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#0B4A9C] bg-white";

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* Sticky summary bar — sits below Header (h-16) */}
      <div className="sticky top-16 z-30 bg-[#0B4A9C] text-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="min-w-0 text-sm sm:text-base font-semibold truncate">
            {from || "—"} 
            {stop && <span className="text-white/70"> → {stop}</span>}
            <ArrowRight className="inline w-4 h-4 mx-1" /> {to || "—"}
            <span className="hidden sm:inline text-white/80 font-normal">
              {" "}| {date ? formatDate(date) : "—"} | {airportDir ? AIRPORT_DIR_LABEL[airportDir] : TRIP_LABEL[tripType] ?? tripType}
            </span>
          </div>
          <button
            onClick={() => { setDraft({ from, to, date, time, tripType, passengers }); setEditing((v) => !v); }}
            className="shrink-0 flex items-center gap-1.5 bg-white text-[#0B4A9C] text-sm font-bold px-4 py-1.5 rounded-xl cursor-pointer"
          >
            <Pencil className="w-3.5 h-3.5" /> Modify
          </button>
        </div>
        {editing && (
          <div className="bg-white text-gray-800 border-t border-gray-100">
            <div className="max-w-6xl mx-auto px-4 py-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 items-end">
              <input aria-label="From" className={inputCls} value={draft.from} onChange={(e) => setDraft({ ...draft, from: e.target.value })} placeholder="From" />
              <input aria-label="To" className={inputCls} value={draft.to} onChange={(e) => setDraft({ ...draft, to: e.target.value })} placeholder="To" />
              <input aria-label="Date" type="date" className={inputCls} value={draft.date} onChange={(e) => setDraft({ ...draft, date: e.target.value })} />
              <input aria-label="Time" type="time" className={inputCls} value={draft.time} onChange={(e) => setDraft({ ...draft, time: e.target.value })} />
              <select aria-label="Trip type" className={inputCls} value={draft.tripType} onChange={(e) => setDraft({ ...draft, tripType: e.target.value })}>
                <option value="oneway">One Way</option>
                <option value="roundtrip">Round Trip</option>
              </select>
              <div className="flex gap-2">
                <select aria-label="Passengers" className={inputCls} value={draft.passengers} onChange={(e) => setDraft({ ...draft, passengers: e.target.value })}>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => <option key={n}>{n}</option>)}
                </select>
                <button onClick={applyModify} className="px-4 rounded-xl bg-[#FF6600] text-white font-bold text-sm cursor-pointer">Search</button>
              </div>
              {draftErr && <p className="text-xs text-red-600 sm:col-span-2 lg:col-span-6">{draftErr}</p>}
            </div>
          </div>
        )}
      </div>

      <div className="max-w-6xl mx-auto px-4 pt-6 flex gap-6">
        <aside className="hidden lg:block w-60 shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 sticky top-36">{filters}</div>
        </aside>

        <main className="flex-1 min-w-0">
          {/* Mobile quick filters: sheet + cab type chips */}
          <div className="lg:hidden -mx-4 mb-4 px-4 flex items-center gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <button
              onClick={() => setSheet(true)}
              className="shrink-0 flex items-center gap-2 bg-white border border-gray-300 rounded-full px-4 h-10 text-sm font-semibold text-gray-700 cursor-pointer"
            >
              <Filter className="w-4 h-4" /> Sort &amp; Filter
              {types.length + models.length + fuels.length > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#0B4A9C] text-white text-[11px] font-bold flex items-center justify-center">
                  {types.length + models.length + fuels.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setTypes([])}
              className={`shrink-0 rounded-full px-5 h-10 text-sm font-semibold border cursor-pointer ${types.length === 0 ? "bg-[#0B4A9C] border-[#0B4A9C] text-white" : "bg-white border-gray-300 text-gray-700"}`}
            >
              All
            </button>
            {cabs.map(({ cab }) => (
              <button
                key={cab.id}
                onClick={() => setTypes(types.length === 1 && types[0] === cab.id ? [] : [cab.id])}
                className={`shrink-0 rounded-full px-5 h-10 text-sm font-semibold border cursor-pointer whitespace-nowrap ${types.includes(cab.id) ? "bg-[#0B4A9C] border-[#0B4A9C] text-white" : "bg-white border-gray-300 text-gray-700"}`}
              >
                {cab.name}
              </button>
            ))}
          </div>

          {sameCity ? (
            <div className="bg-white rounded-xl shadow-sm border border-red-100 p-8 text-center">
              <Car className="w-10 h-10 mx-auto text-gray-300 mb-3" />
              <p className="font-bold text-gray-800">Pickup and drop cannot be the same city</p>
              <p className="text-sm text-red-600 mt-1">Please tap Modify and choose a different destination.</p>
            </div>
          ) : loadError ? (
            <div className="bg-white rounded-xl shadow-sm border border-red-100 p-8 text-center">
              <Car className="w-10 h-10 mx-auto text-gray-300 mb-3" />
              <p className="font-bold text-gray-800">{loadError}</p>
              <button onClick={() => setReloadKey((k) => k + 1)} className="mt-4 px-5 py-2.5 rounded-xl bg-[#FF6600] text-white font-bold text-sm cursor-pointer">Try again</button>
            </div>
          ) : loading ? (
            <div className="space-y-4">{[0, 1, 2, 3].map((i) => <SkeletonCard key={i} />)}</div>
          ) : filtered.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-600">No cabs match your filters.</div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-3 divide-x divide-gray-200 rounded-2xl bg-white border border-gray-200 shadow-sm py-3">
                {[
                  { icon: BadgeCheck, label: "Trusted Drivers" },
                  { icon: Sparkles, label: "Clean Cabs" },
                  { icon: Clock, label: "On-Time Pickup" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex flex-col sm:flex-row items-center justify-center gap-1.5 px-1 text-center text-[11px] sm:text-sm font-bold text-gray-800">
                    <Icon className="w-5 h-5 shrink-0 text-[#0B4A9C]" /> {label}
                  </div>
                ))}
              </div>
              <p className="rounded-xl border border-blue-100 bg-blue-50/60 px-3 py-2 text-xs sm:text-sm text-gray-700">
                {tripType === "local" || tripType === "airport" ? (
                  <>{filtered.length} cab{filtered.length === 1 ? "" : "s"} available</>
                ) : (
                  <>
                    Rates for <b>{distanceKm} Kms</b> approx distance
                    {durationMins > 0 && <> | <b>{fmtDuration(durationMins)}</b> approx time</>}
                    {tripType === "roundtrip" ? " (each way)" : ""}
                    {" "}· {filtered.length} cab{filtered.length === 1 ? "" : "s"} available
                  </>
                )}
              </p>
              {filtered.map(({ cab, fare, partPercent }) => {
                const minBilling = tripType !== "local" && fare.billableKm > Math.round(distanceKm * (tripType === "roundtrip" ? 2 : 1));
                const badge = cab.id === lowestId ? "LOWEST PRICE" : cab.id === topRatedId ? "TOP RATED" : "";
                return (
                  <article key={cab.id} className="relative bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-gray-300 transition overflow-hidden">
                    {badge && (
                      <span className={`absolute top-0 left-0 z-10 text-[10px] sm:text-[11px] font-extrabold tracking-wide px-3 py-1 rounded-br-xl ${badge === "LOWEST PRICE" ? "bg-amber-400 text-amber-950" : "bg-[#0B4A9C] text-white"}`}>
                        {badge}
                      </span>
                    )}
                    <div className={`grid grid-cols-[96px_minmax(0,1fr)_auto] sm:grid-cols-[176px_minmax(0,1fr)_auto] gap-x-3 sm:gap-x-5 px-3 sm:px-5 ${badge ? "pt-8" : "pt-4"} pb-4`}>
                      {/* Image + fuel */}
                      <div className="flex flex-col items-center justify-center gap-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={cab.image}
                          alt={cab.name}
                          onError={(e) => { if (!e.currentTarget.src.endsWith(FALLBACK_IMG)) e.currentTarget.src = FALLBACK_IMG; }}
                          className="w-full h-16 sm:h-28 object-contain"
                        />
                        {cab.fuelType && (
                          <span className="inline-flex items-center gap-1 rounded-full border border-teal-200 bg-teal-50 text-teal-700 text-[10px] sm:text-xs font-bold px-2.5 py-0.5">
                            <Fuel className="w-3 h-3" /> {cab.fuelType}
                          </span>
                        )}
                      </div>

                      {/* Details */}
                      <div className="min-w-0">
                        <h2 className="text-base sm:text-lg font-extrabold text-gray-900 leading-tight truncate">{cab.name}</h2>
                        <div className="mt-0.5 flex items-center gap-2 min-w-0">
                          <p className="text-xs sm:text-sm text-gray-500 truncate">{cab.model || "or similar"}</p>
                          {cab.rating > 0 && (
                            <span className="shrink-0 inline-flex items-center gap-0.5 rounded-md bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-bold px-1.5 py-0.5">
                              <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {cab.rating}
                            </span>
                          )}
                        </div>
                        <p className="mt-2 flex items-center gap-1.5 text-sm font-bold text-gray-900">
                          <Route className="w-4 h-4 text-[#0B4A9C] shrink-0" />
                          {fare.billableKm} km {minBilling ? "minimum billing" : "included"}
                        </p>
                        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-gray-600">
                          <span className="flex items-center gap-1"><Users className="w-4 h-4 text-gray-400" /> {cab.seats}</span>
                          {cab.bags > 0 && <span className="flex items-center gap-1"><Briefcase className="w-4 h-4 text-gray-400" /> {cab.bags}</span>}
                          <span className="flex items-center gap-1"><Snowflake className="w-4 h-4 text-gray-400" /> AC</span>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-right self-center pl-1">
                        <p className="text-xl sm:text-3xl font-extrabold text-gray-900 leading-none">{inr(fare.total)}</p>
                        <p className="mt-1 text-[11px] sm:text-xs text-gray-500">incl. taxes &amp; charges</p>
                        <button
                          type="button"
                          onClick={() => setExpanded(expanded === cab.id ? null : cab.id)}
                          aria-expanded={expanded === cab.id}
                          className="mt-2 inline-flex items-center gap-0.5 text-xs font-semibold text-[#0B4A9C] cursor-pointer"
                        >
                          Fare details {expanded === cab.id ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    {expanded === cab.id && (
                      <div className="mx-3 sm:mx-5 mb-4 rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700 space-y-1.5">
                        <div className="flex justify-between"><span>Base fare</span><span>{inr(fare.baseFare)}</span></div>
                        {fare.extraKmFare > 0 && (
                          <div className="flex justify-between"><span>Extra km charges</span><span>{inr(fare.extraKmFare)}</span></div>
                        )}
                        <div className="flex justify-between"><span>Driver allowance</span><span>{inr(fare.driverAllowance)}</span></div>
                        <div className="flex justify-between"><span>GST{cab.gstPercent != null ? ` (${cab.gstPercent}%)` : ""}</span><span>{inr(fare.gst)}</span></div>
                        <div className="flex justify-between font-bold text-gray-900 border-t border-gray-200 pt-2"><span>Total</span><span>{inr(fare.total)}</span></div>
                      </div>
                    )}

                    {/* Footer: cancellation + CTA */}
                    <div className="flex items-center justify-between gap-3 border-t border-gray-200 bg-gray-50 px-3 sm:px-5 py-2.5">
                      <p className="flex items-center gap-1.5 text-xs font-semibold text-green-700 min-w-0">
                        <ShieldCheck className="w-4 h-4 shrink-0" />
                        <span className="line-clamp-2">Free cancellation{cancelText ? ` up to ${cancelText} before pickup` : ""}</span>
                      </p>
                      <button
                        onClick={() => selectCab(cab, fare, partPercent)}
                        className="shrink-0 px-5 sm:px-7 py-2.5 rounded-xl bg-[#FF6600] hover:bg-[#e65c00] active:scale-[0.98] text-white font-bold text-sm shadow-md shadow-orange-500/25 cursor-pointer transition"
                      >
                        SELECT CAB
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </main>
      </div>

      {/* Mobile filter bottom sheet */}
      {sheet && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSheet(false)} />
          <div className="absolute bottom-0 inset-x-0 bg-white rounded-t-2xl p-5 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">Sort &amp; Filter</h3>
              <button onClick={() => setSheet(false)} aria-label="Close" className="cursor-pointer"><X className="w-5 h-5" /></button>
            </div>
            {filters}
            <button onClick={() => setSheet(false)} className="mt-6 w-full py-3 rounded-xl bg-[#FF6600] text-white font-bold cursor-pointer">
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SearchResultsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
      <SearchInner />
    </Suspense>
  );
}
