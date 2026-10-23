"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowRight, Briefcase, Car, ChevronDown, ChevronUp,
  Filter, Pencil, ShieldCheck, Snowflake, Star, Users, X,
} from "lucide-react";
import {
  CABS, FALLBACK_IMG, TRIP_LABEL, calculateFare, formatDate,
  apiTripType, getDistance, inr, nowMs,
  type BookingData, type CabOption, type FareBreakdown,
} from "@/src/lib/booking";
import {
  getDistanceApi, getVehicles, calculateFareApi,
  type ApiVehicle,
} from "@/src/lib/api";

type Sort = "price" | "rating";

type CabCard = {
  cab: CabOption;
  fare: FareBreakdown;
  partPercent?: number;
};

function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col sm:flex-row gap-4 animate-pulse">
      <div className="sm:w-48 h-28 bg-gray-200 rounded-xl" />
      <div className="flex-1 space-y-3">
        <div className="h-5 w-1/3 bg-gray-200 rounded" />
        <div className="h-4 w-2/3 bg-gray-200 rounded" />
        <div className="h-4 w-1/2 bg-gray-200 rounded" />
      </div>
      <div className="sm:w-40 space-y-3">
        <div className="h-7 w-24 bg-gray-200 rounded" />
        <div className="h-11 bg-gray-200 rounded-xl" />
      </div>
    </div>
  );
}

// Convert ApiVehicle → CabOption for display
function apiVehicleToCabOption(v: ApiVehicle): CabOption {
  const typeMap: Record<string, CabOption["type"]> = {
    hatchback: "hatchback", sedan: "sedan", suv: "suv",
    innova: "innova", tempo9: "tempo9",
  };
  return {
    id: v.id,
    type: typeMap[v.id] ?? "sedan",
    name: v.name,
    model: v.model,
    seats: v.seats,
    bags: v.seats <= 4 ? 2 : v.seats <= 6 ? 4 : 5,
    image: v.imageUrl || FALLBACK_IMG,
    rating: 4.8,
  };
}

