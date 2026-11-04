import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck, UserCheck, SprayCan, BadgeIndianRupee, Languages, Headphones, MapPinned, CreditCard,
  Plane, Building2, Route, Briefcase, Check, Phone, ArrowRight,
} from "lucide-react";
import { siteConfig } from "@/src/config/site";
import { Container } from "@/src/components/common/Container";
import { Breadcrumb } from "@/src/components/common/Breadcrumb";
import { CabSearchWidget } from "@/src/components/home/CabSearchWidget";
import { FAQSection } from "@/src/components/faq/FAQSection";
import { JsonLd } from "@/src/components/seo/JsonLd";
import type { FAQ } from "@/src/types";

const PATH = "/en-us/private-car-with-driver-delhi-india";
const URL = `${siteConfig.url}${PATH}`;

const TITLE = "Cab Service in India from USA | Private Car with Driver in Delhi, India";
const DESCRIPTION =
  "Safe, reliable and affordable cab service in India from the USA. Airport pickup, city taxis, outstation trips and corporate cars with English-speaking drivers, GPS tracking and clear pricing. Book online.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "cab service in India from USA",
    "taxi service in India from USA",
    "cab booking in India for USA travellers",
    "private car with driver Delhi India",
    "airport taxi service in India from USA",
  ],
  alternates: {
    canonical: URL,
    languages: { "en-US": URL },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    siteName: siteConfig.fullName,
    locale: "en_US",
    type: "website",
  },
};

const whyChoose = [
  { icon: UserCheck, text: "Full-time, background-checked drivers trained to look after international travellers." },
  { icon: SprayCan, text: "Well-maintained, air-conditioned and clean cars." },
  { icon: BadgeIndianRupee, text: "Easy-to-understand, open pricing with no gimmicks." },
  { icon: Languages, text: "English-speaking drivers for easy communication." },
  { icon: Headphones, text: "All-night customer service, so there is never a cause to worry." },
  { icon: MapPinned, text: "Real-time vehicles with GPS tracking." },
  { icon: CreditCard, text: "Secure payment facilities for travellers from abroad." },
];

const airportFeatures = [
  "Flight tracking for delays",
  "Meet & greet service at the arrival terminal",
  "On-time pickup and drop-off",
  "Spacious cars for luggage",
];

// Every link points at a page that already exists on the site.
const cities = [
  { name: "Agra", note: "Home of the Taj Mahal", href: "/popular-routes/cab-service-in-agra" },
  { name: "Varanasi", note: "Spiritual capital", href: "/popular-routes/cab-service-in-varanasi" },
  { name: "Ayodhya", note: "Pilgrimage destination", href: "/popular-routes/cab-service-in-ayodhya" },
  { name: "Punjab", note: "Cultural and business travel", href: "/taxi/punjab-taxi-service-from-delhi" },
];

const outstationFor = ["Family vacations", "Religious tours", "Business travel", "Medical visits"];
const corporateBenefits = ["Professional chauffeurs", "On-time, punctual service", "Corporate billing options", "Premium vehicles"];

const faqs: FAQ[] = [
  {
    question: "What payment options are available for USA customers?",
    answer:
      "We accept international debit and credit cards, online transfers, and secure payment gateways, making it easy for USA customers to book without hassle.",
  },
  {
    question: "Can I schedule an airport pickup in advance?",
    answer:
      "You can pre-book airport pickups across major Indian cities. Our driver will track your flight and arrive on time for a smooth transfer.",
  },
  {
    question: "Will I receive driver details before my trip?",
    answer:
      "You will receive the driver's name, contact number, and vehicle details prior to your scheduled pickup time.",
  },
  {
    question: "Can I modify or cancel my booking?",
    answer:
      "You can modify or cancel your booking as per our cancellation policy. Simply contact our support team for quick assistance.",
  },
];

const pageJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Cab Service in India from USA",
  serviceType: "Taxi and private car with driver service",
  description: DESCRIPTION,
  url: URL,
  areaServed: { "@type": "Country", name: "India" },
  audience: { "@type": "Audience", audienceType: "Travellers from the United States" },
  provider: {
    "@type": "Organization",
    name: siteConfig.fullName,
    url: siteConfig.url,
    telephone: siteConfig.phone.booking1,
    email: siteConfig.email,
  },
};

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl md:text-3xl font-bold text-dark mb-4">{children}</h2>;
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-dark font-medium">
          <Check className="w-5 h-5 text-accent mt-0.5 shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function InternationalCabServicePage() {
  return (
    <div className="bg-white">
      <JsonLd data={pageJsonLd} />

      {/* Search: From / To opens the normal search results page */}
      <div id="top" className="scroll-mt-20">
        <CabSearchWidget />
      </div>

      {/* Heading */}
      <div className="bg-gray-light py-10 md:py-14 border-b border-border">
        <Container>
          <Breadcrumb items={[{ label: "Cab Service in India from USA" }]} />
          <h1 className="text-3xl md:text-5xl font-bold text-dark leading-tight max-w-4xl">
            Cab Service in India from USA – <span className="text-primary">Safe, Reliable &amp; Affordable</span> Travel for International Visitors
          </h1>
          <p className="text-gray-text text-lg mt-4 max-w-3xl leading-relaxed">
            Enter your pickup and drop in the search box above to see fares for a private car with driver in Delhi and across India.
          </p>
        </Container>
      </div>

      <Container className="py-14 md:py-20">
        <div className="max-w-4xl mx-auto space-y-16">

          {/* Intro */}
          <section>
            <p className="text-gray-text text-lg leading-relaxed">
              A journey to India is a journey full of culture, colour, business, family, and medical or spiritual
              exploration between the United States and India. However, there is one factor that every foreign
              traveller worries about, and it is local transport. Finding a reliable taxi after a long-distance
              flight, understanding the pricing, and staying safe can feel overwhelming.
            </p>
            <p className="text-gray-text text-lg leading-relaxed mt-4">
              That is where our <strong>Cab Service in India from the USA</strong> fits in. We offer fast, secure and
              hassle-free <strong>taxi service in India from the USA</strong>, designed specially for American
              travellers who expect international-quality service, clear pricing and quality customer care.
            </p>
          </section>

          {/* Why choose */}
          <section>
            <SectionHeading>Why Choose Our Taxi Service in India from the USA?</SectionHeading>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {whyChoose.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3 rounded-xl border border-border bg-white p-4 shadow-sm">
                  <span className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </span>
                  <span className="text-dark font-medium leading-snug">{text}</span>
                </li>
              ))}
            </ul>
            <p className="text-gray-text text-lg leading-relaxed mt-6">
              With thousands of satisfied customers, we are a preferred choice for Cab Service in India for USA
              travellers.
            </p>
          </section>

          {/* Airport */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Plane className="w-7 h-7 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold text-dark">Airport Pickup &amp; Drop – Start Your India Trip Stress-Free</h2>
            </div>
            <p className="text-gray-text text-lg leading-relaxed">
              The last thing you want after a long international flight is to bargain with local taxis. Our
              <strong> airport taxi service in India from the USA</strong> ensures a smooth start to your journey.
            </p>
            <h3 className="text-lg font-bold text-dark mt-6">Airport Transfer Features</h3>
            <CheckList items={airportFeatures} />
            <p className="text-gray-text text-lg leading-relaxed mt-5">
              This makes us a trusted option for taxi service in India for USA travellers.{" "}
              <Link href="/airport-taxi-in-delhi" className="text-primary font-semibold hover:underline">
                Book an airport taxi in Delhi <ArrowRight className="inline w-4 h-4" />
              </Link>
            </p>
          </section>

          {/* City */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="w-7 h-7 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold text-dark">City Taxi Service in India for USA Travellers</h2>
            </div>
            <p className="text-gray-text text-lg leading-relaxed">
              Getting around the cities of India is convenient and safe with a professional taxi service. Whether you
              are sightseeing, attending meetings or visiting family, our cab service in India from the USA gives you
              comfort and local expertise.
            </p>
            <h3 className="text-lg font-bold text-dark mt-6">Popular Cities We Serve</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {cities.map((c) => (
                <Link
                  key={c.name}
                  href={c.href}
                  className="group flex items-center justify-between rounded-xl border border-border p-4 hover:border-primary hover:shadow-md transition"
                >
                  <span>
                    <span className="block font-bold text-dark group-hover:text-primary">{c.name}</span>
                    <span className="block text-sm text-gray-text">{c.note}</span>
                  </span>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition" />
                </Link>
              ))}
            </div>
            <p className="text-gray-text text-lg leading-relaxed mt-5">
              Our travel solutions make us one of the most reliable options for cab booking in India for USA
              travellers. Also see our{" "}
              <Link href="/cab-service-in-delhi" className="text-primary font-semibold hover:underline">cab service in Delhi</Link>.
            </p>
          </section>

          {/* Outstation */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Route className="w-7 h-7 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold text-dark">Outstation Cab Service – Comfortable Long-Distance Travel</h2>
            </div>
            <p className="text-gray-text text-lg leading-relaxed">
              If you are planning intercity travel, our outstation cabs are ideal. Our taxi service in India from the
              USA covers both one-way and round-trip journeys.
            </p>
            <h3 className="text-lg font-bold text-dark mt-6">Perfect for</h3>
            <CheckList items={outstationFor} />
            <p className="text-gray-text text-lg leading-relaxed mt-5">
              Choose from sedans, SUVs or premium vehicles driven by experienced chauffeurs who understand
              long-distance travel needs. Browse{" "}
              <Link href="/taxi" className="text-primary font-semibold hover:underline">outstation taxi routes</Link>,{" "}
              <Link href="/taxi-package" className="text-primary font-semibold hover:underline">tour packages</Link> or{" "}
              <Link href="/popular-routes" className="text-primary font-semibold hover:underline">popular routes</Link>.
            </p>
          </section>

          {/* Corporate */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Briefcase className="w-7 h-7 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold text-dark">Corporate &amp; Business Cab Service for US Visitors</h2>
            </div>
            <p className="text-gray-text text-lg leading-relaxed">
              India is a major business hub, and we understand the needs of corporate travellers. Our cab service in
              India for USA travellers includes professional transport solutions for business visits.
            </p>
            <h3 className="text-lg font-bold text-dark mt-6">Corporate Travel Benefits</h3>
            <CheckList items={corporateBenefits} />
            <p className="text-gray-text text-lg leading-relaxed mt-5">
              NRIs, executives and international professionals trust us for reliable cab booking in India from the
              USA.
            </p>
          </section>

          {/* Fleet / more services */}
          <section className="rounded-2xl bg-gray-light border border-border p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-dark mb-4">More ways to travel with us</h2>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Tempo Traveller on Rent", href: "/tempo-traveller-on-rent-in-delhi" },
                { label: "Bus Rental in Delhi", href: "/bus-rental-in-delhi" },
                { label: "Delhi to Agra Cab", href: "/delhi-to-agra-cab-service" },
                { label: "Delhi–Jaipur Same Day Tour", href: "/delhi-jaipur-same-day-tour" },
                { label: "Golden Triangle Package", href: "/taxi-package/golden-triangle" },
                { label: "About Us", href: "/about-us" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="rounded-full bg-white border border-border px-4 py-2 text-sm font-semibold text-dark hover:border-primary hover:text-primary transition"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </section>
        </div>
      </Container>

      <FAQSection faqs={faqs} title="FAQs – Cab Service in India from USA" />

      {/* Closing CTA */}
      <section className="bg-slate-900 py-12 md:py-16">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <ShieldCheck className="w-10 h-10 text-primary mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-white">Ready for a stress-free arrival in India?</h2>
            <p className="text-gray-300 mt-3">
              Book your private car with driver online, or talk to our team any time of day or night.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
              <a
                href="#top"
                className="rounded-xl bg-[#FF6600] hover:bg-[#e65200] text-white font-bold px-6 py-3 transition"
              >
                Search &amp; Book a Cab
              </a>
              <a
                href={`tel:${siteConfig.phone.booking1}`}
                className="rounded-xl border border-white/30 text-white font-bold px-6 py-3 hover:bg-white/10 transition inline-flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" /> {siteConfig.phone.booking1}
              </a>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
