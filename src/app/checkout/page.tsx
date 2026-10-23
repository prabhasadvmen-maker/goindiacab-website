"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { ArrowRight, Check, ChevronDown, ChevronUp, Clock, Loader2, X } from "lucide-react";
import { TRIP_LABEL, apiTripType, formatDate, formatTime, inr, useStoredString, type BookingData } from "@/src/lib/booking";
import { createBooking, createPaymentOrder, verifyPayment } from "@/src/lib/api";

type Form = { name: string; mobile: string; email: string; pickupAddress: string; dropAddress: string; instructions: string };
type Key = keyof Form;
type Pay = "part" | "full";

const validators: Record<Key, (v: string) => string> = {
  name: (v) => (v.trim().length < 3 ? "Enter your full name (min 3 characters)" : ""),
  mobile: (v) => (/^[6-9]\d{9}$/.test(v) ? "" : "Enter a valid 10-digit mobile number"),
  email: (v) => (v.trim() === "" || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : "Enter a valid email address"),
  pickupAddress: (v) => (v.trim().length < 10 ? "Enter your full pickup address" : ""),
  dropAddress: () => "",
  instructions: () => "",
};

export default function CheckoutPage() {
  const router = useRouter();
  const raw = useStoredString("bookingData");
  const booking = useMemo<BookingData | null>(() => {
    try {
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }, [raw]);

  const [form, setForm] = useState<Form>({ name: "", mobile: "", email: "", pickupAddress: "", dropAddress: "", instructions: "" });
  const [touched, setTouched] = useState<Partial<Record<Key, boolean>>>({});
  const [processing, setProcessing] = useState(false);
  const [pay, setPay] = useState<Pay>("part");
  const retryRef = useRef<string | null>(null);
  const [showInstr, setShowInstr] = useState(false);
  const [showFare, setShowFare] = useState(true);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    if (raw !== undefined && !booking) router.replace("/");
  }, [raw, booking, router]);

  const errors = (Object.keys(validators) as Key[]).reduce(
    (acc, k) => ({ ...acc, [k]: validators[k](form[k]) }),
    {} as Record<Key, string>
  );
  const valid = (Object.keys(errors) as Key[]).every((k) => !errors[k]);

  if (!booking) return <div className="min-h-screen bg-gray-50" />;

  const { vehicle } = booking;
  const km = booking.distanceKm;
  const f = vehicle.fare;
  const total = f.total;
  const percent = booking.partPercent ?? 25;
  const paidNow = pay === "part" ? Math.round(total * percent / 100) : total;

  const set = (k: Key, v: string) => setForm((s) => ({ ...s, [k]: k === "mobile" ? v.replace(/\D/g, "").slice(0, 10) : v }));
  const blur = (k: Key) => setTouched((t) => ({ ...t, [k]: true }));

  const submit = async () => {
    setTouched({ name: true, mobile: true, email: true, pickupAddress: true });
    const currentErrors = (Object.keys(validators) as Key[]).reduce(
      (acc, k) => ({ ...acc, [k]: validators[k](form[k]) }),
      {} as Record<Key, string>
    );
    const isValid = (Object.keys(currentErrors) as Key[]).every((k) => !currentErrors[k]);
    if (!isValid || !booking || processing) return;

    setProcessing(true);
    setApiError("");

    try {
      // Step 1: Create booking on server (a retry after a cancelled payment reuses the same booking)
      const retryId = retryRef.current;
      const bookingRes = retryId ? null : await createBooking({
        passenger: {
          name: form.name.trim(), mobile: form.mobile, email: form.email.trim(),
          pickupAddress: form.pickupAddress.trim(), dropAddress: form.dropAddress.trim(),
          instructions: form.instructions.trim(),
        },
        trip: {
          from: booking.from, to: booking.tripType === "local" ? "" : booking.to, date: booking.date, time: booking.time,
          tripType: apiTripType(booking.tripType), distanceKm: km,
          ...(booking.tripType === "local" ? { package: booking.pkg } : {}),
        },
        vehicle: { id: vehicle.id },
        fare: { paymentOption: pay },
      });

      const bookingId = retryId ?? bookingRes!.bookingId;
      retryRef.current = bookingId;
      const serverFare = bookingRes?.fare;

      // Save to localStorage as backup
      if (bookingRes && serverFare) try {
        localStorage.setItem("confirmedBooking", JSON.stringify({
          bookingId,
          passenger: { name: form.name.trim(), mobile: form.mobile, email: form.email.trim(), pickupAddress: form.pickupAddress.trim() },
          trip: { from: booking.from, to: booking.to, date: booking.date, time: booking.time, tripType: booking.tripType, distanceKm: km },
          vehicle: { id: vehicle.id, name: vehicle.name, model: vehicle.model, seats: vehicle.seats, image: vehicle.image },
          fare: { ...vehicle.fare, total: serverFare.total, paidNow: serverFare.paidNow, payLater: serverFare.payLater },
          status: "confirmed",
          paymentStatus: "pending",
          bookedAt: new Date().toISOString(),
        }));
      } catch { /* ignore */ }

      // Step 3: Create Razorpay order
      const order = await createPaymentOrder(bookingId);

      // Step 4: Load Razorpay script and open checkout
      await loadRazorpay();
      const rzp = new (window as unknown as { Razorpay: any }).Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        order_id: order.orderId,
        name: "GoIndiaCab",
        description: `${booking.from} → ${booking.to}`,
        prefill: { name: form.name.trim(), contact: "+91" + form.mobile, email: form.email.trim() },
        theme: { color: "#FF6600" },
        handler: async (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
          try {
            const verify = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              bookingId,
            });
            if (verify.success) {
              try {
                const saved = JSON.parse(localStorage.getItem("confirmedBooking") ?? "{}");
                localStorage.setItem("confirmedBooking", JSON.stringify({ ...saved, paymentStatus: "paid" }));
              } catch { /* ignore */ }
              router.push("/booking/" + bookingId);
            } else {
              setApiError("Payment failed, please try again.");
              setProcessing(false);
            }
          } catch {
            setApiError("Payment failed, please try again.");
            setProcessing(false);
          }
        },
        modal: {
          ondismiss: () => {
            setApiError("Payment was cancelled. Click PROCEED to retry.");
            setProcessing(false);
          },
        },
      });
      rzp.open();
    } catch (err: unknown) {
      const e = err as { code?: string; message?: string };
      if (e?.code === "DUPLICATE_BOOKING") {
        setApiError("A booking already exists for this trip. Please contact support if you need changes.");
      } else if ((err as Error)?.name === "AbortError") {
        setApiError("Request timed out. Please try again.");
      } else {
        setApiError(e?.message ?? "Something went wrong. Please try again.");
      }
      setProcessing(false);
    }
  };

  function loadRazorpay(): Promise<void> {
    return new Promise((resolve, reject) => {
      if ((window as unknown as { Razorpay: any }).Razorpay) { resolve(); return; }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Failed to load Razorpay"));
      document.body.appendChild(script);
    });
  }

  const input = (k: Key) =>
    clsx(
      "w-full h-12 px-4 rounded-xl bg-gray-100 border text-sm font-medium text-gray-800 outline-none placeholder:text-gray-500 placeholder:font-semibold focus:bg-white focus:border-[#0B4A9C]",
      touched[k] && errors[k] ? "border-red-500" : "border-transparent"
    );
  const err = (k: Key) => touched[k] && errors[k] && <p className="text-xs text-red-600 mt-1 ml-1">{errors[k]}</p>;

  const payOptions: { id: Pay; title: string; sub: string; amt: number }[] = [
    { id: "part", title: "Part Pay", sub: `Pay ${percent}% now and rest to the driver`, amt: Math.round(total * percent / 100) },
    { id: "full", title: "Full Pay", sub: "Full amount", amt: total },
  ];

  const card = "bg-white rounded-xl shadow-sm border border-gray-100";

  return (
    <div className="bg-white min-h-screen pb-10">
      <div className="bg-gray-100 border-b border-gray-200">
        <p className="max-w-6xl mx-auto px-4 py-2 text-[11px] text-gray-500">
          Home &gt; Select Car &gt; <span className="text-gray-800 font-medium">Booking</span>
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 pt-4 flex flex-col lg:flex-row gap-6">
        {/* LEFT */}
        <div className="lg:w-[60%] space-y-4">
          <div className="bg-[#0B4A9C] text-white text-sm font-medium rounded-xl px-5 py-3.5">Review Your Booking</div>

          <div className={clsx(card, "p-5")}>
            <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 flex flex-wrap items-center gap-x-2">
              {booking.from} <ArrowRight className="w-5 h-5" /> {booking.to}
              <span className="text-base font-normal text-gray-500">({TRIP_LABEL[booking.tripType] ?? booking.tripType})</span>
            </h1>
            <div className="mt-2 text-sm text-gray-600 space-y-1">
              <p>Car Type: <b className="text-gray-900">{vehicle.model}</b> <span className="text-gray-500">({vehicle.name})</span></p>
              <p>
                Pickup Date: <b className="text-gray-900">{formatDate(booking.date)}, {formatTime(booking.time)}</b> • Kms included:{" "}
                <b className="text-gray-900">{km} kms</b>
              </p>
            </div>
          </div>

          <div className={clsx(card, "p-5")}>
            <h2 className="text-base font-extrabold text-gray-900 pb-2 mb-4 border-b border-gray-100">Contact &amp; Pickup Details</h2>
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <input aria-label="Full Name" className={input("name")} placeholder="Full Name" value={form.name} onChange={(e) => set("name", e.target.value)} onBlur={() => blur("name")} />
                  {err("name")}
                </div>
                <div>
                  <div className="flex gap-2">
                    <span className="h-12 px-3 flex items-center rounded-xl bg-gray-100 text-sm font-medium text-gray-700">+91</span>
                    <input aria-label="Mobile No." type="tel" inputMode="numeric" className={input("mobile")} placeholder="Mobile No." value={form.mobile} onChange={(e) => set("mobile", e.target.value)} onBlur={() => blur("mobile")} />
                  </div>
                  {err("mobile")}
                </div>
              </div>
              <div>
                <input aria-label="Email ID" type="email" className={input("email")} placeholder="Email ID (optional)" value={form.email} onChange={(e) => set("email", e.target.value)} onBlur={() => blur("email")} />
                {err("email")}
              </div>
              <div>
                <input aria-label="Pickup Location" className={input("pickupAddress")} placeholder="Pickup Location (full address)" value={form.pickupAddress} onChange={(e) => set("pickupAddress", e.target.value)} onBlur={() => blur("pickupAddress")} />
                {err("pickupAddress")}
              </div>
              <input aria-label="Drop Location" className={input("dropAddress")} placeholder="Drop Location (optional)" value={form.dropAddress} onChange={(e) => set("dropAddress", e.target.value)} />
              {showInstr ? (
                <textarea aria-label="Special Instructions" rows={2} className="w-full px-4 py-3 rounded-xl bg-gray-100 text-sm outline-none focus:bg-white border border-transparent focus:border-[#0B4A9C]" placeholder="Special instructions" value={form.instructions} onChange={(e) => set("instructions", e.target.value)} />
              ) : (
                <button type="button" onClick={() => setShowInstr(true)} className="text-sm font-semibold text-[#0B4A9C] bg-blue-50 rounded-xl px-4 py-2.5 cursor-pointer">
                  + Add special instructions
                </button>
              )}
            </div>
          </div>

          <div className={clsx(card, "p-5")}>
            <h2 className="text-lg font-extrabold text-gray-900 pb-2 mb-4 border-b border-gray-100">Inclusions/Exclusions</h2>
            <div className="grid sm:grid-cols-2 gap-6 text-sm">
              <div>
                <p className="font-bold text-green-600 mb-2">● Inclusions</p>
                <ul className="space-y-2 text-gray-700">
                  {["Base Fare and Fuel Charges", "Driver Allowance", "GST (5%)", "State Tax & Toll", `${vehicle.seats} seater, AC`].map((t) => (
                    <li key={t} className="flex items-start gap-2"><Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" /> {t}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-bold text-red-500 mb-2">● Exclusions</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2"><X className="w-4 h-4 text-red-500 mt-0.5 shrink-0" /> Beyond package km charged extra after 300 km</li>
                  <li className="flex items-start gap-2"><X className="w-4 h-4 text-red-500 mt-0.5 shrink-0" /> Multiple pickups/drops</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <aside className="lg:w-[40%]">
          <div className="lg:sticky lg:top-4 space-y-4">
            <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-900">
              <span className="w-7 h-7 rounded-full bg-amber-400 flex items-center justify-center"><Clock className="w-4 h-4 text-white" /></span>
              Free cancellation till <b>1 hr</b> of departure
            </div>

            <div className={clsx(card, "p-5")}>
              <h2 className="text-xl font-extrabold text-gray-900 mb-3">Payment Options</h2>
              <div className="space-y-3">
                {payOptions.map((o) => (
                  <label key={o.id} className={clsx("flex items-center gap-3 border rounded-xl px-4 py-3 cursor-pointer", pay === o.id ? "border-blue-400 bg-blue-50" : "border-gray-200")}>
                    <input type="radio" name="pay" className="w-5 h-5 accent-[#0B4A9C]" checked={pay === o.id} onChange={() => setPay(o.id)} />
                    <span className="flex-1">
                      <span className="block font-bold text-gray-900">{o.title}</span>
                      <span className="block text-xs text-gray-500">{o.sub}</span>
                    </span>
                    <span className="font-extrabold text-gray-900">{inr(o.amt)}</span>
                  </label>
                ))}
              </div>

              <button
                onClick={submit}
                disabled={!valid || processing}
                className="mt-5 w-full py-3.5 rounded-xl bg-[#FF6600] hover:bg-[#e65c00] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold tracking-wide shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                {processing ? (<><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>) : `PROCEED & PAY ${inr(paidNow)}`}
              </button>
              {apiError && <p role="alert" className="text-sm text-red-600 text-center mt-3">{apiError}</p>}
              {!valid && <p className="text-xs text-gray-500 text-center mt-2">Fill name, mobile and pickup location to continue</p>}

              <button onClick={() => setShowFare((v) => !v)} className="mt-4 w-full flex items-center justify-between text-sm font-semibold text-[#0B4A9C] underline cursor-pointer">
                View Fare Break up {showFare ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {showFare && (
                <div className="mt-3 text-sm text-gray-700 space-y-2.5">
                  <div className="flex justify-between"><span>Base Fare</span><span>{inr(f.baseFare)}</span></div>
                  {f.extraKmFare > 0 && <div className="flex justify-between"><span>Extra Km Charges</span><span>{inr(f.extraKmFare)}</span></div>}
                  <div className="flex justify-between"><span>Driver Allowance</span><span>{inr(f.driverAllowance)}</span></div>
                  <div className="flex justify-between"><span>GST (5%)</span><span>{inr(f.gst)}</span></div>
                  <div className="flex justify-between border-t pt-3 text-base font-extrabold text-gray-900"><span>Total Fare</span><span>{inr(total)}</span></div>
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
