// components/Layout.js
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect, useMemo } from 'react';

// 官方品牌图标
import { SiX, SiFacebook, SiLinkedin } from "react-icons/si";
import { FiMail } from "react-icons/fi";

// 页首导航：只保留 首页 / 学习日志
const NAV_LINKS_HEADER = [
  { href: '/', label: '首页' },
  { href: '/blog', label: '学习日志' },
];

// 页尾右侧链接：学习日志 + 三大合规页
const NAV_LINKS_FOOTER = [
  { href: '/about', label: '关于我们' },
  { href: '/privacy', label: '隐私政策' },
  { href: '/disclaimer', label: '免责声明' },
];

// 弹出小窗口函数（用于分享）
function openSharePopup(shareUrl, name = 'share', w = 600, h = 520) {
  if (typeof window === 'undefined') return;
  const dualScreenLeft = window.screenLeft ?? window.screenX;
  const dualScreenTop = window.screenTop ?? window.screenY;
  const width = window.innerWidth || document.documentElement.clientWidth || screen.width;
  const height = window.innerHeight || document.documentElement.clientHeight || screen.height;
  const left = width / 2 - w / 2 + dualScreenLeft;
  const top = height / 2 - h / 2 + dualScreenTop;

  window.open(
    shareUrl,
    name,
    `popup=1,width=${w},height=${h},top=${top},left=${left},` +
    `status=no,toolbar=no,location=no,menubar=no,scrollbars=yes,resizable=yes`
  );
}

// 构造分享链接
function buildShareLinks(url, title) {
  const enc = encodeURIComponent;
  return {
    x: `https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${enc(url)}&title=${enc(title)}`,
    email: `mailto:?subject=${enc(title)}&body=${enc(url)}`
  };
}

// Tooltip 包装器（悬停显示平台名）
function TooltipButton({ label, onClick, children }) {
  return (
    <div className="relative group">
      <button
        type="button"
        onClick={onClick}
        className="text-xl text-slate-600 hover:text-brand-600 transition"
        aria-label={label}
      >
        {children}
      </button>
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-800 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition pointer-events-none">
        {label}
      </div>
    </div>
  );
}

function Layout({ children, breadcrumbItems = [], shareTitle = '学习工作室' }) {
  const router = useRouter();
  const hasBreadcrumbs = breadcrumbItems.length > 0;

  const [shareUrl, setShareUrl] = useState('');
  useEffect(() => {
    if (typeof window !== 'undefined') setShareUrl(window.location.href);
  }, [router.asPath]);

  const links = useMemo(() => buildShareLinks(shareUrl, shareTitle), [shareUrl, shareTitle]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header：只显示 首页 / 学习日志 */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 py-5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-display font-bold">
            <img src="/images/icon.png" alt="Logo" className="h-6 w-6" />
            <span className="text-lg font-bold text-brand-600">学习工作室</span>
          </Link>
          <nav className="hidden sm:flex gap-8 text-sm font-medium text-slate-600">
            {NAV_LINKS_HEADER.map((item) => {
              const active =
                router.asPath === item.href || router.asPath.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative transition-colors ${active ? 'text-brand-700' : 'hover:text-brand-600'}`}
                >
                  {item.label}
                  {active && <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-brand-500 rounded" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {hasBreadcrumbs ? (
          <div className="mx-auto max-w-6xl px-6 pb-4">
            <nav aria-label="Breadcrumb" className="flex items-center text-xs text-slate-500 sm:text-sm">
              <ol className="flex flex-wrap items-center gap-1 sm:gap-1.5">
                {breadcrumbItems.map((item, index) => (
                  <li key={`${item.label}-${index}`} className="flex items-center">
                    {index > 0 && <span className="mx-1 text-slate-300">/</span>}
                    {item.href ? (
                      <Link href={item.href} className="transition hover:text-brand-600">
                        {item.label}
                      </Link>
                    ) : (
                      <span className="font-semibold text-slate-700">{item.label}</span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        ) : null}
      </header>

      {/* Main */}
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-6 py-10">{children}</div>
      </main>

      {/* Footer：中间分享 + 右侧 学习日志 / 合规页 */}
      <footer className="bg-white border-t text-slate-700">
        <div className="mx-auto max-w-6xl px-6 py-6 flex flex-col items-center gap-4 md:flex-row md:justify-between">
          {/* 左侧版权 */}
          <div className="text-sm text-slate-500">
            © {new Date().getFullYear()} 学习工作室. All rights reserved.
          </div>

          {/* 中间分享图标（小窗打开） */}
          <div className="flex gap-4">
            <TooltipButton label="分享到 X" onClick={() => openSharePopup(links.x, 'x-share')}>
              <SiX />
            </TooltipButton>
            <TooltipButton label="分享到 Facebook" onClick={() => openSharePopup(links.facebook, 'fb-share')}>
              <SiFacebook />
            </TooltipButton>
            <TooltipButton label="分享到 LinkedIn" onClick={() => openSharePopup(links.linkedin, 'li-share')}>
              <SiLinkedin />
            </TooltipButton>
            <TooltipButton label="邮件分享" onClick={() => (window.location.href = links.email)}>
              <FiMail />
            </TooltipButton>
          </div>

          {/* 右侧：学习日志 + 合规页 */}
          <nav className="flex gap-6 text-sm">
            {NAV_LINKS_FOOTER.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-brand-600">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
