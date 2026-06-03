import { useEffect, useMemo, useRef, type CSSProperties } from "react";

type Props = {
  intensity?: number;
};

export default function BackgroundGrid({ intensity = 14 }: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const codeBits = [
    "<html>",
    "const ui = () => {}",
    "import React",
    "grid-template",
    "useEffect()",
    "type Props = { }",
    "npm run build",
    "deploy.sh",
    "node server.mjs",
    "return <Section />",
    "tailwind.config",
    "Telegram Bot API"
  ];

  const style = useMemo(() => {
    return {
      ["--grid-intensity" as never]: intensity
    } as CSSProperties;
  }, [intensity]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    let raf = 0;
    let nextX = 0;
    let nextY = 0;

    const onMove = (e: PointerEvent) => {
      const dx = e.clientX - window.innerWidth / 2;
      const dy = e.clientY - window.innerHeight / 2;
      nextX = dx / ((Number(intensity) || 14) * 1.8);
      nextY = dy / ((Number(intensity) || 14) * 1.8);

      if (raf) return;

      raf = requestAnimationFrame(() => {
        el.style.setProperty("--mx", `${nextX.toFixed(2)}px`);
        el.style.setProperty("--my", `${nextY.toFixed(2)}px`);
        raf = 0;
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [intensity]);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
      style={style}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(1200px 800px at -10% 12%, rgba(0,243,255,0.12), transparent 60%),
            radial-gradient(1000px 760px at 110% 14%, rgba(255,0,229,0.10), transparent 62%),
            radial-gradient(900px 720px at 50% 100%, rgba(70,110,255,0.08), transparent 65%),
            linear-gradient(180deg, rgba(6,10,16,0.98), rgba(8,11,17,0.98))
          `
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.28]"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(255,255,255,0.65) 0 1px, transparent 1.5px),
            radial-gradient(circle at 70% 18%, rgba(255,255,255,0.45) 0 1px, transparent 1.5px),
            radial-gradient(circle at 82% 62%, rgba(255,255,255,0.42) 0 1px, transparent 1.5px),
            radial-gradient(circle at 38% 76%, rgba(255,255,255,0.32) 0 1px, transparent 1.5px)
          `,
          backgroundSize: "420px 420px, 520px 520px, 620px 620px, 760px 760px"
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.04] md:opacity-[0.06]"
        style={{
          transform: "translate3d(var(--mx, 0px), var(--my, 0px), 0)",
          backgroundImage: [
            "linear-gradient(90deg, rgba(125,175,220,0.10) 1px, transparent 1px)",
            "linear-gradient(180deg, rgba(125,175,220,0.04) 1px, transparent 1px)"
          ].join(", "),
          backgroundSize: "120px 100%, 100% 120px"
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.02] md:opacity-[0.03]"
        style={{
          transform: "translate3d(calc(var(--mx, 0px) * 0.35), calc(var(--my, 0px) * 0.35), 0)",
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(170, 210, 255, 0.45) 1px, transparent 0)",
          backgroundSize: "26px 26px"
        }}
      />

      <div className="absolute inset-0 overflow-hidden max-md:hidden">
        {codeBits.slice(0, 6).map((bit, index) => {
          const left = 8 + (index % 3) * 30;
          const top = 12 + Math.floor(index / 3) * 34;
          const accent = index % 2 === 0 ? "code-cyan" : "code-pink";

          return (
            <div
              key={bit}
              className={`code-fragment ${accent}`}
              style={{
                left: `${left}%`,
                top: `${top}%`,
                animationDelay: `${index * 0.8}s`
              }}
            >
              {bit}
            </div>
          );
        })}
      </div>
    </div>
  );
}
