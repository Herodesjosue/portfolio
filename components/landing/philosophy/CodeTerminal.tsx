"use client";

import { useCodeTerminal } from "./useCodeTerminal";
import { TERMINAL_LINES } from "./data";

export default function CodeTerminal() {
  const { displayed, lineIdx, cursorOn } = useCodeTerminal();

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#131414] flex flex-col">
      <div className="flex shrink-0 items-center gap-2 border-b border-white/[0.07] px-5 py-3">
        <span className="h-3 w-3 rounded-full bg-red-500/50" />
        <span className="h-3 w-3 rounded-full bg-yellow-500/50" />
        <span className="h-3 w-3 rounded-full bg-green-500/50" />
        <span className="ml-4 font-mono text-[10px] tracking-widest text-white/25 uppercase">
          portfolio.ts
        </span>
        <span className="ml-auto flex items-center gap-2 font-mono text-[9px] tracking-widest text-white/30 uppercase">
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-red-500/60" />
          live
        </span>
      </div>

      <div className="flex-1 overflow-hidden px-5 py-5">
        <div className="space-y-[3px]">
          {TERMINAL_LINES.map((line, i) => {
            if (i > lineIdx) return <div key={i} className="h-5" aria-hidden="true" />;
            const isActive = i === lineIdx;
            const text = displayed[i];

            return (
              <div key={i} className="flex min-h-5 items-start gap-0">
                <span
                  className="mr-5 w-5 shrink-0 select-none text-right font-mono text-[10px] leading-5 text-white/15"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <span
                  className="font-mono text-[11px] leading-5 tracking-wide"
                  style={{ color: line.color || "transparent" }}
                >
                  {text}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="ml-[1px] inline-block h-[0.85em] w-[2px] translate-y-[1px] align-middle"
                      style={{
                        backgroundColor: line.color || "#7dd3fc",
                        opacity: cursorOn ? 0.85 : 0,
                        transition: "opacity 0.1s ease",
                      }}
                    />
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex shrink-0 items-center justify-between border-t border-white/[0.07] px-5 py-2 font-mono text-[9px] tracking-widest text-white/25 uppercase">
        <span>TypeScript</span>
        <span>UTF-8</span>
      </div>
    </div>
  );
}
