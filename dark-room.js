import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// 番茄钟状态
const TIMER_STATES = {
  WORK: 'work',
  SHORT_BREAK: 'short',
  LONG_BREAK: 'long'
};

// 番茄钟设置
const TIMER_SETTINGS = {
  [TIMER_STATES.WORK]: { minutes: 25, label: '专注' },
  [TIMER_STATES.SHORT_BREAK]: { minutes: 5, label: '休息' },
  [TIMER_STATES.LONG_BREAK]: { minutes: 15, label: '长休' }
};

// 番茄钟状态管理
const useTimer = () => {
  // 状态定义
  const [timeLeft, setTimeLeft] = useState(TIMER_SETTINGS[TIMER_STATES.WORK].minutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(TIMER_STATES.WORK);
  const [focusCount, setFocusCount] = useState(0);
  const [totalFocusMinutes, setTotalFocusMinutes] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const timerInterval = useRef(null);

  // 格式化时间
  const formattedTime = useMemo(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, [timeLeft]);

  // 处理阶段完成
  const handlePhaseComplete = useCallback(() => {
    clearInterval(timerInterval.current);
    setIsRunning(false);

    if (soundEnabled) {
      const audio = new Audio('/audio/timer-complete.mp3');
      audio.play().catch(console.error);
    }

    if (notificationEnabled && 'Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification('计时器完成', {
          body: `${TIMER_SETTINGS[currentPhase].label}阶段已完成`
        });
      }
    }

    if (currentPhase === TIMER_STATES.WORK) {
      setFocusCount(prev => prev + 1);
      setTotalFocusMinutes(prev => prev + TIMER_SETTINGS[TIMER_STATES.WORK].minutes);
      
      if (focusCount % 4 === 3) {
        setCurrentPhase(TIMER_STATES.LONG_BREAK);
        setTimeLeft(TIMER_SETTINGS[TIMER_STATES.LONG_BREAK].minutes * 60);
      } else {
        setCurrentPhase(TIMER_STATES.SHORT_BREAK);
        setTimeLeft(TIMER_SETTINGS[TIMER_STATES.SHORT_BREAK].minutes * 60);
      }
    } else {
      setCurrentPhase(TIMER_STATES.WORK);
      setTimeLeft(TIMER_SETTINGS[TIMER_STATES.WORK].minutes * 60);
    }
  }, [currentPhase, focusCount, soundEnabled, notificationEnabled]);

  // 开始计时器
  const startTimer = useCallback(() => {
    if (!isRunning) {
      setIsRunning(true);
      timerInterval.current = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            handlePhaseComplete();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
  }, [isRunning, handlePhaseComplete]);

  // 暂停计时器
  const pauseTimer = useCallback(() => {
    if (isRunning) {
      clearInterval(timerInterval.current);
      setIsRunning(false);
    }
  }, [isRunning]);

  // 重置计时器
  const resetTimer = useCallback(() => {
    clearInterval(timerInterval.current);
    setIsRunning(false);
    setTimeLeft(TIMER_SETTINGS[currentPhase].minutes * 60);
  }, [currentPhase]);

  // 清理副作用
  useEffect(() => {
    return () => {
      if (timerInterval.current) {
        clearInterval(timerInterval.current);
      }
    };
  }, []);

  return {
    timeLeft,
    isRunning,
    currentPhase,
    focusCount,
    totalFocusMinutes,
    soundEnabled,
    notificationEnabled,
    formattedTime,
    startTimer,
    pauseTimer,
    resetTimer,
    setSoundEnabled,
    setNotificationEnabled
  };
};

