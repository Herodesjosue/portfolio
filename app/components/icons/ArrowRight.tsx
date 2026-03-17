interface IconProps { className?: string }

export default function ArrowRight({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 6h8M6 2l4 4-4 4" />
    </svg>
  );
}
