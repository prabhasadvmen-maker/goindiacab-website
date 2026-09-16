import { Metadata } from "next";
import { siteConfig } from "@/src/config/site";
import { Container } from "@/src/components/common/Container";
import { Breadcrumb } from "@/src/components/common/Breadcrumb";
import { BookingForm } from "@/src/components/booking/BookingForm";
import Image from "next/image";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "16 Seater Tempo Traveller on Rent in Delhi | GoIndiaCab",
  alternates: { canonical: `${siteConfig.url}/16-seater-tempo-traveller-in-delhi` }
};

export default function Seater16Page() {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-gray-light py-12 md:py-16 border-b border-border">
        <Container>
          <Breadcrumb items={[{ label: "Tempo Traveller", href: "/tempo-traveller-on-rent-in-delhi" }, { label: "16 Seater" }]} />
          <h1 className="text-4xl md:text-5xl font-bold text-dark mt-4">16 Seater Tempo Traveller in <span className="text-primary">Delhi</span></h1>
        </Container>
      </div>

      <Container className="py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 space-y-12">
            <div className="relative h-[250px] md:h-[400px] w-full rounded-2xl overflow-hidden shadow-lg border border-border">
              <Image src="https://www.goindiacab.com/wp-content/uploads/2024/12/delhi.jpg.webp" alt="16 Seater Tempo Traveller" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
            </div>

            <section>
              <h2 className="text-3xl font-bold text-dark mb-6">Overview</h2>
              <p className="text-gray-text text-lg leading-relaxed">Book a 16 Seater Tempo Traveller in Delhi for mid-size group tours, family trips, or corporate travel. Enjoy premium pushback seats, fully air-conditioned interiors, and ample luggage space for a comfortable journey.</p>
              
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                {["16+1 Seating Capacity", "Fully Air Conditioned", "Music System / LCD", "Ample Luggage Space", "Icebox provided", "Professional Driver"].map((item, i) => (
                  <li key={i} className="flex items-center text-dark font-medium">
                    <Check className="w-5 h-5 text-accent mr-3 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <BookingForm variant="sidebar" />
            </div>
          </div>
          
        </div>
      </Container>
    </div>
  );
}
