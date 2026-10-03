import type { Locator, Page } from "@playwright/test";
import { INVESTIGATION_CASES } from "../../src/games/cases";
import {
  answerTask,
  expect,
  test,
  expectNoPageOverflow,
  expectHydrated,
  mainVisivel,
  readProgress,
} from "./fixtures";

async function activateWithKeyboard(page: Page, target: Locator) {
  // A hidratação precisa estar concluída para o Tab percorrer a árvore real,
  // e não o HTML do servidor que o React substitui durante a montagem.
  await expectHydrated(page);
  for (let step = 0; step < 150; step++) {
    if (await target.evaluate((element) => element === document.activeElement)) {
      await page.keyboard.press("Enter");
      return;
    }
    await page.keyboard.press("Tab");
  }
  throw new Error("Controle não alcançado com Tab no percurso esperado.");
}

async function installSpeechMock(page: Page) {
  await page.addInitScript(() => {
    const state = { spoken: [] as string[], cancelled: 0, speaking: false };
    class MockUtterance {
      text: string;
      constructor(text: string) {
        this.text = text;
      }
    }
    Object.defineProperty(window, "SpeechSynthesisUtterance", {
      configurable: true,
      value: MockUtterance,
    });
    Object.defineProperty(window, "speechSynthesis", {
      configurable: true,
      value: {
        getVoices: () => [],
        get speaking() {
          return state.speaking;
        },
        pending: false,
        cancel: () => {
          state.cancelled++;
          state.speaking = false;
        },
        speak: (utterance: { text: string }) => {
          state.spoken.push(utterance.text);
          state.speaking = true;
        },
        testState: state,
      },
    });
  });
}

async function speechState(page: Page) {
  return page.evaluate(
    () =>
      (
        window.speechSynthesis as SpeechSynthesis & {
          testState: { spoken: string[]; cancelled: number; speaking: boolean };
        }
      ).testState,
  );
}

