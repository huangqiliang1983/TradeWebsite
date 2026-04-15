import Image from "next/image";

import { cx } from "@/lib/utils";

type IllustrationPanelProps = {
  src: string;
  alt: string;
  title: string;
  description: string;
  className?: string;
};

export function IllustrationPanel({
  src,
  alt,
  title,
  description,
  className,
}: IllustrationPanelProps) {
  return (
    <div
      className={cx(
        "soft-panel group overflow-hidden rounded-[2rem] border border-[rgba(255,255,255,0.12)] bg-[var(--charcoal)] text-white",
        className,
      )}
    >
      <div className="border-b border-white/10 px-5 py-4">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent-soft)]">
          Visual Brief
        </p>
        <h2 className="mt-2 text-xl text-white">{title}</h2>
      </div>
      <Image
        src={src}
        alt={alt}
        width={960}
        height={720}
        className="h-auto w-full border-b border-white/10 transition duration-500 group-hover:scale-[1.015]"
        sizes="(min-width: 1024px) 36rem, 100vw"
      />
      <p className="px-5 py-4 text-sm leading-7 text-white/72">{description}</p>
    </div>
  );
}
