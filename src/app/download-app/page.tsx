"use client";

import { useState } from "react";
import { Breadcrumb } from "@/src/components/common/Breadcrumb";
import { siteConfig } from "@/src/config/site";
import { Smartphone, CheckCircle2, Star, ShieldCheck, Download, Apple, QrCode, Send } from "lucide-react";
import Image from "next/image";

export default function DownloadAppPage() {
  const [mobileNum, setMobileNum] = useState("");
  const [sent, setSent] = useState(false);

  const handleSendLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileNum) {
      setSent(true);
      setTimeout(() => setSent(false), 4000);
      setMobileNum("");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1380px] mx-auto px-4 py-3">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Download App" }
            ]}
          />
        </div>
      </div>

      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 pt-8">
        
        {/* Main Banner Hero */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-6 sm:p-12 text-white shadow-2xl relative overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-2 bg-[#00A5D9]/20 border border-[#00A5D9]/40 text-[#38bdf8] text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-full">
                <Smartphone className="w-4 h-4" />
                GoIndiaCab Mobile App
              </span>
              
              <h1 className="text-3xl sm:text-5xl font-black leading-tight text-white">
                Book Cabs Faster & Travel Hassle-Free with <span className="text-[#00A5D9]">GoIndiaCab</span>
              </h1>

              <p className="text-gray-300 text-sm sm:text-base font-medium leading-relaxed max-w-xl">
                Get exclusive app-only discounts, real-time driver tracking, instant invoice downloads, and 24/7 dedicated customer support right at your fingertips.
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-4 pt-2">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/15">
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                  <div>
                    <div className="text-xs font-bold text-white">4.8 / 5 Rating</div>
                    <div className="text-[10px] text-gray-300">50K+ Active Users</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/15">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <div>
                    <div className="text-xs font-bold text-white">100% Safe Rides</div>
                    <div className="text-[10px] text-gray-300">Verified Drivers</div>
                  </div>
                </div>
              </div>

              {/* App Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); alert("Redirecting to Google Play Store..."); }}
                  className="bg-white text-gray-900 font-extrabold px-6 py-3.5 rounded-2xl flex items-center gap-3 hover:bg-gray-100 transition shadow-lg cursor-pointer"
                >
                  <Download className="w-6 h-6 text-[#00A5D9]" />
                  <div className="text-left">
                    <div className="text-[10px] uppercase font-bold text-gray-500 leading-none">GET IT ON</div>
                    <div className="text-sm font-black leading-tight">Google Play</div>
                  </div>
                </a>

                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); alert("Redirecting to Apple App Store..."); }}
                  className="bg-white/10 border border-white/20 text-white font-extrabold px-6 py-3.5 rounded-2xl flex items-center gap-3 hover:bg-white/20 transition shadow-lg cursor-pointer"
                >
                  <Apple className="w-6 h-6 text-white" />
                  <div className="text-left">
                    <div className="text-[10px] uppercase font-bold text-gray-300 leading-none">DOWNLOAD ON THE</div>
                    <div className="text-sm font-black leading-tight">App Store</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Right: App Preview Mockup / QR Code */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/20 text-center max-w-sm w-full shadow-2xl">
                <div className="w-16 h-16 bg-[#00A5D9] text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <QrCode className="w-9 h-9" />
                </div>
                <h3 className="text-xl font-black text-white mb-1">Scan to Install</h3>
                <p className="text-xs text-gray-300 mb-4">Point your camera at the QR code to install GoIndiaCab instantly.</p>
                
                <div className="bg-white p-4 rounded-2xl inline-block shadow-inner mb-4">
                  <Image
                    src="/Goindia-services.png.webp"
                    alt="GoIndiaCab App QR"
                    width={160}
                    height={160}
                    className="w-40 h-40 object-contain mx-auto"
                  />
                </div>

                {/* SMS Link Input */}
                <form onSubmit={handleSendLink} className="space-y-2">
                  <p className="text-xs font-bold text-gray-200">Or get app link via SMS:</p>
                  <div className="flex gap-2">
                    <input
                      type="tel"
                      value={mobileNum}
                      onChange={(e) => setMobileNum(e.target.value)}
                      placeholder="Enter 10-digit mobile"
                      required
                      className="w-full px-3 py-2 text-xs font-bold text-gray-900 bg-white rounded-xl focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="bg-[#FF6600] hover:bg-[#e65200] text-white px-3 py-2 rounded-xl text-xs font-black flex items-center gap-1 flex-shrink-0 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Send
                    </button>
                  </div>
                  {sent && (
                    <p className="text-xs font-bold text-emerald-400 mt-1">
                      ✅ App link sent successfully!
                    </p>
                  )}
                </form>
              </div>
            </div>

          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#00A5D9] flex items-center justify-center font-black">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-gray-900">Instant Cab Booking</h3>
            <p className="text-xs text-gray-600 font-medium leading-relaxed">
              Book One-Way, Round-Trip, Airport Transfers & Hourly Rentals in just 3 easy steps.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#FF6600] flex items-center justify-center font-black">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-gray-900">Live GPS Driver Tracking</h3>
            <p className="text-xs text-gray-600 font-medium leading-relaxed">
              Track driver status, ETA, route navigation and share your trip details live with your family.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black">
              <Star className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-gray-900">Exclusive App Discounts</h3>
            <p className="text-xs text-gray-600 font-medium leading-relaxed">
              Enjoy FLAT ₹500 OFF on your first outstation ride when you book through our mobile app.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
