import { useEffect, useMemo, useRef } from "react";

type Face = {
  label: string;
  accent: "cyan" | "pink";
};

type Props = {
  faces?: Face[];
};

const defaultFaces: Face[] = [
  { label: "React", accent: "cyan" },
  { label: "JS", accent: "pink" },
  { label: "TG", accent: "cyan" },
  { label: "HTML", accent: "pink" },
  { label: "TS", accent: "cyan" },
  { label: "CSS", accent: "pink" }
];

export default function IconCube({ faces = defaultFaces }: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const cubeRef = useRef<HTMLDivElement | null>(null);

  const cssFaces = useMemo(() => faces.slice(0, 6), [faces]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const cube = cubeRef.current;
    if (!wrap || !cube) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      tx = py * -18;
      ty = px * 22;
    };

    const tick = () => {
      cx += (tx - cx) * 0.10;
      cy += (ty - cy) * 0.10;
      cube.style.transform = `rotateX(${cx.toFixed(2)}deg) rotateY(${cy.toFixed(
        2
      )}deg)`;
      raf = requestAnimationFrame(tick);
    };

    wrap.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      wrap.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative h-44 w-44 select-none animate-floaty [perspective:1200px] sm:h-72 sm:w-72 md:h-[22rem] md:w-[22rem]"
    >
      <div className="absolute inset-0 rounded-3xl bg-white/5 blur-2xl" />
      <div
        ref={cubeRef}
        className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 [transform-style:preserve-3d] transition-transform duration-200 ease-out sm:h-52 sm:w-52 md:h-60 md:w-60"
      >
        {cssFaces.map((f, i) => {
          const accent =
            f.accent === "cyan"
              ? "rgba(0,243,255,1)"
              : "rgba(255,0,229,1)";

          const common =
            "absolute inset-0 grid place-items-center rounded-[28px] border border-white/10 bg-black/35 text-base font-semibold tracking-wide backdrop-blur-md";

          const faceTransform = [
            "translateZ(58px)",
            "rotateY(180deg) translateZ(58px)",
            "rotateY(90deg) translateZ(58px)",
            "rotateY(-90deg) translateZ(58px)",
            "rotateX(90deg) translateZ(58px)",
            "rotateX(-90deg) translateZ(58px)"
          ][i];

          return (
            <div
              key={`${f.label}-${i}`}
              className={common}
              style={{
                transform: faceTransform,
                boxShadow: `0 0 0 1px rgba(255,255,255,0.06), 0 0 20px ${accent.replace(
                  "1)",
                  "0.22)"
                )}`,
                color: "rgba(255,255,255,0.92)"
              }}
            >
              <div className="grid place-items-center gap-2">
                <div
                  className="grid h-9 w-9 place-items-center rounded-2xl border border-white/10 bg-white/5 px-2 text-[10px] sm:h-14 sm:w-14 sm:text-sm"
                  style={{
                    boxShadow: `0 0 0 1px ${accent.replace(
                      "1)",
                      "0.34)"
                    )}, 0 0 16px ${accent.replace("1)", "0.22)")}`
                  }}
                >
                  {f.label}
                </div>
                <div className="text-[10px] text-white/55 sm:text-sm">icon</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="absolute inset-0 rounded-3xl ring-1 ring-white/10" />
    </div>
  );
}
