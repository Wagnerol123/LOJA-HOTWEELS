"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/lib/types";

const RARITY_OPTIONS = ["Lançamento", "Edição Limitada", "Raridade", "Tesouro Nacional"];

export default function ProductForm({
  action,
  categories,
  product,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  categories: string[];
  product?: Product;
  submitLabel: string;
}) {
  const [preview, setPreview] = useState<string | null>(product?.image ?? null);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  }

  return (
    <form action={action} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm font-bold text-zinc-700">
          Nome do produto
          <input
            name="name"
            required
            defaultValue={product?.name}
            className="rounded-lg border-2 border-zinc-200 px-3 py-2 font-normal"
            placeholder="Ex: Falcão Turbo"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-bold text-zinc-700">
          Categoria
          <input
            name="category"
            required
            list="categorias"
            defaultValue={product?.category}
            className="rounded-lg border-2 border-zinc-200 px-3 py-2 font-normal"
            placeholder="Ex: Street"
          />
          <datalist id="categorias">
            {categories.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </label>

        {!product && (
          <label className="flex flex-col gap-1 text-sm font-bold text-zinc-700">
            Slug (opcional)
            <input
              name="slug"
              className="rounded-lg border-2 border-zinc-200 px-3 py-2 font-normal"
              placeholder="gerado automaticamente a partir do nome"
            />
          </label>
        )}

        <label className="flex flex-col gap-1 text-sm font-bold text-zinc-700">
          Escala
          <input
            name="scale"
            defaultValue={product?.scale ?? "1:64"}
            className="rounded-lg border-2 border-zinc-200 px-3 py-2 font-normal"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-bold text-zinc-700">
          Preço (R$)
          <input
            name="price"
            type="number"
            step="0.01"
            min="0"
            required
            defaultValue={product?.price}
            className="rounded-lg border-2 border-zinc-200 px-3 py-2 font-normal"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-bold text-zinc-700">
          Preço antigo (opcional)
          <input
            name="oldPrice"
            type="number"
            step="0.01"
            min="0"
            defaultValue={product?.oldPrice}
            className="rounded-lg border-2 border-zinc-200 px-3 py-2 font-normal"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-bold text-zinc-700">
          Estoque
          <input
            name="stock"
            type="number"
            min="0"
            step="1"
            required
            defaultValue={product?.stock}
            className="rounded-lg border-2 border-zinc-200 px-3 py-2 font-normal"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-bold text-zinc-700">
          Selo / raridade (opcional)
          <input
            name="rarity"
            list="raridades"
            defaultValue={product?.rarity}
            className="rounded-lg border-2 border-zinc-200 px-3 py-2 font-normal"
            placeholder="Nenhum"
          />
          <datalist id="raridades">
            {RARITY_OPTIONS.map((r) => (
              <option key={r} value={r} />
            ))}
          </datalist>
        </label>

        <label className="flex flex-col gap-1 text-sm font-bold text-zinc-700">
          Cor principal
          <input
            name="color"
            type="color"
            defaultValue={product?.color ?? "#334155"}
            className="h-10 w-full rounded-lg border-2 border-zinc-200"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-bold text-zinc-700">
          Cor de destaque
          <input
            name="accent"
            type="color"
            defaultValue={product?.accent ?? "#ffffff"}
            className="h-10 w-full rounded-lg border-2 border-zinc-200"
          />
        </label>
      </div>

      <label className="flex flex-col gap-1 text-sm font-bold text-zinc-700">
        Descrição
        <textarea
          name="description"
          required
          rows={3}
          defaultValue={product?.description}
          className="rounded-lg border-2 border-zinc-200 px-3 py-2 font-normal"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm font-bold text-zinc-700">
        Características (uma por linha)
        <textarea
          name="details"
          rows={4}
          defaultValue={product?.details?.join("\n")}
          className="rounded-lg border-2 border-zinc-200 px-3 py-2 font-normal"
          placeholder={"Rodas de liga leve\nCarroceria em metal fundido"}
        />
      </label>

      <div>
        <span className="text-sm font-bold text-zinc-700">Foto do produto</span>
        <div className="mt-2 flex items-center gap-4">
          {preview && (
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg border border-zinc-200">
              <Image
                src={preview}
                alt="Pré-visualização"
                fill
                className="object-cover"
                unoptimized={preview.startsWith("blob:")}
              />
            </div>
          )}
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="text-sm"
          />
        </div>
        <p className="mt-1 text-xs text-zinc-500">
          Envie uma foto real do carrinho. Se nenhuma imagem for enviada, é usada uma ilustração padrão.
        </p>
      </div>

      <button
        type="submit"
        className="mt-2 w-fit rounded-full bg-[#ffd400] px-8 py-3 text-sm font-black uppercase tracking-wide text-[#0b1b42] hover:bg-[#0b1b42] hover:text-[#ffd400]"
      >
        {submitLabel}
      </button>
    </form>
  );
}
