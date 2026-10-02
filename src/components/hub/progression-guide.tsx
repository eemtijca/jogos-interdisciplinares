import { LEVEL_ORDER, LEVEL_LABEL, LEVEL_DESCRIPTION } from "@/lib/catalog";

export function ProgressionGuide() {
  return (
    <section aria-labelledby="progression-title" className="ludus-panel p-5 sm:p-6">
      <h2 id="progression-title" className="font-display text-xl font-bold text-ink">
        Cinco níveis, mais profundidade
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
        A exigência aumenta pelo raciocínio. Todos os níveis ficam disponíveis, com três casos
        progressivos por jogo, pistas e repetição livre.
      </p>
      <ol className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {LEVEL_ORDER.map((level) => (
          <li key={level} className="rounded-2xl border-2 border-border bg-cloud p-3">
            <p className="font-display font-bold text-ink">{LEVEL_LABEL[level]}</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{LEVEL_DESCRIPTION[level]}</p>
          </li>
        ))}
      </ol>
      <p className="mt-3 text-xs text-ink-soft">
        O nível organiza o percurso da coleção; não representa uma série escolar nem um diagnóstico
        do estudante.
      </p>
    </section>
  );
}
