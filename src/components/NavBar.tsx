import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { config } from "@/config";
import { cn } from "@/lib/cn";

type NavItem = { id: string; label: string };

const items: NavItem[] = [
  { id: "hero", label: "Главная" },
  { id: "metrics", label: "Метрики" },
  { id: "do", label: "Направления" },
  { id: "tech", label: "Технологии" },
  { id: "portfolio", label: "Портфолио" },
  { id: "pet", label: "Telegram‑бот" },
  { id: "about", label: "Обо мне" },
  { id: "contacts", label: "Контакты" }
];

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 72;
  window.scrollTo({ top: y, behavior: "smooth" });
}

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const nav = useMemo(() => items, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="fixed left-0 top-0 z-50 w-full">
      <div className="px-3 pt-3 md:px-8 md:pt-4 xl:px-14">
        <div
          className={cn(
            "glass-panel glass-header rounded-[24px] px-3 py-3 md:rounded-[30px] md:px-7 md:py-4",
            "border-transparent",
            scrolled ? "glass-header-scrolled" : ""
          )}
        >
          <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          className="group flex min-w-0 items-center gap-2 text-left"
          onClick={() => scrollToId("hero")}
        >
          <span className="glass-pill grid h-9 w-9 shrink-0 place-items-center rounded-xl">
            <span className="font-display text-sm tracking-wide text-white/85">
              O
            </span>
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-sm font-semibold text-white/90">
              {config.person.name}
            </span>
            <span className="block truncate text-xs text-white/55">tech lead</span>
          </span>
        </button>

        <div className="hidden items-center gap-2 md:flex">
          {nav.map((it) => (
            <button
              key={it.id}
              type="button"
              onClick={() => scrollToId(it.id)}
              className="rounded-xl px-3 py-2 text-sm text-white/70 transition hover:bg-white/10 hover:text-white/95"
            >
              {it.label}
            </button>
          ))}
          <a
            href={config.links.telegram}
            target="_blank"
            rel="noreferrer"
            className="glass-pill ml-2 rounded-xl px-4 py-2 text-sm text-white/85 transition hover:bg-white/10"
          >
            Telegram
          </a>
        </div>

        <button
          type="button"
          className="glass-pill relative grid h-10 w-10 shrink-0 place-items-center rounded-xl md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Открыть меню"
        >
          <span className="block h-4 w-5">
            <span
              className={cn(
                "block h-[2px] w-5 rounded-full bg-white/80 transition",
                open ? "translate-y-[7px] rotate-45" : ""
              )}
            />
            <span
              className={cn(
                "mt-[5px] block h-[2px] w-5 rounded-full bg-white/60 transition",
                open ? "opacity-0" : ""
              )}
            />
            <span
              className={cn(
                "mt-[5px] block h-[2px] w-5 rounded-full bg-white/80 transition",
                open ? "-translate-y-[7px] -rotate-45" : ""
              )}
            />
          </span>
        </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="relative md:hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="fixed inset-0 z-0 bg-[#07090dcc] backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <div className="relative z-10 px-3 pb-3 md:px-8 xl:px-14">
              <div className="glass-panel rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(28,36,50,0.98),rgba(18,24,35,0.96))] p-3">
                <div className="grid gap-1">
                  {nav.map((it) => (
                    <button
                      key={it.id}
                      type="button"
                      onClick={() => {
                        setOpen(false);
                        scrollToId(it.id);
                      }}
                      className="rounded-xl px-3 py-3 text-left text-sm text-white/80 hover:bg-white/10"
                    >
                      {it.label}
                    </button>
                  ))}
                </div>
                <div className="mt-3 grid grid-cols-1 gap-2">
                  <a
                    href={config.links.telegram}
                    target="_blank"
                    rel="noreferrer"
                    className="glass-pill rounded-xl px-3 py-3 text-center text-sm text-white/85"
                  >
                    Telegram
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
