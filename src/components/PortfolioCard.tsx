import { useEffect, useMemo, useRef } from "react";
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
  const mediaInView = useInView(mediaRef, {
    once: false,
    amount: 0.35,
    margin: "180px 0px"
  });

  useEffect(() => {
    const video = previewVideoRef.current;
    if (!video) return;

    if (mediaInView) {
      void video.play().catch(() => {});
      return;
    }

    video.pause();
  }, [mediaInView]);

  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className={cn(
          "glass-panel group rounded-[32px] p-4 transition duration-300 hover:-translate-y-1 hover:shadow-neon md:p-6",
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
                <span className="glass-pill inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-white/85">
                  <span className="h-2.5 w-2.5 rounded-full bg-neonCyan shadow-[0_0_16px_rgba(0,243,255,0.85)]" />
                  Смотреть проект
                </span>
              </div>
              <div className="absolute bottom-5 right-5 z-[2]">
                <span className="glass-pill rounded-full px-4 py-2 text-sm text-white/75">
                  fullscreen
                </span>
              </div>
              {item.video && (mediaInView || !item.poster) ? (
                <video
                  ref={previewVideoRef}
                  className="pointer-events-none aspect-[16/10] h-full min-h-[18rem] w-full object-cover xl:min-h-[31rem]"
                  src={item.video}
                  poster={item.poster}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
              ) : item.poster ? (
                <img
                  className="pointer-events-none aspect-[16/10] h-full min-h-[18rem] w-full object-cover xl:min-h-[31rem]"
                  src={item.poster}
                  alt={item.title}
                  loading="lazy"
                />
              ) : (
                <div className="flex aspect-[16/10] h-full min-h-[18rem] w-full items-end bg-[radial-gradient(circle_at_top,rgba(0,243,255,0.12),transparent_42%),linear-gradient(180deg,#101924_0%,#070b10_100%)] p-6 xl:min-h-[31rem]">
                  <div className="font-display text-3xl font-semibold text-white/92 md:text-5xl">
                    {item.title}
                  </div>
                </div>
              )}
            </button>
          ) : null}
        </div>

        <div
          className={cn(
            "relative flex h-full flex-col justify-between pt-5 xl:pt-0",
            reverse ? "xl:order-1" : "xl:order-2"
          )}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-sm text-white/55 md:text-base">{item.category}</div>
              <div className="mt-1 font-display text-2xl font-semibold text-white/92 md:text-4xl">
                {item.title}
              </div>
            </div>
            {item.video ? (
              <button
                type="button"
                onClick={onOpen}
                className="glass-pill grid h-11 min-w-11 place-items-center rounded-2xl px-3 text-xs text-white/65 transition hover:bg-white/10"
              >
                video
              </button>
            ) : null}
          </div>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/74 md:text-2xl">
            {item.description}
          </p>
          <div className="mt-3 text-sm font-medium tracking-wide text-neonCyan/85 md:text-base">
            Дизайн сайта выполнен мной.
          </div>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {item.stack.slice(0, 4).map((s) => (
              <span
                key={s}
                className="glass-pill rounded-full px-3.5 py-2 text-sm text-white/72"
              >
                {s}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <div className="text-base text-white/45">{subtitle}</div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onOpen}
                className="glass-pill rounded-3xl px-5 py-3 text-base text-white/85 transition hover:bg-white/10"
              >
                Смотреть
              </button>
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="glass-pill rounded-3xl px-5 py-3 text-base text-neonCyan transition hover:bg-white/10 hover:text-white/92"
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
