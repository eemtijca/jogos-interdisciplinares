"use client";

import { InvestigationGame } from "@/games/_shared/investigation-game";
import { CASES } from "./content";

export function DiscursoEmRedeGame({ onExit }: { onExit: () => void }) {
  return <InvestigationGame gameId="discurso-em-rede" cases={CASES} onExit={onExit} />;
}
