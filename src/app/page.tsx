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
      <TrustedSection />
      <QuickLinksSection />
      <WelcomePopup />
    </>
  );
}
