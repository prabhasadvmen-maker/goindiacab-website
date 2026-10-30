"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import {
  Briefcase, Check, ChevronDown, ChevronUp, Clock, Crosshair, Fuel, Loader2,
  ShieldCheck, Snowflake, Sparkles, Star, Tag, Users, X,
} from "lucide-react";
import {
  FALLBACK_IMG, TRIP_LABEL, AIRPORT_DIR_LABEL, apiTripType, formatDate, formatTime, inr, nowMs, useStoredString,
  type BookingData,
} from "@/src/lib/booking";
import {
  createBooking, createPaymentOrder, verifyPayment, getWebConfig, formatCancelWindow,
  getAvailableCoupons, validateCoupon, reverseGeocodeApi,
  type CouponOffer, type WebAddon, type WebConfig,
} from "@/src/lib/api";

// pickupAddress / dropAddress stay null until the customer edits them; until then the searched From / To are used.
type Form = { name: string; mobile: string; email: string; pickupAddress: string | null; dropAddress: string | null; instructions: string };
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

const bareInput = "w-full bg-transparent outline-none text-sm font-medium text-gray-900 placeholder:text-gray-400 placeholder:font-normal py-0.5";

/** Boxed input with its label inside the border; error turns the border red. */
function FloatField({ label, error, hint, action, children }: { label: string; error?: string; hint?: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <div
        className={clsx(
          "rounded-lg border bg-gray-50 px-3 pt-1.5 pb-1 transition focus-within:bg-white focus-within:border-[#00A5D9] focus-within:ring-2 focus-within:ring-[#00A5D9]/15",
          error ? "border-red-500" : "border-gray-300 hover:border-gray-400"
        )}
      >
        <div className="flex items-center justify-between gap-2">
          <span className="block text-[11px] font-semibold text-[#00A5D9]">{label}</span>
          {action}
        </div>
        {children}
      </div>
      {error ? <p className="text-xs text-red-600 mt-1 ml-1">{error}</p> : hint && <p className="text-xs text-gray-500 mt-1 ml-1">{hint}</p>}
    </div>
  );
}
const card = "bg-white rounded-xl shadow-sm border border-gray-200";
const cardTitle = "text-base font-extrabold text-gray-900 pb-3 mb-4 border-b border-gray-200 flex items-center gap-2";

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

  const [form, setForm] = useState<Form>({ name: "", mobile: "", email: "", pickupAddress: null, dropAddress: null, instructions: "" });
  const [touched, setTouched] = useState<Partial<Record<Key, boolean>>>({});
  const [processing, setProcessing] = useState(false);
  const [pay, setPay] = useState<Pay>("part");
  const [createdId, setCreatedId] = useState<string | null>(null); // set once the booking exists on the server
  const [showInstr, setShowInstr] = useState(false);
  const [showFare, setShowFare] = useState(true);
  const [apiError, setApiError] = useState("");
  const [webConfig, setWebConfig] = useState<WebConfig | null>(null);
  const [addonCodes, setAddonCodes] = useState<string[]>([]);
  const [locating, setLocating] = useState(false);
  const [locMsg, setLocMsg] = useState<{ tone: "error" | "info"; text: string } | null>(null);

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
  const cartKey = booking ? `${booking.vehicle.id}|${booking.distanceKm}|${booking.tripType}|${booking.airportDir ?? ""}|${booking.pkg ?? ""}|${booking.days ?? 1}` : "";
  useEffect(() => {
    if (!booking) return;
    let alive = true;
    getAvailableCoupons({
      vehicleType: booking.vehicle.id,
      distanceKm: booking.distanceKm,
      tripType: apiTripType(booking.tripType),
      package: booking.pkg,
      days: booking.days,
      airportDir: booking.airportDir,
    }).then((list) => {
      if (alive) setOffers([...list].sort((a, b) => Number(b.eligible) - Number(a.eligible) || b.discount - a.discount));
    });
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartKey]);

  // Pickup / drop come pre-filled from the search; the customer only has to add details.
  const searchedFrom = booking?.from ?? "";
  const searchedTo = booking && booking.tripType !== "local" ? booking.to : "";
  const value = (k: Key): string =>
    k === "pickupAddress" ? form.pickupAddress ?? searchedFrom : k === "dropAddress" ? form.dropAddress ?? searchedTo : form[k];

  const errors = (Object.keys(validators) as Key[]).reduce(
    (acc, k) => ({ ...acc, [k]: validators[k](value(k)) }),
    {} as Record<Key, string>
  );
  const valid = (Object.keys(errors) as Key[]).every((k) => !errors[k]);

  if (!booking) return <div className="min-h-screen bg-gray-50" />;

  const { vehicle } = booking;
  const km = booking.distanceKm;
  const f = vehicle.fare;
  const discount = coupon?.discount ?? 0;
  // Add-ons: shown here, priced again by the server when the booking is created.
  const billableKm = vehicle.billableKm ?? vehicle.includedKm ?? km;
  const addonCity = cityOf(booking.tripType === "local" ? booking.from : booking.to);
  const addonName = (a: WebAddon) => a.title.replace(/{city}/gi, addonCity || "your destination");
  const addonCost = (a: WebAddon) => Math.round(a.unit === "perKm" ? a.price * billableKm : a.price);
  const addonCatalog = (webConfig?.addons ?? []).filter((a) => !a.tripTypes.length || a.tripTypes.includes(booking.tripType));
  const pickedAddons = addonCatalog.filter((a) => addonCodes.includes(a.code));
  const addonsTotal = pickedAddons.reduce((sum, a) => sum + addonCost(a), 0);
  const total = f.total - discount + addonsTotal;
  const percent = booking.partPercent ?? webConfig?.partPaymentPercent ?? 0;
  const gstLabel = vehicle.gstPercent != null ? `GST (${vehicle.gstPercent}%)` : "GST";
  const partAmt = Math.round((total * percent) / 100);
  const paidNow = pay === "part" ? partAmt : total;
  const locked = createdId !== null; // coupon / payment option are frozen after the booking is created
  const deadline = webConfig ? cancelDeadline(booking.date, booking.time, webConfig.freeCancelMinutes) : null;
  const isLocal = booking.tripType === "local";
  const baseLabel = booking.airportDir ? AIRPORT_DIR_LABEL[booking.airportDir] : TRIP_LABEL[booking.tripType] ?? booking.tripType;

  const set = (k: Key, v: string) => setForm((s) => ({ ...s, [k]: k === "mobile" ? v.replace(/\D/g, "").slice(0, 10) : v }));
  // "Use my current location": browser GPS -> address from the server. The customer can still type any address instead.
  const useCurrentLocation = () => {
    if (locating) return;
    if (!navigator.geolocation) {
      setLocMsg({ tone: "error", text: "Your browser cannot share its location. Please type the pickup address." });
      return;
    }
    setLocating(true);
    setLocMsg(null);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { address } = await reverseGeocodeApi(pos.coords.latitude, pos.coords.longitude);
          set("pickupAddress", address);
          blur("pickupAddress");
          const city = cityOf(booking!.from).toLowerCase();
          const outside = city.length > 2 && !address.toLowerCase().includes(city);
          setLocMsg({
            tone: outside ? "error" : "info",
            text: outside
              ? `This looks outside ${cityOf(booking!.from)}. If your pickup is elsewhere, please type the correct address.`
              : "Detected from your current location — add house / building number if needed.",
          });
        } catch {
          setLocMsg({ tone: "error", text: "Could not find an address for your location. Please type it instead." });
        } finally {
          setLocating(false);
        }
      },
      (e) => {
        setLocating(false);
        setLocMsg({
          tone: "error",
          text: e.code === e.PERMISSION_DENIED
            ? "Location access is blocked. Allow it in your browser settings, or type the pickup address."
            : "Could not get your location. Please type the pickup address.",
        });
      },
      { enableHighAccuracy: true, timeout: 10_000, maximumAge: 60_000 }
    );
  };
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
        days: booking.days,
        airportDir: booking.airportDir,
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
      (acc, k) => ({ ...acc, [k]: validators[k](value(k)) }),
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
          pickupAddress: value("pickupAddress").trim(), dropAddress: value("dropAddress").trim(),
          instructions: form.instructions.trim(),
        },
        trip: {
          from: booking.from,
          to: isLocal ? "" : booking.to,
          ...(booking.stop ? { stop: booking.stop } : {}),
          date: booking.date, time: booking.time,
          tripType: apiTripType(booking.tripType), distanceKm: km,
          ...(booking.airportDir ? { airportDir: booking.airportDir } : {}),
          ...(isLocal ? { package: booking.pkg } : {}),
          ...(booking.returnDate ? { returnDate: booking.returnDate, days: booking.days } : {}),
        },
        vehicle: { id: vehicle.id },
        fare: {
          paymentOption: pay,
          ...(coupon ? { couponCode: coupon.code } : {}),
          ...(pickedAddons.length ? { addons: pickedAddons.map((a) => a.code) } : {}),
        },
      });

      const bookingId = createdId ?? bookingRes!.bookingId;
      setCreatedId(bookingId);
      const serverFare = bookingRes?.fare;

      // Backup copy for the confirmation page
      if (bookingRes && serverFare) try {
        localStorage.setItem("confirmedBooking", JSON.stringify({
          bookingId,
          passenger: { name: form.name.trim(), mobile: form.mobile, email: form.email.trim(), pickupAddress: value("pickupAddress").trim() },
          trip: { from: booking.from, to: booking.to, stop: booking.stop, date: booking.date, time: booking.time, tripType: booking.tripType, distanceKm: km },
          vehicle: { id: vehicle.id, name: vehicle.name, model: vehicle.model, seats: vehicle.seats, image: vehicle.image },
          fare: {
            ...vehicle.fare, discount: serverFare.discount, couponCode: serverFare.couponCode,
            addons: pickedAddons.map((a) => ({ label: addonName(a), price: addonCost(a) })),
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

  const fieldError = (k: Key) => (touched[k] && errors[k] ? errors[k] : "");

  const payOptions: { id: Pay; title: string; sub: string; amt: number }[] = [
    { id: "part", title: "Part Pay", sub: `Pay ${percent}% now and rest to the driver`, amt: partAmt },
    { id: "full", title: "Full Pay", sub: "Full amount", amt: total },
  ];

  // Policies can be limited to certain trip types (empty = every trip type).
  const policies = (webConfig?.policies ?? []).filter((p) => !p.tripTypes?.length || p.tripTypes.includes(booking.tripType));
  const included = policies.filter((p) => p.kind === "included");
  const excluded = policies.filter((p) => p.kind === "excluded");

  // Inclusions / exclusions come from this vehicle's real fare plus the admin-managed policies.
  const inclusionItems = [
    "Base Fare and Fuel Charges",
    ...(isLocal ? (booking.pkg ? [booking.pkg] : []) : vehicle.includedKm ? [`${vehicle.includedKm} km included`] : []),
    ...(f.driverAllowance > 0 ? ["Driver allowance"] : []),
    ...included.map((p) => p.text || p.title),
    gstLabel,
    ...(vehicle.bags ? [`${vehicle.bags} bag${vehicle.bags > 1 ? "s" : ""}`] : []),
    "AC",
  ];
  const routeTitle = isLocal
    ? cityOf(booking.from)
    : [cityOf(booking.from), ...(booking.stop ? [cityOf(booking.stop)] : []), cityOf(booking.to), ...(booking.tripType === "roundtrip" ? [cityOf(booking.from)] : [])].join(" → ");
  const exclusionItems = [
    ...(vehicle.includedKm && vehicle.perKmAfter ? [`Beyond package km charged at ${inr(vehicle.perKmAfter)}/km after ${vehicle.includedKm} km`] : []),
    ...excluded.map((p) => p.text || p.title),
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-28 lg:pb-10">
      <div className="max-w-6xl mx-auto px-4 pt-4">
        <p className="text-[11px] text-gray-500 mb-3">
          Home &gt; Select Car &gt; <span className="text-gray-800 font-medium">Booking</span>
        </p>
        <h1 className="rounded-xl bg-gradient-to-r from-[#0B4A9C] to-[#00A5D9] px-5 py-3.5 text-white font-bold text-base sm:text-lg shadow-sm">
          Review Your Booking
        </h1>
      </div>

      <div className="max-w-6xl mx-auto px-4 pt-4 flex flex-col lg:flex-row gap-5 items-start">
        {/* LEFT */}
        <div className="w-full lg:w-[60%] space-y-4">
          {/* Trip summary */}
          <div className={clsx(card, "p-5")}>
            <div className="flex items-start gap-4">
              <div className="flex-1 min-w-0">
                <h2 className="text-lg sm:text-2xl font-extrabold text-gray-900 leading-snug">
                  {routeTitle} <span className="text-sm sm:text-base font-normal text-gray-500">({baseLabel})</span>
                </h2>
                <dl className="mt-3 space-y-1.5 text-sm text-gray-600">
                  <div>
                    Car Type: <b className="text-gray-900">{vehicle.name}</b>
                    {vehicle.model && <span className="text-gray-500"> ({vehicle.model})</span>}
                    {!!vehicle.rating && vehicle.rating > 0 && (
                      <span className="ml-2 inline-flex items-center gap-1 bg-[#0B4A9C] text-white text-[11px] font-bold px-1.5 py-0.5 rounded align-middle">
                        {vehicle.rating}<Star className="w-3 h-3 fill-white" />
                      </span>
                    )}
                  </div>
                  {vehicle.fuelType && <div>Fuel Type: <b className="text-gray-900">{vehicle.fuelType}</b></div>}
                  <div>
                    Pickup Date: <b className="text-gray-900">{formatDate(booking.date)}, {formatTime(booking.time)}</b>
                    {booking.returnDate && <> &bull; Return Date: <b className="text-gray-900">{formatDate(booking.returnDate)}</b></>}
                  </div>
                  {isLocal ? (
                    booking.pkg && <div>Package: <b className="text-gray-900">{booking.pkg}</b></div>
                  ) : (
                    !!vehicle.includedKm && <div>Kms included: <b className="text-gray-900">{vehicle.includedKm} kms</b></div>
                  )}
                  {booking.from !== cityOf(booking.from) && <div className="truncate" title={booking.from}>From: <span className="text-gray-900">{booking.from}</span></div>}
                  {!isLocal && booking.to !== cityOf(booking.to) && <div className="truncate" title={booking.to}>To: <span className="text-gray-900">{booking.to}</span></div>}
                </dl>
                <p className="mt-3 flex flex-wrap items-center gap-2 text-xs font-semibold text-gray-700">
                  <span className="inline-flex items-center gap-1 rounded-md border border-gray-200 bg-gray-50 px-2 py-1"><Snowflake className="w-3.5 h-3.5 text-[#0B4A9C]" /> AC</span>
                  <span className="inline-flex items-center gap-1 rounded-md border border-gray-200 bg-gray-50 px-2 py-1"><Users className="w-3.5 h-3.5 text-[#0B4A9C]" /> {vehicle.seats} Seats</span>
                  {!!vehicle.bags && <span className="inline-flex items-center gap-1 rounded-md border border-gray-200 bg-gray-50 px-2 py-1"><Briefcase className="w-3.5 h-3.5 text-[#0B4A9C]" /> {vehicle.bags} Bags</span>}
                  {vehicle.fuelType && <span className="inline-flex items-center gap-1 rounded-md border border-gray-200 bg-gray-50 px-2 py-1"><Fuel className="w-3.5 h-3.5 text-[#0B4A9C]" /> {vehicle.fuelType}</span>}
                </p>
              </div>
              <div className="hidden sm:block w-36 shrink-0 rounded-xl overflow-hidden bg-gray-50 border border-gray-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  onError={(e) => { if (!e.currentTarget.src.endsWith(FALLBACK_IMG)) e.currentTarget.src = FALLBACK_IMG; }}
                  className="w-full h-24 object-contain"
                />
              </div>
            </div>
          </div>

          {/* Contact & pickup details */}
          <div className={clsx(card, "p-5")}>
            <h2 className={cardTitle}>Contact &amp; Pickup Details</h2>
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FloatField label="Full Name" error={fieldError("name")}>
                  <input aria-label="Full Name" className={bareInput} placeholder="Full Name" value={form.name} onChange={(e) => set("name", e.target.value)} onBlur={() => blur("name")} />
                </FloatField>
                <FloatField label="Mobile No." error={fieldError("mobile")}>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-700 border-r border-gray-300 pr-2">+91</span>
                    <input aria-label="Mobile No." type="tel" inputMode="numeric" className={bareInput} placeholder="10-digit mobile number" value={form.mobile} onChange={(e) => set("mobile", e.target.value)} onBlur={() => blur("mobile")} />
                  </div>
                </FloatField>
              </div>
              <FloatField label="Email ID (optional)" error={fieldError("email")}>
                <input aria-label="Email ID" type="email" className={bareInput} placeholder="you@example.com" value={form.email} onChange={(e) => set("email", e.target.value)} onBlur={() => blur("email")} />
              </FloatField>
              <FloatField
                label="Pickup Location"
                error={fieldError("pickupAddress")}
                hint={locMsg ? undefined : form.pickupAddress === null && searchedFrom ? "Filled from your search — add house / building / street so the driver can find you." : undefined}
                action={booking.airportDir === "from" ? undefined : (
                  <button
                    type="button"
                    onClick={useCurrentLocation}
                    disabled={locating || locked}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0B4A9C] hover:underline disabled:text-gray-400 cursor-pointer disabled:cursor-not-allowed"
                  >
                    {locating ? <Loader2 className="w-3 h-3 animate-spin" /> : <Crosshair className="w-3 h-3" />}
                    {locating ? "Detecting..." : "Use my current location"}
                  </button>
                )}
              >
                <input aria-label="Pickup Location" className={bareInput} placeholder="House / building, street, area (full address)" value={value("pickupAddress")} onChange={(e) => set("pickupAddress", e.target.value)} onBlur={() => blur("pickupAddress")} />
              </FloatField>
              {locMsg && <p role={locMsg.tone === "error" ? "alert" : "status"} className={clsx("-mt-1.5 text-xs ml-1", locMsg.tone === "error" ? "text-red-600" : "text-gray-500")}>{locMsg.text}</p>}
              <FloatField label="Drop Location (optional)">
                <input aria-label="Drop Location" className={bareInput} placeholder="Where should the driver drop you?" value={value("dropAddress")} onChange={(e) => set("dropAddress", e.target.value)} />
              </FloatField>
              {showInstr ? (
                <FloatField label="Special Instructions">
                  <textarea aria-label="Special Instructions" rows={2} className={clsx(bareInput, "resize-none")} placeholder="Anything the driver should know" value={form.instructions} onChange={(e) => set("instructions", e.target.value)} />
                </FloatField>
              ) : (
                <button type="button" onClick={() => setShowInstr(true)} className="text-sm font-semibold text-[#0B4A9C] bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg px-4 py-2.5 cursor-pointer">
                  + Add special instructions
                </button>
              )}
            </div>
          </div>

          {/* Personalize your journey (optional add-ons, priced again by the server) */}
          {addonCatalog.length > 0 && (
            <div className={clsx(card, "p-5")}>
              <h2 className="text-lg font-extrabold text-[#00A5D9] flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0B4A9C] to-[#7C3AED] flex items-center justify-center shrink-0"><Sparkles className="w-4 h-4 text-white" /></span>
                Personalize Your Journey
              </h2>
              <p className="text-sm text-gray-500 mt-0.5 pb-3 mb-4 border-b border-gray-200">Enhance your travel experience with our premium add-ons</p>
              <ul className="space-y-3">
                {addonCatalog.map((a) => {
                  const on = addonCodes.includes(a.code);
                  return (
                    <li key={a.code}>
                      <label
                        className={clsx(
                          "flex items-start gap-3 rounded-xl border px-4 py-3 transition-colors",
                          locked ? "cursor-not-allowed opacity-70" : "cursor-pointer",
                          on ? "border-[#0B4A9C] bg-blue-50 ring-1 ring-[#0B4A9C]" : "border-gray-300 hover:border-gray-400"
                        )}
                      >
                        <input
                          type="checkbox"
                          checked={on}
                          disabled={locked}
                          onChange={() => setAddonCodes((c) => (c.includes(a.code) ? c.filter((x) => x !== a.code) : [...c, a.code]))}
                          className="mt-0.5 w-5 h-5 accent-[#0B4A9C] shrink-0"
                        />
                        <span className="flex-1 min-w-0">
                          <span className="block text-sm font-bold text-gray-900">
                            {addonName(a)}
                            {a.badge && (
                              <span className="ml-2 inline-block align-middle text-[10px] font-bold text-orange-700 bg-orange-100 rounded-full px-2.5 py-0.5">{a.badge}</span>
                            )}
                          </span>
                          {a.unit === "perKm" && billableKm > 0 && (
                            <span className="block text-xs text-gray-500 mt-1">≈ {inr(addonCost(a))} for this trip ({billableKm} km)</span>
                          )}
                        </span>
                        <span className="text-sm font-extrabold text-gray-900 shrink-0">{a.unit === "perKm" ? `₹${a.price}/km` : inr(a.price)}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
              {addonsTotal > 0 && (
                <p className="mt-4 flex justify-between text-sm font-bold text-gray-900 border-t border-gray-200 pt-3">
                  <span>Add-ons total</span><span>{inr(addonsTotal)}</span>
                </p>
              )}
            </div>
          )}

          {/* Inclusions / Exclusions */}
          <div className={clsx(card, "p-5")}>
            <h2 className={cardTitle}>Inclusions / Exclusions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="flex items-center gap-2 text-sm font-bold text-green-600 mb-3">
                  <span className="w-2 h-2 rounded-full bg-green-500" /> Inclusions
                </p>
                <ul className="space-y-2.5">
                  {inclusionItems.map((t) => (
                    <li key={t} className="flex items-start gap-2 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" /> {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="flex items-center gap-2 text-sm font-bold text-red-500 mb-3">
                  <span className="w-2 h-2 rounded-full bg-red-500" /> Exclusions
                </p>
                {exclusionItems.length > 0 ? (
                  <ul className="space-y-2.5">
                    {exclusionItems.map((t) => (
                      <li key={t} className="flex items-start gap-2 text-sm text-gray-700">
                        <X className="w-4 h-4 text-red-500 mt-0.5 shrink-0" /> {t}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">Nothing is excluded from this fare.</p>
                )}
              </div>
            </div>

            <details className="group mt-5 border-t border-gray-200 pt-4">
              <summary className="flex items-center justify-between cursor-pointer list-none text-sm font-semibold text-gray-900">
                Read Terms and Conditions
                <ChevronDown className="w-4 h-4 text-gray-500 transition-transform group-open:rotate-180" />
              </summary>
              <ul className="mt-3 space-y-2 text-sm text-gray-600 list-disc pl-5">
                {webConfig && webConfig.freeCancelMinutes > 0 && (
                  <li>Free cancellation up to {formatCancelWindow(webConfig.freeCancelMinutes)} before the pickup time.</li>
                )}
                {percent > 0 && <li>{percent}% of the fare is paid online to confirm the booking; the rest is paid to the driver.</li>}
                {vehicle.includedKm && vehicle.perKmAfter ? (
                  <li>Kilometres beyond {vehicle.includedKm} km are charged at {inr(vehicle.perKmAfter)}/km.</li>
                ) : null}
                <li>Add-ons, if selected, are charged on top of the fare shown.</li>
                <li>
                  See the full{" "}
                  <Link href="/terms-conditions" target="_blank" className="font-semibold text-[#0B4A9C] underline">Terms &amp; Conditions</Link>.
                </li>
              </ul>
            </details>
          </div>

          {/* Cancellation policy */}
          {webConfig && (
            <div className={clsx(card, "p-5")}>
              <h2 className={cardTitle}>Cancellation Policy</h2>
              <div className="rounded-lg border border-teal-100 bg-teal-50/50 px-4 py-3">
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

        </div>

        {/* RIGHT */}
        <aside className="w-full lg:w-[40%]">
          <div className="lg:sticky lg:top-4 space-y-4">
            {webConfig && webConfig.freeCancelMinutes > 0 && (
              <div className="flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                <span className="w-7 h-7 rounded-full bg-amber-300 flex items-center justify-center shrink-0"><Clock className="w-4 h-4 text-amber-900" /></span>
                <span>Free cancellation till <b>{formatCancelWindow(webConfig.freeCancelMinutes)}</b> of departure</span>
              </div>
            )}

            <div className={clsx(card, "p-5")}>
              <h2 className="text-xl font-extrabold text-gray-900">Payment Options</h2>

              {/* Fare summary */}
              <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50">
                <button
                  type="button"
                  onClick={() => setShowFare((v) => !v)}
                  aria-expanded={showFare}
                  className="w-full flex items-center justify-between gap-3 px-4 py-3 cursor-pointer"
                >
                  <span className="text-sm font-bold text-gray-900">Total fare</span>
                  <span className="flex items-center gap-2">
                    <span className="text-lg font-extrabold text-gray-900">{inr(total)}</span>
                    {showFare ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
                  </span>
                </button>
                {showFare && (
                  <div className="border-t border-gray-200 px-4 py-3 text-sm text-gray-700 space-y-2">
                    <div className="flex justify-between font-bold text-gray-900"><span>Base Fare</span><span>{inr(f.baseFare + f.extraKmFare)}</span></div>
                    {f.extraKmFare > 0 && (
                      <div className="flex justify-between pl-3 text-gray-500"><span>Includes extra km charges</span><span>{inr(f.extraKmFare)}</span></div>
                    )}
                    <div className="flex justify-between font-bold text-gray-900 pt-1"><span>Taxes &amp; Fees</span><span>{inr(f.driverAllowance + f.gst)}</span></div>
                    <div className="flex justify-between pl-3 text-gray-500"><span>Driver Charges</span><span>{inr(f.driverAllowance)}</span></div>
                    <div className="flex justify-between pl-3 text-gray-500"><span>{gstLabel}</span><span>{inr(f.gst)}</span></div>
                    {pickedAddons.map((a) => (
                      <div key={a.code} className="flex justify-between font-semibold text-gray-800"><span>{addonName(a)}</span><span>{inr(addonCost(a))}</span></div>
                    ))}
                    {discount > 0 && (
                      <div className="flex justify-between font-bold text-green-600 pt-1"><span>Coupon ({coupon?.code})</span><span>- {inr(discount)}</span></div>
                    )}
                    <div className="flex justify-between border-t border-gray-200 pt-3 text-base font-extrabold text-gray-900"><span>Total</span><span>{inr(total)}</span></div>
                  </div>
                )}
              </div>

              {discount > 0 && (
                <p className="mt-3 flex items-center gap-2 rounded-lg bg-green-50 border border-green-200 px-3 py-2 text-sm font-semibold text-green-700">
                  <Check className="w-4 h-4" /> {inr(discount)} instant discount applied
                </p>
              )}

              <div className="mt-4 space-y-3">
                {payOptions.map((o) => (
                  <label key={o.id} className={clsx("flex items-center gap-3 border rounded-xl px-4 py-3.5", locked ? "cursor-not-allowed" : "cursor-pointer", pay === o.id ? "border-[#0B4A9C] bg-blue-50 ring-1 ring-[#0B4A9C]" : "border-gray-300 hover:border-gray-400")}>
                    <input type="radio" name="pay" disabled={locked} className="w-5 h-5 accent-[#0B4A9C]" checked={pay === o.id} onChange={() => setPay(o.id)} />
                    <span className="flex-1 min-w-0">
                      <span className="block font-bold text-gray-900">{o.title}</span>
                      <span className="block text-xs text-gray-500">{o.sub}</span>
                    </span>
                    <span className="text-lg font-extrabold text-gray-900">{inr(o.amt)}</span>
                  </label>
                ))}
              </div>

              <div className="mt-6 border-t border-gray-200 pt-5">
              <h3 className="text-lg font-extrabold text-gray-900 mb-3">Coupon &amp; Offers</h3>

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
                    <ul className="space-y-2 mb-4">
                      {offers.map((o) => (
                        <li key={o.code}>
                          <button
                            type="button"
                            disabled={!o.eligible || couponBusy || locked}
                            onClick={() => applyCode(o.code)}
                            className={clsx("w-full flex items-start gap-3 px-4 py-3 text-left rounded-xl border", o.eligible ? "cursor-pointer border-gray-300 hover:border-[#0B4A9C] hover:bg-blue-50/40" : "opacity-60 cursor-not-allowed border-gray-200 bg-gray-50")}
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
                    className="flex items-center gap-2 border border-gray-300 hover:border-gray-400 rounded-xl pl-4 pr-1 h-12 bg-white focus-within:border-[#0B4A9C] focus-within:ring-2 focus-within:ring-[#0B4A9C]/15"
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
                      className="px-6 h-10 rounded-lg text-sm font-extrabold bg-[#00A5D9] hover:bg-[#0094c4] text-white disabled:bg-gray-200 disabled:text-gray-400 cursor-pointer disabled:cursor-not-allowed"
                    >
                      {couponBusy ? <Loader2 className="w-4 h-4 animate-spin" /> : "APPLY"}
                    </button>
                  </form>
                  {couponErr && <p role="alert" className="text-xs text-red-600 mt-2">{couponErr}</p>}
                </>
              )}
              {locked && <p className="text-xs text-gray-500 mt-2">Booking is created. Coupon and payment option can no longer be changed.</p>}
            </div>


              <button
                onClick={submit}
                disabled={!valid || processing}
                className="mt-5 w-full py-4 rounded-xl bg-[#F26A21] hover:bg-[#d95d1a] disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-lg font-extrabold tracking-wide shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 cursor-pointer transition"
              >
                {processing ? (<><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>) : `PROCEED & PAY ${inr(paidNow)}`}
              </button>
              {apiError && <p role="alert" className="text-sm text-red-600 text-center mt-3">{apiError}</p>}
              {!valid && <p className="text-xs text-gray-500 text-center mt-2">Fill name, mobile and pickup location to continue</p>}
            </div>
          </div>
        </aside>
      </div>

      {/* Mobile: always-visible pay bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-gray-200 shadow-[0_-4px_12px_rgba(0,0,0,0.06)] pl-4 pr-20 py-3 flex items-center gap-3">
        <div className="shrink-0">
          <p className="text-[11px] text-gray-500 leading-none">Total</p>
          <p className="text-lg font-extrabold text-gray-900 leading-tight">{inr(total)}</p>
        </div>
        <button
          onClick={submit}
          disabled={!valid || processing}
          className="flex-1 py-3 rounded-xl bg-[#F26A21] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-extrabold text-sm shadow-md cursor-pointer"
        >
          {processing ? "Processing..." : `PAY ${inr(paidNow)}`}
        </button>
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
