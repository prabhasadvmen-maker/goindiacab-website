import { Metadata } from "next";
import { siteConfig } from "@/src/config/site";
import { Container } from "@/src/components/common/Container";
import { Breadcrumb } from "@/src/components/common/Breadcrumb";
import { BookingForm } from "@/src/components/booking/BookingForm";
import Image from "next/image";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Bus Rental in Delhi | Luxury Bus on Rent",
  description: "Hire 27, 35, 40, 45, 50 Seater Luxury Bus on rent in Delhi for outstation, local trips, corporate events, and weddings.",
  alternates: { canonical: `${siteConfig.url}/bus-rental-in-delhi` }
};

export default function BusRentalPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-gray-light py-12 md:py-16 border-b border-border">
        <Container>
          <Breadcrumb items={[{ label: "Bus Rental in Delhi" }]} />
          <h1 className="text-4xl md:text-5xl font-bold text-dark mt-4">Bus Rental in <span className="text-primary">Delhi</span></h1>
        </Container>
      </div>

      <Container className="py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 space-y-12">
            <div className="relative h-[250px] md:h-[400px] w-full rounded-2xl overflow-hidden shadow-lg border border-border">
              <Image 
                src="https://www.goindiacab.com/wp-content/uploads/2024/12/delhi.jpg.webp" 
                alt="Bus Rental in Delhi" 
                fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                className="object-cover" 
              />
            </div>

            <section>
              <h2 className="text-3xl font-bold text-dark mb-6">Overview</h2>
              <p className="text-gray-text text-lg leading-relaxed">
                Planning a trip with a large group? Go India Cab offers premium luxury bus rental services in Delhi NCR. Whether it&apos;s a corporate event, school picnic, marriage function, or a multi-day outstation tour, we have the perfect bus for your needs.
              </p>
              
              <h3 className="text-2xl font-bold text-dark mt-8 mb-4">Our Fleet Available</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {["27 Seater Luxury Mini Bus", "35 Seater Luxury AC Bus", "40 Seater Volvo Bus", "45 Seater Premium Bus", "50 Seater AC Bus"].map((item, i) => (
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
