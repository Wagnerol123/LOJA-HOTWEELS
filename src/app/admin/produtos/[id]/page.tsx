import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById, getCategories } from "@/lib/products";
import ProductForm from "@/components/admin/ProductForm";
import DeleteProductForm from "@/components/admin/DeleteProductForm";
import { updateProductAction, deleteProductAction } from "../../actions";

export default async function EditProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ erro?: string }>;
}) {
  const { id } = await params;
  const { erro } = await searchParams;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const categories = await getCategories();
  const boundUpdateAction = updateProductAction.bind(null, id);

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-xs font-bold uppercase tracking-wide text-zinc-500">
        <Link href="/admin" className="hover:text-[#15418f]">
          Produtos
        </Link>{" "}
        / <span className="text-zinc-800">{product.name}</span>
      </nav>

      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-black uppercase italic text-zinc-900">
          Editar produto
        </h1>
        <DeleteProductForm id={product.id} name={product.name} action={deleteProductAction} />
      </div>

      {erro && (
        <p className="mb-4 text-sm font-semibold text-red-600">
          Preencha nome, categoria e preço antes de salvar.
        </p>
      )}

      <ProductForm
        action={boundUpdateAction}
        categories={categories}
        product={product}
        submitLabel="Salvar alterações"
      />
    </div>
  );
}
