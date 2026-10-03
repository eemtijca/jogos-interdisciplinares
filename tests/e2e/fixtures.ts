import { expect, test as base, type Locator, type Page } from "@playwright/test";
import type { InvestigationTask } from "../../src/games/_shared/investigation-types";

const STORAGE_KEYS = ["ludus:progress:v1", "ludus:a11y:v1"];

/** Cada contexto começa limpo e restaura o estado que encontrou, inclusive após falha. */
export const test = base.extend<{ estadoLocal: void }>({
  estadoLocal: [
    async ({ page }, fornecer) => {
      await page.goto("/");
      const original = await page.evaluate(
        (keys) => keys.map((key) => [key, localStorage.getItem(key)]),
        STORAGE_KEYS,
      );
      await page.evaluate(
        (keys) => keys.forEach((key) => localStorage.removeItem(key)),
        STORAGE_KEYS,
      );
      await page.reload();
      try {
        await fornecer();
      } finally {
        if (!page.isClosed()) {
          await page.evaluate((entries) => {
            for (const [key, value] of entries) {
              if (value === null) localStorage.removeItem(key!);
              else localStorage.setItem(key!, value!);
            }
          }, original);
          await page.reload();
        }
      }
    },
    { auto: true },
  ],
});

export { expect };

/** O main visível da aplicação, ignorando a cópia offscreen do pré-carregamento de rotas. */
export function mainVisivel(page: Page): Locator {
  return page.locator("#ludus-main:visible");
}

/** Aguarda a hidratação do React antes de começar um percurso de teclado. */
export async function expectHydrated(page: Page, seletor = "#ludus-main") {
  await expect
    .poll(
      () =>
        page
          .evaluate((alvo) => {
            const elemento = Array.from(document.querySelectorAll<HTMLElement>(alvo)).find(
              (candidato) => candidato.getBoundingClientRect().width > 0,
            );
            if (!elemento) return false;
            return Object.keys(elemento).some((chave) => chave.startsWith("__reactProps"));
          }, seletor)
          .catch(() => false),
      { timeout: 20_000 },
    )
    .toBe(true);
}

export async function answerTask(fieldset: Locator, task: InvestigationTask, correct = true) {
  if (task.kind === "number") {
    const answer = correct ? String(task.answer).replace(".", ",") : "-999999";
    await fieldset.locator('input[type="text"]').fill(answer);
  } else if (task.kind === "order") {
    const sequence = [...(task.answer as string[])];
    if (!correct) sequence.reverse();
    const controls = fieldset.getByRole("combobox");
    for (let index = 0; index < sequence.length; index++) {
      await controls.nth(index).selectOption(sequence[index]);
    }
  } else if (task.kind === "multi") {
    const answers = task.answer as string[];
    const chosen = correct
      ? answers
      : task.options!.filter((option) => !answers.includes(option.id)).map((option) => option.id);
    for (const id of chosen) await fieldset.locator(`input[value="${id}"]`).check();
  } else {
    const id = correct
      ? String(task.answer)
      : task.options!.find((option) => option.id !== task.answer)!.id;
    await fieldset.locator(`input[value="${id}"]`).check();
  }
  await fieldset.getByRole("button", { name: "Conferir resposta", exact: true }).click();
}

export async function readProgress(page: Page) {
  return page.evaluate(() => JSON.parse(localStorage.getItem("ludus:progress:v1") ?? "{}"));
}

export async function expectNoPageOverflow(page: Page) {
  await expect
    .poll(() =>
      page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      ),
    )
    .toBeLessThanOrEqual(1);
}
