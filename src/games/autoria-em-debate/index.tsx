"use client";

import { InvestigationGame } from "@/games/_shared/investigation-game";
import { CASES } from "./content";

export function AutoriaEmDebateGame({ onExit }: { onExit: () => void }) {
  return <InvestigationGame gameId="autoria-em-debate" cases={CASES} onExit={onExit} />;
}
