import { Metadata } from "next";
import { siteConfig } from "@/src/config/site";
import { Container } from "@/src/components/common/Container";
import { Breadcrumb } from "@/src/components/common/Breadcrumb";
import { Card } from "@/src/components/common/Card";
import { SectionTitle } from "@/src/components/common/SectionTitle";
import { outstationRoutes } from "@/src/data/routes";

export const metadata: Metadata = {
  title: "Outstation Taxi Services | GoIndiaCab",
  description: "Book reliable and affordable outstation taxi services from Delhi to Himachal, Uttarakhand, Rajasthan, Punjab, and more.",
  alternates: { canonical: `${siteConfig.url}/taxi` }
};

export default function TaxiOutstationPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-gray-light py-12 md:py-16 border-b border-border">
        <Container>
          <Breadcrumb items={[{ label: "Taxi Outstation Services" }]} />
          <h1 className="text-4xl md:text-5xl font-bold text-dark mt-4">Outstation <span className="text-primary">Taxi Services</span></h1>
          <p className="text-gray-text mt-4 max-w-2xl text-lg">Book one-way or round-trip outstation cabs from Delhi to top destinations across North India.</p>
        </Container>
      </div>

      <Container className="py-20">
        <SectionTitle title="Popular Outstation Routes" subtitle="Safe and comfortable rides with experienced drivers for your outstation trips." />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {outstationRoutes.map((route) => (
            <Card 
              key={route.id}
              title={`${route.from} to ${route.to}`}
              description={route.description}
              image={route.image}
              link={`/taxi/${route.slug}`}
              badge={route.fare}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}
