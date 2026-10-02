"use client";

import { InvestigationGame } from "@/games/_shared/investigation-game";
import { CASES } from "./content";

export function TerritorioDisputaGame({ onExit }: { onExit: () => void }) {
  return <InvestigationGame gameId="territorio-disputa" cases={CASES} onExit={onExit} />;
}
