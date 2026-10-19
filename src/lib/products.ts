import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import { head, put, BlobNotFoundError } from "@vercel/blob";
import { Product } from "./types";

const DATA_FILE = path.join(process.cwd(), "data", "products.json");
const BLOB_DATA_PATHNAME = "data/products.json";

function blobEnabled(): boolean {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}

async function readAll(): Promise<Product[]> {
  if (blobEnabled()) {
    try {
      const meta = await head(BLOB_DATA_PATHNAME);
      const res = await fetch(meta.url, { cache: "no-store" });
      return (await res.json()) as Product[];
    } catch (err) {
      if (err instanceof BlobNotFoundError) {
        const raw = await fs.readFile(DATA_FILE, "utf-8");
        const seed = JSON.parse(raw) as Product[];
        await writeAll(seed);
        return seed;
      }
      throw err;
    }
  }
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  return JSON.parse(raw) as Product[];
}

async function writeAll(products: Product[]): Promise<void> {
  if (blobEnabled()) {
    await put(BLOB_DATA_PATHNAME, JSON.stringify(products, null, 2), {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
    });
    return;
  }
  await fs.writeFile(DATA_FILE, JSON.stringify(products, null, 2) + "\n", "utf-8");
}

export async function getProducts(): Promise<Product[]> {
  return readAll();
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const products = await readAll();
  return products.find((product) => product.slug === slug);
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const products = await readAll();
  return products.find((product) => product.id === id);
}

export async function getCategories(): Promise<string[]> {
  const products = await readAll();
  return Array.from(new Set(products.map((product) => product.category)));
}

function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function createProduct(
  data: Omit<Product, "id" | "slug"> & { slug?: string }
): Promise<Product> {
  const products = await readAll();
  const baseSlug = slugify(data.slug || data.name);
  let slug = baseSlug;
  let suffix = 2;
  while (products.some((p) => p.slug === slug)) {
    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }
  const nextId = String(
    products.reduce((max, p) => Math.max(max, Number(p.id) || 0), 0) + 1
  );
  const product: Product = { ...data, id: nextId, slug };
  products.push(product);
  await writeAll(products);
  return product;
}

export async function updateProduct(
  id: string,
  data: Partial<Omit<Product, "id">>
): Promise<Product | undefined> {
  const products = await readAll();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return undefined;
  const updated: Product = { ...products[index], ...data, id };
  products[index] = updated;
  await writeAll(products);
  return updated;
}

export async function deleteProduct(id: string): Promise<void> {
  const products = await readAll();
  await writeAll(products.filter((p) => p.id !== id));
}

export async function saveProductImage(file: File, slug: string): Promise<string> {
  const ext = path.extname(file.name).toLowerCase() || ".jpg";
  const filename = `${slugify(slug)}-${Date.now()}${ext}`;

  if (blobEnabled()) {
    const blob = await put(`products/${filename}`, file, {
      access: "public",
      addRandomSuffix: true,
    });
    return blob.url;
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const uploadDir = path.join(process.cwd(), "public", "products");
  await fs.mkdir(uploadDir, { recursive: true });
  await fs.writeFile(path.join(uploadDir, filename), buffer);
  return `/products/${filename}`;
}
