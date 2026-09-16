import { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/src/config/site";
import { Container } from "@/src/components/common/Container";
import { Breadcrumb } from "@/src/components/common/Breadcrumb";
import { Button } from "@/src/components/common/Button";
import { BookingForm } from "@/src/components/booking/BookingForm";
import { FAQSection } from "@/src/components/faq/FAQSection";
import { outstationRoutes } from "@/src/data/routes";
import { Check, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function generateStaticParams() {
  return outstationRoutes.map((route) => ({
    slug: route.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const route = outstationRoutes.find((r) => r.slug === slug);
  
  if (!route) {
    return { title: "Route Not Found" };
  }

  const title = `Delhi to ${route.to} Taxi Service | Cab Booking @ ${route.fare.split(" ")[1]}`;

  return {
    title,
    description: route.description,
    alternates: { canonical: `${siteConfig.url}/taxi/${route.slug}` },
    openGraph: {
      title,
      description: route.description,
      images: [{ url: route.image }],
    }
  };
}

export default async function OutstationRoutePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const route = outstationRoutes.find((r) => r.slug === slug);
  
  if (!route) {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-gray-light py-12 md:py-16 border-b border-border">
        <Container>
          <Breadcrumb 
            items={[
              { label: "Outstation Taxi", href: "/taxi" },
              { label: `${route.from} to ${route.to}` }
            ]} 
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mt-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-dark mb-6">
                Taxi Service from <span className="text-primary">{route.from} to {route.to}</span>
              </h1>
              <p className="text-gray-text text-lg leading-relaxed mb-6">
                {route.description}
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white p-4 rounded-xl border border-border flex items-center">
                  <MapPin className="w-8 h-8 text-accent mr-3" />
                  <div>
                    <p className="text-sm text-gray-text">Distance</p>
                    <p className="font-bold text-dark">{route.distance}</p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-border flex items-center">
                  <Clock className="w-8 h-8 text-accent mr-3" />
                  <div>
                    <p className="text-sm text-gray-text">Duration</p>
                    <p className="font-bold text-dark">{route.duration}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-dark text-white px-6 py-3 rounded-xl font-bold text-lg">
                  {route.fare}
                </div>
                <Link href="#book">
                  <Button size="lg">Book Now</Button>
                </Link>
              </div>
            </div>
            
            <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-lg border border-white/20">
              <Image src={route.image} alt={`Taxi from ${route.from} to ${route.to}`} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" priority />
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-3xl font-bold text-dark mb-6">About the Route</h2>
              <p className="text-gray-text text-lg leading-relaxed">
                Traveling from {route.from} to {route.to} is made incredibly convenient with GoIndiaCab&apos;s dedicated outstation taxi services. Whether you are traveling for business, leisure, or a family vacation, we ensure a smooth and comfortable journey.
              </p>
              <p className="text-gray-text text-lg leading-relaxed mt-4">
                Our drivers are highly experienced with highway driving and knowledgeable about the {route.from} - {route.to} route. You can choose from our wide range of fleet including sedans, SUVs, and tempo travellers based on your group size and luggage requirements.
              </p>
            </section>

            <div className="bg-primary/5 p-8 rounded-2xl border border-primary/20">
              <h3 className="text-2xl font-bold text-dark mb-6">Why Choose Us?</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Verified & Professional Drivers",
                  "Well-Maintained AC Vehicles",
                  "Transparent Billing (No Hidden Charges)",
                  "24/7 Customer Support",
                  "On-Time Pickup & Drop",
                  "Flexible One-Way & Round Trips"
                ].map((item, i) => (
                  <li key={i} className="flex items-start text-dark font-medium">
                    <Check className="w-5 h-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {route.faqs && route.faqs.length > 0 && (
              <div className="pt-8 border-t border-border">
                <FAQSection faqs={route.faqs} title="Frequently Asked Questions" subtitle={`Common queries about traveling from ${route.from} to ${route.to}.`} />
              </div>
            )}
          </div>

          <div className="lg:col-span-1" id="book">
            <div className="sticky top-28">
              <BookingForm variant="sidebar" />
              <div className="mt-6 bg-gray-50 p-6 rounded-2xl border border-border text-center">
                <p className="text-sm text-gray-text mb-2">Prefer booking over call?</p>
                <p className="text-dark font-bold text-xl mb-4">Call our experts</p>
                <a href={`tel:${siteConfig.phone.booking1}`}>
                  <Button className="w-full text-lg">{siteConfig.phone.booking1}</Button>
                </a>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </div>
  );
}