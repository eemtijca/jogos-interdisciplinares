import { expect, test } from "@playwright/test";

test.describe("Acessibilidade", () => {
  test("alterna e persiste alto contraste e texto amplo", async ({ page }) => {
    await page.goto("/");
    const raiz = page.locator("html");
    const contraste = page.getByRole("button", { name: "Alternar alto contraste" });
    const texto = page.getByRole("button", { name: "Alternar texto amplo" });

    await contraste.click();
    await expect(raiz).toHaveClass(/a11y-contrast/);
    await expect(contraste).toHaveAttribute("aria-pressed", "true");

    await texto.click();
    await expect(raiz).toHaveClass(/a11y-text-large/);

    await page.reload();
    await expect(raiz).toHaveClass(/a11y-contrast/);
    await expect(raiz).toHaveClass(/a11y-text-large/);

    await contraste.click();
    await texto.click();
    await expect(raiz).not.toHaveClass(/a11y-contrast/);
    await expect(raiz).not.toHaveClass(/a11y-text-large/);
  });
});
