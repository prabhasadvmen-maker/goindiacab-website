# GoIndiaCab - Missing Pages & Bug Fix Prompt for Cursor AI

## PROJECT CONTEXT

This is a Next.js 15 + TypeScript + Tailwind CSS 4 project for GoIndiaCab website.
- App Router is used
- All imports use `@/src/...` path alias
- Tailwind v4 with `@theme` in globals.css
- lucide-react for icons, clsx for classnames
- NO external UI libraries

---

## MISSING FILES TO CREATE

### 1. `src/app/error.tsx` — MISSING, CREATE THIS FILE

```tsx
"use client";

import { useEffect } from "react";
import { Container } from "@/src/components/common/Container";
import { Button } from "@/src/components/common/Button";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="bg-white min-h-[70vh] flex items-center justify-center">
      <Container className="text-center py-20">
        <AlertTriangle className="w-24 h-24 text-accent mx-auto mb-6" />
        <h1 className="text-4xl md:text-5xl font-bold text-dark mb-4">
          Something Went Wrong
        </h1>
        <p className="text-lg text-gray-500 max-w-md mx-auto mb-10">
          An unexpected error occurred. Please try again or go back to the homepage.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" onClick={reset}>
            Try Again
          </Button>
        </div>
      </Container>
    </div>
  );
}
```

---

### 2. `src/app/not-found/` folder — EMPTY FOLDER EXISTS, DELETE IT

There is an empty folder `src/app/not-found/` which should NOT exist.
The correct file is `src/app/not-found.tsx` which already exists at root level.
DELETE the empty `src/app/not-found/` folder — it will cause Next.js routing conflict.

---

### 3. `src/components/seo/` — EMPTY FOLDER, CREATE JsonLd component

Create `src/components/seo/JsonLd.tsx`:

```tsx
interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

---

### 4. `src/components/forms/` — EMPTY FOLDER, CREATE ContactForm component

Create `src/components/forms/ContactForm.tsx`:

```tsx
"use client";

import { useState } from "react";
import { Button } from "@/src/components/common/Button";
import { CheckCircle } from "lucide-react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => setStatus("idle"), 5000);
    }, 1500);
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center text-center py-12">
        <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
        <h3 className="text-2xl font-bold text-dark mb-2">Message Sent!</h3>
        <p className="text-gray-text">
          Thank you for contacting us. We will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="cf_name" className="block text-sm font-medium text-dark mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="cf_name"
            required
            className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition bg-gray-50"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label htmlFor="cf_phone" className="block text-sm font-medium text-dark mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            id="cf_phone"
            required
            pattern="[0-9]{10}"
            className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition bg-gray-50"
            placeholder="9876543210"
          />
        </div>
      </div>
      <div>
        <label htmlFor="cf_email" className="block text-sm font-medium text-dark mb-2">
          Email Address
        </label>
        <input
          type="email"
          id="cf_email"
          className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition bg-gray-50"
          placeholder="john@example.com"
        />
      </div>
      <div>
        <label htmlFor="cf_message" className="block text-sm font-medium text-dark mb-2">
          Your Message *
        </label>
        <textarea
          id="cf_message"
          required
          rows={4}
          className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition bg-gray-50 resize-none"
          placeholder="How can we help you?"
        ></textarea>
      </div>
      <Button
        type="submit"
        size="lg"
        className="w-full md:w-auto"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
```

---

### 5. `src/lib/` — EMPTY FOLDER, CREATE api.ts and utils.ts

Create `src/lib/utils.ts`:

```ts
import clsx, { ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatPhone(phone: string): string {
  return phone.replace(/\s/g, "");
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
```

Create `src/lib/api.ts`:

```ts
// API client — ready for future Node.js + Express backend integration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export async function fetchData<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}
```

---

### 6. `src/hooks/` — EMPTY FOLDER, CREATE useScrolled hook

Create `src/hooks/useScrolled.ts`:

```ts
"use client";

import { useState, useEffect } from "react";

export function useScrolled(threshold = 20): boolean {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return isScrolled;
}
```

---

## BUGS TO FIX

### BUG 1 — `src/app/paynow/page.tsx` — Missing Metadata export

The `paynow/page.tsx` uses `"use client"` but also needs metadata.
In Next.js App Router, you CANNOT export `metadata` from a Client Component.

FIX: Split into two files:

**`src/app/paynow/page.tsx`** — Keep as Server Component, remove `"use client"`:
- Remove `"use client"` directive
- Remove `useRouter` import
- Export metadata normally
- Import a new Client Component `PayNowForm`

**`src/app/paynow/PayNowForm.tsx`** — New Client Component:
- Move all the form logic, useState, useRouter here
- Mark as `"use client"`

Here is the fix:

`src/app/paynow/page.tsx`:
```tsx
import { Metadata } from "next";
import { siteConfig } from "@/src/config/site";
import { Container } from "@/src/components/common/Container";
import { Breadcrumb } from "@/src/components/common/Breadcrumb";
import PayNowForm from "./PayNowForm";

export const metadata: Metadata = {
  title: "Pay Now | GoIndiaCab",
  description: "Pay securely for your cab booking with Go India Cab.",
  alternates: { canonical: `${siteConfig.url}/paynow` },
};

export default function PayNowPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-gray-light py-12 md:py-16 border-b border-border">
        <Container>
          <Breadcrumb items={[{ label: "Pay Now" }]} />
          <h1 className="text-4xl md:text-5xl font-bold text-dark mt-4">
            Secure <span className="text-primary">Payment</span>
          </h1>
          <p className="text-gray-text mt-4 max-w-2xl text-lg">
            Pay securely for your cab booking. 100% safe and encrypted transaction.
          </p>
        </Container>
      </div>
      <Container className="py-20">
        <div className="max-w-3xl mx-auto">
          <PayNowForm />
        </div>
      </Container>
    </div>
  );
}
```

`src/app/paynow/PayNowForm.tsx`:
```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/common/Button";
import { CheckCircle, Shield, CreditCard, Lock } from "lucide-react";

