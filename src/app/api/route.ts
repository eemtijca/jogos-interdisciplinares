import { NextResponse } from "next/server";
import pacote from "../../../package.json";

// Revisão implantada, útil para conferir o deploy em qualquer provedor.
const COMMIT = process.env.VERCEL_GIT_COMMIT_SHA ?? process.env.GIT_COMMIT ?? "local";

/**
 * Health check do serviço: GET /api
 */
export async function GET() {
  return NextResponse.json({
    app: "ludus",
    versao: pacote.version,
    commit: COMMIT,
    status: "ok",
    time: new Date().toISOString(),
  });
}
