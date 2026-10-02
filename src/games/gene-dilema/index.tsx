"use client";

import { InvestigationGame } from "../_shared/investigation-game";
import { CASES } from "./content";

export function GeneDilemaGame({ onExit }: { onExit: () => void }) {
  return <InvestigationGame gameId="gene-dilema" cases={CASES} onExit={onExit} />;
}
