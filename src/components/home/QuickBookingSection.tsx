"use client";

import { Container } from "../common/Container";
import { BookingForm } from "../booking/BookingForm";
import { Sparkles } from "lucide-react";

export function QuickBookingSection() {
  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-blue-50/40 via-white to-gray-50/80 relative z-20">
      <Container>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-100/80 text-[#0B4A9C] font-semibold text-xs sm:text-sm mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Instant Quote & Reservation
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              Book Your Cab <span className="text-[#0B4A9C]">Online</span>
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-2 max-w-xl mx-auto font-medium">
              Fill out the details below to get instant lowest fare quotes and confirm your ride hassle-free.
            </p>
          </div>

          <BookingForm variant="page" />
        </div>
      </Container>
    </section>
  );
}

