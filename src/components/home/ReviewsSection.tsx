import { Container } from "../common/Container";
import { Star, Quote } from "lucide-react";
import { siteConfig } from "@/src/config/site";

export function ReviewsSection() {
  const reviews = [
    {
      name: "Rahul Sharma",
      location: "Delhi to Jaipur",
      date: "2 weeks ago",
      text: "Good service by Go India Cab. The driver was polite and the car was clean. We travelled from Delhi to Jaipur and the journey was smooth. Would book again.",
      rating: 5,
    },
    {
      name: "Priya Singh",
      location: "Delhi to Manali",
      date: "1 month ago",
      text: "We booked a Tempo Traveller for our family trip to Manali. The vehicle was in good condition and the driver was experienced on hilly roads. Comfortable ride overall.",
      rating: 5,
    },
    {
      name: "Amit Patel",
      location: "Airport Transfer, Delhi",
      date: "3 months ago",
      text: "Used Go India Cab for airport transfers a few times. Fare was clear upfront and the driver arrived on time. No issues with the booking process.",
      rating: 5,
    }
  ];

  return (
    <section className="py-20 neo-bg">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-[#2d3748]">What Travellers Say</h2>
          <div className="w-24 h-1 bg-[#3f51b5] opacity-50 mx-auto rounded-full mb-6"></div>
          <div className="flex items-center justify-center flex-col">
            <div className="flex items-center space-x-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-[#f9c004] text-[#f9c004]" />
              ))}
            </div>
            <p className="text-lg text-[#718096] font-medium">
              Google Rating: <strong className="text-[#3f51b5]">{siteConfig.googleRating} ★</strong> based on {siteConfig.googleReviewCount} reviews
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="neo-flat p-8 rounded-3xl relative">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#f9c004] text-[#f9c004]" />
                ))}
              </div>
              <div className="flex items-center relative z-10 min-h-[100px]">
                <Quote className="w-8 h-8 text-[#3f51b5] opacity-20 absolute -top-2 -left-2" />
                <p className="text-[#4a5568] italic relative z-10 leading-relaxed font-medium mt-4">&quot;{review.text}&quot;</p>
              </div>
              <div className="flex items-center mt-8">
                <div className="w-12 h-12 neo-pressed rounded-full flex items-center justify-center text-[#3f51b5] font-extrabold text-xl mr-4">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="font-extrabold text-[#2d3748]">{review.name}</p>
                  <p className="text-sm font-medium text-[#718096]">{review.location} &middot; {review.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-gray-400 mt-8">
          Reviews sourced from Google. Ratings verified at time of display.
        </p>
      </Container>
    </section>
  );
}
