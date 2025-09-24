import Link from 'next/link';
import PostCard from '../components/PostCard';
import { getAllPosts } from '../lib/mdx';

const FOCUS_SPACES = [
  {
    tag: 'Deep Focus',
    title: '小黑屋自习室',
    description: '极简暗色界面搭配番茄钟、白噪声和笔记区，让干扰降到最低。',
    highlights: [
      '沉浸式暗色背景，一键切换全屏或退出',
      '番茄钟、待办与随手记合一，随时收束注意力',
      '适合长时间写作、编程、备考等深度学习场景',
    ],
    href: '/tools/dark-room',
    cta: '进入自习室',
  },
  {
    tag: 'Calm Routine',
    title: '冥想空间',
    description: '基于 4-4-6 呼吸节奏的冥想练习，搭配自然声场迅速复位情绪。',
    highlights: [
      '动态呼吸引导，可暂停、静音或切换节奏',
      '自动记录每一次冥想的时长与轮次',
      '适合晨晚唤醒、午后恢复或睡前放松',
    ],
    href: '/tools/meditation',
    cta: '开始冥想',
  },
];

export default function Home({ posts }) {
  return (
    <div className="space-y-16">
      <section className="rounded-3xl bg-gradient-to-br from-brand-50 via-white to-white p-8 shadow-soft sm:p-12">
        <div className="max-w-3xl space-y-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">一站式学习工作室</p>
          <h1 className="text-4xl font-display font-bold text-slate-900 sm:text-5xl">
            记录、练习、冥想、专注 —— 一个站点承载你的成长旅程。
          </h1>
          <p className="text-base leading-relaxed text-slate-600">
            将学习笔记、计划清单与沉浸工具放在同一张桌面，从知识复盘到情绪复位都能在这里完成。
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/blog"
              className="inline-flex items-center rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-700"
            >
              开始阅读
            </Link>
            <Link
              href="#focus-spaces"
              className="inline-flex items-center rounded-full border border-brand-200 px-5 py-2.5 text-sm font-semibold text-brand-700 transition hover:border-brand-300 hover:bg-brand-50"
            >
              体验沉浸空间
            </Link>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-display font-semibold text-slate-900">最新学习笔记</h2>
            <p className="text-sm text-slate-500">从近期的学习和实践中挑选三篇，快速了解重点思路。</p>
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

      <section id="focus-spaces" className="space-y-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <h2 className="text-2xl font-display font-semibold text-slate-900">沉浸空间体验</h2>
            <p className="text-sm text-slate-500">当番茄钟结束或脑力告急时，直接从这里切换到自习室或冥想空间，保持连贯的节奏。</p>
          </div>
          <Link href="/tools" className="text-sm font-semibold text-brand-600 hover:text-brand-700">
            查看全部工具 →
          </Link>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {FOCUS_SPACES.map((space) => (
            <div
              key={space.title}
              className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl"
            >
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{space.tag}</p>
                <h3 className="text-xl font-display font-semibold text-slate-900">{space.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{space.description}</p>
              </div>
              <ul className="space-y-2 text-sm text-slate-500">
                {space.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 inline-flex h-2 w-2 flex-shrink-0 rounded-full bg-brand-300" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div>
                <Link
                  href={space.href}
                  className="inline-flex items-center rounded-full border border-brand-200 px-4 py-2 text-xs font-semibold text-brand-700 transition hover:border-brand-300 hover:bg-brand-50"
                >
                  {space.cta}
                </Link>
              </div>
            </div>
          ))}
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
