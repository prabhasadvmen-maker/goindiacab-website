const fs = require('fs');
const path = require('path');

const folders = [
  'car-rental-in-[slug]',
  '[slug]-taxi-service',
  'airport-taxi-in-[slug]',
  'tempo-traveller-in-[slug]',
  'minibus-for-rent-in-[slug]',
  'minibus-for-hire-in-[slug]',
  'mini-bus-in-[slug]'
];

const template = `import { Container } from "@/src/components/common/Container";
import { BookingForm } from "@/src/components/booking/BookingForm";
import { Breadcrumb } from "@/src/components/common/Breadcrumb";

export default async function GenericServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const formattedSlug = slug.replace(/-/g, ' ').replace(/\\b\\w/g, l => l.toUpperCase());
  
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-gray-light py-12 md:py-16 border-b border-border">
        <Container>
          <Breadcrumb items={[{ label: formattedSlug }]} />
          <h1 className="text-4xl md:text-5xl font-bold text-dark mt-4">
            {formattedSlug}
          </h1>
          <p className="text-gray-text mt-4 max-w-2xl text-lg">
            Book reliable and affordable services for {formattedSlug} with GoIndiaCab.
          </p>
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
`;

folders.forEach(folder => {
  const dir = path.join(__dirname, 'src', 'app', folder);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(path.join(dir, 'page.tsx'), template);
});
console.log('Pages created!');
