import Link from "next/link";
import { getCategories } from "@/lib/products";
import ProductForm from "@/components/admin/ProductForm";
import { createProductAction } from "../../actions";

export default async function NewProductPage({
  searchParams,
}: {
  searchParams: Promise<{ erro?: string }>;
}) {
  const { erro } = await searchParams;
  const categories = await getCategories();

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-xs font-bold uppercase tracking-wide text-zinc-500">
        <Link href="/admin" className="hover:text-[#15418f]">
          Produtos
        </Link>{" "}
        / <span className="text-zinc-800">Novo produto</span>
      </nav>
      <h1 className="mb-6 text-2xl font-black uppercase italic text-zinc-900">
        Novo produto
      </h1>
      {erro && (
        <p className="mb-4 text-sm font-semibold text-red-600">
          Preencha nome, categoria e preço antes de salvar.
        </p>
      )}
      <ProductForm action={createProductAction} categories={categories} submitLabel="Criar produto" />
    </div>
  );
}
