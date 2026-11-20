import { Metadata } from "next";
import { siteConfig } from "@/src/config/site";
import { CabSearchWidget } from "@/src/components/home/CabSearchWidget";
import { OffersSection } from "@/src/components/home/OffersSection";
import { AboutSection } from "@/src/components/home/AboutSection";
import { ServicesSection } from "@/src/components/home/ServicesSection";
import { TaxiServicesSection } from "@/src/components/home/TaxiServicesSection";
import { FleetSection } from "@/src/components/home/FleetSection";
import { PopularRoutesSection } from "@/src/components/home/PopularRoutesSection";
import { StatsSection } from "@/src/components/home/StatsSection";
import { ContactFormSection } from "@/src/components/home/ContactFormSection";
import { FAQSection } from "@/src/components/faq/FAQSection";
import { ReviewsSection } from "@/src/components/home/ReviewsSection";
import { TrustedSection } from "@/src/components/home/TrustedSection";
import { QuickLinksSection } from "@/src/components/home/QuickLinksSection";
import { homeFaqs } from "@/src/data/faqs";
import { WelcomePopup } from "@/src/components/common/WelcomePopup";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cab Service in India | Local & Outstation Cabs – Go India Cab",
  description:
    "Book cab services across India with Go India Cab. Choose one-way, round-trip, local and airport taxis, compare vehicle options and request a clear fare quote.",
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: "Cab Service in India | Local & Outstation Cabs – Go India Cab",
    description:
      "Book cab services across India with Go India Cab. Choose one-way, round-trip, local and airport taxis, compare vehicle options and request a clear fare quote.",
    url: siteConfig.url,
    siteName: siteConfig.fullName,
    type: "website",
  },
};

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        "name": siteConfig.fullName,
        "url": siteConfig.url,
        "logo": {
          "@type": "ImageObject",
          "url": `${siteConfig.url}${siteConfig.logo}`
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": siteConfig.phone.booking1,
          "contactType": "customer support",
          "availableLanguage": "en"
        },
        "email": siteConfig.email,
        "sameAs": [
          siteConfig.social.facebook,
          siteConfig.social.instagram,
          siteConfig.social.twitter,
          siteConfig.social.linkedin
        ]
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        "url": siteConfig.url,
        "name": siteConfig.fullName,
        "publisher": { "@id": `${siteConfig.url}/#organization` }
      },
      {
        "@type": "WebPage",
        "@id": `${siteConfig.url}/#webpage`,
        "url": siteConfig.url,
        "name": "Cab Service in India | Local & Outstation Cabs – Go India Cab",
        "description": "Book cab services across India with Go India Cab. Choose one-way, round-trip, local and airport taxis, compare vehicle options and request a clear fare quote.",
        "isPartOf": { "@id": `${siteConfig.url}/#website` }
      },
      {
        "@type": "TaxiService",
        "@id": `${siteConfig.url}/#service`,
        "name": siteConfig.fullName,
        "url": siteConfig.url,
        "telephone": siteConfig.phone.booking1,
        "email": siteConfig.email,
        "areaServed": { "@type": "Country", "name": "India" },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "WZ- 69, First Floor Todapur Periphery Rd, Todapur",
          "addressLocality": "New Delhi",
          "addressRegion": "Delhi",
          "postalCode": "110012",
          "addressCountry": "IN"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": siteConfig.googleRating,
          "reviewCount": siteConfig.googleReviewCount.replace('+', ''),
          "bestRating": "5"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Cab Services",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Outstation Cab Service" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "One-Way Cab Service" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Round-Trip Taxi" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Local Cab and Hourly Rental" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Airport Taxi Service" } }
          ]
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What cab services does Go India Cab provide?",
            "acceptedAnswer": { "@type": "Answer", "text": "Go India Cab provides outstation, one-way, round-trip, local hourly and airport cab services across India." }
          },
          {
            "@type": "Question",
            "name": "Can I book a one-way cab from Delhi to another city?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes. Enter your destination and travel date on the booking widget to check one-way availability and fare conditions for supported routes." }
          },
          {
            "@type": "Question",
            "name": "How do I know what is included in the cab fare?",
            "acceptedAnswer": { "@type": "Answer", "text": "Ask for a fare breakup before confirming. It should clarify fuel, driver allowance, tolls, parking, state taxes, waiting time and any additional charges." }
          },
          {
            "@type": "Question",
            "name": "Does Go India Cab provide airport pickup and drop?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes. Airport transfers can be requested for supported airports. Share flight details, terminal, pickup time and destination, then confirm waiting and parking terms." }
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Semantic H1 for SEO – visually integrated into the hero via CabSearchWidget */}
      <h1 className="sr-only">Cab Service in India for Local, Airport &amp; Outstation Travel</h1>
      <CabSearchWidget />
      <OffersSection />
      <AboutSection />
      <ServicesSection />
      <TaxiServicesSection />
      <FleetSection />
      <PopularRoutesSection />
      <StatsSection />
      <ContactFormSection />
      <FAQSection faqs={homeFaqs} />
      <ReviewsSection />

      {/* NRI & International Visitors Section */}
      <section className="py-14 bg-white border-t border-gray-100">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4">
              Cab Travel for NRIs and International Visitors
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Returning to India or visiting from overseas? Plan airport pickups, local transfers and intercity journeys in advance. Share flight details, destination, travel dates and passenger requirements so the booking team can confirm pickup instructions, vehicle availability and fare.
            </p>
            <Link
              href="/go-india-cab-the-perfect-travel-partner-for-nris-and-international-tourists"
              className="inline-flex items-center gap-2 text-[#0B4A9C] font-bold underline underline-offset-2 hover:text-[#083875] transition-colors"
            >
              Read our guide for NRIs and international visitors →
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-14 bg-[#0B4A9C]">
        <div className="max-w-[1400px] mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
            Plan Your Next Journey
          </h2>
          <p className="text-blue-100 leading-relaxed mb-8 max-w-2xl mx-auto">
            Tell us where you are travelling, when you want to leave and how many people are travelling. Request a suitable cab option and review the fare before confirming.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#search"
              className="inline-flex items-center gap-2 bg-[#FF6600] hover:bg-[#e65200] text-white font-bold px-8 py-3.5 rounded-xl shadow-lg transition-all"
            >
              Search Cabs
            </a>
            <a
              href={`tel:${siteConfig.phone.booking1}`}
              className="inline-flex items-center gap-2 border border-white/40 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-all"
            >
              Call {siteConfig.phone.booking1}
            </a>
            <a
              href="https://wa.me/919792000555"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold px-8 py-3.5 rounded-xl transition-all"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      <TrustedSection />
      <QuickLinksSection />
      <WelcomePopup />
    </>
  );
}
