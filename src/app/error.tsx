"use client";

import Link from "next/link";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section className="mx-auto max-w-lg space-y-4 p-6" role="alert">
      <h1 className="font-display text-2xl font-bold text-ink">Não foi possível abrir esta tela</h1>
      <p className="text-ink-soft">
        Tentar novamente pode recuperar o conteúdo. O progresso salvo neste dispositivo permanece
        disponível.
      </p>
      <button type="button" className="ludus-btn ludus-btn-ink" onClick={reset}>
        Tentar novamente
      </button>
      <Link href="/" className="ludus-btn ludus-btn-paper">
        Voltar aos jogos
      </Link>
    </section>
  );
}
