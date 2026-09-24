import { Search, MapPin, Calendar, Users, Car, Check, Star, ShieldCheck, ChevronRight, Info, Briefcase, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/src/config/site";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function SearchResultsPage({ searchParams }: Props) {
  const params = await searchParams;
  const from = params.from as string || "Pickup Location";
  const to = params.to as string || "Drop Location";
  const date = params.date as string || "Today";
  const tab = params.tab as string || "outstation";
  const travellers = params.travellers as string || "1 Traveller";
  const tripType = params.tripType as string || "oneway";

  const isHourly = tab === "hourly";
  const tripTitle = isHourly ? "Hourly Rental" : (tripType === "roundtrip" ? "Round Trip" : "One Way Trip");

  const cabs = [
    {
      id: "hatchback",
      name: "Hatchback",
      models: "WagonR, Swift, or similar",
      seats: 4,
      bags: 1,
      ac: true,
      price: isHourly ? 1500 : 2500,
      rating: 4.8,
      reviews: 124
    },
    {
      id: "sedan",
      name: "Sedan",
      models: "Dzire, Etios, or similar",
      seats: 4,
      bags: 2,
      ac: true,
      price: isHourly ? 1800 : 3200,
      rating: 4.9,
      reviews: 312,
      recommended: true
    },
    {
      id: "suv",
      name: "SUV",
      models: "Ertiga, Innova, or similar",
      seats: 6,
      bags: 3,
      ac: true,
      price: isHourly ? 2500 : 4500,
      rating: 4.9,
      reviews: 428
    },
    {
      id: "innova-crysta",
      name: "Premium SUV",
      models: "Innova Crysta",
      seats: 6,
      bags: 4,
      ac: true,
      price: isHourly ? 3000 : 5500,
      rating: 5.0,
      reviews: 156
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      
      {/* Search Summary Header */}
      <div className="bg-[#0B4A9C] text-white py-6 shadow-md relative z-10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            <div className="flex-1">
              <div className="flex items-center gap-2 text-blue-200 text-xs font-bold uppercase tracking-wider mb-2">
                <span className="bg-blue-800 px-2 py-0.5 rounded">{tripTitle}</span>
                <span>•</span>
                <span>{date}</span>
              </div>
              
              <div className="flex items-center gap-3 text-xl sm:text-2xl font-black">
                <span>{from}</span>
                {!isHourly && (
                  <>
                    <ChevronRight className="w-6 h-6 text-orange-400" />
                    <span>{to}</span>
                  </>
                )}
              </div>
            </div>

            <Link href="/" className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl font-bold transition-all w-fit">
              <Search className="w-4 h-4" />
              <span>Modify Search</span>
            </Link>

          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Filters Sidebar (Desktop) */}
          <div className="hidden lg:block lg:col-span-3 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 sticky top-28">
              <h3 className="font-extrabold text-gray-900 mb-4 pb-4 border-b border-gray-100">Filter Cabs</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Car Type</h4>
                  <div className="space-y-2">
                    {["Hatchback", "Sedan", "SUV", "Premium SUV"].map((type) => (
                      <label key={type} className="flex items-center gap-2 cursor-pointer group">
                        <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#00A5D9] focus:ring-[#00A5D9] border-gray-300 cursor-pointer" />
                        <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="bg-green-50 text-green-800 p-3 rounded-xl border border-green-200 flex gap-2">
                  <ShieldCheck className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <p className="text-xs font-bold leading-tight">All our cabs are deeply sanitized and drivers are background verified.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search Results List */}
          <div className="lg:col-span-9 space-y-5">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-black text-gray-900">Available Cabs ({cabs.length})</h2>
              <div className="text-sm font-bold text-gray-500">Prices are indicative</div>
            </div>

            {cabs.map((cab) => (
              <div key={cab.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 overflow-hidden flex flex-col md:flex-row relative group">
                
                {cab.recommended && (
                  <div className="absolute top-0 left-0 bg-gradient-to-r from-orange-500 to-[#FF6600] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-br-xl z-10">
                    Most Popular
                  </div>
                )}

                {/* Left: Car Image & Basic Info */}
                <div className="p-5 md:w-[35%] border-b md:border-b-0 md:border-r border-gray-100 flex flex-col items-center justify-center bg-slate-50/50">
                  <div className="w-full max-w-[200px] aspect-[16/9] relative mb-3">
                    {/* Placeholder for car image - in real app you'd use Image component */}
                    <div className="absolute inset-0 bg-gray-200 rounded-xl flex items-center justify-center text-gray-400">
                      <Car className="w-16 h-16 opacity-50" />
                    </div>
                  </div>
                  <h3 className="text-xl font-black text-gray-900 text-center">{cab.name}</h3>
                  <p className="text-xs font-bold text-gray-500 text-center mt-1">{cab.models}</p>
                  
                  <div className="flex items-center gap-1 mt-2 bg-white px-2 py-1 rounded-lg border border-gray-200">
                    <Star className="w-3.5 h-3.5 fill-[#FFB606] text-[#FFB606]" />
                    <span className="text-xs font-black text-gray-900">{cab.rating}</span>
                    <span className="text-[10px] font-bold text-gray-500">({cab.reviews})</span>
                  </div>
                </div>

                {/* Middle: Features */}
                <div className="p-5 md:w-[40%] flex flex-col justify-center border-b md:border-b-0 md:border-r border-gray-100">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Included Features</h4>
                  
                  <div className="grid grid-cols-2 gap-y-3 gap-x-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-[#00A5D9]">
                        <Users className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-sm font-bold text-gray-700">{cab.seats} Seats</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-[#00A5D9]">
                        <Briefcase className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-sm font-bold text-gray-700">{cab.bags} Bags</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-[#00A5D9]">
                        <Car className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-sm font-bold text-gray-700">{cab.ac ? 'AC' : 'Non-AC'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-sm font-bold text-gray-700">Toll Included</span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-start gap-1.5 bg-orange-50/50 p-2 rounded-lg border border-orange-100">
                    <Info className="w-3.5 h-3.5 text-orange-500 flex-shrink-0 mt-0.5" />
                    <p className="text-[10px] font-semibold text-orange-800 leading-tight">
                      Free cancellation up to 1 hour before pickup. No hidden charges.
                    </p>
                  </div>
                </div>

                {/* Right: Pricing & CTA */}
                <div className="p-5 md:w-[25%] flex flex-col justify-center bg-gray-50/30">
                  <div className="text-center md:text-right mb-4">
                    <div className="text-xs font-bold text-gray-500 mb-1">Starting from</div>
                    <div className="text-3xl font-black text-[#0B4A9C]">₹{cab.price}</div>
                    <div className="text-[10px] font-semibold text-gray-500 mt-1">Estimated total fare</div>
                  </div>

                  <a
                    href={`https://wa.me/${siteConfig.phone.booking1.replace(/\D/g, "")}?text=${encodeURIComponent(
                      `Hi GoIndiaCab! I want to book a ${cab.name} (${cab.models}).\nTrip: ${tripTitle}\nFrom: ${from}\nTo: ${to}\nDate: ${date}\nPrice Shown: ₹${cab.price}`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 bg-gradient-to-r from-[#FF6600] to-[#E65200] hover:from-[#e65200] hover:to-[#cc4400] text-white font-black text-sm tracking-wider uppercase rounded-xl shadow-lg shadow-orange-500/25 transition-all text-center group-hover:-translate-y-0.5"
                  >
                    Select & Book
                  </a>
                </div>

              </div>
            ))}

            <div className="mt-8 bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center">
              <h3 className="text-lg font-black text-blue-900 mb-2">Didn't find what you're looking for?</h3>
              <p className="text-sm font-semibold text-blue-800 mb-4">We also provide Tempo Travellers and Buses for larger groups.</p>
              <a href={`tel:${siteConfig.phone.booking1}`} className="inline-flex items-center gap-2 bg-white text-[#0B4A9C] px-6 py-2.5 rounded-xl font-bold border border-blue-200 hover:bg-blue-50 transition-colors">
                <Phone className="w-4 h-4" />
                <span>Call {siteConfig.phone.booking1} for Custom Booking</span>
              </a>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
} 
