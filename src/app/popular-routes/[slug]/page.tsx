import { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/src/config/site";
import { Container } from "@/src/components/common/Container";
import { Breadcrumb } from "@/src/components/common/Breadcrumb";
import { Button } from "@/src/components/common/Button";
import { BookingForm } from "@/src/components/booking/BookingForm";
import { FAQSection } from "@/src/components/faq/FAQSection";
import { popularRoutes } from "@/src/data/routes";
import { Check, Clock, MapPin, Car } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CabSearchWidget } from "@/src/components/home/CabSearchWidget";

export function generateStaticParams() {
  return popularRoutes.map((route) => ({
    slug: route.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const route = popularRoutes.find((r) => r.slug === slug);

  if (!route) {
    return { title: "Route Not Found" };
  }

  const title = route.metaTitle ?? `Cab Service in ${route.to} from ${route.from} | Best Taxi @ ${route.fare.split(" ")[1]}`;
  const description = route.metaDescription ?? route.description;
  const canonical = `${siteConfig.url}/popular-routes/${route.slug}/`;

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

export default async function PopularRouteDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const route = popularRoutes.find((r) => r.slug === slug);

  if (!route) {
    notFound();
  }

  const h1 = route.h1 ?? `Cab Service in ${route.to}`;
  const breadcrumbLabel = route.breadcrumb ?? `Cab Service in ${route.to}`;

  return (
    <div className="bg-white min-h-screen">
      <CabSearchWidget />

      {/* Hero Section */}
      <div className="bg-gray-light py-12 md:py-16 border-b border-border">
        <Container>
          <Breadcrumb
            items={[
              { label: "Popular Routes", href: "/popular-routes" },
              { label: breadcrumbLabel },
            ]}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mt-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-dark mb-6">
                {h1}
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
                          <p key={pIndex} className="mb-4">
                            {paragraph}
                          </p>
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
                                  <p key={pIndex} className="mb-3">
                                    {paragraph}
                                  </p>
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
                  <h2 className="text-3xl font-bold text-dark mb-6">Route Details</h2>
                  <p className="text-gray-text text-lg leading-relaxed">
                    Booking a cab from {route.from} to {route.to} has never been easier. Go India Cab provides reliable taxi services for this popular route. Our experienced drivers ensure you reach your destination safely and on time.
                  </p>
                </section>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {[
                    { name: "Sedan", desc: "Dzire / Etios", price: "₹11/km" },
                    { name: "SUV", desc: "Ertiga / Carens", price: "₹16/km" },
                    { name: "Premium SUV", desc: "Innova Crysta", price: "₹20/km" },
                  ].map((car, i) => (
                    <div key={i} className="border border-border p-6 rounded-2xl text-center bg-white shadow-sm hover:shadow-md transition-shadow">
                      <Car className="w-12 h-12 text-primary mx-auto mb-4" />
                      <h4 className="font-bold text-dark text-lg">{car.name}</h4>
                      <p className="text-sm text-gray-text mb-3">{car.desc}</p>
                      <p className="font-bold text-accent">{car.price}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-primary/5 p-8 rounded-2xl border border-primary/20">
                  <h3 className="text-2xl font-bold text-dark mb-6">Why Choose Go India Cab?</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      "Verified & Professional Drivers",
                      "Well-Maintained AC Vehicles",
                      "Transparent Billing",
                      "24/7 Customer Support",
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
                  subtitle={`Common queries about travelling to ${route.to}.`}
                />
              </div>
            )}

            {slug === "cab-service-in-agra" && (
              <div className="pt-8 border-t border-border">
                <h2 className="text-3xl font-bold text-dark mb-6">Related Services & Routes</h2>
                <ul className="space-y-3 text-gray-text">
                  <li>
                    <Link href="/delhi-to-agra-cab-service" className="text-primary hover:underline font-medium">
                      Delhi to Agra cab service
                    </Link>{" "}– travelling from Delhi? See the dedicated route page for one-way and round-trip fares.
                  </li>
                  <li>
                    <Link href="/taxi/uttar-pradesh-taxi-service-from-delhi" className="text-primary hover:underline font-medium">
                      Outstation cab service from Agra
                    </Link>{" "}– explore Uttar Pradesh destinations including Mathura, Vrindavan and Varanasi.
                  </li>
                  <li>
                    <Link href="/taxi/rajasthan-taxi-service-from-delhi" className="text-primary hover:underline font-medium">
                      Agra to Jaipur cab
                    </Link>{" "}– plan a Golden Triangle journey onward to Rajasthan.
                  </li>
                  <li>
                    <Link href="/popular-routes" className="text-primary hover:underline font-medium">
                      All popular routes
                    </Link>{" "}– browse other destinations covered by Go India Cab.
                  </li>
                  <li>
                    <Link href="/contact" className="text-primary hover:underline font-medium">
                      Contact Go India Cab
                    </Link>{" "}– get in touch for a custom quote or booking assistance.
                  </li>
                </ul>
              </div>
            )}

            {slug === "cab-service-in-varanasi" && (
              <div className="pt-8 border-t border-border">
                <h2 className="text-3xl font-bold text-dark mb-6">Related Services & Routes</h2>
                <ul className="space-y-3 text-gray-text">
                  <li>
                    <Link href="/cab-service-in-varanasi" className="text-primary hover:underline font-medium">
                      Local Cab Service in Varanasi
                    </Link>{" "}– already in Varanasi? Book a local taxi for Kashi Vishwanath darshan, ghat visits, Sarnath trips, airport transfers and railway station pickups.
                  </li>
                  <li>
                    <Link href="/taxi/uttar-pradesh-taxi-service-from-delhi" className="text-primary hover:underline font-medium">
                      Delhi to Uttar Pradesh Taxi Service
                    </Link>{" "}– explore other UP destinations from Delhi including Agra, Mathura, Vrindavan and Ayodhya.
                  </li>
                  <li>
                    <Link href="/popular-routes/cab-service-in-ayodhya" className="text-primary hover:underline font-medium">
                      Cab Service in Ayodhya
                    </Link>{" "}– plan a pilgrimage journey to Ayodhya before or after your Varanasi visit.
                  </li>
                  <li>
                    <Link href="/popular-routes/cab-service-in-agra" className="text-primary hover:underline font-medium">
                      Cab Service in Agra
                    </Link>{" "}– add Agra and the Taj Mahal to your Uttar Pradesh itinerary.
                  </li>
                  <li>
                    <Link href="/popular-routes" className="text-primary hover:underline font-medium">
                      All popular routes
                    </Link>{" "}– browse other destinations covered by Go India Cab.
                  </li>
                  <li>
                    <Link href="/contact-us" className="text-primary hover:underline font-medium">
                      Book a Delhi to Varanasi Cab / Contact Go India Cab
                    </Link>{" "}– get in touch for a custom quote or booking assistance.
                  </li>
                </ul>
              </div>
            )}

            {slug === "cab-service-in-jaipur" && (
              <div className="pt-8 border-t border-border">
                <h2 className="text-3xl font-bold text-dark mb-6">Related Services & Routes</h2>
                <ul className="space-y-3 text-gray-text">
                  <li>
                    <Link href="/taxi/rajasthan-taxi-service-from-delhi" className="text-primary hover:underline font-medium">
                      Delhi to Rajasthan Taxi Service
                    </Link>{" "}– travelling from Delhi to Jaipur or other Rajasthan destinations? See the dedicated state route page for one-way and round-trip fares.
                  </li>
                  <li>
                    <Link href="/popular-routes/cab-service-in-agra" className="text-primary hover:underline font-medium">
                      Cab Service in Agra
                    </Link>{" "}– plan a Golden Triangle journey from Jaipur to Agra for Taj Mahal sightseeing.
                  </li>
                  <li>
                    <Link href="/popular-routes/cab-service-in-ayodhya" className="text-primary hover:underline font-medium">
                      Cab Service in Ayodhya
                    </Link>{" "}– explore other popular pilgrimage and heritage destinations covered by Go India Cab.
                  </li>
                  <li>
                    <Link href="/popular-routes/cab-service-in-chandigarh" className="text-primary hover:underline font-medium">
                      Cab Service in Chandigarh
                    </Link>{" "}– browse intercity cab options for other major cities.
                  </li>
                  <li>
                    <Link href="/popular-routes" className="text-primary hover:underline font-medium">
                      All popular routes
                    </Link>{" "}– browse other destinations covered by Go India Cab.
                  </li>
                  <li>
                    <Link href="/contact-us" className="text-primary hover:underline font-medium">
                      Book a Jaipur Cab / Contact Go India Cab
                    </Link>{" "}– get in touch for a custom quote or booking assistance.
                  </li>
                </ul>
              </div>
            )}

            {slug === "cab-service-in-dehradun" && (
              <div className="pt-8 border-t border-border">
                <h2 className="text-3xl font-bold text-dark mb-6">Related Services & Routes</h2>
                <ul className="space-y-3 text-gray-text">
                  <li>
                    <Link href="/taxi/uttarakhand-taxi-service-from-delhi" className="text-primary hover:underline font-medium">
                      Delhi to Uttarakhand Taxi Service
                    </Link>{" "}– travelling from Delhi to Dehradun or other Uttarakhand destinations? See the dedicated state route page.
                  </li>
                  <li>
                    <Link href="/popular-routes/cab-service-in-haridwar" className="text-primary hover:underline font-medium">
                      Cab Service in Haridwar
                    </Link>{" "}– plan a pilgrimage or ghat visit from Dehradun to Haridwar.
                  </li>
                  <li>
                    <Link href="/popular-routes/best-cab-service-in-haridwar" className="text-primary hover:underline font-medium">
                      Best Cab Service in Haridwar
                    </Link>{" "}– explore local and outstation taxi options in Haridwar.
                  </li>
                  <li>
                    <Link href="/popular-routes/cab-service-in-chandigarh" className="text-primary hover:underline font-medium">
                      Cab Service in Chandigarh
                    </Link>{" "}– book an intercity cab from Dehradun to Chandigarh for business or personal travel.
                  </li>
                  <li>
                    <Link href="/popular-routes" className="text-primary hover:underline font-medium">
                      All popular routes
                    </Link>{" "}– browse other destinations covered by Go India Cab.
                  </li>
                  <li>
                    <Link href="/contact-us" className="text-primary hover:underline font-medium">
                      Book a Dehradun Cab / Contact Go India Cab
                    </Link>{" "}– get in touch for a custom quote or booking assistance.
                  </li>
                </ul>
              </div>
            )}

            {slug === "cab-service-in-ayodhya" && (
              <div className="pt-8 border-t border-border">
                <h2 className="text-3xl font-bold text-dark mb-6">Related Services & Routes</h2>
                <ul className="space-y-3 text-gray-text">
                  <li>
                    <Link href="/taxi/uttar-pradesh-taxi-service-from-delhi" className="text-primary hover:underline font-medium">
                      Outstation taxi services across Uttar Pradesh
                    </Link>{" "}– explore UP destinations including Agra, Mathura, Vrindavan and Varanasi.
                  </li>
                  <li>
                    <Link href="/popular-routes/cab-service-in-varanasi" className="text-primary hover:underline font-medium">
                      Cab Service in Varanasi
                    </Link>{" "}– plan your next pilgrimage destination after Ayodhya.
                  </li>
                  <li>
                    <Link href="/popular-routes/cab-service-in-agra" className="text-primary hover:underline font-medium">
                      Local Cab Service in Agra
                    </Link>{" "}– book a local taxi for Taj Mahal sightseeing and Agra city travel.
                  </li>
                  <li>
                    <Link href="/popular-routes" className="text-primary hover:underline font-medium">
                      All popular routes
                    </Link>{" "}– browse other destinations covered by Go India Cab.
                  </li>
                  <li>
                    <Link href="/contact" className="text-primary hover:underline font-medium">
                      Book a Cab / Contact Go India Cab
                    </Link>{" "}– get in touch for a custom quote or booking assistance.
                  </li>
                </ul>
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
