"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import {
  Calendar, Check, ChevronDown, ChevronUp, Clock, Fuel, Gauge, Loader2, Receipt,
  ShieldCheck, Snowflake, Star, Tag, Ticket, UserCheck, Users, X,
} from "lucide-react";
import {
  FALLBACK_IMG, TRIP_LABEL, apiTripType, formatDate, formatTime, inr, nowMs, useStoredString,
  type BookingData,
} from "@/src/lib/booking";
import {
  createBooking, createPaymentOrder, verifyPayment, getWebConfig, formatCancelWindow,
  getAvailableCoupons, validateCoupon,
  type CouponOffer, type WebConfig,
} from "@/src/lib/api";

type Form = { name: string; mobile: string; email: string; pickupAddress: string; dropAddress: string; instructions: string };
type Key = keyof Form;
type Pay = "part" | "full";
type AppliedCoupon = { code: string; title: string; discount: number };

const validators: Record<Key, (v: string) => string> = {
  name: (v) => (v.trim().length < 3 ? "Enter your full name (min 3 characters)" : ""),
  mobile: (v) => (/^[6-9]\d{9}$/.test(v) ? "" : "Enter a valid 10-digit mobile number"),
  email: (v) => (v.trim() === "" || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : "Enter a valid email address"),
  pickupAddress: (v) => (v.trim().length < 10 ? "Enter your full pickup address" : ""),
  dropAddress: () => "",
  instructions: () => "",
};

const cityOf = (s: string) => s.split(",")[0].trim();
const card = "bg-white rounded-xl shadow-sm border border-gray-100";

