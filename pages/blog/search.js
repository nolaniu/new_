import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import PostCard from "../../components/PostCard";
import { getAllPosts } from "../../lib/mdx";

function normalizeTag(value) {
  if (!value) return "";
  return value.toString().replace(/^#/, "").trim();
}

export default function BlogSearchPage({ posts }) {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");

  // 统一解析路由：优先使用 q（通用关键字），其次兼容 tag（标签）
  const { keyword, isTagMode } = useMemo(() => {
    if (!router.isReady) return { keyword: "", isTagMode: false };
    const { q, tag } = router.query;

    if (typeof q === "string" && q.trim()) {
      return { keyword: q.trim(), isTagMode: false };
    }
    if (typeof tag === "string" && tag.trim()) {
      return { keyword: tag.trim(), isTagMode: true };
    }
    return { keyword: "", isTagMode: false };
  }, [router.isReady, router.query]);

  // 根据当前模式回填输入框
  useEffect(() => {
    if (!router.isReady) return;
    setSearchValue(isTagMode && keyword ? `#${keyword}` : keyword);
  }, [router.isReady, keyword, isTagMode]);

  // 提交：以 # 开头 → tag；否则 → q
  function handleSubmit(e) {
    e.preventDefault();
    const raw = (searchValue || "").trim();
    if (!raw) {
      router.push("/blog/search");
      return;
    }
    if (raw.startsWith("#")) {
      const nextTag = normalizeTag(raw);
      router.push(`/blog/search?tag=${encodeURIComponent(nextTag)}`, undefined, { shallow: false });
    } else {
      router.push(`/blog/search?q=${encodeURIComponent(raw)}`, undefined, { shallow: false });
    }
  }

  // 过滤规则
  const filteredPosts = useMemo(() => {
    const kw = (keyword || "").toLowerCase();
    if (!kw) return posts;

    if (isTagMode) {
      return posts.filter((post) =>
        (post.tags || []).some((t) => t?.toLowerCase() === kw)
      );
    }

    return posts.filter((post) => {
      const inTitle = post.title?.toLowerCase().includes(kw);
      const inTags = (post.tags || []).some((t) => t?.toLowerCase().includes(kw));
      return inTitle || inTags;
    });
  }, [posts, keyword, isTagMode]);

  return (
    <div className="space-y-10">
      {/* 面包屑导航：学习日志使用 replace */}
      <nav className="text-sm text-slate-600">
        <Link href="/blog" replace className="hover:underline">
          学习日志
        </Link>
        <span className="mx-2">/</span>
        <span>检索</span>
      </nav>

      <header className="space-y-3">
        <p className="text-sm font-semibold text-brand-600">检索</p>
        <h1 className="text-3xl font-display font-bold text-slate-900">按标签或标题查找文章</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-600">
          用 <code>#标签</code> 搜标签，比如 <code>#前端</code>；直接输入文字则按标题（并兼顾标签模糊匹配）搜索。
        </p>

        <form onSubmit={handleSubmit} className="mt-4 flex max-w-lg items-center gap-3">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="例如：#前端 或 React"
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
        {keyword ? (
          isTagMode ? (
            <h2 className="text-sm font-medium text-slate-500">
              当前标签：
              <span className="ml-2 inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-700">
                #{keyword}
              </span>
            </h2>
          ) : (
            <h2 className="text-sm font-medium text-slate-500">
              搜索关键词：
              <span className="ml-2 inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                {keyword}
              </span>
            </h2>
          )
        ) : (
          <h2 className="text-sm font-medium text-slate-500">未输入关键字，显示全部文章。</h2>
        )}

        {filteredPosts.length ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-10 text-center text-sm text-slate-500">
            暂无匹配结果，换一个关键字试试吧。
          </div>
        )}
      </section>
    </div>
  );
}

export function getStaticProps() {
  const posts = getAllPosts();
  return { props: { posts } };
}