// 主组件
export default function DarkRoomPage() {
  // Timer Hook
  const timer = useTimer();
  
  // 系统时钟状态
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // 更新系统时钟
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-950/90 to-black" />
        <div
          className="absolute inset-0 opacity-40"
          style={{ background: "radial-gradient(circle at 50% 20%, rgba(124,58,237,0.2), transparent 55%)" }}
        />
      </div>

      {/* 导航栏 */}
      <header className="fixed left-6 top-6 z-30">
        <nav className="text-sm">
          <Link href="/tools" className="text-slate-400/80 transition hover:text-brand-200">专注空间</Link>
          <span className="px-1 text-slate-500/50"></span>
          <span className="text-slate-400/60">小黑屋自习室</span>
        </nav>
      </header>

      {/* 主面板 */}
      <main className="flex min-h-screen flex-col items-center justify-center px-4">
        <div className="flex flex-col items-center gap-16">
          {/* 系统时钟 */}
          <div className="flex items-center gap-3">
            <div className="flex h-24 w-20 items-center justify-center rounded-lg bg-slate-800/50 backdrop-blur">
              <span className="text-6xl font-medium text-slate-200">
                {currentTime.getHours().toString().padStart(2, '0')[0]}
              </span>
            </div>
            <div className="flex h-24 w-20 items-center justify-center rounded-lg bg-slate-800/50 backdrop-blur">
              <span className="text-6xl font-medium text-slate-200">
                {currentTime.getHours().toString().padStart(2, '0')[1]}
              </span>
            </div>
            <div className="text-4xl font-medium text-slate-400">:</div>
            <div className="flex h-24 w-20 items-center justify-center rounded-lg bg-slate-800/50 backdrop-blur">
              <span className="text-6xl font-medium text-slate-200">
                {currentTime.getMinutes().toString().padStart(2, '0')[0]}
              </span>
            </div>
            <div className="flex h-24 w-20 items-center justify-center rounded-lg bg-slate-800/50 backdrop-blur">
              <span className="text-6xl font-medium text-slate-200">
                {currentTime.getMinutes().toString().padStart(2, '0')[1]}
              </span>
            </div>
          </div>

          {/* 番茄钟 */}
          <div className="mt-8 flex flex-col items-center gap-6">
            <div className="relative">
              <div className="text-center p-8">
                <div className="text-6xl font-light tracking-wider text-slate-200">
                  {timer.formattedTime}
                </div>
                <div className="mt-2 text-sm font-medium text-slate-400">
                  {TIMER_SETTINGS[timer.currentPhase].label}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={timer.isRunning ? timer.pauseTimer : timer.startTimer}
                className={`
                  inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium 
                  transition-all duration-200 transform active:scale-95
                  ${timer.isRunning
                    ? 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50'
                    : 'bg-brand-500 text-white hover:bg-brand-400'
                  }
                `}
              >
                {timer.isRunning ? '暂停' : '开始'}
              </button>
              <button
                type="button"
                onClick={timer.resetTimer}
                className="px-6 py-3 rounded-lg text-sm font-medium border border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-300 transition"
              >
                重置
              </button>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="text-center">
                <div className="text-2xl font-medium text-slate-200">{timer.focusCount}</div>
                <div className="mt-1 text-sm text-slate-400">专注次数</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-medium text-slate-200">{timer.totalFocusMinutes}</div>
                <div className="mt-1 text-sm text-slate-400">总专注(分钟)</div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <label className="group flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={timer.soundEnabled}
                  onChange={(e) => timer.setSoundEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-10 h-6 rounded-full bg-slate-700 peer-checked:bg-brand-500 transition relative after:content-[\'\'] after:absolute after:left-[2px] after:top-[2px] after:bg-slate-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
                <span className="text-sm text-slate-400 group-hover:text-slate-300 transition">提示音</span>
              </label>
              <label className="group flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={timer.notificationEnabled}
                  onChange={(e) => timer.setNotificationEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-10 h-6 rounded-full bg-slate-700 peer-checked:bg-brand-500 transition relative after:content-[\'\'] after:absolute after:left-[2px] after:top-[2px] after:bg-slate-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
                <span className="text-sm text-slate-400 group-hover:text-slate-300 transition">通知</span>
              </label>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}