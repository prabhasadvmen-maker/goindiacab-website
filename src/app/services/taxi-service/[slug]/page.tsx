import Image from "next/image";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/src/config/site";
import { Container } from "@/src/components/common/Container";
import { Breadcrumb } from "@/src/components/common/Breadcrumb";
import { BookingForm } from "@/src/components/booking/BookingForm";
import { Button } from "@/src/components/common/Button";
import { FAQSection } from "@/src/components/faq/FAQSection";
import { taxiServiceLocalities } from "@/src/data/localities";
import { Check, MapPin, ShieldCheck, CarFront } from "lucide-react";

export function generateStaticParams() {
  return taxiServiceLocalities.map((locality) => ({
    slug: locality.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const locality = taxiServiceLocalities.find((l) => l.slug === slug);
  
  if (!locality) {
    return { title: "Not Found" };
  }

  return {
    title: locality.metaTitle,
    description: locality.metaDescription,
    alternates: { canonical: `${siteConfig.url}/taxi-service-in-${locality.slug}` },
  };
}

export default async function TaxiServiceLocalityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const locality = taxiServiceLocalities.find((l) => l.slug === slug);
  
  if (!locality) {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-gray-light py-12 md:py-16 border-b border-border overflow-hidden">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">

          <Breadcrumb items={[{ label: `Taxi Service in ${locality.area}` }]} />
          <h1 className="text-4xl md:text-5xl font-bold text-dark mt-4">
            {locality.title}
          </h1>
          <p className="text-gray-text mt-4 max-w-2xl text-lg">{locality.description}</p>
        
            </div>
            <div className="w-full md:w-1/2 lg:w-2/5 flex justify-end">
              <Image src="/premium-cab.png" alt="Premium Cab Service" width={600} height={400} className="object-cover rounded-xl shadow-2xl hover:scale-105 transition-transform duration-500" priority />
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-3xl font-bold text-dark mb-6">About Our Taxi Service in {locality.area}</h2>
              <p className="text-gray-text text-lg leading-relaxed mb-6">
                Go India Cab offers premium and affordable taxi services in <strong>{locality.area}, {locality.city}</strong>. Whether you need a local drop, an airport transfer, or an outstation trip from {locality.area}, we have a wide range of well-maintained vehicles to cater to your needs.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-gray-50 p-6 rounded-2xl border border-border text-center">
                  <ShieldCheck className="w-10 h-10 text-primary mx-auto mb-3" />
                  <p className="font-bold text-dark">Verified Drivers</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-2xl border border-border text-center">
                  <CarFront className="w-10 h-10 text-primary mx-auto mb-3" />
                  <p className="font-bold text-dark">Clean Cars</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-2xl border border-border text-center">
                  <MapPin className="w-10 h-10 text-primary mx-auto mb-3" />
                  <p className="font-bold text-dark">GPS Tracking</p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-dark mb-4">Services Offered</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {locality.services.map((service, index) => (
                  <li key={index} className="flex items-center text-gray-text">
                    <Check className="w-5 h-5 text-green-500 mr-2" /> {service}
                  </li>
                ))}
              </ul>

              {locality.nearbyAreas && locality.nearbyAreas.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-2xl font-bold text-dark mb-4">Nearby Areas We Serve</h3>
                  <div className="flex flex-wrap gap-2">
                    {locality.nearbyAreas.map((area, idx) => (
                      <span key={idx} className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700 border border-gray-200">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {locality.faqs && locality.faqs.length > 0 && (
              <div className="pt-8 border-t border-border">
                <FAQSection faqs={locality.faqs} title={`FAQs about Taxi Service in ${locality.area}`} />
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <BookingForm variant="sidebar" />
              <div className="mt-6 bg-gray-50 p-6 rounded-2xl border border-border text-center">
                <p className="text-sm text-gray-text mb-2">Need a taxi right now?</p>
                <p className="text-dark font-bold text-xl mb-4">Call our dispatcher</p>
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