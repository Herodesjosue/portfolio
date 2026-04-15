"use client";

import { useEffect, useRef, useState } from "react";

// ── Definición de las líneas de código con colores de sintaxis ─────
const LINES: { text: string; color: string }[] = [
  { text: "async function deploy(vision) {", color: "#7dd3fc" },
  { text: "  const ui = await design(vision);", color: "#e2e8f0" },
  { text: "  const api = architect({ ui });", color: "#e2e8f0" },
  { text: "  const app = build({ ui, api });", color: "#e2e8f0" },
  { text: "  await runTests(app);", color: "#e2e8f0" },
  { text: "  return ship(app); // ✓", color: "#86efac" },
  { text: "}", color: "#7dd3fc" },
  { text: "", color: "" }, // línea vacía
  { text: "> deploy('your vision')", color: "#fbbf24" },
  { text: "> compiling modules...", color: "#94a3b8" },
  { text: "> 3 bundles optimized", color: "#94a3b8" },
  { text: "> build successful ✓", color: "#86efac" },
];

const CHAR_DELAY_MS = 36;  // velocidad de tipeo por carácter
const LINE_GAP_MS   = 90;  // pausa entre líneas
const LOOP_PAUSE_MS = 2800; // pausa antes de reiniciar el bucle

export default function CodeTerminal() {
  const [lineIdx, setLineIdx]       = useState(0);
  const [charIdx, setCharIdx]       = useState(0);
  const [displayed, setDisplayed]   = useState<string[]>(() => Array(LINES.length).fill(""));
  const [cursorOn, setCursorOn]     = useState(true);
  // ref para evitar stale closures en el reset
  const resetRef = useRef<(() => void) | null>(null);

  // ── Cursor parpadeante ─────────────────────────────────────────
  useEffect(() => {
    const id = setInterval(() => setCursorOn((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  // ── Función de reset que no crea deps circulares ───────────────
  resetRef.current = () => {
    setDisplayed(Array(LINES.length).fill(""));
    setLineIdx(0);
    setCharIdx(0);
  };

  // ── Motor de animación ─────────────────────────────────────────
  useEffect(() => {
    // Todas las líneas terminadas → esperar y reiniciar
    if (lineIdx >= LINES.length) {
      const id = setTimeout(() => resetRef.current?.(), LOOP_PAUSE_MS);
      return () => clearTimeout(id);
    }

    const line = LINES[lineIdx];

    // Línea vacía: avanzar sin necesidad de tipear
    if (line.text === "") {
      const id = setTimeout(() => {
        setLineIdx((l) => l + 1);
        setCharIdx(0);
      }, LINE_GAP_MS);
      return () => clearTimeout(id);
    }

    // Tipear el siguiente carácter
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

    // Línea completa → pausa y pasar a siguiente
    const id = setTimeout(() => {
      setLineIdx((l) => l + 1);
      setCharIdx(0);
    }, LINE_GAP_MS);
    return () => clearTimeout(id);
  }, [lineIdx, charIdx]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#131414] flex flex-col">

      {/* ── Barra de título estilo editor ─────────────────────── */}
      <div className="flex shrink-0 items-center gap-2 border-b border-white/[0.07] px-5 py-3">
        <span className="h-3 w-3 rounded-full bg-red-500/50" />
        <span className="h-3 w-3 rounded-full bg-yellow-500/50" />
        <span className="h-3 w-3 rounded-full bg-green-500/50" />
        <span className="ml-4 font-mono text-[10px] tracking-widest text-white/25 uppercase">
          portfolio.ts
        </span>
        {/* Indicador "REC" en la esquina derecha de la barra */}
        <span className="ml-auto flex items-center gap-2 font-mono text-[9px] tracking-widest text-white/30 uppercase">
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-red-500/60" />
          live
        </span>
      </div>

      {/* ── Área de código ────────────────────────────────────── */}
      <div className="flex-1 overflow-hidden px-5 py-5">
        <div className="space-y-[3px]">
          {LINES.map((line, i) => {
            if (i > lineIdx) return <div key={i} className="h-5" aria-hidden="true" />;
            const isActive = i === lineIdx;
            const text     = displayed[i];

            return (
              <div key={i} className="flex min-h-5 items-start gap-0">
                {/* Número de línea */}
                <span
                  className="mr-5 w-5 shrink-0 select-none text-right font-mono text-[10px] leading-5 text-white/15"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>

                {/* Texto de la línea */}
                <span
                  className="font-mono text-[11px] leading-5 tracking-wide"
                  style={{ color: line.color || "transparent" }}
                >
                  {text}
                  {/* Cursor — solo en la línea activa */}
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

      {/* ── Barra de estado inferior ──────────────────────────── */}
      <div className="flex shrink-0 items-center justify-between border-t border-white/[0.07] px-5 py-2 font-mono text-[9px] tracking-widest text-white/25 uppercase">
        <span>TypeScript</span>
        <span>UTF-8</span>
      </div>
    </div>
  );
}
