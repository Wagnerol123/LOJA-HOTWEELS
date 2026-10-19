import { loginAction } from "./actions";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ erro?: string }>;
}) {
  const { erro } = await searchParams;

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center gap-6 px-4">
      <div>
        <span className="rounded-full bg-[#0b1b42] px-3 py-1 text-xs font-black uppercase tracking-wide text-[#ffd400]">
          Área do lojista
        </span>
        <h1 className="mt-4 text-2xl font-black uppercase italic text-zinc-900">
          Painel administrativo
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          Entre com a senha de administrador para gerenciar produtos, estoque e imagens.
        </p>
      </div>
      <form action={loginAction} className="flex flex-col gap-3">
        <label className="flex flex-col gap-1 text-sm font-bold text-zinc-700">
          Senha
          <input
            type="password"
            name="password"
            required
            autoFocus
            className="rounded-lg border-2 border-zinc-200 px-3 py-2 font-normal"
            placeholder="••••••••"
          />
        </label>
        {erro && (
          <p className="text-sm font-semibold text-red-600">Senha incorreta. Tente novamente.</p>
        )}
        <button
          type="submit"
          className="mt-2 rounded-full bg-[#ffd400] px-6 py-3 text-sm font-black uppercase tracking-wide text-[#0b1b42] hover:bg-[#0b1b42] hover:text-[#ffd400]"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