function SearchInner() {
  const router = useRouter();
  const sp = useSearchParams();

  const from = sp.get("from") ?? "";
  const to = sp.get("to") ?? "";
  const date = sp.get("date") ?? "";
  const time = sp.get("time") ?? "10:00";
  const tripType = sp.get("tripType") ?? "oneway";
  const passengers = sp.get("passengers") ?? "2";
  const pkg = sp.get("pkg") ?? "8 Hrs / 80 Km";

  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState<Sort>("price");
  const [types, setTypes] = useState<string[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [sheet, setSheet] = useState(false);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({ from, to, date, time, tripType, passengers });
  const [draftErr, setDraftErr] = useState("");
  const [cabs, setCabs] = useState<CabCard[]>([]);
  const [distanceKm, setDistanceKm] = useState(300);

  // Sync draft when URL params change
  useEffect(() => {
    setDraft({ from, to, date, time, tripType, passengers });
  }, [from, to, date, time, tripType, passengers]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setCabs([]);

    async function load() {
      // Step 1: Get distance
      let km = 300;
      if (tripType === "local") {
        km = parseInt(pkg.split("/")[1]) || 80;
      } else if (tripType === "airport") {
        km = 35;
      } else {
        const distRes = await getDistanceApi(from, to);
        km = distRes ? distRes.distanceKm : getDistance(from, to);
      }
      if (cancelled) return;
      setDistanceKm(km);

      // Step 2: Get vehicles from API, fallback to static CABS
      const apiVehicles = await getVehicles();
      const cabOptions: CabOption[] = apiVehicles.length > 0
        ? apiVehicles.map(apiVehicleToCabOption)
        : CABS;

      // Step 3: Calculate fare for each vehicle
      const results: CabCard[] = [];
      for (const cab of cabOptions) {
        const apiFare = await calculateFareApi({
          vehicleType: cab.id,
          distanceKm: km,
          tripType: apiTripType(tripType),
          package: tripType === "local" ? pkg : undefined,
        });

        let fare: FareBreakdown;
        let partPercent: number | undefined;
        if (apiFare) {
          fare = {
            baseFare: apiFare.baseFare,
            extraKmFare: apiFare.extraKmFare,
            driverAllowance: apiFare.driverAllowance,
            gst: apiFare.gst,
            total: apiFare.total,
            billableKm: apiFare.billableKm,
          };
          partPercent = apiFare.paymentOptions?.part?.percent;
        } else {
          // fallback to local calculation
          if (tripType === "local") {
            const hrs = parseInt(pkg) || 8;
            fare = calculateFare(cab.type, km, tripType, (hrs / 12) * 0.6 + 0.1);
          } else if (tripType === "airport") {
            fare = calculateFare(cab.type, km, tripType, 0.25);
          } else {
            fare = calculateFare(cab.type, km, tripType);
          }
        }
        results.push({ cab, fare, partPercent });
      }

      if (!cancelled) {
        setCabs(results);
        setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [from, to, date, time, tripType, pkg]);

  const sameCity = from.trim().toLowerCase() === to.trim().toLowerCase() && tripType !== "local";

  const filtered = cabs
    .filter((c) => types.length === 0 || types.includes(c.cab.id))
    .sort((a, b) => sort === "price" ? a.fare.total - b.fare.total : b.cab.rating - a.cab.rating);

  const selectCab = (cab: CabOption, fare: FareBreakdown, partPercent?: number) => {
    const data: BookingData = {
      from, to, date, time, tripType, passengers,
      vehicle: {
        id: cab.id, name: cab.name, model: cab.model,
        seats: cab.seats, image: cab.image,
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
    if (tripType === "local") p.set("pkg", pkg);
    router.replace(`/search?${p.toString()}`);
    setEditing(false);
  };

  const toggleType = (id: string) =>
    setTypes((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id]);

  const allCabIds = cabs.map((c) => c.cab.id);

  const filters = (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-bold text-gray-800 mb-3">Sort by</h3>
        {(["price", "rating"] as Sort[]).map((s) => (
          <label key={s} className="flex items-center gap-2 py-1.5 text-sm text-gray-700 cursor-pointer">
            <input type="radio" name="sort" checked={sort === s} onChange={() => setSort(s)} className="accent-[#0B4A9C]" />
            {s === "price" ? "Price (low to high)" : "Rating (high to low)"}
          </label>
        ))}
      </div>
      <div>
        <h3 className="text-sm font-bold text-gray-800 mb-3">Cab type</h3>
        {allCabIds.map((id) => {
          const cab = cabs.find((c) => c.cab.id === id)?.cab;
          return (
            <label key={id} className="flex items-center gap-2 py-1.5 text-sm text-gray-700 cursor-pointer">
              <input type="checkbox" checked={types.includes(id)} onChange={() => toggleType(id)} className="accent-[#0B4A9C] w-4 h-4" />
              {cab?.name ?? id}
            </label>
          );
        })}
      </div>
    </div>
  );

  const inputCls = "w-full h-11 px-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#0B4A9C] bg-white";

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* Sticky summary bar — sits below Header (h-16) */}
      <div className="sticky top-16 z-30 bg-[#0B4A9C] text-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="min-w-0 text-sm sm:text-base font-semibold truncate">
            {from || "—"} <ArrowRight className="inline w-4 h-4 mx-1" /> {to || "—"}
            <span className="hidden sm:inline text-white/80 font-normal">
              {" "}| {date ? formatDate(date) : "—"} | {TRIP_LABEL[tripType] ?? tripType}
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
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sticky top-36">{filters}</div>
        </aside>

        <main className="flex-1 min-w-0">
          <button
            onClick={() => setSheet(true)}
            className="lg:hidden mb-4 flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm font-semibold text-gray-700 cursor-pointer"
          >
            <Filter className="w-4 h-4" /> Sort &amp; Filter
          </button>

          {sameCity ? (
            <div className="bg-white rounded-xl shadow-sm border border-red-100 p-8 text-center">
              <Car className="w-10 h-10 mx-auto text-gray-300 mb-3" />
              <p className="font-bold text-gray-800">Pickup and drop cannot be the same city</p>
              <p className="text-sm text-red-600 mt-1">Please tap Modify and choose a different destination.</p>
            </div>
          ) : loading ? (
            <div className="space-y-4">{[0, 1, 2, 3].map((i) => <SkeletonCard key={i} />)}</div>
          ) : filtered.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-600">No cabs match your filters.</div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                {filtered.length} cabs available · {distanceKm} km
                {tripType === "roundtrip" ? " each way" : ""}
              </p>
              {filtered.map(({ cab, fare, partPercent }) => (
                <div key={cab.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={cab.image}
                      alt={cab.name}
                      onError={(e) => { if (!e.currentTarget.src.endsWith(FALLBACK_IMG)) e.currentTarget.src = FALLBACK_IMG; }}
                      className="w-full sm:w-48 h-36 sm:h-28 object-contain bg-gray-50 rounded-xl"
                    />
                    <div className="flex-1 min-w-0">
                      <h2 className="text-lg font-bold text-gray-900">
                        {cab.name} <span className="font-normal text-gray-500 text-sm">— {cab.model}</span>
                      </h2>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-gray-600">
                        <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {cab.seats} seats</span>
                        <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" /> {cab.bags} bags</span>
                        <span className="flex items-center gap-1 bg-blue-50 text-[#0B4A9C] px-2 py-0.5 rounded-md text-xs font-semibold">
                          <Snowflake className="w-3 h-3" /> AC
                        </span>
                        <span className="flex items-center gap-1"><Star className="w-4 h-4 text-amber-400 fill-amber-400" /> {cab.rating}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <span className="text-xs font-semibold bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md">
                          Included: {fare.billableKm} km
                        </span>
                        <span className="text-xs font-semibold bg-green-50 text-green-700 px-2.5 py-1 rounded-md flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3" /> Free cancellation up to 1hr
                        </span>
                      </div>
                      <button
                        onClick={() => setExpanded(expanded === cab.id ? null : cab.id)}
                        className="mt-3 text-xs font-semibold text-[#0B4A9C] flex items-center gap-1 cursor-pointer"
                      >
                        Fare breakdown {expanded === cab.id ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <div className="sm:w-44 flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3">
                      <div className="sm:text-right">
                        <p className="text-2xl font-extrabold text-gray-900">{inr(fare.total)}</p>
                        <p className="text-xs text-gray-500">incl. taxes</p>
                      </div>
                      <button
                        onClick={() => selectCab(cab, fare, partPercent)}
                        className="px-6 py-3 rounded-xl bg-[#FF6600] hover:bg-[#e65c00] text-white font-bold text-sm shadow-lg cursor-pointer"
                      >
                        SELECT CAB
                      </button>
                    </div>
                  </div>
                  {expanded === cab.id && (
                    <div className="mt-4 pt-4 border-t border-dashed border-gray-200 text-sm text-gray-700 space-y-1.5 max-w-sm">
                      <div className="flex justify-between"><span>Base fare</span><span>{inr(fare.baseFare)}</span></div>
                      {fare.extraKmFare > 0 && (
                        <div className="flex justify-between"><span>Extra km charges</span><span>{inr(fare.extraKmFare)}</span></div>
                      )}
                      <div className="flex justify-between"><span>Driver allowance</span><span>{inr(fare.driverAllowance)}</span></div>
                      <div className="flex justify-between"><span>GST (5%)</span><span>{inr(fare.gst)}</span></div>
                      <div className="flex justify-between font-bold border-t pt-1.5"><span>Total</span><span>{inr(fare.total)}</span></div>
                    </div>
                  )}
                </div>
              ))}
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
