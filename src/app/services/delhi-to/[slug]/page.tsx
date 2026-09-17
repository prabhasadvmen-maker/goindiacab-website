import { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/src/config/site";
import { Container } from "@/src/components/common/Container";
import { Breadcrumb } from "@/src/components/common/Breadcrumb";
import { BookingForm } from "@/src/components/booking/BookingForm";
import { Button } from "@/src/components/common/Button";
import { JsonLd } from "@/src/components/seo/JsonLd";
import { delhiRoutes } from "@/src/data/delhiRoutes";
import { CheckCircle, MapPin, Clock, CreditCard } from "lucide-react";
import Image from "next/image";

export function generateStaticParams() {
  return delhiRoutes.map((route) => ({
    slug: route.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const route = delhiRoutes.find((r) => r.slug === slug);
  
  if (!route) {
    return { title: "Route Not Found" };
  }

  return {
    title: route.title,
    description: route.description,
    alternates: { canonical: `${siteConfig.url}/delhi-to-${route.slug}` },
  };
}

export default async function DelhiToCityRoutePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const route = delhiRoutes.find((r) => r.slug === slug);
  
  if (!route) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "name": route.title,
    "description": route.description,
    "itinerary": {
      "@type": "ItemList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "item": { "@type": "City", "name": route.from } },
        { "@type": "ListItem", "position": 2, "item": { "@type": "City", "name": route.to } }
      ]
    },
    "provider": {
      "@type": "LocalBusiness",
      "name": "GoIndiaCab",
      "telephone": siteConfig.phone.booking1,
      "url": siteConfig.url
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <JsonLd data={jsonLd} />
      <div className="bg-gray-light py-12 md:py-16 border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: `url('${route.image}')` }}></div>
        <Container className="relative z-10">
          <Breadcrumb items={[{ label: route.title }]} />
          <h1 className="text-4xl md:text-5xl font-bold text-dark mt-4">
            {route.title}
          </h1>
          <p className="text-gray-text mt-4 max-w-2xl text-lg">{route.description}</p>
        </Container>
      </div>

      <Container className="py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-3xl font-bold text-dark mb-6">Route Overview</h2>
              <div className="bg-gray-50 p-6 rounded-2xl border border-border grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-8 h-8 text-primary" />
                  <div>
                    <p className="text-sm text-gray-500">Distance</p>
                    <p className="font-bold text-dark text-lg">{route.distance}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-8 h-8 text-primary" />
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-bold text-dark text-lg">{route.duration}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <CreditCard className="w-8 h-8 text-primary" />
                  <div>
                    <p className="text-sm text-gray-500">Starting Fare</p>
                    <p className="font-bold text-dark text-lg">{route.fare}</p>
                  </div>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-dark mb-4">Why Book {route.title} with Us?</h3>
              <ul className="space-y-3">
                <li className="flex items-start"><CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" /><span className="text-gray-text text-lg">Well-maintained, sanitized fleet of Sedans, SUVs, and Tempo Travellers.</span></li>
                <li className="flex items-start"><CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" /><span className="text-gray-text text-lg">Experienced drivers familiar with the {route.from} to {route.to} highway.</span></li>
                <li className="flex items-start"><CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" /><span className="text-gray-text text-lg">Transparent pricing with no hidden charges.</span></li>
                <li className="flex items-start"><CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" /><span className="text-gray-text text-lg">24/7 customer support and easy online booking.</span></li>
              </ul>
            </section>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <BookingForm variant="sidebar" />
              <div className="mt-6 bg-gray-50 p-6 rounded-2xl border border-border text-center">
                <p className="text-sm text-gray-text mb-2">Prefer booking over a call?</p>
                <p className="text-dark font-bold text-xl mb-4">Call our expert</p>
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
