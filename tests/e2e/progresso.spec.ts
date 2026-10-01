import { expect, test } from "@playwright/test";
import { GAMES } from "../../src/lib/catalog";

test.describe("Progresso", () => {
  test("parte do zero e reflete o progresso salvo no dispositivo", async ({ page }) => {
    await page.goto("/progresso");
    await expect(page.getByRole("heading", { name: "Seu progresso" })).toBeVisible();
    const resumo = page.getByRole("region", { name: "Resumo geral" });
    await expect(resumo.getByText(`0/${GAMES.length}`)).toBeVisible();
    await expect(resumo.getByText(`0/${GAMES.length * 3}`)).toBeVisible();

    await page.evaluate(() => {
      window.localStorage.setItem(
        "ludus:progress:v1",
        JSON.stringify({
          "fonte-suspeita": {
            badges: ["lente", "chave", "selo-final"],
            completions: 1,
            lastCompletedAt: new Date().toISOString(),
          },
        }),
      );
    });
    await page.reload();
    await expect(resumo.getByText(`1/${GAMES.length}`)).toBeVisible();
    await expect(resumo.getByText(`3/${GAMES.length * 3}`)).toBeVisible();

    await page.getByRole("button", { name: "Zerar progresso" }).click();
    await page.getByRole("button", { name: "Toque de novo para confirmar" }).click();
    await expect(resumo.getByText(`0/${GAMES.length}`)).toBeVisible();
  });

  test("migra o último caso e sanitiza selos duplicados sem perder partidas", async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem(
        "ludus:progress:v1",
        JSON.stringify({
          "fonte-suspeita": {
            badges: ["lente", "lente", "lente", "invalido"],
            completions: 0,
            lastCompletedAt: "data inválida",
          },
          "sentido-contexto": {
            badges: ["lente", "chave", "selo-final"],
            completions: 2,
            lastCaseId: "manchete-cantina",
            lastCompletedAt: "2026-10-01T12:00:00Z",
          },
          "agua-alerta": null,
        }),
      );
    });
    await page.goto("/progresso");
    const resumo = page.getByRole("region", { name: "Resumo geral" });
    await expect(resumo.getByText(`1/${GAMES.length}`)).toBeVisible();
    await expect(resumo.getByText(`4/${GAMES.length * 3}`)).toBeVisible();
    await expect(page.getByText("1 caso diferente concluído", { exact: true })).toBeVisible();
    await page.goto("/jogo/sentido-contexto");
    await expect(
      page.getByRole("button", { name: "A manchete da cantina (concluído)", exact: true }),
    ).toBeVisible();
  });
});
