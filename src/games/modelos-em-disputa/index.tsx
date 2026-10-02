"use client";

import { InvestigationGame } from "../_shared/investigation-game";
import { CASES } from "./content";

export function ModelosEmDisputaGame({ onExit }: { onExit: () => void }) {
  return <InvestigationGame gameId="modelos-em-disputa" cases={CASES} onExit={onExit} />;
}
