"use client";

import { 
  Gift, 
  ArrowRight, 
  Car, 
  Star, 
  MapPin, 
  Headphones 
} from "lucide-react";
import clsx from "clsx";
import Image from "next/image";
import { siteConfig } from "@/src/config/site";

export function OffersSection() {
  const offers = [
    {
      code: "GOINDIA15",
      badgeBg: "bg-[#00A5D9] text-white",
      cardBg: "bg-gradient-to-br from-[#e0f2fe] via-[#f0f9ff] to-[#ffffff]",
      title: "Flat 15% OFF on Outstation Cabs",
      desc: "Use code GOINDIA15 on first booking. Check terms before applying.",
      img: "/hero_white_sedan.png"
    },
    {
      code: "AIRPORT10",
      badgeBg: "bg-[#f97316] text-white",
      cardBg: "bg-gradient-to-br from-[#ffedd5] via-[#fff7ed] to-[#ffffff]",
      title: "Flat ₹250 OFF on Airport Transfers",
      desc: "Valid for IGI Airport cab bookings. Confirm terms at checkout.",
      img: "/offer_airplane.png"
    },
    {
      code: "ROUNDTRIP",
      badgeBg: "bg-[#10b981] text-white",
      cardBg: "bg-gradient-to-br from-[#dcfce7] via-[#f0fdf4] to-[#ffffff]",
      title: "Save Extra 20% on Round Trips",
      desc: "Book a round-trip outstation cab. Check included km and terms.",
      img: "/offer_scenic_road.png"
    },
    {
      code: "TEMPO2000",
      badgeBg: "bg-[#8b5cf6] text-white",
      cardBg: "bg-gradient-to-br from-[#f3e8ff] via-[#faf5ff] to-[#ffffff]",
      title: "₹500 Discount on Tempo Travellers",
      desc: "Valid on 9 to 26 seater Tempo Traveller rentals. Confirm availability.",
      img: "/hero_white_sedan.png"
    },
  ];

  return (
    <section className="w-full bg-gradient-to-b from-[#f0f6fc] via-[#f8fafc] to-white py-12 border-b border-gray-200/60 relative">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6">
        
        {/* 1. Header Row */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#FF6600] flex items-center justify-center shadow-xs">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 leading-none">
                Offers &amp; Deals
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 font-semibold mt-1">
                Check available offers on your next cab booking. Confirm terms before applying.
              </p>
            </div>
          </div>
        </div>

        {/* 2. 4 Offer Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {offers.map((offer) => (
            <div 
              key={offer.code}
              className={clsx(
                "p-5 rounded-2xl shadow-sm border border-gray-200/80 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between relative overflow-hidden min-h-[160px]",
                offer.cardBg
              )}
            >
              <div>
                <span className={clsx("inline-block text-[10px] font-black px-2.5 py-0.5 rounded uppercase tracking-wider mb-2", offer.badgeBg)}>
                  {offer.code}
                </span>
                
                <h3 className="font-extrabold text-sm text-gray-900 leading-tight mb-1 pr-14">
                  {offer.title}
                </h3>
                
                <p className="text-xs text-gray-600 font-medium leading-snug pr-14">
                  {offer.desc}
                </p>
              </div>

              {/* Offer Image Graphic */}
              <div className="absolute right-2 bottom-3 w-16 h-14 pointer-events-none opacity-90">
                <Image
                  src={offer.img}
                  alt=""
                  fill
                  sizes="64px"
                  className="object-contain"
                />
              </div>

              <div className="mt-4 pt-2 border-t border-gray-200/60 text-xs font-black text-[#0066FF]">
                Apply at checkout
              </div>
            </div>
          ))}
        </div>

        {/* 3. Bottom Trust Badges Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-[#0066FF] flex items-center justify-center flex-shrink-0">
              <Car className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="block font-black text-sm text-gray-900">{siteConfig.stats.drivingCompleted}</span>
              <span className="text-xs text-gray-600 font-semibold">Rides Completed</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0">
              <Star className="w-5 h-5 fill-current" />
            </div>
            <div className="text-left">
              <span className="block font-black text-sm text-gray-900">{siteConfig.googleRating} / 5</span>
              <span className="text-xs text-gray-600 font-semibold">Google Rating ({siteConfig.googleReviewCount})</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="block font-black text-sm text-gray-900">{siteConfig.stats.yearsOfExperience}</span>
              <span className="text-xs text-gray-600 font-semibold">Years Experience</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-sky-100 text-[#00A5D9] flex items-center justify-center flex-shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="block font-black text-sm text-gray-900">24/7</span>
              <span className="text-xs text-gray-600 font-semibold">Booking Support</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
