"use client";

import { InvestigationGame } from "../_shared/investigation-game";
import { CASES } from "./content";

export function DadosDebateGame({ onExit }: { onExit: () => void }) {
  return <InvestigationGame gameId="dados-debate" cases={CASES} onExit={onExit} />;
}
