import { createServer as createHttpServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer as createViteServer, loadEnv } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = __dirname;
const isProd = process.env.NODE_ENV === "production";
const env = loadEnv(isProd ? "production" : "development", root, "");

const port = Number(env.PORT || process.env.PORT || 5173);
const host = env.HOST || process.env.HOST || "127.0.0.1";
const telegramToken = env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_BOT_TOKEN || "";
const telegramChatId = env.TELEGRAM_CHAT_ID || process.env.TELEGRAM_CHAT_ID || "";

const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mp4": "video/mp4",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".woff": "font/woff",
  ".woff2": "font/woff2"
};

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(payload));
}

function getMimeType(filePath) {
  return MIME_TYPES[path.extname(filePath)] || "application/octet-stream";
}

async function readRequestBody(req) {
  const chunks = [];

  for await (const chunk of req) {
    chunks.push(chunk);
  }

  const raw = Buffer.concat(chunks).toString("utf-8");
  return raw ? JSON.parse(raw) : {};
}

async function sendTelegramMessage({ name, message }) {
  if (!telegramToken || !telegramChatId) {
    throw new Error("Telegram env vars are missing");
  }

  const lines = [
    "Новая заявка с сайта-резюме",
    "",
    `Имя: ${name || "Без имени"}`,
    `Сообщение: ${message}`
  ];

  const response = await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id: telegramChatId,
      text: lines.join("\n"),
      disable_web_page_preview: true
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Telegram API error: ${response.status} ${errorText}`);
  }
}

async function handleContact(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return sendJson(res, 405, { ok: false, error: "Method Not Allowed" });
  }

  try {
    const payload = await readRequestBody(req);
    const name = String(payload.name || "").trim().slice(0, 120);
    const message = String(payload.message || "").trim().slice(0, 4000);

    if (!message) {
      return sendJson(res, 400, { ok: false, error: "Message is required" });
    }

    await sendTelegramMessage({ name, message });
    return sendJson(res, 200, { ok: true });
  } catch (error) {
    console.error(error);
    return sendJson(res, 500, {
      ok: false,
      error: "Не удалось отправить сообщение. Попробуйте ещё раз."
    });
  }
}

async function serveProductionAsset(req, res) {
  const distDir = path.join(root, "dist");
  const requestUrl = new URL(req.url || "/", "http://localhost");
  let filePath = path.join(distDir, decodeURIComponent(requestUrl.pathname));

  try {
    const fileStat = await stat(filePath);
    if (fileStat.isDirectory()) {
      filePath = path.join(filePath, "index.html");
    }
  } catch {
    filePath = path.join(distDir, "index.html");
  }

  try {
    const content = await readFile(filePath);
    res.statusCode = 200;
    res.setHeader("Content-Type", getMimeType(filePath));
    res.end(content);
  } catch {
    res.statusCode = 404;
    res.end("Not found");
  }
}

async function createAppServer() {
  let vite;

  if (!isProd) {
    vite = await createViteServer({
      root,
      server: {
        host,
        hmr: false,
        middlewareMode: true
      },
      appType: "spa"
    });
  }

  const server = createHttpServer(async (req, res) => {
    const requestUrl = req.url || "/";

    if (requestUrl.startsWith("/api/contact")) {
      return handleContact(req, res);
    }

    if (vite) {
      return vite.middlewares(req, res, (error) => {
        if (error) {
          vite.ssrFixStacktrace(error);
          console.error(error);
          res.statusCode = 500;
          res.end(error.message);
        }
      });
    }

    return serveProductionAsset(req, res);
  });

  server.listen(port, host, () => {
    console.log(`Олег — фронтенд, 100+ проектов`);
    console.log(`Server started: http://${host}:${port}`);
  });
}

createAppServer();
