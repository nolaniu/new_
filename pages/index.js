import Link from 'next/link';
import PostCard from '../components/PostCard';
import { getAllPosts } from '../lib/mdx';

const FOCUS_SPACES = [
  {
    tag: 'Deep Focus',
    title: 'Quiet Study Room',
    description: 'A minimalist dark interface featuring a Pomodoro timer, white noise, and a to-do list to minimize distractions.',
    highlights: [
      'An immersive dark theme with one-click toggle for full screen or exit.',
      'Pomodoro timer, to-do list, and quick notes all in one, helping you refocus anytime.',
      'Perfect for long hours of writing, coding, exam prep, and other deep work sessions.',
    ],
    href: '/tools/dark-room',
    cta: 'Join Study Room',
  },
  {
    tag: 'Calm Routine',
    title: 'Meditation Space',
    description: 'A meditation exercise based on the 4-4-6 breathing pattern, paired with natural soundscapes to quickly restore emotional balance.',
    highlights: [
      'Dynamic breathing guide with options to pause, mute, or change the rhythm.',
      'One-minute quick meditation for any spare moment',
      'Suitable for morning and evening awakening, afternoon recovery, or relaxation before bed.',
    ],
    href: '/tools/meditation',
    cta: 'Start Meditation',
  },
];

export default function Home({ posts }) {
  return (
    <div className="space-y-16">
      <section className="rounded-3xl bg-gradient-to-br from-brand-50 via-white to-white p-8 shadow-soft sm:p-12">
        <div className="max-w-3xl space-y-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">One-stop learning website</p>
          <h1 className="text-4xl font-display font-bold text-slate-900 sm:text-5xl">
            Journaling, practice, meditation, and focus — all in one platform for your growth journey.
          </h1>
          <p className="text-base leading-relaxed text-slate-600">
            Bring study notes, task lists, and focus tools together on one desk—so you can go from reviewing knowledge to resetting your mood, all in one place.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="#focus-spaces"
              className="inline-flex items-center rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-700"
            >
              Focus Spaces
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center rounded-full border border-brand-200 px-5 py-2.5 text-sm font-semibold text-brand-700 transition hover:border-brand-300 hover:bg-brand-50"
            >
              Blog
            </Link>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-display font-semibold text-slate-900">Latest Blog</h2>
            <p className="text-sm text-slate-500">Get the key takeaways at a glance.</p>
          </div>
          <Link href="/blog" className="text-sm font-semibold text-brand-600 hover:text-brand-700">
            View All →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <section id="focus-spaces" className="scroll-mt-24 space-y-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <h2 className="text-2xl font-display font-semibold text-slate-900">Immersive Experience</h2>
            <p className="text-sm text-slate-500">When the Pomodoro ends or your mind feels drained, seamlessly switch to the Study Room or Meditation Space to keep your flow.</p>
          </div>
          {/* <Link href="/tools" className="text-sm font-semibold text-brand-600 hover:text-brand-700">
            查看全部工具 →
          </Link> */}
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
