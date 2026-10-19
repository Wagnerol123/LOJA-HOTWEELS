"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/CartProvider";
import { formatPrice } from "@/lib/format";
import CarIcon from "@/components/CarIcon";

export default function CartPage() {
  const { items, catalog, setQuantity, removeItem, totalPrice } = useCart();

  const rows = items
    .map((item) => {
      const product = catalog.find((p) => p.id === item.productId);
      if (!product) return null;
      return { item, product };
    })
    .filter((row): row is { item: (typeof items)[number]; product: NonNullable<(typeof catalog)[number]> } => row !== null);

  if (rows.length === 0) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center gap-4 px-4 py-20 text-center sm:px-6">
        <h1 className="text-2xl font-black uppercase italic text-zinc-900">
          Seu carrinho está vazio
        </h1>
        <p className="text-sm text-zinc-500">
          Explore o catálogo e adicione alguns carrinhos colecionáveis.
        </p>
        <Link
          href="/produtos"
          className="rounded-full bg-[#ffd400] px-6 py-3 text-sm font-black uppercase tracking-wide text-[#0b1b42] hover:bg-[#0b1b42] hover:text-[#ffd400]"
        >
          Ver catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <h1 className="mb-8 text-3xl font-black uppercase italic text-zinc-900">
        Seu carrinho
      </h1>

      <div className="flex flex-col gap-4">
        {rows.map(({ item, product }) => (
          <div
            key={product.id}
            className="flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-4"
          >
            <div
              className="relative flex h-16 w-24 shrink-0 items-center justify-center overflow-hidden rounded-lg"
              style={{ backgroundColor: `${product.color}22` }}
            >
              {product.image ? (
                <Image src={product.image} alt={product.name} fill className="object-cover" />
              ) : (
                <CarIcon color={product.color} accent={product.accent} className="h-10 w-20" />
              )}
            </div>

            <div className="flex-1">
              <Link href={`/produtos/${product.slug}`} className="font-extrabold text-zinc-900 hover:text-[#15418f]">
                {product.name}
              </Link>
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                {product.category}
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-full border-2 border-zinc-200 px-2 py-1">
              <button
                onClick={() => setQuantity(product.id, item.quantity - 1)}
                className="flex h-7 w-7 items-center justify-center rounded-full font-black hover:bg-zinc-100"
                aria-label="Diminuir quantidade"
              >
                −
              </button>
              <span className="w-6 text-center text-sm font-bold">{item.quantity}</span>
              <button
                onClick={() => setQuantity(product.id, item.quantity + 1)}
                className="flex h-7 w-7 items-center justify-center rounded-full font-black hover:bg-zinc-100"
                aria-label="Aumentar quantidade"
              >
                +
              </button>
            </div>

            <span className="w-24 text-right font-black text-zinc-900">
              {formatPrice(product.price * item.quantity)}
            </span>

            <button
              onClick={() => removeItem(product.id)}
              className="text-xs font-bold uppercase tracking-wide text-zinc-400 hover:text-red-600"
            >
              Remover
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-end gap-4 border-t-2 border-zinc-200 pt-6">
        <div className="flex items-baseline gap-3">
          <span className="text-sm font-bold uppercase tracking-wide text-zinc-500">
            Total
          </span>
          <span className="text-3xl font-black text-zinc-900">
            {formatPrice(totalPrice)}
          </span>
        </div>
        <Link
          href="/checkout"
          className="rounded-full bg-[#ffd400] px-8 py-3 text-sm font-black uppercase tracking-wide text-[#0b1b42] hover:bg-[#0b1b42] hover:text-[#ffd400]"
        >
          Finalizar pedido
        </Link>
      </div>
    </div>
  );
}
