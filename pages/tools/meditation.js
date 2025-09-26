import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

const BREATHING_SEQUENCE = [
  {
    label: "吸气",
    duration: 4,
    hint: "从鼻腔缓缓吸入，胸腹像树梢一样舒展。",
  },
  {
    label: "保持",
    duration: 1,
    hint: "轻轻保持，感受空气在身体里安稳流动。",
  },
  {
    label: "呼气",
    duration: 6,
    hint: "慢慢呼出，像风穿过森林带走紧绷。",
  },
];

const BACKGROUNDS = [
  {
    id: "forest",
    label: "林间晨雾",
    image: "/images/sunbeams-1547273.jpg",
    audio: "/audio/林间晨雾.mp3",
  },
  {
    id: "stream",
    label: "山涧清泉",
    image: "/images/mountain-stream-7847462_1920.jpg",
    audio: "/audio/山涧清泉.mp3",
  },
  {
    id: "valley",
    label: "丘谷薄暮",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=2000&q=80",
    audio: "/audio/丘谷暮霭.mp3",
  },
];

const QUOTES = [
  "呼吸是连接自我与世界的桥梁。",
  "让思绪像晨雾散开，只留下清晰的觉察。",
  "安静坐下，你会听见身体在诉说。",
  "带着善意对待每一次呼吸，宁静自然到来。",
  "光与影在林间流动，如同心的节奏。",
];

const BREATHING_CYCLE_SECONDS = BREATHING_SEQUENCE.reduce((sum, phase) => sum + phase.duration, 0);



