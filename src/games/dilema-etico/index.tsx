"use client";

import { InvestigationGame } from "@/games/_shared/investigation-game";
import { CASES } from "./content";

export function DilemaEticoGame({ onExit }: { onExit: () => void }) {
  return <InvestigationGame gameId="dilema-etico" cases={CASES} onExit={onExit} />;
}
