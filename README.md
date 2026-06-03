# Сайт‑резюме Олега (React + Tailwind + Framer Motion)

Тёмный лендинг‑резюме с анимированным HERO, кастомным фоном, портфолио работ, fullscreen viewer и блоком Telegram‑бота.

## Запуск

```bash
cd oleg-resume
node -v  # желательно 18+ (или 20+)
npm i
npm run dev
```

## Статический билд

```bash
npm run build
```

Открой `oleg-resume/dist/index.html` или загрузи содержимое `dist` на статический хостинг.

## GitHub Pages

В проект уже добавлен workflow для GitHub Pages: `.github/workflows/deploy-pages.yml`.

Что сделать:

1. Создать репозиторий на GitHub
2. Залить туда проект
3. Запушить в ветку `main`
4. В GitHub открыть `Settings → Pages`
5. В `Build and deployment` выбрать `GitHub Actions`

После этого сайт будет автоматически публиковаться на домене GitHub Pages после каждого пуша в `main`.

Важно:

- форма на GitHub Pages открывает Telegram и копирует текст сообщения в буфер
- серверный endpoint `/api/contact` работает только при запуске через `node server.mjs`

## Что менять под себя

- Контакты и ссылки: `oleg-resume/src/config.ts`
- Портфолио (карточки/категории/ссылки/скрины): `oleg-resume/src/data/portfolio.ts`
- Иконки/технологии: `oleg-resume/src/data/tech.ts`
