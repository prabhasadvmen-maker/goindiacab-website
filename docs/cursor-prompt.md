# GoIndiaCab - Complete Frontend Rebuild Prompt for Cursor AI

## PROJECT OVERVIEW
Rebuild the complete GoIndiaCab website frontend using Next.js App Router, TypeScript, and Tailwind CSS.

Live website: https://www.goindiacab.com/

## FOLDER STRUCTURE (ALREADY CREATED)
The folder structure is already created. Do NOT recreate folders. Just fill in the files.

```
src/
├── app/
│   ├── page.tsx                                    ← Homepage
│   ├── layout.tsx                                  ← Root layout (ALREADY EXISTS in app/)
│   ├── globals.css                                 ← Global styles (ALREADY EXISTS in app/)
│   ├── loading.tsx
│   ├── error.tsx
│   ├── not-found.tsx
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── about-us/page.tsx
│   ├── blogs/page.tsx
│   ├── contact-us/page.tsx
│   ├── paynow/page.tsx
│   ├── privacy-policy/page.tsx
│   ├── terms-conditions/page.tsx
│   ├── taxi-package/page.tsx
│   ├── taxi-package/[slug]/page.tsx
│   ├── taxi/page.tsx
│   ├── taxi/[slug]/page.tsx
│   ├── popular-routes/page.tsx
│   ├── popular-routes/[slug]/page.tsx
│   ├── tempo-traveller-on-rent-in-delhi/page.tsx
│   ├── 9-seater-tempo-traveller-in-delhi/page.tsx
│   ├── 12-seater-tempo-traveller-in-delhi/page.tsx
│   ├── 16-seater-tempo-traveller-in-delhi/page.tsx
│   ├── 20-seater-tempo-traveller-in-delhi/page.tsx
│   ├── 22-seater-tempo-traveller-in-delhi/page.tsx
│   ├── 26-seater-tempo-traveller-in-delhi/page.tsx
│   ├── bus-rental-in-delhi/page.tsx
│   ├── cab-service-in-[slug]/page.tsx
│   └── taxi-service-in-[slug]/page.tsx
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Navbar.tsx
│   │   └── MobileMenu.tsx
│   ├── common/
│   │   ├── Button.tsx
│   │   ├── Container.tsx
│   │   ├── SectionTitle.tsx
│   │   ├── Breadcrumb.tsx
│   │   ├── Card.tsx
│   │   └── Loader.tsx
│   ├── home/
│   │   ├── HeroSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── FleetSection.tsx
│   │   ├── PopularRoutesSection.tsx
│   │   ├── PackagesSection.tsx
│   │   ├── StatsSection.tsx
│   │   ├── ReviewsSection.tsx
│   │   ├── WhyChooseUs.tsx
│   │   └── TrustedAreas.tsx
│   ├── booking/
│   │   ├── BookingForm.tsx
│   │   ├── BookingSummary.tsx
│   │   └── BookingConfirmation.tsx
│   ├── forms/
│   │   └── ContactForm.tsx
│   ├── faq/
│   │   └── FAQSection.tsx
│   └── seo/
│       └── JsonLd.tsx
│
├── config/
│   ├── site.ts          ← ALREADY EXISTS
│   └── navigation.ts    ← ALREADY EXISTS
│
├── data/
│   ├── localities.ts    ← ALREADY EXISTS
│   ├── packages.ts      ← ALREADY EXISTS
│   ├── routes.ts        ← ALREADY EXISTS
│   ├── vehicles.ts      ← ALREADY EXISTS
│   └── faqs.ts          ← ALREADY EXISTS
│
├── types/
│   └── index.ts         ← ALREADY EXISTS
│
└── lib/
    └── utils.ts
```

## IMPORTANT RULES

1. Use `@/src/` path alias for all imports
2. Root layout.tsx is at `app/layout.tsx` (NOT src/app) - keep it there
3. All new pages go inside `src/app/`
4. Font: Poppins from next/font/google
5. NO external UI libraries (no shadcn, no MUI, no Bootstrap)
6. Only use: lucide-react for icons, clsx for classnames
7. Install lucide-react: `npm install lucide-react clsx`
8. Use next/image for ALL images
9. Use next/link for ALL navigation
10. All pages must have generateMetadata()
11. Dynamic pages must have generateStaticParams()
12. NO lorem ipsum text anywhere
13. NO fake data - use real GoIndiaCab data from data/ files
14. NO placeholder "coming soon" pages

