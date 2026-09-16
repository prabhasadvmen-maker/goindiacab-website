import { NavItem } from "@/src/types"

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  {
    label: "Taxi Packages",
    href: "/taxi-package",
    children: [
      { label: "Taxi Package From Delhi", href: "/taxi-package/delhi" },
      { label: "Delhi Same Day Taxi Tour Packages", href: "/taxi-package/delhi-same-day" },
      { label: "Golden Triangle Taxi Tour Packages", href: "/taxi-package/golden-triangle" },
      { label: "Taxi Package From Punjab", href: "/taxi-package/punjab" },
      { label: "Taxi Package From Uttar Pradesh", href: "/taxi-package/uttar-pradesh" },
      { label: "Taxi Package From Uttarakhand", href: "/taxi-package/uttarakhand" },
      { label: "Taxi Package From Rajasthan", href: "/taxi-package/rajasthan" },
      { label: "Taxi Package From Jammu Kashmir", href: "/taxi-package/jammu-kashmir" },
      { label: "Tour Package From Himachal", href: "/taxi-package/himachal" },
    ],
  },
  {
    label: "Taxi Outstation Services",
    href: "/taxi",
    children: [
      { label: "Delhi To Himachal Pradesh Taxi Service", href: "/taxi/delhi-to-himachal-taxi-service" },
      { label: "Delhi To Uttarakhand Taxi Service", href: "/taxi/uttarakhand-taxi-service-from-delhi" },
      { label: "Delhi To Jammu Kashmir Taxi Service", href: "/taxi/jammu-kashmir-taxi-service-from-delhi" },
      { label: "Delhi To Rajasthan Taxi Service", href: "/taxi/rajasthan-taxi-service-from-delhi" },
      { label: "Delhi To Uttar Pradesh Taxi Service", href: "/taxi/uttar-pradesh-taxi-service-from-delhi" },
      { label: "Delhi To Punjab Taxi Service", href: "/taxi/punjab-taxi-service-from-delhi" },
    ],
  },
  {
    label: "Popular Routes",
    href: "/popular-routes",
    children: [
      { label: "Cab Service in Agra", href: "/popular-routes/cab-service-in-agra" },
      { label: "Cab Service in Ayodhya", href: "/popular-routes/cab-service-in-ayodhya" },
      { label: "Cab Service in Dehradun", href: "/popular-routes/cab-service-in-dehradun" },
      { label: "Cab Service in Jaipur", href: "/popular-routes/cab-service-in-jaipur" },
      { label: "Cab Service in Varanasi", href: "/popular-routes/cab-service-in-varanasi" },
      { label: "Cab Service in Chandigarh", href: "/popular-routes/cab-service-in-chandigarh" },
      { label: "Cab Service in Haridwar", href: "/popular-routes/cab-service-in-haridwar" },
      { label: "Cab Service in Noida", href: "/popular-routes/cab-service-in-noida" },
      { label: "Cab Service in Delhi", href: "/cab-service-in-delhi" },
    ],
  },
  {
    label: "Tempo Traveller in Delhi",
    href: "/tempo-traveller-on-rent-in-delhi",
    children: [
      { label: "9 Seater Tempo Traveller in Delhi", href: "/9-seater-tempo-traveller-in-delhi" },
      { label: "12 Seater Tempo Traveller in Delhi", href: "/12-seater-tempo-traveller-in-delhi" },
      { label: "16 Seater Tempo Traveller in Delhi", href: "/16-seater-tempo-traveller-in-delhi" },
      { label: "20 Seater Tempo Traveller in Delhi", href: "/20-seater-tempo-traveller-in-delhi" },
      { label: "22 Seater Tempo Traveller in Delhi", href: "/22-seater-tempo-traveller-in-delhi" },
      { label: "26 Seater Tempo Traveller in Delhi", href: "/26-seater-tempo-traveller-in-delhi" },
      { label: "Bus Rental in Delhi", href: "/bus-rental-in-delhi" },
    ],
  },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Pay Now", href: "/paynow" },
]
