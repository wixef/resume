export type TechItem = {
  name: string;
  accent: "cyan" | "pink";
  short: string;
  note: string;
};

export const tech: TechItem[] = [
  { name: "HTML5", accent: "cyan", short: "HTML", note: "Семантическая структура страниц" },
  { name: "CSS3", accent: "pink", short: "{ }", note: "Адаптив, grid, flex, анимации" },
  { name: "JavaScript", accent: "cyan", short: "JS", note: "Интерактивность и логика интерфейса" },
  { name: "TypeScript", accent: "pink", short: "TS", note: "Типизированный и поддерживаемый код" },
  { name: "Tailwind", accent: "cyan", short: "TW", note: "Быстрая сборка современного UI" },
  { name: "React", accent: "pink", short: "⚛", note: "Компонентные SPA и сложные интерфейсы" },
  { name: "Next.js", accent: "cyan", short: "N", note: "SSR, routing и production-ready frontend" },
  { name: "Node.js", accent: "pink", short: "node", note: "Backend, API и серверная логика" },
  { name: "Express", accent: "cyan", short: "ex", note: "Лёгкие серверы и REST-endpoints" },
  { name: "Git", accent: "pink", short: "git", note: "Контроль версий и командная работа" },
  { name: "VPS / 3x-ui", accent: "cyan", short: "VPS", note: "Развёртывание серверов и настройка окружения" },
  { name: "Vite", accent: "pink", short: "⚡", note: "Быстрый dev-server и сборка" },
  { name: "Figma", accent: "cyan", short: "F", note: "Работа по макету и UI-деталям" },
  { name: "REST API", accent: "pink", short: "API", note: "Интеграции со сторонними сервисами" },
  { name: "Docker", accent: "cyan", short: "dk", note: "Изоляция сервисов и деплой" },
  { name: "Nginx", accent: "pink", short: "ngx", note: "Прокси, статика и конфиги сервера" }
];
