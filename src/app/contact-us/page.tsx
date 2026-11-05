import { Metadata } from "next";
import { MapPin, Phone, MessageCircle, Navigation } from "lucide-react";
import { siteConfig } from "@/src/config/site";
import { Container } from "@/src/components/common/Container";
import { Breadcrumb } from "@/src/components/common/Breadcrumb";
import { ContactFormSection } from "@/src/components/home/ContactFormSection";

export const metadata: Metadata = {
  title: "Contact Us | GoIndiaCab",
  description: "Get in touch with Go India Cab for any queries, custom taxi packages, or to book a ride. We are available 24/7 to assist you.",
  alternates: { canonical: `${siteConfig.url}/contact-us` }
};

const MAP_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.1643445722336!2d77.1611099150824!3d28.6248358824208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d02c892842c15%3A0xc09f984a96df4ab6!2sGo%20India%20Cab!5e0!3m2!1sen!2sin!4v1655000000000!5m2!1sen!2sin";

const trust = [
  { value: siteConfig.stats.yearsOfExperience, label: "Years of Experience" },
  { value: siteConfig.stats.happyCustomers, label: "Happy Customers" },
  { value: siteConfig.stats.drivingCompleted, label: "Km Driven" },
  { value: "24/7", label: "Customer Support" },
];

export default function ContactPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-white pt-6 md:pt-8 pb-16 md:pb-20 border-b-4 border-[#FFB606]">
        <Container>
          <Breadcrumb items={[{ label: "Contact Us" }]} />
          <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-8">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-extrabold text-dark leading-tight">Contact <span className="text-primary">Us</span></h1>
              <p className="mt-4 text-gray-600 text-base md:text-lg leading-relaxed">
                Questions about a booking, a corporate account or a custom package? Our team is available around the clock to help.
              </p>
            </div>
            <dl className="grid grid-cols-2 sm:grid-cols-4 gap-x-10 gap-y-5">
              {trust.map((t) => (
                <div key={t.label} className="border-l-2 border-[#FFB606] pl-4">
                  <dt className="text-2xl font-extrabold text-primary whitespace-nowrap">{t.value}</dt>
                  <dd className="text-xs font-semibold uppercase tracking-wide text-gray-500 mt-0.5">{t.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </div>

      <ContactFormSection />

      {/* Map Section */}
      <section className="py-14 md:py-16 bg-white">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#b07f00] mb-2">Our Location</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-dark">Find Us <span className="text-primary">Here</span></h2>
            </div>
            <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-xl h-[450px] bg-gray-200">
              <iframe
                src={MAP_SRC}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Go India Cab Location"
              ></iframe>
              <div className="hidden md:block absolute top-5 left-5 w-80 bg-white rounded-xl shadow-lg border border-gray-200 p-5">
                <div className="flex items-start gap-3">
                  <span className="w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center shrink-0"><MapPin className="w-5 h-5" /></span>
                  <div>
                    <p className="font-bold text-dark">{siteConfig.fullName}</p>
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">{siteConfig.address}</p>
                  </div>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${siteConfig.fullName} ${siteConfig.address}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center justify-center gap-2 w-full h-10 rounded-lg bg-primary text-white text-sm font-bold hover:opacity-90 transition"
                >
                  <Navigation className="w-4 h-4" /> Get Directions
                </a>
              </div>
            </div>
            <p className="md:hidden mt-4 text-sm text-gray-600 flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 shrink-0 text-primary" />{siteConfig.address}</p>
          </div>
        </Container>
      </section>

      {/* CTA band */}
      <section className="bg-[#1A1A2E]">
        <Container>
          <div className="py-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white">Need a cab right now?</h2>
              <p className="text-white/60 mt-1">Call or WhatsApp us — we will arrange your ride in minutes.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={`tel:${siteConfig.phone.booking1.replace(/[^+\d]/g, "")}`} className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-lg bg-[#FFB606] text-[#1A1A2E] font-bold hover:brightness-95 transition">
                <Phone className="w-5 h-5" /> {siteConfig.phone.booking1}
              </a>
              <a href="https://wa.me/919792000555" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-lg bg-[#25D366] text-white font-bold hover:brightness-95 transition">
                <MessageCircle className="w-5 h-5" /> WhatsApp Us
              </a>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
