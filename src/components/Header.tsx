"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { useCart } from "./CartProvider";
import Logo from "./Logo";

export default function Header() {
  const { totalItems } = useCart();
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("busca", query.trim());
    router.push(`/produtos${params.toString() ? `?${params.toString()}` : ""}`);
  }

  return (
    <header className="sticky top-0 z-50 bg-[#0b1b42]">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-11 w-11 shrink-0" />
          <span className="hidden text-lg font-black uppercase italic tracking-tight text-white sm:inline sm:text-xl">
            Universo Colecionável
          </span>
        </Link>

        <nav className="hidden items-center gap-2 text-sm font-bold uppercase tracking-wide text-white md:flex">
          <Link
            href="/produtos"
            className="rounded-full px-4 py-2 transition-colors hover:bg-white/10"
          >
            Catálogo
          </Link>
          <Link
            href="/produtos?categoria=Edição%20Especial"
            className="rounded-full px-4 py-2 transition-colors hover:bg-white/10"
          >
            Edição Especial
          </Link>
        </nav>

        <div className="order-last flex w-full items-center gap-3 sm:order-none sm:w-auto sm:flex-1 sm:justify-end">
          <form
            onSubmit={handleSearch}
            className="flex w-full max-w-xs items-center overflow-hidden rounded-full bg-white sm:w-56"
          >
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="O que você procura?"
              className="w-full px-4 py-2 text-sm text-zinc-900 outline-none"
            />
            <button
              type="submit"
              aria-label="Buscar"
              className="flex h-9 w-9 shrink-0 items-center justify-center text-[#0b1b42]"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </form>

          <Link
            href="/carrinho"
            className="relative flex items-center gap-2 rounded-full bg-[#ffd400] px-4 py-2 text-sm font-black text-[#0b1b42] transition-transform hover:scale-105"
          >
            Carrinho
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0b1b42] text-xs font-black text-[#ffd400]">
              {totalItems}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
