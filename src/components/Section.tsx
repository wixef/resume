import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

type Props = {
  id?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  variant?: string;
};

export default function Section({ id, title, subtitle, children, variant }: Props) {
  const shellRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(shellRef, {
    once: true,
    amount: 0.05,
    margin: "0px 0px -120px 0px"
  });

  return (
    <section id={id} className="w-full px-5 py-10 md:px-8 md:py-12 xl:px-14">
      <div
        ref={shellRef}
        className={`section-shell ${variant ?? ""} relative overflow-hidden rounded-[34px] px-5 py-14 md:px-8 md:py-16 xl:px-10`}
      >
        <motion.div
          className="mb-10"
          style={{ willChange: "transform, opacity" }}
          initial={{ opacity: 0, y: 26 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <h2 className="font-display text-4xl font-semibold tracking-tight text-white md:text-5xl">
              <span className="glitch" data-text={title}>
                {title}
              </span>
            </h2>
            {subtitle ? (
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">
                {subtitle}
              </p>
            ) : null}
          </div>
        </motion.div>
        <motion.div
          style={{ willChange: "transform, opacity" }}
          initial={{ opacity: 0, y: 34, scale: 0.992 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 34, scale: 0.992 }}
          transition={{ duration: 0.65, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
