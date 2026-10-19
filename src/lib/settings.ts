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
      const res = await fetch(meta.url, { cache: "no-store" });
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

export async function updateSettings(settings: SiteSettings): Promise<void> {
  if (blobEnabled()) {
    await put(BLOB_DATA_PATHNAME, JSON.stringify(settings, null, 2), {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
    });
    return;
  }
  await fs.writeFile(DATA_FILE, JSON.stringify(settings, null, 2) + "\n", "utf-8");
}
