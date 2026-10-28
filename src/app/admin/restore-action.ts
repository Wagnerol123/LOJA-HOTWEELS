"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getProducts, createProduct } from "@/lib/products";
import { Product } from "@/lib/types";

const ORIGINAL_PRODUCTS: Omit<Product, "id">[] = [
  {
    slug: "velocidade-gt",
    name: "Velocidade GT",
    category: "Street",
    scale: "1:64",
    color: "#f4511e",
    accent: "#ffd54f",
    image: "/products/velocidade-gt.jpg",
    price: 12.9,
    stock: 24,
    rarity: "Lançamento",
    description:
      "Um esportivo compacto com linhas agressivas e pintura laranja metálica, pronto para dominar a pista.",
    details: ["Rodas de liga leve", "Carroceria em metal fundido", "Eixos reais"],
  },
  {
    slug: "trovao-eletrico",
    name: "Trovão Elétrico",
    category: "Muscle",
    scale: "1:64",
    color: "#1e293b",
    accent: "#38bdf8",
    image: "/products/trovao-eletrico.jpg",
    price: 15.9,
    oldPrice: 19.9,
    stock: 10,
    rarity: "Edição Limitada",
    description:
      "Músculo clássico reimaginado com detalhes em azul elétrico e motor exposto no capô.",
    details: ["Capô com abertura decorativa", "Interior detalhado", "Faróis pintados"],
  },
  {
    slug: "lamina-nitro",
    name: "Lâmina Nitro",
    category: "Rally",
    scale: "1:64",
    color: "#2e7d32",
    accent: "#c8e6c9",
    image: "/products/lamina-nitro.jpg",
    price: 13.5,
    stock: 32,
    description:
      "Carro de rally com suspensão alta e pneus para terra, inspirado nas competições off-road.",
    details: ["Suspensão elevada", "Pneus cravados", "Faixas de competição"],
  },
  {
    slug: "raptor-das-dunas",
    name: "Raptor das Dunas",
    category: "SUV & Off-Road",
    scale: "1:64",
    color: "#6d4c41",
    accent: "#ffcc80",
    image: "/products/raptor-das-dunas.jpg",
    price: 16.9,
    stock: 18,
    description: "SUV robusto com para-choques reforçados e pintura camuflada do deserto.",
    details: ["Para-choques reforçados", "Rack de teto", "Pneus grandes"],
  },
  {
    slug: "mega-transportador",
    name: "Mega Transportador",
    category: "Caminhões",
    scale: "1:64",
    color: "#c62828",
    accent: "#fff3e0",
    image: "/products/mega-transportador.jpg",
    price: 18.9,
    stock: 14,
    description: "Caminhão de carga vermelho vibrante com cabine cromada e carroceria extensa.",
    details: ["Cabine cromada", "Eixo traseiro duplo", "Carroceria articulada"],
  },
  {
    slug: "corredor-coral",
    name: "Corredor Coral",
    category: "Rally",
    scale: "1:64",
    color: "#ff6f91",
    accent: "#ffffff",
    image: "/products/corredor-coral.jpg",
    price: 13.5,
    stock: 16,
    description:
      "Carro de rali em tom coral com acabamento vintage e adesivos de competição.",
    details: ["Adesivos de competição", "Faróis auxiliares", "Rodas de rali"],
  },
];

export async function restoreMissingProductsAction() {
  const current = await getProducts();
  const existingSlugs = new Set(current.map((p) => p.slug));

  for (const product of ORIGINAL_PRODUCTS) {
    if (!existingSlugs.has(product.slug)) {
      await createProduct(product);
    }
  }

  revalidatePath("/");
  revalidatePath("/produtos");
  revalidatePath("/admin");
  redirect("/admin?restaurado=1");
}
