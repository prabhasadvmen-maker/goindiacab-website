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
import { Check, MapPin, ShieldCheck, CarFront, Plane, Clock, Users, ArrowRight, Camera } from "lucide-react";
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

// Agra-specific rich content page
function AgraCabServicePage({ locality }: { locality: (typeof cabServiceLocalities)[0] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TaxiService",
        "@id": `${siteConfig.url}/cab-service-in-agra/#service`,
        "name": "Go India Cab – Cab Service in Agra",
        "url": `${siteConfig.url}/cab-service-in-agra/`,
        "telephone": siteConfig.phone.booking1,
        "email": siteConfig.email,
        "areaServed": { "@type": "City", "name": "Agra" },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Agra",
          "addressRegion": "Uttar Pradesh",
          "addressCountry": "IN"
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": siteConfig.url },
          { "@type": "ListItem", "position": 2, "name": "Cab Service in Agra", "item": `${siteConfig.url}/cab-service-in-agra/` }
        ]
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

  const attractions = [
    { name: "Taj Mahal", note: "Plan the visit around current entry rules and opening hours." },
    { name: "Agra Fort", note: "Historic fort complex; can be paired with a Taj Mahal visit." },
    { name: "Itimad-ud-Daulah", note: "Often called the Baby Taj; a useful additional heritage stop." },
    { name: "Fatehpur Sikri", note: "A separate excursion outside central Agra; allow extra travel time." },
    { name: "Akbar's Tomb, Sikandra", note: "Can be included in a longer city itinerary." },
    { name: "Mehtab Bagh", note: "Garden viewpoint across the Yamuna; check access and timing." },
    { name: "Sadar Bazaar", note: "Shopping and local-market stop, depending on your itinerary." },
  ];

  const outstationRoutes = [
    { title: "Delhi to Agra Cab Service", href: "/delhi-to-agra-cab-service", note: "Route-specific details and booking" },
    { title: "Outstation Taxi Services", href: "/taxi", note: "Broader route discovery from Delhi" },
    { title: "Cab Service in Delhi", href: "/cab-service-in-delhi", note: "If Delhi is your origin or destination" },
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
          <Breadcrumb items={[{ label: "Cab Service in Agra" }]} />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-4 leading-tight">
            Cab Service in Agra for Local Travel, Sightseeing &amp; Outstation Trips
          </h1>
          <p className="text-gray-600 mt-4 max-w-3xl text-lg leading-relaxed">
            Looking for a cab service in Agra for city travel, a Taj Mahal visit or an outstation journey? Go India Cab helps you request a taxi for local transfers, sightseeing, full-day travel and selected routes beyond Agra. Share your pickup location, destination, travel date and passenger count to check available vehicle options and receive a fare quote.
          </p>
          <p className="text-gray-500 mt-3 max-w-3xl text-base leading-relaxed">
            Before confirming, review the vehicle details, fare inclusions, additional charges and cancellation terms.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <a
              href={`tel:${siteConfig.phone.booking1}`}
              className="inline-flex items-center gap-2 bg-[#0B4A9C] hover:bg-[#083875] text-white font-bold px-6 py-3 rounded-xl transition-all"
            >
              Call {siteConfig.phone.booking1}
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 font-bold px-6 py-3 rounded-xl hover:border-[#0B4A9C] hover:text-[#0B4A9C] transition-all"
            >
              {siteConfig.email}
            </a>
          </div>
        </Container>
      </div>

      <Container className="py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-14">

            {/* Section 1: Overview */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Book a Taxi in Agra for a Comfortable City Journey
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Agra is known for its historic monuments, markets and cultural attractions. A pre-booked taxi can make it easier to travel between your hotel, railway station, airport and sightseeing stops without arranging separate transport for every leg. Go India Cab lists local, sightseeing, full-day and outstation cab options for travellers visiting Agra.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Share your planned stops and expected travel duration when requesting a quote. This helps the team suggest a suitable booking type and clarify the applicable package, waiting time and fare conditions.
              </p>
            </section>

            {/* Section 2: Services */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Cab Services Available in Agra
              </h2>
              <div className="space-y-5">
                {[
                  {
                    icon: MapPin,
                    title: "Local Cab Service in Agra",
                    body: "Use a local cab for hotel transfers, railway station pickups, shopping, business appointments, family visits and travel between attractions. If you need multiple stops or a cab for a fixed number of hours, request the relevant local package. Confirm the included hours and kilometres, extra-hour rate, extra-kilometre rate and waiting charges before booking."
                  },
                  {
                    icon: Camera,
                    title: "Agra Sightseeing Taxi",
                    body: "Explore Agra's best-known heritage sites with a sightseeing taxi that follows your schedule. A typical visit may include the Taj Mahal, Agra Fort and Itimad-ud-Daulah, depending on opening hours, entry rules and the time available. For a longer itinerary, you may also plan Fatehpur Sikri or Akbar's Tomb at Sikandra. Confirm the route, stops, total duration and any parking or waiting charges before the trip."
                  },
                  {
                    icon: Clock,
                    title: "Full-Day Taxi in Agra",
                    body: "A full-day cab is useful when you want to visit several attractions, markets or meeting locations in one booking. Share the places you plan to visit and the time you need the vehicle. Ask the team to confirm the package duration, kilometre limit, extra-hour charges and whether the vehicle remains assigned to you between stops."
                  },
                  {
                    icon: CarFront,
                    title: "Outstation Cab Service from Agra",
                    body: "Planning to travel beyond Agra? Request an outstation cab for destinations such as Delhi, Jaipur, Mathura, Vrindavan, Bharatpur or Gwalior, subject to route availability. Choose a one-way drop or a round trip where available. Share your exact destination, travel date, return plan and any stops so the fare can be calculated for the complete itinerary."
                  },
                  {
                    icon: ArrowRight,
                    title: "One-Way Cab from Agra",
                    body: "A one-way taxi is suitable when you need a drop from Agra to another city without booking a return ride. Availability and pricing depend on the destination, vehicle category, date and operator terms. Confirm whether driver return, tolls, permits or other route-related charges apply."
                  },
                  {
                    icon: Plane,
                    title: "Agra Airport Taxi Service",
                    body: "Request an airport transfer to or from Agra's Kheria Airport, subject to current service availability. Share your flight number, terminal, arrival or departure time and pickup address. Confirm the pickup meeting point, waiting-time allowance, parking charges and flight-delay procedure before confirming the booking."
                  },
                  {
                    icon: Users,
                    title: "Round-Trip and Multi-Day Cab Booking",
                    body: "For a return journey or a multi-day itinerary, provide all travel dates, destinations and planned stops. Confirm whether the cab and driver remain assigned for the full duration, along with daily kilometre limits, driver allowance, overnight charges and any additional costs."
                  },
                ].map((s) => (
                  <div key={s.title} className="p-6 rounded-2xl border border-gray-100 bg-gray-50">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <s.icon className="w-5 h-5 text-[#0B4A9C] shrink-0" />
                      {s.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm">{s.body}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 3: Sightseeing */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Agra Sightseeing Taxi – Places You Can Explore
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Plan your sightseeing route around the time available, monument opening hours and your interests. Confirm current visitor access, ticketing and opening information before travelling. Monument entry tickets, guide fees, meals and personal expenses are separate unless explicitly included in a written package quote.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-[#0B4A9C] text-white">
                      <th className="text-left p-3 font-bold rounded-tl-lg">Attraction</th>
                      <th className="text-left p-3 font-bold rounded-tr-lg">Visitor Note</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attractions.map((a, i) => (
                      <tr key={a.name} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="p-3 font-semibold text-gray-900 border-b border-gray-100">{a.name}</td>
                        <td className="p-3 text-gray-600 border-b border-gray-100">{a.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                For a short visit, prioritise the attractions that matter most to you rather than trying to cover every location in one day.
              </p>
            </section>

            {/* Section 4: Outstation Routes */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Outstation Taxi from Agra to Nearby Cities
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Go India Cab lists outstation travel from Agra to selected destinations including Delhi, Jaipur, Mathura, Vrindavan, Bharatpur and Gwalior. Route availability, vehicle choice and journey time depend on the exact pickup and drop addresses, road conditions and travel date. Request a quote for your route and confirm whether the booking is one-way or round trip.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                For travel between Delhi and Agra, use the dedicated route page for route-specific details and booking information.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {outstationRoutes.map((r) => (
                  <Link
                    key={r.href}
                    href={r.href}
                    className="flex flex-col p-4 rounded-xl border border-gray-200 bg-white hover:border-[#0B4A9C] hover:shadow-sm transition-all group"
                  >
                    <span className="text-sm font-bold text-gray-800 group-hover:text-[#0B4A9C] mb-1">{r.title}</span>
                    <span className="text-xs text-gray-500">{r.note}</span>
                  </Link>
                ))}
              </div>
            </section>

            {/* Section 5: Vehicle */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Choose the Right Cab for Your Group
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Choose a vehicle based on the number of passengers, luggage, trip duration and route. The exact model, seating layout and availability should be confirmed in the booking quote.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { name: "Sedan", desc: "May suit couples, small families or business travellers with standard luggage. Confirm the model and passenger capacity.", seats: "Up to 4 passengers" },
                  { name: "SUV", desc: "May be a better fit for families or travellers carrying more luggage. Confirm the actual seating and luggage capacity.", seats: "Up to 6 passengers" },
                  { name: "Tempo Traveller", desc: "For larger groups, ask about available seating configurations and luggage space. Confirm route suitability and availability before booking.", seats: "9 to 26 seater options", link: "/tempo-traveller-on-rent-in-delhi", linkLabel: "Tempo Traveller on Rent in Delhi" },
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

            {/* Section 6: Fare */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Taxi Fare in Agra – What Affects the Price?
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Taxi fares may depend on vehicle category, trip distance, duration, local package, outstation route, travel date and booking type. Before confirming, request a fare breakup and check what is included. Depending on the trip and the operator&apos;s terms, additional charges may apply for tolls, parking, state permits or taxes, waiting time, extra kilometres, night travel, driver allowance, overnight stays or route changes.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl border border-gray-200 bg-white">
                  <h3 className="font-bold text-gray-900 mb-2">Local &amp; Full-Day Bookings</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">Confirm the included hours and kilometres and the extra-hour or extra-kilometre rate. Ask whether waiting time between stops is charged separately.</p>
                </div>
                <div className="p-5 rounded-xl border border-gray-200 bg-white">
                  <h3 className="font-bold text-gray-900 mb-2">Outstation Trips</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">Confirm the minimum kilometre rule, one-way or round-trip calculation, driver allowance and overnight charges. Do not assume fares are all-inclusive unless confirmed in writing.</p>
                </div>
              </div>
            </section>

            {/* Section 7: Why Book */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Why Book with Go India Cab?
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                When choosing a taxi in Agra, compare the vehicle, route coverage, booking support and fare conditions — not just the starting price. Go India Cab provides booking enquiries for local, sightseeing and outstation travel in Agra.
              </p>
              <ul className="space-y-3">
                {[
                  "Multiple booking types listed for Agra, including local, sightseeing and outstation travel.",
                  "One-way, round-trip and multi-day enquiries, subject to route and vehicle availability.",
                  "Vehicle suggestions based on passenger count and luggage needs.",
                  "Fare details and trip conditions can be checked before confirming.",
                  "Booking support through the published phone number and email.",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3 text-gray-600">
                    <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm">{point}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Section 8: How to Book */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                How to Book a Taxi in Agra
              </h2>
              <ol className="space-y-3">
                {[
                  "Enter your pickup and drop locations.",
                  "Select local, sightseeing, airport or outstation travel.",
                  "Choose the date, pickup time, passenger count and preferred vehicle category.",
                  "Share flight details, sightseeing stops or return dates where relevant.",
                  "Review the fare breakup, inclusions, exclusions and cancellation terms.",
                  "Confirm the booking and save the booking reference and driver details provided by the team.",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-600">
                    <span className="w-7 h-7 rounded-full bg-[#0B4A9C] text-white text-sm font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                    <span className="pt-0.5 text-sm">{step}</span>
                  </li>
                ))}
              </ol>
            </section>

            {/* FAQs */}
            {locality.faqs && locality.faqs.length > 0 && (
              <div className="pt-4 border-t border-gray-200">
                <FAQSection faqs={locality.faqs} title="Frequently Asked Questions About Cab Service in Agra" />
              </div>
            )}

            {/* Final CTA */}
            <section className="p-6 md:p-8 rounded-2xl bg-[#0B4A9C] text-white text-center">
              <h2 className="text-xl md:text-2xl font-bold mb-3">Book Your Agra Cab</h2>
              <p className="text-blue-100 mb-6 leading-relaxed">
                Need a local taxi, sightseeing ride or outstation cab from Agra? Share your travel details and request an available vehicle and fare quote. Review the booking terms before confirming.
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
                <Link
                  href="/contact-us"
                  className="inline-flex items-center gap-2 border border-white/40 text-white font-bold px-6 py-3 rounded-xl hover:bg-white/10 transition-all"
                >
                  Contact Us
                </Link>
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
              {/* Delhi to Agra contextual link */}
              <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100">
                <p className="text-sm font-bold text-[#0B4A9C] mb-2">Travelling from Delhi?</p>
                <p className="text-xs text-gray-600 mb-3">Visit the dedicated route page for Delhi to Agra cab details and booking options.</p>
                <Link
                  href="/delhi-to-agra-cab-service"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0B4A9C] underline underline-offset-2 hover:text-[#083875]"
                >
                  Delhi to Agra Cab Service →
                </Link>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </div>
  );
}

// Jaipur-specific rich content page
function JaipurCabServicePage({ locality }: { locality: (typeof cabServiceLocalities)[0] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TaxiService",
        "@id": `${siteConfig.url}/cab-service-in-jaipur/#service`,
        "name": "Go India Cab – Cab Service in Jaipur",
        "url": `${siteConfig.url}/cab-service-in-jaipur/`,
        "telephone": siteConfig.phone.booking1,
        "email": siteConfig.email,
        "areaServed": { "@type": "City", "name": "Jaipur" },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Jaipur",
          "addressRegion": "Rajasthan",
          "addressCountry": "IN"
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": siteConfig.url },
          { "@type": "ListItem", "position": 2, "name": "Cab Service in Jaipur", "item": `${siteConfig.url}/cab-service-in-jaipur/` }
        ]
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

  const attractions = [
    { name: "Amber Fort", note: "Major hilltop fort; allow time for the visit and approach road." },
    { name: "Hawa Mahal", note: "Landmark facade in the old city; can be combined with nearby markets." },
    { name: "City Palace", note: "Historic palace complex in the Pink City." },
    { name: "Jantar Mantar", note: "Historic astronomical observatory near City Palace." },
    { name: "Jal Mahal", note: "Lakeside palace viewpoint; check visitor access restrictions." },
    { name: "Nahargarh Fort", note: "Hilltop fort and city views; allow for the uphill drive." },
    { name: "Jaigarh Fort", note: "Fort complex that can be paired with Amber Fort depending on time." },
    { name: "Albert Hall Museum", note: "Museum stop near Ram Niwas Garden." },
    { name: "Patrika Gate and Jawahar Circle", note: "Popular photo stop in the city." },
    { name: "Galtaji Temple", note: "Temple complex on the outskirts of central Jaipur." },
    { name: "Johari Bazaar and Bapu Bazaar", note: "Traditional shopping areas; plan around traffic and parking." },
  ];

  const outstationRoutes = [
    { title: "Cab Service in Agra", href: "/cab-service-in-agra", note: "Contextual link for Agra travel" },
    { title: "Cab Service in Delhi", href: "/cab-service-in-delhi", note: "If Delhi is your origin or destination" },
    { title: "Outstation Taxi Services", href: "/taxi", note: "Broader route discovery" },
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
          <Breadcrumb items={[{ label: "Cab Service in Jaipur" }]} />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-4 leading-tight">
            Cab Service in Jaipur for Local Travel, Sightseeing &amp; Outstation Trips
          </h1>
          <p className="text-gray-600 mt-4 max-w-3xl text-lg leading-relaxed">
            Looking for a cab service in Jaipur for city travel, sightseeing or an outstation journey? Go India Cab helps you enquire about local taxi bookings, airport transfers, sightseeing trips and travel to destinations beyond the Pink City. Share your pickup location, destination, travel date and passenger count to check available vehicle options and request a fare quote.
          </p>
          <p className="text-gray-500 mt-3 max-w-3xl text-base leading-relaxed">
            Before confirming, review the vehicle details, fare inclusions, additional charges and cancellation conditions.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <a
              href={`tel:${siteConfig.phone.booking1}`}
              className="inline-flex items-center gap-2 bg-[#0B4A9C] hover:bg-[#083875] text-white font-bold px-6 py-3 rounded-xl transition-all"
            >
              Call {siteConfig.phone.booking1}
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 font-bold px-6 py-3 rounded-xl hover:border-[#0B4A9C] hover:text-[#0B4A9C] transition-all"
            >
              {siteConfig.email}
            </a>
          </div>
        </Container>
      </div>

      <Container className="py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-14">

            {/* Section 1: Overview */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Book a Taxi in Jaipur for City Travel and Sightseeing
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Jaipur is known for its historic forts, palaces, markets and cultural attractions. A pre-booked taxi can help you travel between your hotel, Jaipur International Airport, railway station, business location and sightseeing stops. Go India Cab lists local, airport, one-way and outstation taxi options for travellers who need transport in and around Jaipur.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Share your planned stops and expected travel duration when requesting a quote. This helps the team confirm the suitable booking type, vehicle availability, package duration and applicable fare conditions.
              </p>
            </section>

            {/* Section 2: Services */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Cab Services Available in Jaipur
              </h2>
              <div className="space-y-5">
                {[
                  {
                    icon: MapPin,
                    title: "Local Cab Service in Jaipur",
                    body: "Book a local cab for hotel transfers, railway station pickups, shopping, business appointments, family visits and travel between Jaipur attractions. If you need multiple stops or a cab for a fixed number of hours, ask about the available local package. Confirm included hours and kilometres, extra-hour charges, extra-kilometre rates and waiting conditions before booking."
                  },
                  {
                    icon: Camera,
                    title: "Jaipur Sightseeing Taxi",
                    body: "Explore Jaipur at your own pace with a sightseeing taxi. Depending on your schedule, you can plan visits to Amber Fort, Hawa Mahal, City Palace, Jantar Mantar, Jal Mahal and other attractions. Share your preferred stops in advance so the route and booking duration can be planned realistically. Monument entry tickets, guide fees, parking and personal expenses should be treated as separate unless explicitly included in the written quote."
                  },
                  {
                    icon: Plane,
                    title: "Jaipur Airport Taxi Service",
                    body: "Request a taxi for pickup or drop-off at Jaipur International Airport. Share your flight number, arrival or departure time, terminal and destination address. Before confirming, check the pickup meeting point, waiting-time allowance, parking charges and procedure for delayed flights. Airport transfers are subject to vehicle and service availability."
                  },
                  {
                    icon: CarFront,
                    title: "Outstation Taxi from Jaipur",
                    body: "Planning to travel beyond Jaipur? Request an outstation cab for destinations such as Ajmer, Pushkar, Udaipur, Jodhpur, Delhi, Agra or other locations, subject to route availability. Choose a one-way drop or round trip where offered. Share your exact pickup and drop addresses, travel date, return plan and any stops so the team can prepare an accurate quote."
                  },
                  {
                    icon: ArrowRight,
                    title: "One-Way Taxi Service in Jaipur",
                    body: "A one-way taxi is suitable when you need a drop from Jaipur to another city without booking a return ride. Availability and pricing depend on the destination, vehicle category, date and operator terms. Confirm whether driver return, tolls, permits or other route-related charges apply."
                  },
                  {
                    icon: Users,
                    title: "Corporate Cab Service in Jaipur",
                    body: "For business travel, request a cab for airport transfers, office visits, meetings and corporate events. Share the passenger count, pickup schedule, number of stops and billing requirements. Confirm whether recurring bookings, monthly billing or dedicated vehicle arrangements are available before describing them as standard services."
                  },
                  {
                    icon: ShieldCheck,
                    title: "Wedding and Event Taxi Service in Jaipur",
                    body: "For weddings, family functions and group events, enquire about vehicles for guest transfers and scheduled pickups. Share the event venue, dates, number of passengers and movement schedule. Confirm vehicle count, seating capacity, waiting time and any decoration or special-use requirements in advance."
                  },
                ].map((s) => (
                  <div key={s.title} className="p-6 rounded-2xl border border-gray-100 bg-gray-50">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <s.icon className="w-5 h-5 text-[#0B4A9C] shrink-0" />
                      {s.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm">{s.body}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 3: Sightseeing */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Jaipur Sightseeing Taxi – Places to Visit
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Build your Jaipur sightseeing plan around the time available and the attractions you want to explore. Check current visitor timings, entry rules and access information before travelling. Monument entry tickets, guide fees, parking and personal expenses are separate unless explicitly included in a written package quote.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-[#0B4A9C] text-white">
                      <th className="text-left p-3 font-bold rounded-tl-lg">Attraction</th>
                      <th className="text-left p-3 font-bold rounded-tr-lg">Itinerary Note</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attractions.map((a, i) => (
                      <tr key={a.name} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="p-3 font-semibold text-gray-900 border-b border-gray-100">{a.name}</td>
                        <td className="p-3 text-gray-600 border-b border-gray-100">{a.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                For a short visit, prioritise a few attractions rather than trying to cover every location in one trip. Ask the team to confirm the planned route, total booking duration and any waiting or parking charges.
              </p>
            </section>

            {/* Section 4: Outstation Routes */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Outstation Taxi from Jaipur to Nearby Destinations
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Jaipur can be a starting point for trips across Rajasthan and neighbouring states. Popular enquiry destinations include Ajmer, Pushkar, Udaipur, Jodhpur, Delhi and Agra. Route availability, journey time and fare depend on the exact pickup and drop addresses, vehicle type, travel date and road conditions. Request a route-specific quote and confirm whether the booking is one-way or round trip.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                For Delhi-origin travel to Jaipur, use the dedicated Delhi-to-Jaipur route page if available. Keep route-specific fare and itinerary details on that page rather than duplicating them here.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {outstationRoutes.map((r) => (
                  <Link
                    key={r.href}
                    href={r.href}
                    className="flex flex-col p-4 rounded-xl border border-gray-200 bg-white hover:border-[#0B4A9C] hover:shadow-sm transition-all group"
                  >
                    <span className="text-sm font-bold text-gray-800 group-hover:text-[#0B4A9C] mb-1">{r.title}</span>
                    <span className="text-xs text-gray-500">{r.note}</span>
                  </Link>
                ))}
              </div>
            </section>

            {/* Section 5: Vehicle */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Choose the Right Cab for Your Journey
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Select a vehicle based on passenger count, luggage, trip duration and route. The actual model, seating layout and availability should be confirmed in the booking quote.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { name: "Hatchback", desc: "May suit solo travellers or small groups with limited luggage for short city trips. Confirm the available model and seating capacity.", seats: "Up to 4 passengers" },
                  { name: "Sedan", desc: "May be suitable for couples, small families and business travellers with standard luggage. Confirm passenger and luggage capacity.", seats: "Up to 4 passengers" },
                  { name: "SUV", desc: "May offer additional space for families or travellers carrying more luggage. Confirm the actual seating configuration.", seats: "Up to 6 passengers" },
                  { name: "Tempo Traveller", desc: "For larger groups, enquire about available seating configurations and luggage space. Confirm vehicle availability and route suitability.", seats: "9 to 26 seater options", link: "/tempo-traveller-on-rent-in-delhi", linkLabel: "Tempo Traveller on Rent" },
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

            {/* Section 6: Fare */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Jaipur Taxi Fare – What Affects the Price?
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Taxi fares may depend on vehicle category, trip distance, duration, local package, outstation route, travel date and booking type. Before confirming, request a fare breakup and check what is included. Depending on the package and operator terms, additional charges may apply for tolls, parking, state permits or taxes, waiting time, extra kilometres, night travel, driver allowance, overnight stays or route changes.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl border border-gray-200 bg-white">
                  <h3 className="font-bold text-gray-900 mb-2">Local Bookings</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">Confirm the included hours and kilometres and the extra-hour or extra-kilometre rate. Ask whether waiting time between stops is charged separately.</p>
                </div>
                <div className="p-5 rounded-xl border border-gray-200 bg-white">
                  <h3 className="font-bold text-gray-900 mb-2">Outstation Trips</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">Confirm the minimum kilometre rule, one-way or round-trip calculation, driver allowance and overnight charges. Do not assume fares are all-inclusive unless confirmed in writing.</p>
                </div>
              </div>
            </section>

            {/* Section 7: Why Book */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Why Book with Go India Cab?
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                When choosing a taxi service in Jaipur, compare the vehicle, route coverage, booking support and fare conditions — not just the starting price. Go India Cab provides booking enquiries for local, sightseeing and outstation travel in Jaipur. Share your itinerary in advance so the team can confirm the available trip option and suitable vehicle.
              </p>
              <ul className="space-y-3">
                {[
                  "Multiple booking types listed for Jaipur, including local, airport and outstation travel.",
                  "One-way and round-trip enquiries, subject to route and vehicle availability.",
                  "Vehicle suggestions based on passenger count and luggage needs.",
                  "Fare details and trip conditions can be checked before confirming.",
                  "Booking support through the phone numbers and email published on the website.",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3 text-gray-600">
                    <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm">{point}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Section 8: How to Book */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                How to Book a Taxi in Jaipur
              </h2>
              <ol className="space-y-3">
                {[
                  "Enter your pickup and drop locations.",
                  "Select local, sightseeing, airport or outstation travel.",
                  "Choose the date, pickup time, passenger count and preferred vehicle category.",
                  "Share flight details, sightseeing stops or return dates where relevant.",
                  "Review the fare breakup, inclusions, exclusions and cancellation terms.",
                  "Confirm the booking and save the booking reference and driver details provided by the team.",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-600">
                    <span className="w-7 h-7 rounded-full bg-[#0B4A9C] text-white text-sm font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                    <span className="pt-0.5 text-sm">{step}</span>
                  </li>
                ))}
              </ol>
            </section>

            {/* FAQs */}
            {locality.faqs && locality.faqs.length > 0 && (
              <div className="pt-4 border-t border-gray-200">
                <FAQSection faqs={locality.faqs} title="Frequently Asked Questions About Taxi Service in Jaipur" />
              </div>
            )}

            {/* Final CTA */}
            <section className="p-6 md:p-8 rounded-2xl bg-[#0B4A9C] text-white text-center">
              <h2 className="text-xl md:text-2xl font-bold mb-3">Book Your Jaipur Cab</h2>
              <p className="text-blue-100 mb-6 leading-relaxed">
                Need a local taxi, sightseeing ride, airport transfer or outstation cab from Jaipur? Share your travel details with Go India Cab and request an available vehicle and fare quote. Review the booking terms before confirming.
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
                <Link
                  href="/contact-us"
                  className="inline-flex items-center gap-2 border border-white/40 text-white font-bold px-6 py-3 rounded-xl hover:bg-white/10 transition-all"
                >
                  Contact Us
                </Link>
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
              {/* Agra contextual link */}
              <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100">
                <p className="text-sm font-bold text-[#0B4A9C] mb-2">Travelling to Agra?</p>
                <p className="text-xs text-gray-600 mb-3">Visit the dedicated page for Agra cab details and booking options.</p>
                <Link
                  href="/cab-service-in-agra"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0B4A9C] underline underline-offset-2 hover:text-[#083875]"
                >
                  Cab Service in Agra →
                </Link>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </div>
  );
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

  if (slug === "agra") {
    return <AgraCabServicePage locality={locality} />;
  }

  if (slug === "jaipur") {
    return <JaipurCabServicePage locality={locality} />;
  }

  return <GenericLocalityPage locality={locality} />;
}
