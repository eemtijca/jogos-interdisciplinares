import { GAMES } from "../../src/lib/catalog";
import type { Page } from "@playwright/test";
import { expect, test, expectNoPageOverflow } from "./fixtures";

async function installClipboardMock(page: Page, mode: "pending" | "rejected") {
  await page.addInitScript((clipboardMode) => {
    const writes: string[] = [];
    let finish: (() => void) | null = null;
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: (text: string) => {
          writes.push(text);
          if (clipboardMode === "rejected")
            return Promise.reject(new DOMException("Bloqueado no teste", "NotAllowedError"));
          return new Promise<void>((resolve) => {
            finish = resolve;
          });
        },
        testWrites: writes,
        resolvePending: () => finish?.(),
      },
    });
  }, mode);
}

test.describe("Modo Professor", () => {
  test("mostra o roteiro e as fichas da BNCC", async ({ page }) => {
    await page.goto("/professores");
    await expect(page.getByRole("heading", { name: "Modo Professor" })).toBeVisible();
    await expect(page.getByText("Antes (5 min)")).toBeVisible();
    await expect(page.getByText("EM13LP39").first()).toBeVisible();
    await expect(page.getByRole("heading", { name: "Fonte Suspeita" }).first()).toBeVisible();
    await expect(page.getByRole("article")).toHaveCount(20);
    for (const game of GAMES)
      await expect(page.getByRole("heading", { name: game.title, exact: true })).toBeVisible();
    await page
      .getByRole("combobox", { name: "Área das fichas pedagógicas" })
      .selectOption("natureza");
    await expect(page.getByRole("article")).toHaveCount(5);
    await expect(
      page.getByRole("heading", { name: "Energia em Transição", exact: true }),
    ).toBeVisible();
    await expectNoPageOverflow(page);
  });

  test("confirma cópia somente depois de a API resolver", async ({ page }) => {
    await installClipboardMock(page, "pending");
    await page.goto("/professores");
    const card = page.getByRole("article").first();
    await expect(card.getByRole("heading", { name: "Fonte Suspeita", exact: true })).toBeVisible();
    const copy = card.getByRole("button", { name: "Copiar link direto do jogo Fonte Suspeita" });
    await copy.click();
    const writes = await page.evaluate(
      () => (navigator.clipboard as Clipboard & { testWrites: string[] }).testWrites,
    );
    expect(writes).toEqual([`${new URL(page.url()).origin}/jogo/fonte-suspeita`]);
    await expect(copy).toHaveText("Copiar link do jogo");
    await expect(card.getByRole("status")).toHaveText("");
    await expect(card.getByText("Link copiado!", { exact: true })).toHaveCount(0);
    await page.evaluate(() =>
      (navigator.clipboard as Clipboard & { resolvePending: () => void }).resolvePending(),
    );
    await expect(card.getByRole("status")).toHaveText("Link copiado.");
    await expect(copy).toHaveText("Link copiado!");
  });

  test("recusa de cópia oferece endereço selecionável sem confirmar sucesso", async ({ page }) => {
    await installClipboardMock(page, "rejected");
    await page.goto("/professores");
    const card = page.getByRole("article").first();
    const copy = card.getByRole("button", { name: "Copiar link direto do jogo Fonte Suspeita" });
    await copy.click();
    await expect(card.getByRole("status")).toHaveText(
      "Não foi possível copiar automaticamente. Selecione o endereço abaixo.",
    );
    await expect(copy).toHaveText("Copiar link do jogo");
    await expect(card.getByText("Link copiado!", { exact: true })).toHaveCount(0);
    const address = card.getByRole("textbox", { name: "Endereço do jogo" });
    await expect(address).toHaveValue(`${new URL(page.url()).origin}/jogo/fonte-suspeita`);
    await expect(address).toHaveJSProperty("readOnly", true);
    await address.focus();
    expect(
      await address.evaluate((element) => {
        const input = element as HTMLInputElement;
        return input.selectionStart === 0 && input.selectionEnd === input.value.length;
      }),
    ).toBe(true);
    await expectNoPageOverflow(page);
  });
});
