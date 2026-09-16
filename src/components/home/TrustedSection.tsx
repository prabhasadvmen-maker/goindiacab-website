"use client";

import { useState } from "react";
import { Container } from "../common/Container";
import Link from "next/link";
import clsx from "clsx";
import { cabServiceLocalities, taxiServiceLocalities } from '@/src/data/localities';
import { Car } from "lucide-react";

export function TrustedSection() {
  const [activeTab, setActiveTab] = useState(0);

  const allLocalities = [...cabServiceLocalities, ...taxiServiceLocalities];

  // Helper to get a locality by slug
  const getLocality = (slug: string) => {
    const loc = allLocalities.find(l => l.slug === slug);
    return { 
      name: loc ? loc.area : slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), 
      slug 
    };
  };

  const tabs = [
    {
      name: "Central & North Delhi",
      color: "bg-[#3f51b5]",
      areas: [
        "connaught-place", "chandni-chowk", "karol-bagh", "paharganj",
        "sadar-bazaar", "daryaganj", "civil-lines", "model-town",
        "ashok-vihar", "shalimar-bagh", "rohini", "pitampura"
      ].map(getLocality)
    },
    {
      name: "South Delhi",
      color: "bg-[#5bc0de]",
      areas: [
        "green-park", "saket", "greater-kailash", "defence-colony",
        "lajpat-nagar", "south-extension", "hauz-khas", "vasant-kunj",
        "malviya-nagar", "safdarjung-enclave", "sarojini-nagar", "anand-niketan",
        "nehru-place", "okhla", "kalkaji", "chhatarpur",
        "mehrauli", "nizamuddin", "friends-colony", "shanti-niketan"
      ].map(getLocality)
    },
    {
      name: "West Delhi & Other Areas",
      color: "bg-[#5bc0de]",
      areas: [
        "punjabi-bagh", "rajouri-garden", "tilak-nagar", "patel-nagar",
        "janakpuri", "vikaspuri", "paschim-vihar", "uttam-nagar",
        "dwarka-sector-12", "dwarka-sector-21", "aerocity", "moti-bagh",
        "chanakyapuri", "okhla", "kalkaji", "chhatarpur",
        "mehrauli", "maharani-bagh", "panchsheel-enclave"
      ].map(getLocality)
    }
  ];

  return (
    <section className="py-16 neo-bg">
      <Container>
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-[28px] font-extrabold text-[#2d3748]">
            Trusted & Reliable Cab Service Across Delhi
          </h2>
          <div className="w-24 h-1 bg-[#3f51b5] opacity-50 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex flex-wrap sm:flex-nowrap neo-pressed p-2 rounded-2xl">
            {tabs.map((tab, index) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(index)}
                className={clsx(
                  "px-6 py-3 font-bold text-sm md:text-base transition-all whitespace-nowrap rounded-xl m-1",
                  activeTab === index 
                    ? "neo-flat text-[#3f51b5]" 
                    : "text-[#718096] hover:text-[#4a5568]"
                )}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {tabs[activeTab].areas.map((area, idx) => (
            <Link 
              key={`${area.slug}-${idx}`} 
              href={`/cab-service-in-${area.slug}`}
              className="flex items-center px-4 py-4 rounded-3xl neo-flat group transition-all duration-300 hover:-translate-y-1 border-4 border-[#e0e5ec]"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center neo-pressed mr-4">
                <Car className="w-6 h-6 text-[#3f51b5]" />
              </div>
              <span className="text-[13px] md:text-[14px] font-extrabold text-[#4a5568] leading-snug group-hover:text-[#3f51b5] transition-colors">
                Cab Service in<br/>{area.name}
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}


