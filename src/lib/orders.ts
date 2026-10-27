import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import { head, put, BlobNotFoundError } from "@vercel/blob";
import { Order, OrderItem } from "./types";
import { getProductById, updateProduct } from "./products";

const DATA_FILE = path.join(process.cwd(), "data", "orders.json");
const BLOB_DATA_PATHNAME = "data/orders.json";

function blobEnabled(): boolean {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}

async function readAll(): Promise<Order[]> {
  if (blobEnabled()) {
    try {
      const meta = await head(BLOB_DATA_PATHNAME);
      const res = await fetch(`${meta.url}?t=${Date.now()}`, { cache: "no-store" });
      return (await res.json()) as Order[];
    } catch (err) {
      if (err instanceof BlobNotFoundError) {
        const raw = await fs.readFile(DATA_FILE, "utf-8");
        const seed = JSON.parse(raw) as Order[];
        await writeAll(seed);
        return seed;
      }
      throw err;
    }
  }
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  return JSON.parse(raw) as Order[];
}

async function writeAll(orders: Order[]): Promise<void> {
  if (blobEnabled()) {
    await put(BLOB_DATA_PATHNAME, JSON.stringify(orders, null, 2), {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
      cacheControlMaxAge: 0,
    });
    return;
  }
  await fs.writeFile(DATA_FILE, JSON.stringify(orders, null, 2) + "\n", "utf-8");
}

export async function getOrders(): Promise<Order[]> {
  const orders = await readAll();
  return [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getOrderById(id: string): Promise<Order | undefined> {
  const orders = await readAll();
  return orders.find((o) => o.id === id);
}

function randomOrderNumber(): string {
  return `UC-${Math.floor(100000 + Math.random() * 900000)}`;
}

export async function createOrder(data: {
  customerName: string;
  email: string;
  address: string;
  items: OrderItem[];
}): Promise<Order> {
  const orders = await readAll();
  const total = data.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const order: Order = {
    id: String(Date.now()),
    orderNumber: randomOrderNumber(),
    customerName: data.customerName,
    email: data.email,
    address: data.address,
    items: data.items,
    total,
    status: "pendente",
    createdAt: new Date().toISOString(),
  };
  orders.push(order);
  await writeAll(orders);
  return order;
}

export async function completeOrder(id: string): Promise<Order | undefined> {
  const orders = await readAll();
  const order = orders.find((o) => o.id === id);
  if (!order || order.status === "concluido") return order;

  for (const item of order.items) {
    const product = await getProductById(item.productId);
    if (!product) continue;
    const newStock = Math.max(0, product.stock - item.quantity);
    await updateProduct(product.id, { stock: newStock });
  }

  order.status = "concluido";
  await writeAll(orders);
  return order;
}
