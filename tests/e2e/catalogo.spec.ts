import { expect, test } from "@playwright/test";
import { AREA_ORDER, GAMES } from "../../src/lib/catalog";
import { INVESTIGATION_CASES } from "../../src/games/cases";
import type { InvestigationTask } from "../../src/games/_shared/investigation-types";

function modelResults(gameId: string, caseIndex: number, values?: Record<string, number>) {
  const model = INVESTIGATION_CASES[gameId][caseIndex].model!;
  const initial = Object.fromEntries(
    model.parameters.map((parameter) => [parameter.id, parameter.initial]),
  );
  return Object.fromEntries(
    model.evaluate({ ...initial, ...values }).map((result) => [result.label, result.value]),
  );
}

function validateTask(task: InvestigationTask) {
  expect(task.prompt.trim()).not.toBe("");
  expect(task.hint.trim()).not.toBe("");
  expect(task.explanation.trim()).not.toBe("");
  if (task.kind === "number") {
    expect(typeof task.answer).toBe("number");
    expect(Number.isFinite(task.answer)).toBe(true);
    expect(task.tolerance ?? 0.01).toBeGreaterThanOrEqual(0);
  } else {
    const ids = task.options!.map((option) => option.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids.length).toBeGreaterThanOrEqual(2);
    const answers = Array.isArray(task.answer) ? task.answer : [task.answer];
    expect(new Set(answers).size).toBe(answers.length);
    expect(answers.length).toBeGreaterThan(0);
    for (const id of answers) expect(ids).toContain(id);
    if (task.kind === "order") expect(answers.length).toBe(ids.length);
    for (const option of task.options!) expect(option.feedback.trim()).not.toBe("");
  }
}

