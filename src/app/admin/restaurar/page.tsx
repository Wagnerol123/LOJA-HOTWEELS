import Link from "next/link";
import { getProducts } from "@/lib/products";
import { restoreMissingProductsAction } from "../restore-action";

export default async function RestorePage() {
  const products = await getProducts();

  return (
    <div className="mx-auto max-w-xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-xs font-bold uppercase tracking-wide text-zinc-500">
        <Link href="/admin" className="hover:text-[#15418f]">
          Produtos
        </Link>{" "}
        / <span className="text-zinc-800">Restaurar produtos</span>
      </nav>

      <h1 className="mb-2 text-2xl font-black uppercase italic text-zinc-900">
        Restaurar produtos originais
      </h1>
      <p className="mb-6 text-sm text-zinc-600">
        Você tem {products.length} de 12 produtos cadastrados. Clicar no botão abaixo
        recria apenas os produtos originais que estiverem faltando (não duplica os que já
        existem).
      </p>

      <form action={restoreMissingProductsAction}>
        <button
          type="submit"
          className="rounded-full bg-[#ffd400] px-8 py-3 text-sm font-black uppercase tracking-wide text-[#0b1b42] hover:bg-[#0b1b42] hover:text-[#ffd400]"
        >
          Restaurar produtos faltantes
        </button>
      </form>
    </div>
  );
}
