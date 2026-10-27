"use server";

import { revalidatePath } from "next/cache";
import { completeOrder } from "@/lib/orders";

export async function completeOrderAction(formData: FormData) {
  const id = String(formData.get("id") || "");
  if (!id) return;

  await completeOrder(id);

  revalidatePath("/admin/pedidos");
  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/produtos");
}
