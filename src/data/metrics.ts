export type MetricItem = {
  value: string;
  label: string;
  note: string;
  accent: "cyan" | "pink";
};

export const metrics: MetricItem[] = [
  { value: "100+", label: "проектов", note: "коммерция, продукты, pet-проекты", accent: "cyan" },
  { value: "4", label: "года", note: "full cycle: бриф → прод", accent: "pink" },
  { value: "E2E", label: "под ключ", note: "дизайн → код → деплой → поддержка", accent: "cyan" },
  { value: "0", label: "ручных шагов", note: "автовыдача доступа после оплаты", accent: "pink" }
];

export const managementPoints: string[] = [
  "Основатель OSK Studio — клиенты, сметы, сроки и приёмка без посредников",
  "Веду delivery end-to-end: приоритеты, scope, релизы, пострелизная поддержка",
  "White-label для EU-студий: NDA, фикс за scope, без контакта с end-client",
  "Инфра продукта: платёжки, webhooks, healthcheck, инциденты",
  "Аналитика и процессы: воронки в HR CRM, метрики по этапам, автоматизация рутины"
];
