import { useEffect, useMemo, useRef, useState } from 'react';

const TRACKS = [
  {
    id: 'wind',
    title: '雪山风声',
    url: 'https://cdn.pixabay.com/download/audio/2022/08/23/audio_f2d8113901.mp3?filename=wind-on-mountain-118857.mp3',
  },
  {
    id: 'chimes',
    title: '风铃与颂钵',
    url: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_f4c4b74eaa.mp3?filename=wind-chime-110590.mp3',
  },
  {
    id: 'stream',
    title: '溪流潺潺',
    url: 'https://cdn.pixabay.com/download/audio/2021/10/13/audio_1151dba13f.mp3?filename=forest-river-ambience-ambient-nature-sounds-7389.mp3',
  },
];

const BREATHING_SEQUENCE = [
  { label: '吸气', duration: 4, hint: '吸入清晰与能量', color: 'from-brand-500 to-brand-400' },
  { label: '停留', duration: 4, hint: '保持觉察', color: 'from-emerald-500 to-emerald-400' },
  { label: '呼气', duration: 6, hint: '呼出紧张与杂念', color: 'from-sky-500 to-sky-400' },
];

export default function MeditationPage() {
  const [length, setLength] = useState(10);
  const [remaining, setRemaining] = useState(length * 60);
  const [running, setRunning] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [notes, setNotes] = useState('');
  const [selectedTracks, setSelectedTracks] = useState(() => Object.fromEntries(TRACKS.map((track) => [track.id, false])));
  const audioRefs = useRef({});
  const breathingTimer = useRef(null);

  useEffect(() => {
    TRACKS.forEach((track) => {
      const audio = new Audio(track.url);
      audio.loop = true;
      audio.volume = 0.5;
      audioRefs.current[track.id] = audio;
    });
    return () => {
      Object.values(audioRefs.current).forEach((audio) => {
        if (!audio) return;
        audio.pause();
        audio.src = '';
      });
    };
  }, []);

  useEffect(() => {
    if (!running) {
      clearInterval(breathingTimer.current);
      return undefined;
    }
    let phase = phaseIndex;
    let elapsed = 0;

    function tick() {
      setRemaining((prev) => {
        if (prev <= 1) {
          setRunning(false);
          setPhaseIndex(0);
          stopAllTracks();
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
        playSelectedTracks();
      } else {
        setPhaseIndex(0);
        setRemaining(length * 60);
        stopAllTracks();
      }
      return next;
    });
  }

  function playSelectedTracks() {
    Object.entries(selectedTracks).forEach(([id, isSelected]) => {
      const audio = audioRefs.current[id];
      if (!audio) return;
      if (isSelected) {
        audio.play();
      } else {
        audio.pause();
        audio.currentTime = 0;
      }
    });
  }

  function stopAllTracks() {
    Object.values(audioRefs.current).forEach((audio) => {
      if (!audio) return;
      audio.pause();
      audio.currentTime = 0;
    });
  }

  function toggleTrack(id) {
    setSelectedTracks((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      const audio = audioRefs.current[id];
      if (!audio) return next;
      if (!prev[id]) {
        if (running) {
          audio.play();
        }
      } else {
        audio.pause();
        audio.currentTime = 0;
      }
      return next;
    });
  }

  const currentPhase = BREATHING_SEQUENCE[phaseIndex];
  const progress = useMemo(() => 1 - remaining / (length * 60 || 1), [remaining, length]);

  return (
    <div className="space-y-12">
      <header className="space-y-2">
        <p className="text-sm font-semibold text-brand-600">冥想空间</p>
        <h1 className="text-3xl font-display font-bold text-slate-900">呼吸、觉察、记录，让冥想成为日常仪式</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-600">
          参考 trynoice/web-app-v0 的氛围，将环境音混合、呼吸节奏与记录工具整合在一个页面。跟随 4-4-6 呼吸节奏，可以快速进入平静而稳定的状态。
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
                设置
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
              <div className={`flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br ${currentPhase.color} text-white shadow-2xl transition-all`}>
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
                running ? 'bg-rose-500 hover:bg-rose-600' : 'bg-brand-600 hover:bg-brand-700'
              }`}
            >
              {running ? '结束冥想' : '开始冥想'}
            </button>
            <button
              type="button"
              onClick={() => {
                setRunning(false);
                setPhaseIndex(0);
                setRemaining(length * 60);
                stopAllTracks();
              }}
              className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 transition hover:border-brand-200 hover:text-brand-700"
            >
              重置
            </button>
          </div>
        </div>

        <aside className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="space-y-3">
            <h2 className="text-lg font-display font-semibold text-slate-900">环境音选择</h2>
            <p className="text-xs leading-relaxed text-slate-500">最多任选三种音色混合，建议控制在 1-2 种以保持纯净。</p>
            <div className="space-y-2">
              {TRACKS.map((track) => (
                <label key={track.id} className="flex cursor-pointer items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm transition hover:border-brand-200">
                  <span>{track.title}</span>
                  <input
                    type="checkbox"
                    checked={selectedTracks[track.id]}
                    onChange={() => toggleTrack(track.id)}
                    className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                  />
                </label>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <h2 className="text-lg font-display font-semibold text-slate-900">冥想前后记录</h2>
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="冥想前：此刻的心情是什么？冥想后：身体或思想出现了哪些变化？"
              className="h-40 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
            />
            <p className="text-[11px] text-slate-400">
              建议将洞察同步到博客，形成长期的成长档案。
            </p>
          </div>
        </aside>
      </section>
    </div>
  );
}