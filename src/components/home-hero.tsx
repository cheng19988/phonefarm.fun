import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/lib/images";
import { SITE } from "@/lib/config";

const VALUE_PROPS = [
  {
    icon: "🏭",
    title: "Factory-Direct Hardware",
    desc: "Phone farm boxes, motherboard arrays, power and cooling modules assembled for real-device deployment.",
  },
  {
    icon: "✓",
    title: "Tested Before Shipment",
    desc: "Power, cooling, cabling, and basic operation checks before packing.",
  },
  {
    icon: "⚙",
    title: "Built for Your Setup",
    desc: "Support for 20-node boxes, motherboard clusters, rack cabinets, and custom deployment requests.",
  },
] as const;

export function HomeHero() {
  return (
    <>
      <section className="home-hero relative min-h-[92vh] flex flex-col justify-center overflow-hidden">
        {/* Full-width background scene */}
        <div className="absolute inset-0" aria-hidden>
          <Image
            src={IMAGES.workshop}
            alt=""
            fill
            className="object-cover scale-105"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/92 via-slate-900/78 to-slate-800/55" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_50%,rgba(234,88,12,0.12),transparent_55%)]" />
        </div>

        <div className="container-wide relative z-10 flex-1 flex items-center py-16 md:py-20 lg:py-24">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-6 items-center w-full">
            {/* Copy */}
            <div className="lg:col-span-5 xl:col-span-4">
              <p className="text-sm font-semibold tracking-wide text-orange-400 mb-4 uppercase">
                {SITE.location} · Hardware assembly since {SITE.since}
              </p>
              <h1 className="text-4xl sm:text-5xl xl:text-[3.25rem] font-bold text-white leading-[1.08] mb-5 tracking-tight">
                Professional Phone Farm Boxes &amp; Motherboard Arrays
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 mb-8 max-w-lg leading-relaxed">
                Factory-built real-device hardware for phone farm setups, app testing labs, remote operation, and scalable device deployment.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/products/phone-farm-box" className="btn-primary text-base px-7 py-3.5 shadow-lg shadow-orange-600/30">
                  Shop Phone Farm Box
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-7 py-3.5 rounded-lg bg-white/10 text-white font-medium border border-white/25 hover:bg-white/20 backdrop-blur-sm transition-all text-base"
                >
                  Request Custom Quote
                </Link>
              </div>
            </div>

            {/* Oversized product visual cluster */}
            <div className="lg:col-span-7 xl:col-span-8 relative min-h-[340px] sm:min-h-[420px] lg:min-h-[520px] xl:min-h-[580px]">
              {/* Main product — dominates the right half */}
              <div className="home-hero-product-main absolute inset-y-0 right-0 left-[2%] sm:left-[5%] lg:left-[8%]">
                <div className="relative w-full h-full rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl shadow-black/50 ring-1 ring-white/10">
                  <Image
                    src={IMAGES.phoneFarmBox.hero}
                    alt="20-node phone farm box with real Android devices in factory chassis"
                    fill
                    className="object-cover object-center"
                    priority
                    sizes="(max-width:1024px) 90vw, 55vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Motherboard array — top-left overlay */}
              <div className="home-hero-product-secondary absolute top-0 left-0 w-[42%] sm:w-[38%] lg:w-[34%] aspect-[4/3] rounded-xl lg:rounded-2xl overflow-hidden shadow-xl shadow-black/40 ring-2 ring-white/20 z-10">
                <Image
                  src={IMAGES.motherboardBox.hero}
                  alt="Motherboard array cluster for headless Android deployment"
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 40vw, 22vw"
                />
                <span className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/80 to-transparent px-3 py-2 text-[10px] sm:text-xs font-medium text-white">
                  Motherboard array
                </span>
              </div>

              {/* Control / screen scene — bottom-right overlay */}
              <div className="home-hero-product-screen absolute bottom-0 right-0 w-[48%] sm:w-[44%] lg:w-[40%] aspect-[16/10] rounded-xl lg:rounded-2xl overflow-hidden shadow-xl shadow-black/40 ring-2 ring-white/20 z-10">
                <Image
                  src={IMAGES.remoteControl.hero}
                  alt="Device lab control and remote operation interface"
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 45vw, 25vw"
                />
                <span className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/80 to-transparent px-3 py-2 text-[10px] sm:text-xs font-medium text-white">
                  Remote operation setup
                </span>
              </div>

              {/* Accent rack image — subtle depth behind main product on large screens */}
              <div className="hidden xl:block absolute -bottom-6 -right-8 w-[28%] aspect-[3/4] rounded-xl overflow-hidden opacity-40 blur-[1px] -z-10">
                <Image
                  src={IMAGES.customCabinet.hero}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="200px"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Value props — attached strip at hero base */}
        <div className="relative z-20 border-t border-white/10 bg-slate-950/60 backdrop-blur-md">
          <div className="container-wide py-6 md:py-8">
            <div className="grid md:grid-cols-3 gap-6 md:gap-0 md:divide-x md:divide-white/10">
              {VALUE_PROPS.map((item) => (
                <div key={item.title} className="flex gap-4 items-start md:px-6 first:md:pl-0 last:md:pr-0">
                  <div className="w-11 h-11 shrink-0 rounded-full bg-orange-500/20 border border-orange-400/30 flex items-center justify-center text-lg text-orange-300">
                    {item.icon}
                  </div>
                  <div>
                    <h2 className="font-bold text-white mb-1 text-sm sm:text-base">{item.title}</h2>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
