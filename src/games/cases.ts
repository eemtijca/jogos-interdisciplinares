/** Conteúdos consultáveis pelo professor e pelos testes, sem carregar palcos React. */
import type { InvestigationCase } from "./_shared/investigation-types";
import { CASES as casos0 } from "./fonte-suspeita/content";
import { CASES as casos1 } from "./revisor-critico/content";
import { CASES as casos2 } from "./tese-antitese/content";
import { CASES as casos3 } from "./discurso-em-rede/content";
import { CASES as casos4 } from "./autoria-em-debate/content";
import { CASES as casos5 } from "./orcamento-limite/content";
import { CASES as casos6 } from "./funcao-viva/content";
import { CASES as casos7 } from "./risco-provavel/content";
import { CASES as casos8 } from "./dados-sob-lupa/content";
import { CASES as casos9 } from "./modelos-em-disputa/content";
import { CASES as casos10 } from "./circuito-falhou/content";
import { CASES as casos11 } from "./reacao-equilibrada/content";
import { CASES as casos12 } from "./gene-dilema/content";
import { CASES as casos13 } from "./ecossistema-em-alerta/content";
import { CASES as casos14 } from "./energia-em-transicao/content";
import { CASES as casos15 } from "./fonte-historica/content";
import { CASES as casos16 } from "./territorio-disputa/content";
import { CASES as casos17 } from "./dilema-etico/content";
import { CASES as casos18 } from "./trabalho-em-transformacao/content";
import { CASES as casos19 } from "./pacto-democratico/content";

export const INVESTIGATION_CASES: Record<string, InvestigationCase[]> = {
  "fonte-suspeita": casos0,
  "revisor-critico": casos1,
  "tese-antitese": casos2,
  "discurso-em-rede": casos3,
  "autoria-em-debate": casos4,
  "orcamento-limite": casos5,
  "funcao-viva": casos6,
  "risco-provavel": casos7,
  "dados-sob-lupa": casos8,
  "modelos-em-disputa": casos9,
  "circuito-falhou": casos10,
  "reacao-equilibrada": casos11,
  "gene-dilema": casos12,
  "ecossistema-em-alerta": casos13,
  "energia-em-transicao": casos14,
  "fonte-historica": casos15,
  "territorio-disputa": casos16,
  "dilema-etico": casos17,
  "trabalho-em-transformacao": casos18,
  "pacto-democratico": casos19,
};
