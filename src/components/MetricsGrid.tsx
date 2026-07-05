import { motion } from "framer-motion";
import type { MetricItem } from "@/data/metrics";

type Props = {
  items: MetricItem[];
};

export default function MetricsGrid({ items }: Props) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 xl:grid-cols-6">
      {items.map((item) => {
        const accentText = item.accent === "cyan" ? "text-neonCyan" : "text-neonPink";

        return (
          <motion.div
            key={`${item.value}-${item.label}`}
            className="glass-panel group rounded-[22px] p-4 transition hover:shadow-neon md:rounded-[28px] md:p-5"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.03 }}
          >
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div
                className="absolute -left-12 -top-12 h-32 w-32 rounded-full blur-2xl"
                style={{
                  background:
                    item.accent === "cyan"
                      ? "rgba(0,243,255,0.10)"
                      : "rgba(255,0,229,0.10)"
                }}
              />
            </div>

            <div className="relative">
              <div className={`font-display text-2xl font-semibold leading-none md:text-3xl ${accentText}`}>
                {item.value}
              </div>
              <div className="mt-2 font-display text-sm font-semibold text-white/90 md:text-base">
                {item.label}
              </div>
              <div className="mt-1.5 text-xs leading-relaxed text-white/52 md:text-sm">{item.note}</div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
