import { motion, AnimatePresence } from "framer-motion";

type Props = {
  show: boolean;
};

export default function NeonLoader({ show }: Props) {
  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="relative h-14 w-14">
              <div className="absolute inset-0 rounded-full border border-white/10" />
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  boxShadow:
                    "0 0 0 1px rgba(0,243,255,0.45), 0 0 26px rgba(0,243,255,0.20), 0 0 36px rgba(255,0,229,0.14)"
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-neonCyan shadow-[0_0_18px_rgba(0,243,255,0.9)]" />
              </motion.div>
            </div>

            <div className="text-center text-sm text-white/70">
              <span className="font-display tracking-wide">Загрузка</span>
              <span className="ml-1 text-neonCyan">/</span>
              <span className="ml-1 text-neonPink">init</span>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

