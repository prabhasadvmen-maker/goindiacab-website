import { Container } from "../common/Container";
import Image from "next/image";
import { Car, CarFront } from "lucide-react";

export function ServicesSection() {
  return (
    <section className="py-12 md:py-24 neo-bg">
      <Container>
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-[#2d3748]">Our Services:</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 items-stretch">
          
          {/* Left Column - Text Boxes */}
          <div className="flex flex-col space-y-8">
            
            {/* Box 1 */}
            <div className="neo-flat p-6 md:p-8 rounded-3xl flex flex-col sm:flex-row items-start transition-all hover:-translate-y-1">
              <div className="w-16 h-16 rounded-2xl neo-pressed flex items-center justify-center shrink-0 mb-5 sm:mb-0 sm:mr-6">
                <Car className="w-7 h-7 text-[#3f51b5]" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 text-[#2d3748]">Car Rental Service</h3>
                <p className="text-[15px] text-[#718096] leading-relaxed">
                  Traveling in North India is everyone's dream. A reliable car rental ensures easy and comfortable travel. <strong className="text-[#4a5568]">Go India Cab</strong> provides safe, reliable, and affordable rides. We have our cars well-maintained, and we have experienced drivers to ensure a smooth journey. Being the Best taxi service in Delhi, we do city tours as well as outstation tours. No matter whether you are looking forward to visiting hills or heritage sites, Go India Cab is here to assist you. Select us for a smooth and comfortable travel experience in North India.
                </p>
              </div>
            </div>

            {/* Box 2 */}
            <div className="neo-flat p-6 md:p-8 rounded-3xl flex flex-col sm:flex-row items-start transition-all hover:-translate-y-1">
              <div className="w-16 h-16 rounded-2xl neo-pressed flex items-center justify-center shrink-0 mb-5 sm:mb-0 sm:mr-6">
                <CarFront className="w-7 h-7 text-[#3f51b5]" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 text-[#2d3748]">Taxi Tour Packages Service</h3>
                <p className="text-[15px] text-[#718096] leading-relaxed">
                  Ready to go on an adventure? Go India Cab has got you covered with our fantastic taxi tour packages in North India! Starting from Delhi, our Best Taxi Service in Delhi NCR will take you to wonderful places like Agra, Jaipur, Shimla, Manali, and Rishikesh. Whether you travel with your family, friends, or all by yourself, our packages suit everyone's needs. Experience friendly drivers, comfortable vehicles, and top-quality service with us. And, we have fantastic prices and convenient booking!. Then why wait? Get in with Go India Cab and discover the beauty of North India today!
                </p>
              </div>
            </div>

          </div>

          {/* Right Column - Promotional Image */}
          <div className="relative w-full h-full min-h-[400px] lg:min-h-full rounded-3xl overflow-hidden neo-flat border-[8px] border-[#e0e5ec]">
            <Image 
              src="/Goindia-services.png.webp" 
              alt="GoIndiaCab Taxi Packages Promotional Banner"
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
