import type { Metadata } from 'next';
import { blogPosts } from '@/lib/blog-data';
import { BlogCard } from '@/components/blog/BlogCard';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Car Finance & Leasing Guides',
  description:
    'Plain-English guides on car loans, leases, dealer fees, and budgeting. Know more before you buy.',
};

export default function BlogPage() {
  return (
    <div className="section">
      <div className="container">
        <div className="mb-4">
          <div className="flex items-center gap-2 text-sm text-zinc-500 mb-4">
            <Link href="/" className="hover:text-zinc-900 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-zinc-900 font-medium">Blog</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 mb-3">Guides & Resources</h1>
          <p className="text-zinc-500 text-lg max-w-xl">
            Straightforward explanations of car finance, leasing, and negotiation — so you know exactly what you're agreeing to.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          {blogPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