## BRAND COLORS (Use in Tailwind)

Add these to globals.css or tailwind config:
- Primary Blue: #3E4FB0
- Accent Yellow: #FFB606
- Dark: #1a1a2e
- Text Dark: #2d2d2d
- Text Light: #666666
- White: #ffffff
- Light BG: #f8f9fa

## REAL BUSINESS DATA

### Company Info
- Name: Go India Cab
- Phone Booking 1: +91-9792-000-555
- Phone Booking 2: +91-8433-381-888
- Phone Support: +91-9557-479-080
- Email: info@goindiacab.com
- Address: WZ-69, First Floor Todapur Periphery Rd, Todapur, New Delhi, Delhi 110012
- Logo: /GoIndiaCab logo.png
- Favicon: /GoIndiaCab Favicon icon.png

### Stats
- Happy Customers: 99%
- Experienced Drivers: 100%
- Years of Experience: 10+
- Driving Completed: 700,000+
- Google Rating: 4.9 stars
- Google Reviews: 418+
- Fare Starting: ₹11/km

### Social Links
- Instagram: https://www.instagram.com/goindiacab
- Facebook: https://www.facebook.com/share/18X457cbdL/
- Twitter/X: https://x.com/goindiacab
- LinkedIn: https://www.linkedin.com/company/goindiacab/
- Tripadvisor: https://www.tripadvisor.in/Attraction_Review-g304551-d32698767-Reviews-Go_India_Cab-New_Delhi_National_Capital_Territory_of_Delhi.html

## STEP 1 - Install Dependencies

```bash
npm install lucide-react clsx
```

## STEP 2 - Update globals.css

Add Poppins font and CSS variables for brand colors. Keep existing Tailwind imports.

## STEP 3 - Update Root Layout (app/layout.tsx)

- Import Poppins from next/font/google
- Add metadata with title, description, favicon
- Import Header and Footer from src/components/layout/
- Wrap children with Header and Footer

## STEP 4 - Build Components (in order)

### 4.1 - lib/utils.ts
```ts
import { clsx, type ClassValue } from "clsx"
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}
```

