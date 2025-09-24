const GROUPS = [
  {
    title: '小黑屋自习室',
    description:
      '为深度专注打造的沉浸式环境，暗色界面与可控白噪声帮助你快速切换到投入状态。',
    action: { label: '进入自习室', href: '/tools/dark-room' },
    highlights: [
      '极简暗色背景，支持一键全屏/退出',
      '集成番茄钟、待办与灵感记录区',
      '适合写作、编程、阅读等长时间学习',
    ],
  },
  {
    title: '冥想空间',
    description:
      '基于 4-4-6 呼吸节奏设计的冥想练习，引导你放慢节奏，重拾心绪平衡。',
    action: { label: '开始冥想', href: '/tools/meditation' },
    highlights: [
      '动态呼吸引导，可暂停、静音或切换节奏',
      '自动记录每次冥想时长与轮次',
      '适合晨间唤醒、午休恢复或睡前放松',
    ],
  },
];

export default function ToolsIndex() {
  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <p className="text-sm font-semibold text-brand-600">专注空间精选</p>
        <h1 className="text-3xl font-display font-bold text-slate-900">围绕专注与冥想打造的一体化练习室</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-600">
          这里收录了帮助你进入“深度工作”与“静心冥想”的工具，每个页面都可独立使用，也能串联成专注方案。
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-2">
        {GROUPS.map((group) => (
          <section
            key={group.title}
            className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl"
          >
            <div className="space-y-3">
              <h2 className="text-2xl font-display font-semibold text-slate-900">{group.title}</h2>
              <p className="text-sm leading-relaxed text-slate-600">{group.description}</p>
            </div>

            <ul className="space-y-2 text-sm text-slate-500">
              {group.highlights.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 inline-flex h-2 w-2 flex-shrink-0 rounded-full bg-brand-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3">
              <a
                href={group.action.href}
                className="inline-flex items-center justify-center rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-700"
              >
                {group.action.label}
              </a>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
