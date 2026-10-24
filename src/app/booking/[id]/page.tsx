"use client";

import { use, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Check, CheckCircle2, Download, MessageCircle, Phone, User, Car, XCircle } from "lucide-react";
import { siteConfig } from "@/src/config/site";
import { getBooking } from "@/src/lib/api";
import { formatDate, formatTime, inr, useStoredString } from "@/src/lib/booking";

type Confirmed = {
  bookingId: string;
  passenger: { name: string; mobile: string; email: string; pickupAddress: string; instructions: string };
  trip: { from: string; to: string; date: string; time: string; tripType: string; distanceKm: number };
  vehicle: { name: string; model: string };
  fare: {
    baseFare: number; extraKmFare?: number; driverAllowance: number; gst: number; total: number;
    addons?: { label: string; price: number }[]; discount?: number; paidNow?: number; payLater?: number;
  };
  status: string;
  paymentStatus?: "pending" | "paid" | "failed";
  confirmedAt?: string;
  statusHistory?: { status: string; at: string }[];
  cancelReason?: string;
  driver?: { name: string; phone: string; vehicleNumber: string } | null;
};

const STEPS = [
  { key: "confirmed", label: "Booking Confirmed", pending: "We have received your booking." },
  { key: "assigned", label: "Driver Assigned", pending: "We are assigning a driver to your trip." },
  { key: "in_progress", label: "Trip Started", pending: "Your trip will start at the pickup time." },
  { key: "completed", label: "Trip Completed", pending: "You will see this once you reach your destination." },
] as const;

const HEADLINE: Record<string, string> = {
  confirmed: "Booking Confirmed!",
  assigned: "Driver Assigned",
  in_progress: "Trip In Progress",
  completed: "Trip Completed",
  cancelled: "Booking Cancelled",
};

const stamp = (iso?: string) =>
  iso
    ? new Date(iso).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", day: "2-digit", month: "short", hour: "numeric", minute: "2-digit", hour12: true })
    : "";

const REFRESH_MS = 30_000;

