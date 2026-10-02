"use client";

import { InvestigationGame } from "@/games/_shared/investigation-game";
import { CASES } from "./content";

export function FonteHistoricaGame({ onExit }: { onExit: () => void }) {
  return <InvestigationGame gameId="fonte-historica" cases={CASES} onExit={onExit} />;
}