/** "9:00 AM, Sun 25 Oct" for pickup minus the free-cancellation window; null if the date is unreadable. */
function cancelDeadline(date: string, time: string, mins: number): { text: string; passed: boolean } | null {
  const d = new Date(`${date}T${time}:00`);
  if (isNaN(d.getTime())) return null;
  d.setMinutes(d.getMinutes() - mins);
  const t = d.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", hour12: true }).toUpperCase();
  const day = d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
  return { text: `${t}, ${day}`, passed: d.getTime() < nowMs() };
}

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
  const [createdId, setCreatedId] = useState<string | null>(null); // set once the booking exists on the server
  const [showInstr, setShowInstr] = useState(false);
  const [showFare, setShowFare] = useState(true);
  const [apiError, setApiError] = useState("");
  const [webConfig, setWebConfig] = useState<WebConfig | null>(null);

  const [offers, setOffers] = useState<CouponOffer[]>([]);
  const [coupon, setCoupon] = useState<AppliedCoupon | null>(null);
  const [couponInput, setCouponInput] = useState("");
  const [couponErr, setCouponErr] = useState("");
  const [couponBusy, setCouponBusy] = useState(false);

  useEffect(() => {
    let alive = true;
    getWebConfig().then((c) => { if (alive) setWebConfig(c); });
    return () => { alive = false; };
  }, []);

  useEffect(() => {
    if (raw !== undefined && !booking) router.replace("/");
  }, [raw, booking, router]);

  // Coupons the customer can pick from, with eligibility for this exact cart.
  const cartKey = booking ? `${booking.vehicle.id}|${booking.distanceKm}|${booking.tripType}|${booking.pkg ?? ""}` : "";
  useEffect(() => {
    if (!booking) return;
    let alive = true;
    getAvailableCoupons({
      vehicleType: booking.vehicle.id,
      distanceKm: booking.distanceKm,
      tripType: apiTripType(booking.tripType),
      package: booking.pkg,
    }).then((list) => {
      if (alive) setOffers([...list].sort((a, b) => Number(b.eligible) - Number(a.eligible) || b.discount - a.discount));
    });
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartKey]);

  const errors = (Object.keys(validators) as Key[]).reduce(
    (acc, k) => ({ ...acc, [k]: validators[k](form[k]) }),
    {} as Record<Key, string>
  );
  const valid = (Object.keys(errors) as Key[]).every((k) => !errors[k]);

  if (!booking) return <div className="min-h-screen bg-gray-50" />;

  const { vehicle } = booking;
  const km = booking.distanceKm;
  const f = vehicle.fare;
  const discount = coupon?.discount ?? 0;
  const total = f.total - discount;
  const percent = booking.partPercent ?? webConfig?.partPaymentPercent ?? 0;
  const gstLabel = vehicle.gstPercent != null ? `GST (${vehicle.gstPercent}%)` : "GST";
  const partAmt = Math.round((total * percent) / 100);
  const paidNow = pay === "part" ? partAmt : total;
  const locked = createdId !== null; // coupon / payment option are frozen after the booking is created
  const deadline = webConfig ? cancelDeadline(booking.date, booking.time, webConfig.freeCancelMinutes) : null;
  const isLocal = booking.tripType === "local";
  const baseLabel = TRIP_LABEL[booking.tripType] ?? booking.tripType;
  const tripLabel = /trip/i.test(baseLabel) ? baseLabel : `${baseLabel} Trip`;

  const set = (k: Key, v: string) => setForm((s) => ({ ...s, [k]: k === "mobile" ? v.replace(/\D/g, "").slice(0, 10) : v }));
  const blur = (k: Key) => setTouched((t) => ({ ...t, [k]: true }));

  const applyCode = async (code: string) => {
    const c = code.trim();
    if (!c || couponBusy || locked) return;
    setCouponBusy(true);
    setCouponErr("");
    try {
      const r = await validateCoupon({
        code: c,
        vehicleType: vehicle.id,
        distanceKm: km,
        tripType: apiTripType(booking.tripType),
        package: booking.pkg,
        mobile: form.mobile.length === 10 ? form.mobile : undefined,
      });
      setCoupon({ code: r.code, title: r.title, discount: r.discount });
      setCouponInput("");
    } catch (e) {
      setCouponErr((e as Error).message || "Could not apply this coupon");
    } finally {
      setCouponBusy(false);
    }
  };

  const removeCoupon = () => { if (!locked) { setCoupon(null); setCouponErr(""); } };

  const submit = async () => {
    setTouched({ name: true, mobile: true, email: true, pickupAddress: true });
    const currentErrors = (Object.keys(validators) as Key[]).reduce(
      (acc, k) => ({ ...acc, [k]: validators[k](form[k]) }),
      {} as Record<Key, string>
    );
    const isValid = (Object.keys(currentErrors) as Key[]).every((k) => !currentErrors[k]);
    if (!isValid || processing) return;

    setProcessing(true);
    setApiError("");

    try {
      // Step 1: create the booking (a retry after a cancelled payment reuses the same booking)
      const bookingRes = createdId ? null : await createBooking({
        passenger: {
          name: form.name.trim(), mobile: form.mobile, email: form.email.trim(),
          pickupAddress: form.pickupAddress.trim(), dropAddress: form.dropAddress.trim(),
          instructions: form.instructions.trim(),
        },
        trip: {
          from: booking.from,
          to: isLocal ? "" : booking.to,
          ...(booking.stop ? { stop: booking.stop } : {}),
          date: booking.date, time: booking.time,
          tripType: apiTripType(booking.tripType), distanceKm: km,
          ...(isLocal ? { package: booking.pkg } : {}),
        },
        vehicle: { id: vehicle.id },
        fare: { paymentOption: pay, ...(coupon ? { couponCode: coupon.code } : {}) },
      });

      const bookingId = createdId ?? bookingRes!.bookingId;
      setCreatedId(bookingId);
      const serverFare = bookingRes?.fare;

      // Backup copy for the confirmation page
      if (bookingRes && serverFare) try {
        localStorage.setItem("confirmedBooking", JSON.stringify({
          bookingId,
          passenger: { name: form.name.trim(), mobile: form.mobile, email: form.email.trim(), pickupAddress: form.pickupAddress.trim() },
          trip: { from: booking.from, to: booking.to, stop: booking.stop, date: booking.date, time: booking.time, tripType: booking.tripType, distanceKm: km },
          vehicle: { id: vehicle.id, name: vehicle.name, model: vehicle.model, seats: vehicle.seats, image: vehicle.image },
          fare: {
            ...vehicle.fare, discount: serverFare.discount, couponCode: serverFare.couponCode,
            total: serverFare.total, paidNow: serverFare.paidNow, payLater: serverFare.payLater,
          },
          status: "confirmed",
          paymentStatus: "pending",
          bookedAt: new Date().toISOString(),
        }));
      } catch { /* ignore */ }

      // Step 2: create the Razorpay order (amount is decided by the server)
      const order = await createPaymentOrder(bookingId);

      // Step 3: open Razorpay checkout
      await loadRazorpay();
      const rzp = new (window as unknown as { Razorpay: RazorpayCtor }).Razorpay({
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
      } else if (e?.code === "COUPON_INVALID") {
        setCoupon(null);
        setApiError(`${e.message ?? "Coupon could not be applied."} Fare has been updated without the coupon.`);
      } else if ((err as Error)?.name === "AbortError") {
        setApiError("Request timed out. Please try again.");
      } else {
        setApiError(e?.message ?? "Something went wrong. Please try again.");
      }
      setProcessing(false);
    }
  };

  const input = (k: Key) =>
    clsx(
      "w-full h-12 px-4 rounded-xl bg-gray-100 border text-sm font-medium text-gray-800 outline-none placeholder:text-gray-500 placeholder:font-semibold focus:bg-white focus:border-[#0B4A9C]",
      touched[k] && errors[k] ? "border-red-500" : "border-transparent"
    );
  const err = (k: Key) => touched[k] && errors[k] && <p className="text-xs text-red-600 mt-1 ml-1">{errors[k]}</p>;

  const payOptions: { id: Pay; title: string; sub: string; amt: number }[] = [
    { id: "part", title: "Part Pay", sub: `Pay ${percent}% now and rest to the driver`, amt: partAmt },
    { id: "full", title: "Full Pay", sub: "Full amount", amt: total },
  ];

  const included = (webConfig?.policies ?? []).filter((p) => p.kind === "included");
  const excluded = (webConfig?.policies ?? []).filter((p) => p.kind === "excluded");

  return (
    <div className="bg-gray-100 min-h-screen pb-10">
      <div className="bg-white border-b border-gray-200">
        <p className="max-w-6xl mx-auto px-4 py-2 text-[11px] text-gray-500">
          Home &gt; Select Car &gt; <span className="text-gray-800 font-medium">Booking</span>
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 pt-4 flex flex-col lg:flex-row gap-5">
        {/* LEFT */}
        <div className="lg:w-[60%] space-y-4">
          {/* Trip + cab summary */}
          <div className={clsx(card, "overflow-hidden")}>
            <div className="bg-sky-50 px-5 py-4">
              <p className="text-sm text-gray-600">{tripLabel}</p>
              <div className="mt-2 flex items-start gap-3">
                <div className="min-w-0">
                  <p className="text-lg sm:text-xl font-extrabold text-gray-900 truncate">{cityOf(booking.from)}</p>
                  <p className="text-xs text-gray-500 truncate">{booking.from}</p>
                </div>
                <div className="flex-1 flex items-center gap-1 pt-3 min-w-6">
                  <span className="w-2 h-2 rounded-full border-2 border-gray-400 shrink-0" />
                  <span className="flex-1 border-t border-dashed border-gray-400" />
                  {booking.stop && (
                    <>
                      <span className="text-[11px] font-semibold text-[#0B4A9C] bg-white border border-blue-100 rounded-full px-2 py-0.5 max-w-28 truncate" title={booking.stop}>via {cityOf(booking.stop)}</span>
                      <span className="flex-1 border-t border-dashed border-gray-400" />
                    </>
                  )}
                  <span className="w-2 h-2 rounded-full bg-gray-500 shrink-0" />
                </div>
                <div className="min-w-0 text-right">
                  <p className="text-lg sm:text-xl font-extrabold text-gray-900 truncate">{isLocal ? "Local Rental" : cityOf(booking.to)}</p>
                  {!isLocal && <p className="text-xs text-gray-500 truncate">{booking.to}</p>}
                </div>
              </div>
              <p className="mt-3 flex items-center gap-2 text-sm text-gray-700">
                <Calendar className="w-4 h-4 text-gray-500" />
                <b>{formatDate(booking.date)}, {formatTime(booking.time)}</b>
                {isLocal && booking.pkg && <span className="text-gray-500">· {booking.pkg}</span>}
              </p>
            </div>

            <div className="px-5 py-4 flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-lg font-extrabold text-gray-900">{vehicle.name}</h1>
                  {!!vehicle.rating && vehicle.rating > 0 && (
                    <span className="inline-flex items-center gap-1 bg-[#0B4A9C] text-white text-xs font-bold px-1.5 py-0.5 rounded">
                      {vehicle.rating}<Star className="w-3 h-3 fill-white" />
                    </span>
                  )}
                </div>
                {vehicle.model && <p className="text-sm text-gray-500 mt-0.5 line-clamp-2">{vehicle.model}</p>}
                <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-700">
                  <span className="flex items-center gap-1"><Snowflake className="w-4 h-4 text-gray-400" /> AC</span>
                  <span className="flex items-center gap-1"><Users className="w-4 h-4 text-gray-400" /> {vehicle.seats} Seats</span>
                  {vehicle.fuelType && <span className="flex items-center gap-1"><Fuel className="w-4 h-4 text-gray-400" /> {vehicle.fuelType}</span>}
                </p>
              </div>
              <div className="w-28 sm:w-36 shrink-0 rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  onError={(e) => { if (!e.currentTarget.src.endsWith(FALLBACK_IMG)) e.currentTarget.src = FALLBACK_IMG; }}
                  className="w-full h-20 sm:h-24 object-contain"
                />
                {vehicle.fuelType && (
                  <span className="block bg-teal-600 text-white text-[11px] font-bold text-center py-0.5">{vehicle.fuelType}</span>
                )}
              </div>
            </div>

            {webConfig && (
              <div className="bg-amber-50 border-t border-amber-100 px-5 py-2.5 flex items-center gap-2 text-sm text-amber-900">
                <Clock className="w-4 h-4 shrink-0" />
                Free cancellation till <b>{formatCancelWindow(webConfig.freeCancelMinutes)} before departure</b>
              </div>
            )}
          </div>

          {/* Inclusions */}
          <div className={clsx(card, "p-5")}>
            <h2 className="text-xs font-bold tracking-wider text-gray-500 uppercase mb-3">Inclusions</h2>
            <ul className="divide-y divide-gray-100">
              {!isLocal && !!vehicle.includedKm && (
                <li className="flex items-start gap-3 py-3">
                  <Gauge className="w-5 h-5 text-teal-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{vehicle.includedKm} Km included</p>
                    {!!vehicle.perKmAfter && <p className="text-sm text-gray-600">{inr(vehicle.perKmAfter)}/km will apply beyond the included kms</p>}
                  </div>
                </li>
              )}
              {isLocal && !!vehicle.includedKm && (
                <li className="flex items-start gap-3 py-3">
                  <Gauge className="w-5 h-5 text-teal-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{booking.pkg ?? `${vehicle.includedKm} Km included`}</p>
                    {!!vehicle.perKmAfter && <p className="text-sm text-gray-600">{inr(vehicle.perKmAfter)}/km will apply beyond the included kms</p>}
                  </div>
                </li>
              )}
              <li className="flex items-start gap-3 py-3">
                <Receipt className="w-5 h-5 text-teal-600 mt-0.5 shrink-0" />
                <div>
                  <p className="font-bold text-gray-900 text-sm">Base fare &amp; {gstLabel}</p>
                  <p className="text-sm text-gray-600">Base fare, driver allowance and taxes are part of the total fare shown</p>
                </div>
              </li>
              {included.map((p) => (
                <li key={p.title} className="flex items-start gap-3 py-3">
                  <UserCheck className="w-5 h-5 text-teal-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{p.title}</p>
                    <p className="text-sm text-gray-600">{p.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            {excluded.length > 0 && (
              <>
                <h2 className="text-xs font-bold tracking-wider text-gray-500 uppercase mt-4 mb-2">Exclusions</h2>
                <ul className="space-y-2">
                  {excluded.map((p) => (
                    <li key={p.title} className="flex items-start gap-3 text-sm">
                      <X className="w-5 h-5 text-red-500 shrink-0" />
                      <div>
                        <p className="font-bold text-gray-900">{p.title}</p>
                        <p className="text-gray-600">{p.text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          {/* Cancellation policy */}
          {webConfig && (
            <div>
              <h2 className="text-lg font-extrabold text-gray-900 mb-2 px-1">Cancellation Policy</h2>
              <div className={clsx(card, "p-4")}>
                {webConfig.freeCancelMinutes > 0 && deadline && !deadline.passed ? (
                  <p className="flex items-center gap-2 text-sm">
                    <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>
                      <b className="text-teal-700">Free cancellation until {deadline.text}</b>{" "}
                      <span className="text-gray-500">{formatCancelWindow(webConfig.freeCancelMinutes)} before pick up time</span>
                    </span>
                  </p>
                ) : (
                  <p className="text-sm text-gray-600">
                    Free cancellation is not available for this pickup time. Cancellation charges may apply.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Traveller details */}
          <div className={clsx(card, "p-5")}>
            <h2 className="text-lg font-extrabold text-gray-900 pb-2 mb-4 border-b border-gray-100">Traveller Details</h2>
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
        </div>

        {/* RIGHT */}
        <aside className="lg:w-[40%]">
          <div className="lg:sticky lg:top-4 space-y-4">
            {/* Fare breakup */}
            <div className={clsx(card, "p-5")}>
              <button onClick={() => setShowFare((v) => !v)} className="w-full flex items-center justify-between text-sm font-bold text-[#0B4A9C] cursor-pointer">
                {showFare ? "Hide Fare Break up" : "View Fare Break up"} {showFare ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {showFare && (
                <div className="mt-3 rounded-xl bg-gray-50 p-4 text-sm text-gray-700 space-y-2">
                  <div className="flex justify-between font-bold text-gray-900"><span>Base Fare</span><span>{inr(f.baseFare + f.extraKmFare)}</span></div>
                  {f.extraKmFare > 0 && (
                    <div className="flex justify-between pl-3 text-gray-500"><span>Includes extra km charges</span><span>{inr(f.extraKmFare)}</span></div>
                  )}
                  <div className="flex justify-between font-bold text-gray-900 pt-1"><span>Taxes &amp; Fees</span><span>{inr(f.driverAllowance + f.gst)}</span></div>
                  <div className="flex justify-between pl-3 text-gray-500"><span>Driver Charges</span><span>{inr(f.driverAllowance)}</span></div>
                  <div className="flex justify-between pl-3 text-gray-500"><span>{gstLabel}</span><span>{inr(f.gst)}</span></div>
                  {discount > 0 && (
                    <div className="flex justify-between font-bold text-green-600 pt-1"><span>Coupon ({coupon?.code})</span><span>- {inr(discount)}</span></div>
                  )}
                  <div className="flex justify-between border-t border-gray-200 pt-3 text-base font-extrabold text-gray-900"><span>Total</span><span>{inr(total)}</span></div>
                </div>
              )}
            </div>

            {/* Coupons */}
            <div className={clsx(card, "p-5")}>
              <h2 className="text-lg font-extrabold text-gray-900 mb-3 flex items-center gap-2"><Ticket className="w-5 h-5 text-[#0B4A9C]" /> Coupons &amp; Offers</h2>

              {coupon ? (
                <div className="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-green-800 text-sm">{coupon.code} applied</p>
                    <p className="text-xs text-green-700">You save {inr(coupon.discount)} on this booking</p>
                  </div>
                  <button onClick={removeCoupon} disabled={locked} className="text-xs font-bold text-red-600 disabled:text-gray-400 cursor-pointer disabled:cursor-not-allowed">REMOVE</button>
                </div>
              ) : (
                <>
                  {offers.length > 0 && (
                    <ul className="divide-y divide-gray-100 mb-3">
                      {offers.map((o) => (
                        <li key={o.code}>
                          <button
                            type="button"
                            disabled={!o.eligible || couponBusy || locked}
                            onClick={() => applyCode(o.code)}
                            className={clsx("w-full flex items-start gap-3 py-3 text-left", o.eligible ? "cursor-pointer" : "opacity-60 cursor-not-allowed")}
                          >
                            <span className="mt-1 w-4 h-4 rounded-full border-2 border-gray-300 shrink-0" />
                            <span className="flex-1 min-w-0">
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-dashed border-teal-500 bg-teal-50 text-teal-700 font-mono font-bold text-xs">
                                <Tag className="w-3 h-3" /> {o.code}
                              </span>
                              <span className="block text-sm text-gray-800 mt-1">{o.title}</span>
                              {o.description && <span className="block text-xs text-gray-500">{o.description}</span>}
                              {o.eligible
                                ? <span className="block text-xs font-semibold text-green-600 mt-0.5">Save {inr(o.discount)}</span>
                                : <span className="block text-xs text-orange-600 mt-0.5">{o.reason}</span>}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                  <form
                    onSubmit={(e) => { e.preventDefault(); applyCode(couponInput); }}
                    className="flex items-center gap-2 border border-gray-300 rounded-xl pl-3 pr-1 h-12 focus-within:border-[#0B4A9C]"
                  >
                    <input
                      aria-label="Coupon code"
                      value={couponInput}
                      onChange={(e) => { setCouponInput(e.target.value.toUpperCase().replace(/[^A-Z0-9_-]/g, "")); setCouponErr(""); }}
                      placeholder="ENTER A COUPON"
                      disabled={locked}
                      maxLength={20}
                      className="flex-1 min-w-0 bg-transparent outline-none text-sm font-semibold tracking-wide placeholder:text-gray-400"
                    />
                    <button
                      type="submit"
                      disabled={!couponInput || couponBusy || locked}
                      className="px-4 h-9 rounded-lg text-sm font-bold text-[#0B4A9C] disabled:text-gray-400 cursor-pointer disabled:cursor-not-allowed"
                    >
                      {couponBusy ? <Loader2 className="w-4 h-4 animate-spin" /> : "APPLY"}
                    </button>
                  </form>
                  {couponErr && <p role="alert" className="text-xs text-red-600 mt-2">{couponErr}</p>}
                </>
              )}
              {locked && <p className="text-xs text-gray-500 mt-2">Booking is created. Coupon and payment option can no longer be changed.</p>}
            </div>

            {/* Payment */}
            <div className={clsx(card, "p-5")}>
              <h2 className="text-lg font-extrabold text-gray-900 mb-3">Payment Options</h2>
              <div className="space-y-3">
                {payOptions.map((o) => (
                  <label key={o.id} className={clsx("flex items-center gap-3 border rounded-xl px-4 py-3", locked ? "cursor-not-allowed" : "cursor-pointer", pay === o.id ? "border-blue-400 bg-blue-50" : "border-gray-200")}>
                    <input type="radio" name="pay" disabled={locked} className="w-5 h-5 accent-[#0B4A9C]" checked={pay === o.id} onChange={() => setPay(o.id)} />
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
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

type RazorpayCtor = new (options: Record<string, unknown>) => { open: () => void };

function loadRazorpay(): Promise<void> {
  return new Promise((resolve, reject) => {
    if ((window as unknown as { Razorpay?: RazorpayCtor }).Razorpay) { resolve(); return; }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Razorpay"));
    document.body.appendChild(script);
  });
}