export default function MeditationPage() {
    const SESSION_DURATION_SECONDS = 60;
    const [remaining, setRemaining] = useState(SESSION_DURATION_SECONDS);
  const [running, setRunning] = useState(false);
  const [showBreathing, setShowBreathing] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [backgroundIndex, setBackgroundIndex] = useState(2); // 设置默认为丘谷薄暮（索引2）
  const [quote, setQuote] = useState(QUOTES[0]);
  const [animationKey, setAnimationKey] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const timerRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
  }, []);

  useEffect(() => {
      return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!running) {
      if (timerRef.current) clearInterval(timerRef.current);
      return undefined;
    }

    let phase = phaseIndex;
    let elapsed = 0;

    const tick = () => {
      setRemaining((prev) => {
        if (prev <= 1) {
          setRunning(false);
          setPhaseIndex(0);
          setAnimationKey((seed) => seed + 1);
      setShowBreathing(true);
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
    };

    timerRef.current = setInterval(tick, 1000);
    return () => timerRef.current && clearInterval(timerRef.current);
  }, [running, phaseIndex]);

  useEffect(() => {
    if (!running) {
      setRemaining(SESSION_DURATION_SECONDS);
    }
  }, [running]);

  const currentPhase = BREATHING_SEQUENCE[phaseIndex];
    const progress = useMemo(() => 1 - remaining / (SESSION_DURATION_SECONDS || 1), [remaining]);
  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const background = BACKGROUNDS[backgroundIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    audio.src = background.audio;
    audio.load();
    audio.volume = background.id === 'valley' ? 0.2 : 1;
    audio.muted = isMuted;
    if (!isMuted) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  }, [backgroundIndex, background.audio]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = isMuted;
    audio.volume = background.id === 'valley' ? 0.2 : 1;
    if (isMuted) {
      audio.pause();
    } else {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  }, [isMuted]);










  const toggleSession = () => {
    setRunning((prev) => {
      const next = !prev;

      if (next) {
        setPhaseIndex(0);
        setRemaining(SESSION_DURATION_SECONDS);
        setAnimationKey((seed) => seed + 1);
        setShowBreathing(true);
      } else {
        setPhaseIndex(0);
        setAnimationKey((seed) => seed + 1);
      }

      return next;
    });
  };
  const resetSession = () => {
    setRunning(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setPhaseIndex(0);
    setRemaining(SESSION_DURATION_SECONDS);
    setAnimationKey((seed) => seed + 1);
  };
  const cycleBackground = () => setBackgroundIndex((prev) => (prev + 1) % BACKGROUNDS.length);

  const toggleBreathingOverlay = () => {
    setShowBreathing((prev) => {
      const next = !prev;
      if (!next) {
        setRunning(false);
        setRemaining(SESSION_DURATION_SECONDS);
        setAnimationKey((seed) => seed + 1);
        const audio = audioRef.current;
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
        }
      }
      return next;
    });
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };


return (
  <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden text-slate-100">
    <audio ref={audioRef} className="hidden" loop preload="auto" />
    <div className="absolute inset-0">
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-[1500ms]"
        style={{ backgroundImage: `url(${background.image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-slate-950/70 to-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(56,189,248,0.18),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_65%,rgba(52,211,153,0.18),transparent_60%)]" />
    </div>

    <div className="absolute left-8 top-8 z-20 text-xs font-medium text-slate-200/80 sm:text-sm">
      <Link href="/#focus-spaces" className="text-slate-100/80 transition hover:text-teal-100">专注空间</Link>
      <span className="px-1 text-slate-400/70">·</span>
      <span className="text-slate-100/70">冥想空间</span>
    </div>

          <div className="absolute left-8 top-1/2 z-20 -translate-y-1/2">
  <div className="flex flex-col items-start gap-3">
    <button
        type="button"
        className="group flex w-32 items-center gap-2 rounded-full border border-emerald-300/50 bg-emerald-400/20 px-3 py-2 text-xs font-medium text-emerald-100 shadow-lg shadow-emerald-900/40 transition hover:text-teal-100"
      >
        <svg 
          viewBox="0 0 24 24" 
          className="h-5 w-5" 
          aria-hidden="true"
          onClick={toggleMute}
        >
          {isMuted ? (
            <path
              d="M4 9v6h4l5 4V5l-5 4H4zm11.586-2.414 1.828-1.829 1.414 1.415-1.828 1.828L21 12l-3 3 1.828 1.828-1.414 1.415-1.828-1.829L15 16.999l-1.414-1.414 1.828-1.828-1.828-1.828L15 10.513l1.586-1.927z"
              fill="currentColor"
            />
          ) : (
            <path
              d="M4 9v6h4l5 4V5L8 9H4zm11.5-3.5c1.933 1.2 3 3.253 3 5.5s-1.067 4.3-3 5.5l-1-1.732c1.257-.78 2-2.136 2-3.768s-.743-2.988-2-3.768l1-1.732z"
              fill="currentColor"
            />
          )}
        </svg>
        <span
          className="flex-1 text-center cursor-pointer"
          onClick={cycleBackground}
        >
          {background.label}
        </span>
      </button>
    <button
      type="button"
      onClick={toggleBreathingOverlay}
      className="flex w-32 items-center gap-2 rounded-full border border-emerald-300/50 bg-emerald-400/20 px-3 py-2 text-xs font-medium text-emerald-100 shadow-lg shadow-emerald-900/40 transition hover:border-teal-200 hover:text-teal-100"
      aria-pressed={showBreathing}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <circle cx="12" cy="7" r="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M7 18c0-2.8 2.2-5 5-5s5 2.2 5 5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M12 12c-3.3 0-6 1.3-6 3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M18 15c0-1.7-2.7-3-6-3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <span className="flex-1 text-center">{showBreathing ? '结束冥想' : '一分钟冥想'}</span>
    </button>
  </div>
</div>
      {showBreathing && (
  <main className="relative z-10 flex w-full max-w-xl flex-col items-center gap-10 px-4 pt-28 pb-24 text-center">
    <div className="relative flex h-[360px] w-full max-w-md items-center justify-center overflow-hidden rounded-[32px] border border-emerald-400/30">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/18 via-teal-500/18 to-sky-400/18" aria-hidden />
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15 mix-blend-soft-light transition-all duration-[1500ms]"
        style={{ backgroundImage: `url(${background.image})` }}
        aria-hidden
      />
      <div className="relative flex h-56 w-56 -translate-y-8 items-center justify-center rounded-full bg-white/10 shadow-[0_0_45px_rgba(34,197,94,0.35)]">
        <div
          key={animationKey}
          className="breathing-circle flex h-44 w-44 items-center justify-center rounded-full text-white shadow-[0_0_35px_rgba(59,130,246,0.35)]"
          style={{
            '--breathing-duration': `${BREATHING_CYCLE_SECONDS}s`,
            animationPlayState: running ? 'running' : 'paused',
          }}
        >
          <span className="text-3xl font-display font-semibold tracking-[0.28em]">{currentPhase.label}</span>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 w-[72%] -translate-x-1/2 rounded-full bg-emerald-500/20 px-5 py-3 text-center text-xs text-emerald-50/90 backdrop-blur">
        {currentPhase.hint}
      </div>
      <div className="absolute bottom-0 left-0 h-1 w-full rounded-full bg-emerald-500/20">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-300 via-teal-300 to-sky-300 transition-all duration-500"
          style={{ width: `${Math.min(progress, 1) * 100}%` }}
        />
      </div>
    </div>

    <div className="flex flex-wrap items-center justify-center gap-4">
      <button
        type="button"
        onClick={toggleSession}
        className={`rounded-full px-8 py-3 text-sm font-semibold text-emerald-900 shadow-soft transition ${
          running ? "bg-emerald-200/80 hover:bg-emerald-200" : "bg-teal-200/80 hover:bg-teal-200"
        }`}
      >
        {running ? '暂停呼吸' : '开始呼吸'}
      </button>
      <button
        type="button"
        onClick={resetSession}
        className="rounded-full border border-emerald-300/50 px-8 py-3 text-sm font-semibold text-emerald-100 transition hover:border-emerald-200 hover:text-emerald-50"
      >
        重置节奏
      </button>
    </div>
  </main>
)}

  </div>
);
}

MeditationPage.getLayout = (page) => page;












