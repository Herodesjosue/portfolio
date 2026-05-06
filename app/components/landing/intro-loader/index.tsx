"use client";

import CounterNumber from "./CounterNumber";
import { useIntroLoader } from "./useIntroLoader";

export default function IntroLoader() {
  const { phase } = useIntroLoader();

  if (phase === "idle" || phase === "done") return null;

  const isLeaving = phase === "leaving";

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-fg"
      style={{
        transform: isLeaving ? "translateY(-105%)" : "translateY(0)",
        transition: isLeaving
          ? "transform 0.9s cubic-bezier(0.76, 0, 0.24, 1)"
          : "none",
      }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 grid-pattern-light animate-grid-pan [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_40%,transparent_100%)]" />
      </div>
      <div className="absolute inset-0 bg-noise mix-blend-screen pointer-events-none" />

      <div className="relative flex flex-col items-center gap-2 select-none">
        <CounterNumber phase={phase} />
        <span className="font-mono text-[10px] tracking-[0.4em] text-bg/40 uppercase mt-4">
          Loading
        </span>
      </div>

      <span className="absolute bottom-8 left-8 font-black text-xs tracking-[0.3em] text-bg/40 uppercase">
        HERODES
      </span>

      <div className="absolute bottom-0 left-0 h-[2px] w-full overflow-hidden bg-bg/10">
        <div
          className="h-full bg-bg"
          style={{
            width: phase === "entering" ? "0%" : "100%",
            transition: "width 1.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
      </div>

      <div className="absolute top-0 inset-x-0 h-px bg-bg/10" />
    </div>
  );
}
