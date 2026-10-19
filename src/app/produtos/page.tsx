import Link from "next/link";
import { getProducts, getCategories } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

type SearchParams = { [key: string]: string | string[] | undefined };

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const categoria = firstValue(params.categoria);
  const sort = firstValue(params.sort);
  const busca = firstValue(params.busca)?.trim();

  const products = await getProducts();

  let list = products.filter((product) =>
    categoria ? product.category === categoria : true
  );

  if (busca) {
    const needle = busca.toLowerCase();
    list = list.filter(
      (product) =>
        product.name.toLowerCase().includes(needle) ||
        product.category.toLowerCase().includes(needle)
    );
  }

  if (sort === "menor-preco") {
    list = [...list].sort((a, b) => a.price - b.price);
  } else if (sort === "maior-preco") {
    list = [...list].sort((a, b) => b.price - a.price);
  }

  const categories = await getCategories();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex flex-col gap-2">
        <h1 className="text-3xl font-black uppercase italic text-zinc-900">
          Catálogo
        </h1>
        <p className="text-sm font-medium text-zinc-500">
          {busca && <>Resultados para &ldquo;{busca}&rdquo; · </>}
          {list.length} carrinho{list.length === 1 ? "" : "s"} encontrado
          {list.length === 1 ? "" : "s"}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[220px_1fr]">
        <aside className="flex flex-col gap-6">
          <div>
            <h2 className="mb-3 text-xs font-black uppercase tracking-widest text-zinc-500">
              Categorias
            </h2>
            <div className="flex flex-col gap-1">
              <Link
                href="/produtos"
                className={`rounded-lg px-3 py-2 text-sm font-bold uppercase tracking-wide ${
                  !categoria
                    ? "bg-[#0b1b42] text-[#ffd400]"
                    : "text-zinc-700 hover:bg-zinc-100"
                }`}
              >
                Todas
              </Link>
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/produtos?categoria=${encodeURIComponent(category)}`}
                  className={`rounded-lg px-3 py-2 text-sm font-bold uppercase tracking-wide ${
                    categoria === category
                      ? "bg-[#0b1b42] text-[#ffd400]"
                      : "text-zinc-700 hover:bg-zinc-100"
                  }`}
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-3 text-xs font-black uppercase tracking-widest text-zinc-500">
              Ordenar por
            </h2>
            <div className="flex flex-col gap-1">
              {[
                { label: "Relevância", value: undefined },
                { label: "Menor preço", value: "menor-preco" },
                { label: "Maior preço", value: "maior-preco" },
              ].map((option) => {
                const href = new URLSearchParams();
                if (categoria) href.set("categoria", categoria);
                if (busca) href.set("busca", busca);
                if (option.value) href.set("sort", option.value);
                const query = href.toString();
                const isActive = (sort ?? undefined) === option.value;
                return (
                  <Link
                    key={option.label}
                    href={`/produtos${query ? `?${query}` : ""}`}
                    className={`rounded-lg px-3 py-2 text-sm font-bold uppercase tracking-wide ${
                      isActive
                        ? "bg-[#0b1b42] text-[#ffd400]"
                        : "text-zinc-700 hover:bg-zinc-100"
                    }`}
                  >
                    {option.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </aside>

        <div>
          {list.length === 0 ? (
            <p className="rounded-xl border-2 border-dashed border-zinc-300 p-10 text-center text-sm font-semibold text-zinc-500">
              Nenhum carrinho encontrado.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {list.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
