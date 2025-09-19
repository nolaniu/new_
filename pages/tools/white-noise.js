import { useEffect, useMemo, useRef, useState } from 'react';

const TRACKS = [
  {
    id: 'waves',
    title: '海浪白噪声',
    description: '浅海拍打岸边的节奏，适合阅读或深呼吸。',
    url: 'https://cdn.pixabay.com/download/audio/2021/08/09/audio_3f36c7b2b5.mp3?filename=ocean-waves-7113.mp3',
    emoji: '??',
  },
  {
    id: 'rain',
    title: '森林细雨',
    description: '轻柔雨声搭配树梢风声，适合平静冥想。',
    url: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_8f6dbd6f81.mp3?filename=light-rain-ambient-110577.mp3',
    emoji: '???',
  },
  {
    id: 'cafe',
    title: '咖啡店氛围',
    description: '低声交谈与器皿碰撞声，模拟城市第三空间。',
    url: 'https://cdn.pixabay.com/download/audio/2021/09/02/audio_992e9bcdb0.mp3?filename=coffee-shop-ambience-6710.mp3',
    emoji: '?',
  },
  {
    id: 'focus',
    title: '脉冲专注音',
    description: '缓慢左右声道切换的节奏，帮助进入心流状态。',
    url: 'https://cdn.pixabay.com/download/audio/2021/08/09/audio_8521cca5c0.mp3?filename=binaural-beats-8131.mp3',
    emoji: '??',
  },
];

export default function WhiteNoisePage() {
  const audioRefs = useRef({});
  const [volumes, setVolumes] = useState(() => Object.fromEntries(TRACKS.map((track) => [track.id, 0.6])));
  const [playing, setPlaying] = useState(() => Object.fromEntries(TRACKS.map((track) => [track.id, false])));

  useEffect(() => {
    TRACKS.forEach((track) => {
      const audio = new Audio(track.url);
      audio.loop = true;
      audio.volume = volumes[track.id];
      audioRefs.current[track.id] = audio;
    });

    return () => {
      Object.values(audioRefs.current).forEach((audio) => {
        if (!audio) return;
        audio.pause();
        audio.src = '';
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    Object.entries(volumes).forEach(([id, volume]) => {
      const audio = audioRefs.current[id];
      if (audio) audio.volume = volume;
    });
  }, [volumes]);

  const activeCount = useMemo(() => Object.values(playing).filter(Boolean).length, [playing]);

  function toggleTrack(id) {
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
  }

  function stopAll() {
    setPlaying(Object.fromEntries(TRACKS.map((track) => [track.id, false])));
    Object.values(audioRefs.current).forEach((audio) => {
      if (!audio) return;
      audio.pause();
      audio.currentTime = 0;
    });
  }

  function setAllVolumes(value) {
    const volume = Number(value);
    setVolumes(Object.fromEntries(TRACKS.map((track) => [track.id, volume])));
  }

  return (
    <div className="space-y-12">
      <header className="space-y-2">
        <p className="text-sm font-semibold text-brand-600">白噪声播放器</p>
        <h1 className="text-3xl font-display font-bold text-slate-900">叠加多种环境音，一键营造沉浸专注氛围</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-600">
          灵感来自 SoundDrown，使用浏览器原生 Audio API，可同时播放多个音轨并单独调节音量。适合写作、阅读、冥想或睡前放松使用。
        </p>
      </header>

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-slate-500">当前混音</p>
            <p className="text-lg font-display text-slate-900">已激活 {activeCount} / {TRACKS.length} 条音轨</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setAllVolumes(0.5)}
              className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-500 hover:border-brand-200 hover:text-brand-700"
            >
              重置音量
            </button>
            <button
              type="button"
              onClick={stopAll}
              className="rounded-full border border-rose-200 px-4 py-2 text-xs font-semibold text-rose-500 hover:border-rose-300 hover:bg-rose-50"
            >
              停止全部
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {TRACKS.map((track) => (
            <div key={track.id} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-lg font-display text-slate-900">
                    <span>{track.emoji}</span>
                    <span>{track.title}</span>
                  </div>
                  <p className="text-xs leading-relaxed text-slate-500">{track.description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleTrack(track.id)}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                    playing[track.id]
                      ? 'border-transparent bg-brand-600 text-white shadow-soft hover:bg-brand-700'
                      : 'border-slate-200 text-slate-500 hover:border-brand-200 hover:text-brand-700'
                  }`}
                >
                  {playing[track.id] ? '暂停' : '播放'}
                </button>
              </div>
              <div className="mt-4">
                <label className="text-[10px] uppercase tracking-wide text-slate-400">
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
                  className="mt-2 h-2 w-full cursor-pointer rounded-full bg-slate-200 accent-brand-600"
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}