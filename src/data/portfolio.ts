export type PortfolioCategory =
  | "Все"
  | "Лендинги"
  | "Интернет-магазины"
  | "Админ-панели"
  | "Telegram-боты";

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
  "Лендинги",
  "Интернет-магазины",
  "Админ-панели",
  "Telegram-боты"
];

export const portfolioItems: PortfolioItem[] = [
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
    category: "Интернет-магазины",
    description:
      "Интернет-магазин ELISHEBA с акцентом на каталог, карточки товара и уверенную подачу на мобильных устройствах.",
    stack: ["E-commerce", "Каталог", "Mobile First"],
    video: asset("/works/elisheba.mp4")
  },
  {
    id: "clothes-custom",
    title: "Одежда на заказ",
    category: "Интернет-магазины",
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
  },
  {
    id: "students-work",
    title: "Студенческая работа",
    category: "Админ-панели",
    description:
      "Пример выполненной студенческой работы по требованиям и методическим указаниям.",
    stack: ["UI", "Контент", "Структура"],
    video: asset("/works/students-work.mp4"),
    poster: asset("/works/posters/students-work.mp4.png")
  }
];
