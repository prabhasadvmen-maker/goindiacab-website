"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const images = [
  "/Hero_section_iamge/goindiacab_hero_section_1.png",
  "/Hero_section_iamge/goindiacab_hero_section_2.png",
  "/Hero_section_iamge/goindiacab_hero_section_3.png",
  "/Hero_section_iamge/goindiacab_hero_section_4.png",
  "/Hero_section_iamge/goindiacab_hero_section_5.png",
  "/Hero_section_iamge/goindiacab_hero_section_6.png",
  "/Hero_section_iamge/goindiacab_hero_section_7.png",
];

export function HeroBackground() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 z-0 bg-[#0f172a]">
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
      {/* Clean dark overlay — no blur, just gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/20" />
    </div>
  );
}
