"use client";

import { useState } from "react";

export function useNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggle = () => setMenuOpen((v) => !v);
  const close = () => setMenuOpen(false);
  return { menuOpen, toggle, close };
}
