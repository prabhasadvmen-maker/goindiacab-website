import { Metadata } from "next";
import { siteConfig } from "@/src/config/site";
import { Container } from "@/src/components/common/Container";
import { Breadcrumb } from "@/src/components/common/Breadcrumb";
import { Card } from "@/src/components/common/Card";
import { SectionTitle } from "@/src/components/common/SectionTitle";
import { popularRoutes } from "@/src/data/routes";

export const metadata: Metadata = {
  title: "Popular Cab Routes | GoIndiaCab",
  description: "Book cabs for popular routes from Delhi including Agra, Chandigarh, Jaipur, Dehradun, and Haridwar at the best prices.",
  alternates: { canonical: `${siteConfig.url}/popular-routes` }
};

export default function PopularRoutesPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-gray-light py-12 md:py-16 border-b border-border">
        <Container>
          <Breadcrumb items={[{ label: "Popular Routes" }]} />
          <h1 className="text-4xl md:text-5xl font-bold text-dark mt-4">Popular <span className="text-primary">Routes</span></h1>
          <p className="text-gray-text mt-4 max-w-2xl text-lg">Book one-way or round-trip cabs on the most frequently traveled routes from Delhi NCR.</p>
        </Container>
      </div>

      <Container className="py-20">
        <SectionTitle title="Top Booked Outstation Routes" subtitle="Safe, reliable, and affordable taxi services for popular destinations." />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularRoutes.map((route) => (
            <Card 
              key={route.id}
              title={`${route.from} to ${route.to}`}
              image={route.image}
              link={`/popular-routes/${route.slug}`}
              badge={route.fare}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}
