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
  title: "Book Cab & Taxi Services Across India | GoIndiaCab",
  description: siteConfig.description,
  alternates: {
    canonical: siteConfig.url,
  }
};

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["TaxiService", "LocalBusiness"],
    "name": siteConfig.name,
    "url": siteConfig.url,
    "telephone": siteConfig.phone.booking1,
    "email": siteConfig.email,
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
      "reviewCount": siteConfig.googleReviewCount.replace('+', '')
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
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
