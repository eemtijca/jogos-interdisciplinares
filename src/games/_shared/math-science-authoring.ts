import type {
  Evidence,
  InvestigationModel,
  InvestigationOption,
  InvestigationTask,
} from "./investigation-types";

/** Registros fictícios: nenhuma medição de estudantes ou previsão real. */
export function evidence(
  id: string,
  title: string,
  text: string,
  source = "Dados didáticos fictícios do Ludus; registros de referência do caso.",
): Evidence {
  return { id, title, text, source };
}

type OptionTuple = [id: string, label: string, feedback: string];
export function options(items: OptionTuple[], seed = ""): InvestigationOption[] {
  // Posição estável e variada por pergunta, sem transformar ordem em pista.
  const offset =
    Array.from(seed).reduce((total, character) => total + character.charCodeAt(0), 0) %
    items.length;
  const rotated = [...items.slice(offset), ...items.slice(0, offset)];
  return rotated.map(([id, label, feedback]) => ({ id, label, feedback }));
}
export function numberTask(
  id: string,
  prompt: string,
  answer: number,
  unit: string,
  hint: string,
  explanation: string,
  tolerance = 0.01,
): InvestigationTask {
  return { id, kind: "number", prompt, answer, unit, hint, explanation, tolerance };
}
export function choiceTask(
  id: string,
  prompt: string,
  items: OptionTuple[],
  answer: string,
  hint: string,
  explanation: string,
): InvestigationTask {
  return { id, kind: "choice", prompt, options: options(items, prompt), answer, hint, explanation };
}
export function multiTask(
  id: string,
  prompt: string,
  items: OptionTuple[],
  answer: string[],
  hint: string,
  explanation: string,
): InvestigationTask {
  return { id, kind: "multi", prompt, options: options(items, prompt), answer, hint, explanation };
}
export function orderTask(
  id: string,
  prompt: string,
  items: OptionTuple[],
  answer: string[],
  hint: string,
  explanation: string,
): InvestigationTask {
  return { id, kind: "order", prompt, options: options(items, prompt), answer, hint, explanation };
}
export function parameter(
  id: string,
  label: string,
  min: number,
  max: number,
  step: number,
  initial: number,
  unit: string,
): InvestigationModel["parameters"][number] {
  return { id, label, min, max, step, initial, unit };
}
export function round(value: number, places = 2): number {
  return Number(value.toFixed(places));
}
