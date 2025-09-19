import Link from 'next/link';
import PostCard from '../components/PostCard';
import TodoWidget from '../components/tools/TodoWidget';
import WhiteNoisePlayer from '../components/tools/WhiteNoisePlayer';
import { getAllPosts } from '../lib/mdx';

export default function Home({ posts }) {
  return (
    <div className="space-y-16">
      <section className="rounded-3xl bg-gradient-to-br from-brand-50 via-white to-white p-8 shadow-soft sm:p-12">
        <div className="max-w-3xl space-y-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">一站式学习工作室</p>
          <h1 className="text-4xl font-display font-bold text-slate-900 sm:text-5xl">
            记录、练习、冥想、专注 —— 用一个站点承载你的成长旅程。
          </h1>
          <p className="text-base leading-relaxed text-slate-600">
            结合 Next.js + Tailwind + MDX 搭建的博客结构，配套番茄钟、待办、白噪声与冥想工具。灵感来自开源社区的优秀模板与效率工具，适合个人知识管理与深度专注训练。
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/blog"
              className="inline-flex items-center rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-700"
            >
              开始阅读
            </Link>
            <Link
              href="/tools"
              className="inline-flex items-center rounded-full border border-brand-200 px-5 py-2.5 text-sm font-semibold text-brand-700 transition hover:border-brand-300 hover:bg-brand-50"
            >
              打开效率工具箱
            </Link>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-display font-semibold text-slate-900">最新学习笔记</h2>
            <p className="text-sm text-slate-500">博客内容由 MDX 驱动，聚焦学习记录与实践心得。</p>
          </div>
          <Link href="/blog" className="text-sm font-semibold text-brand-600 hover:text-brand-700">
            查看全部 →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-display font-semibold text-slate-900">效率工具预览</h2>
            <p className="text-sm text-slate-500">白噪音与待办清单可直接在首页快速使用，亦可跳转至完整页面。</p>
          </div>
          <Link href="/tools" className="text-sm font-semibold text-brand-600 hover:text-brand-700">
            前往工具页 →
          </Link>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Ambient Mixer</p>
                <h3 className="mt-2 text-lg font-display font-semibold text-slate-900">白噪音陪伴</h3>
              </div>
              <Link
                href="/tools/white-noise"
                className="inline-flex items-center rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-500 transition hover:border-brand-200 hover:text-brand-700"
              >
                打开完整设置
              </Link>
            </div>
            <WhiteNoisePlayer tone="light" showStats={false} showControls={false} className="border-0 p-0 shadow-none" />
          </div>

          <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Quick Planner</p>
                <h3 className="mt-2 text-lg font-display font-semibold text-slate-900">待办速记</h3>
              </div>
              <Link
                href="/tools/todo"
                className="inline-flex items-center rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-500 transition hover:border-brand-200 hover:text-brand-700"
              >
                打开完整设置
              </Link>
            </div>
            <TodoWidget tone="light" className="border-0 p-0 shadow-none" />
          </div>
        </div>
      </section>
    </div>
  );
}


export async function getStaticProps() {
  const posts = getAllPosts().slice(0, 3);
  return {
    props: {
      posts,
    },
  };
}
