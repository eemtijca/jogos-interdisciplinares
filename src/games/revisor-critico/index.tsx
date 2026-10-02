"use client";

import { InvestigationGame } from "@/games/_shared/investigation-game";
import { CASES } from "./content";

export function RevisorCriticoGame({ onExit }: { onExit: () => void }) {
  return <InvestigationGame gameId="revisor-critico" cases={CASES} onExit={onExit} />;
}
