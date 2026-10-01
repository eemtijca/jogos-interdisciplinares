"use client";

import { InvestigationGame } from "../_shared/investigation-game";
import { CASES } from "./content";

export function SentidoContextoGame({ onExit }: { onExit: () => void }) {
  return <InvestigationGame gameId="sentido-contexto" cases={CASES} onExit={onExit} />;
}
