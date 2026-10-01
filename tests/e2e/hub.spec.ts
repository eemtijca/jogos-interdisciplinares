import { expect, test } from "@playwright/test";
import { GAMES, gamesByArea } from "../../src/lib/catalog";

test.describe("Hub", () => {
  test("mostra o catálogo completo e os atalhos de acessibilidade", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Jogos de investigação");
    await expect(page.getByRole("link", { name: /^Jogar / })).toHaveCount(GAMES.length);
    await expect(page.getByRole("button", { name: "Alternar alto contraste" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Alternar texto amplo" })).toBeVisible();
  });

  test("busca e filtro por área reduzem a lista", async ({ page }) => {
    await page.goto("/");
    const busca = page.getByRole("searchbox", { name: "Buscar jogos" });
    await busca.fill("fonte");
    await expect(page.getByRole("link", { name: /^Jogar Fonte Suspeita/ })).toBeVisible();
    await expect(page.getByRole("link", { name: /^Jogar Função Viva/ })).toHaveCount(0);

    await page.getByRole("button", { name: "Limpar busca" }).click();
    await page.getByRole("button", { name: "Linguagens", exact: true }).click();
    await expect(page.getByRole("link", { name: /^Jogar Fonte Suspeita/ })).toBeVisible();
    await expect(page.getByRole("link", { name: /^Jogar Função Viva/ })).toHaveCount(0);
    await expect(page.getByRole("link", { name: /^Jogar / })).toHaveCount(
      gamesByArea("linguagens").length,
    );
  });
});
