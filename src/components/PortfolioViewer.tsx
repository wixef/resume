import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import type { PortfolioItem } from "@/data/portfolio";

type Props = {
  items: PortfolioItem[];
  index: number | null;
  onClose: () => void;
  onChange: (nextIndex: number) => void;
};

function formatTime(value: number) {
  if (!Number.isFinite(value) || value < 0) return "0:00";
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export default function PortfolioViewer({ items, index, onClose, onChange }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const hideControlsTimer = useRef<number | null>(null);

  const activeItem = index === null ? null : items[index];
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const clearHideTimer = () => {
    if (hideControlsTimer.current !== null) {
      window.clearTimeout(hideControlsTimer.current);
      hideControlsTimer.current = null;
    }
  };

  const showControls = () => {
    setControlsVisible(true);
    clearHideTimer();

    if (!isPlaying) return;

    hideControlsTimer.current = window.setTimeout(() => {
      setControlsVisible(false);
    }, 2200);
  };

  useEffect(() => {
    if (index === null) return;

    const previousOverflow = document.body.style.overflow;
    const html = document.documentElement;
    document.body.style.overflow = "hidden";
    html.classList.add("viewer-open");

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === " ") {
        event.preventDefault();
        const element = videoRef.current;
        if (!element) return;
        if (element.paused) {
          void element.play();
          setIsPlaying(true);
          showControls();
        } else {
          element.pause();
          setIsPlaying(false);
          setControlsVisible(true);
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      clearHideTimer();
      document.body.style.overflow = previousOverflow;
      html.classList.remove("viewer-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [index, isPlaying, onClose]);

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", onFullscreenChange);
    };
  }, []);

  useEffect(() => {
    if (!activeItem?.video || !videoRef.current) return;

    const video = videoRef.current;
    video.currentTime = 0;
    video.muted = true;
    setIsMuted(true);
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(true);
    setControlsVisible(true);
    void video.play().catch(() => {
      setIsPlaying(false);
      setControlsVisible(true);
    });
    showControls();
  }, [activeItem?.id, activeItem?.video]);

  const togglePlay = () => {
    const element = videoRef.current;
    if (!element) return;

    if (element.paused) {
      if (element.ended || element.currentTime >= Math.max((element.duration || 0) - 0.05, 0)) {
        element.currentTime = 0;
        setCurrentTime(0);
      }
      void element.play();
      setIsPlaying(true);
      showControls();
      return;
    }

    element.pause();
    setIsPlaying(false);
    setControlsVisible(true);
  };

  const toggleMute = () => {
    const element = videoRef.current;
    if (!element) return;
    const nextMuted = !element.muted;
    element.muted = nextMuted;
    setIsMuted(nextMuted);
    showControls();
  };

  const toggleFullscreen = async () => {
    const element = videoRef.current?.parentElement;
    if (!element) return;

    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      await element.requestFullscreen?.();
    }

    showControls();
  };

  const viewer =
    activeItem ? (
      <AnimatePresence>
        <motion.div
          className="system-cursor fixed inset-0 z-[90] p-2 md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-[#05070c]/90 backdrop-blur-2xl"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 26, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.99 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-[1] flex h-full items-center justify-center overflow-hidden rounded-[24px] border border-white/10 bg-black shadow-[0_24px_80px_rgba(0,0,0,0.55)] md:rounded-[32px]"
            onPointerMove={showControls}
            onMouseMove={showControls}
          >
            <div className="relative h-full w-full">
              <video
                ref={videoRef}
                key={activeItem.id}
                className="h-full w-full object-contain"
                src={activeItem.video}
                poster={activeItem.poster}
                autoPlay
                muted={isMuted}
                playsInline
                preload="metadata"
                onLoadedMetadata={(event) => setDuration(event.currentTarget.duration || 0)}
                onCanPlay={(event) => {
                  void event.currentTarget.play().catch(() => {
                    setIsPlaying(false);
                    setControlsVisible(true);
                  });
                }}
                onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
                onPlay={() => {
                  setIsPlaying(true);
                  showControls();
                }}
                onPause={() => {
                  setIsPlaying(false);
                  setControlsVisible(true);
                }}
                onEnded={() => {
                  setIsPlaying(false);
                  setControlsVisible(true);
                  setCurrentTime(videoRef.current?.duration || 0);
                }}
                onClick={togglePlay}
              />

              <motion.div
                animate={{ opacity: controlsVisible ? 1 : 0 }}
                transition={{ duration: 0.18 }}
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.42),transparent_24%,transparent_72%,rgba(0,0,0,0.72))]"
              />

              <motion.div
                animate={{ opacity: controlsVisible ? 1 : 0, y: controlsVisible ? 0 : 12 }}
                transition={{ duration: 0.2 }}
                className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between gap-2 p-3 md:p-5"
              >
                <div className="glass-pill pointer-events-auto max-w-[65%] truncate rounded-full px-3 py-2 text-[11px] text-white/65 md:max-w-none md:text-sm">
                  {activeItem.title}
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="glass-pill pointer-events-auto rounded-full px-3 py-2 text-[11px] text-white/82 transition hover:bg-white/10 md:px-4 md:py-2.5 md:text-sm"
                >
                  Закрыть
                </button>
              </motion.div>

              {!isPlaying ? (
                <button
                  type="button"
                  onClick={togglePlay}
                  className="glass-pill absolute left-1/2 top-1/2 z-[2] flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-white shadow-[0_0_32px_rgba(0,243,255,0.16)] transition hover:scale-105 md:h-20 md:w-20"
                >
                  <span className="ml-1 text-xl md:text-2xl">▶</span>
                </button>
              ) : null}

              <motion.div
                animate={{ opacity: controlsVisible ? 1 : 0, y: controlsVisible ? 0 : 16 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-x-0 bottom-0 z-[2] p-3 md:p-5"
              >
                <div className="glass-soft rounded-[22px] border border-white/10 px-3 py-3 shadow-[0_16px_40px_rgba(0,0,0,0.32)] backdrop-blur-xl md:rounded-[26px] md:px-4 md:py-4">
                  <div className="mb-2 md:mb-3">
                    <input
                      type="range"
                      min={0}
                      max={duration || 0}
                      step={0.01}
                      value={Math.min(currentTime, duration || 0)}
                      onChange={(event) => {
                        const element = videoRef.current;
                        if (!element) return;
                        const nextTime = Number(event.currentTarget.value);
                        element.currentTime = nextTime;
                        setCurrentTime(nextTime);
                      }}
                      className="video-slider"
                      style={{
                        background: `linear-gradient(90deg, rgba(0,243,255,0.95) 0%, rgba(255,0,229,0.9) ${progress}%, rgba(255,255,255,0.12) ${progress}%, rgba(255,255,255,0.12) 100%)`
                      }}
                    />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2 md:gap-3">
                      <button
                        type="button"
                        onClick={togglePlay}
                        className="glass-pill rounded-full px-4 py-2.5 text-sm text-white/88 transition hover:bg-white/10"
                      >
                        {isPlaying ? "Пауза" : "Играть"}
                      </button>
                      <button
                        type="button"
                        onClick={toggleMute}
                        className="glass-pill rounded-full px-4 py-2.5 text-sm text-white/78 transition hover:bg-white/10"
                      >
                        {isMuted ? "Включить звук" : "Выключить звук"}
                      </button>
                    </div>

                    <div className="text-sm tabular-nums text-white/70 md:text-base">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </div>

                    <div className="flex items-center gap-2 md:gap-3">
                      <button
                        type="button"
                        onClick={toggleFullscreen}
                        className="glass-pill rounded-full px-4 py-2.5 text-sm text-white/78 transition hover:bg-white/10"
                      >
                        {isFullscreen ? "Свернуть" : "Fullscreen"}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    ) : null;

  if (typeof document === "undefined") return null;

  return viewer ? createPortal(viewer, document.body) : null;
}
