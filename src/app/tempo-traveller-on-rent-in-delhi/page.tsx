import { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/src/config/site";
import { Container } from "@/src/components/common/Container";
import { Breadcrumb } from "@/src/components/common/Breadcrumb";
import { Button } from "@/src/components/common/Button";
import { FAQSection } from "@/src/components/faq/FAQSection";
import { CabSearchWidget } from "@/src/components/home/CabSearchWidget";
import { Check, Users, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Tempo Traveller on Rent in Delhi | 9 to 26 Seater – Go India Cab",
  description:
    "Book a Tempo Traveller on rent in Delhi for family trips, corporate travel, weddings and outstation tours. Compare 9 to 26 seater options and request a fare quote.",
  alternates: {
    canonical: `${siteConfig.url}/tempo-traveller-on-rent-in-delhi/`,
  },
};

const fleet = [
  {
    title: "9 Seater Tempo Traveller",
    link: "/9-seater-tempo-traveller-in-delhi",
    fare: "₹24/km",
    suitable: "Small family or compact group",
    luggage: "Limited luggage; confirm at booking",
  },
  {
    title: "12 Seater Tempo Traveller",
    link: "/12-seater-tempo-traveller-in-delhi",
    fare: "₹26/km",
    suitable: "Medium family group or small corporate team",
    luggage: "Moderate luggage; confirm at booking",
  },
  {
    title: "16 Seater Tempo Traveller",
    link: "/16-seater-tempo-traveller-in-delhi",
    fare: "₹28/km",
    suitable: "Larger family group or school outing",
    luggage: "Confirm luggage capacity at booking",
  },
  {
    title: "20 Seater Tempo Traveller",
    link: "/20-seater-tempo-traveller-in-delhi",
    fare: "₹30/km",
    suitable: "Corporate outing or large group event",
    luggage: "Confirm seat layout and luggage space",
  },
  {
    title: "22 Seater Tempo Traveller",
    link: "/22-seater-tempo-traveller-in-delhi",
    fare: "₹32/km",
    suitable: "Large group in a single vehicle",
    luggage: "Confirm seating layout and route suitability",
  },
  {
    title: "26 Seater Tempo Traveller",
    link: "/26-seater-tempo-traveller-in-delhi",
    fare: "₹34/km",
    suitable: "Wedding guest movement or institutional travel",
    luggage: "Confirm dimensions, luggage and route restrictions",
  },
];

const useCases = [
  { label: "Family Holidays", desc: "Travel together in one vehicle without coordinating multiple cabs." },
  { label: "Corporate Outings", desc: "Group transfers for meetings, conferences and team offsites." },
  { label: "Wedding Guest Transport", desc: "Coordinate guest movement between hotels and venues." },
  { label: "School & College Trips", desc: "Shared transport for approved group itineraries." },
  { label: "Pilgrimage Travel", desc: "Multi-day journeys to Haridwar, Rishikesh, Vaishno Devi and more." },
  { label: "Delhi Sightseeing", desc: "Cover multiple city attractions in one comfortable group vehicle." },
];

const faqs = [
  {
    question: "What seating capacities are available for Tempo Traveller hire in Delhi?",
    answer: "Go India Cab currently lists 9, 12, 16, 20, 22 and 26-seater Tempo Travellers. Confirm the exact vehicle and seating layout available for your travel date.",
  },
  {
    question: "What is the Tempo Traveller rent per km in Delhi?",
    answer: "Indicative rates displayed on the page range from ₹24/km for a 9-seater to ₹34/km for a 26-seater. Confirm the current rate, minimum running kilometres and all additional charges before booking.",
  },
  {
    question: "Can I hire a Tempo Traveller for local Delhi sightseeing?",
    answer: "Yes, local use is available. Ask for the applicable hourly or full-day package, including the kilometre and hour limits, before confirming.",
  },
  {
    question: "Is a Tempo Traveller available for outstation trips from Delhi?",
    answer: "Yes, outstation travel is available. Share your destination and dates to confirm route availability, vehicle suitability and the final fare.",
  },
  {
    question: "Are the Tempo Travellers air-conditioned?",
    answer: "The fleet is described as luxury AC Force Tempo Travellers. Confirm AC availability for the specific vehicle assigned to your booking.",
  },
  {
    question: "Do the vehicles have pushback seats and luggage space?",
    answer: "The page lists pushback seats and luggage space as standard features. Confirm the exact layout and luggage capacity for your selected vehicle at booking.",
  },
  {
    question: "Which Tempo Traveller is suitable for a family trip?",
    answer: "Choose based on your passenger count and luggage. Share both details with the booking team and they will recommend the most suitable seating capacity.",
  },
  {
    question: "Can I book a Tempo Traveller for a wedding or corporate event?",
    answer: "Yes, wedding guest transport and corporate group travel are specifically supported. Confirm pickup schedules, multiple transfer points and vehicle availability well in advance.",
  },
  {
    question: "Are tolls, parking and driver allowance included in the fare?",
    answer: "The per-km rate does not automatically include all charges. Ask for a written quotation that clearly lists tolls, parking, driver allowance, state taxes, night charges and any other applicable fees.",
  },
  {
    question: "How can I book a Tempo Traveller with Go India Cab?",
    answer: "Share your travel date, pickup point, destination, passenger count and preferred seating capacity through the website booking form or call the published booking number.",
  },
];

export default function TempoTravellerPage() {
  return (
    <div className="bg-white min-h-screen">
      <CabSearchWidget />

      {/* Hero */}
      <div className="bg-gray-light py-12 md:py-16 border-b border-border">
        <Container>
          <Breadcrumb items={[{ label: "Tempo Traveller on Rent in Delhi" }]} />
          <div className="mt-4 max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-dark">
              Tempo Traveller on Rent in{" "}
              <span className="text-primary">Delhi</span>
            </h1>
            <p className="text-gray-text mt-4 text-lg leading-relaxed">
              Planning a family holiday, corporate outing, wedding function or group tour? Book a Tempo Traveller on rent in Delhi with Go India Cab and travel together in one spacious vehicle. Choose from 9, 12, 16, 20, 22 and 26-seater options, subject to availability. Share your travel date, pickup point, destination and group size to receive a trip-specific quotation.
            </p>
            <div className="flex flex-wrap gap-4 mt-6">
              <a href={`tel:${siteConfig.phone.booking1}`}>
                <Button size="lg">
                  <Phone className="w-4 h-4 mr-2" />
                  Get a Quote
                </Button>
              </a>
              <Link href="#fleet">
                <Button size="lg" variant="outline">View Fleet</Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-16 space-y-20">

        {/* Fleet Section */}
        <section id="fleet">
          <h2 className="text-3xl font-bold text-dark mb-3">Choose the Right Tempo Traveller for Your Group</h2>
          <p className="text-gray-text text-lg mb-8 max-w-3xl">
            Select a vehicle based on the number of passengers, luggage volume, trip duration and route. The final passenger capacity and luggage space should be confirmed at booking because vehicle layouts can vary.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fleet.map((v) => (
              <div key={v.title} className="border border-border rounded-2xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-dark">{v.title}</h3>
                  <span className="bg-primary/10 text-primary font-bold text-sm px-3 py-1 rounded-full">{v.fare}</span>
                </div>
                <div className="flex items-start gap-2 text-gray-text text-sm mb-2">
                  <Users className="w-4 h-4 mt-0.5 shrink-0 text-accent" />
                  <span>{v.suitable}</span>
                </div>
                <p className="text-xs text-gray-text mb-4">{v.luggage}</p>
                <Link href={v.link} className="mt-auto">
                  <Button className="w-full" variant="outline" size="sm">View Details</Button>
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
            <strong>Note:</strong> Rates shown are indicative per-km figures displayed on the website. Confirm the current rate, minimum running kilometres, local package options and all additional charges with the booking team before making a payment.
          </div>
        </section>

        {/* Fare Inclusions */}
        <section>
          <h2 className="text-3xl font-bold text-dark mb-4">What Does the Tempo Traveller Fare Include?</h2>
          <p className="text-gray-text text-lg mb-6 max-w-3xl">
            Before confirming, request a written fare breakup. Depending on the trip type and operator terms, the following may be included or charged separately:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Base per-kilometre rate",
              "Minimum kilometres per day",
              "Driver allowance",
              "Fuel charges",
              "Tolls and parking",
              "State taxes and permits",
              "Night charges",
              "Extra-hour charges",
              "GST (if applicable)",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 bg-gray-50 rounded-xl p-4 border border-border">
                <Check className="w-5 h-5 text-green-500 shrink-0" />
                <span className="text-dark text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-gray-text text-sm mt-4">
            Avoid confirming a booking based on the per-km rate alone. Ask for a complete written quotation that clearly states what is included and what is payable separately.
          </p>
        </section>

        {/* Local vs Outstation */}
        <section>
          <h2 className="text-3xl font-bold text-dark mb-6">Local Delhi Rental or Outstation Trip?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-dark mb-3">Local Delhi Rental</h3>
              <ul className="space-y-2 text-gray-text text-sm">
                <li>• Ask for the available hourly or full-day package</li>
                <li>• Confirm included hours and kilometre limits</li>
                <li>• Check extra-hour and extra-kilometre rates</li>
                <li>• Confirm waiting charges for multi-stop itineraries</li>
                <li>• Suitable for sightseeing, events and airport transfers</li>
              </ul>
            </div>
            <div className="bg-accent/5 border border-accent/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-dark mb-3">Outstation Trip from Delhi</h3>
              <ul className="space-y-2 text-gray-text text-sm">
                <li>• Confirm one-way or round-trip availability</li>
                <li>• Ask about minimum daily running kilometres</li>
                <li>• Confirm overnight halt and driver allowance</li>
                <li>• Check hill-route suitability for your vehicle size</li>
                <li>• Popular routes: Agra, Jaipur, Haridwar, Shimla, Manali</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section>
          <h2 className="text-3xl font-bold text-dark mb-4">Who Should Book a Tempo Traveller?</h2>
          <p className="text-gray-text text-lg mb-8 max-w-3xl">
            A Tempo Traveller is a practical choice whenever a group wants to travel together in one vehicle rather than splitting across multiple cabs.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((u) => (
              <div key={u.label} className="border border-border rounded-2xl p-5 bg-white shadow-sm">
                <h3 className="font-bold text-dark text-lg mb-2">{u.label}</h3>
                <p className="text-gray-text text-sm">{u.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section>
          <h2 className="text-3xl font-bold text-dark mb-4">Features and Comfort</h2>
          <p className="text-gray-text text-lg max-w-3xl">
            The Go India Cab fleet is described as luxury AC Force Tempo Travellers with pushback seats, a music system and luggage space. Confirm the availability of each feature for the specific vehicle assigned to your booking. If additional amenities such as charging points, reading lights or individual AC vents are required, mention them when requesting a quote.
          </p>
        </section>

        {/* Destinations */}
        <section>
          <h2 className="text-3xl font-bold text-dark mb-4">Where Can You Use a Tempo Traveller from Delhi?</h2>
          <p className="text-gray-text text-lg mb-6 max-w-3xl">
            Tempo Travellers from Delhi can be used for local sightseeing, outstation road trips, corporate transfers, wedding guest movement and pilgrimage journeys. Popular destination examples include:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {["Agra", "Jaipur", "Haridwar", "Rishikesh", "Shimla", "Manali"].map((dest) => (
              <div key={dest} className="bg-gray-50 border border-border rounded-xl p-3 text-center text-dark font-semibold text-sm">
                {dest}
              </div>
            ))}
          </div>
          <p className="text-gray-text text-sm mt-4">
            Route availability, travel time and vehicle suitability should be confirmed for your selected itinerary. Hill routes may have restrictions on larger vehicle sizes.
          </p>
        </section>

        {/* How to Book */}
        <section>
          <h2 className="text-3xl font-bold text-dark mb-6">How to Book a Tempo Traveller in Delhi</h2>
          <div className="space-y-4 max-w-2xl">
            {[
              "Share your pickup location, destination and travel dates.",
              "Confirm the number of passengers and total luggage.",
              "Choose the required seating capacity and vehicle category.",
              "Request a written quotation with all inclusions and exclusions listed.",
              "Review the cancellation, payment and waiting terms.",
              "Confirm the booking and obtain vehicle and driver details as per company policy.",
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary text-white font-bold text-sm flex items-center justify-center shrink-0">
                  {i + 1}
                </div>
                <p className="text-gray-text text-base pt-1">{step}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-dark rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-3">Book a Tempo Traveller on Rent in Delhi</h2>
          <p className="text-white/80 text-lg mb-6 max-w-2xl mx-auto">
            Need a vehicle for your next group journey? Contact Go India Cab with your travel date, pickup point, destination, passenger count and luggage requirements.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={`tel:${siteConfig.phone.booking1}`}>
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Phone className="w-4 h-4 mr-2" />
                {siteConfig.phone.booking1}
              </Button>
            </a>
            <a href={`tel:${siteConfig.phone.booking2}`}>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                {siteConfig.phone.booking2}
              </Button>
            </a>
          </div>
        </section>

      </Container>

      {/* FAQ */}
      <FAQSection
        faqs={faqs}
        title="Frequently Asked Questions – Tempo Traveller on Rent in Delhi"
        subtitle="Common queries about hiring a Tempo Traveller in Delhi."
      />
    </div>
  );
}
