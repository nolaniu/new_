import Link from 'next/link';
import { useRouter } from 'next/router';

const NAV_LINKS = [
  { href: '/', label: '首页' },
  { href: '/blog', label: '学习日志' },
  { href: '/tools', label: '效率工具' },
];

function Layout({ children }) {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link href="/" className="flex items-center gap-2 text-xl font-display font-bold">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-100 text-brand-700 shadow-soft">
              ??
            </span>
            <span>学习工作室</span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 sm:flex">
            {NAV_LINKS.map((item) => {
              const active = router.asPath === item.href || router.asPath.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative transition-colors ${
                    active ? 'text-brand-700' : 'hover:text-brand-600'
                  }`}
                >
                  {active && (
                    <span className="absolute -bottom-1 left-0 h-[2px] w-full rounded bg-brand-500" aria-hidden />
                  )}
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <Link
            href="/tools"
            className="hidden rounded-full border border-transparent bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-700 sm:inline-flex"
          >
            打开工具箱
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <div className="mx-auto w-full max-w-6xl px-6 py-10 sm:py-12">{children}</div>
      </main>
      <footer className="border-t border-slate-200 bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>? {new Date().getFullYear()} 学习工作室. 灵感来源于 Next.js、Tailwind、MDX 与开源效率工具。</span>
          <div className="flex items-center gap-4">
            <a href="https://github.com/timlrx/tailwind-nextjs-starter-blog" target="_blank" rel="noopener noreferrer" className="hover:text-brand-600">
              博客模板
            </a>
            <a href="https://github.com/astroud/pomodoro-react-app" target="_blank" rel="noopener noreferrer" className="hover:text-brand-600">
              番茄钟
            </a>
            <a href="https://github.com/taniarascia/todo" target="_blank" rel="noopener noreferrer" className="hover:text-brand-600">
              待办清单
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;