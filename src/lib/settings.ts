import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import { head, put, BlobNotFoundError } from "@vercel/blob";
import { SiteSettings } from "./types";

const DATA_FILE = path.join(process.cwd(), "data", "settings.json");
const BLOB_DATA_PATHNAME = "data/settings.json";

function blobEnabled(): boolean {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}

export async function getSettings(): Promise<SiteSettings> {
  if (blobEnabled()) {
    try {
      const meta = await head(BLOB_DATA_PATHNAME);
      const res = await fetch(`${meta.url}?t=${Date.now()}`, { cache: "no-store" });
      return (await res.json()) as SiteSettings;
    } catch (err) {
      if (err instanceof BlobNotFoundError) {
        const raw = await fs.readFile(DATA_FILE, "utf-8");
        const seed = JSON.parse(raw) as SiteSettings;
        await updateSettings(seed);
        return seed;
      }
      throw err;
    }
  }
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  return JSON.parse(raw) as SiteSettings;
}

export async function saveSiteImage(file: File, name: string): Promise<string> {
  const ext = path.extname(file.name).toLowerCase() || ".png";
  const filename = `${name}-${Date.now()}${ext}`;

  if (blobEnabled()) {
    const blob = await put(`site/${filename}`, file, {
      access: "public",
      addRandomSuffix: true,
    });
    return blob.url;
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const uploadDir = path.join(process.cwd(), "public", "site");
  await fs.mkdir(uploadDir, { recursive: true });
  await fs.writeFile(path.join(uploadDir, filename), buffer);
  return `/site/${filename}`;
}

export async function updateSettings(settings: SiteSettings): Promise<void> {
  if (blobEnabled()) {
    await put(BLOB_DATA_PATHNAME, JSON.stringify(settings, null, 2), {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
      cacheControlMaxAge: 0,
    });
    return;
  }
  await fs.writeFile(DATA_FILE, JSON.stringify(settings, null, 2) + "\n", "utf-8");
}
