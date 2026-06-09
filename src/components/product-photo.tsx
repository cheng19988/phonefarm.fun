import Image from "next/image";
import type { ComponentProps } from "react";

type StageVariant = "card" | "wide" | "hero" | "thumb";

const STAGE_CLASS: Record<StageVariant, string> = {
  card: "photo-stage photo-stage--card",
  wide: "photo-stage photo-stage--wide",
  hero: "photo-stage photo-stage--hero",
  thumb: "photo-stage photo-stage--thumb",
};

type Props = {
  src: string;
  alt: string;
  stage?: StageVariant;
  priority?: boolean;
  sizes?: string;
  className?: string;
  wrapperClassName?: string;
} & Pick<ComponentProps<typeof Image>, "fill">;

/** Product photo on unified gray stage — always object-contain, never cropped */
export function ProductPhoto({
  src,
  alt,
  stage = "card",
  priority,
  sizes = "33vw",
  className = "",
  wrapperClassName = "",
  fill = true,
}: Props) {
  return (
    <div className={`${STAGE_CLASS[stage]} ${wrapperClassName}`}>
      <Image
        src={src}
        alt={alt}
        fill={fill}
        priority={priority}
        sizes={sizes}
        className={`photo-fit ${className}`}
      />
    </div>
  );
}
