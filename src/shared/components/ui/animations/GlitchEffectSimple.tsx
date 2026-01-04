"use client";
import { useEffect, useState } from "react";

const GlitchEffectSimple = () => {
  const [glitches, setGlitches] = useState(
    Array(9).fill(null).map(() => ({
      top: 0,
      left: 0,
      width: 0,
      height: 0,
      color: "#FFF",
      opacity: 1,
    }))
  );

  // const colors = [
  //   "#FFFFFF", "#efd8d8", "#9db1c1", "#dfc9e1",
  //   "#595959", "#000000", "#e2f4cb", "#f4e4cb",
  //   "#dfc1af", "#b25773", "#afd3b3", "#fdffc9", "#e5c9ff"
  // ];


  const colors = [
    "#FFFFFF", "#F8F8F8", "#F0F0F0", "#E8E8E8",
    "#E0E0E0", "#D8D8D8", "#D0D0D0", "#C8C8C8",
    "#C0C0C0", "#B8B8B8", "#B0B0B0", "#A8A8A8", "#A0A0A0"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitches((prev) =>
        prev.map(() => ({
          top: Math.random() * 100,
          left: Math.random() * 150 - 50,
          width: Math.random() * 1900 + 30,
          height: Math.random() * 40 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random(),
        }))
      );
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-50">
      {glitches.map((glitch, i) => (
        <div
          key={i}
          className="fixed transition-none"
          style={{
            top: `${glitch.top}%`,
            left: `${glitch.left}%`,
            width: `${glitch.width}px`,
            height: `${glitch.height}px`,
            backgroundColor: glitch.color,
            opacity: glitch.opacity,
            zIndex: 100,
          }}
        />
      ))}
    </div>
  );
};

export default GlitchEffectSimple;