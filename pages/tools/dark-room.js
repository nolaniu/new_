import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import DarkRoomClock from '../../components/tools/DarkRoomClock';
import PomodoroTimer from '../../components/tools/PomodoroTimer';

const QUOTES = [
      "Focus is a skill you can train—patience is the best mentor.",
      "Every act of creation begins in stillness; slow your mind first.",
      "Capture ideas the moment they appear and procrastination loses ground.",
      "Stay aware of the present and time will feel more substantial.",
      "When you commit wholeheartedly, the world makes room for you."
];

const WHITE_NOISE_TRACKS = [
  {
    id: "rain",
    label: "Rain",
    url: "/audio/rain-sound-272604.mp3",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
        <path d="M7 17v-2m4 2v-2m4 2v-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path
          d="M7 12a4 4 0 0 1-.8-7.93A5 5 0 0 1 18 7a3 3 0 0 1-.17 6H7Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    ),
  },
  {
    id: "campfire",
    label: "Campfire",
    url: "/audio/fireplace-with-crackling-sounds-2-min-rk-178392.mp3",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
        <path
          d="M9 5.5c1.2 1.1 2.2 2.8 2.2 4.1a2.3 2.3 0 0 1-4.6 0c0-1.3.9-3 2.4-4.1Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M13.8 4.4c1.5 1.3 3.2 3.4 3.2 5.4a3.5 3.5 0 1 1-7 0c0-1.8 1.1-3.7 2.6-5.4Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path d="M6 19.5 9.5 17m5 0L18 19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M7.5 21h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "waves",
    label: "Waves",
    url: "/audio/ocean-waves-250310.mp3",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
        <path
          d="M4 15c1.2 0 1.8-.8 3-1s1.8.8 3 1 1.8-.8 3-1 1.8.8 3 1 1.8-.8 3-1"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M4 19c1.2 0 1.8-.8 3-1s1.8.8 3 1 1.8-.8 3-1 1.8.8 3 1 1.8-.8 3-1"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    ),
  },
  {
    id: "focus",
    label: "Brainwave",
    url: "/audio/brainwave-delta.mp3",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
        <path
          d="M4 12c2-4 4-6 8-6s6 2 8 6c-2 4-4 6-8 6s-6-2-8-6Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M9 12h2l1.5-3L14 15l1.5-3H17"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    ),
  },
];

