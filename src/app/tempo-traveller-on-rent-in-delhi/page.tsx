import { Metadata } from "next";
import { siteConfig } from "@/src/config/site";
import { Container } from "@/src/components/common/Container";
import { Breadcrumb } from "@/src/components/common/Breadcrumb";
import { Card } from "@/src/components/common/Card";
import { SectionTitle } from "@/src/components/common/SectionTitle";

export const metadata: Metadata = {
  title: "Tempo Traveller on Rent in Delhi | Luxury & AC Force Traveller",
  description: "Hire 9, 12, 16, 20, 22, 26 Seater Tempo Traveller on rent in Delhi for outstation, local sightseeing, and weddings at the best price.",
  alternates: { canonical: `${siteConfig.url}/tempo-traveller-on-rent-in-delhi` }
};

export default function TempoTravellerPage() {
  const seaters = [
    { title: "9 Seater Tempo Traveller", link: "/9-seater-tempo-traveller-in-delhi", fare: "₹24/km" },
    { title: "12 Seater Tempo Traveller", link: "/12-seater-tempo-traveller-in-delhi", fare: "₹26/km" },
    { title: "16 Seater Tempo Traveller", link: "/16-seater-tempo-traveller-in-delhi", fare: "₹28/km" },
    { title: "20 Seater Tempo Traveller", link: "/20-seater-tempo-traveller-in-delhi", fare: "₹30/km" },
    { title: "22 Seater Tempo Traveller", link: "/22-seater-tempo-traveller-in-delhi", fare: "₹32/km" },
    { title: "26 Seater Tempo Traveller", link: "/26-seater-tempo-traveller-in-delhi", fare: "₹34/km" },
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-gray-light py-12 md:py-16 border-b border-border">
        <Container>
          <Breadcrumb items={[{ label: "Tempo Traveller in Delhi" }]} />
          <h1 className="text-4xl md:text-5xl font-bold text-dark mt-4">Tempo Traveller on Rent in <span className="text-primary">Delhi</span></h1>
          <p className="text-gray-text mt-4 max-w-2xl text-lg">Book luxury AC Force Tempo Travellers for group tours, outstation trips, corporate events, and weddings.</p>
        </Container>
      </div>

      <Container className="py-20">
        <SectionTitle title="Our Tempo Traveller Fleet" subtitle="Choose from our wide range of Force Travellers based on your group size." />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {seaters.map((seater) => (
            <Card 
              key={seater.title}
              title={seater.title}
              description={`Luxury Pushback seats, AC, Music System, and ample luggage space.`}
              image="https://www.goindiacab.com/wp-content/uploads/2024/12/delhi.jpg.webp"
              link={seater.link}
              badge={seater.fare}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}
