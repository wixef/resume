export type PortfolioCategory =
  | "Все"
  | "Продукты"
  | "Лендинги"
  | "Интернет‑магазины"
  | "Админ‑панели"
  | "Telegram‑боты";

export type PortfolioItem = {
  id: string;
  title: string;
  category: Exclude<PortfolioCategory, "Все">;
  description: string;
  stack: string[];
  href?: string;
  image?: string;
  video?: string;
  poster?: string;
};

const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;

export const portfolioCategories: PortfolioCategory[] = [
  "Все",
  "Продукты",
  "Лендинги",
  "Интернет‑магазины",
  "Админ‑панели",
  "Telegram‑боты"
];

export const portfolioItems: PortfolioItem[] = [
  {
    id: "subscription-service",
    title: "Telegram-сервис подписки",
    category: "Продукты",
    description:
      "Pet-проект: бот с подпиской и автовыдачей доступа. Python/FastAPI, PostgreSQL, webhooks оплаты, провижининг на нескольких VPS, Docker, nginx, healthcheck.",
    stack: ["Python", "FastAPI", "PostgreSQL", "Docker", "Telegram Bot API"],
    href: "https://t.me/mogged_vpn_bot"
  },
  {
    id: "osk-studio",
    title: "OSK Studio",
    category: "Продукты",
    description:
      "Основатель веб-студии: клиенты, сметы, сроки, приёмка. White-label React/Next для EU. Delivery под ключ — от брифа до поддержки.",
    stack: ["React", "Next.js", "Delivery", "B2B"],
    href: "https://osk-studio.com"
  },
  {
    id: "hr-crm",
    title: "HR CRM / Recruiting",
    category: "Админ‑панели",
    description:
      "Крупная админ-панель для набора на работу на Django: воронка кандидатов, статистика по фото, парсинг и интеграция API hh.ru, REST, PostgreSQL.",
    stack: ["Python", "Django", "PostgreSQL", "hh.ru"]
  },
  {
    id: "llm-assistant",
    title: "LLM Real-time Assistant",
    category: "Продукты",
    description:
      "Десктоп-приложение с контекстом экрана и звука ПК: локальный деплой, стриминг в LLM API, ответы в реальном времени.",
    stack: ["Python", "LLM API", "Desktop", "Real-time"]
  },
  {
    id: "tiktok-publisher",
    title: "TikTok Publisher",
    category: "Продукты",
    description:
      "Автоматизация публикации в TikTok: Python + Playwright, загрузка видео, очередь, cookies и планировщик без ручной рутины.",
    stack: ["Python", "Playwright", "Automation"]
  },
  {
    id: "centr-shtor",
    title: "Центр штор",
    category: "Интернет‑магазины",
    description:
      "Большой многостраничный интернет-магазин штор и текстиля с каталогом, карточками товара и полноценной структурой разделов.",
    stack: ["E-commerce", "Каталог", "Наш дизайн"],
    href: "https://pavlin-nsk.ru/",
    video: asset("/works/centr-shtor.mp4"),
    poster: asset("/works/posters/centr-shtor.mp4.png")
  },
  {
    id: "kislorod",
    title: "KISLOROD",
    category: "Лендинги",
    description:
      "Сайт блогера-миллионника Максима Анубиса с огромной аудиторией. Профиль Likee: 1.26 миллиона подписчиков.",
    stack: ["Landing", "Адаптив", "Наш дизайн"],
    href: "https://kislorodmedia.ru/",
    video: asset("/works/kislorod.mp4"),
    poster: asset("/works/posters/kislorod.mp4.png")
  },
  {
    id: "sib-lombard",
    title: "Сиб Ломбард",
    category: "Лендинги",
    description:
      "Одностраничный сайт ломбарда с адаптивным дизайном и калькулятором расчёта залога.",
    stack: ["Landing", "Калькулятор", "Адаптив"],
    href: "https://sib-lombard.ru",
    video: asset("/works/sib-lombard.mp4"),
    poster: asset("/works/posters/sib-lombard.mp4.png")
  },
  {
    id: "billposter",
    title: "BillPoster",
    category: "Лендинги",
    description:
      "Сайт сервиса по расклейке объявлений и размещению рекламы со сложным калькулятором тарифов на расклейку.",
    stack: ["Landing", "Калькулятор", "UI"],
    href: "https://bill-poster.ru",
    video: asset("/works/billposter.mp4"),
    poster: asset("/works/posters/billposter.mp4.png")
  },
  {
    id: "elisheba",
    title: "ELISHEBA",
    category: "Интернет‑магазины",
    description:
      "Интернет-магазин ELISHEBA с акцентом на каталог, карточки товара и уверенную подачу на мобильных устройствах.",
    stack: ["E-commerce", "Каталог", "Mobile First"],
    video: asset("/works/elisheba.mp4")
  },
  {
    id: "clothes-custom",
    title: "Одежда на заказ",
    category: "Интернет‑магазины",
    description:
      "Сайт для заказа одежды с онлайн-конструктором принта для футболок.",
    stack: ["Каталог", "Конструктор", "UI"],
    video: asset("/works/clothes-custom.mp4"),
    poster: asset("/works/posters/clothes-custom.mp4.png")
  },
  {
    id: "master-sborki",
    title: "Мастер Сборки",
    category: "Лендинги",
    description:
      "Профессиональный сайт для компании по сборке мебели и оборудования.",
    stack: ["Landing", "Услуги", "Быстрый запуск"],
    video: asset("/works/master-sborki.mp4"),
    poster: asset("/works/posters/master-sborki.mp4.png")
  },
  {
    id: "pobeda-cinema",
    title: "Кинотеатр",
    category: "Лендинги",
    description:
      "Сайт для кинотеатра с расписанием сеансов и онлайн-бронированием билетов.",
    stack: ["Landing", "Расписание", "Бронирование"],
    video: asset("/works/pobeda kinoteatr.mp4"),
    poster: asset("/works/posters/pobeda kinoteatr.mp4.png")
  },
  {
    id: "portfolio-site",
    title: "Портфолио сайт",
    category: "Лендинги",
    description:
      "Персональный портфолио сайт с современным дизайном и презентацией работ.",
    stack: ["Portfolio", "Motion", "UI"],
    video: asset("/works/portfolio-site.mp4"),
    poster: asset("/works/posters/portfolio-site.mp4.png")
  }
];
