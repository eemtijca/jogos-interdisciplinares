"use client";

import { InvestigationGame } from "../_shared/investigation-game";
import { CASES } from "./content";

export function OrcamentoLimiteGame({ onExit }: { onExit: () => void }) {
  return <InvestigationGame gameId="orcamento-limite" cases={CASES} onExit={onExit} />;
}
