import { expect, test } from "@playwright/test";

test.describe("Modo Professor", () => {
  test("mostra o roteiro e as fichas da BNCC", async ({ page }) => {
    await page.goto("/professores");
    await expect(page.getByRole("heading", { name: "Modo Professor" })).toBeVisible();
    await expect(page.getByText("Antes (5 min)")).toBeVisible();
    await expect(page.getByText("EM13LP39").first()).toBeVisible();
    await expect(page.getByRole("heading", { name: "Fonte Suspeita" }).first()).toBeVisible();
  });
});
