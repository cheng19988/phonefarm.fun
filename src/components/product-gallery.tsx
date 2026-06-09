"use client";

import Image from "next/image";
import { useState } from "react";

const frameClass =
  "relative overflow-hidden rounded-2xl lg:rounded-3xl bg-gradient-to-b from-slate-100 to-slate-50 border-2 border-slate-200";

const imageClass = "object-contain object-center p-4 md:p-6 lg:p-8";

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  const main = images[active] ?? images[0];

  if (!main) return null;

  return (
    <div className="space-y-4 md:space-y-5">
      <div className={`${frameClass} aspect-[4/3] shadow-lg`}>
        <Image
          src={main}
          alt={alt}
          fill
          className={imageClass}
          priority
          sizes="(max-width:1024px) 100vw, 58vw"
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 md:gap-3 overflow-x-auto pb-1 -mx-1 px-1 snap-x">
          {images.map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              onClick={() => setActive(i)}
              className={`relative shrink-0 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-xl overflow-hidden border-2 transition-all snap-start bg-gradient-to-b from-slate-100 to-slate-50 ${
                i === active
                  ? "border-orange-500 ring-2 ring-orange-500/30 shadow-md"
                  : "border-slate-200 hover:border-slate-300"
              }`}
              aria-label={`View image ${i + 1}`}
              aria-current={i === active ? "true" : undefined}
            >
              <Image src={src} alt="" fill className="object-contain object-center p-1.5 md:p-2" sizes="112px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
