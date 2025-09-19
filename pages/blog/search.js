import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

import PostCard from "../../components/PostCard";
import { getAllPosts } from "../../lib/mdx";

function normalizeTag(value) {
  if (!value) return "";
  return value.toString().replace(/^#/, "").trim();
}

export default function BlogSearchPage({ posts }) {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");

  const activeTag = useMemo(() => {
    if (!router.isReady) return "";
    const { tag } = router.query;
    if (typeof tag === "string") {
      return decodeURIComponent(tag);
    }
    return "";
  }, [router.isReady, router.query]);

  useEffect(() => {
    if (router.isReady) {
      setSearchValue(activeTag ? `#${activeTag}` : "");
    }
  }, [router.isReady, activeTag]);

  const filteredPosts = useMemo(() => {
    if (!activeTag) return posts;
    return posts.filter((post) => post.tags?.includes(activeTag));
  }, [activeTag, posts]);

  function handleSubmit(event) {
    event.preventDefault();
    if (!router.isReady) return;
    const nextTag = normalizeTag(searchValue);
    const href = nextTag ? `/blog/search?tag=${encodeURIComponent(nextTag)}` : "/blog/search";
    router.push(href, undefined, { shallow: false });
  }

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <p className="text-sm font-semibold text-brand-600">标签检索</p>
        <h1 className="text-3xl font-display font-bold text-slate-900">按照标签快速定位相关文章</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-600">
          搜索框默认填入选中的标签（带 # 前缀）。你也可以直接修改标签内容并回车，快速切换到新的检索结果。
        </p>
        <form onSubmit={handleSubmit} className="mt-4 flex max-w-lg items-center gap-3">
          <input
            type="text"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder="例如：#前端"
            className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
          />
          <button
            type="submit"
            className="rounded-2xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-700"
          >
            搜索
          </button>
        </form>
      </header>

      <section className="space-y-6">
        {activeTag ? (
          <h2 className="text-sm font-medium text-slate-500">
            当前标签：
            <span className="ml-2 inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-700">
              #{activeTag}
            </span>
          </h2>
        ) : (
          <h2 className="text-sm font-medium text-slate-500">未选择标签，显示全部文章。</h2>
        )}

        {filteredPosts.length ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-10 text-center text-sm text-slate-500">
            暂无匹配该标签的文章，换一个关键字试试吧。
          </div>
        )}
      </section>
    </div>
  );
}

BlogSearchPage.getBreadcrumbItems = () => [
  { label: "学习日志", href: "/blog" },
  { label: "标签检索" },
];

export function getStaticProps() {
  const posts = getAllPosts();
  return {
    props: {
      posts,
    },
  };
}
