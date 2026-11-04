import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ShieldCheck, Plane, Building2, Route as RouteIcon, Briefcase, Check, Phone, ArrowRight, Globe2, Sparkles,
} from "lucide-react";
import { siteConfig } from "@/src/config/site";
import { Container } from "@/src/components/common/Container";
import { Breadcrumb } from "@/src/components/common/Breadcrumb";
import { CabSearchWidget } from "@/src/components/home/CabSearchWidget";
import { FAQSection } from "@/src/components/faq/FAQSection";
import { JsonLd } from "@/src/components/seo/JsonLd";
import {
  internationalPages, getInternationalPage, internationalHref,
  type PageBlock, type PageSection, type SectionKind,
} from "@/src/data/internationalPages";

// Only the locales in the data file exist (/en-us/..., /en-gb/..., ...). Any other first segment is a 404.
export const dynamicParams = false;
export function generateStaticParams() {
  return internationalPages.map((p) => ({ slug: p.locale }));
}

const absolute = (locale: string) => `${siteConfig.url}${internationalHref(locale)}`;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getInternationalPage(slug);
  if (!page) return {};

  const hasCorporate = page.sections.some((s) => s.kind === "corporate");
  const title = `${page.h1} | GoIndiaCab`;
  const description =
    `Safe, reliable and affordable cab service in India for ${page.short} travellers. Airport pickup, city taxis, outstation trips` +
    `${hasCorporate ? " and corporate cars" : ""} with English-speaking drivers, GPS tracking and clear pricing. Book online.`;
  const url = absolute(page.locale);

  return {
    title,
    description,
    keywords: [
      page.h1.toLowerCase(),
      `taxi service in India from ${page.short}`,
      `cab booking in India for ${page.short} travellers`,
      "private car with driver Delhi India",
      `airport taxi service in India for ${page.short} travellers`,
    ],
    alternates: {
      canonical: url,
      // hreflang: every country page points at all the others
      languages: Object.fromEntries(
        internationalPages.map((p) => [`en-${p.code.toUpperCase()}`, absolute(p.locale)])
      ),
    },
    openGraph: { title, description, url, siteName: siteConfig.fullName, locale: `en_${page.code.toUpperCase()}`, type: "website" },
  };
}

// Every href points at a page that already exists on the site.
const CITY_LINKS: Record<string, string> = {
  Agra: "/popular-routes/cab-service-in-agra",
  Jaipur: "/popular-routes/cab-service-in-jaipur",
  Varanasi: "/popular-routes/cab-service-in-varanasi",
  Ayodhya: "/popular-routes/cab-service-in-ayodhya",
  Delhi: "/cab-service-in-delhi",
  Punjab: "/taxi/punjab-taxi-service-from-delhi",
};

const SECTION_ICON: Partial<Record<SectionKind, typeof Plane>> = {
  why: ShieldCheck,
  airport: Plane,
  city: Building2,
  outstation: RouteIcon,
  corporate: Briefcase,
};

const SECTION_LINKS: Partial<Record<SectionKind, { label: string; href: string }[]>> = {
  airport: [{ label: "Book an airport taxi in Delhi", href: "/airport-taxi-in-delhi" }],
  city: [{ label: "Cab service in Delhi", href: "/cab-service-in-delhi" }],
  outstation: [
    { label: "Outstation taxi routes", href: "/taxi" },
    { label: "Tour packages", href: "/taxi-package" },
    { label: "Popular routes", href: "/popular-routes" },
  ],
  corporate: [{ label: "About GoIndiaCab", href: "/about-us" }],
};

function Blocks({ blocks, kind }: { blocks: PageBlock[]; kind: SectionKind }) {
  return (
    <>
      {blocks.map((b, i) => {
        if (b.t === "p") return <p key={i} className="text-gray-text text-lg leading-relaxed mt-4 first:mt-0">{b.text}</p>;
        if (b.t === "h3") return <h3 key={i} className="text-lg font-bold text-dark mt-7">{b.text}</h3>;
        if (b.t === "cities") {
          return (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
              {b.items.map((c) => {
                const body = (
                  <>
                    <span>
                      <span className="block font-bold text-dark group-hover:text-primary">{c.name}</span>
                      {c.note && <span className="block text-sm text-gray-text">{c.note}</span>}
                    </span>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition shrink-0" />
                  </>
                );
                const cls = "group flex items-center justify-between gap-3 rounded-xl border border-border p-4 hover:border-primary hover:shadow-md transition";
                const href = CITY_LINKS[c.name];
                return href ? <Link key={c.name} href={href} className={cls}>{body}</Link> : <div key={c.name} className={cls}>{body}</div>;
              })}
            </div>
          );
        }
        // bullet list: cards for "Why choose", plain checklist elsewhere
        if (kind === "why") {
          return (
            <ul key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
              {b.items.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-xl border border-border bg-white p-4 shadow-sm">
                  <span className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0"><Check className="w-5 h-5" /></span>
                  <span className="text-dark font-medium leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          );
        }
        return (
          <ul key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            {b.items.map((item) => (
              <li key={item} className="flex items-start gap-3 text-dark font-medium">
                <Check className="w-5 h-5 text-accent mt-0.5 shrink-0" />{item}
              </li>
            ))}
          </ul>
        );
      })}
    </>
  );
}

function Section({ s }: { s: PageSection }) {
  const Icon = SECTION_ICON[s.kind];
  const links = SECTION_LINKS[s.kind];
  return (
    <section>
      {s.heading && (
        <div className="flex items-start gap-3 mb-4">
          {Icon && <Icon className="w-7 h-7 text-primary mt-1 shrink-0" />}
          <h2 className="text-2xl md:text-3xl font-bold text-dark">{s.heading}</h2>
        </div>
      )}
      <Blocks blocks={s.blocks} kind={s.kind} />
      {links && (
        <p className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-primary font-semibold hover:underline inline-flex items-center gap-1">
              {l.label} <ArrowRight className="w-4 h-4" />
            </Link>
          ))}
        </p>
      )}
    </section>
  );
}

