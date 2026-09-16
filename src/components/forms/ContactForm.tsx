"use client";

import { useState } from "react";
import { Button } from "@/src/components/common/Button";
import { CheckCircle } from "lucide-react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => setStatus("idle"), 5000);
    }, 1500);
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center text-center py-12">
        <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
        <h3 className="text-2xl font-bold text-dark mb-2">Message Sent!</h3>
        <p className="text-gray-text">
          Thank you for contacting us. We will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="cf_name" className="block text-sm font-medium text-dark mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="cf_name"
            required
            className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition bg-gray-50"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label htmlFor="cf_phone" className="block text-sm font-medium text-dark mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            id="cf_phone"
            required
            pattern="[0-9]{10}"
            className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition bg-gray-50"
            placeholder="9876543210"
          />
        </div>
      </div>
      <div>
        <label htmlFor="cf_email" className="block text-sm font-medium text-dark mb-2">
          Email Address
        </label>
        <input
          type="email"
          id="cf_email"
          className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition bg-gray-50"
          placeholder="john@example.com"
        />
      </div>
      <div>
        <label htmlFor="cf_message" className="block text-sm font-medium text-dark mb-2">
          Your Message *
        </label>
        <textarea
          id="cf_message"
          required
          rows={4}
          className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition bg-gray-50 resize-none"
          placeholder="How can we help you?"
        ></textarea>
      </div>
      <Button
        type="submit"
        size="lg"
        className="w-full md:w-auto"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
