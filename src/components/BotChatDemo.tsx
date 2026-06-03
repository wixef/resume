import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { config } from "@/config";

type Msg = {
  id: string;
  from: "user" | "bot";
  text: string;
  time: string;
  accent?: "violet";
};

type Step = "idle" | "trial" | "invoice" | "paid" | "active";

const initialMessages: Msg[] = [
  {
    id: "m1",
    from: "bot",
    time: "20:39",
    text:
      "Привет, Олег!\n\nМожно взять пробный доступ, сразу оформить подписку или открыть свой доступ и инструкции.\n\nВыберите действие."
  }
];

function pushMessages(current: Msg[], next: Msg[]) {
  return [...current, ...next];
}

export default function BotChatDemo() {
  const [messages, setMessages] = useState<Msg[]>(initialMessages);
  const [step, setStep] = useState<Step>("idle");
  const messagesViewportRef = useRef<HTMLDivElement | null>(null);
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  const isInvoice = step === "invoice";
  const isPaid = step === "paid";
  const isActive = step === "active";
  const isTrial = step === "trial";

  const menuButtons = useMemo(() => {
    return [
      {
        id: "trial",
        label: "Пробный доступ",
        visible: step === "idle",
        onClick: () => {
          if (isTrial || isActive) return;
          setStep("trial");
          setMessages((current) =>
            pushMessages(current, [
              { id: `u-${Date.now()}`, from: "user", text: "Пробный доступ", time: "20:40" },
              {
                id: `b-${Date.now() + 1}`,
                from: "bot",
                time: "20:40",
                accent: "violet",
                text:
                  "Пробный доступ активирован.\n\nДействует 24 часа.\nПосле активации можно посмотреть статус, инструкцию и продлить доступ."
              }
            ])
          );
        }
      },
      {
        id: "buy",
        label: "Купить доступ",
        visible: step === "idle" || step === "trial",
        onClick: () => {
          if (isInvoice || isPaid || isActive) return;
          setStep("invoice");
          setMessages((current) =>
            pushMessages(current, [
              { id: `u-${Date.now()}`, from: "user", text: "Купить доступ", time: "20:41" },
              {
                id: `b-${Date.now() + 1}`,
                from: "bot",
                time: "20:41",
                text:
                  "Подписка на 30 дней подготовлена.\n\nСумма: 499 ₽\nПосле оплаты бот автоматически подтвердит платёж и откроет доступ."
              }
            ])
          );
        }
      },
      {
        id: "pay",
        label: "Оплатить",
        visible: step === "invoice",
        onClick: () => {
          if (!isInvoice) return;
          setStep("paid");
          setMessages((current) =>
            pushMessages(current, [
              { id: `u-${Date.now()}`, from: "user", text: "Оплатил", time: "20:42" },
              {
                id: `b-${Date.now() + 1}`,
                from: "bot",
                time: "20:42",
                text: "Оплата подтверждена. Готовлю выдачу доступа."
              }
            ])
          );
        }
      },
      {
        id: "activate",
        label: "Активировать доступ",
        visible: step === "paid",
        onClick: () => {
          if (!isPaid) return;
          setStep("active");
          setMessages((current) =>
            pushMessages(current, [
              {
                id: `b-${Date.now()}`,
                from: "bot",
                time: "20:42",
                accent: "violet",
                text:
                  "Доступ выдан.\n\nКлюч активен ещё 30 дней.\nОткрыты разделы: мой ключ, подписка, продление и инструкция."
              }
            ])
          );
        }
      },
      {
        id: "key",
        label: "Мой ключ",
        visible: isTrial || isActive,
        onClick: () => {
          if (!(isTrial || isActive)) return;
          setMessages((current) =>
            pushMessages(current, [
              { id: `u-${Date.now()}`, from: "user", text: "Мой ключ", time: "20:43" },
              {
                id: `b-${Date.now() + 1}`,
                from: "bot",
                time: "20:43",
                accent: "violet",
                text: "Ключ доступа: ************\nКлюч показан частично."
              }
            ])
          );
        }
      },
      {
        id: "subscription",
        label: "Моя подписка",
        visible: isTrial || isActive,
        onClick: () => {
          if (!(isTrial || isActive)) return;
          setMessages((current) =>
            pushMessages(current, [
              { id: `u-${Date.now()}`, from: "user", text: "Моя подписка", time: "20:43" },
              {
                id: `b-${Date.now() + 1}`,
                from: "bot",
                time: "20:43",
                accent: "violet",
                text: isTrial ? "Пробный доступ активен ещё 24 часа." : "Подписка активна ещё 30 дней."
              }
            ])
          );
        }
      },
      {
        id: "renew",
        label: "Продлить",
        visible: isTrial || isActive,
        onClick: () => {
          if (!(isTrial || isActive)) return;
          setMessages((current) =>
            pushMessages(current, [
              { id: `u-${Date.now()}`, from: "user", text: "Продлить", time: "20:44" },
              {
                id: `b-${Date.now() + 1}`,
                from: "bot",
                time: "20:44",
                text: "Продление доступно в один клик через встроенную оплату."
              }
            ])
          );
        }
      },
      {
        id: "guide",
        label: "Как подключить",
        visible: step !== "invoice" && step !== "paid",
        onClick: () => {
          setMessages((current) =>
            pushMessages(current, [
              { id: `u-${Date.now()}`, from: "user", text: "Как подключить", time: "20:44" },
              {
                id: `b-${Date.now() + 1}`,
                from: "bot",
                time: "20:44",
                text: "После выдачи доступа пользователь получает пошаговую инструкцию прямо в чате."
              }
            ])
          );
        }
      },
      {
        id: "support",
        label: "Поддержка",
        visible: step !== "invoice" && step !== "paid",
        onClick: () => {
          setMessages((current) =>
            pushMessages(current, [
              { id: `u-${Date.now()}`, from: "user", text: "Поддержка", time: "20:45" },
              {
                id: `b-${Date.now() + 1}`,
                from: "bot",
                time: "20:45",
                text: "Поддержка подключается из того же чата, без перехода в сторонние сервисы."
              }
            ])
          );
        }
      }
    ];
  }, [isActive, isInvoice, isPaid, isTrial, step]);

  const visibleButtons = useMemo(
    () => menuButtons.filter((button) => button.visible),
    [menuButtons]
  );

  useEffect(() => {
    const viewport = messagesViewportRef.current;
    const lastMessage = lastMessageRef.current;
    if (!viewport || !lastMessage) return;

    viewport.scrollTo({
      top: viewport.scrollHeight,
      behavior: "smooth"
    });
  }, [messages]);

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(240px,1fr)_minmax(0,420px)_minmax(240px,1fr)] xl:items-center">
      <div className="order-2 grid gap-4 xl:order-1">
        <div className="glass-panel rounded-[30px] p-7">
          <div className="font-display text-2xl font-semibold text-white/92">
            Сценарий работы
          </div>
          <ul className="mt-4 grid gap-3 text-lg text-white/72">
            <li>Сначала пробный доступ и покупка, потом уже личные разделы</li>
            <li>Автоматический сценарий: выбор → оплата → подтверждение → активация</li>
            <li>Личный кабинет прямо в чате: ключ, подписка, продление, инструкция</li>
            <li>Подача и навигация приближены к Telegram-интерфейсу</li>
          </ul>
        </div>

        <div className="glass-panel rounded-[30px] p-7">
          <div className="font-display text-2xl font-semibold text-white/92">
            Что внутри
          </div>
          <ul className="mt-4 grid gap-3 text-lg text-white/72">
            <li>Node.js + Telegram Bot API</li>
            <li>Автоматизация сценариев и статусов</li>
            <li>Подключение оплаты и выдача доступа без ручных действий</li>
            <li>Серверная часть и развёртывание: VPS, 3x-ui, Linux / Docker</li>
          </ul>
        </div>
      </div>

      <div className="order-1 mx-auto w-full max-w-[390px] xl:order-2">
        <div className="relative">
          <div className="pointer-events-none absolute -inset-4 rounded-[40px] bg-[radial-gradient(circle_at_50%_20%,rgba(0,243,255,0.10),transparent_40%),radial-gradient(circle_at_50%_85%,rgba(255,0,229,0.08),transparent_42%)] blur-2xl" />
        <div className="relative flex h-[min(74svh,760px)] min-h-[560px] flex-col overflow-hidden rounded-[34px] border border-white/10 bg-[#17212b] shadow-[0_26px_70px_rgba(0,0,0,0.42)]">
          <div className="border-b border-white/6 bg-[#223242] px-4 py-2">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-[#2b5278] text-sm font-semibold text-white shadow-[0_6px_18px_rgba(0,0,0,0.16)]">
                  OA
                </div>
                <div>
                  <div className="text-sm font-semibold text-white/92">OSK Access</div>
                  <div className="text-[11px] text-white/45">online</div>
                </div>
              </div>
              <a
                href={config.links.telegramBot}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-[11px] text-white/70 transition hover:bg-white/10"
              >
                Telegram
              </a>
            </div>
          </div>

          <div className="flex min-h-0 flex-1 flex-col bg-[#0f1720] p-3">
            <div className="overflow-hidden rounded-[24px] border border-white/8 bg-black">
              <div className="flex w-full aspect-[16/9] max-h-[8.5rem] items-center justify-center bg-[radial-gradient(circle_at_top,rgba(78,138,255,0.28),transparent_42%),linear-gradient(180deg,#132130_0%,#070b10_100%)]">
                <div className="text-center">
                  <div className="text-3xl font-black uppercase tracking-[-0.05em] text-white drop-shadow-[0_0_18px_rgba(78,138,255,0.35)] md:text-4xl">
                    OSK ACCESS
                  </div>
                  <div className="mt-2 text-sm font-semibold uppercase tracking-[0.4em] text-[#7ec8ff] md:text-base">
                    bot
                  </div>
                </div>
              </div>
            </div>

            <div ref={messagesViewportRef} className="mt-2 min-h-0 flex-1 overflow-y-auto pr-1">
              <div className="space-y-2.5">
                <AnimatePresence initial={false}>
                  {messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      ref={index === messages.length - 1 ? lastMessageRef : null}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className={
                        message.from === "user"
                        ? "ml-auto max-w-[88%] rounded-[18px] rounded-br-md bg-[#2b5278] px-3.5 py-2.5 text-white shadow-[0_8px_18px_rgba(0,0,0,0.14)]"
                        : "mr-auto max-w-[88%] rounded-[18px] rounded-bl-md bg-[#1f2c39] px-3.5 py-2.5 text-white shadow-[0_8px_18px_rgba(0,0,0,0.14)]"
                      }
                    >
                      <div className="whitespace-pre-line text-[14px] leading-relaxed text-white/92">
                        {message.accent === "violet" ? (
                          <span className="inline-block rounded-xl bg-[#5b478f] px-3 py-2 text-white">
                            {message.text}
                          </span>
                        ) : (
                          message.text
                        )}
                      </div>
                      <div className="mt-2 text-right text-[11px] text-white/40">{message.time}</div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-2 shrink-0 pr-1">
              <div className="grid gap-2">
                {visibleButtons.map((button) => (
                  <button
                    key={button.id}
                    type="button"
                    onClick={button.onClick}
                    className="rounded-[14px] border border-white/6 bg-[#223242] px-4 py-2.5 text-center text-[15px] font-semibold text-white/94 transition hover:bg-[#284056]"
                  >
                    {button.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>

      <div className="order-3">
        <div className="glass-panel rounded-[30px] p-7">
          <div className="font-display text-2xl font-semibold text-white/92">
            Технологически
          </div>
          <ul className="mt-4 grid gap-3 text-lg text-white/72">
            <li>Backend-логика, статусы, меню и сценарии выдачи</li>
            <li>Интеграция оплаты и автоматическое подтверждение действий</li>
            <li>Управление из одного чата без лишних ручных шагов</li>
            <li>Развёртывание на VPS, 3x-ui, Linux / Docker</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
