"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/common/Button";
import { CheckCircle, Shield, CreditCard, Lock } from "lucide-react";

export default function PayNowForm() {
  const [status, setStatus] = useState<"idle" | "processing" | "success">("idle");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("processing");
    setTimeout(() => setStatus("success"), 2000);
  };

  if (status === "success") {
    return (
      <div className="bg-white p-12 rounded-2xl shadow-lg border border-border text-center">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-dark mb-4">Payment Successful!</h2>
        <p className="text-gray-text mb-8 text-lg">
          Thank you for your payment. Your booking is confirmed.
        </p>
        <Button onClick={() => router.push("/")} size="lg">
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
            <label htmlFor="pay_email" className="block text-sm font-medium text-dark mb-2">Email Address *</label>
            <input type="email" id="pay_email" required className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary outline-none bg-gray-50" placeholder="john@example.com" />
          </div>
          <div>
            <label htmlFor="pay_ref" className="block text-sm font-medium text-dark mb-2">Booking Reference *</label>
            <input type="text" id="pay_ref" required className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary outline-none bg-gray-50" placeholder="Delhi to Agra" />
          </div>
        </div>
        <div>
          <label htmlFor="pay_amount" className="block text-sm font-medium text-dark mb-2">Amount (INR) *</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-text font-bold">₹</span>
            <input type="number" id="pay_amount" required min="1" className="w-full pl-10 pr-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary outline-none bg-gray-50 font-bold text-lg" placeholder="0" />
          </div>
        </div>
        <Button type="submit" size="lg" className="w-full" disabled={status === "processing"}>
          {status === "processing" ? "Processing..." : <><Lock className="w-4 h-4 mr-2 inline" /> Pay Securely</>}
        </Button>
        <div className="flex items-center justify-center space-x-3 pt-4 opacity-60">
          <CreditCard className="w-8 h-8 text-dark" />
          <span className="text-sm">We accept Credit/Debit Cards, UPI, and Netbanking.</span>
        </div>
      </form>
    </div>
  );
}
