"use client";

import { InvestigationGame } from "@/games/_shared/investigation-game";
import { CASES } from "./content";

export function PactoDemocraticoGame({ onExit }: { onExit: () => void }) {
  return <InvestigationGame gameId="pacto-democratico" cases={CASES} onExit={onExit} />;
}
