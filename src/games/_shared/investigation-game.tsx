"use client";

import { useState } from "react";
import { GameShell } from "@/components/game-shell/game-shell";
import { SpeakerButton } from "@/components/game-shell/speaker-button";
import { MathText } from "@/components/mathjax/math-text";
import { GAME_BY_ID } from "@/lib/catalog";
import { useProgress } from "@/lib/progress";
import { stripLatex } from "@/lib/tex";
import { stopSpeech } from "@/lib/speech";
import { useGameSession, type GameSession } from "./use-game-session";
import type {
  InvestigationCase,
  InvestigationModel,
  InvestigationTask,
} from "./investigation-types";

type Response = string | string[];

/** Compara respostas explícitas; a produção livre nunca recebe nota automática. */
export function checkResponse(task: InvestigationTask, response: Response): boolean {
  if (task.kind === "number") {
    if (typeof response !== "string" || response.trim() === "") return false;
    const raw = response.trim();
    const normalized = raw.includes(",") ? raw.replace(/\./g, "").replace(",", ".") : raw;
    const value = Number(normalized);
    return (
      Number.isFinite(value) && Math.abs(value - Number(task.answer)) <= (task.tolerance ?? 0.01)
    );
  }
  if (Array.isArray(task.answer)) {
    if (!Array.isArray(response) || task.answer.length !== response.length) return false;
    return task.kind === "order"
      ? task.answer.every((id, i) => id === response[i])
      : task.answer.every((id) => response.includes(id));
  }
  return task.answer === response;
}

function answerText(task: InvestigationTask): string {
  const labels = (id: string) => task.options?.find((option) => option.id === id)?.label ?? id;
  return Array.isArray(task.answer)
    ? task.answer.map(labels).join("; ")
    : typeof task.answer === "number"
      ? `${task.answer.toLocaleString("pt-BR")} ${task.unit ?? ""}`
      : labels(task.answer);
}

export function InvestigationGame({
  gameId,
  cases,
  onExit,
}: {
  gameId: string;
  cases: InvestigationCase[];
  onExit: () => void;
}) {
  const [caseIndex, setCaseIndex] = useState(0);
  const session = useGameSession(gameId);
  const progress = useProgress((state) => state.progress[gameId]);
  const caso = cases[caseIndex];
  const chooseCase = (index: number) => {
    stopSpeech();
    session.restart();
    setCaseIndex(index);
  };
  return (
    <GameShell
      game={GAME_BY_ID[gameId]}
      session={session}
      mission={caso.mission}
      instruction={
        [
          "Leia o contexto e confronte as evidências. Os três casos podem ser escolhidos livremente.",
          "Teste as hipóteses. Confira as respostas ou use a resolução com apoio, sem perder progresso.",
          "Escolha uma decisão, examine a justificativa e registre sua conclusão.",
        ][session.phase - 1]
      }
      narration={stripLatex(`${caso.title}. ${caso.context}`)}
      nextVariant={{
        label: "Investigar outro caso",
        onPick: () => setCaseIndex((caseIndex + 1) % cases.length),
      }}
      onExit={onExit}
    >
      <nav aria-label="Casos do jogo" className="mb-5 grid gap-2 sm:grid-cols-3">
        {cases.map((item, index) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={index === caseIndex}
            className={`ludus-case-button ${index === caseIndex ? "ludus-case-active" : ""}`}
            onClick={() => chooseCase(index)}
          >
            <span className="block text-xs font-bold text-ink-soft">
              Caso {index + 1} de {cases.length}
            </span>
            <span className="block font-display font-bold">{item.title}</span>
            <span className="block text-xs text-ink-soft">{item.focus}</span>
            {progress?.completedCaseIds?.includes(item.id) && (
              <span className="text-xs font-bold text-success-dark">Caso registrado</span>
            )}
          </button>
        ))}
      </nav>
      <InvestigationStage
        key={`${caseIndex}-${session.generation}`}
        caso={caso}
        session={session}
      />
    </GameShell>
  );
}

