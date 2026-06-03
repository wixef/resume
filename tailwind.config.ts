import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  safelist: ["cursor-none"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        display: ["Space Grotesk", "Inter", "ui-sans-serif", "system-ui"]
      },
      colors: {
        bg0: "#0a0a0a",
        bg1: "#0f0f1a",
        neonCyan: "#00f3ff",
        neonPink: "#ff00e5"
      },
      boxShadow: {
        neon: "0 0 0 1px rgba(0,243,255,0.6), 0 0 24px rgba(0,243,255,0.18), 0 0 36px rgba(255,0,229,0.12)"
      },
      keyframes: {
        floaty: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        }
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite"
      }
    }
  },
  plugins: []
} satisfies Config;
