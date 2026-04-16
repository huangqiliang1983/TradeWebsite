type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  theme = "light",
}: SectionHeadingProps) {
  const isCenter = align === "center";
  const isDark   = theme === "dark";

  return (
    <div className={`max-w-3xl space-y-5 ${isCenter ? "mx-auto text-center" : ""}`}>
      {eyebrow ? (
        <p className={`eyebrow ${isDark ? "eyebrow-gold" : "eyebrow-accent"}`}>
          <span className={`inline-block h-px w-6 ${isDark ? "bg-[var(--gold)]" : "bg-[var(--accent-light)]"}`} />
          {eyebrow}
        </p>
      ) : null}

      <h2
        className={`text-3xl sm:text-4xl lg:text-5xl ${isDark ? "text-white" : "text-[var(--foreground)]"}`}
      >
        {title}
      </h2>

      {/* Decorative gold rule */}
      <span className={`divider-gold ${isCenter ? "mx-auto" : ""}`} />

      {description ? (
        <p
          className={`max-w-2xl text-base leading-relaxed sm:text-lg ${isCenter ? "mx-auto" : ""} ${
            isDark ? "text-slate-400" : "text-[var(--muted)]"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
