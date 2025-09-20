import { useEffect, useMemo, useRef, useState } from "react";

export const WHITE_NOISE_TRACKS = [
  {
    id: "waves",
    title: "海浪拍岸",
    description: "海潮往复的节奏伴随低频浪花，适合冥想或舒缓情绪。",
    url: "/audio/ocean-waves-250310.mp3",
    emoji: "🌊",
  },
  {
    id: "rain",
    title: "细雨入夜",
    description: "雨滴轻敲窗沿与树叶，营造温柔的环绕声场。",
    url: "/audio/rain-sound-272604.mp3",
    emoji: "🌧️",
  },
  {
    id: "campfire",
    title: "篝火暖夜",
    description: "篝火噼啪作响，伴随微风与木柴的轻微燃烧声。",
    url: "/audio/fireplace-with-crackling-sounds-2-min-rk-178392.mp3",
    emoji: "🔥",
  },
  {
    id: "focus",
    title: "专注脑波",
    description: "细腻的双声拍律动，引导进入深度专注状态。",
    url: "/audio/brainwave-delta.mp3",
    emoji: "🎧",
  },
];

const THEMES = {
  light: {
    panel: "rounded-3xl border border-slate-200 bg-white p-8 shadow-sm",
    title: "text-slate-900",
    muted: "text-slate-500",
    badge: "text-slate-500",
    card: "rounded-2xl border border-slate-200 bg-slate-50/80 p-5 shadow-sm",
    playingButton:
      "border-transparent bg-brand-600 text-white shadow-soft hover:bg-brand-700 focus-visible:ring-2 focus-visible:ring-brand-400/80",
    idleButton:
      "border border-slate-200 text-slate-500 hover:border-brand-200 hover:text-brand-700 focus-visible:ring-2 focus-visible:ring-brand-300/60",
    sliderTrack: "bg-slate-200",
    sliderThumb: "accent-brand-600",
    statsTitle: "text-slate-500",
    statsValue: "text-slate-900",
    actionSecondary:
      "rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-500 transition hover:border-brand-200 hover:text-brand-700 focus-visible:ring-2 focus-visible:ring-brand-300/60",
    actionDanger:
      "rounded-full border border-rose-200 px-4 py-2 text-xs font-semibold text-rose-500 transition hover:border-rose-300 hover:bg-rose-50 focus-visible:ring-2 focus-visible:ring-rose-200/80",
  },
  dark: {
    panel: "rounded-3xl border border-slate-800/70 bg-slate-900/70 p-8 shadow-xl backdrop-blur",
    title: "text-slate-100",
    muted: "text-slate-400",
    badge: "text-slate-400",
    card: "rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg",
    playingButton:
      "border-transparent bg-brand-500 text-slate-900 shadow-soft hover:bg-brand-400 focus-visible:ring-2 focus-visible:ring-brand-300/80",
    idleButton:
      "border border-slate-700 text-slate-300 hover:border-brand-400/70 hover:text-brand-200 focus-visible:ring-2 focus-visible:ring-brand-300/40",
    sliderTrack: "bg-slate-700",
    sliderThumb: "accent-brand-400",
    statsTitle: "text-slate-400",
    statsValue: "text-slate-100",
    actionSecondary:
      "rounded-full border border-slate-700 px-4 py-2 text-xs font-semibold text-slate-300 transition hover:border-brand-400/70 hover:text-brand-200 focus-visible:ring-2 focus-visible:ring-brand-300/50",
    actionDanger:
      "rounded-full border border-rose-500/50 px-4 py-2 text-xs font-semibold text-rose-200 transition hover:border-rose-400 hover:bg-rose-400/10 focus-visible:ring-2 focus-visible:ring-rose-300/60",
  },
};

export default function WhiteNoisePlayer({
  tracks = WHITE_NOISE_TRACKS,
  tone = "light",
  className = "",
  showStats = true,
  showControls = true,
}) {
  const theme = THEMES[tone] ?? THEMES.light;
  const audioRefs = useRef({});
  const [volumes, setVolumes] = useState(() => Object.fromEntries(tracks.map((track) => [track.id, 0.6])));
  const [playing, setPlaying] = useState(() => Object.fromEntries(tracks.map((track) => [track.id, false])));

  useEffect(() => {
    tracks.forEach((track) => {
      const audio = new Audio(track.url);
      audio.loop = true;
      audio.volume = volumes[track.id];
      audioRefs.current[track.id] = audio;
    });

    return () => {
      Object.values(audioRefs.current).forEach((audio) => {
        if (!audio) {
          return;
        }
        audio.pause();
        audio.src = "";
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    Object.entries(volumes).forEach(([id, volume]) => {
      const audio = audioRefs.current[id];
      if (audio) {
        audio.volume = volume;
      }
    });
  }, [volumes]);

  const activeCount = useMemo(() => Object.values(playing).filter(Boolean).length, [playing]);

  function toggleTrack(id) {
    const audio = audioRefs.current[id];
    if (!audio) {
      return;
    }
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
  }

  function stopAll() {
    setPlaying(Object.fromEntries(tracks.map((track) => [track.id, false])));
    Object.values(audioRefs.current).forEach((audio) => {
      if (!audio) {
        return;
      }
      audio.pause();
      audio.currentTime = 0;
    });
  }

  function setAllVolumes(value) {
    const volume = Number(value);
    setVolumes(Object.fromEntries(tracks.map((track) => [track.id, volume])));
  }

  return (
    <section className={`${theme.panel} ${className}`}>
      {showStats ? (
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className={`text-sm font-semibold ${theme.statsTitle}`}>当前播放</p>
            <p className={`text-lg font-display ${theme.statsValue}`}>
              正在播放 {activeCount} / {tracks.length} 条音轨
            </p>
          </div>
          {showControls ? (
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setAllVolumes(0.5)}
                className={theme.actionSecondary}
              >
                恢复默认音量
              </button>
              <button type="button" onClick={stopAll} className={theme.actionDanger}>
                停止全部
              </button>
            </div>
          ) : null}
        </div>
      ) : null}

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {tracks.map((track) => (
          <div key={track.id} className={theme.card}>
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1 text-left">
                <div className={`flex items-center gap-2 text-lg font-display ${theme.title}`}>
                  <span>{track.emoji}</span>
                  <span>{track.title}</span>
                </div>
                <p className={`text-xs leading-relaxed ${theme.muted}`}>{track.description}</p>
              </div>
              <button
                type="button"
                onClick={() => toggleTrack(track.id)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition focus:outline-none ${
                  playing[track.id] ? theme.playingButton : theme.idleButton
                }`}
              >
                {playing[track.id] ? "暂停" : "播放"}
              </button>
            </div>
            <div className="mt-4">
              <label className={`text-[10px] uppercase tracking-wide ${theme.badge}`}>
                音量 {Math.round(volumes[track.id] * 100)}%
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volumes[track.id]}
                onChange={(event) =>
                  setVolumes((prev) => ({ ...prev, [track.id]: Number(event.target.value) }))
                }
                className={`mt-2 h-2 w-full cursor-pointer rounded-full ${theme.sliderTrack} ${theme.sliderThumb}`}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
