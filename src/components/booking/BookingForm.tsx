"use client";

import { useState } from "react";
import { CheckCircle, User, Phone, MapPin, Navigation, ArrowRight, ShieldCheck } from "lucide-react";
import clsx from "clsx";

interface BookingFormProps {
  variant?: 'hero' | 'sidebar' | 'page';
}

export function BookingForm({ variant = 'hero' }: BookingFormProps) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => setStatus('idle'), 5000);
    }, 1200);
  };

  const containerClass = clsx(
    "bg-white rounded-2xl border border-gray-100 shadow-xl p-6 md:p-8 w-full transition-all duration-300",
    variant === 'hero' ? "max-w-md mx-auto xl:mx-0 xl:ml-auto" : "max-w-4xl mx-auto"
  );

  if (status === 'success') {
    return (
      <div className={clsx(containerClass, "flex flex-col items-center justify-center text-center py-12")}>
        <div className="w-16 h-16 rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-4">
          <CheckCircle className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Booking Request Received!</h3>
        <p className="text-gray-600 text-sm max-w-sm">Our team will call you shortly with the best lowest fare estimate and driver details.</p>
      </div>
    );
  }

  const isPageVariant = variant === 'page';

  return (
    <div className={containerClass}>
      {variant !== 'page' && (
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              {variant === 'hero' ? 'Get Instant Fare Quote' : 'Book Your Ride'}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">Lowest Prices Guaranteed Across India</p>
          </div>
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-[#0B4A9C]">
            <ShieldCheck className="w-3.5 h-3.5 mr-1" />
            100% Safe
          </span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className={clsx("grid gap-4", isPageVariant ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1")}>
          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                id="name"
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#0B4A9C] focus:ring-2 focus:ring-[#0B4A9C]/10 transition-all"
                placeholder="e.g. Rahul Sharma"
              />
            </div>
          </div>

          {/* Contact Number */}
          <div>
            <label htmlFor="phone" className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">
              Contact Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Phone className="w-4 h-4" />
              </div>
              <input
                type="tel"
                id="phone"
                required
                pattern="[0-9]{10}"
                title="Please enter a valid 10-digit phone number"
                className="w-full pl-10 pr-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#0B4A9C] focus:ring-2 focus:ring-[#0B4A9C]/10 transition-all"
                placeholder="9876543210"
              />
            </div>
          </div>

          {/* Pickup Location */}
          <div>
            <label htmlFor="pickup" className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">
              Pickup Location
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-blue-600">
                <MapPin className="w-4 h-4" />
              </div>
              <input
                type="text"
                id="pickup"
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#0B4A9C] focus:ring-2 focus:ring-[#0B4A9C]/10 transition-all"
                placeholder="e.g. Delhi Airport / Connaught Place"
              />
            </div>
          </div>

          {/* Drop Location */}
          <div>
            <label htmlFor="drop" className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">
              Drop Location
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-orange-500">
                <Navigation className="w-4 h-4" />
              </div>
              <input
                type="text"
                id="drop"
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#0B4A9C] focus:ring-2 focus:ring-[#0B4A9C]/10 transition-all"
                placeholder="e.g. Jaipur / Agra / Shimla"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full mt-4 bg-[#F27A1A] hover:bg-[#d96912] text-white font-bold py-3.5 px-6 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-[0.99] disabled:opacity-75"
        >
          <span>{status === 'submitting' ? 'Getting Fare Quote...' : 'Get Best Price Now'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}

