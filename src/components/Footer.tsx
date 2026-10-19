import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto bg-[#0b1b42] text-zinc-300">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-bold uppercase tracking-wide text-[#ffd400]">
            Universo Colecionável
          </p>
          <p className="max-w-xl text-xs leading-relaxed text-zinc-400">
            Projeto desenvolvido para fins de estudo. Esta loja é fictícia e não possui
            vínculo oficial com a Mattel ou com a marca Hot Wheels®, citada apenas a
            título de referência e inspiração temática.
          </p>
        </div>
        <p className="mt-6 text-center text-xs text-zinc-500">
          © 2026 Universo Colecionável — Loja demonstrativa. ·{" "}
          <Link href="/admin" className="hover:text-zinc-300">
            Área do lojista
          </Link>
        </p>
      </div>
    </footer>
  );
}
