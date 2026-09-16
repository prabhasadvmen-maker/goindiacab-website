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
        <div className="relative h-[250px] md:h-[400px] w-full rounded-2xl overflow-hidden shadow-lg mb-12">
          <Image src={blog.image} alt={blog.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" priority />
        </div>
        <div className="prose prose-lg max-w-none text-gray-text">
          <p className="text-xl leading-relaxed">{blog.excerpt}</p>
          <p className="leading-relaxed mt-6">{blog.content}</p>
        </div>
      </Container>
    </div>
  );
}
