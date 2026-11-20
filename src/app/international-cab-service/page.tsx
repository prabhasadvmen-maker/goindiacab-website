import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Plane, ShieldCheck, Headphones, MapPinned } from "lucide-react";
import { siteConfig } from "@/src/config/site";
import { Container } from "@/src/components/common/Container";
import { Breadcrumb } from "@/src/components/common/Breadcrumb";
import { CabSearchWidget } from "@/src/components/home/CabSearchWidget";
import { JsonLd } from "@/src/components/seo/JsonLd";
import { internationalPages, internationalHref } from "@/src/data/internationalPages";

const URL = `${siteConfig.url}/international-cab-service`;
const TITLE = "International Cab Service in India | GoIndiaCab";
const DESCRIPTION =
  "Explore international cab services in India with GoIndiaCab. Book private cars with professional drivers for Delhi airport transfers, sightseeing and outstation travel.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: URL,
    languages: {
      "x-default": URL,
      ...Object.fromEntries(
        internationalPages.map((p) => [
          `en-${p.code.toUpperCase()}`,
          `${siteConfig.url}${internationalHref(p.locale)}`,
        ])
      ),
    },
  },
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL, siteName: siteConfig.fullName, type: "website" },
};

const perks = [
  { icon: Plane, text: "Airport pickup with flight tracking" },
  { icon: ShieldCheck, text: "Background-checked, English-speaking drivers" },
  { icon: MapPinned, text: "GPS-tracked cars and clear pricing" },
  { icon: Headphones, text: "24/7 customer support" },
];