### 4.2 - components/common/Button.tsx
Reusable button with variants: primary, secondary, outline
Primary: bg-[#3E4FB0] text-white
Secondary: bg-[#FFB606] text-black
Outline: border border-[#3E4FB0] text-[#3E4FB0]
Sizes: sm, md, lg

### 4.3 - components/common/Container.tsx
Max width wrapper: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8

### 4.4 - components/common/SectionTitle.tsx
Props: title, subtitle, centered?
Style: bold heading + colored underline accent

### 4.5 - components/common/Breadcrumb.tsx
Props: items: [{label, href}]
Show home > page > subpage
Add JSON-LD BreadcrumbList schema

### 4.6 - components/common/Card.tsx
Reusable card with image, title, description, link

### 4.7 - components/layout/Header.tsx
TOP BAR (desktop only):
- Left: Language selector + Social icons (Instagram, Facebook, Tripadvisor, X, LinkedIn)
- Right: Phone +91-9792-000-555 | Email info@goindiacab.com

MAIN NAVBAR:
- Logo: /GoIndiaCab logo.png (use next/image)
- Navigation links with dropdowns
- "Book Now" CTA button (bg-[#FFB606])
- Sticky on scroll
- Mobile: hamburger menu

DROPDOWN MENUS:
- Taxi Packages → 9 items
- Taxi Outstation Services → 6 items
- Popular Routes → 9 items
- Tempo Traveller → 7 items

Use navigation data from: src/config/navigation.ts

### 4.8 - components/layout/MobileMenu.tsx
- Slide-in from left or top
- Accordion for dropdown items
- Phone CTA at bottom
- Close button

### 4.9 - components/layout/Footer.tsx
4 column layout:
Column 1: Logo + description + social links + contact info
Column 2: Taxi Tour Packages links
Column 3: Popular Routes links
Column 4: Outstation Taxi Services links

Bottom bar: Copyright © 2021-2026 Go India Cab | Privacy Policy | Terms & Conditions

Use real data from config/site.ts and config/navigation.ts

### 4.10 - components/faq/FAQSection.tsx
- Accordion style
- Click to expand/collapse
- Props: faqs: FAQ[], title?: string
- Add FAQPage JSON-LD schema

### 4.11 - components/booking/BookingForm.tsx
Fields:
- Name (required)
- Pickup Location (required)
- Drop Location (required)
- Contact Number (required)
- Trip Type: One Way / Round Trip / Local
- Date (optional)
- Submit button

Style: Clean white card with shadow
On submit: Show success message (frontend only)
Validation: All required fields

### 4.12 - components/home/HeroSection.tsx
- Full width hero with background image overlay
- Heading: "Book Cab & Taxi Services Across India"
- Subtext: "Book reliable one-way, round-trip, local and airport taxi services across India."
- BookingForm embedded in hero
- Background: dark overlay on travel image

### 4.13 - components/home/StatsSection.tsx
4 stats in a row:
- 99% Happy Customers
- 100% Experienced Drivers
- 10+ Years of Experience
- 700,000+ Driving Completed
Animated counter on scroll (use Intersection Observer)

### 4.14 - components/home/WhyChooseUs.tsx
6 feature cards:
- Professional Drivers
- 24/7 Availability
- Affordable Pricing (from ₹11/km)
- GPS Tracked Vehicles
- Clean & Comfortable Cars
- Easy Booking

### 4.15 - components/home/FleetSection.tsx
Show vehicle cards from src/data/vehicles.ts
Each card: image, name, capacity, price/km, features
"Book Now" CTA on each card

### 4.16 - components/home/PopularRoutesSection.tsx
Grid of route cards from src/data/routes.ts (popularRoutes)
Each card: image, from→to, distance, duration, fare, "View Details" link

### 4.17 - components/home/PackagesSection.tsx
Grid of package cards from src/data/packages.ts
Each card: image, title, destination, duration, fare, "View Details" link

### 4.18 - components/home/ServicesSection.tsx
2 service cards:
1. Car Rental Service - with description
2. Taxi Tour Packages - with description
Use image: https://www.goindiacab.com/wp-content/uploads/2024/12/Goindia-services.png.webp

### 4.19 - components/home/ReviewsSection.tsx
Google rating badge: ★★★★★ 4.9 | 418+ Reviews
Review cards (use 3-4 sample reviews)
Each card: name, rating stars, comment, date

### 4.20 - components/home/TrustedAreas.tsx
3 tabs: Central & North Delhi | South Delhi | West Delhi & Other Areas
Each tab shows grid of area links
Use real area data from src/data/localities.ts

## STEP 5 - Build Pages

### 5.1 - src/app/page.tsx (Homepage)
Sections in order:
1. HeroSection (with BookingForm)
2. About/Description section (H1: "Go India Cab - Best Taxi Service in Delhi India")
3. ServicesSection
4. Taxi Services grid (6 state cards with images from goindiacab.com)
5. FleetSection
6. PopularRoutesSection
7. PackagesSection
8. StatsSection
9. WhyChooseUs
10. ContactForm (inline)
11. FAQSection (use homeFaqs from data/faqs.ts)
12. ReviewsSection
13. TrustedAreas

Metadata:
- title: "Taxi Service in Delhi NCR | Outstation & Airport Cabs – Go India Cab"
- description: "Go India Cab is the best taxi service in Delhi NCR..."

### 5.2 - src/app/about-us/page.tsx
- Hero with breadcrumb
- Company story (12+ years experience)
- Mission & Vision
- Why Choose Us
- Stats
- Team/Fleet info
- CTA

### 5.3 - src/app/contact-us/page.tsx
- Breadcrumb
- Contact form (ContactForm component)
- Contact info cards: Address, Phone, Email
- Map placeholder (iframe or static map image)
- WhatsApp CTA

### 5.4 - src/app/paynow/page.tsx
- Breadcrumb
- Payment form UI (frontend only)
- Fields: Name, Phone, Email, Booking Reference, Amount
- Submit button
- Success/failure states
- Note: "For payment queries call +91-9792-000-555"

### 5.5 - src/app/privacy-policy/page.tsx
- Breadcrumb
- Full privacy policy content
- Sections: Data Collection, Usage, Cookies, Third Party, Contact

### 5.6 - src/app/terms-conditions/page.tsx
- Breadcrumb
- Full terms content
- Sections: Booking, Cancellation, Refund, Liability

### 5.7 - src/app/blogs/page.tsx
- Breadcrumb
- Blog listing grid
- Each card: image, title, excerpt, date, "Read More" link
- Use sample blog data (3-5 blogs about taxi services)

### 5.8 - src/app/taxi-package/page.tsx
- Hero: "Taxi Tour Packages"
- Breadcrumb
- Grid of all packages from data/packages.ts
- Each card links to /taxi-package/[slug]

### 5.9 - src/app/taxi-package/[slug]/page.tsx
- generateStaticParams() from packages data
- generateMetadata() per package
- Hero with package image
- Breadcrumb
- Package details: destination, duration, vehicles, fare
- Inclusions & Exclusions
- BookingForm
- FAQSection
- Related packages

### 5.10 - src/app/taxi/page.tsx
- Hero: "Outstation Taxi Services from Delhi"
- Breadcrumb
- Grid of all outstation routes from data/routes.ts (outstationRoutes)
- Each card links to /taxi/[slug]

### 5.11 - src/app/taxi/[slug]/page.tsx
- generateStaticParams() from outstationRoutes
- generateMetadata() per route
- Hero with route image
- Breadcrumb: Home > Outstation > Route Name
- Route details: from, to, distance, duration, fare
- Vehicle options
- BookingForm
- FAQSection
- Related routes

### 5.12 - src/app/popular-routes/page.tsx
- Hero: "Popular Cab Routes"
- Breadcrumb
- Grid of all popular routes from data/routes.ts (popularRoutes)
- Each card links to /popular-routes/[slug]

### 5.13 - src/app/popular-routes/[slug]/page.tsx
- generateStaticParams() from popularRoutes
- generateMetadata() per route
- Hero with city image
- Breadcrumb
- Route details
- BookingForm
- FAQSection

### 5.14 - src/app/tempo-traveller-on-rent-in-delhi/page.tsx
- Hero: "Tempo Traveller on Rent in Delhi"
- Breadcrumb
- All tempo traveller options (9,12,16,20,22,26 seater)
- Each links to respective page
- Features, pricing, use cases
- BookingForm
- FAQSection

### 5.15 - src/app/[N]-seater-tempo-traveller-in-delhi/page.tsx (all 6 pages)
For each seater (9,12,16,20,22,26):
- Hero with vehicle image
- Breadcrumb: Home > Tempo Traveller > N Seater
- Vehicle details from data/vehicles.ts
- Capacity, features, luggage, AC
- Pricing
- Ideal use cases
- BookingForm
- FAQSection

### 5.16 - src/app/bus-rental-in-delhi/page.tsx
- Hero: "Bus Rental in Delhi"
- Breadcrumb
- Bus fleet options
- Features, capacity, pricing
- Use cases: School trips, Corporate, Pilgrimages, Weddings
- BookingForm
- FAQSection

### 5.17 - src/app/cab-service-in-[slug]/page.tsx (DYNAMIC - covers 40 localities)
- generateStaticParams() from cabServiceLocalities in data/localities.ts
- generateMetadata() per locality
- Hero: "Cab Service in {area}"
- Breadcrumb: Home > Cab Service in {area}
- H1: locality.title
- Description: locality.description
- Services offered
- Nearby areas links
- BookingForm
- FAQSection
- Contact CTA

### 5.18 - src/app/taxi-service-in-[slug]/page.tsx (DYNAMIC - covers 10 localities)
- generateStaticParams() from taxiServiceLocalities in data/localities.ts
- generateMetadata() per locality
- Same template as cab-service but with "Taxi Service" branding
- Hero: "Taxi Service in {area}"
- Breadcrumb: Home > Taxi Service in {area}

### 5.19 - src/app/loading.tsx
- Full page loading spinner
- GoIndiaCab branded

### 5.20 - src/app/error.tsx
- "use client"
- Error message with retry button
- GoIndiaCab branded

### 5.21 - src/app/not-found.tsx
- 404 page
- "Page Not Found" message
- Back to Home button
- GoIndiaCab branded

### 5.22 - src/app/sitemap.ts
Generate sitemap with ALL 94 URLs

### 5.23 - src/app/robots.ts
Allow all, sitemap URL

## STEP 6 - SEO for Every Page

Every page must have:
```ts
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "...",
    description: "...",
    alternates: { canonical: "https://www.goindiacab.com/..." },
    openGraph: { title, description, url, images },
  }
}
```

## STEP 7 - JSON-LD Structured Data

Add to Homepage:
- Organization schema
- LocalBusiness schema
- TaxiService schema

Add to FAQ sections:
- FAQPage schema

Add to Breadcrumbs:
- BreadcrumbList schema

## STEP 8 - Responsive Design

Every component must work on:
- Mobile: 320px - 414px
- Tablet: 768px - 1024px
- Desktop: 1280px - 1920px

Use Tailwind responsive prefixes: sm: md: lg: xl: 2xl:

## STEP 9 - Final Build Check

```bash
npm run build
```

Fix ALL TypeScript errors.
Fix ALL ESLint errors.
No console errors.
No broken links.

## IMAGES TO USE

Use these real images from GoIndiaCab CDN:
- Logo: /GoIndiaCab logo.png (local)
- Himachal: https://www.goindiacab.com/wp-content/uploads/2024/12/Himachal-Taxi-Services.jpg.webp
- Uttarakhand: https://www.goindiacab.com/wp-content/uploads/2024/12/Uttarakhand-Taxi-Services.jpg.webp
- Jammu Kashmir: https://www.goindiacab.com/wp-content/uploads/2024/12/Jammu-Kashmir-Taxi-Services.jpg.webp
- Rajasthan: https://www.goindiacab.com/wp-content/uploads/2024/12/Rajasthan-Taxi-Services.jpg.webp
- Uttar Pradesh: https://www.goindiacab.com/wp-content/uploads/2024/12/Uttar-Pradesh-Taxi-Services.jpg.webp
- Punjab: https://www.goindiacab.com/wp-content/uploads/2024/12/Punjab-Taxi-Services.jpg.webp
- Delhi: https://www.goindiacab.com/wp-content/uploads/2024/12/delhi.jpg.webp
- Chandigarh: https://www.goindiacab.com/wp-content/uploads/2025/01/chandigarh-1-scaled-1.jpg.webp
- Varanasi: https://www.goindiacab.com/wp-content/uploads/2024/12/varanasi.jpg.webp
- Agra: https://www.goindiacab.com/wp-content/uploads/2024/12/agra.jpg.webp
- Dehradun: https://www.goindiacab.com/wp-content/uploads/2024/12/dehradun.jpg.webp
- Noida: https://www.goindiacab.com/wp-content/uploads/2024/12/noida.jpg.webp
- Ayodhya: https://www.goindiacab.com/wp-content/uploads/2024/12/ayodhya.jpg.webp
- Jaipur: https://www.goindiacab.com/wp-content/uploads/2024/12/Best-Cab-Services-in-Jaipur.png.webp
- Haridwar: https://www.goindiacab.com/wp-content/uploads/2024/12/WhatsApp-Image-2024-12-25-at-11.20.43.jpeg.webp
- Services: https://www.goindiacab.com/wp-content/uploads/2024/12/Goindia-services.png.webp

Add to next.config.ts:
```ts
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'www.goindiacab.com' },
  ],
}
```

## IMPORTANT NOTES FOR CURSOR

1. The existing `app/layout.tsx` and `app/globals.css` are in the ROOT app/ folder (not src/app/). Move them to src/app/ or update the root layout to import from src/components/layout/.

2. The tsconfig.json has `"@/*": ["./*"]` - so use `@/src/components/...` for imports.

3. All dynamic route pages need both generateStaticParams AND generateMetadata.

4. BookingForm is "use client" component (has state/interaction).

5. Header with dropdown is "use client" (has hover/click state).

6. MobileMenu is "use client" (has open/close state).

7. FAQSection is "use client" (has accordion state).

8. StatsSection is "use client" (has scroll animation).

9. All other components can be Server Components.

10. Do NOT create fake payment processing. PayNow page is UI only.

11. Do NOT add fake testimonials. Use the Google review badge only.

12. The project must pass `npm run build` without errors.

## START ORDER

Build in this exact order:
1. lib/utils.ts
2. globals.css (update)
3. app/layout.tsx (update root layout)
4. components/common/* (all 6 files)
5. components/layout/Header.tsx
6. components/layout/MobileMenu.tsx
7. components/layout/Footer.tsx
8. components/faq/FAQSection.tsx
9. components/booking/BookingForm.tsx
10. components/home/* (all sections)
11. src/app/page.tsx (homepage)
12. All other pages
13. loading.tsx, error.tsx, not-found.tsx
14. sitemap.ts, robots.ts
15. npm run build → fix errors
