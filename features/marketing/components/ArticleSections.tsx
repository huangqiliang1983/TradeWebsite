import type { ContentSection } from "@/features/marketing/content";

type ArticleSectionsProps = {
  sections: ContentSection[];
};

export function ArticleSections({ sections }: ArticleSectionsProps) {
  return (
    <div className="space-y-12">
      {sections.map((section) => (
        <section key={section.heading} className="space-y-4">
          <h2 className="text-2xl font-bold">{section.heading}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-base leading-relaxed text-[var(--muted)]">
              {paragraph}
            </p>
          ))}
          {section.bullets ? (
            <ul className="space-y-3 text-base leading-relaxed text-[var(--muted)]">
              {section.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3">
                  <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-[var(--accent)] flex-shrink-0" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}
    </div>
  );
}
