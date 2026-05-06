export const TERMINAL_LINES: { text: string; color: string }[] = [
  { text: "async function deploy(vision) {", color: "#7dd3fc" },
  { text: "  const ui = await design(vision);", color: "#e2e8f0" },
  { text: "  const api = architect({ ui });", color: "#e2e8f0" },
  { text: "  const app = build({ ui, api });", color: "#e2e8f0" },
  { text: "  await runTests(app);", color: "#e2e8f0" },
  { text: "  return ship(app); // ✓", color: "#86efac" },
  { text: "}", color: "#7dd3fc" },
  { text: "", color: "" },
  { text: "> deploy('your vision')", color: "#fbbf24" },
  { text: "> compiling modules...", color: "#94a3b8" },
  { text: "> 3 bundles optimized", color: "#94a3b8" },
  { text: "> build successful ✓", color: "#86efac" },
];

export const CHAR_DELAY_MS = 36;
export const LINE_GAP_MS = 90;
export const LOOP_PAUSE_MS = 2800;
