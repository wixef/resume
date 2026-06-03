import { useEffect, useState } from "react";

type Props = {
  to: number;
  suffix?: string;
  durationMs?: number;
};

export default function Counter({ to, suffix = "", durationMs = 900 }: Props) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    // В dev + React.StrictMode эффекты вызываются дважды (setup+cleanup+setup).
    // Здесь не блокируем повтор: cleanup отменяет RAF, второй setup нормально стартует.
    setValue(0);

    const start = performance.now();
    const from = 0;

    let raf = 0;
    let cancelled = false;
    const tick = (t: number) => {
      if (cancelled) return;
      const p = Math.min(1, (t - start) / durationMs);
      const eased = 1 - Math.pow(1 - p, 3);
      const next = Math.round(from + (to - from) * eased);
      setValue(next);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [durationMs, to]);

  return (
    <span>
      {value}
      {suffix}
    </span>
  );
}
