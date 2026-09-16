import { Metadata } from "next";
import { siteConfig } from "@/src/config/site";
import { Container } from "@/src/components/common/Container";
import { Breadcrumb } from "@/src/components/common/Breadcrumb";
import { Card } from "@/src/components/common/Card";
import { blogs } from "@/src/data/blogs";
export const metadata: Metadata = {
  title: "Blogs & Travel Guides | GoIndiaCab",
  description: "Read the latest travel guides, tips, and news from Go India Cab to make your next trip across India memorable.",
  alternates: { canonical: `${siteConfig.url}/blogs` }
};

export default function BlogsPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-gray-light py-12 md:py-16 border-b border-border">
        <Container>
          <Breadcrumb items={[{ label: "Blogs" }]} />
          <h1 className="text-4xl md:text-5xl font-bold text-dark mt-4">Travel <span className="text-primary">Blogs & Guides</span></h1>
          <p className="text-gray-text mt-4 max-w-2xl text-lg">Discover new destinations, get travel tips, and stay updated with the latest news from Go India Cab.</p>
        </Container>
      </div>

      <Container className="py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogs.map((blog) => (
            <Card 
              key={blog.id}
              title={blog.title}
              description={blog.excerpt}
              image={blog.image}
              badge={blog.date}
              link={`/blog/${blog.slug}`}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}
