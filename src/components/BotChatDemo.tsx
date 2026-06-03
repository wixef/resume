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
    <div className="grid gap-4 md:gap-6 xl:grid-cols-[minmax(240px,1fr)_minmax(0,420px)_minmax(240px,1fr)] xl:items-center">
      <div className="order-2 grid gap-4 xl:order-1">
        <div className="glass-panel rounded-[24px] p-5 md:rounded-[30px] md:p-7">
          <div className="font-display text-xl font-semibold text-white/92 md:text-2xl">
            Сценарий работы
          </div>
          <ul className="mt-3 grid gap-2 text-sm text-white/72 md:mt-4 md:gap-3 md:text-lg">
            <li>Сначала пробный доступ и покупка, потом уже личные разделы</li>
            <li>Автоматический сценарий: выбор → оплата → подтверждение → активация</li>
            <li>Личный кабинет прямо в чате: ключ, подписка, продление, инструкция</li>
            <li>Подача и навигация приближены к Telegram-интерфейсу</li>
          </ul>
        </div>

        <div className="glass-panel rounded-[24px] p-5 md:rounded-[30px] md:p-7">
          <div className="font-display text-xl font-semibold text-white/92 md:text-2xl">
            Что внутри
          </div>
          <ul className="mt-3 grid gap-2 text-sm text-white/72 md:mt-4 md:gap-3 md:text-lg">
            <li>Node.js + Telegram Bot API</li>
            <li>Автоматизация сценариев и статусов</li>
            <li>Подключение оплаты и выдача доступа без ручных действий</li>
            <li>Серверная часть и развёртывание: VPS, 3x-ui, Linux / Docker</li>
          </ul>
        </div>
      </div>

      <div className="order-1 mx-auto w-full max-w-[340px] sm:max-w-[390px] xl:order-2">
        <div className="relative">
          <div className="pointer-events-none absolute -inset-4 rounded-[40px] bg-[radial-gradient(circle_at_50%_20%,rgba(0,243,255,0.10),transparent_40%),radial-gradient(circle_at_50%_85%,rgba(255,0,229,0.08),transparent_42%)] blur-2xl" />
        <div className="relative flex h-[min(68svh,640px)] min-h-[500px] flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#17212b] shadow-[0_26px_70px_rgba(0,0,0,0.42)] sm:h-[min(74svh,760px)] sm:min-h-[560px] sm:rounded-[34px]">
          <div className="border-b border-white/6 bg-[#223242] px-3 py-2 sm:px-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-[#2b5278] text-sm font-semibold text-white shadow-[0_6px_18px_rgba(0,0,0,0.16)] sm:h-10 sm:w-10">
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
                className="rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-[10px] text-white/70 transition hover:bg-white/10 sm:text-[11px]"
              >
                Telegram
              </a>
            </div>
          </div>

          <div className="flex min-h-0 flex-1 flex-col bg-[#0f1720] p-2.5 sm:p-3">
            <div className="overflow-hidden rounded-[24px] border border-white/8 bg-black">
              <div className="flex w-full aspect-[16/9] max-h-[7rem] items-center justify-center bg-[radial-gradient(circle_at_top,rgba(78,138,255,0.28),transparent_42%),linear-gradient(180deg,#132130_0%,#070b10_100%)] sm:max-h-[8.5rem]">
                <div className="text-center">
                  <div className="text-2xl font-black uppercase tracking-[-0.05em] text-white drop-shadow-[0_0_18px_rgba(78,138,255,0.35)] md:text-4xl">
                    OSK ACCESS
                  </div>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-[0.35em] text-[#7ec8ff] md:mt-2 md:text-base">
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
                        ? "ml-auto max-w-[88%] rounded-[18px] rounded-br-md bg-[#2b5278] px-3 py-2 text-white shadow-[0_8px_18px_rgba(0,0,0,0.14)] sm:px-3.5 sm:py-2.5"
                        : "mr-auto max-w-[88%] rounded-[18px] rounded-bl-md bg-[#1f2c39] px-3 py-2 text-white shadow-[0_8px_18px_rgba(0,0,0,0.14)] sm:px-3.5 sm:py-2.5"
                      }
                    >
                      <div className="whitespace-pre-line text-[13px] leading-relaxed text-white/92 sm:text-[14px]">
                        {message.accent === "violet" ? (
                          <span className="inline-block rounded-xl bg-[#5b478f] px-3 py-2 text-white">
                            {message.text}
                          </span>
                        ) : (
                          message.text
                        )}
                      </div>
                      <div className="mt-1.5 text-right text-[10px] text-white/40 sm:mt-2 sm:text-[11px]">{message.time}</div>
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
                    className="rounded-[14px] border border-white/6 bg-[#223242] px-4 py-2 text-center text-[14px] font-semibold text-white/94 transition hover:bg-[#284056] sm:py-2.5 sm:text-[15px]"
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
        <div className="glass-panel rounded-[24px] p-5 md:rounded-[30px] md:p-7">
          <div className="font-display text-xl font-semibold text-white/92 md:text-2xl">
            Технологически
          </div>
          <ul className="mt-3 grid gap-2 text-sm text-white/72 md:mt-4 md:gap-3 md:text-lg">
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
