import Link from "next/link";

export default function Footer({
  siteName,
  disclaimer,
  copyright,
}: {
  siteName: string;
  disclaimer: string;
  copyright: string;
}) {
  return (
    <footer className="mt-auto bg-[#0b1b42] text-zinc-300">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-bold uppercase tracking-wide text-[#ffd400]">
            {siteName}
          </p>
          <p className="max-w-xl text-xs leading-relaxed text-zinc-400">{disclaimer}</p>
        </div>
        <p className="mt-6 text-center text-xs text-zinc-500">
          © 2026 {copyright} ·{" "}
          <Link href="/admin" className="hover:text-zinc-300">
            Área do lojista
          </Link>
        </p>
      </div>
    </footer>
  );
}
