import { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/src/config/site";
import { Container } from "@/src/components/common/Container";
import { Breadcrumb } from "@/src/components/common/Breadcrumb";

export const metadata: Metadata = {
  title: "Blogs & Travel Guides | GoIndiaCab",
  description: "Read the latest travel guides, tips, and news from Go India Cab to make your next trip across India memorable.",
  alternates: { canonical: `${siteConfig.url}/blogs` },
};

// No cache — presigned R2 URLs must be fresh on every request
export const dynamic = "force-dynamic";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  author: string;
  tags: string[];
  publishedAt: string | null;
  createdAt: string;
}

async function fetchBlogs(): Promise<BlogPost[]> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const res = await fetch(`${apiUrl}/api/blogs?limit=24`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch {
    return [];
  }
}

function fmtDate(iso: string | null | undefined) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric",
  });
}

export default async function BlogsPage() {
  const blogs = await fetchBlogs();

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="bg-gray-light py-12 md:py-16 border-b border-border">
        <Container>
          <Breadcrumb items={[{ label: "Blogs" }]} />
          <h1 className="text-4xl md:text-5xl font-bold text-dark mt-4">
            Travel <span className="text-primary">Blogs & Guides</span>
          </h1>
          <p className="text-gray-text mt-4 max-w-2xl text-lg">
            Discover new destinations, get travel tips, and stay updated with the latest news from Go India Cab.
          </p>
        </Container>
      </div>

      <Container className="py-16">
        {blogs.length === 0 ? (
          <div className="text-center py-20 text-gray-text">
            <p className="text-lg">No blog posts published yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <Link
                key={blog._id}
                href={`/blog/${blog.slug}`}
                className="group bg-white rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                {/* Cover Image */}
                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                  {blog.coverImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={blog.coverImage}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <span className="text-gray-400 text-sm">No image</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1 gap-2">
                  {/* Tags */}
                  {blog.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {blog.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full capitalize">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <h2 className="font-bold text-dark text-base leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {blog.title}
                  </h2>

                  {blog.excerpt && (
                    <p className="text-sm text-gray-text line-clamp-2 flex-1">{blog.excerpt}</p>
                  )}

                  <div className="flex items-center justify-between text-xs text-gray-400 mt-auto pt-3 border-t border-border">
                    <span>{blog.author || "GoIndiaCab Team"}</span>
                    <span>{fmtDate(blog.publishedAt || blog.createdAt)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
