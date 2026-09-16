"use client";

import { Container } from "../common/Container";
import Link from "next/link";

const destinationCategories = [
  {
    title: "Car Rental Services",
    links: [
      { label: "Car rental in Bangalore", href: "/car-rental-in-bangalore" },
      { label: "Car rental in Mumbai", href: "/car-rental-in-mumbai" },
      { label: "Car rental in Kolkata", href: "/car-rental-in-kolkata" },
      { label: "Car rental in Ahmedabad", href: "/car-rental-in-ahmedabad" },
      { label: "Car rental in Hyderabad", href: "/car-rental-in-hyderabad" },
      { label: "Car rental in Delhi", href: "/car-rental-in-delhi" },
      { label: "Car rental in Chennai", href: "/car-rental-in-chennai" },
      { label: "Car rental in Goa", href: "/car-rental-in-goa" }
    ]
  },
  {
    title: "Book Taxi Services",
    links: [
      { label: "Bangalore Taxi Service", href: "/bangalore-taxi-service" },
      { label: "Delhi Taxi Service", href: "/delhi-taxi-service" },
      { label: "Goa Taxi Service", href: "/goa-taxi-service" },
      { label: "Dehradun Taxi Service", href: "/dehradun-taxi-service" },
      { label: "Mumbai Taxi Service", href: "/mumbai-taxi-service" },
      { label: "Hyderabad Taxi Service", href: "/hyderabad-taxi-service" },
      { label: "Jaipur Taxi Service", href: "/jaipur-taxi-service" },
      { label: "Ahmedabad Taxi Service", href: "/ahmedabad-taxi-service" }
    ]
  },
  {
    title: "Airport Taxi Services",
    links: [
      { label: "Airport Taxi in Bangalore", href: "/airport-taxi-in-bangalore" },
      { label: "Airport Taxi in Delhi", href: "/airport-taxi-in-delhi" },
      { label: "Airport Taxi in Hyderabad", href: "/airport-taxi-in-hyderabad" },
      { label: "Airport Taxi in Mumbai", href: "/airport-taxi-in-mumbai" },
      { label: "Airport Taxi in Ahmedabad", href: "/airport-taxi-in-ahmedabad" },
      { label: "Airport Taxi in Goa", href: "/airport-taxi-in-goa" },
      { label: "Airport Taxi in Chennai", href: "/airport-taxi-in-chennai" },
      { label: "Airport Taxi in Kochi", href: "/airport-taxi-in-kochi" }
    ]
  },
  {
    title: "Tempo Traveller & Minibus Services",
    links: [
      { label: "Tempo Traveller in Bangalore", href: "/tempo-traveller-in-bangalore" },
      { label: "Tempo Traveller in Tirupati", href: "/tempo-traveller-in-tirupati" },
      { label: "Minibus for rent in Bangalore", href: "/minibus-for-rent-in-bangalore" },
      { label: "Minibus for hire in Mumbai", href: "/minibus-for-hire-in-mumbai" },
      { label: "Tempo Traveller in Chennai", href: "/tempo-traveller-in-chennai" },
      { label: "Tempo Traveller in Ahmedabad", href: "/tempo-traveller-in-ahmedabad" },
      { label: "Minibus for rent in Chennai", href: "/minibus-for-rent-in-chennai" },
      { label: "Mini bus in Kolkata", href: "/mini-bus-in-kolkata" }
    ]
  }
];

export function QuickLinksSection() {
  return (
    <section className="py-16 bg-white relative z-50">
      <Container>
        <div className="space-y-12 max-w-[1300px] mx-auto relative z-50">
          {destinationCategories.map((category, index) => (
            <div key={index} className="relative z-50">
              <h3 className="text-base sm:text-lg font-bold text-[#1a1b1d] mb-4 sm:mb-6">
                {category.title}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4 gap-x-6 relative z-50">
                {category.links.map((link, linkIndex) => (
                  <a
                    key={linkIndex}
                    href={link.href}
                    style={{ cursor: "pointer" }}
                    className="block w-full text-[#43b5e8] hover:text-[#0284c7] hover:underline text-[13px] sm:text-sm font-medium transition-colors py-1"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
