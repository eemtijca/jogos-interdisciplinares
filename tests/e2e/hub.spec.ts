import { GAMES, AREAS, AREA_ORDER } from "../../src/lib/catalog";
import { expect, test, expectNoPageOverflow } from "./fixtures";

test.describe("Hub e descoberta", () => {
  test("apresenta 20 jogos, cinco em cada área, com acesso direto", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Jogos de investigação");
    await expect(page.getByRole("link", { name: /^Jogar / })).toHaveCount(20);
    for (const game of GAMES) {
      await expect(
        page.getByRole("link", { name: new RegExp(`^Jogar ${game.title}`) }),
      ).toHaveAttribute("href", `/jogo/${game.id}`);
    }
    await expect(page.getByRole("button", { name: "Alternar alto contraste" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Alternar texto amplo" })).toBeVisible();
    await expectNoPageOverflow(page);
  });

  test("combina áreas e cinco níveis e recupera uma busca vazia", async ({ page }) => {
    await page.goto("/");
    for (let level = 1; level <= 5; level++) {
      await page.getByRole("button", { name: new RegExp(`^Nível ${level}(?:$| )`) }).click();
      await expect(page.getByRole("link", { name: /^Jogar / })).toHaveCount(4);
      for (const game of GAMES.filter((item) => item.level === level)) {
        await expect(
          page.getByRole("link", { name: new RegExp(`^Jogar ${game.title}`) }),
        ).toBeVisible();
      }
    }
    await page.getByRole("button", { name: "Todos os níveis", exact: true }).click();
    for (const area of AREA_ORDER) {
      await page.getByRole("button", { name: AREAS[area].shortName, exact: true }).click();
      await expect(page.getByRole("link", { name: /^Jogar / })).toHaveCount(5);
    }
    await page.getByRole("button", { name: /^Nível 5(?:$| )/ }).click();
    await expect(page.getByRole("link", { name: /^Jogar / })).toHaveCount(1);
    const search = page.getByRole("searchbox", { name: "Buscar jogos" });
    await search.fill("zzzz-sem-jogo");
    await expect(page.getByText("Nenhum jogo encontrado", { exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: /^Jogar / })).toHaveCount(0);
    await page.getByRole("button", { name: "Limpar filtros", exact: true }).click();
    await expect(search).toHaveValue("");
    await expect(page.getByRole("link", { name: /^Jogar / })).toHaveCount(20);
  });

  test("busca por tema sem acento e por código da BNCC", async ({ page }) => {
    await page.goto("/");
    const search = page.getByRole("searchbox", { name: "Buscar jogos" });
    await search.fill("funcao");
    await expect(page.getByRole("link", { name: /^Jogar Função Viva/ })).toBeVisible();
    await page.getByRole("button", { name: "Limpar busca" }).click();
    await search.fill("EM13LP39");
    await expect(page.getByRole("link", { name: /^Jogar Fonte Suspeita/ })).toBeVisible();
  });

  test("atalho ao catálogo leva foco ao título visível sem antecipar a busca no celular", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto("/");
    await page.getByRole("button", { name: "Alternar texto amplo" }).click();
    const choose = page.getByRole("button", { name: "Escolher um jogo", exact: true });
    for (let step = 0; step < 25; step++) {
      if (await choose.evaluate((element) => element === document.activeElement)) break;
      await page.keyboard.press("Tab");
    }
    await expect(choose).toBeFocused();
    await page.keyboard.press("Enter");
    const heading = page.getByRole("heading", { name: "Escolha sua investigação", exact: true });
    const search = page.getByRole("searchbox", { name: "Buscar jogos" });
    await expect(heading).toBeFocused();
    await expect(heading).toBeInViewport({ ratio: 1 });
    await expect(search).not.toBeFocused();
    await expect
      .poll(() =>
        heading.evaluate((element) => {
          const bounds = element.getBoundingClientRect();
          const headerBottom = document
            .querySelector("header.sticky")!
            .getBoundingClientRect().bottom;
          const navigationTop = document.querySelector(".bottom-nav")!.getBoundingClientRect().top;
          return bounds.top >= headerBottom && bounds.bottom <= navigationTop;
        }),
      )
      .toBe(true);
    await page.keyboard.press("Tab");
    await expect(search).toBeFocused();
    await page.keyboard.type("Função Viva");
    await expect(page.getByRole("link", { name: /^Jogar Função Viva/ })).toBeVisible();
    await expectNoPageOverflow(page);
  });
});
