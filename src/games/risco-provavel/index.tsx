"use client";

import { InvestigationGame } from "../_shared/investigation-game";
import { CASES } from "./content";

export function RiscoProvavelGame({ onExit }: { onExit: () => void }) {
  return <InvestigationGame gameId="risco-provavel" cases={CASES} onExit={onExit} />;
}
