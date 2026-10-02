/** Contrato dos casos: evidência, teste de hipótese e decisão justificada. */
export interface Evidence {
  id: string;
  title: string;
  text: string;
  source: string;
}

export interface InvestigationOption {
  id: string;
  label: string;
  feedback: string;
}

export interface InvestigationTask {
  id: string;
  kind: "choice" | "number" | "multi" | "order";
  prompt: string;
  options?: InvestigationOption[];
  answer: string | number | string[];
  tolerance?: number;
  unit?: string;
  hint: string;
  explanation: string;
}

export interface InvestigationModel {
  title: string;
  expression: string;
  note: string;
  parameters: {
    id: string;
    label: string;
    min: number;
    max: number;
    step: number;
    initial: number;
    unit: string;
  }[];
  evaluate: (
    values: Record<string, number>,
  ) => { label: string; value: number | string; unit: string }[];
}

export interface InvestigationCase {
  id: string;
  title: string;
  focus: string;
  context: string;
  mission: string;
  evidence: Evidence[];
  tasks: InvestigationTask[];
  decision: InvestigationTask;
  conclusion: string;
  reflection: string;
  transfer: string;
  model?: InvestigationModel;
}
