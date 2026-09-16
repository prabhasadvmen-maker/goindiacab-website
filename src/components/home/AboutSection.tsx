import Link from "next/link";
import { CheckCircle2, ShieldCheck, Users, Clock, Award, Star, ArrowRight } from "lucide-react";
import { siteConfig } from "@/src/config/site";

export function AboutSection() {
  const points = [
    { title: "100% Guaranteed Lowest Price", desc: "Best fare transparency with zero surge pricing." },
    { title: "Verified & Experienced Drivers", desc: "Background checked professional drivers." },
    { title: "No Hidden Charges", desc: "All-inclusive upfront quotes with no surprise fees." },
    { title: "24/7 Customer Support", desc: "Dedicated support team available round the clock." },
  ];

  return (
    <section className="py-16 md:py-24 bg-white border-t border-gray-100 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Stats Grid */}
          <div className="lg:col-span-5 relative">
            <div className="bg-gradient-to-br from-[#0B4A9C] to-[#083875] rounded-3xl p-8 text-white shadow-2xl relative z-10 overflow-hidden">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
              
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white font-semibold text-xs mb-6 backdrop-blur-md">
                <Award className="w-3.5 h-3.5 text-[#F27A1A]" />
                India's Top-Rated Cab Operator
              </span>

              <h3 className="text-2xl font-bold mb-6 text-white leading-snug">
                Delivering Excellence Across Every Milestone
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                  <div className="text-3xl font-extrabold text-[#F27A1A]">
                    {siteConfig.stats.yearsOfExperience}
                  </div>
                  <div className="text-xs text-white/80 font-medium mt-1">Years Experience</div>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                  <div className="text-3xl font-extrabold text-white">
                    {siteConfig.stats.happyCustomers}
                  </div>
                  <div className="text-xs text-white/80 font-medium mt-1">Happy Customers</div>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                  <div className="text-3xl font-extrabold text-white">
                    700K+
                  </div>
                  <div className="text-xs text-white/80 font-medium mt-1">Rides Completed</div>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                  <div className="flex items-center text-[#F27A1A] gap-1 text-2xl font-extrabold">
                    <span>4.9</span>
                    <Star className="w-5 h-5 fill-current" />
                  </div>
                  <div className="text-xs text-white/80 font-medium mt-1">Google Rating</div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/15 flex items-center justify-between text-xs text-white/90 font-medium">
                <span>Verified Clean Vehicles</span>
                <span>Licensed Driver Fleet</span>
              </div>
            </div>

            {/* Background Decorative Accent */}
            <div className="absolute -bottom-6 -right-6 w-full h-full bg-[#F27A1A]/10 rounded-3xl -z-0 hidden sm:block" />
          </div>

          {/* Right Column: Information & Guarantees */}
          <div className="lg:col-span-7">
            <span className="inline-block px-3.5 py-1 rounded-full bg-blue-50 text-[#0B4A9C] font-semibold text-xs uppercase tracking-wider mb-3">
              About Go India Cab
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight mb-6">
              Go India Cab - <span className="text-[#0B4A9C]">Best Taxi Service in Delhi & India</span>
            </h2>

            <div className="space-y-4 text-gray-600 text-sm sm:text-base leading-relaxed mb-8">
              <p className="bg-slate-50 p-4 rounded-xl border-l-4 border-[#0B4A9C]">
                Welcome to <strong className="text-gray-900 font-bold">Go India Cab</strong>, your trusted travel partner across India. We provide premium, reliable, and affordable taxi services in Delhi NCR and major Indian cities for local, outstation, and airport transfers.
              </p>
              <p>
                With over <strong className="text-gray-900 font-bold">{siteConfig.stats.yearsOfExperience}</strong> of expertise and a track record of <strong className="text-gray-900 font-bold">{siteConfig.stats.happyCustomers} happy customers</strong>, we prioritize your safety, comfort, and punctuality on every ride.
              </p>
            </div>

            {/* Guarantees Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {points.map((pt) => (
                <div key={pt.title} className="flex items-start gap-3 p-3.5 rounded-xl border border-gray-100 bg-white hover:border-blue-100 hover:shadow-sm transition-all">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0B4A9C] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{pt.title}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{pt.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Button */}
            <Link
              href="/about-us"
              className="inline-flex items-center gap-2.5 bg-[#0B4A9C] hover:bg-[#083875] text-white font-bold px-7 py-3.5 rounded-xl shadow-md transition-all hover:translate-x-1"
            >
              <span>Discover More About Us</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}

