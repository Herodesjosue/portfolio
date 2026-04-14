"use client";

import { useEffect, useState } from "react";
import { useUIStore } from "../store/uiStore";

type Phase = "idle" | "entering" | "holding" | "leaving" | "done";

export default function IntroLoader() {
  // "idle" = antes de montar en cliente (SSR-safe, no renderiza nada)
  const [phase, setPhase] = useState<Phase>("idle");

  // Zustand con persist lee sessionStorage solo en cliente, dentro de useEffect
  const { initialLoadComplete, setInitialLoadComplete } = useUIStore();

  useEffect(() => {
    // En este punto ya estamos en cliente: podemos leer sessionStorage de forma segura
    if (initialLoadComplete) {
      setPhase("done");
      return;
    }

    // Bloquear scroll mientras carga
    document.body.style.overflow = "hidden";

    // Primera visita: iniciar secuencia
    setPhase("entering");

    const t1 = setTimeout(() => setPhase("holding"),  600);
    // Al iniciar el slide-up, restaurar scroll para que la página ya esté lista
    const t2 = setTimeout(() => {
      setPhase("leaving");
      document.body.style.overflow = "";
    }, 2300);
    const t3 = setTimeout(() => {
      setPhase("done");
      setInitialLoadComplete();
    }, 3100);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      // Safety: siempre restaurar el scroll si el componente se desmonta
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // SSR y "ya visto": no pintar nada → cero hydration mismatch
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
      {/* Grid animado (variante clara para fondos oscuros) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 grid-pattern-light animate-grid-pan [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_40%,transparent_100%)]" />
      </div>

      {/* Grain overlay */}
      <div className="absolute inset-0 bg-noise mix-blend-screen pointer-events-none" />

      {/* Counter principal */}
      <div className="relative flex flex-col items-center gap-2 select-none">
        <CounterNumber phase={phase} />
        <span className="font-mono text-[10px] tracking-[0.4em] text-bg/40 uppercase mt-4">
          Loading
        </span>
      </div>

      {/* Logo esquina inferior izquierda */}
      <span className="absolute bottom-8 left-8 font-black text-xs tracking-[0.3em] text-bg/40 uppercase">
        HERODES
      </span>

      {/* Línea de progreso inferior */}
      <div className="absolute bottom-0 left-0 h-[2px] w-full overflow-hidden bg-bg/10">
        <div
          className="h-full bg-bg"
          style={{
            width: phase === "entering" ? "0%" : "100%",
            transition: "width 1.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
      </div>

      {/* Borde decorativo superior */}
      <div className="absolute top-0 inset-x-0 h-px bg-bg/10" />
    </div>
  );
}

/* ─── Sub-componente: contador 000 → 100 ──────────────────────────── */
function CounterNumber({ phase }: { phase: Phase }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (phase !== "holding") return;

    let current = 0;
    // ~1600ms para llegar a 100 a 60fps
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
