import { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/src/config/site";
import { Container } from "@/src/components/common/Container";
import { Breadcrumb } from "@/src/components/common/Breadcrumb";

export const revalidate = 300;

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  tags: string[];
  publishedAt: string | null;
  createdAt: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

async function fetchBlog(slug: string): Promise<BlogPost | null> {
  try {
    const res = await fetch(`${API_URL}/api/blogs/${slug}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data || null;
  } catch {
    return null;
  }
}

async function fetchAllSlugs(): Promise<string[]> {
  try {
    const res = await fetch(`${API_URL}/api/blogs?limit=100`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return (json.data || []).map((b: BlogPost) => b.slug);
  } catch {
    return [];
  }
}

export async function generateStaticParams() {
  const slugs = await fetchAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await fetchBlog(slug);
  if (!blog) return { title: "Blog Not Found" };
  return {
    title: `${blog.title} | GoIndiaCab Blog`,
    description: blog.excerpt || blog.title,
    alternates: { canonical: `${siteConfig.url}/blog/${blog.slug}` },
    openGraph: {
      title: blog.title,
      description: blog.excerpt || blog.title,
      images: blog.coverImage ? [{ url: blog.coverImage }] : [],
    },
  };
}

function fmtDate(iso: string | null | undefined) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric",
  });
}

// Decode double-encoded HTML entities (in case old content was saved encoded)
function decodeHtml(html: string) {
  return html
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await fetchBlog(slug);
  if (!blog) notFound();

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="bg-gray-light py-12 md:py-16 border-b border-border">
        <Container>
          <Breadcrumb
            items={[{ label: "Blogs", href: "/blogs" }, { label: blog.title }]}
          />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark mt-4 leading-tight">
            {blog.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-sm text-gray-text">
            <span>{blog.author || "GoIndiaCab Team"}</span>
            <span>·</span>
            <span>{fmtDate(blog.publishedAt || blog.createdAt)}</span>
            {blog.tags?.length > 0 && (
              <>
                <span>·</span>
                <div className="flex flex-wrap gap-1.5">
                  {blog.tags.map((tag) => (
                    <span key={tag} className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full capitalize">
                      {tag}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </Container>
      </div>

      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Cover Image */}
        {blog.coverImage && (
          <div className="w-full rounded-2xl overflow-hidden mb-8" style={{ aspectRatio: "16/7" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Excerpt */}
        {blog.excerpt && (
          <div className="border-l-4 border-primary bg-primary/5 px-4 py-3 rounded-r-xl mb-8">
            <p className="text-base text-gray-text italic leading-relaxed">{blog.excerpt}</p>
          </div>
        )}

        {/* Content */}
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: decodeHtml(blog.content || "") }}
        />
      </div>
    </div>
  );
}
