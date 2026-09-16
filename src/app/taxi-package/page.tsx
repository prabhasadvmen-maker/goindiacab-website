import { Metadata } from "next";
import { siteConfig } from "@/src/config/site";
import { Container } from "@/src/components/common/Container";
import { Breadcrumb } from "@/src/components/common/Breadcrumb";
import { Card } from "@/src/components/common/Card";
import { SectionTitle } from "@/src/components/common/SectionTitle";
import { taxiPackages } from "@/src/data/packages";

export const metadata: Metadata = {
  title: "Taxi Packages in India | GoIndiaCab",
  description: "Explore affordable and customized taxi tour packages for Delhi, Agra, Jaipur, Himachal Pradesh, Rajasthan, and more with GoIndiaCab.",
  alternates: { canonical: `${siteConfig.url}/taxi-package` }
};

export default function TaxiPackagesPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-gray-light py-12 md:py-16 border-b border-border">
        <Container>
          <Breadcrumb items={[{ label: "Taxi Packages" }]} />
          <h1 className="text-4xl md:text-5xl font-bold text-dark mt-4">Taxi Tour <span className="text-primary">Packages</span></h1>
          <p className="text-gray-text mt-4 max-w-2xl text-lg">Discover our handpicked taxi tour packages for a memorable and comfortable journey across India&apos;s top destinations.</p>
        </Container>
      </div>

      <Container className="py-20">
        <SectionTitle title="All Tour Packages" subtitle="Choose from our wide range of tailored packages to suit your travel needs." />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {taxiPackages.map((pkg) => (
            <Card 
              key={pkg.id}
              title={pkg.title}
              description={pkg.description}
              image={pkg.image}
              link={`/taxi-package/${pkg.slug}`}
              badge={pkg.duration}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}