export default async function InternationalCountryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getInternationalPage(slug);
  if (!page) notFound();

  const url = absolute(page.locale);
  const bookSection = page.sections.find((s) => s.kind === "book");
  const bookText = bookSection?.blocks.find((b) => b.t === "p");
  const body = page.sections.filter((s) => s.kind !== "book");
  const others = internationalPages.filter((p) => p.locale !== page.locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.h1,
    serviceType: "Taxi and private car with driver service",
    url,
    areaServed: { "@type": "Country", name: "India" },
    audience: { "@type": "Audience", audienceType: `Travellers from ${page.country}` },
    provider: {
      "@type": "Organization",
      name: siteConfig.fullName,
      url: siteConfig.url,
      telephone: siteConfig.phone.booking1,
      email: siteConfig.email,
    },
  };

  return (
    <div className="bg-white">
      <JsonLd data={jsonLd} />

      {/* Search: From / To opens the normal search results page */}
      <div id="top" className="scroll-mt-20">
        <CabSearchWidget />
      </div>

      {/* Heading */}
      <div className="bg-gray-light py-10 md:py-14 border-b border-border">
        <Container>
          <Breadcrumb
            items={[
              { label: "International Travellers", href: "/international-cab-service" },
              { label: page.h1 },
            ]}
          />
          <h1 className="text-3xl md:text-5xl font-bold text-dark leading-tight max-w-4xl">
            {page.h1}
            {page.h1Tagline && <> – <span className="text-primary">{page.h1Tagline}</span></>}
          </h1>
          <p className="text-gray-text text-lg mt-4 max-w-3xl leading-relaxed">
            Enter your pickup and drop in the search box above to see fares for a private car with driver in Delhi and across India.
          </p>
        </Container>
      </div>

      <Container className="py-14 md:py-20">
        <div className="max-w-4xl mx-auto space-y-16">
          {body.map((s, i) => <Section key={`${s.kind}-${i}`} s={s} />)}

          <section className="rounded-2xl bg-gray-light border border-border p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-dark mb-4">More ways to travel with us</h2>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Tempo Traveller on Rent", href: "/tempo-traveller-on-rent-in-delhi" },
                { label: "Bus Rental in Delhi", href: "/bus-rental-in-delhi" },
                { label: "Delhi to Agra Cab", href: "/delhi-to-agra-cab-service" },
                { label: "Delhi–Jaipur Same Day Tour", href: "/delhi-jaipur-same-day-tour" },
                { label: "Golden Triangle Package", href: "/taxi-package/golden-triangle" },
                { label: "Contact Us", href: "/contact-us" },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="rounded-full bg-white border border-border px-4 py-2 text-sm font-semibold text-dark hover:border-primary hover:text-primary transition">
                  {l.label}
                </Link>
              ))}
            </div>
          </section>
        </div>
      </Container>

      <FAQSection faqs={page.faqs.map((f) => ({ question: f.question, answer: f.answer }))} title={`FAQs – Cab Service in India for ${page.short} Travellers`} />

      {/* Closing CTA */}
      <section className="bg-slate-900 py-12 md:py-16">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <Sparkles className="w-10 h-10 text-primary mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-white">{bookSection?.heading || "Book Your Cab in India Today"}</h2>
            <p className="text-gray-300 mt-3">
              {bookText && bookText.t === "p"
                ? bookText.text
                : "Book your private car with driver online, or talk to our team any time of day or night."}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
              <a href="#top" className="rounded-xl bg-[#FF6600] hover:bg-[#e65200] text-white font-bold px-6 py-3 transition">Search &amp; Book a Cab</a>
              <a href={`tel:${siteConfig.phone.booking1}`} className="rounded-xl border border-white/30 text-white font-bold px-6 py-3 hover:bg-white/10 transition inline-flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" /> {siteConfig.phone.booking1}
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Internal links to every other country page */}
      <section className="bg-gray-light border-t border-border py-10">
        <Container>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-lg font-bold text-dark flex items-center gap-2 mb-4">
              <Globe2 className="w-5 h-5 text-primary" /> Travelling from another country?
            </h2>
            <div className="flex flex-wrap gap-2">
              {others.map((p) => (
                <Link key={p.locale} href={internationalHref(p.locale)} className="rounded-full bg-white border border-border px-3.5 py-1.5 text-sm font-medium text-dark hover:border-primary hover:text-primary transition">
                  <span aria-hidden="true">{p.flag}</span> {p.short}
                </Link>
              ))}
              <Link href="/international-cab-service" className="rounded-full bg-primary text-white px-3.5 py-1.5 text-sm font-semibold hover:opacity-90 transition">
                All countries
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
