import { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/src/config/site";
import { Container } from "@/src/components/common/Container";
import { Breadcrumb } from "@/src/components/common/Breadcrumb";
import { Button } from "@/src/components/common/Button";
import { BookingForm } from "@/src/components/booking/BookingForm";
import { FAQSection } from "@/src/components/faq/FAQSection";
import { cityPages } from "@/src/data/cityPages";
import { ShieldCheck, Car, Clock, Phone, CheckCircle2, Star, MapPin, Award, Headphones } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CabSearchWidget } from "@/src/components/home/CabSearchWidget";

export function generateStaticParams() {
  return cityPages.map((p) => ({ slug: p.slug }));
}

function renderContent(content: string) {
  const lines = content.split("\n").filter((l) => l.trim() !== "");
  const elements: React.ReactNode[] = [];
  let listItems: string[] = [];

  const flushList = (key: string) => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={key} className="space-y-2 my-3">
          {listItems.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-gray-text">
              <CheckCircle2 className="w-4 h-4 text-[#00A5D9] mt-1 flex-shrink-0" />
              <span>{item.replace(/^[•\-]\s*/, "")}</span>
            </li>
          ))}
        </ul>
      );
      listItems = [];
    }
  };

  lines.forEach((line, i) => {
    const isBullet = /^[•\-]\s/.test(line.trim());
    const isNumbered = /^\d+\.\s/.test(line.trim());
    if (isBullet) {
      listItems.push(line.trim());
    } else if (isNumbered) {
      flushList(`list-${i}`);
      elements.push(
        <div key={i} className="flex items-start gap-3 mb-2">
          <span className="w-6 h-6 rounded-full bg-[#00A5D9] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
            {line.trim().match(/^(\d+)/)?.[1]}
          </span>
          <span className="text-gray-text">{line.trim().replace(/^\d+\.\s*/, "")}</span>
        </div>
      );
    } else {
      flushList(`list-${i}`);
      elements.push(<p key={i} className="mb-3 text-gray-text leading-relaxed">{line}</p>);
    }
  });
  flushList("list-end");
  return elements;
}

function formatSlug(slug: string): string {
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cityPage = cityPages.find((p) => p.slug === slug);

  if (cityPage) {
    return {
      title: cityPage.metaTitle,
      description: cityPage.metaDescription,
      alternates: { canonical: `${siteConfig.url}/${slug}/` },
      openGraph: {
        title: cityPage.metaTitle,
        description: cityPage.metaDescription,
        images: [{ url: cityPage.image }],
      },
    };
  }

  const title = formatSlug(slug);
  return {
    title: `${title} | Go India Cab`,
    description: `Book reliable ${title} with Go India Cab. 24x7 customer support, clean cabs, professional drivers.`,
    alternates: { canonical: `${siteConfig.url}/${slug}` },
  };
}

