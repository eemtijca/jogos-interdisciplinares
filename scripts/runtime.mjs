// Execução equivalente em Windows e Linux, sem depender de cp ou tee.
import { spawnSync } from "node:child_process";
import { cpSync, mkdirSync } from "node:fs";

const action = process.argv[2];
const next = "node_modules/next/dist/bin/next";
const run = (file, args, env = process.env) => {
  const result = spawnSync(file, args, { stdio: "inherit", env });
  if (result.error) {
    console.error(result.error.message);
    process.exit(1);
  }
  if (result.status !== 0) process.exit(result.status ?? 1);
};
if (action === "dev") run(process.execPath, [next, "dev", "-p", "3000"]);
else if (action === "build") {
  run(process.execPath, [next, "build"]);
  mkdirSync(".next/standalone/.next", { recursive: true });
  cpSync(".next/static", ".next/standalone/.next/static", { recursive: true });
  cpSync("public", ".next/standalone/public", { recursive: true });
} else if (action === "start")
  run(process.execPath, [".next/standalone/server.js"], { ...process.env, NODE_ENV: "production" });
else {
  console.error("Ação inválida. Use dev, build ou start.");
  process.exit(1);
}
