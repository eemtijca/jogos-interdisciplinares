import { expect, test } from "./fixtures";

test.describe("Progresso", () => {
  test("parte do zero e reflete o progresso salvo no dispositivo", async ({ page }) => {
    await page.goto("/progresso");
    await expect(page.getByRole("heading", { name: "Seu progresso" })).toBeVisible();
    const resumo = page.getByRole("region", { name: "Resumo geral" });
    await expect(resumo.getByText("0/20")).toBeVisible();
    await expect(resumo.getByText("0/60")).toHaveCount(2);

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
    await expect(resumo.getByText("1/20")).toBeVisible();
    await expect(resumo.getByText("3/60")).toBeVisible();
    await expect(resumo.getByText("0/60")).toBeVisible();

    await page.getByRole("button", { name: "Zerar progresso" }).click();
    await expect(page.getByRole("alertdialog")).toContainText(
      "Zerar o progresso deste dispositivo?",
    );
    await page.getByRole("button", { name: "Manter progresso" }).click();
    await expect(resumo.getByText("1/20")).toBeVisible();
    await page.getByRole("button", { name: "Zerar progresso" }).click();
    await page.getByRole("button", { name: "Confirmar exclusão" }).click();
    await expect(resumo.getByText("0/20")).toBeVisible();
    await expect(resumo.getByText("0/60")).toHaveCount(2);
  });

  test("recupera armazenamento malformado sem quebrar a navegação", async ({ page }) => {
    await page.goto("/progresso");
    await page.evaluate(() => localStorage.setItem("ludus:progress:v1", "{json inválido"));
    await page.reload();
    await expect(
      page.getByRole("region", { name: "Resumo geral" }).getByText("0/20"),
    ).toBeVisible();
    await expect(
      page.getByRole("region", { name: "Trilha por área" }).getByRole("link"),
    ).toHaveCount(20);
  });
});