export default async function GenericCityServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cityPage = cityPages.find((p) => p.slug === slug);

  // ── Rich City Page ──────────────────────────────────────────────────────────
  if (cityPage) {
    return (
      <div className="bg-white min-h-screen">
        <CabSearchWidget />

        {/* Hero */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 py-12 md:py-16 text-white border-b border-gray-800">
          <Container>
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: cityPage.city, href: `/${slug}` },
                { label: "Cab Service" },
              ]}
            />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-6">
              <div className="lg:col-span-7 space-y-5">
                <span className="inline-flex items-center gap-2 bg-[#00A5D9]/20 border border-[#00A5D9]/40 text-[#38bdf8] text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full">
                  <Car className="w-4 h-4" />
                  Go India Cab – {cityPage.city}
                </span>
                <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
                  {cityPage.h1}
                </h1>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                  {cityPage.description}
                </p>
                <div className="flex flex-wrap gap-3 pt-1">
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/15">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="text-xs font-bold text-white">4.8 / 5 Rated</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/15">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold text-white">Transparent Fares</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/15">
                    <Headphones className="w-4 h-4 text-[#38bdf8]" />
                    <span className="text-xs font-bold text-white">24/7 Support</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 pt-1">
                  <Link href="#book">
                    <Button size="lg" className="bg-[#00A5D9] hover:bg-blue-600">Get {cityPage.city} Cab Fare</Button>
                  </Link>
                  <a href={`tel:${siteConfig.phone.booking1}`} className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white font-bold text-sm px-5 py-3 rounded-xl hover:bg-white/20 transition">
                    <Phone className="w-4 h-4" /> {siteConfig.phone.booking1}
                  </a>
                </div>
              </div>
              <div className="lg:col-span-5 relative h-[280px] md:h-[380px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={cityPage.image}
                  alt={`Cab Service in ${cityPage.city} – Go India Cab`}
                  fill
                  sizes="(max-width: 768px) 100vw, 42vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </Container>
        </div>

        {/* Fleet Cards */}
        <div className="bg-gray-50 border-b border-border py-10">
          <Container>
            <h2 className="text-xl font-black text-dark mb-6">Vehicle Options for {cityPage.city}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { badge: "Economy / Executive", badgeColor: "bg-blue-100 text-[#00A5D9]", btnColor: "bg-[#00A5D9] hover:bg-blue-600", title: "Sedan Cab", sub: "Dzire, Etios or equivalent", specs: ["4 Passengers", "2 Luggage Bags", "Full AC"] },
                { badge: "Family / Spacious", badgeColor: "bg-orange-100 text-[#FF6600]", btnColor: "bg-[#FF6600] hover:bg-orange-600", title: "SUV / Ertiga", sub: "Ertiga, Carens or equivalent", specs: ["6 Passengers", "4 Luggage Bags", "Dual AC"] },
                { badge: "Premium / Group", badgeColor: "bg-purple-100 text-purple-700", btnColor: "bg-purple-700 hover:bg-purple-800", title: "Innova Crysta / Tempo", sub: "Innova Crysta, 12–26 Seater Tempo", specs: ["7–26 Passengers", "Extra Luggage", "Luxury Seats"] },
              ].map((car, i) => (
                <div key={i} className="bg-white rounded-2xl border border-border p-5 shadow-sm space-y-3 flex flex-col justify-between">
                  <div>
                    <span className={`${car.badgeColor} text-[10px] font-black px-2.5 py-1 rounded-full uppercase`}>{car.badge}</span>
                    <h3 className="text-base font-black text-dark mt-2">{car.title}</h3>
                    <p className="text-xs text-gray-text font-medium">{car.sub}</p>
                    <ul className="mt-3 space-y-1.5 text-xs text-dark">
                      {car.specs.map((s, si) => (
                        <li key={si} className="flex items-center gap-2 font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <a href={`tel:${siteConfig.phone.booking1}`} className={`w-full py-2.5 ${car.btnColor} text-white font-extrabold text-xs text-center rounded-xl transition block`}>
                    Book {car.title}
                  </a>
                </div>
              ))}
            </div>
          </Container>
        </div>

        {/* Main Content */}
        <Container className="py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            <div className="lg:col-span-2 space-y-12">
              {cityPage.contentSections && cityPage.contentSections.map((section, index) => (
                <section key={index} className="scroll-mt-20">
                  <h2 className="text-2xl sm:text-3xl font-black text-dark mb-5">{section.title}</h2>

                  {section.content && (
                    <div className="text-base max-w-none">
                      {renderContent(section.content)}
                    </div>
                  )}

                  {section.subsections && section.subsections.length > 0 && (
                    <div className="mt-6 space-y-5">
                      {section.subsections.map((subsection, subIndex) => (
                        <div key={subIndex} className="bg-gray-50 p-6 rounded-xl border border-border">
                          <h3 className="text-xl font-black text-dark mb-3">{subsection.title}</h3>
                          {subsection.content && (
                            <div className="text-sm">
                              {renderContent(subsection.content)}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              ))}

              {/* Internal Links — dynamic per city page */}
              {cityPage.slug === "delhi-to-agra-cab-service" && (
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 space-y-3">
                  <h3 className="font-black text-dark text-base">Related Routes &amp; Services</h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link href="/popular-routes/cab-service-in-agra" className="text-[#00A5D9] hover:underline font-semibold">
                        Agra Local Sightseeing Cab →
                      </Link>
                      <span className="text-gray-text ml-2">Local cab for Taj Mahal, Agra Fort and city sightseeing</span>
                    </li>
                    <li>
                      <Link href="/taxi/rajasthan-taxi-service-from-delhi" className="text-[#00A5D9] hover:underline font-semibold">
                        Delhi to Jaipur Cab →
                      </Link>
                      <span className="text-gray-text ml-2">Golden Triangle: Delhi–Agra–Jaipur (~280 km)</span>
                    </li>
                    <li>
                      <Link href="/taxi/uttar-pradesh-taxi-service-from-delhi" className="text-[#00A5D9] hover:underline font-semibold">
                        Delhi to Mathura &amp; Vrindavan Cab →
                      </Link>
                      <span className="text-gray-text ml-2">Combine with Agra for a multi-stop UP tour</span>
                    </li>
                    <li>
                      <Link href="/popular-routes" className="text-[#00A5D9] hover:underline font-semibold">
                        All Popular Routes →
                      </Link>
                      <span className="text-gray-text ml-2">Browse all outstation routes covered by Go India Cab</span>
                    </li>
                  </ul>
                </div>
              )}
              {cityPage.slug === "cab-service-in-varanasi" && (
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 space-y-3">
                  <h3 className="font-black text-dark text-base">Related Routes &amp; Services</h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link href="/popular-routes/cab-service-in-varanasi" className="text-[#00A5D9] hover:underline font-semibold">
                        Delhi to Varanasi Cab Service →
                      </Link>
                      <span className="text-gray-text ml-2">Intercity transfer from Delhi to Varanasi (~820 km)</span>
                    </li>
                    <li>
                      <Link href="/popular-routes/cab-service-in-ayodhya" className="text-[#00A5D9] hover:underline font-semibold">
                        Varanasi to Ayodhya Cab →
                      </Link>
                      <span className="text-gray-text ml-2">Pilgrimage route to Ayodhya from Varanasi</span>
                    </li>
                    <li>
                      <Link href="/popular-routes" className="text-[#00A5D9] hover:underline font-semibold">
                        All Popular Routes →
                      </Link>
                      <span className="text-gray-text ml-2">Browse all outstation routes covered by Go India Cab</span>
                    </li>
                  </ul>
                </div>
              )}

              {cityPage.faqs && cityPage.faqs.length > 0 && (
                <div className="pt-8 border-t border-border">
                  <FAQSection
                    faqs={cityPage.faqs}
                    title="Frequently Asked Questions"
                    subtitle={`Common queries about cab service in ${cityPage.city}.`}
                  />
                </div>
              )}
            </div>

            <div className="lg:col-span-1" id="book">
              <div className="sticky top-28 space-y-6">
                <BookingForm variant="sidebar" />
                <div className="bg-gradient-to-br from-[#00A5D9] to-blue-700 rounded-2xl p-6 text-white text-center space-y-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                    <Phone className="w-6 h-6" />
                  </div>
                  <p className="font-black text-lg">Need Instant Booking?</p>
                  <p className="text-xs text-blue-100 leading-relaxed">Call our team for a fare estimate and quick driver assignment.</p>
                  <a href={`tel:${siteConfig.phone.booking1}`} className="block w-full py-3 bg-white text-[#00A5D9] font-black text-sm uppercase rounded-xl hover:bg-gray-100 transition">
                    Call {siteConfig.phone.booking1}
                  </a>
                </div>
                <div className="bg-gray-50 p-5 rounded-2xl border border-border space-y-3">
                  <h4 className="font-extrabold text-sm text-dark">Why Go India Cab?</h4>
                  <ul className="space-y-2 text-xs text-dark font-semibold">
                    {["Instant WhatsApp & Call Booking", "Multiple payment options (Cash/UPI/Cards)", "Clean & sanitized AC vehicles", "Doorstep pickup & drop-off"].map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </Container>
      </div>
    );
  }

  // ── Generic Fallback Page ───────────────────────────────────────────────────
  const formattedTitle = formatSlug(slug);

  const cityFaqs = [
    {
      question: `How can I book ${formattedTitle}?`,
      answer: `You can book ${formattedTitle} online via Go India Cab website or by calling our 24x7 helpline at ${siteConfig.phone.booking1}.`,
    },
    {
      question: `What types of vehicles are available for ${formattedTitle}?`,
      answer: `We offer Sedans (Dzire/Etios), SUVs (Ertiga/Innova Crysta), Luxury Cabs and Tempo Travellers.`,
    },
    {
      question: `Are driver charges included in the fare?`,
      answer: `Standard driver charges and fuel costs are included in the base fare. Tolls, state taxes and GST are charged extra as per actual receipts.`,
    },
    {
      question: `Is 24/7 customer support available?`,
      answer: `Our customer support team is available round-the-clock to assist with booking queries, trip tracking and emergency help.`,
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      <CabSearchWidget />

      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 py-12 md:py-16 text-white border-b border-gray-800 relative overflow-hidden">
        <Container>
          <div className="relative z-10">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: formattedTitle },
              ]}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-6">
              <div className="lg:col-span-7 space-y-4">
                <span className="inline-flex items-center gap-2 bg-[#00A5D9]/20 border border-[#00A5D9]/40 text-[#38bdf8] text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full">
                  <Car className="w-4 h-4" />
                  Go India Cab Premier Service
                </span>

                <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
                  {formattedTitle}
                </h1>

                <p className="text-gray-300 text-sm sm:text-base font-medium leading-relaxed max-w-2xl">
                  Looking for reliable, comfortable cab booking? Go India Cab provides top-rated local, outstation, airport transfer and rental taxi services with verified professional drivers.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/15">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="text-xs font-bold text-white">4.8 / 5 Rated Service</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/15">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold text-white">Transparent Fares</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/15">
                    <Headphones className="w-4 h-4 text-[#38bdf8]" />
                    <span className="text-xs font-bold text-white">24/7 Support</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <BookingForm variant="hero" />
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          <div className="lg:col-span-8 space-y-12">

            <section className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
                Why Choose Go India Cab for {formattedTitle}?
              </h2>
              <p className="text-gray-600 text-base leading-relaxed">
                Whether you need a quick airport transfer, a local hourly rental or an outstation round-trip journey, Go India Cab ensures a seamless travel experience with clean vehicles, courteous drivers and transparent pricing.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {[
                  { icon: <CheckCircle2 className="w-5 h-5" />, color: "bg-[#00A5D9]", bg: "bg-blue-50/60 border-blue-100", title: "Clean & Well-Maintained Cabs", desc: "All cabs undergo quality checks before every pickup." },
                  { icon: <Clock className="w-5 h-5" />, color: "bg-[#FF6600]", bg: "bg-orange-50/60 border-orange-100", title: "Punctual Pickup", desc: "On-time doorstep pickup so you never miss a flight or train." },
                  { icon: <Award className="w-5 h-5" />, color: "bg-emerald-600", bg: "bg-emerald-50/60 border-emerald-100", title: "Experienced Drivers", desc: "Background-verified drivers familiar with local and highway routes." },
                  { icon: <ShieldCheck className="w-5 h-5" />, color: "bg-purple-600", bg: "bg-purple-50/60 border-purple-100", title: "Transparent Billing", desc: "Clear fare structure with no surprise charges." },
                ].map((item, i) => (
                  <div key={i} className={`p-5 rounded-2xl border ${item.bg} space-y-2`}>
                    <div className={`w-10 h-10 rounded-xl ${item.color} text-white flex items-center justify-center`}>
                      {item.icon}
                    </div>
                    <h3 className="font-extrabold text-base text-gray-900">{item.title}</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-6 pt-4">
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
                Available Fleet for {formattedTitle}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { badge: "Economy / Executive", badgeColor: "bg-blue-100 text-[#00A5D9]", btnColor: "bg-[#00A5D9] hover:bg-blue-600", title: "Sedan Cab", sub: "Dzire, Etios or equivalent", specs: ["4 Passengers", "2 Luggage Bags", "Full AC Comfort"] },
                  { badge: "Family / Spacious", badgeColor: "bg-orange-100 text-[#FF6600]", btnColor: "bg-[#FF6600] hover:bg-orange-600", title: "SUV / Ertiga", sub: "Ertiga, Carens or equivalent", specs: ["6 Passengers", "4 Luggage Bags", "Dual AC Comfort"] },
                  { badge: "Premium / Group", badgeColor: "bg-purple-100 text-purple-700", btnColor: "bg-purple-700 hover:bg-purple-800", title: "Innova Crysta / Tempo", sub: "Innova Crysta, 12–26 Seater Tempo", specs: ["7–26 Passengers", "Extra Luggage Space", "Luxury Seats"] },
                ].map((car, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-3 flex flex-col justify-between">
                    <div>
                      <span className={`${car.badgeColor} text-[10px] font-black px-2.5 py-1 rounded-full uppercase`}>{car.badge}</span>
                      <h3 className="text-lg font-black text-gray-900 mt-2">{car.title}</h3>
                      <p className="text-xs text-gray-500 font-medium">{car.sub}</p>
                      <ul className="mt-3 space-y-1.5 text-xs text-gray-700">
                        {car.specs.map((s, si) => (
                          <li key={si} className="flex items-center gap-2 font-bold">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <a href={`tel:${siteConfig.phone.booking1}`} className={`w-full py-2.5 ${car.btnColor} text-white font-extrabold text-xs text-center rounded-xl transition block`}>
                      Book {car.title}
                    </a>
                  </div>
                ))}
              </div>
            </section>

            <div className="pt-6 border-t border-gray-200">
              <FAQSection faqs={cityFaqs} title="Frequently Asked Questions" subtitle={`Got questions about ${formattedTitle}? We have answers.`} />
            </div>

          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              <div className="bg-gradient-to-br from-[#00A5D9] to-blue-700 rounded-2xl p-6 text-white shadow-xl text-center space-y-4">
                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                  <Phone className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-black">Need Instant Booking?</h3>
                <p className="text-xs text-blue-100 font-medium leading-relaxed">
                  Call our team for an instant fare estimate and quick driver assignment.
                </p>
                <a href={`tel:${siteConfig.phone.booking1}`} className="block w-full py-3 bg-white text-[#00A5D9] font-black text-sm uppercase rounded-xl hover:bg-gray-100 transition shadow-md">
                  Call {siteConfig.phone.booking1}
                </a>
              </div>

              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 space-y-3">
                <h4 className="font-extrabold text-sm text-gray-900">Why Go India Cab?</h4>
                <ul className="space-y-2 text-xs text-gray-700 font-semibold">
                  {["Instant WhatsApp & Call Booking", "Multiple payment options (Cash/UPI/Cards)", "Clean & sanitized AC vehicles", "Doorstep pickup & drop-off"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </div>
  );
}
