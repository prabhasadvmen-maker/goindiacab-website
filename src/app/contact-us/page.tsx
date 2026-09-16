import { Metadata } from "next";
import { siteConfig } from "@/src/config/site";
import { Container } from "@/src/components/common/Container";
import { Breadcrumb } from "@/src/components/common/Breadcrumb";
import { ContactFormSection } from "@/src/components/home/ContactFormSection";

export const metadata: Metadata = {
  title: "Contact Us | GoIndiaCab",
  description: "Get in touch with Go India Cab for any queries, custom taxi packages, or to book a ride. We are available 24/7 to assist you.",
  alternates: { canonical: `${siteConfig.url}/contact-us` }
};

export default function ContactPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gray-light py-12 md:py-16 border-b border-border">
        <Container>
          <Breadcrumb items={[{ label: "Contact Us" }]} />
          <h1 className="text-4xl md:text-5xl font-bold text-dark mt-4">Contact <span className="text-primary">Us</span></h1>
        </Container>
      </div>

      <ContactFormSection />

      {/* Map Section */}
      <div className="w-full h-[400px] bg-gray-200">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.1643445722336!2d77.1611099150824!3d28.6248358824208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d02c892842c15%3A0xc09f984a96df4ab6!2sGo%20India%20Cab!5e0!3m2!1sen!2sin!4v1655000000000!5m2!1sen!2sin" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Go India Cab Location"
        ></iframe>
      </div>
    </div>
  );
}
