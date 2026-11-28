"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/common/Button";
import { CheckCircle, Shield, CreditCard, Lock, Loader2 } from "lucide-react";

type Status = "idle" | "processing" | "success" | "error";

type RazorpayCtor = new (options: Record<string, unknown>) => { open: () => void };

function loadRazorpay(): Promise<void> {
  return new Promise((resolve, reject) => {
    if ((window as unknown as { Razorpay?: RazorpayCtor }).Razorpay) { resolve(); return; }
    const existing = document.querySelector('script[src*="razorpay"]');
    if (existing) existing.remove();
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      if ((window as unknown as { Razorpay?: RazorpayCtor }).Razorpay) resolve();
      else reject(new Error("Razorpay not available"));
    };
    script.onerror = () => reject(new Error("Failed to load Razorpay. Check your internet connection."));
    document.body.appendChild(script);
  });
}

const BASE = process.env.NEXT_PUBLIC_API_URL || "";

export default function PayNowForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [paidBookingId, setPaidBookingId] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("processing");
    setErrorMsg("");

    const form = e.currentTarget;
    const name = (form.elements.namedItem("pay_name") as HTMLInputElement).value.trim();
    const phone = (form.elements.namedItem("pay_phone") as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem("pay_email") as HTMLInputElement).value.trim();
    const bookingRef = (form.elements.namedItem("pay_ref") as HTMLInputElement).value.trim().toUpperCase();
    const amount = Number((form.elements.namedItem("pay_amount") as HTMLInputElement).value);

    if (!bookingRef) {
      setErrorMsg("Please enter your Booking ID (e.g. GIC-XXXXXXXX)");
      setStatus("error");
      return;
    }
    if (!amount || amount < 1) {
      setErrorMsg("Please enter a valid amount.");
      setStatus("error");
      return;
    }

    try {
      // Step 0: Verify booking exists before opening Razorpay
      const checkRes = await fetch(`${BASE}/api/booking/${encodeURIComponent(bookingRef)}`);
      const checkData = await checkRes.json();

      if (!checkRes.ok || !checkData.bookingId) {
        setErrorMsg(`Booking "${bookingRef}" not found. Please check your Booking ID (format: GIC-XXXXXXXX) and try again.`);
        setStatus("error");
        return;
      }
      if (checkData.paymentStatus === "paid") {
        setErrorMsg(`This booking is already paid. No further payment is needed.`);
        setStatus("error");
        return;
      }
      if (checkData.status === "cancelled") {
        setErrorMsg(`This booking has been cancelled. Payment is not possible.`);
        setStatus("error");
        return;
      }

      // Step 1: Create Razorpay order from backend
      const orderRes = await fetch(`${BASE}/api/payment/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId: bookingRef }),
      });
      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        if (orderData.error === "ALREADY_PAID") {
          setErrorMsg("This booking is already paid.");
        } else if (orderData.error === "BOOKING_CANCELLED") {
          setErrorMsg("This booking has been cancelled.");
        } else {
          setErrorMsg(orderData.message || "Could not initiate payment. Please check your Booking ID.");
        }
        setStatus("error");
        return;
      }

      // Step 2: Load Razorpay script
      await loadRazorpay();

      // Step 3: Open Razorpay checkout
      const rzp = new (window as unknown as { Razorpay: RazorpayCtor }).Razorpay({
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        order_id: orderData.orderId,
        name: "GoIndiaCab",
        description: `Payment for Booking ${bookingRef}`,
        prefill: { name, contact: "+91" + phone, email },
        theme: { color: "#FF6600" },
        handler: async (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
          try {
            // Step 4: Verify payment on backend
            const verifyRes = await fetch(`${BASE}/api/payment/verify`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                bookingId: bookingRef,
              }),
            });
            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              setPaidBookingId(bookingRef);
              setStatus("success");
            } else {
              setErrorMsg("Payment verification failed. Please contact support.");
              setStatus("error");
            }
          } catch {
            setErrorMsg("Payment verification failed. Please contact support.");
            setStatus("error");
          }
        },
        modal: {
          ondismiss: () => {
            setErrorMsg("Payment was cancelled. Click Pay Securely to retry.");
            setStatus("error");
          },
        },
      });
      rzp.open();
    } catch (err: unknown) {
      setErrorMsg((err as Error).message || "Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-white p-12 rounded-2xl shadow-lg border border-border text-center">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-dark mb-4">Payment Successful!</h2>
        <p className="text-gray-text mb-2 text-lg">
          Thank you for your payment. Your booking is confirmed.
        </p>
        {paidBookingId && (
          <p className="text-sm text-gray-500 mb-8">Booking ID: <span className="font-bold text-dark">{paidBookingId}</span></p>
        )}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={() => router.push(`/booking/${paidBookingId}`)} size="lg">
            View Booking
          </Button>
          <Button onClick={() => router.push("/")} size="lg" className="bg-gray-100 text-dark hover:bg-gray-200">
            Return to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg border border-border">
      <div className="flex items-center space-x-4 mb-8 pb-8 border-b border-border">
        <Shield className="w-10 h-10 text-green-500" />
        <div>
          <h3 className="font-bold text-dark text-lg">Secure 256-bit SSL Encryption</h3>
          <p className="text-sm text-gray-text">Your payment details are completely safe.</p>
        </div>
      </div>

      {status === "error" && errorMsg && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="pay_name" className="block text-sm font-medium text-dark mb-2">Full Name *</label>
            <input type="text" id="pay_name" required className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary outline-none bg-gray-50" placeholder="John Doe" />
          </div>
          <div>
            <label htmlFor="pay_phone" className="block text-sm font-medium text-dark mb-2">Phone Number *</label>
            <input type="tel" id="pay_phone" required pattern="[0-9]{10}" className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary outline-none bg-gray-50" placeholder="9876543210" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="pay_email" className="block text-sm font-medium text-dark mb-2">Email Address</label>
            <input type="email" id="pay_email" className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary outline-none bg-gray-50" placeholder="john@example.com" />
          </div>
          <div>
            <label htmlFor="pay_ref" className="block text-sm font-medium text-dark mb-2">Booking ID *</label>
            <input type="text" id="pay_ref" required className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary outline-none bg-gray-50 uppercase" placeholder="GIC-XXXXXXXX" />
            <p className="text-xs text-gray-400 mt-1">Find your Booking ID in the confirmation email/WhatsApp (starts with GIC-)</p>
          </div>
        </div>
        <div>
          <label htmlFor="pay_amount" className="block text-sm font-medium text-dark mb-2">Amount (INR) *</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-text font-bold">₹</span>
            <input type="number" id="pay_amount" required min="1" className="w-full pl-10 pr-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary outline-none bg-gray-50 font-bold text-lg" placeholder="0" />
          </div>
          <p className="text-xs text-gray-400 mt-1">Amount is verified from your booking — server will use the actual payable amount.</p>
        </div>
        <Button type="submit" size="lg" className="w-full" disabled={status === "processing"}>
          {status === "processing"
            ? <><Loader2 className="w-4 h-4 mr-2 inline animate-spin" /> Processing...</>
            : <><Lock className="w-4 h-4 mr-2 inline" /> Pay Securely</>
          }
        </Button>
        <div className="flex items-center justify-center space-x-3 pt-4 opacity-60">
          <CreditCard className="w-8 h-8 text-dark" />
          <span className="text-sm">We accept Credit/Debit Cards, UPI, and Netbanking.</span>
        </div>
      </form>
    </div>
  );
}
