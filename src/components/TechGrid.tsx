import { motion } from "framer-motion";
import type { TechItem } from "@/data/tech";

type Props = {
  items: TechItem[];
};

export default function TechGrid({ items }: Props) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
      {items.map((t) => {
        const glow =
          t.accent === "cyan"
            ? "shadow-[0_0_0_1px_rgba(0,243,255,0.35),0_0_28px_rgba(0,243,255,0.12)]"
            : "shadow-[0_0_0_1px_rgba(255,0,229,0.30),0_0_28px_rgba(255,0,229,0.10)]";
        const accentText = t.accent === "cyan" ? "text-neonCyan" : "text-neonPink";

        return (
          <motion.div
            key={t.name}
            className="glass-panel group rounded-[28px] p-5 transition hover:shadow-neon"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.03 }}
          >
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div
                className="absolute -left-16 -top-16 h-40 w-40 rounded-full blur-2xl"
                style={{
                  background:
                    t.accent === "cyan"
                      ? "rgba(0,243,255,0.10)"
                      : "rgba(255,0,229,0.10)"
                }}
              />
            </div>

            <div className="relative flex items-center gap-3">
              <div
                className={`grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-black/30 text-sm ${glow}`}
              >
                <span className={`font-display text-base ${accentText}`}>{t.short}</span>
              </div>
              <div>
                <div className="font-display text-base font-semibold text-white/90 md:text-lg">
                  {t.name}
                </div>
                <div className="mt-1 max-w-[18rem] text-sm leading-relaxed text-white/52">
                  {t.note}
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
