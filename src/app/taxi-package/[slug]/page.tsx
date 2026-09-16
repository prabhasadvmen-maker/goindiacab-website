import { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/src/config/site";
import { Container } from "@/src/components/common/Container";
import { Breadcrumb } from "@/src/components/common/Breadcrumb";
import { Button } from "@/src/components/common/Button";
import { BookingForm } from "@/src/components/booking/BookingForm";
import { FAQSection } from "@/src/components/faq/FAQSection";
import { taxiPackages } from "@/src/data/packages";
import { Check, X, Calendar, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function generateStaticParams() {
  return taxiPackages.map((pkg) => ({
    slug: pkg.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const pkg = taxiPackages.find((p) => p.slug === slug);
  
  if (!pkg) {
    return { title: "Package Not Found" };
  }

  return {
    title: `${pkg.title} | GoIndiaCab`,
    description: pkg.description,
    alternates: { canonical: `${siteConfig.url}/taxi-package/${pkg.slug}` },
    openGraph: {
      title: `${pkg.title} | GoIndiaCab`,
      description: pkg.description,
      images: [{ url: pkg.image }],
    }
  };
}

export default async function PackageDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pkg = taxiPackages.find((p) => p.slug === slug);
  
  if (!pkg) {
    notFound();
  }

  const isDelhiPackage = slug === "delhi" || slug === "delhi-same-day" || slug === "delhi-two-day";

  return (
    <div className="bg-white min-h-screen">
      
      {/* Clean Light Hero Section with Crisp Image Poster */}
      <div className="bg-gradient-to-b from-[#eef6fc] via-[#f8fafc] to-white py-10 md:py-14 border-b border-gray-200">
        <Container>
          <Breadcrumb 
            items={[
              { label: "Taxi Packages", href: "/taxi-package" },
              { label: pkg.title }
            ]} 
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-4">
            <div className="lg:col-span-7">
              <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight">
                {pkg.title}
              </h1>
              <p className="text-gray-600 text-base md:text-lg mt-4 leading-relaxed font-medium">
                {pkg.description}
              </p>
              
              <div className="flex flex-wrap items-center gap-3 mt-6">
                <span className="bg-[#00A5D9] text-white px-4 py-2 rounded-xl font-bold text-sm shadow-xs">
                  Duration: {pkg.duration}
                </span>
                <span className="bg-amber-500 text-white px-4 py-2 rounded-xl font-bold text-sm shadow-xs">
                  Fare: {pkg.fare}
                </span>
              </div>
            </div>

            {/* Poster Image Container */}
            <div className="lg:col-span-5 relative aspect-[16/10] w-full rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-slate-100">
              <Image 
                src={pkg.image} 
                alt={pkg.title} 
                fill 
                className="object-contain" 
                priority 
              />
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 space-y-12">
            
            {/* Overview Section */}
            <section>
              <h2 className="text-3xl font-black text-gray-900 mb-4">Overview</h2>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">{pkg.description}</p>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed mt-4">
                Our {pkg.title} covers major destinations including {pkg.destination}. We offer a variety of vehicles like {pkg.vehicles.join(", ")} to ensure a comfortable journey for you and your family.
              </p>
            </section>

            {/* Featured 2 Div Cards for Delhi Tour Packages */}
            {isDelhiPackage && (
              <section className="space-y-6 pt-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-[#00A5D9]" />
                  <h3 className="text-2xl font-black text-gray-900">Delhi Sightseeing Tour Packages</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Div 1: Delhi One Day Tour */}
                  <div className="bg-white rounded-3xl overflow-hidden border-4 border-[#e0e5ec] shadow-md hover:shadow-xl transition-all group flex flex-col justify-between">
                    <div>
                      <div className="relative aspect-[16/10] w-full bg-slate-100 border-b border-gray-100">
                        <Image
                          src="/all-tabs-image/Delhi-One-Day-Tour.jpg.webp"
                          alt="Delhi One Day Sightseeing Tour Package"
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                      <div className="p-5">
                        <span className="inline-block bg-[#00A5D9] text-white text-[11px] font-black px-3 py-1 rounded-full mb-2">
                          1 Day Tour
                        </span>
                        <h4 className="text-lg font-black text-gray-900 mb-2">
                          Delhi One Day Sightseeing Taxi Package
                        </h4>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          Complete 1-day Delhi sightseeing tour covering Red Fort, Qutub Minar, India Gate, Lotus Temple & local markets.
                        </p>
                      </div>
                    </div>

                    <div className="p-5 pt-0">
                      <a 
                        href="#book"
                        className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-[#00A5D9] hover:bg-blue-600 text-white font-extrabold text-xs transition shadow-xs"
                      >
                        <span>Book One Day Tour</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {/* Div 2: Delhi Two Days Tour */}
                  <div className="bg-white rounded-3xl overflow-hidden border-4 border-[#e0e5ec] shadow-md hover:shadow-xl transition-all group flex flex-col justify-between">
                    <div>
                      <div className="relative aspect-[16/10] w-full bg-slate-100 border-b border-gray-100">
                        <Image
                          src="/all-tabs-image/Delhi-Two-Day-Tour.jpg.webp"
                          alt="Delhi 2 Days Sightseeing Tour Package"
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                      <div className="p-5">
                        <span className="inline-block bg-[#f97316] text-white text-[11px] font-black px-3 py-1 rounded-full mb-2">
                          2 Days Tour
                        </span>
                        <h4 className="text-lg font-black text-gray-900 mb-2">
                          Delhi 2 Days Taxi Tour Package
                        </h4>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          Comprehensive 2-day sightseeing tour covering Old & New Delhi, Akshardham Temple, Humayun Tomb & Shopping.
                        </p>
                      </div>
                    </div>

                    <div className="p-5 pt-0">
                      <a 
                        href="#book"
                        className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-[#f97316] hover:bg-orange-600 text-white font-extrabold text-xs transition shadow-xs"
                      >
                        <span>Book 2 Days Tour</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                </div>
              </section>
            )}

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-emerald-50/60 p-6 rounded-2xl border border-emerald-200">
                <h3 className="text-xl font-black text-emerald-950 mb-4 flex items-center">
                  <Check className="w-6 h-6 text-emerald-600 mr-2" /> Inclusions
                </h3>
                <ul className="space-y-3">
                  {pkg.inclusions.map((item, i) => (
                    <li key={i} className="flex items-start text-emerald-900 font-semibold text-sm">
                      <Check className="w-4 h-4 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-rose-50/60 p-6 rounded-2xl border border-rose-200">
                <h3 className="text-xl font-black text-rose-950 mb-4 flex items-center">
                  <X className="w-6 h-6 text-rose-600 mr-2" /> Exclusions
                </h3>
                <ul className="space-y-3">
                  {pkg.exclusions.map((item, i) => (
                    <li key={i} className="flex items-start text-rose-900 font-semibold text-sm">
                      <X className="w-4 h-4 text-rose-600 mr-2 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Vehicles Available */}
            <div className="p-6 bg-blue-50/80 border border-blue-200 rounded-2xl">
              <h3 className="text-xl font-black text-blue-950 mb-3">Available Vehicles</h3>
              <div className="flex flex-wrap gap-2.5">
                {pkg.vehicles.map(v => (
                  <span key={v} className="bg-white px-4 py-2 rounded-xl text-[#00A5D9] font-black text-xs border border-blue-200 shadow-2xs">
                    {v}
                  </span>
                ))}
              </div>
            </div>

            {pkg.faqs && pkg.faqs.length > 0 && (
              <div className="pt-8 border-t border-gray-200">
                <FAQSection faqs={pkg.faqs} title="Package FAQs" subtitle="Common questions about this package" />
              </div>
            )}
          </div>

          {/* Right Sidebar Booking Form */}
          <div className="lg:col-span-1" id="book">
            <div className="sticky top-28">
              <BookingForm variant="sidebar" />
              <div className="mt-6 bg-gray-50 p-6 rounded-2xl border border-gray-200 text-center">
                <p className="text-xs text-gray-500 font-bold mb-1">Need a customized itinerary?</p>
                <p className="text-gray-900 font-black text-lg mb-4">Call our experts</p>
                <a href={`tel:${siteConfig.phone.booking1}`}>
                  <Button className="w-full text-base">{siteConfig.phone.booking1}</Button>
                </a>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </div>
  );
}