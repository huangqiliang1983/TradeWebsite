type AdminPageHeaderProps = {
  title: string;
  description: string;
};

export function AdminPageHeader({
  title,
  description,
}: AdminPageHeaderProps) {
  return (
    <div className="space-y-2">
      <h1 className="text-3xl">{title}</h1>
      <p className="max-w-3xl text-base leading-8 text-[var(--muted)]">
        {description}
      </p>
    </div>
  );
}
