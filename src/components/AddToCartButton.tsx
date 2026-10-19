"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";

export default function AddToCartButton({
  productId,
  quantity = 1,
}: {
  productId: string;
  quantity?: number;
}) {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  function handleClick() {
    addItem(productId, quantity);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1200);
  }

  return (
    <button
      onClick={handleClick}
      className="w-full rounded-full bg-[#ffd400] px-4 py-2 text-sm font-black uppercase tracking-wide text-[#0b1b42] transition-colors hover:bg-[#0b1b42] hover:text-[#ffd400]"
    >
      {justAdded ? "Adicionado!" : "Adicionar"}
    </button>
  );
}
