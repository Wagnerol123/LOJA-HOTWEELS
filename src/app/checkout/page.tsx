"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { formatPrice } from "@/lib/format";

export default function CheckoutPage() {
  const { items, catalog, totalPrice, clearCart } = useCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const rows = items
    .map((item) => {
      const product = catalog.find((p) => p.id === item.productId);
      return product ? { item, product } : null;
    })
    .filter((row): row is { item: (typeof items)[number]; product: NonNullable<(typeof catalog)[number]> } => row !== null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: name,
          email,
          address,
          items: rows.map(({ item, product }) => ({
            productId: product.id,
            name: product.name,
            quantity: item.quantity,
            price: product.price,
          })),
        }),
      });

      if (!res.ok) {
        throw new Error("Falha ao registrar o pedido.");
      }

      const data = await res.json();
      setOrderNumber(data.orderNumber);
      clearCart();
    } catch {
      setError("Não foi possível registrar o pedido. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  }

  if (orderNumber) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center gap-4 px-4 py-20 text-center sm:px-6">
        <span className="rounded-full bg-[#0b1b42] px-3 py-1 text-xs font-black uppercase tracking-wide text-[#ffd400]">
          Pedido confirmado
        </span>
        <h1 className="text-2xl font-black uppercase italic text-zinc-900">
          Obrigado pela compra, {name || "colecionador"}!
        </h1>
        <p className="text-sm text-zinc-600">
          Seu pedido <strong>{orderNumber}</strong> foi registrado e está aguardando
          confirmação do lojista. Nenhuma cobrança real foi realizada — este é um projeto
          fictício de estudo.
        </p>
        <Link
          href="/produtos"
          className="rounded-full bg-[#ffd400] px-6 py-3 text-sm font-black uppercase tracking-wide text-[#0b1b42] hover:bg-[#0b1b42] hover:text-[#ffd400]"
        >
          Continuar comprando
        </Link>
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center gap-4 px-4 py-20 text-center sm:px-6">
        <h1 className="text-2xl font-black uppercase italic text-zinc-900">
          Seu carrinho está vazio
        </h1>
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
        Finalizar pedido
      </h1>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Dados de entrega — o lojista receberá essas informações no painel administrativo
          </p>
          <label className="flex flex-col gap-1 text-sm font-bold text-zinc-700">
            Nome completo
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-lg border-2 border-zinc-200 px-3 py-2 font-normal"
              placeholder="Seu nome"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm font-bold text-zinc-700">
            E-mail
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-lg border-2 border-zinc-200 px-3 py-2 font-normal"
              placeholder="voce@email.com"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm font-bold text-zinc-700">
            Endereço de entrega
            <textarea
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="rounded-lg border-2 border-zinc-200 px-3 py-2 font-normal"
              rows={3}
              placeholder="Rua, número, cidade"
            />
          </label>

          {error && <p className="text-sm font-semibold text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 rounded-full bg-[#ffd400] px-6 py-3 text-sm font-black uppercase tracking-wide text-[#0b1b42] hover:bg-[#0b1b42] hover:text-[#ffd400] disabled:opacity-60"
          >
            {submitting ? "Enviando..." : "Confirmar pedido"}
          </button>
        </form>

        <aside className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-5">
          <h2 className="text-sm font-black uppercase tracking-wide text-zinc-900">
            Resumo do pedido
          </h2>
          {rows.map(({ item, product }) => (
            <div key={product.id} className="flex justify-between text-sm text-zinc-700">
              <span>
                {product.name} × {item.quantity}
              </span>
              <span className="font-bold">{formatPrice(product.price * item.quantity)}</span>
            </div>
          ))}
          <div className="mt-2 flex justify-between border-t-2 border-zinc-200 pt-3 text-base font-black text-zinc-900">
            <span>Total</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
