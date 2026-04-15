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
        "overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--foreground)] text-white shadow-[0_24px_80px_rgba(15,23,42,0.08)]",
        className,
      )}
    >
      <div className="border-b border-white/10 px-5 py-4">
        <p className="text-sm uppercase tracking-[0.24em] text-white/60">Visual Brief</p>
        <h2 className="mt-2 text-xl text-white">{title}</h2>
      </div>
      <Image
        src={src}
        alt={alt}
        width={960}
        height={720}
        className="h-auto w-full border-b border-white/10"
        sizes="(min-width: 1024px) 36rem, 100vw"
      />
      <p className="px-5 py-4 text-sm leading-7 text-white/72">{description}</p>
    </div>
  );
}
