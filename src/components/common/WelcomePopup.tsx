"use client";

import { useState, useEffect } from "react";
import { X, Phone } from "lucide-react";
import { siteConfig } from "@/src/config/site";

export function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if the popup has been shown in this session to avoid spamming
    const hasShownPopup = sessionStorage.getItem("hasShownWelcomePopup");
    
    if (!hasShownPopup) {
      // Show the popup after 1.5 seconds
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem("hasShownWelcomePopup", "true");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Modal */}
      <div className="relative bg-[#d7edf7] w-full max-w-[720px] rounded-[1.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.3)] p-8 sm:p-10 md:py-12 md:px-14 overflow-visible transform transition-all animate-in fade-in zoom-in duration-300">
        
        {/* Close Button overlapping edge */}
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-8 h-8 sm:w-10 sm:h-10 bg-[#c2a265] hover:bg-[#b09054] text-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 z-10 cursor-pointer"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
        </button>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-0">
          
          {/* Left Text Content */}
          <div className="flex-1 space-y-1 text-center md:text-left relative">
            <h3 className="text-[#c2a265] font-bold text-sm sm:text-base uppercase tracking-[0.1em] mb-3">
              SAY HELLO TO,
            </h3>
            <h2 className="text-[2.2rem] sm:text-4xl md:text-[2.8rem] font-bold text-[#1a1b1d] leading-[1.2] tracking-tight">
              YOUR <span className="text-[#c2a265]">24×7</span><br />
              TRAVEL EXPERT
            </h2>
            <p className="text-[#4b4e53] font-semibold text-sm sm:text-base pt-3">
              Get expert advice for smarter travel plans!
            </p>
          </div>

          {/* Right Button Content */}
          <div className="flex flex-col items-center justify-center shrink-0">
            <a 
              href={`tel:${siteConfig.phone.booking1}`}
              className="bg-white rounded-[2rem] py-4 px-6 sm:px-8 flex items-center justify-center gap-3 shadow-[0_12px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.2)] transition-shadow cursor-pointer w-full"
            >
              <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-[#1a1b1d] fill-[#1a1b1d]" />
              <span className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1a1b1d] tracking-tight whitespace-nowrap">
                {siteConfig.phone.booking1.replace('+91-', '').replace(/-/g, ' ')}
              </span>
            </a>
            <span className="text-[#c2a265] font-bold text-xs sm:text-sm tracking-[0.1em] uppercase mt-4">
              TALK TO US
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
