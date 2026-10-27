import Link from "next/link";
import { getOrders } from "@/lib/orders";
import { formatPrice } from "@/lib/format";
import { completeOrderAction } from "./actions";

export default async function OrdersPage() {
  const orders = await getOrders();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-xs font-bold uppercase tracking-wide text-zinc-500">
        <Link href="/admin" className="hover:text-[#15418f]">
          Produtos
        </Link>{" "}
        / <span className="text-zinc-800">Pedidos</span>
      </nav>

      <div className="mb-8">
        <span className="rounded-full bg-[#0b1b42] px-3 py-1 text-xs font-black uppercase tracking-wide text-[#ffd400]">
          Área do lojista
        </span>
        <h1 className="mt-2 text-3xl font-black uppercase italic text-zinc-900">
          Pedidos
        </h1>
        <p className="text-sm text-zinc-500">{orders.length} pedidos recebidos</p>
      </div>

      {orders.length === 0 ? (
        <p className="rounded-xl border-2 border-dashed border-zinc-300 p-10 text-center text-sm font-semibold text-zinc-500">
          Nenhum pedido recebido ainda.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-2xl border border-zinc-200 bg-white p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-black text-zinc-900">{order.orderNumber}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-wide ${
                        order.status === "concluido"
                          ? "bg-green-100 text-green-700"
                          : "bg-[#ffd400] text-[#0b1b42]"
                      }`}
                    >
                      {order.status === "concluido" ? "Concluído" : "Pendente"}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-bold text-zinc-700">{order.customerName}</p>
                  <p className="text-xs text-zinc-500">{order.email}</p>
                  <p className="text-xs text-zinc-500">{order.address}</p>
                  <p className="mt-1 text-xs text-zinc-400">
                    {new Date(order.createdAt).toLocaleString("pt-BR")}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-3">
                  <span className="text-lg font-black text-zinc-900">
                    {formatPrice(order.total)}
                  </span>
                  {order.status === "pendente" && (
                    <form action={completeOrderAction}>
                      <input type="hidden" name="id" value={order.id} />
                      <button
                        type="submit"
                        className="rounded-full bg-[#ffd400] px-5 py-2 text-xs font-black uppercase tracking-wide text-[#0b1b42] hover:bg-[#0b1b42] hover:text-[#ffd400]"
                      >
                        Concluir pedido
                      </button>
                    </form>
                  )}
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-1 border-t border-zinc-100 pt-4">
                {order.items.map((item) => (
                  <div
                    key={item.productId}
                    className="flex justify-between text-sm text-zinc-600"
                  >
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              {order.status === "concluido" && (
                <p className="mt-3 text-xs font-semibold text-green-700">
                  Estoque atualizado quando este pedido foi concluído.
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
