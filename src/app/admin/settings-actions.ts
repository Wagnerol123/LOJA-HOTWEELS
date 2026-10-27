"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSettings, updateSettings, saveSiteImage } from "@/lib/settings";
import { SiteSettings } from "@/lib/types";

function field(formData: FormData, key: keyof SiteSettings): string {
  return String(formData.get(key) || "").trim();
}

export async function updateSettingsAction(formData: FormData) {
  const current = await getSettings();

  const settings: SiteSettings = {
    siteName: field(formData, "siteName"),
    logo: current.logo,
    metaDescription: field(formData, "metaDescription"),
    heroBadge: field(formData, "heroBadge"),
    heroTitle: field(formData, "heroTitle"),
    heroDescription: field(formData, "heroDescription"),
    heroPrimaryCta: field(formData, "heroPrimaryCta"),
    heroSecondaryCta: field(formData, "heroSecondaryCta"),
    categoriesTitle: field(formData, "categoriesTitle"),
    featuredTitle: field(formData, "featuredTitle"),
    footerDisclaimer: field(formData, "footerDisclaimer"),
    footerCopyright: field(formData, "footerCopyright"),
  };

  if (!settings.siteName || !settings.heroTitle) {
    redirect("/admin/configuracoes?erro=1");
  }

  const logoFile = formData.get("logo");
  const removeLogo = formData.get("removeLogo") === "1";
  if (logoFile instanceof File && logoFile.size > 0) {
    settings.logo = await saveSiteImage(logoFile, "logo");
  } else if (removeLogo) {
    settings.logo = undefined;
  }

  await updateSettings(settings);

  revalidatePath("/");
  revalidatePath("/admin/configuracoes");
  redirect("/admin/configuracoes?sucesso=1");
}
