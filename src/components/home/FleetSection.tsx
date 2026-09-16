import { Container } from "../common/Container";

export function FleetSection() {
  return (
    <section className="py-12 md:py-24 neo-bg">
      <Container>
        <div className="max-w-4xl mx-auto text-center neo-flat p-8 md:p-12 rounded-3xl">
          <h2 className="text-2xl md:text-[28px] font-extrabold text-[#2d3748] mb-6">
            Our Taxi Fleets & Fare
          </h2>
          <div className="w-16 h-1 bg-[#3f51b5] opacity-50 mx-auto mb-6 rounded-full"></div>
          <p className="text-[15px] leading-relaxed text-[#718096]">
            At Go India Cab, we provide the best taxi service in Delhi with multiple travel options – from budget sedans to luxury SUVs and spacious Tempo Travellers for group journeys. Each cab is neat, comfortable, and regularly maintained for a worry-free ride. For outstation trips from Delhi, our fares are transparent and <strong className="text-[#4a5568]">start from just ₹11/km</strong>. Whether you need a city transfer or a long holiday trip across North India, Go India Cab ensures safety, comfort, and affordable travel every time.
          </p>
        </div>
      </Container>
    </section>
  );
}