export default function BookingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: rawId } = use(params);
  const id = decodeURIComponent(rawId);
  const raw = useStoredString("confirmedBooking");
  const [shown, setShown] = useState(false);
  const [remote, setRemote] = useState<Confirmed | null | undefined>(undefined);

  const finished = remote?.status === "completed" || remote?.status === "cancelled";

  // Live tracking: refresh every 30s until the trip is completed or cancelled.
  useEffect(() => {
    let cancelled = false;
    const load = () => getBooking(id).then((b) => {
      if (cancelled) return;
      setRemote((prev) =>
        b && b.bookingId === id ? { ...b, passenger: { ...b.passenger, instructions: "" } } : prev === undefined ? null : prev
      );
    });
    load();
    if (finished) return () => { cancelled = true; };
    const timer = setInterval(() => { if (!document.hidden) load(); }, REFRESH_MS);
    return () => { cancelled = true; clearInterval(timer); };
  }, [id, finished]);

  const state = useMemo<"loading" | "missing" | Confirmed>(() => {
    if (remote) return remote;
    if (remote === undefined || raw === undefined) return "loading";
    try {
      const data: Confirmed | null = raw ? JSON.parse(raw) : null;
      return data && data.bookingId === id ? data : "missing";
    } catch {
      return "missing";
    }
  }, [remote, raw, id]);

  useEffect(() => {
    const t = setTimeout(() => setShown(true), 50);
    return () => clearTimeout(t);
  }, []);

  if (state === "loading") return <div className="min-h-screen bg-gray-50" />;

  if (state === "missing") {
    return (
      <div className="min-h-[60vh] bg-gray-50 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Booking not found</h1>
        <p className="text-gray-500 mt-2">We couldn&apos;t find this booking on this device.</p>
        <Link href="/" className="mt-5 px-6 py-3 rounded-xl bg-[#FF6600] text-white font-bold shadow-lg">Go to Home</Link>
      </div>
    );
  }

  const b = state;
  const cancelled = b.status === "cancelled";
  const currentIdx = STEPS.findIndex((s) => s.key === b.status);
  const stepTime = (key: string) => {
    const hit = [...(b.statusHistory ?? [])].reverse().find((h) => h.status === key);
    return hit?.at ?? (key === "confirmed" ? b.confirmedAt : undefined);
  };
  const dateTime = `${formatDate(b.trip.date)}, ${formatTime(b.trip.time)}`;
  const waText = encodeURIComponent(
    `Hi GoIndiaCab, my booking is confirmed.\nBooking ID: ${b.bookingId}\nTrip: ${b.trip.from} to ${b.trip.to}\nDate: ${dateTime}\nCab: ${b.vehicle.name} (${b.vehicle.model})\nTotal: ${inr(b.fare.total)}\nName: ${b.passenger.name}`
  );
  const waNumber = siteConfig.phone.booking1.replace(/\D/g, "");

  return (
    <div className="bg-gray-50 min-h-screen py-10 print:bg-white print:py-0">
      <div className="max-w-xl mx-auto px-4">
        <div className="text-center mb-6">
          <div
            className={`mx-auto w-20 h-20 rounded-full ${cancelled ? "bg-red-100" : "bg-green-100"} flex items-center justify-center transition-all duration-700 ${
              shown ? "opacity-100 scale-100" : "opacity-0 scale-50"
            }`}
          >
            {cancelled ? <XCircle className="w-12 h-12 text-red-600" /> : <CheckCircle2 className="w-12 h-12 text-green-600" />}
          </div>
          <h1 className={`text-2xl font-bold text-gray-900 mt-4 transition-opacity duration-700 ${shown ? "opacity-100" : "opacity-0"}`}>
            {HEADLINE[b.status] ?? "Booking Status"}
          </h1>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className={`p-5 border-b ${cancelled ? "bg-red-50 border-red-100" : "bg-green-50 border-green-100"}`}>
            <p className={`text-sm font-bold flex items-center gap-2 ${cancelled ? "text-red-700" : "text-green-700"}`}>
              {cancelled ? <XCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />} {(HEADLINE[b.status] ?? b.status).replace("!", "").toUpperCase()}
            </p>
            {b.paymentStatus && b.paymentStatus !== "paid" && (
              <p className="mt-1 text-sm font-semibold text-amber-700">Payment {b.paymentStatus === "failed" ? "failed" : "pending"}</p>
            )}
            <p className="mt-2 text-gray-800">Booking ID: <b>{b.bookingId}</b></p>
          </div>

          {/* Live tracking */}
          <div className="p-5 border-b border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-bold uppercase tracking-wide text-gray-400">Track your booking</p>
              {!finished && (
                <span className="flex items-center gap-1.5 text-[11px] font-semibold text-green-600 print:hidden">
                  <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" /></span>
                  Live
                </span>
              )}
            </div>

            {cancelled ? (
              <div className="rounded-xl bg-red-50 border border-red-100 p-4 text-sm">
                <p className="font-bold text-red-700">This booking was cancelled{stepTime("cancelled") ? ` on ${stamp(stepTime("cancelled"))}` : ""}.</p>
                {b.cancelReason && <p className="mt-1 text-red-700/90">Reason: {b.cancelReason}</p>}
                <p className="mt-2 text-gray-600">For any payment-related questions, call {siteConfig.phone.booking1}.</p>
              </div>
            ) : (
              <ol>
                {STEPS.map((s, i) => {
                  const done = i < currentIdx || (i === currentIdx && s.key === "completed");
                  const active = i === currentIdx && !done;
                  const reached = i <= currentIdx;
                  const time = stepTime(s.key);
                  return (
                    <li key={s.key} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <span
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold ${
                            done ? "bg-green-600 border-green-600 text-white" : active ? "border-[#FF6600] bg-orange-50 text-[#FF6600] ring-4 ring-orange-100" : "border-gray-200 bg-white text-gray-300"
                          }`}
                        >
                          {done ? <Check className="w-4 h-4" /> : i + 1}
                        </span>
                        {i < STEPS.length - 1 && <span className={`w-0.5 flex-1 min-h-6 ${i < currentIdx ? "bg-green-500" : "bg-gray-200"}`} />}
                      </div>
                      <div className="pb-5">
                        <p className={`text-sm font-bold leading-7 ${reached ? "text-gray-900" : "text-gray-400"}`}>{s.label}</p>
                        <p className="text-xs text-gray-500">
                          {reached ? (time ? stamp(time) : "Done") : s.pending}
                        </p>
                        {s.key === "assigned" && active && !b.driver && (
                          <p className="mt-1 text-xs text-gray-500">Driver details will appear here shortly.</p>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ol>
            )}

            {!cancelled && currentIdx === 0 && (
              <p className="mt-1 rounded-lg bg-blue-50 px-3 py-2 text-xs text-blue-800">
                A driver has not been assigned yet. You will get an email and see the driver details on this page as soon as one is assigned.
              </p>
            )}

            {!cancelled && currentIdx >= 1 && b.driver && (
              <div className="mt-1 flex items-center justify-between gap-3 rounded-xl border border-indigo-100 bg-indigo-50 p-4">
                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-indigo-500">Your driver</p>
                  <p className="font-bold text-gray-900 truncate">{b.driver.name}</p>
                  {b.driver.vehicleNumber && <p className="text-xs text-gray-600">Vehicle no. <b className="font-mono">{b.driver.vehicleNumber}</b></p>}
                </div>
                {b.driver.phone && (
                  <a href={`tel:${b.driver.phone}`} className="shrink-0 flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-bold text-white print:hidden">
                    <Phone className="w-4 h-4" /> Call
                  </a>
                )}
              </div>
            )}
          </div>

          <div className="p-5 space-y-3 text-sm text-gray-700 border-b border-gray-100">
            <p className="flex items-center gap-2"><Car className="w-4 h-4 text-[#0B4A9C]" /> {b.trip.from} <ArrowRight className="w-3.5 h-3.5" /> {b.trip.to || "Local Rental"}</p>
            <p className="flex items-center gap-2"><Calendar className="w-4 h-4 text-[#0B4A9C]" /> {dateTime}</p>
            <p className="flex items-center gap-2"><User className="w-4 h-4 text-[#0B4A9C]" /> {b.passenger.name} | {b.passenger.mobile}</p>
            <p className="flex items-center gap-2"><Car className="w-4 h-4 text-[#0B4A9C]" /> {b.vehicle.name} ({b.vehicle.model})</p>
            <p className="text-xs text-gray-500">Pickup: {b.passenger.pickupAddress}</p>
          </div>

          <div className="p-5 text-sm text-gray-700 space-y-2 border-b border-gray-100">
            <p className="text-xs font-bold uppercase tracking-wide text-gray-400">Fare breakdown</p>
            <div className="flex justify-between"><span>Base Fare</span><span>{inr(b.fare.baseFare)}</span></div>
            {!!b.fare.extraKmFare && <div className="flex justify-between"><span>Extra Km Charges</span><span>{inr(b.fare.extraKmFare)}</span></div>}
            <div className="flex justify-between"><span>Driver Allowance</span><span>{inr(b.fare.driverAllowance)}</span></div>
            {b.fare.addons?.map((a) => (
              <div key={a.label} className="flex justify-between"><span>{a.label}</span><span>{inr(a.price)}</span></div>
            ))}
            <div className="flex justify-between"><span>GST</span><span>{inr(b.fare.gst)}</span></div>
            {!!b.fare.discount && <div className="flex justify-between text-green-600"><span>Coupon discount</span><span>- {inr(b.fare.discount)}</span></div>}
            <div className="flex justify-between border-t pt-2 text-base font-bold text-gray-900"><span>Total Fare</span><span>{inr(b.fare.total)}</span></div>
            <div className="flex justify-between"><span>{b.paymentStatus === "paid" ? "Paid online" : "Due now"}</span><span>{inr(b.fare.paidNow ?? b.fare.total)}</span></div>
            <div className="flex justify-between font-semibold"><span>Pay to driver</span><span>{inr(b.fare.payLater ?? 0)}</span></div>
          </div>

          <div className="p-5 text-sm text-gray-700 flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#0B4A9C]" /> Need help? Call {siteConfig.phone.booking1}
          </div>
        </div>

        <div className="mt-6 grid gap-3 print:hidden">
          <button onClick={() => window.print()} className="py-3.5 rounded-xl bg-[#0B4A9C] text-white font-bold shadow-lg flex items-center justify-center gap-2 cursor-pointer">
            <Download className="w-5 h-5" /> Download Confirmation
          </button>
          <a
            href={`https://wa.me/${waNumber}?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3.5 rounded-xl bg-green-600 text-white font-bold shadow-lg flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-5 h-5" /> Share on WhatsApp
          </a>
          <Link href="/" className="py-3.5 rounded-xl bg-[#FF6600] text-white font-bold shadow-lg text-center">Book Another Cab</Link>
        </div>
      </div>
    </div>
  );
}
