"use client";

import { useState } from "react";
import { Container } from "../common/Container";
import { FAQ } from "@/src/types";
import { Plus, Minus } from "lucide-react";
import clsx from "clsx";

interface FAQSectionProps {
  faqs: FAQ[];
  title?: string;
  subtitle?: string;
}

export function FAQSection({ faqs, title = "Frequently Asked Questions (FAQ's): Best Cab Service In Delhi India", subtitle = "" }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="py-16 md:py-24 neo-bg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container>
        <div className="max-w-[1000px] mx-auto px-4 xl:px-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#2d3748] mb-12 text-center">
            {title}
          </h2>
          <div className="w-24 h-1 bg-[#3f51b5] opacity-50 mx-auto -mt-6 mb-12 rounded-full"></div>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              const isLast = index === faqs.length - 1;
              return (
                <div 
                  key={index} 
                  className="neo-flat rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <button
                    className="flex items-center w-full px-6 py-5 md:px-8 md:py-6 text-left focus:outline-none group"
                    onClick={() => toggleFAQ(index)}
                  >
                    <div className="flex-shrink-0 mr-5 w-10 h-10 rounded-full neo-pressed flex items-center justify-center text-[#3f51b5] transition-transform duration-300">
                      {isOpen ? (
                        <Minus className="w-5 h-5 stroke-[3]" />
                      ) : (
                        <Plus className="w-5 h-5 stroke-[3]" />
                      )}
                    </div>
                    <span className={clsx("font-bold text-sm md:text-base transition-colors", isOpen ? "text-[#3f51b5]" : "text-[#4a5568] group-hover:text-[#3f51b5]")}>
                      {faq.question}
                    </span>
                  </button>
                  <div 
                    className={clsx(
                      "overflow-hidden transition-all duration-300 ease-in-out",
                      isOpen ? "max-h-[500px] opacity-100 mb-6" : "max-h-0 opacity-0"
                    )}
                  >
                    <div className="px-6 md:px-8 mx-6 md:mx-8 py-6 neo-pressed rounded-xl text-[#718096] text-[15px] leading-relaxed">
                      <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
