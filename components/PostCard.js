import Link from 'next/link';

const formatter = new Intl.DateTimeFormat('zh-CN', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

const formatDate = (date) => {
  if (!date) return '未注明';
  try {
    return formatter.format(new Date(date));
  } catch {
    return date;
  }
};

export default function PostCard({ post }) {
  return (
    <article className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div>
        <p className="text-xs uppercase tracking-wide text-slate-500">{formatDate(post.date)}</p>
        <h3 className="mt-3 text-xl font-display font-semibold text-slate-900 group-hover:text-brand-700">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">{post.summary}</p>
      </div>
      {post.tags?.length ? (
        <div className="mt-6 flex flex-wrap gap-2 text-xs">
          {post.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-brand-50 px-3 py-1 font-medium text-brand-700">
              #{tag}
            </span>
          ))}
        </div>
      ) : null}
    </article>
  );
}