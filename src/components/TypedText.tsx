import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  words: string[];
  className?: string;
};

type Phase = "typing" | "pause" | "deleting";

export default function TypedText({ words, className }: Props) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<Phase>("typing");
  const timerRef = useRef<number | null>(null);

  const current = useMemo(() => words[index % words.length] ?? "", [index, words]);

  useEffect(() => {
    const clear = () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = null;
    };

    clear();

    const speed = phase === "typing" ? 42 : phase === "deleting" ? 26 : 900;
    timerRef.current = window.setTimeout(() => {
      if (phase === "typing") {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) setPhase("pause");
      } else if (phase === "pause") {
        setPhase("deleting");
      } else {
        const next = current.slice(0, Math.max(0, text.length - 1));
        setText(next);
        if (!next) {
          setIndex((v) => v + 1);
          setPhase("typing");
        }
      }
    }, speed);

    return clear;
  }, [current, phase, text]);

  return (
    <span className={className}>
      <span className="text-white/90">{text}</span>
      <span className="ml-0.5 inline-block h-[1em] w-[1px] translate-y-[2px] bg-neonCyan shadow-[0_0_16px_rgba(0,243,255,0.65)]" />
    </span>
  );
}