export default function InternationalHubPage() {
  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: TITLE,
    description: DESCRIPTION,
    url: URL,
    inLanguage: "en",
    hasPart: internationalPages.map((p) => ({
      "@type": "WebPage",
      name: p.metaTitle || p.h1,
      url: `${siteConfig.url}${internationalHref(p.locale)}`,
    })),
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.fullName,
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.logo}`,
    telephone: siteConfig.phone.booking1,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address,
      addressLocality: "New Delhi",
      addressCountry: "IN",
    },
    sameAs: Object.values(siteConfig.social),
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "International Cab Service in India",
    description: DESCRIPTION,
    serviceType: "Private Car with Driver",
    provider: {
      "@type": "Organization",
      name: siteConfig.fullName,
      url: siteConfig.url,
    },
    areaServed: { "@type": "Country", name: "India" },
    audience: {
      "@type": "Audience",
      audienceType: "International Travellers visiting India",
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: URL,
      servicePhone: siteConfig.phone.booking1,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "International Cab Service", item: URL },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is international cab service in India?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "International cab service in India refers to private car hire with a professional driver, designed for foreign visitors arriving from countries like the USA, UK, Canada, Australia, UAE, Singapore and Europe. GoIndiaCab offers airport transfers, city sightseeing, and outstation trips across India.",
        },
      },
      {
        "@type": "Question",
        name: "How do I book a private car with driver in Delhi from abroad?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can book online at goindiacab.com using international debit or credit cards. Select your pickup city, destination, and travel date. You will receive instant confirmation with driver details before your trip.",
        },
      },
      {
        "@type": "Question",
        name: "Does GoIndiaCab provide airport transfer service in Delhi for international travellers?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. GoIndiaCab provides Delhi airport transfer service with flight tracking, meet and greet at the arrival terminal, and on-time pickup for international visitors from all countries.",
        },
      },
      {
        "@type": "Question",
        name: "Are drivers English-speaking for international tourists?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. All GoIndiaCab drivers assigned to international travellers are English-speaking, background-verified, and trained to assist foreign visitors with local navigation and cultural guidance.",
        },
      },
    ],
  };

  return (
    <div className="bg-white">
      <JsonLd data={collectionPageSchema} />
      <JsonLd data={organizationSchema} />
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

      <CabSearchWidget />

      <div className="bg-gray-light py-10 md:py-14 border-b border-border">
        <Container>
          <Breadcrumb items={[{ label: "International Travellers" }]} />
          <h1 className="text-3xl md:text-5xl font-bold text-dark leading-tight max-w-4xl">
            International Cab Service in India –{" "}
            <span className="text-primary">Private Car with Driver for Global Visitors</span>
          </h1>
          <p className="text-gray-text text-lg mt-4 max-w-3xl leading-relaxed">
            Visiting India from the USA, UK, Canada, Australia, UAE, Singapore or Europe? GoIndiaCab offers
            private car rental with professional English-speaking drivers for Delhi airport transfers,
            city sightseeing, and outstation travel across India. Select your country below or search above to book instantly.
          </p>
        </Container>
      </div>

      <Container className="py-14 md:py-20">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {perks.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-start gap-3 rounded-xl border border-border p-4 shadow-sm">
              <span className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5" />
              </span>
              <span className="text-dark font-medium leading-snug">{text}</span>
            </li>
          ))}
        </ul>

        {/* SEO content block */}
        <div className="max-w-4xl mb-14 space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-dark">
            Why International Travellers Choose GoIndiaCab
          </h2>
          <p className="text-gray-text text-lg leading-relaxed">
            GoIndiaCab is a trusted <strong>international car rental service in India</strong> serving visitors
            from over 20 countries. Whether you need a <strong>chauffeur service in India</strong> for a business
            trip, a <strong>Delhi airport transfer</strong> after a long-haul flight, or a private car for the
            Golden Triangle tour, our fleet of sedans, SUVs, and Innova Crysta vehicles is ready.
          </p>
          <p className="text-gray-text text-lg leading-relaxed">
            Every booking includes transparent pricing with no hidden charges, real-time GPS tracking, and
            24/7 customer support — so you travel with complete peace of mind from the moment you land.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
            {[
              "Private car with driver in Delhi India",
              "International car rental India",
              "Delhi airport transfer for foreign visitors",
              "Chauffeur service India – English-speaking drivers",
              "Outstation cab service from Delhi",
              "India private driver service for NRIs",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-dark font-medium">
                <span className="text-primary mt-1">✓</span> {item}
              </li>
            ))}
          </ul>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-dark mb-6">Choose your country</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {internationalPages.map((p) => (
            <Link
              key={p.locale}
              href={internationalHref(p.locale)}
              className="group flex items-center justify-between gap-3 rounded-xl border border-border p-5 hover:border-primary hover:shadow-md transition"
            >
              <span className="flex items-center gap-3 min-w-0">
                <span className="text-3xl" aria-hidden="true">{p.flag}</span>
                <span className="min-w-0">
                  <span className="block font-bold text-dark group-hover:text-primary truncate">{p.country}</span>
                  <span className="block text-sm text-gray-text">{p.metaDescriptionShort || `Private car with driver in India from ${p.short}`}</span>
                </span>
              </span>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition shrink-0" />
            </Link>
          ))}
        </div>

        {/* Internal linking section */}
        <div className="mt-16 pt-10 border-t border-border">
          <h2 className="text-xl font-bold text-dark mb-4">Explore More Travel Options in India</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Delhi Airport Taxi", href: "/airport-taxi-in-delhi" },
              { label: "Cab Service in Delhi", href: "/cab-service-in-delhi" },
              { label: "Outstation Taxi Routes", href: "/taxi" },
              { label: "Golden Triangle Tour Package", href: "/taxi-package/golden-triangle" },
              { label: "Delhi to Agra Cab", href: "/delhi-to-agra-cab-service" },
              { label: "Tempo Traveller on Rent", href: "/tempo-traveller-on-rent-in-delhi" },
              { label: "Bus Rental in Delhi", href: "/bus-rental-in-delhi" },
              { label: "Popular Routes", href: "/popular-routes" },
              { label: "Contact Us", href: "/contact-us" },
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
        </div>
      </Container>
    </div>
  );
}
