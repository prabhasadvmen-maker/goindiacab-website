import Link from "next/link";
import { siteConfig } from "@/src/config/site";
import { MapPin, Phone, Mail, Headset } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#2f323e] text-white pt-16">
      <div className="max-w-[1400px] mx-auto px-4 xl:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-12 mb-16 relative z-10">
          
          {/* Column 1 - Contact Us */}
          <div>
            <h3 className="text-xl font-bold mb-8">Contact Us</h3>
            <ul className="space-y-4 text-sm font-medium text-gray-200">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-[#f9c004] shrink-0 mt-1" />
                <span className="leading-snug">{siteConfig.address}</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-3 text-[#f9c004] shrink-0" fill="currentColor" />
                <span>Booking: <a href={`tel:${siteConfig.phone.booking1}`} className="hover:text-[#f9c004] transition">{siteConfig.phone.booking1}</a></span>
              </li>
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-3 text-[#f9c004] shrink-0" fill="currentColor" />
                <span>Booking: <a href={`tel:${siteConfig.phone.booking2}`} className="hover:text-[#f9c004] transition">{siteConfig.phone.booking2}</a></span>
              </li>
              <li className="flex items-center">
                <Headset className="w-4 h-4 mr-3 text-[#f9c004] shrink-0" />
                <span>Support: <a href={`tel:${siteConfig.phone.support}`} className="hover:text-[#f9c004] transition">{siteConfig.phone.support}</a></span>
              </li>
              <li className="flex items-center">
                <Mail className="w-4 h-4 mr-3 text-[#f9c004] shrink-0" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-[#f9c004] transition">{siteConfig.email}</a>
              </li>
            </ul>

            <div className="flex items-center space-x-3 mt-8">
              <a href={siteConfig.social.instagram} className="w-8 h-8 bg-white text-[#2f323e] rounded-full flex items-center justify-center hover:bg-[#f9c004] transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href={siteConfig.social.facebook} className="w-8 h-8 bg-white text-[#2f323e] rounded-full flex items-center justify-center hover:bg-[#f9c004] transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href={siteConfig.social.tripadvisor} className="w-8 h-8 bg-white text-[#2f323e] rounded-full flex items-center justify-center hover:bg-[#f9c004] transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12c0 3.82 2.14 7.14 5.31 8.82l-1.07 2.15c-.17.34-.03.75.31.92.34.17.75.03.92-.31l1.1-2.21c1.1.38 2.29.6 3.53.6s2.43-.22 3.53-.6l1.1 2.21c.17.34.58.48.92.31.34-.17.48-.58.31-.92l-1.07-2.15C19.86 19.14 22 15.82 22 12c0-5.52-4.48-10-10-10zm-3 12c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm6 0c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/></svg>
              </a>
              <a href={siteConfig.social.twitter} className="w-8 h-8 bg-white text-[#2f323e] rounded-full flex items-center justify-center hover:bg-[#f9c004] transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href={siteConfig.social.linkedin} className="w-8 h-8 bg-white text-[#2f323e] rounded-full flex items-center justify-center hover:bg-[#f9c004] transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
          </div>

          {/* Column 2 - Taxi Tour Packages */}
          <div>
            <h3 className="text-xl font-bold mb-8">Taxi Tour Packages</h3>
            <ul className="space-y-4 text-sm font-medium text-gray-200">
              <li><Link href="/taxi-package/delhi" className="hover:text-white transition">Taxi Package in Delhi</Link></li>
              <li><Link href="/taxi-package/punjab" className="hover:text-white transition">Taxi Package From Punjab</Link></li>
              <li><Link href="/taxi-package/uttar-pradesh" className="hover:text-white transition">Taxi Package From Uttar Pradesh</Link></li>
              <li><Link href="/taxi-package/uttarakhand" className="hover:text-white transition">Taxi Package From Uttarakhand</Link></li>
              <li><Link href="/taxi-package/rajasthan" className="hover:text-white transition">Taxi Package From Rajasthan</Link></li>
              <li><Link href="/taxi-package/jammu-kashmir" className="hover:text-white transition">Taxi Package From Jammu Kashmir</Link></li>
              <li><Link href="/taxi-package/himachal" className="hover:text-white transition">Tour Package From Himachal</Link></li>
            </ul>
          </div>

          {/* Column 3 - Popular Routes */}
          <div>
            <h3 className="text-xl font-bold mb-8">Popular Routes</h3>
            <ul className="space-y-4 text-sm font-medium text-gray-200">
              <li><Link href="/popular-routes/cab-service-in-agra" className="hover:text-white transition">Cab Service in Agra</Link></li>
              <li><Link href="/popular-routes/cab-service-in-ayodhya" className="hover:text-white transition">Cab Service in Ayodhya</Link></li>
              <li><Link href="/popular-routes/cab-service-in-dehradun" className="hover:text-white transition">Cab Service in Dehradun</Link></li>
              <li>
                <Link href="/popular-routes/cab-service-in-jaipur" className="block pb-4 border-b border-gray-600 hover:text-white transition">Cab Service in Jaipur</Link>
              </li>
              <li className="pt-2"><Link href="/popular-routes/cab-service-in-varanasi" className="hover:text-white transition">Cab Service in Varanasi</Link></li>
            </ul>
          </div>

          {/* Column 4 - Out Station Taxi Services */}
          <div>
            <h3 className="text-xl font-bold mb-8">Out Station Taxi Services</h3>
            <ul className="space-y-4 text-sm font-medium text-gray-200">
              <li><Link href="/taxi/delhi-to-himachal-taxi-service" className="hover:text-white transition">Delhi To Himachal Pradesh Taxi Service</Link></li>
              <li><Link href="/taxi/uttarakhand-taxi-service-from-delhi" className="hover:text-white transition">Delhi To Uttarakhand Taxi Service</Link></li>
              <li><Link href="/taxi/jammu-kashmir-taxi-service-from-delhi" className="hover:text-white transition">Delhi To Jammu Kashmir Taxi Service</Link></li>
              <li><Link href="/taxi/rajasthan-taxi-service-from-delhi" className="hover:text-white transition">Delhi To Rajasthan Taxi Service</Link></li>
              <li><Link href="/taxi/uttar-pradesh-taxi-service-from-delhi" className="hover:text-white transition">Delhi To Uttar Pradesh Taxi Service</Link></li>
              <li><Link href="/taxi/punjab-taxi-service-from-delhi" className="hover:text-white transition">Delhi To Punjab Taxi Service</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#1c1d22] py-5">
        <div className="max-w-[1400px] mx-auto px-4 xl:px-8 flex flex-col md:flex-row justify-between items-center text-sm font-medium text-gray-300">
          <p>Copyright 2021 - {currentYear} Go India Cab – A Unit of Go My Trails Adventures Pvt. Ltd All Rights Reserved</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="hover:text-white transition flex items-center">
              <span className="text-[10px] mr-2">◉</span> Privacy
            </Link>
            <Link href="/terms-conditions" className="hover:text-white transition flex items-center">
              <span className="text-[10px] mr-2">◉</span> term & conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
