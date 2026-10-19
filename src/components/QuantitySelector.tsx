"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";

export default function QuantitySelector({
  productId,
  stock,
}: {
  productId: string;
  stock: number;
}) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(productId, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="flex items-center gap-2 rounded-full border-2 border-zinc-200 bg-white px-2 py-1">
        <button
          type="button"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="flex h-8 w-8 items-center justify-center rounded-full text-lg font-black hover:bg-zinc-100"
          aria-label="Diminuir quantidade"
        >
          −
        </button>
        <span className="w-8 text-center text-sm font-bold">{quantity}</span>
        <button
          type="button"
          onClick={() => setQuantity((q) => Math.min(stock, q + 1))}
          className="flex h-8 w-8 items-center justify-center rounded-full text-lg font-black hover:bg-zinc-100"
          aria-label="Aumentar quantidade"
        >
          +
        </button>
      </div>
      <button
        onClick={handleAdd}
        className="flex-1 rounded-full bg-[#ffd400] px-6 py-3 text-sm font-black uppercase tracking-wide text-[#0b1b42] transition-colors hover:bg-[#0b1b42] hover:text-[#ffd400]"
      >
        {added ? "Adicionado ao carrinho!" : "Adicionar ao carrinho"}
      </button>
    </div>
  );
}
