"use client";

import { InvestigationGame } from "../_shared/investigation-game";
import { CASES } from "./content";

export function ReacaoEquilibradaGame({ onExit }: { onExit: () => void }) {
  return <InvestigationGame gameId="reacao-equilibrada" cases={CASES} onExit={onExit} />;
}
