"use client";

import { InvestigationGame } from "../_shared/investigation-game";
import { CASES } from "./content";

export function DadosSobLupaGame({ onExit }: { onExit: () => void }) {
  return <InvestigationGame gameId="dados-sob-lupa" cases={CASES} onExit={onExit} />;
}
