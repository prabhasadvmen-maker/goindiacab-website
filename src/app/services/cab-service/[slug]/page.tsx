import Image from "next/image";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { siteConfig } from "@/src/config/site";
import { Container } from "@/src/components/common/Container";
import { Breadcrumb } from "@/src/components/common/Breadcrumb";
import { BookingForm } from "@/src/components/booking/BookingForm";
import { Button } from "@/src/components/common/Button";
import { FAQSection } from "@/src/components/faq/FAQSection";
import { cabServiceLocalities } from "@/src/data/localities";
import { Check, MapPin, ShieldCheck, CarFront, Plane, Clock, Users, ArrowRight } from "lucide-react";
import { CabSearchWidget } from "@/src/components/home/CabSearchWidget";

export function generateStaticParams() {
  return cabServiceLocalities.map((locality) => ({
    slug: locality.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const locality = cabServiceLocalities.find((l) => l.slug === slug);

  if (!locality) {
    return { title: "Not Found" };
  }

  return {
    title: locality.metaTitle,
    description: locality.metaDescription,
    alternates: { canonical: `${siteConfig.url}/cab-service-in-${locality.slug}` },
  };
}

// Delhi-specific rich content page
function DelhiCabServicePage({ locality }: { locality: (typeof cabServiceLocalities)[0] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TaxiService",
        "@id": `${siteConfig.url}/cab-service-in-delhi/#service`,
        "name": "Go India Cab – Cab Service in Delhi",
        "url": `${siteConfig.url}/cab-service-in-delhi/`,
        "telephone": siteConfig.phone.booking1,
        "email": siteConfig.email,
        "areaServed": { "@type": "City", "name": "Delhi" },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "New Delhi",
          "addressRegion": "Delhi",
          "addressCountry": "IN"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": locality.faqs?.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
        }))
      }
    ]
  };

  const routes = [
    { title: "Delhi to Agra Cab", href: "/delhi-to-agra-cab-service" },
    { title: "Delhi to Uttarakhand Taxi Service", href: "/taxi/uttarakhand-taxi-service-from-delhi" },
    { title: "Delhi to Himachal Taxi Service", href: "/taxi/delhi-to-himachal-taxi-service" },
    { title: "Delhi to Rajasthan Taxi Service", href: "/taxi/rajasthan-taxi-service-from-delhi" },
    { title: "Delhi to Uttar Pradesh Taxi Service", href: "/taxi/uttar-pradesh-taxi-service-from-delhi" },
    { title: "Delhi to Punjab Taxi Service", href: "/taxi/punjab-taxi-service-from-delhi" },
    { title: "Delhi to Jammu & Kashmir Taxi Service", href: "/taxi/jammu-kashmir-taxi-service-from-delhi" },
  ];

  return (
    <div className="bg-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <CabSearchWidget />

      {/* Hero */}
      <div className="bg-gray-50 py-12 md:py-16 border-b border-gray-200">
        <Container>
          <Breadcrumb items={[{ label: "Cab Service in Delhi" }]} />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-4 leading-tight">
            Cab Service in Delhi for Local, Airport &amp; Outstation Travel
          </h1>
          <p className="text-gray-600 mt-4 max-w-3xl text-lg leading-relaxed">
            Need a dependable cab service in Delhi for a city ride, airport transfer or an outstation journey? Go India Cab helps you request a taxi for different travel needs. Share your pickup point, destination and travel date to check available cab options and review the fare before confirming.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <a
              href={`tel:${siteConfig.phone.booking1}`}
              className="inline-flex items-center gap-2 bg-[#0B4A9C] hover:bg-[#083875] text-white font-bold px-6 py-3 rounded-xl transition-all"
            >
              Call {siteConfig.phone.booking1}
            </a>
          </div>
        </Container>
      </div>

      <Container className="py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-14">

            {/* Section 1: Reliable Taxi */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Reliable Taxi Service in Delhi for Every Journey
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Delhi travel needs can vary from a quick local transfer to a full-day booking or an intercity road trip. Go India Cab offers booking options for local cab requirements, airport transfers, outstation travel and corporate journeys, subject to service availability. Share your itinerary before booking so the team can help identify the suitable trip type and vehicle.
              </p>
              <p className="text-gray-600 leading-relaxed">
                For a smoother booking experience, keep your pickup address, destination, date, time, passenger count and luggage requirements ready. Before confirming, check the final fare, trip inclusions, cancellation terms and any additional charges that may apply.
              </p>
            </section>

            {/* Section 2: Services */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Cab Services Available in Delhi
              </h2>

              <div className="space-y-6">
                <div className="p-6 rounded-2xl border border-gray-100 bg-gray-50">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#0B4A9C]" /> Local Cab Service in Delhi
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Book a local taxi in Delhi for appointments, shopping, business meetings, hotel transfers, family visits and city travel. If you need the cab for multiple stops or a fixed duration, share the expected itinerary and booking hours in advance. Confirm the package duration, included kilometres, extra-hour charges and any waiting fees before the trip.
                  </p>
                </div>

                <div className="p-6 rounded-2xl border border-gray-100 bg-gray-50">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <Plane className="w-5 h-5 text-[#0B4A9C]" /> Delhi Airport Taxi Service
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Arrange a taxi for pickup from or drop-off at Indira Gandhi International Airport (IGI), subject to availability. For an airport pickup, provide your flight number, arrival date, terminal and expected landing time. For a drop, share your pickup address and flight departure time. Confirm the meeting point, waiting-time allowance, parking charges and any applicable airport fees before confirming the booking.
                  </p>
                </div>

                <div className="p-6 rounded-2xl border border-gray-100 bg-gray-50">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <CarFront className="w-5 h-5 text-[#0B4A9C]" /> Outstation Cab Service from Delhi
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Planning a trip outside the capital? Request an outstation cab from Delhi for a family visit, holiday, pilgrimage or business journey. Depending on the route, you may be able to choose a one-way drop or a round trip. Share all planned stops and return details when requesting the quote so the fare reflects the complete itinerary.
                  </p>
                </div>

                <div className="p-6 rounded-2xl border border-gray-100 bg-gray-50">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#0B4A9C]" /> Corporate Cab Service in Delhi
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    For business travel, client visits, employee movement or scheduled transfers, contact the Go India Cab team with your pickup locations, travel schedule, passenger count and billing requirements. Corporate availability, invoicing and recurring booking arrangements must be confirmed directly with the team.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3: Best Outstation */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Best Cab Service in Delhi for Outstation Travel
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                If you are comparing options for the best cab service in Delhi for outstation travel, look beyond the starting fare. Check the vehicle category, route coverage, driver allowance, tolls, state taxes, parking, night charges, waiting time and cancellation terms. Ask for a written fare breakup before confirming the trip.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Go India Cab can help you request a one-way or round-trip taxi for supported destinations from Delhi. Confirm whether sightseeing stops, route changes or additional halts are included or charged separately.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl border border-gray-200 bg-white">
                  <h3 className="font-bold text-gray-900 mb-2">One-Way Cab from Delhi</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Need a drop in another city without booking a return journey? Request a one-way cab for your route. Confirm any driver return, toll, permit or other applicable charges in the quote.
                  </p>
                </div>
                <div className="p-5 rounded-xl border border-gray-200 bg-white">
                  <h3 className="font-bold text-gray-900 mb-2">Round-Trip Taxi from Delhi</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    For a return journey, share both travel dates, pickup and drop points, approximate kilometres and planned halts. Confirm the included kilometres, driver allowance, overnight charges and extra-kilometre rate before booking.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4: Popular Routes */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Popular Routes from Delhi
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Explore popular intercity routes from Delhi. Select a route to view the dedicated service information and request a cab quote. Route availability, travel time and fare depend on exact addresses, traffic, vehicle type and trip conditions.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className="flex items-center justify-between p-4 rounded-xl border border-gray-200 bg-white hover:border-[#0B4A9C] hover:shadow-sm transition-all group"
                  >
                    <span className="text-sm font-semibold text-gray-800 group-hover:text-[#0B4A9C]">{route.title}</span>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#0B4A9C]" />
                  </Link>
                ))}
              </div>
            </section>

            {/* Section 5: Vehicle */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Choose the Right Cab for Your Trip
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                The right vehicle depends on the number of passengers, luggage, journey distance and route conditions. Ask the team to confirm the exact model, seating configuration and luggage capacity before the booking is finalised.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { name: "Sedan", desc: "Suits small families, couples and business travellers with standard luggage. Confirm the available model and seating capacity.", seats: "Up to 4 passengers" },
                  { name: "SUV", desc: "Suitable for a larger group or additional luggage. Confirm actual passenger and luggage capacity for long-distance or hill journeys.", seats: "Up to 6 passengers" },
                  { name: "Tempo Traveller", desc: "For group travel, family functions or tours. Check seating layout, luggage space and route suitability before confirming.", seats: "9 to 26 seater options", link: "/tempo-traveller-on-rent-in-delhi", linkLabel: "Tempo Traveller on Rent in Delhi" },
                ].map((v) => (
                  <div key={v.name} className="p-5 rounded-xl border border-gray-200 bg-gray-50 flex flex-col gap-2">
                    <h3 className="font-bold text-gray-900">{v.name}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed flex-1">{v.desc}</p>
                    <span className="text-xs font-semibold text-[#0B4A9C] bg-blue-50 px-3 py-1 rounded-full w-fit">{v.seats}</span>
                    {"link" in v && v.link && (
                      <Link href={v.link} className="text-sm font-semibold text-[#0B4A9C] underline underline-offset-2 hover:text-[#083875]">
                        {v.linkLabel}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Section 6: Areas */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Areas Served Across Delhi NCR
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Go India Cab serves pickup and drop requests across Delhi NCR. Contact the team to confirm availability for your exact pickup address before booking.
              </p>
              <div className="flex flex-wrap gap-2">
                {locality.nearbyAreas.map((area) => (
                  <span key={area} className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700 border border-gray-200">
                    {area}
                  </span>
                ))}
              </div>
            </section>

            {/* Section 7: Why Book */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Why Book with Go India Cab?
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                A useful cab booking experience starts with clear trip details and an understandable fare. When choosing Go India Cab, customers can review the vehicle option, pickup information, route and fare conditions before confirming.
              </p>
              <ul className="space-y-3">
                {[
                  "Booking assistance for local, airport and outstation enquiries.",
                  "Vehicle suggestions based on passenger count and luggage requirements.",
                  "Fare details shared for review before booking confirmation.",
                  "Published phone contact for booking support.",
                  "Route and trip requirements can be discussed before confirmation.",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3 text-gray-600">
                    <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Section 8: How to Book */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                How to Book a Taxi in Delhi
              </h2>
              <ol className="space-y-3">
                {[
                  "Enter your pickup and drop locations.",
                  "Choose local, airport or outstation service and select one-way or round trip where applicable.",
                  "Select the date, pickup time and passenger count.",
                  "Share flight details, stops or luggage requirements if relevant.",
                  "Review the vehicle, final fare, inclusions, exclusions and cancellation terms.",
                  "Confirm the booking and retain the booking reference and driver details shared by the team.",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-600">
                    <span className="w-7 h-7 rounded-full bg-[#0B4A9C] text-white text-sm font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                    <span className="pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </section>

            {/* Section 9: Fare */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Taxi Fare in Delhi – What Should You Check?
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Taxi fares can vary by vehicle category, trip distance, duration, route, travel date and booking type. Before confirming a cab, request a clear fare breakup and check which items are included. Depending on the trip and the operator&apos;s policy, additional costs may include tolls, parking, state taxes or permits, driver allowance, waiting time, extra kilometres, night charges and route changes.
              </p>
              <p className="text-gray-600 leading-relaxed">
                For local packages, confirm included hours and kilometres and the extra-hour or extra-kilometre rate. For outstation journeys, confirm the one-way or round-trip basis, minimum kilometre rules, driver allowance and overnight charges. The final fare should be shared and accepted before the booking is confirmed.
              </p>
            </section>

            {/* FAQs */}
            {locality.faqs && locality.faqs.length > 0 && (
              <div className="pt-4 border-t border-gray-200">
                <FAQSection faqs={locality.faqs} title="Frequently Asked Questions About Cab Service in Delhi" />
              </div>
            )}

            {/* Final CTA */}
            <section className="p-6 md:p-8 rounded-2xl bg-[#0B4A9C] text-white text-center">
              <h2 className="text-xl md:text-2xl font-bold mb-3">Book Your Delhi Cab Today</h2>
              <p className="text-blue-100 mb-6 leading-relaxed">
                Planning a local ride, airport transfer or outstation journey? Share your travel details and request an available cab option. Review the fare and booking conditions before confirming.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <a
                  href={`tel:${siteConfig.phone.booking1}`}
                  className="inline-flex items-center gap-2 bg-white text-[#0B4A9C] font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-all"
                >
                  Call {siteConfig.phone.booking1}
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex items-center gap-2 border border-white/40 text-white font-bold px-6 py-3 rounded-xl hover:bg-white/10 transition-all"
                >
                  {siteConfig.email}
                </a>
              </div>
            </section>

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              <BookingForm variant="sidebar" />
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 text-center">
                <p className="text-sm text-gray-500 mb-2">Need a cab right now?</p>
                <p className="text-gray-900 font-bold text-xl mb-4">Call our team</p>
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

// Generic locality page (all slugs except delhi)
function GenericLocalityPage({ locality }: { locality: (typeof cabServiceLocalities)[0] }) {
  return (
    <div className="bg-white min-h-screen">
      <CabSearchWidget />

      <div className="bg-gray-50 py-12 md:py-16 border-b border-gray-200">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <Breadcrumb items={[{ label: `Cab Service in ${locality.area}` }]} />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4">{locality.title}</h1>
              <p className="text-gray-600 mt-4 max-w-2xl text-lg">{locality.description}</p>
            </div>
            <div className="w-full md:w-1/2 lg:w-2/5 flex justify-end">
              <Image src="/premium-cab.png" alt={`Cab Service in ${locality.area}`} width={600} height={400} className="object-cover rounded-xl shadow-2xl hover:scale-105 transition-transform duration-500" priority />
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About Our Service in {locality.area}</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Go India Cab offers reliable cab services in <strong>{locality.area}, {locality.city}</strong>. Whether you need a local drop, an airport transfer, or an outstation trip from {locality.area}, we have vehicle options to suit your travel needs.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 text-center">
                  <ShieldCheck className="w-10 h-10 text-[#0B4A9C] mx-auto mb-3" />
                  <p className="font-bold text-gray-900">Verified Drivers</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 text-center">
                  <CarFront className="w-10 h-10 text-[#0B4A9C] mx-auto mb-3" />
                  <p className="font-bold text-gray-900">Clean Vehicles</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 text-center">
                  <MapPin className="w-10 h-10 text-[#0B4A9C] mx-auto mb-3" />
                  <p className="font-bold text-gray-900">Booking Support</p>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Services Offered</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {locality.services.map((service, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <Check className="w-5 h-5 text-green-500 mr-2" /> {service}
                  </li>
                ))}
              </ul>
              {locality.nearbyAreas && locality.nearbyAreas.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Nearby Areas We Serve</h3>
                  <div className="flex flex-wrap gap-2">
                    {locality.nearbyAreas.map((area, idx) => (
                      <span key={idx} className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700 border border-gray-200">{area}</span>
                    ))}
                  </div>
                </div>
              )}
            </section>
            {locality.faqs && locality.faqs.length > 0 && (
              <div className="pt-8 border-t border-gray-200">
                <FAQSection faqs={locality.faqs} title={`FAQs about Cab Service in ${locality.area}`} />
              </div>
            )}
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <BookingForm variant="sidebar" />
              <div className="mt-6 bg-gray-50 p-6 rounded-2xl border border-gray-200 text-center">
                <p className="text-sm text-gray-500 mb-2">Need a cab right now?</p>
                <p className="text-gray-900 font-bold text-xl mb-4">Call our dispatcher</p>
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

export default async function CabServiceLocalityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const locality = cabServiceLocalities.find((l) => l.slug === slug);

  if (!locality) {
    notFound();
  }

  if (slug === "delhi") {
    return <DelhiCabServicePage locality={locality} />;
  }

  return <GenericLocalityPage locality={locality} />;
}
