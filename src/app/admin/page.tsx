import Link from "next/link";
import Image from "next/image";
import { getProducts } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import { deleteProductAction } from "./actions";
import { logoutAction } from "./login/actions";
import DeleteProductForm from "@/components/admin/DeleteProductForm";

export default async function AdminPage() {
  const products = await getProducts();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="rounded-full bg-[#0b1b42] px-3 py-1 text-xs font-black uppercase tracking-wide text-[#ffd400]">
            Área do lojista
          </span>
          <h1 className="mt-2 text-3xl font-black uppercase italic text-zinc-900">
            Produtos
          </h1>
          <p className="text-sm text-zinc-500">{products.length} produtos cadastrados</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/configuracoes"
            className="rounded-full border-2 border-zinc-200 px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-zinc-600 hover:border-zinc-400"
          >
            Configurações do site
          </Link>
          <Link
            href="/admin/produtos/novo"
            className="rounded-full bg-[#ffd400] px-5 py-2.5 text-sm font-black uppercase tracking-wide text-[#0b1b42] hover:bg-[#0b1b42] hover:text-[#ffd400]"
          >
            Novo produto
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="rounded-full border-2 border-zinc-200 px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-zinc-600 hover:border-zinc-400"
            >
              Sair
            </button>
          </form>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-zinc-200 bg-white">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-200 text-xs font-black uppercase tracking-wide text-zinc-500">
              <th className="px-4 py-3">Foto</th>
              <th className="px-4 py-3">Nome</th>
              <th className="px-4 py-3">Categoria</th>
              <th className="px-4 py-3">Preço</th>
              <th className="px-4 py-3">Estoque</th>
              <th className="px-4 py-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-zinc-100 last:border-0">
                <td className="px-4 py-3">
                  <div className="relative h-12 w-16 overflow-hidden rounded-md bg-zinc-100">
                    {product.image && (
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 font-bold text-zinc-900">{product.name}</td>
                <td className="px-4 py-3 text-zinc-600">{product.category}</td>
                <td className="px-4 py-3 font-semibold text-zinc-900">
                  {formatPrice(product.price)}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={
                      product.stock > 0
                        ? "text-zinc-700"
                        : "font-bold text-red-600"
                    }
                  >
                    {product.stock}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-4">
                    <Link
                      href={`/admin/produtos/${product.id}`}
                      className="text-xs font-bold uppercase tracking-wide text-[#15418f] hover:underline"
                    >
                      Editar
                    </Link>
                    <DeleteProductForm
                      id={product.id}
                      name={product.name}
                      action={deleteProductAction}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-zinc-500">
                  Nenhum produto cadastrado ainda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
