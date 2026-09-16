import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import { FloatingContact } from "@/src/components/common/FloatingContact";
import { BackToTop } from "@/src/components/common/BackToTop";
import { Chatbot } from "@/src/components/common/Chatbot";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Book Cab & Taxi Services Across India | GoIndiaCab",
  description: "Book reliable one-way, round-trip, local and airport taxi services across India with GoIndiaCab. Best cab service in Delhi.",
  icons: {
    icon: "/GoIndiaCab Favicon icon.png",
  },
  openGraph: {
    title: "Book Cab & Taxi Services Across India | GoIndiaCab",
    description: "Book reliable one-way, round-trip, local and airport taxi services across India.",
    url: "https://www.goindiacab.com",
    siteName: "GoIndiaCab",
    images: [{ url: "https://www.goindiacab.com/wp-content/uploads/2025/07/Go-India-Logo.webp", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Book Cab & Taxi Services Across India | GoIndiaCab",
    description: "Book reliable one-way, round-trip, local and airport taxi services across India.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <FloatingContact />
        <BackToTop />
        <Chatbot />
      </body>
    </html>
  );
}
