"use client";

import { useState } from "react";
import { GameShell } from "@/components/game-shell/game-shell";
import { EvidenceCard, type EvidenceCardData } from "@/components/game-shell/evidence-card";
import { OptionTile } from "@/components/game-shell/option-tile";
import { SpeakerButton } from "@/components/game-shell/speaker-button";
import { GAME_BY_ID } from "@/lib/catalog";
import { useProgress } from "@/lib/progress";
import { useGameSession, type GameSession, type VerdictPayload } from "./use-game-session";

export interface InvestigationQuestion {
  prompt: string;
  hint: string;
  correctId: string;
  options: { id: string; title: string; explanation: string }[];
}

export interface InvestigationCase {
  id: string;
  title: string;
  mission: string;
  context: string;
  evidence: [EvidenceCardData, EvidenceCardData, EvidenceCardData];
  table?: { caption: string; columns: string[]; rows: string[][] };
  test: InvestigationQuestion;
  decision: InvestigationQuestion;
  verdict: Omit<VerdictPayload, "caseId">;
}

/** Palco compartilhado: evidências, teste com pistas e decisão fundamentada. */
export function InvestigationGame({
  gameId,
  cases,
  onExit,
}: {
  gameId: string;
  cases: readonly InvestigationCase[];
  onExit: () => void;
}) {
  const game = GAME_BY_ID[gameId];
  const [caseIndex, setCaseIndex] = useState(0);
  const session = useGameSession(gameId);
  const completedCaseIds = useProgress((s) => s.progress[gameId]?.completedCaseIds);
  const caso = cases[caseIndex];
  const question = session.phase === 2 ? caso.test : caso.decision;

  const nextIndex = cases.findIndex(
    (candidate, index) => index !== caseIndex && !completedCaseIds?.includes(candidate.id),
  );

  return (
    <GameShell
      game={game}
      session={session}
      mission={caso.mission}
      instruction={
        session.phase === 1 ? "Vire as três evidências e observe o contexto." : question.prompt
      }
      narration={
        session.phase === 1
          ? [
              caso.context,
              caso.table?.caption,
              caso.table?.rows.map((row) => row.join(": ")).join(". "),
            ]
              .filter(Boolean)
              .join(". ")
          : question.options.map((o) => o.title).join(". ")
      }
      nextVariant={{
        label: "Investigar outro caso",
        onPick: () => setCaseIndex(nextIndex >= 0 ? nextIndex : (caseIndex + 1) % cases.length),
      }}
      onExit={onExit}
    >
      {session.phase === 1 && (
        <section className="mb-5" aria-label="Casos disponíveis">
          <h2 className="mb-2 font-display font-bold text-ink">Escolha um caso</h2>
          <div className="flex flex-wrap gap-2">
            {cases.map((candidate, index) => (
              <button
                key={candidate.id}
                type="button"
                aria-pressed={index === caseIndex}
                className="ludus-btn ludus-btn-paper ludus-btn-sm"
                onClick={() => {
                  if (index === caseIndex) return;
                  setCaseIndex(index);
                  session.restart();
                }}
              >
                {candidate.title}
                {completedCaseIds?.includes(candidate.id) ? " (concluído)" : ""}
              </button>
            ))}
          </div>
        </section>
      )}
      <InvestigationStage
        key={`${caso.id}-${session.generation}`}
        caso={caso}
        session={session}
        color={`var(--${game.area})`}
        colorDark={`var(--${game.area}-dark)`}
      />
    </GameShell>
  );
}

function InvestigationStage({
  caso,
  session,
  color,
  colorDark,
}: {
  caso: InvestigationCase;
  session: GameSession;
  color: string;
  colorDark: string;
}) {
  const [revealed, setRevealed] = useState<string[]>([]);
  const [solved, setSolved] = useState(false);
  const question = session.phase === 2 ? caso.test : caso.decision;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-display text-xl font-bold text-ink">{caso.title}</h2>
      <p className="rounded-2xl border-2 border-border bg-cloud/40 p-4 leading-relaxed text-ink">
        {caso.context}
      </p>
      {caso.table && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm text-ink">
            <caption className="mb-2 text-left font-bold">{caso.table.caption}</caption>
            <thead>
              <tr>
                {caso.table.columns.map((column) => (
                  <th key={column} scope="col" className="border-2 border-border bg-cloud p-3">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {caso.table.rows.map((row, index) => (
                <tr key={index}>
                  {row.map((cell, cellIndex) =>
                    cellIndex === 0 ? (
                      <th key={cellIndex} scope="row" className="border-2 border-border p-3">
                        {cell}
                      </th>
                    ) : (
                      <td key={cellIndex} className="border-2 border-border p-3">
                        {cell}
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {session.phase === 1 ? (
        <>
          <div className="grid gap-3 sm:grid-cols-3">
            {caso.evidence.map((card) => (
              <EvidenceCard
                key={card.category}
                data={card}
                color={color}
                onReveal={() => {
                  setRevealed((previous) => [...new Set([...previous, card.category])]);
                }}
              />
            ))}
          </div>
          <p className="text-sm font-semibold text-ink-soft" role="status">
            {revealed.length} de {caso.evidence.length} evidências exploradas.
          </p>
          <button
            type="button"
            className="ludus-btn ludus-btn-ink"
            disabled={revealed.length < caso.evidence.length}
            onClick={() => session.setPhase(2)}
          >
            Testar a hipótese
          </button>
        </>
      ) : (
        <>
          <details
            key={session.phase}
            className="rounded-2xl border-2 border-border bg-cloud/40 p-4 text-ink"
          >
            <summary className="cursor-pointer font-bold">Preciso de uma pista</summary>
            <p className="mt-2 leading-relaxed">{question.hint}</p>
            <SpeakerButton text={question.hint} label="Ouvir pista" />
          </details>
          {question.options.map((option) => (
            <OptionTile
              key={`${session.phase}-${option.id}`}
              title={option.title}
              color={color}
              colorDark={colorDark}
              disabled={session.phase === 2 && solved}
              correct={session.phase === 2 && solved && option.id === question.correctId}
              onPick={() => {
                if (option.id !== question.correctId) {
                  session.showError(option.explanation);
                  return false;
                }
                if (session.phase === 2) {
                  setSolved(true);
                  session.showSuccess(option.explanation);
                } else {
                  session.finish({ ...caso.verdict, caseId: caso.id });
                }
                return true;
              }}
            />
          ))}
          {session.phase === 2 && solved && (
            <button
              type="button"
              className="ludus-btn ludus-btn-ink"
              onClick={() => session.setPhase(3)}
            >
              Decidir com as evidências
            </button>
          )}
        </>
      )}
    </div>
  );
}
