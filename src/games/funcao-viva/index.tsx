"use client";

import { InvestigationGame } from "../_shared/investigation-game";
import { CASES } from "./content";

export function FuncaoVivaGame({ onExit }: { onExit: () => void }) {
  return <InvestigationGame gameId="funcao-viva" cases={CASES} onExit={onExit} />;
}