export default function PayNowForm() {
  const [status, setStatus] = useState<"idle" | "processing" | "success">("idle");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("processing");
    setTimeout(() => setStatus("success"), 2000);
  };

  if (status === "success") {
    return (
      <div className="bg-white p-12 rounded-2xl shadow-lg border border-border text-center">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-dark mb-4">Payment Successful!</h2>
        <p className="text-gray-text mb-8 text-lg">
          Thank you for your payment. Your booking is confirmed.
        </p>
        <Button onClick={() => router.push("/")} size="lg">
          Return to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg border border-border">
      <div className="flex items-center space-x-4 mb-8 pb-8 border-b border-border">
        <Shield className="w-10 h-10 text-green-500" />
        <div>
          <h3 className="font-bold text-dark text-lg">Secure 256-bit SSL Encryption</h3>
          <p className="text-sm text-gray-text">Your payment details are completely safe.</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="pay_name" className="block text-sm font-medium text-dark mb-2">Full Name *</label>
            <input type="text" id="pay_name" required className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary outline-none bg-gray-50" placeholder="John Doe" />
          </div>
          <div>
            <label htmlFor="pay_phone" className="block text-sm font-medium text-dark mb-2">Phone Number *</label>
            <input type="tel" id="pay_phone" required pattern="[0-9]{10}" className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary outline-none bg-gray-50" placeholder="9876543210" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="pay_email" className="block text-sm font-medium text-dark mb-2">Email Address *</label>
            <input type="email" id="pay_email" required className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary outline-none bg-gray-50" placeholder="john@example.com" />
          </div>
          <div>
            <label htmlFor="pay_ref" className="block text-sm font-medium text-dark mb-2">Booking Reference *</label>
            <input type="text" id="pay_ref" required className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary outline-none bg-gray-50" placeholder="Delhi to Agra" />
          </div>
        </div>
        <div>
          <label htmlFor="pay_amount" className="block text-sm font-medium text-dark mb-2">Amount (INR) *</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-text font-bold">₹</span>
            <input type="number" id="pay_amount" required min="1" className="w-full pl-10 pr-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary outline-none bg-gray-50 font-bold text-lg" placeholder="0" />
          </div>
        </div>
        <Button type="submit" size="lg" className="w-full" disabled={status === "processing"}>
          {status === "processing" ? "Processing..." : <><Lock className="w-4 h-4 mr-2" /> Pay Securely</>}
        </Button>
        <div className="flex items-center justify-center space-x-3 pt-4 opacity-60">
          <CreditCard className="w-8 h-8 text-dark" />
          <span className="text-sm">We accept Credit/Debit Cards, UPI, and Netbanking.</span>
        </div>
      </form>
    </div>
  );
}
```

---

### BUG 2 — `src/app/taxi-package/[slug]/page.tsx` — Async params warning in Next.js 15

In Next.js 15, `params` must be awaited. Fix `generateMetadata` and page component:

```tsx
// WRONG (current):
export function generateMetadata({ params }: { params: { slug: string } })

// CORRECT (fix to):
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pkg = taxiPackages.find((p) => p.slug === slug);
  ...
}

export default async function PackageDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pkg = taxiPackages.find((p) => p.slug === slug);
  ...
}
```

Apply this SAME async params fix to ALL dynamic route pages:
- `src/app/taxi-package/[slug]/page.tsx`
- `src/app/taxi/[slug]/page.tsx`
- `src/app/popular-routes/[slug]/page.tsx`
- `src/app/cab-service-in-[slug]/page.tsx`
- `src/app/taxi-service-in-[slug]/page.tsx`

---

### BUG 3 — `src/app/blogs/page.tsx` — Blog cards link to `#` (broken)

