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
import MetricsGrid from "@/components/MetricsGrid";
import Toast from "@/components/Toast";
import { config } from "@/config";
import { managementPoints, metrics } from "@/data/metrics";
import { portfolioItems } from "@/data/portfolio";
import { tech } from "@/data/tech";

const WORDS = ["Tech Lead", "Product Owner", "Операционка", "Fullstack"];

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
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState<{ title: string; text?: string } | null>(null);

  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 850);
    return () => window.clearTimeout(t);
  }, []);

  const filtered = useMemo(() => portfolioItems, []);

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
                <span className="font-display tracking-wide">Основатель OSK Studio</span>
                <span className="text-white/35">/</span>
                <span className="text-white/55">удалёнка</span>
              </div>

              <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.02] tracking-tight text-white md:mt-7 md:text-7xl">
                <span
                  className="glitch glitch-static"
                  data-text="Олег. Основатель · Tech Lead."
                >
                  Олег. Основатель · Tech Lead.
                </span>
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70 md:mt-5 md:text-xl">
                Веду продукты и delivery под ключ: клиенты, сроки, scope, релизы и
                поддержка.
                <span className="text-white/45">
                  {" "}4 года в продакшене, 100+ проектов.
                  Fullstack — от интерфейса и API до платёжек, VPS и деплоя.
                </span>
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="glass-panel rounded-[24px] px-4 py-3 md:rounded-[28px] md:px-5 md:py-4">
                  <div className="text-sm text-white/50">Специализация</div>
                  <div className="mt-2 min-h-[2.5rem] font-display text-base tracking-tight text-white/90 md:min-h-[3rem] md:text-xl">
                    <TypedText words={WORDS} />
                  </div>
                </div>

                <div className="glass-panel rounded-[24px] px-4 py-3 md:rounded-[28px] md:px-5 md:py-4">
                  <div className="text-sm text-white/50">Проектов</div>
                  <div className="mt-2 font-display text-xl text-white/90 md:text-3xl">
                    <Counter to={100} suffix="+" />
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
                <a
                  href={config.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="glass-pill rounded-3xl px-6 py-3.5 text-base text-white/85 transition hover:bg-white/10"
                >
                  GitHub
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
                  <span className="text-white/85">Delivery E2E</span>
                  <span className="text-white/35">/</span>
                  <span className="text-white/85">B2B white-label</span>
                  <span className="text-white/35">/</span>
                  <span className="text-white/85">Продукты & CRM</span>
                  <span className="text-white/35">/</span>
                  <span className="text-white/85">Инфра & платёжки</span>
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

        {/* METRICS */}
        <Section
          id="metrics"
          title="Метрики & управление"
          subtitle="Цифры, за которыми — клиенты, сроки, scope и результат. Не только пишу код, а веду delivery."
          variant="section-metrics"
        >
          <MetricsGrid items={metrics} />
          <div className="mt-6 grid gap-3 md:mt-8 md:grid-cols-2 md:gap-4">
            {managementPoints.map((point) => (
              <div
                key={point}
                className="glass-panel rounded-[24px] px-5 py-4 text-sm leading-relaxed text-white/72 md:rounded-[28px] md:px-6 md:py-5 md:text-lg"
              >
                {point}
              </div>
            ))}
          </div>
        </Section>

        {/* WHAT I DO */}
        <Section
          id="do"
          title="Направления"
          subtitle="Три слоя: управление и delivery, продуктовая разработка, инфраструктура и интеграции."
          variant="section-do"
        >
          <div className="grid gap-5 lg:grid-cols-3">
            <div className="glass-panel relative rounded-[32px] p-8 transition hover:shadow-neon">
              <div className="pointer-events-none absolute -left-24 -top-24 h-56 w-56 rounded-full bg-neonPink/8 blur-2xl" />
              <div className="relative">
                <div className="font-display text-2xl font-semibold text-white/90 md:text-3xl">
                  Управление & delivery
                </div>
                <ul className="mt-4 grid gap-3 text-lg text-white/70">
                  <li>OSK Studio: клиенты, сметы, приёмка, пострелизная поддержка</li>
                  <li>Scope и сроки: фикс за задачу, приоритеты без лишних созвонов</li>
                  <li>White-label для студий EU — NDA, без контакта с end-client</li>
                  <li>Коммуникация с клиентом — от брифа до приёмки</li>
                </ul>
              </div>
            </div>

            <div className="glass-panel relative rounded-[32px] p-8 transition hover:shadow-neon">
              <div className="pointer-events-none absolute -left-24 -top-24 h-56 w-56 rounded-full bg-neonCyan/8 blur-2xl" />
              <div className="relative">
                <div className="font-display text-2xl font-semibold text-white/90 md:text-3xl">
                  Продукт & разработка
                </div>
                <ul className="mt-4 grid gap-3 text-lg text-white/70">
                  <li>Лендинги, магазины, CRM — React, Next.js, Django, FastAPI</li>
                  <li>Pet-проект: Telegram-сервис подписки с автопровижинингом</li>
                  <li>HR CRM: воронка кандидатов, аналитика, hh.ru API</li>
                  <li>Playwright, LLM-инструменты, AI в ежедневном delivery</li>
                </ul>
              </div>
            </div>

            <div className="glass-panel relative rounded-[32px] p-8 transition hover:shadow-neon lg:col-span-1">
              <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-neonPink/8 blur-2xl" />
              <div className="relative">
                <div className="font-display text-2xl font-semibold text-white/90 md:text-3xl">
                  Инфра & серверы
                </div>
                <ul className="mt-4 grid gap-3 text-lg text-white/70">
                  <li>Платёжки: Robokassa, ЮKassa, webhooks, автовыдача доступа</li>
                  <li>VPS, Docker, nginx, healthcheck, мониторинг инцидентов</li>
                  <li>PostgreSQL, миграции, продакшн-данные, REST API</li>
                  <li>Деплой, поддержка, техдолг — закрываю сам, без перекладывания</li>
                </ul>
              </div>
            </div>
          </div>
        </Section>

        {/* TECH */}
        <Section
          id="tech"
          title="Технологии"
          subtitle="Стек на реальных проектах — и инструменты, через которые держу сроки и качество поставки."
          variant="section-tech"
        >
          <TechGrid items={tech} />
        </Section>

        {/* PORTFOLIO */}
        <Section
          id="portfolio"
          title="Портфолио"
          subtitle="Кейсы с цифрами за спиной: продукты, студия, CRM и коммерческие сайты."
          variant="section-portfolio"
        >
          <div className="grid gap-6">
            {filtered.map((it, itemIndex) => (
              <PortfolioCard
                key={it.id}
                item={it}
                index={itemIndex}
                onOpen={() => setViewerIndex(itemIndex)}
              />
            ))}
          </div>

          <PortfolioViewer
            items={filtered}
            index={viewerIndex}
            onClose={() => setViewerIndex(null)}
            onChange={setViewerIndex}
          />
        </Section>

        {/* PET */}
        <Section
          id="pet"
          title="Telegram‑бот"
          subtitle="Демо сценария подписки: пробный доступ, оплата, выдача конфига — как в рабочем pet-проекте."
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
              4 года в продакшене. Основатель OSK Studio — веду клиентов, сметы, сроки
              и приёмку без посредников. Параллельно строю продукты: Telegram-сервис
              подписки, HR CRM на Django, автоматизацию на Playwright, LLM-инструменты.
              Fullstack end-to-end: интерфейс, backend, PostgreSQL, платёжки, VPS, деплой
              и поддержка. 100+ проектов за 4 года. Ищу удалёнку, где ценят ownership:
              от задачи до результата в проде.
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
                  title: "GitHub",
                  value: "github.com/wixef",
                  action: "Открыть",
                  href: config.links.github,
                  accent: "pink"
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
