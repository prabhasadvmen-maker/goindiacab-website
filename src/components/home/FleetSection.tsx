import { Container } from "../common/Container";
import Link from "next/link";

export function FleetSection() {
  const vehicles = [
    {
      name: "Sedan",
      desc: "A practical choice for smaller groups and everyday intercity travel. Confirm the assigned model and luggage capacity before booking.",
      seats: "Up to 4 passengers",
    },
    {
      name: "SUV",
      desc: "Consider an SUV for a larger group or additional luggage, subject to actual vehicle configuration and route availability.",
      seats: "Up to 6 passengers",
    },
    {
      name: "Tempo Traveller",
      desc: "For family groups, events and group tours. Confirm seating, luggage space and route suitability before confirming.",
      seats: "9 to 26 seater options",
      link: "/tempo-traveller-on-rent-in-delhi",
      linkLabel: "Tempo Traveller on Rent in Delhi",
    },
  ];

  return (
    <section className="py-12 md:py-24 neo-bg">
      <Container>
        <div className="max-w-4xl mx-auto text-center mb-10">
          <h2 className="text-2xl md:text-[28px] font-extrabold text-[#2d3748] mb-4">
            Choose a Vehicle for Your Journey
          </h2>
          <p className="text-[15px] leading-relaxed text-[#718096]">
            Choose a vehicle according to passenger count, luggage and route. For outstation trips, fares{" "}
            <strong className="text-[#4a5568]">start from ₹11/km</strong> for sedan category — confirm the exact vehicle, minimum running and extra charges before booking.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {vehicles.map((v) => (
            <div key={v.name} className="neo-flat p-6 rounded-3xl flex flex-col gap-3">
              <h3 className="text-lg font-bold text-[#2d3748]">{v.name}</h3>
              <p className="text-sm text-[#718096] leading-relaxed flex-1">{v.desc}</p>
              <span className="text-xs font-semibold text-[#3f51b5] bg-blue-50 px-3 py-1 rounded-full w-fit">{v.seats}</span>
              {v.link && (
                <Link
                  href={v.link}
                  className="text-sm font-semibold text-[#3f51b5] underline underline-offset-2 hover:text-[#2d3748] transition-colors"
                >
                  {v.linkLabel}
                </Link>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
