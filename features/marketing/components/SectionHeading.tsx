type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="max-w-3xl space-y-4">
      {eyebrow ? (
        <p className="text-xs font-black uppercase tracking-[0.4em] text-[var(--accent)]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl leading-[1.05] sm:text-4xl lg:text-5xl">{title}</h2>
      {description ? (
        <p className="max-w-2xl text-base leading-8 text-[var(--muted)] sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
