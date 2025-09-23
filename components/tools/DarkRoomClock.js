import { useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';

const FlipClockCountdown = dynamic(() => import('@leenguyen/react-flip-clock-countdown'), {
  ssr: false,
});

const digitBlockStyle = {
  width: 120,
  height: 160,
  fontSize: 120,
  borderRadius: 18,
  background: '#111111',
  color: '#f8fafc',
  boxShadow: '0 18px 36px rgba(0, 0, 0, 0.45)',
};

const dividerStyle = {
  color: 'rgba(11, 11, 11, 0.7)',
  height: '2px',
};

const spacing = {
  clock: 18,
  digitBlock: 12,
};

export default function DarkRoomClock({ className = '' }) {
  const now = useCallback(() => {
    if (typeof window === 'undefined') {
      return 0;
    }

    const current = new Date();
    const msSinceMidnight =
      current.getHours() * 3600 * 1000 +
      current.getMinutes() * 60 * 1000 +
      current.getSeconds() * 1000 +
      current.getMilliseconds();

    return -msSinceMidnight;
  }, []);

  const containerClassName = useMemo(
    () => ['dark-room-clock', className].filter(Boolean).join(' '),
    [className],
  );

  return (
    <FlipClockCountdown
      to={0}
      now={now}
      renderMap={[false, true, true, false]}
      showLabels={false}
      showSeparators={false}
      hideOnComplete={false}
      stopOnHiddenVisibility
      duration={0.45}
      className={containerClassName}
      digitBlockStyle={digitBlockStyle}
      dividerStyle={dividerStyle}
      spacing={spacing}
    />
  );
}

