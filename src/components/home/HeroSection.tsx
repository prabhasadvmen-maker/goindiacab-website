"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { siteConfig } from "@/src/config/site";
import { Phone } from "lucide-react";
import Link from "next/link";

const images = [
  "/Hero_section_iamge/goindiacab_hero_section_1.png",
  "/Hero_section_iamge/goindiacab_hero_section_2.png",
  "/Hero_section_iamge/goindiacab_hero_section_3.png",
];

export function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[480px] sm:h-[560px] md:h-[620px] lg:h-[680px] overflow-hidden">
      {images.map((src, i) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={src}
            alt={`GoIndiaCab Hero ${i + 1}`}
            fill
            className="object-cover object-center"
            priority={i === 0}
            sizes="100vw"
            quality={90}
          />
        </div>
      ))}

      {/* Left-focused gradient overlay for crisp text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />

      {/* Content Container (Left Aligned) */}
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-[1400px] w-full mx-auto px-6 sm:px-10 lg:px-12">
          <div className="max-w-2xl text-left text-white flex flex-col items-start">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-[#f9c004] border border-white/20 font-semibold text-xs sm:text-sm mb-2 sm:mb-3 backdrop-blur-sm">
              #1 Taxi Service in India
            </span>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-2 sm:mb-3 drop-shadow-md">
              Book Cab & Taxi Services <span className="text-[#f9c004]">Across India</span>
            </h1>
            
            <p className="text-xs sm:text-sm md:text-base text-gray-200 mb-4 sm:mb-6 max-w-xl leading-relaxed">
              Reliable one-way, round-trip, local and airport taxi services. Safe, comfortable, and affordable.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-start w-full sm:w-auto">
              <Link href="/paynow">
                <button className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold bg-[#f9c004] text-[#1e293b] hover:bg-[#eab308] transition-all text-xs sm:text-sm md:text-base shadow-md cursor-pointer">
                  Book a Cab
                </button>
              </Link>
              <a href={`tel:${siteConfig.phone.booking1}`}>
                <button className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold bg-white/15 text-white border border-white/30 hover:bg-white/25 transition-all text-xs sm:text-sm md:text-base flex items-center justify-center gap-2 backdrop-blur-sm cursor-pointer">
                  <Phone className="w-4 h-4 text-[#f9c004]" />
                  <span>Call Now: {siteConfig.phone.booking1}</span>
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? "bg-[#f9c004] w-6" : "bg-white/50 w-2"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

