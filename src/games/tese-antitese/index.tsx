"use client";

import { InvestigationGame } from "@/games/_shared/investigation-game";
import { CASES } from "./content";

export function TeseAntiteseGame({ onExit }: { onExit: () => void }) {
  return <InvestigationGame gameId="tese-antitese" cases={CASES} onExit={onExit} />;
}