test.describe("Integridade pedagógica dos conteúdos", () => {
  test("catálogo tem 20 identificadores e cada área cobre níveis de 1 a 5", () => {
    expect(GAMES).toHaveLength(20);
    expect(new Set(GAMES.map((game) => game.id)).size).toBe(20);
    expect(Object.keys(INVESTIGATION_CASES).sort()).toEqual(GAMES.map((game) => game.id).sort());
    for (const area of AREA_ORDER) {
      expect(
        GAMES.filter((game) => game.area === area)
          .map((game) => game.level)
          .sort(),
      ).toEqual([1, 2, 3, 4, 5]);
    }
  });

  test("60 casos têm evidências, tarefas e gabaritos coerentes com as opções", () => {
    for (const game of GAMES) {
      const cases = INVESTIGATION_CASES[game.id];
      expect(cases, game.id).toHaveLength(3);
      expect(new Set(cases.map((scenario) => scenario.id)).size).toBe(3);
      expect(new Set(cases.map((scenario) => scenario.focus)).size).toBe(3);
      for (const scenario of cases) {
        expect(scenario.evidence.length).toBeGreaterThanOrEqual(3);
        expect(scenario.tasks.length).toBeGreaterThanOrEqual(2);
        expect(new Set([...scenario.tasks, scenario.decision].map((task) => task.id)).size).toBe(
          scenario.tasks.length + 1,
        );
        for (const evidence of scenario.evidence) {
          expect(evidence.text.trim()).not.toBe("");
          expect(evidence.source.trim()).not.toBe("");
        }
        for (const task of [...scenario.tasks, scenario.decision]) validateTask(task);
        expect(scenario.reflection.trim()).not.toBe("");
        expect(scenario.transfer.trim()).not.toBe("");
      }
    }
  });

  test("modelos geram resultados finitos no estado inicial e em combinações extremas", () => {
    const models = Object.values(INVESTIGATION_CASES)
      .flat()
      .flatMap((scenario) => (scenario.model ? [scenario.model] : []));
    expect(models.length).toBeGreaterThan(0);
    for (const model of models) {
      expect(model.parameters.length).toBeGreaterThan(0);
      expect(new Set(model.parameters.map((parameter) => parameter.id)).size).toBe(
        model.parameters.length,
      );
      for (const parameter of model.parameters) {
        expect(parameter.initial).toBeGreaterThanOrEqual(parameter.min);
        expect(parameter.initial).toBeLessThanOrEqual(parameter.max);
        expect(parameter.step).toBeGreaterThan(0);
        const initialSteps = (parameter.initial - parameter.min) / parameter.step;
        expect(
          Math.abs(initialSteps - Math.round(initialSteps)),
          `${model.title}: ${parameter.id} precisa corresponder a um valor permitido pelo controle`,
        ).toBeLessThan(0.000001);
      }
      const initial = Object.fromEntries(
        model.parameters.map((parameter) => [parameter.id, parameter.initial]),
      );
      const extremes = Array.from({ length: 2 ** model.parameters.length }, (_, mask) =>
        Object.fromEntries(
          model.parameters.map((parameter, index) => [
            parameter.id,
            mask & (1 << index) ? parameter.max : parameter.min,
          ]),
        ),
      );
      for (const values of [initial, ...extremes]) {
        const results = model.evaluate(values);
        expect(results.length).toBeGreaterThan(0);
        for (const result of results) {
          expect(result.label.trim()).not.toBe("");
          if (typeof result.value === "number")
            expect(Number.isFinite(result.value), `${model.title}: ${JSON.stringify(values)}`).toBe(
              true,
            );
          else expect(result.value.trim()).not.toBe("");
        }
      }
    }
  });

  test("cálculos financeiros, funcionais e probabilísticos preservam resultados conhecidos", () => {
    expect(modelResults("orcamento-limite", 0)).toMatchObject({
      "Total contratado": 1500,
      "Margem mensal": 175,
    });
    expect(modelResults("orcamento-limite", 1)).toMatchObject({
      "Montante simples": 1080,
      "Montante composto": 1082.43,
      Diferença: 2.43,
    });
    expect(modelResults("funcao-viva", 0, { distancia: 8 })).toMatchObject({ Tarifa: 32 });
    expect(modelResults("funcao-viva", 1)).toMatchObject({ Lucro: 120 });
    expect(modelResults("funcao-viva", 1, { quantidade: 10 })).toMatchObject({ Lucro: 128 });
    expect(modelResults("risco-provavel", 0)).toMatchObject({
      "Duas azuis com reposição": 36,
      "Duas azuis sem reposição": 30,
    });
    expect(modelResults("risco-provavel", 2)).toMatchObject({
      "Saldo esperado por bilhete": -2,
      "Arrecadação depois do prêmio": 200,
      "Preço de saldo esperado zero": 3,
    });
  });

  test("circuitos, estequiometria e herança preservam limites e resultados conhecidos", () => {
    expect(modelResults("circuito-falhou", 0)).toMatchObject({
      Corrente: 0,
      "Potência na carga": 0,
    });
    expect(modelResults("circuito-falhou", 0, { chave: 1 })).toMatchObject({
      Corrente: 0.45,
      "Potência na carga": 4.05,
    });
    expect(modelResults("circuito-falhou", 2)).toMatchObject({
      Corrente: 3,
      "Potência externa": 9,
      "Potência interna": 18,
    });
    expect(modelResults("reacao-equilibrada", 0)).toMatchObject({
      "Água produzida": 2,
      "Hidrogênio restante": 2,
      "Oxigênio restante": 0,
    });
    expect(modelResults("reacao-equilibrada", 2)).toMatchObject({
      "Massa de reagentes": 284,
      "Massa teórica total de produtos": 284,
      "CO₂ coletado": 158.4,
    });
    expect(modelResults("gene-dilema", 0)).toMatchObject({
      "Marrons esperados": 2,
      "Brancos esperados": 2,
      "Probabilidade de todos marrons": 6.25,
    });
    expect(modelResults("gene-dilema", 1)).toMatchObject({
      "Marrons sobreviventes esperados": 40,
      "Brancos sobreviventes esperados": 20,
      "Proporção marrom entre sobreviventes": 66.67,
    });
  });

  test("estatística e modelos novos distinguem centro, ponderação, restrição e extrapolação", () => {
    expect(modelResults("dados-sob-lupa", 0)).toMatchObject({
      Média: 16,
      Mediana: 10,
      Amplitude: 34,
    });
    expect(modelResults("dados-sob-lupa", 1)).toMatchObject({
      "Estimativa ponderada de acesso": 66.67,
    });
    expect(modelResults("dados-sob-lupa", 2)).toMatchObject({
      "Diferença de médias finais": 20,
      "Ganho A": 10,
      "Diferença de ganhos": 0,
    });
    expect(modelResults("modelos-em-disputa", 0)).toMatchObject({
      "Índice linear": 160,
      "Índice exponencial": 172.8,
      "Dados disponíveis": "Intervalo observado",
    });
    expect(modelResults("modelos-em-disputa", 0, { tempo: 4 })).toMatchObject({
      "Dados disponíveis": "Extrapolação sem validação",
    });
    expect(modelResults("modelos-em-disputa", 1)).toMatchObject({
      "Material usado": 40,
      "Trabalho usado": 50,
      "Margem calculada": 1100,
      Viabilidade: "Viável",
    });
    expect(modelResults("modelos-em-disputa", 1, { a: 15, b: 20 })).toMatchObject({
      Viabilidade: "Inviável",
    });
    expect(modelResults("modelos-em-disputa", 2)).toMatchObject({
      "Coleta antes de transbordo": 400,
      "Volume disponível": 300,
      Transbordo: 300,
      "Dias completos": 3,
    });
    expect(modelResults("modelos-em-disputa", 2, { chuva: 0 })).toMatchObject({
      "Dias completos": 2,
    });
  });

  test("ecossistemas e energia novos preservam unidades, perdas e limites", () => {
    expect(modelResults("ecossistema-em-alerta", 0)).toMatchObject({
      "Consumidores primários": 1000,
      "Consumidores secundários": 100,
      "Consumidores terciários": 10,
    });
    expect(modelResults("ecossistema-em-alerta", 1)).toMatchObject({
      "Carga restante": 16,
      "Carga evitada": 24,
      "Oxigênio da lagoa real": "Não previsto por este modelo",
    });
    expect(modelResults("ecossistema-em-alerta", 2)).toMatchObject({
      "Riqueza real hipotética": 20,
      "Espécies detectadas esperadas": 8,
      "Espécies não detectadas esperadas": 12,
    });
    expect(modelResults("energia-em-transicao", 0)).toMatchObject({
      "Energia A": 40,
      "Energia B": 10,
      "Economia de energia": 30,
    });
    expect(modelResults("energia-em-transicao", 1)).toMatchObject({
      Geração: 3.2,
      "Energia entregue": 2.88,
      "Saldo diante da demanda": 0.88,
      "Atendimento neste cenário": "Atende",
    });
    expect(modelResults("energia-em-transicao", 1, { sol: 2 })).toMatchObject({
      "Energia entregue": 1.44,
      "Saldo diante da demanda": -0.56,
      "Atendimento neste cenário": "Precisa complemento ou reduzir demanda",
    });
    expect(modelResults("energia-em-transicao", 2)).toMatchObject({
      "Emissão estimada da mistura": 35,
      "Referência 100% T": 80,
      "Redução estimada": 45,
    });
  });
});
