import { expect, test } from "@playwright/test";

test.describe("API de saúde", () => {
  test("responde com o nome do aplicativo e o status", async ({ request }) => {
    const resposta = await request.get("/api");
    expect(resposta.ok()).toBe(true);
    const corpo = await resposta.json();
    expect(corpo.app).toBe("ludus");
    expect(corpo.status).toBe("ok");
    expect(typeof corpo.time).toBe("string");
  });
});