Currently all blog cards link to `href="#"`. 

FIX: Create a `src/data/blogs.ts` data file and proper blog detail pages.

Create `src/data/blogs.ts`:
```ts
import { Blog } from "@/src/types";

export const blogs: Blog[] = [
  {
    id: "1",
    slug: "top-places-to-visit-himachal-pradesh",
    title: "Top 10 Places to Visit in Himachal Pradesh",
    excerpt: "Explore the breathtaking beauty of Himachal Pradesh with our comprehensive guide to the top destinations.",
    content: "Himachal Pradesh is one of the most beautiful states in India...",
    image: "https://www.goindiacab.com/wp-content/uploads/2024/12/Himachal-Taxi-Services.jpg.webp",
    author: "GoIndiaCab Team",
    date: "May 15, 2024",
    category: "Travel Guide",
    tags: ["Himachal", "Travel", "Mountains"],
  },
  {
    id: "2",
    slug: "golden-triangle-tour-guide",
    title: "Ultimate Guide to the Golden Triangle Tour",
    excerpt: "Everything you need to know before embarking on the famous Golden Triangle Tour covering Delhi, Agra, and Jaipur.",
    content: "The Golden Triangle Tour is one of the most popular tourist circuits in India...",
    image: "https://www.goindiacab.com/wp-content/uploads/2024/12/agra.jpg.webp",
    author: "GoIndiaCab Team",
    date: "April 22, 2024",
    category: "Tour Packages",
    tags: ["Golden Triangle", "Delhi", "Agra", "Jaipur"],
  },
  {
    id: "3",
    slug: "tempo-traveller-for-group-trips",
    title: "Why Renting a Tempo Traveller is Best for Group Trips",
    excerpt: "Planning a trip with family or friends? Discover the benefits of renting a Tempo Traveller.",
    content: "When planning a group trip, choosing the right vehicle is crucial...",
    image: "https://www.goindiacab.com/wp-content/uploads/2024/12/Uttarakhand-Taxi-Services.jpg.webp",
    author: "GoIndiaCab Team",
    date: "March 10, 2024",
    category: "Tips & Advice",
    tags: ["Tempo Traveller", "Group Travel", "Tips"],
  },
  {
    id: "4",
    slug: "best-weekend-getaways-from-delhi",
    title: "Best Weekend Getaways from Delhi within 300 KMs",
    excerpt: "Escape the city hustle and explore these amazing weekend destinations just a few hours drive from New Delhi.",
    content: "Delhi is surrounded by some amazing weekend getaway destinations...",
    image: "https://www.goindiacab.com/wp-content/uploads/2025/01/chandigarh-1-scaled-1.jpg.webp",
    author: "GoIndiaCab Team",
    date: "February 28, 2024",
    category: "Travel Guide",
    tags: ["Weekend Trips", "Delhi", "Road Trip"],
  },
];
```

Update `src/app/blogs/page.tsx` to use real blog data with proper links:
```tsx
import { blogs } from "@/src/data/blogs";
// Change link from "#" to `/blog/${blog.slug}`
```

Create `src/app/blog/[slug]/page.tsx` — Blog detail page:
```tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/src/config/site";
import { Container } from "@/src/components/common/Container";
import { Breadcrumb } from "@/src/components/common/Breadcrumb";
import { blogs } from "@/src/data/blogs";
import Image from "next/image";

export function generateStaticParams() {
  return blogs.map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug);
  if (!blog) return { title: "Blog Not Found" };
  return {
    title: `${blog.title} | GoIndiaCab Blog`,
    description: blog.excerpt,
    alternates: { canonical: `${siteConfig.url}/blog/${blog.slug}` },
    openGraph: { title: blog.title, description: blog.excerpt, images: [{ url: blog.image }] },
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug);
  if (!blog) notFound();

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-gray-light py-12 md:py-16 border-b border-border">
        <Container>
          <Breadcrumb items={[{ label: "Blogs", href: "/blogs" }, { label: blog.title }]} />
          <h1 className="text-4xl md:text-5xl font-bold text-dark mt-4">{blog.title}</h1>
          <p className="text-gray-text mt-2">{blog.author} · {blog.date} · {blog.category}</p>
        </Container>
      </div>
      <Container className="py-20 max-w-4xl">
        <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-lg mb-12">
          <Image src={blog.image} alt={blog.title} fill className="object-cover" priority />
        </div>
        <div className="prose prose-lg max-w-none text-gray-text">
          <p className="text-xl leading-relaxed">{blog.excerpt}</p>
          <p className="leading-relaxed mt-6">{blog.content}</p>
        </div>
      </Container>
    </div>
  );
}
```

Also create the folder: `src/app/blog/[slug]/`

