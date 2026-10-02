"use client";

import { InvestigationGame } from "../_shared/investigation-game";
import { CASES } from "./content";

export function CircuitoFalhouGame({ onExit }: { onExit: () => void }) {
  return <InvestigationGame gameId="circuito-falhou" cases={CASES} onExit={onExit} />;
}
