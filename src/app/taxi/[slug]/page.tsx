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
import { CabSearchWidget } from "@/src/components/home/CabSearchWidget";

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

  const title = route.metaTitle ?? `Delhi to ${route.to} Taxi Service | Cab Booking – Go India Cab`;
  const description = route.metaDescription ?? route.description;
  const canonical = `${siteConfig.url}/taxi/${route.slug}/`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      images: [{ url: route.image }],
    },
  };
}

export default async function OutstationRoutePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const route = outstationRoutes.find((r) => r.slug === slug);

  if (!route) {
    notFound();
  }

  const h1 = route.h1 ?? `Taxi Service from ${route.from} to ${route.to}`;
  const breadcrumbLabel = route.breadcrumb ?? `${route.from} to ${route.to}`;

  return (
    <div className="bg-white min-h-screen">
      <CabSearchWidget />

      {/* Hero */}
      <div className="bg-gray-light py-12 md:py-16 border-b border-border">
        <Container>
          <Breadcrumb
            items={[
              { label: "Outstation Taxi", href: "/taxi" },
              { label: breadcrumbLabel },
            ]}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mt-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-dark mb-6">{h1}</h1>
              <p className="text-gray-text text-lg leading-relaxed mb-6">{route.description}</p>

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
              <Image
                src={route.image}
                alt={h1}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          <div className="lg:col-span-2 space-y-12">

            {route.contentSections ? (
              <div className="space-y-12">
                {route.contentSections.map((section, index) => (
                  <section key={index} className="scroll-mt-20">
                    <h2 className="text-3xl font-bold text-dark mb-6">{section.title}</h2>

                    {section.content && (
                      <div className="prose prose-lg max-w-none text-gray-text leading-relaxed">
                        {section.content.split("\n").map((paragraph, pIndex) => (
                          <p key={pIndex} className="mb-4">{paragraph}</p>
                        ))}
                      </div>
                    )}

                    {section.subsections && section.subsections.length > 0 && (
                      <div className="mt-8 space-y-6">
                        {section.subsections.map((subsection, subIndex) => (
                          <div key={subIndex} className="bg-gray-50 p-6 rounded-xl border border-border">
                            <h3 className="text-2xl font-bold text-dark mb-4">{subsection.title}</h3>
                            {subsection.content && (
                              <div className="prose prose-lg max-w-none text-gray-text leading-relaxed">
                                {subsection.content.split("\n").map((paragraph, pIndex) => (
                                  <p key={pIndex} className="mb-3">{paragraph}</p>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </section>
                ))}
              </div>
            ) : (
              <>
                <section>
                  <h2 className="text-3xl font-bold text-dark mb-6">About the Route</h2>
                  <p className="text-gray-text text-lg leading-relaxed">
                    Travelling from {route.from} to {route.to} is made convenient with Go India Cab's outstation taxi service. Whether you are travelling for business, leisure or a family holiday, share your itinerary and passenger details to request a suitable vehicle and fare quote.
                  </p>
                  <p className="text-gray-text text-lg leading-relaxed mt-4">
                    Choose from sedans, SUVs and Tempo Travellers based on your group size and luggage. Confirm the vehicle model, seating capacity and fare inclusions before booking.
                  </p>
                </section>

                <div className="bg-primary/5 p-8 rounded-2xl border border-primary/20">
                  <h3 className="text-2xl font-bold text-dark mb-6">Why Choose Go India Cab?</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      "One-Way & Round-Trip Options",
                      "Sedan, SUV & Tempo Traveller Fleet",
                      "Fare Details Shared Before Booking",
                      "Booking Assistance for Multi-Stop Trips",
                      "Contact Support via Published Channels",
                      "Vehicle & Driver Details on Confirmation",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start text-dark font-medium">
                        <Check className="w-5 h-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {route.faqs && route.faqs.length > 0 && (
              <div className="pt-8 border-t border-border">
                <FAQSection
                  faqs={route.faqs}
                  title="Frequently Asked Questions"
                  subtitle={`Common queries about travelling from ${route.from} to ${route.to}.`}
                />
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
                <a href={`tel:${siteConfig.phone.booking2}`} className="block mt-3">
                  <Button className="w-full text-lg" variant="outline">{siteConfig.phone.booking2}</Button>
                </a>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </div>
  );
}
