"use client";

import { use, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, CheckCircle2, Download, MessageCircle, Phone, User, Car } from "lucide-react";
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
};

export default function BookingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: rawId } = use(params);
  const id = decodeURIComponent(rawId);
  const raw = useStoredString("confirmedBooking");
  const [shown, setShown] = useState(false);
  const [remote, setRemote] = useState<Confirmed | null | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    getBooking(id).then((b) => {
      if (cancelled) return;
      setRemote(b && b.bookingId === id ? { ...b, passenger: { ...b.passenger, instructions: "" } } : null);
    });
    return () => { cancelled = true; };
  }, [id]);

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
            className={`mx-auto w-20 h-20 rounded-full bg-green-100 flex items-center justify-center transition-all duration-700 ${
              shown ? "opacity-100 scale-100" : "opacity-0 scale-50"
            }`}
          >
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          <h1 className={`text-2xl font-bold text-gray-900 mt-4 transition-opacity duration-700 ${shown ? "opacity-100" : "opacity-0"}`}>
            Booking Confirmed!
          </h1>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 bg-green-50 border-b border-green-100">
            <p className="text-sm font-bold text-green-700 flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> BOOKING CONFIRMED</p>
            {b.paymentStatus && b.paymentStatus !== "paid" && (
              <p className="mt-1 text-sm font-semibold text-amber-700">Payment {b.paymentStatus === "failed" ? "failed" : "pending"}</p>
            )}
            <p className="mt-2 text-gray-800">Booking ID: <b>{b.bookingId}</b></p>
            <p className="text-gray-800">Status: <b className="capitalize">{b.status}</b></p>
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
