import { Metadata } from "next";
import { siteConfig } from "@/src/config/site";
import { Container } from "@/src/components/common/Container";
import { SectionTitle } from "@/src/components/common/SectionTitle";
import { Breadcrumb } from "@/src/components/common/Breadcrumb";
import { Button } from "@/src/components/common/Button";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { StatsSection } from "@/src/components/home/StatsSection";

export const metadata: Metadata = {
  title: "About Us | GoIndiaCab",
  description: "Learn more about Go India Cab, our mission, vision, and why we are the best taxi service provider in Delhi NCR and across India.",
  alternates: { canonical: `${siteConfig.url}/about-us` }
};

export default function AboutPage() {
  const whyChooseUs = [
    "100% Guaranteed Lowest Price",
    "Verified & Experienced Drivers",
    "No Hidden Charges",
    "24/7 Customer Support",
    "Well-Maintained Fleets",
    "On-Time Service Guarantee"
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gray-light py-12 md:py-16 border-b border-border">
        <Container>
          <Breadcrumb items={[{ label: "About Us" }]} />
          <h1 className="text-4xl md:text-5xl font-bold text-dark mt-4">About <span className="text-primary">Go India Cab</span></h1>
        </Container>
      </div>

      <Container className="py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="order-2 lg:order-1 relative rounded-2xl overflow-hidden shadow-xl h-[400px] md:h-[500px]">
            <Image 
              src="https://www.goindiacab.com/wp-content/uploads/2024/12/Goindia-services.png.webp" 
              alt="About Go India Cab"
              fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl font-bold text-dark mb-6">Our Story</h2>
            <div className="w-16 h-1 bg-accent mb-6 rounded-full"></div>
            <p className="text-gray-text mb-4 leading-relaxed">
              Founded over a decade ago, <strong>Go India Cab</strong> has grown to become one of the most trusted and reliable taxi service providers in Delhi NCR and across North India. What started with a small fleet of cars has now expanded into a comprehensive travel solutions network.
            </p>
            <p className="text-gray-text mb-8 leading-relaxed">
              We are a unit of Go My Trails Adventures Pvt. Ltd, dedicated to providing safe, comfortable, and affordable mobility solutions. Whether it&apos;s a quick local drop, a corporate trip, or a multi-day outstation tour, we treat every journey with the utmost care and professionalism.
            </p>

            <h3 className="text-xl font-bold text-dark mb-4">Mission & Vision</h3>
            <p className="text-gray-text leading-relaxed">
              Our mission is to redefine the travel experience by offering unmatched customer service, transparent pricing, and uncompromising safety standards. We envision becoming the leading choice for mobility across India, connecting people to their destinations with smiles.
            </p>
          </div>
        </div>

        <div className="mb-24">
          <SectionTitle title="Why Choose Us" subtitle="We stand out from the competition because we put our customers first." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {whyChooseUs.map((point, index) => (
              <div key={index} className="flex items-start p-6 rounded-2xl bg-gray-50 border border-border">
                <CheckCircle className="w-6 h-6 text-accent shrink-0 mr-4 mt-0.5" />
                <p className="font-semibold text-dark">{point}</p>
              </div>
            ))}
          </div>
        </div>

      </Container>
      
      <StatsSection />
      
      <Container className="py-20 text-center">
        <h2 className="text-3xl font-bold text-dark mb-6">Ready for a comfortable ride?</h2>
        <p className="text-gray-text mb-8 max-w-2xl mx-auto text-lg">Book your cab today and experience the difference with Go India Cab. Our drivers are waiting to serve you.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/paynow">
            <Button size="lg">Book Your Ride Now</Button>
          </Link>
          <a href={`tel:${siteConfig.phone.booking1}`}>
            <Button size="lg" variant="outline">Call {siteConfig.phone.booking1}</Button>
          </a>
        </div>
      </Container>
    </div>
  );
}
