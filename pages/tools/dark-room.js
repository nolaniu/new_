import { useCallback, useEffect, useMemo, useState } from 'react';

const QUOTES = [
  '专注是一种稀缺资源，把它花在最值得的事情上。',
  '保持心流，用行动替代焦虑。',
  '只要开始，就已经领先于过去的自己。',
  '静下心来，听见自己的想法。',
  '把注意力放在正在做的事情上，其余的留待之后。',
];

export default function DarkRoomPage() {
  const [quote, setQuote] = useState(() => randomQuote());
  const [notes, setNotes] = useState('');
  const [dimmed, setDimmed] = useState(true);

  const handleKeydown = useCallback((event) => {
    if (event.key === 'Escape') {
      setDimmed(false);
      exitFullscreen();
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [handleKeydown]);

  const backgroundClass = useMemo(
    () => (dimmed ? 'bg-slate-950 text-slate-100' : 'bg-slate-900 text-slate-100'),
    [dimmed],
  );

  function randomizeQuote() {
    setQuote(randomQuote());
  }

  async function toggleFullscreen() {
    if (typeof document === 'undefined') return;
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  }

  return (
    <div className={`relative flex min-h-screen flex-col items-center justify-center px-6 py-16 transition ${backgroundClass}`}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-950/90 to-black" />
        <div
          className="absolute inset-0 opacity-40"
          style={{ background: 'radial-gradient(circle at 50% 20%, rgba(124,58,237,0.25), transparent 55%)' }}
        />
      </div>
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
        <span className="rounded-full border border-slate-700 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-300">
          FOCUS MODE
        </span>
        <h1 className="text-5xl font-display font-bold text-slate-100 sm:text-6xl">小黑屋专注室</h1>
        <p className="max-w-xl text-base leading-relaxed text-slate-300">
          灵感来源于 clean-screen，进入页面后只保留一行激励语与背景音控制。按 ESC 可以退出，点击下方按钮可以开启或关闭全屏模式。
        </p>

        <figure className="w-full rounded-3xl border border-slate-800 bg-slate-900/60 p-8 shadow-2xl backdrop-blur">
          <blockquote className="text-2xl font-semibold text-slate-100">“{quote}”</blockquote>
          <figcaption className="mt-4 flex items-center justify-between text-xs text-slate-500">
            <span>按 ESC 退出全屏 / 点击右侧换一句</span>
            <button
              type="button"
              onClick={randomizeQuote}
              className="rounded-full border border-slate-700 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-slate-300 hover:border-brand-500 hover:text-brand-300"
            >
              换一句
            </button>
          </figcaption>
        </figure>

        <textarea
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          placeholder="在这里快速记录灵感或待会要处理的事项，避免打断当前专注。"
          className="h-40 w-full rounded-3xl border border-slate-800 bg-slate-900/80 px-6 py-4 text-sm text-slate-200 placeholder:text-slate-600 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-400/40"
        />

        <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-slate-300">
          <button
            type="button"
            onClick={() => setDimmed((prev) => !prev)}
            className="rounded-full border border-slate-700 px-4 py-2 hover:border-brand-500 hover:text-brand-300"
          >
            {dimmed ? '提高亮度' : '降低亮度'}
          </button>
          <button
            type="button"
            onClick={toggleFullscreen}
            className="rounded-full border border-slate-700 px-4 py-2 hover:border-brand-500 hover:text-brand-300"
          >
            切换全屏
          </button>
          <a
            href="/tools/white-noise"
            className="rounded-full border border-slate-700 px-4 py-2 hover:border-brand-500 hover:text-brand-300"
          >
            白噪声伴奏
          </a>
        </div>
      </div>
    </div>
  );
}

DarkRoomPage.getLayout = (page) => page;

function randomQuote() {
  return QUOTES[Math.floor(Math.random() * QUOTES.length)];
}

function exitFullscreen() {
  if (typeof document === 'undefined') return;
  if (document.fullscreenElement) {
    document.exitFullscreen();
  }
}