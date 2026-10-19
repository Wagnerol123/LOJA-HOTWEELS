import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getProductBySlug, getProducts } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import CarIcon from "@/components/CarIcon";
import QuantitySelector from "@/components/QuantitySelector";
import ProductCard from "@/components/ProductCard";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const products = await getProducts();
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-xs font-bold uppercase tracking-wide text-zinc-500">
        <Link href="/produtos" className="hover:text-[#15418f]">
          Catálogo
        </Link>{" "}
        / <span className="text-zinc-800">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div
          className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-zinc-200 p-10"
          style={{ backgroundColor: `${product.color}22` }}
        >
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          ) : (
            <CarIcon color={product.color} accent={product.accent} className="h-48 w-full max-w-xs" />
          )}
        </div>

        <div className="flex flex-col gap-4">
          {product.rarity && (
            <span className="w-fit rounded-full bg-[#0b1b42] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#ffd400]">
              {product.rarity}
            </span>
          )}
          <h1 className="text-3xl font-black uppercase italic text-zinc-900">
            {product.name}
          </h1>
          <p className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
            {product.category} · Escala {product.scale}
          </p>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-black text-zinc-900">
              {formatPrice(product.price)}
            </span>
            {product.oldPrice && (
              <span className="text-lg font-medium text-zinc-400 line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>

          <p className="leading-relaxed text-zinc-700">{product.description}</p>

          <ul className="flex flex-col gap-1 text-sm text-zinc-600">
            {product.details.map((detail) => (
              <li key={detail} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#15418f]" />
                {detail}
              </li>
            ))}
          </ul>

          <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">
            {product.stock > 0
              ? `${product.stock} unidades em estoque`
              : "Produto esgotado"}
          </p>

          {product.stock > 0 && (
            <QuantitySelector productId={product.id} stock={product.stock} />
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-xl font-black uppercase italic text-zinc-900">
            Você também pode gostar
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
