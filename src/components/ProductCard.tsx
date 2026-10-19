import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import CarIcon from "./CarIcon";
import AddToCartButton from "./AddToCartButton";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md">
      <Link href={`/produtos/${product.slug}`} className="block">
        <div
          className="relative flex aspect-[4/3] items-center justify-center overflow-hidden p-6"
          style={{ backgroundColor: `${product.color}22` }}
        >
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          ) : (
            <CarIcon
              color={product.color}
              accent={product.accent}
              className="h-20 w-full max-w-[160px] transition-transform group-hover:scale-110"
            />
          )}
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        {product.rarity && (
          <span className="w-fit rounded-full bg-[#0b1b42] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#ffd400]">
            {product.rarity}
          </span>
        )}
        <Link href={`/produtos/${product.slug}`}>
          <h3 className="text-base font-extrabold leading-tight text-zinc-900 hover:text-[#15418f]">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
          {product.category} · Escala {product.scale}
        </p>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-lg font-black text-zinc-900">
            {formatPrice(product.price)}
          </span>
          {product.oldPrice && (
            <span className="text-sm font-medium text-zinc-400 line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>
        <div className="mt-auto pt-2">
          <AddToCartButton productId={product.id} />
        </div>
      </div>
    </div>
  );
}