const createTodo = (text) => ({
  id:
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`,
  text,
  done: false,
});

const pickRandomQuote = (current) => {
  if (!QUOTES.length) return "";
  if (QUOTES.length === 1) return QUOTES[0];
  let next = current;
  while (next === current) {
    next = QUOTES[Math.floor(Math.random() * QUOTES.length)];
  }
  return next;
};

export default function DarkRoomPage() {
  const [quote, setQuote] = useState(QUOTES[0]);
  const [todos, setTodos] = useState(() => [createTodo("Today’s top 2 tasks")]);
  const [newTodo, setNewTodo] = useState("");
  const [showTodos, setShowTodos] = useState(false);
  const audioRefs = useRef({});
  const todoListRef = useRef(null);
  const [playing, setPlaying] = useState(() =>
    Object.fromEntries(WHITE_NOISE_TRACKS.map((track) => [track.id, false])),
  );

  const handleKeydown = useCallback((event) => {
    if (event.key === "Escape") {
      exitFullscreen();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [handleKeydown]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleWheel = (event) => {
      const list = todoListRef.current;
      if (list && list.contains(event.target)) {
        const { scrollTop, scrollHeight, clientHeight } = list;
        const atTop = scrollTop <= 0 && event.deltaY < 0;
        const atBottom = scrollTop + clientHeight >= scrollHeight && event.deltaY > 0;
        if (!atTop && !atBottom) {
          return;
        }
      }
      event.preventDefault();
    };

    const previousBodyOverflow = document.body.style.overflow;
    const previousRootOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousRootOverflow;
    };
  }, []);

  useEffect(() => {
    WHITE_NOISE_TRACKS.forEach((track) => {
      const audio = new Audio(track.url);
      audio.loop = true;
      audio.volume = 0.55;
      audioRefs.current[track.id] = audio;
    });

    return () => {
      Object.values(audioRefs.current).forEach((audio) => {
        if (!audio) return;
        audio.pause();
        audio.src = "";
      });
    };
  }, []);

  useEffect(() => {
    setQuote((current) => pickRandomQuote(current));
  }, []);

  const toggleTrack = (id) => {
    const audio = audioRefs.current[id];
    if (!audio) return;
    setPlaying((prev) => {
      const isPlaying = !prev[id];
      if (isPlaying) {
        audio.play();
      } else {
        audio.pause();
        audio.currentTime = 0;
      }
      return { ...prev, [id]: isPlaying };
    });
  };

  const addTodo = () => {
    const value = newTodo.trim();
    if (!value) return;
    setTodos((prev) => [...prev, createTodo(value)]);
    setNewTodo("");
  };

  const toggleTodo = (id) => {
    setTodos((prev) => prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item)));
  };

  const removeTodo = (id) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleTodoPanel = () => {
    setShowTodos((prev) => !prev);
  };

  const backgroundClass = useMemo(
    () => "bg-gradient-to-b from-slate-950 via-slate-950/96 to-slate-900 text-slate-100",
    [],
  );

  const randomizeQuote = () => {
    setQuote((current) => pickRandomQuote(current));
  };

  return (
    <div className={`relative flex min-h-screen flex-col items-center justify-center px-6 py-16 transition ${backgroundClass}`}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-950/90 to-black" />
        <div
          className="absolute inset-0 opacity-40"
          style={{ background: "radial-gradient(circle at 50% 20%, rgba(124,58,237,0.2), transparent 55%)" }}
        />
      </div>

      <div className="absolute left-6 top-6 z-30 text-xs font-medium text-slate-400/70 sm:text-sm">
        <Link href="/#focus-spaces" className="text-slate-400/80 transition hover:text-brand-200"
              onClick={() => {
          // 释放滚动锁，避免阻塞首页的 hash 定位
          try {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
          } catch {}
        }}>Foucs Space</Link>
        <span className="px-1 text-slate-500/50">·</span>
        <span className="text-slate-400/60">Quiet Study Room</span>
      </div>
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-12 text-center">
        <div className="flex flex-col items-center gap-10">
          <DarkRoomClock className="max-w-full scale-95 sm:scale-100 lg:scale-105" />
          <div className="w-full max-w-md">
            <PomodoroTimer />
          </div>
        </div>
        <figure className="max-w-2xl space-y-4 text-center">
          <blockquote className="text-2xl font-semibold text-slate-100">"{quote}"</blockquote>
          <figcaption className="flex flex-col gap-3 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-center sm:gap-6">
            <span>{'Tip: Press ESC to exit full screen'}</span>
            <button
              type="button"
              onClick={randomizeQuote}
              className="self-center rounded-full border border-slate-700 px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.4em] text-slate-300 hover:border-brand-400/80 hover:text-brand-200"
            >
              {'Next'}
            </button>
          </figcaption>
        </figure>

        <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-slate-300">
          <button
            type="button"
            onClick={toggleFullscreen}
            className="rounded-full border border-slate-700 px-4 py-2 hover:border-brand-500 hover:text-brand-300"
          >
            Full Screen
          </button>
        </div>
      </div>

      <aside className="fixed left-8 top-1/2 z-20 flex -translate-y-1/2 flex-col items-start gap-4 text-slate-300">
        <div className="relative">
          <button
            type="button"
            onClick={toggleTodoPanel}
            className={`flex h-12 w-12 items-center justify-center rounded-full border transition ${
              showTodos
                ? "border-brand-400/80 bg-brand-500/20 text-brand-200"
                : "border-slate-800/80 bg-slate-900/80 hover:border-brand-400/60 hover:text-brand-200"
            }`}
            aria-expanded={showTodos}
            aria-controls="dark-room-todo-panel"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
              <path
                d="M6 4h12a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path d="M8 4v2a1 1 0 0 1-1 1H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M9 10h6m-6 4h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          <div
            id="dark-room-todo-panel"
            className={`absolute left-16 top-1/2 w-72 -translate-y-1/2 rounded-3xl border border-slate-800/80 bg-slate-900/70 p-5 shadow-2xl shadow-slate-900/60 transition-all duration-200 ${
              showTodos ? "pointer-events-auto opacity-100 translate-x-0" : "pointer-events-none opacity-0 -translate-x-4"
            }`}
          >
            <header className="flex items-start justify-between">
              <h2 className="text-sm font-semibold text-slate-200">To-Do List</h2>
              <p className="text-[10px] text-slate-500">Break down your ideas into steps</p>
            </header>
            <div className="mt-4 rounded-3xl border border-slate-800/70 bg-slate-900/70 px-5 py-4">
              <input
                type="text"
                value={newTodo}
                onChange={(event) => setNewTodo(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    addTodo();
                  }
                }}
                placeholder="Log today’s tasks"
                className="w-full rounded-2xl bg-slate-900/50 px-4 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-400/40"
              />

            </div>
            <ul
              ref={todoListRef}
              className="scrollbar-soft mt-4 max-h-48 space-y-3 overflow-y-auto pr-1"
            >
              {todos.map((item, index) => (
                <li
                  key={item.id}
                  className="flex items-start justify-between gap-4 rounded-2xl border border-slate-800/70 bg-slate-900/70 px-4 py-3 text-left"
                >
                  <div className="flex flex-1 min-w-0 items-start gap-3 text-left text-sm text-slate-200 leading-relaxed">
                    <span className="mt-0.5 text-xs text-slate-500">{index + 1}.</span>
                    <button
                      type="button"
                      onClick={() => toggleTodo(item.id)}
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition mt-0.5 ${
                        item.done
                          ? "border-brand-400 bg-brand-500/30 text-brand-200"
                          : "border-slate-700 text-transparent"
                      }`}
                      aria-pressed={item.done}
                    >
                      {item.done ? (
                        <svg viewBox="0 0 20 20" className="h-3 w-3" aria-hidden="true">
                          <path d="M5 10.5 8.5 14l6-8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : null}
                    </button>
                    <span className={`flex-1 break-words break-all leading-relaxed ${item.done ? "text-slate-500 line-through" : "text-slate-200"}`}>{item.text}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeTodo(item.id)}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-transparent text-slate-500 transition hover:border-rose-400/50 hover:text-rose-200"
                    aria-label="delete"
                  >
                    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" aria-hidden="true">
                      <path d="M5 5l10 10M15 5L5 15" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                </li>
              ))}
              {todos.length === 0 ? (
                <li className="rounded-2xl border border-dashed border-slate-700/80 bg-slate-900/50 px-4 py-6 text-sm text-slate-600">
                  {'No tasks yet — set yourself a small goal!'}
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </aside>

      <aside className="fixed right-8 top-1/2 z-20 flex -translate-y-1/2 flex-col items-end text-slate-300">
        <div className="relative">
          <div className="group inline-flex items-center">
            <button
              type="button"
              className={`flex h-12 w-12 items-center justify-center rounded-full border border-slate-800/80 bg-slate-900/80 transition hover:border-brand-400/60 hover:text-brand-200 ${
                Object.values(playing).some(Boolean) ? "border-brand-400/80 text-brand-200" : ""
              }`}
              aria-haspopup="true"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                <path
                  d="M5 15V9h3l4-4v14l-4-4H5Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M17 9.5a3.5 3.5 0 0 1 0 5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M19.5 8a6 6 0 0 1 0 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            <div className="absolute right-full top-1/2 -translate-y-1/2 pl-4">
              <div className="pointer-events-none flex flex-col items-center gap-3 rounded-3xl border border-slate-800/80 bg-slate-900/70 px-4 py-4 opacity-0 shadow-lg shadow-slate-900/40 transition-all duration-200 translate-x-3 group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-x-0">
                {WHITE_NOISE_TRACKS.map((track) => (
                  <button
                    key={track.id}
                    type="button"
                    onClick={() => toggleTrack(track.id)}
                    className={`flex h-12 w-12 items-center justify-center rounded-full border text-slate-300 transition hover:border-brand-400 hover:text-brand-200 ${
                      playing[track.id]
                        ? "border-brand-400/80 bg-brand-500/20 text-brand-200"
                        : "border-slate-700/70 bg-transparent"
                    }`}
                    title={`${track.label}${playing[track.id] ? "（播放中）" : ""}`}
                  >
                    {track.icon}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

DarkRoomPage.getLayout = (page) => page;

function toggleFullscreen() {
  if (typeof document === "undefined") return;
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

function exitFullscreen() {
  if (typeof document === "undefined") return;
  if (document.fullscreenElement) {
    document.exitFullscreen();
  }
}











































