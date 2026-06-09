"use client";

import Image from "next/image";
import Link from "next/link";
import { DEVICE_MODELS, specLine, type DeviceModel } from "@/data/device-models";

function ModelCard({ model }: { model: DeviceModel }) {
  const img = model.cardImage ?? model.image;
  return (
    <Link href={`/products/${model.boxSlug}`} className="catalog-card group">
      <div className="catalog-card-image">
        <Image
          src={img}
          alt={`${model.name} phone farm box configuration`}
          fill
          className="object-contain p-4 md:p-5 group-hover:scale-[1.03] transition-transform duration-300"
          sizes="(max-width:768px) 50vw, 25vw"
        />
      </div>
      <div className="catalog-card-body">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent)] mb-1">{model.brand}</p>
        <h3 className="font-semibold text-zinc-900 text-sm leading-snug line-clamp-2 min-h-[2.5rem]">{model.name}</h3>
        <div className="flex flex-wrap gap-1 mt-2 mb-2">
          {model.ramGb && model.storageGb && (
            <span className="model-spec-chip">{model.ramGb}/{model.storageGb}GB</span>
          )}
          {model.ports.map((p) => (
            <span key={p} className="model-spec-chip">{p}</span>
          ))}
        </div>
        <p className="text-[11px] text-zinc-500 mt-auto line-clamp-2">{specLine(model)}</p>
      </div>
    </Link>
  );
}

export function DeviceModelGrid({ limit, models }: { limit?: number; models?: DeviceModel[] }) {
  const list = models ?? (limit ? DEVICE_MODELS.slice(0, limit) : DEVICE_MODELS);
  if (list.length === 0) return null;

  return (
    <div className="catalog-grid">
      {list.map((model) => (
        <ModelCard key={model.slug} model={model} />
      ))}
    </div>
  );
}

export function DeviceModelGridAll() {
  return <DeviceModelGrid />;
}
