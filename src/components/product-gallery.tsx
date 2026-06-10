"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

export function ProductGallery({
  images,
  alt,
  caption,
}: {
  images: string[];
  alt: string;
  caption?: string;
}) {
  const uniqueImages = useMemo(
    () => images.filter((src, i) => src && images.indexOf(src) === i),
    [images],
  );
  const [active, setActive] = useState(0);
  const main = uniqueImages[active] ?? uniqueImages[0];

  if (!main) return null;

  const thumbAlt = `${alt} — product image`;

  return (
    <div className="space-y-3 md:space-y-4">
      <div className="photo-stage photo-stage--wide product-gallery-main shadow-md ring-1 ring-zinc-200/80">
        <Image
          src={main}
          alt={thumbAlt}
          fill
          className="photo-fit--hero"
          priority
          sizes="(max-width:1024px) 100vw, 62vw"
        />
      </div>
      {caption && (
        <p className="text-xs text-zinc-500 leading-relaxed px-0.5">{caption}</p>
      )}
      {uniqueImages.length > 1 && (
        <div
          className="flex gap-2 md:gap-3 overflow-x-auto pb-1 snap-x"
          role="tablist"
          aria-label="Product images"
        >
          {uniqueImages.map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={`relative shrink-0 w-[4.5rem] h-[4.5rem] sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all snap-start photo-stage photo-stage--thumb ${
                i === active
                  ? "border-[var(--accent)] ring-2 ring-orange-500/25 shadow-sm"
                  : "border-zinc-200 hover:border-zinc-300"
              }`}
              aria-label={`View image ${i + 1} of ${uniqueImages.length}`}
            >
              <Image src={src} alt="" fill className="photo-fit" sizes="80px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
