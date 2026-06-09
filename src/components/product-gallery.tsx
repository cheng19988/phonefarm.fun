"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const uniqueImages = useMemo(
    () => images.filter((src, i) => src && images.indexOf(src) === i),
    [images],
  );
  const [active, setActive] = useState(0);
  const main = uniqueImages[active] ?? uniqueImages[0];

  if (!main) return null;

  const thumbAlt = `${alt} — product image`;

  return (
    <div className="space-y-4 md:space-y-5">
      <div className="photo-stage photo-stage--wide shadow-lg ring-1 ring-zinc-200/80">
        <Image
          src={main}
          alt={thumbAlt}
          fill
          className="photo-fit--hero"
          priority
          sizes="(max-width:1024px) 100vw, 58vw"
        />
      </div>
      {uniqueImages.length > 1 && (
        <div
          className="flex gap-3 overflow-x-auto pb-2 snap-x"
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
              className={`relative shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border-2 transition-all snap-start photo-stage photo-stage--thumb ${
                i === active
                  ? "border-orange-500 ring-2 ring-orange-500/30 shadow-md"
                  : "border-zinc-200 hover:border-zinc-300"
              }`}
              aria-label={`View image ${i + 1} of ${uniqueImages.length}`}
            >
              <Image src={src} alt="" fill className="photo-fit" sizes="96px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