test.describe("Acessibilidade funcional", () => {
  test("persiste contraste, texto amplo e movimento reduzido entre rotas", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto("/");
    await page.getByRole("button", { name: "Alternar alto contraste" }).click();
    await page.getByRole("button", { name: "Alternar texto amplo" }).click();
    await expect(page.locator("html")).toHaveClass(/a11y-contrast/);
    await expect(page.locator("html")).toHaveClass(/a11y-text-large/);
    await page.goto("/jogo/fonte-suspeita");
    await page.getByRole("button", { name: "Menos movimento", exact: true }).click();
    await expect(page.locator("html")).toHaveClass(/a11y-reduced-motion/);
    await expect(
      page.getByRole("button", { name: "Menos movimento", exact: true }),
    ).toHaveAttribute("aria-pressed", "true");
    await expectNoPageOverflow(page);
    await page.reload();
    // O roteador mantém uma cópia offscreen durante o pré-carregamento; o main visível é o alvo.
    await expect(mainVisivel(page)).toBeVisible();
    await expect(page.locator("html")).toHaveClass(/a11y-contrast/);
    await expect(page.locator("html")).toHaveClass(/a11y-text-large/);
    await expect(page.locator("html")).toHaveClass(/a11y-reduced-motion/);
    const duration = await mainVisivel(page).evaluate(
      (element) => getComputedStyle(element).animationDuration,
    );
    expect(duration.split(",").every((value) => parseFloat(value) <= 0.01)).toBe(true);
    for (const route of ["/", "/progresso", "/professores"]) {
      await page.goto(route);
      await expect(page.locator("html")).toHaveClass(/a11y-text-large/);
      await expectNoPageOverflow(page);
    }
  });

  test("conclui uma investigação pelo teclado com apoio e foco na conclusão", async ({ page }) => {
    await page.goto("/jogo/fonte-suspeita");
    await expectHydrated(page);
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "Ir para o conteúdo" })).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(mainVisivel(page)).toBeFocused();
    await activateWithKeyboard(
      page,
      page.getByRole("button", { name: "Testar hipóteses", exact: true }),
    );
    const scenario = INVESTIGATION_CASES["fonte-suspeita"][0];
    const fields = page.locator("fieldset");
    for (let index = 0; index < scenario.tasks.length; index++) {
      await activateWithKeyboard(
        page,
        fields.nth(index).getByRole("button", { name: "Continuar com apoio", exact: true }),
      );
      await expect(fields.nth(index).getByRole("status")).toContainText("Resolução com apoio");
    }
    await activateWithKeyboard(
      page,
      page.getByRole("button", { name: "Construir decisão", exact: true }),
    );
    await activateWithKeyboard(
      page,
      fields.first().getByRole("button", { name: "Continuar com apoio", exact: true }),
    );
    await activateWithKeyboard(
      page,
      page.getByRole("button", { name: "Registrar conclusão", exact: true }),
    );
    const heading = page.getByRole("heading", { name: "Investigação registrada" });
    await expect(heading).toBeVisible();
    await expect(heading).toBeFocused();
    expect((await readProgress(page))["fonte-suspeita"].completedCaseIds).toContain(scenario.id);
  });

  test("respeita preferência de movimento do sistema e controles mantêm nomes", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/jogo/funcao-viva");
    const duration = await mainVisivel(page).evaluate(
      (element) => getComputedStyle(element).animationDuration,
    );
    expect(duration.split(",").every((value) => parseFloat(value) <= 0.01)).toBe(true);
    await expect(page.getByRole("button", { name: /^Ouvir contexto/ })).toBeVisible();
    await expect(page.getByRole("button", { name: /^Ouvir evidência:/ })).toHaveCount(3);
    await page.getByRole("button", { name: "Testar hipóteses", exact: true }).click();
    await expect(page.getByRole("region", { name: "Laboratório do caso" })).toBeVisible();
    const slider = page.getByRole("slider").first();
    await slider.focus();
    const before = await slider.inputValue();
    await page.keyboard.press("ArrowRight");
    expect(await slider.inputValue()).not.toBe(before);
    await expectNoPageOverflow(page);
  });

  test("troca a leitura no primeiro clique e a interrompe ao concluir", async ({ page }) => {
    await installSpeechMock(page);
    await page.goto("/jogo/fonte-suspeita");
    const scenario = INVESTIGATION_CASES["fonte-suspeita"][0];
    const contextVoice = page.getByRole("region", { name: "Contexto do caso" }).getByRole("button");
    const evidenceVoice = page
      .getByRole("region", { name: "Evidências do caso" })
      .getByRole("article")
      .first()
      .getByRole("button");
    await contextVoice.click();
    await expect(contextVoice).toHaveAttribute("aria-pressed", "true");
    const first = await speechState(page);
    expect(first.spoken).toHaveLength(1);
    expect(first.spoken[0]).toContain(scenario.context);
    await evidenceVoice.click();
    await expect(contextVoice).toHaveAttribute("aria-pressed", "false");
    await expect(evidenceVoice).toHaveAccessibleName("Parar leitura em voz alta");
    const switched = await speechState(page);
    expect(switched.cancelled).toBeGreaterThan(first.cancelled);
    expect(switched.spoken).toHaveLength(2);
    expect(switched.spoken[1]).toContain(scenario.evidence[0].text);

    await page.getByRole("button", { name: "Testar hipóteses", exact: true }).click();
    const fields = page.locator("fieldset");
    for (let index = 0; index < scenario.tasks.length; index++) {
      await fields
        .nth(index)
        .getByRole("button", { name: "Continuar com apoio", exact: true })
        .click();
    }
    await page.getByRole("button", { name: "Construir decisão", exact: true }).click();
    await fields.first().getByRole("button", { name: "Continuar com apoio", exact: true }).click();
    await fields.first().getByRole("status").getByRole("button").click();
    const beforeConclusion = await speechState(page);
    expect(beforeConclusion.speaking).toBe(true);
    await page.getByRole("button", { name: "Registrar conclusão", exact: true }).click();
    await expect(page.getByRole("heading", { name: "Investigação registrada" })).toBeVisible();
    const afterConclusion = await speechState(page);
    expect(afterConclusion.cancelled).toBeGreaterThan(beforeConclusion.cancelled);
    expect(afterConclusion.speaking).toBe(false);
    await expect(
      page.getByRole("button", { name: "Parar leitura em voz alta", exact: true }),
    ).toHaveCount(0);
  });

  test("apoio lê referência e resposta; API indisponível mantém o botão inativo", async ({
    page,
  }) => {
    await installSpeechMock(page);
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("/jogo/fonte-suspeita");
    await page.getByRole("button", { name: "Testar hipóteses", exact: true }).click();
    const task = INVESTIGATION_CASES["fonte-suspeita"][0].tasks[0];
    const field = page.locator("fieldset").first();
    await field.getByRole("button", { name: "Continuar com apoio", exact: true }).click();
    const feedbackVoice = field.getByRole("status").getByRole("button");
    await feedbackVoice.click();
    const spoken = (await speechState(page)).spoken.at(-1)!;
    expect(spoken).toContain("Referência:");
    expect(spoken).toContain(task.explanation);
    const answers = Array.isArray(task.answer) ? task.answer : [task.answer];
    for (const answer of answers) {
      const reference =
        typeof answer === "number"
          ? answer.toLocaleString("pt-BR")
          : task.options!.find((option) => option.id === answer)!.label;
      expect(spoken).toContain(reference);
    }
    await feedbackVoice.click();
    await expect(feedbackVoice).toHaveAttribute("aria-pressed", "false");
    await page.evaluate(() =>
      Object.defineProperty(window, "speechSynthesis", {
        configurable: true,
        value: undefined,
      }),
    );
    const contextVoice = page.getByRole("region", { name: "Contexto do caso" }).getByRole("button");
    await contextVoice.click();
    await expect(contextVoice).toHaveAttribute("aria-pressed", "false");
    await expect(contextVoice).toHaveAccessibleName(/^Ouvir contexto/);
    expect(errors).toEqual([]);
  });

  test("MathJax local renderiza química e potência sem erro e a voz remove comandos TeX", async ({
    page,
  }) => {
    await installSpeechMock(page);
    await page.setViewportSize({ width: 320, height: 800 });
    const mathRequests: string[] = [];
    page.on("request", (request) => {
      if (request.url().includes("/mathjax/")) mathRequests.push(request.url());
    });
    await page.goto("/");
    await page.getByRole("button", { name: "Alternar texto amplo" }).click();
    await page.goto("/jogo/reacao-equilibrada");
    await expect(page.locator("html")).toHaveClass(/a11y-text-large/);
    const equation = page
      .getByRole("region", { name: "Evidências do caso" })
      .getByRole("article")
      .filter({ has: page.getByRole("heading", { name: "Proporção", exact: true }) });
    await expect(equation.locator("mjx-container")).toBeVisible();
    await expect(equation.locator("mjx-merror, [data-mjx-error]")).toHaveCount(0);
    await equation.getByRole("button").click();
    const chemistrySpeech = (await speechState(page)).spoken.at(-1)!;
    expect(chemistrySpeech).toContain("2 H2 + O2 → 2 H2O");
    expect(chemistrySpeech).not.toMatch(/\\|[{}^]/);
    await expectNoPageOverflow(page);

    await page.goto("/jogo/funcao-viva");
    await page
      .getByRole("navigation", { name: "Casos do jogo" })
      .getByRole("button", { name: /^Caso 2 / })
      .click();
    await page.getByRole("button", { name: "Testar hipóteses", exact: true }).click();
    const laboratory = page.getByRole("region", { name: "Laboratório do caso" });
    await expect(laboratory.locator("mjx-container")).toBeVisible();
    await expect(laboratory.locator("mjx-merror, [data-mjx-error]")).toHaveCount(0);
    await laboratory.getByRole("button", { name: /^Ouvir modelo/ }).click();
    const functionSpeech = (await speechState(page)).spoken.at(-1)!;
    expect(functionSpeech).toContain("L(q) = -2q² + 40q - 72");
    expect(functionSpeech).not.toMatch(/\\|[{}^]/);
    expect(mathRequests.some((url) => new URL(url).pathname === "/mathjax/tex-chtml.js")).toBe(
      true,
    );
    expect(mathRequests.every((url) => new URL(url).origin === new URL(page.url()).origin)).toBe(
      true,
    );
    await expectNoPageOverflow(page);
  });

  test("editar resposta encerra feedback e seu descarte preserva outra leitura ativa", async ({
    page,
  }) => {
    await installSpeechMock(page);
    await page.goto("/jogo/fonte-suspeita");
    await page.getByRole("button", { name: "Testar hipóteses", exact: true }).click();
    const task = INVESTIGATION_CASES["fonte-suspeita"][0].tasks[0];
    const field = page.locator("fieldset").first();
    const correctAnswer = field.locator(`input[value="${String(task.answer)}"]`);
    const feedbackVoice = field.getByRole("status").getByRole("button");
    await answerTask(field, task, false);
    await feedbackVoice.click();
    await expect(feedbackVoice).toHaveAttribute("aria-pressed", "true");
    const beforeEditing = await speechState(page);
    await correctAnswer.check();
    await expect(field.getByRole("status")).toHaveCount(0);
    await expect.poll(async () => (await speechState(page)).speaking).toBe(false);
    expect((await speechState(page)).cancelled).toBeGreaterThan(beforeEditing.cancelled);

    await answerTask(field, task, false);
    await feedbackVoice.click();
    const contextVoice = page.getByRole("region", { name: "Contexto do caso" }).getByRole("button");
    await contextVoice.click();
    await expect(feedbackVoice).toHaveAttribute("aria-pressed", "false");
    await expect(contextVoice).toHaveAttribute("aria-pressed", "true");
    const beforeInactiveCleanup = await speechState(page);
    await correctAnswer.check();
    await expect(field.getByRole("status")).toHaveCount(0);
    await page.evaluate(
      () =>
        new Promise<void>((resolve) => {
          requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
        }),
    );
    const afterInactiveCleanup = await speechState(page);
    expect(afterInactiveCleanup.cancelled).toBe(beforeInactiveCleanup.cancelled);
    expect(afterInactiveCleanup.speaking).toBe(true);
    await expect(contextVoice).toHaveAttribute("aria-pressed", "true");
  });

  test("mudar erro para apoio interrompe a locução antiga e oferece a referência nova", async ({
    page,
  }) => {
    await installSpeechMock(page);
    await page.goto("/jogo/fonte-suspeita");
    await page.getByRole("button", { name: "Testar hipóteses", exact: true }).click();
    const task = INVESTIGATION_CASES["fonte-suspeita"][0].tasks[0];
    const field = page.locator("fieldset").first();
    await answerTask(field, task, false);
    const feedbackVoice = field.getByRole("status").getByRole("button");
    await feedbackVoice.click();
    await expect(feedbackVoice).toHaveAttribute("aria-pressed", "true");
    const beforeSupport = await speechState(page);
    await field.getByRole("button", { name: "Continuar com apoio", exact: true }).click();
    await expect(field.getByRole("status")).toContainText("Resolução com apoio");
    await expect(feedbackVoice).toHaveAttribute("aria-pressed", "false");
    const afterSupport = await speechState(page);
    expect(afterSupport.cancelled).toBeGreaterThan(beforeSupport.cancelled);
    expect(afterSupport.speaking).toBe(false);
    await feedbackVoice.click();
    const reference = (await speechState(page)).spoken.at(-1)!;
    expect(reference).toContain("Referência:");
    expect(reference).toContain(task.options!.find((option) => option.id === task.answer)!.label);
    expect(reference).not.toBe(beforeSupport.spoken.at(-1));
  });

  test("compara modelos e percorre tabela larga pelo teclado a 320px com texto amplo", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto("/");
    await page.getByRole("button", { name: "Alternar texto amplo" }).click();
    await page.goto("/jogo/orcamento-limite");
    await expectHydrated(page);
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "Ir para o conteúdo" })).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(mainVisivel(page)).toBeFocused();
    await activateWithKeyboard(
      page,
      page
        .getByRole("navigation", { name: "Casos do jogo" })
        .getByRole("button", { name: /^Caso 2 / }),
    );
    await activateWithKeyboard(
      page,
      page.getByRole("button", { name: "Testar hipóteses", exact: true }),
    );
    await expect(page.locator("html")).toHaveClass(/a11y-text-large/);
    const laboratory = page.getByRole("region", { name: "Laboratório do caso" });
    const summary = laboratory.getByText("Comparar cenários do modelo", { exact: true });
    await activateWithKeyboard(page, summary);
    await expect(laboratory.locator("details")).toHaveJSProperty("open", true);
    const variable = laboratory.getByRole("combobox", { name: /^Variável de comparação/ });
    await page.keyboard.press("Tab");
    await expect(variable).toBeFocused();
    await page.keyboard.press("ArrowDown");
    const secondParameter = INVESTIGATION_CASES["orcamento-limite"][1].model!.parameters[1];
    await expect(variable).toHaveValue(secondParameter.id);
    const tableRegion = laboratory.getByRole("region", {
      name: `Tabela de cenários de ${secondParameter.label}`,
      exact: true,
    });
    await expect(
      tableRegion.getByRole("table", { name: `Cenários de ${secondParameter.label}`, exact: true }),
    ).toBeVisible();
    await page.keyboard.press("Tab");
    await expect(tableRegion).toBeFocused();
    expect(
      await tableRegion.evaluate((element) => element.scrollWidth - element.clientWidth),
    ).toBeGreaterThan(0);
    const initialLeft = await tableRegion.evaluate((element) => element.scrollLeft);
    await page.keyboard.press("ArrowRight");
    await expect
      .poll(() => tableRegion.evaluate((element) => element.scrollLeft))
      .toBeGreaterThan(initialLeft);
    const afterRight = await tableRegion.evaluate((element) => element.scrollLeft);
    await page.keyboard.press("ArrowLeft");
    await expect
      .poll(() => tableRegion.evaluate((element) => element.scrollLeft))
      .toBeLessThan(afterRight);
    await expectNoPageOverflow(page);
    await page.keyboard.press("Shift+Tab");
    await page.keyboard.press("Shift+Tab");
    await expect(summary).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(laboratory.locator("details")).toHaveJSProperty("open", false);
    await page.keyboard.press("Tab");
    await expect(
      page
        .locator("fieldset")
        .first()
        .getByRole("button", { name: /^Ouvir teste/ }),
    ).toBeFocused();
  });
});
