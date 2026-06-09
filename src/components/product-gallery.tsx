"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

const frameClass =
  "relative overflow-hidden rounded-2xl lg:rounded-3xl bg-gradient-to-b from-slate-100 to-slate-50 border-2 border-slate-200";

const imageClass = "object-contain object-center p-4 md:p-6 lg:p-8";

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const uniqueImages = useMemo(
    () => images.filter((src, i) => src && images.indexOf(src) === i),
    [images],
  );
  const [active, setActive] = useState(0);
  const main = uniqueImages[active] ?? uniqueImages[0];

  if (!main) return null;

  const thumbAlt = `${alt} — reference image`;

  return (
    <div className="space-y-4 md:space-y-5">
      <div className={`${frameClass} aspect-[4/3] shadow-lg`}>
        <Image
          src={main}
          alt={thumbAlt}
          fill
          className={imageClass}
          priority
          sizes="(max-width:1024px) 100vw, 58vw"
        />
      </div>
      {uniqueImages.length > 1 && (
        <div
          className="flex gap-3 md:gap-4 overflow-x-auto pb-2 -mx-1 px-1 snap-x scrollbar-thin"
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
              className={`relative shrink-0 w-[72px] h-[72px] sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-xl overflow-hidden border-2 transition-all snap-start bg-gradient-to-b from-slate-100 to-slate-50 ${
                i === active
                  ? "border-orange-500 ring-2 ring-orange-500/30 shadow-md"
                  : "border-slate-200 hover:border-slate-300"
              }`}
              aria-label={`View image ${i + 1} of ${uniqueImages.length}`}
            >
              <Image src={src} alt="" fill className="object-contain object-center p-1.5 md:p-2" sizes="112px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
