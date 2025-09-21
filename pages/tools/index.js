const GROUPS = [
  {
    title: '小黑屋自习室',
    description:
      '以沉浸式专注为核心，内置白噪音混音与待办速记，便于快速进入工作状态。',
    action: { label: '进入自习室', href: '/tools/dark-room' },
    highlights: [
      '深色氛围背景可一键切换全屏 / 亮度',
      '白噪音播放器与速记待办保持视觉一致',
      '适合番茄钟、冲刺写作、晚间自习等场景',
    ],
  },
  {
    title: '冥想空间',
    description:
      '跟随 4-4-6 呼吸节奏进行静心练习，辅以轻量白噪音陪伴，帮助调整状态。',
    action: { label: '开启冥想', href: '/tools/meditation' },
    highlights: [
      '动态图形呈现吸气 / 停留 / 呼气节奏',
      '自带冥想笔记区，记录情绪与体感变化',
      '白噪音快速入口，保持冥想与日常联动',
    ],
  },
];

export default function ToolsIndex() {
  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <p className="text-sm font-semibold text-brand-600">专注空间合集</p>
        <h1 className="text-3xl font-display font-bold text-slate-900">围绕专注与冥想打造的一体化练习空间</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-600">
          工具按照使用场景划分为“自习室”和“冥想”两大主体，每个主体内嵌常用组件，单击按钮即可进入体验。
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
