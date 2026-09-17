import Image from "next/image";
import { Container } from "@/src/components/common/Container";
import { BookingForm } from "@/src/components/booking/BookingForm";
import { Breadcrumb } from "@/src/components/common/Breadcrumb";

export default async function GenericServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const formattedSlug = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-gray-light py-12 md:py-16 border-b border-border overflow-hidden">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">

          <Breadcrumb items={[{ label: formattedSlug }]} />
          <h1 className="text-4xl md:text-5xl font-bold text-dark mt-4">
            {formattedSlug}
          </h1>
          <p className="text-gray-text mt-4 max-w-2xl text-lg">
            Book reliable and affordable services for {formattedSlug} with GoIndiaCab.
          </p>
        
            </div>
            <div className="w-full md:w-1/2 lg:w-2/5 flex justify-end">
              <Image src="/premium-cab.png" alt="Premium Cab Service" width={600} height={400} className="object-cover rounded-xl shadow-2xl hover:scale-105 transition-transform duration-500" priority />
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-20">
        <div className="max-w-4xl mx-auto">
          <BookingForm />
        </div>
      </Container>
    </div>
  );
}
