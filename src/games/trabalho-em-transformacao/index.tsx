"use client";

import { InvestigationGame } from "@/games/_shared/investigation-game";
import { CASES } from "./content";

export function TrabalhoEmTransformacaoGame({ onExit }: { onExit: () => void }) {
  return <InvestigationGame gameId="trabalho-em-transformacao" cases={CASES} onExit={onExit} />;
}
