"use client";

import { InvestigationGame } from "../_shared/investigation-game";
import { CASES } from "./content";

export function MemoriaBairroGame({ onExit }: { onExit: () => void }) {
  return <InvestigationGame gameId="memoria-bairro" cases={CASES} onExit={onExit} />;
}
