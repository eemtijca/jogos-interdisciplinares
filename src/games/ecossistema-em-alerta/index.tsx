"use client";

import { InvestigationGame } from "../_shared/investigation-game";
import { CASES } from "./content";

export function EcossistemaEmAlertaGame({ onExit }: { onExit: () => void }) {
  return <InvestigationGame gameId="ecossistema-em-alerta" cases={CASES} onExit={onExit} />;
}
