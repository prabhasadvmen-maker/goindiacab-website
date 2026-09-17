import { Container } from "../common/Container";
import Link from "next/link";
import { navItems } from "@/src/config/navigation";

// Extract categories that have subtabs/children from navigation.ts
const navbarCategories = navItems
  .filter((item) => item.children && item.children.length > 0)
  .map((item) => ({
    title: item.label,
    links: item.children!.map((child) => ({
      label: child.label,
      href: child.href,
    })),
  }));

export function QuickLinksSection() {
  return (
    <section className="py-16 bg-white relative z-10 border-t border-gray-100">
      <Container>
        <div className="space-y-12 max-w-[1300px] mx-auto">
          {navbarCategories.map((category) => (
            <div key={category.title}>
              <h3 className="text-base sm:text-lg font-bold text-[#1a1b1d] mb-4 sm:mb-6 border-b border-gray-200 pb-2">
                {category.title}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-3.5 gap-x-6">
                {category.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block w-full text-[#00A5D9] hover:text-[#008db9] hover:underline text-[13px] sm:text-sm font-semibold transition-colors py-1 cursor-pointer"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
