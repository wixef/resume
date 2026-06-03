import { useEffect, useRef } from "react";

function isTouchDevice() {
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia("(pointer: coarse)").matches
  );
}

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isTouchDevice()) return;
    if (window.innerWidth < 1100) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const state = ring.dataset.state ?? "idle";
      const scale = state === "down" ? 0.85 : state === "hover" ? 1.12 : 1;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale})`;
    };

    const isInteractive = (t: EventTarget | null) => {
      if (!(t instanceof Element)) return false;
      return !!t.closest(
        "a,button,input,textarea,select,summary,label,[role='button'],[data-cursor='pointer']"
      );
    };

    const onEnter = (e: PointerEvent) => {
      if (isInteractive(e.target)) {
        ring.dataset.state = "hover";
      } else {
        ring.dataset.state = "idle";
      }
    };

    const onDown = () => {
      ring.dataset.state = "down";
    };
    const onUp = () => {
      ring.dataset.state = ring.dataset.state === "hover" ? "hover" : "idle";
    };

    document.documentElement.classList.add("cursor-none");
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onEnter, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });

    return () => {
      document.documentElement.classList.remove("cursor-none");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onEnter);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  // Tailwind "cursor-none" применяем через класс к html.
  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="custom-cursor-ring pointer-events-none fixed left-0 top-0 z-[60] hidden h-9 w-9 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm md:block"
        style={{
          boxShadow:
            "0 0 0 1px rgba(0,243,255,0.25), 0 0 18px rgba(0,243,255,0.14), 0 0 26px rgba(255,0,229,0.10)",
          mixBlendMode: "screen"
        }}
      />
      <div
        ref={dotRef}
        aria-hidden
        className="custom-cursor-dot pointer-events-none fixed left-0 top-0 z-[60] hidden h-2 w-2 rounded-full md:block"
        style={{
          background: "linear-gradient(90deg, rgba(0,243,255,1), rgba(255,0,229,1))",
          boxShadow:
            "0 0 10px rgba(0,243,255,0.45), 0 0 14px rgba(255,0,229,0.25)"
        }}
      />
    </>
  );
}
