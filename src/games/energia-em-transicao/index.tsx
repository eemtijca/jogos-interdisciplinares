"use client";

import { InvestigationGame } from "../_shared/investigation-game";
import { CASES } from "./content";

export function EnergiaEmTransicaoGame({ onExit }: { onExit: () => void }) {
  return <InvestigationGame gameId="energia-em-transicao" cases={CASES} onExit={onExit} />;
}
