import { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/src/config/site";
import { Container } from "@/src/components/common/Container";
import { Breadcrumb } from "@/src/components/common/Breadcrumb";
import { BookingForm } from "@/src/components/booking/BookingForm";
import { FAQSection } from "@/src/components/faq/FAQSection";
import { ShieldCheck, Car, Clock, Phone, CheckCircle2, Star, MapPin, Award, Headphones } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function formatSlug(slug: string): string {
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const title = formatSlug(slug);

  return {
    title: `${title} | GoIndiaCab`,
    description: `Book reliable and affordable ${title} with GoIndiaCab. 24x7 customer support, clean cabs, professional drivers, and lowest guaranteed fares.`,
    alternates: { canonical: `${siteConfig.url}/${slug}` },
  };
}

export default async function GenericCityServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const formattedTitle = formatSlug(slug);

  const cityFaqs = [
    {
      question: `How can I book ${formattedTitle}?`,
      answer: `You can easily book ${formattedTitle} online via GoIndiaCab website or by calling our 24x7 helpline at ${siteConfig.phone.booking1}.`,
    },
    {
      question: `What types of vehicles are available for ${formattedTitle}?`,
      answer: `We offer a wide range of well-maintained vehicles including Sedans (Dzire/Etios), SUVs (Ertiga/Innova Crysta), Luxury Cabs, and Tempo Travellers.`,
    },
    {
      question: `Are driver charges included in the fare?`,
      answer: `Yes, all standard driver charges and fuel costs are included in the base fare. Tolls, state taxes, and GST are charged extra as per actual highway receipts.`,
    },
    {
      question: `Is 24/7 customer support available for bookings?`,
      answer: `Yes, our dedicated customer support team is available round-the-clock to assist you with booking queries, trip tracking, and emergency help.`,
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      
      {/* Top Hero Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 py-12 md:py-16 text-white border-b border-gray-800 relative overflow-hidden">
        <Container>
          <div className="relative z-10">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: formattedTitle }
              ]}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-6">
              <div className="lg:col-span-7 space-y-4">
                <span className="inline-flex items-center gap-2 bg-[#00A5D9]/20 border border-[#00A5D9]/40 text-[#38bdf8] text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full">
                  <Car className="w-4 h-4" />
                  GoIndiaCab Premier Service
                </span>

                <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
                  {formattedTitle}
                </h1>

                <p className="text-gray-300 text-sm sm:text-base font-medium leading-relaxed max-w-2xl">
                  Looking for reliable, comfortable, and affordable cab booking? GoIndiaCab provides top-rated local, outstation, airport transfer, and rental taxi services with verified professional drivers.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/15">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="text-xs font-bold text-white">4.8 / 5 Rated Service</span>
                  </div>

                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/15">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold text-white">Transparent Lowest Fares</span>
                  </div>

                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/15">
                    <Headphones className="w-4 h-4 text-[#38bdf8]" />
                    <span className="text-xs font-bold text-white">24/7 Support</span>
                  </div>
                </div>
              </div>

              {/* Booking Form in Hero */}
              <div className="lg:col-span-5">
                <BookingForm variant="hero" />
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Content Section */}
      <Container className="py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-8 space-y-12">
            
            {/* Service Highlights */}
            <section className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
                Why Choose GoIndiaCab for {formattedTitle}?
              </h2>
              <p className="text-gray-600 text-base leading-relaxed">
                Whether you need a quick airport transfer, a local hourly rental, or an outstation round-trip journey, GoIndiaCab ensures a seamless travel experience with clean vehicles, courteous drivers, and transparent pricing without hidden fees.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-[#00A5D9] text-white flex items-center justify-center font-bold">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-base text-gray-900">Sanitized & Clean Cabs</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    All our cabs undergo rigorous quality checks and thorough cleaning before every pickup.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-orange-50/60 border border-orange-100 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-[#FF6600] text-white flex items-center justify-center font-bold">
                    <Clock className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-base text-gray-900">100% On-Time Guarantee</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Punctual doorstep pickup ensuring you never miss a flight, train, or important meeting.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                    <Award className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-base text-gray-900">Experienced Drivers</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Background-verified, polite drivers familiar with highway navigation and local routes.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-purple-50/60 border border-purple-100 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-base text-gray-900">No Hidden Charges</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Clear fare structure with zero surprise surge prices during peak travel hours.
                  </p>
                </div>
              </div>
            </section>

            {/* Vehicle Fleet Cards */}
            <section className="space-y-6 pt-4">
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
                Available Fleet Options for {formattedTitle}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Sedan */}
                <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-3 flex flex-col justify-between">
                  <div>
                    <span className="bg-blue-100 text-[#00A5D9] text-[10px] font-black px-2.5 py-1 rounded-full uppercase">
                      Economy / Executive
                    </span>
                    <h3 className="text-lg font-black text-gray-900 mt-2">Sedan Cab</h3>
                    <p className="text-xs text-gray-500 font-medium">Dzire, Etios, Xcent or equivalent</p>
                    <ul className="mt-3 space-y-1.5 text-xs text-gray-700">
                      <li className="flex items-center gap-2 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> 4 Passengers
                      </li>
                      <li className="flex items-center gap-2 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> 2 Luggage Bags
                      </li>
                      <li className="flex items-center gap-2 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Full AC Comfort
                      </li>
                    </ul>
                  </div>
                  <a
                    href={`tel:${siteConfig.phone.booking1}`}
                    className="w-full py-2.5 bg-[#00A5D9] hover:bg-blue-600 text-white font-extrabold text-xs text-center rounded-xl transition shadow-xs block"
                  >
                    Book Sedan Cab
                  </a>
                </div>

                {/* SUV */}
                <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-3 flex flex-col justify-between">
                  <div>
                    <span className="bg-orange-100 text-[#FF6600] text-[10px] font-black px-2.5 py-1 rounded-full uppercase">
                      Family / Spacious
                    </span>
                    <h3 className="text-lg font-black text-gray-900 mt-2">SUV / Ertiga</h3>
                    <p className="text-xs text-gray-500 font-medium">Ertiga, Carens, Triber or equivalent</p>
                    <ul className="mt-3 space-y-1.5 text-xs text-gray-700">
                      <li className="flex items-center gap-2 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> 6 Passengers
                      </li>
                      <li className="flex items-center gap-2 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> 4 Luggage Bags
                      </li>
                      <li className="flex items-center gap-2 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Dual AC Comfort
                      </li>
                    </ul>
                  </div>
                  <a
                    href={`tel:${siteConfig.phone.booking1}`}
                    className="w-full py-2.5 bg-[#FF6600] hover:bg-orange-600 text-white font-extrabold text-xs text-center rounded-xl transition shadow-xs block"
                  >
                    Book SUV Cab
                  </a>
                </div>

                {/* Innova / Tempo */}
                <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-3 flex flex-col justify-between">
                  <div>
                    <span className="bg-purple-100 text-purple-700 text-[10px] font-black px-2.5 py-1 rounded-full uppercase">
                      Premium / Group
                    </span>
                    <h3 className="text-lg font-black text-gray-900 mt-2">Innova Crysta / Tempo</h3>
                    <p className="text-xs text-gray-500 font-medium">Innova Crysta, 12-26 Seater Tempo</p>
                    <ul className="mt-3 space-y-1.5 text-xs text-gray-700">
                      <li className="flex items-center gap-2 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> 7 - 26 Passengers
                      </li>
                      <li className="flex items-center gap-2 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Extra Luggage Space
                      </li>
                      <li className="flex items-center gap-2 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Luxury Recliner Seats
                      </li>
                    </ul>
                  </div>
                  <a
                    href={`tel:${siteConfig.phone.booking1}`}
                    className="w-full py-2.5 bg-purple-700 hover:bg-purple-800 text-white font-extrabold text-xs text-center rounded-xl transition shadow-xs block"
                  >
                    Book Premium / Tempo
                  </a>
                </div>

              </div>
            </section>

            {/* FAQs */}
            <div className="pt-6 border-t border-gray-200">
              <FAQSection faqs={cityFaqs} title={`Frequently Asked Questions`} subtitle={`Got questions about ${formattedTitle}? We've got answers.`} />
            </div>

          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              
              <div className="bg-gradient-to-br from-[#00A5D9] to-blue-700 rounded-2xl p-6 text-white shadow-xl text-center space-y-4">
                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto text-white">
                  <Phone className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-black">Need Instant Booking Assistance?</h3>
                <p className="text-xs text-blue-100 font-medium leading-relaxed">
                  Call our customer care team right now for instant fare estimate and quick driver assignment.
                </p>
                <a
                  href={`tel:${siteConfig.phone.booking1}`}
                  className="block w-full py-3 bg-white text-[#00A5D9] font-black text-sm uppercase rounded-xl hover:bg-gray-100 transition shadow-md"
                >
                  Call {siteConfig.phone.booking1}
                </a>
              </div>

              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 space-y-3">
                <h4 className="font-extrabold text-sm text-gray-900">Why GoIndiaCab?</h4>
                <ul className="space-y-2 text-xs text-gray-700 font-semibold">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>Instant WhatsApp & Call Booking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>Multiple payment options (Cash/UPI/Cards)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>Clean & sanitized air-conditioned vehicles</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>Doorstep pickup & drop-off</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>

        </div>
      </Container>
    </div>
  );
}
