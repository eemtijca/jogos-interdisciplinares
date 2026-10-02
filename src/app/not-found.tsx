import Link from "next/link";
export default function NotFound() {
  return (
    <section className="mx-auto max-w-lg space-y-4 p-6">
      <h1 className="font-display text-2xl font-bold text-ink">Página não encontrada</h1>
      <p className="text-ink-soft">O endereço não corresponde a uma página do Ludus.</p>
      <Link href="/" className="ludus-btn ludus-btn-ink">
        Voltar aos jogos
      </Link>
    </section>
  );
}
