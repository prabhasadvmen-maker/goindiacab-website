"use client";

import { useState } from "react";
import { Container } from "../common/Container";
import Link from "next/link";
import { 
  Package, 
  Navigation, 
  MapPin, 
  Bus, 
  ArrowUpRight, 
  Search, 
  Sparkles,
  ChevronRight,
  Compass,
  FileText,
  PhoneCall,
  CreditCard,
  Info
} from "lucide-react";
import clsx from "clsx";

export function QuickLinksSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const linkCategories = [
    {
      id: "packages",
      category: "Taxi Packages",
      shortName: "Packages",
      icon: Package,
      iconBg: "bg-gradient-to-br from-blue-500 to-indigo-600 text-white",
      links: [
        { label: "Taxi Package From Delhi", href: "/taxi-package/delhi", tag: "Popular" },
        { label: "Delhi Same Day Taxi Tour Packages", href: "/taxi-package/delhi-same-day", tag: "1 Day Tour" },
        { label: "Golden Triangle Taxi Tour Packages", href: "/taxi-package/golden-triangle", tag: "Best Seller" },
        { label: "Taxi Package From Punjab", href: "/taxi-package/punjab" },
        { label: "Taxi Package From Uttar Pradesh", href: "/taxi-package/uttar-pradesh" },
        { label: "Taxi Package From Uttarakhand", href: "/taxi-package/uttarakhand", tag: "Hill Station" },
        { label: "Taxi Package From Rajasthan", href: "/taxi-package/rajasthan", tag: "Heritage" },
        { label: "Taxi Package From Jammu Kashmir", href: "/taxi-package/jammu-kashmir" },
        { label: "Tour Package From Himachal", href: "/taxi-package/himachal", tag: "Top Rated" },
      ]
    },
    {
      id: "outstation",
      category: "Taxi Outstation Services",
      shortName: "Outstation",
      icon: Navigation,
      iconBg: "bg-gradient-to-br from-indigo-500 to-purple-600 text-white",
      links: [
        { label: "Delhi To Himachal Pradesh Taxi Service", href: "/taxi/delhi-to-himachal-taxi-service", tag: "Outstation" },
        { label: "Delhi To Uttarakhand Taxi Service", href: "/taxi/uttarakhand-taxi-service-from-delhi", tag: "Outstation" },
        { label: "Delhi To Jammu Kashmir Taxi Service", href: "/taxi/jammu-kashmir-taxi-service-from-delhi", tag: "Outstation" },
        { label: "Delhi To Rajasthan Taxi Service", href: "/taxi/rajasthan-taxi-service-from-delhi", tag: "Outstation" },
        { label: "Delhi To Uttar Pradesh Taxi Service", href: "/taxi/uttar-pradesh-taxi-service-from-delhi", tag: "Outstation" },
        { label: "Delhi To Punjab Taxi Service", href: "/taxi/punjab-taxi-service-from-delhi", tag: "Outstation" },
      ]
    },
    {
      id: "routes",
      category: "Popular Routes",
      shortName: "Routes",
      icon: MapPin,
      iconBg: "bg-gradient-to-br from-emerald-500 to-teal-600 text-white",
      links: [
        { label: "Cab Service in Agra", href: "/popular-routes/cab-service-in-agra", tag: "Taj Mahal" },
        { label: "Cab Service in Ayodhya", href: "/popular-routes/cab-service-in-ayodhya", tag: "Trending" },
        { label: "Cab Service in Dehradun", href: "/popular-routes/cab-service-in-dehradun" },
        { label: "Cab Service in Jaipur", href: "/popular-routes/cab-service-in-jaipur", tag: "Pink City" },
        { label: "Cab Service in Varanasi", href: "/popular-routes/cab-service-in-varanasi" },
        { label: "Cab Service in Chandigarh", href: "/popular-routes/cab-service-in-chandigarh" },
        { label: "Cab Service in Haridwar", href: "/popular-routes/cab-service-in-haridwar", tag: "Pilgrimage" },
        { label: "Cab Service in Noida", href: "/popular-routes/cab-service-in-noida" },
        { label: "Cab Service in Delhi", href: "/cab-service-in-delhi", tag: "Local & Airport" },
      ]
    },
    {
      id: "tempo",
      category: "Tempo Traveller in Delhi",
      shortName: "Tempo Traveller",
      icon: Bus,
      iconBg: "bg-gradient-to-br from-amber-500 to-orange-600 text-white",
      links: [
        { label: "9 Seater Tempo Traveller in Delhi", href: "/9-seater-tempo-traveller-in-delhi", tag: "Small Group" },
        { label: "12 Seater Tempo Traveller in Delhi", href: "/12-seater-tempo-traveller-in-delhi", tag: "Family Favorite" },
        { label: "16 Seater Tempo Traveller in Delhi", href: "/16-seater-tempo-traveller-in-delhi" },
        { label: "20 Seater Tempo Traveller in Delhi", href: "/20-seater-tempo-traveller-in-delhi", tag: "Large Group" },
        { label: "22 Seater Tempo Traveller in Delhi", href: "/22-seater-tempo-traveller-in-delhi" },
        { label: "26 Seater Tempo Traveller in Delhi", href: "/26-seater-tempo-traveller-in-delhi", tag: "Luxury Coach" },
        { label: "Bus Rental in Delhi", href: "/bus-rental-in-delhi", tag: "Event Bus" },
      ]
    },
    {
      id: "company",
      category: "Blogs & Company Info",
      shortName: "Blogs & Contact",
      icon: PhoneCall,
      iconBg: "bg-gradient-to-br from-rose-500 to-red-600 text-white",
      links: [
        { label: "Blogs & Travel Guides", href: "/blogs", tag: "Articles & News" },
        { label: "Contact Us", href: "/contact-us", tag: "24/7 Support" },
        { label: "About Us", href: "/about-us", tag: "Company Details" },
        { label: "Pay Now Online", href: "/paynow", tag: "Secure Payment" },
      ]
    }
  ];

  const totalLinksCount = linkCategories.reduce((acc, cat) => acc + cat.links.length, 0);

  // Filter links based on category & search query
  const filteredCategories = linkCategories
    .filter(cat => activeCategory === "All" || cat.category === activeCategory)
    .map(cat => ({
      ...cat,
      links: cat.links.filter(link => 
        link.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        link.href.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }))
    .filter(cat => cat.links.length > 0);

  return (
    <section className="py-20 relative bg-[#e6ecf5]/80 overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none"></div>

      <Container>
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12 relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full neo-pressed text-xs sm:text-sm font-extrabold text-[#3f51b5] mb-4 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
            <span>Direct Service & Package Portals</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#2d3748] leading-tight">
            Explore All <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3f51b5] via-indigo-600 to-purple-600">GoIndiaCab</span> Destinations
          </h2>
          
          <p className="text-sm sm:text-base text-[#718096] mt-4 font-semibold max-w-2xl mx-auto">
            Directly access all major tour packages, outstation routes, city cab services, luxury tempo travellers, blogs, and support contacts.
          </p>

          <div className="flex items-center justify-center gap-2 mt-6">
            <span className="h-1 w-12 bg-[#3f51b5] rounded-full"></span>
            <span className="text-xs font-black text-[#3f51b5] px-3 py-1 neo-flat rounded-full uppercase tracking-wider">
              {totalLinksCount} Direct Href Portals
            </span>
            <span className="h-1 w-12 bg-[#3f51b5] rounded-full"></span>
          </div>
        </div>

        {/* Search & Category Filter Control Bar */}
        <div className="neo-flat p-4 sm:p-6 rounded-3xl mb-12 max-w-5xl mx-auto border-4 border-[#e0e5ec] shadow-lg">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            
            {/* Search Input Box */}
            <div className="relative w-full md:w-80">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#a0aec0]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search any route, blog, or service..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl neo-pressed text-sm font-bold text-[#2d3748] placeholder-[#a0aec0] focus:outline-none focus:ring-2 focus:ring-[#3f51b5] transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  style={{ cursor: "pointer" }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#718096] hover:text-[#2d3748] px-2 py-0.5 rounded-md neo-flat cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 w-full md:w-auto">
              <button
                onClick={() => setActiveCategory("All")}
                style={{ cursor: "pointer" }}
                className={clsx(
                  "px-4 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm transition-all duration-300 flex items-center gap-1.5 cursor-pointer",
                  activeCategory === "All"
                    ? "neo-pressed text-[#3f51b5] shadow-inner"
                    : "neo-flat text-[#718096] hover:text-[#2d3748]"
                )}
              >
                <Compass className="w-4 h-4" />
                <span>All Links ({totalLinksCount})</span>
              </button>

              {linkCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.category)}
                  style={{ cursor: "pointer" }}
                  className={clsx(
                    "px-4 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm transition-all duration-300 flex items-center gap-1.5 cursor-pointer",
                    activeCategory === cat.category
                      ? "neo-pressed text-[#3f51b5] shadow-inner"
                      : "neo-flat text-[#718096] hover:text-[#2d3748]"
                  )}
                >
                  <cat.icon className="w-4 h-4" />
                  <span>{cat.shortName}</span>
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* Category Cards & Link Grid */}
        {filteredCategories.length === 0 ? (
          <div className="text-center py-16 neo-flat rounded-3xl max-w-md mx-auto p-8">
            <Search className="w-12 h-12 text-[#a0aec0] mx-auto mb-4" />
            <h4 className="text-lg font-extrabold text-[#2d3748]">No matching links found</h4>
            <p className="text-xs text-[#718096] mt-1 font-semibold">
              Try searching with another keyword like &quot;Blog&quot;, &quot;Contact&quot;, &quot;Delhi&quot;, or &quot;Tempo&quot;.
            </p>
            <button 
              onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
              style={{ cursor: "pointer" }}
              className="mt-4 px-6 py-2.5 neo-pressed rounded-xl font-bold text-xs text-[#3f51b5] cursor-pointer"
            >
              Reset Search Filter
            </button>
          </div>
        ) : (
          <div className="space-y-12 max-w-7xl mx-auto">
            {filteredCategories.map((group) => {
              const Icon = group.icon;
              return (
                <div 
                  key={group.category}
                  className="neo-flat p-6 sm:p-8 md:p-10 rounded-3xl border-4 border-[#e0e5ec] transition-all duration-300 hover:shadow-xl relative"
                >
                  {/* Category Header Banner */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-5 border-b border-[#cbd5e0]">
                    <div className="flex items-center gap-4">
                      <div className={clsx("w-12 h-12 rounded-2xl flex items-center justify-center shadow-md", group.iconBg)}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-black text-[#2d3748]">
                          {group.category}
                        </h3>
                        <p className="text-xs sm:text-sm font-semibold text-[#718096] mt-0.5">
                          Instant booking & transparent fare routes for {group.shortName}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black px-4 py-2 rounded-xl neo-pressed text-[#3f51b5] uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#3f51b5]"></span>
                        {group.links.length} Direct Portals
                      </span>
                    </div>
                  </div>

                  {/* Buttons Grid with HREF */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {group.links.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        title={item.label}
                        style={{ cursor: "pointer" }}
                        className={clsx(
                          "group relative flex items-center justify-between w-full p-4 rounded-2xl neo-flat border-2 border-[#e0e5ec]",
                          "cursor-pointer z-10 select-none transition-all duration-300 hover:-translate-y-1 hover:border-[#3f51b5] hover:bg-blue-50/70 active:scale-[0.98]"
                        )}
                      >
                        <div className="flex items-center gap-3 min-w-0 pr-2 cursor-pointer">
                          <div className="w-9 h-9 rounded-xl flex items-center justify-center neo-pressed flex-shrink-0 group-hover:bg-[#3f51b5] group-hover:text-white transition-colors cursor-pointer">
                            <ChevronRight className="w-4 h-4 text-[#3f51b5] group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                          </div>
                          
                          <div className="min-w-0 cursor-pointer">
                            <span className="block text-xs sm:text-sm font-black text-[#2d3748] group-hover:text-[#3f51b5] transition-colors truncate cursor-pointer">
                              {item.label}
                            </span>
                            
                            {item.tag && (
                              <span className="inline-block mt-0.5 text-[10px] font-extrabold text-[#718096] group-hover:text-[#3f51b5] transition-colors cursor-pointer">
                                • {item.tag}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-center w-8 h-8 rounded-xl neo-pressed group-hover:bg-[#3f51b5] group-hover:text-white text-[#a0aec0] transition-all flex-shrink-0 cursor-pointer">
                          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </Container>
    </section>
  );
}
