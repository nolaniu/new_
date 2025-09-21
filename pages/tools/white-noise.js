import WhiteNoisePlayer from '../../components/tools/WhiteNoisePlayer';

export default function WhiteNoisePage() {
  return (
    <div className="space-y-12">
      <header className="space-y-2">
        <p className="text-sm font-semibold text-brand-600">白噪音播放器</p>
        <h1 className="text-3xl font-display font-bold text-slate-900">叠加多种环境音，塑造沉浸专注氛围</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-600">
          灵感来自 SoundDrown，使用浏览器原生 Audio API，可同时播放多个音轨并单独调节音量，适合写作、阅读、冥想或睡前放松使用。
        </p>
      </header>

      <WhiteNoisePlayer tone="light" className="p-6 sm:p-8" />

      <section className="rounded-3xl border border-slate-200 bg-white p-6 text-sm leading-relaxed text-slate-500 shadow-sm">
        <h2 className="text-lg font-display font-semibold text-slate-900">使用提示</h2>
        <ul className="mt-3 space-y-2 list-disc pl-5">
          <li>同一时间建议开启 2-3 条音轨，通过音量配比营造层次。</li>
          <li>点击“停止全部”后会立即复位时间轴，方便切换场景。</li>
          <li>默认音量为 60%，可点击“恢复默认音量”快速回到初始状态。</li>
        </ul>
      </section>
    </div>
  );
}

WhiteNoisePage.getBreadcrumbItems = () => [
  { label: '专注空间', href: '/tools' },
  { label: '白噪声播放器' },
];
