"use client";

import { useState } from "react";
import Image from "next/image";

export default function LogoField({ currentLogo }: { currentLogo?: string }) {
  const [preview, setPreview] = useState<string | null>(currentLogo ?? null);
  const [removeLogo, setRemoveLogo] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setRemoveLogo(false);
    }
  }

  return (
    <div>
      <span className="text-sm font-bold text-zinc-700">Logo do site</span>
      <div className="mt-2 flex items-center gap-4">
        {preview && !removeLogo && (
          <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-zinc-200 bg-[#0b1b42]">
            <Image
              src={preview}
              alt="Pré-visualização do logo"
              fill
              className="object-contain p-1"
              unoptimized={preview.startsWith("blob:")}
            />
          </div>
        )}
        <input type="file" name="logo" accept="image/*" onChange={handleChange} className="text-sm" />
      </div>
      <p className="mt-1 text-xs text-zinc-500">
        Envie uma imagem (PNG ou SVG com fundo transparente funciona melhor). Se nenhuma for
        enviada, é usada a logo ilustrada padrão.
      </p>
      {currentLogo && (
        <label className="mt-2 flex items-center gap-2 text-xs font-bold text-zinc-600">
          <input
            type="checkbox"
            name="removeLogo"
            value="1"
            checked={removeLogo}
            onChange={(e) => setRemoveLogo(e.target.checked)}
          />
          Remover logo atual (voltar para a ilustração padrão)
        </label>
      )}
    </div>
  );
}
