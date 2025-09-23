import { useEffect, useMemo, useRef, useState } from "react";

const TIMER_STATES = {
  WORK: "work",
  SHORT_BREAK: "short",
  LONG_BREAK: "long",
};

const TIMER_CONFIGS = {
  [TIMER_STATES.WORK]: {
    label: "专注",
    duration: 25 * 60,
    color: "text-sky-200",
    bgColor: "bg-sky-400/25",
    progressColor: "bg-sky-300",
  },
  [TIMER_STATES.SHORT_BREAK]: {
    label: "休息",
    duration: 5 * 60,
    color: "text-emerald-300",
    bgColor: "bg-emerald-400/20",
    progressColor: "bg-emerald-300",
  },
  [TIMER_STATES.LONG_BREAK]: {
    label: "长休息",
    duration: 15 * 60,
    color: "text-indigo-200",
    bgColor: "bg-indigo-400/20",
    progressColor: "bg-indigo-300",
  },
};

const PomodoroTimer = () => {
  const [timerState, setTimerState] = useState(TIMER_STATES.WORK);
  const [timeLeft, setTimeLeft] = useState(TIMER_CONFIGS[TIMER_STATES.WORK].duration);
  const [isRunning, setIsRunning] = useState(false);
  const [rounds, setRounds] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const handleTimerComplete = () => {
    if (timerState === TIMER_STATES.WORK) {
      setRounds((prev) => prev + 1);
      if (rounds >= 3) {
        // 每完成四个专注周期后进入长休息
        switchTimer(TIMER_STATES.LONG_BREAK);
        setRounds(0);
      } else {
        switchTimer(TIMER_STATES.SHORT_BREAK);
      }
    } else {
      switchTimer(TIMER_STATES.WORK);
    }
  };

  const switchTimer = (newState) => {
    setTimerState(newState);
    setTimeLeft(TIMER_CONFIGS[newState].duration);
    setIsRunning(false);
  };

  const toggleTimer = () => {
    setIsRunning((prev) => !prev);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(TIMER_CONFIGS[timerState].duration);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const config = TIMER_CONFIGS[timerState];
  const totalDuration = TIMER_CONFIGS[timerState].duration;
  const progress = useMemo(() => {
    if (!totalDuration) {
      return 0;
    }
    const ratio = 1 - timeLeft / totalDuration;
    return Math.min(1, Math.max(0, ratio));
  }, [timeLeft, totalDuration]);

  return (
    <div className="flex flex-col items-center space-y-5">
      <div className="flex space-x-2">
        {Object.entries(TIMER_STATES).map(([key, value]) => (
          <button
            key={key}
            onClick={() => switchTimer(value)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              timerState === value
                ? `${TIMER_CONFIGS[value].color} ${TIMER_CONFIGS[value].bgColor}`
                : "text-slate-400 hover:text-slate-300"
            }`}
          >
            {TIMER_CONFIGS[value].label}
          </button>
        ))}
      </div>

      <div className={`text-6xl font-light tracking-wider ${config.color}`}>
        {formatTime(timeLeft)}
      </div>

      <div className="h-2 w-full max-w-xs rounded-full bg-slate-700/40">
        <div
          className={`h-2 rounded-full transition-all duration-300 ease-out ${config.progressColor}`}
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={toggleTimer}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${config.bgColor} ${config.color}`}
        >
          {isRunning ? "暂停" : "开始"}
        </button>
        <button
          onClick={resetTimer}
          className="px-6 py-2 rounded-lg font-medium text-slate-400 hover:text-slate-300 hover:bg-slate-700/50 transition-colors"
        >
          重置
        </button>
      </div>

      <div className="text-sm text-slate-400">
        已完成 {rounds} / 4 轮
      </div>
    </div>
  );
};

export default PomodoroTimer;