import React from "react";

interface HamburgerButtonProps {
  open: boolean;
  onClick: () => void;
}

const lineStyles = (open: boolean): React.CSSProperties[] => [
  open ? { transform: "translateY(8px) rotate(45deg)" } : {},
  open ? { opacity: 0 } : {},
  open ? { transform: "translateY(-8px) rotate(-45deg)" } : {},
];

export default function HamburgerButton({ open, onClick }: HamburgerButtonProps) {
  return (
    <button
      className="flex flex-col items-center justify-center gap-1.5 md:hidden"
      onClick={onClick}
      aria-label="Toggle menu"
    >
      {lineStyles(open).map((style, i) => (
        <span
          key={i}
          className="block h-px w-6 bg-fg transition-all duration-300"
          style={style}
        />
      ))}
    </button>
  );
}
