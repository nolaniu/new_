import PostCard from '../../components/PostCard';
import { getAllPosts } from '../../lib/mdx';

export default function BlogIndex({ posts }) {
  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <p className="text-sm font-semibold text-brand-600">学习日志</p>
        <h1 className="text-3xl font-display font-bold text-slate-900">记录每一次学习与实验</h1>
        <p className="max-w-3xl text-sm leading-relaxed text-slate-600">
          博客内容存放在 <code className="rounded bg-slate-100 px-2 py-1">/data/blog/*.mdx</code> 中，支持 MDX 语法，便于嵌入代码片段、提示卡片或交互组件。
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}

export function getStaticProps() {
  return {
    props: {
      posts: getAllPosts(),
    },
  };
}