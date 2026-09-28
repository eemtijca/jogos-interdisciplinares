import { expect, test } from "@playwright/test";

test.describe("Progresso", () => {
  test("parte do zero e reflete o progresso salvo no dispositivo", async ({ page }) => {
    await page.goto("/progresso");
    await expect(page.getByRole("heading", { name: "Seu progresso" })).toBeVisible();
    const resumo = page.getByRole("region", { name: "Resumo geral" });
    await expect(resumo.getByText("0/12")).toBeVisible();
    await expect(resumo.getByText("0/36")).toBeVisible();

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
    await expect(resumo.getByText("1/12")).toBeVisible();
    await expect(resumo.getByText("3/36")).toBeVisible();

    await page.getByRole("button", { name: "Zerar progresso" }).click();
    await page.getByRole("button", { name: "Toque de novo para confirmar" }).click();
    await expect(resumo.getByText("0/12")).toBeVisible();
  });
});
