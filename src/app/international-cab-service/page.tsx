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
const TITLE = "Cab Service in India for International Travellers | GoIndiaCab";
const DESCRIPTION =
  "Safe, reliable and affordable cab service in India for travellers from the USA, UK, Canada, Australia, Europe, Singapore, UAE and more. Airport pickup, city taxis and outstation trips with English-speaking drivers.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL, siteName: siteConfig.fullName, type: "website" },
};

const perks = [
  { icon: Plane, text: "Airport pickup with flight tracking" },
  { icon: ShieldCheck, text: "Background-checked, English-speaking drivers" },
  { icon: MapPinned, text: "GPS-tracked cars and clear pricing" },
  { icon: Headphones, text: "24/7 customer support" },
];

export default function InternationalHubPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: TITLE,
    url: URL,
    hasPart: internationalPages.map((p) => ({
      "@type": "WebPage",
      name: p.h1,
      url: `${siteConfig.url}${internationalHref(p.locale)}`,
    })),
  };

  return (
    <div className="bg-white">
      <JsonLd data={jsonLd} />

      <CabSearchWidget />

      <div className="bg-gray-light py-10 md:py-14 border-b border-border">
        <Container>
          <Breadcrumb items={[{ label: "International Travellers" }]} />
          <h1 className="text-3xl md:text-5xl font-bold text-dark leading-tight max-w-4xl">
            Cab Service in India for <span className="text-primary">International Travellers</span>
          </h1>
          <p className="text-gray-text text-lg mt-4 max-w-3xl leading-relaxed">
            Landing in India from abroad? Pick your country to see how we look after travellers like you, from airport
            pickup to city taxis, outstation trips and business travel. Or use the search box above to book right away.
          </p>
        </Container>
      </div>

      <Container className="py-14 md:py-20">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {perks.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-start gap-3 rounded-xl border border-border p-4 shadow-sm">
              <span className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0"><Icon className="w-5 h-5" /></span>
              <span className="text-dark font-medium leading-snug">{text}</span>
            </li>
          ))}
        </ul>

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
                  <span className="block text-sm text-gray-text">Cab service in India from {p.short}</span>
                </span>
              </span>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition shrink-0" />
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
