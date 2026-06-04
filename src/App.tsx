import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import BackgroundGrid from "@/components/BackgroundGrid";
import CustomCursor from "@/components/CustomCursor";
import NeonLoader from "@/components/NeonLoader";
import NavBar from "@/components/NavBar";
import Section from "@/components/Section";
import TypedText from "@/components/TypedText";
import Counter from "@/components/Counter";
import IconCube from "@/components/IconCube";
import TechGrid from "@/components/TechGrid";
import PortfolioCard from "@/components/PortfolioCard";
import PortfolioViewer from "@/components/PortfolioViewer";
import BotChatDemo from "@/components/BotChatDemo";
import Toast from "@/components/Toast";
import { config } from "@/config";
import { portfolioItems } from "@/data/portfolio";
import { tech } from "@/data/tech";

const WORDS = ["Frontend", "Backend", "Интерфейсы", "Telegram-боты"];

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 72;
  window.scrollTo({ top: y, behavior: "smooth" });
}

function isGitHubPagesHost() {
  if (typeof window === "undefined") return false;
  return window.location.hostname.endsWith(".github.io");
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState<{ title: string; text?: string } | null>(null);

  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 850);
    return () => window.clearTimeout(t);
  }, []);

  const filtered = useMemo(() => portfolioItems, []);

  const pageSize = 10;
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  return (
    <div className="min-h-screen">
      <BackgroundGrid />
      <CustomCursor />
      <NeonLoader show={loading} />
      <NavBar />

      <main className="overflow-x-hidden">
        {/* HERO */}
        <section
          id="hero"
          className="w-full px-3 pb-6 pt-20 md:px-8 md:pb-10 md:pt-28 xl:px-14"
        >
          <div
            className="hero-shell flex w-full flex-col justify-start px-4 py-7 md:px-8 md:py-12 xl:px-10"
            style={{ minHeight: "calc(100svh - 5.25rem)" }}
          >
          <div className="grid items-start gap-8 xl:grid-cols-[1.2fr_0.8fr] xl:gap-12">
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="glass-pill inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-white/70">
                <span className="h-2.5 w-2.5 rounded-full bg-neonCyan shadow-[0_0_20px_rgba(0,243,255,0.75)]" />
                <span className="font-display tracking-wide">Открыт к предложениям</span>
                <span className="text-white/35">/</span>
                <span className="text-white/55">2026</span>
              </div>

              <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.02] tracking-tight text-white md:mt-7 md:text-7xl">
                <span
                  className="glitch glitch-static"
                  data-text="Олег. Frontend / backend разработчик."
                >
                  Олег. Frontend / backend разработчик.
                </span>
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70 md:mt-5 md:text-xl">
                Разрабатываю сайты, интерфейсы, административные панели,
                Telegram-ботов и backend-часть для веб-проектов.
                <span className="text-white/45">
                  {" "}4 года практики, коммерческие и личные проекты, работа от
                  интерфейса до запуска.
                </span>
              </p>

              <div className="mt-5 grid gap-3 sm:flex sm:flex-wrap sm:items-center sm:gap-4">
                <div className="glass-panel rounded-[24px] px-4 py-3 md:rounded-[28px] md:px-5 md:py-4">
                  <div className="text-sm text-white/50">Специализация</div>
                  <div className="mt-2 font-display text-xl text-white/90 md:text-3xl">
                    <TypedText words={WORDS} />
                  </div>
                </div>

                <div className="glass-panel rounded-[24px] px-4 py-3 md:rounded-[28px] md:px-5 md:py-4">
                  <div className="text-sm text-white/50">Опыт</div>
                  <div className="mt-2 font-display text-xl text-white/90 md:text-3xl">
                    <Counter to={4} suffix=" года" />
                  </div>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:flex sm:flex-wrap">
                <button
                  type="button"
                  onClick={() => scrollToId("portfolio")}
                  className="glass-pill rounded-3xl px-6 py-3.5 text-base text-white/85 transition hover:bg-white/10"
                >
                  Портфолио
                </button>
                <a
                  href={config.links.telegram}
                  target="_blank"
                  rel="noreferrer"
                  className="glass-pill rounded-3xl px-6 py-3.5 text-base text-white/85 transition hover:bg-white/10"
                >
                  Telegram
                </a>
                <button
                  type="button"
                  onClick={() => scrollToId("contacts")}
                  className="glass-pill rounded-3xl px-6 py-3.5 text-base text-white/75 transition hover:bg-white/10"
                >
                  Написать
                </button>
              </div>

              <div className="mt-6 max-w-xl text-base leading-relaxed text-white/70 md:text-xl">
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  <span className="text-white/85">Сайты</span>
                  <span className="text-white/35">/</span>
                  <span className="text-white/85">Интернет‑магазины</span>
                  <span className="text-white/35">/</span>
                  <span className="text-white/85">Админ‑панели</span>
                  <span className="text-white/35">/</span>
                  <span className="text-white/85">Telegram‑боты</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={false}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: 0.02 }}
              className="pointer-events-none order-first mx-auto -mb-4 hidden w-full max-w-[180px] justify-center sm:pointer-events-auto sm:flex sm:max-w-sm md:mb-0 md:max-w-none xl:order-none"
            >
              <div className="relative">
                <div className="absolute -inset-6 rounded-[28px] bg-gradient-to-b from-neonCyan/10 via-transparent to-neonPink/10 blur-2xl" />
                <IconCube />
              </div>
            </motion.div>
          </div>
          </div>
        </section>

        {/* WHAT I DO */}
        <Section
          id="do"
          title="Направления"
          subtitle="Основная специализация — разработка сайтов и интерфейсов. Дополнительно беру backend, интеграции, SEO и техническую настройку проекта."
          variant="section-do"
        >
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="glass-panel relative rounded-[32px] p-8 transition hover:shadow-neon">
              <div className="pointer-events-none absolute -left-24 -top-24 h-56 w-56 rounded-full bg-neonCyan/8 blur-2xl" />
              <div className="relative">
                <div className="font-display text-2xl font-semibold text-white/90 md:text-3xl">
                  Сайты
                </div>
                <ul className="mt-4 grid gap-3 text-lg text-white/70">
                  <li>Лендинги, многостраничные сайты, интернет-магазины, админ-панели</li>
                  <li>Верстка по макету, доработка существующих проектов, UI-правки</li>
                  <li>Адаптивная верстка, анимации, работа с типографикой и структурой страниц</li>
                  <li>Интеграции с формами, CRM, аналитикой, REST API и базами данных</li>
                </ul>
              </div>
            </div>

            <div className="glass-panel relative rounded-[32px] p-8 transition hover:shadow-neon">
              <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-neonPink/8 blur-2xl" />
              <div className="relative">
                <div className="font-display text-2xl font-semibold text-white/90 md:text-3xl">
                  Backend и техническая часть
                </div>
                <ul className="mt-4 grid gap-3 text-lg text-white/70">
                  <li>Backend на Node.js, REST API, формы, платежные и сторонние интеграции</li>
                  <li>Telegram-боты с автоматизацией сценариев и управлением из чата</li>
                  <li>Базовая SEO-настройка, аналитика, индексация и техническая подготовка сайта</li>
                  <li>Серверы, деплой, Linux, Docker, VPS и Nginx</li>
                </ul>
              </div>
            </div>
          </div>
        </Section>

        {/* TECH */}
        <Section
          id="tech"
          title="Технологии"
          subtitle="Стек, с которым я работаю на реальных проектах: frontend, backend, интеграции, серверы и деплой."
          variant="section-tech"
        >
          <TechGrid items={tech} />
        </Section>

        {/* PORTFOLIO */}
        <Section
          id="portfolio"
          title="Портфолио"
          subtitle="Выборка реализованных проектов по сайтам, интерфейсам и сервисам."
          variant="section-portfolio"
        >
          <div className="grid gap-6">
            {pageItems.map((it, itemIndex) => {
              const absoluteIndex = (page - 1) * pageSize + itemIndex;

              return (
                <PortfolioCard
                  key={it.id}
                  item={it}
                  index={absoluteIndex}
                  onOpen={() => setViewerIndex(absoluteIndex)}
                />
              );
            })}
          </div>

          <PortfolioViewer
            items={filtered}
            index={viewerIndex}
            onClose={() => setViewerIndex(null)}
            onChange={setViewerIndex}
          />

          {pages > 1 ? (
            <div className="mt-8 flex flex-col gap-4 md:flex-row md:flex-wrap md:items-center md:justify-between">
              <div className="text-sm text-white/55 md:text-base">
                Показано: <span className="text-white/80">{pageItems.length}</span>{" "}
                из <span className="text-white/80">{filtered.length}</span>
              </div>
              <div className="flex items-center gap-2 self-start md:self-auto">
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className="glass-pill rounded-3xl px-5 py-3 text-base text-white/75 transition enabled:hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  ←
                </button>
                <div className="glass-panel rounded-3xl px-5 py-3 text-base text-white/75">
                  {page} / {pages}
                </div>
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.min(pages, p + 1))}
                  disabled={page >= pages}
                  className="glass-pill rounded-3xl px-5 py-3 text-base text-white/75 transition enabled:hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  →
                </button>
              </div>
            </div>
          ) : null}
        </Section>

        {/* PET */}
        <Section
          id="pet"
          title="Telegram‑бот"
          subtitle="Пример проекта с автоматизацией сценариев, оплатой и выдачей доступа."
          variant="section-pet"
        >
          <BotChatDemo />
        </Section>

        {/* ABOUT */}
        <Section id="about" title="Обо мне" variant="section-about">
          <div className="glass-panel relative rounded-[32px] p-10 transition hover:shadow-neon">
            <div className="pointer-events-none absolute -left-24 -top-24 h-56 w-56 rounded-full bg-neonCyan/10 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-neonPink/10 blur-2xl" />

            <div className="relative max-w-3xl text-lg leading-relaxed text-white/75 md:text-xl">
              Мне 18 лет, во frontend-разработке 4 года. Основная
              специализация — сайты и интерфейсы: лендинги, интернет‑магазины,
              административные панели. Также беру backend‑часть, Telegram‑ботов
              и серверную настройку (VPS, 3x‑ui, Linux). Большую часть задач
              веду самостоятельно: от структуры и интерфейса до запуска и
              технической поддержки. Сейчас ищу стабильную работу в команде,
              где смогу расти как разработчик и брать ответственность за
              результат.
            </div>
          </div>
        </Section>

        {/* CONTACTS */}
        <Section
          id="contacts"
          title="Контакты"
          subtitle="Связаться можно напрямую в Telegram или по email."
          variant="section-contacts"
        >
          <div className="grid items-start gap-4 md:grid-cols-2">
            <div className="grid gap-4">
              {[
                {
                  title: "Telegram",
                  value: config.links.telegramHandle,
                  action: "Открыть",
                  href: config.links.telegram,
                  accent: "cyan"
                },
                {
                  title: "Email",
                  value: config.links.email,
                  action: "Скопировать",
                  onClick: async () => {
                    try {
                      await navigator.clipboard.writeText(config.links.email);
                      setToast({
                        title: "Email скопирован",
                        text: config.links.email
                      });
                    } catch {
                      setToast({
                        title: "Не удалось скопировать",
                        text: "Откройте сайт через http(s) (dev/preview) или скопируйте вручную."
                      });
                    }
                  },
                  accent: "cyan"
                }
              ].map((c) => (
                <div key={c.title} className="glass-panel relative rounded-[24px] p-5 transition hover:shadow-neon md:rounded-[32px] md:p-8">
                  <div
                    className="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full blur-2xl"
                    style={{
                      background:
                        c.accent === "cyan"
                          ? "rgba(0,243,255,0.10)"
                          : "rgba(255,0,229,0.10)"
                    }}
                  />
                  <div className="relative flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm text-white/55">{c.title}</div>
                      <div className="mt-2 break-all font-display text-lg font-semibold text-white/90 md:text-2xl">
                        {c.value}
                      </div>
                    </div>
                    {c.href ? (
                      <a
                        href={c.href}
                        target="_blank"
                        rel="noreferrer"
                        className="glass-pill rounded-2xl px-4 py-3 text-xs text-white/80 hover:bg-white/10 md:text-sm"
                      >
                        {c.action} →
                      </a>
                    ) : (
                      <button
                        type="button"
                        className="glass-pill rounded-2xl px-4 py-3 text-xs text-white/80 hover:bg-white/10 md:text-sm"
                        onClick={c.onClick}
                      >
                        {c.action}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="glass-panel relative rounded-[24px] p-5 md:rounded-[32px] md:p-8 md:pb-10">
              <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-neonPink/10 blur-2xl" />
              <div className="relative">
                <div className="font-display text-xl font-semibold text-white/90 md:text-3xl">
                  Форма обратной связи
                </div>
                <form
                  className="mt-5 grid gap-4 pb-2 md:mt-6"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const fd = new FormData(form);
                    const name = String(fd.get("name") ?? "").trim();
                    const message = String(fd.get("message") ?? "").trim();

                    if (!message) {
                      setToast({
                        title: "Добавь сообщение",
                        text: "Нужно заполнить поле с текстом."
                      });
                      return;
                    }

                    if (isGitHubPagesHost()) {
                      void navigator.clipboard
                        .writeText(`Имя: ${name || "Без имени"}\nСообщение: ${message}`)
                        .catch(() => {});
                      window.open(config.links.telegram, "_blank", "noopener,noreferrer");
                      setToast({
                        title: "Открываю Telegram",
                        text: "Текст сообщения скопирован. На GitHub Pages связь идёт через Telegram."
                      });
                      return;
                    }

                    try {
                      setSending(true);
                      const response = await fetch("/api/contact", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ name, message })
                      });

                      const data = (await response.json()) as { ok?: boolean; error?: string };

                      if (!response.ok || !data.ok) {
                        throw new Error(data.error || "Ошибка отправки");
                      }

                      setToast({
                        title: "Сообщение отправлено",
                        text: "Заявка улетела в Telegram."
                      });
                      form.reset();
                    } catch (error) {
                      setToast({
                        title: "Не удалось отправить",
                        text:
                          error instanceof Error
                            ? error.message
                            : "Попробуй ещё раз через пару секунд."
                      });
                    } finally {
                      setSending(false);
                    }
                  }}
                >
                  <label className="grid gap-1">
                    <span className="text-sm text-white/55">Имя</span>
                    <input
                      name="name"
                      placeholder="Как к вам обращаться?"
                      className="glass-soft rounded-3xl border border-white/10 px-4 py-3.5 text-sm text-white/85 outline-none ring-0 transition focus:border-white/20 focus:shadow-[0_0_0_1px_rgba(0,243,255,0.22),0_0_26px_rgba(0,243,255,0.10)] md:px-5 md:py-4 md:text-base"
                    />
                  </label>
                  <label className="grid gap-1">
                    <span className="text-sm text-white/55">Сообщение</span>
                    <textarea
                      name="message"
                      placeholder="Напишите задачу / сроки / бюджет…"
                      rows={5}
                      className="glass-soft resize-none rounded-3xl border border-white/10 px-4 py-3.5 text-sm text-white/85 outline-none transition focus:border-white/20 focus:shadow-[0_0_0_1px_rgba(255,0,229,0.18),0_0_26px_rgba(255,0,229,0.10)] md:px-5 md:py-4 md:text-base"
                    />
                  </label>
                  <button
                    type="submit"
                    disabled={sending}
                    className="glass-pill rounded-3xl px-6 py-3.5 text-sm text-white/85 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60 md:py-4 md:text-base"
                  >
                    {sending ? "Отправляю..." : "Отправить"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </Section>
      </main>

      <footer className="w-full px-3 pb-8 pt-4 md:px-8 md:pb-14 md:pt-8 xl:px-14">
        <div className="glass-panel rounded-[22px] p-4 text-center text-xs text-white/55 md:rounded-[28px] md:p-5 md:text-sm">
          <span className="font-display text-white/75">{config.person.name}</span>{" "}
          — {config.person.title}. Сделано на React + Tailwind + Framer Motion.
        </div>
      </footer>

      <Toast
        show={!!toast}
        title={toast?.title ?? ""}
        text={toast?.text}
        onClose={() => setToast(null)}
      />
    </div>
  );
}
