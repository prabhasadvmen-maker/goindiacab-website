import { Container } from "../common/Container";
import { SectionTitle } from "../common/SectionTitle";
import { Card } from "../common/Card";

export function PopularRoutesSection() {
  const routes = [
    { 
      title: "Delhi to Jaipur", 
      image: "/popular-outstation/Best-Cab-Services-in-Jaipur.png.webp", 
      link: "/popular-routes/cab-service-in-jaipur" 
    },
    { 
      title: "Delhi to Haridwar", 
      image: "/popular-outstation/Haridhar.webp", 
      link: "/popular-routes/cab-service-in-haridwar" 
    },
    { 
      title: "Delhi to Agra", 
      image: "/popular-outstation/agra.jpg.webp", 
      link: "/popular-routes/cab-service-in-agra" 
    },
    { 
      title: "Delhi to Ayodhya", 
      image: "/popular-outstation/ayodhya.jpg.webp", 
      link: "/popular-routes/cab-service-in-ayodhya" 
    },
    { 
      title: "Delhi to Chandigarh", 
      image: "/popular-outstation/chandigarh-1-scaled-1.jpg.webp", 
      link: "/popular-routes/cab-service-in-chandigarh" 
    },
    { 
      title: "Delhi to Dehradun", 
      image: "/popular-outstation/dehradun.jpg.webp", 
      link: "/popular-routes/cab-service-in-dehradun" 
    },
    { 
      title: "Cab Service in Delhi", 
      image: "/popular-outstation/delhi.jpg.webp", 
      link: "/popular-routes/cab-service-in-delhi" 
    },
    { 
      title: "Delhi to Noida", 
      image: "/popular-outstation/noida.jpg.webp", 
      link: "/popular-routes/cab-service-in-noida" 
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
      </Container>
    </section>
  );
}
