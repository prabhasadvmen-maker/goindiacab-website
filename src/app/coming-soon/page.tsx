"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { siteConfig } from "@/src/config/site";

export default function ComingSoonPage() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date();
    target.setDate(target.getDate() + 30);

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = target.getTime() - now;

      if (diff <= 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#00A5D9]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#FF6600]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Logo */}
      <div className="mb-8 relative z-10">
        <Image
          src={siteConfig.logo}
          alt={siteConfig.name}
          width={200}
          height={55}
          className="h-12 w-auto"
          priority
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-2xl w-full">

        {/* Badge */}
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00A5D9]/15 border border-[#00A5D9]/30 text-[#00A5D9] text-xs font-bold mb-6">
          <Clock className="w-3.5 h-3.5" />
          Something Exciting is Coming
        </span>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 leading-tight">
          Coming <span className="text-[#FF6600]">Soon</span>
        </h1>

        <p className="text-gray-400 text-sm sm:text-base mb-10 max-w-md mx-auto leading-relaxed">
          We're working hard to bring you something amazing. Stay tuned for updates!
        </p>

        {/* Countdown Timer */}
        <div className="grid grid-cols-4 gap-3 sm:gap-4 mb-10">
          {[
            { label: "Days", value: timeLeft.days },
            { label: "Hours", value: timeLeft.hours },
            { label: "Minutes", value: timeLeft.minutes },
            { label: "Seconds", value: timeLeft.seconds },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-3 sm:p-4 backdrop-blur-sm">
              <div className="text-3xl sm:text-4xl font-black text-white tabular-nums">
                {String(value).padStart(2, "0")}
              </div>
              <div className="text-[10px] sm:text-xs text-gray-400 font-semibold mt-1 uppercase tracking-wider">
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="w-16 h-1 bg-[#FF6600] rounded-full mx-auto mb-8" />

        {/* Contact Info */}
        <p className="text-gray-400 text-sm mb-4">Need a cab right now? Contact us:</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
          <a
            href={`tel:${siteConfig.phone.booking1}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00A5D9] text-white font-bold text-sm hover:bg-[#0090c0] transition-all"
          >
            <Phone className="w-4 h-4" />
            {siteConfig.phone.booking1}
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 text-white font-bold text-sm hover:bg-white/20 transition-all border border-white/10"
          >
            <Mail className="w-4 h-4" />
            {siteConfig.email}
          </a>
        </div>

        {/* Back to Home */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm font-medium transition-colors"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
