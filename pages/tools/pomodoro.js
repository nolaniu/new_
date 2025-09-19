import { useEffect, useMemo, useRef, useState } from 'react';

const DEFAULT_PRESETS = {
  focus: 25,
  short: 5,
  long: 15,
};

const ROUNDS_BEFORE_LONG_BREAK = 4;

export default function PomodoroPage() {
  const [durations, setDurations] = useState(() => ({ ...DEFAULT_PRESETS }));
  const [mode, setMode] = useState('focus');
  const [timeLeft, setTimeLeft] = useState(DEFAULT_PRESETS.focus * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [completedRounds, setCompletedRounds] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    setTimeLeft(durations[mode] * 60);
  }, [mode, durations]);

  useEffect(() => {
    if (!isRunning) {
      clearInterval(intervalRef.current);
      return undefined;
    }
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  useEffect(() => {
    if (!isRunning) return;
    if (timeLeft > 0) return;
    handleStageComplete();
  }, [timeLeft, isRunning, mode, durations, completedRounds]);

  const progress = useMemo(() => {
    const total = Math.max(durations[mode] * 60, 1);
    return Math.min(1, Math.max(0, 1 - timeLeft / total));
  }, [timeLeft, durations, mode]);

  const formatted = useMemo(() => formatTime(timeLeft), [timeLeft]);

  function handleStageComplete() {
    playBell();
    const focusCount = mode === 'focus' ? completedRounds + 1 : completedRounds;
    const nextMode = computeNextMode(mode, focusCount);
    if (mode === 'focus') {
      setCompletedRounds((prev) => prev + 1);
    }
    setMode(nextMode);
    setTimeLeft(durations[nextMode] * 60);
  }

  function handleStartPause() {
    setIsRunning((prev) => !prev);
  }

  function handleSkip() {
    playBell();
    const nextCount = mode === 'focus' ? completedRounds + 1 : completedRounds;
    const nextMode = computeNextMode(mode, nextCount);
    if (mode === 'focus') {
      setCompletedRounds((prev) => prev + 1);
    }
    setMode(nextMode);
    setTimeLeft(durations[nextMode] * 60);
  }

  function handleReset() {
    setIsRunning(false);
    setMode('focus');
    setTimeLeft(durations.focus * 60);
    setCompletedRounds(0);
  }

  function handleDurationChange(key, value) {
    const minutes = Math.max(1, Number(value) || DEFAULT_PRESETS[key]);
    setDurations((prev) => ({ ...prev, [key]: minutes }));
  }

  return (
    <div className="space-y-12">
      <header className="space-y-2">
        <p className="text-sm font-semibold text-brand-600">番茄钟 | Pomodoro</p>
        <h1 className="text-3xl font-display font-bold text-slate-900">专注 25 分钟，休息 5 分钟，保持高效节奏</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-600">
          参考 astroud/pomodoro-react-app 改造而来。支持自定义时长、轮次统计、结束提示音与一键跳过，适合深度工作或学习冲刺。
        </p>
      </header>

      <section className="grid gap-8 lg:grid-cols-[2fr,1fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex gap-2 rounded-full bg-slate-100 p-1 text-sm font-medium">
              {[
                { key: 'focus', label: '专注阶段' },
                { key: 'short', label: '短休息' },
                { key: 'long', label: '长休息' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => {
                    setMode(tab.key);
                    setIsRunning(false);
                  }}
                  className={`rounded-full px-4 py-2 transition ${
                    mode === tab.key ? 'bg-white text-brand-700 shadow' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <span className="text-xs uppercase tracking-wide text-slate-400">第 {Math.floor(completedRounds / ROUNDS_BEFORE_LONG_BREAK) + 1} 轮</span>
          </div>

          <div className="mt-8 flex flex-col items-center gap-6">
            <div className="relative flex h-64 w-64 items-center justify-center">
              <svg className="h-full w-full -rotate-90 text-brand-200" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="8" fill="none" />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="#7c3aed"
                  strokeWidth="8"
                  strokeLinecap="round"
                  fill="none"
                  strokeDasharray={Math.PI * 2 * 45}
                  strokeDashoffset={(1 - progress) * Math.PI * 2 * 45}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                <span className="text-6xl font-display font-bold text-slate-900">{formatted}</span>
                <span className="text-xs uppercase tracking-widest text-slate-400">
                  {mode === 'focus' ? 'FOCUS' : mode === 'short' ? 'BREAK' : 'LONG BREAK'}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleStartPause}
                className="inline-flex items-center rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-700"
              >
                {isRunning ? '暂停' : '开始'}
              </button>
              <button
                type="button"
                onClick={handleSkip}
                className="inline-flex items-center rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-brand-200 hover:text-brand-700"
              >
                跳过阶段
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-brand-200 hover:text-brand-700"
              >
                重置
              </button>
            </div>
          </div>
        </div>

        <aside className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-display font-semibold text-slate-900">阶段时长设置（分钟）</h2>
          <div className="space-y-4 text-sm">
            {[
              { key: 'focus', label: '专注时长', hint: '建议 25 分钟，可按需调整。' },
              { key: 'short', label: '短休息', hint: '建议 5 分钟，帮助缓解疲劳。' },
              { key: 'long', label: '长休息', hint: '建议 15 分钟，每完成 4 轮触发。' },
            ].map((item) => (
              <div key={item.key} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="font-medium text-slate-700" htmlFor={`input-${item.key}`}>
                    {item.label}
                  </label>
                  <span className="text-xs text-slate-400">{item.hint}</span>
                </div>
                <input
                  id={`input-${item.key}`}
                  type="number"
                  min="1"
                  value={durations[item.key]}
                  onChange={(event) => handleDurationChange(item.key, event.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
                />
              </div>
            ))}
          </div>
          <div className="rounded-2xl bg-brand-50/80 p-4 text-xs text-brand-700">
            <p className="font-semibold">使用指南</p>
            <ul className="mt-2 space-y-1 list-disc list-inside">
              <li>完成一个专注阶段后，会自动切换到短休息。</li>
              <li>每完成 {ROUNDS_BEFORE_LONG_BREAK} 轮专注阶段后进入长休息，帮助恢复精力。</li>
              <li>结束时播放提示音，建议配合耳机或提示灯使用。</li>
            </ul>
          </div>
        </aside>
      </section>
    </div>
  );
}

function computeNextMode(currentMode, rounds) {
  if (currentMode === 'focus') {
    return rounds % ROUNDS_BEFORE_LONG_BREAK === 0 ? 'long' : 'short';
  }
  return 'focus';
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, '0');
  const seconds = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function playBell() {
  if (typeof window === 'undefined') return;
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();
  oscillator.type = 'sine';
  oscillator.frequency.value = 880;
  oscillator.connect(gain);
  gain.connect(ctx.destination);
  oscillator.start();
  gain.gain.setValueAtTime(0.001, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);
  oscillator.stop(ctx.currentTime + 1.3);
}

PomodoroPage.getBreadcrumbItems = () => [
  { label: '效率工具', href: '/tools' },
  { label: '番茄钟' },
];
