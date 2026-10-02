"use client";

/** Palcos carregados por identificador, sem incluir todos os casos no hub inicial. */
import dynamic from "next/dynamic";
import type { ComponentType } from "react";
export type GameComponent = ComponentType<{ onExit: () => void }>;

export const GAME_COMPONENTS: Record<string, GameComponent> = {
  "fonte-suspeita": dynamic(() =>
    import("./fonte-suspeita").then((module) => module.FonteSuspeitaGame),
  ),
  "revisor-critico": dynamic(() =>
    import("./revisor-critico").then((module) => module.RevisorCriticoGame),
  ),
  "tese-antitese": dynamic(() =>
    import("./tese-antitese").then((module) => module.TeseAntiteseGame),
  ),
  "discurso-em-rede": dynamic(() =>
    import("./discurso-em-rede").then((module) => module.DiscursoEmRedeGame),
  ),
  "autoria-em-debate": dynamic(() =>
    import("./autoria-em-debate").then((module) => module.AutoriaEmDebateGame),
  ),
  "orcamento-limite": dynamic(() =>
    import("./orcamento-limite").then((module) => module.OrcamentoLimiteGame),
  ),
  "funcao-viva": dynamic(() => import("./funcao-viva").then((module) => module.FuncaoVivaGame)),
  "risco-provavel": dynamic(() =>
    import("./risco-provavel").then((module) => module.RiscoProvavelGame),
  ),
  "dados-sob-lupa": dynamic(() =>
    import("./dados-sob-lupa").then((module) => module.DadosSobLupaGame),
  ),
  "modelos-em-disputa": dynamic(() =>
    import("./modelos-em-disputa").then((module) => module.ModelosEmDisputaGame),
  ),
  "circuito-falhou": dynamic(() =>
    import("./circuito-falhou").then((module) => module.CircuitoFalhouGame),
  ),
  "reacao-equilibrada": dynamic(() =>
    import("./reacao-equilibrada").then((module) => module.ReacaoEquilibradaGame),
  ),
  "gene-dilema": dynamic(() => import("./gene-dilema").then((module) => module.GeneDilemaGame)),
  "ecossistema-em-alerta": dynamic(() =>
    import("./ecossistema-em-alerta").then((module) => module.EcossistemaEmAlertaGame),
  ),
  "energia-em-transicao": dynamic(() =>
    import("./energia-em-transicao").then((module) => module.EnergiaEmTransicaoGame),
  ),
  "fonte-historica": dynamic(() =>
    import("./fonte-historica").then((module) => module.FonteHistoricaGame),
  ),
  "territorio-disputa": dynamic(() =>
    import("./territorio-disputa").then((module) => module.TerritorioDisputaGame),
  ),
  "dilema-etico": dynamic(() => import("./dilema-etico").then((module) => module.DilemaEticoGame)),
  "trabalho-em-transformacao": dynamic(() =>
    import("./trabalho-em-transformacao").then((module) => module.TrabalhoEmTransformacaoGame),
  ),
  "pacto-democratico": dynamic(() =>
    import("./pacto-democratico").then((module) => module.PactoDemocraticoGame),
  ),
};
