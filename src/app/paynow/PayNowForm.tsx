"use client";

import { useState } from "react";
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("processing");
    setErrorMsg("");

    const form = e.currentTarget;
    const name = (form.elements.namedItem("pay_name") as HTMLInputElement).value.trim();
    const phone = (form.elements.namedItem("pay_phone") as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem("pay_email") as HTMLInputElement).value.trim();
    const amount = Number((form.elements.namedItem("pay_amount") as HTMLInputElement).value);

    try {
      // Step 1: Create Razorpay order (no booking ID needed)
      const orderRes = await fetch(`${BASE}/api/payment/create-direct-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, amount }),
      });
      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        setErrorMsg(orderData.message || "Could not initiate payment. Please try again.");
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
        description: "Cab Booking Payment",
        prefill: { name, contact: "+91" + phone, email },
        theme: { color: "#FF6600" },
        handler: () => {
          setStatus("success");
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
        <p className="text-gray-text mb-8 text-lg">
          Thank you for your payment. Your booking is confirmed.
        </p>
        <Button onClick={() => window.location.href = "/"} size="lg">
          Return to Home
        </Button>
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
            <input type="text" id="pay_name" required minLength={2} className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary outline-none bg-gray-50" placeholder="John Doe" />
          </div>
          <div>
            <label htmlFor="pay_phone" className="block text-sm font-medium text-dark mb-2">Phone Number *</label>
            <input type="tel" id="pay_phone" required pattern="[6-9][0-9]{9}" className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary outline-none bg-gray-50" placeholder="9876543210" />
          </div>
        </div>
        <div>
          <label htmlFor="pay_email" className="block text-sm font-medium text-dark mb-2">Email Address (optional)</label>
          <input type="email" id="pay_email" className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary outline-none bg-gray-50" placeholder="john@example.com" />
        </div>
        <div>
          <label htmlFor="pay_amount" className="block text-sm font-medium text-dark mb-2">Amount (INR) *</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-text font-bold">₹</span>
            <input type="number" id="pay_amount" required min="1" className="w-full pl-10 pr-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary outline-none bg-gray-50 font-bold text-lg" placeholder="0" />
          </div>
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
