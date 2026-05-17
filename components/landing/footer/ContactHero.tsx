interface ContactHeroProps {
  sectionLabel: string;
  headline1: string;
  headline2: string;
  descriptionPre: string;
  descriptionHighlight: string;
  descriptionPost: string;
}

export default function ContactHero({
  sectionLabel,
  headline1,
  headline2,
  descriptionPre,
  descriptionHighlight,
  descriptionPost,
}: ContactHeroProps) {
  return (
    <div
      className="flex flex-col  gap-8 lg:w-1/2 lg:sticky lg:top-40 h-fit"
      data-reveal="fade-up"
    >
      <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-muted">
        {sectionLabel}
      </span>
      <h2
        className="font-black tracking-tighter uppercase leading-[0.85] w-full overflow-hidden"
        style={{ fontSize: "clamp(2.5rem, 7vw, 7.5rem)" }}
      >
        {headline1}
        <br />
        <span
          className="text-transparent [-webkit-text-stroke:2px_var(--color-fg)]"
        >
          {headline2}
        </span>
      </h2>
      <p className="max-w-md font-mono text-[11px] leading-relaxed text-muted lowercase mt-4">
        {descriptionPre}{" "}
        <strong className="text-fg font-black uppercase">{descriptionHighlight}</strong>{" "}
        {descriptionPost}
      </p>
    </div>
  );
}
