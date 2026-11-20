import { Container } from "../common/Container";
import { SectionTitle } from "../common/SectionTitle";
import { Card } from "../common/Card";
import Link from "next/link";

export function PopularRoutesSection() {
  const routes = [
    { 
      title: "Delhi to Agra Cab", 
      image: "/popular-outstation/agra.jpg.webp", 
      link: "/delhi-to-agra-cab-service" 
    },
    { 
      title: "Delhi to Jaipur", 
      image: "/popular-outstation/Best-Cab-Services-in-Jaipur.png.webp", 
      link: "/taxi/rajasthan-taxi-service-from-delhi" 
    },
    { 
      title: "Delhi to Haridwar", 
      image: "/popular-outstation/Haridhar.webp", 
      link: "/taxi/uttarakhand-taxi-service-from-delhi" 
    },
    { 
      title: "Delhi to Himachal Pradesh", 
      image: "/outstation-images/Himachal-Taxi-Services.jpg.webp", 
      link: "/taxi/delhi-to-himachal-taxi-service" 
    },
    { 
      title: "Delhi to Ayodhya", 
      image: "/popular-outstation/ayodhya.jpg.webp", 
      link: "/taxi/uttar-pradesh-taxi-service-from-delhi" 
    },
    { 
      title: "Delhi to Chandigarh", 
      image: "/popular-outstation/chandigarh-1-scaled-1.jpg.webp", 
      link: "/popular-routes/best-cab-service-in-chandigarh" 
    },
    { 
      title: "Delhi to Dehradun", 
      image: "/popular-outstation/dehradun.jpg.webp", 
      link: "/popular-routes/cab-service-in-dehradun" 
    },
    { 
      title: "Cab Service in Delhi", 
      image: "/popular-outstation/delhi.jpg.webp", 
      link: "/cab-service-in-delhi" 
    },
    { 
      title: "Delhi to Varanasi", 
      image: "/popular-outstation/varanasi.jpg.webp", 
      link: "/popular-routes/cab-service-in-varanasi" 
    },
  ];

  return (
    <section className="py-16 sm:py-20 neo-bg">
      <Container>
        <SectionTitle 
          title="Popular Outstation Routes" 
          subtitle="Top booked outstation cab routes from New Delhi across North India."
        />
        
        {/* 3x3 Grid (9 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {routes.map((route) => (
            <Card 
              key={route.title}
              title={route.title}
              image={route.image}
              link={route.link}
              className="h-full"
            />
          ))}
        </div>

        {/* Delhi section with internal link */}
        <div className="mt-12 p-6 md:p-8 rounded-3xl bg-white border border-gray-100 shadow-sm">
          <h2 className="text-xl md:text-2xl font-extrabold text-[#2d3748] mb-3">
            Need a Cab Service in Delhi?
          </h2>
          <p className="text-[15px] text-[#718096] leading-relaxed mb-4">
            Looking for a cab within Delhi or planning an outstation journey from the capital? Go India Cab helps customers request local taxi services, airport transfers and intercity rides. Share your pickup point, destination, date and passenger count to check availability and receive a fare quote.
          </p>
          <Link
            href="/cab-service-in-delhi"
            className="inline-flex items-center gap-2 text-[#0B4A9C] font-bold underline underline-offset-2 hover:text-[#083875] transition-colors"
          >
            Cab Service in Delhi →
          </Link>
        </div>
      </Container>
    </section>
  );
}