function InvestigationStage({ caso, session }: { caso: InvestigationCase; session: GameSession }) {
  const [reviewed, setReviewed] = useState<string[]>([]);
  const [supported, setSupported] = useState<string[]>([]);
  const [decisionReviewed, setDecisionReviewed] = useState(false);
  const [decisionSupported, setDecisionSupported] = useState(false);
  const [reason, setReason] = useState("");
  const record = (id: string, support: boolean) => {
    setReviewed((previous) => (previous.includes(id) ? previous : [...previous, id]));
    if (support) setSupported((previous) => (previous.includes(id) ? previous : [...previous, id]));
  };
  const allReviewed = caso.tasks.every((task) => reviewed.includes(task.id));
  return (
    <div className="space-y-5">
      <section
        aria-label="Contexto do caso"
        className="rounded-2xl border-2 border-border bg-cloud p-4"
      >
        <h2 className="font-display text-xl font-bold text-ink">{caso.title}</h2>
        <p className="mt-2 leading-relaxed text-ink">
          <MathText text={caso.context} />
        </p>
        <SpeakerButton
          text={stripLatex(caso.context)}
          label="Ouvir contexto"
          className="ludus-btn ludus-btn-paper ludus-btn-sm mt-3"
        />
      </section>
      <section aria-label="Evidências do caso">
        <h3 className="mb-3 font-display text-lg font-bold text-ink">Dossiê de evidências</h3>
        <div className="grid gap-3 sm:grid-cols-3">
          {caso.evidence.map((evidence) => (
            <article
              key={evidence.id}
              className="ludus-evidence rounded-2xl border-2 border-border bg-surface p-4"
            >
              <h4 className="font-display font-bold text-ink">{evidence.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-ink">
                <MathText text={evidence.text} />
              </p>
              <p className="mt-3 text-xs leading-relaxed text-ink-soft">Fonte: {evidence.source}</p>
              <SpeakerButton
                text={stripLatex(`${evidence.title}. ${evidence.text}. Fonte: ${evidence.source}`)}
                label={`Ouvir evidência: ${evidence.title}`}
                className="ludus-btn ludus-btn-paper ludus-btn-sm mt-3"
              />
            </article>
          ))}
        </div>
      </section>
      {session.phase === 1 && (
        <button
          type="button"
          className="ludus-btn ludus-btn-ink w-full"
          onClick={() => session.setPhase(2)}
        >
          Testar hipóteses
        </button>
      )}
      {session.phase >= 2 && caso.model && <ModelLab model={caso.model} />}
      {session.phase === 2 && (
        <>
          {caso.tasks.map((task, index) => (
            <Task
              key={task.id}
              task={task}
              index={index + 1}
              session={session}
              onReviewed={(support) => record(task.id, support)}
            />
          ))}
          <p className="text-sm text-ink-soft" role="status">
            {reviewed.length} de {caso.tasks.length} testes examinados. As pistas e o apoio também
            fazem parte da investigação.
          </p>
          <button
            type="button"
            className="ludus-btn ludus-btn-ink w-full"
            disabled={!allReviewed}
            onClick={() => session.setPhase(3)}
          >
            Construir decisão
          </button>
        </>
      )}
      {session.phase === 3 && (
        <>
          <Task
            task={caso.decision}
            index={1}
            session={session}
            onReviewed={(support) => {
              setDecisionReviewed(true);
              if (support) setDecisionSupported(true);
            }}
          />
          <label className="block font-display font-bold text-ink" htmlFor="investigation-reason">
            Justificativa da decisão (opcional)
          </label>
          <p id="reason-help" className="text-sm text-ink-soft">
            {caso.reflection} A justificativa pode ser escrita, falada ao professor ou discutida em
            dupla. O texto permanece somente nesta partida e não recebe nota automática.
          </p>
          <textarea
            id="investigation-reason"
            aria-describedby="reason-help"
            rows={4}
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            className="ludus-input w-full"
            placeholder="Que evidência sustenta a decisão? Qual limite permanece?"
          />
          <button
            type="button"
            className="ludus-btn ludus-btn-ink w-full"
            disabled={!decisionReviewed}
            onClick={() =>
              session.finish({
                title: "Investigação registrada",
                text: `${caso.conclusion} ${supported.length > 0 || decisionSupported ? "A resolução com apoio foi utilizada nesta partida." : "As respostas foram examinadas com o feedback."} Os selos registram participação, sem atribuir domínio da habilidade.`,
                detail: {
                  label: "Transferir para outra situação",
                  text: `${caso.transfer} Para discutir: ${caso.reflection}`,
                },
                caseId: caso.id,
              })
            }
          >
            Registrar conclusão
          </button>
        </>
      )}
    </div>
  );
}

function Task({
  task,
  index,
  session,
  onReviewed,
}: {
  task: InvestigationTask;
  index: number;
  session: GameSession;
  onReviewed: (support: boolean) => void;
}) {
  const [response, setResponse] = useState<Response>(
    task.kind === "multi" || task.kind === "order" ? [] : "",
  );
  const [result, setResult] = useState<"correct" | "retry" | "support" | null>(null);
  const [hint, setHint] = useState(false);
  const update = (value: Response) => {
    setResponse(value);
    setResult(null);
  };
  const selected = Array.isArray(response) ? response : [];
  const feedback = (task.options ?? [])
    .filter((option) => selected.includes(option.id) || response === option.id)
    .map((option) => option.feedback)
    .join(" ");
  const feedbackText =
    result === "retry"
      ? `${feedback} ${task.hint} É possível tentar novamente ou examinar a resolução com apoio.`
      : `${result === "support" ? `Referência: ${answerText(task)}. ` : feedback + " "}${task.explanation}`;
  const evaluate = () => {
    const correct = checkResponse(task, response);
    setResult(correct ? "correct" : "retry");
    if (correct) {
      onReviewed(false);
      session.showSuccess("Resposta examinada. A explicação está junto ao teste.");
    } else
      session.showError(
        "A hipótese precisa de revisão. Use a pista, tente novamente ou examine a resolução com apoio.",
      );
  };
  return (
    <fieldset className="ludus-task rounded-2xl border-2 border-border bg-surface p-4 sm:p-5">
      <legend className="max-w-full px-2 font-display text-lg font-bold text-ink">
        <span className="text-ink-soft">{index}. </span>
        <MathText text={task.prompt} />
      </legend>
      <SpeakerButton
        text={stripLatex(
          [task.prompt, ...(task.options ?? []).map((option) => option.label)].join(". "),
        )}
        label="Ouvir teste"
        className="ludus-btn ludus-btn-paper ludus-btn-sm mb-3"
      />
      {task.kind === "number" ? (
        <label className="block text-sm font-bold text-ink" htmlFor={`answer-${task.id}`}>
          Resposta {task.unit && `(${task.unit})`}
          <input
            id={`answer-${task.id}`}
            type="text"
            inputMode="decimal"
            value={typeof response === "string" ? response : ""}
            onChange={(event) => update(event.target.value)}
            className="ludus-input mt-2 w-full"
            aria-describedby={`hint-${task.id}`}
            placeholder="Usar vírgula ou ponto para decimais"
          />
        </label>
      ) : task.kind === "order" ? (
        <div className="space-y-3">
          {(task.options ?? []).map((_, position) => (
            <label key={position} className="block text-sm font-bold text-ink">
              Posição {position + 1}
              <select
                className="ludus-input mt-1 w-full"
                value={selected[position] ?? ""}
                onChange={(event) => {
                  const next = [...selected];
                  next[position] = event.target.value;
                  update(next);
                }}
              >
                <option value="">Selecionar etapa</option>
                {task.options?.map((option) => (
                  <option key={option.id} value={option.id}>
                    {stripLatex(option.label)}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {task.kind === "multi" && (
            <p className="text-sm text-ink-soft">Selecione todas as evidências pertinentes.</p>
          )}
          {task.options?.map((option) => (
            <label
              key={option.id}
              className="ludus-choice flex min-h-12 cursor-pointer items-start gap-3 rounded-xl border-2 border-border p-3 text-ink"
            >
              <input
                type={task.kind === "multi" ? "checkbox" : "radio"}
                name={`task-${task.id}`}
                value={option.id}
                checked={
                  task.kind === "multi" ? selected.includes(option.id) : response === option.id
                }
                onChange={() =>
                  update(
                    task.kind === "multi"
                      ? selected.includes(option.id)
                        ? selected.filter((id) => id !== option.id)
                        : [...selected, option.id]
                      : option.id,
                  )
                }
                className="mt-1 size-5 shrink-0 accent-success"
              />
              <span className="text-sm leading-relaxed">
                <MathText text={option.label} />
              </span>
            </label>
          ))}
        </div>
      )}
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" className="ludus-btn ludus-btn-ink ludus-btn-sm" onClick={evaluate}>
          Conferir resposta
        </button>
        <button
          type="button"
          className="ludus-btn ludus-btn-paper ludus-btn-sm"
          aria-expanded={hint}
          onClick={() => setHint(!hint)}
        >
          Ver pista
        </button>
        <button
          type="button"
          className="ludus-btn ludus-btn-paper ludus-btn-sm"
          onClick={() => {
            setResult("support");
            onReviewed(true);
            session.showInfo(
              "Resolução com apoio disponível junto ao teste. O progresso é preservado.",
            );
          }}
        >
          Continuar com apoio
        </button>
      </div>
      <div id={`hint-${task.id}`} className="mt-3">
        {hint && (
          <p className="rounded-xl bg-cloud p-3 text-sm leading-relaxed text-ink">
            <strong>Pista: </strong>
            <MathText text={task.hint} />
          </p>
        )}
      </div>
      {result && (
        <div
          role="status"
          className={`mt-3 rounded-xl border-2 p-4 text-ink ${result === "retry" ? "border-hint bg-hint-soft" : "border-success bg-success-soft"}`}
        >
          <p className="font-display font-bold">
            {result === "correct"
              ? "Hipótese sustentada"
              : result === "retry"
                ? "Reexaminar a hipótese"
                : "Resolução com apoio"}
          </p>
          <p className="mt-2 text-sm leading-relaxed">
            <MathText text={feedbackText} />
          </p>
          <SpeakerButton
            label="Ouvir feedback"
            text={stripLatex(feedbackText)}
            className="ludus-btn ludus-btn-paper ludus-btn-sm mt-3"
          />
        </div>
      )}
    </fieldset>
  );
}

function ModelLab({ model }: { model: InvestigationModel }) {
  const explorationNote =
    "Este é seu cenário de exploração, mantido ao construir a decisão. Alterar parâmetros não muda os dados pedidos nos testes ou na decisão: consulte cada enunciado e o dossiê.";
  const initialValues = () =>
    Object.fromEntries(model.parameters.map((parameter) => [parameter.id, parameter.initial]));
  const [values, setValues] = useState<Record<string, number>>(initialValues);
  const results = model.evaluate(values);
  const [variable, setVariable] = useState(model.parameters[0]?.id ?? "");
  const parameter = model.parameters.find((item) => item.id === variable);
  const comparisonValues = parameter
    ? [
        ...new Set([
          ...Array.from({ length: 6 }, (_, index) => {
            const raw = parameter.min + ((parameter.max - parameter.min) * index) / 5;
            return Number(
              Math.min(
                parameter.max,
                parameter.min + Math.round((raw - parameter.min) / parameter.step) * parameter.step,
              ).toFixed(6),
            );
          }),
          values[parameter.id],
        ]),
      ].sort((a, b) => a - b)
    : [];
  const rows = parameter
    ? comparisonValues.map((value) => ({
        value,
        results: model.evaluate({ ...values, [parameter.id]: value }),
      }))
    : [];
  const numeric = rows.map((row) => Number(row.results[0]?.value));
  const canPlot = numeric.length > 1 && numeric.every(Number.isFinite);
  const low = Math.min(...numeric);
  const high = Math.max(...numeric);
  const y = (value: number) => 160 - ((value - low) / (high - low || 1)) * 130;
  const x = (value: number) =>
    30 +
    ((value - (parameter?.min ?? 0)) / ((parameter?.max ?? 1) - (parameter?.min ?? 0) || 1)) * 270;
  return (
    <section
      aria-label="Laboratório do caso"
      className="rounded-2xl border-2 border-border bg-cloud p-4"
    >
      <h3 className="font-display text-lg font-bold text-ink">{model.title}</h3>
      <p className="mt-2 text-ink">
        <MathText text={model.expression} />
      </p>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{model.note}</p>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{explorationNote}</p>
      <SpeakerButton
        text={stripLatex(
          [
            model.title,
            model.expression,
            model.note,
            explorationNote,
            "Cenário em exploração",
            ...model.parameters.map(
              (item) => `${item.label}: ${values[item.id].toLocaleString("pt-BR")} ${item.unit}`,
            ),
            ...results.map(
              (item) =>
                `${item.label}: ${typeof item.value === "number" ? item.value.toLocaleString("pt-BR", { maximumFractionDigits: 4 }) : item.value} ${item.unit}`,
            ),
          ].join(". "),
        )}
        label="Ouvir modelo"
        className="ludus-btn ludus-btn-paper ludus-btn-sm mt-3"
      />
      <button
        type="button"
        className="ludus-btn ludus-btn-paper ludus-btn-sm mt-3"
        onClick={() => setValues(initialValues())}
      >
        Restaurar parâmetros iniciais
      </button>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {model.parameters.map((item) => (
          <label
            key={item.id}
            className="rounded-xl bg-surface p-3 font-bold text-ink"
            htmlFor={`model-${item.id}`}
          >
            {item.label}:{" "}
            <output>
              {values[item.id].toLocaleString("pt-BR")} {item.unit}
            </output>
            <input
              id={`model-${item.id}`}
              type="range"
              min={item.min}
              max={item.max}
              step={item.step}
              value={values[item.id]}
              onChange={(event) => setValues({ ...values, [item.id]: Number(event.target.value) })}
              className="mt-2 h-12 w-full accent-success"
            />
          </label>
        ))}
      </div>
      <dl className="mt-4 grid gap-3 sm:grid-cols-2">
        {results.map((result) => (
          <div key={result.label} className="rounded-xl border-2 border-border bg-surface p-3">
            <dt className="text-sm font-bold text-ink-soft">{result.label}</dt>
            <dd className="font-display text-xl font-bold text-ink">
              {typeof result.value === "number"
                ? result.value.toLocaleString("pt-BR", { maximumFractionDigits: 4 })
                : result.value}{" "}
              {result.unit}
            </dd>
          </div>
        ))}
      </dl>
      {parameter && (
        <details className="mt-4 rounded-xl border-2 border-border bg-surface p-3">
          <summary className="min-h-11 cursor-pointer font-display font-bold text-ink">
            Comparar cenários do modelo
          </summary>
          <label className="block text-sm font-bold text-ink">
            Variável de comparação
            <select
              value={variable}
              onChange={(event) => setVariable(event.target.value)}
              className="ludus-input my-2 w-full"
            >
              {model.parameters.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
          <p className="text-xs text-ink-soft">
            As outras variáveis mantêm os valores selecionados. A tabela inclui o valor atual e até
            seis cenários permitidos pelos controles, sem representar medições reais. O gráfico
            marca cenários, sem interpolar estados não previstos. Para percorrer a tabela com
            teclado, selecione-a com Tab e use as setas.
          </p>
          {canPlot && (
            <svg
              role="img"
              aria-label={`${results[0]?.label} em função de ${parameter.label}. Os mesmos valores estão na tabela.`}
              viewBox="0 0 320 190"
              className="mt-3 w-full max-w-lg text-success-dark"
            >
              <path d="M30 20V160H305" fill="none" stroke="currentColor" />
              {numeric.map((value, index) => (
                <circle
                  key={index}
                  cx={x(rows[index].value)}
                  cy={y(value)}
                  r="4"
                  fill="currentColor"
                />
              ))}
              <text x="35" y="18" fill="currentColor" fontSize="11">
                {results[0]?.label} ({results[0]?.unit})
              </text>
              <text x="35" y="183" fill="currentColor" fontSize="11">
                {parameter.label} ({parameter.unit})
              </text>
            </svg>
          )}
          <div
            role="region"
            aria-label={`Tabela de cenários de ${parameter.label}`}
            tabIndex={0}
            className="mt-3 overflow-x-auto"
          >
            <table className="w-full text-left text-sm text-ink">
              <caption className="sr-only">Cenários de {parameter.label}</caption>
              <thead>
                <tr>
                  <th scope="col" className="p-2">
                    {parameter.label} ({parameter.unit})
                  </th>
                  {results.map((result) => (
                    <th key={result.label} scope="col" className="p-2">
                      {result.label} ({result.unit})
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={index} className="border-t border-border">
                    <th scope="row" className="p-2">
                      {row.value.toLocaleString("pt-BR", { maximumFractionDigits: 2 })}
                    </th>
                    {row.results.map((result) => (
                      <td key={result.label} className="p-2">
                        {typeof result.value === "number"
                          ? result.value.toLocaleString("pt-BR", { maximumFractionDigits: 4 })
                          : result.value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      )}
    </section>
  );
}
