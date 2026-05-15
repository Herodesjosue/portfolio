"use client";

import { useEffect, useRef, useState } from "react";
import { TERMINAL_LINES, CHAR_DELAY_MS, LINE_GAP_MS, LOOP_PAUSE_MS } from "./data";

export function useCodeTerminal() {
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [displayed, setDisplayed] = useState<string[]>(() =>
    Array(TERMINAL_LINES.length).fill("")
  );
  const [cursorOn, setCursorOn] = useState(true);
  const resetRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const id = setInterval(() => setCursorOn((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  resetRef.current = () => {
    setDisplayed(Array(TERMINAL_LINES.length).fill(""));
    setLineIdx(0);
    setCharIdx(0);
  };

  useEffect(() => {
    if (lineIdx >= TERMINAL_LINES.length) {
      const id = setTimeout(() => resetRef.current?.(), LOOP_PAUSE_MS);
      return () => clearTimeout(id);
    }

    const line = TERMINAL_LINES[lineIdx];

    if (line.text === "") {
      const id = setTimeout(() => {
        setLineIdx((l) => l + 1);
        setCharIdx(0);
      }, LINE_GAP_MS);
      return () => clearTimeout(id);
    }

    if (charIdx < line.text.length) {
      const id = setTimeout(() => {
        setDisplayed((prev) => {
          const next = [...prev];
          next[lineIdx] = line.text.slice(0, charIdx + 1);
          return next;
        });
        setCharIdx((c) => c + 1);
      }, CHAR_DELAY_MS);
      return () => clearTimeout(id);
    }

    const id = setTimeout(() => {
      setLineIdx((l) => l + 1);
      setCharIdx(0);
    }, LINE_GAP_MS);
    return () => clearTimeout(id);
  }, [lineIdx, charIdx]);

  return { lines: TERMINAL_LINES, displayed, lineIdx, cursorOn };
}
