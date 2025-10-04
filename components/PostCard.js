import Link from 'next/link';

const formatDate = (date) => {
  if (!date) return '???';
  try {
    const parsed = new Date(date);
    if (Number.isNaN(parsed.getTime())) return date;
    const year = parsed.getFullYear();
    const month = String(parsed.getMonth() + 1).padStart(2, '0');
    const day = String(parsed.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  } catch {
    return date;
  }
};

export default function PostCard({ post, isViewportCard = false }) {
  const containerClasses = [
    'group block h-full rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl',
    isViewportCard ? 'min-h-screen w-full md:col-span-3' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Link href={`/blog/${post.slug}`} className={containerClasses}>
      <article className="flex h-full flex-col justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">{formatDate(post.date)}</p>
          <h3 className="mt-3 text-xl font-display font-semibold text-slate-900 transition group-hover:text-brand-700">
            {post.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">{post.summary}</p>
        </div>
      </article>
    </Link>
  );
}