---

### BUG 4 — `src/app/not-found/` empty folder conflict

DELETE the folder `src/app/not-found/` — it is empty and conflicts with `not-found.tsx`.
Run: `rmdir /s /q "src/app/not-found"`

---

### BUG 5 — `next.config.ts` — Missing `wikipedia.org` images domain (used in some pages)

Current `next.config.ts` has `upload.wikimedia.org` already. VERIFY it is present. If not, add:
```ts
{ protocol: 'https', hostname: 'upload.wikimedia.org' },
```

---

## COMPLETE MISSING PAGES CHECKLIST

After all fixes, these pages must exist and work:

| URL | File | Status |
|-----|------|--------|
| `/` | `src/app/page.tsx` | ✅ EXISTS |
| `/about-us` | `src/app/about-us/page.tsx` | ✅ EXISTS |
| `/contact-us` | `src/app/contact-us/page.tsx` | ✅ EXISTS |
| `/paynow` | `src/app/paynow/page.tsx` + `PayNowForm.tsx` | ⚠️ FIX BUG 1 |
| `/blogs` | `src/app/blogs/page.tsx` | ⚠️ FIX BUG 3 |
| `/blog/[slug]` | `src/app/blog/[slug]/page.tsx` | ❌ CREATE |
| `/privacy-policy` | `src/app/privacy-policy/page.tsx` | ✅ EXISTS |
| `/terms-conditions` | `src/app/terms-conditions/page.tsx` | ✅ EXISTS |
| `/taxi-package` | `src/app/taxi-package/page.tsx` | ✅ EXISTS |
| `/taxi-package/[slug]` | `src/app/taxi-package/[slug]/page.tsx` | ⚠️ FIX BUG 2 |
| `/taxi` | `src/app/taxi/page.tsx` | ✅ EXISTS |
| `/taxi/[slug]` | `src/app/taxi/[slug]/page.tsx` | ⚠️ FIX BUG 2 |
| `/popular-routes` | `src/app/popular-routes/page.tsx` | ✅ EXISTS |
| `/popular-routes/[slug]` | `src/app/popular-routes/[slug]/page.tsx` | ⚠️ FIX BUG 2 |
| `/tempo-traveller-on-rent-in-delhi` | exists | ✅ EXISTS |
| `/9-seater-tempo-traveller-in-delhi` | exists | ✅ EXISTS |
| `/12-seater-tempo-traveller-in-delhi` | exists | ✅ EXISTS |
| `/16-seater-tempo-traveller-in-delhi` | exists | ✅ EXISTS |
| `/20-seater-tempo-traveller-in-delhi` | exists | ✅ EXISTS |
| `/22-seater-tempo-traveller-in-delhi` | exists | ✅ EXISTS |
| `/26-seater-tempo-traveller-in-delhi` | exists | ✅ EXISTS |
| `/bus-rental-in-delhi` | exists | ✅ EXISTS |
| `/cab-service-in-[slug]` | exists | ⚠️ FIX BUG 2 |
| `/taxi-service-in-[slug]` | exists | ⚠️ FIX BUG 2 |
| `loading.tsx` | exists | ✅ EXISTS |
| `error.tsx` | MISSING | ❌ CREATE |
| `not-found.tsx` | exists | ✅ EXISTS |
| `sitemap.ts` | exists | ✅ EXISTS |
| `robots.ts` | exists | ✅ EXISTS |

---

## EXECUTION ORDER FOR CURSOR

Do these in exact order:

1. DELETE empty folder `src/app/not-found/`
2. CREATE `src/app/error.tsx`
3. CREATE `src/components/seo/JsonLd.tsx`
4. CREATE `src/components/forms/ContactForm.tsx`
5. CREATE `src/lib/utils.ts`
6. CREATE `src/lib/api.ts`
7. CREATE `src/hooks/useScrolled.ts`
8. CREATE `src/data/blogs.ts`
9. CREATE `src/app/blog/` folder and `src/app/blog/[slug]/page.tsx`
10. FIX `src/app/paynow/page.tsx` — remove "use client", split into PayNowForm.tsx
11. FIX all dynamic route pages — async params (Next.js 15 requirement)
12. UPDATE `src/app/blogs/page.tsx` — use blogs data, fix links
13. Run `npm run build` — fix ALL TypeScript and ESLint errors
14. Verify every URL in the checklist above works

---

## IMPORTANT RULES

- Do NOT change any existing working page
- Do NOT change URL slugs
- Do NOT add any new npm packages
- Use only: Next.js, TypeScript, Tailwind CSS, lucide-react, clsx
- All imports must use `@/src/...` path alias
- Tailwind classes only — no inline styles except where absolutely needed
- Every page must have proper `metadata` export with title, description, canonical
- After all fixes run `npm run build` and fix every error before declaring done
