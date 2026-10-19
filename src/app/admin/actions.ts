"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  saveProductImage,
  resolveProductSlug,
} from "@/lib/products";

function parseDetails(raw: string): string[] {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function readNumber(formData: FormData, key: string): number {
  const value = formData.get(key);
  const parsed = value ? Number(value) : 0;
  return Number.isFinite(parsed) ? parsed : 0;
}

function readOptionalNumber(formData: FormData, key: string): number | undefined {
  const value = formData.get(key);
  if (!value || String(value).trim() === "") return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function readFields(formData: FormData) {
  return {
    name: String(formData.get("name") || "").trim(),
    category: String(formData.get("category") || "").trim(),
    scale: String(formData.get("scale") || "1:64").trim() || "1:64",
    color: String(formData.get("color") || "#334155"),
    accent: String(formData.get("accent") || "#ffffff"),
    price: readNumber(formData, "price"),
    oldPrice: readOptionalNumber(formData, "oldPrice"),
    stock: Math.max(0, Math.round(readNumber(formData, "stock"))),
    rarity: String(formData.get("rarity") || "").trim() || undefined,
    description: String(formData.get("description") || "").trim(),
    details: parseDetails(String(formData.get("details") || "")),
  };
}

export async function createProductAction(formData: FormData) {
  const fields = readFields(formData);
  const slugInput = String(formData.get("slug") || "").trim();

  if (!fields.name || !fields.category || !fields.price) {
    redirect("/admin/produtos/novo?erro=1");
  }

  const product = await createProduct({ ...fields, slug: slugInput });

  const imageFile = formData.get("image");
  if (imageFile instanceof File && imageFile.size > 0) {
    const image = await saveProductImage(imageFile, product.slug);
    await updateProduct(product.id, { image });
  }

  revalidatePath("/");
  revalidatePath("/produtos");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function updateProductAction(id: string, formData: FormData) {
  const current = await getProductById(id);
  if (!current) {
    redirect("/admin");
  }

  const fields = readFields(formData);
  if (!fields.name || !fields.category || !fields.price) {
    redirect(`/admin/produtos/${id}?erro=1`);
  }

  const slugInput = String(formData.get("slug") || "").trim();
  const slug = await resolveProductSlug(slugInput || fields.name, id);

  let image = current.image;
  const imageFile = formData.get("image");
  const removeImage = formData.get("removeImage") === "1";
  if (imageFile instanceof File && imageFile.size > 0) {
    image = await saveProductImage(imageFile, slug);
  } else if (removeImage) {
    image = undefined;
  }

  await updateProduct(id, { ...fields, slug, image });

  revalidatePath("/");
  revalidatePath("/produtos");
  revalidatePath(`/produtos/${current.slug}`);
  revalidatePath(`/produtos/${slug}`);
  revalidatePath("/admin");
  redirect("/admin");
}

export async function deleteProductAction(formData: FormData) {
  const id = String(formData.get("id") || "");
  if (id) {
    await deleteProduct(id);
  }

  revalidatePath("/");
  revalidatePath("/produtos");
  revalidatePath("/admin");
}
