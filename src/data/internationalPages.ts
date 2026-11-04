// AUTO-GENERATED from the "Go Cab India" content document (one entry per country).
// Each country is served at /<locale>/private-car-with-driver-delhi-india, e.g. /en-us/private-car-with-driver-delhi-india.

export type CityItem = { name: string; note: string };
export type PageBlock =
  | { t: "p"; text: string }
  | { t: "h3"; text: string }
  | { t: "ul"; items: string[] }
  | { t: "cities"; items: CityItem[] };
export type SectionKind = "intro" | "why" | "airport" | "city" | "outstation" | "corporate" | "book" | "other";
export type PageSection = { kind: SectionKind; heading: string; blocks: PageBlock[] };

export interface InternationalPage {
  locale: string; // URL segment, e.g. "en-us"
  code: string;
  country: string;
  short: string;
  flag: string;
  h1: string;
  h1Tagline: string;
  sections: PageSection[];
  faqs: { question: string; answer: string }[];
}

export const INTERNATIONAL_PATH = "private-car-with-driver-delhi-india";

export const internationalPages: InternationalPage[] = [
  {
    "locale": "en-us",
    "code": "us",
    "country": "USA",
    "short": "USA",
    "flag": "🇺🇸",
    "h1": "Cab Service in India from USA",
    "h1Tagline": "Safe, Reliable & Affordable Travel for International Visitors",
    "sections": [
      {
        "kind": "intro",
        "heading": "",
        "blocks": [
          {
            "t": "p",
            "text": "A journey to India is a journey full of culture, colour, business, family, and medical or spiritual explorations between the United States and India. However, there is one factor that every foreigner is concerned with, and it is the local transport. Locating a reliable taxi following a long-distance flight, experiencing the price concept, and being safe may be overwhelming."
          },
          {
            "t": "p",
            "text": "Our Cab Service in India from the USA fits in there. We are experts in offering fast, secure, and hassle-free taxi service in India from the USA and specially designed with the American tourists in mind, who demand an international quality of service, clear pricing, and quality customer care."
          }
        ]
      },
      {
        "kind": "why",
        "heading": "Why Choose Our Taxi Service in India from the USA?",
        "blocks": [
          {
            "t": "ul",
            "items": [
              "Full-time, background-checked drivers who are trained on international travellers",
              "Well-maintained, air-conditioned, and clean cars",
              "Easy-to-understand open pricing with no gimmicks",
              "Drivers who speak English to communicate easily",
              "All-night customer service so that there is no cause to worry",
              "Real-time vehicles with GPS-tracking",
              "Secure foreign payment facilities"
            ]
          },
          {
            "t": "p",
            "text": "With thousands of satisfied customers, we are a preferred choice for Cab Service in India for USA travellers."
          }
        ]
      },
      {
        "kind": "airport",
        "heading": "Airport Pickup & Drop – Start Your India Trip Stress-Free",
        "blocks": [
          {
            "t": "p",
            "text": "The last thing you wish to do after a long international flight is to bargain with local taxis. Our Airport taxi service in India from USA ensures a smooth start to your journey."
          },
          {
            "t": "h3",
            "text": "Airport Transfer Features"
          },
          {
            "t": "ul",
            "items": [
              "Flight tracking for delays",
              "Meet & greet service at the arrival terminal",
              "On-time pickup and drop-off",
              "Spacious cars for luggage"
            ]
          },
          {
            "t": "p",
            "text": "This qualifies us as a trusted option for Taxi service in India for USA travellers."
          }
        ]
      },
      {
        "kind": "city",
        "heading": "City Taxi Service in India for USA Travellers",
        "blocks": [
          {
            "t": "p",
            "text": "Going around the cities of India is convenient and secure when we offer professional taxi services. You could be sightseeing, or be in meetings, or visiting family, and our cab service in India from USA ensures comfort and local expertise."
          },
          {
            "t": "h3",
            "text": "Popular Cities We Serve"
          },
          {
            "t": "cities",
            "items": [
              {
                "name": "Agra",
                "note": "Home of the Taj Mahal"
              },
              {
                "name": "Varanasi",
                "note": "Spiritual capital"
              },
              {
                "name": "Ayodhya",
                "note": "Pilgrimage destination"
              },
              {
                "name": "Punjab",
                "note": "Cultural and business travel"
              }
            ]
          },
          {
            "t": "p",
            "text": "The fact that our travel solutions make us one of the most reliable agents when it comes cab booking in India for USA travellers."
          }
        ]
      },
      {
        "kind": "outstation",
        "heading": "Outstation Cab Service – Comfortable Long-Distance Travel",
        "blocks": [
          {
            "t": "p",
            "text": "If you’re planning intercity travel, our outstation cabs are ideal. Our Taxi service in India from USA covers both one-way and round-trip journeys."
          },
          {
            "t": "h3",
            "text": "Perfect for"
          },
          {
            "t": "ul",
            "items": [
              "Family vacations",
              "Religious tours",
              "Business travel",
              "Medical visits"
            ]
          },
          {
            "t": "p",
            "text": "Choose from sedans, SUVs, or premium vehicles driven by experienced chauffeurs who understand long-distance travel needs."
          }
        ]
      },
      {
        "kind": "corporate",
        "heading": "Corporate & Business Cab Service for US Visitors",
        "blocks": [
          {
            "t": "p",
            "text": "India is a major business hub, and we understand the needs of corporate travellers. Our Cab Service in India for USA travellers includes professional transport solutions for business visits."
          },
          {
            "t": "h3",
            "text": "Corporate Travel Benefits"
          },
          {
            "t": "ul",
            "items": [
              "Professional chauffeurs",
              "On-time, punctual service",
              "Corporate billing options",
              "Premium vehicles"
            ]
          },
          {
            "t": "p",
            "text": "NRIs, executives, and international professionals trust us for reliable cab booking in India from USA."
          }
        ]
      }
    ],
    "faqs": [
      {
        "question": "What payment options are available for USA customers?",
        "answer": "We accept international debit and credit cards, online transfers, and secure payment gateways, making it easy for USA customers to book without hassle."
      },
      {
        "question": "Can I schedule an airport pickup in advance?",
        "answer": "You can pre-book airport pickups across major Indian cities. Our driver will track your flight and arrive on time for a smooth transfer."
      },
      {
        "question": "Will I receive driver details before my trip?",
        "answer": "You will receive the driver’s name, contact number, and vehicle details prior to your scheduled pickup time."
      },
      {
        "question": "Can I modify or cancel my booking?",
        "answer": "You can modify or cancel your booking as per our cancellation policy. Simply contact our support team for quick assistance."
      }
    ]
  },
  {
    "locale": "en-gb",
    "code": "gb",
    "country": "United Kingdom",
    "short": "UK",
    "flag": "🇬🇧",
    "h1": "Cab Service in India from UK",
    "h1Tagline": "Safe, Reliable & Affordable Taxi Booking Across India",
    "sections": [
      {
        "kind": "intro",
        "heading": "",
        "blocks": [
          {
            "t": "p",
            "text": "India is a fascinating and fruitful place to travel to, and a visit to the United Kingdom offers an exciting and enriching experience. The reason behind the visit is either a holiday, business, family reunions, medical treatment, or spiritual travel."
          },
          {
            "t": "p",
            "text": "We offer a professional, comfortable, and fully trusted taxi service in India from the UK, designed specifically for British travellers who expect high service standards, clear communication, and complete peace of mind. Whether it is within the Airport transfer or a long-distance travel, our cab services offer stress-free and comfortable travel within India."
          }
        ]
      },
      {
        "kind": "why",
        "heading": "Why Choose Our Cab Service in India for UK Travellers?",
        "blocks": [
          {
            "t": "ul",
            "items": [
              "Background checked, skilled drivers to travel safely",
              "Well-maintained, air-conditioned, clean vehicles",
              "24/7 customer care services to provide immediate service",
              "Open price with no undisclosed fees",
              "Online reservation at any place in the UK",
              "English-speaking, friendly drivers",
              "Live tracking of GPS vehicles",
              "Find an international payment gateway with security"
            ]
          }
        ]
      },
      {
        "kind": "airport",
        "heading": "Airport Transfer Service in India for UK Travellers",
        "blocks": [
          {
            "t": "p",
            "text": "The last thing you desire after an international flight is confusion and delays. Our airport taxi service in India from the UK ensures timely pickups and drops with complete reliability."
          },
          {
            "t": "h3",
            "text": "Airport Transfer Features"
          },
          {
            "t": "ul",
            "items": [
              "Flight tracking for delays",
              "Meet & greet service",
              "On-time pickups",
              "Comfortable vehicles with ample luggage space"
            ]
          },
          {
            "t": "p",
            "text": "We will provide airport transport at the largest airports in Delhi, Mumbai, Bangalore, Chennai, Hyderabad, Kochi, and Jaipur."
          }
        ]
      },
      {
        "kind": "city",
        "heading": "City Taxi Service in India for UK Travellers",
        "blocks": [
          {
            "t": "p",
            "text": "With the Indian city taxis, it is easier to explore Indian cities. You may be meeting or sightseeing in the city, our Taxi service in India for UK travellers can be sure of a comfortable and safe travel in the city."
          },
          {
            "t": "h3",
            "text": "Popular Cities Served"
          },
          {
            "t": "cities",
            "items": [
              {
                "name": "Agra",
                "note": "Iconic heritage attractions"
              },
              {
                "name": "Varanasi",
                "note": "Spiritual centre"
              },
              {
                "name": "Ayodhya",
                "note": "Pilgrimage destination"
              },
              {
                "name": "Punjab",
                "note": "Business and cultural travel"
              }
            ]
          },
          {
            "t": "p",
            "text": "This makes us one of the most reliable options for cab booking in India for UK travellers."
          }
        ]
      },
      {
        "kind": "outstation",
        "heading": "Outstation Cab Service Across India",
        "blocks": [
          {
            "t": "p",
            "text": "In the event of going to or leaving one city for another, our outstation cab services will be the best. Our Cab Service in India from the UK offers one-way and round-trip options at affordable prices."
          },
          {
            "t": "h3",
            "text": "Ideal For"
          },
          {
            "t": "ul",
            "items": [
              "Family holidays",
              "Business travel",
              "Religious tours",
              "Medical visits"
            ]
          },
          {
            "t": "p",
            "text": "Select sedans, SUVs, and premium cars with qualified chauffeurs who drive miles."
          }
        ]
      },
      {
        "kind": "corporate",
        "heading": "Corporate & Business Cab Service for UK Visitors",
        "blocks": [
          {
            "t": "p",
            "text": "India has become an emerging international business destination. Our Taxi service in India from the UK supports corporate travellers with professional transport solutions."
          },
          {
            "t": "h3",
            "text": "Corporate Travel Benefits"
          },
          {
            "t": "ul",
            "items": [
              "Professional chauffeurs",
              "Punctual pickups",
              "Corporate billing options",
              "Premium vehicles"
            ]
          },
          {
            "t": "p",
            "text": "Business travellers and NRIs from the UK trust us for dependable cab booking in India from the UK."
          }
        ]
      },
      {
        "kind": "book",
        "heading": "Book Your Cab in India Today",
        "blocks": [
          {
            "t": "p",
            "text": "Looking for a safe, reliable, and affordable cab service in India from the UK? International travellers rely on our taxi services, which are professionally operated to ensure they are comfortable, timely, and transparent."
          }
        ]
      }
    ],
    "faqs": [
      {
        "question": "What is the best way of booking a cab in India from the UK?",
        "answer": "You may also make a reservation online on our site by paying in an international way. It is fast, safe, and confirmation is immediate."
      },
      {
        "question": "Is your UK taxi service safe in India?",
        "answer": "Yes. The drivers are all checked, the vehicles have GPS tracking, and the customer support is 24/7, which guarantees 100% safety."
      },
      {
        "question": "Pick up to airport in India?",
        "answer": "Yes, we have airport pick-up and drop services to all major Indian airports that track flights."
      },
      {
        "question": "Do you have English-speaking drivers?",
        "answer": "Yes. We offer competitive English-speaking drivers to facilitate communication during the trip."
      }
    ]
  },
  {
    "locale": "en-ca",
    "code": "ca",
    "country": "Canada",
    "short": "Canada",
    "flag": "🇨🇦",
    "h1": "Cab Service in India from Canada",
    "h1Tagline": "Safe, Reliable & Affordable Taxi Booking Across India",
    "sections": [
      {
        "kind": "intro",
        "heading": "",
        "blocks": [
          {
            "t": "p",
            "text": "A visit to India is a very thrilling experience, be it in the form of a touristic visit, business trip, family get-togethers, a medical visit, or spiritual journeys. Travelling to India is an interesting experience. Although the variety of experiences and diversity is indescribable, a matter of concern that international visitors to India will share is the issue of booking safe, reliable, and transparent transportation."
          },
          {
            "t": "p",
            "text": "We provide a professional, comfortable, and trusted taxi service in India from Canada, specially designed for Canadian travellers who expect international service standards, clear communication, and complete peace of mind."
          }
        ]
      },
      {
        "kind": "why",
        "heading": "Why Choose Our Cab Service in India for Canada Travellers?",
        "blocks": [
          {
            "t": "ul",
            "items": [
              "Experienced and background-verified drivers",
              "Clean, air-conditioned, and well-maintained vehicles",
              "24/7 customer support for immediate assistance",
              "Transparent pricing with no hidden charges",
              "Easy online booking from anywhere in Canada",
              "Friendly, English-speaking drivers",
              "GPS-enabled vehicles for real-time tracking",
              "Secure international payment options"
            ]
          }
        ]
      },
      {
        "kind": "airport",
        "heading": "Airport Transfer Service in India for Canada Travellers",
        "blocks": [
          {
            "t": "p",
            "text": "Airport transport is a necessity after an extended international flight. Our taxi service in India from Canada includes professional airport pickup and drop-off services at all major Indian airports."
          },
          {
            "t": "h3",
            "text": "Airport Transfer Features"
          },
          {
            "t": "ul",
            "items": [
              "Flight tracking to manage delays",
              "Meet & greet service at arrival terminals",
              "On-time pickups and drops",
              "Spacious vehicles for luggage"
            ]
          },
          {
            "t": "p",
            "text": "We have served major airports such as Delhi, Mumbai, Hyderabad, Kochi, and Jaipur."
          }
        ]
      },
      {
        "kind": "city",
        "heading": "City Taxi Service in India for Canada Travellers",
        "blocks": [
          {
            "t": "p",
            "text": "We offer professional city taxis, and this makes exploring the city of India easy and comfortable. Visiting family members, going on a sightseeing trip, or even a meeting, our Taxi service in India among Canadian travellers will give you safe and efficient travel to the city."
          },
          {
            "t": "h3",
            "text": "Popular Cities We Serve"
          },
          {
            "t": "cities",
            "items": [
              {
                "name": "Agra",
                "note": "World-famous heritage attractions"
              },
              {
                "name": "Varanasi",
                "note": "Spiritual heart of India"
              },
              {
                "name": "Ayodhya",
                "note": "Major pilgrimage destination"
              },
              {
                "name": "Punjab",
                "note": "Cultural and business travel"
              }
            ]
          },
          {
            "t": "p",
            "text": "This makes us one of the most dependable options for cab booking in India for Canada travellers."
          }
        ]
      },
      {
        "kind": "outstation",
        "heading": "Outstation Cab Service Across India",
        "blocks": [
          {
            "t": "p",
            "text": "Intend to travel within cities? Our outstation cab is suitable for long-distance travel. With our Cab Service in India from Canada, you can choose one-way or round-trip travel at affordable rates."
          },
          {
            "t": "h3",
            "text": "Ideal For"
          },
          {
            "t": "ul",
            "items": [
              "Family vacations",
              "Business travel",
              "Religious tours",
              "Medical visits"
            ]
          },
          {
            "t": "p",
            "text": "We also provide comfortable sedans, SUVs, and high-quality vehicles that are driven by well-trained chauffeurs who have been trained to make long trips."
          }
        ]
      },
      {
        "kind": "corporate",
        "heading": "Corporate & Business Cab Service for Canadian Visitors",
        "blocks": [
          {
            "t": "p",
            "text": "India has become a big business destination in the world. Our taxi service in India from Canada supports corporate travellers with reliable, professional transport solutions."
          },
          {
            "t": "h3",
            "text": "Corporate Travel Benefits"
          },
          {
            "t": "ul",
            "items": [
              "Professional chauffeurs",
              "Punctual and reliable pickups",
              "Corporate billing options",
              "Premium vehicles for executives"
            ]
          },
          {
            "t": "p",
            "text": "NRIs and business professionals from Canada trust us for seamless cab booking in India from Canada."
          }
        ]
      },
      {
        "kind": "book",
        "heading": "Book Your Cab in India Today",
        "blocks": [
          {
            "t": "p",
            "text": "Looking for a safe, reliable, and affordable cab service in India from Canada? International travellers rely on our professionally-managed taxi services to be comfortable, transparent, and on time."
          }
        ]
      }
    ],
    "faqs": [
      {
        "question": "How to book a taxi in India in Canada?",
        "answer": "Our online booking system is very convenient as it allows you to use international debit or credit cards and get a real-time confirmation."
      },
      {
        "question": "Is your taxi business safe to Canada travellers in India?",
        "answer": "Yes, all drivers are checked, vehicles are GPS-enabled, and there is 24/7 customer support that guarantees full safety."
      },
      {
        "question": "Are you offering pickup services to Canadians in India at the airports?",
        "answer": "Yes, we have airport pickup and drop services in all major Indian airports that track flights."
      },
      {
        "question": "Do you have English-speaking drivers?",
        "answer": "Yes, we have professional English-speaking drivers so that there is clear communication and comfort."
      }
    ]
  },
  {
    "locale": "en-au",
    "code": "au",
    "country": "Australia",
    "short": "Australia",
    "flag": "🇦🇺",
    "h1": "Cab Service in India from Australia",
    "h1Tagline": "Safe, Reliable & Affordable Taxi Booking Across India",
    "sections": [
      {
        "kind": "intro",
        "heading": "",
        "blocks": [
          {
            "t": "p",
            "text": "A trip to India is one of the thrilling and enriching experiences that one can ever have, be it as a leisure trip, business trip, family trip, medical therapy, or even spiritual research. Nevertheless, a major issue for international tourists is the organization of safe, reliable, and transparent transportation between the Indian cities."
          },
          {
            "t": "p",
            "text": "We offer professional, comfortable, and trusted taxi service in India and Australia, and it is well done, taking into consideration the expectations of the Australian traveller."
          }
        ]
      },
      {
        "kind": "why",
        "heading": "Why Choose Our Cab Service in India for Australia Travellers?",
        "blocks": [
          {
            "t": "ul",
            "items": [
              "Professional and background-checked drivers",
              "Well-maintained, clean, and air-conditioned cars",
              "24-7 customer service to ensure prompt response",
              "Clear pricing and no secret or surprise prices",
              "Online booking anytime, anywhere in Australia",
              "English-speaking, friendly, and professional drivers",
              "Real-time trip tracking with GPS vehicles",
              "Obtain international payment facilities"
            ]
          }
        ]
      },
      {
        "kind": "airport",
        "heading": "Airport Transfer Service in India for Australian Travellers",
        "blocks": [
          {
            "t": "p",
            "text": "Having traveled a long distance, it is necessary to have good airport transport. The professional airport pickup and drop services at all the major Indian airports are part of our taxi service in India for Australian travellers, hence giving an easy experience of arrival and departure."
          },
          {
            "t": "h3",
            "text": "Airport Transfer Features"
          },
          {
            "t": "ul",
            "items": [
              "Flight tracking to handle delays",
              "Meet & greet service at arrival terminals",
              "On-time pickups and drops",
              "Spacious vehicles with ample luggage space"
            ]
          },
          {
            "t": "p",
            "text": "We provide airport transfers at major airports across India, making travel convenient for Australian visitors arriving at different destinations."
          }
        ]
      },
      {
        "kind": "city",
        "heading": "City Taxi Service in India for Australian Travellers",
        "blocks": [
          {
            "t": "p",
            "text": "Our professional city taxi will make the exploration of Indian cities easy and comfortable. You can be sightseeing, visiting family, or even holding a meeting; in any case, travelling within the city, our Taxi service in India amongst Australian travellers provides you with safe, efficient, and comfortable travelling in the city."
          }
        ]
      },
      {
        "kind": "outstation",
        "heading": "Outstation Cab Service Across India",
        "blocks": [
          {
            "t": "p",
            "text": "Are you planning to make a trip to the cities of India? We have outstation cab services that are apt for long trips. Our Cab service in India offers an opportunity to select one-way transportation or a round trip at transparent and budget prices."
          },
          {
            "t": "h3",
            "text": "Ideal For"
          },
          {
            "t": "ul",
            "items": [
              "Family vacations",
              "Business travel",
              "Religious tours",
              "Medical visits"
            ]
          },
          {
            "t": "p",
            "text": "We have luxurious sedans, roomy SUVs, and luxury cars, which are driven by well-trained chauffeurs who are trained to complete long distances."
          }
        ]
      },
      {
        "kind": "corporate",
        "heading": "Corporate & Business Cab Service for Australian Visitors",
        "blocks": [
          {
            "t": "p",
            "text": "India is one of the key business and trade hubs worldwide. Our Indian taxi service to Australia is a corporate transport service in India that helps corporate travellers with high-quality and timely transport services that meet the requirements of the business environment."
          },
          {
            "t": "h3",
            "text": "Corporate Travel Benefits"
          },
          {
            "t": "ul",
            "items": [
              "Professional and well-trained chauffeurs",
              "Punctual and reliable pickups",
              "Corporate billing options",
              "Premium vehicles suitable for executives"
            ]
          },
          {
            "t": "p",
            "text": "NRIs and business professionals from Australia trust us for smooth and reliable cab booking in India from Australia."
          }
        ]
      },
      {
        "kind": "book",
        "heading": "Book Your Cab in India Today",
        "blocks": [
          {
            "t": "p",
            "text": "With easy online booking, secure international payment options, verified English-speaking drivers, and round-the-clock customer support, we ensure every journey across India is smooth and stress-free. Book your cab in India from Australia today and travel with complete peace of mind."
          }
        ]
      }
    ],
    "faqs": [
      {
        "question": "How can I book a cab in India from Australia?",
        "answer": "You can easily book online through our website using international debit or credit cards and receive instant confirmation."
      },
      {
        "question": "Is your taxi service in India safe for Australia travellers?",
        "answer": "Yes, all drivers are verified, vehicles are GPS-enabled, and 24/7 customer support ensures complete safety."
      },
      {
        "question": "Do you provide airport pickup services in India for Australians?",
        "answer": "Yes, we offer airport pickup and drop-off services at all major Indian airports with flight tracking."
      }
    ]
  },
  {
    "locale": "en-sg",
    "code": "sg",
    "country": "Singapore",
    "short": "Singapore",
    "flag": "🇸🇬",
    "h1": "Cab Service in India from Singapore",
    "h1Tagline": "Safe, Reliable & Affordable Taxi Booking Across India",
    "sections": [
      {
        "kind": "intro",
        "heading": "",
        "blocks": [
          {
            "t": "p",
            "text": "A trip to India in Singapore is a thrilling one, whether you are going in as a tourist, business, family, medical tourism, or spiritual tour. Nonetheless, safe and reliable transportation is one of the most frequent worries of international visitors who come to a country to arrange their transportation and feel safe at the destination."
          },
          {
            "t": "p",
            "text": "We provide a professional, comfortable, and trusted taxi service in India from Singapore, specially designed for Singapore travellers who expect international service standards, punctuality, and clear communication."
          }
        ]
      },
      {
        "kind": "why",
        "heading": "Why Choose Our Cab Service in India for Singapore Travellers?",
        "blocks": [
          {
            "t": "ul",
            "items": [
              "Experienced and background-verified drivers",
              "Clean, air-conditioned, and well-maintained vehicles",
              "24/7 customer support",
              "Transparent pricing",
              "Easy online booking from anywhere in Singapore",
              "English-speaking drivers",
              "GPS-enabled vehicles for real-time trip tracking",
              "Secure international payment options"
            ]
          },
          {
            "t": "p",
            "text": "We are proud to be recognised as a trusted cab booking service in India for Singapore travellers, used by tourists, NRIs, and business visitors alike."
          }
        ]
      },
      {
        "kind": "airport",
        "heading": "Airport Transfer Service in India for Singapore Travellers",
        "blocks": [
          {
            "t": "p",
            "text": "Among other things, airport transportation is vital after a tedious international voyage. Our taxi service in India from Singapore includes professional airport pickup and drop-off services at all major Indian airports."
          },
          {
            "t": "h3",
            "text": "Airport Transfer Features"
          },
          {
            "t": "ul",
            "items": [
              "Flight tracking to manage delays",
              "Meet & greet service at arrival terminals",
              "On-time pickups and drops",
              "Spacious vehicles for luggage"
            ]
          },
          {
            "t": "p",
            "text": "We serve major airports across India, including Delhi, Mumbai, Bangalore, Chennai, Hyderabad, Kochi, and Jaipur."
          }
        ]
      },
      {
        "kind": "city",
        "heading": "City Taxi Service in India for Singapore Travellers",
        "blocks": [
          {
            "t": "p",
            "text": "Travelling to Indian cities becomes easy and convenient with our professional city taxis. You may be sightseeing, paying visits, or you may be in meetings. Our taxi service in India to Singapore travellers must see to it that you travel in the city safely and efficiently."
          }
        ]
      },
      {
        "kind": "outstation",
        "heading": "Outstation Cab Service Across India",
        "blocks": [
          {
            "t": "p",
            "text": "Have a trip between cities in India that you are planning? Our outstation cab services are best used during long-distance traveling. With our Cab Service in India from Singapore, you can choose one-way or round-trip travel options at affordable and transparent rates."
          },
          {
            "t": "h3",
            "text": "Ideal For"
          },
          {
            "t": "ul",
            "items": [
              "Family vacations",
              "Business travel",
              "Religious tours",
              "Medical visits"
            ]
          },
          {
            "t": "p",
            "text": "We also provide comfortable sedans, SUVs, and up-class cars with a trained chauffeur that is specialized in long-distance trips, thus making the journey safe and comfortable."
          }
        ]
      },
      {
        "kind": "corporate",
        "heading": "Corporate & Business Cab Service for Singapore Visitors",
        "blocks": [
          {
            "t": "p",
            "text": "India is one of the most important business spots for Singaporean companies and professionals. Our taxi service in India from Singapore supports corporate travellers with reliable and professional transport solutions."
          },
          {
            "t": "h3",
            "text": "Corporate Travel Benefits"
          },
          {
            "t": "ul",
            "items": [
              "Professional and well-trained chauffeurs",
              "Punctual and reliable pickups",
              "Corporate billing options",
              "Premium vehicles for executives"
            ]
          },
          {
            "t": "p",
            "text": "Singaporean business travellers and NRIs rely on us to make hassle-free cab bookings in India."
          }
        ]
      },
      {
        "kind": "book",
        "heading": "Book Your Cab in India Today",
        "blocks": [
          {
            "t": "p",
            "text": "Easy online booking, high-level international payment, certain English-speaking drivers, and twenty-four-hour customer care make sure that every trip in India is free and stress-free. You can book your cab in India today and travel with all the peace of mind."
          }
        ]
      }
    ],
    "faqs": [
      {
        "question": "What is the way to book a cab in India in Singapore?",
        "answer": "On our site, you can make online reservations with international debit or credit cards and get an immediate confirmation."
      },
      {
        "question": "Is your taxi service to India safe to Singapore travellers?",
        "answer": "Yes, the drivers are all certified, the cars are GPS-equipped, and the customer care can be contacted 24/7, which guarantees absolute safety."
      },
      {
        "question": "Do you provide airport pickup services in India for Singapore travellers?",
        "answer": "Yes, we offer airport pickup and drop-off services at all major Indian airports with flight tracking."
      },
      {
        "question": "Are your drivers English-speaking?",
        "answer": "Yes, we provide professional English-speaking drivers for clear communication and comfort."
      }
    ]
  },
  {
    "locale": "en-de",
    "code": "de",
    "country": "Germany",
    "short": "Germany",
    "flag": "🇩🇪",
    "h1": "Cab Service in India for Germany Tourists",
    "h1Tagline": "Safe, Reliable & Affordable Taxi Booking Across India",
    "sections": [
      {
        "kind": "intro",
        "heading": "",
        "blocks": [
          {
            "t": "p",
            "text": "A tourist trip to India is an exciting, historical, cultural, and memorable journey for a German. India has it all, whether it is sightseeing the monuments and spiritual cities, trying the local food and the colourful markets. Nevertheless, safe, reliable and transparent transportation is one of the most significant elements of a comfortable holiday."
          },
          {
            "t": "p",
            "text": "Our cab services are available in all parts of India, be it airport transfers, sightseeing within the city, or long-distance travel, we will ensure that your travel within India will be stress-free, well-organized, and fun."
          }
        ]
      },
      {
        "kind": "why",
        "heading": "Why Choose Our Cab Service in India for German Tourists?",
        "blocks": [
          {
            "t": "ul",
            "items": [
              "Background checked and experienced drivers",
              "Well-maintained, clean, and air-conditioned cars",
              "24-hour customer care with direct response",
              "Clear pricing without any disguised prices",
              "Simple online reservation prior to or upon arrival",
              "The English-speaking drivers are professionals",
              "Real-time tracked GPS vehicles",
              "Ensure foreign payment methods"
            ]
          },
          {
            "t": "p",
            "text": "We boast of being rated as a reliable cab reservation service among the German tourists in India."
          }
        ]
      },
      {
        "kind": "airport",
        "heading": "Airport Transfer Service in India for German Tourists",
        "blocks": [
          {
            "t": "p",
            "text": "It is important to have a smooth transfer at the airport after a long international flight in Germany. India taxi service to German tourists involves the airport pickup and drop-off services in all major airports in India, conducted by skilled drivers."
          },
          {
            "t": "h3",
            "text": "Airport Transfer Features"
          },
          {
            "t": "ul",
            "items": [
              "Delay management through flight tracking",
              "Meet and greet services in arrival terminals",
              "On-time pickups and drops",
              "Roomy cars with large luggage capacity"
            ]
          },
          {
            "t": "p",
            "text": "Our airport transfer service will make sure that the German tourists will start their India trip comfortably and without any misunderstanding."
          }
        ]
      },
      {
        "kind": "city",
        "heading": "City Taxi Service in India for German Tourists",
        "blocks": [
          {
            "t": "p",
            "text": "Our professional taxi services to cities in India make it easy and fun to explore the city. Our taxi service in Germany and India can be used to ensure a safe and efficient transportation, whether you are sightseeing, shopping or participating in cultural events."
          },
          {
            "t": "h3",
            "text": "Popular Tourist Cities We Serve"
          },
          {
            "t": "cities",
            "items": [
              {
                "name": "Agra",
                "note": "Home to heritage monuments in the world"
              },
              {
                "name": "Jaipur",
                "note": "The Pink City with its forts and palaces"
              },
              {
                "name": "Varanasi",
                "note": "The Indian soul"
              },
              {
                "name": "Ayodhya",
                "note": "A very important place of pilgrimage"
              },
              {
                "name": "Delhi",
                "note": "Historic and contemporary places"
              }
            ]
          },
          {
            "t": "p",
            "text": "We have qualified local drivers and relaxed cars, thus making us one of the most reliable cab booking services in India among German tourists."
          }
        ]
      },
      {
        "kind": "outstation",
        "heading": "Outstation Cab Service for German Tourists",
        "blocks": [
          {
            "t": "p",
            "text": "When you have a travel plan of visiting more than one destination, then our out-of-station cab service would be the best."
          },
          {
            "t": "h3",
            "text": "Ideal For"
          },
          {
            "t": "ul",
            "items": [
              "Multi-city holiday tours",
              "Heritage and cultural trips",
              "Spiritual and religious pilgrimages",
              "Sightseeing in nature and hill stations"
            ]
          },
          {
            "t": "p",
            "text": "We provide luxurious sedans, roomy SUVs, and luxury cars with chauffeurs who are also trained to travel long distances, so that the travelling experience is comfortable."
          }
        ]
      },
      {
        "kind": "book",
        "heading": "Book Your Cab in India Today",
        "blocks": [
          {
            "t": "p",
            "text": "With easy reservations, safe payments, qualified English-speaking drivers, and 24-hour customer care, we make every trip in India a smooth sail. Don’t wait. Book your cab now and experience India safely and comfortably from the moment you arrive!"
          }
        ]
      }
    ],
    "faqs": [
      {
        "question": "How will German tourists reserve a cab in India?",
        "answer": "Our website allows German tourists to book easily online using international debit or credit cards and get an immediate confirmation."
      },
      {
        "question": "Does your taxi in India keep German tourists safe?",
        "answer": "Yes, all drivers are checked, cars are GPS-tracked, and customer support is 24/7, which guarantees maximum safety."
      },
      {
        "question": "Do you offer airport pickup services in India to German tourists?",
        "answer": "Yes, we provide airport pick and drop services at every major airport in India with flight tracking."
      },
      {
        "question": "Do you have English-speaking drivers?",
        "answer": "Yes, we provide professional English-speaking drivers to ensure easy communication and comfort."
      }
    ]
  },
  {
    "locale": "en-fr",
    "code": "fr",
    "country": "France",
    "short": "France",
    "flag": "🇫🇷",
    "h1": "Cab Service in India for France Tourists",
    "h1Tagline": "Safe, Reliable & Affordable Taxi Booking Across India",
    "sections": [
      {
        "kind": "intro",
        "heading": "",
        "blocks": [
          {
            "t": "p",
            "text": "A French tourist travelling to India is an immersive and rich experience of history, culture, spirituality and cuisine along with different landscapes. Nevertheless, safe, reliable, and transparent transportation is one of the most significant elements of having a good trip. And there, your reliable Cab Service in India to French tourists comes in."
          },
          {
            "t": "p",
            "text": "You can use our cab services to transfer to the airport, do some sightseeing in the city, or travel long distances between destinations without any hassle, chaos, or tension."
          }
        ]
      },
      {
        "kind": "why",
        "heading": "Why Choose Our Cab Service in India for French Tourists?",
        "blocks": [
          {
            "t": "ul",
            "items": [
              "Professional and background-checked drivers",
              "Well-kept, air-conditioned, and clean cars",
              "24/7 customer support to be able to help instantly",
              "No extra costs or hidden prices",
              "Convenient online reservation",
              "English-speaking professional drivers",
              "Real-time tracking by GPS-fitted vehicles",
              "Obtain foreign payment methods"
            ]
          },
          {
            "t": "p",
            "text": "We take pride in being a reliable cab booking service among French tourists visiting India, whether they come alone, as a couple, with family, or in a group."
          }
        ]
      },
      {
        "kind": "airport",
        "heading": "Airport Transfer Service in India for French Tourists",
        "blocks": [
          {
            "t": "p",
            "text": "Having a long international flight to France, a hassle-free airport pick-up will set the tone for your whole trip. Our French tourist taxi in India will be providing professional airport pick-up and drop-off services at all the major airports in India."
          },
          {
            "t": "h3",
            "text": "Airport Transfer Features"
          },
          {
            "t": "ul",
            "items": [
              "Flight monitoring to deal with delays",
              "Meet and greet service at the arrival terminals",
              "On-time pickups and drops",
              "Big cars with a lot of luggage"
            ]
          },
          {
            "t": "p",
            "text": "Airport transfer service will help French tourists start their journey to India without confusion and in a comfortable way."
          }
        ]
      },
      {
        "kind": "city",
        "heading": "City Taxi Service in India for French Tourists",
        "blocks": [
          {
            "t": "p",
            "text": "Our professional city taxi services make it easy and enjoyable to explore the Indian cities. You can sightsee, shop, or enjoy a cultural experience, but no matter what you are doing, our India taxi service to French tourists is a safe and efficient means of transportation."
          },
          {
            "t": "h3",
            "text": "Popular Tourist Cities We Serve"
          },
          {
            "t": "cities",
            "items": [
              {
                "name": "Agra",
                "note": "The world heritage monuments"
              },
              {
                "name": "Jaipur",
                "note": "The pink city of forts and palaces"
              },
              {
                "name": "Varanasi",
                "note": "The spiritual core of India"
              },
              {
                "name": "Ayodhya",
                "note": "A popular pilgrimage place"
              },
              {
                "name": "Delhi",
                "note": "Ancient sites and the contemporary locations of interest"
              }
            ]
          },
          {
            "t": "p",
            "text": "With highly qualified local drivers and comfortable cars, we are a reliable cab booking option in India for French tourists."
          }
        ]
      },
      {
        "kind": "outstation",
        "heading": "Outstation Cab Service for French Tourists",
        "blocks": [
          {
            "t": "p",
            "text": "If your itinerary includes another city, our outstation cab service is ideal. Our service in India for French tourists lets you explore various places comfortably and conveniently."
          },
          {
            "t": "h3",
            "text": "Ideal For"
          },
          {
            "t": "ul",
            "items": [
              "Multi-city holiday tours",
              "The cultural circuits and heritage",
              "Spiritual and religious trips",
              "Nature, hill stations and countryside touring"
            ]
          },
          {
            "t": "p",
            "text": "We provide sedans, spacious SUVs and high-end vehicles driven by highly trained chauffeurs who do long-distance trips."
          }
        ]
      },
      {
        "kind": "book",
        "heading": "Book Your Cab in India Today",
        "blocks": [
          {
            "t": "p",
            "text": "Our convenient booking, secure payments, certified English-speaking drivers, and 24/7 customer support ensure a pleasant trip throughout India. Book your cab today for a worry-free experience."
          }
        ]
      }
    ],
    "faqs": [
      {
        "question": "What will French tourists do to book a cab in India?",
        "answer": "It is possible to book online through our website and use an international debit or credit card, and they get a quick confirmation for French tourists."
      },
      {
        "question": "Is your taxi business in India secure for the French tourists?",
        "answer": "Yes, drivers are checked, vehicles are equipped with GPS, and 24/7 customer support guarantees total security."
      },
      {
        "question": "Is it offering airport pickup services to French tourists in India?",
        "answer": "Yes, we provide services of airport pickups and drops in all major airports in India that have flight tracking."
      },
      {
        "question": "Do you have drivers who speak English?",
        "answer": "Yes, we have professional English-speaking drivers to ease communication and provide comfort."
      }
    ]
  },
  {
    "locale": "en-it",
    "code": "it",
    "country": "Italy",
    "short": "Italy",
    "flag": "🇮🇹",
    "h1": "Cab Service in India for Italy Tourists",
    "h1Tagline": "Safe, Reliable & Affordable Taxi Booking Across India",
    "sections": [
      {
        "kind": "intro",
        "heading": "",
        "blocks": [
          {
            "t": "p",
            "text": "A trip to India as an Italian tourist is a rich and memorable experience that is full of ancient history, rich culture, spiritual pilgrimages, cultural monuments, and various sceneries.Nevertheless, in order to fully enjoy your trip, it is necessary to have safe, reliable, and transparent transportation. It is here that our Cab Service in India to Italy tourists comes in to be your reliable travelling companion."
          },
          {
            "t": "p",
            "text": "Airport transfers, sightseeing in the city, and transfers between two different destinations, our cab service will make sure that your trip in India is comfortable, well-planned, and without any hustle and bustle."
          }
        ]
      },
      {
        "kind": "why",
        "heading": "Why Choose Our Cab Service in India for Italian Tourists?",
        "blocks": [
          {
            "t": "ul",
            "items": [
              "Well-trained and experienced drivers",
              "Well-maintained, clean, and air-conditioned cars",
              "24/7 customer care",
              "Plain pricing that does not have any hidden fees",
              "Simple online reservation prior to or upon arrival",
              "English-speaking drivers",
              "Get safe global payment systems"
            ]
          },
          {
            "t": "p",
            "text": "It gives us pride to be considered a reliable cab booking service among Italian tourists in India, who prefer to use it individually, in couples, families, and group tours."
          }
        ]
      },
      {
        "kind": "airport",
        "heading": "Airport Transfer Service in India for Italian Tourists",
        "blocks": [
          {
            "t": "p",
            "text": "Our taxi services for Indian tourists to Italy will include professional airport pickup and drop-off services in all the major Indian airports."
          },
          {
            "t": "h3",
            "text": "Airport Transfer Features"
          },
          {
            "t": "ul",
            "items": [
              "Tracking of flights to control delays",
              "Meet and greet service at arrival terminals",
              "On-time pickups and drops",
              "Large cars with a lot of luggage space"
            ]
          },
          {
            "t": "p",
            "text": "Our airport transfer service will make the Italian tourists start their journey to India in a relaxed and unconfused way."
          }
        ]
      },
      {
        "kind": "city",
        "heading": "City Taxi Service in India for Italian Tourists",
        "blocks": [
          {
            "t": "p",
            "text": "It is simple and fun to explore the Indian cities using our professional city taxi services. You may be touring, shopping, or doing some culture, but whatever you may be, our taxi service in India for tourists in Italy will make your travel safe and effective."
          },
          {
            "t": "h3",
            "text": "Popular Tourist Cities We Serve"
          },
          {
            "t": "cities",
            "items": [
              {
                "name": "Agra",
                "note": "The land of heritage monuments in the world"
              },
              {
                "name": "Jaipur",
                "note": "The Pink City with forts and palaces"
              },
              {
                "name": "Varanasi",
                "note": "The spiritual center of India"
              },
              {
                "name": "Ayodhya",
                "note": "An important pilgrimage site"
              },
              {
                "name": "Delhi",
                "note": "Historic monuments and contemporary sites"
              }
            ]
          },
          {
            "t": "p",
            "text": "Our well-educated drivers and comfortable cars make us a reliable choice for Italian tourists booking a cab in India."
          }
        ]
      },
      {
        "kind": "outstation",
        "heading": "Outstation Cab Service for Italian Tourists",
        "blocks": [
          {
            "t": "p",
            "text": "If your travel plan includes multiple destinations, our outstation cab service is the ideal option. Italian tourists can travel safely and comfortably between cities in India."
          },
          {
            "t": "h3",
            "text": "Ideal For"
          },
          {
            "t": "ul",
            "items": [
              "Multi-city holiday tours",
              "Cultural circuits and heritage",
              "Spiritual and religious travels",
              "Nature excursions and mountain resorts"
            ]
          },
          {
            "t": "p",
            "text": "Our services include comfortable sedans, roomy SUVs, and high-end vehicles with highly trained chauffeurs who are trained to make long trips."
          }
        ]
      },
      {
        "kind": "book",
        "heading": "Book Your Cab in India Today",
        "blocks": [
          {
            "t": "p",
            "text": "Easy reservation, trustworthy payments, English-speaking, and 24/7 customer care make us confident that all the trips in India will be comfortable and pleasant. Book your cab today and explore India with complete peace of mind."
          }
        ]
      }
    ],
    "faqs": [
      {
        "question": "How do Italian tourists order a cab in India?",
        "answer": "Tourists in Italy can easily make their bookings online through our site using international debit or credit cards and receive the confirmation immediately."
      },
      {
        "question": "Is your taxi system in India safe for Italian tourists?",
        "answer": "Drivers are all verified, cars are GPS-tracked, and the customer service is 24/7, which guarantees full safety."
      },
      {
        "question": "Do you offer airport pickup services to Italian tourists in India?",
        "answer": "We provide airport pick-up and drop-off services in all the major Indian airports where we have flight tracking."
      },
      {
        "question": "Do you have English-speaking drivers?",
        "answer": "We offer professional English-speaking drivers to make it easy and comfortable to communicate."
      }
    ]
  },
  {
    "locale": "en-es",
    "code": "es",
    "country": "Spain",
    "short": "Spain",
    "flag": "🇪🇸",
    "h1": "Cab Service in India for Spain Tourists",
    "h1Tagline": "Safe, Reliable & Affordable Taxi Booking Across India",
    "sections": [
      {
        "kind": "intro",
        "heading": "",
        "blocks": [
          {
            "t": "p",
            "text": "Being a tourist visiting India is a rich and colourful experience in Spain, full of ancient history, colourful traditions, spiritual places, royal palaces, and different landscapes. Nevertheless, to have a great time, it is necessary to have safe, reliable, and transparent transportation."
          },
          {
            "t": "p",
            "text": "Our taxi service to Spanish tourists in India is a professional, comfortable, and reliable service that is aimed at satisfying the international travel requirements."
          }
        ]
      },
      {
        "kind": "why",
        "heading": "Why Choose Our Cab Service in India for Spanish Tourists?",
        "blocks": [
          {
            "t": "ul",
            "items": [
              "Professional and background-checked drivers",
              "Well-maintained, clean and air-conditioned vehicles",
              "24/7 customer care services in real time",
              "No hidden cost pricing",
              "Online reservation before or during your trip",
              "English-speaking drivers who are professional",
              "Real-time tracking by use of GPS-enabled vehicles",
              "Obtain foreign payment facilities"
            ]
          },
          {
            "t": "p",
            "text": "We are also honoured to be ranked as the reliable cab booking service in India among Spanish tourists who are favoured by individual travellers, couples, families, and group tours."
          }
        ]
      },
      {
        "kind": "airport",
        "heading": "Airport Transfer Service in India for Spanish Tourists",
        "blocks": [
          {
            "t": "p",
            "text": "Having taken a flight to Spain, you have taken a long journey internationally, and a comfortable airport pickup is the beginning of the whole trip. The taxi service in India for Spanish tourists will involve professional airport pick-up and drop-off services to all major airports in India."
          },
          {
            "t": "h3",
            "text": "Airport Transfer Features"
          },
          {
            "t": "ul",
            "items": [
              "Flight tracking to deal with delays",
              "The services at the point of arrival (meet and greet)",
              "On-time pickups and drops",
              "Large cars with lots of luggage space"
            ]
          },
          {
            "t": "p",
            "text": "Our airport transfer will make sure that the Spanish tourists have a journey to India that is stress-free and devoid of misunderstandings."
          }
        ]
      },
      {
        "kind": "city",
        "heading": "City Taxi Service in India for Spanish Tourists",
        "blocks": [
          {
            "t": "p",
            "text": "Our services of city taxis that are operated professionally make exploring Indian cities easy and enjoyable. Our taxi service in India, as a tourist to Spain, will provide safe and efficient travel."
          },
          {
            "t": "h3",
            "text": "Popular Tourist Cities We Serve"
          },
          {
            "t": "cities",
            "items": [
              {
                "name": "Agra",
                "note": "The city of heritage monuments in the world"
              },
              {
                "name": "Jaipur",
                "note": "The pink city of forts and palaces"
              },
              {
                "name": "Varanasi",
                "note": "The spiritual centre of India"
              },
              {
                "name": "Delhi",
                "note": "Sightseeing places of interest and contemporary places"
              }
            ]
          },
          {
            "t": "p",
            "text": "We have experienced local drivers and spacious vehicles, which makes us one of the most reliable choices when it comes to cab booking in India for Spanish tourists."
          }
        ]
      },
      {
        "kind": "outstation",
        "heading": "Outstation Cab Service for Spain Tourists",
        "blocks": [
          {
            "t": "p",
            "text": "In case you are going to cities, our outstation cab service is the best option. You will be able to visit various places with our taxi service in India, among tourists from Spain."
          },
          {
            "t": "h3",
            "text": "Ideal For"
          },
          {
            "t": "ul",
            "items": [
              "Multi-city holiday tours",
              "The heritage and cultural circuits",
              "Pilgrimages of religion and spirituality",
              "Travels in nature, hill stations and countryside"
            ]
          },
          {
            "t": "p",
            "text": "We have luxurious sedans, roomy SUVs, and luxury cars with skilled drivers who have been trained to drive long distances."
          }
        ]
      },
      {
        "kind": "book",
        "heading": "Book Your Cab in India Today",
        "blocks": [
          {
            "t": "p",
            "text": "Booking with ease, safe payments, English-speaking drivers that are verified, and 24/7 customer care make any trip within India easy and pleasurable. Get a cab today and travel to India with all the peace of mind."
          }
        ]
      }
    ],
    "faqs": [
      {
        "question": "How do Spanish tourists reserve a cab in India?",
        "answer": "Our site allows Spanish tourists to book online with ease using an international debit or credit card and also get immediate confirmation."
      },
      {
        "question": "Is your taxi business in India safe for Spanish tourists?",
        "answer": "All drivers are checked, and cars are equipped with GPS, and 24/7 customer support guarantees full safety."
      },
      {
        "question": "Do you offer airport pickup services to tourists visiting Spain in India?",
        "answer": "We have airport pickup and drop services in all the major Indian airports with flight tracking."
      },
      {
        "question": "Do you have English-speaking drivers?",
        "answer": "We offer professional English-speaking drivers to facilitate communication and ease."
      }
    ]
  },
  {
    "locale": "en-jp",
    "code": "jp",
    "country": "Japan",
    "short": "Japan",
    "flag": "🇯🇵",
    "h1": "Cab Service in India for Japan Tourists",
    "h1Tagline": "Safe, Reliable & Affordable Taxi Booking Across India",
    "sections": [
      {
        "kind": "intro",
        "heading": "",
        "blocks": [
          {
            "t": "p",
            "text": "As a Japanese tourist, visiting India is an interesting experience with ancient culture, spiritual sites, historical sites, colourful festivals, and different landscapes. In order to fully appreciate this adventure, it is important to have safe, reliable, and transparent means of transportation. Your reliable travelling companion in the Indian Cab Service to Japan tourists."
          },
          {
            "t": "p",
            "text": "We offer a reliable, comfortable, and professional taxi service in India to Japanese tourists and tailor it to suit international traveling expectations."
          }
        ]
      },
      {
        "kind": "why",
        "heading": "Why Choose Our Cab Service in India for Japan Tourists?",
        "blocks": [
          {
            "t": "ul",
            "items": [
              "Professional and background-checked drivers",
              "Well-maintained, clean, and air-conditioned vehicles",
              "24/7 customer care",
              "No hidden costs",
              "Online reservation prior to or during travel",
              "English-speaking professional drivers",
              "Real-time tracking of cars with GPS",
              "Foreign currency payments are available"
            ]
          },
          {
            "t": "p",
            "text": "We take pride in the fact that we are a reliable cab booking service among Japanese tourists in India, who prefer to use it during solo travel, couple travel, family travel, and group tours."
          }
        ]
      },
      {
        "kind": "airport",
        "heading": "Airport Transfer Service in India for Japanese Tourists",
        "blocks": [
          {
            "t": "p",
            "text": "Having spent a long international flight in Japan, a comfortable airport pickup is the beginning of your whole journey. Professional airport drop and airport pickup services are part of our taxi service to Japanese tourists in India, which covers all the major airports in India."
          },
          {
            "t": "h3",
            "text": "Airport Transfer Features"
          },
          {
            "t": "ul",
            "items": [
              "Delay management through flight tracking",
              "Meet and greet services at the arrival terminals",
              "On-time pickups and drops",
              "Large cars that have a lot of luggage room"
            ]
          },
          {
            "t": "p",
            "text": "By offering airport transfer service, we will make sure that Japanese tourists start their journey to India in a peaceful and uncomplicated way."
          }
        ]
      },
      {
        "kind": "city",
        "heading": "City Taxi Service in India for Japan Tourists",
        "blocks": [
          {
            "t": "p",
            "text": "Our taxi service in India for Japanese tourists is safe and efficient as you sightsee, shop, or have a cultural experience in our city."
          },
          {
            "t": "h3",
            "text": "Popular Tourist Cities We Serve"
          },
          {
            "t": "cities",
            "items": [
              {
                "name": "Agra",
                "note": "The land of heritage monuments of the world"
              },
              {
                "name": "Jaipur",
                "note": "The Pink City of forts and palaces"
              },
              {
                "name": "Varanasi",
                "note": "The city of spirituality in India"
              },
              {
                "name": "Ayodhya",
                "note": "An important pilgrimage center"
              },
              {
                "name": "Delhi",
                "note": "History and contemporary sightseeing"
              }
            ]
          },
          {
            "t": "p",
            "text": "We have experienced local drivers and comfortable cars, and thus we are among the most reliable cab booking services with Japan tourists in India."
          }
        ]
      },
      {
        "kind": "outstation",
        "heading": "Outstation Cab Service for Japan Tourists",
        "blocks": [
          {
            "t": "p",
            "text": "In our cab service in India, among the Japanese tourists, you will be in a position to enjoy various sites comfortably and safely."
          },
          {
            "t": "h3",
            "text": "Ideal For"
          },
          {
            "t": "ul",
            "items": [
              "Multi-city holiday tours",
              "Cultural and heritage routes",
              "Spiritual and religious trips",
              "Travel in nature, hill stations, and the countryside"
            ]
          },
          {
            "t": "p",
            "text": "Our products include comfortable sedans, large SUVs, and high-quality vehicles with skilled chauffeurs who have been trained for long-distance journeys."
          }
        ]
      },
      {
        "kind": "book",
        "heading": "Book Your Cab in India Today",
        "blocks": [
          {
            "t": "p",
            "text": "Easy booking, safe payments, certified English-speaking drivers, and 24/7 customer service will make each trip in India pleasant and effortless. Get a cab booked today and get to explore India with all the peace of mind."
          }
        ]
      }
    ],
    "faqs": [
      {
        "question": "How will the Japanese tourists be able to book a cab in India?",
        "answer": "Through our site, Japanese tourists are able to book online easily using an international debit or credit card and get immediate confirmation."
      },
      {
        "question": "Is your taxi business in India secure to Japan tourists?",
        "answer": "Drivers are all verified, cars are equipped with a GPS system, and the customer care is 24/7, which makes sure that everything is safe."
      },
      {
        "question": "Do you offer airport pick-up services to Japanese tourists in India?",
        "answer": "We provide airport pickup and drop-off services in all the major airports in India with flight tracking."
      },
      {
        "question": "Do you have English-speaking drivers?",
        "answer": "We do have professional English-speaking drivers to communicate and be comfortable."
      }
    ]
  },
  {
    "locale": "en-ae",
    "code": "ae",
    "country": "UAE (Dubai)",
    "short": "UAE",
    "flag": "🇦🇪",
    "h1": "Cab Service in India for UAE (Dubai) Tourists",
    "h1Tagline": "Safe, Reliable & Affordable Taxi Booking Across India",
    "sections": [
      {
        "kind": "intro",
        "heading": "",
        "blocks": [
          {
            "t": "p",
            "text": "As a UAE and more so Dubai tourist, travelling to India is a thrilling experience that is full of heritage, spirituality, luxury shopping, medical tourism and exploring the culture. In order to have a relaxing vacation, it is necessary to have safe, secure, and open transportation."
          },
          {
            "t": "p",
            "text": "We offer comfortable, professional, and trusted taxi services in India to UAE tourists in a form that is aimed at satisfying international standards and expectations of the Dubai-based travellers."
          }
        ]
      },
      {
        "kind": "why",
        "heading": "Why Choose Our Cab Service in India for UAE (Dubai) Tourists?",
        "blocks": [
          {
            "t": "ul",
            "items": [
              "Verified and experienced drivers",
              "Well-maintained, clean and air-conditioned cars",
              "24/7 customer care to get in touch",
              "No secretive prices",
              "Simple online reservation prior to or during travelling",
              "English-speaking professional drivers",
              "Real-time trip tracking of cars with GPS capabilities",
              "Ensure foreign payment channels"
            ]
          },
          {
            "t": "p",
            "text": "It is our pride to be known as a reliable cab booking service in India among UAE (Dubai) tourists as a choice for families, couples, individual travellers, and group tours."
          }
        ]
      },
      {
        "kind": "airport",
        "heading": "Airport Transfer Service in India for UAE (Dubai) Tourists",
        "blocks": [
          {
            "t": "p",
            "text": "Having flown a long distance, particularly between Dubai and other UAE cities, a comfortable airport pick-up will predetermine the whole journey. Our taxi service among the UAE tourists in India involves professional airport pickup and drop-off services at every major airport in India."
          },
          {
            "t": "h3",
            "text": "Airport Transfer Features"
          },
          {
            "t": "ul",
            "items": [
              "Delay management through flight tracking",
              "Arrival terminal meet and greet service",
              "On-time pickups and drops",
              "Roomy cars that have a large luggage capacity"
            ]
          },
          {
            "t": "p",
            "text": "Our airport transfer service will see the UAE tourists start their India journey without being late and without confusion."
          }
        ]
      },
      {
        "kind": "city",
        "heading": "City Taxi Service in India for UAE Tourists",
        "blocks": [
          {
            "t": "p",
            "text": "Our professional taxi services make it easy and entertaining to explore the Indian cities. Our UAE tourist taxi service in India can take care of you whether you are sightseeing, shopping, attending events or visiting relatives in our city, as it will be safe and efficient."
          },
          {
            "t": "cities",
            "items": [
              {
                "name": "Agra",
                "note": "Home to world-famous heritage monuments"
              },
              {
                "name": "Jaipur",
                "note": "Forts and palaces, the pink city"
              },
              {
                "name": "Varanasi",
                "note": "India’s sacred spiritual city"
              },
              {
                "name": "Ayodhya",
                "note": "Major pilgrimage destination"
              }
            ]
          },
          {
            "t": "p",
            "text": "We have an excellent team of seasoned local drivers and comfortable vehicles to be relied on as one of the most reliable cab booking companies in India for tourists visiting."
          }
        ]
      },
      {
        "kind": "outstation",
        "heading": "Outstation Cab Service for UAE Tourists",
        "blocks": [
          {
            "t": "p",
            "text": "When you use our cab service in India as a tourist in the UAE, you will be able to visit various destinations in a safe and comfortable manner."
          },
          {
            "t": "h3",
            "text": "Ideal For"
          },
          {
            "t": "ul",
            "items": [
              "Multi-city holiday tours",
              "Inspiration and religious pilgrimages",
              "Medical tourism travel",
              "Heritage and cultural loops"
            ]
          },
          {
            "t": "p",
            "text": "We provide luxury cars, roomy SUVs, and comfortable sedans that are operated by highly trained chauffeurs who are trained to make long trips."
          }
        ]
      },
      {
        "kind": "book",
        "heading": "Book Your Cab in India Today",
        "blocks": [
          {
            "t": "p",
            "text": "Need a secure, trustworthy, and inexpensive cab ride in India among the tourists in the UAE (Dubai)? International travellers rely on our taxi services that are professionally managed and offer comfort, transparency, and punctuality."
          }
        ]
      }
    ],
    "faqs": [
      {
        "question": "How do UAE (Dubai) tourists reserve a cab in India?",
        "answer": "Our site also allows UAE tourists to make their online bookings conveniently using international debit or credit cards and get an immediate confirmation."
      },
      {
        "question": "Is your taxi business safe for UAE tourists in India?",
        "answer": "Yes, all the drivers are checked, cars are GPS-equipped, and 24/7 customer service guarantees maximum safety."
      },
      {
        "question": "Do you offer airport pickup services to UAE tourists in India?",
        "answer": "Yes, we provide airport pickup and drop-off services in all major airports in India with flight tracking."
      },
      {
        "question": "Do you have English-speaking drivers?",
        "answer": "Yes, we offer professional English-speaking drivers to communicate easily and to be comfortable."
      }
    ]
  },
  {
    "locale": "en-ch",
    "code": "ch",
    "country": "Switzerland",
    "short": "Switzerland",
    "flag": "🇨🇭",
    "h1": "Cab Service in India for Switzerland Tourists",
    "h1Tagline": "Safe, Reliable & Affordable Taxi Booking Across India",
    "sections": [
      {
        "kind": "intro",
        "heading": "",
        "blocks": [
          {
            "t": "p",
            "text": "A Swiss tourist visiting India is indeed a rich experience journey and a blend of old traditions, religious sites, diverse cultures, royal structures, and various scenery. A comfortable means of travelling through this journey is to have safe, reliable and transparent transportation."
          },
          {
            "t": "p",
            "text": "Our services include a comfortable, professional and reliable taxi in India among the Swiss tourists and are aimed at the international travel standards."
          }
        ]
      },
      {
        "kind": "why",
        "heading": "Why Choose Our Cab Service in India for Switzerland Tourists?",
        "blocks": [
          {
            "t": "ul",
            "items": [
              "Background-qualified and experienced drivers",
              "Crystal clean, air-conditioned, and well-maintained cars",
              "24/7 customer care in case of immediate help",
              "Open pricing with no hidden fees",
              "Online reservation of your trip before or during",
              "English-speaking professionals are driving",
              "Real-time tracking of vehicles that are GPS-enabled",
              "Find safe foreign methods of payment"
            ]
          },
          {
            "t": "p",
            "text": "We take pride in the fact that we are a reputed cab booking service among Indian tourists to Switzerland, who choose to travel solo, in couples, families, and group tours."
          }
        ]
      },
      {
        "kind": "airport",
        "heading": "Airport Transfer Service in India for Switzerland Tourists",
        "blocks": [
          {
            "t": "p",
            "text": "The airport pickup is well organised after a long international flight in Switzerland, and this is the beginning of a relaxing trip. Our Switzerland tourist taxi service in India involves professional services of airport drop and pickup at all major Indian airports."
          },
          {
            "t": "h3",
            "text": "Airport Transfer Features"
          },
          {
            "t": "ul",
            "items": [
              "Delay management through flight tracking",
              "Airport meet and greet service at the arrival terminals",
              "On-time pickups and drops",
              "Roomy cars with plenty of luggage"
            ]
          },
          {
            "t": "p",
            "text": "We also have an airport transfer service that will make sure that the Swiss tourists start their journey in India in a comfortable and hassle free way."
          }
        ]
      },
      {
        "kind": "city",
        "heading": "City Taxi Service in India for Switzerland Tourists",
        "blocks": [
          {
            "t": "p",
            "text": "You can be doing sightseeing, shopping or even doing cultural experiences, but with our city taxi services in India to Switzerland tourists, you will be assured of safe and efficient traveling."
          },
          {
            "t": "h3",
            "text": "Popular Tourist Cities We Serve"
          },
          {
            "t": "cities",
            "items": [
              {
                "name": "Delhi",
                "note": "Old Delhi and new Delhi"
              },
              {
                "name": "Agra",
                "note": "The city of the world-renowned heritage monuments"
              },
              {
                "name": "Jaipur",
                "note": "The Pink City that has forts and palaces"
              },
              {
                "name": "Varanasi",
                "note": "The Hindu capital of the world"
              },
              {
                "name": "Ayodhya",
                "note": "A prominent pilgrimage site"
              }
            ]
          },
          {
            "t": "p",
            "text": "Having qualified local drivers and comfortable vehicles, we are among the most reliable when it comes to booking a cab in India in case of Switzerland tourists."
          }
        ]
      },
      {
        "kind": "outstation",
        "heading": "Outstation Cab Service for Switzerland Tourists",
        "blocks": [
          {
            "t": "p",
            "text": "Through our cab service in India for the Switzerland tourists, you will be able to visit several cities in comfort and safety."
          },
          {
            "t": "h3",
            "text": "Ideal For"
          },
          {
            "t": "ul",
            "items": [
              "Multi-city holiday tours",
              "Cultural circuits and heritage",
              "Spiritual and religious pilgrimages",
              "Nature tours and mountain resorts"
            ]
          },
          {
            "t": "p",
            "text": "We provide comfortable sedans, spacious SUVs and high-end vehicles that are driven by seasoned chauffeurs who are trained to go on long distances."
          }
        ]
      },
      {
        "kind": "book",
        "heading": "Book Your Cab in India Today",
        "blocks": [
          {
            "t": "p",
            "text": "We make all journeys in India hassle-free and comfortable with hassle-free booking, guaranteed secure payments, certified English-speaking drivers, and 24/7 customer care. Book your cab today and explore India with complete peace of mind."
          }
        ]
      }
    ],
    "faqs": [
      {
        "question": "What will Swiss tourists do to book a cab in India?",
        "answer": "Our site allows Swiss tourists to easily book online using international debit or credit cards and get an instant confirmation."
      },
      {
        "question": "Is your taxi service in India safe for Swiss tourists?",
        "answer": "Yes, every driver is certified, cars have GPS, and customer service is 24/7, which guarantees full security."
      },
      {
        "question": "Do you offer airport pickup services to Swiss tourists in India?",
        "answer": "Yes, we provide airport pickup and drop-off services in all major airports in India that have flight tracking."
      },
      {
        "question": "Do you have English-speaking drivers?",
        "answer": "Yes, we offer professional English-speaking drivers who can easily communicate with."
      }
    ]
  },
  {
    "locale": "en-nl",
    "code": "nl",
    "country": "Netherlands",
    "short": "Netherlands",
    "flag": "🇳🇱",
    "h1": "Cab Service in India for Netherlands (Holland) Tourists",
    "h1Tagline": "",
    "sections": [
      {
        "kind": "intro",
        "heading": "",
        "blocks": [
          {
            "t": "p",
            "text": "A visit to India as a tourist (Holland) is a thrilling and culturally enriching experience. To fully enjoy this adventure without any stress, it is important to have safe, reliable and transparent transportation."
          },
          {
            "t": "p",
            "text": "Our cab services allow you to travel throughout India without any hassles, inconveniences, or worry about whether you will get to your destination or not, whether it is airport transfers, sightseeing in the city, or a long-distance trip."
          }
        ]
      },
      {
        "kind": "why",
        "heading": "Why Choose Our Cab Service in India for Netherlands (Holland) Tourists?",
        "blocks": [
          {
            "t": "ul",
            "items": [
              "Skilled and background-qualified drivers",
              "Well-maintained, clean, and air-conditioned cars",
              "24/7 customer care to be helped instantly",
              "No hidden costs or prices",
              "Pre-trip or in-trip online reservations",
              "English-speaking professional drivers",
              "Real-time tracking of vehicles with GPS",
              "Obtain foreign payment modes"
            ]
          },
          {
            "t": "p",
            "text": "We take pride in being considered a reliable cab booking service in India among tourists from the Netherlands."
          }
        ]
      },
      {
        "kind": "airport",
        "heading": "Airport Transfer Service in India for Netherlands (Holland) Tourists",
        "blocks": [
          {
            "t": "p",
            "text": "Having arrived at the airport on a long international flight in the Netherlands, a comfortable airport pickup is a precondition of the whole trip. Netherlands tourists visiting India have their own taxi services, which entail all major Indian airports' professional pickup and drop-off services."
          },
          {
            "t": "h3",
            "text": "Airport Transfer Features"
          },
          {
            "t": "ul",
            "items": [
              "Delay management by tracking flights",
              "Meet and greet services at the arrival terminals",
              "On-time pickups and drops",
              "Vehicles with a lot of luggage capacity"
            ]
          },
          {
            "t": "p",
            "text": "Our airport transfer service will help Dutch tourists start their journey in India without any hassles and confusion."
          }
        ]
      },
      {
        "kind": "city",
        "heading": "City Taxi Service in India for Netherlands (Holland) Tourists",
        "blocks": [
          {
            "t": "p",
            "text": "Our city taxi services make it easy and fun to explore the Indian cities. Our city taxi service in India, serving Dutch tourists, will provide them with safety and efficiency, whether it is sightseeing, shopping, or cultural experiences."
          },
          {
            "t": "h3",
            "text": "Popular Tourist Cities We Serve"
          },
          {
            "t": "cities",
            "items": [
              {
                "name": "Delhi",
                "note": "Sights and attractions of antiquity and modernity"
              },
              {
                "name": "Agra",
                "note": "The land of heritage monuments in the world"
              },
              {
                "name": "Jaipur",
                "note": "The Pink City of forts and palaces"
              },
              {
                "name": "Varanasi",
                "note": "The spiritual centre of India"
              },
              {
                "name": "Ayodhya",
                "note": "One of the key pilgrimages"
              }
            ]
          },
          {
            "t": "p",
            "text": "We have skilled local drivers and comfortable cars, and hence one of the most reliable services when it comes to booking a cab in India to the Netherlands (Holland) tourist."
          }
        ]
      },
      {
        "kind": "outstation",
        "heading": "Outstation Cab Service for Netherlands (Holland) Tourists",
        "blocks": [
          {
            "t": "p",
            "text": "Outstation cab is the best option in case your travel schedule involves visiting various places. Our cab service for tourists from the Netherlands in India is a safe and comfortable way to travel between cities."
          },
          {
            "t": "h3",
            "text": "Ideal For"
          },
          {
            "t": "ul",
            "items": [
              "Multi-city holiday tours",
              "Heritage and cultural circuits",
              "Spiritual and religious trips",
              "Nature tourism and hill stations"
            ]
          },
          {
            "t": "p",
            "text": "Our business targets provide comfortable sedans, roomy SUVs, and high-quality cars with skilled chauffeurs who have undergone training to drive over long distances."
          }
        ]
      },
      {
        "kind": "book",
        "heading": "Book Your Cab in India Today",
        "blocks": [
          {
            "t": "p",
            "text": "Need a safe, reliable and affordable cab service in India among tourists from the Netherlands (Holland)? International travellers have confidence in our professionally operated taxi services as they are more comfortable, transparent and punctual."
          }
        ]
      }
    ],
    "faqs": [
      {
        "question": "How do the Netherlands (Holland) tourists reserve a cab in India?",
        "answer": "Our site provides tourists in the Netherlands with an easy opportunity to book online with international debit or credit cards and also get instant confirmation."
      },
      {
        "question": "Is your taxi business in India secure for Dutch tourists?",
        "answer": "All drivers are checked, cars are GPS-verified, and 24/7 customer service is the guarantee of full safety."
      },
      {
        "question": "Are you offering airport pick-up services to Dutch tourists in India?",
        "answer": "We provide airport pick and drop services in all major Indian airports with flight tracking."
      },
      {
        "question": "Do you have English-speaking drivers?",
        "answer": "We offer professional English-speaking drivers to ensure easy communication and comfort."
      }
    ]
  },
  {
    "locale": "en-nz",
    "code": "nz",
    "country": "New Zealand",
    "short": "New Zealand",
    "flag": "🇳🇿",
    "h1": "Cab Service in India for New Zealand Tourists",
    "h1Tagline": "",
    "sections": [
      {
        "kind": "intro",
        "heading": "",
        "blocks": [
          {
            "t": "p",
            "text": "Visiting India as a New Zealand tourist is a life-long experience, and there is so much history, spiritual tours, landmarks, colourful markets and landscapes. In order to make this journey comfortable and confident, it is necessary to have safe, reliable and transparent transportation."
          },
          {
            "t": "p",
            "text": "We offer a professional, comfortable, and reliable taxi service in India to New Zealand tourists, which is aimed at satisfying the international travel requirements."
          }
        ]
      },
      {
        "kind": "why",
        "heading": "Why Choose Our Cab Service in India for New Zealand Tourists?",
        "blocks": [
          {
            "t": "ul",
            "items": [
              "Skilled and background-qualified drivers",
              "Well-maintained, air-conditioned and clean cars",
              "24/7 customer care to provide quick service",
              "Clear pricing that does not have concealed items",
              "Simple online reservation at the time of travelling or prior",
              "English-speaking professional drivers",
              "Real-time tracking of cars fitted with GPS",
              "Obtain foreign payment facilities"
            ]
          },
          {
            "t": "p",
            "text": "We boast of being one of the reputable cab booking services in India to tourists from New Zealand, who travel alone, as couples, families, and on group tours."
          }
        ]
      },
      {
        "kind": "airport",
        "heading": "Airport Transfer Service in India for New Zealand Tourists",
        "blocks": [
          {
            "t": "p",
            "text": "Our New Zealand tourist taxi service in India will also involve professional airport pickup and drop-off at all major Indian airports."
          },
          {
            "t": "h3",
            "text": "Airport Transfer Features"
          },
          {
            "t": "ul",
            "items": [
              "Flight-tracking, to deal with delays",
              "Meet and greet services upon arrival at terminals",
              "On-time pickups and drops",
              "Large cars that have spacious luggage"
            ]
          },
          {
            "t": "p",
            "text": "Our airport transfer service will make sure that Kiwi tourists start their journey in India with a relaxed and non-confusing start."
          }
        ]
      },
      {
        "kind": "city",
        "heading": "City Taxi Service in India for New Zealand Tourists",
        "blocks": [
          {
            "t": "p",
            "text": "Be it sightseeing, shopping and other cultural events, rest assured that our city taxi service in India to the New Zealand tourists will be safe and efficient."
          },
          {
            "t": "h3",
            "text": "Popular Tourist Cities We Serve"
          },
          {
            "t": "cities",
            "items": [
              {
                "name": "Delhi",
                "note": "Historical sites and the contemporary attractions"
              },
              {
                "name": "Agra",
                "note": "Home to the global heritage monuments"
              },
              {
                "name": "Jaipur",
                "note": "The pink city, where one can find forts and palaces"
              },
              {
                "name": "Varanasi",
                "note": "The holistic centre of India"
              }
            ]
          },
          {
            "t": "p",
            "text": "Our service boasts seasoned local drivers and comfortable cars, making it one of the most reliable ways of cab bookings in India among tourists from New Zealand."
          }
        ]
      },
      {
        "kind": "outstation",
        "heading": "Outstation Cab Service for New Zealand Tourists",
        "blocks": [
          {
            "t": "p",
            "text": "When you are on an intercity itinerary, our outstation cab service is the best option. You will be able to visit various places in our cab service in India among the New Zealand tourists in a comfortable and safe way."
          },
          {
            "t": "h3",
            "text": "Ideal For"
          },
          {
            "t": "ul",
            "items": [
              "Multi-city holiday tours",
              "Circuits of heritage and culture",
              "Spiritual and religious travels",
              "Nature excursions and mountain resorts"
            ]
          },
          {
            "t": "p",
            "text": "We have comfortable sedans, roomy SUVs, and luxury cars that are driven by qualified chauffeurs who are trained to cover long distances."
          }
        ]
      },
      {
        "kind": "book",
        "heading": "Book Your Cab in India Today",
        "blocks": [
          {
            "t": "p",
            "text": "Seeking a reliable, safe and cheap cab service in India for New Zealand tourists? International travellers have confidence in our professionally managed taxi services because of their comfort, transparency, and punctuality. Book your cab today and explore India with complete peace of mind."
          }
        ]
      }
    ],
    "faqs": [
      {
        "question": "What do the tourists of New Zealand do to reserve a cab in India?",
        "answer": "Our site provides easy online booking of international debit or credit cards by New Zealand tourists, and confirmation is immediate."
      },
      {
        "question": "Is your taxi business secure for the New Zealand tourists in India?",
        "answer": "Yes, the drivers are all checked, the vehicles are equipped with GPS, the customer support is 24/7, and this guarantees full safety."
      },
      {
        "question": "Do you offer airport pickup services to New Zealand tourists in India?",
        "answer": "Yes, we do provide airport pick-up and drop-off services in every big Indian airport and flight tracking."
      },
      {
        "question": "Do you have English-speaking drivers?",
        "answer": "Yes, we offer professional English-speaking drivers, which is why it is easy to communicate and feel comfortable."
      }
    ]
  },
  {
    "locale": "en-mu",
    "code": "mu",
    "country": "Mauritius",
    "short": "Mauritius",
    "flag": "🇲🇺",
    "h1": "Cab Service in India for Mauritius Tourists",
    "h1Tagline": "Safe, Reliable & Affordable Taxi Booking Across India",
    "sections": [
      {
        "kind": "intro",
        "heading": "",
        "blocks": [
          {
            "t": "p",
            "text": "As a Mauritian tourist, a visit to India is a diverse and thrilling experience that is characterised by the similarities in heritage, spirituality, festivals, cuisine and historical links. In order to have a comfortable and stress-free visit, it is important to have a safe, reliable and transparent transportation."
          },
          {
            "t": "p",
            "text": "We offer professional, comfortable and reliable taxi service in India to tourists from Mauritius, which is oriented to the international requirements of travelling."
          }
        ]
      },
      {
        "kind": "why",
        "heading": "Why Choose Our Cab Service in India for Mauritius Tourists?",
        "blocks": [
          {
            "t": "ul",
            "items": [
              "Professional and background-checked drivers",
              "Well-maintained, clean and air-conditioned vehicles",
              "24-hour customer care in case of any urgent need",
              "Clear-cut pricing and no extravagances",
              "Online booking of your trip in advance or on the spot",
              "English-speaking drivers who are professional",
              "Real-time tracking of vehicles that have GPS",
              "Obtain foreign payment facilities"
            ]
          },
          {
            "t": "p",
            "text": "We take pride in the fact that we are considered a dependable cab booking company in India among the Mauritius tourists."
          }
        ]
      },
      {
        "kind": "airport",
        "heading": "Airport Transfer Service in India for Mauritius Tourists",
        "blocks": [
          {
            "t": "p",
            "text": "The Mauritius tourist taxi service in India is a professional airport pick-up/ drop service in all major airports in India."
          },
          {
            "t": "h3",
            "text": "Airport Transfer Features"
          },
          {
            "t": "ul",
            "items": [
              "Delay management by flight tracking",
              "Meet and greet service at the arrival terminals",
              "On-time pickups and drops",
              "Road cars with lots of luggage room"
            ]
          },
          {
            "t": "p",
            "text": "Our airport transfer service makes the Mauritian tourists start their journey to India without any trouble and confusion."
          }
        ]
      },
      {
        "kind": "city",
        "heading": "City Taxi Service in India for Mauritius Tourists",
        "blocks": [
          {
            "t": "p",
            "text": "Our professional taxi services to cities in India make it easy and enjoyable to explore the cities. Our city taxi service in Mauritius is also reliable and safe in ensuring that you travel by taxi, whether you are sightseeing, visiting relatives, shopping or attending cultural events."
          },
          {
            "t": "h3",
            "text": "Popular Tourist Cities We Serve"
          },
          {
            "t": "cities",
            "items": [
              {
                "name": "Delhi",
                "note": "History and new places of interest"
              },
              {
                "name": "Agra",
                "note": "Heritage monuments of the world"
              },
              {
                "name": "Jaipur",
                "note": "The Pink City with forts and palaces"
              },
              {
                "name": "Varanasi",
                "note": "The religious nerve of India"
              },
              {
                "name": "Ayodhya",
                "note": "One of the biggest pilgrimages"
              }
            ]
          },
          {
            "t": "p",
            "text": "Having skilled local drivers and comfortable cars, we are among the most reliable suppliers of cab booking in India for tourists from Mauritius."
          }
        ]
      },
      {
        "kind": "outstation",
        "heading": "Outstation Cab Service for Mauritius Tourists",
        "blocks": [
          {
            "t": "p",
            "text": "When you are planning to travel between cities or states, our outstation cab service is the best option in the itinerary. You can now travel safely and comfortably within destinations in India with our cab service in Mauritius as a tourist."
          },
          {
            "t": "h3",
            "text": "Ideal For"
          },
          {
            "t": "ul",
            "items": [
              "Multi-city holiday tours",
              "Spiritual and religious pilgrimages",
              "Family visits and cultural visits",
              "Medical and wellness travel"
            ]
          },
          {
            "t": "p",
            "text": "We provide luxurious sedans, roomy SUVs, and luxury cars with professional drivers who have been trained to drive long distances."
          }
        ]
      },
      {
        "kind": "book",
        "heading": "Book Your Cab in India Today",
        "blocks": [
          {
            "t": "p",
            "text": "Our convenient booking, safe payment, confirmed English-speaking drivers, and 24/7 customer service make all journeys in India comfortable and pleasant. Don’t wait—book your cab now and start exploring India with complete peace of mind!"
          }
        ]
      }
    ],
    "faqs": [
      {
        "question": "How can tourists in Mauritius reserve a cab in India?",
        "answer": "Our site also allows the Mauritius tourists to make their bookings online with the help of international debit or credit cards and get instant confirmation."
      },
      {
        "question": "Is your Indian taxi service safe for the Mauritius tourists?",
        "answer": "Every driver is checked, cars are equipped with GPS, and the 24/7 support of the customers guarantees total safety."
      },
      {
        "question": "Do you offer airport pickups for tourists in Mauritius and India?",
        "answer": "We provide airport pick-up and drop-off service in all major airports in India with flight tracking."
      },
      {
        "question": "Do you have English-speaking drivers?",
        "answer": "We offer professional English-speaking drivers to be able to communicate easily and feel comfortable."
      }
    ]
  },
  {
    "locale": "en-pl",
    "code": "pl",
    "country": "Poland",
    "short": "Poland",
    "flag": "🇵🇱",
    "h1": "Cab Service in India for Poland Tourists",
    "h1Tagline": "",
    "sections": [
      {
        "kind": "intro",
        "heading": "",
        "blocks": [
          {
            "t": "p",
            "text": "Touring India as a Polish tourist is an interesting experience that is full of history, spirituality, colourful customs, iconic architecture and various landscapes. Safe, reliable, and transparent transportation is necessary to experience your trip without stress and enjoy it."
          },
          {
            "t": "p",
            "text": "Our services are a professional, comfortable, reliable taxi service in India for Polish tourists, which is expected to suit international travel standards."
          }
        ]
      },
      {
        "kind": "why",
        "heading": "Why Choose Our Cab Service in India for Polish Tourists?",
        "blocks": [
          {
            "t": "ul",
            "items": [
              "Professional and background-checked drivers",
              "Well-maintained, clean and air-conditioned vehicles",
              "24/7 Customer support",
              "Open pricing",
              "Online reservation of your trip or early",
              "English-speaking drivers",
              "Real-time tracking of GPS-powered vehicles",
              "Obtain foreign payment facilities"
            ]
          },
          {
            "t": "p",
            "text": "We take pride in being identified as a reliable cab booking service in India among Polish tourists, thanks to our 24/7 customer support, professional drivers, and easy online booking, favoured by solo travellers, couples, families, and group tours."
          }
        ]
      },
      {
        "kind": "airport",
        "heading": "Airport Transfer Service in India for Polish Tourists",
        "blocks": [
          {
            "t": "p",
            "text": "The airport pick up will be so comfortable after a long international flight, and this will be the signal of your whole trip in Poland. We have a Poland tourist taxi service in India, which involves professional services of airport pick up and drop off at all the major Indian airports."
          },
          {
            "t": "h3",
            "text": "Airport Transfer Features"
          },
          {
            "t": "ul",
            "items": [
              "Flight tracking is used to control delays",
              "Meet and greet service at the arrival terminals",
              "On-time pickups and drops",
              "Large cars with a large luggage capacity"
            ]
          },
          {
            "t": "p",
            "text": "Our airport transfer service in India stands out for Polish tourists, offering a dedicated meet and greet,."
          }
        ]
      },
      {
        "kind": "city",
        "heading": "City Taxi Service in India for Polish Tourists",
        "blocks": [
          {
            "t": "p",
            "text": "Our city taxi service in india for Poland tourists is safe and efficient because, whether you are sightseeing, shopping, or attending cultural experiences, you are bound to have a good time in India."
          },
          {
            "t": "h3",
            "text": "Popular Tourist Cities We Serve"
          },
          {
            "t": "cities",
            "items": [
              {
                "name": "Delhi",
                "note": "The traditional sights and modern destinations"
              },
              {
                "name": "Agra",
                "note": "The city of heritage monuments in the world"
              },
              {
                "name": "Jaipur",
                "note": "The Pink City of forts and palaces"
              },
              {
                "name": "Varanasi",
                "note": "The Holy City of India"
              },
              {
                "name": "Ayodhya",
                "note": "One of the greatest pilgrimage sites"
              }
            ]
          },
          {
            "t": "p",
            "text": "Having a team of experienced local drivers and comfortable cars, we are among the most reliable in the cab booking within the country, among Polish tourists."
          }
        ]
      },
      {
        "kind": "outstation",
        "heading": "Outstation Cab Service for Polish Tourists",
        "blocks": [
          {
            "t": "p",
            "text": "If you plan to travel between cities, our outstation cab service is ideal. Polish tourists can visit numerous sightseeing destinations easily and safely using our service in India."
          },
          {
            "t": "h3",
            "text": "Ideal For"
          },
          {
            "t": "ul",
            "items": [
              "Multi-city holiday tours",
              "Heritage and cultural loops",
              "Spiritual and religious pilgrimages",
              "Nature tours and mountain resorts"
            ]
          },
          {
            "t": "p",
            "text": "Our services include comfortable sedans, roomy SUVs and the luxury cars that are driven by the professional chauffeurs who are trained to travel over long distances."
          }
        ]
      },
      {
        "kind": "book",
        "heading": "Book Your Cab in India Today",
        "blocks": [
          {
            "t": "p",
            "text": "Our booking is easy, payments are secure, drivers are checked and speak English, and 24/7 customer care makes every trip in India a pleasant experience. You can reserve your taxi now and have no worries about visiting India."
          }
        ]
      }
    ],
    "faqs": [
      {
        "question": "What are the ways in which Polish tourists can hire a cab in India?",
        "answer": "Our site will allow the easy online booking of Polish tourists using international debit or credit cards and will provide the user with an immediate confirmation."
      },
      {
        "question": "Is your cab business in India secure for Polish tourists?",
        "answer": "All the drivers are checked, cars are GPS-tracked, and 24/7 customer service guarantees total safety."
      },
      {
        "question": "Are you offering airport pickup services for Polish tourists in India?",
        "answer": "We provide airport pick-up and drop-off services in all major airports in India, where flights can be tracked."
      },
      {
        "question": "Do you have English-speaking drivers?",
        "answer": "We do have professional English-speaking drivers, yes."
      }
    ]
  },
  {
    "locale": "en-fj",
    "code": "fj",
    "country": "Fiji",
    "short": "Fiji",
    "flag": "🇫🇯",
    "h1": "Cab Service in India for Fiji Tourists",
    "h1Tagline": "",
    "sections": [
      {
        "kind": "intro",
        "heading": "",
        "blocks": [
          {
            "t": "p",
            "text": "Being a tourist in India as a Fiji citizen is a culturally fulfilling and exciting experience, which is based on the common heritage, spirituality, traditions, and colourful celebrations. Safe, reliable and transparent transportation is what you need to maximize your trip."
          },
          {
            "t": "p",
            "text": "We offer a professional, comfortable, and reliable taxi service to tourists from Fiji in India, to international standards of travel."
          }
        ]
      },
      {
        "kind": "why",
        "heading": "Why Choose Our Cab Service in India for Fiji Tourists?",
        "blocks": [
          {
            "t": "ul",
            "items": [
              "Our drivers are not only experienced and background-verified but also trained to assist Fiji tourists with cultural understanding and communication, setting our service apart",
              "Well-kept, air-conditioned, and clean cars",
              "24/7 customer service in case of urgent help",
              "Open pricing without any concealed costs",
              "Simple internet reservation prior to or during the trip",
              "English-speaking drivers who are professional",
              "Real-time tracking of vehicles with GPS",
              "We guarantee foreign payment methods"
            ]
          },
          {
            "t": "p",
            "text": "It is our privilege to be considered a reliable cab booking company in India among Fiji tourists, including families, older travellers, individual visitors, and group tours."
          }
        ]
      },
      {
        "kind": "airport",
        "heading": "Airport Transfer Service in India for Fiji Tourists",
        "blocks": [
          {
            "t": "p",
            "text": "Once you are on a long international flight and you have landed in Fiji, the next thing you needis to be picked up at the airport in a comfortable manner to mark the beginning of your whole journey."
          },
          {
            "t": "h3",
            "text": "Airport Transfer Features"
          },
          {
            "t": "ul",
            "items": [
              "Flight tracking is used to control delays",
              "Meet and greet service on arrival terminals",
              "On-time pickups and drops",
              "Large cars with plenty of cargo"
            ]
          },
          {
            "t": "p",
            "text": "Our airport transfer service will make sure that the Fiji tourists initiate their journey to India without confusion and in a relaxed manner."
          }
        ]
      },
      {
        "kind": "city",
        "heading": "City Taxi Service in India for Fiji Tourists",
        "blocks": [
          {
            "t": "p",
            "text": "You are sightseeing, visiting family, shopping or attending cultural events, we have the answer in our city taxi service in India to act as the safe and efficient means of travelling for the tourists from Fiji."
          },
          {
            "t": "cities",
            "items": [
              {
                "name": "Delhi",
                "note": "The historic sites and the contemporary ones"
              },
              {
                "name": "Agra",
                "note": "The city of heritage monuments in the world"
              },
              {
                "name": "Jaipur",
                "note": "The Pink City of forts and palaces"
              },
              {
                "name": "Varanasi",
                "note": "The religious centre of India"
              },
              {
                "name": "Ayodhya",
                "note": "Ayodhya is one of the biggest pilgrimage sites"
              }
            ]
          },
          {
            "t": "p",
            "text": "We are a reliable cab booking service, offering qualified local drivers and comfortable cars for Fiji tourists in India."
          }
        ]
      },
      {
        "kind": "outstation",
        "heading": "Outstation Cab Service for Fiji Tourists",
        "blocks": [
          {
            "t": "p",
            "text": "In case your plan is to travel between states or cities, then our out-of-station cab service is the best. Through our cab service in India for Fiji tourists, you can visit various places in a safe and comfortable environment."
          },
          {
            "t": "h3",
            "text": "Ideal For"
          },
          {
            "t": "ul",
            "items": [
              "Multi-city holiday tours",
              "Spiritual and religious tours",
              "Cultural visits and family visits",
              "Medical and wellness travel"
            ]
          },
          {
            "t": "p",
            "text": "We provide comfortable sedans, roomy SUVs, and high-end cars with professional chauffeurs who have been trained to make long trips."
          }
        ]
      },
      {
        "kind": "book",
        "heading": "Book Your Cab in India Today",
        "blocks": [
          {
            "t": "p",
            "text": "Easy booking, safe payments, tested English-speaking drivers, and 24-hour customer service make any trip in India stress-free and pleasant. Book your cab and travel the whole of India without any worry today."
          }
        ]
      }
    ],
    "faqs": [
      {
        "question": "How do Fiji tourists book a cab in India?",
        "answer": "Fiji tourists can easily make online bookings with us using international debit or credit cards. Immediate confirmation is provided."
      },
      {
        "question": "Is your taxi in India safe for Fiji tourists?",
        "answer": "Drivers are all checked, vehicles are GPS-tracked, and 24/7 customer support guarantees maximum safety."
      },
      {
        "question": "Do you offer airport pickup services totourists from Fiji in India?",
        "answer": "Drop-off services are available at all major airports in India that have flight tracking."
      },
      {
        "question": "Do you have English-speaking drivers?",
        "answer": "We provide qualified English-speaking drivers to ensure comfort and easy communication."
      }
    ]
  },
  {
    "locale": "en-at",
    "code": "at",
    "country": "Austria",
    "short": "Austria",
    "flag": "🇦🇹",
    "h1": "Cab Service in India for Austria Tourists",
    "h1Tagline": "",
    "sections": [
      {
        "kind": "intro",
        "heading": "",
        "blocks": [
          {
            "t": "p",
            "text": "Visiting India as an Austrian tourist is a very interesting and culturally enriching experience, offering ancient culture, spiritual sites, royal buildings, vivid traditions, and landscapes. For a pleasant and stress-free journey, it is crucial to be transported safely, reliably, and transparently."
          },
          {
            "t": "p",
            "text": "We offer professional, comfortable and reliable taxi service in India to Austrian tourists, aimed at international travel standards."
          }
        ]
      },
      {
        "kind": "why",
        "heading": "Why Choose Our Cab Service in India for Austrian Tourists?",
        "blocks": [
          {
            "t": "ul",
            "items": [
              "Professional, background-checked, and certified drivers",
              "Well-maintained, clean, and air-conditioned cars",
              "24/7 customer service",
              "Transparent pricing with no hidden fees",
              "Uncomplicated online reservation prior to or throughout your visit",
              "English-speaking professional drivers",
              "Real-time tracking of vehicles with GPS",
              "Get the international payment options secured"
            ]
          },
          {
            "t": "p",
            "text": "It is our privilege to be recognised for reliable, convenient service, local expertise, and safety as the preferred cab booking choice in India for Austrian tourists—whether travelling solo, as couples, families, or in groups."
          }
        ]
      },
      {
        "kind": "airport",
        "heading": "Airport Transfer Service in India for Austrian Tourists",
        "blocks": [
          {
            "t": "p",
            "text": "A long international journey involving Austria will be followed by a convenient airport pickup that will set the tone for your entire trip. The taxi service for tourists from Austria in India will provide professional airport transportation, including pickups and drop-offs at all major airports in India."
          },
          {
            "t": "h3",
            "text": "Airport Transfer Features"
          },
          {
            "t": "ul",
            "items": [
              "Delay management through flight tracking",
              "Meet and greet service at the arrival terminals",
              "On-time pickups and drops",
              "Large cars with roomy luggage compartments"
            ]
          },
          {
            "t": "p",
            "text": "Our airport transfer service allows Austrian tourists to begin their Indian journey without confusion or stress."
          }
        ]
      },
      {
        "kind": "city",
        "heading": "City Taxi Service in India for Austrian Tourists",
        "blocks": [
          {
            "t": "p",
            "text": "Our professional city taxi services will make it easy and enjoyable to explore Indian cities. We provide taxi service in India for Austrian tourists to make sure that they are travelling safely and efficiently, whether sightseeing, shopping, or enjoying cultural experiences."
          },
          {
            "t": "h3",
            "text": "Popular Tourist Cities We Serve"
          },
          {
            "t": "cities",
            "items": [
              {
                "name": "Delhi",
                "note": "Ancient sights and contemporary delights"
              },
              {
                "name": "Agra",
                "note": "Cradle of heritage monuments in the world"
              },
              {
                "name": "Jaipur",
                "note": "The Pink City of forts and palaces"
              },
              {
                "name": "Varanasi",
                "note": "The spiritual centre of India"
              },
              {
                "name": "Ayodhya",
                "note": "One of the big pilgrimages"
              }
            ]
          },
          {
            "t": "p",
            "text": "We offer experienced local drivers, comfortable cars, and a reputation for on-time service, making us one of the most reliable cab booking services in India for tourists from Austria."
          }
        ]
      },
      {
        "kind": "outstation",
        "heading": "Outstation Cab Service for Austrian Tourists",
        "blocks": [
          {
            "t": "p",
            "text": "When you are planning your itinerary and are going to travel between cities, our outstation cab service will be the right choice. In our cab service in India, among the tourists from Austria, you will be able to visit various destinations in a very comfortable and safe way."
          },
          {
            "t": "h3",
            "text": "Ideal For"
          },
          {
            "t": "ul",
            "items": [
              "Multi-city holiday tours",
              "Getting around by heritage and cultural routes",
              "Spiritual and religious tours",
              "Nature tours and mountain resorts"
            ]
          },
          {
            "t": "p",
            "text": "We provide a selection of comfortable sedans, spacious SUVs, and luxury vehicles, all operated by chauffeurs trained for long-distance travel."
          }
        ]
      },
      {
        "kind": "book",
        "heading": "Book Your Cab in India Today",
        "blocks": [
          {
            "t": "p",
            "text": "Need a safe, reliable and cheap cab service in India for the tourists of Austria? International travellers have placed their comfort, transparency and punctuality in our professionally managed taxi services."
          }
        ]
      }
    ],
    "faqs": [
      {
        "question": "How do Austrian tourists reserve a cab in India?",
        "answer": "Austrian tourists can book cab services online through our website, using international debit or credit cards for immediate confirmation."
      },
      {
        "question": "Is your taxi service in India secure for Austrian tourists?",
        "answer": "Drivers are checked, cars have GPS positioning, and 24/7 customer service guarantees total security."
      },
      {
        "question": "Do you offer airport pickup to Austrian tourists in India?",
        "answer": "We provide airport pick-up and drop-off service at any of the major Indian airports that have flight tracking."
      },
      {
        "question": "Do you have English-speaking drivers?",
        "answer": "We also have professional English-speaking drivers who can drive us smoothly and comfortably."
      }
    ]
  },
  {
    "locale": "en-be",
    "code": "be",
    "country": "Belgium",
    "short": "Belgium",
    "flag": "🇧🇪",
    "h1": "Cab Service in India for Belgium Tourists",
    "h1Tagline": "",
    "sections": [
      {
        "kind": "intro",
        "heading": "",
        "blocks": [
          {
            "t": "p",
            "text": "However, visiting India as a tourist means a lot to me as a Belgian person, and it is an experience rich in history, culture, spiritual life, architecture, and different scenery. In order to travel around the country with ease and certainty, it is critical to have safe, reliable and transparent transportation."
          },
          {
            "t": "p",
            "text": "Our taxi service in India is a professional, comfortable and reliable one, which is aimed at satisfying the standards of international travel of Belgian tourists."
          }
        ]
      },
      {
        "kind": "why",
        "heading": "Why Choose Our Cab Service in India for Belgian Tourists?",
        "blocks": [
          {
            "t": "ul",
            "items": [
              "Well-trained and background-checked drivers",
              "Well-maintained, air-conditioned, and clean vehicles",
              "24/7 customer support",
              "Transparent pricing",
              "Simple reservation prior to or during travel",
              "Professional English-speaking drivers",
              "Real-time tracking with GPS",
              "Obtain foreign payment methods"
            ]
          },
          {
            "t": "p",
            "text": "We take pride in being the preferred cab booking service for Belgian tourists visiting India, catering to solo travellers, couples, families, and groups."
          }
        ]
      },
      {
        "kind": "airport",
        "heading": "Airport Transfer Service in India for Belgian Tourists",
        "blocks": [
          {
            "t": "p",
            "text": "You have just had an international flight that took you a long way to Belgium, and then you get a comfortable airport pick-up to kick start your whole journey. Belgian tourists who are visiting India will find our taxi service, which consists of a professional airport pick-up and drop-off service at all the major airports in India."
          },
          {
            "t": "h3",
            "text": "Airport Transfer Features"
          },
          {
            "t": "ul",
            "items": [
              "Delay management by flight tracking",
              "Meet and greet service in the arrival terminals",
              "On-time pickups and drops",
              "Big cars with large cargo rooms"
            ]
          },
          {
            "t": "p",
            "text": "Our airport transfer service helps Belgian tourists to start their journey in India without any tension."
          }
        ]
      },
      {
        "kind": "city",
        "heading": "City Taxi Service in India for Belgian Tourists",
        "blocks": [
          {
            "t": "p",
            "text": "You may be on a sightseeing spree, shopping, or attending other cultural events, and our taxi service in India for Belgian tourists would make your travels safe and efficient."
          },
          {
            "t": "h3",
            "text": "Popular Tourist Cities We Serve"
          },
          {
            "t": "cities",
            "items": [
              {
                "name": "Delhi",
                "note": "History and new age sightseeing"
              },
              {
                "name": "Agra",
                "note": "A city of heritage monuments of the world"
              },
              {
                "name": "Jaipur",
                "note": "The Pink City of forts and palaces"
              },
              {
                "name": "Varanasi",
                "note": "The seat of the soul in India"
              },
              {
                "name": "Ayodhya",
                "note": "A big pilgrimage site"
              }
            ]
          },
          {
            "t": "p",
            "text": "We have some of the most reliable drivers in the area, and we are also equipped with comfortable cars, therefore making us one of the best choices to book a cab in India among Belgian tourists."
          }
        ]
      },
      {
        "kind": "outstation",
        "heading": "Outstation Cab Service for Belgian Tourists",
        "blocks": [
          {
            "t": "p",
            "text": "In case you have a schedule involving travelling between cities, then our outstation cab service is the right option. Through our cab service in India among the Belgian tourists, you will be able to visit various places in a comfortable and safe way."
          },
          {
            "t": "h3",
            "text": "Ideal For"
          },
          {
            "t": "ul",
            "items": [
              "Multi-city holiday tours",
              "Circuits of heritage and culture",
              "Religious and spiritual travels",
              "Nature tours and mountain resorts"
            ]
          },
          {
            "t": "p",
            "text": "We offer well-furnished sedans, roomy SUVs, and luxury cars. Our chauffeurs are trained for long-distance travel."
          }
        ]
      },
      {
        "kind": "book",
        "heading": "Book Your Cab in India Today",
        "blocks": [
          {
            "t": "p",
            "text": "We provide hassle-free booking, safe payment, verified English-speaking drivers, and 24/7 customer service, making all the travels within India hassle-free and enjoyable. Book your cab now and tour India in total peace."
          }
        ]
      }
    ],
    "faqs": [
      {
        "question": "The question is how a cab can be booked by Belgian tourists in India?",
        "answer": "Our website allows Belgian tourists to book online easily using international debit/ credit cards and get the confirmation instantly."
      },
      {
        "question": "Is your taxi business safe for Indian tourists travelling to Belgium?",
        "answer": "Drivers are all checked, cars have GPS, and 24/7 customer service guarantees total safety."
      },
      {
        "question": "Is it offering pickup services to Belgian tourists at the airport in India?",
        "answer": "We provide pickup and drop-off services at all the major Indian airports that can be tracked."
      },
      {
        "question": "Do you have English-speaking drivers?",
        "answer": "We have professional English-speaking drivers so that there is easy communication and comfort."
      }
    ]
  },
  {
    "locale": "en-se",
    "code": "se",
    "country": "Sweden",
    "short": "Sweden",
    "flag": "🇸🇪",
    "h1": "Cab Service in India for Sweden Tourists",
    "h1Tagline": "",
    "sections": [
      {
        "kind": "intro",
        "heading": "",
        "blocks": [
          {
            "t": "p",
            "text": "A tourist visit to India is an enriching cultural experience that provides ancient culture, spiritual sites, colourful culture, architecture, and a wide variety of landscapes, and it is most rewarding to travel to India as a Swedish tourist. In order to explore the country in a comfortable and stress-free way, it is required to have safe, reliable and transparent transportation."
          },
          {
            "t": "p",
            "text": "We offer professional, comfortable, and reliable taxi service in India for Swedish tourists, which is aimed at satisfying the international standards of travelling."
          }
        ]
      },
      {
        "kind": "why",
        "heading": "Why Choose Our Cab Service in India for Swedish Tourists?",
        "blocks": [
          {
            "t": "ul",
            "items": [
              "The drivers are experienced and background checked",
              "Well-maintained, air-conditioned and clean vehicles",
              "24/7 customer support in case of immediate help",
              "Clear prices without any concealments",
              "Book online effortlessly prior to the journey or on the journey",
              "Professional English-speaking drivers",
              "Real-time tracking of cars with GPS",
              "Assure foreign options of payment"
            ]
          },
          {
            "t": "p",
            "text": "We take pride in the fact that we have been considered an honest cab booking company in India among Swedish tourists."
          }
        ]
      },
      {
        "kind": "airport",
        "heading": "Airport Transfer Service in India for Swedish Tourists",
        "blocks": [
          {
            "t": "p",
            "text": "Having spent a long flight overseas, a warm airport reception is the sure way to start your whole trip. The taxi service for Swedish tourists in India will involve professional airport pick-up and drop-off services at any of the major airports in India."
          },
          {
            "t": "h3",
            "text": "Airport Transfer Features"
          },
          {
            "t": "ul",
            "items": [
              "Delay management, flight tracking",
              "Meet and greet service at arrival terminals",
              "On-time pickups and drops",
              "Large cars with plenty of luggage space"
            ]
          },
          {
            "t": "p",
            "text": "Our airport transfer service is uniquely designed so Swedish tourists can begin their journey in India without worries or confusion."
          }
        ]
      },
      {
        "kind": "city",
        "heading": "City Taxi Service in India for Swedish Tourists",
        "blocks": [
          {
            "t": "p",
            "text": "Our taxi service in India to Swedish tourists will make their travel safe and efficient, whether they intend to sightsee, shop or enjoy cultural experiences in our city."
          },
          {
            "t": "h3",
            "text": "Popular Tourist Cities We Serve"
          },
          {
            "t": "cities",
            "items": [
              {
                "name": "Delhi",
                "note": "Ancient and contemporary sites"
              },
              {
                "name": "Agra",
                "note": "The city of world heritage monuments"
              },
              {
                "name": "Jaipur",
                "note": "The pink city of forts and palaces"
              },
              {
                "name": "Varanasi",
                "note": "The religious centre of India"
              },
              {
                "name": "Ayodhya",
                "note": "An important place of pilgrimage"
              }
            ]
          },
          {
            "t": "p",
            "text": "Having strong local drivers and comfortable cars, we are among the most reliable ones to book a cab in India among Swedish tourists."
          }
        ]
      },
      {
        "kind": "outstation",
        "heading": "Outstation Cab Service for Swedish Tourists",
        "blocks": [
          {
            "t": "p",
            "text": "In case you have plans of moving across cities in your itinerary, then our outstation cab service is the best option. You can visit various tourist spots in India by using our taxi service for Swedish tourists in India."
          },
          {
            "t": "h3",
            "text": "Ideal For"
          },
          {
            "t": "ul",
            "items": [
              "Multi-city holiday tours",
              "Cultural routes and heritages",
              "Spiritual and religious trips",
              "Nature tours and hill resorts"
            ]
          },
          {
            "t": "p",
            "text": "Our products are comfortable sedans, spacious SUVs and high-quality vehicles that are driven by professional chauffeurs who have been trained to drive long distances."
          }
        ]
      },
      {
        "kind": "book",
        "heading": "Book Your Cab in India Today",
        "blocks": [
          {
            "t": "p",
            "text": "Our simple booking, safe payment, certified English-speaking drivers, and twenty-four-hour customer service will make each trip throughout India a pleasant experience. Book your cab now and have complete peace of mind in India."
          }
        ]
      }
    ],
    "faqs": [
      {
        "question": "What is the way to book a cab in India for Swedish tourists?",
        "answer": "The tourists of Sweden can easily make their bookings online at our site using international debit or credit cards and get immediate confirmation."
      },
      {
        "question": "Is your taxi company in India safe for Swedish tourists?",
        "answer": "All drivers are checked, vehicles are GPS-enabled, and 24/7 customer service is guaranteed for total security."
      },
      {
        "question": "Do you offer pick-up services to Swedish tourists in India?",
        "answer": "We provide airport pick-up and drop-off services at any of the major Indian airports that have flight tracking services."
      },
      {
        "question": "Do you have English-speaking drivers?",
        "answer": "We will offer professional English-speaking drivers to ensure easy communication and comfort."
      }
    ]
  }
];

export const getInternationalPage = (locale: string) => internationalPages.find((p) => p.locale === locale);
export const internationalHref = (locale: string) => `/${locale}/${INTERNATIONAL_PATH}`;
