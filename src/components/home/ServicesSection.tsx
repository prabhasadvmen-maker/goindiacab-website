import { Container } from "../common/Container";
import Image from "next/image";
import Link from "next/link";
import { Car, CarFront } from "lucide-react";

export function ServicesSection() {
  return (
    <section className="py-12 md:py-24 neo-bg">
      <Container>
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-[#2d3748]">Cab Services for Different Travel Needs</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 items-stretch">
          
          {/* Left Column - Text Boxes */}
          <div className="flex flex-col space-y-8">
            
            {/* Box 1 */}
            <div className="neo-flat p-6 md:p-8 rounded-3xl flex flex-col sm:flex-row items-start transition-all hover:-translate-y-1">
              <div className="w-16 h-16 rounded-2xl neo-pressed flex items-center justify-center shrink-0 mb-5 sm:mb-0 sm:mr-6">
                <Car className="w-7 h-7 text-[#3f51b5]" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 text-[#2d3748]">Outstation Cab Service</h3>
                <p className="text-[15px] text-[#718096] leading-relaxed">
                  Travel between cities for holidays, family visits, business trips and pilgrimage journeys. <strong className="text-[#4a5568]">Go India Cab</strong> helps you request a one-way drop or a round-trip cab from Delhi to destinations across North India. Share your route, travel date and passenger details to check available vehicles and review the fare before confirming.
                </p>
              </div>
            </div>

            {/* Box 2 */}
            <div className="neo-flat p-6 md:p-8 rounded-3xl flex flex-col sm:flex-row items-start transition-all hover:-translate-y-1">
              <div className="w-16 h-16 rounded-2xl neo-pressed flex items-center justify-center shrink-0 mb-5 sm:mb-0 sm:mr-6">
                <CarFront className="w-7 h-7 text-[#3f51b5]" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 text-[#2d3748]">Local Cab &amp; Taxi Tour Packages</h3>
                <p className="text-[15px] text-[#718096] leading-relaxed">
                  Need a cab for meetings, shopping, hospital visits or sightseeing within the city? Go India Cab offers local hourly rentals and taxi tour packages covering popular destinations like Agra, Jaipur, Shimla, Manali and Rishikesh. Confirm package duration, kilometre limits and extra-hour charges before booking.{" "}
                  <Link href="/tempo-traveller-on-rent-in-delhi" className="text-[#3f51b5] font-semibold underline underline-offset-2 hover:text-[#2d3748]">
                    Tempo Traveller on Rent in Delhi
                  </Link>{" "}is also available for group travel.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column - Promotional Image */}
          <div className="relative w-full h-full min-h-[400px] lg:min-h-full rounded-3xl overflow-hidden neo-flat border-[8px] border-[#e0e5ec]">
            <Image 
              src="/Goindia-services.png.webp" 
              alt="Go India Cab outstation and local cab services across India"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>

        </div>
      </Container>
    </section>
  );
}
