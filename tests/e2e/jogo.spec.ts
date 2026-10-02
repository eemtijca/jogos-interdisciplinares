import { GAMES, AREA_ORDER } from "../../src/lib/catalog";
import { INVESTIGATION_CASES } from "../../src/games/cases";
import { answerTask, expect, test, readProgress, expectNoPageOverflow } from "./fixtures";

test.describe("Coleção investigativa", () => {
  for (const game of GAMES) {
    test(`${game.title}: abre rota e os três casos`, async ({ page }) => {
      await page.goto(`/jogo/${game.id}`);
      await expect(page.getByRole("heading", { level: 1, name: game.title })).toBeVisible();
      const cases = page.getByRole("navigation", { name: "Casos do jogo" });
      await expect(cases.getByRole("button")).toHaveCount(3);
      for (let index = 0; index < 3; index++) {
        const scenario = INVESTIGATION_CASES[game.id][index];
        const button = cases.getByRole("button", { name: new RegExp(`^Caso ${index + 1} `) });
        await button.click();
        await expect(button).toHaveAttribute("aria-pressed", "true");
        await expect(page.getByRole("region", { name: "Contexto do caso" })).toContainText(
          scenario.title,
        );
        await expect(
          page.getByRole("region", { name: "Evidências do caso" }).getByRole("article"),
        ).toHaveCount(scenario.evidence.length);
        await expect(
          page.getByRole("button", { name: "Testar hipóteses", exact: true }),
        ).toBeEnabled();
        await expectNoPageOverflow(page);
      }
    });
  }

  for (const area of AREA_ORDER) {
    const game = GAMES.find((item) => item.area === area && item.level === 5)!;
    test(`${area}: erro, apoio, conclusão e repetição preservam progresso`, async ({ page }) => {
      const scenario = INVESTIGATION_CASES[game.id][2];
      await page.setViewportSize({ width: 320, height: 800 });
      await page.goto(`/jogo/${game.id}`);
      await page.getByRole("button", { name: "Texto amplo", exact: true }).click();
      await expect(page.locator("html")).toHaveClass(/a11y-text-large/);
      await page
        .getByRole("navigation", { name: "Casos do jogo" })
        .getByRole("button", { name: /^Caso 3 / })
        .click();
      await expectNoPageOverflow(page);
      await page.getByRole("button", { name: "Testar hipóteses", exact: true }).click();
      let experimentalValue: string | undefined;
      if (scenario.model) {
        await page.locator("summary").filter({ hasText: "Comparar cenários do modelo" }).click();
        await expect(page.getByRole("region", { name: /^Tabela de cenários de / })).toBeVisible();
        const parameter = page.getByRole("slider").first();
        const initialValue = await parameter.inputValue();
        await parameter.press(
          initialValue === String(scenario.model.parameters[0].min) ? "End" : "Home",
        );
        experimentalValue = await parameter.inputValue();
        expect(experimentalValue).not.toBe(initialValue);
      }
      await expectNoPageOverflow(page);
      const fields = page.locator("fieldset");
      await expect(fields).toHaveCount(scenario.tasks.length);
      await expect(page.getByRole("region", { name: "Evidências do caso" })).toBeVisible();
      await answerTask(fields.first(), scenario.tasks[0], false);
      await expect(fields.first().getByRole("status")).toContainText("Reexaminar a hipótese");
      await expect(
        page.getByRole("button", { name: "Construir decisão", exact: true }),
      ).toBeDisabled();
      await fields.first().getByRole("button", { name: "Ver pista", exact: true }).click();
      await expect(fields.first().getByText("Pista:", { exact: true })).toBeVisible();
      await fields
        .first()
        .getByRole("button", { name: "Continuar com apoio", exact: true })
        .click();
      await expect(fields.first().getByRole("status")).toContainText("Resolução com apoio");
      for (let index = 1; index < scenario.tasks.length; index++) {
        await answerTask(fields.nth(index), scenario.tasks[index]);
        await expect(fields.nth(index).getByRole("status")).toContainText("Hipótese sustentada");
      }
      await page.getByRole("button", { name: "Construir decisão", exact: true }).click();
      if (scenario.model) {
        await expect(page.getByRole("slider").first()).toHaveValue(experimentalValue!);
        await expect(page.getByRole("region", { name: "Laboratório do caso" })).toContainText(
          "Alterar parâmetros não muda os dados pedidos nos testes ou na decisão",
        );
        await page
          .getByRole("button", { name: "Restaurar parâmetros iniciais", exact: true })
          .click();
        for (let index = 0; index < scenario.model.parameters.length; index++) {
          await expect(page.getByRole("slider").nth(index)).toHaveValue(
            String(scenario.model.parameters[index].initial),
          );
        }
      }
      await expectNoPageOverflow(page);
      await expect(page.getByRole("region", { name: "Evidências do caso" })).toBeVisible();
      await expect(
        page.getByRole("button", { name: "Registrar conclusão", exact: true }),
      ).toBeDisabled();
      await answerTask(fields.first(), scenario.decision, false);
      await expect(fields.first().getByRole("status")).toContainText("Reexaminar a hipótese");
      await fields
        .first()
        .getByRole("button", { name: "Continuar com apoio", exact: true })
        .click();
      await page
        .getByRole("textbox", { name: "Justificativa da decisão (opcional)" })
        .fill("A decisão exige considerar a evidência e seus limites.");
      await page.getByRole("button", { name: "Registrar conclusão", exact: true }).click();
      await expect(page.getByRole("heading", { name: "Investigação registrada" })).toBeVisible();
      await page.getByRole("button", { name: "Transferir para outra situação" }).click();
      await expect(page.getByText(scenario.transfer, { exact: false })).toBeVisible();
      await expectNoPageOverflow(page);
      const saved = (await readProgress(page))[game.id];
      expect(saved.badges).toEqual(expect.arrayContaining(["lente", "chave", "selo-final"]));
      expect(saved.completions).toBe(1);
      expect(saved.completedCaseIds).toContain(scenario.id);
      await page.reload();
      expect((await readProgress(page))[game.id]).toEqual(saved);
      await page.getByRole("button", { name: "Recomeçar a partida do começo" }).click();
      expect((await readProgress(page))[game.id]).toEqual(saved);
      await page.getByRole("button", { name: "Voltar para a lista de jogos" }).click();
      await expect(page.getByRole("heading", { level: 1 })).toContainText("Jogos de investigação");
      await page.getByRole("button", { name: "Concluídos", exact: true }).click();
      await expect(page.getByRole("link", { name: /^Jogar / })).toHaveCount(1);
      await expect(
        page.getByRole("link", { name: new RegExp(`^Jogar ${game.title}`) }),
      ).toBeVisible();
    });
  }

  test("conclusões corretas e repetição acumulam partidas sem duplicar casos ou selos", async ({
    page,
  }) => {
    const gameId = "fonte-suspeita";
    const scenarios = INVESTIGATION_CASES[gameId];
    await page.goto(`/jogo/${gameId}`);
    for (const [iteration, caseIndex] of [0, 1, 0].entries()) {
      if (iteration > 0)
        await page.getByRole("button", { name: "Jogar de novo", exact: true }).click();
      await page
        .getByRole("navigation", { name: "Casos do jogo" })
        .getByRole("button", { name: new RegExp(`^Caso ${caseIndex + 1} `) })
        .click();
      const scenario = scenarios[caseIndex];
      await page.getByRole("button", { name: "Testar hipóteses", exact: true }).click();
      const fields = page.locator("fieldset");
      for (const [index, task] of scenario.tasks.entries())
        await answerTask(fields.nth(index), task);
      await page.getByRole("button", { name: "Construir decisão", exact: true }).click();
      await answerTask(fields.first(), scenario.decision);
      await expect(
        page.getByRole("textbox", { name: "Justificativa da decisão (opcional)" }),
      ).toHaveValue("");
      await page.getByRole("button", { name: "Registrar conclusão", exact: true }).click();
      await expect(page.getByRole("heading", { name: "Investigação registrada" })).toBeVisible();
      const progress = (await readProgress(page))[gameId];
      expect(progress.completions).toBe(iteration + 1);
      expect(progress.badges).toHaveLength(3);
      expect(progress.completedCaseIds).toHaveLength(iteration === 0 ? 1 : 2);
    }
    const progress = (await readProgress(page))[gameId];
    expect(progress.completedCaseIds.sort()).toEqual([scenarios[0].id, scenarios[1].id].sort());
    await page.goto("/progresso");
    const summary = page.getByRole("region", { name: "Resumo geral" });
    await expect(summary.getByText("1/20")).toBeVisible();
    await expect(summary.getByText("2/60")).toBeVisible();
    await expect(summary.getByText("3/60")).toBeVisible();
  });

  test("identificador desconhecido oferece retorno ao hub", async ({ page }) => {
    await page.goto("/jogo/inexistente");
    await expect(page.getByRole("heading", { name: "Jogo não encontrado" })).toBeVisible();
    await page.getByRole("link", { name: "Voltar aos jogos" }).click();
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Jogos de investigação");
  });
});
