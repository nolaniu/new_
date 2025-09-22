import { useEffect, useState } from 'react';

const FlipCard = ({ value, label }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative mx-1 flex h-20 w-16 items-center justify-center rounded-lg bg-slate-800 text-4xl font-light text-slate-100 shadow-lg">
        <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-slate-700/50 to-transparent" />
        <span className="relative z-10">{value.toString().padStart(2, '0')}</span>
      </div>
      {label && <div className="mt-1 text-xs text-slate-400">{label}</div>}
    </div>
  );
};

const FlipClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  return (
    <div className="flex items-center justify-center space-x-4">
      <FlipCard value={hours} label="时" />
      <div className="text-3xl text-slate-400">:</div>
      <FlipCard value={minutes} label="分" />
      <div className="text-3xl text-slate-400">:</div>
      <FlipCard value={seconds} label="秒" />
    </div>
  );
};

export default FlipClock;