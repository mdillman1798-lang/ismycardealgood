import Link from 'next/link';
import type { BlogPost } from '@/types';

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block bg-white rounded-xl border border-zinc-200 p-6 hover:shadow-md hover:border-brand-200 transition-all"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-semibold text-brand-600 bg-brand-50 border border-brand-100 px-2 py-0.5 rounded-full">
          {post.category}
        </span>
        <span className="text-xs text-zinc-400">{post.readingTime}</span>
      </div>
      <h2 className="text-base font-semibold text-zinc-900 mb-2 group-hover:text-brand-600 transition-colors leading-snug">
        {post.title}
      </h2>
      <p className="text-sm text-zinc-500 leading-relaxed line-clamp-2 mb-4">{post.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-zinc-400">{post.date}</span>
        <span className="text-xs font-semibold text-brand-600 flex items-center gap-1 group-hover:gap-2 transition-all">
          Read article
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
