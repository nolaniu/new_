import React, { useEffect, useMemo, useState } from "react";

const VARIANTS = {
  md: {
    width: "4.8rem",
    height: "7rem",
    fontSize: "4.4rem",
    radius: "1rem",
    gap: "1rem",
    colonClass: "text-6xl font-light text-slate-200",
  },
  xl: {
    width: "6.8rem",
    height: "9.8rem",
    fontSize: "6.2rem",
    radius: "1.25rem",
    gap: "1.6rem",
    colonClass: "text-8xl font-light text-slate-100",
  },
};

const pad = (value) => value.toString().padStart(2, "0");

export default function FlipClock({ variant = "md", className = "" }) {
  const size = VARIANTS[variant] ?? VARIANTS.md;
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setTime(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const digits = useMemo(() => {
    const hours = pad(time.getHours());
    const minutes = pad(time.getMinutes());
    return [hours[0], hours[1], minutes[0], minutes[1]];
  }, [time]);

  return (
    <div className={`flex items-center justify-center ${className}`} style={{ gap: size.gap }}>
      <FlipCard value={digits[0]} size={size} />
      <FlipCard value={digits[1]} size={size} />
      <span className={`${size.colonClass} mx-2 leading-none`}>:</span>
      <FlipCard value={digits[2]} size={size} />
      <FlipCard value={digits[3]} size={size} />
    </div>
  );
}

function FlipCard({ value, size }) {
  const [current, setCurrent] = useState(value);
  const [next, setNext] = useState(value);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (value === current) {
      return;
    }
    setNext(value);
    setFlipping(true);
    const duration = 650;
    const timer = window.setTimeout(() => {
      setFlipping(false);
      setCurrent(value);
    }, duration);
    return () => window.clearTimeout(timer);
  }, [value, current]);

  return (
    <div
      className={`flip-card ${flipping ? "is-flipping" : ""}`}
      style={{
        "--card-width": size.width,
        "--card-height": size.height,
        "--card-radius": size.radius,
        "--card-font": size.fontSize,
      }}
    >
      <div className="panel panel-top">
        <span className="glyph">{current}</span>
      </div>
      <div className="panel panel-bottom">
        <span className="glyph">{flipping ? next : current}</span>
      </div>

      <div className="flip-panel flip-top">
        <span className="glyph">{current}</span>
      </div>
      <div className="flip-panel flip-bottom">
        <span className="glyph">{next}</span>
      </div>

      <div className="divider" />

      <style jsx>{`
        .flip-card {
          position: relative;
          width: var(--card-width);
          height: var(--card-height);
          border-radius: var(--card-radius);
          background: #1d1f22;
          overflow: hidden;
          perspective: 1400px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 16px 28px rgba(12, 12, 18, 0.45);
        }

        .panel,
        .flip-panel {
          position: absolute;
          left: 0;
          width: 100%;
          height: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #1d1f22;
          color: #f8f8f8;
          font-family: 'Helvetica Neue', 'Inter', system-ui, sans-serif;
          font-weight: 600;
          font-size: var(--card-font);
          letter-spacing: 0.02em;
          overflow: hidden;
        }

        .panel-top,
        .flip-top {
          top: 0;
          border-top-left-radius: var(--card-radius);
          border-top-right-radius: var(--card-radius);
        }

        .panel-bottom,
        .flip-bottom {
          bottom: 0;
          border-bottom-left-radius: var(--card-radius);
          border-bottom-right-radius: var(--card-radius);
        }

        .glyph {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          line-height: 1;
        }

        .panel-top .glyph,
        .flip-top .glyph {
          bottom: -32%;
        }

        .panel-bottom .glyph,
        .flip-bottom .glyph {
          top: -78%;
        }

        .flip-panel {
          backface-visibility: hidden;
          z-index: 3;
          display: none;
        }

        .flip-top {
          transform-origin: center bottom;
          transform: rotateX(0deg);
        }

        .flip-bottom {
          transform-origin: center top;
          transform: rotateX(90deg);
        }

        .flip-card.is-flipping .flip-top,
        .flip-card.is-flipping .flip-bottom {
          display: flex;
        }

        .flip-card.is-flipping .flip-top {
          animation: flip-top 0.65s forwards ease-in;
        }

        .flip-card.is-flipping .flip-bottom {
          animation: flip-bottom 0.65s forwards ease-out;
        }

        .divider {
          position: absolute;
          left: 8%;
          right: 8%;
          height: 8px;
          background: #1d1f22;
          border-radius: 999px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 2;
        }

        @keyframes flip-top {
          0% {
            transform: rotateX(0deg);
          }
          100% {
            transform: rotateX(-90deg);
          }
        }

        @keyframes flip-bottom {
          0% {
            transform: rotateX(90deg);
          }
          100% {
            transform: rotateX(0deg);
          }
        }
      `}</style>
    </div>
  );
}