import { NextRequest, NextResponse } from "next/server";
import { createOrder } from "@/lib/orders";
import { OrderItem } from "@/lib/types";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const customerName = String(body.customerName || "").trim();
  const email = String(body.email || "").trim();
  const address = String(body.address || "").trim();
  const items: OrderItem[] = Array.isArray(body.items) ? body.items : [];

  if (!customerName || !email || !address || items.length === 0) {
    return NextResponse.json({ error: "Dados do pedido incompletos." }, { status: 400 });
  }

  const order = await createOrder({ customerName, email, address, items });

  return NextResponse.json({ orderNumber: order.orderNumber, id: order.id });
}
