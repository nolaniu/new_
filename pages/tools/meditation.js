import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import WhiteNoisePlayer from "../../components/tools/WhiteNoisePlayer";

const BREATHING_SEQUENCE = [
  { label: "吸气", duration: 4, hint: "缓慢吸气，感受空气充满肺部", color: "from-brand-500 to-brand-400" },
  { label: "停留", duration: 4, hint: "保持静止，让身体感受饱满", color: "from-emerald-500 to-emerald-400" },
  { label: "呼气", duration: 6, hint: "平稳呼气，顺势放松肩颈", color: "from-sky-500 to-sky-400" },
];

export default function MeditationPage() {
  const [length, setLength] = useState(10);
  const [remaining, setRemaining] = useState(length * 60);
  const [running, setRunning] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [notes, setNotes] = useState("");
  const breathingTimer = useRef(null);

  useEffect(() => {
    return () => {
      if (breathingTimer.current) clearInterval(breathingTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!running) {
      if (breathingTimer.current) clearInterval(breathingTimer.current);
      return undefined;
    }

    let phase = phaseIndex;
    let elapsed = 0;

    function tick() {
      setRemaining((prev) => {
        if (prev <= 1) {
          setRunning(false);
          setPhaseIndex(0);
          return 0;
        }
        return prev - 1;
      });
      elapsed += 1;
      if (elapsed >= BREATHING_SEQUENCE[phase].duration) {
        elapsed = 0;
        phase = (phase + 1) % BREATHING_SEQUENCE.length;
        setPhaseIndex(phase);
      }
    }

    breathingTimer.current = setInterval(tick, 1000);
    return () => clearInterval(breathingTimer.current);
  }, [running, phaseIndex]);

  useEffect(() => {
    if (!running) {
      setRemaining(length * 60);
    }
  }, [length, running]);

  function toggleRunning() {
    setRunning((prev) => {
      const next = !prev;
      if (next) {
        setPhaseIndex(0);
        setRemaining(length * 60);
      } else {
        if (breathingTimer.current) clearInterval(breathingTimer.current);
        setPhaseIndex(0);
        setRemaining(length * 60);
      }
      return next;
    });
  }

  function resetSession() {
    setRunning(false);
    if (breathingTimer.current) clearInterval(breathingTimer.current);
    setPhaseIndex(0);
    setRemaining(length * 60);
  }

  const currentPhase = BREATHING_SEQUENCE[phaseIndex];
  const progress = useMemo(() => 1 - remaining / (length * 60 || 1), [remaining, length]);

  return (
    <div className="space-y-12">
      <header className="space-y-2">
        <p className="text-sm font-semibold text-brand-600">冥想空间</p>
        <h1 className="text-3xl font-display font-bold text-slate-900">呼吸、觉察、记录，让冥想成为日常仪式</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-600">
          灵感来自 trynoice/web-app-v0，将呼吸节奏、情绪记录与声音陪伴整合在同一页面。跟随 4-4-6 呼吸节奏，缓慢调频，再利用白噪音稳定心率和注意力。
        </p>
      </header>

      <section className="grid gap-8 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">冥想时长</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-display font-bold text-slate-900">{Math.floor(remaining / 60)}</span>
                <span className="text-sm text-slate-500">分钟剩余</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-400" htmlFor="length">
                时长
              </label>
              <input
                id="length"
                type="range"
                min="5"
                max="45"
                step="5"
                value={length}
                onChange={(event) => setLength(Number(event.target.value))}
                className="h-2 w-40 cursor-pointer rounded-full bg-slate-200 accent-brand-600"
              />
              <span className="text-sm text-slate-500">{length} 分钟</span>
            </div>
          </div>

          <div className="relative flex h-80 items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-brand-50 via-white to-white">
            <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/40 to-white/0" />
            <div className="relative flex h-48 w-48 items-center justify-center rounded-full bg-gradient-to-br from-brand-200 to-brand-100">
              <div
                className={`flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br ${currentPhase.color} text-white shadow-2xl transition-all`}
              >
                <span className="text-2xl font-display font-semibold">{currentPhase.label}</span>
              </div>
            </div>
            <div className="absolute bottom-6 left-1/2 w-[70%] -translate-x-1/2 rounded-full bg-slate-200/70 p-3 text-center text-xs text-slate-600">
              {currentPhase.hint}
            </div>
            <div className="absolute bottom-0 left-0 h-1 w-full bg-slate-100">
              <div className="h-full bg-brand-500 transition-all" style={{ width: `${Math.min(progress, 1) * 100}%` }} />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={toggleRunning}
              className={`rounded-full px-6 py-3 text-sm font-semibold text-white shadow-soft transition ${
                running ? "bg-rose-500 hover:bg-rose-600" : "bg-brand-600 hover:bg-brand-700"
              }`}
            >
              {running ? "暂停冥想" : "开始冥想"}
            </button>
            <button
              type="button"
              onClick={resetSession}
              className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 transition hover:border-brand-200 hover:text-brand-700"
            >
              重置
            </button>
          </div>
        </div>

        <aside className="space-y-6">
          <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Ambient Mixer</p>
                <h2 className="mt-2 text-lg font-display font-semibold text-slate-900">白噪音陪伴</h2>
              </div>            </div>
            <WhiteNoisePlayer tone="light" showStats={false} showControls={false} className="border-0 p-0 shadow-none" />
          </section>

          <section className="space-y-3 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-display font-semibold text-slate-900">冥想前后记录</h2>
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="记录此刻的情绪、身体感受或冥想后的变化，逐步构建属于你的冥想档案。"
              className="h-40 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
            />
            <p className="text-[11px] text-slate-400">
              小提示：结束后回顾这段文字，更容易察觉冥想对情绪和注意力的影响。
            </p>
          </section>
        </aside>
      </section>
    </div>
  );
}

MeditationPage.getBreadcrumbItems = () => [
  { label: "效率工具", href: "/tools" },
  { label: "冥想空间" },
];


