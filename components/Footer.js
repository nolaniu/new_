import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t mt-10">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between py-6 px-4 gap-4">
        {/* 左侧 LOGO */}
        <div className="flex items-center gap-2">
          <img src="/images/icon.png" alt="学习工作室 Logo" className="h-6 w-6" />
          <span className="font-bold text-white">学习工作室</span>
        </div>

        {/* 中间链接 */}
        <div className="flex gap-6 text-sm">
          <Link href="/about" className="hover:text-white transition">关于我们</Link>
          <Link href="/privacy" className="hover:text-white transition">隐私政策</Link>
          <Link href="/disclaimer" className="hover:text-white transition">免责声明</Link>
        </div>

        {/* 右侧版权信息 */}
        <div className="text-sm text-slate-400">
          © {new Date().getFullYear()} 学习工作室 All Rights Reserved
        </div>
      </div>
    </footer>
  );
}
