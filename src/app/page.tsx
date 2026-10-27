import Link from "next/link";
import Image from "next/image";
import { getProducts, getCategories } from "@/lib/products";
import { getSettings } from "@/lib/settings";
import ProductCard from "@/components/ProductCard";
import Logo from "@/components/Logo";
import CarIcon from "@/components/CarIcon";

const categoryStyles: Record<string, { color: string; accent: string }> = {
  Street: { color: "#111827", accent: "#ef4444" },
  Muscle: { color: "#ef6c00", accent: "#263238" },
  Rally: { color: "#2e7d32", accent: "#c8e6c9" },
  "SUV & Off-Road": { color: "#6d4c41", accent: "#ffcc80" },
  Caminhões: { color: "#c62828", accent: "#fff3e0" },
  "Edição Especial": { color: "#212121", accent: "#ffd700" },
};

export default async function Home() {
  const [products, categories, settings] = await Promise.all([
    getProducts(),
    getCategories(),
    getSettings(),
  ]);
  const featured = products.slice(0, 4);

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0b1b42] via-[#15418f] to-[#3b8ff0]">
        <svg
          className="pointer-events-none absolute -right-24 -top-10 h-[420px] w-[420px] opacity-70 sm:right-0"
          viewBox="0 0 400 400"
          fill="none"
        >
          <ellipse
            cx="200"
            cy="200"
            rx="190"
            ry="90"
            stroke="#ff6e14"
            strokeWidth="10"
            transform="rotate(-20 200 200)"
          />
        </svg>

        <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 py-16 text-center sm:px-6 lg:flex-row lg:text-left">
          <div className="flex-1">
            <span className="rounded-full bg-[#ffd400] px-3 py-1 text-xs font-black uppercase tracking-widest text-[#0b1b42]">
              {settings.heroBadge}
            </span>
            <h1 className="mt-4 text-4xl font-black uppercase italic leading-tight text-white sm:text-5xl">
              {settings.heroTitle}
            </h1>
            <p className="mt-4 max-w-md text-base font-medium text-white/80">
              {settings.heroDescription}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
              <Link
                href="/produtos"
                className="rounded-full bg-[#ffd400] px-6 py-3 text-sm font-black uppercase tracking-wide text-[#0b1b42] transition-transform hover:scale-105"
              >
                {settings.heroPrimaryCta}
              </Link>
              <Link
                href="/produtos?categoria=Edi%C3%A7%C3%A3o%20Especial"
                className="rounded-full border-2 border-white px-6 py-3 text-sm font-black uppercase tracking-wide text-white transition-transform hover:scale-105"
              >
                {settings.heroSecondaryCta}
              </Link>
            </div>
          </div>
          <div className="flex flex-1 items-center justify-center">
            {settings.logo ? (
              <div className="relative h-52 w-52 drop-shadow-2xl sm:h-60 sm:w-60">
                <Image
                  src={settings.logo}
                  alt={settings.siteName}
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <Logo className="h-52 w-52 drop-shadow-2xl sm:h-60 sm:w-60" />
            )}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#3b8ff0] to-[#eef4ff] px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-center text-2xl font-black uppercase italic text-white sm:text-3xl">
            {settings.categoriesTitle}
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((category) => {
              const style = categoryStyles[category] ?? { color: "#1e293b", accent: "#38bdf8" };
              return (
                <Link
                  key={category}
                  href={`/produtos?categoria=${encodeURIComponent(category)}`}
                  className="flex flex-col items-center gap-3 rounded-2xl bg-[#ffd400] px-3 pb-4 pt-4 text-center shadow-[0_6px_0_0_rgba(0,0,0,0.15)] transition-transform hover:-translate-y-1"
                >
                  <span className="text-sm font-black uppercase leading-tight text-[#0b1b42]">
                    {category}
                  </span>
                  <CarIcon color={style.color} accent={style.accent} className="h-12 w-full" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-black uppercase italic text-zinc-900">
            {settings.featuredTitle}
          </h2>
          <Link
            href="/produtos"
            className="text-sm font-bold uppercase tracking-wide text-[#15418f] hover:underline"
          >
            Ver todos →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
