import { AnimatePresence, motion } from "framer-motion";

type Props = {
  show: boolean;
  title: string;
  text?: string;
  onClose: () => void;
};

export default function Toast({ show, title, text, onClose }: Props) {
  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="fixed bottom-5 left-1/2 z-[70] w-[calc(100%-40px)] max-w-md -translate-x-1/2"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.2 }}
        >
          <div className="rounded-2xl border border-white/10 bg-black/70 p-4 shadow-neon backdrop-blur-md">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-display text-sm font-semibold text-white/90">
                  {title}
                </div>
                {text ? (
                  <div className="mt-1 text-sm text-white/70">{text}</div>
                ) : null}
              </div>
              <button
                type="button"
                className="rounded-xl border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/70 hover:bg-white/10"
                onClick={onClose}
              >
                Закрыть
              </button>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

