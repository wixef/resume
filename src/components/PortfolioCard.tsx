import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import type { PortfolioItem } from "@/data/portfolio";
import { cn } from "@/lib/cn";

type Props = {
  item: PortfolioItem;
  index: number;
  onOpen: () => void;
};

export default function PortfolioCard({ item, index, onOpen }: Props) {
  const subtitle = useMemo(() => item.stack.slice(0, 3).join(" · "), [item.stack]);
  const reverse = index % 2 === 1;
  const mediaRef = useRef<HTMLDivElement | null>(null);
  const previewVideoRef = useRef<HTMLVideoElement | null>(null);
  const [allowPreviewVideo, setAllowPreviewVideo] = useState(false);
  const mediaInView = useInView(mediaRef, {
    once: false,
    amount: 0.35,
    margin: "180px 0px"
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(pointer: coarse), (max-width: 820px)");
    const update = () => setAllowPreviewVideo(!media.matches);
    update();
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    const video = previewVideoRef.current;
    if (!video) return;
    if (!allowPreviewVideo) {
      video.pause();
      return;
    }

    if (mediaInView) {
      void video.play().catch(() => {});
      return;
    }

    video.pause();
  }, [allowPreviewVideo, mediaInView]);

  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className={cn(
          "glass-panel group rounded-[24px] p-3 transition duration-300 hover:-translate-y-1 hover:shadow-neon md:rounded-[32px] md:p-6",
          "xl:grid xl:min-h-[34rem] xl:grid-cols-2 xl:items-stretch xl:gap-8"
        )}
      >
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-neonCyan/10 blur-2xl" />
          <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-neonPink/10 blur-2xl" />
        </div>

        <div
          ref={mediaRef}
          className={cn(
            "relative",
            reverse ? "xl:order-2" : "xl:order-1"
          )}
        >
          {item.video ? (
            <button
              type="button"
              onClick={onOpen}
              className="glass-soft relative block h-full w-full overflow-hidden rounded-[28px] border border-white/10 text-left"
            >
              <div className="absolute inset-0 z-[1] bg-[linear-gradient(180deg,transparent,rgba(6,8,12,0.14)_45%,rgba(6,8,12,0.72))]" />
              <div className="absolute left-5 top-5 z-[2]">
                <span className="glass-pill inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs text-white/85 md:px-4 md:py-2 md:text-sm">
                  <span className="h-2.5 w-2.5 rounded-full bg-neonCyan shadow-[0_0_16px_rgba(0,243,255,0.85)]" />
                  Смотреть проект
                </span>
              </div>
              <div className="absolute bottom-5 right-5 z-[2]">
                <span className="glass-pill rounded-full px-3 py-1.5 text-xs text-white/75 md:px-4 md:py-2 md:text-sm">
                  fullscreen
                </span>
              </div>
              {item.video && allowPreviewVideo && (mediaInView || !item.poster) ? (
                <video
                  ref={previewVideoRef}
                  className="pointer-events-none aspect-[16/10] h-full min-h-[13rem] w-full object-cover md:min-h-[18rem] xl:min-h-[31rem]"
                  src={item.video}
                  poster={item.poster}
                  muted
                  loop
                  playsInline
                  preload="none"
                />
              ) : item.poster ? (
                <img
                  className="pointer-events-none aspect-[16/10] h-full min-h-[13rem] w-full object-cover md:min-h-[18rem] xl:min-h-[31rem]"
                  src={item.poster}
                  alt={item.title}
                  loading="lazy"
                />
              ) : (
                <div className="flex aspect-[16/10] h-full min-h-[13rem] w-full items-end bg-[radial-gradient(circle_at_top,rgba(0,243,255,0.12),transparent_42%),linear-gradient(180deg,#101924_0%,#070b10_100%)] p-4 md:min-h-[18rem] md:p-6 xl:min-h-[31rem]">
                  <div className="font-display text-2xl font-semibold text-white/92 md:text-5xl">
                    {item.title}
                  </div>
                </div>
              )}
            </button>
          ) : null}
        </div>

        <div
          className={cn(
            "relative flex h-full flex-col justify-between pt-4 xl:pt-0",
            reverse ? "xl:order-1" : "xl:order-2"
          )}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-xs text-white/55 md:text-base">{item.category}</div>
              <div className="mt-1 font-display text-xl font-semibold text-white/92 md:text-4xl">
                {item.title}
              </div>
            </div>
            {item.video ? (
              <button
                type="button"
                onClick={onOpen}
                className="glass-pill hidden h-10 min-w-10 place-items-center rounded-2xl px-3 text-[11px] text-white/65 transition hover:bg-white/10 md:grid md:h-11 md:min-w-11 md:text-xs"
              >
                video
              </button>
            ) : null}
          </div>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-white/74 md:mt-5 md:text-2xl">
            {item.description}
          </p>
          <div className="mt-3 text-xs font-medium tracking-wide text-neonCyan/85 md:text-base">
            Дизайн сайта выполнен мной.
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {item.stack.slice(0, 4).map((s) => (
              <span
                key={s}
                className="glass-pill rounded-full px-2.5 py-1.5 text-[11px] text-white/72 md:px-3.5 md:py-2 md:text-sm"
              >
                {s}
              </span>
            ))}
          </div>

          <div className="mt-5 flex flex-col gap-3 md:mt-8 md:flex-row md:flex-wrap md:items-center md:justify-between">
            <div className="hidden text-sm text-white/45 md:block md:text-base">{subtitle}</div>
            <div className="grid grid-cols-1 gap-3 sm:flex sm:flex-wrap">
              <button
                type="button"
                onClick={onOpen}
                className="glass-pill rounded-3xl px-5 py-3 text-sm text-white/85 transition hover:bg-white/10 md:text-base"
              >
                Смотреть
              </button>
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="glass-pill rounded-3xl px-5 py-3 text-sm text-neonCyan transition hover:bg-white/10 hover:text-white/92 md:text-base"
                >
                  Открыть сайт →
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
