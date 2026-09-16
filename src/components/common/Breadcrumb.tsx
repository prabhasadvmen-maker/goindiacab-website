"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, Home, ArrowLeft } from "lucide-react";
import { siteConfig } from "@/src/config/site";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  showBackButton?: boolean;
}

export function Breadcrumb({ items, showBackButton = true }: BreadcrumbProps) {
  const router = useRouter();

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.label,
        item: item.href ? `${siteConfig.url}${item.href}` : undefined,
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex-1 min-w-[200px]">
          <ol className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600 overflow-x-auto whitespace-nowrap pb-1 scrollbar-hide">
            <li>
              <Link href="/" className="flex items-center hover:text-[#00A5D9] transition font-semibold">
                <Home className="w-4 h-4 text-gray-500 hover:text-[#00A5D9]" />
                <span className="sr-only">Home</span>
              </Link>
            </li>
            {items.map((item, index) => {
              const isLast = index === items.length - 1;
              return (
                <li key={item.label} className="flex items-center">
                  <ChevronRight className="w-4 h-4 mx-1 flex-shrink-0 text-gray-400" />
                  {isLast || !item.href ? (
                    <span className="text-gray-900 font-bold truncate" aria-current="page">
                      {item.label}
                    </span>
                  ) : (
                    <Link href={item.href} className="hover:text-[#00A5D9] transition truncate font-medium">
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        {/* Back Button */}
        {showBackButton && (
          <button
            type="button"
            onClick={handleBack}
            style={{ cursor: "pointer" }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-300 hover:border-[#00A5D9] bg-white text-gray-700 hover:text-[#00A5D9] font-bold text-xs sm:text-sm shadow-2xs transition-all cursor-pointer active:scale-95 flex-shrink-0"
          >
            <ArrowLeft className="w-4 h-4 text-[#00A5D9]" />
            <span>Back</span>
          </button>
        )}
      </div>
    </>
  );
}
