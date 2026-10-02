"use client";

import { InvestigationGame } from "@/games/_shared/investigation-game";
import { CASES } from "./content";

export function FonteSuspeitaGame({ onExit }: { onExit: () => void }) {
  return <InvestigationGame gameId="fonte-suspeita" cases={CASES} onExit={onExit} />;
}
