import { useState } from "react";
import { useRouter } from "next/router";
import PostCard from "../../components/PostCard";
import { getAllPosts } from "../../lib/mdx";

export default function BlogIndex({ posts }) {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const raw = (searchValue || "").trim();
    if (!raw) {
      router.push("/blog/search");
      return;
    }

    // 以 # 开头才当作标签，否则走标题/关键字搜索
    if (raw[0] === "#") {
      const nextTag = raw.slice(1).trim(); // 去掉 # 前缀
      router.push(`/blog/search?tag=${encodeURIComponent(nextTag)}`, undefined, { shallow: false });
    } else {
      router.push(`/blog/search?q=${encodeURIComponent(raw)}`, undefined, { shallow: false });
    }
  }

  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <p className="text-sm font-semibold text-brand-600">学习日志</p>
        <h1 className="text-3xl font-display font-bold text-slate-900">记录每一次学习与实验</h1>
        <p className="max-w-3xl text-sm leading-relaxed text-slate-600">
          博客内容存放在
        </p>

        {/* 🔍 搜索框 */}
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

      {/* 博客文章列表 */}
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}

export function getStaticProps() {
  return { props: { posts: getAllPosts() } };
}
