import Link from 'next/link';
import PostCard from '../components/PostCard';
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
            <p className="text-sm text-slate-500">番茄钟、待办清单、白噪声、自习室与冥想中心一应俱全。</p>
          </div>
          <Link href="/tools" className="text-sm font-semibold text-brand-600 hover:text-brand-700">
            前往工具页 →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {TOOLS.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl"
            >
              <div className="space-y-3">
                <span className="text-2xl">{tool.icon}</span>
                <h3 className="text-xl font-display font-semibold text-slate-900 group-hover:text-brand-700">
                  {tool.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">{tool.description}</p>
              </div>
              <span className="mt-6 text-sm font-semibold text-brand-600 group-hover:text-brand-700">了解更多 →</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

const TOOLS = [
  {
    href: '/tools/pomodoro',
    icon: '??',
    title: '番茄钟 Pomodoro',
    description: '25/5 专注循环、长休提醒与进度可视化，保持专注节奏。',
  },
  {
    href: '/tools/todo',
    icon: '?',
    title: '待办清单',
    description: '轻量级待办管理，支持优先级、状态切换与本地存储同步。',
  },
  {
    href: '/tools/white-noise',
    icon: '??',
    title: '白噪声播放器',
    description: '多种环境音一键播放，支持循环与混音，营造沉浸氛围。',
  },
  {
    href: '/tools/meditation',
    icon: '??',
    title: '冥想空间',
    description: '定时冥想、呼吸引导与环境音搭配，帮助建立安静的休息仪式。',
  },
];

export async function getStaticProps() {
  const posts = getAllPosts().slice(0, 3);
  return {
    props: {
      posts,
    },
  };
}