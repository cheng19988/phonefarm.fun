"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  const main = images[active] ?? images[0];

  if (!main) return null;

  return (
    <div className="space-y-4">
      <div className="relative aspect-[4/3] lg:aspect-[16/11] rounded-2xl lg:rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 shadow-lg">
        <Image
          src={main}
          alt={alt}
          fill
          className="object-cover object-center"
          priority
          sizes="(max-width:1024px) 100vw, 58vw"
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 md:gap-3 overflow-x-auto pb-1 -mx-1 px-1 snap-x">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              className={`relative shrink-0 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-xl overflow-hidden border-2 transition-all snap-start ${
                i === active ? "border-orange-500 ring-2 ring-orange-500/30" : "border-slate-200 hover:border-slate-300"
              }`}
              aria-label={`View image ${i + 1}`}
            >
              <Image src={src} alt="" fill className="object-cover" sizes="112px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
