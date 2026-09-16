"use client";

import { useState } from "react";
import { Breadcrumb } from "@/src/components/common/Breadcrumb";
import { siteConfig } from "@/src/config/site";
import { User, Phone, ArrowRight, ShieldCheck, Lock, CheckCircle2, Car } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const [role, setRole] = useState<"customer" | "driver">("customer");
  const [mobile, setMobile] = useState("");
  const [step, setStep] = useState<"mobile" | "otp">("mobile");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobile.length === 10) {
      setStep("otp");
    } else {
      alert("Please enter a valid 10-digit mobile number!");
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    if (enteredOtp.length === 4) {
      setIsSuccess(true);
    } else {
      alert("Please enter 4-digit OTP (e.g. 1234)");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1380px] mx-auto px-4 py-3">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Login / Sign Up" }
            ]}
          />
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-10">
        <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
          
          {/* Left Hero Graphic */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-8 sm:p-12 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10 space-y-4">
              <Link href="/">
                <Image
                  src={siteConfig.logo}
                  alt={siteConfig.name}
                  width={180}
                  height={50}
                  className="h-10 w-auto bg-white/90 p-1.5 rounded-xl shadow-md"
                />
              </Link>
              <h2 className="text-2xl sm:text-3xl font-black leading-tight pt-4">
                Welcome to <span className="text-[#00A5D9]">GoIndiaCab</span>
              </h2>
              <p className="text-gray-300 text-xs sm:text-sm font-medium leading-relaxed">
                Log in to manage your cab bookings, view digital trip invoices, access exclusive ride discounts, and enjoy 24/7 priority support.
              </p>
            </div>

            <div className="relative z-10 space-y-3 pt-8">
              <div className="flex items-center gap-2.5 text-xs font-bold text-gray-200">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Safe & Secure Passwordless Login</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-bold text-gray-200">
                <Car className="w-4 h-4 text-[#00A5D9]" />
                <span>Pan-India Outstation & Local Rides</span>
              </div>
            </div>

            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#00A5D9]/20 rounded-full blur-2xl"></div>
          </div>

          {/* Right Form Area */}
          <div className="lg:col-span-7 p-6 sm:p-12 flex flex-col justify-center">
            
            {/* Role Switcher */}
            <div className="flex items-center bg-gray-100 p-1 rounded-2xl mb-8 max-w-sm">
              <button
                type="button"
                onClick={() => { setRole("customer"); setStep("mobile"); setIsSuccess(false); }}
                className={`flex-1 py-2.5 text-xs font-black rounded-xl transition-all cursor-pointer ${
                  role === "customer"
                    ? "bg-white text-[#00A5D9] shadow-sm"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                Customer Login
              </button>

              <button
                type="button"
                onClick={() => { setRole("driver"); setStep("mobile"); setIsSuccess(false); }}
                className={`flex-1 py-2.5 text-xs font-black rounded-xl transition-all cursor-pointer ${
                  role === "driver"
                    ? "bg-white text-[#FF6600] shadow-sm"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                Driver Portal
              </button>
            </div>

            {isSuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-gray-900">Successfully Logged In!</h3>
                <p className="text-sm font-bold text-gray-600">
                  Welcome back! You are now logged in to GoIndiaCab {role === "driver" ? "Driver Portal" : "Customer Portal"}.
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center bg-[#00A5D9] hover:bg-[#008db9] text-white font-extrabold px-6 py-3 rounded-xl text-sm transition shadow-md"
                >
                  Go to Homepage
                </Link>
              </div>
            ) : step === "mobile" ? (
              <form onSubmit={handleSendOtp} className="space-y-6">
                <div>
                  <h3 className="text-2xl font-black text-gray-900">
                    {role === "customer" ? "Customer Login / Sign Up" : "Driver Partner Login"}
                  </h3>
                  <p className="text-xs font-bold text-gray-500 mt-1">
                    Enter your registered 10-digit mobile number to receive OTP.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-black text-gray-700 uppercase tracking-wider mb-2">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-gray-500 text-sm">
                      +91
                    </span>
                    <input
                      type="tel"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      placeholder="9876543210"
                      required
                      className="w-full pl-14 pr-4 py-3.5 bg-gray-50 border border-gray-300 rounded-2xl text-base font-black text-gray-900 focus:outline-none focus:border-[#00A5D9] focus:bg-white transition"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#FF6600] hover:bg-[#e65200] text-white font-black text-sm uppercase tracking-wider rounded-2xl shadow-lg shadow-orange-500/20 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Get OTP</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[11px] font-bold text-gray-400 text-center">
                  By logging in, you agree to GoIndiaCab's{" "}
                  <Link href="/terms-conditions" className="text-[#00A5D9] underline">
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy-policy" className="text-[#00A5D9] underline">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-6">
                <div>
                  <h3 className="text-2xl font-black text-gray-900">Enter Verification Code</h3>
                  <p className="text-xs font-bold text-gray-500 mt-1">
                    OTP sent to <span className="text-gray-900 font-black">+91 {mobile}</span>.{" "}
                    <button
                      type="button"
                      onClick={() => setStep("mobile")}
                      className="text-[#00A5D9] underline cursor-pointer"
                    >
                      Edit Number
                    </button>
                  </p>
                </div>

                <div className="flex gap-3 justify-center py-2">
                  {[0, 1, 2, 3].map((idx) => (
                    <input
                      key={idx}
                      id={`otp-${idx}`}
                      type="text"
                      maxLength={1}
                      value={otp[idx]}
                      onChange={(e) => {
                        const val = e.target.value;
                        const newOtp = [...otp];
                        newOtp[idx] = val;
                        setOtp(newOtp);
                        if (val && idx < 3) {
                          const nextInput = document.getElementById(`otp-${idx + 1}`);
                          nextInput?.focus();
                        }
                      }}
                      className="w-14 h-14 text-center text-xl font-black bg-gray-50 border-2 border-gray-300 rounded-2xl text-gray-900 focus:outline-none focus:border-[#00A5D9] focus:bg-white transition"
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#00A5D9] hover:bg-[#008db9] text-white font-black text-sm uppercase tracking-wider rounded-2xl shadow-lg shadow-blue-500/20 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Lock className="w-4 h-4" />
                  <span>Verify OTP & Continue</span>
                </button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => alert("OTP Resent to +91 " + mobile)}
                    className="text-xs font-bold text-[#00A5D9] hover:underline cursor-pointer"
                  >
                    Didn't receive code? Resend OTP
                  </button>
                </div>
              </form>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}
