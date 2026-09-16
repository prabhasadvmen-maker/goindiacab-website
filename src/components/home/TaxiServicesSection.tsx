import { Container } from "../common/Container";
import { SectionTitle } from "../common/SectionTitle";
import { Card } from "../common/Card";

export function TaxiServicesSection() {
  const taxiServices = [
    {
      title: "Himachal Pradesh",
      image: "/outstation-images/Himachal-Taxi-Services.jpg.webp",
      link: "/taxi/delhi-to-himachal-taxi-service",
    },
    {
      title: "Uttarakhand",
      image: "/outstation-images/Uttarakhand-Taxi-Services.jpg.webp",
      link: "/taxi/uttarakhand-taxi-service-from-delhi",
    },
    {
      title: "Jammu & Kashmir",
      image: "/outstation-images/Jammu-Kashmir-Taxi-Services.jpg.webp",
      link: "/taxi/jammu-kashmir-taxi-service-from-delhi",
    },
    {
      title: "Rajasthan",
      image: "/outstation-images/Rajasthan-Taxi-Services.jpg.webp",
      link: "/taxi/rajasthan-taxi-service-from-delhi",
    },
    {
      title: "Uttar Pradesh",
      image: "/outstation-images/Uttar-Pradesh-Taxi-Services.jpg.webp",
      link: "/taxi/uttar-pradesh-taxi-service-from-delhi",
    },
    {
      title: "Punjab",
      image: "/outstation-images/Punjab-Taxi-Services.jpg.webp",
      link: "/taxi/punjab-taxi-service-from-delhi",
    }
  ];

  return (
    <section className="py-20 neo-bg">
      <Container>
        <SectionTitle 
          title="Our Outstation Taxi Services" 
          subtitle="Explore incredible destinations across North India with our dedicated outstation cab services from Delhi."
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {taxiServices.map((service) => (
            <Card 
              key={service.title}
              title={service.title}
              image={service.image}
              link={service.link}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
