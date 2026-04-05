import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { blogPosts, getBlogPost } from '@/lib/blog-data';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <div className="section">
      <div className="container max-w-3xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
          <Link href="/" className="hover:text-zinc-900 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-zinc-900 transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-zinc-900 font-medium line-clamp-1">{post.title}</span>
        </div>

        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-semibold text-brand-600 bg-brand-50 border border-brand-100 px-2.5 py-1 rounded-full">
              {post.category}
            </span>
            <span className="text-sm text-zinc-400">{post.date}</span>
            <span className="text-sm text-zinc-400">·</span>
            <span className="text-sm text-zinc-400">{post.readingTime}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 mb-4 leading-tight">
            {post.title}
          </h1>
          <p className="text-lg text-zinc-500 leading-relaxed">{post.description}</p>
        </header>

        {/* Article body */}
        <article
          className="prose prose-slate prose-sm sm:prose-base max-w-none
            prose-headings:font-semibold prose-headings:tracking-tight
            prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3
            prose-h3:text-base prose-h3:mt-6 prose-h3:mb-2
            prose-p:text-zinc-600 prose-p:leading-relaxed prose-p:mb-4
            prose-ul:text-zinc-600 prose-li:my-1
            prose-strong:text-zinc-900 prose-strong:font-semibold"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* CTA */}
        <div className="mt-12 rounded-xl bg-zinc-50 border border-zinc-200 p-6">
          <p className="font-semibold text-zinc-900 mb-1">Ready to run the numbers?</p>
          <p className="text-sm text-zinc-500 mb-4">
            Use our free calculators to check your specific deal.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/loan" className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-400 transition-colors">
              Loan Calculator
            </Link>
            <Link href="/lease" className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg border border-zinc-300 text-zinc-700 bg-white hover:bg-zinc-50 transition-colors">
              Lease Calculator
            </Link>
            <Link href="/affordability" className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg border border-zinc-300 text-zinc-700 bg-white hover:bg-zinc-50 transition-colors">
              Affordability
            </Link>
          </div>
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <div className="mt-12 pt-8 border-t border-zinc-200">
            <p className="text-sm font-semibold text-zinc-900 mb-5">More guides</p>
            <div className="grid sm:grid-cols-3 gap-4">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group block p-4 rounded-xl border border-zinc-200 hover:border-brand-200 hover:shadow-sm transition-all"
                >
                  <span className="text-xs font-semibold text-brand-600 block mb-1">{p.category}</span>
                  <span className="text-sm font-medium text-zinc-900 group-hover:text-brand-600 transition-colors leading-snug">
                    {p.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
