import Link from 'next/link';

const TOOLBOX = [
  {
    href: '/tools/pomodoro',
    icon: '??',
    title: '番茄钟 Pomodoro',
    summary: '25 分钟专注、 5 分钟休息、 4 轮后长休息，支持自定义时长与声效提示。',
    inspiration: 'astroud/pomodoro-react-app',
  },
  {
    href: '/tools/todo',
    icon: '?',
    title: '待办清单',
    summary: '基于 LocalStorage 保存任务状态，支持优先级与专注模式。',
    inspiration: 'taniarascia/todo',
  },
  {
    href: '/tools/white-noise',
    icon: '??',
    title: '白噪声播放器',
    summary: '内置多种环境音，支持混音与音量调节，可伴随专注或冥想。',
    inspiration: 'petele/SoundDrown',
  },
  {
    href: '/tools/dark-room',
    icon: '??',
    title: '小黑屋自习室',
    summary: '全屏沉浸模式，搭配背景音乐与激励语，帮助进入深度专注。',
    inspiration: 'ryanmcdermott/clean-screen',
  },
  {
    href: '/tools/meditation',
    icon: '??',
    title: '冥想室',
    summary: '环境音混合、呼吸节奏与念头记录，打造专属冥想空间。',
    inspiration: 'trynoice/web-app-v0',
  },
];

export default function ToolsIndex() {
  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <p className="text-sm font-semibold text-brand-600">效率工具箱</p>
        <h1 className="text-3xl font-display font-bold text-slate-900">把番茄钟、待办、白噪声和冥想带到同一个页面</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-600">
          功能页直接使用 React 组件实现，以 Next.js Pages 路由组织在 <code className="rounded bg-slate-100 px-2 py-1">/pages/tools/</code>。所有状态都在浏览器本地管理，无需后端即可运行。
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        {TOOLBOX.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl"
          >
            <div className="space-y-3">
              <span className="text-3xl">{tool.icon}</span>
              <h2 className="text-xl font-display font-semibold text-slate-900 group-hover:text-brand-700">
                {tool.title}
              </h2>
              <p className="text-sm leading-relaxed text-slate-600">{tool.summary}</p>
            </div>
            <span className="text-xs uppercase tracking-wide text-slate-400">
              灵感来源：{tool.inspiration}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}