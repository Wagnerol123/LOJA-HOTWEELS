import Link from "next/link";
import { getSettings } from "@/lib/settings";
import { updateSettingsAction } from "../settings-actions";

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ erro?: string; sucesso?: string }>;
}) {
  const { erro, sucesso } = await searchParams;
  const settings = await getSettings();

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-xs font-bold uppercase tracking-wide text-zinc-500">
        <Link href="/admin" className="hover:text-[#15418f]">
          Produtos
        </Link>{" "}
        / <span className="text-zinc-800">Configurações do site</span>
      </nav>

      <h1 className="mb-2 text-2xl font-black uppercase italic text-zinc-900">
        Configurações do site
      </h1>
      <p className="mb-6 text-sm text-zinc-500">
        Edite os textos que aparecem na loja: nome, títulos, descrições e rodapé.
      </p>

      {erro && (
        <p className="mb-4 text-sm font-semibold text-red-600">
          Preencha ao menos o nome da loja e o título principal.
        </p>
      )}
      {sucesso && (
        <p className="mb-4 text-sm font-semibold text-green-700">
          Configurações salvas com sucesso.
        </p>
      )}

      <form action={updateSettingsAction} className="flex flex-col gap-5">
        <label className="flex flex-col gap-1 text-sm font-bold text-zinc-700">
          Nome da loja
          <input
            name="siteName"
            required
            defaultValue={settings.siteName}
            className="rounded-lg border-2 border-zinc-200 px-3 py-2 font-normal"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-bold text-zinc-700">
          Descrição para buscadores (SEO)
          <textarea
            name="metaDescription"
            rows={2}
            defaultValue={settings.metaDescription}
            className="rounded-lg border-2 border-zinc-200 px-3 py-2 font-normal"
          />
        </label>

        <div className="rounded-xl border border-zinc-200 p-4">
          <h2 className="mb-3 text-xs font-black uppercase tracking-widest text-zinc-500">
            Banner principal (topo da home)
          </h2>
          <div className="flex flex-col gap-4">
            <label className="flex flex-col gap-1 text-sm font-bold text-zinc-700">
              Selo pequeno
              <input
                name="heroBadge"
                defaultValue={settings.heroBadge}
                className="rounded-lg border-2 border-zinc-200 px-3 py-2 font-normal"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm font-bold text-zinc-700">
              Título principal
              <input
                name="heroTitle"
                required
                defaultValue={settings.heroTitle}
                className="rounded-lg border-2 border-zinc-200 px-3 py-2 font-normal"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm font-bold text-zinc-700">
              Texto de apoio
              <textarea
                name="heroDescription"
                rows={3}
                defaultValue={settings.heroDescription}
                className="rounded-lg border-2 border-zinc-200 px-3 py-2 font-normal"
              />
            </label>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1 text-sm font-bold text-zinc-700">
                Botão principal
                <input
                  name="heroPrimaryCta"
                  defaultValue={settings.heroPrimaryCta}
                  className="rounded-lg border-2 border-zinc-200 px-3 py-2 font-normal"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm font-bold text-zinc-700">
                Botão secundário
                <input
                  name="heroSecondaryCta"
                  defaultValue={settings.heroSecondaryCta}
                  className="rounded-lg border-2 border-zinc-200 px-3 py-2 font-normal"
                />
              </label>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-200 p-4">
          <h2 className="mb-3 text-xs font-black uppercase tracking-widest text-zinc-500">
            Seções da home
          </h2>
          <div className="flex flex-col gap-4">
            <label className="flex flex-col gap-1 text-sm font-bold text-zinc-700">
              Título da seção de categorias
              <input
                name="categoriesTitle"
                defaultValue={settings.categoriesTitle}
                className="rounded-lg border-2 border-zinc-200 px-3 py-2 font-normal"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm font-bold text-zinc-700">
              Título da seção de produtos em destaque
              <input
                name="featuredTitle"
                defaultValue={settings.featuredTitle}
                className="rounded-lg border-2 border-zinc-200 px-3 py-2 font-normal"
              />
            </label>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-200 p-4">
          <h2 className="mb-3 text-xs font-black uppercase tracking-widest text-zinc-500">
            Rodapé
          </h2>
          <div className="flex flex-col gap-4">
            <label className="flex flex-col gap-1 text-sm font-bold text-zinc-700">
              Texto de aviso/disclaimer
              <textarea
                name="footerDisclaimer"
                rows={3}
                defaultValue={settings.footerDisclaimer}
                className="rounded-lg border-2 border-zinc-200 px-3 py-2 font-normal"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm font-bold text-zinc-700">
              Linha de copyright (depois do ©)
              <input
                name="footerCopyright"
                defaultValue={settings.footerCopyright}
                className="rounded-lg border-2 border-zinc-200 px-3 py-2 font-normal"
              />
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="mt-2 w-fit rounded-full bg-[#ffd400] px-8 py-3 text-sm font-black uppercase tracking-wide text-[#0b1b42] hover:bg-[#0b1b42] hover:text-[#ffd400]"
        >
          Salvar configurações
        </button>
      </form>
    </div>
  );
}
