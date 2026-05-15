"use client";

import { useEffect, useState } from "react";
import { Phase } from "./types";

interface CounterNumberProps {
  phase: Phase;
}

export default function CounterNumber({ phase }: CounterNumberProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (phase !== "holding") return;

    let current = 0;
    const step = (100 / 1600) * 16;

    const id = setInterval(() => {
      current += step;
      if (current >= 100) {
        setCount(100);
        clearInterval(id);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(id);
  }, [phase]);

  return (
    <span
      className="font-black text-bg tabular-nums leading-none"
      style={{ fontSize: "clamp(5rem, 18vw, 16rem)" }}
    >
      {String(count).padStart(3, "0")}
    </span>
  );
}
