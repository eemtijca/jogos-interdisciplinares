import { expect, test } from "@playwright/test";

test.describe("Partida", () => {
  test("abre o jogo, revela as evidências, reinicia e volta ao hub", async ({ page }) => {
    await page.goto("/jogo/fonte-suspeita");
    await expect(page.getByRole("heading", { level: 1, name: "Fonte Suspeita" })).toBeVisible();
    await expect(page.getByRole("region", { name: "Missão da partida" })).toBeVisible();
    await expect(page.getByLabel("Fases da partida")).toBeVisible();
    await expect(page.getByLabel("Selos da partida")).toBeVisible();

    const cartas = page.getByRole("button", { name: /^Carta / });
    await expect(cartas).toHaveCount(3);
    for (const carta of await cartas.all()) {
      await carta.click();
    }
    await expect(
      page.getByRole("status").filter({ hasText: "As três evidências estão na mesa" }),
    ).toBeVisible();

    await page.getByRole("button", { name: "Recomeçar a partida do começo" }).click();
    await expect(page.getByRole("button", { name: /Toque para virar/ })).toHaveCount(3);

    await page.getByRole("button", { name: "Voltar para a lista de jogos" }).click();
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Jogos de investigação");
  });

  test("identificador desconhecido cai na tela de jogo não encontrado", async ({ page }) => {
    await page.goto("/jogo/inexistente");
    await expect(page.getByRole("heading", { name: "Jogo não encontrado" })).toBeVisible();
    await page.getByRole("link", { name: "Voltar aos jogos" }).click();
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Jogos de investigação");
  });
});
