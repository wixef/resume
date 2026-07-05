export type TechItem = {
  name: string;
  accent: "cyan" | "pink";
  short: string;
  note: string;
};

export const tech: TechItem[] = [
  { name: "TypeScript", accent: "pink", short: "TS", note: "Frontend, backend и типизированные API" },
  { name: "React / Next.js", accent: "cyan", short: "⚛", note: "SPA, SSR и production UI" },
  { name: "Node.js", accent: "pink", short: "node", note: "REST API, серверная логика, интеграции" },
  { name: "Python", accent: "cyan", short: "py", note: "FastAPI, Django, парсинг, автоматизация" },
  { name: "PostgreSQL", accent: "pink", short: "pg", note: "Схемы, миграции, продакшн-данные" },
  { name: "Docker", accent: "cyan", short: "dk", note: "Контейнеры, деплой, изоляция сервисов" },
  { name: "Linux / VPS", accent: "pink", short: "lnx", note: "Nginx, systemd, reverse proxy, мониторинг" },
  { name: "Telegram Bot API", accent: "cyan", short: "TG", note: "Боты, оплата, выдача доступа" },
  { name: "REST / Webhooks", accent: "pink", short: "API", note: "Платёжки, hh.ru, внешние сервисы" },
  { name: "Playwright", accent: "cyan", short: "pw", note: "Браузерная автоматизация и парсинг" },
  { name: "AI / LLM", accent: "pink", short: "AI", note: "Cursor, Claude, интеграции в продукты" },
  { name: "Git", accent: "cyan", short: "git", note: "Версионирование и командная работа" },
  { name: "Tailwind CSS", accent: "pink", short: "TW", note: "Адаптивный UI и быстрая вёрстка" },
  { name: "Figma", accent: "cyan", short: "F", note: "Вёрстка по макету и UI-детали" },
  { name: "Django", accent: "pink", short: "dj", note: "CRM, админки, ORM, бизнес-логика" },
  { name: "FastAPI", accent: "cyan", short: "fa", note: "Провижининг, webhooks, async API" }
];
