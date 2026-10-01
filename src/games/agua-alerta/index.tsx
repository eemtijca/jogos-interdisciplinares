"use client";

import { InvestigationGame } from "../_shared/investigation-game";
import { CASES } from "./content";

export function AguaAlertaGame({ onExit }: { onExit: () => void }) {
  return <InvestigationGame gameId="agua-alerta" cases={CASES} onExit={onExit} />;
}
