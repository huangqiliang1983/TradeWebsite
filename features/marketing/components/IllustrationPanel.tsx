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
        "card-dark overflow-hidden",
        className,
      )}
    >
      <div className="border-b border-white/10 px-5 py-4">
        <h2 className="text-base font-bold text-white">{title}</h2>
      </div>
      <div className="relative overflow-hidden">
        <Image
          src={src}
          alt={alt}
          width={960}
          height={720}
          className="h-auto w-full opacity-80"
          sizes="(min-width: 1024px) 36rem, 100vw"
        />
      </div>
      <p className="px-5 py-4 text-sm leading-relaxed text-slate-400">{description}</p>
    </div>
  );
}
