import Link from "next/link";
import { useRouter } from "next/router";

const formatter = new Intl.DateTimeFormat("zh-CN", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

const formatDate = (date) => {
  if (!date) return "未注明";
  try {
    return formatter.format(new Date(date));
  } catch {
    return date;
  }
};

export default function PostCard({ post, isViewportCard = false }) {
  const router = useRouter();

  const containerClasses = [
    "group block h-full rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl",
    isViewportCard ? "min-h-screen w-full md:col-span-3" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const handleTagClick = (event, tag) => {
    event.preventDefault();
    event.stopPropagation();
    router.push(`/blog/search?tag=${encodeURIComponent(tag)}`);
  };

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
        {post.tags?.length ? (
          <div className="mt-6 flex flex-wrap gap-2 text-xs">
            {post.tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={(event) => handleTagClick(event, tag)}
                className="rounded-full bg-brand-50 px-3 py-1 font-medium text-brand-700 transition hover:bg-brand-100 hover:text-brand-800"
              >
                #{tag}
              </button>
            ))}
          </div>
        ) : null}
      </article>
    </Link>
  );
}
