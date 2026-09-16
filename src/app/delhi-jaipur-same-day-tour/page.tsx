import { Metadata } from "next";
import { siteConfig } from "@/src/config/site";
import { Container } from "@/src/components/common/Container";
import { Breadcrumb } from "@/src/components/common/Breadcrumb";
import { BookingForm } from "@/src/components/booking/BookingForm";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Delhi Jaipur Same Day Tour | GoIndiaCab",
  description: "Book our Delhi to Jaipur same day tour package with a comfortable cab and experienced driver. Explore the Pink City seamlessly.",
  alternates: { canonical: `${siteConfig.url}/delhi-jaipur-same-day-tour` },
};

export default function DelhiJaipurSameDayTour() {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-gray-light py-12 md:py-16 border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: `url('https://www.goindiacab.com/wp-content/uploads/2024/12/delhi.jpg.webp')` }}></div>
        <Container className="relative z-10">
          <Breadcrumb items={[{ label: "Delhi Jaipur Same Day Tour" }]} />
          <h1 className="text-4xl md:text-5xl font-bold text-dark mt-4">
            Delhi Jaipur Same Day Tour
          </h1>
          <p className="text-gray-text mt-4 max-w-2xl text-lg">
            Experience the royal heritage of the Pink City in a single day with our premium taxi package.
          </p>
        </Container>
      </div>

      <Container className="py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-3xl font-bold text-dark">Tour Overview</h2>
            <p className="text-gray-text text-lg leading-relaxed">
              Our Delhi to Jaipur same day tour is perfect for travelers short on time who want to experience the vibrant culture and majestic architecture of Rajasthan's capital. Enjoy a comfortable ride in our AC cabs with experienced drivers who know the best routes and local attractions.
            </p>
            <div className="p-6 bg-gray-50 rounded-2xl border border-border">
              <h3 className="text-xl font-bold mb-4">Highlights</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-text">
                <li>Visit the iconic Amer Fort</li>
                <li>Photo stop at Hawa Mahal (Palace of Winds)</li>
                <li>Explore City Palace and Jantar Mantar</li>
                <li>Comfortable round-trip transportation from Delhi</li>
              </ul>
            </div>
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
