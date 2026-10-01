import { expect, test, type Page } from "@playwright/test";
import { CASES as SENTIDO } from "../../src/games/sentido-contexto/content";
import { CASES as DADOS } from "../../src/games/dados-debate/content";
import { CASES as AGUA } from "../../src/games/agua-alerta/content";
import { CASES as MEMORIA } from "../../src/games/memoria-bairro/content";
import type { InvestigationCase } from "../../src/games/_shared/investigation-game";

const JOGOS = [
  { id: "sentido-contexto", cases: SENTIDO },
  { id: "dados-debate", cases: DADOS },
  { id: "agua-alerta", cases: AGUA },
  { id: "memoria-bairro", cases: MEMORIA },
];

async function concluirCaso(page: Page, caso: InvestigationCase) {
  await expect(page.getByRole("button", { name: "Testar a hipótese", exact: true })).toBeDisabled();
  for (const card of caso.evidence) {
    const carta = page.getByRole("button", { name: new RegExp(`^Carta ${card.category}\\.`) });
    await carta.focus();
    await carta.press("Enter");
  }
  await expect(page.getByText("3 de 3 evidências exploradas.", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Testar a hipótese", exact: true }).click();
  await expect(page.getByText(caso.test.prompt, { exact: true })).toBeFocused();
  await page.getByText("Preciso de uma pista", { exact: true }).click();
  await expect(page.getByText(caso.test.hint, { exact: true })).toBeVisible();
  const wrong = caso.test.options.find((option) => option.id !== caso.test.correctId)!;
  await page.getByRole("button", { name: wrong.title, exact: true }).click();
  await expect(page.getByRole("status").filter({ hasText: wrong.explanation })).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Decidir com as evidências", exact: true }),
  ).toHaveCount(0);
  const correct = caso.test.options.find((option) => option.id === caso.test.correctId)!;
  await page.getByRole("button", { name: correct.title, exact: true }).click();
  await page.getByRole("button", { name: "Decidir com as evidências", exact: true }).click();
  await expect(page.getByText(caso.decision.prompt, { exact: true })).toBeFocused();
  await expect(page.getByText(correct.explanation, { exact: true })).toHaveCount(0);
  const wrongDecision = caso.decision.options.find(
    (option) => option.id !== caso.decision.correctId,
  )!;
  await page.getByRole("button", { name: wrongDecision.title, exact: true }).click();
  await expect(
    page.getByRole("status").filter({ hasText: wrongDecision.explanation }),
  ).toBeVisible();
  const decision = caso.decision.options.find((option) => option.id === caso.decision.correctId)!;
  // Duas ativações síncronas devem registrar somente uma conclusão.
  await page.getByRole("button", { name: decision.title, exact: true }).evaluate((button) => {
    (button as HTMLButtonElement).click();
    (button as HTMLButtonElement).click();
  });
  await expect(page.getByRole("heading", { name: caso.verdict.title, exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: caso.verdict.title, exact: true })).toBeFocused();
  await expect(page.getByText(wrongDecision.explanation, { exact: true })).toHaveCount(0);
}

for (const game of JOGOS) {
  for (const caso of game.cases) {
    test(`${game.id}: conclui ${caso.title} por teclado e persiste os três selos`, async ({
      page,
    }) => {
      await page.goto(`/jogo/${game.id}`);
      await page
        .getByRole("region", { name: "Casos disponíveis" })
        .getByRole("button", { name: caso.title, exact: true })
        .click();
      await concluirCaso(page, caso);
      const saved = await page.evaluate(
        (gameId) => JSON.parse(localStorage.getItem("ludus:progress:v1")!)[gameId],
        game.id,
      );
      expect(saved.completions).toBe(1);
      expect(saved.badges).toEqual(["lente", "chave", "selo-final"]);
      expect(saved.completedCaseIds).toEqual([caso.id]);
      await page.reload();
      await expect(
        page
          .getByRole("region", { name: "Casos disponíveis" })
          .getByRole("button", { name: `${caso.title} (concluído)`, exact: true }),
      ).toBeVisible();
    });
  }
}

test("repetir um caso soma partidas; outro caso amplia a coleção sem perder selos", async ({
  page,
}) => {
  await page.goto("/jogo/sentido-contexto");
  await concluirCaso(page, SENTIDO[0]);
  await page.getByRole("button", { name: "Jogar de novo", exact: true }).click();
  await concluirCaso(page, SENTIDO[0]);
  let saved = await page.evaluate(
    () => JSON.parse(localStorage.getItem("ludus:progress:v1")!)["sentido-contexto"],
  );
  expect(saved.completions).toBe(2);
  expect(saved.completedCaseIds).toEqual([SENTIDO[0].id]);
  await page.getByRole("button", { name: "Investigar outro caso", exact: true }).click();
  await expect(page.getByRole("heading", { name: SENTIDO[1].title, exact: true })).toBeVisible();
  await concluirCaso(page, SENTIDO[1]);
  saved = await page.evaluate(
    () => JSON.parse(localStorage.getItem("ludus:progress:v1")!)["sentido-contexto"],
  );
  expect(saved.completions).toBe(3);
  expect(saved.completedCaseIds).toEqual([SENTIDO[0].id, SENTIDO[1].id]);
  expect(saved.badges).toEqual(["lente", "chave", "selo-final"]);
  await page.goto("/progresso");
  await expect(page.getByText("2 casos diferentes concluídos", { exact: true })).toBeVisible();
});

test("recomeçar limpa a sessão e preserva os selos já conquistados", async ({ page }) => {
  await page.goto("/jogo/dados-debate");
  for (const card of DADOS[0].evidence) {
    await page.getByRole("button", { name: new RegExp(`^Carta ${card.category}\\.`) }).click();
  }
  await page.getByRole("button", { name: "Testar a hipótese", exact: true }).click();
  await page.getByRole("button", { name: "100 minutos", exact: true }).click();
  await page.getByRole("button", { name: "Recomeçar a partida do começo", exact: true }).click();
  await expect(page.getByRole("button", { name: /Toque para virar/ })).toHaveCount(3);
  await expect(page.getByText(DADOS[0].test.options[0].explanation, { exact: true })).toHaveCount(
    0,
  );
  const saved = await page.evaluate(
    () => JSON.parse(localStorage.getItem("ludus:progress:v1")!)["dados-debate"],
  );
  expect(saved.badges).toEqual(["lente"]);
  expect(saved.completions).toBe(0);
  await page
    .getByRole("region", { name: "Casos disponíveis" })
    .getByRole("button", { name: DADOS[2].title, exact: true })
    .click();
  await expect(page.getByText("0 de 3 evidências exploradas.", { exact: true })).toBeVisible();
});
